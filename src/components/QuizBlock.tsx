import { useState } from 'react'
import type { QuizQuestion } from '../types'

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

  const todasRespondidas = preguntas.every((p) => respuestas[p.id] !== undefined)

  return (
    <div className="space-y-4">
      {preguntas.map((p) => (
        <div key={p.id} className="rounded-lg border border-slate-700 p-3">
          <p className="mb-2 font-medium text-slate-100">{p.pregunta}</p>
          <div className="space-y-1">
            {p.opciones.map((op, i) => {
              const seleccionada = respuestas[p.id] === i
              const esCorrecta = i === p.respuestaCorrecta
              let estilo = 'border-slate-600 hover:bg-slate-800'
              if (enviado && seleccionada && esCorrecta) estilo = 'border-emerald-500 bg-emerald-500/10'
              if (enviado && seleccionada && !esCorrecta) estilo = 'border-red-500 bg-red-500/10'
              if (enviado && !seleccionada && esCorrecta) estilo = 'border-emerald-500'
              return (
                <button
                  key={i}
                  onClick={() => elegir(p.id, i)}
                  className={`block w-full rounded-md border px-3 py-2 text-left text-sm text-slate-200 ${estilo}`}
                >
                  {op}
                </button>
              )
            })}
          </div>
          {enviado && <p className="mt-2 text-sm text-slate-400">{p.explicacion}</p>}
        </div>
      ))}
      {!enviado && (
        <button
          onClick={enviar}
          disabled={!todasRespondidas}
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          Comprobar
        </button>
      )}
    </div>
  )
}
