// Datos de la empresa. Fuente: información entregada por el dueño.
// Los campos con "PENDIENTE" no se muestran al público hasta completarlos.

export const empresa = {
  nombre: "Micro Wave Lab CL",
  nombreCompleto: "Electrónica Micro Wave Lab CL",
  eslogan: "Laboratorio de electrónica industrial: reparación de tarjetas y equipos",
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
  horario: "Lunes a jueves, de 10:00 a 19:00; viernes, de 10:00 a 13:00",

  linkedin: "https://cl.linkedin.com/company/electr%C3%B3nica-micro-wave-lab",
  // Ficha de Google Maps del negocio (sin parámetros de seguimiento).
  // Se usa para "Cómo llegar" y para "Ver reseñas en Google".
  urlGoogle:
    "https://www.google.com/maps?q=Electronica+Micro+Wave+Lab+-+Gral+Freire+80,+7980110+La+Cisterna,+Regi%C3%B3n+Metropolitana&ftid=0x9662dbce29a80eb9:0x6dd6336a5197aa50",

  descripcion:
    "Laboratorio de electrónica industrial con más de 45 años de trayectoria. Diagnóstico y reparación a nivel de componente de tarjetas electrónicas, módulos I/O, fuentes de alimentación, cargadores, inversores, computadoras y monitores táctiles, con atención personalizada para empresas.",
} as const;

/** Dirección en una línea. */
export const direccionCompleta = `${empresa.direccionCalle}, ${empresa.comuna}, ${empresa.region}, ${empresa.ciudad}`;

/** Enlace a la ficha exacta del negocio en Google Maps. */
export const enlaceMapa: string = empresa.urlGoogle;

/** Enlace para navegar con Waze (abre la app si está instalada en el celular). */
export const enlaceWaze = `https://waze.com/ul?q=${encodeURIComponent(
  `${empresa.direccionCalle}, ${empresa.comuna}, Chile`
)}&navigate=yes`;

/** Mapa de Google embebido en la portada (no requiere clave de API). */
export const urlMapaEmbebido = `https://maps.google.com/maps?q=${encodeURIComponent(
  "Electronica Micro Wave Lab - Gral Freire 80, 7980110 La Cisterna, Región Metropolitana"
)}&hl=es&z=16&output=embed`;

export const servicios = [
  {
    id: "tarjetas",
    titulo: "Tarjetas electrónicas",
    descripcion:
      "Diagnóstico y reparación a nivel de componente de todo tipo de tarjetas y placas electrónicas.",
    destacado: true,
  },
  {
    id: "industrial",
    titulo: "Módulos I/O y electrónica industrial",
    descripcion:
      "Reparación de módulos de entrada y salida y de la electrónica de equipos industriales.",
    destacado: true,
  },
  {
    id: "fuentes",
    titulo: "Fuentes de alimentación, cargadores e inversores",
    descripcion:
      "Reparación a nivel de componente de fuentes de alimentación, cargadores e inversores.",
    destacado: true,
  },
  {
    id: "monitores",
    titulo: "Monitores táctiles y pantallas industriales",
    descripcion: "Reparación de monitores táctiles industriales y de interfaz (HMI), y de pantallas de equipos industriales.",
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
    titulo: "Otros equipos industriales",
    descripcion:
      "Equipos automotrices, médicos y otros equipos industriales. Consulte por su caso.",
    destacado: false,
  },
] as const;

export const preguntasFrecuentes = [
  {
    pregunta: "¿Qué equipos reparan?",
    respuesta:
      "Reparamos tarjetas electrónicas, módulos I/O, fuentes de alimentación, cargadores, inversores, computadoras y monitores táctiles, con foco en equipos industriales; también equipos automotrices y médicos. Si su equipo no figura en la lista, consúltenos por teléfono o WhatsApp.",
  },
  {
    pregunta: "¿Las reparaciones tienen garantía?",
    respuesta: `Sí. Todas nuestras reparaciones cuentan con ${empresa.garantiaMeses} meses de garantía.`,
  },
  {
    pregunta: "¿Cómo solicito un presupuesto?",
    respuesta:
      "Primero revisamos y diagnosticamos el equipo. Con el diagnóstico le enviamos el presupuesto y usted decide si desea continuar con la reparación.",
  },
  {
    pregunta: "¿Dónde están y cuál es su horario de atención?",
    respuesta: `Nos encontramos en ${empresa.direccionCalle}, ${empresa.comuna}. Atendemos ${empresa.horario.toLowerCase()}.`,
  },
  {
    pregunta: "¿Cómo puedo contactarlos?",
    respuesta:
      "Por llamada telefónica, mensaje de texto o WhatsApp, al número principal indicado en esta página.",
  },
] as const;

/**
 * Logos oficiales de terceros (Waze, LinkedIn). No se dibujan a mano: se descargan de sus
 * páginas de marca y se dejan en `public/logos/`. Mientras el valor sea null, los botones
 * muestran un ícono genérico y el nombre. Ejemplo: waze: "/logos/waze.svg"
 */
export const logosExternos: { waze: string | null; linkedin: string | null } = {
  waze: null,
  linkedin: null,
};

/**
 * Empresas que han confiado en el laboratorio y autorizaron mostrarse en el sitio.
 * Solo nombre comercial (sin RUT ni montos). Si `logo` es null se muestra el nombre en texto;
 * para usar su logo, copie el archivo (PNG o SVG, fondo transparente) en public/clientes/
 * y escriba su ruta, por ejemplo "/clientes/silcosil.png". Los logos no se modifican.
 */
export const clientes: readonly { nombre: string; logo: string | null }[] = [
  { nombre: "Metalúrgica Silcosil", logo: null },
  { nombre: "Ingeprover Ingeniería", logo: null },
  { nombre: "RRH Mantenciones", logo: null },
  { nombre: "Hormigones Móviles", logo: null },
  { nombre: "Miski Kakawa", logo: null },
  { nombre: "Equiambiente", logo: null },
  { nombre: "Forbo Siegling Chile", logo: null },
  { nombre: "Multitécnica", logo: null },
  { nombre: "Performance Chile", logo: null },
  { nombre: "Serviphar", logo: null },
  { nombre: "Robustools", logo: null },
  { nombre: "Complementos Sanitarios Chile", logo: null },
  { nombre: "Comercializadora Maquipan", logo: null },
  { nombre: "Factory Regalos y Brandpack", logo: null },
  { nombre: "Soluciones para Compresores", logo: null },
  { nombre: "Ingeniería en Blindaje", logo: null },
  { nombre: "Inversiones A y M", logo: null },
  { nombre: "Sociedad Agrícola Peña Delgado", logo: null },
  { nombre: "System Servicios Eléctricos", logo: null },
];
