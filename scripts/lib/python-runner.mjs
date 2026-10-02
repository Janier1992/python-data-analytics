// Ejecuta fragmentos de Python con un intérprete real, en una carpeta temporal aislada.
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

export const PYTHON = process.env.PYTHON || 'python3'
const TIEMPO_MAX_MS = 120_000

// pandas 2.2 avisa en cada import de que pyarrow será obligatorio en pandas 3; no es del contenido del curso.
const RUIDO_PYARROW = /^.*DeprecationWarning:\s*\nPyarrow will become[\s\S]*?issues\/54466\s*\n/gm
// matplotlib 3.8 + pyparsing reciente avisan de un estilo interno de matplotlib; tampoco es del curso.
const RUIDO_MPLSTYLE = /^In .*\.mplstyle: 'parseString' deprecated.*\n/gm

/** Ejecuta código Python y devuelve { codigo, stdout, stderr }. */
export function ejecutarPython(codigo) {
  return new Promise((resolve) => {
    const cwd = mkdtempSync(path.join(tmpdir(), 'curso-test-'))
    const hijo = spawn(PYTHON, ['-c', codigo], {
      cwd,
      env: { ...process.env, MPLBACKEND: 'Agg', PYTHONIOENCODING: 'utf-8', PYTHONWARNINGS: 'default' },
      stdio: ['pipe', 'pipe', 'pipe'],
    })
    let stdout = ''
    let stderr = ''
    let terminado = false
    const temporizador = setTimeout(() => hijo.kill('SIGKILL'), TIEMPO_MAX_MS)
    const terminar = (resultado) => {
      if (terminado) return
      terminado = true
      clearTimeout(temporizador)
      rmSync(cwd, { recursive: true, force: true })
      resolve({ ...resultado, stdout, stderr: stderr.replace(RUIDO_PYARROW, '').replace(RUIDO_MPLSTYLE, '') })
    }
    hijo.stdout.on('data', (d) => (stdout += d))
    hijo.stderr.on('data', (d) => (stderr += d))
    hijo.stdin.end() // sin entrada: input() falla en vez de colgarse
    hijo.on('close', (codigoSalida, senal) => terminar({ codigo: senal ? `señal ${senal} (¿tiempo excedido?)` : codigoSalida }))
    hijo.on('error', (e) => {
      stderr += `\n${e.message}`
      terminar({ codigo: -1 })
    })
  })
}

/** Ejecuta tareas con un máximo de `limite` en paralelo, conservando el orden de resultados. */
export async function conConcurrencia(items, limite, trabajo) {
  const resultados = new Array(items.length)
  let siguiente = 0
  await Promise.all(
    Array.from({ length: Math.min(limite, items.length) }, async () => {
      while (siguiente < items.length) {
        const i = siguiente++
        resultados[i] = await trabajo(items[i])
      }
    }),
  )
  return resultados
}

export const ultimasLineas = (texto, n = 6) => texto.trim().split('\n').slice(-n).join('\n')
