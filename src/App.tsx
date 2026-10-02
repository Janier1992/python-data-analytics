import { useState } from 'react'
import { Navigate, Route, Routes, Link } from 'react-router-dom'
import { useProgressStore } from './state/progressStore'
import { Onboarding } from './components/Onboarding'
import { Dashboard } from './components/Dashboard'
import { LessonPage } from './components/LessonPage'
import { Sidebar } from './components/Sidebar'

function Layout({ children }: { children: React.ReactNode }) {
  const resetProgreso = useProgressStore((s) => s.resetProgreso)
  const [sidebarAbierto, setSidebarAbierto] = useState(false)

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-72 shrink-0 border-r border-surface-border lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>

      {sidebarAbierto && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarAbierto(false)} />
          <div className="absolute inset-y-0 left-0 w-72 border-r border-surface-border">
            <Sidebar onNavigate={() => setSidebarAbierto(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-surface-border bg-surface/80 px-4 py-3 backdrop-blur lg:px-8">
          <button
            onClick={() => setSidebarAbierto(true)}
            className="rounded-md p-1.5 text-slate-400 hover:bg-surface-raised hover:text-slate-200 lg:hidden"
            aria-label="Abrir menú"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/curso" className="font-bold text-slate-100 lg:hidden">
            🐍 Python Data &amp; AI Academy
          </Link>
          <div className="hidden lg:block" />
          <button
            onClick={() => {
              if (confirm('¿Reiniciar todo tu progreso? Esta acción no se puede deshacer.')) resetProgreso()
            }}
            className="text-xs text-slate-500 hover:text-slate-300"
          >
            Reiniciar progreso
          </button>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

export default function App() {
  const onboardingCompletado = useProgressStore((s) => s.onboardingCompletado)

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={onboardingCompletado ? '/curso' : '/onboarding'} replace />}
      />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route
        path="/curso"
        element={
          onboardingCompletado ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/onboarding" replace />
          )
        }
      />
      <Route
        path="/leccion/:leccionId"
        element={
          onboardingCompletado ? (
            <Layout>
              <LessonPage />
            </Layout>
          ) : (
            <Navigate to="/onboarding" replace />
          )
        }
      />
    </Routes>
  )
}
