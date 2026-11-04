# Micro Wave Lab CL: registro de versiones

Este documento es la base del proyecto. Cada mejora nueva se agrega como una versión nueva al principio de la lista, sin borrar las anteriores.

**Cómo se numeran las versiones** (`MAYOR.MENOR.PARCHE`):
- **MAYOR**: llega una fase completa (por ejemplo, el panel del técnico).
- **MENOR**: se agrega una función o mejora visible.
- **PARCHE**: corrección pequeña, sin funciones nuevas.

**Cómo cerrar una versión:** actualizar este archivo y luego, en la terminal:
`git add .` · `git commit -m "v1.1.0: descripción"` · `git tag v1.1.0` · `git push --tags` · `git push`

---

## v1.14.0: Contador de clics en WhatsApp por dispositivo (03-11-2026)

### Qué cambió
- **Contador propio** de clics en todos los botones de WhatsApp del sitio: botón flotante, botón de urgencias (rayo), portada, urgencia de la portada, pie de página, contacto, formulario y asistente. Se separa por **móvil** (incluye tablets) y **escritorio**, y por botón.
- **Se ve en `/uso`** (sección "Clics en WhatsApp"): hoy, este mes y mes pasado con % de móvil; ranking de botones del mes; y los últimos 14 días.
- **Anónimo**: solo suma números en Redis (como el contador de visitas). No guarda IP, cookies, identificadores ni textos, y **funciona aunque el visitante rechace las cookies de medición** (a diferencia de Google Analytics, que sigue registrando `clic_whatsapp` solo con consentimiento). Los robots y el exceso de clics desde una misma IP se ignoran.
- Nuevo párrafo en Privacidad (es/en/ger).
- Para que un botón nuevo quede identificado, agregarle `data-clic="nombre"` (y el nombre en `ORIGENES` de `src/lib/clics.ts`); si no, cuenta como "Otros enlaces de WhatsApp".
- Requiere Redis (Upstash) conectado. Sin Redis no se cuenta nada.

### Importante
El contador mide **clics en el botón**, no mensajes enviados: WhatsApp no informa al sitio si la persona terminó enviando el mensaje.

---

: Verificación de Google Search Console (02-11-2026)

- Se agrega `public/google075c232b68fa3654.html`, el archivo de verificación de la propiedad en Search Console. **No debe borrarse**: Google lo revisa de forma periódica. Queda en `https://electronicamicrowavelab.cl/google075c232b68fa3654.html` (el middleware de idiomas no lo toca porque tiene extensión).

---

## v1.13.1: Nombre de la empresa (02-11-2026)

- El nombre pasa a ser **"Electrónica Micro Wave Lab"** (sin "CL") en el título de la portada, el sufijo de los títulos de todas las páginas, el pie de página, los datos para Google, el asistente y los textos que lo mencionaban. El nombre vive en `nombre` y `nombreCompleto` de `src/lib/empresa.ts`.

---

## v1.13.0: Posicionamiento en buscadores (02-11-2026)

### Qué cambió
- **Título de la portada** con la palabra clave primero: "Reparación de tarjetas electrónicas industriales | Micro Wave Lab CL" (en inglés y alemán equivalentes). Descripción nueva con Santiago, módulos I/O, fuentes, inversores y monitores táctiles.
- **H1 de la portada** con la palabra clave: "Reparación de tarjetas electrónicas industriales para que su operación no se detenga".
- **Datos para Google (LocalBusiness)**: se agregan logo, imagen, mapa, zona de servicio (Región Metropolitana y Chile), temas de especialidad y catálogo de servicios.
- **Cobertura**: nueva pregunta frecuente "¿Atienden fuera de Santiago?" (Región Metropolitana; otras regiones con coordinación previa) y la sección de emergencias aclara la zona. El asistente lo sabe.
- **Monitores táctiles y pantallas industriales** menciona las pantallas de compresores (caso real de LinkedIn: cambio de pantalla táctil de un compresor Delcos XL).
- Pendiente (necesita información del técnico): páginas por servicio con marcas, equipos y fallas típicas.

### Para después de publicar
Search Console: verificar el dominio (DNS) y enviar `/sitemap.xml`; Bing Webmaster Tools; revisar la ficha de Google Business Profile (categoría, servicios, horario, descripción).

---

: Botón flotante de urgencias (02-11-2026)

- **Botón con rayo "Tengo una urgencia"**, fijo en todas las páginas, justo sobre el botón de WhatsApp (rojo corporativo con borde blanco; en pantallas angostas solo el rayo). Al pulsarlo abre WhatsApp con el mensaje de urgencia ya escrito, igual que el botón "Reportar una urgencia por WhatsApp" de la portada. Cuenta como clic de WhatsApp en Analytics. En español, inglés y alemán.

---

## v1.12.1: Reparaciones de emergencia y llamado a la acción (02-11-2026)

- **Nueva sección "Reparaciones de emergencia"** en la portada (debajo de los servicios): mensaje de continuidad operativa, tres puntos (atención prioritaria, reparación en sitio, atención personalizada), respaldo de más de 45 años y 6 meses de garantía, y dos botones: "Reportar una urgencia por WhatsApp" (con un mensaje de urgencia ya escrito) y "Llamar ahora". Ancla `#urgencias`. En español, inglés y alemán.
- **Llamado a la acción del pie de página** (aparece en todas las páginas): ahora "¿Problemas con su equipo industrial o especializado?", con el texto de atención personalizada y urgencias.
- El asistente virtual conoce el servicio de urgencias (sin prometer tiempos).

---

## v1.12.0: Textos corporativos para empresas (02-11-2026)

### Qué cambió
- Reescritura de los textos públicos con un tono profesional y corporativo, dirigido a empresas y a un público latinoamericano e internacional: español neutro y formal (trato de "usted", sin giros locales), inglés de negocios y alemán formal (Sie). Se mantienen intactos los datos reales (más de 45 años, 6 meses de garantía, dirección, horario, teléfono) y **no se agregó ninguna cifra, certificación ni promesa nueva**.
- **Portada**: nuevo título ("Recuperamos la electrónica que mantiene operando su empresa"), subtítulo, "Qué reparamos" (electrónica industrial, automotriz y médica), "Por qué elegirnos" y llamados a la acción ("Solicitar cotización por WhatsApp").
- **Servicios**: títulos y descripciones precisos y consistentes (reparación a nivel de componente; módulos I/O y electrónica industrial; fuentes de alimentación, cargadores e inversores; monitores táctiles y pantallas industriales; computadoras; otros equipos industriales).
- **Servicio técnico industrial**, **Cómo trabajamos** (incluye las etapas que verá el cliente), **Contacto**, **Seguimiento de equipos**, **preguntas frecuentes**, mensaje inicial de WhatsApp, aviso de cookies, descripción de la empresa y eslogan: "Laboratorio de electrónica industrial: reparación de tarjetas y equipos".
- Los textos de empresa.ts (usados por el asistente y los datos que lee Google) quedaron iguales a los del sitio.

---

## v1.11.2: Modelo por defecto y prueba de modelos alternativos (01-11-2026)

- El modelo por defecto pasa a `gemini-3.5-flash-lite` (el anterior ya no está disponible para claves nuevas).
- **Probar Gemini** ahora, si el modelo configurado falla, prueba otros modelos con la misma clave y muestra cuáles funcionan, para elegir el valor de `GEMINI_MODEL`. Un error 402 significa que el proyecto de Google tiene facturación prepago sin crédito: ese modelo no entra en el plan gratuito de esa clave.

---

## v1.11.1: Prueba de conexión con Gemini (01-11-2026)

### Qué cambió
- `/asistente` tiene el botón **Probar Gemini**: hace una consulta real y muestra la respuesta o el error exacto de Google. Si el modelo no existe (404), lista los modelos disponibles para la clave para copiarlos en `GEMINI_MODEL`.
- El máximo de salida sube a 1024 tokens para que un modelo que "piensa" antes de responder no devuelva una respuesta vacía.

---

## v1.11.0: Asistente virtual con Gemini (01-11-2026)

### Qué cambió
- **Botón "Asistente"** abajo a la izquierda (WhatsApp sigue a la derecha). **No se abre solo**: la persona lo pulsa, aparece un panel pequeño con saludo, tres preguntas sugeridas y una caja de texto. Se cierra con la ×, con Escape, y el foco vuelve al botón. Está en español, inglés y alemán y avisa que las respuestas son automáticas (IA) y que no se escriban datos personales.
- **Responde con Gemini** (Google AI Studio, plan gratuito), siempre desde el servidor: la clave nunca llega al navegador. Solo conoce los datos reales del sitio (servicios, horario, dirección, garantía, proceso y preguntas frecuentes). No inventa precios ni plazos y deriva a WhatsApp para presupuestos. Respuestas de máximo 4 frases. Ignora pedidos de cambiar sus reglas.
- **Parametrizable en `/asistente`** (solo español, fuera de Google, misma clave que `/uso` y `/aviso`): encender o apagar, saludo inicial (el inglés y el alemán se traducen solos si se dejan vacíos), instrucciones adicionales (por ejemplo, "en diciembre atiendo en Buenos Aires") y **tope de mensajes por día** (por defecto 300). Muestra los mensajes de hoy. Se aplica en el sitio en minutos, sin desplegar.
- **Protección**: Cloudflare Turnstile una vez por conversación (luego una sesión firmada de 30 min), solo desde el propio sitio, límite por IP (20 cada 10 min), conversación de máximo 10 mensajes de 600 caracteres, y el tope diario. Si se alcanza el tope o Gemini falla, el panel ofrece escribir por WhatsApp.
- **Registro**: cada respuesta cuenta en `/uso` como "Gemini (asistente virtual)", en llamadas y tokens. Las conversaciones **no se guardan**.
- **Privacidad**: nuevo párrafo en los tres idiomas (en el plan gratuito Google puede usar los textos para mejorar sus productos).

### Para activarlo
1. Crear la clave gratuita en aistudio.google.com → Get API key, y agregar `GEMINI_API_KEY` en Vercel (Settings → Environment Variables). Volver a desplegar.
2. Opcional: `GEMINI_MODEL` si Google cambia o retira el modelo (por defecto `gemini-3.5-flash-lite`). Confirmar el nombre vigente en AI Studio.
3. Sin `GEMINI_API_KEY` el botón no aparece. Entrar a `/asistente` para ajustar saludo, instrucciones y tope. Requiere Redis para guardar los cambios.

---

## v1.10.0: Servicios 100 % industriales, fecha, hora y clima en la barra superior (01-11-2026)

### Qué cambió
- **Servicios**: se elimina "equipos domésticos" en todo el sitio (es/en/ger, datos de empresa, descripción de la página y CLAUDE.md). Quedan equipos industriales, automotrices y médicos.
- **Monitores táctiles y pantallas industriales**: ahora menciona monitores táctiles industriales o de interfaz (HMI) y pantallas de equipos industriales.
- **Otros equipos industriales**: reemplaza a "Otros equipos electrónicos" (automotrices, médicos y otros equipos industriales).
- **Barra superior**: el espacio vacío ahora muestra fecha y hora de Santiago (se actualizan solas) y el clima actual con un ícono que cambia según el tiempo (despejado, nublado, lluvia, tormenta, nieve, niebla; sol o luna según la hora) y un punto que late como señal de "en vivo". Respeta "reducir movimiento".
- **Fuente del clima**: MET Norway (gratuita, sin clave, licencia CC BY 4.0). Nuestro servidor la consulta como máximo cada 15 minutos (`/api/clima`); el navegador de la visita no se conecta a ella. Si falla, se ve solo fecha y hora. Crédito en el pie de página y párrafo en Privacidad.
- Pendiente de la dueña del sitio: revisar los términos de uso de MET Norway (api.met.no/doc/TermsOfService). "Computadoras" no se tocó.

---

## v1.9.0: Carrusel de empresas, pizarra electrónica, menú y horario (01-11-2026)

### Qué cambió
- **Empresas que confían en nosotros** vuelve al diseño inicial (tarjetas claras con esquinas cortadas), ahora como **carrusel que avanza solo**, sin la cinta de película ni las antenas. Se detiene al pasar el cursor o al enfocarlo con el teclado, tiene el botón "Pausar el carrusel" y, con "reducir movimiento", queda quieto y se desplaza con el dedo.
- **Pizarra electrónica**: franja oscura arriba de todo el sitio, con letras de puntos luminosos rojos que se desplazan, el rayo del logo como separador y un botón para pausar. Con "reducir movimiento" el mensaje queda fijo y completo.
- **Se escribe y se enciende o apaga desde `/aviso`** (solo español, fuera de Google): interruptor grande, mensaje en español (hasta 240 caracteres), vista previa en vivo y botón "Guardar cambios". Se entra con la misma clave de `/uso` (`USO_API_TOKEN`). El inglés y el alemán se traducen solos al guardar si se dejan vacíos (se pueden corregir a mano). El sitio se actualiza al instante; no hace falta tocar el código ni volver a desplegar.
- **Mensaje inicial** (encendido): "Durante el mes de diciembre estaré atendiendo en Buenos Aires, Argentina. Favor contactarse para agendar y reservar su cupo de atención o servicio." (corregí las faltas de ortografía del texto original). Mientras Redis no tenga nada guardado, se muestra este.
- **Menú del encabezado arreglado**: "Cómo trabajamos" ya no se parte en dos líneas ni sobresale. El menú completo aparece desde 1280 px de ancho; en pantallas más angostas se usa el menú de tres rayas. El botón del encabezado dice "Mi equipo" (el nombre completo sigue en el menú móvil y en la página).
- **Nuevo horario** en todo el sitio, el pie, la barra superior, las preguntas frecuentes, los tres idiomas y los datos que lee Google: lunes a jueves de 10:00 a 19:00; viernes de 10:00 a 13:00.

### Cómo usar la pizarra
1. Entrar a `electronicamicrowavelab.cl/aviso` y escribir la clave.
2. Cambiar el interruptor (encendido o apagado), escribir el mensaje y pulsar **Guardar cambios**.
3. Si cambia el mensaje en español, borre los campos de inglés y alemán (están en "Inglés y alemán") para que se traduzcan de nuevo.
Requiere Redis (Upstash) conectado y `USO_API_TOKEN` en Vercel, igual que `/uso`. La traducción automática necesita `GOOGLE_TRANSLATE_API_KEY`; sin ella, en inglés y alemán se verá el texto en español.

### Para borrar
- `src/components/AntenasClientes.tsx` y, si aún existe, `src/components/CintaClientes.tsx` (ya no se usan): `git rm src/components/AntenasClientes.tsx src/components/CintaClientes.tsx`.

---

## v1.8.0: Antenas parabólicas y 19 empresas (01-11-2026)

### Qué cambió
- La cinta de película se reemplazó por **dos antenas parabólicas** (una roja y otra azul, los colores de la marca) que **transmiten hacia las empresas** que confían en el laboratorio: las ondas salen de cada antena y se cruzan en el centro. Las antenas están dibujadas para este sitio; no son el logo de ninguna marca. Cada empresa tiene su cuadro con las esquinas cortadas; cuando haya logo, aparece dentro del cuadro.
- Las empresas se ven todas a la vez (ya no hay que esperar a que pasen), lo que además las hace legibles para lectores de pantalla.
- La animación se puede pausar con un botón, y si el equipo tiene activado "reducir movimiento", las ondas quedan fijas.
- La lista pasó de 6 a **19 empresas**, según los listados del SII entregados por el dueño: Metalúrgica Silcosil, Ingeprover Ingeniería, RRH Mantenciones, Hormigones Móviles, Miski Kakawa, Equiambiente, Forbo Siegling Chile, Multitécnica, Performance Chile, Serviphar, Robustools, Complementos Sanitarios Chile, Comercializadora Maquipan, Factory Regalos y Brandpack, Soluciones para Compresores, Ingeniería en Blindaje, Inversiones A y M, Sociedad Agrícola Peña Delgado y System Servicios Eléctricos.

### Para confirmar con el dueño
- **Nombres cortados en el listado** (aparecen incompletos en las capturas, se muestra solo la parte legible): Soluciones para Compresores, System Servicios Eléctricos, Comercializadora Maquipan, Ingeniería en Blindaje.
- **Tildes y eñes** puestas por criterio (los listados vienen en mayúsculas y sin tildes): Metalúrgica, Ingeniería, Multitécnica, Eléctricos, Agrícola y **Peña** Delgado.
- **No incluidas por ahora:** dos personas naturales (Jorge Antonio Maturana Messina y Red Frío Marco Heraldo Aroca A.) y "Comercializadora de Productos" (nombre cortado, incompleto). Para mostrarlas hay que confirmar que autorizan aparecer; se agregan en `clientes` de `src/lib/empresa.ts`.

### Para borrar
- `src/components/CintaClientes.tsx` ya no se usa (`git rm src/components/CintaClientes.tsx`).

---

## v1.7.1: Primeras fotos y publicaciones de LinkedIn (01-11-2026)

### Qué cambió
- **6 fotos de reparaciones** registradas en `src/lib/galeria.ts` (tarjetas, fuente de alimentación y equipo industrial), con descripción en español, inglés y alemán. Se copiaron con nombres limpios (`/galeria/tarjeta-control-modulo-potencia.jpg`, etc.), porque los nombres de WhatsApp tienen espacios y paréntesis.
- **3 publicaciones de LinkedIn incrustadas** (`urn:li:ugcPost:...` y `urn:li:share:...`), con carga solo al pulsar el botón.
- **10 publicaciones más como tarjetas con enlace**: LinkedIn no permite insertar algunas publicaciones en otros sitios, así que se muestran en "Más publicaciones" con su enlace corto (`lnkd.in/p/...`). Solo se aceptan enlaces de ese tipo. Cada tarjeta puede llevar una línea de texto (`texto`) que cuente de qué trata; sin ella dice "Publicación N en LinkedIn".
- Con contenido cargado, el enlace "Multimedia" ya aparece en el menú, el pie y el mapa del sitio.

### Pendiente
- Borrar de `public/galeria/` las 6 fotos con nombre `WhatsApp Image ...` (son copias; las que se usan tienen nombre nuevo).
- Una línea de descripción para cada tarjeta de enlace (opcional).

---

## v1.7.0: Multimedia y cinta de empresas (01-11-2026)

### Qué cambió
- **Empresas que confían en nosotros** ahora es una **cinta de película** que avanza sola, con perforaciones y un cuadro por empresa. Se detiene al pasar el cursor o al enfocarla con el teclado, y tiene un botón "Pausar la cinta". Con la opción "reducir movimiento" del equipo no se anima: queda quieta y se desplaza con el dedo. Cuando haya logos (`clientes` en `src/lib/empresa.ts`), aparecen dentro de cada cuadro.
- **Página Multimedia** (`/multimedia`, `/en/multimedia`, `/ger/multimedia`; en inglés y alemán se llama "Media" y "Medien"):
  - **Reparaciones en nuestro laboratorio:** galería de fotos con filtro por tipo de equipo y visor ampliado (flechas del teclado, Esc para cerrar).
  - **Publicaciones en LinkedIn:** se muestran dentro del sitio con el recuadro oficial de LinkedIn, pero **solo se cargan cuando la persona pulsa el botón** de cada una, para que LinkedIn no reciba datos de quien solo visita. Cada publicación tiene además su enlace "Abrir en LinkedIn", y hay un botón a todas las publicaciones de la empresa.
- El enlace "Multimedia" aparece en el menú, el pie y el mapa del sitio **solo cuando hay contenido cargado**. Mientras tanto, la página existe y muestra un aviso con el enlace a LinkedIn.
- `/privacidad` explica que las publicaciones de LinkedIn solo se cargan si se pulsa el botón.

### Cómo cargar fotos
1. Copiar las fotos en `public/galeria/` (JPG, hasta 1600 px de ancho y menos de 1,5 MB cada una).
2. Registrar cada una en `src/lib/galeria.ts`, en la lista `fotos`:
   `{ archivo: "/galeria/variador.jpg", categoria: "industrial", texto: { es: "Variador de frecuencia reparado", en: "Repaired frequency drive", ger: "Reparierter Frequenzumrichter" } },`
   `categoria` es uno de: `tarjetas`, `industrial`, `fuentes`, `monitores`, `computadoras`, `otros`. Si falta el texto en inglés o alemán, se usa el español.
3. No mostrar datos de clientes (rótulos, nombres, pantallas con información) ni personas sin su permiso.

### Cómo cargar publicaciones de LinkedIn
LinkedIn no permite leer sus publicaciones de forma automática (la página lo bloquea), así que cada una se agrega a mano, una sola vez:
1. En LinkedIn, abrir la publicación de la empresa, tocar los tres puntos (⋯) y elegir **"Insertar esta publicación"** (*Embed this post*).
2. En el código que aparece, buscar la dirección que contiene `urn:li:share:` seguida de un número largo y copiar solo esa parte (por ejemplo `urn:li:share:7123456789012345678`).
3. Pegarla en `src/lib/galeria.ts`, en la lista `publicaciones`: `{ urn: "urn:li:share:7123456789012345678" },`.
Las publicaciones nuevas se agregan arriba de la lista. Una alternativa automática serían servicios de terceros de pago que cargan scripts externos; por ahora no se recomienda.

### Pendiente
- Entregar las fotos y los enlaces de LinkedIn.
- Logos de las empresas clientes (ver v1.4.0).
- Revisión de los textos en inglés y alemán por una persona nativa.

---

## v1.6.0: Captcha del formulario y registro de uso de APIs (01-11-2026)

### Qué cambió
- **Captcha Cloudflare Turnstile** en el formulario de cotización (español, inglés y alemán). Es gratuito, casi nunca pide resolver nada y no obliga a mover el DNS a Cloudflare. El navegador obtiene un token y **el servidor lo verifica con Cloudflare** antes de hacer cualquier cosa (`src/lib/turnstile.ts`). Sin token válido, `/api/traducir` responde 403 y no se traduce nada, así un robot no puede gastar la traducción de Google.
- Como el servidor verifica antes de abrir WhatsApp, **el formulario en español también pasa por la pantalla "Revise su mensaje"** (un toque más), igual que inglés y alemán. El navegador bloquea las ventanas que se abren después de esperar al servidor.
- Si no hay claves de Turnstile, el captcha queda desactivado y el formulario funciona como antes.
- **Registro y contador de APIs** (`src/lib/uso-api.ts`): cada llamada a Google Places (reseñas), Google Translate (formularios) y Cloudflare Turnstile queda anotada con hora, resultado, duración y cantidad (caracteres en traducción). Se guarda en tres lugares: los registros de Vercel (línea `[uso-api]`), contadores por día y por mes en Upstash Redis (el mismo del contador de visitas) y una lista de las últimas 500 llamadas. **No se guarda ningún dato de personas**: ni IP, ni textos, ni correos.
- **Página `/uso`** (solo español, fuera de Google, sin medición) con el consumo de hoy, del mes y del mes pasado, los últimos 14 días y el registro con filtros. Se entra con la clave `USO_API_TOKEN`. La misma información sale en `/api/uso` (cabecera `Authorization: Bearer <clave>`). Cuando exista el panel del técnico, pasará a ser solo para el administrador.
- **Tope mensual de traducción**: por defecto 400.000 caracteres (Google entrega 500.000 gratis al mes; confirmar en su consola). Al llegar al tope el formulario sigue funcionando, pero sin traducir ("sin traducir" en el mensaje). Se cambia con `LIMITE_TRADUCCION_CARACTERES_MES`.
- `/privacidad` informa del captcha y del conteo de llamadas.

### Para activarlo
1. **Turnstile:** dash.cloudflare.com → crear cuenta gratuita → *Turnstile* → *Add widget*. Nombre libre, dominios `electronicamicrowavelab.cl` y `localhost`, modo *Managed*. Copiar la **Site Key** y la **Secret Key**.
2. En `.env.local` y en Vercel (Settings → Environment Variables): `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (clave del sitio, pública), `TURNSTILE_SECRET_KEY` (secreta, nunca en el código) y `USO_API_TOKEN` (texto aleatorio de 16 caracteres o más). Redesplegar el último despliegue.
3. Entrar a `/uso`, escribir la clave y revisar. Hacer una consulta en `/en/servicio-tecnico` y ver cómo aparece en el registro.

### Limitaciones (importante saberlas)
- **Google Places:** el sitio guarda las reseñas 24 horas; el contador anota cuando el sitio las pide, y si Vercel las tenía guardadas, Google no recibe la llamada. Para el consumo real y el cobro, usar Google Cloud → APIs y servicios → Métricas.
- **La protección real contra cobros está en Google Cloud**, no en el sitio: ahí conviene fijar una cuota diaria para Cloud Translation y una alerta de presupuesto.
- Los límites por visitante de `/api/traducir` siguen siendo "mejor esfuerzo" (en memoria). Con Turnstile ya no son la defensa principal.
- El contador de visitas (`/api/visitas`) no usa captcha; solo descarta robots conocidos.
- Cada llamada registrada gasta unos 8 comandos de Upstash. Con el volumen de un taller no se acerca al límite gratuito.

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
