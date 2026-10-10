// Lecciones de fundamentos (estadística y probabilidad) sin programación: ejemplos resueltos paso a paso
// y ejercicios de cálculo con respuestas numéricas o de opción, corregidos automáticamente.

export interface TablaDatos {
  titulo?: string
  columnas: string[]
  filas: (string | number)[][]
  /** Nota al pie (unidades, fuente de los datos ficticios…). */
  nota?: string
}

/** Gráficos estadísticos sencillos que se dibujan en el navegador a partir de los datos. */
export type GraficoSpec =
  | { tipo: 'histograma'; datos: number[]; cortes?: number[]; titulo?: string; etiquetaX?: string }
  | { tipo: 'barras'; categorias: string[]; valores: number[]; titulo?: string; etiquetaY?: string }
  | { tipo: 'caja'; datos: number[]; titulo?: string; etiquetaX?: string }
  | { tipo: 'dispersion'; x: number[]; y: number[]; recta?: { a: number; b: number }; titulo?: string; etiquetaX?: string; etiquetaY?: string }
  | { tipo: 'normal'; media: number; desv: number; desde?: number; hasta?: number; titulo?: string }

export interface EjemploResuelto {
  tipo: 'resuelto'
  titulo?: string
  datos?: TablaDatos[]
  graficos?: GraficoSpec[]
  /** Pasos del procedimiento (admiten **negrita** y tablas de Markdown). */
  pasos: string[]
  conclusion?: string
}

export interface PreguntaNumero {
  tipo: 'numero'
  etiqueta: string
  valor: number
  /** Error absoluto aceptado. Por defecto, medio dígito del último decimal de `valor` (exacto si es entero). */
  tolerancia?: number
  unidad?: string
  /** Fórmula de comprobación (con `=`, funciones de la hoja) que reproduce el valor: la usan las pruebas del contenido, el estudiante no la ve. */
  calculo?: string
}

export interface PreguntaOpcion {
  tipo: 'opcion'
  etiqueta: string
  opciones: string[]
  correcta: number
}

export type PreguntaCalculo = PreguntaNumero | PreguntaOpcion

export interface EjercicioCalculo {
  id: string
  enunciado: string
  datos?: TablaDatos[]
  graficos?: GraficoSpec[]
  preguntas: PreguntaCalculo[]
  /** Solución paso a paso que se muestra bajo demanda. */
  solucion: string[]
  pistas: string[]
}

export const esEjercicioCalculo = (e: unknown): e is EjercicioCalculo => typeof e === 'object' && e !== null && 'preguntas' in e && Array.isArray((e as EjercicioCalculo).preguntas)
export const esEjemploResuelto = (e: unknown): e is EjemploResuelto => typeof e === 'object' && e !== null && (e as EjemploResuelto).tipo === 'resuelto'
