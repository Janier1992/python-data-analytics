import type { GraficoSpec } from '../../calculo'
import { areaNormal, cortesHistograma, densidadNormal, frecuenciasHistograma, marcasEje, resumenCaja } from '../../calculo/graficos'

const ANCHO = 520
const ALTO = 270
const M = { izq: 52, der: 18, sup: 30, inf: 46 }
const AREA_X = ANCHO - M.izq - M.der
const AREA_Y = ALTO - M.sup - M.inf
const AZUL = '#5a94ff'
const AZUL_FUERTE = '#2f6df6'
const AMBAR = '#f5b942'
const EJE = '#64748b'
const TEXTO = '#cbd5e1'

const fmt = (n: number) => String(Number(n.toPrecision(6))).replace('.', ',')

function escala(min: number, max: number, a: number, b: number) {
  const rango = max - min || 1
  return (v: number) => a + ((v - min) / rango) * (b - a)
}

function Eje({ marcas, x, y, etiqueta, formato = fmt, vertical = false }: { marcas: number[]; x: (v: number) => number; y?: (v: number) => number; etiqueta?: string; formato?: (n: number) => string; vertical?: boolean }) {
  return (
    <g fontSize="11" fill={TEXTO}>
      {!vertical &&
        marcas.map((m) => (
          <g key={m}>
            <line x1={x(m)} x2={x(m)} y1={M.sup + AREA_Y} y2={M.sup + AREA_Y + 4} stroke={EJE} />
            <text x={x(m)} y={M.sup + AREA_Y + 17} textAnchor="middle">
              {formato(m)}
            </text>
          </g>
        ))}
      {vertical &&
        y &&
        marcas.map((m) => (
          <g key={m}>
            <line x1={M.izq - 4} x2={M.izq} y1={y(m)} y2={y(m)} stroke={EJE} />
            <line x1={M.izq} x2={M.izq + AREA_X} y1={y(m)} y2={y(m)} stroke={EJE} strokeOpacity="0.18" />
            <text x={M.izq - 8} y={y(m) + 4} textAnchor="end">
              {formato(m)}
            </text>
          </g>
        ))}
      {etiqueta && !vertical && (
        <text x={M.izq + AREA_X / 2} y={ALTO - 6} textAnchor="middle" fill={TEXTO}>
          {etiqueta}
        </text>
      )}
      {etiqueta && vertical && (
        <text transform={`translate(13 ${M.sup + AREA_Y / 2}) rotate(-90)`} textAnchor="middle" fill={TEXTO}>
          {etiqueta}
        </text>
      )}
    </g>
  )
}

function Marco({ titulo, descripcion, children }: { titulo?: string; descripcion: string; children: React.ReactNode }) {
  return (
    <figure className="my-3">
      <svg viewBox={`0 0 ${ANCHO} ${ALTO}`} role="img" aria-label={descripcion} className="w-full max-w-xl rounded-lg border border-surface-border bg-surface/60">
        <title>{descripcion}</title>
        {titulo && (
          <text x={ANCHO / 2} y={18} textAnchor="middle" fontSize="13" fontWeight="600" fill="#e2e8f0">
            {titulo}
          </text>
        )}
        <line x1={M.izq} x2={M.izq + AREA_X} y1={M.sup + AREA_Y} y2={M.sup + AREA_Y} stroke={EJE} />
        {children}
      </svg>
    </figure>
  )
}

export function Grafico({ spec }: { spec: GraficoSpec }) {
  if (spec.tipo === 'histograma') {
    const cortes = cortesHistograma(spec.datos, spec.cortes)
    const frec = frecuenciasHistograma(spec.datos, cortes)
    const x = escala(cortes[0], cortes[cortes.length - 1], M.izq, M.izq + AREA_X)
    const maxF = Math.max(...frec, 1)
    const marcasY = marcasEje(0, maxF, 5).filter((m) => Number.isInteger(m))
    const y = escala(0, Math.max(maxF, marcasY[marcasY.length - 1] ?? maxF), M.sup + AREA_Y, M.sup)
    return (
      <Marco titulo={spec.titulo} descripcion={`Histograma${spec.titulo ? `: ${spec.titulo}` : ''}. Frecuencias por clase: ${frec.join(', ')}.`}>
        {frec.map((f, i) => (
          <rect key={i} x={x(cortes[i]) + 1} y={y(f)} width={Math.max(1, x(cortes[i + 1]) - x(cortes[i]) - 2)} height={M.sup + AREA_Y - y(f)} fill={AZUL} stroke={AZUL_FUERTE} />
        ))}
        <Eje marcas={cortes.length > 12 ? marcasEje(cortes[0], cortes[cortes.length - 1], 8) : cortes} x={x} etiqueta={spec.etiquetaX} />
        <Eje marcas={marcasY} x={x} y={y} etiqueta="Frecuencia" vertical />
      </Marco>
    )
  }

  if (spec.tipo === 'barras') {
    const maxV = Math.max(...spec.valores, 0)
    const marcasY = marcasEje(0, maxV, 5)
    const tope = marcasY[marcasY.length - 1] ?? maxV
    const y = escala(0, tope || 1, M.sup + AREA_Y, M.sup)
    const ancho = AREA_X / spec.categorias.length
    return (
      <Marco titulo={spec.titulo} descripcion={`Gráfico de barras${spec.titulo ? `: ${spec.titulo}` : ''}. ${spec.categorias.map((c, i) => `${c}: ${fmt(spec.valores[i])}`).join('; ')}.`}>
        {spec.valores.map((v, i) => (
          <g key={spec.categorias[i]}>
            <rect x={M.izq + i * ancho + ancho * 0.15} y={y(v)} width={ancho * 0.7} height={M.sup + AREA_Y - y(v)} fill={AZUL} stroke={AZUL_FUERTE} />
            <text x={M.izq + i * ancho + ancho / 2} y={y(v) - 5} textAnchor="middle" fontSize="11" fill="#e2e8f0">
              {fmt(v)}
            </text>
            <text x={M.izq + i * ancho + ancho / 2} y={M.sup + AREA_Y + 17} textAnchor="middle" fontSize="11" fill={TEXTO}>
              {spec.categorias[i]}
            </text>
          </g>
        ))}
        <Eje marcas={marcasY} x={() => 0} y={y} etiqueta={spec.etiquetaY} vertical />
      </Marco>
    )
  }

  if (spec.tipo === 'caja') {
    const r = resumenCaja(spec.datos)
    const marcas = marcasEje(r.min, r.max, 6)
    const x = escala(Math.min(r.min, marcas[0] ?? r.min), Math.max(r.max, marcas[marcas.length - 1] ?? r.max), M.izq, M.izq + AREA_X)
    const cy = M.sup + AREA_Y / 2
    const h = 54
    return (
      <Marco
        titulo={spec.titulo}
        descripcion={`Diagrama de caja${spec.titulo ? `: ${spec.titulo}` : ''}. Mínimo ${fmt(r.min)}, Q1 ${fmt(r.q1)}, mediana ${fmt(r.mediana)}, Q3 ${fmt(r.q3)}, máximo ${fmt(r.max)}${r.atipicos.length ? `; valores atípicos: ${r.atipicos.map(fmt).join(', ')}` : ''}.`}
      >
        <line x1={x(r.bigoteInf)} x2={x(r.q1)} y1={cy} y2={cy} stroke={AZUL_FUERTE} strokeWidth="2" />
        <line x1={x(r.q3)} x2={x(r.bigoteSup)} y1={cy} y2={cy} stroke={AZUL_FUERTE} strokeWidth="2" />
        <line x1={x(r.bigoteInf)} x2={x(r.bigoteInf)} y1={cy - 12} y2={cy + 12} stroke={AZUL_FUERTE} strokeWidth="2" />
        <line x1={x(r.bigoteSup)} x2={x(r.bigoteSup)} y1={cy - 12} y2={cy + 12} stroke={AZUL_FUERTE} strokeWidth="2" />
        <rect x={x(r.q1)} y={cy - h / 2} width={Math.max(2, x(r.q3) - x(r.q1))} height={h} fill={AZUL} fillOpacity="0.45" stroke={AZUL_FUERTE} strokeWidth="2" />
        <line x1={x(r.mediana)} x2={x(r.mediana)} y1={cy - h / 2} y2={cy + h / 2} stroke={AMBAR} strokeWidth="3" />
        {r.atipicos.map((a, i) => (
          <circle key={i} cx={x(a)} cy={cy} r="4.5" fill="none" stroke={AMBAR} strokeWidth="2" />
        ))}
        <Eje marcas={marcas} x={x} etiqueta={spec.etiquetaX} />
      </Marco>
    )
  }

  if (spec.tipo === 'dispersion') {
    const minX = Math.min(...spec.x)
    const maxX = Math.max(...spec.x)
    const minY = Math.min(...spec.y)
    const maxY = Math.max(...spec.y)
    const mx = marcasEje(minX, maxX, 6)
    const my = marcasEje(minY, maxY, 5)
    const x0 = Math.min(minX, mx[0] ?? minX)
    const x1 = Math.max(maxX, mx[mx.length - 1] ?? maxX)
    const y0 = Math.min(minY, my[0] ?? minY)
    const y1 = Math.max(maxY, my[my.length - 1] ?? maxY)
    const x = escala(x0, x1, M.izq + 8, M.izq + AREA_X - 8)
    const y = escala(y0, y1, M.sup + AREA_Y - 6, M.sup + 6)
    return (
      <Marco titulo={spec.titulo} descripcion={`Diagrama de dispersión${spec.titulo ? `: ${spec.titulo}` : ''}, con ${spec.x.length} puntos${spec.recta ? ' y la recta de ajuste' : ''}.`}>
        {spec.recta && <line x1={x(x0)} y1={y(spec.recta.a + spec.recta.b * x0)} x2={x(x1)} y2={y(spec.recta.a + spec.recta.b * x1)} stroke={AMBAR} strokeWidth="2" />}
        {spec.x.map((vx, i) => (
          <circle key={i} cx={x(vx)} cy={y(spec.y[i])} r="4.5" fill={AZUL} stroke={AZUL_FUERTE} />
        ))}
        <Eje marcas={mx} x={x} etiqueta={spec.etiquetaX} />
        <Eje marcas={my} x={x} y={y} etiqueta={spec.etiquetaY} vertical />
      </Marco>
    )
  }

  // normal
  const { media, desv } = spec
  const min = media - 4 * desv
  const max = media + 4 * desv
  const x = escala(min, max, M.izq, M.izq + AREA_X)
  const tope = densidadNormal(media, media, desv)
  const y = escala(0, tope * 1.1, M.sup + AREA_Y, M.sup)
  const puntos: [number, number][] = []
  for (let i = 0; i <= 160; i++) {
    const v = min + ((max - min) * i) / 160
    puntos.push([v, densidadNormal(v, media, desv)])
  }
  const trazo = puntos.map(([v, d], i) => `${i === 0 ? 'M' : 'L'}${x(v).toFixed(1)} ${y(d).toFixed(1)}`).join(' ')
  const desde = spec.desde ?? null
  const hasta = spec.hasta ?? null
  const sombreado = desde !== null || hasta !== null
  let region = ''
  if (sombreado) {
    const a = Math.max(min, desde ?? min)
    const b = Math.min(max, hasta ?? max)
    const tramo = puntos.filter(([v]) => v >= a && v <= b)
    const ini: [number, number] = [a, densidadNormal(a, media, desv)]
    const fin: [number, number] = [b, densidadNormal(b, media, desv)]
    const todos = [ini, ...tramo, fin]
    region = `M${x(a).toFixed(1)} ${y(0).toFixed(1)} ${todos.map(([v, d]) => `L${x(v).toFixed(1)} ${y(d).toFixed(1)}`).join(' ')} L${x(b).toFixed(1)} ${y(0).toFixed(1)} Z`
  }
  const area = sombreado ? areaNormal(media, desv, desde, hasta) : null
  const marcas = [-3, -2, -1, 0, 1, 2, 3].map((k) => media + k * desv)
  return (
    <Marco
      titulo={spec.titulo}
      descripcion={`Curva normal con media ${fmt(media)} y desviación ${fmt(desv)}${area !== null ? `; el área sombreada es ${fmt(Math.round(area * 10000) / 10000)}` : ''}.`}
    >
      {region && <path d={region} fill={AZUL} fillOpacity="0.45" />}
      <path d={trazo} fill="none" stroke={AZUL_FUERTE} strokeWidth="2.5" />
      <line x1={x(media)} x2={x(media)} y1={y(0)} y2={y(tope)} stroke={AMBAR} strokeDasharray="4 3" />
      {area !== null && (
        <text x={M.izq + AREA_X - 4} y={M.sup + 14} textAnchor="end" fontSize="12" fill="#e2e8f0">
          Área sombreada ≈ {fmt(Math.round(area * 10000) / 10000)}
        </text>
      )}
      <Eje marcas={marcas} x={x} />
    </Marco>
  )
}
