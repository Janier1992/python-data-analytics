import type { LessonSummary, ModuleMeta, Track } from '../types'
import { lessonIndex } from './generated'

// Estructura del curso inspirada en la metodología de bootcamps profesionales
// de analítica/ciencia de datos (progresión por sprints con proyecto de
// portafolio al cierre de cada bloque temático). El contenido es 100% propio;
// solo se adoptó la lógica de secuenciación pedagógica, no textos ni diseño.
export const tracks: Track[] = [
  {
    id: 'curso-estadistica-descriptiva',
    orden: 1,
    titulo: 'Estadística descriptiva',
    descripcion: 'Cómo resumir, describir y entender datos: variables, frecuencias, tendencia central, dispersión, posición, forma y relaciones. Solo necesitas modificar pequeños fragmentos de código ya escritos.',
    certifica: false,
  },
  {
    id: 'curso-probabilidad',
    orden: 2,
    titulo: 'Probabilidad y distribuciones',
    descripcion: 'Del azar a los modelos: reglas de probabilidad, Bayes, variables aleatorias, binomial, Poisson, normal, exponencial, teorema central del límite y simulación.',
    certifica: false,
  },
  {
    id: 'curso-inferencia',
    orden: 3,
    titulo: 'Estadística inferencial',
    descripcion: 'De la muestra a la decisión: muestreo, intervalos de confianza, pruebas de hipótesis, A/B testing, chi-cuadrado, regresión, ANOVA y cómo evitar los errores de interpretación más comunes.',
    certifica: false,
  },
  {
    id: 'ruta-fundamentos',
    orden: 4,
    titulo: 'Fundamentos de Python',
    descripcion: 'La base del lenguaje: sintaxis, control de flujo, estructuras de datos y buenas prácticas.',
  },
  {
    id: 'ruta-analista',
    orden: 5,
    titulo: 'Analista de Datos con Python',
    descripcion: 'NumPy, pandas, limpieza, visualización, EDA y estadística aplicada — el paquete completo de un analista de datos.',
  },
  {
    id: 'ruta-ciencia-datos',
    orden: 6,
    titulo: 'Ciencia de Datos y Machine Learning',
    descripcion: 'De los primeros modelos con scikit-learn hasta series temporales, NLP básico y redes neuronales.',
  },
  {
    id: 'ruta-herramientas',
    orden: 7,
    titulo: 'Herramientas complementarias del analista',
    descripcion: 'SQL, línea de comandos, Git/GitHub y BI — el siguiente paquete una vez dominado Python.',
  },
]

function idsDe(moduloId: string): string[] {
  return lessonIndex.filter((l) => l.moduloId === moduloId).map((l) => l.id)
}

export const curriculum: ModuleMeta[] = [
  // Curso 1 — Estadística descriptiva (en construcción)
  { id: 'modulo-22', trackId: 'curso-estadistica-descriptiva', numero: 22, titulo: 'Datos, variables y tendencia central', descripcion: 'Población y muestra, escalas de medición, tablas de frecuencia, media, mediana y moda.', disponible: true, lessonIds: idsDe('modulo-22') },
  { id: 'modulo-23', trackId: 'curso-estadistica-descriptiva', numero: 23, titulo: 'Variabilidad y posición', descripcion: 'Rango, varianza, desviación estándar, coeficiente de variación, cuantiles, puntuaciones z y valores atípicos.', disponible: true, lessonIds: idsDe('modulo-23') },
  { id: 'modulo-24', trackId: 'curso-estadistica-descriptiva', numero: 24, titulo: 'Forma y relaciones entre variables', descripcion: 'Asimetría, curtosis, histogramas, correlación (Pearson y Spearman) y tablas de contingencia.', disponible: true, lessonIds: idsDe('modulo-24') },
  { id: 'modulo-25', trackId: 'curso-estadistica-descriptiva', numero: 25, titulo: 'Proyecto integrador: estudio descriptivo', descripcion: 'Un caso completo: de la pregunta y la revisión de datos a un reporte con conclusiones y limitaciones.', disponible: true, lessonIds: idsDe('modulo-25') },
  // Curso 2 — Probabilidad y distribuciones (en construcción)
  { id: 'modulo-26', trackId: 'curso-probabilidad', numero: 26, titulo: 'Fundamentos de probabilidad', descripcion: 'Espacio muestral, reglas de la suma y del complemento, probabilidad condicional, independencia y teorema de Bayes.', disponible: true, lessonIds: idsDe('modulo-26') },
  { id: 'modulo-27', trackId: 'curso-probabilidad', numero: 27, titulo: 'Variables aleatorias discretas', descripcion: 'Conteo, esperanza y varianza, distribuciones binomial y de Poisson, y simulación Monte Carlo.', disponible: true, lessonIds: idsDe('modulo-27') },
  { id: 'modulo-28', trackId: 'curso-probabilidad', numero: 28, titulo: 'Distribuciones continuas', descripcion: 'Densidad, uniforme, normal, puntuaciones z y percentiles, exponencial y teorema central del límite.', disponible: true, lessonIds: idsDe('modulo-28') },
  { id: 'modulo-29', trackId: 'curso-probabilidad', numero: 29, titulo: 'Proyecto integrador: calidad, capacidad y plazos', descripcion: 'Un caso de operaciones que combina binomial, Poisson, normal y simulación en un reporte final.', disponible: true, lessonIds: idsDe('modulo-29') },

  // Curso 3 — Estadística inferencial (en construcción)
  { id: 'modulo-30', trackId: 'curso-inferencia', numero: 30, titulo: 'Muestreo y estimación', descripcion: 'Muestreo y sesgo, estimadores, error estándar, tamaño de muestra e intervalos de confianza para medias y proporciones.', disponible: true, lessonIds: idsDe('modulo-30') },
  { id: 'modulo-31', trackId: 'curso-inferencia', numero: 31, titulo: 'Pruebas de hipótesis', descripcion: 'Lógica del p-valor, prueba t (una y dos muestras, pareada), A/B testing con proporciones y chi-cuadrado.', disponible: true, lessonIds: idsDe('modulo-31') },
  { id: 'modulo-32', trackId: 'curso-inferencia', numero: 32, titulo: 'Relaciones y modelos', descripcion: 'Regresión simple y múltiple, R² y residuos, ANOVA, tamaño del efecto y comparaciones múltiples.', disponible: true, lessonIds: idsDe('modulo-32') },
  { id: 'modulo-33', trackId: 'curso-inferencia', numero: 33, titulo: 'Proyecto integrador: análisis de un A/B test', descripcion: 'Un experimento completo: hipótesis, intervalos, pruebas, tamaño del efecto y reporte con recomendación.', disponible: true, lessonIds: idsDe('modulo-33') },

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
  { id: 'modulo-15', trackId: 'ruta-ciencia-datos', numero: 15, titulo: 'Aprendizaje no supervisado', descripcion: 'K-Means y cómo elegir k, DBSCAN (con detección de ruido) y PCA.', disponible: true, lessonIds: idsDe('modulo-15') },
  { id: 'modulo-16', trackId: 'ruta-ciencia-datos', numero: 16, titulo: 'Series temporales y texto (NLP básico)', descripcion: 'Series temporales (resample, rezagos, validación temporal) y texto con bolsa de palabras y TF-IDF.', disponible: true, lessonIds: idsDe('modulo-16') },
  { id: 'modulo-17', trackId: 'ruta-ciencia-datos', numero: 17, titulo: 'Introducción a redes neuronales', descripcion: 'Neurona artificial, forward pass, descenso de gradiente y redes con MLPClassifier de scikit-learn.', disponible: true, lessonIds: idsDe('modulo-17') },
  { id: 'modulo-18', trackId: 'ruta-ciencia-datos', numero: 18, titulo: 'Proyecto integrador: Ciencia de Datos', descripcion: 'Proyecto de abandono de clientes: de los datos al modelo, con línea base, métricas y conclusiones.', disponible: true, lessonIds: idsDe('modulo-18') },

  // Ruta 4 — Herramientas complementarias (después de Python)
  { id: 'modulo-19', trackId: 'ruta-herramientas', numero: 19, titulo: 'SQL para análisis de datos', descripcion: 'SQLite en el navegador: SELECT, agregaciones, JOIN, CTE y consultas desde pandas.', disponible: true, lessonIds: idsDe('modulo-19') },
  { id: 'modulo-20', trackId: 'ruta-herramientas', numero: 20, titulo: 'Herramientas de desarrollo', descripcion: 'Línea de comandos, Git y GitHub para trabajo colaborativo.', disponible: true, lessonIds: idsDe('modulo-20') },
  { id: 'modulo-21', trackId: 'ruta-herramientas', numero: 21, titulo: 'Introducción a BI y preparación profesional', descripcion: 'KPIs, diseño de dashboards, storytelling con datos, portafolio en GitHub y entrevistas.', disponible: true, lessonIds: idsDe('modulo-21') },
]

/** Resumen (id, módulo y título) de todas las lecciones, en el orden de estudio (según el orden de las rutas y de los módulos). */
export const todasLasLecciones: LessonSummary[] = [...curriculum]
  .sort((a, b) => (getTrack(a.trackId)?.orden ?? 0) - (getTrack(b.trackId)?.orden ?? 0) || a.numero - b.numero)
  .flatMap((m) => lessonIndex.filter((l) => l.moduloId === m.id))

/** Módulos cuyas lecciones cuentan para el certificado actual. */
function moduloCertifica(m: ModuleMeta): boolean {
  return getTrack(m.trackId)?.certifica !== false
}

/** Ids de las lecciones que cuentan para el certificado actual. */
export const leccionesCertificables: string[] = curriculum.filter(moduloCertifica).flatMap((m) => m.lessonIds)

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

/** Igual que `moduloLeccionesMap`, pero solo con los módulos que cuentan para el certificado. */
export function moduloLeccionesCertificablesMap(): Record<string, string[]> {
  return Object.fromEntries(curriculum.filter(moduloCertifica).map((m) => [m.id, m.lessonIds]))
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
