import { useState } from 'react'
import { envolverSql } from '../../content/sqlPractica'
import { usePyodide } from '../../pyodide/usePyodide'
import type { RunResult } from '../../pyodide/usePyodide'
import { CodeEditor } from '../CodeEditor'
import { Console } from '../Console'
import { Boton } from '../ui'
import { BotonCopiar } from './BotonCopiar'

interface Props {
  codigo: string
  lenguaje: 'python' | 'sql'
}

/** Ejemplo editable que se ejecuta en el navegador (Python con Pyodide; SQL sobre la base de práctica). */
export function EjemploEjecutable({ codigo, lenguaje }: Props) {
  const { listo, estado, errorCarga, reintentar, ejecutando, ejecutar } = usePyodide()
  const [texto, setTexto] = useState(codigo)
  const [resultado, setResultado] = useState<RunResult | null>(null)

  async function correr() {
    if (!listo || ejecutando) return
    setResultado(await ejecutar(lenguaje === 'sql' ? envolverSql(texto) : texto))
  }

  const lineas = Math.max(3, texto.split('\n').length)
  return (
    <div className="space-y-2">
      <CodeEditor
        value={texto}
        onChange={setTexto}
        lenguaje={lenguaje}
        onRun={correr}
        minHeight={`${Math.min(lineas, 14) * 22 + 12}px`}
        ariaLabel={`Ejemplo de ${lenguaje === 'sql' ? 'SQL' : 'Python'} editable`}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Boton onClick={correr} disabled={!listo} cargando={ejecutando} className="!px-3 !py-1.5">
          {ejecutando ? 'Ejecutando…' : '▶ Ejecutar'}
        </Boton>
        <Boton variante="secundario" onClick={() => { setTexto(codigo); setResultado(null) }} disabled={texto === codigo} className="!px-3 !py-1.5">
          Restablecer
        </Boton>
        <BotonCopiar texto={texto} etiqueta="Copiar código" />
        <span className="hidden text-xs text-slate-400 sm:inline">Ctrl + Enter para ejecutar · puedes editar el código</span>
      </div>
      {!listo && !errorCarga && <p className="text-xs text-amber-400" role="status">{estado || 'Preparando Python…'}</p>}
      {errorCarga && (
        <div role="alert" className="flex flex-wrap items-center gap-3 rounded-md border border-red-500/40 bg-red-500/10 p-2.5 text-xs text-red-300">
          <span className="min-w-0 flex-1">{errorCarga}</span>
          <button onClick={reintentar} className="shrink-0 rounded border border-red-400/60 px-2.5 py-1 font-medium text-red-200 hover:bg-red-500/20">
            Reintentar
          </button>
        </div>
      )}
      {resultado && <Console result={resultado} />}
    </div>
  )
}
