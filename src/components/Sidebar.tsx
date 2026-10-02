import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { curriculum, getLeccion, modulosPorTrack, todasLasLecciones, tracks } from '../content/curriculum'
import { useProgressStore } from '../state/progressStore'
import { Logo } from './ui'

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { leccionId } = useParams()
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const leccionActual = leccionId ? getLeccion(leccionId) : undefined
  const [moduloAbierto, setModuloAbierto] = useState<string | null>(leccionActual?.moduloId ?? null)

  // El Layout no se remonta al navegar entre lecciones, así que sincronizamos
  // el módulo expandido cada vez que cambia la lección activa.
  useEffect(() => {
    if (leccionActual) setModuloAbierto(leccionActual.moduloId)
  }, [leccionActual?.moduloId])

  return (
    <nav className="flex h-full flex-col bg-surface/95 backdrop-blur">
      <Link to="/curso" onClick={onNavigate} className="flex items-center gap-2 border-b border-surface-border px-5 py-4">
        <Logo />
      </Link>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {tracks.map((track) => (
          <div key={track.id} className="mb-5">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Ruta {track.orden} · {track.titulo}
            </p>
            <div className="space-y-1">
              {modulosPorTrack(track.id).map((modulo) => {
                const lecciones = todasLasLecciones.filter((l) => l.moduloId === modulo.id)
                const completadas = lecciones.filter((l) => completedLessons.includes(l.id)).length
                const abierto = moduloAbierto === modulo.id

                if (!modulo.disponible) {
                  return (
                    <div key={modulo.id} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-600">
                      <span className="text-xs">🔒</span>
                      <span className="truncate">
                        {modulo.numero}. {modulo.titulo}
                      </span>
                    </div>
                  )
                }

                return (
                  <div key={modulo.id}>
                    <button
                      onClick={() => setModuloAbierto(abierto ? null : modulo.id)}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm font-medium text-slate-200 hover:bg-surface-raised"
                    >
                      <span className="truncate">
                        {modulo.numero}. {modulo.titulo}
                      </span>
                      <span className="ml-2 flex shrink-0 items-center gap-1.5 text-xs text-slate-500">
                        {completadas}/{lecciones.length}
                        <svg
                          className={`h-3 w-3 transition-transform ${abierto ? 'rotate-90' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                    {abierto && (
                      <ul className="ml-2 mt-1 space-y-0.5 border-l border-surface-border pl-3">
                        {lecciones.map((l) => {
                          const activa = l.id === leccionId
                          const hecha = completedLessons.includes(l.id)
                          return (
                            <li key={l.id}>
                              <Link
                                to={`/leccion/${l.id}`}
                                onClick={onNavigate}
                                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition ${
                                  activa
                                    ? 'bg-brand-600/20 font-medium text-brand-300'
                                    : 'text-slate-400 hover:bg-surface-raised hover:text-slate-200'
                                }`}
                              >
                                <span className={`text-xs ${hecha ? 'text-emerald-400' : 'text-slate-600'}`}>
                                  {hecha ? '✓' : '○'}
                                </span>
                                <span className="truncate">{l.titulo}</span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-surface-border px-5 py-3 text-xs text-slate-500">
        {curriculum.filter((m) => m.disponible).length} de {curriculum.length} módulos disponibles
      </div>
    </nav>
  )
}
