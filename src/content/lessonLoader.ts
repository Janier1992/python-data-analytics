import type { Lesson } from '../types'
import { moduleLoaders } from './generated'

const lessonsPorModulo = new Map<string, Promise<Lesson[]>>()

/** Descarga (una sola vez) el contenido de un módulo; cada módulo es un chunk independiente. */
function cargarModulo(moduloId: string): Promise<Lesson[]> {
  let promesa = lessonsPorModulo.get(moduloId)
  if (!promesa) {
    const cargador = moduleLoaders[moduloId]
    if (!cargador) return Promise.reject(new Error(`Módulo desconocido: ${moduloId}`))
    promesa = cargador().catch((error) => {
      lessonsPorModulo.delete(moduloId) // permite reintentar si falló la red
      throw error
    })
    lessonsPorModulo.set(moduloId, promesa)
  }
  return promesa
}

/** Carga el contenido completo de una lección bajo demanda. Resuelve `undefined` si no existe. */
export async function cargarLeccion(moduloId: string, leccionId: string): Promise<Lesson | undefined> {
  const lecciones = await cargarModulo(moduloId)
  return lecciones.find((l) => l.id === leccionId)
}
