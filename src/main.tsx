import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { useAccountStore } from './state/accountStore'
import { cargarProgresoDe, useProgressStore } from './state/progressStore'
import './index.css'

async function iniciar() {
  // Antes de pintar nada: carga el progreso de la cuenta con sesión iniciada y fija la fecha de inicio
  const { sesionId, cuentas } = useAccountStore.getState()
  if (sesionId && cuentas.some((c) => c.id === sesionId)) {
    await cargarProgresoDe(sesionId)
    useProgressStore.getState().iniciarPrograma()
  } else if (sesionId) {
    useAccountStore.setState({ sesionId: null }) // la cuenta ya no existe
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}

void iniciar()
