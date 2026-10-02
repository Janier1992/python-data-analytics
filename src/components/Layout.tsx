import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTiempoActivo } from '../hooks/useTiempoActivo'
import { PaletaBusqueda } from './PaletaBusqueda'
import { Sidebar } from './Sidebar'
import { UserMenu } from './UserMenu'
import { Logo } from './ui'

/** Marco de la aplicación para usuarios con sesión: barra lateral, encabezado y contenido. */
export function Layout({ children }: { children: ReactNode }) {
  const [sidebarAbierto, setSidebarAbierto] = useState(false)
  const [busquedaAbierta, setBusquedaAbierta] = useState(false)
  useTiempoActivo()

  // Ctrl/⌘ + K abre la búsqueda global
  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setBusquedaAbierta((v) => !v)
      }
    }
    document.addEventListener('keydown', alTeclear)
    return () => document.removeEventListener('keydown', alTeclear)
  }, [])

  return (
    <div className="flex min-h-screen">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>

      <aside className="hidden w-72 shrink-0 border-r border-surface-border lg:block" aria-label="Navegación del curso">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>

      {sidebarAbierto && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Navegación del curso">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarAbierto(false)} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-xs border-r border-surface-border">
            <Sidebar onNavigate={() => setSidebarAbierto(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-surface-border bg-surface/85 px-4 py-2.5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarAbierto(true)}
              className="rounded-md p-2 text-slate-300 hover:bg-surface-raised hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 lg:hidden"
              aria-label="Abrir menú del curso"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/curso" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 lg:hidden" aria-label="Ir al inicio">
              <Logo />
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-2" id="acciones-encabezado">
            <button
              type="button"
              onClick={() => setBusquedaAbierta(true)}
              className="flex items-center gap-2 rounded-full border border-surface-border bg-surface-raised px-3 py-1.5 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              aria-label="Buscar en el curso (Ctrl+K)"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">Buscar</span>
              <kbd className="hidden rounded border border-surface-border px-1.5 text-xs text-slate-400 md:inline">Ctrl K</kbd>
            </button>
            <UserMenu />
          </div>
        </header>
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
      </div>
      <PaletaBusqueda abierta={busquedaAbierta} onCerrar={() => setBusquedaAbierta(false)} />
    </div>
  )
}
