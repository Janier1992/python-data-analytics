// Distribuciones de probabilidad para las funciones estadísticas de la hoja (normal, binomial, Poisson,
// exponencial, t de Student, chi-cuadrado y F). Algoritmos numéricos estándar, probados contra valores de referencia.

const PI = Math.PI

// ───────── Funciones especiales ─────────

/** Logaritmo de la función gamma (aproximación de Lanczos, g = 7). */
export function lnGamma(x: number): number {
  if (x < 0.5) return Math.log(PI / Math.sin(PI * x)) - lnGamma(1 - x)
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ]
  x -= 1
  let a = c[0]
  const t = x + 7.5
  for (let i = 1; i < 9; i++) a += c[i] / (x + i)
  return 0.5 * Math.log(2 * PI) + (x + 0.5) * Math.log(t) - t + Math.log(a)
}

/** Función beta incompleta regularizada I_x(a, b) (fracción continua de Lentz). */
export function betaIncompletaReg(x: number, a: number, b: number): number {
  if (x <= 0) return 0
  if (x >= 1) return 1
  const lnBeta = lnGamma(a) + lnGamma(b) - lnGamma(a + b)
  const frente = Math.exp(a * Math.log(x) + b * Math.log(1 - x) - lnBeta)
  const fraccion = (xx: number, aa: number, bb: number) => {
    const TINY = 1e-300
    let c = 1
    let d = 1 - ((aa + bb) * xx) / (aa + 1)
    if (Math.abs(d) < TINY) d = TINY
    d = 1 / d
    let h = d
    for (let m = 1; m <= 500; m++) {
      const m2 = 2 * m
      let num = (m * (bb - m) * xx) / ((aa + m2 - 1) * (aa + m2))
      d = 1 + num * d
      if (Math.abs(d) < TINY) d = TINY
      c = 1 + num / c
      if (Math.abs(c) < TINY) c = TINY
      d = 1 / d
      h *= d * c
      num = (-(aa + m) * (aa + bb + m) * xx) / ((aa + m2) * (aa + m2 + 1))
      d = 1 + num * d
      if (Math.abs(d) < TINY) d = TINY
      c = 1 + num / c
      if (Math.abs(c) < TINY) c = TINY
      d = 1 / d
      const delta = d * c
      h *= delta
      if (Math.abs(delta - 1) < 1e-15) break
    }
    return h
  }
  return x < (a + 1) / (a + b + 2) ? (frente * fraccion(x, a, b)) / a : 1 - (frente * fraccion(1 - x, b, a)) / b
}

/** Función gamma incompleta regularizada superior Q(a, x). */
export function gammaIncompletaSup(a: number, x: number): number {
  if (x <= 0) return 1
  const lnFrente = -x + a * Math.log(x) - lnGamma(a)
  if (x < a + 1) {
    // serie para P(a, x)
    let suma = 1 / a
    let termino = suma
    for (let n = 1; n < 1000; n++) {
      termino *= x / (a + n)
      suma += termino
      if (Math.abs(termino) < Math.abs(suma) * 1e-16) break
    }
    return 1 - Math.exp(lnFrente) * suma
  }
  // fracción continua para Q(a, x)
  const TINY = 1e-300
  let b = x + 1 - a
  let c = 1 / TINY
  let d = 1 / b
  let h = d
  for (let i = 1; i < 1000; i++) {
    const an = -i * (i - a)
    b += 2
    d = an * d + b
    if (Math.abs(d) < TINY) d = TINY
    c = b + an / c
    if (Math.abs(c) < TINY) c = TINY
    d = 1 / d
    const delta = d * c
    h *= delta
    if (Math.abs(delta - 1) < 1e-15) break
  }
  return Math.exp(lnFrente) * h
}

// ───────── Normal ─────────

/** Función de distribución de la normal estándar Φ(z). */
export function pnormEstandar(z: number): number {
  if (Number.isNaN(z)) return NaN
  const y = Math.abs(z)
  if (y < 3) {
    // serie: Φ(z) = 1/2 + φ(z) · Σ z^(2n+1) / (1·3·5···(2n+1))
    let termino = y
    let suma = y
    for (let n = 1; n < 200; n++) {
      termino *= (y * y) / (2 * n + 1)
      suma += termino
      if (termino < 1e-17 * suma) break
    }
    const mitad = (Math.exp((-y * y) / 2) / Math.sqrt(2 * PI)) * suma
    return z >= 0 ? 0.5 + mitad : 0.5 - mitad
  }
  // cola: Q(y) = φ(y) / (y + 1/(y + 2/(y + 3/(y + ···))))
  let f = y
  for (let k = 80; k >= 1; k--) f = y + k / f
  const cola = Math.exp((-y * y) / 2) / Math.sqrt(2 * PI) / f
  return z >= 0 ? 1 - cola : cola
}

/** Inversa de la normal estándar (algoritmo de Acklam con un paso de refinamiento). */
export function qnormEstandar(p: number): number {
  if (!(p > 0 && p < 1)) return NaN
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239]
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1]
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783]
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416]
  const plow = 0.02425
  let x: number
  if (p < plow) {
    const q = Math.sqrt(-2 * Math.log(p))
    x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  } else if (p > 1 - plow) {
    const q = Math.sqrt(-2 * Math.log(1 - p))
    x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  } else {
    const q = p - 0.5
    const r = q * q
    x = ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  }
  // un paso de Halley para llegar a precisión de doble
  const e = pnormEstandar(x) - p
  const u = e * Math.sqrt(2 * PI) * Math.exp((x * x) / 2)
  return x - u / (1 + (x * u) / 2)
}

// ───────── Discretas y exponencial ─────────

const lnFactorial = (n: number) => lnGamma(n + 1)

export function pmfBinomial(k: number, n: number, p: number): number {
  if (k < 0 || k > n) return 0
  if (p === 0) return k === 0 ? 1 : 0
  if (p === 1) return k === n ? 1 : 0
  return Math.exp(lnFactorial(n) - lnFactorial(k) - lnFactorial(n - k) + k * Math.log(p) + (n - k) * Math.log(1 - p))
}
export function cdfBinomial(k: number, n: number, p: number): number {
  let suma = 0
  for (let i = 0; i <= Math.min(k, n); i++) suma += pmfBinomial(i, n, p)
  return Math.min(1, suma)
}
export function pmfPoisson(k: number, mu: number): number {
  if (k < 0) return 0
  if (mu === 0) return k === 0 ? 1 : 0
  return Math.exp(-mu + k * Math.log(mu) - lnFactorial(k))
}
export function cdfPoisson(k: number, mu: number): number {
  let suma = 0
  for (let i = 0; i <= k; i++) suma += pmfPoisson(i, mu)
  return Math.min(1, suma)
}

// ───────── t, chi-cuadrado y F ─────────

/** P(T > |t|) × 2: valor p de dos colas de la t de Student. */
export function pT2Colas(t: number, gl: number): number {
  return betaIncompletaReg(gl / (gl + t * t), gl / 2, 0.5)
}
/** Función de distribución de la t de Student (cola izquierda). */
export function cdfT(t: number, gl: number): number {
  const mitad = pT2Colas(t, gl) / 2
  return t >= 0 ? 1 - mitad : mitad
}
export const colaDerechaChi2 = (x: number, gl: number) => gammaIncompletaSup(gl / 2, x / 2)
export const colaDerechaF = (x: number, gl1: number, gl2: number) => (x <= 0 ? 1 : betaIncompletaReg(gl2 / (gl2 + gl1 * x), gl2 / 2, gl1 / 2))

/** Resuelve f(x) = objetivo para f decreciente en [bajo, alto) por bisección. */
function invertirDecreciente(f: (x: number) => number, objetivo: number, bajo: number, alto: number): number {
  let lo = bajo
  let hi = alto
  while (f(hi) > objetivo && hi < 1e12) hi *= 2
  for (let i = 0; i < 200; i++) {
    const medio = (lo + hi) / 2
    if (f(medio) > objetivo) lo = medio
    else hi = medio
    if (hi - lo < 1e-13 * Math.max(1, hi)) break
  }
  return (lo + hi) / 2
}

/** Valor t tal que P(|T| > t) = p (dos colas). */
export const invT2Colas = (p: number, gl: number) => invertirDecreciente((t) => pT2Colas(t, gl), p, 0, 10)
/** Valor t tal que P(T < t) = p. */
export function invT(p: number, gl: number): number {
  if (p === 0.5) return 0
  return p > 0.5 ? invT2Colas(2 * (1 - p), gl) : -invT2Colas(2 * p, gl)
}
export const invChi2ColaDerecha = (p: number, gl: number) => invertirDecreciente((x) => colaDerechaChi2(x, gl), p, 0, Math.max(10, gl * 2))
export const invFColaDerecha = (p: number, gl1: number, gl2: number) => invertirDecreciente((x) => colaDerechaF(x, gl1, gl2), p, 0, 10)
