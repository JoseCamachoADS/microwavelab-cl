# Micro Wave Lab CL — Contexto del proyecto

Portal web profesional de **Micro Wave Lab CL**, servicio técnico especializado en reparación de placas electrónicas y equipos electrónicos (industriales como foco principal; también domésticos, automotrices, médicos y otros). Chile. **Más de 45 años de trayectoria. 6 meses de garantía en las reparaciones.**

Idioma de la interfaz y del contenido: **español de Chile**. Moneda: CLP. Zona horaria: America/Santiago.

## Tres partes en un solo proyecto (Next.js)

1. **Sitio público** (`/`): información corporativa, servicios, trayectoria, reseñas de Google, contacto/WhatsApp, cotización. SEO local.
2. **Portal de clientes** (`/portal`): ingreso con correo (enlace mágico, sin contraseñas), línea de tiempo del equipo, aceptar/rechazar presupuesto, pago en línea con Webpay Plus.
3. **Panel del técnico** (`/panel`): **mobile-first**, para una persona adulta (62 años) que opera desde el celular.

## Regla de oro del panel del técnico

Diseñar para uso rápido con una mano, en el celular:
- Texto mínimo 18 px, botones mínimo 56 px de alto, alto contraste.
- Un solo objetivo por pantalla. Pocos campos. Sin menús escondidos.
- Meta: **ingresar un equipo en menos de 1 minuto** (correo del cliente, foto con la cámara, marca/modelo, falla).
- Cambiar de estado con **un botón grande** ("Pasar a Diagnóstico").
- Instalable como app (PWA).
- Confirmar siempre las acciones que notifican al cliente.

### Dispositivo objetivo: iPhone 15 Pro (Safari / iOS)

- Se instala desde Safari con Compartir → "Agregar a pantalla de inicio" (en iOS no hay botón de instalación automático). Incluir `manifest` y los íconos de app (180×180 para iOS) y mostrar una guía corta de instalación dentro del panel.
- Respetar las zonas seguras (Dynamic Island y barra inferior): usar `env(safe-area-inset-top/bottom)` y `viewport-fit=cover`. Pantalla de referencia: 393 × 852 puntos.
- Todo campo de texto con fuente de **16 px o más**; si no, Safari hace zoom automático al escribir.
- Fotos del equipo: `<input type="file" accept="image/*" capture="environment">` abre la cámara trasera. Reducir el tamaño de la foto antes de subirla.
- Altura de pantalla con `100dvh` (no `100vh`) por la barra de Safari.
- Las notificaciones push web en iOS solo funcionan con la app instalada en la pantalla de inicio; el aviso principal al cliente sigue siendo el correo.
- Probar siempre en el celular real, no solo en el navegador del computador.

## Flujo de una orden (estados)

Definido en `src/lib/estados.ts`. Es la fuente única de verdad.

1. **Recepción** — se crea la orden y la cuenta del cliente (solo con correo al inicio).
2. **Revisión**
3. **Diagnóstico**
4. **Presupuesto** — se envía al cliente.
5. **Decisión del cliente** — acepta o rechaza. Si acepta, puede **pagar en línea (Webpay Plus)**.
6. **Solicitud de repuesto** *(solo si hace falta)* — a veces el repuesto se pide fuera del país y demora. Subestados: cotizando, pedido realizado, en tránsito, en aduana, recibido. Mostrar al cliente una fecha estimada y permitir actualizarla.
7. **Reparación**
8. **Pruebas**
9. **Listo para retiro**
10. **Entregado** (cierra la orden; inicia el período de garantía)

Estados de salida: **Rechazado** (el cliente no acepta el presupuesto; equipo se devuelve) y **Sin reparación**.

Cada cambio de estado: se registra en historial (quién, cuándo) y se envía aviso por correo al cliente.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- PostgreSQL + Prisma (esquema borrador en `docs/schema.prisma`)
- Webpay Plus con SDK oficial `transbank-sdk` (ambiente de integración al desarrollar)
- Correos transaccionales y campañas: Resend o Brevo
- Fotos: Cloudflare R2 o S3
- Reseñas de Google: Google Places API (o widget de terceros en fase 1)
- Hosting: **Vercel + Neon** (administrado). Dominio `.cl` en NIC Chile.

## Legal y negocio

- Campañas y publicidad: **consentimiento expreso** (casilla al crear la cuenta) y enlace de baja en cada correo. Las cuentas las crea el técnico, así que el consentimiento se confirma por correo (doble confirmación) antes de enviar publicidad.
- Los avisos de estado de la orden son transaccionales y se envían siempre.
- Webpay no emite boleta/factura: planificar integración con un facturador (Bsale, Haulmer, etc.).
- Nunca guardar datos de tarjetas. Webpay los maneja.

## Fases

- **Fase 1**: sitio público (esta carpeta ya tiene la base)
- **Fase 2**: panel del técnico + órdenes + estados
- **Fase 3**: portal de clientes + notificaciones por correo
- **Fase 4**: Webpay Plus + campañas
- **Después**: WhatsApp, QR en etiquetas, PDF de orden de ingreso, facturación electrónica

## Convenciones

- Componentes en `src/components`, lógica en `src/lib`.
- Datos de la empresa (teléfono, correo, dirección, años, horario) viven en `src/lib/empresa.ts`. El correo corporativo sigue PENDIENTE.
- No inventar reseñas, certificaciones ni cifras. Todo dato de la empresa debe venir del dueño.

## Datos de contacto (entregados por el dueño)

- Teléfono principal: +56 9 6418 3027 (llamadas, SMS, WhatsApp y llamadas por WhatsApp)
- Dirección: General Freire 80, La Cisterna, Región Metropolitana, Santiago de Chile
- Horario: lunes a viernes, 10:00 a 19:00
- LinkedIn: https://cl.linkedin.com/company/electr%C3%B3nica-micro-wave-lab
- Dominio: electronicamicrowavelab.cl (hosting en Vercel)
- Descripción oficial: laboratorio electrónico; reparación de tarjetas electrónicas, computadoras, monitores táctiles, módulos I/O, fuentes de alimentación, cargadores e inversores; servicio de diagnóstico; atención personalizada.
- Ficha de Google Maps: ver `empresa.urlGoogle` en `src/lib/empresa.ts` (se usa en "Cómo llegar" y en reseñas).
- Reseñas de Google: integradas con Places API (New) en `src/lib/resenas.ts` y `src/components/Resenas.tsx`. Requiere `GOOGLE_PLACES_API_KEY` y `GOOGLE_PLACE_ID` (ver `.env.example`). Sin esas variables el sitio muestra solo un enlace a la ficha.
- Pendiente: correo corporativo, logo y fotos (van en `public/`), clave de API y Place ID de Google.
