# Micro Wave Lab CL — Contexto del proyecto

Portal web profesional de **Micro Wave Lab CL**, servicio técnico especializado en reparación de placas electrónicas y equipos electrónicos (industriales como foco principal; también domésticos, automotrices, médicos y otros). Chile. **Más de 40 años de trayectoria.**

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
- Datos de la empresa (teléfono, correo, dirección, años) viven en `src/lib/empresa.ts`. **Completar los datos reales antes de publicar.**
- No inventar reseñas, certificaciones ni cifras. Todo dato de la empresa debe venir del dueño.
