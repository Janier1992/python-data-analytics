import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lessonIndex } from '../content/generated'
import { cargarTodasLasColecciones } from '../content/reference'
import type { ColeccionRef, EntradaRef } from '../content/reference'
import { buscar, normalizar, palabrasDe } from '../lib/busqueda'

type Opcion = { id: string; grupo: string; titulo: string; detalle?: string; icono: string; mono?: boolean; destino: string }

const PAGINAS: Opcion[] = [
  { id: 'pag-ruta', grupo: 'Páginas', titulo: 'Mi ruta de aprendizaje', icono: '🧭', destino: '/curso' },
  { id: 'pag-ref', grupo: 'Páginas', titulo: 'Guía de referencia', detalle: 'Funciones, métodos y sentencias de Python y SQL', icono: '📚', destino: '/referencia' },
  { id: 'pag-cert', grupo: 'Páginas', titulo: 'Mi certificado', icono: '🎓', destino: '/certificado' },
]

/**
 * Búsqueda global (Ctrl/⌘ + K): lecciones, entradas de la guía de referencia y páginas.
 * Patrón combobox/listbox: ↑ ↓ para moverse, Enter para abrir, Esc para cerrar.
 */
export function PaletaBusqueda({ abierta, onCerrar }: { abierta: boolean; onCerrar: () => void }) {
  const navigate = useNavigate()
  const [consulta, setConsulta] = useState('')
  const [activa, setActiva] = useState(0)
  const [colecciones, setColecciones] = useState<ColeccionRef[] | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listaId = useId()

  useEffect(() => {
    if (!abierta) return
    setConsulta('')
    setActiva(0)
    const previo = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    // La guía se descarga la primera vez que se abre la búsqueda
    if (!colecciones) cargarTodasLasColecciones().then(setColecciones, () => setColecciones([]))
    return () => previo?.focus?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierta])

  const entradas = useMemo(() => (colecciones ?? []).flatMap((c) => c.entradas.map((e) => ({ ...e, __c: c.id, __i: c.icono }))), [colecciones])

  const opciones: Opcion[] = useMemo(() => {
    const palabras = palabrasDe(consulta)
    if (palabras.length === 0) {
      return PAGINAS
    }
    const paginas = PAGINAS.filter((p) => palabras.every((w) => normalizar(`${p.titulo} ${p.detalle ?? ''}`).includes(w)))
    const lecciones: Opcion[] = lessonIndex
      .filter((l) => palabras.every((w) => normalizar(l.titulo).includes(w)))
      .slice(0, 6)
      .map((l) => ({ id: `lec-${l.id}`, grupo: 'Lecciones', titulo: l.titulo, detalle: `Módulo ${l.moduloId.replace('modulo-', '')}`, icono: '📘', destino: `/leccion/${l.id}` }))
    const referencia: Opcion[] = buscar<EntradaRef & { __c: string; __i: string }>(entradas, consulta)
      .slice(0, 8)
      .map(({ entrada }) => ({ id: `ref-${entrada.id}`, grupo: 'Guía de referencia', titulo: entrada.nombre, detalle: entrada.resumen, icono: entrada.__i, mono: true, destino: `/referencia/${entrada.__c}#${entrada.id}` }))
    return [...paginas, ...lecciones, ...referencia]
  }, [consulta, entradas])

  useEffect(() => setActiva(0), [consulta])
  useEffect(() => {
    document.getElementById(`${listaId}-${activa}`)?.scrollIntoView({ block: 'nearest' })
  }, [activa, listaId])

  if (!abierta) return null

  function ir(opcion: Opcion) {
    onCerrar()
    navigate(opcion.destino)
  }

  function alTeclear(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      onCerrar()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiva((a) => Math.min(a + 1, opciones.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiva((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && opciones[activa]) {
      e.preventDefault()
      ir(opciones[activa])
    }
  }

  const cargandoGuia = colecciones === null && palabrasDe(consulta).length > 0
  let grupoAnterior = ''

  return (
    <div className="fixed inset-0 z-50 grid place-items-start justify-items-center p-4 pt-[10vh]" onKeyDown={alTeclear}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCerrar} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-label="Buscar en el curso" className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-surface-border bg-surface-raised shadow-2xl">
        <div className="flex items-center gap-3 border-b border-surface-border px-4">
          <svg className="h-5 w-5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            role="combobox"
            aria-expanded="true"
            aria-controls={listaId}
            aria-activedescendant={opciones[activa] ? `${listaId}-${activa}` : undefined}
            aria-autocomplete="list"
            placeholder="Busca una lección, función o comando…"
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent py-4 text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden rounded border border-surface-border px-1.5 py-0.5 text-xs text-slate-400 sm:block">Esc</kbd>
        </div>

        <ul id={listaId} role="listbox" aria-label="Resultados" className="max-h-[55vh] overflow-y-auto p-2">
          {opciones.map((o, i) => {
            const nuevoGrupo = o.grupo !== grupoAnterior
            grupoAnterior = o.grupo
            return (
              <li key={o.id} role="presentation">
                {nuevoGrupo && <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{o.grupo}</p>}
                <div
                  id={`${listaId}-${i}`}
                  role="option"
                  aria-selected={i === activa}
                  onMouseMove={() => setActiva(i)}
                  onClick={() => ir(o)}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2 ${i === activa ? 'bg-brand-600/25' : ''}`}
                >
                  <span aria-hidden="true" className="mt-0.5">{o.icono}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-sm ${o.mono ? 'font-mono text-brand-300' : 'text-slate-100'}`}>{o.titulo}</span>
                    {o.detalle && <span className="block truncate text-xs text-slate-400">{o.detalle}</span>}
                  </span>
                  {i === activa && <span aria-hidden="true" className="mt-0.5 text-xs text-slate-400">↵</span>}
                </div>
              </li>
            )
          })}
          {opciones.length === 0 && !cargandoGuia && <li className="px-3 py-6 text-center text-sm text-slate-400">Sin resultados para «{consulta}».</li>}
          {cargandoGuia && opciones.length === 0 && <li className="px-3 py-6 text-center text-sm text-slate-400">Buscando…</li>}
        </ul>

        <p className="border-t border-surface-border px-4 py-2 text-xs text-slate-400">↑ ↓ para moverte · ↵ para abrir · Esc para cerrar</p>
      </div>
    </div>
  )
}
