import type { EjercicioCalculo, PreguntaCalculo } from './tipos'

/**
 * Convierte lo que escribe el estudiante en número: admite coma o punto decimal, «%», espacios,
 * separador de miles y fracciones simples («3/4»). Devuelve `null` si no se entiende.
 */
export function parsearNumero(texto: string): number | null {
  let t = texto.trim().replace(/\s+/g, '').replace(/−/g, '-').replace(/%$/, '')
  if (t === '') return null
  const fraccion = t.split('/')
  if (fraccion.length === 2) {
    const a = parsearNumero(fraccion[0])
    const b = parsearNumero(fraccion[1])
    return a === null || b === null || b === 0 ? null : a / b
  }
  const puntos = (t.match(/\./g) ?? []).length
  const comas = (t.match(/,/g) ?? []).length
  if (puntos > 0 && comas > 0) {
    // el último separador es el decimal; el otro separa miles
    const decimal = t.lastIndexOf('.') > t.lastIndexOf(',') ? '.' : ','
    const miles = decimal === '.' ? ',' : '.'
    t = t.split(miles).join('').replace(decimal, '.')
  } else if (comas > 1) {
    if (!/^[+-]?\d{1,3}(,\d{3})+$/.test(t)) return null
    t = t.replace(/,/g, '') // 1,234,567
  } else if (comas === 1) {
    t = t.replace(',', '.')
  } else if (puntos > 1) {
    if (!/^[+-]?\d{1,3}(\.\d{3})+$/.test(t)) return null
    t = t.replace(/\./g, '') // 1.234.567
  }
  return /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(t) ? Number(t) : null
}

/** Cantidad de decimales con que está escrito un número (0.05 → 2). */
function decimales(n: number): number {
  const s = String(n)
  if (/e-/.test(s)) return Number(s.split('e-')[1]) + (s.split('e-')[0].split('.')[1]?.length ?? 0)
  return s.split('.')[1]?.length ?? 0
}

/** Error absoluto aceptado para una pregunta numérica. */
export function toleranciaDe(valor: number, tolerancia?: number): number {
  if (tolerancia !== undefined) return tolerancia
  const d = decimales(valor)
  return d === 0 ? 1e-9 : 0.5 * 10 ** -d + 1e-9
}

export interface ResultadoPregunta {
  ok: boolean
  mensaje: string
}

export function comprobarPregunta(pregunta: PreguntaCalculo, respuesta: string | number | null | undefined): ResultadoPregunta {
  if (pregunta.tipo === 'opcion') {
    if (respuesta === null || respuesta === undefined || respuesta === '') return { ok: false, mensaje: 'Elige una opción.' }
    return Number(respuesta) === pregunta.correcta ? { ok: true, mensaje: 'Correcto.' } : { ok: false, mensaje: 'Esa opción no es la correcta.' }
  }
  if (pregunta.tipo === 'casillas') {
    // la respuesta es la lista de posiciones marcadas, separadas por comas («0,2»)
    const marcadas = String(respuesta ?? '').split(',').filter((x) => x !== '').map(Number)
    if (marcadas.length === 0) return { ok: false, mensaje: 'Marca al menos una opción.' }
    const correctas = new Set(pregunta.correctas)
    const aciertos = marcadas.filter((m) => correctas.has(m)).length
    const sobran = marcadas.length - aciertos
    if (aciertos === correctas.size && sobran === 0) return { ok: true, mensaje: 'Correcto.' }
    if (sobran > 0) return { ok: false, mensaje: 'Hay una opción marcada que no corresponde.' }
    return { ok: false, mensaje: 'Faltan opciones por marcar.' }
  }
  const texto = respuesta === null || respuesta === undefined ? '' : String(respuesta)
  if (texto.trim() === '') return { ok: false, mensaje: 'Escribe tu respuesta.' }
  const n = parsearNumero(texto)
  if (n === null) return { ok: false, mensaje: 'No entiendo ese número: escribe solo cifras, por ejemplo 12.5 o 12,5.' }
  const tol = toleranciaDe(pregunta.valor, pregunta.tolerancia)
  if (Math.abs(n - pregunta.valor) <= tol) return { ok: true, mensaje: 'Correcto.' }
  // pistas de error comunes sin revelar el valor
  if (Math.abs(n + pregunta.valor) <= tol && pregunta.valor !== 0) return { ok: false, mensaje: 'Casi: revisa el signo.' }
  if (pregunta.valor !== 0 && Math.abs(n - pregunta.valor) <= Math.abs(pregunta.valor) * 0.05 + tol) return { ok: false, mensaje: 'Estás cerca: revisa el redondeo o algún paso del cálculo.' }
  return { ok: false, mensaje: 'No coincide: revisa el procedimiento.' }
}

export interface ResultadoEjercicio {
  ok: boolean
  resultados: ResultadoPregunta[]
  mensaje: string
}

export function comprobarCalculo(ejercicio: EjercicioCalculo, respuestas: (string | number | null | undefined)[]): ResultadoEjercicio {
  const resultados = ejercicio.preguntas.map((p, i) => comprobarPregunta(p, respuestas[i]))
  const correctas = resultados.filter((r) => r.ok).length
  const ok = correctas === resultados.length
  const mensaje = ok
    ? '¡Correcto! Todas las respuestas coinciden.'
    : correctas === 0
      ? 'Aún no coincide ninguna respuesta: repasa el procedimiento o pide una pista.'
      : `Llevas ${correctas} de ${resultados.length} respuestas correctas.`
  return { ok, resultados, mensaje }
}
