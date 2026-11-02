import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import { readdir, readFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Originals stay outside public; only resized, metadata-free WebP files are served.
function photoGallery(category: 'press' | 'live'): Plugin {
  const directory = resolve(`media/${category}`);
  const logoPath = resolve('public/media/de155-logo.png');
  const moduleId = `virtual:${category}-gallery`;
  const virtualId = `\0${moduleId}`;
  const images = new Map<string, { data: Buffer; width: number; height: number }>();
  let building = false;
  return {
    name: `${category}-gallery`,
    configResolved(config) { building = config.command === 'build'; },
    resolveId(id) { if (id === moduleId) return virtualId; },
    async load(id) {
      if (id !== virtualId) return;
      images.clear();
      // Preserve the transparent PNG silhouette; bake 22% opacity into its alpha.
      const logo = await sharp(logoPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      for (let offset = 0; offset < logo.data.length; offset += 4) {
        logo.data[offset + 3] = Math.round(logo.data[offset + 3] * 0.22);
        logo.data[offset] = logo.data[offset + 1] = logo.data[offset + 2] = 255;
      }
      const watermark = await sharp(logo.data, { raw: { width: logo.info.width, height: logo.info.height, channels: 4 } }).trim().png().toBuffer();
      const files = (await readdir(directory)).filter(name => /\.(jpe?g|png|webp)$/i.test(name)).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
      const entries = [];
      for (const name of files) {
        const original = await readFile(resolve(directory, name));
        const resized = await sharp(original).rotate().resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true }).toBuffer({ resolveWithObject: true });
        const { width, height } = resized.info;
        const angle = -Math.atan2(height, width) * 180 / Math.PI;
        // Measure the visible silhouette, discard transparent padding, and fill
        // the photo proportionally. Let the logo extend beyond the photo edges.
        const rotation = await sharp(watermark).rotate(angle, { background: '#00000000' }).png().toBuffer();
        const rotated = await sharp(rotation).trim().png().toBuffer();
        // Centre the visible ink rather than its asymmetric bounding rectangle.
        const pixels = await sharp(rotated).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        let mass = 0, momentX = 0, momentY = 0;
        for (let y = 0; y < pixels.info.height; y++) {
          for (let x = 0; x < pixels.info.width; x++) {
            const alpha = pixels.data[(y * pixels.info.width + x) * 4 + 3];
            mass += alpha;
            momentX += (x + 0.5) * alpha;
            momentY += (y + 0.5) * alpha;
          }
        }
        const centreX = mass ? momentX / mass : pixels.info.width / 2;
        const centreY = mass ? momentY / mass : pixels.info.height / 2;
        const scale = Math.max(width / pixels.info.width, height / pixels.info.height);
        // The photo-sized canvas clips overflow after placing the ink centre.
        const stamp = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><g transform="translate(${width / 2} ${height / 2}) scale(${scale})"><image x="${-centreX}" y="${-centreY}" width="${pixels.info.width}" height="${pixels.info.height}" xlink:href="data:image/png;base64,${rotated.toString('base64')}"/></g></svg>`);
        const { data, info } = await sharp(resized.data).composite([{ input: stamp, gravity: 'centre' }]).webp({ quality: 70 }).toBuffer({ resolveWithObject: true });
        const hash = createHash('sha256').update(data).digest('hex').slice(0, 16);
        const fileName = `media/${category}/${hash}.webp`;
        images.set(fileName, { data, width: info.width, height: info.height });
        const src = building
          ? `import.meta.ROLLUP_FILE_URL_${this.emitFile({ type: 'asset', fileName, source: data })}`
          : `import.meta.env.BASE_URL + ${JSON.stringify(fileName)}`;
        entries.push(`{ src: ${src}, width: ${info.width}, height: ${info.height} }`);
      }
      return `export default [${entries.join(',')}];`;
    },
    configureServer(server) {
      server.watcher.add([directory, logoPath]);
      const refresh = (file: string) => {
        const path = relative(directory, file);
        if (resolve(file) !== logoPath && (path.startsWith('..') || !/\.(jpe?g|png|webp)$/i.test(path))) return;
        const module = server.moduleGraph.getModuleById(virtualId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', refresh).on('unlink', refresh).on('change', refresh);
      server.middlewares.use((req, res, next) => {
        const path = decodeURI((req.url ?? '').split('?')[0]);
        const key = path.slice(path.indexOf(`media/${category}/`));
        const image = images.get(key);
        if (!image) return next();
        res.setHeader('Content-Type', 'image/webp');
        res.end(image.data);
      });
    },
  };
}

// Relative assets support both / and /REPOSITORY/, including ?print=1.
export default defineConfig({ base: './', plugins: [photoGallery('press'), photoGallery('live')] });
