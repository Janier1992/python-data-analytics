import type { EjemploResuelto } from '../../calculo'
import { Grafico } from './Grafico'
import { TablaDatosVista } from './TablaDatosVista'
import { TextoMd } from './TextoMd'

/** Ejemplo resuelto paso a paso: datos, gráficos, procedimiento y conclusión. */
export function EjemploResueltoVista({ ejemplo }: { ejemplo: EjemploResuelto }) {
  return (
    <div className="space-y-3 rounded-xl border border-surface-border bg-surface-raised/50 p-4">
      {ejemplo.titulo && <h3 className="font-semibold text-slate-100">{ejemplo.titulo}</h3>}
      {ejemplo.datos?.map((t, i) => <TablaDatosVista key={i} tabla={t} />)}
      {ejemplo.graficos?.map((g, i) => <Grafico key={i} spec={g} />)}
      <ol className="space-y-3">
        {ejemplo.pasos.map((paso, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600/25 text-xs font-bold text-brand-200">
              {i + 1}
            </span>
            <TextoMd className="min-w-0 flex-1 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{paso}</TextoMd>
          </li>
        ))}
      </ol>
      {ejemplo.conclusion && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">
          <TextoMd className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{`**Conclusión.** ${ejemplo.conclusion}`}</TextoMd>
        </div>
      )}
    </div>
  )
}
