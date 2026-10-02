import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { NOMBRE_ACADEMIA } from '../brand'

/** Marca de la plataforma (isotipo + nombre). */
export function Logo({ compacto = false }: { compacto?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-extrabold text-white shadow-glow"
      >
        AI
      </span>
      {!compacto && <span className="font-bold tracking-tight text-slate-100">{NOMBRE_ACADEMIA}</span>}
    </span>
  )
}

type Variante = 'primario' | 'secundario' | 'fantasma' | 'peligro'

const ESTILOS_BOTON: Record<Variante, string> = {
  primario: 'bg-brand-600 text-white shadow-glow hover:bg-brand-500 disabled:shadow-none',
  secundario: 'border border-surface-border bg-surface-raised text-slate-200 hover:border-slate-500 hover:bg-surface',
  fantasma: 'text-slate-300 hover:bg-surface-raised hover:text-white',
  peligro: 'border border-red-500/40 text-red-300 hover:bg-red-500/10',
}

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante
  cargando?: boolean
}

export const Boton = forwardRef<HTMLButtonElement, BotonProps>(function Boton(
  { variante = 'primario', cargando = false, className = '', children, disabled, type = 'button', ...resto },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || cargando}
      aria-busy={cargando || undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e1a] disabled:cursor-not-allowed disabled:opacity-60 ${ESTILOS_BOTON[variante]} ${className}`}
      {...resto}
    >
      {cargando && <Spinner />}
      {children}
    </button>
  )
})

export function Spinner({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

interface CampoProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  etiqueta: string
  error?: string
  ayuda?: ReactNode
}

/** Campo de formulario accesible: etiqueta asociada, ayuda, error anunciado y botón para ver la contraseña. */
export const Campo = forwardRef<HTMLInputElement, CampoProps>(function Campo(
  { etiqueta, error, ayuda, type = 'text', className = '', ...resto },
  ref,
) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const esContrasena = type === 'password'
  const descripcionId = `${id}-desc`
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-200">
        {etiqueta}
      </label>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={esContrasena && visible ? 'text' : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || ayuda ? descripcionId : undefined}
          className={`w-full rounded-lg border bg-surface px-3.5 py-2.5 text-slate-100 placeholder-slate-500 transition focus:outline-none focus:ring-2 ${
            error ? 'border-red-500/70 focus:ring-red-500/40' : 'border-surface-border focus:border-brand-500 focus:ring-brand-500/30'
          } ${esContrasena ? 'pr-20' : ''} ${className}`}
          {...resto}
        />
        {esContrasena && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-pressed={visible}
            className="absolute inset-y-0 right-0 rounded-r-lg px-3 text-xs font-medium text-slate-400 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            {visible ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>
      {(error || ayuda) && (
        <p id={descripcionId} role={error ? 'alert' : undefined} className={`mt-1.5 text-xs ${error ? 'text-red-300' : 'text-slate-400'}`}>
          {error ?? ayuda}
        </p>
      )}
    </div>
  )
})

export function Tarjeta({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-surface-border bg-surface-raised/70 ${className}`}>{children}</div>
}

export function BarraProgreso({ valor, etiqueta, className = '' }: { valor: number; etiqueta: string; className?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(valor)))
  return (
    <div
      role="progressbar"
      aria-label={etiqueta}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={`h-2 w-full overflow-hidden rounded-full bg-surface ${className}`}
    >
      <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  )
}

/** Diálogo modal accesible: Escape cierra, el foco entra al diálogo y vuelve al elemento que lo abrió. */
export function Dialogo({
  abierto,
  titulo,
  descripcion,
  onCerrar,
  children,
}: {
  abierto: boolean
  titulo: string
  descripcion?: string
  onCerrar: () => void
  children: ReactNode
}) {
  const tituloId = useId()
  const descripcionId = useId()
  const contenedorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!abierto) return
    const previo = document.activeElement as HTMLElement | null
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCerrar()
      }
      if (e.key === 'Tab' && contenedorRef.current) {
        const enfocables = contenedorRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])',
        )
        if (enfocables.length === 0) return
        const primero = enfocables[0]
        const ultimo = enfocables[enfocables.length - 1]
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault()
          ultimo.focus()
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault()
          primero.focus()
        }
      }
    }
    document.addEventListener('keydown', alTeclear)
    const enfocable = contenedorRef.current?.querySelector<HTMLElement>('input, button:not([data-cerrar])')
    ;(enfocable ?? contenedorRef.current)?.focus()
    return () => {
      document.removeEventListener('keydown', alTeclear)
      previo?.focus?.()
    }
  }, [abierto, onCerrar])

  if (!abierto) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCerrar} aria-hidden="true" />
      <div
        ref={contenedorRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        aria-describedby={descripcion ? descripcionId : undefined}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-2xl border border-surface-border bg-surface-raised p-6 shadow-2xl focus:outline-none"
      >
        <h2 id={tituloId} className="text-lg font-bold text-slate-50">
          {titulo}
        </h2>
        {descripcion && (
          <p id={descripcionId} className="mt-1.5 text-sm text-slate-300">
            {descripcion}
          </p>
        )}
        <div className="mt-5">{children}</div>
      </div>
    </div>
  )
}
