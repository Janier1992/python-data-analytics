import { useMemo } from 'react'
import { columnaALetras, contextoDeHoja, formatearCelda, formatearValor, posicionDeCelda } from '../../excel'
import type { FormatoSalida, Hoja } from '../../excel'

interface Props {
  hoja: Hoja
  /** Celda que se destaca (por ejemplo «E2», donde va la fórmula del ejercicio). */
  resaltar?: string
  /** Texto a mostrar en celdas que no están en la hoja (resultados de la fórmula del estudiante), por ejemplo { E2: '1000' }. */
  extra?: Record<string, string>
  /** Cuántas columnas mínimas mostrar (para que quepa la celda de la fórmula). */
  titulo: string
}

/** Muestra una hoja de cálculo de solo lectura con encabezados de columna (A, B, C…) y números de fila. */
export function HojaCalculo({ hoja, resaltar, extra, titulo }: Props) {
  const ctx = useMemo(() => contextoDeHoja(hoja), [hoja])
  const posResaltada = resaltar ? posicionDeCelda(resaltar) : null
  const claves = Object.keys(extra ?? {}).map((k) => ({ clave: k, ...posicionDeCelda(k) }))

  const filasDatos = hoja.celdas.length
  const colsDatos = Math.max(1, ...hoja.celdas.map((f) => f.length))
  const filas = Math.max(filasDatos, ...claves.map((c) => c.fila + 1), posResaltada ? posResaltada.fila + 1 : 0)
  const cols = Math.max(colsDatos, ...claves.map((c) => c.col + 1), posResaltada ? posResaltada.col + 1 : 0)

  return (
    <div className="overflow-x-auto rounded-lg border border-surface-border" role="region" aria-label={titulo} tabIndex={0}>
      <table className="w-full min-w-max border-collapse text-sm">
        <thead>
          <tr>
            <th scope="col" className="w-10 border-b border-r border-surface-border bg-surface px-2 py-1 text-center text-xs font-medium text-slate-500" />
            {Array.from({ length: cols }, (_, c) => (
              <th key={c} scope="col" className="border-b border-r border-surface-border bg-surface px-3 py-1 text-center text-xs font-medium text-slate-400">
                {columnaALetras(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: filas }, (_, f) => (
            <tr key={f}>
              <th scope="row" className="border-b border-r border-surface-border bg-surface px-2 py-1 text-center text-xs font-medium text-slate-400">
                {f + 1}
              </th>
              {Array.from({ length: cols }, (_, c) => {
                const crudo = hoja.celdas[f]?.[c]
                const clave = `${columnaALetras(c)}${f + 1}`
                const extraTexto = extra?.[clave]
                const esFormula = typeof crudo === 'string' && crudo.startsWith('=')
                const objetivo = posResaltada !== null && posResaltada.fila === f && posResaltada.col === c
                const dentro = crudo !== undefined && crudo !== null
                let texto = ''
                if (extraTexto !== undefined && !dentro) texto = extraTexto
                else if (esFormula) texto = formatearValor(ctx.celda(f, c))
                else if (dentro) texto = formatearCelda(crudo)
                const esNumero = typeof crudo === 'number' || (esFormula && typeof ctx.celda(f, c) === 'number') || (extraTexto !== undefined && /^-?[\d.,]+( %)?$/.test(extraTexto))
                const esEncabezado = hoja.encabezado && f === 0
                return (
                  <td
                    key={c}
                    title={esFormula ? (crudo as string) : undefined}
                    className={`whitespace-nowrap border-b border-r border-surface-border px-3 py-1 ${esNumero ? 'text-right tabular-nums' : 'text-left'} ${
                      esEncabezado ? 'bg-surface font-semibold text-slate-100' : 'text-slate-300'
                    } ${objetivo ? 'bg-brand-600/15 outline outline-2 -outline-offset-2 outline-brand-400' : ''} ${extraTexto !== undefined && !dentro ? 'font-semibold text-emerald-300' : ''}`}
                  >
                    {texto}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Hoja en texto separado por tabuladores (se puede pegar directamente en Excel). */
export function hojaATabulado(hoja: Hoja): string {
  return hoja.celdas
    .map((fila) =>
      fila
        .map((v) => {
          if (v === null || v === undefined) return ''
          if (typeof v === 'object') return v.fecha // AAAA-MM-DD: Excel lo reconoce como fecha
          if (typeof v === 'number') return String(v).replace('.', (1.5).toLocaleString(navigator.language).charAt(1))
          return String(v)
        })
        .join('\t'),
    )
    .join('\n')
}

export type { FormatoSalida }
