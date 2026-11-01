# Medición del sitio: Google Analytics 4, Looker Studio y Microsoft Clarity

Todo es gratuito. Looker Studio no recopila datos: es la pantalla de informes que lee los datos de Google Analytics 4 (GA4).

## Cómo funciona en el sitio
- Aparece un aviso de cookies. Solo si el visitante pulsa **Aceptar** se cargan GA4 y Clarity. Si pulsa **Solo necesarias** no se carga nada.
- Si faltan los IDs en las variables de entorno, no se carga nada y el aviso no aparece.
- No se mide `/portal` ni `/panel` (hay datos de clientes).
- Eventos propios que se registran en GA4: `clic_whatsapp`, `clic_llamada`, `clic_waze`, `clic_google_maps`, `clic_linkedin`, `clic_correo`.
- Página informativa: `/privacidad`.

## Paso 1: Google Analytics 4
1. Entrar a analytics.google.com con la cuenta de Google de la empresa, **Administrar** → **Crear cuenta** → crear una propiedad "Micro Wave Lab CL" (zona horaria Chile, moneda CLP).
2. Crear un **flujo de datos web** con la dirección `https://electronicamicrowavelab.cl`.
3. Copiar el **ID de medición** (empieza con `G-`).
4. Más adelante, para ver los clics como conversiones: Administrar → Eventos → marcar como evento clave `clic_whatsapp` y `clic_llamada`. (Aparecen en la lista después de recibir el primer clic.)

## Paso 2: Microsoft Clarity
1. Entrar a clarity.microsoft.com (se puede usar cuenta Microsoft o Google) → **Add new project**.
2. Nombre "Micro Wave Lab CL", sitio `https://electronicamicrowavelab.cl`.
3. Copiar el **ID del proyecto** (texto corto de letras y números, aparece en Settings → Overview).
4. Opcional: en Settings → Setup, conectar el proyecto con GA4 para ver las grabaciones desde Analytics.

## Paso 3: cargar los IDs
- Local: en `.env.local` agregar `NEXT_PUBLIC_GA_ID=G-XXXXXXX` y `NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx`.
- Vercel: proyecto → Settings → Environment Variables, agregar las mismas dos variables y volver a desplegar (Deployments → ⋯ → Redeploy). Estas variables empiezan con `NEXT_PUBLIC_` porque van en el navegador; no son secretas.

## Paso 4: informe en Looker Studio
1. Entrar a lookerstudio.google.com con la misma cuenta de Google → **Crear** → **Informe**.
2. Agregar datos → conector **Google Analytics** → elegir la propiedad "Micro Wave Lab CL".
3. Gráficos útiles para empezar: visitantes por día, páginas más vistas, origen del tráfico, dispositivo (celular/computador), y tabla de eventos `clic_whatsapp`, `clic_llamada`, `clic_waze`.
4. Usar los colores de la marca: rojo `#E73338`, azul `#414290`, fondo `#15173F`.
5. Compartir el informe con quien corresponda (botón **Compartir**).

Los datos tardan entre 24 y 48 horas en verse completos en Analytics e informes; el panel de tiempo real de GA4 muestra las visitas al instante, útil para probar.

## Cómo probar que funciona
1. Abrir el sitio, aceptar las cookies y hacer clic en el botón de WhatsApp.
2. En GA4 → Informes → **Tiempo real**: debe aparecer una visita y el evento `clic_whatsapp`.
3. En Clarity el primer registro puede tardar unos minutos.
