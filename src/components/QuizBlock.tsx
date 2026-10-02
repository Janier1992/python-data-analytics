import { useState } from 'react'
import type { QuizQuestion } from '../types'
import { Boton } from './ui'

export function QuizBlock({
  preguntas,
  onFinish,
}: {
  preguntas: QuizQuestion[]
  onFinish: (score: number) => void
}) {
  const [respuestas, setRespuestas] = useState<Record<string, number>>({})
  const [enviado, setEnviado] = useState(false)

  function elegir(preguntaId: string, opcion: number) {
    if (enviado) return
    setRespuestas((r) => ({ ...r, [preguntaId]: opcion }))
  }

  function enviar() {
    const correctas = preguntas.filter((p) => respuestas[p.id] === p.respuestaCorrecta).length
    const score = Math.round((correctas / preguntas.length) * 100)
    setEnviado(true)
    onFinish(score)
  }

  const respondidas = preguntas.filter((p) => respuestas[p.id] !== undefined).length
  const todasRespondidas = respondidas === preguntas.length

  return (
    <div className="space-y-4">
      {preguntas.map((p, n) => (
        <fieldset key={p.id} className="rounded-xl border border-surface-border bg-surface-raised/40 p-4">
          <legend className="px-1 text-sm font-medium text-slate-400">
            Pregunta {n + 1} de {preguntas.length}
          </legend>
          <p id={`${p.id}-enunciado`} className="mb-3 font-medium text-slate-100">
            {p.pregunta}
          </p>
          <div role="radiogroup" aria-labelledby={`${p.id}-enunciado`} className="space-y-2">
            {p.opciones.map((op, i) => {
              const seleccionada = respuestas[p.id] === i
              const esCorrecta = i === p.respuestaCorrecta
              let estilo = 'border-surface-border hover:border-slate-500 hover:bg-surface'
              if (seleccionada && !enviado) estilo = 'border-brand-500 bg-brand-600/15'
              if (enviado && esCorrecta) estilo = 'border-emerald-500 bg-emerald-500/10'
              if (enviado && seleccionada && !esCorrecta) estilo = 'border-red-500 bg-red-500/10'
              return (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={seleccionada}
                  disabled={enviado}
                  onClick={() => elegir(p.id, i)}
                  className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left text-sm text-slate-200 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-default ${estilo}`}
                >
                  <span aria-hidden="true" className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[10px] ${seleccionada ? 'border-brand-400 bg-brand-500 text-white' : 'border-slate-500'}`}>
                    {seleccionada ? '●' : ''}
                  </span>
                  <span className="flex-1">{op}</span>
                  {enviado && esCorrecta && <span className="text-emerald-300"><span aria-hidden="true">✓</span><span className="sr-only"> Respuesta correcta</span></span>}
                  {enviado && seleccionada && !esCorrecta && <span className="text-red-300"><span aria-hidden="true">✗</span><span className="sr-only"> Tu respuesta (incorrecta)</span></span>}
                </button>
              )
            })}
          </div>
          {enviado && <p className="mt-3 rounded-lg bg-surface px-3 py-2 text-sm text-slate-300">💡 {p.explicacion}</p>}
        </fieldset>
      ))}
      {!enviado && (
        <div className="flex flex-wrap items-center gap-3">
          <Boton onClick={enviar} disabled={!todasRespondidas}>
            Comprobar respuestas
          </Boton>
          <span className="text-sm text-slate-400" aria-live="polite">
            {respondidas} de {preguntas.length} respondidas
          </span>
        </div>
      )}
    </div>
  )
}
