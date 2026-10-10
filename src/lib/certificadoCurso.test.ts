import { test } from 'node:test'
import assert from 'node:assert/strict'
import { completarCursosPendientes, cursoDeRuta, cursoCompleto, datosCertificadoCurso, registrarInicio, registrarTiempo } from './certificadoCurso'

const LECCIONES = { a: ['a1', 'a2'], b: ['b1'] }

test('un curso está completo solo con todas sus lecciones (y si tiene lecciones)', () => {
  assert.equal(cursoCompleto(['a1', 'a2'], LECCIONES.a), true)
  assert.equal(cursoCompleto(['a1'], LECCIONES.a), false)
  assert.equal(cursoCompleto(['a1'], []), false)
})

test('el inicio se fija una sola vez', () => {
  const uno = registrarInicio({}, 'a', 100)
  assert.equal(uno.a.inicioEn, 100)
  const dos = registrarInicio(uno, 'a', 500)
  assert.equal(dos, uno, 'no cambia si ya tenía inicio')
})

test('el tiempo se acumula por curso y fija el inicio si faltaba', () => {
  const t1 = registrarTiempo({}, 'a', 10, 100)
  const t2 = registrarTiempo(t1, 'a', 10, 200)
  assert.deepEqual(t2.a, { inicioEn: 100, completadoEn: null, tiempoSeg: 20 })
  assert.equal(registrarTiempo(t2, 'a', 0, 300), t2)
  assert.equal(t2.b, undefined)
})

test('la finalización se fija al completar y no cambia después', () => {
  let act = registrarInicio({}, 'a', 100)
  act = completarCursosPendientes(act, ['a1'], LECCIONES, 200, null)
  assert.equal(act.a.completadoEn, null, 'aún faltan lecciones')
  act = completarCursosPendientes(act, ['a1', 'a2'], LECCIONES, 300, null)
  assert.deepEqual({ i: act.a.inicioEn, c: act.a.completadoEn }, { i: 100, c: 300 })
  const sinCambio = completarCursosPendientes(act, ['a1', 'a2'], LECCIONES, 999, null)
  assert.equal(sinCambio.a.completadoEn, 300)
})

test('sin inicio conocido se usa el inicio alternativo o la fecha de finalización', () => {
  const conAlternativo = completarCursosPendientes({}, ['b1'], LECCIONES, 500, 50)
  assert.deepEqual({ i: conAlternativo.b.inicioEn, c: conAlternativo.b.completadoEn }, { i: 50, c: 500 })
  const sinAlternativo = completarCursosPendientes({}, ['b1'], LECCIONES, 500, null)
  assert.equal(sinAlternativo.b.inicioEn, 500)
  // un inicio alternativo posterior a la finalización no produce duraciones negativas
  const raro = completarCursosPendientes({}, ['b1'], LECCIONES, 500, 900)
  assert.equal(raro.b.inicioEn, 500)
})

test('con soloCursoId solo se revisa ese curso', () => {
  const act = completarCursosPendientes({}, ['a1', 'a2', 'b1'], LECCIONES, 400, null, 'a')
  assert.equal(act.a.completadoEn, 400)
  assert.equal(act.b, undefined)
})

test('datos del certificado: solo cuando el curso está completo', () => {
  assert.equal(datosCertificadoCurso({}, 'a'), null)
  assert.equal(datosCertificadoCurso({ a: { inicioEn: 1, completadoEn: null, tiempoSeg: 5 } }, 'a'), null)
  assert.deepEqual(datosCertificadoCurso({ a: { inicioEn: 1, completadoEn: 9, tiempoSeg: 5 } }, 'a'), { inicioEn: 1, completadoEn: 9, tiempoSeg: 5 })
})

test('el curso de una ruta: lección, curso u otra página', () => {
  const resolver = (id: string) => (id === 'm1-l1' ? 'python-datos' : undefined)
  assert.equal(cursoDeRuta('/leccion/m1-l1', resolver), 'python-datos')
  assert.equal(cursoDeRuta('/leccion/inexistente', resolver), null)
  assert.equal(cursoDeRuta('/cursos/sql', resolver), 'sql')
  assert.equal(cursoDeRuta('/curso', resolver), null)
  assert.equal(cursoDeRuta('/certificados/sql', resolver), null)
})
