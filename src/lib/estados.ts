// Fuente única de verdad del flujo de una orden de servicio.
// Usado por el panel del técnico, el portal del cliente y los correos.

export const ESTADOS = [
  // El cliente completó el formulario por su cuenta, pero el equipo aún no llega.
  "PRE_INGRESO",
  "RECEPCION",
  "REVISION",
  "DIAGNOSTICO",
  "PRESUPUESTO",
  "DECISION_CLIENTE",
  "SOLICITUD_REPUESTO",
  "REPARACION",
  "PRUEBAS",
  "LISTO_RETIRO",
  "ENTREGADO",
  // Salidas
  "RECHAZADO",
  "SIN_REPARACION",
] as const;

export type Estado = (typeof ESTADOS)[number];

export const SUBESTADOS_REPUESTO = [
  "COTIZANDO",
  "PEDIDO_REALIZADO",
  "EN_TRANSITO",
  "EN_ADUANA",
  "RECIBIDO",
] as const;

export type SubestadoRepuesto = (typeof SUBESTADOS_REPUESTO)[number];

type InfoEstado = {
  /** Texto que ve el cliente */
  etiqueta: string;
  /** Explicación corta para el cliente */
  descripcion: string;
  /** Texto del botón grande del técnico para llegar a este estado */
  accion: string;
};

export const INFO_ESTADO: Record<Estado, InfoEstado> = {
  PRE_INGRESO: {
    etiqueta: "Pendiente de recepción",
    descripcion:
      "Recibimos sus datos. Falta que su equipo llegue a nuestro laboratorio.",
    accion: "Confirmar recepción del equipo",
  },
  RECEPCION: {
    etiqueta: "Recibido",
    descripcion: "Su equipo ingresó a nuestro laboratorio.",
    accion: "Registrar recepción",
  },
  REVISION: {
    etiqueta: "En revisión",
    descripcion: "Estamos revisando el estado general del equipo.",
    accion: "Pasar a Revisión",
  },
  DIAGNOSTICO: {
    etiqueta: "En diagnóstico",
    descripcion: "Estamos identificando la falla y sus causas.",
    accion: "Pasar a Diagnóstico",
  },
  PRESUPUESTO: {
    etiqueta: "Presupuesto enviado",
    descripcion: "Le enviamos el presupuesto para su revisión.",
    accion: "Enviar presupuesto",
  },
  DECISION_CLIENTE: {
    etiqueta: "Esperando su respuesta",
    descripcion: "Esperamos que acepte o rechace el presupuesto.",
    accion: "Esperar respuesta del cliente",
  },
  SOLICITUD_REPUESTO: {
    etiqueta: "Repuesto solicitado",
    descripcion:
      "Estamos gestionando un repuesto. Algunos se importan y pueden demorar.",
    accion: "Solicitar repuesto",
  },
  REPARACION: {
    etiqueta: "En reparación",
    descripcion: "Su equipo está siendo reparado.",
    accion: "Pasar a Reparación",
  },
  PRUEBAS: {
    etiqueta: "En pruebas",
    descripcion: "Verificamos que el equipo funcione correctamente.",
    accion: "Pasar a Pruebas",
  },
  LISTO_RETIRO: {
    etiqueta: "Listo para retiro",
    descripcion: "Su equipo está listo. Puede pasar a retirarlo.",
    accion: "Marcar listo para retiro",
  },
  ENTREGADO: {
    etiqueta: "Entregado",
    descripcion: "Equipo entregado. ¡Gracias por confiar en nosotros!",
    accion: "Marcar entregado",
  },
  RECHAZADO: {
    etiqueta: "Presupuesto rechazado",
    descripcion: "El presupuesto no fue aceptado. El equipo queda para devolución.",
    accion: "Registrar rechazo",
  },
  SIN_REPARACION: {
    etiqueta: "Sin reparación posible",
    descripcion: "No fue posible reparar este equipo.",
    accion: "Marcar sin reparación",
  },
};

export const INFO_SUBESTADO_REPUESTO: Record<SubestadoRepuesto, string> = {
  COTIZANDO: "Cotizando el repuesto",
  PEDIDO_REALIZADO: "Pedido realizado al proveedor",
  EN_TRANSITO: "Repuesto en tránsito",
  EN_ADUANA: "Repuesto en aduana",
  RECIBIDO: "Repuesto recibido",
};

/**
 * Transiciones permitidas. El panel solo muestra estos botones.
 * El repuesto es opcional: tras aceptar el presupuesto se puede ir
 * directo a REPARACION o pasar por SOLICITUD_REPUESTO.
 */
export const TRANSICIONES: Record<Estado, Estado[]> = {
  // Al confirmar la recepción física se genera el QR y el comprobante.
  PRE_INGRESO: ["RECEPCION"],
  RECEPCION: ["REVISION"],
  REVISION: ["DIAGNOSTICO"],
  DIAGNOSTICO: ["PRESUPUESTO", "SIN_REPARACION"],
  PRESUPUESTO: ["DECISION_CLIENTE"],
  // La aceptación/rechazo la define el cliente (o el técnico por teléfono).
  DECISION_CLIENTE: ["SOLICITUD_REPUESTO", "REPARACION", "RECHAZADO"],
  SOLICITUD_REPUESTO: ["REPARACION"],
  REPARACION: ["PRUEBAS", "SIN_REPARACION"],
  PRUEBAS: ["LISTO_RETIRO", "REPARACION"],
  LISTO_RETIRO: ["ENTREGADO"],
  ENTREGADO: [],
  RECHAZADO: ["ENTREGADO"], // devolución del equipo
  SIN_REPARACION: ["ENTREGADO"],
};

/** Pasos que se muestran en la línea de tiempo del cliente (camino feliz). */
export const LINEA_DE_TIEMPO: Estado[] = [
  "RECEPCION",
  "REVISION",
  "DIAGNOSTICO",
  "PRESUPUESTO",
  "DECISION_CLIENTE",
  "SOLICITUD_REPUESTO",
  "REPARACION",
  "PRUEBAS",
  "LISTO_RETIRO",
  "ENTREGADO",
];

export function puedeTransicionar(desde: Estado, hacia: Estado): boolean {
  return TRANSICIONES[desde].includes(hacia);
}
