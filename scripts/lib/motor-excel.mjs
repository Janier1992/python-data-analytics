// Carga el motor de fórmulas de Excel (TypeScript) en Node para probar el contenido de las lecciones.
import { build } from 'esbuild'
import path from 'node:path'
import { raiz } from './cargar-modulos.mjs'

let cache = null

export async function cargarMotorExcel() {
  if (cache) return cache
  const { outputFiles } = await build({
    entryPoints: [path.join(raiz, 'src/excel/index.ts')],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'silent',
  })
  const codigo = Buffer.from(outputFiles[0].text).toString('base64')
  cache = await import(`data:text/javascript;base64,${codigo}`)
  return cache
}
