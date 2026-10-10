import { DIV0, ErrorExcel, VALOR, esError } from './tipos'
import type { Escalar } from './tipos'

/** Convierte un número al texto que mostraría Excel con formato «General» (hasta 15 cifras significativas). */
export function numeroATexto(n: number): string {
  if (Number.isNaN(n)) return '#¡NUM!'
  if (!Number.isFinite(n)) return '#¡NUM!'
  return String(Number(n.toPrecision(15)))
}

const RE_NUMERO = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/

/** Interpreta un texto como número (admite «12.5», «-3» y «5%»). Devuelve `null` si no es un número. */
export function textoANumero(texto: string): number | null {
  const t = texto.trim()
  if (t === '') return null
  if (RE_NUMERO.test(t)) return Number(t)
  if (t.endsWith('%') && RE_NUMERO.test(t.slice(0, -1).trim())) return Number(t.slice(0, -1).trim()) / 100
  return null
}

/** Valor → número (como en una operación aritmética): vacío = 0, VERDADERO = 1, texto numérico se convierte. */
export function aNumero(v: Escalar): number | ErrorExcel {
  if (esError(v)) return v
  if (v === null) return 0
  if (typeof v === 'number') return v
  if (typeof v === 'boolean') return v ? 1 : 0
  const n = textoANumero(v)
  return n === null ? VALOR() : n
}

/** Valor → texto (como al concatenar con &). */
export function aTexto(v: Escalar): string | ErrorExcel {
  if (esError(v)) return v
  if (v === null) return ''
  if (typeof v === 'string') return v
  if (typeof v === 'boolean') return v ? 'VERDADERO' : 'FALSO'
  return numeroATexto(v)
}

/** Valor → lógico (como la prueba de SI). */
export function aLogico(v: Escalar): boolean | ErrorExcel {
  if (esError(v)) return v
  if (v === null) return false
  if (typeof v === 'boolean') return v
  if (typeof v === 'number') return v !== 0
  const t = v.trim().toUpperCase()
  if (t === 'VERDADERO' || t === 'TRUE') return true
  if (t === 'FALSO' || t === 'FALSE') return false
  return VALOR()
}

const rango = (v: Escalar): number => (v === null ? 0 : typeof v === 'number' ? 1 : typeof v === 'string' ? 2 : 3)

/**
 * Compara dos valores como Excel: números < textos < lógicos; los textos se comparan sin distinguir
 * mayúsculas de minúsculas (pero sí acentos). Un valor vacío se comporta como 0 o como "" según el otro lado.
 */
export function comparar(a: Escalar, b: Escalar): number {
  let x = a
  let y = b
  if (x === null && y === null) return 0
  if (x === null) x = typeof y === 'string' ? '' : typeof y === 'boolean' ? false : 0
  if (y === null) y = typeof x === 'string' ? '' : typeof x === 'boolean' ? false : 0
  if (typeof x !== typeof y) return Math.sign(rango(x as Escalar) - rango(y as Escalar))
  if (typeof x === 'number') return x === (y as number) ? 0 : x < (y as number) ? -1 : 1
  if (typeof x === 'string') return Math.sign(x.localeCompare(y as string, 'es', { sensitivity: 'accent' }))
  return x === y ? 0 : x ? 1 : -1
}

export function dividir(a: number, b: number): number | ErrorExcel {
  return b === 0 ? DIV0() : a / b
}

/** Redondeo como ROUND de Excel: la mitad se aleja del cero. */
export function redondear(x: number, decimales: number): number {
  const d = Math.trunc(decimales)
  const factor = 10 ** Math.abs(d)
  const abs = Math.abs(x)
  const y = d >= 0 ? Math.round(Number((abs * factor).toPrecision(15))) / factor : Math.round(Number((abs / factor).toPrecision(15))) * factor
  return x < 0 ? -y : y
}

const MS_DIA = 86_400_000
const BASE_SERIAL = Date.UTC(1899, 11, 30)

/** Fecha (año, mes 1–12, día) → número de serie de Excel. */
export function fechaASerial(anio: number, mes: number, dia: number): number {
  return Math.round((Date.UTC(anio, mes - 1, dia) - BASE_SERIAL) / MS_DIA)
}

/** Número de serie de Excel → fecha en UTC. */
export function serialAFecha(serial: number): Date {
  return new Date(BASE_SERIAL + Math.floor(serial) * MS_DIA)
}

/** «AAAA-MM-DD» → número de serie. */
export function textoISOASerial(iso: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!m) throw new Error(`Fecha no válida: ${iso}`)
  return fechaASerial(Number(m[1]), Number(m[2]), Number(m[3]))
}

/** Número de serie → «dd/mm/aaaa». */
export function serialATextoFecha(serial: number): string {
  const f = serialAFecha(serial)
  const dd = String(f.getUTCDate()).padStart(2, '0')
  const mm = String(f.getUTCMonth() + 1).padStart(2, '0')
  return `${dd}/${mm}/${f.getUTCFullYear()}`
}
