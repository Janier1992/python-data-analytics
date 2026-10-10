import { test } from 'node:test'
import assert from 'node:assert/strict'
import { comprobarCalculo, comprobarPregunta, parsearNumero, toleranciaDe } from './comprobar'
import type { EjercicioCalculo } from './tipos'

test('parsearNumero: comas, puntos, porcentajes, fracciones y basura', () => {
  assert.equal(parsearNumero('12.5'), 12.5)
  assert.equal(parsearNumero('12,5'), 12.5)
  assert.equal(parsearNumero(' 12 , 5 '), 12.5)
  assert.equal(parsearNumero('1,234.5'), 1234.5)
  assert.equal(parsearNumero('1.234,5'), 1234.5)
  assert.equal(parsearNumero('1,234,567'), 1234567)
  assert.equal(parsearNumero('1.234.567'), 1234567)
  assert.equal(parsearNumero('-3'), -3)
  assert.equal(parsearNumero('−3'), -3)
  assert.equal(parsearNumero('25%'), 25)
  assert.equal(parsearNumero('3/4'), 0.75)
  assert.equal(parsearNumero('1/0'), null)
  assert.equal(parsearNumero('abc'), null)
  assert.equal(parsearNumero(''), null)
  assert.equal(parsearNumero('1,5,'), null)
})

test('tolerancia por defecto: medio dígito del último decimal; exacta para enteros', () => {
  assert.ok(Math.abs(toleranciaDe(32.5) - 0.05) < 1e-6)
  assert.ok(Math.abs(toleranciaDe(0.8413) - 0.00005) < 1e-6)
  assert.ok(toleranciaDe(7) < 1e-6)
  assert.equal(toleranciaDe(7, 0.5), 0.5)
})

test('preguntas numéricas: acierto, redondeo, signo y error', () => {
  const p = { tipo: 'numero' as const, etiqueta: 'media', valor: 32.5 }
  assert.equal(comprobarPregunta(p, '32.5').ok, true)
  assert.equal(comprobarPregunta(p, '32,5').ok, true)
  assert.equal(comprobarPregunta(p, '32.52').ok, true, 'dentro del medio decimal')
  assert.equal(comprobarPregunta(p, '33.4').ok, false)
  assert.match(comprobarPregunta(p, '-32.5').mensaje, /signo/)
  assert.match(comprobarPregunta(p, '34').mensaje, /cerca/)
  assert.match(comprobarPregunta(p, '').mensaje, /Escribe/)
  assert.match(comprobarPregunta(p, 'x').mensaje, /No entiendo/)
})

test('preguntas de opción', () => {
  const p = { tipo: 'opcion' as const, etiqueta: 'tipo', opciones: ['a', 'b', 'c'], correcta: 1 }
  assert.equal(comprobarPregunta(p, 1).ok, true)
  assert.equal(comprobarPregunta(p, '1').ok, true)
  assert.equal(comprobarPregunta(p, 2).ok, false)
  assert.match(comprobarPregunta(p, null).mensaje, /Elige/)
})

test('ejercicio completo: cuenta las respuestas correctas', () => {
  const ej: EjercicioCalculo = {
    id: 'x-l1-practica',
    enunciado: 'e',
    preguntas: [
      { tipo: 'numero', etiqueta: 'a', valor: 2 },
      { tipo: 'numero', etiqueta: 'b', valor: 0.5 },
    ],
    solucion: ['s'],
    pistas: [],
  }
  assert.equal(comprobarCalculo(ej, ['2', '0.5']).ok, true)
  const parcial = comprobarCalculo(ej, ['2', '1'])
  assert.equal(parcial.ok, false)
  assert.match(parcial.mensaje, /1 de 2/)
  assert.match(comprobarCalculo(ej, ['', '']).mensaje, /ninguna/)
})

test('casillas: exige exactamente las opciones correctas', () => {
  const p = { tipo: 'casillas' as const, etiqueta: '¿Cuáles?', opciones: ['a', 'b', 'c'], correctas: [0, 2] }
  assert.equal(comprobarPregunta(p, '0,2').ok, true)
  assert.equal(comprobarPregunta(p, '2,0').ok, true)
  assert.equal(comprobarPregunta(p, '0').ok, false)
  assert.match(comprobarPregunta(p, '0').mensaje, /Faltan/)
  assert.match(comprobarPregunta(p, '0,1,2').mensaje, /no corresponde/)
  assert.equal(comprobarPregunta(p, '').ok, false)
})
