import { useState } from 'react'
import type { Exercise } from '../types'
import { usePyodide } from '../pyodide/usePyodide'
import { CodeEditor } from './CodeEditor'
import { Console } from './Console'
import type { RunResult } from '../pyodide/usePyodide'
import { useProgressStore } from '../state/progressStore'
import { Boton } from './ui'
import { BotonCopiar } from './referencia/BotonCopiar'

interface Props {
  exercise: Exercise
  lessonId: string
  titulo: string
}

export function ExerciseBlock({ exercise, lessonId, titulo }: Props) {
  const { listo, estado, errorCarga, reintentar, ejecutando, ejecutar } = usePyodide()
  const [codigo, setCodigo] = useState(exercise.codigoInicial)
  const [resultado, setResultado] = useState<RunResult | null>(null)
  const [feedback, setFeedback] = useState<{ ok: boolean; mensaje: string } | null>(null)
  const [pistasVisibles, setPistasVisibles] = useState(0)
  const [mostrarSolucion, setMostrarSolucion] = useState(false)
  const registrarIntento = useProgressStore((s) => s.registrarIntentoEjercicio)

  async function handleRun() {
    if (!listo || ejecutando) return
    const res = await ejecutar(codigo)
    setResultado(res)
    let correcto = false
    if (res.error) {
      setFeedback({ ok: false, mensaje: 'Tu código produjo un error. Revisa el mensaje antes de volver a intentarlo.' })
    } else {
      const validacion = exercise.validar(res.stdout)
      correcto = validacion.ok
      setFeedback(validacion)
    }
    registrarIntento({ exerciseId: exercise.id, lessonId, timestamp: Date.now(), correcto })
  }

  const modificado = codigo !== exercise.codigoInicial

  return (
    <div className="space-y-3 rounded-xl border border-surface-border bg-surface-raised/50 p-4">
      <h3 className="font-semibold text-slate-100">{titulo}</h3>
      <p className="text-slate-300">{exercise.enunciado}</p>

      {!listo && !errorCarga && (
        <p className="text-sm text-amber-300" role="status">
          {estado || 'Preparando Python…'}
        </p>
      )}
      {errorCarga && (
        <div role="alert" className="flex flex-wrap items-center gap-3 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
          <span className="min-w-0 flex-1">{errorCarga}</span>
          <button
            onClick={reintentar}
            className="shrink-0 rounded-md border border-red-400/60 px-3 py-1.5 font-medium text-red-200 hover:bg-red-500/20"
          >
            Reintentar
          </button>
        </div>
      )}

      <CodeEditor value={codigo} onChange={setCodigo} onRun={handleRun} ariaLabel={`Editor de código: ${titulo}`} />

      <div className="flex flex-wrap items-center gap-2">
        <Boton onClick={handleRun} disabled={!listo} cargando={ejecutando} className="!px-4">
          {ejecutando ? 'Ejecutando…' : '▶ Ejecutar código'}
        </Boton>
        {exercise.pistas.length > 0 && pistasVisibles < exercise.pistas.length && (
          <Boton variante="secundario" onClick={() => setPistasVisibles((n) => n + 1)}>
            💡 Pedir pista ({pistasVisibles}/{exercise.pistas.length})
          </Boton>
        )}
        <Boton variante="secundario" onClick={() => setMostrarSolucion((v) => !v)} aria-expanded={mostrarSolucion}>
          {mostrarSolucion ? 'Ocultar solución' : 'Ver solución'}
        </Boton>
        <Boton
          variante="fantasma"
          disabled={!modificado}
          onClick={() => {
            setCodigo(exercise.codigoInicial)
            setResultado(null)
            setFeedback(null)
          }}
        >
          Restablecer
        </Boton>
        <span className="hidden text-xs text-slate-400 md:inline">Ctrl + Enter para ejecutar</span>
      </div>

      <Console result={resultado} />

      {feedback && (
        <p
          role="status"
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${
            feedback.ok ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/40 bg-amber-500/10 text-amber-300'
          }`}
        >
          {feedback.ok ? '✅ ' : '⚠️ '}
          {feedback.mensaje}
        </p>
      )}

      {pistasVisibles > 0 && (
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
          {exercise.pistas.slice(0, pistasVisibles).map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}

      {mostrarSolucion && (
        <div className="relative">
          <pre className="overflow-x-auto rounded-lg border border-surface-border bg-surface p-3 pr-24 font-mono text-sm text-slate-300">{exercise.solucion}</pre>
          <div className="absolute right-2 top-2">
            <BotonCopiar texto={exercise.solucion} />
          </div>
        </div>
      )}
    </div>
  )
}
