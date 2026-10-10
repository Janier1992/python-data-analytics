import type { Curso, LessonSummary, ModuleMeta } from '../types'
import { lessonIndex } from './generated'

// La plataforma se organiza en cursos independientes que siguen una misma ruta, del más básico al más
// avanzado. Cada curso agrupa módulos; el orden (`paso`) es el recomendado, pero cada curso se puede
// tomar por separado. El contenido es 100 % propio.
export const cursos: Curso[] = [
  {
    id: 'estadistica-descriptiva',
    paso: 1,
    titulo: 'Estadística descriptiva',
    resumen: 'Resumir y entender datos: variables, frecuencias, tendencia central, dispersión y relaciones.',
    descripcion: 'El punto de partida de cualquier analista: aprender a describir un conjunto de datos con números y gráficos antes de modelar nada.',
    nivel: 'Básico',
    icono: '📊',
    aprenderas: ['Clasificar variables y escalas de medición', 'Calcular e interpretar media, mediana, desviación y cuartiles', 'Detectar valores atípicos y medir correlaciones', 'Presentar un estudio descriptivo con conclusiones y límites'],
    requisitos: 'Ninguno. Solo necesitas modificar pequeños fragmentos de código ya escritos.',
    certifica: false,
  },
  {
    id: 'probabilidad',
    paso: 2,
    titulo: 'Probabilidad y distribuciones',
    resumen: 'Del azar a los modelos: Bayes, binomial, Poisson, normal y teorema central del límite.',
    descripcion: 'La base teórica de la inferencia: cómo razonar con incertidumbre y modelar fenómenos aleatorios con distribuciones.',
    nivel: 'Básico',
    icono: '🎲',
    aprenderas: ['Aplicar las reglas de probabilidad y el teorema de Bayes', 'Modelar conteos con binomial y Poisson', 'Calcular probabilidades con la normal y la exponencial', 'Estimar probabilidades por simulación Monte Carlo'],
    requisitos: 'Estadística descriptiva (recomendado).',
    certifica: false,
  },
  {
    id: 'estadistica-inferencial',
    paso: 3,
    titulo: 'Estadística inferencial',
    resumen: 'De la muestra a la decisión: intervalos de confianza, pruebas de hipótesis, A/B testing y regresión.',
    descripcion: 'Cómo sacar conclusiones fiables a partir de muestras y evitar los errores de interpretación más comunes.',
    nivel: 'Intermedio',
    icono: '🧪',
    aprenderas: ['Construir e interpretar intervalos de confianza', 'Contrastar hipótesis con pruebas t, z y chi-cuadrado', 'Diseñar y analizar un A/B test', 'Ajustar regresiones y comparar grupos con ANOVA'],
    requisitos: 'Probabilidad y distribuciones (recomendado).',
    certifica: false,
  },
  {
    id: 'excel',
    paso: 4,
    titulo: 'Excel para análisis de datos',
    resumen: 'Fórmulas, tablas dinámicas, limpieza y gráficos en la herramienta que más piden las empresas.',
    descripcion: 'Un curso práctico de Excel orientado al análisis: de las fórmulas esenciales a las tablas dinámicas y los tableros.',
    nivel: 'Básico',
    icono: '📗',
    aprenderas: ['Fórmulas y funciones de análisis', 'Limpieza y preparación de datos', 'Tablas dinámicas y gráficos', 'Un tablero sencillo para reportar resultados'],
    requisitos: 'Ninguno.',
    proximamente: true,
  },
  {
    id: 'python-datos',
    paso: 5,
    titulo: 'Python para datos',
    resumen: 'Programación desde cero, NumPy, pandas, limpieza, agregación y visualización con un proyecto final.',
    descripcion: 'Aprende a programar y a analizar datos reales con Python: el lenguaje central de la analítica y la ciencia de datos.',
    nivel: 'Básico',
    icono: '🐍',
    aprenderas: ['Escribir programas con variables, funciones y estructuras de datos', 'Limpiar y transformar datos con pandas', 'Resumir y agrupar información de negocio', 'Visualizar hallazgos y contar la historia de los datos'],
    requisitos: 'Ninguno: parte desde cero.',
  },
  {
    id: 'sql',
    paso: 6,
    titulo: 'SQL para analítica',
    resumen: 'Consultas, agregaciones, JOIN, subconsultas y CTE sobre una base de datos real en tu navegador.',
    descripcion: 'El lenguaje de las bases de datos, imprescindible para extraer y resumir información en cualquier empresa.',
    nivel: 'Intermedio',
    icono: '🗄️',
    aprenderas: ['Consultar y filtrar tablas con SELECT', 'Resumir con GROUP BY y funciones de agregación', 'Combinar tablas con JOIN', 'Usar CASE, subconsultas y CTE; conectar SQL con pandas'],
    requisitos: 'Python para datos (recomendado).',
  },
  {
    id: 'terminal-git',
    paso: 7,
    titulo: 'Terminal y Git',
    resumen: 'Línea de comandos, control de versiones y trabajo colaborativo con GitHub.',
    descripcion: 'Las herramientas de trabajo diario de quien programa y analiza datos en equipo.',
    nivel: 'Intermedio',
    icono: '🧰',
    aprenderas: ['Moverte por el sistema de archivos con la terminal', 'Crear scripts con argumentos', 'Versionar tu trabajo con commits y ramas', 'Colaborar con GitHub'],
    requisitos: 'Python para datos (recomendado).',
  },
  {
    id: 'power-bi',
    paso: 8,
    titulo: 'Visualización y Power BI',
    resumen: 'Modelado de datos, DAX y tableros interactivos para comunicar resultados.',
    descripcion: 'Construye tableros profesionales con una de las herramientas de BI más usadas del mercado.',
    nivel: 'Intermedio',
    icono: '📈',
    aprenderas: ['Modelar datos y relaciones', 'Escribir medidas con DAX', 'Diseñar tableros interactivos', 'Publicar y compartir reportes'],
    requisitos: 'Excel y SQL (recomendado).',
    proximamente: true,
  },
  {
    id: 'comunicacion-negocio',
    paso: 9,
    titulo: 'Comunicación y negocio',
    resumen: 'KPIs, diseño de dashboards, storytelling con datos, portafolio y preparación de entrevistas.',
    descripcion: 'Convierte el análisis en decisiones: cómo elegir métricas, contar el hallazgo y presentarte al mercado laboral.',
    nivel: 'Intermedio',
    icono: '🎯',
    aprenderas: ['Definir KPIs y métricas que importan', 'Diseñar dashboards claros', 'Contar un hallazgo con datos y recomendar acciones', 'Armar tu portafolio y preparar entrevistas'],
    requisitos: 'Python para datos y SQL (recomendado).',
  },
  {
    id: 'machine-learning',
    paso: 10,
    titulo: 'Machine Learning',
    resumen: 'De tu primer modelo a clustering, series temporales, NLP y redes neuronales, con un proyecto completo.',
    descripcion: 'Entrena, evalúa y compara modelos predictivos con scikit-learn y aprende a evitar los errores clásicos.',
    nivel: 'Avanzado',
    icono: '🤖',
    aprenderas: ['Entrenar y evaluar modelos de regresión y clasificación', 'Evitar overfitting y fugas de datos', 'Agrupar sin etiquetas y reducir dimensionalidad', 'Trabajar con series temporales, texto y redes neuronales básicas'],
    requisitos: 'Python para datos y Estadística inferencial (recomendado).',
  },
  {
    id: 'ia-aplicada',
    paso: 11,
    titulo: 'IA aplicada y redes neuronales',
    resumen: 'Deep learning, modelos de lenguaje y automatización responsable de tareas analíticas.',
    descripcion: 'El siguiente nivel: redes neuronales profundas y cómo usar modelos de lenguaje en proyectos de datos.',
    nivel: 'Avanzado',
    icono: '✨',
    aprenderas: ['Redes neuronales profundas', 'Modelos de lenguaje en flujos de análisis', 'Automatización de tareas con IA', 'Uso responsable y límites'],
    requisitos: 'Machine Learning.',
    proximamente: true,
  },
  {
    id: 'proyecto-final',
    paso: 12,
    titulo: 'Proyecto final de portafolio',
    resumen: 'Un caso completo con datos reales: de la pregunta al reporte, evaluado.',
    descripcion: 'Integra todo lo aprendido en un proyecto de punta a punta para tu portafolio.',
    nivel: 'Avanzado',
    icono: '🏆',
    aprenderas: ['Plantear una pregunta de negocio', 'Limpiar y analizar datos reales', 'Modelar y validar resultados', 'Presentar conclusiones y recomendaciones'],
    requisitos: 'Haber completado los cursos anteriores.',
    proximamente: true,
  },
]

function idsDe(moduloId: string): string[] {
  return lessonIndex.filter((l) => l.moduloId === moduloId).map((l) => l.id)
}

export const curriculum: ModuleMeta[] = [
  // Módulos de todos los cursos. El curso al que pertenece cada uno lo indica `cursoId`.
  { id: 'modulo-22', cursoId: 'estadistica-descriptiva', numero: 22, titulo: 'Datos, variables y tendencia central', descripcion: 'Población y muestra, escalas de medición, tablas de frecuencia, media, mediana y moda.', disponible: true, lessonIds: idsDe('modulo-22') },
  { id: 'modulo-23', cursoId: 'estadistica-descriptiva', numero: 23, titulo: 'Variabilidad y posición', descripcion: 'Rango, varianza, desviación estándar, coeficiente de variación, cuantiles, puntuaciones z y valores atípicos.', disponible: true, lessonIds: idsDe('modulo-23') },
  { id: 'modulo-24', cursoId: 'estadistica-descriptiva', numero: 24, titulo: 'Forma y relaciones entre variables', descripcion: 'Asimetría, curtosis, histogramas, correlación (Pearson y Spearman) y tablas de contingencia.', disponible: true, lessonIds: idsDe('modulo-24') },
  { id: 'modulo-25', cursoId: 'estadistica-descriptiva', numero: 25, titulo: 'Proyecto integrador: estudio descriptivo', descripcion: 'Un caso completo: de la pregunta y la revisión de datos a un reporte con conclusiones y limitaciones.', disponible: true, lessonIds: idsDe('modulo-25') },
  { id: 'modulo-26', cursoId: 'probabilidad', numero: 26, titulo: 'Fundamentos de probabilidad', descripcion: 'Espacio muestral, reglas de la suma y del complemento, probabilidad condicional, independencia y teorema de Bayes.', disponible: true, lessonIds: idsDe('modulo-26') },
  { id: 'modulo-27', cursoId: 'probabilidad', numero: 27, titulo: 'Variables aleatorias discretas', descripcion: 'Conteo, esperanza y varianza, distribuciones binomial y de Poisson, y simulación Monte Carlo.', disponible: true, lessonIds: idsDe('modulo-27') },
  { id: 'modulo-28', cursoId: 'probabilidad', numero: 28, titulo: 'Distribuciones continuas', descripcion: 'Densidad, uniforme, normal, puntuaciones z y percentiles, exponencial y teorema central del límite.', disponible: true, lessonIds: idsDe('modulo-28') },
  { id: 'modulo-29', cursoId: 'probabilidad', numero: 29, titulo: 'Proyecto integrador: calidad, capacidad y plazos', descripcion: 'Un caso de operaciones que combina binomial, Poisson, normal y simulación en un reporte final.', disponible: true, lessonIds: idsDe('modulo-29') },

  { id: 'modulo-30', cursoId: 'estadistica-inferencial', numero: 30, titulo: 'Muestreo y estimación', descripcion: 'Muestreo y sesgo, estimadores, error estándar, tamaño de muestra e intervalos de confianza para medias y proporciones.', disponible: true, lessonIds: idsDe('modulo-30') },
  { id: 'modulo-31', cursoId: 'estadistica-inferencial', numero: 31, titulo: 'Pruebas de hipótesis', descripcion: 'Lógica del p-valor, prueba t (una y dos muestras, pareada), A/B testing con proporciones y chi-cuadrado.', disponible: true, lessonIds: idsDe('modulo-31') },
  { id: 'modulo-32', cursoId: 'estadistica-inferencial', numero: 32, titulo: 'Relaciones y modelos', descripcion: 'Regresión simple y múltiple, R² y residuos, ANOVA, tamaño del efecto y comparaciones múltiples.', disponible: true, lessonIds: idsDe('modulo-32') },
  { id: 'modulo-33', cursoId: 'estadistica-inferencial', numero: 33, titulo: 'Proyecto integrador: análisis de un A/B test', descripcion: 'Un experimento completo: hipótesis, intervalos, pruebas, tamaño del efecto y reporte con recomendación.', disponible: true, lessonIds: idsDe('modulo-33') },

  { id: 'modulo-0', cursoId: 'python-datos', numero: 0, titulo: 'Orientación', descripcion: 'Qué es Python, entornos de trabajo y tu primer código.', disponible: true, lessonIds: idsDe('modulo-0') },
  { id: 'modulo-1', cursoId: 'python-datos', numero: 1, titulo: 'Fundamentos absolutos', descripcion: 'Variables, tipos de datos, strings, operadores y errores básicos.', disponible: true, lessonIds: idsDe('modulo-1') },
  { id: 'modulo-2', cursoId: 'python-datos', numero: 2, titulo: 'Control de flujo', descripcion: 'if/elif/else, bucles for/while, comprensión de listas.', disponible: true, lessonIds: idsDe('modulo-2') },
  { id: 'modulo-3', cursoId: 'python-datos', numero: 3, titulo: 'Estructuras de datos', descripcion: 'Listas, tuplas, diccionarios, conjuntos.', disponible: true, lessonIds: idsDe('modulo-3') },
  { id: 'modulo-4', cursoId: 'python-datos', numero: 4, titulo: 'Funciones y modularidad', descripcion: 'Funciones, *args/**kwargs, módulos e imports.', disponible: true, lessonIds: idsDe('modulo-4') },
  { id: 'modulo-5', cursoId: 'python-datos', numero: 5, titulo: 'Python profesional esencial', descripcion: 'Excepciones, archivos, JSON/CSV, type hints, código limpio.', disponible: true, lessonIds: idsDe('modulo-5') },

  { id: 'modulo-6', cursoId: 'python-datos', numero: 6, titulo: 'NumPy y pandas: fundamentos para datos', descripcion: 'Arrays, Series y DataFrame: la base para representar y operar datos reales.', disponible: true, lessonIds: idsDe('modulo-6') },
  { id: 'modulo-7', cursoId: 'python-datos', numero: 7, titulo: 'Limpieza y preparación de datos (Data Wrangling)', descripcion: 'Duplicados, valores ausentes, tipos de datos y combinación de múltiples fuentes.', disponible: true, lessonIds: idsDe('modulo-7') },
  { id: 'modulo-8', cursoId: 'python-datos', numero: 8, titulo: 'Transformación y agregación de datos', descripcion: 'groupby, tablas dinámicas y métricas de negocio (ingresos, costos, margen).', disponible: true, lessonIds: idsDe('modulo-8') },
  { id: 'modulo-9', cursoId: 'python-datos', numero: 9, titulo: 'Visualización y storytelling de datos', descripcion: 'matplotlib para comunicar hallazgos con claridad: líneas, barras, histogramas y scatter plots.', disponible: true, lessonIds: idsDe('modulo-9') },
  { id: 'modulo-10', cursoId: 'python-datos', numero: 10, titulo: 'EDA y estadística aplicada', descripcion: 'Patrones, correlaciones, outliers, distribuciones y pruebas de hipótesis.', disponible: true, lessonIds: idsDe('modulo-10') },
  { id: 'modulo-11', cursoId: 'python-datos', numero: 11, titulo: 'Proyecto integrador: Analista de Datos', descripcion: 'Proyecto de portafolio end-to-end: de datos crudos a un reporte de negocio.', disponible: true, lessonIds: idsDe('modulo-11') },

  { id: 'modulo-12', cursoId: 'machine-learning', numero: 12, titulo: 'Fundamentos de Machine Learning', descripcion: 'scikit-learn, train/test, overfitting/underfitting, tu primer modelo.', disponible: true, lessonIds: idsDe('modulo-12') },
  { id: 'modulo-13', cursoId: 'machine-learning', numero: 13, titulo: 'Ingeniería de características', descripcion: 'Encoding, escalado y prevención de data leakage.', disponible: true, lessonIds: idsDe('modulo-13') },
  { id: 'modulo-14', cursoId: 'machine-learning', numero: 14, titulo: 'Aprendizaje supervisado: regresión y clasificación', descripcion: 'Métricas, validación cruzada y datos desbalanceados.', disponible: true, lessonIds: idsDe('modulo-14') },
  { id: 'modulo-15', cursoId: 'machine-learning', numero: 15, titulo: 'Aprendizaje no supervisado', descripcion: 'K-Means y cómo elegir k, DBSCAN (con detección de ruido) y PCA.', disponible: true, lessonIds: idsDe('modulo-15') },
  { id: 'modulo-16', cursoId: 'machine-learning', numero: 16, titulo: 'Series temporales y texto (NLP básico)', descripcion: 'Series temporales (resample, rezagos, validación temporal) y texto con bolsa de palabras y TF-IDF.', disponible: true, lessonIds: idsDe('modulo-16') },
  { id: 'modulo-17', cursoId: 'machine-learning', numero: 17, titulo: 'Introducción a redes neuronales', descripcion: 'Neurona artificial, forward pass, descenso de gradiente y redes con MLPClassifier de scikit-learn.', disponible: true, lessonIds: idsDe('modulo-17') },
  { id: 'modulo-18', cursoId: 'machine-learning', numero: 18, titulo: 'Proyecto integrador: Ciencia de Datos', descripcion: 'Proyecto de abandono de clientes: de los datos al modelo, con línea base, métricas y conclusiones.', disponible: true, lessonIds: idsDe('modulo-18') },

  { id: 'modulo-19', cursoId: 'sql', numero: 19, titulo: 'SQL para análisis de datos', descripcion: 'SQLite en el navegador: SELECT, agregaciones, JOIN, CTE y consultas desde pandas.', disponible: true, lessonIds: idsDe('modulo-19') },
  { id: 'modulo-20', cursoId: 'terminal-git', numero: 20, titulo: 'Herramientas de desarrollo', descripcion: 'Línea de comandos, Git y GitHub para trabajo colaborativo.', disponible: true, lessonIds: idsDe('modulo-20') },
  { id: 'modulo-21', cursoId: 'comunicacion-negocio', numero: 21, titulo: 'Introducción a BI y preparación profesional', descripcion: 'KPIs, diseño de dashboards, storytelling con datos, portafolio en GitHub y entrevistas.', disponible: true, lessonIds: idsDe('modulo-21') },
]

/** Resumen (id, módulo y título) de todas las lecciones, en el orden de estudio (el de los cursos y, dentro de cada uno, el de sus módulos). */
export const todasLasLecciones: LessonSummary[] = [...curriculum]
  .sort((a, b) => (getCurso(a.cursoId)?.paso ?? 0) - (getCurso(b.cursoId)?.paso ?? 0) || a.numero - b.numero)
  .flatMap((m) => lessonIndex.filter((l) => l.moduloId === m.id))

/** Módulos cuyas lecciones cuentan para el certificado actual. */
function moduloCertifica(m: ModuleMeta): boolean {
  return getCurso(m.cursoId)?.certifica !== false
}

/** Ids de las lecciones que cuentan para el certificado actual. */
export const leccionesCertificables: string[] = curriculum.filter(moduloCertifica).flatMap((m) => m.lessonIds)

export function getLeccion(id: string): LessonSummary | undefined {
  return todasLasLecciones.find((l) => l.id === id)
}

export function getModulo(id: string): ModuleMeta | undefined {
  return curriculum.find((m) => m.id === id)
}

export function getCurso(id: string): Curso | undefined {
  return cursos.find((c) => c.id === id)
}

/** Módulos de un curso, en su orden. */
export function modulosDeCurso(cursoId: string): ModuleMeta[] {
  return curriculum.filter((m) => m.cursoId === cursoId).sort((a, b) => a.numero - b.numero)
}

/** Ids de las lecciones de un curso, en su orden. */
export function leccionesDeCurso(cursoId: string): string[] {
  return modulosDeCurso(cursoId).flatMap((m) => m.lessonIds)
}

/** Cursos que ya tienen contenido para estudiar. */
export const cursosDisponibles: Curso[] = cursos.filter((c) => !c.proximamente && leccionesDeCurso(c.id).length > 0)

/** El curso que sigue en la ruta (con contenido) después del dado, si lo hay. */
export function siguienteCurso(cursoId: string): Curso | undefined {
  const actual = getCurso(cursoId)
  if (!actual) return undefined
  return cursosDisponibles.find((c) => c.paso > actual.paso)
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
