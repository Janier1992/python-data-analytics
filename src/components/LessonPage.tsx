import { Suspense, lazy, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getCurso, getLeccion, getLeccionesAdyacentes, getModulo, modulosDeCurso, moduloLeccionesMap } from '../content/curriculum'
import { cargarLeccion, leccionEnCache } from '../content/lessonLoader'
import { cargarTodasLasColecciones } from '../content/reference'
import type { Lesson } from '../types'
import { ExerciseBlock } from './ExerciseBlock'
import { QuizBlock } from './QuizBlock'
import { programaCompleto, useProgressStore } from '../state/progressStore'
import { BotonCopiar } from './referencia/BotonCopiar'
import { Boton } from './ui'

const AITutorPanel = lazy(() => import('./AITutorPanel').then((m) => ({ default: m.AITutorPanel })))

type EstadoCarga = { estado: 'cargando' } | { estado: 'error' } | { estado: 'lista'; leccion: Lesson }

/** Resuelve la lección de la URL y descarga su contenido (chunk del módulo) bajo demanda. */
export function LessonPage() {
  const { leccionId } = useParams()
  const resumen = leccionId ? getLeccion(leccionId) : undefined
  const enCache = resumen ? leccionEnCache(resumen.moduloId, resumen.id) : undefined
  const [carga, setCarga] = useState<EstadoCarga>({ estado: 'cargando' })
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    if (!resumen) return
    let cancelado = false
    if (!leccionEnCache(resumen.moduloId, resumen.id)) setCarga({ estado: 'cargando' })
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

  // Si el módulo ya se descargó, se muestra al instante (sin pasar por "Cargando…")
  if (enCache) return <LessonContent key={enCache.id} leccion={enCache} />

  if (carga.estado === 'cargando') {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10" role="status" aria-live="polite">
        <p className="text-sm text-slate-400">Cargando lección…</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-100">{resumen.titulo}</h1>
      </div>
    )
  }

  if (carga.estado === 'error') {
    return (
      <div className="p-10 text-slate-300">
        No se pudo cargar la lección. Revisa tu conexión; si el problema continúa, recarga la página (puede haber una versión nueva del curso).{' '}
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
  const registrarLeccionVista = useProgressStore((s) => s.registrarLeccionVista)
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const mejorPuntaje = useProgressStore((s) => s.quizScores[leccion.id])
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [quizKey, setQuizKey] = useState(0)
  const [showTutor, setShowTutor] = useState(false)
  const [seccionActiva, setSeccionActiva] = useState('objetivo')

  useEffect(() => {
    setQuizScore(null)
    setShowTutor(false)
    window.scrollTo({ top: 0 })
    registrarLeccionVista(leccionId)
  }, [leccionId, registrarLeccionVista])

  const modulo = getModulo(leccion.moduloId)
  const curso = modulo ? getCurso(modulo.cursoId) : undefined
  const numeroModulo = modulo ? modulosDeCurso(modulo.cursoId).findIndex((m) => m.id === modulo.id) + 1 : 0
  const { anterior, siguiente } = getLeccionesAdyacentes(leccion.id)
  const completada = completedLessons.includes(leccion.id)

  const secciones = [
    { id: 'objetivo', titulo: 'Objetivo' },
    { id: 'por-que-importa', titulo: '¿Por qué importa?' },
    { id: 'concepto', titulo: 'Concepto' },
    { id: 'ejemplo-minimo', titulo: 'Ejemplo mínimo' },
    { id: 'ejemplo-aplicado', titulo: 'Ejemplo aplicado' },
    { id: 'error-frecuente', titulo: 'Error frecuente' },
    { id: 'practica-guiada', titulo: 'Práctica guiada' },
    { id: 'reto', titulo: 'Reto' },
    { id: 'verificacion', titulo: 'Verificación' },
    { id: 'resumen', titulo: 'Resumen' },
    { id: 'proximo-paso', titulo: 'Próximo paso' },
  ]

  // Resalta en el índice la sección que se está leyendo
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visibles = entradas.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visibles[0]) setSeccionActiva(visibles[0].target.id)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    secciones.forEach((sec) => {
      const el = document.getElementById(sec.id)
      if (el) observador.observe(el)
    })
    return () => observador.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leccionId])

  function finalizarQuiz(score: number) {
    setQuizScore(score)
    registrarQuiz(leccion.id, score)
    const nivel = score >= 70 ? 'PRACTICADO' : 'EN_APRENDIZAJE'
    leccion.conceptos.forEach((c) => actualizarDominio(c, nivel))
    if (score >= 70) {
      marcarLeccionCompletada(leccion.moduloId, leccion.id)
      sincronizarModulosCompletados(moduloLeccionesMap())
    }
  }

  const programaTerminado = quizScore !== null && quizScore >= 70 && programaCompleto([...completedLessons, leccion.id])

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 xl:grid-cols-[minmax(0,48rem)_14rem]">
      <article className="min-w-0">
        <nav aria-label="Ubicación" className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
          <Link to="/curso" className="hover:text-slate-200">
            Inicio
          </Link>
          <span aria-hidden="true">/</span>
          {curso ? (
            <Link to={`/cursos/${curso.id}`} className="hover:text-slate-200">
              {curso.titulo}
            </Link>
          ) : null}
          <span aria-hidden="true">/</span>
          <span className="text-slate-300">
            Módulo {numeroModulo} · {modulo?.titulo}
          </span>
        </nav>

        <div className="mt-3 flex items-center justify-between gap-3">
          {anterior ? (
            <button onClick={() => navigate(`/leccion/${anterior.id}`)} className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-slate-300 hover:bg-surface-raised hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
              ← Anterior
            </button>
          ) : (
            <span />
          )}
          {siguiente && (
            <button onClick={() => navigate(`/leccion/${siguiente.id}`)} className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-slate-300 hover:bg-surface-raised hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
              Siguiente →
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-50 sm:text-3xl">{leccion.titulo}</h1>
          {completada && <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">✓ Completada{mejorPuntaje !== undefined ? ` · ${mejorPuntaje} %` : ''}</span>}
        </div>

        <Seccion id="objetivo" titulo="Objetivo">
          {leccion.objetivo}
        </Seccion>
        <Seccion id="por-que-importa" titulo="¿Por qué importa?">
          {leccion.porQueImporta}
        </Seccion>

        <Seccion id="concepto" titulo="Concepto">
          <div className="prose prose-invert prose-slate max-w-none prose-pre:bg-slate-950">
            <ReactMarkdown>{leccion.concepto}</ReactMarkdown>
          </div>
        </Seccion>

        <ReferenciaRelacionada leccionId={leccion.id} />

        <Seccion id="ejemplo-minimo" titulo="Ejemplo mínimo">
          <CodeBlock code={leccion.ejemploMinimo} />
        </Seccion>

        <Seccion id="ejemplo-aplicado" titulo="Ejemplo aplicado a datos">
          <CodeBlock code={leccion.ejemploAplicado} />
        </Seccion>

        <Seccion id="error-frecuente" titulo="Error frecuente">
          <CodeBlock code={leccion.errorFrecuente.codigo} />
          <p className="mt-2 text-sm text-slate-300">{leccion.errorFrecuente.explicacion}</p>
        </Seccion>

        <Seccion id="practica-guiada" titulo="Práctica guiada">
          <ExerciseBlock exercise={leccion.practicaGuiada} lessonId={leccion.id} titulo="Completa el código" />
        </Seccion>

        <Seccion id="reto" titulo="Reto">
          <ExerciseBlock exercise={leccion.reto} lessonId={leccion.id} titulo="Resuélvelo por tu cuenta" />
        </Seccion>

        <Seccion id="verificacion" titulo="Verificación">
          <QuizBlock key={quizKey} preguntas={leccion.verificacion} onFinish={finalizarQuiz} />
          {quizScore !== null && (
            <div role="status" className={`mt-4 rounded-xl border p-4 ${quizScore >= 70 ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-amber-500/40 bg-amber-500/10'}`}>
              <p className="font-semibold text-slate-50">
                {quizScore >= 70 ? '✅ ¡Lección completada!' : '📖 Casi lo logras'} · Resultado: {quizScore} %
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {quizScore >= 70 ? 'Quedó marcada como completada en tu progreso.' : 'Necesitas 70 % o más para completarla. Repasa el concepto y vuelve a intentarlo.'}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {quizScore < 70 && (
                  <Boton variante="secundario" onClick={() => { setQuizScore(null); setQuizKey((k) => k + 1) }}>
                    Volver a intentar
                  </Boton>
                )}
                {quizScore >= 70 && programaTerminado && (
                  <Link to="/certificado" className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">
                    🎓 ¡Completaste el programa! Obtener mi certificado
                  </Link>
                )}
                {quizScore >= 70 && !programaTerminado && siguiente && (
                  <Link to={`/leccion/${siguiente.id}`} className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-brand-500">
                    Siguiente lección →
                  </Link>
                )}
              </div>
            </div>
          )}
        </Seccion>

        <Seccion id="resumen" titulo="Resumen">
          <ul className="list-inside list-disc space-y-1 text-slate-300">
            {leccion.resumen.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </Seccion>

        <Seccion id="proximo-paso" titulo="Próximo paso">
          <p className="text-slate-300">{leccion.proximoPaso}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {anterior && (
              <Boton variante="secundario" onClick={() => navigate(`/leccion/${anterior.id}`)}>
                ← Lección anterior
              </Boton>
            )}
            {siguiente ? (
              <Boton onClick={() => navigate(`/leccion/${siguiente.id}`)}>Ir a la siguiente lección →</Boton>
            ) : (
              <Link to="/curso" className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-brand-500">
                Volver al mapa del curso
              </Link>
            )}
            <Boton variante="secundario" onClick={() => setShowTutor((v) => !v)} aria-expanded={showTutor}>
              {showTutor ? 'Ocultar tutor IA' : '¿Dudas? Habla con el tutor IA'}
            </Boton>
          </div>
        </Seccion>

        {showTutor && (
          <Suspense fallback={<p className="mt-6 text-sm text-slate-400">Cargando el tutor IA…</p>}>
            <AITutorPanel leccionContexto={leccion} />
          </Suspense>
        )}
      </article>

      <aside className="hidden xl:block" aria-label="En esta lección">
        <nav className="sticky top-20">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">En esta lección</p>
          <ul className="space-y-0.5 border-l border-surface-border">
            {secciones.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  aria-current={seccionActiva === sec.id ? 'true' : undefined}
                  className={`-ml-px block border-l-2 py-1 pl-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                    seccionActiva === sec.id ? 'border-brand-400 font-medium text-brand-200' : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sec.titulo}
                </a>
              </li>
            ))}
          </ul>
          <Link to="/referencia" className="mt-5 block rounded-lg border border-surface-border px-3 py-2 text-sm text-slate-300 hover:border-slate-500 hover:text-white">
            📚 Guía de referencia
          </Link>
        </nav>
      </aside>
    </div>
  )
}

/** Entradas de la guía de referencia que se relacionan con esta lección. */
function ReferenciaRelacionada({ leccionId }: { leccionId: string }) {
  const [items, setItems] = useState<Array<{ id: string; nombre: string; resumen: string; coleccion: string }>>([])

  useEffect(() => {
    let activo = true
    setItems([])
    cargarTodasLasColecciones().then(
      (colecciones) => {
        if (!activo) return
        setItems(
          colecciones.flatMap((c) =>
            c.entradas.filter((e) => e.lecciones?.includes(leccionId)).map((e) => ({ id: e.id, nombre: e.nombre, resumen: e.resumen, coleccion: c.id })),
          ),
        )
      },
      () => undefined,
    )
    return () => {
      activo = false
    }
  }, [leccionId])

  if (items.length === 0) return null
  return (
    <section aria-labelledby="titulo-ref-relacionada" className="mt-8 rounded-xl border border-surface-border bg-surface-raised/50 p-4">
      <h2 id="titulo-ref-relacionada" className="text-sm font-semibold text-slate-200">
        📚 Consulta rápida: funciones de esta lección
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.slice(0, 14).map((it) => (
          <li key={it.id}>
            <Link to={`/referencia/${it.coleccion}#${it.id}`} title={it.resumen} className="inline-block rounded-md border border-surface-border bg-surface px-2.5 py-1 font-mono text-xs text-brand-300 hover:border-brand-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
              {it.nombre.split(' / ')[0]}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Seccion({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="mt-9 scroll-mt-20">
      <h2 id={`${id}-titulo`} className="mb-2 text-lg font-bold text-slate-100">
        {titulo}
      </h2>
      {typeof children === 'string' ? <p className="leading-relaxed text-slate-300">{children}</p> : children}
    </section>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg border border-surface-border bg-surface p-3 pr-24 font-mono text-sm text-slate-300">{code}</pre>
      <div className="absolute right-2 top-2">
        <BotonCopiar texto={code} />
      </div>
    </div>
  )
}
