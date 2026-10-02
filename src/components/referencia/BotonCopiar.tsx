import { useEffect, useRef, useState } from 'react'

async function copiarAlPortapapeles(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto)
    return true
  } catch {
    // Respaldo para navegadores o contextos sin permiso para el portapapeles
    const area = document.createElement('textarea')
    area.value = texto
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    try {
      return document.execCommand('copy')
    } catch {
      return false
    } finally {
      area.remove()
    }
  }
}

/** Botón que copia un texto y confirma con un aviso accesible. */
export function BotonCopiar({ texto, etiqueta = 'Copiar' }: { texto: string; etiqueta?: string }) {
  const [estado, setEstado] = useState<'inactivo' | 'copiado' | 'error'>('inactivo')
  const temporizador = useRef<number>()

  useEffect(() => () => window.clearTimeout(temporizador.current), [])

  async function copiar() {
    setEstado((await copiarAlPortapapeles(texto)) ? 'copiado' : 'error')
    window.clearTimeout(temporizador.current)
    temporizador.current = window.setTimeout(() => setEstado('inactivo'), 2000)
  }

  return (
    <button
      type="button"
      onClick={copiar}
      className="rounded-lg border border-surface-border bg-surface-raised px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <span aria-live="polite">{estado === 'copiado' ? '✓ Copiado' : estado === 'error' ? 'No se pudo copiar' : etiqueta}</span>
    </button>
  )
}
