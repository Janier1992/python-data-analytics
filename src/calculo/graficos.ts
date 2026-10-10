// Cálculos para dibujar los gráficos estadísticos (sin dependencias).
import { pnormEstandar } from '../excel/distribuciones'

/** Marcas «agradables» para un eje entre `min` y `max` (aprox. `n` marcas). */
export function marcasEje(min: number, max: number, n = 5): number[] {
  if (!(max > min)) return [min]
  const bruto = (max - min) / Math.max(1, n)
  const potencia = 10 ** Math.floor(Math.log10(bruto))
  const fraccion = bruto / potencia
  const paso = (fraccion < 1.5 ? 1 : fraccion < 3 ? 2 : fraccion < 7 ? 5 : 10) * potencia
  const inicio = Math.ceil(min / paso - 1e-9) * paso
  const marcas: number[] = []
  for (let v = inicio; v <= max + paso * 1e-9; v += paso) marcas.push(Number(v.toPrecision(12)))
  return marcas
}

/** Percentil con interpolación lineal (el mismo método de `PERCENTIL.INC` y `numpy.percentile`). */
export function percentil(datos: number[], p: number): number {
  const orden = [...datos].sort((a, b) => a - b)
  if (orden.length === 0) return NaN
  const pos = (orden.length - 1) * p
  const i = Math.floor(pos)
  const frac = pos - i
  return i + 1 < orden.length ? orden[i] + frac * (orden[i + 1] - orden[i]) : orden[i]
}

export interface ResumenCaja {
  min: number
  q1: number
  mediana: number
  q3: number
  max: number
  /** Bigote inferior y superior: el dato más extremo dentro de 1,5 × RIC. */
  bigoteInf: number
  bigoteSup: number
  atipicos: number[]
}

export function resumenCaja(datos: number[]): ResumenCaja {
  const q1 = percentil(datos, 0.25)
  const q3 = percentil(datos, 0.75)
  const ric = q3 - q1
  const limInf = q1 - 1.5 * ric
  const limSup = q3 + 1.5 * ric
  const dentro = datos.filter((d) => d >= limInf && d <= limSup)
  return {
    min: Math.min(...datos),
    q1,
    mediana: percentil(datos, 0.5),
    q3,
    max: Math.max(...datos),
    bigoteInf: Math.min(...dentro),
    bigoteSup: Math.max(...dentro),
    atipicos: datos.filter((d) => d < limInf || d > limSup),
  }
}

/** Cortes de las clases de un histograma: los indicados o `k` clases iguales con límites «agradables». */
export function cortesHistograma(datos: number[], cortes?: number[]): number[] {
  if (cortes && cortes.length >= 2) return cortes
  const min = Math.min(...datos)
  const max = Math.max(...datos)
  const k = Math.max(3, Math.ceil(Math.log2(datos.length) + 1))
  const marcas = marcasEje(min, max, k)
  const paso = marcas.length > 1 ? marcas[1] - marcas[0] : 1
  const inicio = Math.floor(min / paso) * paso
  const salida: number[] = []
  for (let v = inicio; v < max + paso; v += paso) salida.push(Number(v.toPrecision(12)))
  return salida
}

/** Frecuencias por clase [a, b); la última clase incluye su límite superior. */
export function frecuenciasHistograma(datos: number[], cortes: number[]): number[] {
  const conteo = new Array(cortes.length - 1).fill(0)
  for (const d of datos) {
    for (let i = 0; i < conteo.length; i++) {
      const ultimo = i === conteo.length - 1
      if (d >= cortes[i] && (d < cortes[i + 1] || (ultimo && d <= cortes[i + 1]))) {
        conteo[i]++
        break
      }
    }
  }
  return conteo
}

export const densidadNormal = (x: number, media: number, desv: number) => Math.exp(-(((x - media) / desv) ** 2) / 2) / (desv * Math.sqrt(2 * Math.PI))

/** Área bajo la normal entre `desde` y `hasta` (null = infinito). */
export function areaNormal(media: number, desv: number, desde: number | null, hasta: number | null): number {
  const a = desde === null ? 0 : pnormEstandar((desde - media) / desv)
  const b = hasta === null ? 1 : pnormEstandar((hasta - media) / desv)
  return b - a
}
