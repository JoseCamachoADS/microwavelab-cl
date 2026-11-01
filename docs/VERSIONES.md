# Micro Wave Lab CL: registro de versiones

Este documento es la base del proyecto. Cada mejora nueva se agrega como una versión nueva al principio de la lista, sin borrar las anteriores.

**Cómo se numeran las versiones** (`MAYOR.MENOR.PARCHE`):
- **MAYOR**: llega una fase completa (por ejemplo, el panel del técnico).
- **MENOR**: se agrega una función o mejora visible.
- **PARCHE**: corrección pequeña, sin funciones nuevas.

**Cómo cerrar una versión:** actualizar este archivo y luego, en la terminal:
`git add .` · `git commit -m "v1.1.0: descripción"` · `git tag v1.1.0` · `git push --tags` · `git push`

---

## v1.5.0: Formularios siempre en español para el equipo (01-11-2026)

### Qué cambió
- El mensaje que llega a WhatsApp es **siempre en español**: la estructura, el motivo, el tipo de equipo y la urgencia salen en español aunque el cliente use el sitio en inglés o alemán.
- El texto libre de la falla se **traduce al español** (Google Cloud Translation) y se agrega debajo el **texto original** del cliente, indicando en qué idioma lo escribió.
- Si la traducción no está disponible, el mensaje se envía igual con el original, marcado como "sin traducir".
- En inglés y alemán el cliente **revisa el mensaje** antes de abrir WhatsApp.
- La ruta interna `/api/traducir` solo responde a este sitio, limita los textos a 1.000 caracteres y las solicitudes por visitante.
- `/privacidad` informa que el texto de la falla pasa por el servicio de traducción de Google y que no se guarda.
- La función de traducción (`src/lib/traducir.ts`) se reutilizará al enviar los formularios por correo.

### Para activarlo
1. Google Cloud Console (el mismo proyecto de las reseñas) → APIs y servicios → activar **Cloud Translation API**.
2. Credenciales → crear una **clave de API** nueva, restringida a "Cloud Translation API".
3. Cargarla como `GOOGLE_TRANSLATE_API_KEY` en `.env.local` y en Vercel, y redesplegar.
Costo: Google ofrece una cuota gratuita mensual de caracteres; para el volumen de un taller debería ser ínfimo. Confirmar la tarifa vigente en Google Cloud.

---

## v1.4.0: Servicio técnico industrial y empresas que confían (01-11-2026)

### Qué se agregó
- **Página "Servicio técnico industrial"** (`/servicio-tecnico`, `/en/servicio-tecnico`, `/ger/servicio-tecnico`) con *Alcance* y *Lo que usted gana*, y la lista de equipos que se atienden. Idea tomada de la estructura de servicio técnico de otras empresas del rubro; los textos son propios y solo prometen lo que ya ofrecemos (diagnóstico antes del presupuesto, garantía, experiencia, seguimiento por etapas).
- **Formulario de cotización** con nombre, empresa, teléfono, correo, motivo (reparación, garantía o postventa, consulta general, sugerencias o reclamos), tipo de equipo, marca y modelo, falla y urgencia. Por ahora arma el mensaje y abre WhatsApp; no guarda ni envía datos a ningún servidor. Cuando exista el correo corporativo y el servicio de envío, pasará a enviarse por correo.
- **Empresas que confían en nosotros** en la portada (Metalúrgica Silcosil, Ingeprover Ingeniería, RRH Mantenciones, Hormigones Móviles, Miski Kakawa y Equiambiente), autorizadas por el dueño. Se muestran por nombre hasta tener sus logos (`clientes` en `src/lib/empresa.ts`, logos en `public/clientes/`).
- Enlaces nuevos en el pie, en la página de servicios y en contacto; la página entra al mapa del sitio en los tres idiomas.

### Pendiente
- Logos de las empresas clientes.
- Nombre completo de System Servicios Eléctricos (cortado en el listado) y confirmar si se muestran personas naturales.
- Reemplazar el envío por WhatsApp por envío por correo (requiere correo corporativo y Resend o Brevo).

---

## v1.3.0: Sitio en tres idiomas (01-11-2026)

### Qué se agregó
- **Español** en la raíz (`/`), **inglés** en `/en` y **alemán** en `/ger`. Cada página existe en los tres idiomas con la misma estructura (`/servicios`, `/en/servicios`, `/ger/servicios`).
- **Selector de idioma** (ES, EN, DE) en el encabezado, en el menú del celular y en el pie. Lleva a la misma página en el otro idioma.
- **Google entiende los idiomas:** cada página declara sus versiones equivalentes (hreflang) y el mapa del sitio las lista. El alemán usa la ruta `/ger`, que se declara a Google como alemán (`de`).
- Todos los textos están en `src/i18n/` (`es.ts`, `en.ts`, `ger.ts`). Si falta una clave en un idioma, el proyecto no compila: así no quedan textos sin traducir.
- Mapa, reseñas de Google, aviso de cookies, contador, privacidad y avisos de WhatsApp también cambian de idioma. Las reseñas se muestran en el idioma original en que se escribieron.
- Nuevo `src/middleware.ts` que atiende las rutas por idioma.

### Cómo agregar o cambiar un texto
Editar la misma clave en los tres archivos de `src/i18n/`. Para un idioma nuevo: crear su archivo, agregarlo a `IDIOMAS` en `config.ts` y a `index.ts`.

### Nota de actualización
Las páginas pasaron de `src/app/` a `src/app/[lang]/`. Hay que borrar los archivos antiguos con `git rm` (ver las instrucciones de entrega de esta versión).

### Pendiente
- Revisión de las traducciones por una persona nativa (especialmente el alemán).
- La página de seguimiento y el futuro panel quedan por ahora solo en español en su funcionamiento interno.

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
