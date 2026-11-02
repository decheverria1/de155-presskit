# DE155 — Electronic Press Kit

Base estática React + TypeScript + Vite, con CSS estándar, interfaz ES/EN y vista editorial A4. Sin backend ni recursos visuales generados.

## Desarrollo

Requiere Node.js 22.12 o superior y npm. Desde esta carpeta:

```sh
npm install
npm run dev
npm run build
npm run preview
```

Validación de esta entrega: `npm run build` completado (TypeScript y Vite); instalación con cero vulnerabilidades reportadas por npm. Se generó `package-lock.json`. No se realizó revisión visual en navegador ni exportación PDF en este entorno.

Conservar `package-lock.json` en Git; después usar `npm ci` para instalaciones reproducibles. Vite muestra la URL local; `dist/` contiene el sitio compilado.

## Arquitectura y contenido

- `src/data/artist.ts`: identidad, biografías, lanzamientos, sets, hitos, fotos y enlaces. Los arrays vacíos y TODO son intencionales.
- `src/data/ui.ts`: traducciones de interfaz.
- `src/types/`: contratos tipados para contenido.
- `src/components/`: secciones, estados pendientes y fotografías reutilizables.
- `src/sections/`: portada y secciones del EPK.
- `src/layouts/`: navegación web y composición de impresión independiente.
- `src/styles/`: tokens y reglas globales; los componentes tienen CSS propio.
- `public/media/`: fotografías y portadas aprobadas. Usar rutas como `media/foto.jpg`, sin barra inicial, y alt ES/EN.
- `docs/branding/`: referencia visual original y decisiones de diseño.

Los componentes consumen datos compartidos. El idioma actualiza el atributo HTML `lang`. Las imágenes secundarias usan lazy loading; portada e impresión cargan inmediatamente. No se cargan reproductores externos.

## PDF

Abrir `?print=1` o `?print=1&lang=en` y pulsar **Imprimir / Guardar como PDF**. Elegir A4, escala 100% y desactivar encabezados/pies del navegador. El botón web abre esta vista, no descarga un PDF preexistente.

La vista usa componentes específicos, datos compartidos, enlaces HTML clicables, `@page` y saltos editoriales. No es una captura de pantalla. Al añadir mucho contenido, revisar la paginación y ajustar bloques; no se presupone que cualquier longitud quepa en dos páginas. La URL permite automatizar después con Playwright sin introducirlo como dependencia ahora.

## GitHub Pages

Esta carpeta es la raíz del repositorio. El workflow `.github/workflows/deploy.yml` se ejecuta en push a `main` o manualmente, instala dependencias, verifica TypeScript, compila y publica `dist` con acciones oficiales de Pages.

1. Revisar todos los TODO antes de publicar y conservar el lockfile.
2. En GitHub: Settings → Pages → Source → **GitHub Actions**.
3. Subir los archivos a `main` del repositorio autorizado.
4. Revisar Actions y abrir `https://USERNAME.github.io/REPOSITORY/`.

Vite usa `base: './'`: los recursos funcionan tanto en raíz como en subdirectorio sin codificar el nombre del repositorio. Para base absoluta, usar `base: '/REPOSITORY/'`; para dominio propio o repositorio `USERNAME.github.io`, usar `/`. El componente Media añade `import.meta.env.BASE_URL` a las rutas de fotos; la impresión usa query string y no necesita fallback de rutas.

Referencias: [Vite](https://vite.dev/guide/static-deploy.html#github-pages), [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). No se incluyen credenciales ni se realizan operaciones remotas de GitHub.

## Próxima iteración

Confirmar biografías ES/EN; incorporar correo de booking, perfiles oficiales, fotos, portadas, lanzamientos, sets e hitos verificables. Proporcionar logos exportados y fuentes con sus licencias. Revisar móvil/tablet/escritorio, teclado y paginación A4 con contenido real; luego refinar motion y considerar exportación automatizada.
# Fotografías Press

Agrega JPG, JPEG, PNG o WebP a `media/press/` (fuera de `public`). La galería
detecta los archivos sin mantener una lista de nombres en el código y los ordena
por nombre; puedes usar prefijos `01-`, `02-` si necesitas controlar el orden.
Durante `npm run dev` se actualiza al agregar, modificar o quitar fotos. Para
actualizar el sitio publicado, vuelve a compilar y desplegar.

Vite convierte cada foto a WebP con calidad 80, corrige la orientación y limita
el lado más largo a 1600 px, sin ampliar fotos pequeñas ni conservar metadatos.
Solo esas versiones se incluyen en la web; los originales permanecen en
`media/press/`. No hay botones de descarga.
