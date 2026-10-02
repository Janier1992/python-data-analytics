import type { RunResult } from '../pyodide/usePyodide'

export function Console({ result }: { result: RunResult | null }) {
  if (!result) {
    return (
      <div className="rounded-lg border border-surface-border bg-surface p-3 text-sm text-slate-500">
        Ejecuta el código para ver el resultado aquí.
      </div>
    )
  }

  return (
    <div className="space-y-2 rounded-lg border border-surface-border bg-surface p-3 font-mono text-sm">
      {result.stdout && (
        <pre className="whitespace-pre-wrap text-slate-200">{result.stdout.trimEnd()}</pre>
      )}
      {result.error && (
        <pre className="whitespace-pre-wrap text-red-400">{result.error}</pre>
      )}
      {!result.stdout && !result.error && !result.figures.length && (
        <p className="text-slate-500">El código se ejecutó sin salida (sin print()).</p>
      )}
      {result.figures.map((fig, i) => (
        <img
          key={i}
          src={`data:image/png;base64,${fig}`}
          alt={`Gráfico ${i + 1}`}
          className="rounded bg-white p-2"
        />
      ))}
    </div>
  )
}
