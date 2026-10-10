import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import {
  cursos,
  cursosDisponibles,
  getLeccion,
  getModulo,
  leccionesDeCurso,
  modulosDeCurso,
  todasLasLecciones,
} from '../content/curriculum'
import { progresoDeCurso } from '../lib/cursos'
import { cursoCompleto } from '../lib/certificadoCurso'
import { useProgressStore } from '../state/progressStore'
import { Logo } from './ui'

/** Barra lateral: accesos principales y la lista de cursos (el curso abierto se despliega con sus módulos y lecciones). */
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { leccionId, cursoId: cursoIdRuta } = useParams()
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const algunCertificado = cursosDisponibles.some((c) => cursoCompleto(completedLessons, leccionesDeCurso(c.id)))
  const leccionActual = leccionId ? getLeccion(leccionId) : undefined
  const cursoActualId = (leccionActual && getModulo(leccionActual.moduloId)?.cursoId) ?? cursoIdRuta ?? null
  const [moduloAbierto, setModuloAbierto] = useState<string | null>(leccionActual?.moduloId ?? null)

  // El Layout no se remonta al navegar entre lecciones, así que sincronizamos
  // el módulo expandido cada vez que cambia la lección activa.
  useEffect(() => {
    if (leccionActual) setModuloAbierto(leccionActual.moduloId)
  }, [leccionActual?.moduloId])

  const progresos = useMemo(
    () => Object.fromEntries(cursos.map((c) => [c.id, progresoDeCurso(leccionesDeCurso(c.id), completedLessons, { proximamente: c.proximamente })])),
    [completedLessons],
  )

  return (
    <nav className="flex h-full flex-col bg-surface/95 backdrop-blur">
      <Link to="/curso" onClick={onNavigate} className="flex items-center gap-2 border-b border-surface-border px-5 py-4">
        <Logo />
      </Link>

      <div className="space-y-1 border-b border-surface-border px-3 py-3">
        {[
          { to: '/curso', etiqueta: 'Mi ruta de aprendizaje', icono: '🧭', fin: true },
          { to: '/referencia', etiqueta: 'Guía de referencia', icono: '📚', fin: false },
          { to: '/certificados', etiqueta: 'Mis certificados', icono: algunCertificado ? '🎓' : '🔒', fin: false },
        ].map((enlace) => (
          <NavLink
            key={enlace.to}
            to={enlace.to}
            end={enlace.fin}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                isActive ? 'bg-brand-600/20 text-brand-200' : 'text-slate-300 hover:bg-surface-raised hover:text-white'
              }`
            }
          >
            <span aria-hidden="true">{enlace.icono}</span>
            {enlace.etiqueta}
          </NavLink>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Cursos de la ruta</p>
        <ul className="space-y-1">
          {cursos.map((curso) => {
            const progreso = progresos[curso.id]
            const proximamente = progreso.estado === 'proximamente'
            const abierto = curso.id === cursoActualId && !proximamente

            if (proximamente) {
              return (
                <li key={curso.id} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-500" title="Próximamente">
                  <span aria-hidden="true" className="w-5 text-center">
                    {curso.icono}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{curso.titulo}</span>
                  <span className="shrink-0 rounded-full bg-surface-raised px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">Pronto</span>
                </li>
              )
            }

            return (
              <li key={curso.id}>
                <NavLink
                  to={`/cursos/${curso.id}`}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                      isActive || abierto ? 'bg-surface-raised text-white' : 'text-slate-200 hover:bg-surface-raised'
                    }`
                  }
                >
                  <span aria-hidden="true" className="w-5 text-center">
                    {curso.icono}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{curso.titulo}</span>
                  <span className={`shrink-0 text-xs ${progreso.estado === 'completado' ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {progreso.estado === 'completado' ? '✓' : `${progreso.porcentaje}%`}
                  </span>
                </NavLink>

                {abierto && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l border-surface-border pl-2">
                    {modulosDeCurso(curso.id).map((modulo, indice) => {
                      const lecciones = todasLasLecciones.filter((l) => l.moduloId === modulo.id)
                      const completadas = lecciones.filter((l) => completedLessons.includes(l.id)).length
                      const moduloExpandido = moduloAbierto === modulo.id
                      return (
                        <div key={modulo.id}>
                          <button
                            type="button"
                            onClick={() => setModuloAbierto(moduloExpandido ? null : modulo.id)}
                            aria-expanded={moduloExpandido}
                            className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm text-slate-300 hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                          >
                            <span className="truncate">
                              {indice + 1}. {modulo.titulo}
                            </span>
                            <span className="flex shrink-0 items-center gap-1.5 text-xs text-slate-400">
                              {completadas}/{lecciones.length}
                              <svg className={`h-3 w-3 transition-transform ${moduloExpandido ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </button>
                          {moduloExpandido && (
                            <ul className="ml-1 space-y-0.5 border-l border-surface-border pl-2">
                              {lecciones.map((l) => {
                                const activa = l.id === leccionId
                                const hecha = completedLessons.includes(l.id)
                                return (
                                  <li key={l.id}>
                                    <Link
                                      to={`/leccion/${l.id}`}
                                      onClick={onNavigate}
                                      aria-current={activa ? 'page' : undefined}
                                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                                        activa ? 'bg-brand-600/20 font-medium text-brand-300' : 'text-slate-400 hover:bg-surface-raised hover:text-slate-200'
                                      }`}
                                    >
                                      <span aria-hidden="true" className={`text-xs ${hecha ? 'text-emerald-400' : 'text-slate-500'}`}>
                                        {hecha ? '✓' : '○'}
                                      </span>
                                      <span className="sr-only">{hecha ? 'Completada: ' : 'Pendiente: '}</span>
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
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="border-t border-surface-border px-5 py-3 text-xs text-slate-400">
        {cursosDisponibles.length} de {cursos.length} cursos disponibles
      </div>
    </nav>
  )
}
