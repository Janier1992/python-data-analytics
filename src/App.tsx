import { Navigate, Route, Routes, Link } from 'react-router-dom'
import { useProgressStore } from './state/progressStore'
import { Onboarding } from './components/Onboarding'
import { Dashboard } from './components/Dashboard'
import { LessonPage } from './components/LessonPage'

function Layout({ children }: { children: React.ReactNode }) {
  const resetProgreso = useProgressStore((s) => s.resetProgreso)
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800 bg-slate-950/80 px-6 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link to="/curso" className="font-bold text-slate-100">
            🐍 Python Data &amp; AI Academy
          </Link>
          <button
            onClick={() => {
              if (confirm('¿Reiniciar todo tu progreso? Esta acción no se puede deshacer.')) resetProgreso()
            }}
            className="text-xs text-slate-500 hover:text-slate-300"
          >
            Reiniciar progreso
          </button>
        </div>
      </header>
      {children}
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
