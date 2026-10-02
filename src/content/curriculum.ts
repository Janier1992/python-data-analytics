import type { Lesson, ModuleMeta } from '../types'
import { module0Lessons } from './modules/module0'
import { module1Lessons } from './modules/module1'
import { module2Lessons } from './modules/module2'
import { module3Lessons } from './modules/module3'
import { module4Lessons } from './modules/module4'
import { module5Lessons } from './modules/module5'

export const curriculum: ModuleMeta[] = [
  { id: 'modulo-0', numero: 0, titulo: 'Orientación', descripcion: 'Qué es Python, entornos de trabajo y tu primer código.', disponible: true, lessonIds: module0Lessons.map((l) => l.id) },
  { id: 'modulo-1', numero: 1, titulo: 'Fundamentos absolutos', descripcion: 'Variables, tipos de datos, strings, operadores y errores básicos.', disponible: true, lessonIds: module1Lessons.map((l) => l.id) },
  { id: 'modulo-2', numero: 2, titulo: 'Control de flujo', descripcion: 'if/elif/else, bucles for/while, comprensión de listas.', disponible: true, lessonIds: module2Lessons.map((l) => l.id) },
  { id: 'modulo-3', numero: 3, titulo: 'Estructuras de datos', descripcion: 'Listas, tuplas, diccionarios, conjuntos.', disponible: true, lessonIds: module3Lessons.map((l) => l.id) },
  { id: 'modulo-4', numero: 4, titulo: 'Funciones y modularidad', descripcion: 'Funciones, *args/**kwargs, módulos e imports.', disponible: true, lessonIds: module4Lessons.map((l) => l.id) },
  { id: 'modulo-5', numero: 5, titulo: 'Python profesional esencial', descripcion: 'Excepciones, archivos, JSON/CSV, type hints, código limpio.', disponible: true, lessonIds: module5Lessons.map((l) => l.id) },
  { id: 'modulo-6', numero: 6, titulo: 'Python para datos', descripcion: 'NumPy y pandas: Series, DataFrame, groupby, merge.', disponible: false, lessonIds: [] },
  { id: 'modulo-7', numero: 7, titulo: 'Visualización', descripcion: 'matplotlib y seaborn para interpretar datos.', disponible: false, lessonIds: [] },
  { id: 'modulo-8', numero: 8, titulo: 'Análisis exploratorio de datos', descripcion: 'EDA univariado, bivariado, outliers y calidad de datos.', disponible: false, lessonIds: [] },
  { id: 'modulo-9', numero: 9, titulo: 'Estadística aplicada', descripcion: 'Medidas de tendencia, distribuciones, correlación, hipótesis.', disponible: false, lessonIds: [] },
  { id: 'modulo-10', numero: 10, titulo: 'Machine Learning: fundamentos', descripcion: 'Features, target, overfitting, pipelines con scikit-learn.', disponible: false, lessonIds: [] },
  { id: 'modulo-11', numero: 11, titulo: 'Aprendizaje supervisado', descripcion: 'Regresión, clasificación, métricas, validación cruzada.', disponible: false, lessonIds: [] },
  { id: 'modulo-12', numero: 12, titulo: 'Aprendizaje no supervisado', descripcion: 'Clustering (K-Means, DBSCAN) y PCA.', disponible: false, lessonIds: [] },
  { id: 'modulo-13', numero: 13, titulo: 'Ingeniería de características', descripcion: 'Escalado, encoding, prevención de data leakage.', disponible: false, lessonIds: [] },
  { id: 'modulo-14', numero: 14, titulo: 'Deep Learning y redes neuronales', descripcion: 'Neurona, backpropagation, PyTorch/Keras.', disponible: false, lessonIds: [] },
  { id: 'modulo-15', numero: 15, titulo: 'Proyectos integradores', descripcion: 'Proyectos end-to-end de analítica y machine learning.', disponible: false, lessonIds: [] },
]

export const todasLasLecciones: Lesson[] = [
  ...module0Lessons,
  ...module1Lessons,
  ...module2Lessons,
  ...module3Lessons,
  ...module4Lessons,
  ...module5Lessons,
]

export function getLeccion(id: string): Lesson | undefined {
  return todasLasLecciones.find((l) => l.id === id)
}

export function getModulo(id: string): ModuleMeta | undefined {
  return curriculum.find((m) => m.id === id)
}

export function moduloLeccionesMap(): Record<string, string[]> {
  return Object.fromEntries(curriculum.map((m) => [m.id, m.lessonIds]))
}
