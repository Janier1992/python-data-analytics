import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { cargarTodasLasColecciones, metaColecciones } from '../../content/reference'
import type { ColeccionRef, EntradaRef, LenguajeRef } from '../../content/reference'
import { buscar, palabrasDe } from '../../lib/busqueda'
import { Boton, Spinner } from '../ui'
import { EntradaCard } from './EntradaCard'

const FILTROS: Array<{ valor: LenguajeRef | 'todas'; etiqueta: string }> = [
  { valor: 'todas', etiqueta: 'Todo' },
  { valor: 'python', etiqueta: 'Python' },
  { valor: 'sql', etiqueta: 'SQL' },
  { valor: 'bash', etiqueta: 'Terminal y Git' },
]

const slug = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

type Item = { entrada: EntradaRef; coleccion: ColeccionRef }

export function ReferenciaPage() {
  const { coleccionId } = useParams()
  const [params, setParams] = useSearchParams()
  const ubicacion = useLocation()
  const consulta = params.get('q') ?? ''
  const filtro = (params.get('lang') as LenguajeRef | null) ?? 'todas'

  const [colecciones, setColecciones] = useState<ColeccionRef[] | null>(null)
  const [error, setError] = useState(false)
  const [intento, setIntento] = useState(0)
  const [abiertas, setAbiertas] = useState<Set<string>>(new Set())
  const [enTodas, setEnTodas] = useState(false)
  const buscadorRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let activo = true
    setError(false)
    cargarTodasLasColecciones().then(
      (c) => activo && setColecciones(c),
      () => activo && setError(true),
    )
    return () => {
      activo = false
    }
  }, [intento])

  // Atajo: "/" enfoca el buscador (si no se está escribiendo en otro campo)
  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => {
      const destino = e.target as HTMLElement
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(destino.tagName) && !destino.isContentEditable && !destino.closest('.cm-editor')) {
        e.preventDefault()
        buscadorRef.current?.focus()
      }
    }
    document.addEventListener('keydown', alTeclear)
    return () => document.removeEventListener('keydown', alTeclear)
  }, [])

  const indice = useMemo(() => {
    const mapa = new Map<string, Item>()
    colecciones?.forEach((c) => c.entradas.forEach((e) => mapa.set(e.id, { entrada: e, coleccion: c })))
    return mapa
  }, [colecciones])

  const coleccionActual = colecciones?.find((c) => c.id === coleccionId)
  const coleccionInvalida = Boolean(coleccionId) && Boolean(colecciones) && !coleccionActual

  // Abre y muestra la entrada indicada en el enlace (#id)
  useEffect(() => {
    const id = decodeURIComponent(ubicacion.hash.replace('#', ''))
    if (!id || !indice.has(id)) return
    setAbiertas((previas) => new Set(previas).add(id))
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    return () => window.clearTimeout(t)
  }, [ubicacion.hash, indice, coleccionId])

  const actualizarParametro = useCallback(
    (clave: string, valor: string) => {
      const siguiente = new URLSearchParams(params)
      if (valor && valor !== 'todas') siguiente.set(clave, valor)
      else siguiente.delete(clave)
      setParams(siguiente, { replace: true })
    },
    [params, setParams],
  )

  const alcance: Item[] = useMemo(() => {
    if (!colecciones) return []
    const fuentes = coleccionActual && !enTodas ? [coleccionActual] : colecciones.filter((c) => filtro === 'todas' || c.lenguaje === filtro)
    return fuentes.flatMap((c) => c.entradas.map((entrada) => ({ entrada, coleccion: c })))
  }, [colecciones, coleccionActual, enTodas, filtro])

  const palabras = useMemo(() => palabrasDe(consulta), [consulta])
  const resultados = useMemo(() => {
    if (palabras.length === 0) return null
    const encontrados = buscar(
      alcance.map((i) => ({ ...i.entrada, __c: i.coleccion })),
      consulta,
    )
    return encontrados.map((r) => ({ entrada: r.entrada as EntradaRef, coleccion: (r.entrada as unknown as { __c: ColeccionRef }).__c }))
  }, [alcance, consulta, palabras.length])

  const coleccionDe = useCallback((id: string) => indice.get(id), [indice])
  const alternar = (id: string) =>
    setAbiertas((previas) => {
      const nuevas = new Set(previas)
      if (nuevas.has(id)) nuevas.delete(id)
      else nuevas.add(id)
      return nuevas
    })

  if (error) {
    return (
      <div className="mx-auto max-w-3xl p-8 text-slate-300" role="alert">
        No se pudo cargar la guía de referencia. Revisa tu conexión.{' '}
        <button onClick={() => setIntento((n) => n + 1)} className="text-brand-400 underline">
          Reintentar
        </button>
      </div>
    )
  }

  const visibles = resultados ?? (coleccionActual ? alcance : [])
  const grupos = new Map<string, Item[]>()
  if (!resultados && coleccionActual) {
    for (const item of visibles) grupos.set(item.entrada.grupo, [...(grupos.get(item.entrada.grupo) ?? []), item])
  }
  const todasAbiertas = visibles.length > 0 && visibles.every((i) => abiertas.has(i.entrada.id))

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header>
        <p className="text-sm font-medium text-brand-400">Material de apoyo</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-50">Guía de referencia</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Qué hace cada función, método, parámetro o sentencia de Python y SQL, con un ejemplo que puedes ejecutar y modificar sin salir de la página.
        </p>
      </header>

      <div role="search" className="mt-6">
        <label htmlFor="buscador-referencia" className="sr-only">
          Buscar en la guía de referencia
        </label>
        <div className="relative">
          <svg className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            ref={buscadorRef}
            id="buscador-referencia"
            type="search"
            value={consulta}
            onChange={(e) => actualizarParametro('q', e.target.value)}
            placeholder={coleccionActual && !enTodas ? `Buscar en ${coleccionActual.titulo}…  (ej: groupby, merge, WHERE)` : 'Buscar una función, método o parámetro…  (ej: head, groupby, JOIN)'}
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-xl border border-surface-border bg-surface-raised py-3 pl-11 pr-24 text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
          {consulta ? (
            <button type="button" onClick={() => actualizarParametro('q', '')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
              Borrar
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-surface-border px-1.5 py-0.5 text-xs text-slate-400 sm:block">/</kbd>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {!coleccionActual &&
            FILTROS.map((f) => (
              <button
                key={f.valor}
                type="button"
                onClick={() => actualizarParametro('lang', f.valor)}
                aria-pressed={filtro === f.valor}
                className={`rounded-full border px-3 py-1 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                  filtro === f.valor ? 'border-brand-500 bg-brand-600/20 text-brand-200' : 'border-surface-border text-slate-300 hover:border-slate-500'
                }`}
              >
                {f.etiqueta}
              </button>
            ))}
        </div>
      </div>

      <nav aria-label="Colecciones de la guía" className="mt-5 flex gap-2 overflow-x-auto pb-1">
        <Link
          to={{ pathname: '/referencia', search: params.toString() ? `?${params.toString()}` : '' }}
          aria-current={!coleccionId ? 'page' : undefined}
          className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition ${!coleccionId ? 'bg-brand-600 text-white' : 'bg-surface-raised text-slate-300 hover:bg-surface-border'}`}
        >
          Todas
        </Link>
        {metaColecciones.map((m) => (
          <Link
            key={m.id}
            to={{ pathname: `/referencia/${m.id}`, search: consulta ? `?q=${encodeURIComponent(consulta)}` : '' }}
            aria-current={coleccionId === m.id ? 'page' : undefined}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition ${coleccionId === m.id ? 'bg-brand-600 text-white' : 'bg-surface-raised text-slate-300 hover:bg-surface-border'}`}
          >
            <span aria-hidden="true">{m.icono}</span> {m.titulo.split(' (')[0]}
          </Link>
        ))}
      </nav>

      <div className="mt-6" aria-live="polite">
        {!colecciones && (
          <p className="flex items-center gap-2 text-slate-400" role="status">
            <Spinner /> Cargando la guía…
          </p>
        )}

        {coleccionInvalida && (
          <p className="text-slate-300">
            No existe esa colección. <Link to="/referencia" className="text-brand-400 underline">Ver todas</Link>
          </p>
        )}

        {/* Vista general: tarjetas de cada colección */}
        {colecciones && !coleccionId && !resultados && (
          <div className="grid gap-3 sm:grid-cols-2">
            {colecciones
              .filter((c) => filtro === 'todas' || c.lenguaje === filtro)
              .map((c) => (
                <Link
                  key={c.id}
                  to={`/referencia/${c.id}`}
                  className="group min-w-0 rounded-2xl border border-surface-border bg-surface-raised/60 p-5 transition hover:border-brand-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                >
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="text-2xl">{c.icono}</span>
                    <h2 className="font-semibold text-slate-100 group-hover:text-white">{c.titulo}</h2>
                    <span className="ml-auto rounded-full bg-surface px-2.5 py-0.5 text-xs text-slate-400">{c.entradas.length} entradas</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{c.descripcion}</p>
                  <p className="mt-3 truncate font-mono text-xs text-slate-400">
                    {c.entradas.slice(0, 4).map((e) => e.nombre.split(' / ')[0]).join(' · ')}…
                  </p>
                </Link>
              ))}
          </div>
        )}

        {/* Encabezado de la colección */}
        {coleccionActual && (
          <section aria-labelledby="titulo-coleccion" className="mb-5 rounded-2xl border border-surface-border bg-surface-raised/60 p-5">
            <h2 id="titulo-coleccion" className="flex items-center gap-2 text-xl font-bold text-slate-50">
              <span aria-hidden="true">{coleccionActual.icono}</span> {coleccionActual.titulo}
            </h2>
            <p className="mt-1 text-slate-300">{coleccionActual.descripcion}</p>
            {coleccionActual.nota && <p className="mt-3 rounded-lg bg-surface px-3 py-2 text-sm text-slate-400">{coleccionActual.nota}</p>}
            {!resultados && grupos.size > 1 && (
              <nav aria-label="Secciones de la colección" className="mt-4 flex flex-wrap gap-2">
                {[...grupos.keys()].map((g) => (
                  <a key={g} href={`#grupo-${slug(g)}`} className="rounded-full border border-surface-border px-3 py-1 text-xs text-slate-300 hover:border-slate-500">
                    {g} <span className="text-slate-400">{grupos.get(g)!.length}</span>
                  </a>
                ))}
              </nav>
            )}
          </section>
        )}

        {/* Resultados de búsqueda */}
        {colecciones && resultados && (
          <p className="mb-3 text-sm text-slate-400">
            {resultados.length === 0 ? 'Sin resultados' : `${resultados.length} ${resultados.length === 1 ? 'resultado' : 'resultados'}`} para «{consulta}»
            {coleccionActual && !enTodas && (
              <>
                {' '}en {coleccionActual.titulo} ·{' '}
                <button type="button" onClick={() => setEnTodas(true)} className="text-brand-400 underline-offset-2 hover:underline">
                  buscar en toda la guía
                </button>
              </>
            )}
            {coleccionActual && enTodas && (
              <>
                {' '}
                ·{' '}
                <button type="button" onClick={() => setEnTodas(false)} className="text-brand-400 underline-offset-2 hover:underline">
                  limitar a {coleccionActual.titulo}
                </button>
              </>
            )}
          </p>
        )}

        {colecciones && resultados && resultados.length === 0 && (
          <div className="rounded-xl border border-dashed border-surface-border p-8 text-center text-slate-400">
            <p className="text-slate-200">No encontramos nada con esas palabras.</p>
            <p className="mt-1 text-sm">Prueba con una sola palabra, revisa la ortografía o busca por el nombre de la función (por ejemplo, «merge» o «WHERE»).</p>
            <Boton variante="secundario" onClick={() => actualizarParametro('q', '')} className="mt-4">
              Borrar búsqueda
            </Boton>
          </div>
        )}

        {colecciones && visibles.length > 0 && (
          <>
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setAbiertas((previas) => {
                    const nuevas = new Set(previas)
                    visibles.forEach((i) => (todasAbiertas ? nuevas.delete(i.entrada.id) : nuevas.add(i.entrada.id)))
                    return nuevas
                  })
                }
                className="text-sm text-brand-400 underline-offset-2 hover:underline"
              >
                {todasAbiertas ? 'Contraer todo' : 'Expandir todo'}
              </button>
            </div>

            {resultados ? (
              <ul className="space-y-2">
                {resultados.map(({ entrada, coleccion }) => (
                  <li key={entrada.id}>
                    <EntradaCard entrada={entrada} coleccion={coleccion} abierta={abiertas.has(entrada.id)} onAlternar={() => alternar(entrada.id)} palabras={palabras} mostrarColeccion={!coleccionActual || enTodas} coleccionDe={coleccionDe} />
                  </li>
                ))}
              </ul>
            ) : (
              [...grupos.entries()].map(([grupo, items]) => (
                <section key={grupo} id={`grupo-${slug(grupo)}`} aria-labelledby={`h-${slug(grupo)}`} className="mb-8 scroll-mt-24">
                  <h3 id={`h-${slug(grupo)}`} className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                    {grupo}
                  </h3>
                  <ul className="space-y-2">
                    {items.map(({ entrada, coleccion }) => (
                      <li key={entrada.id}>
                        <EntradaCard entrada={entrada} coleccion={coleccion} abierta={abiertas.has(entrada.id)} onAlternar={() => alternar(entrada.id)} palabras={[]} coleccionDe={coleccionDe} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))
            )}
          </>
        )}
      </div>
    </div>
  )
}
