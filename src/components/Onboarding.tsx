import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgressStore } from '../state/progressStore'
import type { DiagnosticAnswers } from '../types'

const PREGUNTAS: Array<{
  key: keyof DiagnosticAnswers
  texto: string
  opciones: { valor: string; label: string }[]
}> = [
  {
    key: 'experienciaPrevia',
    texto: '¿Cuál es tu experiencia previa programando?',
    opciones: [
      { valor: 'ninguna', label: 'Nunca he programado' },
      { valor: 'basica', label: 'Conozco conceptos básicos' },
      { valor: 'intermedia', label: 'Hago pequeños scripts' },
      { valor: 'avanzada', label: 'Ya trabajo con datos o modelos' },
    ],
  },
  {
    key: 'experienciaDatos',
    texto: '¿Qué tanta experiencia tienes analizando datos (Excel, SQL, etc.)?',
    opciones: [
      { valor: 'ninguna', label: 'Ninguna' },
      { valor: 'basica', label: 'Algo de Excel/SQL' },
      { valor: 'intermedia', label: 'Analizo datos regularmente' },
    ],
  },
  {
    key: 'tiempoDisponible',
    texto: '¿Cuánto tiempo puedes dedicar por semana?',
    opciones: [
      { valor: 'poco', label: 'Menos de 2 horas' },
      { valor: 'moderado', label: '2 a 5 horas' },
      { valor: 'alto', label: 'Más de 5 horas' },
    ],
  },
  {
    key: 'estiloPreferido',
    texto: '¿Cómo prefieres aprender?',
    opciones: [
      { valor: 'explicacion', label: 'Con explicaciones claras primero' },
      { valor: 'practica', label: 'Practicando directamente' },
      { valor: 'proyectos', label: 'Con proyectos reales desde el inicio' },
    ],
  },
]

function nivelInicialDesde(exp: string): number {
  switch (exp) {
    case 'ninguna':
      return 0
    case 'basica':
      return 1
    case 'intermedia':
      return 2
    case 'avanzada':
      return 3
    default:
      return 0
  }
}

export function Onboarding() {
  const [paso, setPaso] = useState(0)
  const [respuestas, setRespuestas] = useState<Partial<DiagnosticAnswers>>({
    objetivoPrincipal: 'Aprender analítica y ciencia de datos con Python',
  })
  const completarOnboarding = useProgressStore((s) => s.completarOnboarding)
  const navigate = useNavigate()

  const pregunta = PREGUNTAS[paso]
  const esUltima = paso === PREGUNTAS.length - 1

  function responder(valor: string) {
    const nuevas = { ...respuestas, [pregunta.key]: valor }
    setRespuestas(nuevas)
    if (esUltima) {
      const diagnostico = nuevas as DiagnosticAnswers
      completarOnboarding(diagnostico, nivelInicialDesde(diagnostico.experienciaPrevia))
      navigate('/curso', { replace: true })
    } else {
      setPaso((p) => p + 1)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6">
      <div className="mb-6 flex items-center gap-1.5">
        {PREGUNTAS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i <= paso ? 'bg-brand-500' : 'bg-surface-border'}`}
          />
        ))}
      </div>
      <p className="mb-2 text-sm font-medium text-brand-400">
        Diagnóstico inicial · {paso + 1}/{PREGUNTAS.length}
      </p>
      <h1 className="mb-6 text-2xl font-bold text-slate-100">{pregunta.texto}</h1>
      <div className="space-y-2">
        {pregunta.opciones.map((op) => (
          <button
            key={op.valor}
            onClick={() => responder(op.valor)}
            className="block w-full rounded-xl border border-surface-border bg-surface-raised px-4 py-3 text-left text-slate-200 transition hover:border-brand-500 hover:bg-surface"
          >
            {op.label}
          </button>
        ))}
      </div>
    </div>
  )
}
