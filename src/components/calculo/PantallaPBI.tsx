import type { ReactNode } from 'react'
import type { PantallaSpec, VisualSpec } from '../../calculo'
import { marcasEje } from '../../calculo/graficos'

// Vistas ilustrativas de la interfaz de Power BI. No ejecutan nada: sirven para ver cómo se ve cada paso
// (editor de Power Query, vista de modelo, lienzo del informe y barra de fórmulas de DAX).

const fmtNum = (n: number) => new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2 }).format(n)
const AZUL = '#5a94ff'
const AMBAR = '#f5b942'
const TEXTO = '#cbd5e1'
const EJE = '#64748b'

function Ventana({ titulo, descripcion, children }: { titulo: string; descripcion: string; children: ReactNode }) {
  return (
    <figure className="my-3" aria-label={descripcion}>
      <div className="overflow-hidden rounded-xl border border-surface-border bg-slate-950 shadow-lg">
        <div className="flex items-center gap-2 border-b border-surface-border bg-surface px-3 py-1.5">
          <span aria-hidden="true" className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </span>
          <span className="truncate text-xs font-medium text-slate-300">{titulo}</span>
        </div>
        {children}
      </div>
      <figcaption className="mt-1 text-xs text-slate-400">Ilustración de la interfaz de Power BI: la plataforma no ejecuta Power BI, solo muestra cómo se ve cada paso.</figcaption>
    </figure>
  )
}

const ICONO_TIPO: Record<string, string> = { texto: 'ABC', entero: '123', decimal: '1.2', fecha: '📅', logico: 'V/F', cualquiera: 'ABC 123' }

// ───────── Power Query ─────────
function PowerQuery({ s }: { s: Extract<PantallaSpec, { tipo: 'powerquery' }> }) {
  const consultas = s.consultas ?? [s.consulta]
  return (
    <Ventana titulo={s.titulo ?? `Editor de Power Query — ${s.consulta}`} descripcion={`Editor de Power Query con la consulta ${s.consulta}, ${s.pasos.length} pasos aplicados y el paso «${s.pasos[s.pasoActivo]}» seleccionado`}>
      <div className="flex gap-4 border-b border-surface-border bg-surface/60 px-3 py-1 text-xs text-slate-400">
        {['Archivo', 'Inicio', 'Transformar', 'Agregar columna', 'Vista'].map((t) => (
          <span key={t} className={t === 'Inicio' ? 'border-b-2 border-amber-300 pb-0.5 font-semibold text-slate-100' : ''}>
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 border-b border-surface-border px-3 py-1 font-mono text-xs text-slate-300">
        <span className="text-slate-500">fx</span>
        <span className="min-w-0 truncate" title={s.formula}>{s.formula ?? ''}</span>
      </div>
      <div className="grid md:grid-cols-[120px_minmax(0,1fr)_200px]">
        <div className="border-b border-surface-border p-2 md:border-b-0 md:border-r">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Consultas [{consultas.length}]</p>
          <ul className="space-y-0.5 text-xs">
            {consultas.map((c) => (
              <li key={c} className={`truncate rounded px-1.5 py-0.5 ${c === s.consulta ? 'bg-amber-300/15 font-semibold text-amber-200' : 'text-slate-300'}`}>
                ▦ {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 overflow-x-auto">
          <table className="w-full min-w-max border-collapse text-xs">
            <thead>
              <tr>
                <th className="w-8 border-b border-r border-surface-border bg-surface/70" />
                {s.columnas.map((c) => (
                  <th key={c.nombre} className="border-b border-r border-surface-border bg-surface/70 px-2 py-1 text-left font-medium text-slate-200">
                    <span className="mr-1.5 rounded bg-slate-700 px-1 text-[10px] text-slate-300">{ICONO_TIPO[c.tipo]}</span>
                    {c.nombre}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.filas.map((f, i) => (
                <tr key={i}>
                  <td className="border-b border-r border-surface-border/60 bg-surface/40 px-1 text-center text-slate-500">{i + 1}</td>
                  {f.map((celda, j) => (
                    <td key={j} className={`border-b border-r border-surface-border/60 px-2 py-0.5 ${celda === null ? 'italic text-slate-500' : 'text-slate-200'} ${typeof celda === 'number' ? 'text-right tabular-nums' : ''}`}>
                      {celda === null ? 'null' : celda}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-surface-border p-2 md:border-l md:border-t-0">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Pasos aplicados</p>
          <ol className="space-y-0.5 text-xs">
            {s.pasos.map((p, i) => (
              <li
                key={`${p}-${i}`}
                aria-current={i === s.pasoActivo ? 'step' : undefined}
                className={`flex items-center gap-1.5 rounded px-1.5 py-0.5 ${i === s.pasoActivo ? 'bg-amber-300/20 font-semibold text-amber-100' : i > s.pasoActivo ? 'text-slate-500' : 'text-slate-300'}`}
              >
                <span aria-hidden="true" className="text-slate-500">{i < s.pasoActivo ? '✓' : i === s.pasoActivo ? '▶' : '·'}</span>
                <span className="min-w-0 truncate">{p}</span>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-[11px] text-slate-500">La vista previa muestra el resultado hasta el paso seleccionado.</p>
        </div>
      </div>
    </Ventana>
  )
}

// ───────── Vista de modelo ─────────
function Modelo({ s }: { s: Extract<PantallaSpec, { tipo: 'modelo' }> }) {
  const W = 640
  const BW = 156
  const FILA = 15
  const ENC = 24
  const maxCols = 7
  const alto = (t: { columnas: string[] }) => ENC + FILA * Math.min(t.columnas.length, maxCols) + (t.columnas.length > maxCols ? FILA : 0) + 6
  const hechos = s.tablas.filter((t) => t.rol === 'hechos')
  const dims = s.tablas.filter((t) => t.rol !== 'hechos')
  const izq = dims.filter((_, i) => i % 2 === 0)
  const der = dims.filter((_, i) => i % 2 === 1)
  const columna = (ts: typeof dims) => ts.reduce((a, t) => a + alto(t), 0) + (ts.length - 1) * 22
  const H = Math.max(columna(izq), columna(der), columna(hechos), 120) + 24
  const pos: Record<string, { x: number; y: number; h: number; lado: 'izq' | 'der' | 'centro' }> = {}
  const colocar = (ts: typeof dims, x: number, lado: 'izq' | 'der' | 'centro') => {
    let y = (H - columna(ts)) / 2
    for (const t of ts) {
      pos[t.nombre] = { x, y, h: alto(t), lado }
      y += alto(t) + 22
    }
  }
  colocar(izq, 12, 'izq')
  colocar(der, W - BW - 12, 'der')
  colocar(hechos, (W - BW) / 2, 'centro')
  const nombre = (ref: string) => ref.split('.')[0]
  return (
    <Ventana titulo={s.titulo ?? 'Vista de modelo'} descripcion={`Vista de modelo con ${s.tablas.length} tablas y ${s.relaciones.length} relaciones`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Diagrama del modelo de datos: tablas de hechos al centro y dimensiones alrededor, unidas por relaciones">
        <defs>
          <marker id="flecha-modelo" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill={AMBAR} />
          </marker>
        </defs>
        {s.relaciones.map((r, i) => {
          const a = pos[nombre(r.de)]
          const b = pos[nombre(r.a)]
          if (!a || !b) return null
          const card = r.cardinalidad ?? '*:1'
          const [cA, cB] = card.split(':')
          // extremos: lado del cuadro más cercano
          const aDer = a.x < b.x
          const x1 = aDer ? a.x + BW : a.x
          const x2 = aDer ? b.x : b.x + BW
          const y1 = a.y + a.h / 2
          const y2 = b.y + b.h / 2
          const flecha = r.direccion === 'ambas' ? { s: 'url(#flecha-modelo)', e: 'url(#flecha-modelo)' } : { s: undefined, e: undefined }
          // la flecha del filtro va de la tabla «1» hacia la tabla «*»
          const haciaA = cB === '1' && cA === '*'
          return (
            <g key={i} stroke={r.activa === false ? EJE : AMBAR} fill="none">
              <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.6" strokeDasharray={r.activa === false ? '5 4' : undefined} markerStart={flecha.s} markerEnd={flecha.e} />
              {r.direccion !== 'ambas' && (
                <polygon
                  points={haciaA ? `${x1 + (aDer ? 22 : -22)},${y1 + (y2 - y1) * 0.12} ${x1 + (aDer ? 12 : -12)},${y1 + (y2 - y1) * 0.12 - 5} ${x1 + (aDer ? 12 : -12)},${y1 + (y2 - y1) * 0.12 + 5}` : `${x2 + (aDer ? -22 : 22)},${y2 - (y2 - y1) * 0.12} ${x2 + (aDer ? -12 : 12)},${y2 - (y2 - y1) * 0.12 - 5} ${x2 + (aDer ? -12 : 12)},${y2 - (y2 - y1) * 0.12 + 5}`}
                  fill={r.activa === false ? EJE : AMBAR}
                  stroke="none"
                />
              )}
              <g fill={TEXTO} stroke="none" fontSize="12" fontWeight="700">
                <text x={x1 + (aDer ? 8 : -8)} y={y1 - 6} textAnchor={aDer ? 'start' : 'end'}>{cA}</text>
                <text x={x2 + (aDer ? -8 : 8)} y={y2 - 6} textAnchor={aDer ? 'end' : 'start'}>{cB}</text>
              </g>
            </g>
          )
        })}
        {s.tablas.map((t) => {
          const p = pos[t.nombre]
          const hechosT = t.rol === 'hechos'
          return (
            <g key={t.nombre}>
              <rect x={p.x} y={p.y} width={BW} height={p.h} rx="6" fill="#0f172a" stroke={hechosT ? AZUL : '#475569'} strokeWidth={hechosT ? 1.8 : 1.2} />
              <path d={`M${p.x},${p.y + ENC} V${p.y + 6} a6,6 0 0 1 6,-6 H${p.x + BW - 6} a6,6 0 0 1 6,6 V${p.y + ENC} Z`} fill={hechosT ? '#1d3a7a' : '#1e293b'} />
              <text x={p.x + 8} y={p.y + 16} fontSize="12" fontWeight="700" fill="#f1f5f9">{t.nombre}</text>
              <text x={p.x + BW - 8} y={p.y + 16} fontSize="9" textAnchor="end" fill="#94a3b8">{hechosT ? 'hechos' : 'dimensión'}</text>
              {t.columnas.slice(0, maxCols).map((c, i) => (
                <text key={c} x={p.x + 8} y={p.y + ENC + 12 + i * FILA} fontSize="11" fill={t.claves?.includes(c) ? AMBAR : TEXTO}>
                  {t.claves?.includes(c) ? '🔑 ' : ''}{c}
                </text>
              ))}
              {t.columnas.length > maxCols && <text x={p.x + 8} y={p.y + ENC + 12 + maxCols * FILA} fontSize="11" fill="#64748b">… {t.columnas.length - maxCols} más</text>}
            </g>
          )
        })}
      </svg>
      <p className="border-t border-surface-border px-3 py-1.5 text-[11px] text-slate-400">
        <span className="font-semibold text-slate-300">1</span> = lado «uno» · <span className="font-semibold text-slate-300">*</span> = lado «varios» · la flecha indica la dirección del filtro (de la dimensión hacia los hechos). Línea discontinua = relación inactiva.
      </p>
    </Ventana>
  )
}

// ───────── Informe ─────────
function Tarjeta({ v }: { v: Extract<VisualSpec, { tipo: 'tarjeta' }> }) {
  return (
    <div className="rounded-lg border border-surface-border bg-surface p-3">
      <p className="truncate text-[11px] text-slate-400">{v.titulo}</p>
      <p className="mt-0.5 text-2xl font-bold tabular-nums text-slate-100">{v.valor}</p>
      {v.variacion && <p className={`text-xs font-medium ${v.positivo === false ? 'text-rose-300' : 'text-emerald-300'}`}>{v.positivo === false ? '▼' : '▲'} {v.variacion}</p>}
    </div>
  )
}

function Barras({ v }: { v: Extract<VisualSpec, { tipo: 'barras' }> }) {
  const W = 300
  const H = 170
  const m = { izq: 38, der: 8, sup: 14, inf: 30 }
  const desde = v.ejeDesde ?? 0
  const max = Math.max(...v.valores)
  const marcas = marcasEje(desde, max, 4)
  const tope = marcas[marcas.length - 1] > max ? marcas[marcas.length - 1] : max
  const y = (val: number) => m.sup + (1 - (val - desde) / ((tope - desde) || 1)) * (H - m.sup - m.inf)
  const n = v.categorias.length
  const ancho = (W - m.izq - m.der) / n
  return (
    <div className="rounded-lg border border-surface-border bg-surface p-2">
      <p className="px-1 text-[11px] font-semibold text-slate-300">{v.titulo}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`${v.titulo}: ${v.categorias.map((c, i) => `${c} ${fmtNum(v.valores[i])}`).join(', ')}`}>
        {marcas.map((t) => (
          <g key={t} fontSize="9" fill={TEXTO}>
            <line x1={m.izq} x2={W - m.der} y1={y(t)} y2={y(t)} stroke={EJE} strokeOpacity="0.2" />
            <text x={m.izq - 4} y={y(t) + 3} textAnchor="end">{fmtNum(t)}</text>
          </g>
        ))}
        {v.valores.map((val, i) => (
          <g key={i}>
            <rect x={m.izq + i * ancho + ancho * 0.18} y={y(val)} width={ancho * 0.64} height={Math.max(0, H - m.inf - y(val))} fill={!v.resaltar || v.resaltar.includes(i) ? AZUL : '#475569'} rx="2" />
            <text x={m.izq + i * ancho + ancho / 2} y={H - m.inf + 12} fontSize="9" textAnchor="middle" fill={TEXTO}>{v.categorias[i]}</text>
            <text x={m.izq + i * ancho + ancho / 2} y={y(val) - 3} fontSize="9" textAnchor="middle" fill="#e2e8f0">{fmtNum(val)}</text>
          </g>
        ))}
      </svg>
      {desde !== 0 && <p className="px-1 text-[10px] text-amber-300">El eje empieza en {fmtNum(desde)}, no en 0.</p>}
    </div>
  )
}

const COLORES_SERIE = [AZUL, AMBAR, '#34d399', '#f472b6']
function Lineas({ v }: { v: Extract<VisualSpec, { tipo: 'lineas' }> }) {
  const W = 300
  const H = 170
  const m = { izq: 40, der: 8, sup: 14, inf: 30 }
  const todos = v.series.flatMap((s) => s.valores)
  const min = Math.min(0, ...todos)
  const marcas = marcasEje(min, Math.max(...todos), 4)
  const tope = Math.max(marcas[marcas.length - 1], Math.max(...todos))
  const y = (val: number) => m.sup + (1 - (val - min) / ((tope - min) || 1)) * (H - m.sup - m.inf)
  const n = v.etiquetas.length
  const x = (i: number) => m.izq + (n === 1 ? 0 : (i / (n - 1)) * (W - m.izq - m.der))
  const salto = Math.max(1, Math.ceil(n / 6))
  return (
    <div className="rounded-lg border border-surface-border bg-surface p-2">
      <p className="px-1 text-[11px] font-semibold text-slate-300">{v.titulo}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`${v.titulo}: ${v.series.map((s) => s.nombre).join(' y ')} a lo largo de ${v.etiquetas.join(', ')}`}>
        {marcas.map((t) => (
          <g key={t} fontSize="9" fill={TEXTO}>
            <line x1={m.izq} x2={W - m.der} y1={y(t)} y2={y(t)} stroke={EJE} strokeOpacity="0.2" />
            <text x={m.izq - 4} y={y(t) + 3} textAnchor="end">{fmtNum(t)}</text>
          </g>
        ))}
        {v.etiquetas.map((e, i) => (i % salto === 0 ? <text key={i} x={x(i)} y={H - m.inf + 13} fontSize="9" textAnchor="middle" fill={TEXTO}>{e}</text> : null))}
        {v.series.map((s, k) => (
          <g key={s.nombre}>
            <polyline fill="none" stroke={COLORES_SERIE[k % 4]} strokeWidth="2" strokeDasharray={k > 0 ? '5 3' : undefined} points={s.valores.map((val, i) => `${x(i)},${y(val)}`).join(' ')} />
            {s.valores.map((val, i) => <circle key={i} cx={x(i)} cy={y(val)} r="2.2" fill={COLORES_SERIE[k % 4]} />)}
          </g>
        ))}
      </svg>
      {v.series.length > 1 && (
        <p className="flex flex-wrap gap-3 px-1 text-[10px] text-slate-300">
          {v.series.map((s, k) => (
            <span key={s.nombre}><span style={{ color: COLORES_SERIE[k % 4] }}>━</span> {s.nombre}</span>
          ))}
        </p>
      )}
    </div>
  )
}

function Matriz({ v }: { v: Extract<VisualSpec, { tipo: 'matriz' }> }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-surface-border bg-surface p-2">
      <p className="px-1 pb-1 text-[11px] font-semibold text-slate-300">{v.titulo}</p>
      <table className="w-full min-w-max border-collapse text-xs">
        <thead>
          <tr>{v.columnas.map((c) => <th key={c} className="border-b border-surface-border px-2 py-1 text-left font-semibold text-slate-200">{c}</th>)}</tr>
        </thead>
        <tbody>
          {v.filas.map((f, i) => (
            <tr key={i}>
              {f.map((c, j) => (
                <td key={j} className={`border-b border-surface-border/50 px-2 py-0.5 ${typeof c === 'number' ? 'text-right tabular-nums' : ''} ${v.resaltar?.filas?.includes(i) || v.resaltar?.columnas?.includes(j) ? 'bg-amber-300/15 text-amber-100' : 'text-slate-300'} ${i === v.filas.length - 1 && /^total/i.test(String(f[0])) ? 'font-bold' : ''}`}>
                  {typeof c === 'number' ? fmtNum(c) : c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Segmentador({ v }: { v: Extract<VisualSpec, { tipo: 'segmentador' }> }) {
  return (
    <div className="rounded-lg border border-surface-border bg-surface p-2">
      <p className="px-1 pb-1 text-[11px] font-semibold text-slate-300">{v.campo}</p>
      <div className="flex flex-wrap gap-1.5">
        {v.opciones.map((o) => {
          const sel = v.seleccion?.includes(o)
          return <span key={o} className={`rounded border px-2 py-0.5 text-xs ${sel ? 'border-amber-300 bg-amber-300/20 font-semibold text-amber-100' : 'border-surface-border text-slate-300'}`}>{sel ? '☑ ' : '☐ '}{o}</span>
        })}
      </div>
    </div>
  )
}

function Medidor({ v }: { v: Extract<VisualSpec, { tipo: 'medidor' }> }) {
  const tope = Math.max(v.valor, v.meta) * 1.15
  return (
    <div className="rounded-lg border border-surface-border bg-surface p-3">
      <p className="text-[11px] text-slate-400">{v.titulo}</p>
      <div className="relative mt-3 h-3 rounded bg-slate-700" role="img" aria-label={`${v.titulo}: ${fmtNum(v.valor)} frente a una meta de ${fmtNum(v.meta)}`}>
        <div className={`h-3 rounded ${v.valor >= v.meta ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ width: `${(v.valor / tope) * 100}%` }} />
        <div className="absolute -top-1 h-5 w-0.5 bg-slate-100" style={{ left: `${(v.meta / tope) * 100}%` }} />
      </div>
      <p className="mt-1 text-xs text-slate-300">{fmtNum(v.valor)} de {fmtNum(v.meta)} (meta)</p>
    </div>
  )
}

function Visual({ v }: { v: VisualSpec }) {
  switch (v.tipo) {
    case 'tarjeta': return <Tarjeta v={v} />
    case 'barras': return <Barras v={v} />
    case 'lineas': return <Lineas v={v} />
    case 'matriz': return <Matriz v={v} />
    case 'segmentador': return <Segmentador v={v} />
    case 'medidor': return <Medidor v={v} />
  }
}

function Informe({ s }: { s: Extract<PantallaSpec, { tipo: 'informe' }> }) {
  const segs = s.visuales.filter((v) => v.tipo === 'segmentador')
  const tarjetas = s.visuales.filter((v) => v.tipo === 'tarjeta' || v.tipo === 'medidor')
  const resto = s.visuales.filter((v) => !['segmentador', 'tarjeta', 'medidor'].includes(v.tipo))
  return (
    <Ventana titulo={s.titulo ?? 'Power BI Desktop — Vista de informe'} descripcion={`Página de informe con ${s.visuales.length} visuales`}>
      <div className="flex">
        <div className="min-w-0 flex-1 space-y-2 bg-slate-900/60 p-3">
          {segs.length > 0 && <div className="grid gap-2 sm:grid-cols-2">{segs.map((v, i) => <Visual key={i} v={v} />)}</div>}
          {tarjetas.length > 0 && <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{tarjetas.map((v, i) => <Visual key={i} v={v} />)}</div>}
          {resto.length > 0 && <div className="grid gap-2 sm:grid-cols-2">{resto.map((v, i) => <Visual key={i} v={v} />)}</div>}
        </div>
        {s.filtros && s.filtros.length > 0 && (
          <div className="hidden w-40 shrink-0 border-l border-surface-border bg-surface/50 p-2 sm:block">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Filtros</p>
            <ul className="space-y-1 text-[11px] text-slate-300">
              {s.filtros.map((f) => <li key={f} className="rounded border border-surface-border px-1.5 py-0.5">{f}</li>)}
            </ul>
          </div>
        )}
      </div>
      <div className="flex gap-1 border-t border-surface-border bg-surface px-2 py-1 text-xs">
        <span className="rounded-t bg-amber-300/20 px-2 py-0.5 font-semibold text-amber-100">{s.pagina ?? 'Página 1'}</span>
        <span className="px-2 py-0.5 text-slate-500">＋</span>
      </div>
    </Ventana>
  )
}

// ───────── Barra de fórmulas DAX ─────────
type Trozo = { texto: string; clase: string }
function colorearDax(linea: string): Trozo[] {
  const trozos: Trozo[] = []
  const re = /(\/\/.*$)|("[^"]*")|(\b(?:VAR|RETURN|IN|TRUE|FALSE|NOT|AND|OR)\b)|([A-Za-z_][A-Za-z0-9_.]*(?=\())|('[^']+'\[[^\]]+\]|[A-Za-z_][A-Za-z0-9_]*\[[^\]]+\]|\[[^\]]+\])|(\b\d+(?:[.,]\d+)?\b)/g
  let ultimo = 0
  for (const m of linea.matchAll(re)) {
    if (m.index! > ultimo) trozos.push({ texto: linea.slice(ultimo, m.index), clase: 'text-slate-200' })
    const clase = m[1] ? 'text-slate-500 italic' : m[2] ? 'text-amber-300' : m[3] ? 'text-fuchsia-300' : m[4] ? 'text-sky-300' : m[5] ? 'text-emerald-300' : 'text-orange-300'
    trozos.push({ texto: m[0], clase })
    ultimo = m.index! + m[0].length
  }
  if (ultimo < linea.length) trozos.push({ texto: linea.slice(ultimo), clase: 'text-slate-200' })
  return trozos
}

export function CodigoDax({ dax }: { dax: string }) {
  return (
    <pre className="overflow-x-auto bg-slate-950 px-3 py-2 font-mono text-[13px] leading-6">
      {dax.split('\n').map((linea, i) => (
        <div key={i} className="flex gap-3">
          <span aria-hidden="true" className="w-4 shrink-0 select-none text-right text-slate-600">{i + 1}</span>
          <code className="whitespace-pre">{colorearDax(linea).map((t, k) => <span key={k} className={t.clase}>{t.texto}</span>)}</code>
        </div>
      ))}
    </pre>
  )
}

function Medida({ s }: { s: Extract<PantallaSpec, { tipo: 'medida' }> }) {
  const objeto = s.objeto === 'columna' ? 'Nueva columna' : s.objeto === 'tabla' ? 'Nueva tabla' : s.objeto === 'rol' ? 'Administrar roles: filtro DAX' : 'Nueva medida'
  return (
    <Ventana titulo={s.titulo ?? `Power BI Desktop — ${objeto}`} descripcion={`Barra de fórmulas DAX: ${objeto.toLowerCase()}`}>
      <div className="flex items-center gap-3 border-b border-surface-border bg-surface/60 px-3 py-1 text-xs text-slate-400">
        <span className="font-semibold text-slate-200">{objeto}</span>
        {s.tabla && <span>en la tabla <span className="text-slate-200">{s.tabla}</span></span>}
        <span className="ml-auto flex gap-2" aria-hidden="true"><span className="text-rose-400">✕</span><span className="text-emerald-400">✓</span></span>
      </div>
      <CodigoDax dax={s.dax} />
      {s.resultado && s.resultado.length > 0 && (
        <div className="border-t border-surface-border bg-surface/40 p-2">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Lo que muestra el visual, según el contexto de filtro de cada celda</p>
          <table className="w-full text-xs">
            <tbody>
              {s.resultado.map((r) => (
                <tr key={r.contexto} className="border-b border-surface-border/50 last:border-0">
                  <td className="py-0.5 pr-3 text-slate-300">{r.contexto}</td>
                  <td className="py-0.5 text-right font-semibold tabular-nums text-amber-200">{r.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Ventana>
  )
}

/** Ilustración de una pantalla de Power BI según su especificación. */
export function PantallaPBI({ spec }: { spec: PantallaSpec }) {
  switch (spec.tipo) {
    case 'powerquery': return <PowerQuery s={spec} />
    case 'modelo': return <Modelo s={spec} />
    case 'informe': return <Informe s={spec} />
    case 'medida': return <Medida s={spec} />
  }
}
