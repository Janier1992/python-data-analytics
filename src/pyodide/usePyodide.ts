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
  sqlite3: 'sqlite3', // módulo de la biblioteca estándar, no incluido por defecto en Pyodide
}

async function asegurarPaquetes(py: PyodideInterface, codigo: string, onStatus: (msg: string) => void) {
  const faltantes = Object.entries(PAQUETES_BAJO_DEMANDA)
    .filter(([importName]) => new RegExp(`\\b(import|from)\\s+${importName}\\b`).test(codigo))
    .map(([, paqueteName]) => paqueteName)
    .filter((paquete) => !paquetesCargados.has(paquete))

  if (faltantes.length > 0) {
    onStatus(`Cargando ${faltantes.join(', ')}…`)
    try {
      await py.loadPackage(faltantes)
    } catch {
      throw new Error(
        `No se pudo descargar el paquete de Python necesario (${faltantes.join(', ')}). Revisa tu conexión y vuelve a ejecutar el código.`,
      )
    } finally {
      onStatus('')
    }
    faltantes.forEach((p) => paquetesCargados.add(p))
  }
}

const PYODIDE_URL_BASE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
const TIEMPO_MAX_CARGA_MS = 180_000

/** Error con un mensaje listo para mostrarse al estudiante. */
class ErrorPyodide extends Error {}

const MSG_SIN_CDN =
  'No se pudo descargar el intérprete de Python (Pyodide). Revisa tu conexión a internet o si un bloqueador de contenido o un firewall impide el acceso a cdn.jsdelivr.net, y vuelve a intentarlo.'

// Pyodide no se incluye en index.html (bloquearía el primer render): se descarga solo cuando
// un ejercicio lo necesita. Si el script falla, se puede reintentar.
function cargarScriptPyodide(): Promise<void> {
  if (typeof window.loadPyodide === 'function') return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `${PYODIDE_URL_BASE}pyodide.js`
    script.async = true
    script.onload = () =>
      typeof window.loadPyodide === 'function' ? resolve() : reject(new ErrorPyodide(MSG_SIN_CDN))
    script.onerror = () => {
      script.remove() // permite volver a insertar el script en el reintento
      reject(new ErrorPyodide(MSG_SIN_CDN))
    }
    document.head.appendChild(script)
  })
}

function conTiempoMaximo<T>(promesa: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const temporizador = setTimeout(
      () => reject(new ErrorPyodide('La carga del intérprete de Python tardó demasiado. Revisa tu conexión y vuelve a intentarlo.')),
      ms,
    )
    promesa.then(
      (v) => {
        clearTimeout(temporizador)
        resolve(v)
      },
      (e) => {
        clearTimeout(temporizador)
        reject(e)
      },
    )
  })
}

async function inicializarPyodide(onStatus: (msg: string) => void): Promise<PyodideInterface> {
  onStatus('Cargando el intérprete de Python (Pyodide)…')
  await cargarScriptPyodide()
  const pyodide = await window.loadPyodide({ indexURL: PYODIDE_URL_BASE })
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
}

// El mensaje de progreso de la carga se difunde a todos los ejercicios abiertos.
let estadoCarga = ''
const suscriptoresEstado = new Set<(msg: string) => void>()

function publicarEstado(msg: string) {
  estadoCarga = msg
  suscriptoresEstado.forEach((notificar) => notificar(msg))
}

function getPyodide(): Promise<PyodideInterface> {
  if (!pyodideSingleton) {
    const carga = conTiempoMaximo(inicializarPyodide(publicarEstado), TIEMPO_MAX_CARGA_MS)
    pyodideSingleton = carga
    // Si falla, se descarta para que un reintento vuelva a empezar desde cero
    carga.catch(() => {
      if (pyodideSingleton === carga) pyodideSingleton = null
    })
  }
  return pyodideSingleton
}

// Varios ejercicios comparten el mismo intérprete: un reintento desde uno actualiza a todos.
const suscriptoresReintento = new Set<() => void>()

function reiniciarCarga() {
  pyodideSingleton = null
  estadoCarga = ''
  suscriptoresReintento.forEach((notificar) => notificar())
}

function mensajeDeError(e: unknown): string {
  if (e instanceof ErrorPyodide) return e.message
  return 'No se pudo iniciar el intérprete de Python. Vuelve a intentarlo; si el problema continúa, recarga la página.'
}

export function usePyodide() {
  const [listo, setListo] = useState(false)
  const [estado, setEstado] = useState('Iniciando…')
  const [errorCarga, setErrorCarga] = useState<string | null>(null)
  const [ejecutando, setEjecutando] = useState(false)
  const [intento, setIntento] = useState(0)
  const pyodideRef = useRef<PyodideInterface | null>(null)

  useEffect(() => {
    const notificar = () => setIntento((n) => n + 1)
    suscriptoresReintento.add(notificar)
    suscriptoresEstado.add(setEstado)
    return () => {
      suscriptoresReintento.delete(notificar)
      suscriptoresEstado.delete(setEstado)
    }
  }, [])

  useEffect(() => {
    let activo = true
    setErrorCarga(null)
    setEstado(estadoCarga || 'Iniciando…')
    getPyodide().then(
      (py) => {
        if (!activo) return
        pyodideRef.current = py
        setListo(true)
      },
      (e) => {
        if (!activo) return
        pyodideRef.current = null
        setListo(false)
        setEstado('')
        setErrorCarga(mensajeDeError(e))
      },
    )
    return () => {
      activo = false
    }
  }, [intento])

  const reintentar = useCallback(() => reiniciarCarga(), [])

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

  return { listo, estado, errorCarga, reintentar, ejecutando, ejecutar }
}
