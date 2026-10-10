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
const TIPOS_PANTALLA = new Set(['powerquery', 'modelo', 'informe', 'medida'])
const TIPOS_VISUAL = new Set(['tarjeta', 'barras', 'lineas', 'matriz', 'segmentador', 'medidor'])

/** Paréntesis, corchetes y comillas equilibrados en un trozo de DAX o de M (un error de tecleo se vería en pantalla). */
function equilibrado(codigo) {
  const pila = []
  let comillas = false
  for (const ch of codigo.replace(/\/\/.*$/gm, '')) {
    if (ch === '"') comillas = !comillas
    else if (!comillas) {
      if ('([{'.includes(ch)) pila.push(ch)
      else if (')]}'.includes(ch)) {
        const abre = pila.pop()
        if (!abre || '([{'.indexOf(abre) !== ')]}'.indexOf(ch)) return false
      }
    }
  }
  return pila.length === 0 && !comillas
}

function pantallaValida(p, falla, donde) {
  if (!p || !TIPOS_PANTALLA.has(p.tipo)) return falla(`${donde}: tipo de pantalla desconocido (${p?.tipo})`)
  if (p.tipo === 'powerquery') {
    if (!Array.isArray(p.pasos) || p.pasos.length === 0 || !Number.isInteger(p.pasoActivo) || p.pasoActivo < 0 || p.pasoActivo >= p.pasos.length) falla(`${donde}: pasos o paso activo inválidos`)
    if (!Array.isArray(p.columnas) || p.columnas.length === 0 || !Array.isArray(p.filas) || p.filas.some((f) => !Array.isArray(f) || f.length !== p.columnas.length)) falla(`${donde}: las filas no tienen una celda por columna`)
    if (p.formula && !equilibrado(p.formula)) falla(`${donde}: fórmula M con paréntesis o comillas sin cerrar`)
  }
  if (p.tipo === 'modelo') {
    const nombres = new Set((p.tablas ?? []).map((t) => t.nombre))
    if (nombres.size < 2 || !(p.tablas ?? []).some((t) => t.rol === 'hechos')) falla(`${donde}: el modelo necesita al menos una tabla de hechos y una dimensión`)
    for (const t of p.tablas ?? []) for (const k of t.claves ?? []) if (!t.columnas.includes(k)) falla(`${donde}: la clave «${k}» no es una columna de ${t.nombre}`)
    for (const r of p.relaciones ?? []) {
      for (const ref of [r.de, r.a]) {
        const [tabla, col] = String(ref).split('.')
        const t = (p.tablas ?? []).find((x) => x.nombre === tabla)
        if (!t || !t.columnas.includes(col)) falla(`${donde}: la relación apunta a «${ref}», que no existe`)
      }
    }
  }
  if (p.tipo === 'informe') {
    if (!Array.isArray(p.visuales) || p.visuales.length === 0) falla(`${donde}: informe sin visuales`)
    for (const v of p.visuales ?? []) {
      if (!TIPOS_VISUAL.has(v.tipo)) { falla(`${donde}: visual desconocido (${v.tipo})`); continue }
      if (v.tipo === 'barras' && (!numeros(v.valores) || v.categorias?.length !== v.valores.length)) falla(`${donde}: categorías y valores no coinciden`)
      if (v.tipo === 'lineas' && (!v.series?.length || v.series.some((s) => !numeros(s.valores) || s.valores.length !== v.etiquetas?.length))) falla(`${donde}: las series no tienen un valor por etiqueta`)
      if (v.tipo === 'matriz' && (v.filas ?? []).some((f) => f.length !== v.columnas.length)) falla(`${donde}: matriz con filas de longitud distinta`)
      if (v.tipo === 'medidor' && !(v.meta > 0 && Number.isFinite(v.valor))) falla(`${donde}: medidor inválido`)
    }
  }
  if (p.tipo === 'medida' && (typeof p.dax !== 'string' || !p.dax.trim() || !equilibrado(p.dax))) falla(`${donde}: DAX vacío o con paréntesis, corchetes o comillas sin cerrar`)
}
const numeros = (a) => Array.isArray(a) && a.length > 0 && a.every((n) => typeof n === 'number' && Number.isFinite(n))

// Lo que NO debe aparecer en un curso sin programación: bloques de código, librerías o instrucciones de Python.
const PROHIBIDO = /```(?!dax\b|m\b|powerquery\b)|\bimport\s+\w|\bpandas\b|\bnumpy\b|\bscipy\b|\bstatsmodels\b|\bmatplotlib\b|\bscikit|\bdf\b|\bdf\[|\bprint\s*\(|\.mean\(|\.describe\(|\bpd\.|\bnp\.|\.groupby\(|\.sample\(|\bDataFrame\b|\.value_counts\(|\.corr\(/

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
  for (const p of e.pantallas ?? []) pantallaValida(p, falla, donde)
}

/** Estructura de un ejercicio de cálculo y verificación de sus respuestas con la fórmula `calculo`, si la trae. */
export function comprobarEjercicio(ej, falla, clave, motores) {
  for (const campo of ['enunciado']) if (typeof ej[campo] !== 'string' || !ej[campo].trim()) falla(`${clave}.${campo} vacío`)
  if (!Array.isArray(ej.preguntas) || ej.preguntas.length === 0) return falla(`${clave} sin preguntas`)
  if (!Array.isArray(ej.solucion) || ej.solucion.length === 0 || ej.solucion.some((p) => typeof p !== 'string' || !p.trim())) falla(`${clave}.solucion debe ser una lista de pasos`)
  for (const t of ej.datos ?? []) tablaValida(t, falla, clave)
  for (const g of ej.graficos ?? []) graficoValido(g, falla, clave)
  for (const p of ej.pantallas ?? []) pantallaValida(p, falla, clave)
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
    } else if (p.tipo === 'casillas') {
      if (!Array.isArray(p.opciones) || p.opciones.length < 3 || new Set(p.opciones).size !== p.opciones.length) falla(`${donde}: opciones inválidas`)
      else if (!Array.isArray(p.correctas) || p.correctas.length === 0 || p.correctas.length === p.opciones.length || p.correctas.some((c) => !Number.isInteger(c) || c < 0 || c >= p.opciones.length)) falla(`${donde}: las correctas deben ser algunas (no todas) de las opciones`)
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

function textosExtra(l) {
  const sal = []
  const recoger = (x) => {
    if (typeof x === 'string') sal.push(x)
    else if (Array.isArray(x)) x.forEach(recoger)
    else if (x && typeof x === 'object') Object.values(x).forEach(recoger)
  }
  for (const e of [l.ejemploMinimo, l.ejemploAplicado, l.practicaGuiada, l.reto]) if (e && typeof e === 'object') { recoger(e.pantallas); recoger(e.datos) }
  return sal
}

export function sinCodigo(l, falla) {
  for (const t of l.concepto?.match(/```dax\n[\s\S]*?```/g) ?? []) if (!equilibrado(t.replace(/```(dax)?/g, ''))) falla(`DAX con paréntesis, corchetes o comillas sin cerrar en el concepto: «${t.slice(0, 60).replace(/\n/g, ' ')}»`)
  for (const t of [...textosDeLeccion(l), ...textosExtra(l)]) {
    // los bloques ```dax y ```m (Power BI) están permitidos: se quitan, con su cierre, antes de buscar código de Python
    const limpio = t.replace(/```(?:dax|m|powerquery)\n[\s\S]*?```/g, '')
    const m = PROHIBIDO.exec(limpio)
    if (m) falla(`curso sin programación: aparece código o librerías de Python («${m[0].trim()}») en «${limpio.slice(Math.max(0, m.index - 30), m.index + 40).replace(/\n/g, ' ')}»`)
  }
}
