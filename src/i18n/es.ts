// Textos del sitio en español (idioma base). Los otros idiomas deben tener exactamente las mismas claves.
// {variables} se reemplazan con fmt(). Sin funciones aquí: los textos deben poder enviarse a componentes cliente.

export const es = {
  idioma: {
    nombre: "Español",
    corto: "ES",
    htmlLang: "es-CL",
    og: "es_CL",
    hl: "es",
    places: "es",
    selector: "Idioma",
    cambiarA: "Cambiar a {idioma}",
  },
  meta: {
    titulo: "Reparación de tarjetas y equipos electrónicos",
    descripcion:
      "Laboratorio electrónico en La Cisterna, Santiago. Más de {anios} años reparando tarjetas electrónicas, módulos I/O, fuentes de alimentación, inversores y monitores táctiles. {garantia} meses de garantía.",
  },
  comun: {
    eslogan: "Laboratorio electrónico: reparación de tarjetas y equipos",
    descripcionEmpresa:
      "Prestamos servicio de laboratorio electrónico, con más de 45 años de experiencia en la reparación de todo tipo de tarjetas electrónicas, computadoras, monitores táctiles, módulos I/O, fuentes de alimentación, cargadores e inversores. Servicio de diagnóstico, con atención personalizada y adaptándonos a sus requerimientos.",
    horario: "Lunes a viernes, de 10:00 a 19:00",
    horarioCorto: "Lun a vie, 10:00 a 19:00",
    mensajeConsulta: "Hola, quisiera consultar por la reparación de un equipo.",
    mensajeCotizar: "Hola, quisiera cotizar la reparación de un equipo.",
    telefonoNota: "(llamadas y WhatsApp)",
    externo: "se abre en otra pestaña",
  },
  nav: {
    principal: "Principal",
    servicios: "Servicios",
    proceso: "Cómo trabajamos",
    trayectoria: "Trayectoria",
    preguntas: "Preguntas",
    preguntasLarga: "Preguntas frecuentes",
    contacto: "Contacto",
    portal: "Seguimiento de mi equipo",
    privacidad: "Privacidad y cookies",
    menuAbrir: "Abrir menú",
    menuCerrar: "Cerrar menú",
    inicioDe: "{nombre}, inicio",
    pie: "Pie de página",
    sitio: "El sitio",
    visitenos: "Visítenos",
  },
  pie: {
    titulo: "¿Tiene un equipo que no enciende?",
    texto:
      "Cuéntenos la falla y le orientamos sin costo. Más de {anios} años y {garantia} meses de garantía en cada reparación.",
    whatsapp: "Escribir por WhatsApp",
    llamar: "Llamar",
    derechos: "Todos los derechos reservados.",
    irWaze: "Ir con Waze",
    linkedin: "LinkedIn",
  },
  whatsapp: { aria: "Escribir por WhatsApp", etiqueta: "WhatsApp" },
  cookies: {
    aria: "Aviso de cookies",
    texto:
      "Usamos cookies de medición (Google Analytics y Microsoft Clarity) para entender cómo se usa el sitio y mejorarlo. No las usamos para publicidad. Puede aceptar o rechazar.",
    mas: "Más información",
    aceptar: "Aceptar",
    rechazar: "Solo necesarias",
  },
  contador: { etiqueta: "Visitas al sitio", aria: "{total} visitas al sitio" },
  resenas: {
    ver: "Ver reseñas en Google",
    verTodas: "Ver todas las reseñas en Google",
    dejar: "Dejar una reseña",
    fuente: "Reseñas de Google Maps",
    uno: "reseña",
    varias: "reseñas",
    enGoogle: "en Google",
    estrellas: "{n} de 5 estrellas",
    usuario: "Usuario de Google",
    notaIdioma: "",
  },
  mapa: { titulo: "Mapa de ubicación de {nombre}" },
  clientes: { titulo: "Empresas que confían en nosotros" },
  tecnico: {
    meta: {
      titulo: "Servicio técnico industrial",
      descripcion:
        "Diagnóstico y reparación de tarjetas, módulos I/O, fuentes, inversores y monitores táctiles de equipos industriales. Solicite su cotización.",
    },
    titulo: "Servicio técnico industrial",
    bajada: "Diagnóstico y reparación de la electrónica de equipos industriales, para que vuelvan a operar.",
    alcance: {
      h: "Alcance",
      items: [
        "Diagnóstico técnico de fallas eléctricas y electrónicas.",
        "Reparación a nivel de componente de tarjetas, módulos I/O, fuentes, inversores y monitores táctiles.",
        "Pruebas funcionales antes de la entrega.",
        "Gestión de repuestos, incluidos los que se importan.",
      ],
    },
    valor: {
      h: "Lo que usted gana",
      items: [
        "Diagnóstico antes del presupuesto: usted decide con información.",
        "{garantia} meses de garantía en cada reparación.",
        "Seguimiento por etapas, para saber en qué punto está su equipo.",
        "Más de {anios} años de experiencia en electrónica.",
      ],
    },
    equipos: { h: "Equipos que atendemos" },
    formulario: {
      titulo: "Solicitar cotización",
      intro: "Cuéntenos qué equipo es y qué le pasa. Mientras más datos, más precisa será la respuesta.",
      nota: "Al continuar verá su mensaje ya escrito para revisarlo; luego lo abre en WhatsApp y lo envía. Lo que escribe aquí no se guarda en este sitio.",
      encabezado: "Solicitud desde el sitio web (servicio técnico)",
      nombre: "Nombre",
      empresa: "Empresa",
      telefono: "Teléfono",
      correo: "Correo",
      area: "Motivo",
      equipo: "Tipo de equipo",
      marca: "Marca y modelo",
      marcaAyuda: "Número de serie si lo tiene",
      falla: "Falla o consulta",
      urgencia: "Urgencia",
      opcional: "(opcional)",
      seleccione: "Seleccione",
      areas: ["Reparación de equipo", "Garantía o postventa", "Consulta general", "Sugerencias o reclamos"],
      urgencias: ["Normal", "Urgente: el equipo detiene la operación", "Sin apuro"],
      enviar: "Continuar por WhatsApp",
      traduciendo: "Preparando mensaje...",
      revisarTitulo: "Revise su mensaje",
      revisarTexto: "Este es el mensaje que recibirá nuestro equipo, en español y con su texto original. Si está bien, ábralo en WhatsApp y envíelo.",
      abrir: "Abrir WhatsApp",
      editar: "Volver a editar",
      idiomaCliente: "Idioma del cliente",
      textoOriginal: "Texto original ({idioma})",
      sinTraducir: "sin traducir, escrito en {idioma}",
      captcha: {
        etiqueta: "Verificación de seguridad",
        requerido: "Complete la verificación de seguridad antes de continuar.",
        fallo: "No pudimos verificar que usted es una persona. Intente de nuevo o escríbanos directamente por WhatsApp.",
      },
    },
  },
  inicio: {
    hero: {
      kicker: "Más de {anios} años reparando electrónica",
      titulo: "Si su equipo se detuvo, lo hacemos funcionar de nuevo",
      texto:
        "Laboratorio electrónico especializado en tarjetas, módulos I/O, fuentes de alimentación, inversores y monitores táctiles. Diagnóstico profesional y {garantia} meses de garantía.",
      cotizar: "Cotizar por WhatsApp",
      llamar: "Llamar al {telefono}",
    },
    queReparamos: {
      titulo: "Qué reparamos",
      texto: "Electrónica industrial y de todo tipo, reparada a nivel de componente.",
      ver: "Ver todos los servicios",
    },
    trayectoria: {
      titulo: "{anios} años de experiencia en un solo taller",
      linkedin: "Síganos en LinkedIn",
      porQue: "Por qué elegirnos",
      puntos: [
        { t: "Experiencia comprobada", d: "más de {anios} años reparando electrónica." },
        { t: "Garantía", d: "{garantia} meses en nuestras reparaciones." },
        { t: "Diagnóstico primero", d: "identificamos la falla antes de presupuestar." },
        { t: "Atención personalizada", d: "nos adaptamos a sus requerimientos." },
      ],
      proceso: "Cómo es el proceso de reparación",
    },
    ubicacion: {
      titulo: "Dónde estamos",
      maps: "Cómo llegar con Google Maps",
      waze: "Cómo llegar con Waze",
    },
    resenas: { titulo: "Lo que dicen nuestros clientes" },
    preguntas: { titulo: "Preguntas frecuentes" },
  },
  servicios: {
    meta: {
      titulo: "Servicios",
      descripcion:
        "Reparación de placas electrónicas, equipos industriales, médicos, domésticos y automotrices.",
    },
    titulo: "Servicios",
    bajada: "Atendemos equipos electrónicos de todo tipo, con foco en el área industrial.",
    solicitar: "Solicitar cotización",
    items: {
      tarjetas: {
        titulo: "Tarjetas electrónicas",
        descripcion: "Diagnóstico y reparación de todo tipo de tarjetas y placas electrónicas.",
      },
      industrial: {
        titulo: "Módulos I/O y equipos industriales",
        descripcion:
          "Reparación de módulos de entrada y salida y de la electrónica de equipos industriales.",
      },
      fuentes: {
        titulo: "Fuentes, cargadores e inversores",
        descripcion:
          "Fuentes de alimentación, cargadores e inversores reparados a nivel de componente.",
      },
      monitores: {
        titulo: "Monitores táctiles",
        descripcion: "Reparación de monitores táctiles y pantallas de equipos.",
      },
      computadoras: {
        titulo: "Computadoras",
        descripcion: "Diagnóstico y reparación electrónica de computadoras.",
      },
      otros: {
        titulo: "Otros equipos electrónicos",
        descripcion:
          "Equipos domésticos, automotrices, médicos y otros. Consúltenos por su caso.",
      },
    },
  },
  proceso: {
    meta: {
      titulo: "Cómo trabajamos",
      descripcion:
        "Etapas de una reparación en Micro Wave Lab CL: recepción, diagnóstico, presupuesto, reparación, pruebas y entrega con garantía.",
    },
    titulo: "Cómo trabajamos",
    bajada:
      "Cada equipo pasa por las mismas etapas, para que usted sepa siempre en qué punto está su reparación.",
    notaRepuesto: "Esta etapa solo ocurre si la reparación requiere un repuesto.",
    garantiaAntes: "Todas nuestras reparaciones tienen ",
    garantiaNegrita: "{garantia} meses de garantía",
    garantiaDespues: ".",
    cta: "Consultar por mi equipo",
    pasos: {
      PRE_INGRESO: { etiqueta: "Pendiente de recepción", descripcion: "Recibimos sus datos. Falta que su equipo llegue a nuestro laboratorio." },
      RECEPCION: { etiqueta: "Recibido", descripcion: "Su equipo ingresó a nuestro laboratorio." },
      REVISION: { etiqueta: "En revisión", descripcion: "Estamos revisando el estado general del equipo." },
      DIAGNOSTICO: { etiqueta: "En diagnóstico", descripcion: "Estamos identificando la falla y sus causas." },
      PRESUPUESTO: { etiqueta: "Presupuesto enviado", descripcion: "Le enviamos el presupuesto para su revisión." },
      DECISION_CLIENTE: { etiqueta: "Esperando su respuesta", descripcion: "Esperamos que acepte o rechace el presupuesto." },
      SOLICITUD_REPUESTO: { etiqueta: "Repuesto solicitado", descripcion: "Estamos gestionando un repuesto. Algunos se importan y pueden demorar." },
      REPARACION: { etiqueta: "En reparación", descripcion: "Su equipo está siendo reparado." },
      PRUEBAS: { etiqueta: "En pruebas", descripcion: "Verificamos que el equipo funcione correctamente." },
      LISTO_RETIRO: { etiqueta: "Listo para retiro", descripcion: "Su equipo está listo. Puede pasar a retirarlo." },
      ENTREGADO: { etiqueta: "Entregado", descripcion: "Equipo entregado. ¡Gracias por confiar en nosotros!" },
      RECHAZADO: { etiqueta: "Presupuesto rechazado", descripcion: "El presupuesto no fue aceptado. El equipo queda para devolución." },
      SIN_REPARACION: { etiqueta: "Sin reparación posible", descripcion: "No fue posible reparar este equipo." },
    },
  },
  contacto: {
    meta: {
      titulo: "Contacto",
      descripcion:
        "Contáctenos por teléfono, WhatsApp o visítenos en General Freire 80, La Cisterna.",
    },
    titulo: "Contacto",
    bajada: "Cuéntenos qué equipo necesita reparar y le responderemos a la brevedad.",
    telefonoNota: "Llamadas, mensajes de texto y WhatsApp.",
    whatsapp: "Escribir por WhatsApp",
    maps: "Google Maps",
    waze: "Waze",
    formulario: {
      titulo: "Formulario de cotización",
      texto:
        "Complete el formulario de servicio técnico con los datos de su equipo y la falla; se abre WhatsApp con su mensaje ya escrito.",
      ir: "Ir al formulario",
    },
  },
  portal: {
    meta: { titulo: "Seguimiento de mi equipo" },
    titulo: "Seguimiento de mi equipo",
    bajada:
      "Pronto podrá ingresar con su correo electrónico para ver en qué etapa está la reparación de su equipo, revisar y aceptar su presupuesto y pagar en línea.",
    nota: "Mientras tanto, si necesita saber el estado de su equipo, escríbanos por WhatsApp indicando su nombre y el equipo que dejó.",
  },
  privacidad: {
    meta: {
      titulo: "Privacidad y cookies",
      descripcion: "Qué datos mide este sitio, con qué herramientas y cómo rechazar la medición.",
    },
    titulo: "Privacidad y cookies",
    bajada: "Qué medimos en este sitio, con qué herramientas y cómo puede rechazarlo.",
    medimos: {
      h: "Qué medimos",
      intro:
        "Si usted acepta, usamos dos herramientas para saber cuántas personas visitan el sitio, qué páginas ven y si usan los botones de WhatsApp, teléfono o mapa:",
      items: [
        {
          b: "Google Analytics 4:",
          t: "estadísticas agregadas de visitas, que luego presentamos en informes de Looker Studio.",
        },
        {
          b: "Microsoft Clarity:",
          t: "mapas de calor y grabaciones anónimas de la navegación para detectar partes del sitio difíciles de usar. Oculta por defecto lo que se escribe en campos de texto.",
        },
      ],
    },
    contador: {
      h: "Contador de visitas",
      p: "El número de visitas del pie de página solo suma cuántas veces se abre el sitio. No guarda datos personales, no usa cookies y no depende de su decisión sobre la medición.",
    },
    noHacemos: {
      h: "Lo que no hacemos",
      p: "No usamos estas cookies para publicidad. No medimos las páginas de seguimiento de equipos ni el panel interno, donde hay datos de clientes.",
    },
    cambiar: {
      h: "Cómo cambiar su decisión",
      p: "Si eligió \"Aceptar\" y quiere retirarlo, borre los datos de este sitio en la configuración de su navegador y el aviso volverá a aparecer. También puede bloquear las cookies desde el propio navegador.",
    },
    traduccion: {
      h: "Formulario y traducción",
      p: "Si usted escribe en inglés o alemán, el texto de la falla se envía al servicio Google Cloud Translation para traducirlo al español antes de abrir WhatsApp, porque nuestro equipo atiende en español. El texto no se guarda en este sitio.",
    },
    seguridad: {
      h: "Seguridad del formulario",
      p: "Para evitar mensajes automáticos (robots), el formulario usa Cloudflare Turnstile, un captcha que casi nunca pide resolver nada. Cloudflare recibe datos técnicos de su navegador solo para comprobar que usted es una persona; no se usa para publicidad. Registramos cuántas veces se consultan los servicios externos del sitio (traducción, reseñas y este captcha), sin guardar ningún dato personal.",
    },
    consultas: {
      h: "Consultas",
      conCorreo: "Para consultas sobre sus datos, escríbanos a {correo} o llámenos al {telefono}.",
      sinCorreo: "Para consultas sobre sus datos, escríbanos por WhatsApp o llámenos al {telefono}.",
    },
  },
  faq: [
    {
      pregunta: "¿Qué tipo de equipos reparan?",
      respuesta:
        "Reparamos todo tipo de tarjetas electrónicas, computadoras, monitores táctiles, módulos I/O, fuentes de alimentación, cargadores e inversores. Si su equipo no aparece en la lista, consúltenos por teléfono o WhatsApp.",
    },
    {
      pregunta: "¿Las reparaciones tienen garantía?",
      respuesta: "Sí. Nuestras reparaciones cuentan con {garantia} meses de garantía.",
    },
    {
      pregunta: "¿Cómo solicito un presupuesto?",
      respuesta:
        "Primero revisamos y diagnosticamos su equipo. Con el diagnóstico le enviamos el presupuesto y usted decide si desea continuar con la reparación.",
    },
    {
      pregunta: "¿Dónde están y en qué horario atienden?",
      respuesta: "Estamos en {calle}, {comuna}. Atendemos {horarioMin}.",
    },
    {
      pregunta: "¿Cómo puedo contactarlos?",
      respuesta:
        "Por llamada telefónica, mensaje de texto o WhatsApp al número principal que aparece en esta página.",
    },
  ],
};

export type Diccionario = typeof es;
