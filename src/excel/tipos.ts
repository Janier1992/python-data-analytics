// Tipos del motor de fórmulas de hoja de cálculo (subconjunto de Excel).

export type CodigoError = '#¡DIV/0!' | '#N/D' | '#¡VALOR!' | '#¡REF!' | '#¿NOMBRE?' | '#¡NUM!'

/** Valor de error de una hoja de cálculo (se propaga por las fórmulas). */
export class ErrorExcel {
  constructor(public readonly codigo: CodigoError) {}
}

export const DIV0 = () => new ErrorExcel('#¡DIV/0!')
export const NOD = () => new ErrorExcel('#N/D')
export const VALOR = () => new ErrorExcel('#¡VALOR!')
export const REF = () => new ErrorExcel('#¡REF!')
export const NOMBRE = () => new ErrorExcel('#¿NOMBRE?')
export const NUM = () => new ErrorExcel('#¡NUM!')

/** Valor de una celda: número, texto, lógico, vacío (null) o error. */
export type Escalar = number | string | boolean | null | ErrorExcel
/** Rango de celdas o resultado matricial: filas de valores. */
export type Matriz = Escalar[][]
export type Valor = Escalar | Matriz

export const esMatriz = (v: Valor): v is Matriz => Array.isArray(v)
export const esError = (v: unknown): v is ErrorExcel => v instanceof ErrorExcel

/** Error de sintaxis al leer una fórmula (mensaje pensado para mostrarse al estudiante). */
export class ErrorSintaxis extends Error {
  constructor(
    mensaje: string,
    public readonly posicion: number,
  ) {
    super(mensaje)
    this.name = 'ErrorSintaxis'
  }
}

/** Celda tal como se escribe en un contenido didáctico: una fecha se escribe `{ fecha: 'AAAA-MM-DD' }`. */
export type ValorCelda = number | string | boolean | null | { fecha: string }

export interface Hoja {
  /** Filas de la hoja; la celda A1 es `celdas[0][0]`. Un texto que empieza por «=» es una fórmula. */
  celdas: ValorCelda[][]
  /** Si la primera fila son encabezados (solo afecta a cómo se muestra). */
  encabezado?: boolean
}

export type FormatoSalida = 'fecha' | 'porcentaje'

export type ResultadoEsperado = number | string | boolean | { error: CodigoError }

export interface EjemploHojaFormula {
  /** Celda donde se imagina escrita la fórmula (solo informativa). */
  celda?: string
  formula: string
  esperado: ResultadoEsperado
  formato?: FormatoSalida
}

/** Ejemplo de lección: una hoja y varias fórmulas con su resultado. */
export interface EjemploHoja {
  hoja: Hoja
  formulas: EjemploHojaFormula[]
  nota?: string
}

/** Ejercicio en el que el estudiante escribe una fórmula sobre una hoja. */
export interface EjercicioHoja {
  id: string
  enunciado: string
  hoja: Hoja
  /** Celda donde va la fórmula (por ejemplo «E2»). */
  celda: string
  /** Texto con el que arranca el campo de la fórmula (normalmente «=»). */
  formulaInicial: string
  /** Fórmula de referencia: debe dar el resultado esperado. */
  solucion: string
  /** Resultado esperado. Si `rellenarFilas` está definido, una lista con el resultado de cada fila. */
  esperado: ResultadoEsperado | ResultadoEsperado[]
  /** Copia la fórmula hacia abajo en este número de filas (como arrastrar el controlador de relleno). */
  rellenarFilas?: number
  /** Tolerancia al comparar números (por defecto 1e-9). */
  tolerancia?: number
  formato?: FormatoSalida
  /** Por defecto se exige que la fórmula use alguna referencia a celdas (no basta escribir el resultado). */
  permiteSinReferencias?: boolean
  pistas: string[]
}

export const esEjercicioHoja = (e: unknown): e is EjercicioHoja => typeof e === 'object' && e !== null && 'hoja' in e && 'solucion' in e
