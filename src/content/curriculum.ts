import type { Curso, LessonSummary, ModuleMeta, RutaObjetivo } from '../types'
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
    requisitos: 'Ninguno. No necesitas programar: los ejercicios se resuelven con la calculadora incluida en la plataforma.',
    sinProgramacion: true,
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
    aprenderas: ['Aplicar las reglas de probabilidad y el teorema de Bayes', 'Modelar conteos con binomial y Poisson', 'Calcular probabilidades con la normal y la exponencial', 'Estimar probabilidades por simulación Monte Carlo (con dígitos aleatorios)'],
    requisitos: 'Estadística descriptiva (recomendado). Sin programación: calculadora y tablas estadísticas incluidas.',
    sinProgramacion: true,
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
    requisitos: 'Probabilidad y distribuciones (recomendado). Sin programación: calculadora y tablas estadísticas incluidas.',
    sinProgramacion: true,
    certifica: false,
  },
  {
    id: 'excel',
    paso: 4,
    titulo: 'Excel para análisis de datos',
    resumen: 'Fórmulas, condiciones, búsquedas y limpieza de datos, con práctica corregida al instante.',
    descripcion: 'Un curso práctico de fórmulas de Excel orientado al análisis. Las prácticas se corrigen en el navegador con un motor de fórmulas propio; las tablas dinámicas y los gráficos se explican como concepto y se reproducen con fórmulas.',
    nivel: 'Básico',
    icono: '📗',
    aprenderas: ['Fórmulas y funciones de análisis con práctica verificada en el navegador', 'Condiciones, búsquedas y estadística descriptiva con fórmulas', 'Limpieza y preparación de datos', 'Un proyecto completo de reporte con fórmulas'],
    requisitos: 'Ninguno.',
    avisoCertificado: 'Las prácticas de fórmulas se corrigen con un motor de fórmulas propio de la plataforma, no con Microsoft Excel; las tablas dinámicas y los gráficos se estudian como concepto.',
    certifica: false,
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
    resumen: 'De SELECT a funciones de ventana, CTE y subconsultas, con práctica en una base de datos en tu navegador.',
    descripcion: 'El lenguaje de las bases de datos, imprescindible para extraer y resumir información en cualquier empresa. Se practica con SQLite en el navegador y se explica qué cambia en PostgreSQL, SQL Server y MySQL.',
    nivel: 'Intermedio',
    icono: '🗄️',
    aprenderas: ['Consultar, filtrar y resumir tablas con SELECT, GROUP BY y HAVING', 'Combinar tablas con todos los tipos de JOIN, conjuntos y subconsultas', 'Analizar con CTE y funciones de ventana (rankings, LAG, acumulados)', 'Modificar datos, usar vistas e índices y adaptar el SQL a otros motores'],
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
    resumen: 'Diseño de gráficos y tableros, Power Query, modelo en estrella, DAX y un proyecto completo.',
    descripcion: 'Aprende a comunicar con datos y a construir tableros con Power BI. Power BI Desktop (gratuito, solo para Windows) no se ejecuta en el navegador: las lecciones explican cada paso y se practica la lógica con Python, con corrección automática. El proyecto final se hace en Power BI y se verifica con cifras de control.',
    nivel: 'Intermedio',
    icono: '📈',
    aprenderas: ['Elegir y diseñar gráficos que comunican (color, ejes, contraste, accesibilidad)', 'Preparar datos con Power Query y modelarlos en estrella con tabla de fechas', 'Entender DAX: medidas, contexto de filtro, CALCULATE, inteligencia de tiempo y rankings', 'Diseñar, publicar y proteger un tablero, y verificarlo con cifras de control'],
    requisitos: 'Excel y SQL (recomendado). Para el proyecto, Power BI Desktop en Windows.',
    avisoCertificado: 'Este curso no ejecuta Power BI: explica Power Query y DAX y corrige la lógica con Python. No evalúa archivos de Power BI.',
    certifica: false,
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
    titulo: 'IA aplicada',
    resumen: 'Modelos de lenguaje, prompts, RAG, herramientas y agentes, con uso responsable de la IA.',
    descripcion: 'Cómo funcionan los modelos de lenguaje y cómo construir aplicaciones con ellos de forma responsable: prompts, salidas estructuradas, recuperación de información (RAG), herramientas, evaluación, privacidad y gobernanza. El curso no llama a ningún modelo real: practicas la lógica de las aplicaciones con modelos simulados y corrección automática.',
    nivel: 'Intermedio',
    icono: '✨',
    aprenderas: ['Entender tokens, contexto, costos, temperatura y límites de los modelos de lenguaje', 'Escribir prompts claros, usar ejemplos y obtener salidas estructuradas validadas', 'Construir flujos con RAG, herramientas y agentes con controles', 'Proteger datos, medir sesgos y conocer marcos de gobernanza (UE, NIST, Colombia)'],
    requisitos: 'Python para datos (recomendado).',
    avisoCertificado: 'Los ejercicios usan modelos de lenguaje simulados: el curso no llama a ningún modelo real ni evalúa aplicaciones con servicios externos.',
    certifica: false,
  },
  {
    id: 'proyecto-final',
    paso: 12,
    titulo: 'Proyecto final de portafolio',
    resumen: 'De la pregunta al reporte: un método, un caso guiado y herramientas de autoevaluación para tu portafolio.',
    descripcion: 'Integra lo aprendido en un proyecto de punta a punta. El curso te da el método (pregunta de negocio, datos, línea base, impacto, README), un caso guiado con datos sintéticos corregido automáticamente y una rúbrica de autoevaluación. No puede calificar tu proyecto personal: para eso, busca retroalimentación de una persona con experiencia.',
    nivel: 'Avanzado',
    icono: '🏆',
    aprenderas: ['Plantear una pregunta de negocio y validar el alcance', 'Organizar un repositorio reproducible y controlar la calidad de los datos', 'Modelar con línea base y evitar fugas de información', 'Comunicar el impacto con supuestos explícitos y publicar el proyecto'],
    requisitos: 'Haber completado varios de los cursos anteriores (Python para datos, estadística y SQL como base).',
    avisoCertificado: 'Certifica el estudio del método y la resolución del caso guiado con datos sintéticos; no evalúa ni califica el proyecto personal del estudiante.',
    certifica: false,
  },
]

/** Rutas sugeridas según el objetivo. Los cursos en preparación se marcan como «Próximamente» donde aparecen. */
export const rutasPorObjetivo: RutaObjetivo[] = [
  {
    id: 'analista-datos',
    titulo: 'Analista de datos',
    icono: '📊',
    descripcion: 'Para quien quiere describir, consultar y comunicar datos para apoyar decisiones de negocio.',
    cursoIds: ['estadistica-descriptiva', 'probabilidad', 'estadistica-inferencial', 'excel', 'python-datos', 'sql', 'power-bi', 'comunicacion-negocio'],
  },
  {
    id: 'cientifico-datos',
    titulo: 'Científico de datos',
    icono: '🤖',
    descripcion: 'Para quien quiere construir modelos predictivos, con bases sólidas de estadística y programación.',
    cursoIds: ['estadistica-descriptiva', 'probabilidad', 'estadistica-inferencial', 'python-datos', 'sql', 'terminal-git', 'machine-learning', 'ia-aplicada'],
  },
  {
    id: 'empezar-programando',
    titulo: 'Empezar por la programación',
    icono: '🐍',
    descripcion: 'Si ya te manejas con los conceptos y quieres ir directo a las herramientas: Python, SQL y trabajo con código.',
    cursoIds: ['python-datos', 'sql', 'terminal-git', 'machine-learning'],
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

  { id: 'modulo-34', cursoId: 'excel', numero: 34, titulo: 'Fórmulas esenciales', descripcion: 'Celdas y rangos, funciones de resumen, referencias absolutas y relativas, lógica con SI, texto y fechas.', disponible: true, lessonIds: idsDe('modulo-34') },
  { id: 'modulo-35', cursoId: 'excel', numero: 35, titulo: 'Condiciones y búsquedas', descripcion: 'CONTAR.SI, SUMAR.SI y sus versiones con varios criterios, BUSCARV, INDICE/COINCIDIR, BUSCARX y SUMAPRODUCTO.', disponible: true, lessonIds: idsDe('modulo-35') },
  { id: 'modulo-36', cursoId: 'excel', numero: 36, titulo: 'Limpieza y análisis', descripcion: 'Limpieza de texto y números, estadística descriptiva con fórmulas y resúmenes tipo tabla dinámica.', disponible: true, lessonIds: idsDe('modulo-36') },
  { id: 'modulo-37', cursoId: 'excel', numero: 37, titulo: 'Proyecto integrador: Tienda Aurora', descripcion: 'Preparar datos, resumir ventas, calcular comisiones con búsquedas y armar un reporte de resultados.', disponible: true, lessonIds: idsDe('modulo-37') },

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
  { id: 'modulo-38', cursoId: 'sql', numero: 38, titulo: 'Consultas con más precisión', descripcion: 'NULL, funciones de texto, números y fechas, y agregación condicional (tablas dinámicas en SQL).', disponible: true, certifica: false, lessonIds: idsDe('modulo-38') },
  { id: 'modulo-39', cursoId: 'sql', numero: 39, titulo: 'Combinar tablas y subconsultas', descripcion: 'JOIN de varias tablas, anti-join, CROSS y SELF JOIN, UNION/INTERSECT/EXCEPT, IN, EXISTS y subconsultas correlacionadas.', disponible: true, certifica: false, lessonIds: idsDe('modulo-39') },
  { id: 'modulo-40', cursoId: 'sql', numero: 40, titulo: 'CTE y funciones de ventana', descripcion: 'CTE encadenadas y recursivas, ROW_NUMBER/RANK, LAG/LEAD, acumulados, medias móviles y cuantiles.', disponible: true, certifica: false, lessonIds: idsDe('modulo-40') },
  { id: 'modulo-41', cursoId: 'sql', numero: 41, titulo: 'Modificar datos, rendimiento y otros motores', descripcion: 'INSERT/UPDATE/DELETE, transacciones, upsert, vistas, índices y qué cambia entre SQLite, PostgreSQL, SQL Server y MySQL.', disponible: true, certifica: false, lessonIds: idsDe('modulo-41') },
  { id: 'modulo-42', cursoId: 'sql', numero: 42, titulo: 'Proyecto integrador: análisis de una tienda', descripcion: 'Calidad de datos, KPIs, evolución mensual, rankings y segmentación de clientes con un reporte final.', disponible: true, certifica: false, lessonIds: idsDe('modulo-42') },
  { id: 'modulo-43', cursoId: 'power-bi', numero: 43, titulo: 'Visualización de datos con propósito', descripcion: 'Elegir el gráfico según la pregunta, diseño honesto (orden, color, ejes), tableros con KPI y accesibilidad.', disponible: true, lessonIds: idsDe('modulo-43') },
  { id: 'modulo-44', cursoId: 'power-bi', numero: 44, titulo: 'Power Query y modelo de datos', descripcion: 'El flujo de Power BI, transformaciones de Power Query con su equivalente en pandas, modelo en estrella y tabla de fechas.', disponible: true, lessonIds: idsDe('modulo-44') },
  { id: 'modulo-45', cursoId: 'power-bi', numero: 45, titulo: 'DAX: medidas y contexto', descripcion: 'Medidas y contexto de filtro, CALCULATE, inteligencia de tiempo, variables y rankings, practicados con la lógica en pandas.', disponible: true, lessonIds: idsDe('modulo-45') },
  { id: 'modulo-46', cursoId: 'power-bi', numero: 46, titulo: 'Informe, publicación y proyecto', descripcion: 'Diseño del informe, publicación y seguridad por filas (RLS), y un proyecto de tablero con cifras de control.', disponible: true, lessonIds: idsDe('modulo-46') },
  { id: 'modulo-47', cursoId: 'ia-aplicada', numero: 47, titulo: 'Fundamentos de los modelos de lenguaje', descripcion: 'Tokens, contexto y costos, probabilidades y temperatura, límites (alucinaciones) y embeddings.', disponible: true, lessonIds: idsDe('modulo-47') },
  { id: 'modulo-48', cursoId: 'ia-aplicada', numero: 48, titulo: 'Prompts y salidas estructuradas', descripcion: 'Anatomía de un prompt, ejemplos (few-shot), salidas JSON validadas y evaluación de prompts.', disponible: true, lessonIds: idsDe('modulo-48') },
  { id: 'modulo-49', cursoId: 'ia-aplicada', numero: 49, titulo: 'Aplicaciones: RAG, herramientas y agentes', descripcion: 'Recuperación de información, uso de herramientas, agentes con límites y automatización de tareas de analista.', disponible: true, lessonIds: idsDe('modulo-49') },
  { id: 'modulo-50', cursoId: 'ia-aplicada', numero: 50, titulo: 'Uso responsable y proyecto', descripcion: 'Privacidad y seguridad, sesgo y equidad, gobernanza y regulación, y un asistente de preguntas frecuentes responsable.', disponible: true, lessonIds: idsDe('modulo-50') },
  { id: 'modulo-51', cursoId: 'proyecto-final', numero: 51, titulo: 'Planteamiento y datos del proyecto', descripcion: 'Elegir el proyecto y la pregunta de negocio, organizar el repositorio y controlar la calidad de los datos.', disponible: true, lessonIds: idsDe('modulo-51') },
  { id: 'modulo-52', cursoId: 'proyecto-final', numero: 52, titulo: 'Análisis, comunicación y entrega', descripcion: 'Línea base y fugas de información, impacto de negocio con sensibilidad, README, rúbrica y publicación.', disponible: true, lessonIds: idsDe('modulo-52') },
  { id: 'modulo-20', cursoId: 'terminal-git', numero: 20, titulo: 'Herramientas de desarrollo', descripcion: 'Línea de comandos, Git y GitHub para trabajo colaborativo.', disponible: true, lessonIds: idsDe('modulo-20') },
  { id: 'modulo-21', cursoId: 'comunicacion-negocio', numero: 21, titulo: 'Introducción a BI y preparación profesional', descripcion: 'KPIs, diseño de dashboards, storytelling con datos, portafolio en GitHub y entrevistas.', disponible: true, lessonIds: idsDe('modulo-21') },
]

/** Resumen (id, módulo y título) de todas las lecciones, en el orden de estudio (el de los cursos y, dentro de cada uno, el de sus módulos). */
export const todasLasLecciones: LessonSummary[] = [...curriculum]
  .sort((a, b) => (getCurso(a.cursoId)?.paso ?? 0) - (getCurso(b.cursoId)?.paso ?? 0) || a.numero - b.numero)
  .flatMap((m) => lessonIndex.filter((l) => l.moduloId === m.id))

/** Módulos cuyas lecciones cuentan para el certificado actual. */
function moduloCertifica(m: ModuleMeta): boolean {
  return m.certifica ?? getCurso(m.cursoId)?.certifica !== false
}

/** Ids de las lecciones que cuentan para el certificado actual. */
export const leccionesCertificables: string[] = curriculum.filter(moduloCertifica).flatMap((m) => m.lessonIds)

/** Cuántas lecciones de un curso cuentan para el certificado: todas, solo algunas (ampliaciones) o ninguna. */
export function certificacionDeCurso(cursoId: string): 'todo' | 'parcial' | 'ninguno' {
  const ids = leccionesDeCurso(cursoId)
  const cuentan = ids.filter((id) => leccionesCertificables.includes(id)).length
  if (cuentan === 0) return 'ninguno'
  return cuentan === ids.length ? 'todo' : 'parcial'
}

/** Id del curso al que pertenece una lección. */
export function cursoDeLeccion(leccionId: string): string | undefined {
  const leccion = lessonIndex.find((l) => l.id === leccionId)
  return leccion ? getModulo(leccion.moduloId)?.cursoId : undefined
}

/** Módulo → ids de lecciones de un curso (para calcular el avance hacia el certificado del curso). */
export function moduloLeccionesDeCurso(cursoId: string): Record<string, string[]> {
  return Object.fromEntries(modulosDeCurso(cursoId).map((m) => [m.id, m.lessonIds]))
}

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
