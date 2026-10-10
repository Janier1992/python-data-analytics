import { evaluarFormula, formatearValor, primerValor } from '../../excel'
import type { EjemploHoja } from '../../excel'
import { BotonCopiar } from '../referencia/BotonCopiar'
import { HojaCalculo, hojaATabulado } from './HojaCalculo'

/** Ejemplo de una lección de Excel: la hoja de datos y, debajo, cada fórmula con el resultado que calcula el motor. */
export function EjemploHojaVista({ ejemplo, titulo }: { ejemplo: EjemploHoja; titulo: string }) {
  return (
    <div className="space-y-3">
      <HojaCalculo hoja={ejemplo.hoja} titulo={`Datos del ejemplo: ${titulo}`} />
      <div className="flex justify-end">
        <BotonCopiar texto={hojaATabulado(ejemplo.hoja)} etiqueta="Copiar los datos para pegarlos en Excel" />
      </div>
      <div className="overflow-x-auto rounded-lg border border-surface-border">
        <table className="w-full min-w-max border-collapse text-sm">
          <caption className="sr-only">Fórmulas del ejemplo y su resultado</caption>
          <thead>
            <tr className="bg-surface text-left text-xs uppercase tracking-wide text-slate-400">
              <th scope="col" className="px-3 py-2">
                Fórmula
              </th>
              <th scope="col" className="px-3 py-2">
                Resultado
              </th>
            </tr>
          </thead>
          <tbody>
            {ejemplo.formulas.map((f, i) => {
              const r = evaluarFormula(f.formula, ejemplo.hoja)
              const texto = r.ok ? formatearValor(primerValor(r.valor), f.formato) : r.mensaje
              return (
                <tr key={i} className="border-t border-surface-border align-top">
                  <td className="px-3 py-2 font-mono text-slate-200">
                    {f.celda && <span className="mr-2 rounded bg-surface px-1.5 py-0.5 text-xs text-slate-400">{f.celda}</span>}
                    {f.formula}
                  </td>
                  <td className="px-3 py-2 font-mono font-semibold text-emerald-300">{texto === '' ? '(vacío)' : texto}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {ejemplo.nota && <p className="text-sm text-slate-400">{ejemplo.nota}</p>}
    </div>
  )
}
