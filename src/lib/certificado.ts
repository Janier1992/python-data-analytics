// Cálculos del certificado: duración del programa, tiempo de estudio, fechas y código de constancia.

const MS_MINUTO = 60_000
const MS_HORA = 60 * MS_MINUTO
const MS_DIA = 24 * MS_HORA

const plural = (n: number, singular: string, pluralTexto: string) => `${n} ${n === 1 ? singular : pluralTexto}`

/**
 * Cuánto tardó el estudiante entre que empezó y terminó, en lenguaje natural:
 * "menos de una hora", "3 horas y 20 minutos", "1 día", "42 días (6 semanas)".
 */
export function formatearDuracion(inicioEn: number, finEn: number): string {
  const ms = Math.max(0, finEn - inicioEn)
  if (ms < MS_HORA) return 'menos de una hora'
  if (ms < MS_DIA) {
    const horas = Math.floor(ms / MS_HORA)
    const minutos = Math.floor((ms % MS_HORA) / MS_MINUTO)
    return minutos === 0 ? plural(horas, 'hora', 'horas') : `${plural(horas, 'hora', 'horas')} y ${plural(minutos, 'minuto', 'minutos')}`
  }
  const dias = Math.floor(ms / MS_DIA)
  if (dias < 14) return plural(dias, 'día', 'días')
  const semanas = Math.floor(dias / 7)
  return `${dias} días (${plural(semanas, 'semana', 'semanas')})`
}

/** Tiempo de estudio activo en horas y minutos: "12 h 30 min", "45 min", "menos de 1 min". */
export function formatearTiempoEstudio(segundos: number): string {
  const minutosTotales = Math.floor(Math.max(0, segundos) / 60)
  if (minutosTotales < 1) return 'menos de 1 min'
  const horas = Math.floor(minutosTotales / 60)
  const minutos = minutosTotales % 60
  if (horas === 0) return `${minutos} min`
  return minutos === 0 ? `${horas} h` : `${horas} h ${minutos} min`
}

/** "15 de marzo de 2025" */
export function formatearFecha(ms: number): string {
  return new Date(ms).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Cantidad de días (calendario local) distintos con estudio, para mostrar la constancia. */
export function diasDeEstudio(diasActivos: string[]): number {
  return new Set(diasActivos).size
}

/**
 * Código de constancia legible a partir de los datos del certificado (SHA-256 truncado):
 * mismos datos → mismo código. Identifica el documento; no se verifica en ningún servidor.
 */
export async function codigoDeConstancia(datos: { cuentaId: string; nombre: string; inicioEn: number; completadoEn: number }): Promise<string> {
  const entrada = new TextEncoder().encode(`${datos.cuentaId}|${datos.nombre}|${datos.inicioEn}|${datos.completadoEn}`)
  const huella = await globalThis.crypto.subtle.digest('SHA-256', entrada)
  const hex = Array.from(new Uint8Array(huella), (b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
    .slice(0, 12)
  return `AIA-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}`
}

export interface AvanceCertificado {
  leccionesHechas: number
  leccionesTotales: number
  modulosHechos: number
  modulosTotales: number
  porcentaje: number
  completo: boolean
}

/** Cuánto falta para poder emitir el certificado. `modulos` es módulo → ids de sus lecciones. */
export function avanceCertificado(completadas: string[], modulos: Record<string, string[]>): AvanceCertificado {
  const hechas = new Set(completadas)
  const entradas = Object.values(modulos).filter((ids) => ids.length > 0)
  const leccionesTotales = entradas.reduce((n, ids) => n + ids.length, 0)
  const leccionesHechas = entradas.reduce((n, ids) => n + ids.filter((id) => hechas.has(id)).length, 0)
  const modulosHechos = entradas.filter((ids) => ids.every((id) => hechas.has(id))).length
  return {
    leccionesHechas,
    leccionesTotales,
    modulosHechos,
    modulosTotales: entradas.length,
    porcentaje: leccionesTotales === 0 ? 0 : Math.round((leccionesHechas / leccionesTotales) * 100),
    completo: leccionesTotales > 0 && leccionesHechas === leccionesTotales,
  }
}
