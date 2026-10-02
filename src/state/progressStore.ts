import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { StateStorage } from 'zustand/middleware'
import type {
  DiagnosticAnswers,
  ExerciseAttempt,
  Mastery,
  StudentState,
} from '../types'
import { lessonIndex } from '../content/generated'

interface ProgressActions {
  completarOnboarding: (diagnostico: DiagnosticAnswers, nivelInicial: number) => void
  marcarLeccionCompletada: (moduloId: string, leccionId: string) => void
  registrarIntentoEjercicio: (attempt: ExerciseAttempt) => void
  registrarQuiz: (leccionId: string, score: number) => void
  actualizarDominio: (concepto: string, nivel: Mastery) => void
  setProjectProgress: (proyectoId: string, porcentaje: number) => void
  setApiKey: (key: string | null) => void
  sincronizarModulosCompletados: (moduloLecciones: Record<string, string[]>) => void
  iniciarPrograma: () => void
  verificarFinalizacion: () => void
  registrarLeccionVista: (leccionId: string) => void
  sumarTiempoActivo: (segundos: number) => void
  resetProgreso: () => void
}

const estadoInicial: StudentState = {
  onboardingCompletado: false,
  diagnostico: null,
  level: 0,
  completedModules: [],
  completedLessons: [],
  masteredConcepts: {},
  weakConcepts: [],
  exerciseHistory: [],
  quizScores: {},
  projectProgress: {},
  preferredLearningStyle: null,
  anthropicApiKey: null,
  inicioEn: null,
  completadoEn: null,
  tiempoActivoSeg: 0,
  diasActivos: [],
  ultimaLeccionId: null,
}

/** AAAA-MM-DD en hora local. */
export function claveDia(fecha = new Date()): string {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${fecha.getFullYear()}-${mes}-${dia}`
}

/** ¿Todas las lecciones del curso están completadas? */
export function programaCompleto(completedLessons: string[]): boolean {
  const hechas = new Set(completedLessons)
  return lessonIndex.length > 0 && lessonIndex.every((l) => hechas.has(l.id))
}

// ───────── Almacenamiento por cuenta ─────────
// Cada estudiante tiene su propio registro de progreso en localStorage. La cuenta activa se fija
// con `cargarProgresoDe` al iniciar o cambiar de sesión.
const PREFIJO_PROGRESO = 'ai-academy-progreso:'
let usuarioActivo: string | null = null
let escrituraBloqueada = false

export const claveProgreso = (cuentaId: string) => `${PREFIJO_PROGRESO}${cuentaId}`

const almacenamientoPorCuenta: StateStorage = {
  getItem: () => {
    try {
      return usuarioActivo ? localStorage.getItem(claveProgreso(usuarioActivo)) : null
    } catch {
      return null
    }
  },
  setItem: (_nombre, valor) => {
    if (!usuarioActivo || escrituraBloqueada) return
    try {
      localStorage.setItem(claveProgreso(usuarioActivo), valor)
    } catch {
      // cuota llena o almacenamiento bloqueado: el progreso queda solo en memoria
    }
  },
  removeItem: () => {
    if (!usuarioActivo || escrituraBloqueada) return
    try {
      localStorage.removeItem(claveProgreso(usuarioActivo))
    } catch {
      /* nada que hacer */
    }
  },
}

export const useProgressStore = create<StudentState & ProgressActions>()(
  persist(
    (set, get) => ({
      ...estadoInicial,

      completarOnboarding: (diagnostico, nivelInicial) =>
        set({
          onboardingCompletado: true,
          diagnostico,
          level: nivelInicial,
          preferredLearningStyle: diagnostico.estiloPreferido,
        }),

      marcarLeccionCompletada: (_moduloId, leccionId) => {
        const { completedLessons, completadoEn } = get()
        if (completedLessons.includes(leccionId)) return
        const nuevas = [...completedLessons, leccionId]
        set({
          completedLessons: nuevas,
          // la fecha de finalización se fija una sola vez, al completar la última lección
          completadoEn: completadoEn ?? (programaCompleto(nuevas) ? Date.now() : null),
        })
      },

      registrarIntentoEjercicio: (attempt) =>
        set({ exerciseHistory: [...get().exerciseHistory, attempt] }),

      registrarQuiz: (leccionId, score) =>
        set({ quizScores: { ...get().quizScores, [leccionId]: score } }),

      actualizarDominio: (concepto, nivel) =>
        set({
          masteredConcepts: { ...get().masteredConcepts, [concepto]: nivel },
          weakConcepts:
            nivel === 'EN_APRENDIZAJE'
              ? Array.from(new Set([...get().weakConcepts, concepto]))
              : get().weakConcepts.filter((c) => c !== concepto),
        }),

      setProjectProgress: (proyectoId, porcentaje) =>
        set({ projectProgress: { ...get().projectProgress, [proyectoId]: porcentaje } }),

      setApiKey: (key) => set({ anthropicApiKey: key }),

      sincronizarModulosCompletados: (moduloLecciones) => {
        const { completedLessons } = get()
        const completos = Object.entries(moduloLecciones)
          .filter(([, lessonIds]) => lessonIds.length > 0 && lessonIds.every((id) => completedLessons.includes(id)))
          .map(([moduloId]) => moduloId)
        set({ completedModules: completos })
      },

      iniciarPrograma: () => {
        if (get().inicioEn === null) set({ inicioEn: Date.now() })
      },

      // Si todas las lecciones están hechas pero no se guardó la fecha (p. ej. progreso importado), se fija ahora
      verificarFinalizacion: () => {
        const { completedLessons, completadoEn } = get()
        if (completadoEn === null && programaCompleto(completedLessons)) set({ completadoEn: Date.now() })
      },

      registrarLeccionVista: (leccionId) => {
        if (get().ultimaLeccionId !== leccionId) set({ ultimaLeccionId: leccionId })
      },

      sumarTiempoActivo: (segundos) => {
        const hoy = claveDia()
        const { tiempoActivoSeg, diasActivos } = get()
        set({
          tiempoActivoSeg: tiempoActivoSeg + segundos,
          diasActivos: diasActivos.includes(hoy) ? diasActivos : [...diasActivos, hoy],
        })
      },

      // Al reiniciar el progreso, el programa vuelve a empezar desde hoy (afecta la duración del certificado)
      resetProgreso: () => set({ ...estadoInicial, inicioEn: Date.now() }),
    }),
    {
      name: 'progreso', // el nombre real de la clave lo decide el almacenamiento por cuenta
      version: 1,
      storage: createJSONStorage(() => almacenamientoPorCuenta),
    },
  ),
)

/**
 * Activa el progreso de una cuenta (o de ninguna, con null): limpia el estado en memoria y carga
 * lo guardado para esa cuenta. Se llama al iniciar la app, al iniciar y al cerrar sesión.
 */
export async function cargarProgresoDe(cuentaId: string | null): Promise<void> {
  // Mientras se limpia el estado en memoria no se debe sobrescribir lo guardado de la cuenta
  escrituraBloqueada = true
  try {
    usuarioActivo = cuentaId
    useProgressStore.setState({ ...estadoInicial })
  } finally {
    escrituraBloqueada = false
  }
  if (cuentaId) await useProgressStore.persist.rehydrate()
}

/** Copia a una cuenta el progreso de la versión anterior de la app (sin cuentas), una sola vez. */
export function importarProgresoAnterior(cuentaId: string): boolean {
  const CLAVE_ANTERIOR = 'pyacademy-progress'
  try {
    const crudo = localStorage.getItem(CLAVE_ANTERIOR)
    if (!crudo) return false
    const estado = JSON.parse(crudo)?.state
    if (!estado?.onboardingCompletado) return false
    const importado = { ...estadoInicial, ...estado, inicioEn: Date.now() }
    localStorage.setItem(claveProgreso(cuentaId), JSON.stringify({ state: importado, version: 1 }))
    localStorage.removeItem(CLAVE_ANTERIOR)
    return true
  } catch {
    return false
  }
}

export function borrarProgresoDe(cuentaId: string): void {
  try {
    localStorage.removeItem(claveProgreso(cuentaId))
  } catch {
    /* nada que hacer */
  }
}
