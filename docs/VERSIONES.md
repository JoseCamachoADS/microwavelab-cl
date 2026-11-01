# Micro Wave Lab CL: registro de versiones

Este documento es la base del proyecto. Cada mejora nueva se agrega como una versión nueva al principio de la lista, sin borrar las anteriores.

**Cómo se numeran las versiones** (`MAYOR.MENOR.PARCHE`):
- **MAYOR**: llega una fase completa (por ejemplo, el panel del técnico).
- **MENOR**: se agrega una función o mejora visible.
- **PARCHE**: corrección pequeña, sin funciones nuevas.

**Cómo cerrar una versión:** actualizar este archivo y luego, en la terminal:
`git add .` · `git commit -m "v1.1.0: descripción"` · `git tag v1.1.0` · `git push --tags` · `git push`

---

## v1.2.0: Contador de visitas (01-11-2026)

### Qué se agregó
- Contador de visitas en el pie de página, con dígitos en tarjetas con esquina cortada y línea roja.
- Cuenta una vez por sesión del visitante, sin cookies ni datos personales; los robots conocidos no cuentan y `/portal` y `/panel` quedan fuera.
- Se guarda en Upstash Redis (plan gratuito, desde Vercel → Storage). Sin la conexión, el contador no se muestra.
- Se muestra desde la primera visita (`UMBRAL_MOSTRAR = 0` en `src/components/ContadorVisitas.tsx`; se puede subir para ocultarlo al inicio).
- Nueva ruta interna `/api/visitas` y sección en `/privacidad`.

### Para activarlo
1. Vercel → proyecto → **Storage** → crear base **Upstash Redis** (plan gratuito) y conectarla al proyecto. Vercel agrega solo las variables `KV_REST_API_URL` y `KV_REST_API_TOKEN`.
2. Redesplegar el último despliegue.

---

## v1.1.0: Medición del sitio (01-11-2026)

### Qué se agregó
- **Google Analytics 4** y **Microsoft Clarity** (versiones gratuitas), cargados solo si el visitante acepta el aviso de cookies.
- **Informes en Looker Studio** conectados a GA4 (guía paso a paso en `docs/ANALITICA.md`).
- **Eventos de clic** hacia WhatsApp, teléfono, Waze, Google Maps, LinkedIn y correo.
- **Aviso de cookies** y página `/privacidad` (enlazada en el pie y en el mapa del sitio).
- Las páginas `/portal` y `/panel` quedan excluidas de la medición.
- Variables nuevas: `NEXT_PUBLIC_GA_ID` y `NEXT_PUBLIC_CLARITY_ID`.

### Pendiente
- Crear las cuentas de GA4 y Clarity, cargar los dos IDs en Vercel y volver a desplegar.
- Revisar con un abogado el texto de `/privacidad` y el aviso de cookies.

---

## v1.0.0: Base inicial, sitio público (31-10-2026)

Primera versión estable. Sitio público en línea en https://electronicamicrowavelab.cl con identidad corporativa completa.

### Qué incluye
- **Páginas:** Inicio, Servicios, Cómo trabajamos, Contacto y Seguimiento de mi equipo (esta última es un aviso, aún sin función).
- **Identidad visual:** colores del logo (rojo `#E73338`, azul `#414290`, negro `#222021`), tipografías Chakra Petch e IBM Plex Sans, el doble rayo del logo como motivo, bordes diagonales entre secciones y esquinas cortadas en botones y tarjetas.
- **Logo:** versiones PNG en color, para fondo oscuro y en blanco; íconos de la pestaña y de iPhone; imagen para compartir el enlace.
- **Contacto y ubicación:** WhatsApp (botón flotante), teléfono, mapa de Google embebido y botones "Cómo llegar" con Google Maps y Waze.
- **Reseñas de Google:** se muestran dentro del sitio con Places API (New). Se actualizan una vez al día.
- **Encabezado y pie:** barra con horario y teléfono, menú de celular, llamado a contactar, enlaces de LinkedIn y Waze.
- **Posicionamiento:** datos estructurados de negocio local, `robots` y `sitemap`.
- **Base técnica del panel (aún sin pantallas):** estados de una orden (`src/lib/estados.ts`), roles y permisos (`src/lib/permisos.ts`), validación de RUT (`src/lib/utilidades.ts`) y esquema de base de datos borrador (`docs/schema.prisma`).

### Datos de la empresa
Se editan en un solo lugar: `src/lib/empresa.ts` (teléfono, dirección, horario, años de trayectoria, garantía, enlaces).

### Tecnología y publicación
- Next.js 15, React 19, TypeScript, Tailwind CSS 3.4.
- Alojado en Vercel; repositorio `JoseCamachoADS/microwavelab-cl`; dominio en NIC Chile con los servidores de nombres de Vercel.
- Variables de entorno (en `.env.local` y en Vercel): `GOOGLE_PLACES_API_KEY` y `GOOGLE_PLACE_ID`. Sin ellas el sitio muestra solo un enlace a la ficha de Google.

### Pendiente de esta base
- Correo corporativo (hoy figura "PENDIENTE" y no se muestra en el sitio).
- Fotos del taller en `public/fotos`.
- Logos oficiales de Waze y LinkedIn en `public/logos/`, registrados en `logosExternos` (`src/lib/empresa.ts`). Mientras tanto los botones muestran un ícono genérico.
- Formulario de cotización (hoy el sitio indica escribir por WhatsApp o llamar).
- Revisión visual del rediseño en computador y en iPhone.

### Próximas versiones previstas
| Versión | Contenido |
|---|---|
| v1.1.0 | Ajustes del rediseño tras la revisión, logos oficiales, fotos, correo corporativo |
| v2.0.0 | Panel del técnico (iPhone): ingreso de equipos con etiqueta QR, estados, usuarios y roles |
| v3.0.0 | Portal de clientes: ingreso con correo, seguimiento y avisos por correo |
| v4.0.0 | Pago con Webpay Plus y campañas |

Los diseños de cada fase están en `CLAUDE.md`.
