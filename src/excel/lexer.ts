import { ErrorSintaxis } from './tipos'

export type TipoToken = 'num' | 'str' | 'id' | 'op' | 'abre' | 'cierra' | 'sep' | 'dospuntos' | 'pct' | 'fin'

export interface Token {
  tipo: TipoToken
  texto: string
  /** Valor ya interpretado (número o texto sin comillas). */
  valor?: number | string
  inicio: number
  fin: number
}

const esInicioId = (c: string) => /[\p{L}_$]/u.test(c)
const esParteId = (c: string) => /[\p{L}\p{N}_.$]/u.test(c)

/** Convierte el texto de una fórmula (sin el «=» inicial) en tokens. Acepta «;» y «,» como separador de argumentos. */
export function tokenizar(entrada: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  while (i < entrada.length) {
    const c = entrada[i]
    if (/\s/.test(c)) {
      i++
      continue
    }
    const inicio = i

    // Números: 12, 3.5, .5, 1E3
    if (/\d/.test(c) || (c === '.' && /\d/.test(entrada[i + 1] ?? ''))) {
      let j = i
      while (j < entrada.length && /\d/.test(entrada[j])) j++
      if (entrada[j] === '.') {
        j++
        while (j < entrada.length && /\d/.test(entrada[j])) j++
      }
      if (/[eE]/.test(entrada[j] ?? '') && /[\d+-]/.test(entrada[j + 1] ?? '')) {
        let k = j + 1
        if (/[+-]/.test(entrada[k])) k++
        if (/\d/.test(entrada[k] ?? '')) {
          while (k < entrada.length && /\d/.test(entrada[k])) k++
          j = k
        }
      }
      const texto = entrada.slice(i, j)
      tokens.push({ tipo: 'num', texto, valor: Number(texto), inicio, fin: j })
      i = j
      continue
    }

    // Texto entre comillas dobles; "" dentro del texto es una comilla
    if (c === '"') {
      let j = i + 1
      let valor = ''
      let cerrado = false
      while (j < entrada.length) {
        if (entrada[j] === '"') {
          if (entrada[j + 1] === '"') {
            valor += '"'
            j += 2
            continue
          }
          cerrado = true
          j++
          break
        }
        valor += entrada[j]
        j++
      }
      if (!cerrado) throw new ErrorSintaxis('Falta cerrar unas comillas ("). Los textos van entre comillas dobles.', inicio)
      tokens.push({ tipo: 'str', texto: entrada.slice(i, j), valor, inicio, fin: j })
      i = j
      continue
    }

    // Identificadores: funciones, referencias a celdas (A1, $B$2) y VERDADERO/FALSO
    if (esInicioId(c)) {
      let j = i + 1
      while (j < entrada.length && esParteId(entrada[j])) j++
      tokens.push({ tipo: 'id', texto: entrada.slice(i, j), inicio, fin: j })
      i = j
      continue
    }

    // Operadores de dos caracteres
    const dos = entrada.slice(i, i + 2)
    if (dos === '<=' || dos === '>=' || dos === '<>') {
      tokens.push({ tipo: 'op', texto: dos, inicio, fin: i + 2 })
      i += 2
      continue
    }
    if ('+-*/^&=<>'.includes(c)) {
      tokens.push({ tipo: 'op', texto: c, inicio, fin: i + 1 })
      i++
      continue
    }
    if (c === '(') tokens.push({ tipo: 'abre', texto: c, inicio, fin: i + 1 })
    else if (c === ')') tokens.push({ tipo: 'cierra', texto: c, inicio, fin: i + 1 })
    else if (c === ';' || c === ',') tokens.push({ tipo: 'sep', texto: c, inicio, fin: i + 1 })
    else if (c === ':') tokens.push({ tipo: 'dospuntos', texto: c, inicio, fin: i + 1 })
    else if (c === '%') tokens.push({ tipo: 'pct', texto: c, inicio, fin: i + 1 })
    else if (c === '!') throw new ErrorSintaxis('Aquí solo se usa una hoja: no se admiten referencias a otras hojas.', inicio)
    else if (c === '{' || c === '}') throw new ErrorSintaxis('Las constantes matriciales { } no están disponibles en este ejercicio.', inicio)
    else throw new ErrorSintaxis(`Carácter no válido en la fórmula: «${c}».`, inicio)
    i++
  }
  tokens.push({ tipo: 'fin', texto: '', inicio: entrada.length, fin: entrada.length })
  return tokens
}
