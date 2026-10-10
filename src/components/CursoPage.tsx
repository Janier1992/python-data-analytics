import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { cursos, getCurso, leccionesDeCurso, modulosDeCurso, siguienteCurso, todasLasLecciones } from '../content/curriculum'
import { horasEstimadas, progresoDeCurso } from '../lib/cursos'
import { estadoDeModulo } from '../lib/progreso'
import { useProgressStore } from '../state/progressStore'
import { InsigniaNivel } from './CursoCard'
import { BarraProgreso, Tarjeta } from './ui'

const CHIP_MODULO = {
  completado: { texto: '✓ Completado', clase: 'bg-emerald-500/15 text-emerald-300' },
  'en-curso': { texto: 'En curso', clase: 'bg-brand-600/20 text-brand-200' },
  'sin-empezar': { texto: 'Sin empezar', clase: 'bg-surface text-slate-400' },
} as const

/** Página de un curso: de qué trata, qué aprenderás, su contenido por módulos y cómo continúa la ruta. */
export function CursoPage() {
  const { cursoId } = useParams()
  const curso = cursoId ? getCurso(cursoId) : undefined
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const ultimaLeccionId = useProgressStore((s) => s.ultimaLeccionId)

  const modulos = useMemo(() => (curso ? modulosDeCurso(curso.id) : []), [curso])
  const progreso = useMemo(
    () => (curso ? progresoDeCurso(leccionesDeCurso(curso.id), completedLessons, { proximamente: curso.proximamente, ultimaLeccionId }) : null),
    [curso, completedLessons, ultimaLeccionId],
  )
  const hechas = useMemo(() => new Set(completedLessons), [completedLessons])

  if (!curso || !progreso) return <Navigate to="/curso" replace />

  const proximamente = progreso.estado === 'proximamente'
  const siguiente = siguienteCurso(curso.id)
  const siguienteLeccion = progreso.siguienteId ? todasLasLecciones.find((l) => l.id === progreso.siguienteId) : undefined
  const etiquetaAccion = progreso.estado === 'completado' ? 'Repasar el curso' : progreso.estado === 'en-curso' ? 'Continuar el curso' : 'Empezar el curso'

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <nav aria-label="Ubicación" className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
        <Link to="/curso" className="rounded hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
          ← Todos los cursos
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-300">{curso.titulo}</span>
      </nav>

      {/* Presentación */}
      <header className="mt-4 rounded-2xl border border-surface-border bg-gradient-to-br from-surface-raised to-surface p-6 shadow-glow sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-slate-300 ring-1 ring-surface-border">
            Paso {curso.paso} de {cursos.length}
          </span>
          <InsigniaNivel nivel={curso.nivel} />
          {curso.certifica !== false && !proximamente && (
            <span className="rounded-full bg-brand-600/15 px-2.5 py-0.5 text-xs font-medium text-brand-200">🎓 Cuenta para el certificado «AI Academy»</span>
          )}
        </div>
        <div className="mt-4 flex items-start gap-4">
          <span aria-hidden="true" className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-surface text-3xl ring-1 ring-surface-border">
            {curso.icono}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-50 sm:text-3xl">{curso.titulo}</h1>
            <p className="mt-2 max-w-2xl text-slate-300">{curso.descripcion}</p>
          </div>
        </div>

        {proximamente ? (
          <p className="mt-6 rounded-xl border border-dashed border-surface-border bg-surface/60 px-4 py-3 text-sm text-slate-300">
            🚧 Este curso está en preparación. Lo verás aquí en cuanto esté disponible, en el mismo orden de la ruta.
          </p>
        ) : (
          <>
            <p className="mt-5 text-sm text-slate-400">
              {modulos.length} {modulos.length === 1 ? 'módulo' : 'módulos'} · {progreso.total} lecciones · ~{horasEstimadas(progreso.total)} h de estudio
            </p>
            <div className="mt-3">
              <div className="mb-1.5 flex justify-between text-sm text-slate-300">
                <span>
                  {progreso.hechas} de {progreso.total} lecciones
                </span>
                <span className="font-semibold text-slate-100">{progreso.porcentaje} %</span>
              </div>
              <BarraProgreso valor={progreso.porcentaje} etiqueta={`Progreso del curso ${curso.titulo}`} />
            </div>
            {siguienteLeccion && (
              <Link
                to={`/leccion/${siguienteLeccion.id}`}
                className="mt-5 inline-flex max-w-full items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <span className="truncate">
                  {etiquetaAccion}: {siguienteLeccion.titulo}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </>
        )}
      </header>

      {/* Qué aprenderás y requisitos */}
      <section className="mt-5 grid gap-4 md:grid-cols-[3fr_2fr]">
        <Tarjeta className="p-5">
          <h2 className="font-bold text-slate-50">Lo que aprenderás</h2>
          <ul className="mt-3 space-y-2">
            {curso.aprenderas.map((punto) => (
              <li key={punto} className="flex gap-2.5 text-sm text-slate-300">
                <span aria-hidden="true" className="mt-0.5 text-emerald-400">
                  ✓
                </span>
                <span>{punto}</span>
              </li>
            ))}
          </ul>
        </Tarjeta>
        <Tarjeta className="p-5">
          <h2 className="font-bold text-slate-50">Antes de empezar</h2>
          <p className="mt-3 text-sm text-slate-300">{curso.requisitos}</p>
        </Tarjeta>
      </section>

      {/* Contenido */}
      {!proximamente && (
        <section aria-labelledby="titulo-contenido" className="mt-8">
          <h2 id="titulo-contenido" className="text-lg font-bold text-slate-50">
            Contenido del curso
          </h2>
          <ul className="mt-3 space-y-3">
            {modulos.map((modulo, indice) => {
              const lecciones = todasLasLecciones.filter((l) => l.moduloId === modulo.id)
              const completadas = lecciones.filter((l) => hechas.has(l.id)).length
              const estado = estadoDeModulo(completadas, lecciones.length)
              return (
                <li key={modulo.id} className="min-w-0 rounded-xl border border-surface-border bg-surface-raised/60">
                  <details open={estado === 'en-curso'} className="group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 rounded-xl p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Módulo {indice + 1}</p>
                        <h3 className="mt-0.5 font-semibold text-slate-100">{modulo.titulo}</h3>
                        <p className="mt-1 text-sm text-slate-400">{modulo.descripcion}</p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${CHIP_MODULO[estado].clase}`}>{CHIP_MODULO[estado].texto}</span>
                        <span className="text-xs text-slate-400">
                          {completadas}/{lecciones.length} lecciones
                        </span>
                      </div>
                    </summary>
                    <ul className="border-t border-surface-border px-2 py-2">
                      {lecciones.map((l) => (
                        <li key={l.id}>
                          <Link to={`/leccion/${l.id}`} className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-slate-300 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
                            <span aria-hidden="true" className={hechas.has(l.id) ? 'text-emerald-400' : 'text-slate-500'}>
                              {hechas.has(l.id) ? '✓' : '○'}
                            </span>
                            <span className="sr-only">{hechas.has(l.id) ? 'Completada: ' : 'Pendiente: '}</span>
                            <span className="truncate">{l.titulo}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* Siguiente en la ruta */}
      {siguiente && (
        <section aria-label="Siguiente curso de la ruta" className="mt-8">
          <Link
            to={`/cursos/${siguiente.id}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-surface-border bg-surface-raised/60 p-5 transition hover:border-brand-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Siguiente en la ruta</p>
              <p className="mt-1 truncate text-lg font-bold text-slate-50">
                {siguiente.icono} {siguiente.titulo}
              </p>
              <p className="mt-0.5 line-clamp-2 text-sm text-slate-400">{siguiente.resumen}</p>
            </div>
            <span aria-hidden="true" className="shrink-0 text-xl text-brand-300 transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        </section>
      )}
    </div>
  )
}
