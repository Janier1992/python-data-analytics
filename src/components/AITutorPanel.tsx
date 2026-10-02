import { useState } from 'react'
import Anthropic from '@anthropic-ai/sdk'
import type { Lesson } from '../types'
import { useProgressStore } from '../state/progressStore'
import { TUTOR_SYSTEM_PROMPT } from '../content/tutorSystemPrompt'

interface ChatMsg {
  role: 'user' | 'assistant'
  content: string
}

const MODELOS = [
  { id: 'claude-haiku-4-5-20251001', label: 'Haiku 4.5 (rápido y económico)' },
  { id: 'claude-sonnet-5-5', label: 'Sonnet 5.5 (más capaz)' },
]

export function AITutorPanel({ leccionContexto }: { leccionContexto: Lesson }) {
  const apiKey = useProgressStore((s) => s.anthropicApiKey)
  const setApiKey = useProgressStore((s) => s.setApiKey)
  const [inputKey, setInputKey] = useState('')
  const [modelo, setModelo] = useState(MODELOS[0].id)
  const [mensajes, setMensajes] = useState<ChatMsg[]>([])
  const [pregunta, setPregunta] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function enviar() {
    if (!apiKey || !pregunta.trim()) return
    const nuevos: ChatMsg[] = [...mensajes, { role: 'user', content: pregunta }]
    setMensajes(nuevos)
    setPregunta('')
    setCargando(true)
    setError(null)
    try {
      const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
      const contexto = `Lección actual: "${leccionContexto.titulo}" (Objetivo: ${leccionContexto.objetivo}). Conceptos clave: ${leccionContexto.conceptos.join(', ')}.`
      const respuesta = await client.messages.create({
        model: modelo,
        max_tokens: 700,
        system: `${TUTOR_SYSTEM_PROMPT}\n\n${contexto}`,
        messages: nuevos.map((m) => ({ role: m.role, content: m.content })),
      })
      const texto = respuesta.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('\n')
      setMensajes([...nuevos, { role: 'assistant', content: texto }])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ocurrió un error al contactar al tutor IA.')
    } finally {
      setCargando(false)
    }
  }

  if (!apiKey) {
    return (
      <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/50 p-4">
        <h3 className="font-semibold text-slate-100">Tutor IA (opcional)</h3>
        <p className="mt-1 text-sm text-slate-400">
          Esta función usa la API de Anthropic con <strong>tu propia API key</strong>. Se guarda solo en tu
          navegador (localStorage) y nunca se envía a ningún servidor nuestro: las llamadas van directo de tu
          navegador a Anthropic. Tú pagas tu propio consumo.
        </p>
        <div className="mt-3 flex gap-2">
          <input
            type="password"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="sk-ant-..."
            className="flex-1 rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-200"
          />
          <button
            onClick={() => setApiKey(inputKey.trim() || null)}
            disabled={!inputKey.trim()}
            className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            Guardar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-slate-100">Tutor IA</h3>
        <div className="flex items-center gap-2">
          <select
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="rounded-md border border-slate-600 bg-slate-950 px-2 py-1 text-xs text-slate-300"
          >
            {MODELOS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
          <button onClick={() => setApiKey(null)} className="text-xs text-slate-500 underline">
            Quitar API key
          </button>
        </div>
      </div>

      <div className="mb-3 max-h-80 space-y-3 overflow-y-auto">
        {mensajes.length === 0 && (
          <p className="text-sm text-slate-500">
            Pregunta algo sobre esta lección (por ejemplo: "no entiendo por qué mi código da TypeError").
          </p>
        )}
        {mensajes.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span
              className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
                m.role === 'user' ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-200'
              }`}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>

      {error && <p className="mb-2 text-sm text-red-400">{error}</p>}

      <div className="flex gap-2">
        <input
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviar()}
          placeholder="Escribe tu pregunta…"
          className="flex-1 rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-200"
        />
        <button
          onClick={enviar}
          disabled={cargando || !pregunta.trim()}
          className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {cargando ? '…' : 'Enviar'}
        </button>
      </div>
    </div>
  )
}
