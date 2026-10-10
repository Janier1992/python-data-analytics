// Actividad por curso para los certificados de curso: cuándo empezó, cuándo terminó y cuánto estudió.
// Funciones puras (sin acceso al almacenamiento) para poder probarlas.
import type { ActividadCurso } from '../types'

export type ActividadPorCurso = Record<string, ActividadCurso>

const vacia = (): ActividadCurso => ({ inicioEn: null, completadoEn: null, tiempoSeg: 0 })

/** ¿Están todas las lecciones del curso completadas? Un curso sin lecciones no se completa. */
export function cursoCompleto(completadas: Iterable<string>, leccionIds: string[]): boolean {
  const hechas = new Set(completadas)
  return leccionIds.length > 0 && leccionIds.every((id) => hechas.has(id))
}

/** Fija el inicio del curso la primera vez que se abre una de sus lecciones. */
export function registrarInicio(actividad: ActividadPorCurso, cursoId: string, ahora: number): ActividadPorCurso {
  const actual = actividad[cursoId] ?? vacia()
  if (actual.inicioEn !== null) return actividad
  return { ...actividad, [cursoId]: { ...actual, inicioEn: ahora } }
}

/** Suma tiempo de estudio activo al curso (y fija su inicio si aún no tenía). */
export function registrarTiempo(actividad: ActividadPorCurso, cursoId: string, segundos: number, ahora: number): ActividadPorCurso {
  if (segundos <= 0) return actividad
  const actual = actividad[cursoId] ?? vacia()
  return { ...actividad, [cursoId]: { ...actual, inicioEn: actual.inicioEn ?? ahora, tiempoSeg: actual.tiempoSeg + segundos } }
}

/**
 * Fija la fecha de finalización de los cursos que ya están completos y aún no la tienen (una sola vez).
 * Si no se conoce cuándo empezó el curso (progreso anterior a los certificados de curso) se usa
 * `inicioAlternativo` (por ejemplo, el inicio del programa) o, en su defecto, la fecha de finalización.
 * Con `soloCursoId` solo se revisa ese curso.
 */
export function completarCursosPendientes(
  actividad: ActividadPorCurso,
  completadas: Iterable<string>,
  leccionesPorCurso: Record<string, string[]>,
  ahora: number,
  inicioAlternativo: number | null,
  soloCursoId?: string,
): ActividadPorCurso {
  const hechas = new Set(completadas)
  let siguiente = actividad
  for (const [cursoId, ids] of Object.entries(leccionesPorCurso)) {
    if (soloCursoId && cursoId !== soloCursoId) continue
    const actual = siguiente[cursoId] ?? vacia()
    if (actual.completadoEn !== null || !cursoCompleto(hechas, ids)) continue
    const inicio = Math.min(actual.inicioEn ?? inicioAlternativo ?? ahora, ahora)
    siguiente = { ...siguiente, [cursoId]: { ...actual, inicioEn: inicio, completadoEn: ahora } }
  }
  return siguiente
}

export interface DatosCertificadoCurso {
  inicioEn: number
  completadoEn: number
  tiempoSeg: number
}

/** Datos para emitir el certificado de un curso, o `null` si aún no está completo. */
export function datosCertificadoCurso(actividad: ActividadPorCurso, cursoId: string): DatosCertificadoCurso | null {
  const a = actividad[cursoId]
  if (!a || a.inicioEn === null || a.completadoEn === null) return null
  return { inicioEn: a.inicioEn, completadoEn: a.completadoEn, tiempoSeg: a.tiempoSeg }
}

/** Curso al que corresponde una ruta de lección (`/leccion/:id`) o de curso (`/cursos/:id`), si la hay. */
export function cursoDeRuta(pathname: string, cursoDeLeccion: (leccionId: string) => string | undefined): string | null {
  const leccion = /^\/leccion\/([^/]+)/.exec(pathname)
  if (leccion) return cursoDeLeccion(decodeURIComponent(leccion[1])) ?? null
  const curso = /^\/cursos\/([^/]+)/.exec(pathname)
  return curso ? decodeURIComponent(curso[1]) : null
}
