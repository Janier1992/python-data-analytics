import { test } from 'node:test'
import assert from 'node:assert/strict'
import { claveDiaLocal, estadoDeModulo, rachaActual, saludoSegunHora } from './progreso'

const hoy = new Date(2025, 2, 15, 10, 0) // 15 de marzo de 2025

test('claveDiaLocal usa la fecha local con ceros', () => {
  assert.equal(claveDiaLocal(new Date(2025, 0, 5)), '2025-01-05')
})

test('racha: días consecutivos hasta hoy', () => {
  assert.equal(rachaActual(['2025-03-15', '2025-03-14', '2025-03-13'], hoy), 3)
})

test('racha: sigue viva si el último día fue ayer', () => {
  assert.equal(rachaActual(['2025-03-14', '2025-03-13'], hoy), 2)
})

test('racha: se rompe si falta un día o pasaron más de 1 día', () => {
  assert.equal(rachaActual(['2025-03-15', '2025-03-13'], hoy), 1)
  assert.equal(rachaActual(['2025-03-12', '2025-03-11'], hoy), 0)
  assert.equal(rachaActual([], hoy), 0)
})

test('racha: cruza el cambio de mes y de año', () => {
  assert.equal(rachaActual(['2025-01-01', '2024-12-31', '2024-12-30'], new Date(2025, 0, 1, 8)), 3)
  assert.equal(rachaActual(['2025-03-01', '2025-02-28'], new Date(2025, 2, 1, 8)), 2)
})

test('estado de módulo', () => {
  assert.equal(estadoDeModulo(0, 4), 'sin-empezar')
  assert.equal(estadoDeModulo(2, 4), 'en-curso')
  assert.equal(estadoDeModulo(4, 4), 'completado')
  assert.equal(estadoDeModulo(0, 0), 'sin-empezar')
})

test('saludo por hora', () => {
  assert.equal(saludoSegunHora(3), 'Buenas noches')
  assert.equal(saludoSegunHora(9), 'Buenos días')
  assert.equal(saludoSegunHora(15), 'Buenas tardes')
  assert.equal(saludoSegunHora(21), 'Buenas noches')
})
