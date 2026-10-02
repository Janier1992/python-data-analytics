// Utilidades de cuentas locales: validación de datos y hash de contraseñas (PBKDF2 con Web Crypto).
//
// IMPORTANTE: la plataforma no tiene servidor. Las cuentas viven en el navegador del estudiante
// (localStorage), así que sirven para tener un perfil y un progreso por persona en cada dispositivo,
// no como seguridad real frente a alguien con acceso al dispositivo.

export interface Cuenta {
  id: string
  nombre: string // nombre completo, tal como aparecerá en el certificado
  email: string
  salt: string // base64
  hash: string // base64
  iteraciones: number
  creadaEn: number
}

export interface DatosRegistro {
  nombre: string
  email: string
  contrasena: string
  confirmacion: string
}

export const ITERACIONES_PBKDF2 = 210_000
export const LONGITUD_MIN_CONTRASENA = 8

const textoABytes = (t: string) => new TextEncoder().encode(t)

export function bytesABase64(bytes: Uint8Array): string {
  let binario = ''
  bytes.forEach((b) => (binario += String.fromCharCode(b)))
  return btoa(binario)
}

export function base64ABytes(b64: string): Uint8Array {
  const binario = atob(b64)
  const bytes = new Uint8Array(binario.length)
  for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i)
  return bytes
}

function subtle(): SubtleCrypto {
  const s = globalThis.crypto?.subtle
  if (!s) throw new Error('Tu navegador no permite crear cuentas aquí (se necesita una conexión segura https).')
  return s
}

async function derivar(contrasena: string, salt: Uint8Array, iteraciones: number): Promise<Uint8Array> {
  const s = subtle()
  const material = await s.importKey('raw', textoABytes(contrasena), 'PBKDF2', false, ['deriveBits'])
  const bits = await s.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: iteraciones }, material, 256)
  return new Uint8Array(bits)
}

/** Comparación en tiempo constante de dos arreglos de bytes. */
function iguales(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let diferencia = 0
  for (let i = 0; i < a.length; i++) diferencia |= a[i] ^ b[i]
  return diferencia === 0
}

export async function hashearContrasena(
  contrasena: string,
  iteraciones = ITERACIONES_PBKDF2,
): Promise<{ salt: string; hash: string; iteraciones: number }> {
  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16))
  const hash = await derivar(contrasena, salt, iteraciones)
  return { salt: bytesABase64(salt), hash: bytesABase64(hash), iteraciones }
}

export async function verificarContrasena(
  contrasena: string,
  cuenta: Pick<Cuenta, 'salt' | 'hash' | 'iteraciones'>,
): Promise<boolean> {
  const hash = await derivar(contrasena, base64ABytes(cuenta.salt), cuenta.iteraciones)
  return iguales(hash, base64ABytes(cuenta.hash))
}

export const normalizarEmail = (email: string) => email.trim().toLowerCase()

/** Espacios repetidos o al borde fuera; conserva mayúsculas y tildes. */
export const normalizarNombre = (nombre: string) => nombre.trim().replace(/\s+/g, ' ')

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validarNombre(nombre: string): string | null {
  const n = normalizarNombre(nombre)
  if (n.length < 5 || n.split(' ').length < 2) return 'Escribe tu nombre completo (nombre y apellido): así aparecerá en tu certificado.'
  if (n.length > 80) return 'El nombre es demasiado largo (máximo 80 caracteres).'
  if (!/^[\p{L}][\p{L}\s'.-]*$/u.test(n)) return 'El nombre solo puede tener letras, espacios, apóstrofes, puntos y guiones.'
  return null
}

export function validarEmail(email: string): string | null {
  return REGEX_EMAIL.test(normalizarEmail(email)) ? null : 'Escribe un correo válido, por ejemplo nombre@correo.com.'
}

export function validarContrasena(contrasena: string): string | null {
  if (contrasena.length < LONGITUD_MIN_CONTRASENA) return `Usa al menos ${LONGITUD_MIN_CONTRASENA} caracteres.`
  if (!/[A-Za-z\p{L}]/u.test(contrasena) || !/\d/.test(contrasena)) return 'Combina letras y números.'
  return null
}

export type ErroresRegistro = Partial<Record<keyof DatosRegistro, string>>

export function validarRegistro(datos: DatosRegistro): ErroresRegistro {
  const errores: ErroresRegistro = {}
  const nombre = validarNombre(datos.nombre)
  if (nombre) errores.nombre = nombre
  const email = validarEmail(datos.email)
  if (email) errores.email = email
  const contrasena = validarContrasena(datos.contrasena)
  if (contrasena) errores.contrasena = contrasena
  if (!errores.contrasena && datos.contrasena !== datos.confirmacion) errores.confirmacion = 'Las contraseñas no coinciden.'
  return errores
}

/** "Ana María Pérez" → "AP" */
export function iniciales(nombre: string): string {
  const partes = normalizarNombre(nombre).split(' ').filter(Boolean)
  if (partes.length === 0) return '?'
  const primera = partes[0][0]
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : ''
  return (primera + ultima).toUpperCase()
}

export function nuevoId(): string {
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(8))
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}
