# CV de Robinson Pacheco

Currículum web de una sola página, construido con React y Vite. Incluye
experiencia, proyectos, formación, certificados descargables en PDF y
habilidades, con tema claro/oscuro y descarga del CV completo.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run lint     # oxlint
npm run build    # genera dist/
npm run preview  # sirve dist/ para revisarlo
```

## Despliegue

El sitio se publica en Cloudflare Pages desde la rama `main`:

- Comando de compilación: `npm run build`
- Directorio de salida: `dist`

## Estructura

- `src/components/CV.jsx` — todo el contenido del CV (datos y componentes).
- `src/App.css` — estilos y variables de tema.
- `public/` — foto, favicon y los PDF del CV y los certificados.
