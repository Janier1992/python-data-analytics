// Lecciones de fundamentos (estadística y probabilidad) sin programación: ejemplos resueltos paso a paso
// y ejercicios de cálculo con respuestas numéricas o de opción, corregidos automáticamente.

export interface TablaDatos {
  titulo?: string
  columnas: string[]
  filas: (string | number)[][]
  /** Nota al pie (unidades, fuente de los datos ficticios…). */
  nota?: string
  /** Filas y columnas (posiciones desde 0) que se resaltan, por ejemplo las filas que entran en un contexto de filtro. */
  resaltar?: { filas?: number[]; columnas?: number[] }
  /** Texto de la leyenda del resaltado («Filas que entran en el contexto: Región = Norte»). */
  leyenda?: string
}

/** Un visual del lienzo de un informe de Power BI (ilustración, no se ejecuta nada). */
export type VisualSpec =
  | { tipo: 'tarjeta'; titulo: string; valor: string; variacion?: string; positivo?: boolean }
  | { tipo: 'barras'; titulo: string; categorias: string[]; valores: number[]; /** Valor donde empieza el eje (0 por defecto; otro valor ilustra un eje truncado). */ ejeDesde?: number; resaltar?: number[]; horizontal?: boolean; formato?: string }
  | { tipo: 'lineas'; titulo: string; etiquetas: string[]; series: { nombre: string; valores: number[] }[] }
  | { tipo: 'matriz'; titulo: string; columnas: string[]; filas: (string | number)[][]; resaltar?: { filas?: number[]; columnas?: number[] } }
  | { tipo: 'segmentador'; campo: string; opciones: string[]; seleccion?: string[] }
  | { tipo: 'medidor'; titulo: string; valor: number; meta: number; formato?: string }

/** Vistas ilustrativas de la interfaz de Power BI (Power Query, modelo, informe, barra de fórmulas DAX). */
export type PantallaSpec =
  | {
      tipo: 'powerquery'
      titulo?: string
      consultas?: string[]
      consulta: string
      /** Pasos aplicados, en orden. */
      pasos: string[]
      /** Paso seleccionado (posición desde 0): lo que se ve en la vista previa es el resultado hasta ese paso. */
      pasoActivo: number
      columnas: { nombre: string; tipo: 'texto' | 'entero' | 'decimal' | 'fecha' | 'logico' | 'cualquiera' }[]
      filas: (string | number | null)[][]
      /** Fórmula M del paso activo, tal como aparece en la barra de fórmulas. */
      formula?: string
    }
  | {
      tipo: 'modelo'
      titulo?: string
      tablas: { nombre: string; rol: 'hechos' | 'dimension'; columnas: string[]; claves?: string[] }[]
      relaciones: { de: string; a: string; cardinalidad?: '*:1' | '1:1' | '*:*'; direccion?: 'unica' | 'ambas'; activa?: boolean }[]
    }
  | {
      tipo: 'informe'
      titulo?: string
      pagina?: string
      visuales: VisualSpec[]
      /** Panel de filtros visible a la derecha (texto de cada filtro). */
      filtros?: string[]
    }
  | {
      tipo: 'medida'
      titulo?: string
      /** Código DAX completo (admite varias líneas). */
      dax: string
      /** Dónde se crea: «Nueva medida» o «Nueva columna». */
      objeto?: 'medida' | 'columna' | 'tabla' | 'rol'
      /** Tabla donde se guarda. */
      tabla?: string
      /** Lo que muestra la celda del visual, con su contexto de filtro. */
      resultado?: { contexto: string; valor: string }[]
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
  /** Vistas ilustrativas de la interfaz de Power BI. */
  pantallas?: PantallaSpec[]
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

/** Varias respuestas correctas a la vez (se marcan casillas). */
export interface PreguntaCasillas {
  tipo: 'casillas'
  etiqueta: string
  opciones: string[]
  /** Posiciones (desde 0) de las opciones correctas. */
  correctas: number[]
}

export type PreguntaCalculo = PreguntaNumero | PreguntaOpcion | PreguntaCasillas

export interface EjercicioCalculo {
  id: string
  enunciado: string
  datos?: TablaDatos[]
  graficos?: GraficoSpec[]
  pantallas?: PantallaSpec[]
  preguntas: PreguntaCalculo[]
  /** Solución paso a paso que se muestra bajo demanda. */
  solucion: string[]
  pistas: string[]
}

export const esEjercicioCalculo = (e: unknown): e is EjercicioCalculo => typeof e === 'object' && e !== null && 'preguntas' in e && Array.isArray((e as EjercicioCalculo).preguntas)
export const esEjemploResuelto = (e: unknown): e is EjemploResuelto => typeof e === 'object' && e !== null && (e as EjemploResuelto).tipo === 'resuelto'
