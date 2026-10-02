import { useEffect } from 'react'
import { useProgressStore } from '../state/progressStore'

const PASO_SEG = 10 // cada cuánto se acumula tiempo
const INACTIVIDAD_MAX_MS = 120_000 // sin interacción por más de 2 minutos no cuenta como estudio

/**
 * Acumula el tiempo de estudio activo: solo cuenta mientras la pestaña está visible y hubo
 * actividad (clic, teclado, scroll o movimiento) en los últimos 2 minutos.
 */
export function useTiempoActivo() {
  const sumarTiempoActivo = useProgressStore((s) => s.sumarTiempoActivo)

  useEffect(() => {
    let ultimaActividad = Date.now()
    const registrar = () => {
      ultimaActividad = Date.now()
    }
    const eventos = ['pointerdown', 'keydown', 'scroll', 'pointermove', 'touchstart'] as const
    eventos.forEach((e) => window.addEventListener(e, registrar, { passive: true }))

    const temporizador = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      if (Date.now() - ultimaActividad > INACTIVIDAD_MAX_MS) return
      sumarTiempoActivo(PASO_SEG)
    }, PASO_SEG * 1000)

    return () => {
      eventos.forEach((e) => window.removeEventListener(e, registrar))
      window.clearInterval(temporizador)
    }
  }, [sumarTiempoActivo])
}
