import { Link } from 'react-router-dom'
import { curriculum, modulosPorTrack, todasLasLecciones, tracks } from '../content/curriculum'
import { useProgressStore } from '../state/progressStore'

export function Dashboard() {
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const level = useProgressStore((s) => s.level)

  const leccionesDisponibles = todasLasLecciones.filter((l) =>
    curriculum.find((m) => m.id === l.moduloId)?.disponible,
  )
  const totalCompletadas = leccionesDisponibles.filter((l) => completedLessons.includes(l.id)).length
  const siguienteLeccion = leccionesDisponibles.find((l) => !completedLessons.includes(l.id))
  const progresoGeneral = leccionesDisponibles.length
    ? Math.round((totalCompletadas / leccionesDisponibles.length) * 100)
    : 0

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="rounded-2xl border border-surface-border bg-gradient-to-br from-surface-raised to-surface p-6 shadow-glow">
        <h1 className="text-2xl font-bold text-slate-100">Tu ruta de aprendizaje</h1>
        <p className="mt-1 text-slate-400">
          Nivel estimado {level}/5 · {totalCompletadas}/{leccionesDisponibles.length} lecciones completadas ({progresoGeneral}%)
        </p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface">
          <div className="h-full bg-brand-500 transition-all" style={{ width: `${progresoGeneral}%` }} />
        </div>
        {siguienteLeccion && (
          <Link
            to={`/leccion/${siguienteLeccion.id}`}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            {totalCompletadas === 0 ? 'Empezar el curso' : 'Continuar donde quedaste'} →
          </Link>
        )}
      </div>

      <div className="mt-10 space-y-10">
        {tracks.map((track) => (
          <section key={track.id}>
            <h2 className="text-lg font-bold text-brand-400">
              Ruta {track.orden} · {track.titulo}
            </h2>
            <p className="mb-4 mt-1 text-sm text-slate-400">{track.descripcion}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              {modulosPorTrack(track.id).map((modulo) => {
                const lecciones = todasLasLecciones.filter((l) => l.moduloId === modulo.id)
                const completadas = lecciones.filter((l) => completedLessons.includes(l.id)).length
                return (
                  <div
                    key={modulo.id}
                    className={`rounded-xl border p-4 transition ${
                      modulo.disponible
                        ? 'border-surface-border bg-surface-raised/60 hover:border-brand-600/50'
                        : 'border-surface-border/50 bg-surface-raised/20 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-slate-100">
                        {modulo.numero}. {modulo.titulo}
                      </h3>
                      {!modulo.disponible && (
                        <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 text-xs text-slate-500">Próximamente</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{modulo.descripcion}</p>
                    {modulo.disponible && lecciones.length > 0 && (
                      <>
                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface">
                          <div
                            className="h-full bg-brand-500"
                            style={{ width: `${(completadas / lecciones.length) * 100}%` }}
                          />
                        </div>
                        <ul className="mt-3 space-y-0.5">
                          {lecciones.map((l) => (
                            <li key={l.id}>
                              <Link
                                to={`/leccion/${l.id}`}
                                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-slate-300 hover:bg-surface"
                              >
                                <span className="truncate">{l.titulo}</span>
                                {completedLessons.includes(l.id) && <span className="shrink-0 text-emerald-400">✓</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
