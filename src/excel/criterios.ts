import { comparar, textoANumero } from './conversion'
import { esError } from './tipos'
import type { Escalar } from './tipos'

/** Convierte un patrón con comodines de Excel (* ? y ~ como escape) en una expresión regular. */
export function patronAExpresion(patron: string, anclado = true): RegExp {
  let fuente = ''
  for (let i = 0; i < patron.length; i++) {
    const c = patron[i]
    if (c === '~' && i + 1 < patron.length && '*?~'.includes(patron[i + 1])) {
      fuente += patron[i + 1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      i++
    } else if (c === '*') fuente += '.*'
    else if (c === '?') fuente += '.'
    else fuente += c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
  return new RegExp(anclado ? `^${fuente}$` : fuente, 'is')
}

export const tieneComodines = (t: string) => /[*?]/.test(t)

/**
 * Construye la función de prueba para el criterio de CONTAR.SI, SUMAR.SI y similares.
 * El criterio puede ser un número, un texto con operador («>=10», «<>manzana») o un texto con comodines («Co*»).
 */
export function crearCriterio(criterio: Escalar): (celda: Escalar) => boolean {
  if (esError(criterio)) return () => false
  if (typeof criterio === 'number') return (v) => (typeof v === 'number' ? v === criterio : typeof v === 'string' ? textoANumero(v) === criterio : false)
  if (typeof criterio === 'boolean') return (v) => v === criterio
  if (criterio === null) return (v) => typeof v === 'number' && v === 0

  const m = /^(<=|>=|<>|=|<|>)?([\s\S]*)$/.exec(criterio)!
  const op = m[1] ?? '='
  const resto = m[2]
  const n = textoANumero(resto)

  if (n !== null) {
    switch (op) {
      case '=':
        return (v) => (typeof v === 'number' ? v === n : typeof v === 'string' ? textoANumero(v) === n && v.trim() !== '' : false)
      case '<>':
        return (v) => !(typeof v === 'number' ? v === n : typeof v === 'string' ? textoANumero(v) === n && v.trim() !== '' : false)
      default:
        return (v) => {
          if (typeof v !== 'number') return false
          return op === '<' ? v < n : op === '>' ? v > n : op === '<=' ? v <= n : v >= n
        }
    }
  }

  // Criterio de texto
  if (op === '=' || op === '<>') {
    if (resto === '') {
      // «=» solo: celdas vacías; «<>» solo: celdas no vacías
      return op === '=' ? (v) => v === null || v === '' : (v) => !(v === null || v === '')
    }
    const re = patronAExpresion(resto)
    const coincide = (v: Escalar) => typeof v === 'string' && (tieneComodines(resto) ? re.test(v) : comparar(v, resto) === 0)
    return op === '=' ? coincide : (v) => !coincide(v)
  }
  return (v) => {
    if (typeof v !== 'string') return false
    const c = comparar(v, resto)
    return op === '<' ? c < 0 : op === '>' ? c > 0 : op === '<=' ? c <= 0 : c >= 0
  }
}
