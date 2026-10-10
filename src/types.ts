import type { EjemploResuelto, EjercicioCalculo } from './calculo/tipos'
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
  /** Con qué se practica: Python (por defecto), fórmulas de hoja de cálculo o cálculo y razonamiento sin programación (`calculo`: cursos de fundamentos). */
  motor?: 'python' | 'excel' | 'calculo'
  moduloId: string
  titulo: string
  objetivo: string
  porQueImporta: string
  concepto: string // markdown
  /** Ejemplos: código (texto) o, en las lecciones de Excel (`motor: 'excel'`), una hoja con fórmulas y su resultado. */
  ejemploMinimo: string | EjemploHoja | EjemploResuelto
  ejemploAplicado: string | EjemploHoja | EjemploResuelto
  errorFrecuente: { codigo: string; explicacion: string }
  practicaGuiada: Exercise | EjercicioHoja | EjercicioCalculo
  reto: Exercise | EjercicioHoja | EjercicioCalculo
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
  /** Si sus lecciones cuentan para el certificado del programa «AI Academy» original (96 lecciones). Por defecto sí; los cursos añadidos después lo desactivan. Todos los cursos con contenido tienen además su propio certificado de curso. */
  certifica?: boolean
  /** `true` si el curso aún no tiene contenido: se muestra como «Próximamente». */
  proximamente?: boolean
  /** Curso de fundamentos sin programación: sus lecciones usan ejemplos resueltos y ejercicios de cálculo (`motor: 'calculo'`), sin scripts de Python. */
  sinProgramacion?: boolean
  /** Aclaración que se imprime en el certificado del curso sobre lo que la plataforma sí y no evalúa (por ejemplo, que no se ejecuta Power BI). */
  avisoCertificado?: string
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
  /** Si se indica, tiene prioridad sobre `Curso.certifica` para este módulo (ampliaciones que no cuentan para el certificado actual). */
  certifica?: boolean
}

export interface ExerciseAttempt {
  exerciseId: string
  lessonId: string
  timestamp: number
  correcto: boolean
}

/** Actividad del estudiante en un curso, para su certificado propio. */
export interface ActividadCurso {
  /** Primera vez que abrió una lección del curso. */
  inicioEn: number | null
  /** Cuándo completó todas las lecciones del curso (se fija una sola vez). */
  completadoEn: number | null
  /** Segundos de estudio activo mientras estaba en el curso. */
  tiempoSeg: number
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
  /** Fechas y tiempo por curso (certificados de curso), por id de curso. */
  cursosProgreso: Record<string, ActividadCurso>
}
