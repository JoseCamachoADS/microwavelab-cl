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
    titulo: "Reparación de tarjetas electrónicas industriales",
    descripcion: "Reparación de tarjetas electrónicas industriales en Santiago de Chile: módulos I/O, fuentes de alimentación, inversores y monitores táctiles. Más de {anios} años de experiencia y {garantia} meses de garantía.",
  },
  comun: {
    eslogan: "Laboratorio de electrónica industrial: reparación de tarjetas y equipos",
    descripcionEmpresa: "Laboratorio de electrónica industrial con más de 45 años de trayectoria. Diagnóstico y reparación a nivel de componente de tarjetas electrónicas, módulos I/O, fuentes de alimentación, cargadores, inversores, computadoras y monitores táctiles, con atención personalizada para empresas.",
    horario: "Lunes a jueves, de 10:00 a 19:00; viernes, de 10:00 a 13:00",
    horarioCorto: "Lun a jue 10:00 a 19:00 · Vie 10:00 a 13:00",
    mensajeConsulta: "Hola, quisiera consultar por la reparación de un equipo de mi empresa.",
    mensajeCotizar: "Hola, quisiera solicitar una cotización para la reparación de un equipo.",
    mensajeUrgencia: "Hola, tengo una urgencia: un equipo detuvo la operación de mi empresa y necesito una reparación prioritaria.",
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
    portalCorto: "Mi equipo",
    privacidad: "Privacidad y cookies",
    menuAbrir: "Abrir menú",
    menuCerrar: "Cerrar menú",
    multimedia: "Multimedia",
    inicioDe: "{nombre}, inicio",
    pie: "Pie de página",
    sitio: "El sitio",
    visitenos: "Visítenos",
  },
  pie: {
    titulo: "¿Problemas con su equipo industrial o especializado?",
    texto: "Llegó al lugar correcto. Cuéntenos la falla que presenta y le ayudaremos a solucionarla, con atención personalizada. No deje que su equipo detenga la operación de su compañía: atendemos urgencias, con reparaciones prioritarias, incluso en sitio. Más de {anios} años de experiencia y {garantia} meses de garantía en cada trabajo.",
    whatsapp: "Escribir por WhatsApp",
    llamar: "Llamar",
    derechos: "Todos los derechos reservados.",
    irWaze: "Ir con Waze",
    linkedin: "LinkedIn",
  },
  whatsapp: { aria: "Escribir por WhatsApp", etiqueta: "WhatsApp" },
  urgencia: { aria: "Reportar una urgencia por WhatsApp", etiqueta: "Tengo una urgencia" },
  cookies: {
    aria: "Aviso de cookies",
    texto: "Utilizamos cookies de medición (Google Analytics y Microsoft Clarity) para comprender cómo se usa el sitio y mejorarlo. No las empleamos con fines publicitarios. Usted puede aceptarlas o rechazarlas.",
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
  clima: { etiqueta: "Clima actual en Santiago", santiago: "Santiago", credito: "Datos del clima:", despejado: "Despejado", parcial: "Parcialmente nublado", nublado: "Nublado", niebla: "Niebla", lluvia: "Lluvia", tormenta: "Tormenta eléctrica", nieve: "Nieve", aguanieve: "Aguanieve" },
  asistente: {
    boton: "Asistente",
    abrir: "Abrir el asistente virtual",
    titulo: "Asistente virtual",
    cerrar: "Cerrar el asistente",
    saludo: "Hola, soy el asistente virtual de Electrónica Micro Wave Lab. Puedo orientarle sobre nuestros servicios, horario, proceso y garantía. ¿En qué le ayudo?",
    sugerencias: ["¿Qué equipos reparan?", "¿Cómo es el proceso?", "¿Cuál es el horario?"],
    placeholder: "Escriba su consulta",
    enviar: "Enviar",
    escribiendo: "Escribiendo...",
    aviso: "Respuestas automáticas con inteligencia artificial: pueden tener errores. No escriba datos personales.",
    captcha: "Verificando que es una persona...",
    captchaFallo: "No se pudo verificar. Recargue la página e intente de nuevo.",
    error: "No pudimos responder ahora. Intente de nuevo o escríbanos directamente.",
    tope: "El asistente no está disponible por ahora. Escríbanos directamente.",
    limite: "Ha enviado muchas consultas seguidas. Espere unos minutos o escríbanos directamente.",
    whatsapp: "Escribir por WhatsApp",
  },
  aviso: { etiqueta: "Aviso importante", pausar: "Pausar el aviso", reanudar: "Reanudar el aviso" },
  clientes: { titulo: "Empresas que confían en nosotros", pausar: "Pausar el carrusel", reanudar: "Reanudar el carrusel" },
  multimedia: {
    meta: {
      titulo: "Multimedia",
      descripcion: "Fotos de reparaciones electrónicas en nuestro laboratorio y publicaciones de Electrónica Micro Wave Lab en LinkedIn.",
    },
    titulo: "Multimedia",
    bajada: "Reparaciones reales de nuestro laboratorio y las novedades que publicamos en LinkedIn.",
    fotos: {
      h: "Reparaciones en nuestro laboratorio",
      intro: "Trabajos reales de diagnóstico y reparación. Toque una foto para verla más grande.",
      vacio: "Estamos preparando la galería de reparaciones. Mientras tanto, puede ver nuestras novedades en LinkedIn.",
      todas: "Todas",
      filtro: "Filtrar por tipo de equipo",
      ampliar: "Ampliar foto: {texto}",
      cerrar: "Cerrar",
      anterior: "Anterior",
      siguiente: "Siguiente",
      contador: "{n} de {total}",
    },
    linkedin: {
      h: "Publicaciones en LinkedIn",
      intro: "Lo último que compartimos como empresa: trabajos, equipos y novedades del laboratorio.",
      cargar: "Ver publicación aquí",
      aviso: "Al verla aquí, LinkedIn puede guardar datos de su navegador. Si prefiere, ábrala directamente en LinkedIn.",
      abrir: "Abrir en LinkedIn",
      verTodas: "Ver todas las publicaciones en LinkedIn",
      tituloPublicacion: "Publicación de LinkedIn",
      mas: "Más publicaciones",
      publicacionN: "Publicación {n} en LinkedIn",
    },
  },
  tecnico: {
    meta: {
      titulo: "Servicio técnico industrial",
      descripcion: "Diagnóstico y reparación a nivel de componente de tarjetas, módulos I/O, fuentes de alimentación, inversores y monitores táctiles industriales. Solicite su cotización.",
    },
    titulo: "Servicio técnico industrial",
    bajada: "Diagnóstico y reparación de la electrónica de equipos industriales, para recuperar la continuidad operativa de su empresa.",
    alcance: {
      h: "Alcance del servicio",
      items: [
        "Diagnóstico técnico de fallas eléctricas y electrónicas.",
        "Reparación a nivel de componente de tarjetas, módulos I/O, fuentes de alimentación, inversores y monitores táctiles industriales.",
        "Pruebas funcionales previas a la entrega.",
        "Gestión de repuestos, incluidos los de importación.",
      ],
    },
    valor: {
      h: "Beneficios para su empresa",
      items: [
        "Diagnóstico previo al presupuesto, para decidir con información técnica.",
        "{garantia} meses de garantía en cada reparación.",
        "Seguimiento por etapas, con visibilidad del estado de cada equipo.",
        "Más de {anios} años de experiencia en electrónica.",
      ],
    },
    equipos: {
      h: "Equipos que atendemos",
    },
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
      kicker: "Más de {anios} años de experiencia en electrónica industrial",
      titulo: "Reparación de tarjetas electrónicas industriales para que su operación no se detenga",
      texto: "Laboratorio especializado en la reparación de tarjetas, módulos I/O, fuentes de alimentación, inversores y monitores táctiles industriales. Diagnóstico técnico previo y {garantia} meses de garantía.",
      cotizar: "Solicitar cotización por WhatsApp",
      llamar: "Llamar al {telefono}",
    },
    queReparamos: {
      titulo: "Qué reparamos",
      texto: "Electrónica industrial, automotriz y médica, reparada a nivel de componente.",
      ver: "Ver todos los servicios",
    },
    urgencias: {
      titulo: "Reparaciones de emergencia",
      bajada: "No deje que un equipo detenga la operación de su compañía. Contamos con un servicio de urgencias para reparaciones prioritarias, incluso en sitio.",
      puntos: [
        {
          t: "Atención prioritaria",
          d: "Las urgencias se atienden con la máxima prioridad, para restablecer su operación lo antes posible.",
        },
        {
          t: "Reparación en sitio",
          d: "Atendemos urgencias en las instalaciones de su empresa en la Región Metropolitana; en otras regiones de Chile, con coordinación previa.",
        },
        {
          t: "Atención personalizada",
          d: "Trato directo y personalizado desde el momento en que reporta la falla.",
        },
      ],
      respaldo: "Más de {anios} años de experiencia. Cada trabajo que realizamos cuenta con {garantia} meses de garantía.",
      cta: "Reportar una urgencia por WhatsApp",
      llamar: "Llamar ahora",
    },
    trayectoria: {
      titulo: "{anios} años de experiencia en un solo laboratorio",
      linkedin: "Síganos en LinkedIn",
      porQue: "Por qué elegirnos",
      puntos: [
        {
          t: "Trayectoria comprobada",
          d: "más de {anios} años de experiencia en reparación electrónica.",
        },
        {
          t: "Garantía",
          d: "{garantia} meses en cada reparación.",
        },
        {
          t: "Diagnóstico previo",
          d: "identificamos la falla antes de emitir el presupuesto.",
        },
        {
          t: "Atención personalizada",
          d: "nos adaptamos a los requerimientos de cada empresa.",
        },
      ],
      proceso: "Conozca nuestro proceso de reparación",
    },
    ubicacion: {
      titulo: "Dónde estamos",
      maps: "Cómo llegar con Google Maps",
      waze: "Cómo llegar con Waze",
    },
    resenas: {
      titulo: "Lo que dicen nuestros clientes",
    },
    preguntas: {
      titulo: "Preguntas frecuentes",
    },
  },
  servicios: {
    meta: {
      titulo: "Servicios",
      descripcion: "Reparación electrónica a nivel de componente: tarjetas, módulos I/O, fuentes de alimentación, inversores, monitores táctiles industriales y equipos automotrices y médicos.",
    },
    titulo: "Servicios",
    bajada: "Reparación electrónica especializada para equipos industriales, con foco en la continuidad operativa de su empresa.",
    solicitar: "Solicitar cotización",
    items: {
      tarjetas: {
        titulo: "Tarjetas electrónicas",
        descripcion: "Diagnóstico y reparación a nivel de componente de todo tipo de tarjetas y placas electrónicas.",
      },
      industrial: {
        titulo: "Módulos I/O y electrónica industrial",
        descripcion: "Reparación de módulos de entrada y salida y de la electrónica de equipos industriales.",
      },
      fuentes: {
        titulo: "Fuentes de alimentación, cargadores e inversores",
        descripcion: "Reparación a nivel de componente de fuentes de alimentación, cargadores e inversores.",
      },
      monitores: {
        titulo: "Monitores táctiles y pantallas industriales",
        descripcion: "Reparación de monitores táctiles industriales y de interfaz (HMI), y de pantallas de equipos industriales, como las de compresores.",
      },
      computadoras: {
        titulo: "Computadoras",
        descripcion: "Diagnóstico y reparación electrónica de computadoras.",
      },
      otros: {
        titulo: "Otros equipos industriales",
        descripcion: "Equipos automotrices, médicos y otros equipos industriales. Consulte por su caso.",
      },
    },
  },
  proceso: {
    meta: {
      titulo: "Cómo trabajamos",
      descripcion: "Etapas de una reparación en Electrónica Micro Wave Lab: recepción, diagnóstico, presupuesto, reparación, pruebas y entrega con garantía.",
    },
    titulo: "Cómo trabajamos",
    bajada: "Cada equipo sigue las mismas etapas, para que usted conozca en todo momento el estado de su reparación.",
    notaRepuesto: "Esta etapa aplica solo cuando la reparación requiere un repuesto.",
    garantiaAntes: "Todas nuestras reparaciones cuentan con ",
    garantiaNegrita: "{garantia} meses de garantía",
    garantiaDespues: ".",
    cta: "Consultar por un equipo",
    pasos: {
      PRE_INGRESO: {
        etiqueta: "Pendiente de recepción",
        descripcion: "Registramos sus datos. Resta la llegada del equipo a nuestro laboratorio.",
      },
      RECEPCION: {
        etiqueta: "Recibido",
        descripcion: "El equipo ingresó a nuestro laboratorio.",
      },
      REVISION: {
        etiqueta: "En revisión",
        descripcion: "Evaluamos el estado general del equipo.",
      },
      DIAGNOSTICO: {
        etiqueta: "En diagnóstico",
        descripcion: "Identificamos la falla y sus causas.",
      },
      PRESUPUESTO: {
        etiqueta: "Presupuesto enviado",
        descripcion: "Enviamos el presupuesto para su evaluación.",
      },
      DECISION_CLIENTE: {
        etiqueta: "Pendiente de su aprobación",
        descripcion: "Aguardamos su aceptación o rechazo del presupuesto.",
      },
      SOLICITUD_REPUESTO: {
        etiqueta: "Repuesto solicitado",
        descripcion: "Gestionamos un repuesto. Algunos se importan y pueden requerir más tiempo.",
      },
      REPARACION: {
        etiqueta: "En reparación",
        descripcion: "El equipo se encuentra en reparación.",
      },
      PRUEBAS: {
        etiqueta: "En pruebas",
        descripcion: "Verificamos el correcto funcionamiento del equipo.",
      },
      LISTO_RETIRO: {
        etiqueta: "Listo para retiro",
        descripcion: "El equipo está listo. Puede coordinar su retiro con nosotros.",
      },
      ENTREGADO: {
        etiqueta: "Entregado",
        descripcion: "Equipo entregado. Gracias por confiar en nosotros.",
      },
      RECHAZADO: {
        etiqueta: "Presupuesto rechazado",
        descripcion: "El presupuesto no fue aceptado. El equipo queda disponible para su devolución.",
      },
      SIN_REPARACION: {
        etiqueta: "Sin reparación posible",
        descripcion: "No fue posible reparar este equipo.",
      },
    },
  },
  contacto: {
    meta: {
      titulo: "Contacto",
      descripcion: "Contáctenos por teléfono o WhatsApp, o visítenos en General Freire 80, La Cisterna, Santiago de Chile.",
    },
    titulo: "Contacto",
    bajada: "Cuéntenos qué equipo requiere reparación y le responderemos a la brevedad.",
    telefonoNota: "Llamadas, mensajes de texto y WhatsApp.",
    whatsapp: "Escribir por WhatsApp",
    maps: "Google Maps",
    waze: "Waze",
    formulario: {
      titulo: "Solicitud de cotización",
      texto: "Complete el formulario de servicio técnico con los datos del equipo y de la falla; se abrirá WhatsApp con su mensaje ya redactado.",
      ir: "Ir al formulario",
    },
  },
  portal: {
    meta: {
      titulo: "Seguimiento de mi equipo",
    },
    titulo: "Seguimiento de mi equipo",
    bajada: "Próximamente podrá ingresar con su correo electrónico para conocer la etapa de reparación de su equipo, revisar y aprobar su presupuesto y pagar en línea.",
    nota: "Mientras tanto, para conocer el estado de su equipo escríbanos por WhatsApp, indicando su nombre o empresa y el equipo ingresado.",
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
    multimedia: {
      h: "Multimedia y LinkedIn",
      p: "Las fotos de reparaciones están alojadas en este sitio. Las publicaciones de LinkedIn solo se cargan si usted pulsa el botón de cada una; en ese momento LinkedIn puede recibir datos de su navegador y guardar cookies, según su propia política de privacidad.",
    },
    asistente: {
      h: "Asistente virtual",
      p: "El asistente responde con inteligencia artificial (Gemini, de Google). Solo si usted lo abre y envía una consulta, nuestro servidor envía a Google los últimos mensajes de esa conversación, sin su dirección IP ni otros datos. No los guardamos. Para evitar abusos usamos el captcha de Cloudflare Turnstile, y en el plan gratuito Google puede usar esos textos para mejorar sus productos: no escriba datos personales ni confidenciales.",
    },
    clima: {
      h: "Hora y clima",
      p: "La fecha y la hora se calculan en su navegador. El clima de Santiago lo consulta nuestro servidor a MET Norway (servicio meteorológico de Noruega); usted no se conecta a ese servicio ni se envía ningún dato suyo.",
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
      pregunta: "¿Qué equipos reparan?",
      respuesta: "Reparamos tarjetas electrónicas, módulos I/O, fuentes de alimentación, cargadores, inversores, computadoras y monitores táctiles, con foco en equipos industriales; también equipos automotrices y médicos. Si su equipo no figura en la lista, consúltenos por teléfono o WhatsApp.",
    },
    {
      pregunta: "¿Las reparaciones tienen garantía?",
      respuesta: "Sí. Todas nuestras reparaciones cuentan con {garantia} meses de garantía.",
    },
    {
      pregunta: "¿Cómo solicito un presupuesto?",
      respuesta: "Primero revisamos y diagnosticamos el equipo. Con el diagnóstico le enviamos el presupuesto y usted decide si desea continuar con la reparación.",
    },
    {
      pregunta: "¿Dónde están y cuál es su horario de atención?",
      respuesta: "Nos encontramos en {calle}, {comuna}. Atendemos {horarioMin}.",
    },
    {
      pregunta: "¿Cómo puedo contactarlos?",
      respuesta: "Por llamada telefónica, mensaje de texto o WhatsApp, al número principal indicado en esta página.",
    },
    {
      pregunta: "¿Atienden fuera de Santiago?",
      respuesta:
        "Nuestra cobertura es la Región Metropolitana. Con coordinación previa también podemos atender en otras regiones de Chile; consúltenos por WhatsApp o teléfono.",
    },
  ],
};

export type Diccionario = typeof es;
