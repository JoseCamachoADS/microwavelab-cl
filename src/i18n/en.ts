import type { Diccionario } from "./es";

export const en: Diccionario = {
  idioma: {
    nombre: "English",
    corto: "EN",
    htmlLang: "en",
    og: "en_US",
    hl: "en",
    places: "en",
    selector: "Language",
    cambiarA: "Switch to {idioma}",
  },
  meta: {
    titulo: "Electronic board and equipment repair",
    descripcion:
      "Electronics laboratory in La Cisterna, Santiago, Chile. Over {anios} years repairing electronic boards, I/O modules, power supplies, inverters and touch-screen monitors. {garantia}-month warranty.",
  },
  comun: {
    eslogan: "Electronics laboratory: board and equipment repair",
    descripcionEmpresa:
      "We run an electronics laboratory with more than 45 years of experience repairing all kinds of electronic boards, computers, touch-screen monitors, I/O modules, power supplies, chargers and inverters. Diagnostic service with personal attention, adapting to your requirements.",
    horario: "Monday to Friday, 10:00 am to 7:00 pm",
    horarioCorto: "Mon to Fri, 10 am to 7 pm",
    mensajeConsulta: "Hello, I would like to ask about repairing a piece of equipment.",
    mensajeCotizar: "Hello, I would like a quote for repairing a piece of equipment.",
    telefonoNota: "(calls and WhatsApp)",
    externo: "opens in a new tab",
  },
  nav: {
    principal: "Main",
    servicios: "Services",
    proceso: "How we work",
    trayectoria: "Our history",
    preguntas: "FAQ",
    preguntasLarga: "Frequently asked questions",
    contacto: "Contact",
    portal: "Track my equipment",
    privacidad: "Privacy and cookies",
    menuAbrir: "Open menu",
    menuCerrar: "Close menu",
    multimedia: "Media",
    inicioDe: "{nombre}, home",
    pie: "Footer",
    sitio: "The site",
    visitenos: "Visit us",
  },
  pie: {
    titulo: "Has a device that won't turn on?",
    texto:
      "Tell us about the fault and we will point you in the right direction at no cost. Over {anios} years of experience and a {garantia}-month warranty on every repair.",
    whatsapp: "Message us on WhatsApp",
    llamar: "Call",
    derechos: "All rights reserved.",
    irWaze: "Go with Waze",
    linkedin: "LinkedIn",
  },
  whatsapp: { aria: "Message us on WhatsApp", etiqueta: "WhatsApp" },
  cookies: {
    aria: "Cookie notice",
    texto:
      "We use measurement cookies (Google Analytics and Microsoft Clarity) to understand how the site is used and to improve it. We do not use them for advertising. You can accept or decline.",
    mas: "More information",
    aceptar: "Accept",
    rechazar: "Necessary only",
  },
  contador: { etiqueta: "Site visits", aria: "{total} site visits" },
  resenas: {
    ver: "See reviews on Google",
    verTodas: "See all reviews on Google",
    dejar: "Leave a review",
    fuente: "Google Maps reviews",
    uno: "review",
    varias: "reviews",
    enGoogle: "on Google",
    estrellas: "{n} out of 5 stars",
    usuario: "Google user",
    notaIdioma: "Reviews are shown in the language in which they were written.",
  },
  mapa: { titulo: "Location map of {nombre}" },
  clientes: { titulo: "Companies that trust us", pausar: "Pause the film strip", reanudar: "Resume the film strip" },
  multimedia: {
    meta: {
      titulo: "Media",
      descripcion: "Photos of electronic repairs in our laboratory and Micro Wave Lab CL posts on LinkedIn.",
    },
    titulo: "Media",
    bajada: "Real repairs from our laboratory and the news we post on LinkedIn.",
    fotos: {
      h: "Repairs in our laboratory",
      intro: "Real diagnostic and repair work. Tap a photo to see it larger.",
      vacio: "We are preparing the repair gallery. In the meantime, you can follow our news on LinkedIn.",
      todas: "All",
      filtro: "Filter by equipment type",
      ampliar: "Enlarge photo: {texto}",
      cerrar: "Close",
      anterior: "Previous",
      siguiente: "Next",
      contador: "{n} of {total}",
    },
    linkedin: {
      h: "LinkedIn posts",
      intro: "The latest we share as a company: jobs, equipment and laboratory news.",
      cargar: "View post here",
      aviso: "When you view it here, LinkedIn may store data from your browser. If you prefer, open it directly on LinkedIn.",
      abrir: "Open on LinkedIn",
      verTodas: "See all posts on LinkedIn",
      tituloPublicacion: "LinkedIn post",
      mas: "More posts",
      publicacionN: "Post {n} on LinkedIn",
    },
  },
  tecnico: {
    meta: {
      titulo: "Industrial technical service",
      descripcion:
        "Diagnosis and repair of boards, I/O modules, power supplies, inverters and touch-screen monitors for industrial equipment. Request your quote.",
    },
    titulo: "Industrial technical service",
    bajada: "Diagnosis and repair of the electronics in industrial equipment, so it can run again.",
    alcance: {
      h: "Scope",
      items: [
        "Technical diagnosis of electrical and electronic faults.",
        "Component-level repair of boards, I/O modules, power supplies, inverters and touch-screen monitors.",
        "Functional testing before delivery.",
        "Spare-part sourcing, including imported parts.",
      ],
    },
    valor: {
      h: "What you gain",
      items: [
        "Diagnosis before the quote: you decide with the facts in hand.",
        "{garantia}-month warranty on every repair.",
        "Stage-by-stage tracking, so you know where your equipment stands.",
        "Over {anios} years of experience in electronics.",
      ],
    },
    equipos: { h: "Equipment we service" },
    formulario: {
      titulo: "Request a quote",
      intro: "Tell us what the equipment is and what is wrong. The more details, the more precise our reply.",
      nota: "When you continue, you will see your message already written so you can review it; then you open it in WhatsApp and send it. What you type here is not stored on this site.",
      encabezado: "Request from the website (technical service)",
      nombre: "Name",
      empresa: "Company",
      telefono: "Phone",
      correo: "Email",
      area: "Reason",
      equipo: "Type of equipment",
      marca: "Make and model",
      marcaAyuda: "Serial number if you have it",
      falla: "Fault or question",
      urgencia: "Urgency",
      opcional: "(optional)",
      seleccione: "Select",
      areas: ["Equipment repair", "Warranty or after-sales", "General enquiry", "Suggestions or complaints"],
      urgencias: ["Normal", "Urgent: the equipment is stopping operations", "No rush"],
      enviar: "Continue on WhatsApp",
      traduciendo: "Preparing message...",
      revisarTitulo: "Review your message",
      revisarTexto: "This is the message our team will receive, in Spanish together with your original text. If it looks right, open it in WhatsApp and send it.",
      abrir: "Open WhatsApp",
      editar: "Edit again",
      idiomaCliente: "Customer language",
      textoOriginal: "Original text ({idioma})",
      sinTraducir: "not translated, written in {idioma}",
      captcha: {
        etiqueta: "Security check",
        requerido: "Please complete the security check before continuing.",
        fallo: "We could not verify that you are a person. Please try again or message us directly on WhatsApp.",
      },
    },
  },
  inicio: {
    hero: {
      kicker: "Over {anios} years repairing electronics",
      titulo: "If your equipment has stopped, we get it running again",
      texto:
        "Electronics laboratory specialised in boards, I/O modules, power supplies, inverters and touch-screen monitors. Professional diagnosis and a {garantia}-month warranty.",
      cotizar: "Get a quote on WhatsApp",
      llamar: "Call {telefono}",
    },
    queReparamos: {
      titulo: "What we repair",
      texto: "Industrial and general electronics, repaired down to component level.",
      ver: "See all services",
    },
    trayectoria: {
      titulo: "{anios} years of experience under one roof",
      linkedin: "Follow us on LinkedIn",
      porQue: "Why choose us",
      puntos: [
        { t: "Proven experience", d: "over {anios} years repairing electronics." },
        { t: "Warranty", d: "{garantia} months on our repairs." },
        { t: "Diagnosis first", d: "we identify the fault before quoting." },
        { t: "Personal attention", d: "we adapt to your requirements." },
      ],
      proceso: "How the repair process works",
    },
    ubicacion: {
      titulo: "Where to find us",
      maps: "Directions with Google Maps",
      waze: "Directions with Waze",
    },
    resenas: { titulo: "What our customers say" },
    preguntas: { titulo: "Frequently asked questions" },
  },
  servicios: {
    meta: {
      titulo: "Services",
      descripcion:
        "Repair of electronic boards and of industrial, medical, household and automotive equipment.",
    },
    titulo: "Services",
    bajada: "We service electronic equipment of every kind, with a focus on industry.",
    solicitar: "Request a quote",
    items: {
      tarjetas: {
        titulo: "Electronic boards",
        descripcion: "Diagnosis and repair of all kinds of electronic boards and circuit boards.",
      },
      industrial: {
        titulo: "I/O modules and industrial equipment",
        descripcion:
          "Repair of input/output modules and of the electronics in industrial equipment.",
      },
      fuentes: {
        titulo: "Power supplies, chargers and inverters",
        descripcion:
          "Power supplies, chargers and inverters repaired down to component level.",
      },
      monitores: {
        titulo: "Touch-screen monitors",
        descripcion: "Repair of touch-screen monitors and equipment displays.",
      },
      computadoras: {
        titulo: "Computers",
        descripcion: "Electronic diagnosis and repair of computers.",
      },
      otros: {
        titulo: "Other electronic equipment",
        descripcion:
          "Household, automotive, medical and other equipment. Ask us about your case.",
      },
    },
  },
  proceso: {
    meta: {
      titulo: "How we work",
      descripcion:
        "Stages of a repair at Micro Wave Lab CL: reception, diagnosis, quote, repair, testing and delivery with warranty.",
    },
    titulo: "How we work",
    bajada:
      "Every piece of equipment goes through the same stages, so you always know where your repair stands.",
    notaRepuesto: "This stage only happens if the repair requires a spare part.",
    garantiaAntes: "All our repairs come with a ",
    garantiaNegrita: "{garantia}-month warranty",
    garantiaDespues: ".",
    cta: "Ask about my equipment",
    pasos: {
      PRE_INGRESO: { etiqueta: "Awaiting drop-off", descripcion: "We have your details. Your equipment still needs to arrive at our laboratory." },
      RECEPCION: { etiqueta: "Received", descripcion: "Your equipment has arrived at our laboratory." },
      REVISION: { etiqueta: "Under inspection", descripcion: "We are checking the overall condition of the equipment." },
      DIAGNOSTICO: { etiqueta: "Under diagnosis", descripcion: "We are identifying the fault and its causes." },
      PRESUPUESTO: { etiqueta: "Quote sent", descripcion: "We have sent you the quote for your review." },
      DECISION_CLIENTE: { etiqueta: "Waiting for your reply", descripcion: "We are waiting for you to accept or decline the quote." },
      SOLICITUD_REPUESTO: { etiqueta: "Part ordered", descripcion: "We are sourcing a spare part. Some are imported and can take longer." },
      REPARACION: { etiqueta: "Being repaired", descripcion: "Your equipment is being repaired." },
      PRUEBAS: { etiqueta: "Under testing", descripcion: "We check that the equipment works correctly." },
      LISTO_RETIRO: { etiqueta: "Ready for pickup", descripcion: "Your equipment is ready. You can come and collect it." },
      ENTREGADO: { etiqueta: "Delivered", descripcion: "Equipment delivered. Thank you for trusting us!" },
      RECHAZADO: { etiqueta: "Quote declined", descripcion: "The quote was not accepted. The equipment is held for return." },
      SIN_REPARACION: { etiqueta: "Not repairable", descripcion: "It was not possible to repair this equipment." },
    },
  },
  contacto: {
    meta: {
      titulo: "Contact",
      descripcion:
        "Contact us by phone or WhatsApp, or visit us at General Freire 80, La Cisterna, Santiago, Chile.",
    },
    titulo: "Contact",
    bajada: "Tell us which equipment needs repair and we will reply as soon as possible.",
    telefonoNota: "Calls, text messages and WhatsApp.",
    whatsapp: "Message us on WhatsApp",
    maps: "Google Maps",
    waze: "Waze",
    formulario: {
      titulo: "Quote request form",
      texto:
        "Fill in the technical service form with your equipment and the fault; WhatsApp opens with your message already written.",
      ir: "Go to the form",
    },
  },
  portal: {
    meta: { titulo: "Track my equipment" },
    titulo: "Track my equipment",
    bajada:
      "Soon you will be able to sign in with your email address to see which stage your repair is at, review and accept your quote, and pay online.",
    nota: "In the meantime, if you need to know the status of your equipment, message us on WhatsApp with your name and the equipment you left with us.",
  },
  privacidad: {
    meta: {
      titulo: "Privacy and cookies",
      descripcion: "What data this site measures, with which tools, and how to decline measurement.",
    },
    titulo: "Privacy and cookies",
    bajada: "What we measure on this site, with which tools, and how you can decline.",
    medimos: {
      h: "What we measure",
      intro:
        "If you accept, we use two tools to find out how many people visit the site, which pages they view and whether they use the WhatsApp, phone or map buttons:",
      items: [
        {
          b: "Google Analytics 4:",
          t: "aggregated visit statistics, which we then present in Looker Studio reports.",
        },
        {
          b: "Microsoft Clarity:",
          t: "heatmaps and anonymous recordings of browsing to find parts of the site that are hard to use. Text typed into form fields is masked by default.",
        },
      ],
    },
    contador: {
      h: "Visit counter",
      p: "The visit number in the footer only adds up how many times the site is opened. It stores no personal data, uses no cookies and does not depend on your choice about measurement.",
    },
    noHacemos: {
      h: "What we do not do",
      p: "We do not use these cookies for advertising. We do not measure the equipment tracking pages or the internal panel, where customer data is held.",
    },
    cambiar: {
      h: "How to change your choice",
      p: "If you chose \"Accept\" and want to withdraw it, clear this site's data in your browser settings and the notice will appear again. You can also block cookies from the browser itself.",
    },
    traduccion: {
      h: "Form and translation",
      p: "If you write in English or German, the text describing the fault is sent to the Google Cloud Translation service to be translated into Spanish before WhatsApp opens, because our team works in Spanish. The text is not stored on this site.",
    },
    multimedia: {
      h: "Media and LinkedIn",
      p: "The repair photos are hosted on this site. LinkedIn posts only load if you press the button on each one; at that moment LinkedIn may receive data from your browser and store cookies, according to its own privacy policy.",
    },
    seguridad: {
      h: "Form security",
      p: "To prevent automated messages (bots), the form uses Cloudflare Turnstile, a captcha that rarely asks you to solve anything. Cloudflare receives technical data from your browser only to check that you are a person; it is not used for advertising. We keep a count of how many times the site's external services are called (translation, reviews and this captcha), without storing any personal data.",
    },
    consultas: {
      h: "Questions",
      conCorreo: "For questions about your data, write to us at {correo} or call us on {telefono}.",
      sinCorreo: "For questions about your data, message us on WhatsApp or call us on {telefono}.",
    },
  },
  faq: [
    {
      pregunta: "What kind of equipment do you repair?",
      respuesta:
        "We repair all kinds of electronic boards, computers, touch-screen monitors, I/O modules, power supplies, chargers and inverters. If your equipment is not on the list, ask us by phone or WhatsApp.",
    },
    {
      pregunta: "Do repairs come with a warranty?",
      respuesta: "Yes. Our repairs come with a {garantia}-month warranty.",
    },
    {
      pregunta: "How do I request a quote?",
      respuesta:
        "First we inspect and diagnose your equipment. With the diagnosis we send you the quote, and you decide whether to go ahead with the repair.",
    },
    {
      pregunta: "Where are you and what are your opening hours?",
      respuesta: "We are at {calle}, {comuna}, Santiago, Chile. Our hours are: {horario}.",
    },
    {
      pregunta: "How can I contact you?",
      respuesta:
        "By phone call, text message or WhatsApp on the main number shown on this page.",
    },
  ],
};
