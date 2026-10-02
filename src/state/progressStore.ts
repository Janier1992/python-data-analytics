import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  DiagnosticAnswers,
  ExerciseAttempt,
  Mastery,
  StudentState,
} from '../types'

interface ProgressActions {
  completarOnboarding: (diagnostico: DiagnosticAnswers, nivelInicial: number) => void
  marcarLeccionCompletada: (moduloId: string, leccionId: string) => void
  registrarIntentoEjercicio: (attempt: ExerciseAttempt) => void
  registrarQuiz: (leccionId: string, score: number) => void
  actualizarDominio: (concepto: string, nivel: Mastery) => void
  setProjectProgress: (proyectoId: string, porcentaje: number) => void
  setApiKey: (key: string | null) => void
  sincronizarModulosCompletados: (moduloLecciones: Record<string, string[]>) => void
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

      marcarLeccionCompletada: (moduloId, leccionId) => {
        const { completedLessons, completedModules } = get()
        if (!completedLessons.includes(leccionId)) {
          set({ completedLessons: [...completedLessons, leccionId] })
        }
        if (!completedModules.includes(moduloId)) {
          // el llamador decide cuándo un módulo está completo; aquí solo evitamos duplicados
        }
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

      resetProgreso: () => set(estadoInicial),
    }),
    { name: 'pyacademy-progress' },
  ),
)
