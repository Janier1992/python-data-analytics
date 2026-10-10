import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  curriculum,
  cursos,
  cursosDisponibles,
  certificacionDeCurso,
  leccionesCertificables,
  leccionesDeCurso,
  rutasPorObjetivo,
  siguienteCurso,
  todasLasLecciones,
} from './curriculum'

test('los pasos de la ruta son consecutivos y sin repetir', () => {
  assert.deepEqual(
    cursos.map((c) => c.paso),
    cursos.map((_, i) => i + 1),
  )
  assert.equal(new Set(cursos.map((c) => c.id)).size, cursos.length)
})

test('cada módulo pertenece a un curso que existe y no a uno «próximamente»', () => {
  for (const m of curriculum) {
    const curso = cursos.find((c) => c.id === m.cursoId)
    assert.ok(curso, `${m.id}: el curso ${m.cursoId} no existe`)
    assert.ok(!curso.proximamente, `${m.id}: pertenece al curso en preparación ${curso.id}`)
  }
})

test('los cursos con contenido tienen lecciones y los «próximamente» no', () => {
  for (const c of cursos) {
    const n = leccionesDeCurso(c.id).length
    if (c.proximamente) assert.equal(n, 0, `${c.id} está en preparación pero tiene lecciones`)
    else assert.ok(n > 0, `${c.id} no tiene lecciones`)
  }
})

test('cada curso tiene título, resumen, requisitos y temas', () => {
  for (const c of cursos) {
    assert.ok(c.titulo.trim() && c.resumen.trim() && c.descripcion.trim() && c.requisitos.trim(), `${c.id}: campos vacíos`)
    assert.ok(c.aprenderas.length >= 3, `${c.id}: pocos temas`)
  }
})

test('las rutas sugeridas usan cursos que existen, sin repetirlos', () => {
  for (const r of rutasPorObjetivo) {
    assert.ok(r.cursoIds.length >= 3, `${r.id}: muy corta`)
    assert.equal(new Set(r.cursoIds).size, r.cursoIds.length, `${r.id}: cursos repetidos`)
    for (const id of r.cursoIds) assert.ok(cursos.some((c) => c.id === id), `${r.id}: el curso ${id} no existe`)
    const pasos = r.cursoIds.map((id) => cursos.find((c) => c.id === id)!.paso)
    assert.deepEqual(pasos, [...pasos].sort((a, b) => a - b), `${r.id}: no sigue el orden de la ruta`)
  }
})

test('todas las lecciones están en un curso y en el orden de estudio', () => {
  const ids = todasLasLecciones.map((l) => l.id)
  assert.equal(new Set(ids).size, ids.length)
  assert.equal(ids.length, curriculum.reduce((n, m) => n + m.lessonIds.length, 0))
})

test('el certificado «AI Academy» sigue contando solo las 96 lecciones de los cursos que certifican', () => {
  assert.equal(leccionesCertificables.length, 96)
  for (const id of ['estadistica-descriptiva', 'probabilidad', 'estadistica-inferencial']) {
    assert.equal(cursos.find((c) => c.id === id)?.certifica, false)
  }
})

test('las ampliaciones de SQL (módulos 38–42) pertenecen al curso SQL y no cuentan para el certificado', () => {
  const ampliaciones = curriculum.filter((m) => m.numero >= 38 && m.numero <= 42)
  assert.equal(ampliaciones.length, 5)
  for (const m of ampliaciones) {
    assert.equal(m.cursoId, 'sql')
    assert.equal(m.certifica, false)
    assert.ok(m.lessonIds.length > 0)
    for (const id of m.lessonIds) assert.ok(!leccionesCertificables.includes(id))
  }
  assert.ok(leccionesCertificables.includes('m19-l1')) // el módulo 19 original sí cuenta
  assert.equal(leccionesDeCurso('sql').length, 23)
  assert.equal(certificacionDeCurso('sql'), 'parcial')
  assert.equal(certificacionDeCurso('python-datos'), 'todo')
  assert.equal(certificacionDeCurso('excel'), 'ninguno')
})

test('siguiente curso con contenido', () => {
  assert.equal(siguienteCurso('estadistica-inferencial')?.id, 'excel')
  assert.equal(siguienteCurso('machine-learning')?.id, 'ia-aplicada')
  assert.equal(siguienteCurso('ia-aplicada')?.id, undefined) // el proyecto final aún no tiene contenido
  assert.equal(cursosDisponibles.length, 11)
})
