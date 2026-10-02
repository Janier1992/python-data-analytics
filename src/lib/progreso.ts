// Cálculos de progreso para el panel del estudiante.

/** AAAA-MM-DD en hora local. */
export function claveDiaLocal(fecha: Date): string {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${fecha.getFullYear()}-${mes}-${dia}`
}

/**
 * Racha actual: días consecutivos con estudio que terminan hoy o ayer
 * (si hoy todavía no estudiaste, la racha de ayer sigue viva).
 */
export function rachaActual(diasActivos: string[], hoy: Date = new Date()): number {
  const dias = new Set(diasActivos)
  const cursor = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
  if (!dias.has(claveDiaLocal(cursor))) cursor.setDate(cursor.getDate() - 1)
  let racha = 0
  while (dias.has(claveDiaLocal(cursor))) {
    racha++
    cursor.setDate(cursor.getDate() - 1)
  }
  return racha
}

export type EstadoModulo = 'completado' | 'en-curso' | 'sin-empezar'

/** Estado de un módulo según cuántas de sus lecciones están completadas. */
export function estadoDeModulo(hechas: number, total: number): EstadoModulo {
  if (total > 0 && hechas >= total) return 'completado'
  return hechas > 0 ? 'en-curso' : 'sin-empezar'
}

/** Saludo según la hora local. */
export function saludoSegunHora(hora: number): string {
  if (hora < 6) return 'Buenas noches'
  if (hora < 12) return 'Buenos días'
  if (hora < 19) return 'Buenas tardes'
  return 'Buenas noches'
}
