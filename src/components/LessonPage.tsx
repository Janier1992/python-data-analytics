import { Suspense, lazy, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getLeccion, getModulo, moduloLeccionesMap, todasLasLecciones } from '../content/curriculum'
import { ExerciseBlock } from './ExerciseBlock'
import { QuizBlock } from './QuizBlock'
import { useProgressStore } from '../state/progressStore'

const AITutorPanel = lazy(() => import('./AITutorPanel').then((m) => ({ default: m.AITutorPanel })))

export function LessonPage() {
  const { leccionId } = useParams()
  const navigate = useNavigate()
  const leccion = leccionId ? getLeccion(leccionId) : undefined
  const marcarLeccionCompletada = useProgressStore((s) => s.marcarLeccionCompletada)
  const registrarQuiz = useProgressStore((s) => s.registrarQuiz)
  const actualizarDominio = useProgressStore((s) => s.actualizarDominio)
  const sincronizarModulosCompletados = useProgressStore((s) => s.sincronizarModulosCompletados)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [showTutor, setShowTutor] = useState(false)

  if (!leccion) {
    return (
      <div className="p-10 text-slate-300">
        Lección no encontrada. <Link to="/curso" className="text-brand-400 underline">Volver al curso</Link>
      </div>
    )
  }

  const modulo = getModulo(leccion.moduloId)
  const lessonsInModule = todasLasLecciones.filter((l) => l.moduloId === leccion.moduloId)
  const idx = lessonsInModule.findIndex((l) => l.id === leccion.id)
  const siguiente = lessonsInModule[idx + 1]

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
      <p className="text-sm text-brand-400">
        Módulo {modulo?.numero} · {modulo?.titulo}
      </p>
      <h1 className="mt-1 text-2xl font-bold text-slate-100">{leccion.titulo}</h1>

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
          {siguiente ? (
            <button
              onClick={() => navigate(`/leccion/${siguiente.id}`)}
              className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Ir a la siguiente lección →
            </button>
          ) : (
            <Link to="/curso" className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
              Volver al mapa del curso
            </Link>
          )}
          <button
            onClick={() => setShowTutor((v) => !v)}
            className="rounded-md border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
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
  return <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 text-sm text-slate-300">{code}</pre>
}
