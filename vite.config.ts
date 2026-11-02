import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import { readdir, readFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Originals stay outside public; only resized, metadata-free WebP files are served.
function pressGallery(): Plugin {
  const directory = resolve('media/press');
  const virtualId = '\0virtual:press-gallery';
  const images = new Map<string, { data: Buffer; width: number; height: number }>();
  let building = false;
  return {
    name: 'press-gallery',
    configResolved(config) { building = config.command === 'build'; },
    resolveId(id) { if (id === 'virtual:press-gallery') return virtualId; },
    async load(id) {
      if (id !== virtualId) return;
      images.clear();
      const files = (await readdir(directory)).filter(name => /\.(jpe?g|png|webp)$/i.test(name)).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
      const entries = [];
      for (const name of files) {
        const original = await readFile(resolve(directory, name));
        const { data, info } = await sharp(original).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
        const hash = createHash('sha256').update(data).digest('hex').slice(0, 16);
        const fileName = `media/press/${hash}.webp`;
        images.set(fileName, { data, width: info.width, height: info.height });
        const src = building
          ? `import.meta.ROLLUP_FILE_URL_${this.emitFile({ type: 'asset', fileName, source: data })}`
          : `import.meta.env.BASE_URL + ${JSON.stringify(fileName)}`;
        entries.push(`{ src: ${src}, width: ${info.width}, height: ${info.height} }`);
      }
      return `export default [${entries.join(',')}];`;
    },
    configureServer(server) {
      server.watcher.add(directory);
      const refresh = (file: string) => {
        const path = relative(directory, file);
        if (path.startsWith('..') || !/\.(jpe?g|png|webp)$/i.test(path)) return;
        const module = server.moduleGraph.getModuleById(virtualId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', refresh).on('unlink', refresh).on('change', refresh);
      server.middlewares.use((req, res, next) => {
        const path = decodeURI((req.url ?? '').split('?')[0]);
        const key = path.slice(path.indexOf('media/press/'));
        const image = images.get(key);
        if (!image) return next();
        res.setHeader('Content-Type', 'image/webp');
        res.end(image.data);
      });
    },
  };
}

// Relative assets support both / and /REPOSITORY/, including ?print=1.
export default defineConfig({ base: './', plugins: [pressGallery()] });
