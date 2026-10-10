import { test } from 'node:test'
import assert from 'node:assert/strict'
import { avanceCertificado, codigoDeConstancia, diasDeEstudio, formatearDuracion, formatearFecha, formatearTiempoEstudio } from './certificado'

const MIN = 60_000
const HORA = 60 * MIN
const DIA = 24 * HORA
const T0 = new Date(2025, 0, 10, 9, 0, 0).getTime()

test('duración: menos de una hora y horas con minutos', () => {
  assert.equal(formatearDuracion(T0, T0 + 20 * MIN), 'menos de una hora')
  assert.equal(formatearDuracion(T0, T0 + HORA), '1 hora')
  assert.equal(formatearDuracion(T0, T0 + 3 * HORA + 20 * MIN), '3 horas y 20 minutos')
  assert.equal(formatearDuracion(T0, T0 + 5 * HORA), '5 horas')
})

test('duración: días y semanas', () => {
  assert.equal(formatearDuracion(T0, T0 + DIA), '1 día')
  assert.equal(formatearDuracion(T0, T0 + 9 * DIA + 5 * HORA), '9 días')
  assert.equal(formatearDuracion(T0, T0 + 14 * DIA), '14 días (2 semanas)')
  assert.equal(formatearDuracion(T0, T0 + 45 * DIA), '45 días (6 semanas)')
})

test('duración: fechas invertidas no dan valores negativos', () => {
  assert.equal(formatearDuracion(T0 + DIA, T0), 'menos de una hora')
})

test('tiempo de estudio', () => {
  assert.equal(formatearTiempoEstudio(0), 'menos de 1 min')
  assert.equal(formatearTiempoEstudio(59), 'menos de 1 min')
  assert.equal(formatearTiempoEstudio(45 * 60), '45 min')
  assert.equal(formatearTiempoEstudio(2 * 3600), '2 h')
  assert.equal(formatearTiempoEstudio(12 * 3600 + 30 * 60 + 15), '12 h 30 min')
  assert.equal(formatearTiempoEstudio(-5), 'menos de 1 min')
})

test('fecha en español', () => {
  assert.equal(formatearFecha(new Date(2025, 2, 15, 12).getTime()), '15 de marzo de 2025')
})

test('días de estudio cuenta días distintos', () => {
  assert.equal(diasDeEstudio(['2025-01-10', '2025-01-11', '2025-01-10']), 2)
  assert.equal(diasDeEstudio([]), 0)
})

test('código de constancia: estable, con formato y sensible a los datos', async () => {
  const datos = { cuentaId: 'abc', nombre: 'Ana María Pérez', inicioEn: T0, completadoEn: T0 + 30 * DIA }
  const a = await codigoDeConstancia(datos)
  const b = await codigoDeConstancia(datos)
  assert.equal(a, b)
  assert.match(a, /^AIA-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}$/)
  assert.notEqual(a, await codigoDeConstancia({ ...datos, nombre: 'Ana Maria Perez' }))
  assert.notEqual(a, await codigoDeConstancia({ ...datos, completadoEn: datos.completadoEn + 1 }))
})

test('código de constancia de un curso: prefijo propio y distinto según el curso', async () => {
  const datos = { cuentaId: 'abc', nombre: 'Ana María Pérez', inicioEn: T0, completadoEn: T0 + 30 * DIA }
  const programa = await codigoDeConstancia(datos)
  const sql = await codigoDeConstancia({ ...datos, cursoId: 'sql' })
  const excel = await codigoDeConstancia({ ...datos, cursoId: 'excel' })
  assert.match(sql, /^AIC-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}$/)
  assert.notEqual(sql, excel)
  assert.notEqual(sql.slice(4), programa.slice(4))
  assert.equal(sql, await codigoDeConstancia({ ...datos, cursoId: 'sql' }))
})

test('avance del certificado', () => {
  const modulos = { 'modulo-0': ['a', 'b'], 'modulo-1': ['c', 'd', 'e'], 'modulo-2': [] as string[] }
  const parcial = avanceCertificado(['a', 'b', 'c'], modulos)
  assert.deepEqual(
    { l: parcial.leccionesHechas, t: parcial.leccionesTotales, m: parcial.modulosHechos, mt: parcial.modulosTotales, c: parcial.completo, p: parcial.porcentaje },
    { l: 3, t: 5, m: 1, mt: 2, c: false, p: 60 },
  )
  const total = avanceCertificado(['a', 'b', 'c', 'd', 'e'], modulos)
  assert.equal(total.completo, true)
  assert.equal(total.porcentaje, 100)
  assert.equal(avanceCertificado([], {}).completo, false, 'sin lecciones no hay certificado')
})
