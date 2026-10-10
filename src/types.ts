import type { EjemploHoja, EjercicioHoja } from './excel/tipos'

export type Mastery = 'NO_INICIADO' | 'EN_APRENDIZAJE' | 'PRACTICADO' | 'DOMINADO'

export type LearningStyle = 'explicacion' | 'practica' | 'proyectos'

export interface DiagnosticAnswers {
  experienciaPrevia: 'ninguna' | 'basica' | 'intermedia' | 'avanzada'
  objetivoPrincipal: string
  tiempoDisponible: 'poco' | 'moderado' | 'alto'
  experienciaDatos: 'ninguna' | 'basica' | 'intermedia'
  estiloPreferido: LearningStyle
}

export interface QuizQuestion {
  id: string
  pregunta: string
  opciones: string[]
  respuestaCorrecta: number
  explicacion: string
}

export interface Exercise {
  id: string
  enunciado: string
  codigoInicial: string
  solucion: string
  /** Se ejecuta tras correr el código del alumno; recibe stdout capturado y debe lanzar si falla. */
  validar: (stdout: string) => { ok: boolean; mensaje: string }
  pistas: string[]
}

export interface Lesson {
  id: string
  /** Con qué se practica: Python (por defecto) o fórmulas de hoja de cálculo. */
  motor?: 'python' | 'excel'
  moduloId: string
  titulo: string
  objetivo: string
  porQueImporta: string
  concepto: string // markdown
  /** Ejemplos: código (texto) o, en las lecciones de Excel (`motor: 'excel'`), una hoja con fórmulas y su resultado. */
  ejemploMinimo: string | EjemploHoja
  ejemploAplicado: string | EjemploHoja
  errorFrecuente: { codigo: string; explicacion: string }
  practicaGuiada: Exercise | EjercicioHoja
  reto: Exercise | EjercicioHoja
  verificacion: QuizQuestion[]
  resumen: string[]
  proximoPaso: string
  conceptos: string[] // conceptos clave que esta lección enseña (para mastery tracking)
}

/** Datos mínimos de una lección para navegación (el contenido completo se carga bajo demanda). */
export type LessonSummary = Pick<Lesson, 'id' | 'moduloId' | 'titulo'>

export type NivelCurso = 'Básico' | 'Intermedio' | 'Avanzado'

/** Un curso independiente dentro de la ruta de estudio. */
export interface Curso {
  id: string
  /** Posición del curso en la ruta recomendada (1 = por dónde empezar). */
  paso: number
  titulo: string
  /** Frase corta para la tarjeta. */
  resumen: string
  descripcion: string
  nivel: NivelCurso
  icono: string
  /** Lo que el estudiante sabrá hacer al terminar. */
  aprenderas: string[]
  /** Qué conviene saber antes de empezar. */
  requisitos: string
  /** Si sus lecciones cuentan para el certificado «AI Academy» actual. Por defecto sí; los cursos nuevos lo desactivan hasta tener certificado propio. */
  certifica?: boolean
  /** `true` si el curso aún no tiene contenido: se muestra como «Próximamente». */
  proximamente?: boolean
}

/** Ruta sugerida según el objetivo del estudiante: una secuencia de cursos. */
export interface RutaObjetivo {
  id: string
  titulo: string
  icono: string
  descripcion: string
  /** Ids de curso, en el orden recomendado. */
  cursoIds: string[]
}

export interface ModuleMeta {
  id: string
  cursoId: string
  numero: number
  titulo: string
  descripcion: string
  disponible: boolean
  lessonIds: string[]
}

export interface ExerciseAttempt {
  exerciseId: string
  lessonId: string
  timestamp: number
  correcto: boolean
}

export interface StudentState {
  onboardingCompletado: boolean
  diagnostico: DiagnosticAnswers | null
  level: number // 0-5
  completedModules: string[]
  completedLessons: string[]
  masteredConcepts: Record<string, Mastery>
  weakConcepts: string[]
  exerciseHistory: ExerciseAttempt[]
  quizScores: Record<string, number> // lessonId -> score 0-100
  projectProgress: Record<string, number>
  preferredLearningStyle: LearningStyle | null
  anthropicApiKey: string | null
  /** Cuándo empezó el estudiante el programa (primer ingreso a su cuenta). */
  inicioEn: number | null
  /** Cuándo completó todas las lecciones (habilita el certificado). */
  completadoEn: number | null
  /** Segundos de estudio activo (pestaña visible y con actividad reciente). */
  tiempoActivoSeg: number
  /** Días (AAAA-MM-DD, hora local) en los que estudió. */
  diasActivos: string[]
  /** Última lección abierta, para "continuar donde quedaste". */
  ultimaLeccionId: string | null
}
