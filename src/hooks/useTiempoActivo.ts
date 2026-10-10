import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { cursoDeLeccion } from '../content/curriculum'
import { cursoDeRuta } from '../lib/certificadoCurso'
import { useProgressStore } from '../state/progressStore'

const PASO_SEG = 10 // cada cuánto se acumula tiempo
const INACTIVIDAD_MAX_MS = 120_000 // sin interacción por más de 2 minutos no cuenta como estudio

/**
 * Acumula el tiempo de estudio activo: solo cuenta mientras la pestaña está visible y hubo
 * actividad (clic, teclado, scroll o movimiento) en los últimos 2 minutos.
 */
export function useTiempoActivo() {
  const sumarTiempoActivo = useProgressStore((s) => s.sumarTiempoActivo)
  const { pathname } = useLocation()

  // Curso en el que está el estudiante (por la ruta): el tiempo también se atribuye a su certificado de curso
  const cursoActual = useRef<string | null>(null)
  cursoActual.current = cursoDeRuta(pathname, cursoDeLeccion)

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
      sumarTiempoActivo(PASO_SEG, cursoActual.current)
    }, PASO_SEG * 1000)

    return () => {
      eventos.forEach((e) => window.removeEventListener(e, registrar))
      window.clearInterval(temporizador)
    }
  }, [sumarTiempoActivo])
}
