import type { TablaDatos } from '../../calculo'

/** Tabla de datos de un ejemplo o ejercicio (con desplazamiento horizontal en pantallas pequeñas). */
export function TablaDatosVista({ tabla }: { tabla: TablaDatos }) {
  return (
    <figure className="my-3">
      <div className="overflow-x-auto rounded-lg border border-surface-border">
        <table className="w-full min-w-max border-collapse text-sm">
          {tabla.titulo && <caption className="px-3 py-2 text-left text-sm font-semibold text-slate-200">{tabla.titulo}</caption>}
          <thead className="bg-surface text-slate-300">
            <tr>
              {tabla.columnas.map((c) => (
                <th key={c} scope="col" className="border-b border-surface-border px-3 py-2 text-left font-semibold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tabla.filas.map((fila, i) => (
              <tr key={i} className={i % 2 ? 'bg-surface/40' : ''}>
                {fila.map((celda, j) => (
                  <td key={j} className={`border-b border-surface-border/60 px-3 py-1.5 text-slate-200 ${typeof celda === 'number' ? 'text-right tabular-nums' : ''}`}>
                    {celda}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tabla.nota && <figcaption className="mt-1 text-xs text-slate-400">{tabla.nota}</figcaption>}
    </figure>
  )
}
