// Progreso por curso para las tarjetas, la página de curso y la barra lateral.

export type EstadoCurso = 'proximamente' | 'sin-empezar' | 'en-curso' | 'completado'

export interface ProgresoCurso {
  total: number
  hechas: number
  /** 0–100, redondeado. */
  porcentaje: number
  estado: EstadoCurso
  /** Lección a la que lleva el botón principal: la que quedó a medias, la primera pendiente o (si está completo) la primera. */
  siguienteId: string | null
}

/** Minutos de estudio estimados por lección (concepto, ejemplos, práctica, reto y quiz). */
export const MINUTOS_POR_LECCION = 25

/** Horas de estudio estimadas, redondeadas (mínimo 1). */
export function horasEstimadas(totalLecciones: number): number {
  return Math.max(1, Math.round((totalLecciones * MINUTOS_POR_LECCION) / 60))
}

export function progresoDeCurso(
  leccionIds: string[],
  completadas: Iterable<string>,
  opciones: { proximamente?: boolean; ultimaLeccionId?: string | null } = {},
): ProgresoCurso {
  const hechasSet = new Set(completadas)
  const total = leccionIds.length
  const hechas = leccionIds.filter((id) => hechasSet.has(id)).length
  const porcentaje = total === 0 ? 0 : Math.round((hechas / total) * 100)

  if (opciones.proximamente || total === 0) {
    return { total, hechas, porcentaje, estado: 'proximamente', siguienteId: null }
  }

  const estado: EstadoCurso = hechas >= total ? 'completado' : hechas > 0 ? 'en-curso' : 'sin-empezar'
  const ultima = opciones.ultimaLeccionId
  const aMedias = ultima && leccionIds.includes(ultima) && !hechasSet.has(ultima) ? ultima : null
  const siguienteId = aMedias ?? leccionIds.find((id) => !hechasSet.has(id)) ?? leccionIds[0]
  return { total, hechas, porcentaje, estado, siguienteId }
}
