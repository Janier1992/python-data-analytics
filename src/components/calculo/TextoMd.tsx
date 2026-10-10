import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/** Markdown con tablas (GFM). Los enlaces a /datos/ se descargan en lugar de abrirse en la página. */
export function TextoMd({ children, className = '', enLinea = false }: { children: string; className?: string; enLinea?: boolean }) {
  if (enLinea) {
    // Para etiquetas y opciones: Markdown dentro de una línea (negrita, cursiva, código), sin párrafos.
    return (
      <span className={className}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: ({ children: hijos }) => <>{hijos}</> }}>
          {children}
        </ReactMarkdown>
      </span>
    )
  }
  return (
    <div className={`prose prose-invert prose-slate max-w-none prose-pre:bg-slate-950 prose-table:text-sm prose-th:text-slate-200 prose-td:text-slate-300 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children: hijos }) => (
            <a href={href} download={href?.startsWith('/datos/') ? '' : undefined}>
              {hijos}
            </a>
          ),
          // tablas con desplazamiento horizontal en pantallas pequeñas
          table: ({ children: hijos }) => (
            <div className="overflow-x-auto">
              <table>{hijos}</table>
            </div>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
