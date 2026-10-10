import { aLogico, aNumero, aTexto, comparar, dividir, fechaASerial, numeroATexto, redondear, serialAFecha, textoANumero } from './conversion'
import { crearCriterio, patronAExpresion, tieneComodines } from './criterios'
import { lnGamma as lnGammaLocal, cdfBinomial, cdfPoisson, cdfT, colaDerechaChi2, colaDerechaF, invChi2ColaDerecha, invFColaDerecha, invT, invT2Colas, pT2Colas, pmfBinomial, pmfPoisson, pnormEstandar, qnormEstandar } from './distribuciones'
import { DIV0, ErrorExcel, NOD, NUM, REF, VALOR, esError, esMatriz } from './tipos'
import type { Escalar, Matriz, Valor } from './tipos'

type Impl = (args: Valor[]) => Valor

interface Definicion {
  min: number
  max: number
  fn: Impl
}

// ───────── Utilidades ─────────

/** Valor que se espera como escalar: una matriz de 1×1 se reduce a su celda; una mayor es un error. */
function escalar(v: Valor): Escalar {
  if (!esMatriz(v)) return v
  if (v.length === 1 && v[0].length === 1) return v[0][0]
  return VALOR()
}

const dimension = (m: Matriz) => ({ filas: m.length, cols: m[0]?.length ?? 0 })
const aMatriz = (v: Valor): Matriz => (esMatriz(v) ? v : [[v]])
const celdas = (m: Matriz): Escalar[] => m.flat()

/** Recolecta los números de los argumentos de funciones como SUMA: en rangos solo cuentan los números; los argumentos escritos directamente se convierten. */
function recolectarNumeros(args: Valor[]): number[] | ErrorExcel {
  const salida: number[] = []
  for (const a of args) {
    if (esMatriz(a)) {
      for (const c of celdas(a)) {
        if (esError(c)) return c
        if (typeof c === 'number') salida.push(c)
      }
    } else {
      if (esError(a)) return a
      if (a === null) continue
      const n = aNumero(a)
      if (esError(n)) return n
      salida.push(n)
    }
  }
  return salida
}

/** Números de un único argumento de rango (para funciones estadísticas de un solo rango). */
function numerosDeRango(v: Valor): number[] | ErrorExcel {
  return recolectarNumeros([v])
}

function numeroArg(v: Valor): number | ErrorExcel {
  return aNumero(escalar(v))
}
function textoArg(v: Valor): string | ErrorExcel {
  return aTexto(escalar(v))
}
function enteroArg(v: Valor): number | ErrorExcel {
  const n = numeroArg(v)
  return esError(n) ? n : Math.trunc(n)
}

const mismaForma = (a: Matriz, b: Matriz) => a.length === b.length && (a[0]?.length ?? 0) === (b[0]?.length ?? 0)

// ───────── Matemáticas y estadística ─────────

const SUMA: Impl = (args) => {
  const nums = recolectarNumeros(args)
  return esError(nums) ? nums : nums.reduce((a, b) => a + b, 0)
}
const PROMEDIO: Impl = (args) => {
  const nums = recolectarNumeros(args)
  if (esError(nums)) return nums
  return nums.length === 0 ? DIV0() : nums.reduce((a, b) => a + b, 0) / nums.length
}
const MIN: Impl = (args) => {
  const nums = recolectarNumeros(args)
  return esError(nums) ? nums : nums.length === 0 ? 0 : Math.min(...nums)
}
const MAX: Impl = (args) => {
  const nums = recolectarNumeros(args)
  return esError(nums) ? nums : nums.length === 0 ? 0 : Math.max(...nums)
}
const PRODUCTO: Impl = (args) => {
  const nums = recolectarNumeros(args)
  return esError(nums) ? nums : nums.length === 0 ? 0 : nums.reduce((a, b) => a * b, 1)
}

const CONTAR: Impl = (args) => {
  let n = 0
  for (const a of args) {
    if (esMatriz(a)) n += celdas(a).filter((c) => typeof c === 'number').length
    else if (typeof a === 'number' || typeof a === 'boolean' || (typeof a === 'string' && textoANumero(a) !== null)) n++
  }
  return n
}
const CONTARA: Impl = (args) => {
  let n = 0
  for (const a of args) {
    if (esMatriz(a)) n += celdas(a).filter((c) => c !== null).length
    else if (a !== null) n++
  }
  return n
}
const CONTAR_BLANCO: Impl = ([a]) => celdas(aMatriz(a)).filter((c) => c === null || c === '').length

const mediana = (nums: number[]): number => {
  const s = [...nums].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}
const MEDIANA: Impl = (args) => {
  const nums = recolectarNumeros(args)
  if (esError(nums)) return nums
  return nums.length === 0 ? NUM() : mediana(nums)
}
const MODA: Impl = (args) => {
  const nums = recolectarNumeros(args)
  if (esError(nums)) return nums
  const cuenta = new Map<number, number>()
  for (const n of nums) cuenta.set(n, (cuenta.get(n) ?? 0) + 1)
  let mejor: number | null = null
  let max = 1
  for (const n of nums) {
    const c = cuenta.get(n)!
    if (c > max) {
      max = c
      mejor = n
    }
  }
  return mejor === null ? NOD() : mejor
}
const varianza = (nums: number[], muestral: boolean): number | ErrorExcel => {
  const n = nums.length
  if (muestral ? n < 2 : n < 1) return DIV0()
  const media = nums.reduce((a, b) => a + b, 0) / n
  return nums.reduce((a, b) => a + (b - media) ** 2, 0) / (muestral ? n - 1 : n)
}
const estadistica = (muestral: boolean, raiz: boolean): Impl => (args) => {
  const nums = recolectarNumeros(args)
  if (esError(nums)) return nums
  const v = varianza(nums, muestral)
  return esError(v) ? v : raiz ? Math.sqrt(v) : v
}

const K_ESIMO = (mayor: boolean): Impl => ([datos, k]) => {
  const nums = numerosDeRango(datos)
  if (esError(nums)) return nums
  const kk = numeroArg(k)
  if (esError(kk)) return kk
  if (nums.length === 0 || kk < 1 || kk > nums.length) return NUM()
  const s = [...nums].sort((a, b) => (mayor ? b - a : a - b))
  return s[Math.ceil(kk) - 1]
}

const percentil = (nums: number[], k: number): number => {
  const s = [...nums].sort((a, b) => a - b)
  const rango = k * (s.length - 1)
  const i = Math.floor(rango)
  const frac = rango - i
  return i + 1 < s.length ? s[i] + frac * (s[i + 1] - s[i]) : s[i]
}
const PERCENTIL: Impl = ([datos, k]) => {
  const nums = numerosDeRango(datos)
  if (esError(nums)) return nums
  const kk = numeroArg(k)
  if (esError(kk)) return kk
  if (nums.length === 0 || kk < 0 || kk > 1) return NUM()
  return percentil(nums, kk)
}
const CUARTIL: Impl = ([datos, q]) => {
  const nums = numerosDeRango(datos)
  if (esError(nums)) return nums
  const qq = enteroArg(q)
  if (esError(qq)) return qq
  if (nums.length === 0 || qq < 0 || qq > 4) return NUM()
  return percentil(nums, qq / 4)
}
const JERARQUIA: Impl = ([num, ref, orden]) => {
  const x = numeroArg(num)
  if (esError(x)) return x
  const nums = numerosDeRango(ref)
  if (esError(nums)) return nums
  if (!nums.includes(x)) return NOD()
  const o = orden === undefined ? 0 : numeroArg(orden)
  if (esError(o)) return o
  return 1 + nums.filter((n) => (o === 0 ? n > x : n < x)).length
}
const SUMAPRODUCTO: Impl = (args) => {
  const ms = args.map(aMatriz)
  if (ms.length === 0) return VALOR()
  for (const m of ms) if (!mismaForma(m, ms[0])) return VALOR()
  let total = 0
  const { filas, cols } = dimension(ms[0])
  for (let f = 0; f < filas; f++)
    for (let c = 0; c < cols; c++) {
      let p = 1
      for (const m of ms) {
        const v = m[f][c]
        if (esError(v)) return v
        p *= typeof v === 'number' ? v : 0
      }
      total += p
    }
  return total
}

// ───────── Condicionales: CONTAR.SI, SUMAR.SI, ... ─────────

function filtrarConjuntos(pares: Valor[]): boolean[][] | ErrorExcel {
  // pares: rango1, criterio1, rango2, criterio2, ...
  let resultado: boolean[][] | null = null
  let forma: Matriz | null = null
  for (let i = 0; i < pares.length; i += 2) {
    const rango = aMatriz(pares[i])
    const prueba = crearCriterio(escalar(pares[i + 1]))
    if (forma && !mismaForma(forma, rango)) return VALOR()
    forma = forma ?? rango
    const m = rango.map((fila) => fila.map((c) => prueba(c)))
    resultado = resultado ? resultado.map((fila, f) => fila.map((v, c) => v && m[f][c])) : m
  }
  return resultado ?? VALOR()
}

const CONTAR_SI: Impl = ([rango, criterio]) => {
  const prueba = crearCriterio(escalar(criterio))
  return celdas(aMatriz(rango)).filter((c) => prueba(c)).length
}
const SUMAR_SI: Impl = ([rango, criterio, suma]) => {
  const r = aMatriz(rango)
  const s = suma === undefined ? r : aMatriz(suma)
  if (!mismaForma(r, s)) return VALOR()
  const prueba = crearCriterio(escalar(criterio))
  let total = 0
  r.forEach((fila, f) =>
    fila.forEach((c, k) => {
      if (prueba(c)) {
        const v = s[f][k]
        if (typeof v === 'number') total += v
      }
    }),
  )
  return total
}
const PROMEDIO_SI: Impl = ([rango, criterio, promedio]) => {
  const r = aMatriz(rango)
  const s = promedio === undefined ? r : aMatriz(promedio)
  if (!mismaForma(r, s)) return VALOR()
  const prueba = crearCriterio(escalar(criterio))
  let total = 0
  let n = 0
  r.forEach((fila, f) =>
    fila.forEach((c, k) => {
      if (prueba(c)) {
        const v = s[f][k]
        if (typeof v === 'number') {
          total += v
          n++
        }
      }
    }),
  )
  return n === 0 ? DIV0() : total / n
}
const CONTAR_SI_CONJUNTO: Impl = (args) => {
  if (args.length % 2 !== 0) return VALOR()
  const m = filtrarConjuntos(args)
  return esError(m) ? m : m.flat().filter(Boolean).length
}
const SUMAR_SI_CONJUNTO: Impl = ([suma, ...pares]) => {
  if (pares.length === 0 || pares.length % 2 !== 0) return VALOR()
  const s = aMatriz(suma)
  const m = filtrarConjuntos(pares)
  if (esError(m)) return m
  if (!mismaForma(s, m as unknown as Matriz)) return VALOR()
  let total = 0
  m.forEach((fila, f) => fila.forEach((ok, c) => ok && typeof s[f][c] === 'number' && (total += s[f][c] as number)))
  return total
}

// ───────── Lógicas ─────────

const SI: Impl = ([prueba, siV, siF]) => {
  const p = prueba
  if (esMatriz(p)) {
    // SI con matriz: se evalúa elemento a elemento (como en Excel con matrices dinámicas)
    const f = siF === undefined ? false : siF
    return p.map((fila, i) =>
      fila.map((c, j) => {
        const l = aLogico(c)
        if (esError(l)) return l
        const elegido = l ? siV : f
        return esMatriz(elegido) ? (elegido[i]?.[j] ?? elegido[0]?.[0] ?? null) : elegido
      }),
    )
  }
  const l = aLogico(p)
  if (esError(l)) return l
  if (l) return siV === undefined ? 0 : siV
  return siF === undefined ? false : siF
}

const logicosDe = (args: Valor[]): boolean[] | ErrorExcel => {
  const salida: boolean[] = []
  for (const a of args) {
    if (esMatriz(a)) {
      for (const c of celdas(a)) {
        if (esError(c)) return c
        if (typeof c === 'boolean') salida.push(c)
        else if (typeof c === 'number') salida.push(c !== 0)
      }
    } else {
      const l = aLogico(a)
      if (esError(l)) return l
      salida.push(l)
    }
  }
  return salida.length === 0 ? VALOR() : salida
}
const Y: Impl = (args) => {
  const ls = logicosDe(args)
  return esError(ls) ? ls : ls.every(Boolean)
}
const O: Impl = (args) => {
  const ls = logicosDe(args)
  return esError(ls) ? ls : ls.some(Boolean)
}
const NO: Impl = ([a]) => {
  const l = aLogico(escalar(a))
  return esError(l) ? l : !l
}
const SI_ERROR: Impl = ([valor, alt]) => {
  const v = escalar(valor)
  return esError(v) ? alt : valor
}
const SI_ND: Impl = ([valor, alt]) => {
  const v = escalar(valor)
  return esError(v) && v.codigo === '#N/D' ? alt : valor
}

// ───────── Búsqueda ─────────

function coincideTexto(buscado: Escalar, celda: Escalar, comodines: boolean): boolean {
  if (typeof buscado === 'string' && typeof celda === 'string') return comodines && tieneComodines(buscado) ? patronAExpresion(buscado).test(celda) : comparar(buscado, celda) === 0
  if (typeof buscado !== typeof celda) return false
  return comparar(buscado, celda) === 0
}

const BUSCARV: Impl = ([valor, tabla, col, aprox]) => {
  const b = escalar(valor)
  if (esError(b)) return b
  const t = aMatriz(tabla)
  const c = enteroArg(col)
  if (esError(c)) return c
  if (c < 1) return VALOR()
  if (c > (t[0]?.length ?? 0)) return REF()
  const modo = aprox === undefined ? true : aLogico(escalar(aprox))
  if (esError(modo)) return modo
  if (!modo) {
    const i = t.findIndex((fila) => coincideTexto(b, fila[0], true))
    return i < 0 ? NOD() : t[i][c - 1]
  }
  let mejor = -1
  for (let i = 0; i < t.length; i++) {
    const celda = t[i][0]
    if (celda === null || typeof celda !== typeof b) continue
    if (comparar(celda, b) <= 0) mejor = i
    else break
  }
  return mejor < 0 ? NOD() : t[mejor][c - 1]
}

const INDICE: Impl = ([matriz, fila, col]) => {
  const m = aMatriz(matriz)
  const { filas, cols } = dimension(m)
  const f = enteroArg(fila ?? 0)
  if (esError(f)) return f
  let c: number
  if (col === undefined) {
    if (cols === 1) c = 1
    else if (filas === 1) {
      c = f
      return c >= 1 && c <= cols ? m[0][c - 1] : c === 0 ? m : REF()
    } else c = 0
  } else {
    const cc = enteroArg(col)
    if (esError(cc)) return cc
    c = cc
  }
  if (f < 0 || c < 0 || f > filas || c > cols) return REF()
  if (f === 0 && c === 0) return m
  if (f === 0) return m.map((fila) => [fila[c - 1]])
  if (c === 0) return [m[f - 1]]
  return m[f - 1][c - 1]
}

function posicion(buscado: Escalar, vector: Escalar[], tipo: number): number {
  if (tipo === 0) return vector.findIndex((c) => coincideTexto(buscado, c, true))
  let mejor = -1
  if (tipo > 0) {
    for (let i = 0; i < vector.length; i++) {
      const c = vector[i]
      if (c === null || typeof c !== typeof buscado) continue
      if (comparar(c, buscado) <= 0) mejor = i
      else break
    }
  } else {
    for (let i = 0; i < vector.length; i++) {
      const c = vector[i]
      if (c === null || typeof c !== typeof buscado) continue
      if (comparar(c, buscado) >= 0) mejor = i
      else break
    }
  }
  return mejor
}
const COINCIDIR: Impl = ([valor, matriz, tipo]) => {
  const b = escalar(valor)
  if (esError(b)) return b
  const m = aMatriz(matriz)
  if (m.length > 1 && (m[0]?.length ?? 0) > 1) return NOD()
  const t = tipo === undefined ? 1 : numeroArg(tipo)
  if (esError(t)) return t
  const i = posicion(b, celdas(m), Math.sign(t))
  return i < 0 ? NOD() : i + 1
}

const BUSCARX: Impl = ([valor, buscar, devolver, noEncontrado, modoCoincidencia, modoBusqueda]) => {
  const b = escalar(valor)
  if (esError(b)) return b
  const bm = aMatriz(buscar)
  const dm = aMatriz(devolver)
  const esColumna = (bm[0]?.length ?? 0) === 1
  if (!esColumna && bm.length !== 1) return VALOR()
  const vector = celdas(bm)
  if ((esColumna ? dm.length : (dm[0]?.length ?? 0)) !== vector.length) return VALOR()
  const modo = modoCoincidencia === undefined ? 0 : numeroArg(modoCoincidencia)
  if (esError(modo)) return modo
  const sentido = modoBusqueda === undefined ? 1 : numeroArg(modoBusqueda)
  if (esError(sentido)) return sentido
  let idx = -1
  const orden = sentido < 0 ? [...vector.keys()].reverse() : [...vector.keys()]
  if (modo === 0 || modo === 2) {
    idx = orden.find((i) => coincideTexto(b, vector[i], modo === 2)) ?? -1
  } else {
    // coincidencia exacta o el valor más cercano (-1: menor, 1: mayor)
    let mejor = -1
    for (const i of orden) {
      const c = vector[i]
      if (c === null || typeof c !== typeof b) continue
      const cmp = comparar(c, b)
      if (cmp === 0) {
        mejor = i
        break
      }
      if (modo < 0 ? cmp < 0 : cmp > 0) {
        if (mejor < 0 || (modo < 0 ? comparar(c, vector[mejor]) > 0 : comparar(c, vector[mejor]) < 0)) mejor = i
      }
    }
    idx = mejor
  }
  if (idx < 0) return noEncontrado === undefined ? NOD() : noEncontrado
  if (esColumna) {
    const fila = dm[idx]
    return fila.length === 1 ? fila[0] : [fila]
  }
  const columna = dm.map((f) => f[idx])
  return columna.length === 1 ? columna[0] : columna.map((x) => [x])
}

// ───────── Texto ─────────

const texto1 = (f: (t: string) => Valor): Impl => ([a]) => {
  const t = textoArg(a)
  return esError(t) ? t : f(t)
}
const IZQUIERDA: Impl = ([t, n]) => {
  const s = textoArg(t)
  if (esError(s)) return s
  const k = n === undefined ? 1 : enteroArg(n)
  if (esError(k)) return k
  return k < 0 ? VALOR() : s.slice(0, k)
}
const DERECHA: Impl = ([t, n]) => {
  const s = textoArg(t)
  if (esError(s)) return s
  const k = n === undefined ? 1 : enteroArg(n)
  if (esError(k)) return k
  return k < 0 ? VALOR() : k === 0 ? '' : s.slice(-k)
}
const EXTRAE: Impl = ([t, inicio, n]) => {
  const s = textoArg(t)
  if (esError(s)) return s
  const i = enteroArg(inicio)
  if (esError(i)) return i
  const k = enteroArg(n)
  if (esError(k)) return k
  return i < 1 || k < 0 ? VALOR() : s.slice(i - 1, i - 1 + k)
}
const NOMPROPIO: Impl = texto1((t) => t.toLowerCase().replace(/(^|[^\p{L}])(\p{L})/gu, (_m, previo: string, letra: string) => previo + letra.toUpperCase()))
const ESPACIOS: Impl = texto1((t) => t.replace(/ +/g, ' ').replace(/^ | $/g, ''))
const SUSTITUIR: Impl = ([t, antiguo, nuevo, instancia]) => {
  const s = textoArg(t)
  const a = textoArg(antiguo)
  const n = textoArg(nuevo)
  if (esError(s)) return s
  if (esError(a)) return a
  if (esError(n)) return n
  if (a === '') return s
  if (instancia === undefined) return s.split(a).join(n)
  const k = enteroArg(instancia)
  if (esError(k)) return k
  if (k < 1) return VALOR()
  let pos = -1
  for (let i = 0; i < k; i++) {
    pos = s.indexOf(a, pos + 1)
    if (pos < 0) return s
  }
  return s.slice(0, pos) + n + s.slice(pos + a.length)
}
const ENCONTRAR: Impl = ([buscar, en, inicio]) => {
  const b = textoArg(buscar)
  const e = textoArg(en)
  if (esError(b)) return b
  if (esError(e)) return e
  const i = inicio === undefined ? 1 : enteroArg(inicio)
  if (esError(i)) return i
  if (i < 1 || i > e.length + 1) return VALOR()
  const p = e.indexOf(b, i - 1)
  return p < 0 ? VALOR() : p + 1
}
const HALLAR: Impl = ([buscar, en, inicio]) => {
  const b = textoArg(buscar)
  const e = textoArg(en)
  if (esError(b)) return b
  if (esError(e)) return e
  const i = inicio === undefined ? 1 : enteroArg(inicio)
  if (esError(i)) return i
  if (i < 1 || i > e.length + 1) return VALOR()
  const re = patronAExpresion(b, false)
  const m = re.exec(e.slice(i - 1))
  return m ? m.index + i : VALOR()
}
const VALOR_FN: Impl = ([a]) => {
  const v = escalar(a)
  if (esError(v)) return v
  if (typeof v === 'number') return v
  if (v === null) return 0
  if (typeof v === 'boolean') return VALOR()
  const n = textoANumero(v)
  return n === null ? VALOR() : n
}
const CONCATENAR: Impl = (args) => {
  let s = ''
  for (const a of args) {
    if (esMatriz(a) && !(a.length === 1 && a[0].length === 1)) return VALOR()
    const t = textoArg(a)
    if (esError(t)) return t
    s += t
  }
  return s
}
const CONCAT: Impl = (args) => {
  let s = ''
  for (const a of args)
    for (const c of celdas(aMatriz(a))) {
      const t = aTexto(c)
      if (esError(t)) return t
      s += t
    }
  return s
}
const UNIRCADENAS: Impl = ([delim, ignorar, ...textos]) => {
  const d = textoArg(delim)
  if (esError(d)) return d
  const ig = aLogico(escalar(ignorar))
  if (esError(ig)) return ig
  const partes: string[] = []
  for (const a of textos)
    for (const c of celdas(aMatriz(a))) {
      const t = aTexto(c)
      if (esError(t)) return t
      if (ig && t === '') continue
      partes.push(t)
    }
  return partes.join(d)
}

// ───────── Números ─────────

const unNumero = (f: (n: number) => Valor): Impl => ([a]) => {
  const n = numeroArg(a)
  return esError(n) ? n : f(n)
}
const dosNumeros = (f: (a: number, b: number) => Valor): Impl => ([a, b]) => {
  const x = numeroArg(a)
  const y = numeroArg(b)
  return esError(x) ? x : esError(y) ? y : f(x, y)
}
const REDONDEAR: Impl = dosNumeros((x, d) => redondear(x, d))
const REDONDEAR_MAS: Impl = dosNumeros((x, d) => {
  const f = 10 ** Math.trunc(d)
  const y = Math.ceil(Number((Math.abs(x) * f).toPrecision(15))) / f
  return x < 0 ? -y : y
})
const REDONDEAR_MENOS: Impl = dosNumeros((x, d) => {
  const f = 10 ** Math.trunc(d)
  const y = Math.floor(Number((Math.abs(x) * f).toPrecision(15))) / f
  return x < 0 ? -y : y
})
const TRUNCAR: Impl = ([a, d]) => {
  const x = numeroArg(a)
  const dd = d === undefined ? 0 : numeroArg(d)
  if (esError(x)) return x
  if (esError(dd)) return dd
  const f = 10 ** Math.trunc(dd)
  return Math.trunc(Number((x * f).toPrecision(15))) / f
}
const RESIDUO: Impl = dosNumeros((n, d) => (d === 0 ? DIV0() : n - d * Math.floor(n / d)))
const POTENCIA: Impl = dosNumeros((a, b) => {
  const r = a ** b
  return Number.isFinite(r) ? r : a === 0 && b <= 0 ? DIV0() : NUM()
})
const RAIZ: Impl = unNumero((n) => (n < 0 ? NUM() : Math.sqrt(n)))
const factorial = (n: number): number => {
  let r = 1
  for (let i = 2; i <= n; i++) r *= i
  return r
}
const LN: Impl = unNumero((n) => (n <= 0 ? NUM() : Math.log(n)))
const LOG10: Impl = unNumero((n) => (n <= 0 ? NUM() : Math.log10(n)))
const LOG: Impl = ([a, b]) => {
  const x = numeroArg(a)
  const base = b === undefined ? 10 : numeroArg(b)
  if (esError(x)) return x
  if (esError(base)) return base
  if (x <= 0 || base <= 0 || base === 1) return NUM()
  return base === 10 ? Math.log10(x) : base === 2 ? Math.log2(x) : Math.log(x) / Math.log(base)
}
const FACT: Impl = unNumero((n) => (n < 0 || n > 170 ? NUM() : factorial(Math.trunc(n))))
const COMBINAT: Impl = dosNumeros((n, k) => {
  n = Math.trunc(n)
  k = Math.trunc(k)
  if (n < 0 || k < 0 || k > n) return NUM()
  let r = 1
  for (let i = 1; i <= Math.min(k, n - k); i++) r = (r * (n - i + 1)) / i
  return Math.round(r)
})
const PERMUTACIONES: Impl = dosNumeros((n, k) => {
  n = Math.trunc(n)
  k = Math.trunc(k)
  if (n < 0 || k < 0 || k > n) return NUM()
  let r = 1
  for (let i = 0; i < k; i++) r *= n - i
  return r
})


// ───────── Distribuciones de probabilidad ─────────

/** Evalúa `fn` con los argumentos numéricos; el último puede ser un lógico (acumulado) si `ultimoLogico`. */
function distribucion(fn: (n: number[], acum: boolean) => number, numericos: number, ultimoLogico: boolean): Impl {
  return (args) => {
    const n: number[] = []
    for (let i = 0; i < numericos; i++) {
      const x = numeroArg(args[i])
      if (esError(x)) return x
      n.push(x)
    }
    let acum = true
    if (ultimoLogico) {
      const l = aLogico(escalar(args[numericos]))
      if (esError(l)) return l
      acum = l
    }
    const r = fn(n, acum)
    return Number.isFinite(r) ? r : NUM()
  }
}
const sinNaN = (x: number) => (Number.isNaN(x) ? NaN : x)

const DISTR_NORM_ESTAND = distribucion(([z], acum) => (acum ? pnormEstandar(z) : Math.exp((-z * z) / 2) / Math.sqrt(2 * Math.PI)), 1, true)
const DISTR_NORM = distribucion(([x, mu, sigma], acum) => (sigma <= 0 ? NaN : acum ? pnormEstandar((x - mu) / sigma) : Math.exp(-(((x - mu) / sigma) ** 2) / 2) / (sigma * Math.sqrt(2 * Math.PI))), 3, true)
const INV_NORM_ESTAND = distribucion(([p]) => qnormEstandar(p), 1, false)
const INV_NORM = distribucion(([p, mu, sigma]) => (sigma <= 0 ? NaN : mu + sigma * qnormEstandar(p)), 3, false)
const DISTR_BINOM = distribucion(([k, n, p], acum) => (n < 0 || p < 0 || p > 1 || k < 0 || k > n ? NaN : acum ? cdfBinomial(Math.trunc(k), Math.trunc(n), p) : pmfBinomial(Math.trunc(k), Math.trunc(n), p)), 3, true)
const POISSON_DIST = distribucion(([k, mu], acum) => (k < 0 || mu < 0 ? NaN : acum ? cdfPoisson(Math.trunc(k), mu) : pmfPoisson(Math.trunc(k), mu)), 2, true)
const DISTR_EXP = distribucion(([x, lambda], acum) => (x < 0 || lambda <= 0 ? NaN : acum ? 1 - Math.exp(-lambda * x) : lambda * Math.exp(-lambda * x)), 2, true)
const DISTR_T = distribucion(([x, gl], acum) => (gl < 1 ? NaN : acum ? cdfT(x, Math.trunc(gl)) : sinNaN(Math.exp(lnDensidadT(x, Math.trunc(gl))))), 2, true)
const DISTR_T_2C = distribucion(([x, gl]) => (x < 0 || gl < 1 ? NaN : pT2Colas(x, Math.trunc(gl))), 2, false)
const DISTR_T_CD = distribucion(([x, gl]) => (x < 0 || gl < 1 ? NaN : pT2Colas(x, Math.trunc(gl)) / 2), 2, false)
const INV_T = distribucion(([p, gl]) => (!(p > 0 && p < 1) || gl < 1 ? NaN : invT(p, Math.trunc(gl))), 2, false)
const INV_T_2C = distribucion(([p, gl]) => (!(p > 0 && p <= 1) || gl < 1 ? NaN : invT2Colas(p, Math.trunc(gl))), 2, false)
const DISTR_CHI_CD = distribucion(([x, gl]) => (x < 0 || gl < 1 ? NaN : colaDerechaChi2(x, Math.trunc(gl))), 2, false)
const INV_CHI_CD = distribucion(([p, gl]) => (!(p > 0 && p < 1) || gl < 1 ? NaN : invChi2ColaDerecha(p, Math.trunc(gl))), 2, false)
const DISTR_F_CD = distribucion(([x, g1, g2]) => (x < 0 || g1 < 1 || g2 < 1 ? NaN : colaDerechaF(x, Math.trunc(g1), Math.trunc(g2))), 3, false)
const INV_F_CD = distribucion(([p, g1, g2]) => (!(p > 0 && p < 1) || g1 < 1 || g2 < 1 ? NaN : invFColaDerecha(p, Math.trunc(g1), Math.trunc(g2))), 3, false)

/** Logaritmo de la densidad de la t de Student. */
function lnDensidadT(x: number, gl: number): number {
  return lnGammaLocal((gl + 1) / 2) - lnGammaLocal(gl / 2) - 0.5 * Math.log(gl * Math.PI) - ((gl + 1) / 2) * Math.log(1 + (x * x) / gl)
}

// ───────── Fechas ─────────

const FECHA: Impl = ([a, m, d]) => {
  let anio = numeroArg(a)
  const mes = enteroArg(m)
  const dia = enteroArg(d)
  if (esError(anio)) return anio
  if (esError(mes)) return mes
  if (esError(dia)) return dia
  anio = Math.trunc(anio)
  if (anio < 0 || anio > 9999) return NUM()
  if (anio < 1900) anio += 1900
  const serial = fechaASerial(anio, mes, dia)
  return serial < 1 ? NUM() : serial
}
const partesFecha = (f: (d: Date) => number): Impl => ([a]) => {
  const n = numeroArg(a)
  if (esError(n)) return n
  return n < 1 ? NUM() : f(serialAFecha(n))
}
const ANIO = partesFecha((d) => d.getUTCFullYear())
const MES = partesFecha((d) => d.getUTCMonth() + 1)
const DIA = partesFecha((d) => d.getUTCDate())
const DIAS: Impl = dosNumeros((fin, ini) => Math.floor(fin) - Math.floor(ini))
const DIASEM: Impl = ([a, tipo]) => {
  const n = numeroArg(a)
  if (esError(n)) return n
  const t = tipo === undefined ? 1 : numeroArg(tipo)
  if (esError(t)) return t
  const dia = serialAFecha(n).getUTCDay() // 0 = domingo
  if (t === 1) return dia + 1
  if (t === 2) return ((dia + 6) % 7) + 1
  if (t === 3) return (dia + 6) % 7
  return NUM()
}
const FIN_MES: Impl = dosNumeros((n, meses) => {
  const f = serialAFecha(n)
  return fechaASerial(f.getUTCFullYear(), f.getUTCMonth() + 1 + Math.trunc(meses) + 1, 0)
})

// ───────── Información ─────────

const informacion = (f: (v: Escalar) => boolean): Impl => ([a]) => f(escalar(a))

// ───────── Tabla de funciones ─────────

const REGISTRO: Record<string, Definicion> = {
  SUMA: { min: 1, max: 255, fn: SUMA },
  PROMEDIO: { min: 1, max: 255, fn: PROMEDIO },
  MIN: { min: 1, max: 255, fn: MIN },
  MAX: { min: 1, max: 255, fn: MAX },
  PRODUCTO: { min: 1, max: 255, fn: PRODUCTO },
  CONTAR: { min: 1, max: 255, fn: CONTAR },
  CONTARA: { min: 1, max: 255, fn: CONTARA },
  'CONTAR.BLANCO': { min: 1, max: 1, fn: CONTAR_BLANCO },
  MEDIANA: { min: 1, max: 255, fn: MEDIANA },
  'MODA.UNO': { min: 1, max: 255, fn: MODA },
  'DESVEST.M': { min: 1, max: 255, fn: estadistica(true, true) },
  'DESVEST.P': { min: 1, max: 255, fn: estadistica(false, true) },
  'VAR.S': { min: 1, max: 255, fn: estadistica(true, false) },
  'VAR.P': { min: 1, max: 255, fn: estadistica(false, false) },
  'K.ESIMO.MAYOR': { min: 2, max: 2, fn: K_ESIMO(true) },
  'K.ESIMO.MENOR': { min: 2, max: 2, fn: K_ESIMO(false) },
  'PERCENTIL.INC': { min: 2, max: 2, fn: PERCENTIL },
  'CUARTIL.INC': { min: 2, max: 2, fn: CUARTIL },
  JERARQUIA: { min: 2, max: 3, fn: JERARQUIA },
  SUMAPRODUCTO: { min: 1, max: 255, fn: SUMAPRODUCTO },
  'CONTAR.SI': { min: 2, max: 2, fn: CONTAR_SI },
  'SUMAR.SI': { min: 2, max: 3, fn: SUMAR_SI },
  'PROMEDIO.SI': { min: 2, max: 3, fn: PROMEDIO_SI },
  'CONTAR.SI.CONJUNTO': { min: 2, max: 254, fn: CONTAR_SI_CONJUNTO },
  'SUMAR.SI.CONJUNTO': { min: 3, max: 255, fn: SUMAR_SI_CONJUNTO },
  SI: { min: 2, max: 3, fn: SI },
  Y: { min: 1, max: 255, fn: Y },
  O: { min: 1, max: 255, fn: O },
  NO: { min: 1, max: 1, fn: NO },
  VERDADERO: { min: 0, max: 0, fn: () => true },
  FALSO: { min: 0, max: 0, fn: () => false },
  'SI.ERROR': { min: 2, max: 2, fn: SI_ERROR },
  'SI.ND': { min: 2, max: 2, fn: SI_ND },
  BUSCARV: { min: 3, max: 4, fn: BUSCARV },
  BUSCARX: { min: 3, max: 6, fn: BUSCARX },
  INDICE: { min: 2, max: 3, fn: INDICE },
  COINCIDIR: { min: 2, max: 3, fn: COINCIDIR },
  IZQUIERDA: { min: 1, max: 2, fn: IZQUIERDA },
  DERECHA: { min: 1, max: 2, fn: DERECHA },
  EXTRAE: { min: 3, max: 3, fn: EXTRAE },
  LARGO: { min: 1, max: 1, fn: texto1((t) => t.length) },
  MAYUSC: { min: 1, max: 1, fn: texto1((t) => t.toUpperCase()) },
  MINUSC: { min: 1, max: 1, fn: texto1((t) => t.toLowerCase()) },
  NOMPROPIO: { min: 1, max: 1, fn: NOMPROPIO },
  ESPACIOS: { min: 1, max: 1, fn: ESPACIOS },
  SUSTITUIR: { min: 3, max: 4, fn: SUSTITUIR },
  ENCONTRAR: { min: 2, max: 3, fn: ENCONTRAR },
  HALLAR: { min: 2, max: 3, fn: HALLAR },
  VALOR: { min: 1, max: 1, fn: VALOR_FN },
  IGUAL: { min: 2, max: 2, fn: ([a, b]) => { const x = textoArg(a); const y = textoArg(b); return esError(x) ? x : esError(y) ? y : x === y } },
  CONCATENAR: { min: 1, max: 255, fn: CONCATENAR },
  CONCAT: { min: 1, max: 253, fn: CONCAT },
  UNIRCADENAS: { min: 3, max: 252, fn: UNIRCADENAS },
  REDONDEAR: { min: 2, max: 2, fn: REDONDEAR },
  'REDONDEAR.MAS': { min: 2, max: 2, fn: REDONDEAR_MAS },
  'REDONDEAR.MENOS': { min: 2, max: 2, fn: REDONDEAR_MENOS },
  TRUNCAR: { min: 1, max: 2, fn: TRUNCAR },
  ABS: { min: 1, max: 1, fn: unNumero((n) => Math.abs(n)) },
  ENTERO: { min: 1, max: 1, fn: unNumero((n) => Math.floor(n)) },
  RESIDUO: { min: 2, max: 2, fn: RESIDUO },
  POTENCIA: { min: 2, max: 2, fn: POTENCIA },
  RAIZ: { min: 1, max: 1, fn: RAIZ },
  LN: { min: 1, max: 1, fn: LN },
  LOG: { min: 1, max: 2, fn: LOG },
  LOG10: { min: 1, max: 1, fn: LOG10 },
  EXP: { min: 1, max: 1, fn: unNumero((n) => Math.exp(n)) },
  FACT: { min: 1, max: 1, fn: FACT },
  COMBINAT: { min: 2, max: 2, fn: COMBINAT },
  PERMUTACIONES: { min: 2, max: 2, fn: PERMUTACIONES },
  PI: { min: 0, max: 0, fn: () => Math.PI },
  'DISTR.NORM.ESTAND.N': { min: 2, max: 2, fn: DISTR_NORM_ESTAND },
  'DISTR.NORM.N': { min: 4, max: 4, fn: DISTR_NORM },
  'INV.NORM.ESTAND': { min: 1, max: 1, fn: INV_NORM_ESTAND },
  'INV.NORM': { min: 3, max: 3, fn: INV_NORM },
  'DISTR.BINOM.N': { min: 4, max: 4, fn: DISTR_BINOM },
  'POISSON.DIST': { min: 3, max: 3, fn: POISSON_DIST },
  'DISTR.EXP.N': { min: 3, max: 3, fn: DISTR_EXP },
  'DISTR.T.N': { min: 3, max: 3, fn: DISTR_T },
  'DISTR.T.2C': { min: 2, max: 2, fn: DISTR_T_2C },
  'DISTR.T.CD': { min: 2, max: 2, fn: DISTR_T_CD },
  'INV.T': { min: 2, max: 2, fn: INV_T },
  'INV.T.2C': { min: 2, max: 2, fn: INV_T_2C },
  'DISTR.CHICUAD.CD': { min: 2, max: 2, fn: DISTR_CHI_CD },
  'INV.CHICUAD.CD': { min: 2, max: 2, fn: INV_CHI_CD },
  'DISTR.F.CD': { min: 3, max: 3, fn: DISTR_F_CD },
  'INV.F.CD': { min: 3, max: 3, fn: INV_F_CD },
  FECHA: { min: 3, max: 3, fn: FECHA },
  AÑO: { min: 1, max: 1, fn: ANIO },
  MES: { min: 1, max: 1, fn: MES },
  DIA: { min: 1, max: 1, fn: DIA },
  DIAS: { min: 2, max: 2, fn: DIAS },
  DIASEM: { min: 1, max: 2, fn: DIASEM },
  'FIN.MES': { min: 2, max: 2, fn: FIN_MES },
  ESNUMERO: { min: 1, max: 1, fn: informacion((v) => typeof v === 'number') },
  ESTEXTO: { min: 1, max: 1, fn: informacion((v) => typeof v === 'string') },
  ESBLANCO: { min: 1, max: 1, fn: informacion((v) => v === null) },
  ESERROR: { min: 1, max: 1, fn: informacion((v) => esError(v)) },
  ESNOD: { min: 1, max: 1, fn: informacion((v) => esError(v) && v.codigo === '#N/D') },
}

/** Nombres en inglés (y variantes heredadas) que se aceptan como alias del nombre en español. */
const ALIAS: Record<string, string> = {
  SUM: 'SUMA',
  AVERAGE: 'PROMEDIO',
  PRODUCT: 'PRODUCTO',
  COUNT: 'CONTAR',
  COUNTA: 'CONTARA',
  COUNTBLANK: 'CONTAR.BLANCO',
  MEDIAN: 'MEDIANA',
  MODA: 'MODA.UNO',
  'MODE.SNGL': 'MODA.UNO',
  MODE: 'MODA.UNO',
  DESVEST: 'DESVEST.M',
  'STDEV.S': 'DESVEST.M',
  STDEV: 'DESVEST.M',
  'STDEV.P': 'DESVEST.P',
  DESVESTP: 'DESVEST.P',
  'VAR.S': 'VAR.S',
  VAR: 'VAR.S',
  LARGE: 'K.ESIMO.MAYOR',
  SMALL: 'K.ESIMO.MENOR',
  'PERCENTILE.INC': 'PERCENTIL.INC',
  PERCENTILE: 'PERCENTIL.INC',
  PERCENTIL: 'PERCENTIL.INC',
  'QUARTILE.INC': 'CUARTIL.INC',
  QUARTILE: 'CUARTIL.INC',
  CUARTIL: 'CUARTIL.INC',
  RANK: 'JERARQUIA',
  'RANK.EQ': 'JERARQUIA',
  'JERARQUIA.EQV': 'JERARQUIA',
  SUMPRODUCT: 'SUMAPRODUCTO',
  COUNTIF: 'CONTAR.SI',
  SUMIF: 'SUMAR.SI',
  AVERAGEIF: 'PROMEDIO.SI',
  COUNTIFS: 'CONTAR.SI.CONJUNTO',
  SUMIFS: 'SUMAR.SI.CONJUNTO',
  IF: 'SI',
  AND: 'Y',
  OR: 'O',
  NOT: 'NO',
  TRUE: 'VERDADERO',
  FALSE: 'FALSO',
  IFERROR: 'SI.ERROR',
  IFNA: 'SI.ND',
  VLOOKUP: 'BUSCARV',
  XLOOKUP: 'BUSCARX',
  INDEX: 'INDICE',
  MATCH: 'COINCIDIR',
  LEFT: 'IZQUIERDA',
  RIGHT: 'DERECHA',
  MID: 'EXTRAE',
  LEN: 'LARGO',
  UPPER: 'MAYUSC',
  LOWER: 'MINUSC',
  PROPER: 'NOMPROPIO',
  TRIM: 'ESPACIOS',
  SUBSTITUTE: 'SUSTITUIR',
  FIND: 'ENCONTRAR',
  SEARCH: 'HALLAR',
  VALUE: 'VALOR',
  EXACT: 'IGUAL',
  CONCATENATE: 'CONCATENAR',
  TEXTJOIN: 'UNIRCADENAS',
  ROUND: 'REDONDEAR',
  ROUNDUP: 'REDONDEAR.MAS',
  ROUNDDOWN: 'REDONDEAR.MENOS',
  TRUNC: 'TRUNCAR',
  INT: 'ENTERO',
  MOD: 'RESIDUO',
  POWER: 'POTENCIA',
  SQRT: 'RAIZ',
  COMBIN: 'COMBINAT',
  PERMUT: 'PERMUTACIONES',
  'NORM.S.DIST': 'DISTR.NORM.ESTAND.N',
  'NORM.DIST': 'DISTR.NORM.N',
  'NORM.S.INV': 'INV.NORM.ESTAND',
  'NORM.INV': 'INV.NORM',
  'BINOM.DIST': 'DISTR.BINOM.N',
  'EXPON.DIST': 'DISTR.EXP.N',
  'T.DIST': 'DISTR.T.N',
  'T.DIST.2T': 'DISTR.T.2C',
  'T.DIST.RT': 'DISTR.T.CD',
  'T.INV': 'INV.T',
  'T.INV.2T': 'INV.T.2C',
  'CHISQ.DIST.RT': 'DISTR.CHICUAD.CD',
  'CHISQ.INV.RT': 'INV.CHICUAD.CD',
  'F.DIST.RT': 'DISTR.F.CD',
  'F.INV.RT': 'INV.F.CD',
  DATE: 'FECHA',
  YEAR: 'AÑO',
  ANO: 'AÑO',
  MONTH: 'MES',
  DAY: 'DIA',
  DAYS: 'DIAS',
  WEEKDAY: 'DIASEM',
  EOMONTH: 'FIN.MES',
  ISNUMBER: 'ESNUMERO',
  ISTEXT: 'ESTEXTO',
  ISBLANK: 'ESBLANCO',
  ISERROR: 'ESERROR',
  ISNA: 'ESNOD',
}

/** Busca una función por su nombre (español o inglés). */
export function buscarFuncion(nombre: string): { nombre: string; def: Definicion } | null {
  const mayus = nombre.toUpperCase()
  const canonico = REGISTRO[mayus] ? mayus : ALIAS[mayus]
  return canonico && REGISTRO[canonico] ? { nombre: canonico, def: REGISTRO[canonico] } : null
}

/** Nombres (en español) de todas las funciones disponibles. */
export const FUNCIONES_DISPONIBLES: string[] = Object.keys(REGISTRO).sort()

export { numeroATexto, ErrorExcel, dividir }
