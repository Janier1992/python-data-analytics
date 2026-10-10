// Carga el currículo (cursos y módulos) en Node, sin el índice generado de lecciones.
import { build } from 'esbuild'
import path from 'node:path'
import { raiz } from './cargar-modulos.mjs'

let cache = null

export async function cargarCurriculo() {
  if (cache) return cache
  const { outputFiles } = await build({
    entryPoints: [path.join(raiz, 'src/content/curriculum.ts')],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'silent',
    plugins: [
      {
        name: 'indice-vacio',
        setup(b) {
          // curriculum.ts importa el índice generado (lecciones); aquí solo interesan cursos y módulos
          b.onResolve({ filter: /\/generated$/ }, () => ({ path: 'generated-vacio', namespace: 'vacio' }))
          b.onLoad({ filter: /.*/, namespace: 'vacio' }, () => ({ contents: 'export const lessonIndex = []; export const moduleLoaders = {}', loader: 'js' }))
        },
      },
    ],
  })
  cache = await import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`)
  return cache
}

/** Números de módulo de los cursos de fundamentos sin programación (`sinProgramacion: true`). */
export async function modulosSinProgramacion() {
  const { cursos, curriculum } = await cargarCurriculo()
  const ids = new Set(cursos.filter((c) => c.sinProgramacion).map((c) => c.id))
  return new Set(curriculum.filter((m) => ids.has(m.cursoId)).map((m) => m.numero))
}
