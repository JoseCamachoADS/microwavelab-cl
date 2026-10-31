# Micro Wave Lab CL

Portal web de Micro Wave Lab CL. Lee `CLAUDE.md` para el contexto completo (flujo de estados, reglas del panel móvil, stack y fases).

## Puesta en marcha (en tu computador)

Requisitos: Node.js 20 o superior.

```bash
cd microwavelab-cl
npm install
npm run dev
```

Abre http://localhost:3000.

> Esta base se escribió sin poder ejecutar `npm install` ni `npm run build` (la sesión donde se creó no tenía acceso al registro de npm). Si `npm run build` muestra algún error, corrígelo con Claude Code en esa carpeta antes de seguir.

## Antes de publicar

1. Completar los datos reales en `src/lib/empresa.ts` (teléfono, WhatsApp, correo, dirección, horario, URL de Google).
2. Agregar logo y fotos en `public/` y usarlos en la portada.
3. Conectar las reseñas reales de Google (fase 1 final).

## Publicación (hosting administrado)

1. Subir el proyecto a un repositorio de GitHub.
2. Crear cuenta en Vercel e importar el repositorio (despliegue automático).
3. Comprar el dominio `.cl` en NIC Chile y apuntarlo a Vercel (Vercel muestra los registros DNS a configurar).
4. Cuando llegue la fase 2: crear una base de datos en Neon y cargar `DATABASE_URL` en las variables de entorno de Vercel.
5. Correo corporativo (contacto@tudominio.cl): Google Workspace o Zoho Mail.

## Estructura

```
src/app/            páginas (inicio, servicios, contacto, portal)
src/components/     encabezado y pie de página
src/lib/empresa.ts  datos de la empresa y servicios
src/lib/estados.ts  flujo de la orden (incluye solicitud de repuesto)
docs/schema.prisma  borrador de la base de datos (fase 2)
```
