// Datos de la empresa. Fuente: información entregada por el dueño.
// Los campos con "PENDIENTE" no se muestran al público hasta completarlos.

export const empresa = {
  nombre: "Micro Wave Lab CL",
  nombreCompleto: "Electrónica Micro Wave Lab CL",
  eslogan: "Laboratorio electrónico: reparación de tarjetas y equipos",
  aniosTrayectoria: 45, // "más de 45 años"
  garantiaMeses: 6,
  sitioUrl: "https://electronicamicrowavelab.cl",

  telefono: "+56 9 6418 3027", // llamadas y mensajes de texto
  whatsapp: "56964183027", // solo dígitos, con código de país
  correo: "PENDIENTE", // ej: contacto@electronicamicrowavelab.cl

  direccionCalle: "General Freire 80",
  comuna: "La Cisterna",
  region: "Región Metropolitana",
  ciudad: "Santiago de Chile",
  horario: "Lunes a viernes, de 10:00 a 19:00",

  linkedin: "https://cl.linkedin.com/company/electr%C3%B3nica-micro-wave-lab",
  // Ficha de Google Maps del negocio (sin parámetros de seguimiento).
  // Se usa para "Cómo llegar" y para "Ver reseñas en Google".
  urlGoogle:
    "https://www.google.com/maps?q=Electronica+Micro+Wave+Lab+-+Gral+Freire+80,+7980110+La+Cisterna,+Regi%C3%B3n+Metropolitana&ftid=0x9662dbce29a80eb9:0x6dd6336a5197aa50",

  descripcion:
    "Prestamos servicio de laboratorio electrónico, con más de 45 años de experiencia en la reparación de todo tipo de tarjetas electrónicas, computadoras, monitores táctiles, módulos I/O, fuentes de alimentación, cargadores e inversores. Servicio de diagnóstico, con atención personalizada y adaptándonos a sus requerimientos.",
} as const;

/** Dirección en una línea. */
export const direccionCompleta = `${empresa.direccionCalle}, ${empresa.comuna}, ${empresa.region}, ${empresa.ciudad}`;

/** Enlace a la ficha exacta del negocio en Google Maps. */
export const enlaceMapa: string = empresa.urlGoogle;

export const servicios = [
  {
    id: "tarjetas",
    titulo: "Tarjetas electrónicas",
    descripcion:
      "Diagnóstico y reparación de todo tipo de tarjetas y placas electrónicas.",
    destacado: true,
  },
  {
    id: "industrial",
    titulo: "Módulos I/O y equipos industriales",
    descripcion:
      "Reparación de módulos de entrada y salida y de la electrónica de equipos industriales.",
    destacado: true,
  },
  {
    id: "fuentes",
    titulo: "Fuentes, cargadores e inversores",
    descripcion:
      "Fuentes de alimentación, cargadores e inversores reparados a nivel de componente.",
    destacado: true,
  },
  {
    id: "monitores",
    titulo: "Monitores táctiles",
    descripcion: "Reparación de monitores táctiles y pantallas de equipos.",
    destacado: false,
  },
  {
    id: "computadoras",
    titulo: "Computadoras",
    descripcion: "Diagnóstico y reparación electrónica de computadoras.",
    destacado: false,
  },
  {
    id: "otros",
    titulo: "Otros equipos electrónicos",
    descripcion:
      "Equipos domésticos, automotrices, médicos y otros. Consúltenos por su caso.",
    destacado: false,
  },
] as const;

export const preguntasFrecuentes = [
  {
    pregunta: "¿Qué tipo de equipos reparan?",
    respuesta:
      "Reparamos todo tipo de tarjetas electrónicas, computadoras, monitores táctiles, módulos I/O, fuentes de alimentación, cargadores e inversores. Si su equipo no aparece en la lista, consúltenos por teléfono o WhatsApp.",
  },
  {
    pregunta: "¿Las reparaciones tienen garantía?",
    respuesta: `Sí. Nuestras reparaciones cuentan con ${empresa.garantiaMeses} meses de garantía.`,
  },
  {
    pregunta: "¿Cómo solicito un presupuesto?",
    respuesta:
      "Primero revisamos y diagnosticamos su equipo. Con el diagnóstico le enviamos el presupuesto y usted decide si desea continuar con la reparación.",
  },
  {
    pregunta: "¿Dónde están y en qué horario atienden?",
    respuesta: `Estamos en ${empresa.direccionCalle}, ${empresa.comuna}. Atendemos ${empresa.horario.toLowerCase()}.`,
  },
  {
    pregunta: "¿Cómo puedo contactarlos?",
    respuesta:
      "Por llamada telefónica, mensaje de texto o WhatsApp al número principal que aparece en esta página.",
  },
] as const;
