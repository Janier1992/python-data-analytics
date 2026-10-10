// Comprobaciones del contenido sin programación (`motor: 'calculo'`): estructura, texto sin código y respuestas verificadas.
import { build } from 'esbuild'
import path from 'node:path'
import { raiz } from './cargar-modulos.mjs'

let cache = null

export async function cargarCalculo() {
  if (cache) return cache
  const bundle = async (entrada) => {
    const { outputFiles } = await build({ entryPoints: [path.join(raiz, entrada)], bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent' })
    return import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`)
  }
  cache = { calculo: await bundle('src/calculo/index.ts'), excel: await bundle('src/excel/index.ts') }
  return cache
}

const TIPOS_GRAFICO = new Set(['histograma', 'barras', 'caja', 'dispersion', 'normal'])
const numeros = (a) => Array.isArray(a) && a.length > 0 && a.every((n) => typeof n === 'number' && Number.isFinite(n))

// Lo que NO debe aparecer en un curso sin programación: bloques de código, librerías o instrucciones de Python.
const PROHIBIDO = /```|\bimport\s+\w|\bpandas\b|\bnumpy\b|\bscipy\b|\bstatsmodels\b|\bmatplotlib\b|\bscikit|\bdf\b|\bdf\[|\bprint\s*\(|\.mean\(|\.describe\(|\bpd\.|\bnp\.|\.groupby\(|\.sample\(|\bDataFrame\b|\.value_counts\(|\.corr\(/

function tablaValida(t, falla, donde) {
  if (!t || !Array.isArray(t.columnas) || t.columnas.length === 0 || !Array.isArray(t.filas) || t.filas.length === 0) return falla(`${donde}: tabla sin columnas o filas`)
  for (const [i, fila] of t.filas.entries()) {
    if (!Array.isArray(fila) || fila.length !== t.columnas.length) falla(`${donde}: la fila ${i + 1} no tiene ${t.columnas.length} celdas`)
    else if (fila.some((c) => typeof c !== 'string' && !(typeof c === 'number' && Number.isFinite(c)))) falla(`${donde}: la fila ${i + 1} tiene celdas que no son texto ni número`)
  }
}

function graficoValido(g, falla, donde) {
  if (!g || !TIPOS_GRAFICO.has(g.tipo)) return falla(`${donde}: tipo de gráfico desconocido (${g?.tipo})`)
  if (g.tipo === 'histograma' || g.tipo === 'caja') if (!numeros(g.datos)) falla(`${donde}: datos del gráfico inválidos`)
  if (g.tipo === 'barras' && (!Array.isArray(g.categorias) || !numeros(g.valores) || g.categorias.length !== g.valores.length)) falla(`${donde}: categorías y valores no coinciden`)
  if (g.tipo === 'dispersion' && (!numeros(g.x) || !numeros(g.y) || g.x.length !== g.y.length)) falla(`${donde}: x e y no coinciden`)
  if (g.tipo === 'normal' && !(Number.isFinite(g.media) && g.desv > 0)) falla(`${donde}: media o desviación inválidas`)
}

/** Estructura de un ejemplo resuelto. */
export function comprobarEjemplo(e, falla, donde) {
  if (!e || e.tipo !== 'resuelto') return falla(`${donde} debe ser un ejemplo resuelto (tipo: 'resuelto')`)
  if (!Array.isArray(e.pasos) || e.pasos.length === 0 || e.pasos.some((p) => typeof p !== 'string' || !p.trim())) falla(`${donde}: pasos vacíos`)
  for (const t of e.datos ?? []) tablaValida(t, falla, donde)
  for (const g of e.graficos ?? []) graficoValido(g, falla, donde)
}

/** Estructura de un ejercicio de cálculo y verificación de sus respuestas con la fórmula `calculo`, si la trae. */
export function comprobarEjercicio(ej, falla, clave, motores) {
  for (const campo of ['enunciado']) if (typeof ej[campo] !== 'string' || !ej[campo].trim()) falla(`${clave}.${campo} vacío`)
  if (!Array.isArray(ej.preguntas) || ej.preguntas.length === 0) return falla(`${clave} sin preguntas`)
  if (!Array.isArray(ej.solucion) || ej.solucion.length === 0 || ej.solucion.some((p) => typeof p !== 'string' || !p.trim())) falla(`${clave}.solucion debe ser una lista de pasos`)
  for (const t of ej.datos ?? []) tablaValida(t, falla, clave)
  for (const g of ej.graficos ?? []) graficoValido(g, falla, clave)
  for (const [i, p] of ej.preguntas.entries()) {
    const donde = `${clave}.preguntas[${i}]`
    if (typeof p.etiqueta !== 'string' || !p.etiqueta.trim()) falla(`${donde}: sin etiqueta`)
    if (p.tipo === 'numero') {
      if (!Number.isFinite(p.valor)) falla(`${donde}: valor no numérico`)
      else if (p.calculo !== undefined) {
        const r = motores.excel.evaluarFormula(p.calculo, { celdas: [[null]] })
        const v = r.ok ? motores.excel.primerValor(r.valor) : null
        const tol = motores.calculo.toleranciaDe(p.valor, p.tolerancia)
        if (typeof v !== 'number') falla(`${donde}: la fórmula de comprobación «${p.calculo}» no da un número (${r.ok ? JSON.stringify(v) : r.mensaje})`)
        else if (Math.abs(v - p.valor) > tol + Math.abs(p.valor) * 1e-9) falla(`${donde}: la fórmula de comprobación «${p.calculo}» da ${v}, pero el valor declarado es ${p.valor}`)
      }
    } else if (p.tipo === 'opcion') {
      if (!Array.isArray(p.opciones) || p.opciones.length < 2 || new Set(p.opciones).size !== p.opciones.length) falla(`${donde}: opciones inválidas`)
      else if (!Number.isInteger(p.correcta) || p.correcta < 0 || p.correcta >= p.opciones.length) falla(`${donde}: correcta fuera de rango`)
    } else falla(`${donde}: tipo de pregunta desconocido (${p.tipo})`)
  }
}

/** Textos de una lección que se muestran al estudiante (para detectar código en cursos sin programación). */
export function textosDeLeccion(l) {
  const sal = [l.titulo, l.objetivo, l.porQueImporta, l.concepto, l.errorFrecuente?.codigo, l.errorFrecuente?.explicacion, l.proximoPaso, ...(l.resumen ?? [])]
  for (const e of [l.ejemploMinimo, l.ejemploAplicado]) if (e && typeof e === 'object') sal.push(e.titulo, e.conclusion, ...(e.pasos ?? []))
  for (const ej of [l.practicaGuiada, l.reto]) {
    if (!ej || typeof ej !== 'object') continue
    sal.push(ej.enunciado, ...(ej.solucion ?? []), ...(ej.pistas ?? []), ...(ej.preguntas ?? []).flatMap((p) => [p.etiqueta, ...(p.opciones ?? [])]))
  }
  for (const q of l.verificacion ?? []) sal.push(q.pregunta, q.explicacion, ...(q.opciones ?? []))
  return sal.filter((t) => typeof t === 'string')
}

export function sinCodigo(l, falla) {
  for (const t of textosDeLeccion(l)) {
    const m = PROHIBIDO.exec(t)
    if (m) falla(`curso sin programación: aparece código o librerías de Python («${m[0].trim()}») en «${t.slice(Math.max(0, m.index - 30), m.index + 40).replace(/\n/g, ' ')}»`)
  }
}
