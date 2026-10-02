import { useState } from 'react'
import type { Exercise } from '../types'
import { usePyodide } from '../pyodide/usePyodide'
import { CodeEditor } from './CodeEditor'
import { Console } from './Console'
import type { RunResult } from '../pyodide/usePyodide'
import { useProgressStore } from '../state/progressStore'

interface Props {
  exercise: Exercise
  lessonId: string
  titulo: string
}

export function ExerciseBlock({ exercise, lessonId, titulo }: Props) {
  const { listo, estado, ejecutando, ejecutar } = usePyodide()
  const [codigo, setCodigo] = useState(exercise.codigoInicial)
  const [resultado, setResultado] = useState<RunResult | null>(null)
  const [feedback, setFeedback] = useState<{ ok: boolean; mensaje: string } | null>(null)
  const [pistasVisibles, setPistasVisibles] = useState(0)
  const [mostrarSolucion, setMostrarSolucion] = useState(false)
  const registrarIntento = useProgressStore((s) => s.registrarIntentoEjercicio)

  async function handleRun() {
    const res = await ejecutar(codigo)
    setResultado(res)
    if (res.error) {
      setFeedback({ ok: false, mensaje: 'Tu código produjo un error. Revisa el mensaje antes de volver a intentarlo.' })
    } else {
      const validacion = exercise.validar(res.stdout)
      setFeedback(validacion)
    }
    registrarIntento({
      exerciseId: exercise.id,
      lessonId,
      timestamp: Date.now(),
      correcto: !res.error && exercise.validar(res.stdout).ok,
    })
  }

  return (
    <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900/40 p-4">
      <h4 className="font-semibold text-slate-100">{titulo}</h4>
      <p className="text-slate-300">{exercise.enunciado}</p>

      {!listo && <p className="text-sm text-amber-400">{estado}</p>}

      <CodeEditor value={codigo} onChange={setCodigo} />

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleRun}
          disabled={!listo || ejecutando}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {ejecutando ? 'Ejecutando…' : 'Ejecutar código'}
        </button>
        {exercise.pistas.length > 0 && pistasVisibles < exercise.pistas.length && (
          <button
            onClick={() => setPistasVisibles((n) => n + 1)}
            className="rounded-md border border-slate-600 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Pedir pista ({pistasVisibles}/{exercise.pistas.length})
          </button>
        )}
        <button
          onClick={() => setMostrarSolucion((v) => !v)}
          className="rounded-md border border-slate-600 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          {mostrarSolucion ? 'Ocultar solución' : 'Ver solución'}
        </button>
      </div>

      <Console result={resultado} />

      {feedback && (
        <p className={feedback.ok ? 'text-sm font-medium text-emerald-400' : 'text-sm font-medium text-amber-400'}>
          {feedback.ok ? '✅ ' : '⚠️ '}
          {feedback.mensaje}
        </p>
      )}

      {pistasVisibles > 0 && (
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-400">
          {exercise.pistas.slice(0, pistasVisibles).map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}

      {mostrarSolucion && (
        <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 text-sm text-slate-300">
          {exercise.solucion}
        </pre>
      )}
    </div>
  )
}
