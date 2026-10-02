// Búsqueda en la guía de referencia: sin distinguir mayúsculas ni tildes, con varias palabras (todas deben aparecer).
import type { EntradaRef } from '../content/reference/tipos'

/** Minúsculas y sin tildes: "Función" → "funcion". */
export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

export function palabrasDe(consulta: string): string[] {
  return normalizar(consulta)
    .split(/\s+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export interface Resultado<T extends EntradaRef = EntradaRef> {
  entrada: T
  puntaje: number
}

/** Puntaje de una entrada para una palabra; 0 significa que no coincide. */
function puntajePalabra(e: EntradaRef, palabra: string): number {
  const nombre = normalizar(e.nombre)
  if (nombre === palabra) return 30
  // "df.head()" debe aparecer al buscar "head": coincidencia al inicio de un identificador del nombre
  if (new RegExp(`(^|[^a-z0-9_])${palabra.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(nombre)) return 20
  if (nombre.includes(palabra)) return 12
  if (e.firma && normalizar(e.firma).includes(palabra)) return 8
  if ((e.parametros ?? []).some((p) => normalizar(p.nombre).includes(palabra))) return 6
  if (normalizar(e.resumen).includes(palabra)) return 5
  if (normalizar(e.grupo).includes(palabra)) return 3
  if (e.descripcion && normalizar(e.descripcion).includes(palabra)) return 2
  if ((e.parametros ?? []).some((p) => normalizar(p.descripcion).includes(palabra))) return 2
  if ((e.notas ?? []).some((n) => normalizar(n).includes(palabra))) return 1
  return 0
}

/**
 * Filtra y ordena entradas por relevancia. Todas las palabras de la consulta deben coincidir en
 * algún campo; el nombre pesa más que el resumen y este más que las notas. Orden estable.
 */
export function buscar<T extends EntradaRef>(entradas: T[], consulta: string): Resultado<T>[] {
  const palabras = palabrasDe(consulta)
  if (palabras.length === 0) return entradas.map((entrada) => ({ entrada, puntaje: 0 }))
  const resultados: Resultado<T>[] = []
  for (const entrada of entradas) {
    let total = 0
    let coincideTodo = true
    for (const palabra of palabras) {
      const p = puntajePalabra(entrada, palabra)
      if (p === 0) {
        coincideTodo = false
        break
      }
      total += p
    }
    if (coincideTodo) resultados.push({ entrada, puntaje: total })
  }
  return resultados
    .map((r, i) => ({ r, i }))
    .sort((a, b) => b.r.puntaje - a.r.puntaje || a.i - b.i)
    .map(({ r }) => r)
}
