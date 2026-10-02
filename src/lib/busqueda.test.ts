import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buscar, normalizar, palabrasDe } from './busqueda'
import type { EntradaRef } from '../content/reference/tipos'

const e = (id: string, nombre: string, resumen: string, extra: Partial<EntradaRef> = {}): EntradaRef => ({
  id,
  nombre,
  grupo: 'Grupo',
  resumen,
  ejemplo: 'print(1)',
  ...extra,
})

const entradas = [
  e('pandas-head', 'df.head() / df.tail()', 'Muestra las primeras o últimas filas.'),
  e('pandas-shape', 'df.shape / len(df)', 'Dimensiones de la tabla.'),
  e('python-len', 'len()', 'Cuenta los elementos de una colección.'),
  e('sql-group-by', 'GROUP BY', 'Agrupa filas para calcular resúmenes.', { notas: ['Equivale a groupby de pandas.'] }),
  e('pandas-groupby', 'df.groupby()', 'Divide en grupos y resume cada uno.', { parametros: [{ nombre: 'as_index', descripcion: 'Deja los grupos como columna.' }] }),
]

test('normalizar quita tildes y mayúsculas', () => {
  assert.equal(normalizar('Función ÚLTIMAS Ñandú'), 'funcion ultimas nandu')
})

test('palabrasDe divide por espacios y descarta vacíos', () => {
  assert.deepEqual(palabrasDe('  Group   BY '), ['group', 'by'])
  assert.deepEqual(palabrasDe(''), [])
})

test('una consulta vacía devuelve todo en el orden original', () => {
  assert.deepEqual(buscar(entradas, '   ').map((r) => r.entrada.id), entradas.map((x) => x.id))
})

test('encuentra por nombre y funciona sin tildes', () => {
  assert.equal(buscar(entradas, 'head')[0].entrada.id, 'pandas-head')
  assert.equal(buscar(entradas, 'ultimas')[0].entrada.id, 'pandas-head', 'busca "últimas" sin escribir la tilde')
})

test('todas las palabras deben coincidir', () => {
  const ids = buscar(entradas, 'group by').map((r) => r.entrada.id)
  assert.equal(ids[0], 'sql-group-by', 'la frase exacta va primero')
  assert.ok(!ids.includes('python-len'))
  assert.deepEqual(buscar(entradas, 'head zzz'), [])
})

test('el nombre pesa más que el resumen y que las notas', () => {
  const ids = buscar(entradas, 'groupby').map((r) => r.entrada.id)
  assert.equal(ids[0], 'pandas-groupby')
  assert.ok(ids.includes('sql-group-by'), 'también aparece donde solo se menciona en las notas')
})

test('busca en los nombres de parámetros', () => {
  assert.equal(buscar(entradas, 'as_index')[0].entrada.id, 'pandas-groupby')
})

test('caracteres especiales de regex no rompen la búsqueda', () => {
  assert.doesNotThrow(() => buscar(entradas, 'df.'))
  assert.doesNotThrow(() => buscar(entradas, '(['))
  assert.equal(buscar(entradas, 'len(').length > 0, true)
})
