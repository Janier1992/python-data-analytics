import { aLogico, aNumero, aTexto, comparar, redondear } from './conversion'
import { buscarFuncion } from './funciones'
import { analizarFormula } from './parser'
import type { Nodo } from './parser'
import { DIV0, ErrorExcel, ErrorSintaxis, NOMBRE, NUM, REF, VALOR, esError, esMatriz } from './tipos'
import type { Escalar, Matriz, Valor } from './tipos'

/** Entorno de evaluación: cómo se obtiene el valor de una celda (ya calculado) y el tamaño de la hoja. */
export interface Contexto {
  filas: number
  cols: number
  celda(fila: number, col: number): Escalar
}

const aEscalar = (v: Valor): Escalar => (esMatriz(v) ? (v.length === 1 && v[0].length === 1 ? v[0][0] : VALOR()) : v)

function operar(op: string, a: Escalar, b: Escalar): Escalar {
  if (esError(a)) return a
  if (esError(b)) return b
  if (op === '&') {
    const x = aTexto(a)
    const y = aTexto(b)
    return esError(x) ? x : esError(y) ? y : x + y
  }
  if (op === '=' || op === '<>' || op === '<' || op === '>' || op === '<=' || op === '>=') {
    const c = comparar(a, b)
    return op === '=' ? c === 0 : op === '<>' ? c !== 0 : op === '<' ? c < 0 : op === '>' ? c > 0 : op === '<=' ? c <= 0 : c >= 0
  }
  const x = aNumero(a)
  const y = aNumero(b)
  if (esError(x)) return x
  if (esError(y)) return y
  switch (op) {
    case '+':
      return x + y
    case '-':
      return x - y
    case '*':
      return x * y
    case '/':
      return y === 0 ? DIV0() : x / y
    case '^': {
      if (x === 0 && y === 0) return NUM()
      if (x === 0 && y < 0) return DIV0()
      const r = x ** y
      return Number.isFinite(r) ? r : NUM()
    }
  }
  return VALOR()
}

/** Aplica una operación binaria con difusión: escalar con matriz, o matrices del mismo tamaño elemento a elemento. */
function operarValores(op: string, a: Valor, b: Valor): Valor {
  if (!esMatriz(a) && !esMatriz(b)) return operar(op, a, b)
  const ma: Matriz = esMatriz(a) ? a : [[a]]
  const mb: Matriz = esMatriz(b) ? b : [[b]]
  const filas = Math.max(ma.length, mb.length)
  const cols = Math.max(ma[0]?.length ?? 0, mb[0]?.length ?? 0)
  const alto = (m: Matriz) => m.length
  const ancho = (m: Matriz) => m[0]?.length ?? 0
  const compatible = (m: Matriz) => (alto(m) === filas || alto(m) === 1) && (ancho(m) === cols || ancho(m) === 1)
  if (!compatible(ma) || !compatible(mb)) return VALOR()
  const salida: Matriz = []
  for (let f = 0; f < filas; f++) {
    const fila: Escalar[] = []
    for (let c = 0; c < cols; c++) fila.push(operar(op, ma[alto(ma) === 1 ? 0 : f][ancho(ma) === 1 ? 0 : c], mb[alto(mb) === 1 ? 0 : f][ancho(mb) === 1 ? 0 : c]))
    salida.push(fila)
  }
  return salida
}

function rango(a: { col: number; fila: number }, b: { col: number; fila: number }, ctx: Contexto): Matriz {
  const f0 = Math.min(a.fila, b.fila)
  const f1 = Math.max(a.fila, b.fila)
  const c0 = Math.min(a.col, b.col)
  const c1 = Math.max(a.col, b.col)
  const salida: Matriz = []
  for (let f = f0; f <= f1; f++) {
    const fila: Escalar[] = []
    for (let c = c0; c <= c1; c++) fila.push(ctx.celda(f, c))
    salida.push(fila)
  }
  return salida
}

/**
 * Evalúa un nodo. `comoArgumento` hace que una referencia a una sola celda se entregue como matriz 1×1
 * (así las funciones saben que viene de una celda y no de un valor escrito en la fórmula).
 */
export function evaluar(nodo: Nodo, ctx: Contexto, comoArgumento = false): Valor {
  switch (nodo.t) {
    case 'num':
      return nodo.v
    case 'str':
      return nodo.v
    case 'bool':
      return nodo.v
    case 'vacio':
      return null
    case 'ref': {
      if (nodo.r.fila >= 1_048_576) return REF()
      const v = ctx.celda(nodo.r.fila, nodo.r.col)
      return comoArgumento ? [[v]] : v
    }
    case 'rango':
      return rango(nodo.a, nodo.b, ctx)
    case 'colrango':
      return rango({ col: nodo.a.col, fila: 0 }, { col: nodo.b.col, fila: Math.max(0, ctx.filas - 1) }, ctx)
    case 'un': {
      const v = evaluar(nodo.e, ctx)
      if (nodo.op === '+') return v
      return operarValores('*', v, -1)
    }
    case 'pct':
      return operarValores('/', evaluar(nodo.e, ctx), 100)
    case 'bin':
      return operarValores(nodo.op, evaluar(nodo.l, ctx), evaluar(nodo.r, ctx))
    case 'fn': {
      if (nodo.nombre.startsWith('#NOMBRE:')) return NOMBRE()
      const f = buscarFuncion(nodo.nombre)
      if (!f) return NOMBRE()
      const { min, max } = f.def
      if (nodo.args.length < min || nodo.args.length > max) {
        const rango = min === max ? `${min}` : max >= 255 ? `al menos ${min}` : `entre ${min} y ${max}`
        throw new ErrorSintaxis(`La función ${nodo.nombre} necesita ${rango} argumento${min === 1 && max === 1 ? '' : 's'}, pero tiene ${nodo.args.length}.`, 0)
      }
      const args = nodo.args.map((a) => evaluar(a, ctx, true))
      return f.def.fn(args)
    }
  }
}

export { analizarFormula, aLogico, aEscalar, redondear, ErrorExcel }
