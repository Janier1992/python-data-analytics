import type { Lesson, ModuleMeta, Track } from '../types'
import { module0Lessons } from './modules/module0'
import { module1Lessons } from './modules/module1'
import { module2Lessons } from './modules/module2'
import { module3Lessons } from './modules/module3'
import { module4Lessons } from './modules/module4'
import { module5Lessons } from './modules/module5'
import { module6Lessons } from './modules/module6'
import { module7Lessons } from './modules/module7'
import { module8Lessons } from './modules/module8'
import { module9Lessons } from './modules/module9'
import { module10Lessons } from './modules/module10'
import { module11Lessons } from './modules/module11'
import { module12Lessons } from './modules/module12'
import { module13Lessons } from './modules/module13'
import { module14Lessons } from './modules/module14'
import { module15Lessons } from './modules/module15'
import { module16Lessons } from './modules/module16'
import { module17Lessons } from './modules/module17'
import { module18Lessons } from './modules/module18'
import { module19Lessons } from './modules/module19'
import { module20Lessons } from './modules/module20'
import { module21Lessons } from './modules/module21'

// Estructura del curso inspirada en la metodología de bootcamps profesionales
// de analítica/ciencia de datos (progresión por sprints con proyecto de
// portafolio al cierre de cada bloque temático). El contenido es 100% propio;
// solo se adoptó la lógica de secuenciación pedagógica, no textos ni diseño.
export const tracks: Track[] = [
  {
    id: 'ruta-fundamentos',
    orden: 1,
    titulo: 'Fundamentos de Python',
    descripcion: 'La base del lenguaje: sintaxis, control de flujo, estructuras de datos y buenas prácticas.',
  },
  {
    id: 'ruta-analista',
    orden: 2,
    titulo: 'Analista de Datos con Python',
    descripcion: 'NumPy, pandas, limpieza, visualización, EDA y estadística aplicada — el paquete completo de un analista de datos.',
  },
  {
    id: 'ruta-ciencia-datos',
    orden: 3,
    titulo: 'Ciencia de Datos y Machine Learning',
    descripcion: 'De los primeros modelos con scikit-learn hasta series temporales, NLP básico y redes neuronales.',
  },
  {
    id: 'ruta-herramientas',
    orden: 4,
    titulo: 'Herramientas complementarias del analista',
    descripcion: 'SQL, línea de comandos, Git/GitHub y BI — el siguiente paquete una vez dominado Python.',
  },
]

export const curriculum: ModuleMeta[] = [
  // Ruta 1 — Fundamentos de Python (construida)
  { id: 'modulo-0', trackId: 'ruta-fundamentos', numero: 0, titulo: 'Orientación', descripcion: 'Qué es Python, entornos de trabajo y tu primer código.', disponible: true, lessonIds: module0Lessons.map((l) => l.id) },
  { id: 'modulo-1', trackId: 'ruta-fundamentos', numero: 1, titulo: 'Fundamentos absolutos', descripcion: 'Variables, tipos de datos, strings, operadores y errores básicos.', disponible: true, lessonIds: module1Lessons.map((l) => l.id) },
  { id: 'modulo-2', trackId: 'ruta-fundamentos', numero: 2, titulo: 'Control de flujo', descripcion: 'if/elif/else, bucles for/while, comprensión de listas.', disponible: true, lessonIds: module2Lessons.map((l) => l.id) },
  { id: 'modulo-3', trackId: 'ruta-fundamentos', numero: 3, titulo: 'Estructuras de datos', descripcion: 'Listas, tuplas, diccionarios, conjuntos.', disponible: true, lessonIds: module3Lessons.map((l) => l.id) },
  { id: 'modulo-4', trackId: 'ruta-fundamentos', numero: 4, titulo: 'Funciones y modularidad', descripcion: 'Funciones, *args/**kwargs, módulos e imports.', disponible: true, lessonIds: module4Lessons.map((l) => l.id) },
  { id: 'modulo-5', trackId: 'ruta-fundamentos', numero: 5, titulo: 'Python profesional esencial', descripcion: 'Excepciones, archivos, JSON/CSV, type hints, código limpio.', disponible: true, lessonIds: module5Lessons.map((l) => l.id) },

  // Ruta 2 — Analista de Datos con Python
  { id: 'modulo-6', trackId: 'ruta-analista', numero: 6, titulo: 'NumPy y pandas: fundamentos para datos', descripcion: 'Arrays, Series y DataFrame: la base para representar y operar datos reales.', disponible: true, lessonIds: module6Lessons.map((l) => l.id) },
  { id: 'modulo-7', trackId: 'ruta-analista', numero: 7, titulo: 'Limpieza y preparación de datos (Data Wrangling)', descripcion: 'Duplicados, valores ausentes, tipos de datos y combinación de múltiples fuentes.', disponible: true, lessonIds: module7Lessons.map((l) => l.id) },
  { id: 'modulo-8', trackId: 'ruta-analista', numero: 8, titulo: 'Transformación y agregación de datos', descripcion: 'groupby, tablas dinámicas y métricas de negocio (ingresos, costos, margen).', disponible: true, lessonIds: module8Lessons.map((l) => l.id) },
  { id: 'modulo-9', trackId: 'ruta-analista', numero: 9, titulo: 'Visualización y storytelling de datos', descripcion: 'matplotlib para comunicar hallazgos con claridad: líneas, barras, histogramas y scatter plots.', disponible: true, lessonIds: module9Lessons.map((l) => l.id) },
  { id: 'modulo-10', trackId: 'ruta-analista', numero: 10, titulo: 'EDA y estadística aplicada', descripcion: 'Patrones, correlaciones, outliers, distribuciones y pruebas de hipótesis.', disponible: true, lessonIds: module10Lessons.map((l) => l.id) },
  { id: 'modulo-11', trackId: 'ruta-analista', numero: 11, titulo: 'Proyecto integrador: Analista de Datos', descripcion: 'Proyecto de portafolio end-to-end: de datos crudos a un reporte de negocio.', disponible: true, lessonIds: module11Lessons.map((l) => l.id) },

  // Ruta 3 — Ciencia de Datos y Machine Learning
  { id: 'modulo-12', trackId: 'ruta-ciencia-datos', numero: 12, titulo: 'Fundamentos de Machine Learning', descripcion: 'scikit-learn, train/test, overfitting/underfitting, tu primer modelo.', disponible: true, lessonIds: module12Lessons.map((l) => l.id) },
  { id: 'modulo-13', trackId: 'ruta-ciencia-datos', numero: 13, titulo: 'Ingeniería de características', descripcion: 'Encoding, escalado y prevención de data leakage.', disponible: true, lessonIds: module13Lessons.map((l) => l.id) },
  { id: 'modulo-14', trackId: 'ruta-ciencia-datos', numero: 14, titulo: 'Aprendizaje supervisado: regresión y clasificación', descripcion: 'Métricas, validación cruzada y datos desbalanceados.', disponible: true, lessonIds: module14Lessons.map((l) => l.id) },
  { id: 'modulo-15', trackId: 'ruta-ciencia-datos', numero: 15, titulo: 'Aprendizaje no supervisado', descripcion: 'Clustering (K-Means, DBSCAN), PCA y detección de anomalías.', disponible: true, lessonIds: module15Lessons.map((l) => l.id) },
  { id: 'modulo-16', trackId: 'ruta-ciencia-datos', numero: 16, titulo: 'Series temporales y texto (NLP básico)', descripcion: 'Tendencia, estacionalidad, bolsa de palabras y TF-IDF.', disponible: true, lessonIds: module16Lessons.map((l) => l.id) },
  { id: 'modulo-17', trackId: 'ruta-ciencia-datos', numero: 17, titulo: 'Introducción a redes neuronales', descripcion: 'Neurona, backpropagation, Keras/PyTorch y un vistazo a visión artificial.', disponible: true, lessonIds: module17Lessons.map((l) => l.id) },
  { id: 'modulo-18', trackId: 'ruta-ciencia-datos', numero: 18, titulo: 'Proyecto integrador: Ciencia de Datos', descripcion: 'Proyecto de portafolio end-to-end de machine learning.', disponible: true, lessonIds: module18Lessons.map((l) => l.id) },

  // Ruta 4 — Herramientas complementarias (después de Python)
  { id: 'modulo-19', trackId: 'ruta-herramientas', numero: 19, titulo: 'SQL para análisis de datos', descripcion: 'Bases relacionales, SELECT/JOIN, funciones de agregación y KPIs.', disponible: true, lessonIds: module19Lessons.map((l) => l.id) },
  { id: 'modulo-20', trackId: 'ruta-herramientas', numero: 20, titulo: 'Herramientas de desarrollo', descripcion: 'Línea de comandos, Git y GitHub para trabajo colaborativo.', disponible: true, lessonIds: module20Lessons.map((l) => l.id) },
  { id: 'modulo-21', trackId: 'ruta-herramientas', numero: 21, titulo: 'Introducción a BI y preparación profesional', descripcion: 'Dashboards interactivos y cómo presentar tu portafolio.', disponible: true, lessonIds: module21Lessons.map((l) => l.id) },
]

export const todasLasLecciones: Lesson[] = [
  ...module0Lessons,
  ...module1Lessons,
  ...module2Lessons,
  ...module3Lessons,
  ...module4Lessons,
  ...module5Lessons,
  ...module6Lessons,
  ...module7Lessons,
  ...module8Lessons,
  ...module9Lessons,
  ...module10Lessons,
  ...module11Lessons,
  ...module12Lessons,
  ...module13Lessons,
  ...module14Lessons,
  ...module15Lessons,
  ...module16Lessons,
  ...module17Lessons,
  ...module18Lessons,
  ...module19Lessons,
  ...module20Lessons,
  ...module21Lessons,
]

export function getLeccion(id: string): Lesson | undefined {
  return todasLasLecciones.find((l) => l.id === id)
}

export function getModulo(id: string): ModuleMeta | undefined {
  return curriculum.find((m) => m.id === id)
}

export function getTrack(id: string): Track | undefined {
  return tracks.find((t) => t.id === id)
}

export function modulosPorTrack(trackId: string): ModuleMeta[] {
  return curriculum.filter((m) => m.trackId === trackId)
}

export function moduloLeccionesMap(): Record<string, string[]> {
  return Object.fromEntries(curriculum.map((m) => [m.id, m.lessonIds]))
}

/** Lección anterior/siguiente en el orden global del curso (cruza módulos y rutas). */
export function getLeccionesAdyacentes(leccionId: string): { anterior: Lesson | null; siguiente: Lesson | null } {
  const idx = todasLasLecciones.findIndex((l) => l.id === leccionId)
  if (idx === -1) return { anterior: null, siguiente: null }
  return {
    anterior: idx > 0 ? todasLasLecciones[idx - 1] : null,
    siguiente: idx < todasLasLecciones.length - 1 ? todasLasLecciones[idx + 1] : null,
  }
}
