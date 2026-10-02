import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  hashearContrasena,
  verificarContrasena,
  validarRegistro,
  validarNombre,
  validarEmail,
  validarContrasena,
  normalizarNombre,
  normalizarEmail,
  iniciales,
} from './auth'

// Pocas iteraciones: las pruebas no necesitan el costo real de producción.
const ITER_RAPIDAS = 1000

test('hashear y verificar contraseña', async () => {
  const { salt, hash, iteraciones } = await hashearContrasena('Secreta123', ITER_RAPIDAS)
  assert.equal(await verificarContrasena('Secreta123', { salt, hash, iteraciones }), true)
  assert.equal(await verificarContrasena('secreta123', { salt, hash, iteraciones }), false)
  assert.equal(await verificarContrasena('', { salt, hash, iteraciones }), false)
})

test('la misma contraseña genera hashes distintos (sal aleatoria) y no se guarda en claro', async () => {
  const a = await hashearContrasena('Secreta123', ITER_RAPIDAS)
  const b = await hashearContrasena('Secreta123', ITER_RAPIDAS)
  assert.notEqual(a.salt, b.salt)
  assert.notEqual(a.hash, b.hash)
  assert.ok(!a.hash.includes('Secreta123'))
})

test('validación de nombre completo', () => {
  assert.equal(validarNombre('Ana Pérez'), null)
  assert.equal(validarNombre("María José O'Connor-Ruiz"), null)
  assert.ok(validarNombre('Ana'), 'un solo nombre no basta')
  assert.ok(validarNombre('A B'), 'demasiado corto')
  assert.ok(validarNombre('Ana 123 Pérez'), 'sin números')
  assert.ok(validarNombre('x'.repeat(90) + ' y'), 'demasiado largo')
})

test('validación de correo', () => {
  assert.equal(validarEmail('ana@correo.com'), null)
  assert.equal(validarEmail('  ANA@Correo.COM '), null)
  assert.ok(validarEmail('ana@correo'))
  assert.ok(validarEmail('ana correo.com'))
  assert.ok(validarEmail(''))
})

test('validación de contraseña', () => {
  assert.equal(validarContrasena('Secreta123'), null)
  assert.ok(validarContrasena('corta1'))
  assert.ok(validarContrasena('soloLetrasAqui'))
  assert.ok(validarContrasena('1234567890'))
})

test('validarRegistro agrupa los errores por campo', () => {
  const ok = validarRegistro({ nombre: 'Ana Pérez', email: 'ana@correo.com', contrasena: 'Secreta123', confirmacion: 'Secreta123' })
  assert.deepEqual(ok, {})
  const mal = validarRegistro({ nombre: 'Ana', email: 'x', contrasena: 'Secreta123', confirmacion: 'otra' })
  assert.deepEqual(Object.keys(mal).sort(), ['confirmacion', 'email', 'nombre'])
})

test('normalización y iniciales', () => {
  assert.equal(normalizarNombre('  Ana   María  Pérez '), 'Ana María Pérez')
  assert.equal(normalizarEmail('  ANA@Correo.COM '), 'ana@correo.com')
  assert.equal(iniciales('Ana María Pérez'), 'AP')
  assert.equal(iniciales('ana'), 'A')
  assert.equal(iniciales('   '), '?')
})
