// Roles y permisos del panel. Es la única fuente de verdad.
//
// IMPORTANTE: estos permisos deben comprobarse SIEMPRE en el servidor, en cada
// acción (guardar, editar, exportar...). Ocultar un botón en la pantalla no
// protege nada: quien conozca la dirección podría intentar la acción igual.

import type { Estado } from "./estados";

export const ROLES = ["ADMIN", "TECNICO", "RECEPCION"] as const;
export type Rol = (typeof ROLES)[number];

export const ETIQUETA_ROL: Record<Rol, string> = {
  ADMIN: "Administrador",
  TECNICO: "Técnico",
  RECEPCION: "Recepcionista",
};

export const ACCIONES = [
  // Órdenes
  "ordenes.crear", // ingresar un equipo (formulario de ingreso)
  "ordenes.enviarFormulario", // enviar el enlace de autorregistro al cliente
  "ordenes.confirmarRecepcion", // PRE_INGRESO → RECEPCION, genera el QR
  "ordenes.verTodas",
  "ordenes.editarTodas",
  "ordenes.cambiarEstado", // revisión, diagnóstico, reparación, entrega...
  // Reparación
  "presupuestos.gestionar",
  "repuestos.gestionar",
  "pagos.ver",
  // Clientes y panel
  "clientes.verTodos",
  "resumen.ver", // tablero con totales y órdenes pendientes
  // Administración
  "campanas.gestionar",
  "datos.exportar",
  "configuracion.editar",
  "usuarios.gestionar",
] as const;
export type Accion = (typeof ACCIONES)[number];

const PERMISOS: Record<Rol, readonly Accion[]> = {
  // Ve y puede todo lo del técnico, más la administración del sistema.
  ADMIN: [...ACCIONES],

  // Ingresa, supervisa y edita las órdenes de todos.
  TECNICO: [
    "ordenes.crear",
    "ordenes.enviarFormulario",
    "ordenes.confirmarRecepcion",
    "ordenes.verTodas",
    "ordenes.editarTodas",
    "ordenes.cambiarEstado",
    "presupuestos.gestionar",
    "repuestos.gestionar",
    "pagos.ver",
    "clientes.verTodos",
    "resumen.ver",
  ],

  // Solo ingresa datos y ve lo que ella misma ingresó.
  RECEPCION: [
    "ordenes.crear",
    "ordenes.enviarFormulario",
    "ordenes.confirmarRecepcion",
  ],
};

export function puede(rol: Rol, accion: Accion): boolean {
  return PERMISOS[rol].includes(accion);
}

type OrdenBasica = {
  estado: Estado;
  /** Usuario que recibió el equipo; null si aún nadie lo confirmó. */
  recibidoPorId: string | null;
};

/** ¿Puede este usuario ver la orden? La recepcionista solo ve las que ella recibió. */
export function puedeVerOrden(
  rol: Rol,
  orden: OrdenBasica,
  usuarioId: string
): boolean {
  if (puede(rol, "ordenes.verTodas")) return true;
  return orden.recibidoPorId === usuarioId;
}

/**
 * ¿Puede este usuario editar los datos de la orden?
 * - Administrador y técnico: siempre.
 * - Recepcionista: solo las que ella recibió y mientras no haya pasado a revisión
 *   (para corregir errores de tipeo sin tocar el trabajo del técnico).
 */
export function puedeEditarOrden(
  rol: Rol,
  orden: OrdenBasica,
  usuarioId: string
): boolean {
  if (puede(rol, "ordenes.editarTodas")) return true;
  const editableEstados: Estado[] = ["PRE_INGRESO", "RECEPCION"];
  return (
    orden.recibidoPorId === usuarioId && editableEstados.includes(orden.estado)
  );
}
