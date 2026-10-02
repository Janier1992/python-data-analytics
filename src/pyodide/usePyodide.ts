import { useCallback, useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    loadPyodide: (opts?: Record<string, unknown>) => Promise<PyodideInterface>
  }
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>
  loadPackage: (names: string | string[]) => Promise<void>
  globals: { get: (name: string) => unknown }
  setStdout: (opts: { batched: (text: string) => void }) => void
  setStderr: (opts: { batched: (text: string) => void }) => void
}

export interface RunResult {
  stdout: string
  stderr: string
  error: string | null
  figures: string[] // data URLs de figuras matplotlib generadas
}

let pyodideSingleton: Promise<PyodideInterface> | null = null
const paquetesCargados = new Set(['numpy', 'pandas', 'matplotlib'])

// Paquetes pesados que solo se cargan si el código del ejercicio los importa,
// para no penalizar el tiempo de carga de lecciones que no los necesitan.
const PAQUETES_BAJO_DEMANDA: Record<string, string> = {
  scipy: 'scipy',
  statsmodels: 'statsmodels',
  sklearn: 'scikit-learn',
}

async function asegurarPaquetes(py: PyodideInterface, codigo: string, onStatus: (msg: string) => void) {
  const faltantes = Object.entries(PAQUETES_BAJO_DEMANDA)
    .filter(([importName]) => new RegExp(`\\b(import|from)\\s+${importName}\\b`).test(codigo))
    .map(([, paqueteName]) => paqueteName)
    .filter((paquete) => !paquetesCargados.has(paquete))

  if (faltantes.length > 0) {
    onStatus(`Cargando ${faltantes.join(', ')}…`)
    await py.loadPackage(faltantes)
    faltantes.forEach((p) => paquetesCargados.add(p))
    onStatus('')
  }
}

function getPyodide(onStatus: (msg: string) => void): Promise<PyodideInterface> {
  if (!pyodideSingleton) {
    pyodideSingleton = (async () => {
      onStatus('Cargando el intérprete de Python (Pyodide)…')
      const pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
      })
      onStatus('Cargando numpy, pandas y matplotlib…')
      await pyodide.loadPackage(['numpy', 'pandas', 'matplotlib'])
      // Configura matplotlib en modo Agg y helper para capturar figuras como PNG base64
      await pyodide.runPythonAsync(`
import matplotlib
matplotlib.use("AGG")
import matplotlib.pyplot as plt
import base64, io, json

def _capturar_figuras():
    figs = []
    for num in plt.get_fignums():
        fig = plt.figure(num)
        buf = io.BytesIO()
        fig.savefig(buf, format="png", bbox_inches="tight")
        buf.seek(0)
        figs.append(base64.b64encode(buf.read()).decode("ascii"))
    plt.close("all")
    return json.dumps(figs)
`)
      onStatus('')
      return pyodide
    })()
  }
  return pyodideSingleton
}

export function usePyodide() {
  const [listo, setListo] = useState(false)
  const [estado, setEstado] = useState('Iniciando…')
  const [ejecutando, setEjecutando] = useState(false)
  const pyodideRef = useRef<PyodideInterface | null>(null)

  useEffect(() => {
    let activo = true
    getPyodide(setEstado).then((py) => {
      if (!activo) return
      pyodideRef.current = py
      setListo(true)
    })
    return () => {
      activo = false
    }
  }, [])

  const ejecutar = useCallback(async (codigo: string): Promise<RunResult> => {
    const py = pyodideRef.current
    if (!py) {
      return { stdout: '', stderr: '', error: 'El intérprete de Python todavía no está listo.', figures: [] }
    }
    setEjecutando(true)
    let stdout = ''
    let stderr = ''
    py.setStdout({ batched: (text: string) => (stdout += text + '\n') })
    py.setStderr({ batched: (text: string) => (stderr += text + '\n') })
    let error: string | null = null
    let figures: string[] = []
    try {
      await asegurarPaquetes(py, codigo, setEstado)
      await py.runPythonAsync(codigo)
      const figsRaw = await py.runPythonAsync('_capturar_figuras()')
      figures = figsRaw ? (JSON.parse(figsRaw as string) as string[]) : []
    } catch (e) {
      error = e instanceof Error ? e.message : String(e)
    } finally {
      setEjecutando(false)
    }
    return { stdout, stderr, error, figures }
  }, [])

  return { listo, estado, ejecutando, ejecutar }
}
