// Guía de referencia: qué hace cada función, método, parámetro o sentencia, con un ejemplo que se puede ejecutar.

export type LenguajeRef = 'python' | 'sql' | 'bash'

export interface ParametroRef {
  nombre: string
  descripcion: string
  porDefecto?: string
}

export interface EntradaRef {
  /** Identificador único en toda la guía, p. ej. "pandas-head". */
  id: string
  /** Lo que se escribe en el código y lo que se busca: "df.head()", "GROUP BY", "git commit". */
  nombre: string
  /** Subcategoría dentro de la colección: "Explorar un DataFrame". */
  grupo: string
  /** Firma completa, con sus parámetros: "DataFrame.head(n=5)". */
  firma?: string
  /** Una línea: para qué sirve. */
  resumen: string
  /** Explicación ampliada (opcional). */
  descripcion?: string
  parametros?: ParametroRef[]
  /** Código de ejemplo, autocontenido. Python y SQL se pueden ejecutar desde la guía. */
  ejemplo: string
  /** Lo que imprime el ejemplo (si se indica, una prueba automática lo verifica). */
  salida?: string
  /** Consejos y errores frecuentes. */
  notas?: string[]
  /** Ids de entradas relacionadas. */
  relacionadas?: string[]
  /** Ids de las lecciones donde se enseña. */
  lecciones?: string[]
}

export interface ColeccionRef {
  id: string
  titulo: string
  descripcion: string
  icono: string
  lenguaje: LenguajeRef
  /** Texto breve sobre los datos de ejemplo o el contexto de la colección. */
  nota?: string
  entradas: EntradaRef[]
}

export type MetaColeccion = Pick<ColeccionRef, 'id' | 'titulo' | 'descripcion' | 'icono' | 'lenguaje'>
