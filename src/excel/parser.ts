import { tokenizar } from './lexer'
import type { TipoToken, Token } from './lexer'
import { ErrorSintaxis } from './tipos'

export interface RefCelda {
  col: number // 0 = A
  fila: number // 0 = fila 1
  absCol: boolean
  absFila: boolean
}

export type Nodo =
  | { t: 'num'; v: number }
  | { t: 'str'; v: string }
  | { t: 'bool'; v: boolean }
  | { t: 'vacio' }
  | { t: 'ref'; r: RefCelda }
  | { t: 'rango'; a: RefCelda; b: RefCelda }
  | { t: 'colrango'; a: { col: number; abs: boolean }; b: { col: number; abs: boolean } }
  | { t: 'un'; op: '-' | '+'; e: Nodo }
  | { t: 'pct'; e: Nodo }
  | { t: 'bin'; op: string; l: Nodo; r: Nodo }
  | { t: 'fn'; nombre: string; args: Nodo[] }

const RE_CELDA = /^(\$?)([A-Za-z]{1,3})(\$?)(\d+)$/
const RE_COLUMNA = /^(\$?)([A-Za-z]{1,3})$/

/** «A» → 0, «B» → 1, «AA» → 26. */
export function letrasAColumna(letras: string): number {
  let n = 0
  for (const ch of letras.toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64)
  return n - 1
}

/** 0 → «A», 26 → «AA». */
export function columnaALetras(col: number): string {
  let n = col + 1
  let s = ''
  while (n > 0) {
    const r = (n - 1) % 26
    s = String.fromCharCode(65 + r) + s
    n = Math.floor((n - 1) / 26)
  }
  return s
}

/** Interpreta una referencia como «B7» o «$B$7». Devuelve `null` si el texto no es una referencia válida. */
export function leerReferencia(texto: string): RefCelda | null {
  const m = RE_CELDA.exec(texto)
  if (!m) return null
  const col = letrasAColumna(m[2])
  const fila = Number(m[4]) - 1
  if (fila < 0 || col > 16383) return null
  return { col, fila, absCol: m[1] === '$', absFila: m[3] === '$' }
}

export function textoReferencia(r: RefCelda): string {
  return `${r.absCol ? '$' : ''}${columnaALetras(r.col)}${r.absFila ? '$' : ''}${r.fila + 1}`
}

class Analizador {
  private pos = 0
  constructor(private readonly tokens: Token[]) {}

  private get actual(): Token {
    return this.tokens[this.pos]
  }
  private tipo(): TipoToken {
    return this.tokens[this.pos].tipo
  }
  private avanzar(): Token {
    return this.tokens[this.pos++]
  }
  private esOp(...ops: string[]): boolean {
    return this.tipo() === 'op' && ops.includes(this.actual.texto)
  }

  analizar(): Nodo {
    if (this.tipo() === 'fin') throw new ErrorSintaxis('La fórmula está vacía: escribe algo después del signo =.', 0)
    const nodo = this.comparacion()
    if (this.tipo() !== 'fin') {
      const t = this.actual
      if (t.tipo === 'cierra') throw new ErrorSintaxis('Hay un paréntesis de cierre «)» de más.', t.inicio)
      throw new ErrorSintaxis(`No se esperaba «${t.texto}» en esa posición. ¿Falta un operador o un separador de argumentos?`, t.inicio)
    }
    return nodo
  }

  private comparacion(): Nodo {
    let izq = this.concatenacion()
    while (this.esOp('=', '<>', '<', '>', '<=', '>=')) {
      const op = this.avanzar().texto
      izq = { t: 'bin', op, l: izq, r: this.concatenacion() }
    }
    return izq
  }
  private concatenacion(): Nodo {
    let izq = this.suma()
    while (this.esOp('&')) {
      this.avanzar()
      izq = { t: 'bin', op: '&', l: izq, r: this.suma() }
    }
    return izq
  }
  private suma(): Nodo {
    let izq = this.producto()
    while (this.esOp('+', '-')) {
      const op = this.avanzar().texto
      izq = { t: 'bin', op, l: izq, r: this.producto() }
    }
    return izq
  }
  private producto(): Nodo {
    let izq = this.potencia()
    while (this.esOp('*', '/')) {
      const op = this.avanzar().texto
      izq = { t: 'bin', op, l: izq, r: this.potencia() }
    }
    return izq
  }
  // En Excel el signo menos unario se aplica antes que ^ (-2^2 = 4) y ^ se evalúa de izquierda a derecha.
  private potencia(): Nodo {
    let izq = this.unario()
    while (this.esOp('^')) {
      this.avanzar()
      izq = { t: 'bin', op: '^', l: izq, r: this.unario() }
    }
    return izq
  }
  private unario(): Nodo {
    if (this.esOp('-', '+')) {
      const op = this.avanzar().texto as '-' | '+'
      return { t: 'un', op, e: this.unario() }
    }
    return this.postfijo()
  }
  private postfijo(): Nodo {
    let e = this.primario()
    while (this.tipo() === 'pct') {
      this.avanzar()
      e = { t: 'pct', e }
    }
    return e
  }

  private primario(): Nodo {
    const t = this.actual
    if (t.tipo === 'num') {
      this.avanzar()
      return { t: 'num', v: t.valor as number }
    }
    if (t.tipo === 'str') {
      this.avanzar()
      return { t: 'str', v: t.valor as string }
    }
    if (t.tipo === 'abre') {
      this.avanzar()
      const e = this.comparacion()
      if (this.tipo() !== 'cierra') throw new ErrorSintaxis('Falta cerrar un paréntesis «)».', this.actual.inicio)
      this.avanzar()
      return e
    }
    if (t.tipo === 'id') return this.identificador()
    if (t.tipo === 'fin') throw new ErrorSintaxis('La fórmula termina de forma inesperada: falta un valor al final.', t.inicio)
    throw new ErrorSintaxis(`No se esperaba «${t.texto}» en esa posición.`, t.inicio)
  }

  private identificador(): Nodo {
    const t = this.avanzar()
    // Llamada a función
    if (this.tipo() === 'abre') {
      this.avanzar()
      const args: Nodo[] = []
      if (this.tipo() === 'cierra') {
        this.avanzar()
        return { t: 'fn', nombre: t.texto.toUpperCase(), args }
      }
      for (;;) {
        // Argumento vacío (por ejemplo SI(A1;;5))
        if (this.tipo() === 'sep' || this.tipo() === 'cierra') args.push({ t: 'vacio' })
        else args.push(this.comparacion())
        if (this.tipo() === 'sep') {
          this.avanzar()
          continue
        }
        if (this.tipo() === 'cierra') {
          this.avanzar()
          break
        }
        throw new ErrorSintaxis(
          this.tipo() === 'fin' ? `Falta cerrar el paréntesis de la función ${t.texto.toUpperCase()}.` : `No se esperaba «${this.actual.texto}» dentro de los argumentos de ${t.texto.toUpperCase()}.`,
          this.actual.inicio,
        )
      }
      return { t: 'fn', nombre: t.texto.toUpperCase(), args }
    }

    const mayus = t.texto.toUpperCase()
    if (mayus === 'VERDADERO' || mayus === 'TRUE') return { t: 'bool', v: true }
    if (mayus === 'FALSO' || mayus === 'FALSE') return { t: 'bool', v: false }

    // Referencia o rango
    const a = leerReferencia(t.texto)
    if (a) {
      if (this.tipo() === 'dospuntos') {
        this.avanzar()
        const sig = this.actual
        const b = sig.tipo === 'id' ? leerReferencia(sig.texto) : null
        if (!b) throw new ErrorSintaxis('Después de «:» debe ir una referencia de celda (por ejemplo A1:B5).', sig.inicio)
        this.avanzar()
        return { t: 'rango', a, b }
      }
      return { t: 'ref', r: a }
    }
    // Rango de columnas completas (A:A)
    const colA = RE_COLUMNA.exec(t.texto)
    if (colA && this.tipo() === 'dospuntos') {
      this.avanzar()
      const sig = this.actual
      const colB = sig.tipo === 'id' ? RE_COLUMNA.exec(sig.texto) : null
      if (!colB) throw new ErrorSintaxis('Después de «:» debe ir una columna (por ejemplo A:A).', sig.inicio)
      this.avanzar()
      return {
        t: 'colrango',
        a: { col: letrasAColumna(colA[2]), abs: colA[1] === '$' },
        b: { col: letrasAColumna(colB[2]), abs: colB[1] === '$' },
      }
    }
    // Nombre desconocido (se tratará como #¿NOMBRE?)
    return { t: 'fn', nombre: `#NOMBRE:${t.texto}`, args: [] }
  }
}

/** Lee una fórmula (con o sin el «=» inicial) y devuelve su árbol sintáctico. Lanza `ErrorSintaxis` si no es válida. */
export function analizarFormula(formula: string): Nodo {
  const texto = formula.trim().startsWith('=') ? formula.trim().slice(1) : formula
  return new Analizador(tokenizar(texto)).analizar()
}

/** Indica si el árbol contiene alguna referencia a celdas o rangos. */
export function tieneReferencias(nodo: Nodo): boolean {
  switch (nodo.t) {
    case 'ref':
    case 'rango':
    case 'colrango':
      return true
    case 'un':
    case 'pct':
      return tieneReferencias(nodo.e)
    case 'bin':
      return tieneReferencias(nodo.l) || tieneReferencias(nodo.r)
    case 'fn':
      return nodo.args.some(tieneReferencias)
    default:
      return false
  }
}

/** Nombres de función usados en una fórmula (en mayúsculas). */
export function funcionesUsadas(nodo: Nodo): string[] {
  switch (nodo.t) {
    case 'un':
    case 'pct':
      return funcionesUsadas(nodo.e)
    case 'bin':
      return [...funcionesUsadas(nodo.l), ...funcionesUsadas(nodo.r)]
    case 'fn':
      return [nodo.nombre, ...nodo.args.flatMap(funcionesUsadas)]
    default:
      return []
  }
}

/**
 * Traslada las referencias relativas de una fórmula (como al copiarla o arrastrarla a otra celda).
 * Las referencias con $ (absolutas) no se mueven. Si una referencia se sale de la hoja devuelve `null`.
 */
export function trasladarFormula(formula: string, dFilas: number, dCols: number): string | null {
  const texto = formula.trim().startsWith('=') ? formula.trim().slice(1) : formula
  const tokens = tokenizar(texto)
  let salida = ''
  let cursor = 0
  for (const t of tokens) {
    if (t.tipo === 'fin') break
    salida += texto.slice(cursor, t.inicio)
    cursor = t.fin
    if (t.tipo === 'id') {
      const siguiente = tokens[tokens.indexOf(t) + 1]
      const esFuncion = siguiente?.tipo === 'abre'
      const ref = esFuncion ? null : leerReferencia(t.texto)
      if (ref) {
        const col = ref.absCol ? ref.col : ref.col + dCols
        const fila = ref.absFila ? ref.fila : ref.fila + dFilas
        if (col < 0 || fila < 0) return null
        salida += textoReferencia({ ...ref, col, fila })
        continue
      }
      const col = esFuncion ? null : RE_COLUMNA.exec(t.texto)
      if (col && (siguiente?.tipo === 'dospuntos' || tokens[tokens.indexOf(t) - 1]?.tipo === 'dospuntos')) {
        const abs = col[1] === '$'
        const c = abs ? letrasAColumna(col[2]) : letrasAColumna(col[2]) + dCols
        if (c < 0) return null
        salida += `${abs ? '$' : ''}${columnaALetras(c)}`
        continue
      }
    }
    salida += t.texto
  }
  return '=' + salida
}
