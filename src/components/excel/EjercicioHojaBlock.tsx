import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { comprobarEjercicio, posicionDeCelda, columnaALetras } from '../../excel'
import type { EjercicioHoja } from '../../excel'
import { useProgressStore } from '../../state/progressStore'
import { BotonCopiar } from '../referencia/BotonCopiar'
import { Boton } from '../ui'
import { HojaCalculo, hojaATabulado } from './HojaCalculo'

interface Props {
  ejercicio: EjercicioHoja
  lessonId: string
  titulo: string
}

/** Ejercicio de Excel: el estudiante escribe una fórmula y el motor la calcula sobre los datos de la hoja. */
export function EjercicioHojaBlock({ ejercicio, lessonId, titulo }: Props) {
  const [formula, setFormula] = useState(ejercicio.formulaInicial)
  const [comprobada, setComprobada] = useState<{ ok: boolean; mensaje: string } | null>(null)
  const [pistasVisibles, setPistasVisibles] = useState(0)
  const [mostrarSolucion, setMostrarSolucion] = useState(false)
  const registrarIntento = useProgressStore((s) => s.registrarIntentoEjercicio)

  // Vista previa en vivo: el resultado que da la fórmula tal como está escrita
  const vista = useMemo(() => comprobarEjercicio(ejercicio, formula), [ejercicio, formula])
  const origen = posicionDeCelda(ejercicio.celda)
  const extra: Record<string, string> = {}
  vista.resultados.forEach((texto, i) => {
    extra[`${columnaALetras(origen.col)}${origen.fila + i + 1}`] = texto
  })

  function alComprobar(e?: FormEvent) {
    e?.preventDefault()
    const r = comprobarEjercicio(ejercicio, formula)
    setComprobada({ ok: r.ok, mensaje: r.mensaje })
    registrarIntento({ exerciseId: ejercicio.id, lessonId, timestamp: Date.now(), correcto: r.ok })
  }

  const modificado = formula !== ejercicio.formulaInicial
  const idCampo = `formula-${ejercicio.id}`

  return (
    <div className="space-y-3 rounded-xl border border-surface-border bg-surface-raised/50 p-4">
      <h3 className="font-semibold text-slate-100">{titulo}</h3>
      <p className="text-slate-300">{ejercicio.enunciado}</p>

      <HojaCalculo hoja={ejercicio.hoja} resaltar={ejercicio.celda} extra={extra} titulo={`Hoja del ejercicio: ${titulo}`} />
      <div className="flex justify-end">
        <BotonCopiar texto={hojaATabulado(ejercicio.hoja)} etiqueta="Copiar los datos para pegarlos en Excel" />
      </div>

      <form onSubmit={alComprobar} className="space-y-3">
        <label htmlFor={idCampo} className="block text-sm font-medium text-slate-200">
          Escribe la fórmula para la celda <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-brand-300">{ejercicio.celda}</span>
          {ejercicio.rellenarFilas && ejercicio.rellenarFilas > 1 && <span className="text-slate-400"> (se copiará hacia abajo {ejercicio.rellenarFilas} filas, como al arrastrar el controlador de relleno)</span>}
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/30">
          <span aria-hidden="true" className="select-none font-serif italic text-slate-500">
            fx
          </span>
          <input
            id={idCampo}
            value={formula}
            onChange={(e) => {
              setFormula(e.target.value)
              setComprobada(null)
            }}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            className="min-w-0 flex-1 bg-transparent py-2.5 font-mono text-slate-100 placeholder-slate-500 focus:outline-none"
            placeholder="=SUMA(B2:B6)"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Boton type="submit">✔ Comprobar fórmula</Boton>
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
            disabled={!modificado}
            onClick={() => {
              setFormula(ejercicio.formulaInicial)
              setComprobada(null)
            }}
          >
            Restablecer
          </Boton>
        </div>
      </form>

      {formula.trim().length > 1 && vista.resultados.length > 0 && (
        <p className="text-sm text-slate-400" aria-live="polite">
          Resultado actual: <span className="font-mono font-semibold text-slate-200">{vista.resultados.length === 1 ? vista.resultados[0] || '(vacío)' : vista.resultados.join(' · ')}</span>
        </p>
      )}

      {comprobada && (
        <p
          role="status"
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${
            comprobada.ok ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-amber-500/40 bg-amber-500/10 text-amber-300'
          }`}
        >
          {comprobada.ok ? '✅ ' : '⚠️ '}
          {comprobada.mensaje}
        </p>
      )}

      {pistasVisibles > 0 && (
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
          {ejercicio.pistas.slice(0, pistasVisibles).map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}

      {mostrarSolucion && (
        <div className="relative">
          <pre className="overflow-x-auto rounded-lg border border-surface-border bg-surface p-3 pr-24 font-mono text-sm text-slate-300">{ejercicio.solucion}</pre>
          <div className="absolute right-2 top-2">
            <BotonCopiar texto={ejercicio.solucion} />
          </div>
        </div>
      )}
    </div>
  )
}
