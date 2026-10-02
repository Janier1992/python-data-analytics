// Genera src/content/generated.ts a partir de src/content/modules/module*.ts:
//   - lessonIndex: id, moduloId y título de cada lección (ligero, se carga con la app).
//   - moduleLoaders: importaciones dinámicas por módulo (cada módulo es su propio chunk).
// Así el contenido pesado de las lecciones solo se descarga cuando el estudiante abre ese módulo.
//
// Uso:  node scripts/generate-lesson-index.mjs          (reescribe el archivo)
//       node scripts/generate-lesson-index.mjs --check  (falla si está desactualizado)
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { cargarLecciones, listarModulos, raiz } from './lib/cargar-modulos.mjs'

const salida = path.join(raiz, 'src/content/generated.ts')
const soloComprobar = process.argv.includes('--check')

const numeros = listarModulos()

const indice = []
for (const n of numeros) {
  const lecciones = await cargarLecciones(n)
  for (const l of lecciones) {
    if (l.moduloId !== `modulo-${n}`) throw new Error(`${l.id}: moduloId "${l.moduloId}" no coincide con modulo-${n}`)
    indice.push({ id: l.id, moduloId: l.moduloId, titulo: l.titulo })
  }
}

const ids = indice.map((l) => l.id)
const repetidos = ids.filter((id, i) => ids.indexOf(id) !== i)
if (repetidos.length) throw new Error(`Ids de lección repetidos: ${[...new Set(repetidos)].join(', ')}`)

const lineasIndice = indice.map(
  (l) => `  { id: ${JSON.stringify(l.id)}, moduloId: ${JSON.stringify(l.moduloId)}, titulo: ${JSON.stringify(l.titulo)} },`,
)
const lineasCargadores = numeros.map(
  (n) => `  'modulo-${n}': () => import('./modules/module${n}').then((m) => m.module${n}Lessons),`,
)

const contenido = `// ARCHIVO GENERADO por scripts/generate-lesson-index.mjs — no editar a mano.
// Se regenera con "npm run content:index" (y automáticamente en "npm run dev" y "npm run build").
import type { Lesson, LessonSummary } from '../types'

export const lessonIndex: LessonSummary[] = [
${lineasIndice.join('\n')}
]

export const moduleLoaders: Record<string, () => Promise<Lesson[]>> = {
${lineasCargadores.join('\n')}
}
`

if (soloComprobar) {
  const actual = existsSync(salida) ? readFileSync(salida, 'utf8') : ''
  if (actual !== contenido) {
    console.error('src/content/generated.ts está desactualizado. Ejecuta: npm run content:index')
    process.exit(1)
  }
  console.log(`generated.ts al día (${indice.length} lecciones, ${numeros.length} módulos)`)
} else {
  writeFileSync(salida, contenido)
  console.log(`generated.ts escrito: ${indice.length} lecciones en ${numeros.length} módulos`)
}
