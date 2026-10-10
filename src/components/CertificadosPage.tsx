import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { NOMBRE_ACADEMIA, NOMBRE_PROGRAMA } from '../brand'
import { cursosDisponibles, leccionesDeCurso, moduloLeccionesCertificablesMap } from '../content/curriculum'
import { avanceCertificado } from '../lib/certificado'
import { cursoCompleto } from '../lib/certificadoCurso'
import { useProgressStore } from '../state/progressStore'
import { BarraProgreso, Tarjeta } from './ui'

/** Lista de certificados: el del programa «AI Academy» y uno por cada curso. */
export function CertificadosPage() {
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const programa = useMemo(() => avanceCertificado(completedLessons, moduloLeccionesCertificablesMap()), [completedLessons])
  const filas = useMemo(
    () =>
      cursosDisponibles.map((curso) => {
        const ids = leccionesDeCurso(curso.id)
        const hechas = ids.filter((id) => completedLessons.includes(id)).length
        return { curso, total: ids.length, hechas, listo: cursoCompleto(completedLessons, ids) }
      }),
    [completedLessons],
  )
  const obtenidos = filas.filter((f) => f.listo).length

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <p className="text-sm font-medium text-brand-400">Reconocimiento</p>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-50">Mis certificados</h1>
      <p className="mt-2 max-w-3xl text-slate-300">
        Cada curso tiene su propio certificado de finalización, que se emite al completar todas sus lecciones (aprobando la verificación de cada una con 70 % o más). Llevas {obtenidos} de {filas.length}. Son constancias de participación: no son títulos ni credenciales oficiales y su código no se verifica en ningún servidor.
      </p>

      <Link
        to="/certificado"
        className="mt-6 block rounded-2xl border border-surface-border bg-gradient-to-br from-surface-raised to-surface p-5 transition hover:border-brand-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
      >
        <div className="flex items-start gap-4">
          <span aria-hidden="true" className="text-3xl">
            {programa.completo ? '🎓' : '🔒'}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-slate-50">Programa «{NOMBRE_ACADEMIA}»</h2>
            <p className="text-sm text-slate-400">
              {NOMBRE_PROGRAMA}: certificado del programa original ({programa.leccionesTotales} lecciones de los cursos marcados con «AI Academy»).
            </p>
            <div className="mt-3 flex items-center gap-3">
              <BarraProgreso valor={programa.porcentaje} etiqueta="Avance hacia el certificado del programa" className="!h-1.5 flex-1" />
              <span className="shrink-0 text-xs font-medium text-slate-300">
                {programa.leccionesHechas}/{programa.leccionesTotales}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <h2 className="mt-8 text-lg font-bold text-slate-50">Certificados por curso</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {filas.map(({ curso, total, hechas, listo }) => (
          <li key={curso.id} className="min-w-0">
            <Link
              to={`/certificados/${curso.id}`}
              className="flex h-full flex-col rounded-2xl border border-surface-border bg-surface-raised/60 p-4 transition hover:border-brand-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 font-semibold text-slate-100">
                  <span aria-hidden="true">{curso.icono}</span> {curso.titulo}
                </p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${listo ? 'bg-emerald-500/15 text-emerald-300' : 'bg-surface text-slate-400 ring-1 ring-surface-border'}`}>
                  {listo ? '🎓 Disponible' : '🔒 En curso'}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <BarraProgreso valor={total === 0 ? 0 : Math.round((hechas / total) * 100)} etiqueta={`Avance del curso ${curso.titulo}`} className="!h-1.5 flex-1" />
                <span className="shrink-0 text-xs font-medium text-slate-300">
                  {hechas}/{total}
                </span>
              </div>
              <span className="mt-3 text-sm font-semibold text-brand-300">{listo ? 'Ver certificado →' : 'Ver avance →'}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Tarjeta className="mt-8 p-4 text-xs leading-relaxed text-slate-400">
        Los certificados de los cursos de Excel, Visualización y Power BI, IA aplicada y Proyecto final incluyen una aclaración sobre lo que la plataforma evalúa y lo que no (por ejemplo, que no ejecuta Power BI ni llama a modelos de lenguaje reales).
      </Tarjeta>
    </div>
  )
}
