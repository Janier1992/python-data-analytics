// Pruebas unitarias de la lógica de la app (src/**/*.test.ts) con el ejecutor de pruebas de Node.
// Cada archivo se transpila con esbuild a una carpeta temporal y se ejecuta con `node --test`.
import { build } from 'esbuild'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { raiz } from './lib/cargar-modulos.mjs'

function buscarPruebas(carpeta) {
  return readdirSync(carpeta).flatMap((nombre) => {
    const ruta = path.join(carpeta, nombre)
    if (statSync(ruta).isDirectory()) return buscarPruebas(ruta)
    return nombre.endsWith('.test.ts') ? [ruta] : []
  })
}

const archivos = buscarPruebas(path.join(raiz, 'src'))
if (archivos.length === 0) {
  console.log('No hay pruebas unitarias (*.test.ts).')
  process.exit(0)
}

const salida = mkdtempSync(path.join(tmpdir(), 'curso-unit-'))
try {
  const compilados = []
  for (const archivo of archivos) {
    const destino = path.join(salida, `${path.relative(path.join(raiz, 'src'), archivo).replace(/[\\/]/g, '__')}.mjs`)
    await build({
      entryPoints: [archivo],
      outfile: destino,
      bundle: true,
      format: 'esm',
      platform: 'node',
      target: 'node20',
      logLevel: 'silent',
      external: ['node:*'],
    })
    compilados.push(destino)
  }
  const r = spawnSync(process.execPath, ['--test', ...compilados], { stdio: 'inherit' })
  process.exitCode = r.status ?? 1
} finally {
  rmSync(salida, { recursive: true, force: true })
}
