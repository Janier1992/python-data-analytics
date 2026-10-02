// Utilidades compartidas por los scripts: carga el contenido de las lecciones (TypeScript) en Node.
import { build } from 'esbuild'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
export const carpetaModulos = path.join(raiz, 'src/content/modules')

/** Números de módulo disponibles (moduleN.ts), ordenados. */
export function listarModulos() {
  return readdirSync(carpetaModulos)
    .map((f) => /^module(\d+)\.ts$/.exec(f))
    .filter(Boolean)
    .map((m) => Number(m[1]))
    .sort((a, b) => a - b)
}

/** Transpila y carga moduleN.ts (solo importa tipos, así que no necesita más dependencias). */
export async function cargarLecciones(n) {
  const { outputFiles } = await build({
    entryPoints: [path.join(carpetaModulos, `module${n}.ts`)],
    bundle: true,
    format: 'esm',
    write: false,
    logLevel: 'silent',
  })
  const codigo = Buffer.from(outputFiles[0].text).toString('base64')
  const modulo = await import(`data:text/javascript;base64,${codigo}`)
  const lecciones = modulo[`module${n}Lessons`]
  if (!Array.isArray(lecciones)) throw new Error(`module${n}.ts debe exportar module${n}Lessons`)
  return lecciones
}
