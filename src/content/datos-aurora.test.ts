import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// El CSV descargable del curso de Power BI debe coincidir con los datos que generan las lecciones
// (src/content/modules/module43–46.ts): mismas filas y mismas cifras de control.
const texto = readFileSync(join(process.cwd(), 'public', 'datos', 'ventas-aurora.csv'), 'utf8').trim().split('\n')

test('ventas-aurora.csv: estructura y cifras de control', () => {
  assert.equal(texto[0], 'fecha,producto,categoria,region,unidades,precio_unitario')
  const filas = texto.slice(1).map((l) => l.split(','))
  assert.equal(filas.length, 480)
  assert.ok(filas.every((f) => f.length === 6 && Number(f[4]) > 0 && Number(f[5]) > 0))

  const porAnio: Record<string, number> = {}
  for (const [fecha, , , , unidades, precio] of filas) {
    const anio = fecha.slice(0, 4)
    porAnio[anio] = (porAnio[anio] ?? 0) + Number(unidades) * Number(precio)
  }
  assert.equal(porAnio['2023'], 1773060)
  assert.equal(porAnio['2024'], 2122730)
})
