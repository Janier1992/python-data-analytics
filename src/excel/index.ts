import { esError, esMatriz, ErrorSintaxis, esEjercicioHoja } from './tipos'
import type { Escalar, EjercicioHoja, EjemploHoja, FormatoSalida, Hoja, Matriz, ResultadoEsperado, Valor, ValorCelda } from './tipos'
import { analizarFormula, columnaALetras, funcionesUsadas, leerReferencia, tieneReferencias, trasladarFormula } from './parser'
import { numeroATexto, serialATextoFecha, textoISOASerial } from './conversion'
import { evaluar } from './evaluador'
import type { Contexto } from './evaluador'
import { REF } from './tipos'
import { buscarFuncion, FUNCIONES_DISPONIBLES } from './funciones'

export { ErrorSintaxis, esError, esMatriz, esEjercicioHoja, columnaALetras, leerReferencia, FUNCIONES_DISPONIBLES, funcionesUsadas, trasladarFormula, buscarFuncion }
export type { Escalar, EjercicioHoja, EjemploHoja, FormatoSalida, Hoja, Matriz, ResultadoEsperado, Valor, ValorCelda }

export type ResultadoFormula = { ok: true; valor: Valor } | { ok: false; mensaje: string }

/** Crea el entorno de evaluación de una hoja: calcula las celdas con fórmula (con detección de ciclos). */
export function contextoDeHoja(hoja: Hoja): Contexto {
  const filas = hoja.celdas.length
  const cols = Math.max(0, ...hoja.celdas.map((f) => f.length))
  const memo = new Map<string, Escalar>()
  const enCurso = new Set<string>()

  const ctx: Contexto = {
    filas,
    cols,
    celda(f, c) {
      const crudo = hoja.celdas[f]?.[c]
      if (crudo === undefined || crudo === null) return null
      if (typeof crudo === 'object') return textoISOASerial(crudo.fecha)
      if (typeof crudo === 'string' && crudo.startsWith('=')) {
        const clave = `${f},${c}`
        if (memo.has(clave)) return memo.get(clave)!
        if (enCurso.has(clave)) return REF()
        enCurso.add(clave)
        let v: Escalar
        try {
          const r = evaluar(analizarFormula(crudo), ctx)
          v = esMatriz(r) ? (r[0]?.[0] ?? null) : r
        } catch {
          v = REF()
        }
        enCurso.delete(clave)
        memo.set(clave, v)
        return v
      }
      return crudo
    },
  }
  return ctx
}

/** Evalúa una fórmula sobre una hoja. Los errores de sintaxis se devuelven con un mensaje legible. */
export function evaluarFormula(formula: string, hoja: Hoja): ResultadoFormula {
  try {
    const nodo = analizarFormula(formula)
    return { ok: true, valor: evaluar(nodo, contextoDeHoja(hoja)) }
  } catch (e) {
    if (e instanceof ErrorSintaxis) return { ok: false, mensaje: e.message }
    throw e
  }
}

/** Valor que mostraría la celda: una matriz se reduce a su primer elemento. */
export function primerValor(v: Valor): Escalar {
  return esMatriz(v) ? (v[0]?.[0] ?? null) : v
}

/** Texto de un valor como lo mostraría Excel en español (coma decimal, VERDADERO/FALSO, códigos de error). */
export function formatearValor(v: Valor, formato?: FormatoSalida): string {
  if (esMatriz(v)) return v.map((fila) => fila.map((c) => formatearValor(c, formato)).join(' | ')).join('\n')
  if (esError(v)) return v.codigo
  if (v === null) return ''
  if (typeof v === 'boolean') return v ? 'VERDADERO' : 'FALSO'
  if (typeof v === 'string') return v
  if (formato === 'fecha') return serialATextoFecha(v)
  if (formato === 'porcentaje') return `${numeroATexto(Math.round(v * 10000) / 100).replace('.', ',')} %`
  return numeroATexto(v).replace('.', ',')
}

export function formatearCelda(v: ValorCelda): string {
  if (v === null || v === undefined) return ''
  if (typeof v === 'object') return serialATextoFecha(textoISOASerial(v.fecha))
  if (typeof v === 'number') return numeroATexto(v).replace('.', ',')
  if (typeof v === 'boolean') return v ? 'VERDADERO' : 'FALSO'
  return v
}

function igualesAlEsperado(valor: Escalar, esperado: ResultadoEsperado, tolerancia: number): boolean {
  if (typeof esperado === 'object') return esError(valor) && valor.codigo === esperado.error
  if (esError(valor)) return false
  if (typeof esperado === 'number') return typeof valor === 'number' && Math.abs(valor - esperado) <= tolerancia * Math.max(1, Math.abs(esperado))
  return valor === esperado
}

const textoEsperado = (e: ResultadoEsperado, formato?: FormatoSalida) => (typeof e === 'object' ? e.error : formatearValor(e, formato))

export interface ComprobacionHoja {
  ok: boolean
  mensaje: string
  /** Lo que devolvió la fórmula (una entrada por fila si se copió hacia abajo), ya formateado. */
  resultados: string[]
}

/** Divide «E2» en fila y columna (base 0). */
export function posicionDeCelda(celda: string): { fila: number; col: number } {
  const r = leerReferencia(celda)
  if (!r) throw new Error(`Celda no válida: ${celda}`)
  return { fila: r.fila, col: r.col }
}

/** Comprueba la fórmula escrita por el estudiante contra el resultado esperado del ejercicio. */
export function comprobarEjercicio(ej: EjercicioHoja, formulaEscrita: string): ComprobacionHoja {
  const formula = formulaEscrita.trim()
  if (formula === '' || formula === '=') return { ok: false, mensaje: 'Escribe la fórmula después del signo =.', resultados: [] }
  if (!formula.startsWith('=')) return { ok: false, mensaje: 'Las fórmulas empiezan con el signo =. Por ejemplo: =SUMA(B2:B6).', resultados: [] }

  let nodo
  try {
    nodo = analizarFormula(formula)
  } catch (e) {
    if (e instanceof ErrorSintaxis) return { ok: false, mensaje: `La fórmula tiene un error de escritura: ${e.message}`, resultados: [] }
    throw e
  }
  if (!ej.permiteSinReferencias && !tieneReferencias(nodo)) {
    return { ok: false, mensaje: 'Usa referencias a las celdas de la hoja (por ejemplo B2) en lugar de escribir el resultado a mano: así la fórmula sigue funcionando si cambian los datos.', resultados: [] }
  }

  const filas = ej.rellenarFilas ?? 1
  const esperados = Array.isArray(ej.esperado) ? ej.esperado : [ej.esperado]
  const tol = ej.tolerancia ?? 1e-9
  const origen = posicionDeCelda(ej.celda)
  const resultados: string[] = []
  const ctx = contextoDeHoja(ej.hoja)
  let todoBien = true
  let primerFallo = -1

  for (let i = 0; i < filas; i++) {
    const trasladada = i === 0 ? formula : trasladarFormula(formula, i, 0)
    let valor: Escalar
    if (trasladada === null) {
      resultados.push('#¡REF!')
      todoBien = false
      if (primerFallo < 0) primerFallo = i
      continue
    }
    try {
      valor = primerValor(evaluar(analizarFormula(trasladada), ctx))
    } catch (e) {
      if (e instanceof ErrorSintaxis) return { ok: false, mensaje: e.message, resultados: [] }
      throw e
    }
    resultados.push(formatearValor(valor, ej.formato))
    if (!igualesAlEsperado(valor, esperados[i], tol)) {
      todoBien = false
      if (primerFallo < 0) primerFallo = i
    }
  }

  if (todoBien) {
    return { ok: true, mensaje: filas > 1 ? `Correcto: al copiar la fórmula hacia abajo, las ${filas} filas dan el resultado esperado.` : `Correcto: la fórmula devuelve ${resultados[0]}.`, resultados }
  }
  const fila = origen.fila + primerFallo + 1
  const obtenido = resultados[primerFallo]
  const esperado = textoEsperado(esperados[primerFallo], ej.formato)
  if (filas > 1) {
    return {
      ok: false,
      mensaje: `Al copiar la fórmula hacia abajo, la fila ${fila} da ${obtenido === '' ? '(vacío)' : obtenido} y se esperaba ${esperado}. Revisa qué referencias deben moverse al copiar y cuáles deben quedar fijas con $.`,
      resultados,
    }
  }
  return { ok: false, mensaje: `Tu fórmula devuelve ${obtenido === '' ? '(vacío)' : obtenido}, pero el resultado esperado es ${esperado}.`, resultados }
}

/** Evalúa la solución de un ejercicio (para las pruebas del contenido). */
export function comprobarSolucion(ej: EjercicioHoja): ComprobacionHoja {
  return comprobarEjercicio(ej, ej.solucion)
}

export { columnaALetras as letraDeColumna }

/** Comprueba que cada fórmula de un ejemplo da el resultado declarado. Devuelve los fallos (vacío si todo está bien). */
export function verificarEjemplo(ej: EjemploHoja): string[] {
  const fallos: string[] = []
  const ctx = contextoDeHoja(ej.hoja)
  for (const f of ej.formulas) {
    try {
      const valor = primerValor(evaluar(analizarFormula(f.formula), ctx))
      if (!igualesAlEsperado(valor, f.esperado, 1e-9)) fallos.push(`${f.formula} devolvió ${formatearValor(valor, f.formato)} y se declaró ${textoEsperado(f.esperado, f.formato)}`)
    } catch (e) {
      fallos.push(`${f.formula} no se pudo evaluar: ${(e as Error).message}`)
    }
  }
  return fallos
}
