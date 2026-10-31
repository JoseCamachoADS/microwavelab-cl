// Datos de la empresa. COMPLETAR con los datos reales antes de publicar.
// Los campos marcados con "PENDIENTE" no deben salir al público tal cual.

export const empresa = {
  nombre: "Micro Wave Lab CL",
  eslogan: "Reparación especializada de placas y equipos electrónicos",
  aniosTrayectoria: 40, // "más de 40 años" según el dueño
  telefono: "PENDIENTE", // ej: +56 9 XXXX XXXX
  whatsapp: "PENDIENTE", // solo dígitos con código país, ej: 569XXXXXXXX
  correo: "PENDIENTE", // ej: contacto@microwavelab.cl
  direccion: "PENDIENTE",
  comuna: "PENDIENTE",
  horario: "PENDIENTE",
  // URL de la ficha de Google (Google Business Profile) para reseñas
  urlGoogle: "",
} as const;

export const servicios = [
  {
    id: "industrial",
    titulo: "Equipos industriales",
    descripcion:
      "Reparación de placas, variadores, fuentes de poder, controles, PLC y maquinaria que detiene su producción.",
    destacado: true,
  },
  {
    id: "placas",
    titulo: "Placas electrónicas",
    descripcion:
      "Diagnóstico a nivel de componente y reparación de tarjetas electrónicas de todo tipo.",
    destacado: true,
  },
  {
    id: "medico",
    titulo: "Equipos médicos",
    descripcion:
      "Servicio técnico de electrónica para equipamiento médico y clínico.",
    destacado: true,
  },
  {
    id: "domestico",
    titulo: "Electrodomésticos",
    descripcion:
      "Hornos microondas, lavadoras, refrigeradores y otros equipos del hogar.",
    destacado: false,
  },
  {
    id: "automotriz",
    titulo: "Electrónica automotriz",
    descripcion:
      "Módulos, ECU y tableros de instrumentos de vehículos.",
    destacado: false,
  },
  {
    id: "otros",
    titulo: "Otros equipos",
    descripcion:
      "¿Tiene un equipo electrónico que no ve en la lista? Consúltenos.",
    destacado: false,
  },
] as const;
