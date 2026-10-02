import { Suspense, lazy, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getLeccion, getLeccionesAdyacentes, getModulo, getTrack, moduloLeccionesMap } from '../content/curriculum'
import { cargarLeccion } from '../content/lessonLoader'
import type { Lesson } from '../types'
import { ExerciseBlock } from './ExerciseBlock'
import { QuizBlock } from './QuizBlock'
import { useProgressStore } from '../state/progressStore'

const AITutorPanel = lazy(() => import('./AITutorPanel').then((m) => ({ default: m.AITutorPanel })))

type EstadoCarga = { estado: 'cargando' } | { estado: 'error' } | { estado: 'lista'; leccion: Lesson }

/** Resuelve la lección de la URL y descarga su contenido (chunk del módulo) bajo demanda. */
export function LessonPage() {
  const { leccionId } = useParams()
  const resumen = leccionId ? getLeccion(leccionId) : undefined
  const [carga, setCarga] = useState<EstadoCarga>({ estado: 'cargando' })
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    if (!resumen) return
    let cancelado = false
    setCarga({ estado: 'cargando' })
    cargarLeccion(resumen.moduloId, resumen.id)
      .then((leccion) => {
        if (!cancelado) setCarga(leccion ? { estado: 'lista', leccion } : { estado: 'error' })
      })
      .catch(() => {
        if (!cancelado) setCarga({ estado: 'error' })
      })
    return () => {
      cancelado = true
    }
  }, [resumen?.id, resumen?.moduloId, intento])

  if (!resumen) {
    return (
      <div className="p-10 text-slate-300">
        Lección no encontrada. <Link to="/curso" className="text-brand-400 underline">Volver al curso</Link>
      </div>
    )
  }

  if (carga.estado === 'cargando') {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10" role="status" aria-live="polite">
        <p className="text-sm text-slate-500">Cargando lección…</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-100">{resumen.titulo}</h1>
      </div>
    )
  }

  if (carga.estado === 'error') {
    return (
      <div className="p-10 text-slate-300">
        No se pudo cargar la lección (revisa tu conexión).{' '}
        <button onClick={() => setIntento((n) => n + 1)} className="text-brand-400 underline">
          Reintentar
        </button>{' '}
        · <Link to="/curso" className="text-brand-400 underline">Volver al curso</Link>
      </div>
    )
  }

  return <LessonContent key={carga.leccion.id} leccion={carga.leccion} />
}

function LessonContent({ leccion }: { leccion: Lesson }) {
  const leccionId = leccion.id
  const navigate = useNavigate()
  const marcarLeccionCompletada = useProgressStore((s) => s.marcarLeccionCompletada)
  const registrarQuiz = useProgressStore((s) => s.registrarQuiz)
  const actualizarDominio = useProgressStore((s) => s.actualizarDominio)
  const sincronizarModulosCompletados = useProgressStore((s) => s.sincronizarModulosCompletados)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [showTutor, setShowTutor] = useState(false)

  useEffect(() => {
    setQuizScore(null)
    setShowTutor(false)
    window.scrollTo({ top: 0 })
  }, [leccionId])

  const modulo = getModulo(leccion.moduloId)
  const track = modulo ? getTrack(modulo.trackId) : undefined
  const { anterior, siguiente } = getLeccionesAdyacentes(leccion.id)

  function finalizarQuiz(score: number) {
    setQuizScore(score)
    registrarQuiz(leccion!.id, score)
    const nivel = score >= 70 ? 'PRACTICADO' : 'EN_APRENDIZAJE'
    leccion!.conceptos.forEach((c) => actualizarDominio(c, nivel))
    if (score >= 70) {
      marcarLeccionCompletada(leccion!.moduloId, leccion!.id)
      sincronizarModulosCompletados(moduloLeccionesMap())
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <Link to="/curso" className="hover:text-slate-300">
          Inicio
        </Link>
        <span>/</span>
        <span>{track?.titulo}</span>
        <span>/</span>
        <span className="text-slate-400">
          Módulo {modulo?.numero} · {modulo?.titulo}
        </span>
      </nav>

      <div className="mt-3 flex items-center justify-between gap-3">
        {anterior ? (
          <button
            onClick={() => navigate(`/leccion/${anterior.id}`)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-slate-400 hover:bg-surface-raised hover:text-slate-200"
          >
            ← Anterior
          </button>
        ) : (
          <span />
        )}
        {siguiente && (
          <button
            onClick={() => navigate(`/leccion/${siguiente.id}`)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-slate-400 hover:bg-surface-raised hover:text-slate-200"
          >
            Siguiente →
          </button>
        )}
      </div>

      <h1 className="mt-3 text-2xl font-bold text-slate-100">{leccion.titulo}</h1>

      <Seccion titulo="Objetivo">{leccion.objetivo}</Seccion>
      <Seccion titulo="¿Por qué importa?">{leccion.porQueImporta}</Seccion>

      <Seccion titulo="Concepto">
        <div className="prose prose-invert prose-slate max-w-none prose-pre:bg-slate-950">
          <ReactMarkdown>{leccion.concepto}</ReactMarkdown>
        </div>
      </Seccion>

      <Seccion titulo="Ejemplo mínimo">
        <CodeBlock code={leccion.ejemploMinimo} />
      </Seccion>

      <Seccion titulo="Ejemplo aplicado a datos">
        <CodeBlock code={leccion.ejemploAplicado} />
      </Seccion>

      <Seccion titulo="Error frecuente">
        <CodeBlock code={leccion.errorFrecuente.codigo} />
        <p className="mt-2 text-sm text-slate-400">{leccion.errorFrecuente.explicacion}</p>
      </Seccion>

      <Seccion titulo="Práctica guiada">
        <ExerciseBlock exercise={leccion.practicaGuiada} lessonId={leccion.id} titulo="Completa el código" />
      </Seccion>

      <Seccion titulo="Reto">
        <ExerciseBlock exercise={leccion.reto} lessonId={leccion.id} titulo="Resuélvelo por tu cuenta" />
      </Seccion>

      <Seccion titulo="Verificación">
        <QuizBlock preguntas={leccion.verificacion} onFinish={finalizarQuiz} />
        {quizScore !== null && (
          <p className="mt-3 text-sm font-medium text-slate-300">
            Resultado: {quizScore}%{' '}
            {quizScore >= 70 ? '— lección marcada como completada ✅' : '— repasa el concepto antes de avanzar.'}
          </p>
        )}
      </Seccion>

      <Seccion titulo="Resumen">
        <ul className="list-inside list-disc space-y-1 text-slate-300">
          {leccion.resumen.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </Seccion>

      <Seccion titulo="Próximo paso">
        <p className="text-slate-300">{leccion.proximoPaso}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {anterior && (
            <button
              onClick={() => navigate(`/leccion/${anterior.id}`)}
              className="rounded-md border border-surface-border px-4 py-2 text-sm text-slate-300 hover:bg-surface-raised"
            >
              ← Lección anterior
            </button>
          )}
          {siguiente ? (
            <button
              onClick={() => navigate(`/leccion/${siguiente.id}`)}
              className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-glow hover:bg-brand-700"
            >
              Ir a la siguiente lección →
            </button>
          ) : (
            <Link to="/curso" className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-glow hover:bg-brand-700">
              Volver al mapa del curso
            </Link>
          )}
          <button
            onClick={() => setShowTutor((v) => !v)}
            className="rounded-md border border-surface-border px-4 py-2 text-sm text-slate-300 hover:bg-surface-raised"
          >
            {showTutor ? 'Ocultar tutor IA' : '¿Dudas? Habla con el tutor IA'}
          </button>
        </div>
      </Seccion>

      {showTutor && (
        <Suspense fallback={<p className="mt-6 text-sm text-slate-500">Cargando el tutor IA…</p>}>
          <AITutorPanel leccionContexto={leccion} />
        </Suspense>
      )}
    </div>
  )
}

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-2 text-lg font-semibold text-slate-200">{titulo}</h2>
      {children}
    </section>
  )
}

function CodeBlock({ code }: { code: string }) {
  return <pre className="overflow-x-auto rounded-lg border border-surface-border bg-surface p-3 font-mono text-sm text-slate-300">{code}</pre>
}
