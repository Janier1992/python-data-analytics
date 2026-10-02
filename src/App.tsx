import { Suspense, lazy } from 'react'
import type { ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAccountStore } from './state/accountStore'
import { useProgressStore } from './state/progressStore'
import { AuthPage } from './components/AuthPage'
import { Dashboard } from './components/Dashboard'
import { Layout } from './components/Layout'
import { NotFound } from './components/NotFound'
import { Onboarding } from './components/Onboarding'
import { Spinner } from './components/ui'

// La página de lección arrastra CodeMirror y react-markdown: se descarga solo al abrir una lección.
const LessonPage = lazy(() => import('./components/LessonPage').then((m) => ({ default: m.LessonPage })))
// La guía de referencia (con sus 8 colecciones) también se descarga solo cuando se abre.
const ReferenciaPage = lazy(() => import('./components/referencia/ReferenciaPage').then((m) => ({ default: m.ReferenciaPage })))

function Cargando() {
  return (
    <div role="status" aria-live="polite" className="flex items-center gap-2 p-10 text-sm text-slate-400">
      <Spinner /> Cargando…
    </div>
  )
}

/** Exige sesión iniciada (y diagnóstico inicial hecho) para ver el contenido. */
function Protegida({ children, conLayout = true }: { children: ReactNode; conLayout?: boolean }) {
  const sesionId = useAccountStore((s) => s.sesionId)
  const onboardingCompletado = useProgressStore((s) => s.onboardingCompletado)
  const ubicacion = useLocation()

  if (!sesionId) return <Navigate to="/ingresar" replace state={{ desde: ubicacion.pathname + ubicacion.search }} />
  if (!conLayout) return <>{children}</>
  if (!onboardingCompletado) return <Navigate to="/onboarding" replace />
  return (
    <Layout>
      <Suspense fallback={<Cargando />}>{children}</Suspense>
    </Layout>
  )
}

export default function App() {
  const sesionId = useAccountStore((s) => s.sesionId)

  return (
    <Routes>
      <Route path="/" element={<Navigate to={sesionId ? '/curso' : '/ingresar'} replace />} />
      <Route path="/ingresar" element={<AuthPage />} />
      <Route
        path="/onboarding"
        element={
          <Protegida conLayout={false}>
            <Onboarding />
          </Protegida>
        }
      />
      <Route
        path="/curso"
        element={
          <Protegida>
            <Dashboard />
          </Protegida>
        }
      />
      <Route
        path="/leccion/:leccionId"
        element={
          <Protegida>
            <LessonPage />
          </Protegida>
        }
      />
      <Route
        path="/referencia"
        element={
          <Protegida>
            <ReferenciaPage />
          </Protegida>
        }
      />
      <Route
        path="/referencia/:coleccionId"
        element={
          <Protegida>
            <ReferenciaPage />
          </Protegida>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
