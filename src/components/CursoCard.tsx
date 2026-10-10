import { Link } from 'react-router-dom'
import { horasEstimadas } from '../lib/cursos'
import type { ProgresoCurso } from '../lib/cursos'
import type { Curso, NivelCurso } from '../types'
import { BarraProgreso } from './ui'

export const CLASE_NIVEL: Record<NivelCurso, string> = {
  Básico: 'bg-emerald-500/15 text-emerald-300',
  Intermedio: 'bg-amber-500/15 text-amber-300',
  Avanzado: 'bg-fuchsia-500/15 text-fuchsia-300',
}

export function InsigniaNivel({ nivel }: { nivel: NivelCurso }) {
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${CLASE_NIVEL[nivel]}`}>{nivel}</span>
}

const ACCION: Record<ProgresoCurso['estado'], string> = {
  proximamente: 'Próximamente',
  'sin-empezar': 'Empezar curso',
  'en-curso': 'Continuar',
  completado: 'Repasar',
}

/** Tarjeta de un curso dentro de la ruta de estudio. */
export function CursoCard({ curso, progreso, modulos }: { curso: Curso; progreso: ProgresoCurso; modulos: number }) {
  const proximamente = progreso.estado === 'proximamente'
  const cuerpo = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface text-2xl ring-1 ring-surface-border">
          {curso.icono}
        </span>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-slate-300 ring-1 ring-surface-border">Paso {curso.paso}</span>
          <InsigniaNivel nivel={curso.nivel} />
        </div>
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug text-slate-50">{curso.titulo}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{curso.resumen}</p>

      <div className="mt-4 flex-1" />

      {proximamente ? (
        <p className="mt-2 text-xs text-slate-400">En preparación · {curso.aprenderas.length} temas planificados</p>
      ) : (
        <>
          <p className="text-xs text-slate-400">
            {modulos} {modulos === 1 ? 'módulo' : 'módulos'} · {progreso.total} lecciones · ~{horasEstimadas(progreso.total)} h
          </p>
          <div className="mt-3 flex items-center gap-3">
            <BarraProgreso valor={progreso.porcentaje} etiqueta={`Progreso del curso ${curso.titulo}`} className="!h-1.5 flex-1" />
            <span className="w-16 shrink-0 text-right text-xs font-medium text-slate-300">
              {progreso.hechas}/{progreso.total}
            </span>
          </div>
        </>
      )}

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-surface-border pt-3">
        <span className={`text-sm font-semibold ${proximamente ? 'text-slate-500' : progreso.estado === 'completado' ? 'text-emerald-300' : 'text-brand-300 group-hover:text-brand-200'}`}>
          {progreso.estado === 'completado' && '✓ '}
          {ACCION[progreso.estado]}
          {!proximamente && <span aria-hidden="true"> →</span>}
        </span>
        {!proximamente && curso.certifica !== false && (
          <span className="rounded-full bg-brand-600/15 px-2 py-0.5 text-[11px] font-medium text-brand-200" title="Sus lecciones cuentan para el certificado «AI Academy»">
            🎓 Certificado
          </span>
        )}
      </div>
    </>
  )

  const base = 'group flex h-full min-w-0 flex-col rounded-2xl border p-5 transition'
  if (proximamente) {
    return (
      <div className={`${base} border-dashed border-surface-border bg-surface-raised/30 opacity-80`} aria-label={`${curso.titulo}: próximamente`}>
        {cuerpo}
      </div>
    )
  }
  return (
    <Link
      to={`/cursos/${curso.id}`}
      className={`${base} border-surface-border bg-surface-raised/70 hover:-translate-y-0.5 hover:border-brand-500/60 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400`}
    >
      {cuerpo}
    </Link>
  )
}
