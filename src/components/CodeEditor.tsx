import CodeMirror, { Prec, keymap } from '@uiw/react-codemirror'
import type { Extension } from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { sql } from '@codemirror/lang-sql'

interface Props {
  value: string
  onChange: (value: string) => void
  minHeight?: string
  lenguaje?: 'python' | 'sql'
  /** Se llama con Ctrl+Enter (⌘+Enter en Mac) para ejecutar el código. */
  onRun?: () => void
  ariaLabel?: string
}

export function CodeEditor({ value, onChange, minHeight = '160px', lenguaje = 'python', onRun, ariaLabel }: Props) {
  const extensiones: Extension[] = [lenguaje === 'sql' ? sql() : python()]
  if (onRun) {
    extensiones.push(
      Prec.highest(
        keymap.of([
          {
            key: 'Mod-Enter',
            run: () => {
              onRun()
              return true
            },
          },
        ]),
      ),
    )
  }
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700" role="group" aria-label={ariaLabel ?? 'Editor de código'}>
      <CodeMirror
        value={value}
        height="auto"
        minHeight={minHeight}
        theme="dark"
        extensions={extensiones}
        onChange={onChange}
        basicSetup={{ lineNumbers: true, foldGutter: false }}
      />
    </div>
  )
}
