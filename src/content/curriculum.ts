import type { LessonSummary, ModuleMeta, Track } from '../types'
import { lessonIndex } from './generated'

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

function idsDe(moduloId: string): string[] {
  return lessonIndex.filter((l) => l.moduloId === moduloId).map((l) => l.id)
}

export const curriculum: ModuleMeta[] = [
  // Ruta 1 — Fundamentos de Python (construida)
  { id: 'modulo-0', trackId: 'ruta-fundamentos', numero: 0, titulo: 'Orientación', descripcion: 'Qué es Python, entornos de trabajo y tu primer código.', disponible: true, lessonIds: idsDe('modulo-0') },
  { id: 'modulo-1', trackId: 'ruta-fundamentos', numero: 1, titulo: 'Fundamentos absolutos', descripcion: 'Variables, tipos de datos, strings, operadores y errores básicos.', disponible: true, lessonIds: idsDe('modulo-1') },
  { id: 'modulo-2', trackId: 'ruta-fundamentos', numero: 2, titulo: 'Control de flujo', descripcion: 'if/elif/else, bucles for/while, comprensión de listas.', disponible: true, lessonIds: idsDe('modulo-2') },
  { id: 'modulo-3', trackId: 'ruta-fundamentos', numero: 3, titulo: 'Estructuras de datos', descripcion: 'Listas, tuplas, diccionarios, conjuntos.', disponible: true, lessonIds: idsDe('modulo-3') },
  { id: 'modulo-4', trackId: 'ruta-fundamentos', numero: 4, titulo: 'Funciones y modularidad', descripcion: 'Funciones, *args/**kwargs, módulos e imports.', disponible: true, lessonIds: idsDe('modulo-4') },
  { id: 'modulo-5', trackId: 'ruta-fundamentos', numero: 5, titulo: 'Python profesional esencial', descripcion: 'Excepciones, archivos, JSON/CSV, type hints, código limpio.', disponible: true, lessonIds: idsDe('modulo-5') },

  // Ruta 2 — Analista de Datos con Python
  { id: 'modulo-6', trackId: 'ruta-analista', numero: 6, titulo: 'NumPy y pandas: fundamentos para datos', descripcion: 'Arrays, Series y DataFrame: la base para representar y operar datos reales.', disponible: true, lessonIds: idsDe('modulo-6') },
  { id: 'modulo-7', trackId: 'ruta-analista', numero: 7, titulo: 'Limpieza y preparación de datos (Data Wrangling)', descripcion: 'Duplicados, valores ausentes, tipos de datos y combinación de múltiples fuentes.', disponible: true, lessonIds: idsDe('modulo-7') },
  { id: 'modulo-8', trackId: 'ruta-analista', numero: 8, titulo: 'Transformación y agregación de datos', descripcion: 'groupby, tablas dinámicas y métricas de negocio (ingresos, costos, margen).', disponible: true, lessonIds: idsDe('modulo-8') },
  { id: 'modulo-9', trackId: 'ruta-analista', numero: 9, titulo: 'Visualización y storytelling de datos', descripcion: 'matplotlib para comunicar hallazgos con claridad: líneas, barras, histogramas y scatter plots.', disponible: true, lessonIds: idsDe('modulo-9') },
  { id: 'modulo-10', trackId: 'ruta-analista', numero: 10, titulo: 'EDA y estadística aplicada', descripcion: 'Patrones, correlaciones, outliers, distribuciones y pruebas de hipótesis.', disponible: true, lessonIds: idsDe('modulo-10') },
  { id: 'modulo-11', trackId: 'ruta-analista', numero: 11, titulo: 'Proyecto integrador: Analista de Datos', descripcion: 'Proyecto de portafolio end-to-end: de datos crudos a un reporte de negocio.', disponible: true, lessonIds: idsDe('modulo-11') },

  // Ruta 3 — Ciencia de Datos y Machine Learning
  { id: 'modulo-12', trackId: 'ruta-ciencia-datos', numero: 12, titulo: 'Fundamentos de Machine Learning', descripcion: 'scikit-learn, train/test, overfitting/underfitting, tu primer modelo.', disponible: true, lessonIds: idsDe('modulo-12') },
  { id: 'modulo-13', trackId: 'ruta-ciencia-datos', numero: 13, titulo: 'Ingeniería de características', descripcion: 'Encoding, escalado y prevención de data leakage.', disponible: true, lessonIds: idsDe('modulo-13') },
  { id: 'modulo-14', trackId: 'ruta-ciencia-datos', numero: 14, titulo: 'Aprendizaje supervisado: regresión y clasificación', descripcion: 'Métricas, validación cruzada y datos desbalanceados.', disponible: true, lessonIds: idsDe('modulo-14') },
  { id: 'modulo-15', trackId: 'ruta-ciencia-datos', numero: 15, titulo: 'Aprendizaje no supervisado', descripcion: 'Clustering (K-Means, DBSCAN), PCA y detección de anomalías.', disponible: true, lessonIds: idsDe('modulo-15') },
  { id: 'modulo-16', trackId: 'ruta-ciencia-datos', numero: 16, titulo: 'Series temporales y texto (NLP básico)', descripcion: 'Tendencia, estacionalidad, bolsa de palabras y TF-IDF.', disponible: true, lessonIds: idsDe('modulo-16') },
  { id: 'modulo-17', trackId: 'ruta-ciencia-datos', numero: 17, titulo: 'Introducción a redes neuronales', descripcion: 'Neurona, backpropagation, Keras/PyTorch y un vistazo a visión artificial.', disponible: true, lessonIds: idsDe('modulo-17') },
  { id: 'modulo-18', trackId: 'ruta-ciencia-datos', numero: 18, titulo: 'Proyecto integrador: Ciencia de Datos', descripcion: 'Proyecto de portafolio end-to-end de machine learning.', disponible: true, lessonIds: idsDe('modulo-18') },

  // Ruta 4 — Herramientas complementarias (después de Python)
  { id: 'modulo-19', trackId: 'ruta-herramientas', numero: 19, titulo: 'SQL para análisis de datos', descripcion: 'Bases relacionales, SELECT/JOIN, funciones de agregación y KPIs.', disponible: true, lessonIds: idsDe('modulo-19') },
  { id: 'modulo-20', trackId: 'ruta-herramientas', numero: 20, titulo: 'Herramientas de desarrollo', descripcion: 'Línea de comandos, Git y GitHub para trabajo colaborativo.', disponible: true, lessonIds: idsDe('modulo-20') },
  { id: 'modulo-21', trackId: 'ruta-herramientas', numero: 21, titulo: 'Introducción a BI y preparación profesional', descripcion: 'Dashboards interactivos y cómo presentar tu portafolio.', disponible: true, lessonIds: idsDe('modulo-21') },
]

/** Resumen (id, módulo y título) de todas las lecciones, en orden global. El contenido completo se carga con `cargarLeccion`. */
export const todasLasLecciones: LessonSummary[] = lessonIndex

export function getLeccion(id: string): LessonSummary | undefined {
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
export function getLeccionesAdyacentes(leccionId: string): { anterior: LessonSummary | null; siguiente: LessonSummary | null } {
  const idx = todasLasLecciones.findIndex((l) => l.id === leccionId)
  if (idx === -1) return { anterior: null, siguiente: null }
  return {
    anterior: idx > 0 ? todasLasLecciones[idx - 1] : null,
    siguiente: idx < todasLasLecciones.length - 1 ? todasLasLecciones[idx + 1] : null,
  }
}
