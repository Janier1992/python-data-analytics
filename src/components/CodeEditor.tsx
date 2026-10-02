import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'

interface Props {
  value: string
  onChange: (value: string) => void
  minHeight?: string
}

export function CodeEditor({ value, onChange, minHeight = '160px' }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700">
      <CodeMirror
        value={value}
        height="auto"
        minHeight={minHeight}
        theme="dark"
        extensions={[python()]}
        onChange={onChange}
        basicSetup={{ lineNumbers: true, foldGutter: false }}
      />
    </div>
  )
}
