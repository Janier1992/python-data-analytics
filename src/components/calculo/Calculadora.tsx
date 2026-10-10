import { useState } from 'react'
import { evaluarFormula, formatearValor, primerValor } from '../../excel'

const EJEMPLOS = ['(3+5)/2', 'RAIZ(16)', '2^3', 'DISTR.NORM.ESTAND.N(1.96;VERDADERO)', 'INV.T.2C(0.05;9)']

/**
 * Calculadora científica sencilla: operaciones, potencias, raíces y las funciones estadísticas de una hoja
 * (PROMEDIO, DESVEST.M, distribución normal, t de Student, chi-cuadrado, F…), que sirven como «tablas».
 */
export function Calculadora() {
  const [expresion, setExpresion] = useState('')
  const [historial, setHistorial] = useState<{ expresion: string; resultado: string }[]>([])

  const texto = expresion.trim()
  let vista: { ok: boolean; texto: string } | null = null
  if (texto) {
    const r = evaluarFormula(`=${texto.replace(/^=/, '')}`, { celdas: [[null]] })
    vista = r.ok ? { ok: true, texto: formatearValor(primerValor(r.valor)) } : { ok: false, texto: r.mensaje }
  }

  function guardar() {
    if (vista?.ok) setHistorial((h) => [{ expresion: texto, resultado: vista!.texto }, ...h].slice(0, 5))
  }

  return (
    <div className="space-y-2 rounded-lg border border-surface-border bg-surface p-3">
      <label htmlFor="calculadora-entrada" className="block text-sm font-medium text-slate-200">
        Escribe una operación
      </label>
      <input
        id="calculadora-entrada"
        value={expresion}
        onChange={(e) => setExpresion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            guardar()
          }
        }}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        inputMode="text"
        placeholder="(12+15+9)/3"
        className="w-full rounded-md border border-surface-border bg-surface-raised px-3 py-2 font-mono text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
      />
      <p aria-live="polite" className={`min-h-[1.5rem] font-mono text-lg font-semibold ${vista ? (vista.ok ? 'text-emerald-300' : 'text-amber-300') : 'text-slate-500'}`}>
        {vista ? (vista.ok ? `= ${vista.texto}` : vista.texto) : '= …'}
      </p>
      {historial.length > 0 && (
        <ul className="space-y-0.5 text-xs text-slate-400">
          {historial.map((h, i) => (
            <li key={i} className="font-mono">
              {h.expresion} = <span className="text-slate-200">{h.resultado}</span>
            </li>
          ))}
        </ul>
      )}
      <details className="text-xs text-slate-400">
        <summary className="cursor-pointer select-none text-slate-300">Ayuda: qué puedes escribir</summary>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Operaciones con <code>+ - * / ^</code> y paréntesis. Usa punto decimal (<code>2.5</code>) y <code>;</code> entre los datos de una función.</li>
          <li><code>RAIZ(x)</code>, <code>LN(x)</code>, <code>EXP(x)</code>, <code>POTENCIA(x;y)</code>, <code>ABS(x)</code>, <code>REDONDEAR(x;2)</code>.</li>
          <li>Con datos: <code>PROMEDIO(2;4;9)</code>, <code>MEDIANA(2;4;9)</code>, <code>DESVEST.M(2;4;9)</code>, <code>VAR.S(2;4;9)</code>, <code>SUMA(...)</code>.</li>
          <li>Tablas estadísticas: <code>DISTR.NORM.ESTAND.N(z;VERDADERO)</code> (área a la izquierda de z), <code>INV.NORM.ESTAND(p)</code>, <code>INV.T.2C(α;gl)</code>, <code>INV.CHICUAD.CD(α;gl)</code>, <code>INV.F.CD(α;gl1;gl2)</code>, <code>DISTR.BINOM.N(k;n;p;FALSO)</code>, <code>POISSON.DIST(k;μ;FALSO)</code>.</li>
        </ul>
        <p className="mt-2">Ejemplos: {EJEMPLOS.map((e) => <button key={e} type="button" onClick={() => setExpresion(e)} className="mr-1.5 rounded bg-surface-raised px-1.5 py-0.5 font-mono text-slate-300 hover:text-white">{e}</button>)}</p>
      </details>
    </div>
  )
}
