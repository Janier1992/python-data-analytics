import CodeMirror, { EditorView, Prec, keymap } from '@uiw/react-codemirror'
import type { Extension } from '@uiw/react-codemirror'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { python } from '@codemirror/lang-python'
import { sql } from '@codemirror/lang-sql'
import { tags as t } from '@lezer/highlight'

// Colores del tema oscuro (derivados de One Dark) ajustados para cumplir contraste WCAG AA (≥ 4.5:1)
// sobre el fondo del editor; el tema original deja palabras clave, variables y comentarios por debajo.
const estiloAccesible = HighlightStyle.define([
  { tag: t.keyword, color: '#d9a0ee' },
  { tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: '#f0929a' },
  { tag: [t.function(t.variableName), t.labelName], color: '#61afef' },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#d19a66' },
  { tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: '#e5c07b' },
  { tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)], color: '#56b6c2' },
  { tag: [t.meta, t.comment], color: '#9ca7ba' },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#d19a66' },
  { tag: t.string, color: '#98c379' },
])

const temaGutter = EditorView.theme({ '.cm-gutters': { color: '#a3acbf' }, '.cm-activeLineGutter': { color: '#e2e8f0' } })

interface Props {
  value: string
  onChange: (value: string) => void
  minHeight?: string
  lenguaje?: 'python' | 'sql'
  /** Se llama con Ctrl+Enter (⌘+Enter en Mac) para ejecutar el código. */
  onRun?: () => void
  ariaLabel?: string
}

export function CodeEditor({ value, onChange, minHeight = '160px', lenguaje = 'python', onRun, ariaLabel = 'Editor de código' }: Props) {
  const extensiones: Extension[] = [
    lenguaje === 'sql' ? sql() : python(),
    Prec.highest(syntaxHighlighting(estiloAccesible)),
    temaGutter,
    // El área editable necesita un nombre accesible para lectores de pantalla
    EditorView.contentAttributes.of({ 'aria-label': ariaLabel }),
  ]
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
    <div className="overflow-hidden rounded-lg border border-slate-700">
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
