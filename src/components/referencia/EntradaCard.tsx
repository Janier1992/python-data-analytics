import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { lessonIndex } from '../../content/generated'
import type { ColeccionRef, EntradaRef } from '../../content/reference'
import { Spinner } from '../ui'
import { BotonCopiar } from './BotonCopiar'

// El editor (CodeMirror) y Pyodide solo se cargan cuando alguien abre un ejemplo.
const EjemploEjecutable = lazy(() => import('./EjemploEjecutable').then((m) => ({ default: m.EjemploEjecutable })))

const TITULO_LECCION = new Map(lessonIndex.map((l) => [l.id, l.titulo]))

/** Resalta las palabras buscadas dentro de un texto. */
export function Resaltado({ texto, palabras }: { texto: string; palabras: string[] }) {
  if (palabras.length === 0) return <>{texto}</>
  const patron = new RegExp(`(${palabras.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return (
    <>
      {texto.split(patron).map((trozo, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-amber-400/25 px-0.5 text-amber-100">
            {trozo}
          </mark>
        ) : (
          <span key={i}>{trozo}</span>
        ),
      )}
    </>
  )
}

interface Props {
  entrada: EntradaRef
  coleccion: ColeccionRef
  abierta: boolean
  onAlternar: () => void
  palabras: string[]
  /** Muestra de qué colección es (cuando se busca en toda la guía). */
  mostrarColeccion?: boolean
  coleccionDe: (idEntrada: string) => { coleccion: ColeccionRef; entrada: EntradaRef } | undefined
}

export function EntradaCard({ entrada, coleccion, abierta, onAlternar, palabras, mostrarColeccion, coleccionDe }: Props) {
  const panelId = `panel-${entrada.id}`
  const lenguaje = coleccion.lenguaje
  const enlaceDirecto = `${window.location.origin}/referencia/${coleccion.id}#${entrada.id}`

  return (
    <article id={entrada.id} className="scroll-mt-24 rounded-xl border border-surface-border bg-surface-raised/60 transition hover:border-slate-600">
      <h3>
        <button
          type="button"
          onClick={onAlternar}
          aria-expanded={abierta}
          aria-controls={panelId}
          className="flex w-full items-start gap-3 rounded-xl px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          <span aria-hidden="true" className={`mt-1 text-xs text-slate-400 transition-transform ${abierta ? 'rotate-90' : ''}`}>
            ▶
          </span>
          <span className="min-w-0 flex-1">
            <span className="block break-words font-mono text-sm font-semibold text-brand-300">
              <Resaltado texto={entrada.nombre} palabras={palabras} />
            </span>
            <span className="mt-0.5 block text-sm text-slate-300">
              <Resaltado texto={entrada.resumen} palabras={palabras} />
            </span>
          </span>
          {mostrarColeccion && (
            <span className="hidden shrink-0 rounded-full bg-surface px-2.5 py-1 text-xs text-slate-400 sm:block">
              {coleccion.icono} {coleccion.titulo.split(' (')[0]}
            </span>
          )}
        </button>
      </h3>

      {abierta && (
        <div id={panelId} className="space-y-4 border-t border-surface-border px-4 pb-4 pt-3">
          {entrada.firma && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Sintaxis</p>
              <pre className="overflow-x-auto rounded-lg border border-surface-border bg-surface p-3 font-mono text-sm text-emerald-300">{entrada.firma}</pre>
            </div>
          )}

          {entrada.descripcion && <p className="text-sm leading-relaxed text-slate-300">{entrada.descripcion}</p>}

          {entrada.parametros && entrada.parametros.length > 0 && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Parámetros</p>
              <div className="overflow-x-auto rounded-lg border border-surface-border">
                <table className="w-full min-w-[28rem] text-left text-sm">
                  <thead className="bg-surface text-xs text-slate-400">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-medium">Nombre</th>
                      <th scope="col" className="px-3 py-2 font-medium">Qué hace</th>
                      <th scope="col" className="px-3 py-2 font-medium">Por defecto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {entrada.parametros.map((p) => (
                      <tr key={p.nombre}>
                        <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-xs text-brand-300">{p.nombre}</td>
                        <td className="px-3 py-2 align-top text-slate-300">{p.descripcion}</td>
                        <td className="px-3 py-2 align-top font-mono text-xs text-slate-400">{p.porDefecto ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Ejemplo</p>
            {lenguaje === 'bash' ? (
              <div className="space-y-2">
                <pre className="overflow-x-auto rounded-lg border border-surface-border bg-surface p-3 font-mono text-sm text-slate-200">{entrada.ejemplo}</pre>
                <BotonCopiar texto={entrada.ejemplo} etiqueta="Copiar" />
              </div>
            ) : (
              <Suspense fallback={<p className="flex items-center gap-2 text-sm text-slate-400"><Spinner /> Cargando el editor…</p>}>
                <EjemploEjecutable codigo={entrada.ejemplo} lenguaje={lenguaje} />
              </Suspense>
            )}
          </div>

          {entrada.salida !== undefined && lenguaje !== 'bash' && (
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Resultado del ejemplo</p>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-surface-border bg-surface p-3 font-mono text-sm text-slate-300">{entrada.salida}</pre>
            </div>
          )}

          {entrada.notas && entrada.notas.length > 0 && (
            <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-300">A tener en cuenta</p>
              <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                {entrada.notas.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          )}

          {(entrada.relacionadas?.length || entrada.lecciones?.length) && (
            <div className="flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-6">
              {entrada.relacionadas && entrada.relacionadas.length > 0 && (
                <div>
                  <span className="text-slate-400">Relacionado: </span>
                  {entrada.relacionadas.map((id) => {
                    const destino = coleccionDe(id)
                    if (!destino) return null
                    return (
                      <Link
                        key={id}
                        to={`/referencia/${destino.coleccion.id}#${id}`}
                        className="mr-2 inline-block rounded-md bg-surface px-2 py-0.5 font-mono text-xs text-brand-300 hover:bg-surface-border"
                      >
                        {destino.entrada.nombre.split(' / ')[0]}
                      </Link>
                    )
                  })}
                </div>
              )}
              {entrada.lecciones && entrada.lecciones.length > 0 && (
                <div>
                  <span className="text-slate-400">Se explica en: </span>
                  {entrada.lecciones.map((id) =>
                    TITULO_LECCION.has(id) ? (
                      <Link key={id} to={`/leccion/${id}`} className="mr-2 inline-block text-xs text-brand-400 underline-offset-2 hover:underline">
                        {TITULO_LECCION.get(id)}
                      </Link>
                    ) : null,
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <BotonCopiar texto={enlaceDirecto} etiqueta="🔗 Copiar enlace" />
          </div>
        </div>
      )}
    </article>
  )
}
