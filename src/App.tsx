import { Suspense, lazy } from 'react'
import type { ReactNode } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useAccountStore } from './state/accountStore'
import { useProgressStore } from './state/progressStore'
import { AuthPage } from './components/AuthPage'
import { CursoPage } from './components/CursoPage'
import { Dashboard } from './components/Dashboard'
import { Layout } from './components/Layout'
import { NotFound } from './components/NotFound'
import { Onboarding } from './components/Onboarding'
import { Spinner } from './components/ui'

// La página de lección arrastra CodeMirror y react-markdown: se descarga solo al abrir una lección.
const LessonPage = lazy(() => import('./components/LessonPage').then((m) => ({ default: m.LessonPage })))
// La guía de referencia (con sus 8 colecciones) también se descarga solo cuando se abre.
const CertificadoPage = lazy(() => import('./components/CertificadoPage').then((m) => ({ default: m.CertificadoPage })))
const ReferenciaPage = lazy(() => import('./components/referencia/ReferenciaPage').then((m) => ({ default: m.ReferenciaPage })))

function Cargando() {
  return (
    <div role="status" aria-live="polite" className="flex items-center gap-2 p-10 text-sm text-slate-400">
      <Spinner /> Cargando…
    </div>
  )
}

/** Exige sesión iniciada; sin ella manda a /ingresar y recuerda a dónde quería ir. */
function useRequiereSesion() {
  const sesionId = useAccountStore((s) => s.sesionId)
  const ubicacion = useLocation()
  return sesionId ? null : <Navigate to="/ingresar" replace state={{ desde: ubicacion.pathname + ubicacion.search }} />
}

/** Diagnóstico inicial: requiere sesión, pero no el marco de la aplicación. */
function PantallaCompleta({ children }: { children: ReactNode }) {
  return useRequiereSesion() ?? <>{children}</>
}

/**
 * Marco de la aplicación (barra lateral, encabezado y búsqueda). Es una ruta de diseño: se
 * mantiene montado al navegar entre páginas, así no se pierde el estado de la barra lateral.
 */
function AreaProtegida() {
  const redireccion = useRequiereSesion()
  const onboardingCompletado = useProgressStore((s) => s.onboardingCompletado)
  if (redireccion) return redireccion
  if (!onboardingCompletado) return <Navigate to="/onboarding" replace />
  return (
    <Layout>
      <Suspense fallback={<Cargando />}>
        <Outlet />
      </Suspense>
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
          <PantallaCompleta>
            <Onboarding />
          </PantallaCompleta>
        }
      />
      <Route element={<AreaProtegida />}>
        <Route path="/curso" element={<Dashboard />} />
        <Route path="/cursos/:cursoId" element={<CursoPage />} />
        <Route path="/leccion/:leccionId" element={<LessonPage />} />
        <Route path="/referencia" element={<ReferenciaPage />} />
        <Route path="/referencia/:coleccionId" element={<ReferenciaPage />} />
        <Route path="/certificado" element={<CertificadoPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
