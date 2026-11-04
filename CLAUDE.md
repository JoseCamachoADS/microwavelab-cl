# Electrónica Micro Wave Lab — Contexto del proyecto

Portal web profesional de **Electrónica Micro Wave Lab**, servicio técnico especializado en reparación de placas electrónicas y equipos electrónicos (el foco es todo a nivel industrial; también equipos automotrices, médicos y otros equipos industriales; no se atienden equipos domésticos). Chile. **Más de 45 años de trayectoria. 6 meses de garantía en las reparaciones.**

Idioma de la interfaz y del contenido: **español neutro y formal (trato de usted), tono corporativo B2B para empresas**; el inglés y el alemán siguen el mismo registro (negocios / Sie). No inventar cifras, certificaciones ni promesas. Moneda: CLP. Zona horaria: America/Santiago.

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

0. **Pendiente de recepción** *(solo si el cliente se autorregistra)* — ver "Autorregistro del cliente" más abajo. No aparece en la línea de tiempo pública.
1. **Recepción** — se crea la orden y la cuenta del cliente (solo con correo al inicio). Al confirmarla se genera el **código QR** de la etiqueta y el comprobante de ingreso.
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

## Formulario de ingreso (reemplaza al Google Form actual)

Hoy se usa un Google Form con: nombre, teléfono (obligatorio), correo (opcional), tipo, marca, modelo, serie, "acción", condiciones, fecha, fotos, recepcionista, hora, sucursal y comentarios. Solo 20 respuestas desde 2023, porque muchos clientes dejan el equipo sin pasar por el formulario y después hablan por WhatsApp. Problemas detectados: campos mezclados (marca en "tipo", modelo en "marca"), correo completo solo en el 55 %, teléfonos sin formato único, fecha/hora/sucursal escritas a mano.

Diseño del ingreso en el panel (iPhone):
- Se llenan solos: fecha, hora, sucursal y quién recibe.
- Cliente: teléfono primero (si ya existe, se autocompleta); correo siempre, con opción "no tiene" (entonces el seguimiento va por WhatsApp). **RUT: opcional.** Si se escribe, se valida con `rutValido` (`src/lib/utilidades.ts`) y se guarda normalizado (`12345678-5`). Si el dígito verificador no calza, se avisa y se deja corregir o dejar en blanco; nunca bloquea el ingreso. Si el RUT ya existe en otro cliente, se sugiere "¿Es el mismo cliente?" en vez de crear un duplicado. Sirve más adelante para boleta o factura electrónica. El RUT es un dato personal: solo lo ven quienes ven esa orden y solo el administrador lo exporta.
- Equipo: tipo con botones, marca, modelo, serie (con foto de la etiqueta).
- Falla que reporta el cliente (admite dictado por voz), accesorios que deja (casillas), estado físico (opciones rápidas + nota), fotos con la cámara.
- **Ingreso rápido**: con solo teléfono y tipo de equipo se crea la orden en menos de 20 segundos; el resto se completa después o lo completa el cliente.

### QR de la etiqueta

- Al confirmar la recepción se genera un QR para imprimir (AirPrint desde el iPhone) y pegar en el equipo. La etiqueta muestra número de orden, fecha y el QR.
- El QR contiene solo la dirección con `codigoQr` aleatorio (nunca el número correlativo ni datos del cliente).
- Escaneado por el técnico con sesión iniciada: abre la orden en el panel. Escaneado por cualquier otra persona: solo ve la página de ingreso al portal, sin datos.
- El mismo QR va en el comprobante enviado al cliente.

### Autorregistro del cliente

Para clientes que dejan el equipo y luego solo hablan por WhatsApp, o cuando el técnico no alcanza a completar el ingreso:
1. En el panel, botón **"Enviar formulario al cliente"**: el técnico escribe el teléfono (o correo) y se genera un enlace.
2. Por WhatsApp: se abre `wa.me` con el mensaje y el enlace ya escritos, y el técnico lo envía desde su propio WhatsApp (sin costo de API). Por correo: se envía desde el sistema.
3. El cliente abre el enlace en su celular y completa nombre, teléfono, correo, datos del equipo, falla, fotos y accesorios, y acepta las condiciones. La publicidad es una casilla aparte, opcional.
4. Se crea la orden en estado **PRE_INGRESO** (origen CLIENTE) y el técnico recibe un aviso.
5. Cuando el equipo llega, el técnico revisa los datos, completa el **estado físico** (lo constata él, no el cliente) y presiona **"Confirmar recepción del equipo"**: pasa a RECEPCION y se genera el QR.

Seguridad del enlace (modelo `EnlaceIngreso`): token aleatorio largo, un solo uso, caduca (propuesta: 7 días), límite de intentos, tamaño máximo de fotos, y no precarga datos personales de ninguna persona.

## Usuarios, roles y permisos del panel

Definidos en `src/lib/permisos.ts` (fuente única de verdad). Se comprueban **siempre en el servidor**, no solo ocultando botones.

| Acción | Administrador | Técnico | Recepcionista |
|---|---|---|---|
| Ingresar equipos (formulario) | Sí | Sí | Sí |
| Enviar formulario de autorregistro al cliente | Sí | Sí | Sí |
| Confirmar recepción física (genera QR) | Sí | Sí | Sí |
| Ver órdenes | Todas | Todas | Solo las que ella recibió |
| Editar órdenes | Todas | Todas | Solo las suyas, mientras estén en Pendiente de recepción o Recepción |
| Cambiar estado (revisión, diagnóstico, reparación, entrega) | Sí | Sí | No |
| Presupuestos, repuestos | Sí | Sí | No |
| Ver pagos | Sí | Sí | No |
| Ver todos los clientes y el resumen del taller | Sí | Sí | No |
| Campañas y publicidad | Sí | No | No |
| Exportar datos | Sí | No | No |
| Configuración del sistema | Sí | No | No |
| Crear, desactivar usuarios | Sí | No | No |

Supuestos tomados a partir de lo pedido (confirmar con el dueño): el administrador puede hacer todo lo del técnico; la recepcionista también confirma la recepción del equipo y puede enviar el enlace de autorregistro; el técnico ve pagos pero no exporta datos.

### Ingreso al panel

- Cuentas creadas solo por el administrador (correo, nombre y rol). Los usuarios se **desactivan**, no se borran, para conservar el historial.
- Ingreso con un **código de 6 dígitos enviado al correo**, que se escribe dentro de la app. No usar enlace por correo para el personal: en iPhone, un enlace del correo se abre en Safari y no en la app instalada, y la sesión no se comparte entre ambos.
- Sesión larga (propuesta: 30 días) para no pedir el código cada día. Más adelante, ingreso con Face ID mediante llaves de acceso (passkeys).
- Todo cambio queda registrado con el usuario que lo hizo (historial de estados y ediciones).
- Primer administrador: lo crea el dueño con un procedimiento de instalación, no desde la pantalla pública.

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
- Horario: lunes a jueves, 10:00 a 19:00; viernes, 10:00 a 13:00
- LinkedIn: https://cl.linkedin.com/company/electr%C3%B3nica-micro-wave-lab
- Dominio: electronicamicrowavelab.cl (hosting en Vercel)
- Descripción oficial: laboratorio electrónico; reparación de tarjetas electrónicas, computadoras, monitores táctiles, módulos I/O, fuentes de alimentación, cargadores e inversores; servicio de diagnóstico; atención personalizada.
- Ficha de Google Maps: ver `empresa.urlGoogle` en `src/lib/empresa.ts` (se usa en "Cómo llegar" y en reseñas).
- Reseñas de Google: integradas con Places API (New) en `src/lib/resenas.ts` y `src/components/Resenas.tsx`. Requiere `GOOGLE_PLACES_API_KEY` y `GOOGLE_PLACE_ID` (ver `.env.example`). Sin esas variables el sitio muestra solo un enlace a la ficha.
- Pendiente: correo corporativo, logo y fotos (van en `public/`), clave de API y Place ID de Google.

## Diseño visual (rediseño corporativo)

- Colores tomados del logo: rojo `#E73338` (botones usan `rojo-accion` `#C8232A` por contraste), azul `#414290`, negro `#222021`; fondos oscuros `noche` `#15173F`; neutros `hielo`, `grisazul`. Definidos en `tailwind.config.ts`.
- Tipografías: Chakra Petch (títulos, variable `--font-titulo`) + IBM Plex Sans (texto, `--font-cuerpo`), cargadas con `next/font` en `layout.tsx`.
- Motivo firma: el doble rayo del logo (`components/Rayo.tsx`, `public/logo/rayo.svg`), bordes diagonales entre secciones (`.corte-abajo`, `.corte-arriba`, `.tras-corte`, `.antes-corte` en `globals.css`) y esquinas cortadas (`.panel`, botones).
- Regla CSS: la sección que vecina a un corte necesita `tras-corte`/`antes-corte`; no usar `py-*` en secciones con corte (pisa el padding).
- Animación solo en la portada (`anim-*`); respeta `prefers-reduced-motion`.
- Logos: `public/logo/` (color, reverso para fondo oscuro, blanco, íconos). Waze y LinkedIn: logos oficiales NO se dibujan; se descargan de sus páginas de marca a `public/logos/` y se registran en `logosExternos` (`lib/empresa.ts`). Mientras sean `null` se muestra un ícono genérico.

## Idiomas (v1.3.0)

- Español en `/` (sin prefijo), inglés en `/en`, alemán en `/ger`. Las páginas viven en `src/app/[lang]/`; `src/middleware.ts` reescribe `/servicios` a `/es/servicios` por dentro.
- Textos en `src/i18n/es.ts` (fuente del tipo), `en.ts` y `ger.ts`. Sin funciones en el diccionario: se usan `{variables}` con `fmt()`, para poder pasarlos a componentes cliente.
- Enlaces internos siempre con `ruta(lang, "/camino")` (`src/i18n/config.ts`). Metadatos de página con `metaPagina()` (`src/i18n/meta.ts`), que agrega hreflang.
- Los datos de la empresa (`empresa.ts`) siguen siendo únicos; solo los textos se traducen.
- El panel del técnico (`/panel`) será solo en español.

## Seguridad del formulario y uso de APIs (v1.6.0)

- Captcha: Cloudflare Turnstile. Widget en `src/components/Turnstile.tsx`; el servidor lo verifica en `src/lib/turnstile.ts`, llamado desde `src/app/api/traducir/route.ts` (que recibe `{token, idioma, texto}`). Sin claves (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`) queda desactivado. Todo envío futuro por correo debe pasar por esa misma verificación.
- Todo servicio externo nuevo debe registrarse con `registrarUso()` (`src/lib/uso-api.ts`) y agregarse a `SERVICIOS`. Nunca registrar datos de personas (IP, textos, correos).
- `/uso` y `/api/uso` muestran el consumo; se protegen con `USO_API_TOKEN`. Pasarán al panel del administrador.
- Tope mensual de traducción: `LIMITE_TRADUCCION_CARACTERES_MES` (por defecto 400000).

## Multimedia y cinta de empresas (v1.7.0)

- `/multimedia`: fotos en `public/galeria/` y publicaciones de LinkedIn, todo registrado en `src/lib/galeria.ts` (fotos con texto en es/en/ger; publicaciones por `urn:li:share:...`). El menú, el pie y el sitemap muestran el enlace solo si hay contenido (`hayMultimedia`).
- LinkedIn nunca se carga sin que la persona pulse el botón (`PublicacionesLinkedIn.tsx`); no agregar scripts de LinkedIn al cargar la página. No se puede leer LinkedIn de forma automática.
- Empresas que confían: `CarruselClientes.tsx` + clases `.carrusel*` en `globals.css`. Tarjetas hielo con esquinas cortadas que avanzan solas (cada tarjeta 12 rem + 2 rem de separación; la pista se desplaza justo una copia). Debe poder pausarse y respetar "reducir movimiento". La lista está en `clientes` de `src/lib/empresa.ts`.

## Aviso de pizarra electrónica y encabezado (v1.9.0)

- `AvisoPizarra.tsx` (franja arriba de todo el sitio, letras de puntos que se desplazan, con pausa) se muestra desde `layout.tsx` si el aviso está encendido. El texto vive en Upstash Redis (clave `aviso`) y se edita en `/aviso` (clave `USO_API_TOKEN`, ver `src/lib/admin.ts`); sin Redis o sin nada guardado vale `avisoInicial` de `src/lib/aviso.ts`. El sitio lo relee cada 60 s y al guardar se actualiza al instante (`revalidatePath`). Al guardar, el inglés y el alemán vacíos se traducen solos (`traducirTexto`, cuenta en `/uso`).
- Encabezado: el menú de escritorio aparece desde 1280 px (`xl`); debajo, menú móvil. Los enlaces no se parten en dos líneas (`whitespace-nowrap`) y el botón usa el texto corto `nav.portalCorto`. Al agregar un enlace nuevo al menú, revisar que quepa a 1280 px.
- Horario: lunes a jueves 10:00 a 19:00, viernes 10:00 a 13:00 (`i18n/*.ts`, `empresa.ts` y datos estructurados de `layout.tsx`).

## Clics en WhatsApp (v1.14.0)

- `ClicsWhatsApp.tsx` (en `layout.tsx`) cuenta los clics en enlaces de WhatsApp y envía `{origen, dispositivo}` a `/api/clics`; se guarda en Redis (`src/lib/clics.ts`) y se ve en `/uso`. Todo enlace de WhatsApp nuevo debe llevar `data-clic="..."` (registrar el nombre en `ORIGENES`). Nunca guardar IP ni identificadores.
