import { test } from 'node:test'
import assert from 'node:assert/strict'
import { areaNormal, cortesHistograma, frecuenciasHistograma, marcasEje, percentil, resumenCaja } from './graficos'

test('marcas de eje agradables', () => {
  assert.deepEqual(marcasEje(0, 10, 5), [0, 2, 4, 6, 8, 10])
  assert.deepEqual(marcasEje(0, 1, 5), [0, 0.2, 0.4, 0.6, 0.8, 1])
  assert.deepEqual(marcasEje(3, 3), [3])
})

test('percentiles con interpolación lineal', () => {
  const d = [1, 2, 3, 4, 5, 6, 7, 8]
  assert.equal(percentil(d, 0.5), 4.5)
  assert.equal(percentil(d, 0.25), 2.75)
  assert.equal(percentil(d, 0.75), 6.25)
  assert.equal(percentil([7], 0.9), 7)
})

test('resumen de caja: bigotes y valores atípicos', () => {
  const r = resumenCaja([10, 12, 12, 13, 14, 15, 16, 18, 40])
  assert.equal(r.mediana, 14)
  assert.deepEqual(r.atipicos, [40])
  assert.equal(r.bigoteSup, 18)
  assert.equal(r.max, 40)
})

test('histograma: cortes dados y frecuencias que suman el total', () => {
  const datos = [1, 2, 2, 3, 3, 3, 4, 5, 9]
  const cortes = cortesHistograma(datos, [0, 3, 6, 9])
  assert.deepEqual(frecuenciasHistograma(datos, cortes), [3, 5, 1])
  const auto = cortesHistograma(datos)
  assert.equal(frecuenciasHistograma(datos, auto).reduce((a, b) => a + b, 0), datos.length)
})

test('área bajo la normal', () => {
  assert.ok(Math.abs(areaNormal(0, 1, -1.96, 1.96) - 0.950004209703559) < 1e-9)
  assert.ok(Math.abs(areaNormal(100, 15, null, 100) - 0.5) < 1e-12)
  assert.ok(Math.abs(areaNormal(100, 15, 130, null) - 0.022750131948179) < 1e-9)
})
