import { test } from 'node:test'
import assert from 'node:assert/strict'
import { horasEstimadas, progresoDeCurso } from './cursos'

const lecciones = ['a1', 'a2', 'a3', 'a4']

test('curso sin empezar: la siguiente es la primera lección', () => {
  const p = progresoDeCurso(lecciones, [])
  assert.deepEqual(p, { total: 4, hechas: 0, porcentaje: 0, estado: 'sin-empezar', siguienteId: 'a1' })
})

test('curso en curso: la siguiente es la primera pendiente', () => {
  const p = progresoDeCurso(lecciones, ['a1', 'a2'])
  assert.equal(p.estado, 'en-curso')
  assert.equal(p.porcentaje, 50)
  assert.equal(p.siguienteId, 'a3')
})

test('si hay una lección a medias de este curso, es la siguiente', () => {
  const p = progresoDeCurso(lecciones, ['a1', 'a2'], { ultimaLeccionId: 'a4' })
  assert.equal(p.siguienteId, 'a4')
})

test('la última lección abierta se ignora si ya está hecha o es de otro curso', () => {
  assert.equal(progresoDeCurso(lecciones, ['a1'], { ultimaLeccionId: 'a1' }).siguienteId, 'a2')
  assert.equal(progresoDeCurso(lecciones, ['a1'], { ultimaLeccionId: 'zzz' }).siguienteId, 'a2')
})

test('curso completado: lleva a la primera lección para repasar', () => {
  const p = progresoDeCurso(lecciones, lecciones)
  assert.equal(p.estado, 'completado')
  assert.equal(p.porcentaje, 100)
  assert.equal(p.siguienteId, 'a1')
})

test('curso próximamente o sin lecciones', () => {
  assert.equal(progresoDeCurso(lecciones, [], { proximamente: true }).estado, 'proximamente')
  const vacio = progresoDeCurso([], [])
  assert.equal(vacio.estado, 'proximamente')
  assert.equal(vacio.siguienteId, null)
  assert.equal(vacio.porcentaje, 0)
})

test('las lecciones de otros cursos no cuentan', () => {
  assert.equal(progresoDeCurso(lecciones, ['b1', 'b2', 'a1']).hechas, 1)
})

test('horas estimadas', () => {
  assert.equal(horasEstimadas(1), 1)
  assert.equal(horasEstimadas(19), 8)
  assert.equal(horasEstimadas(60), 25)
})
