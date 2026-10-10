import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  curriculum,
  cursos,
  getCurso,
  leccionesDeCurso,
  modulosDeCurso,
  moduloLeccionesCertificablesMap,
  todasLasLecciones,
} from '../content/curriculum'
import { avanceCertificado, diasDeEstudio, formatearTiempoEstudio } from '../lib/certificado'
import { progresoDeCurso } from '../lib/cursos'
import { rachaActual, saludoSegunHora } from '../lib/progreso'
import { useCuentaActual } from '../state/accountStore'
import { useProgressStore } from '../state/progressStore'
import { CursoCard } from './CursoCard'
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

export function Dashboard() {
  const cuenta = useCuentaActual()
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const tiempoActivoSeg = useProgressStore((s) => s.tiempoActivoSeg)
  const diasActivos = useProgressStore((s) => s.diasActivos)
  const ultimaLeccionId = useProgressStore((s) => s.ultimaLeccionId)

  const hechas = useMemo(() => new Set(completedLessons), [completedLessons])

  // Progreso de cada curso, en el orden de la ruta
  const tarjetas = useMemo(
    () =>
      cursos.map((curso) => ({
        curso,
        modulos: modulosDeCurso(curso.id).length,
        progreso: progresoDeCurso(leccionesDeCurso(curso.id), completedLessons, { proximamente: curso.proximamente, ultimaLeccionId }),
      })),
    [completedLessons, ultimaLeccionId],
  )
  const disponibles = tarjetas.filter((t) => t.progreso.estado !== 'proximamente')
  const cursosCompletados = disponibles.filter((t) => t.progreso.estado === 'completado').length
  const leccionesHechas = todasLasLecciones.filter((l) => hechas.has(l.id)).length
  const porcentajeGeneral = todasLasLecciones.length === 0 ? 0 : Math.round((leccionesHechas / todasLasLecciones.length) * 100)

  // El certificado «AI Academy» solo cuenta los cursos que certifican
  const mapaCertificado = useMemo(() => moduloLeccionesCertificablesMap(), [])
  const certificado = useMemo(() => avanceCertificado(completedLessons, mapaCertificado), [completedLessons, mapaCertificado])

  // Continuar: la lección en curso más reciente si aún no está hecha; si no, la primera pendiente de la ruta
  const siguiente =
    (ultimaLeccionId && !hechas.has(ultimaLeccionId) ? todasLasLecciones.find((l) => l.id === ultimaLeccionId) : undefined) ??
    todasLasLecciones.find((l) => !hechas.has(l.id))
  const moduloSiguiente = siguiente ? curriculum.find((m) => m.id === siguiente.moduloId) : undefined
  const cursoSiguiente = moduloSiguiente ? getCurso(moduloSiguiente.cursoId) : undefined
  const todoCompleto = leccionesHechas > 0 && !siguiente
  const racha = rachaActual(diasActivos)
  const primerNombre = cuenta?.nombre.split(' ')[0] ?? ''

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Bienvenida y siguiente paso */}
      <section aria-labelledby="titulo-panel" className="rounded-2xl border border-surface-border bg-gradient-to-br from-surface-raised to-surface p-6 shadow-glow sm:p-8">
        <p className="text-sm font-medium text-brand-400">
          {saludoSegunHora(new Date().getHours())}, {primerNombre}
        </p>
        <h1 id="titulo-panel" className="mt-1 text-2xl font-extrabold tracking-tight text-slate-50 sm:text-3xl">
          {todoCompleto ? '¡Completaste toda la ruta disponible! 🎉' : leccionesHechas === 0 ? 'Empecemos tu ruta de aprendizaje' : 'Sigue avanzando en tu ruta'}
        </h1>
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-sm text-slate-300">
            <span>
              {leccionesHechas} de {todasLasLecciones.length} lecciones de la ruta
            </span>
            <span className="font-semibold text-slate-100">{porcentajeGeneral} %</span>
          </div>
          <BarraProgreso valor={porcentajeGeneral} etiqueta="Progreso general en la ruta" />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {siguiente && (
            <Link to={`/leccion/${siguiente.id}`} className="inline-flex max-w-full items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
              <span className="truncate">
                {leccionesHechas === 0 ? 'Empezar' : 'Continuar'}: {siguiente.titulo}
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          )}
          {cursoSiguiente && (
            <span className="text-sm text-slate-400">
              {cursoSiguiente.icono} {cursoSiguiente.titulo}
            </span>
          )}
        </div>
      </section>

      {/* Estadísticas */}
      <section aria-label="Tus estadísticas" className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Estadistica icono="✅" valor={`${leccionesHechas}/${todasLasLecciones.length}`} etiqueta="Lecciones completadas" />
        <Estadistica icono="🎓" valor={`${cursosCompletados}/${disponibles.length}`} etiqueta="Cursos completados" />
        <Estadistica icono="🔥" valor={`${racha} ${racha === 1 ? 'día' : 'días'}`} etiqueta="Racha de estudio" detalle={`${diasDeEstudio(diasActivos)} ${diasDeEstudio(diasActivos) === 1 ? 'día' : 'días'} de estudio en total`} />
        <Estadistica icono="⏱️" valor={tiempoActivoSeg < 60 ? '0 min' : formatearTiempoEstudio(tiempoActivoSeg)} etiqueta="Tiempo de estudio" />
      </section>

      {/* Ruta de estudio: un curso por tarjeta */}
      <section aria-labelledby="titulo-ruta" className="mt-10">
        <h2 id="titulo-ruta" className="text-xl font-bold text-slate-50">
          Tu ruta de estudio
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-400">
          {cursos.length} cursos independientes, ordenados del más básico al más avanzado. Empieza por el <strong className="font-semibold text-slate-200">paso 1</strong> y avanza en orden,
          o salta directamente al que necesites. Los marcados como «Próximamente» están en preparación.
        </p>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tarjetas.map(({ curso, progreso, modulos }) => (
            <li key={curso.id} className="min-w-0">
              <CursoCard curso={curso} progreso={progreso} modulos={modulos} />
            </li>
          ))}
        </ul>
      </section>

      {/* Atajos */}
      <section aria-label="Atajos" className="mt-10 grid gap-3 sm:grid-cols-2">
        <Link to="/referencia" className="group min-w-0 rounded-2xl border border-surface-border bg-surface-raised/60 p-5 transition hover:border-brand-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
          <p className="text-lg font-semibold text-slate-100">📚 Guía de referencia</p>
          <p className="mt-1 text-sm text-slate-400">Qué hace cada función, método y sentencia de Python y SQL, con ejemplos que puedes ejecutar.</p>
        </Link>
        <Link to="/certificado" className="group min-w-0 rounded-2xl border border-surface-border bg-surface-raised/60 p-5 transition hover:border-brand-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
          <p className="text-lg font-semibold text-slate-100">{certificado.completo ? '🎓 Tu certificado está listo' : '🎓 Certificado «AI Academy»'}</p>
          <p className="mt-1 text-sm text-slate-400">
            {certificado.completo
              ? 'Descárgalo en PDF con tu nombre y el tiempo que te tomó.'
              : `Se obtiene al completar los cursos marcados con 🎓: llevas el ${certificado.porcentaje} %.`}
          </p>
        </Link>
      </section>
    </div>
  )
}
