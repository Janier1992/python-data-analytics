// Guía de referencia: metadatos ligeros de cada colección y carga diferida de su contenido
// (cada colección es un chunk aparte; la guía completa solo se descarga al abrir /referencia).
import type { ColeccionRef, MetaColeccion } from './tipos'

export type { ColeccionRef, EntradaRef, LenguajeRef, MetaColeccion, ParametroRef } from './tipos'

export const metaColecciones: MetaColeccion[] = [
  { id: 'python', titulo: 'Python básico', descripcion: 'Funciones integradas, texto, listas, diccionarios, control de flujo, errores, archivos y módulos de la biblioteca estándar.', icono: '🐍', lenguaje: 'python' },
  { id: 'numpy', titulo: 'NumPy', descripcion: 'Arreglos numéricos rápidos: crearlos, operar sin bucles, filtrarlos y calcular estadísticas.', icono: '🔢', lenguaje: 'python' },
  { id: 'pandas', titulo: 'pandas', descripcion: 'Tablas de datos: leer, explorar, seleccionar, limpiar, transformar, agrupar y combinar.', icono: '🐼', lenguaje: 'python' },
  { id: 'matplotlib', titulo: 'matplotlib', descripcion: 'Gráficos: líneas, barras, histogramas y dispersión, con títulos, etiquetas, leyenda y estilo.', icono: '📊', lenguaje: 'python' },
  { id: 'estadistica', titulo: 'Estadística (scipy y statsmodels)', descripcion: 'Pruebas de hipótesis, correlaciones, distribuciones y regresión.', icono: '📐', lenguaje: 'python' },
  { id: 'sklearn', titulo: 'scikit-learn', descripcion: 'Machine learning: preparar datos, entrenar modelos, medir su calidad, validar y agrupar.', icono: '🤖', lenguaje: 'python' },
  { id: 'sql', titulo: 'SQL', descripcion: 'Consultar, filtrar, agrupar y combinar tablas; funciones de texto, número y fecha; crear y modificar datos.', icono: '🗄️', lenguaje: 'sql' },
  { id: 'terminal', titulo: 'Terminal y Git', descripcion: 'Comandos de la línea de comandos y de Git para versionar tu trabajo.', icono: '⌨️', lenguaje: 'bash' },
]

const cargadores: Record<string, () => Promise<ColeccionRef>> = {
  python: () => import('./python').then((m) => m.pythonRef),
  numpy: () => import('./numpy').then((m) => m.numpyRef),
  pandas: () => import('./pandas').then((m) => m.pandasRef),
  matplotlib: () => import('./matplotlib').then((m) => m.matplotlibRef),
  estadistica: () => import('./estadistica').then((m) => m.estadisticaRef),
  sklearn: () => import('./sklearn').then((m) => m.sklearnRef),
  sql: () => import('./sql').then((m) => m.sqlRef),
  terminal: () => import('./terminal').then((m) => m.terminalRef),
}

const cache = new Map<string, Promise<ColeccionRef>>()

export function cargarColeccion(id: string): Promise<ColeccionRef> {
  let promesa = cache.get(id)
  if (!promesa) {
    const cargador = cargadores[id]
    if (!cargador) return Promise.reject(new Error(`Colección desconocida: ${id}`))
    promesa = cargador().catch((e) => {
      cache.delete(id) // permite reintentar si falló la red
      throw e
    })
    cache.set(id, promesa)
  }
  return promesa
}

/** Carga todas las colecciones (en el orden de metaColecciones). */
export function cargarTodasLasColecciones(): Promise<ColeccionRef[]> {
  return Promise.all(metaColecciones.map((m) => cargarColeccion(m.id)))
}
