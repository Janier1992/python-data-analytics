import { useState } from 'react'
import type { FormEvent } from 'react'
import { comprobarCalculo } from '../../calculo'
import type { EjercicioCalculo, ResultadoEjercicio } from '../../calculo'
import { useProgressStore } from '../../state/progressStore'
import { Boton } from '../ui'
import { Calculadora } from './Calculadora'
import { Grafico } from './Grafico'
import { PantallaPBI } from './PantallaPBI'
import { TablaDatosVista } from './TablaDatosVista'
import { TextoMd } from './TextoMd'

interface Props {
  ejercicio: EjercicioCalculo
  lessonId: string
  titulo: string
}

/** Ejercicio de cálculo: datos en pantalla, respuestas numéricas o de opción y corrección inmediata. Sin programación. */
export function EjercicioCalculoBlock({ ejercicio, lessonId, titulo }: Props) {
  const vacias = () => ejercicio.preguntas.map(() => '')
  const [respuestas, setRespuestas] = useState<string[]>(vacias)
  const [resultado, setResultado] = useState<ResultadoEjercicio | null>(null)
  const [pistasVisibles, setPistasVisibles] = useState(0)
  const [mostrarSolucion, setMostrarSolucion] = useState(false)
  const [calculadora, setCalculadora] = useState(false)
  const registrarIntento = useProgressStore((s) => s.registrarIntentoEjercicio)

  function cambiar(i: number, valor: string) {
    setRespuestas((r) => r.map((x, j) => (j === i ? valor : x)))
    setResultado(null)
  }

  function alComprobar(e?: FormEvent) {
    e?.preventDefault()
    const r = comprobarCalculo(ejercicio, respuestas)
    setResultado(r)
    registrarIntento({ exerciseId: ejercicio.id, lessonId, timestamp: Date.now(), correcto: r.ok })
  }

  const hayRespuestas = respuestas.some((r) => r !== '')

  return (
    <div className="space-y-3 rounded-xl border border-surface-border bg-surface-raised/50 p-4">
      <h3 className="font-semibold text-slate-100">{titulo}</h3>
      <TextoMd className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{ejercicio.enunciado}</TextoMd>

      {ejercicio.datos?.map((t, i) => <TablaDatosVista key={i} tabla={t} />)}
      {ejercicio.pantallas?.map((p, i) => <PantallaPBI key={i} spec={p} />)}
      {ejercicio.graficos?.map((g, i) => <Grafico key={i} spec={g} />)}

      <form onSubmit={alComprobar} className="space-y-3">
        <div className="space-y-3">
          {ejercicio.preguntas.map((p, i) => {
            const id = `${ejercicio.id}-p${i}`
            const r = resultado?.resultados[i]
            const borde = r ? (r.ok ? 'border-emerald-500/60' : 'border-amber-500/60') : 'border-surface-border'
            if (p.tipo === 'opcion') {
              return (
                <fieldset key={id} className={`rounded-lg border ${borde} bg-surface p-3`}>
                  <legend className="px-1 text-sm font-medium text-slate-200"><TextoMd enLinea>{p.etiqueta}</TextoMd></legend>
                  <div className="mt-1 space-y-1.5">
                    {p.opciones.map((o, k) => (
                      <label key={o} className="flex cursor-pointer items-start gap-2 text-sm text-slate-300">
                        <input type="radio" name={id} checked={respuestas[i] === String(k)} onChange={() => cambiar(i, String(k))} className="mt-1 accent-brand-500" />
                        <TextoMd enLinea>{o}</TextoMd>
                      </label>
                    ))}
                  </div>
                  {r && <p className={`mt-2 text-xs ${r.ok ? 'text-emerald-300' : 'text-amber-300'}`}>{r.ok ? '✅' : '⚠️'} {r.mensaje}</p>}
                </fieldset>
              )
            }
            if (p.tipo === 'casillas') {
              const marcadas = respuestas[i] === '' ? [] : respuestas[i].split(',')
              const alternar = (k: number) => {
                const nuevas = marcadas.includes(String(k)) ? marcadas.filter((x) => x !== String(k)) : [...marcadas, String(k)]
                cambiar(i, nuevas.sort().join(','))
              }
              return (
                <fieldset key={id} className={`rounded-lg border ${borde} bg-surface p-3`}>
                  <legend className="px-1 text-sm font-medium text-slate-200"><TextoMd enLinea>{p.etiqueta}</TextoMd> <span className="text-xs font-normal text-slate-400">(marca todas las correctas)</span></legend>
                  <div className="mt-1 space-y-1.5">
                    {p.opciones.map((o, k) => (
                      <label key={o} className="flex cursor-pointer items-start gap-2 text-sm text-slate-300">
                        <input type="checkbox" checked={marcadas.includes(String(k))} onChange={() => alternar(k)} className="mt-1 accent-brand-500" />
                        <TextoMd enLinea>{o}</TextoMd>
                      </label>
                    ))}
                  </div>
                  {r && <p className={`mt-2 text-xs ${r.ok ? 'text-emerald-300' : 'text-amber-300'}`}>{r.ok ? '✅' : '⚠️'} {r.mensaje}</p>}
                </fieldset>
              )
            }
            return (
              <div key={id} className={`rounded-lg border ${borde} bg-surface p-3`}>
                <label htmlFor={id} className="block text-sm font-medium text-slate-200">
                  <TextoMd enLinea>{p.etiqueta}</TextoMd>
                </label>
                <div className="mt-1.5 flex items-center gap-2">
                  <input
                    id={id}
                    value={respuestas[i]}
                    onChange={(e) => cambiar(i, e.target.value)}
                    inputMode="decimal"
                    autoComplete="off"
                    spellCheck={false}
                    className="w-40 rounded-md border border-surface-border bg-surface-raised px-3 py-2 font-mono text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    placeholder="Tu respuesta"
                  />
                  {p.unidad && <span className="text-sm text-slate-400">{p.unidad}</span>}
                </div>
                {r && <p className={`mt-2 text-xs ${r.ok ? 'text-emerald-300' : 'text-amber-300'}`}>{r.ok ? '✅' : '⚠️'} {r.mensaje}</p>}
              </div>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Boton type="submit">✔ Comprobar respuestas</Boton>
          <Boton variante="secundario" onClick={() => setCalculadora((v) => !v)} aria-expanded={calculadora}>
            🧮 {calculadora ? 'Ocultar calculadora' : 'Calculadora'}
          </Boton>
          {ejercicio.pistas.length > 0 && pistasVisibles < ejercicio.pistas.length && (
            <Boton variante="secundario" onClick={() => setPistasVisibles((n) => n + 1)}>
              💡 Pedir pista ({pistasVisibles}/{ejercicio.pistas.length})
            </Boton>
          )}
          <Boton variante="secundario" onClick={() => setMostrarSolucion((v) => !v)} aria-expanded={mostrarSolucion}>
            {mostrarSolucion ? 'Ocultar solución' : 'Ver solución'}
          </Boton>
          <Boton
            variante="fantasma"
            disabled={!hayRespuestas}
            onClick={() => {
              setRespuestas(vacias())
              setResultado(null)
            }}
          >
            Borrar respuestas
          </Boton>
        </div>
      </form>

      {calculadora && <Calculadora />}

      {resultado && (
        <p
          role="status"
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${resultado.ok ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/40 bg-amber-500/10 text-amber-300'}`}
        >
          {resultado.ok ? '✅ ' : '⚠️ '}
          {resultado.mensaje}
        </p>
      )}

      {pistasVisibles > 0 && (
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
          {ejercicio.pistas.slice(0, pistasVisibles).map((p, i) => (
            <li key={i}>
              <TextoMd className="inline [&>*]:inline">{p}</TextoMd>
            </li>
          ))}
        </ul>
      )}

      {mostrarSolucion && (
        <div className="rounded-lg border border-surface-border bg-surface p-3">
          <p className="mb-2 text-sm font-semibold text-slate-200">Solución paso a paso</p>
          <ol className="space-y-2">
            {ejercicio.solucion.map((paso, i) => (
              <li key={i} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-600/25 text-[11px] font-bold text-brand-200">
                  {i + 1}
                </span>
                <TextoMd className="min-w-0 flex-1 text-sm [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{paso}</TextoMd>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
