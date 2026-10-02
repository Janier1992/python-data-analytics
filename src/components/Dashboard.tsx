import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { curriculum, modulosPorTrack, todasLasLecciones, tracks } from '../content/curriculum'
import { avanceCertificado, diasDeEstudio, formatearTiempoEstudio } from '../lib/certificado'
import { estadoDeModulo, rachaActual, saludoSegunHora } from '../lib/progreso'
import { useCuentaActual } from '../state/accountStore'
import { useProgressStore } from '../state/progressStore'
import { BarraProgreso, Tarjeta } from './ui'

function Estadistica({ icono, valor, etiqueta, detalle }: { icono: string; valor: string; etiqueta: string; detalle?: string }) {
  return (
    <Tarjeta className="p-4">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface text-xl">
          {icono}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xl font-bold text-slate-50">{valor}</p>
          <p className="truncate text-xs text-slate-400">{etiqueta}</p>
        </div>
      </div>
      {detalle && <p className="mt-2 text-xs text-slate-400">{detalle}</p>}
    </Tarjeta>
  )
}

const CHIP: Record<ReturnType<typeof estadoDeModulo>, { texto: string; clase: string }> = {
  completado: { texto: '✓ Completado', clase: 'bg-emerald-500/15 text-emerald-300' },
  'en-curso': { texto: 'En curso', clase: 'bg-brand-600/20 text-brand-200' },
  'sin-empezar': { texto: 'Sin empezar', clase: 'bg-surface text-slate-400' },
}

export function Dashboard() {
  const cuenta = useCuentaActual()
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const tiempoActivoSeg = useProgressStore((s) => s.tiempoActivoSeg)
  const diasActivos = useProgressStore((s) => s.diasActivos)
  const ultimaLeccionId = useProgressStore((s) => s.ultimaLeccionId)
  const level = useProgressStore((s) => s.level)

  const hechas = useMemo(() => new Set(completedLessons), [completedLessons])
  const modulosMapa = useMemo(() => Object.fromEntries(curriculum.map((m) => [m.id, m.lessonIds])), [])
  const avance = useMemo(() => avanceCertificado(completedLessons, modulosMapa), [completedLessons, modulosMapa])

  // Continuar: la lección en curso más reciente si aún no está hecha; si no, la primera pendiente
  const siguiente =
    (ultimaLeccionId && !hechas.has(ultimaLeccionId) ? todasLasLecciones.find((l) => l.id === ultimaLeccionId) : undefined) ??
    todasLasLecciones.find((l) => !hechas.has(l.id))
  const moduloSiguiente = siguiente ? curriculum.find((m) => m.id === siguiente.moduloId) : undefined
  const racha = rachaActual(diasActivos)
  const primerNombre = cuenta?.nombre.split(' ')[0] ?? ''

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Bienvenida y siguiente paso */}
      <section aria-labelledby="titulo-panel" className="rounded-2xl border border-surface-border bg-gradient-to-br from-surface-raised to-surface p-6 shadow-glow sm:p-8">
        <p className="text-sm font-medium text-brand-400">
          {saludoSegunHora(new Date().getHours())}, {primerNombre}
        </p>
        <h1 id="titulo-panel" className="mt-1 text-2xl font-extrabold tracking-tight text-slate-50 sm:text-3xl">
          {avance.completo ? '¡Completaste el programa! 🎉' : avance.leccionesHechas === 0 ? 'Empecemos tu ruta de aprendizaje' : 'Sigue avanzando en tu ruta'}
        </h1>
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-sm text-slate-300">
            <span>
              {avance.leccionesHechas} de {avance.leccionesTotales} lecciones
            </span>
            <span className="font-semibold text-slate-100">{avance.porcentaje} %</span>
          </div>
          <BarraProgreso valor={avance.porcentaje} etiqueta="Progreso general del programa" />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {avance.completo ? (
            <Link to="/certificado" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
              🎓 Obtener mi certificado
            </Link>
          ) : (
            siguiente && (
              <Link to={`/leccion/${siguiente.id}`} className="inline-flex max-w-full items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
                <span className="truncate">
                  {avance.leccionesHechas === 0 ? 'Empezar' : 'Continuar'}: {siguiente.titulo}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            )
          )}
          {moduloSiguiente && !avance.completo && (
            <span className="text-sm text-slate-400">
              Módulo {moduloSiguiente.numero} · {moduloSiguiente.titulo}
            </span>
          )}
        </div>
      </section>

      {/* Estadísticas */}
      <section aria-label="Tus estadísticas" className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Estadistica icono="✅" valor={`${avance.leccionesHechas}/${avance.leccionesTotales}`} etiqueta="Lecciones completadas" />
        <Estadistica icono="📦" valor={`${avance.modulosHechos}/${avance.modulosTotales}`} etiqueta="Módulos completados" />
        <Estadistica icono="🔥" valor={`${racha} ${racha === 1 ? 'día' : 'días'}`} etiqueta="Racha de estudio" detalle={`${diasDeEstudio(diasActivos)} ${diasDeEstudio(diasActivos) === 1 ? 'día' : 'días'} de estudio en total`} />
        <Estadistica icono="⏱️" valor={tiempoActivoSeg < 60 ? '0 min' : formatearTiempoEstudio(tiempoActivoSeg)} etiqueta="Tiempo de estudio" detalle={`Nivel inicial estimado: ${level}/5`} />
      </section>

      {/* Atajos */}
      <section aria-label="Atajos" className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link to="/referencia" className="group min-w-0 rounded-2xl border border-surface-border bg-surface-raised/60 p-5 transition hover:border-brand-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
          <p className="text-lg font-semibold text-slate-100">📚 Guía de referencia</p>
          <p className="mt-1 text-sm text-slate-400">Qué hace cada función, método y sentencia de Python y SQL, con ejemplos que puedes ejecutar.</p>
        </Link>
        <Link to="/certificado" className="group min-w-0 rounded-2xl border border-surface-border bg-surface-raised/60 p-5 transition hover:border-brand-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
          <p className="text-lg font-semibold text-slate-100">{avance.completo ? '🎓 Tu certificado está listo' : '🎓 Tu certificado'}</p>
          <p className="mt-1 text-sm text-slate-400">
            {avance.completo ? 'Descárgalo en PDF con tu nombre y el tiempo que te tomó.' : `Lo recibes al completar el programa: llevas el ${avance.porcentaje} %.`}
          </p>
        </Link>
      </section>

      {/* Módulos por ruta */}
      <div className="mt-10 space-y-10">
        {tracks.map((track) => {
          const modulos = modulosPorTrack(track.id)
          return (
            <section key={track.id} aria-labelledby={`ruta-${track.id}`}>
              <h2 id={`ruta-${track.id}`} className="text-lg font-bold text-brand-300">
                Ruta {track.orden} · {track.titulo}
              </h2>
              <p className="mb-4 mt-1 text-sm text-slate-400">{track.descripcion}</p>

              <ul className="grid gap-3 sm:grid-cols-2">
                {modulos.map((modulo) => {
                  const lecciones = todasLasLecciones.filter((l) => l.moduloId === modulo.id)
                  const completadas = lecciones.filter((l) => hechas.has(l.id)).length
                  const estado = estadoDeModulo(completadas, lecciones.length)
                  const primeraPendiente = lecciones.find((l) => !hechas.has(l.id)) ?? lecciones[0]
                  return (
                    <li key={modulo.id} className="min-w-0 rounded-xl border border-surface-border bg-surface-raised/60 p-4 transition hover:border-brand-600/50">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-slate-100">
                          {modulo.numero}. {modulo.titulo}
                        </h3>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${CHIP[estado].clase}`}>{CHIP[estado].texto}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-400">{modulo.descripcion}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <BarraProgreso valor={(completadas / Math.max(1, lecciones.length)) * 100} etiqueta={`Progreso del módulo ${modulo.numero}`} className="!h-1.5 flex-1" />
                        <span className="text-xs text-slate-400">
                          {completadas}/{lecciones.length}
                        </span>
                      </div>
                      <details className="group mt-3" open={estado === 'en-curso'}>
                        <summary className="cursor-pointer select-none text-sm text-brand-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
                          Ver lecciones
                        </summary>
                        <ul className="mt-2 space-y-0.5">
                          {lecciones.map((l) => (
                            <li key={l.id}>
                              <Link to={`/leccion/${l.id}`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-300 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
                                <span aria-hidden="true" className={hechas.has(l.id) ? 'text-emerald-400' : 'text-slate-400'}>
                                  {hechas.has(l.id) ? '✓' : '○'}
                                </span>
                                <span className="sr-only">{hechas.has(l.id) ? 'Completada: ' : 'Pendiente: '}</span>
                                <span className="truncate">{l.titulo}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                      {primeraPendiente && estado !== 'completado' && (
                        <Link to={`/leccion/${primeraPendiente.id}`} className="mt-3 inline-flex text-sm font-medium text-slate-100 underline-offset-2 hover:underline">
                          {estado === 'sin-empezar' ? 'Empezar módulo' : 'Continuar módulo'} →
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
