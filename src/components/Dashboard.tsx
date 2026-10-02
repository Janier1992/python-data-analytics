import { Link } from 'react-router-dom'
import { curriculum, todasLasLecciones } from '../content/curriculum'
import { useProgressStore } from '../state/progressStore'

export function Dashboard() {
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const level = useProgressStore((s) => s.level)

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-100">Tu ruta de aprendizaje</h1>
      <p className="mt-1 text-slate-400">Nivel actual estimado: {level}/5</p>

      <div className="mt-8 space-y-4">
        {curriculum.map((modulo) => {
          const lecciones = todasLasLecciones.filter((l) => l.moduloId === modulo.id)
          const completadas = lecciones.filter((l) => completedLessons.includes(l.id)).length
          return (
            <div
              key={modulo.id}
              className={`rounded-xl border p-4 ${
                modulo.disponible ? 'border-slate-700 bg-slate-900/50' : 'border-slate-800 bg-slate-900/20 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-100">
                  Módulo {modulo.numero} · {modulo.titulo}
                </h2>
                {!modulo.disponible && (
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">Próximamente</span>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-400">{modulo.descripcion}</p>
              {modulo.disponible && lecciones.length > 0 && (
                <>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-brand-500"
                      style={{ width: `${(completadas / lecciones.length) * 100}%` }}
                    />
                  </div>
                  <ul className="mt-3 space-y-1">
                    {lecciones.map((l) => (
                      <li key={l.id}>
                        <Link
                          to={`/leccion/${l.id}`}
                          className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
                        >
                          <span>{l.titulo}</span>
                          {completedLessons.includes(l.id) && <span className="text-emerald-400">✓</span>}
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
    </div>
  )
}
