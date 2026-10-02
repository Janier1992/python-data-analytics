// Prueba automática del contenido del curso.
//
// Para cada lección comprueba:
//   · estructura (campos obligatorios, ids únicos, preguntas del quiz bien formadas);
//   · que el código de ejemploMinimo y ejemploAplicado se ejecuta sin errores;
//   · que la `solucion` de la práctica guiada y del reto se ejecuta y PASA su `validar`;
//   · que el `codigoInicial` NO pasa `validar` (el ejercicio no debe resolverse solo).
//
// Ejecuta el código con un Python real (por defecto `python3`, o la variable PYTHON). Para
// reproducir lo que ve el estudiante usa las versiones de tests/requirements.txt (las de Pyodide).
//
// Uso:  npm test                       (todos los módulos)
//       npm test -- 14 19              (solo los módulos 14 y 19)
//       npm test -- --strict           (las advertencias de Python, p. ej. ConvergenceWarning, también fallan)
import { cargarLecciones, listarModulos } from './lib/cargar-modulos.mjs'
import { PYTHON, conConcurrencia, ejecutarPython, ultimasLineas } from './lib/python-runner.mjs'

const CONCURRENCIA = Math.max(2, Number(process.env.TEST_CONCURRENCY) || 4)

const args = process.argv.slice(2)
const estricto = args.includes('--strict')
const filtro = args.filter((a) => /^\d+$/.test(a)).map(Number)

function validar(ejercicio, stdout) {
  try {
    return ejercicio.validar(stdout)
  } catch (e) {
    return { ok: false, mensaje: `validar lanzó un error: ${e.message}` }
  }
}

/** Comprobaciones de estructura (rápidas, sin Python). */
function comprobarEstructura(l, numeroModulo, fallos) {
  const falla = (m) => fallos.push({ leccion: l.id, que: 'estructura', detalle: m })
  if (l.moduloId !== `modulo-${numeroModulo}`) falla(`moduloId "${l.moduloId}" no coincide con modulo-${numeroModulo}`)
  if (!new RegExp(`^m${numeroModulo}-l\\d+$`).test(l.id)) falla(`id "${l.id}" no sigue el patrón m${numeroModulo}-lN`)
  for (const campo of ['titulo', 'objetivo', 'porQueImporta', 'concepto', 'ejemploMinimo', 'ejemploAplicado', 'proximoPaso']) {
    if (typeof l[campo] !== 'string' || !l[campo].trim()) falla(`campo "${campo}" vacío o ausente`)
  }
  if (!l.errorFrecuente?.codigo?.trim() || !l.errorFrecuente?.explicacion?.trim()) falla('errorFrecuente incompleto')
  if (!Array.isArray(l.conceptos) || l.conceptos.length === 0) falla('conceptos vacío')
  if (!Array.isArray(l.resumen) || l.resumen.length === 0) falla('resumen vacío')
  for (const [clave, ej] of [['practicaGuiada', l.practicaGuiada], ['reto', l.reto]]) {
    if (!ej) {
      falla(`${clave} ausente`)
      continue
    }
    if (!ej.id?.startsWith(`${l.id}-`)) falla(`${clave}.id "${ej.id}" debería empezar por "${l.id}-"`)
    for (const campo of ['enunciado', 'codigoInicial', 'solucion']) {
      if (typeof ej[campo] !== 'string' || !ej[campo].trim()) falla(`${clave}.${campo} vacío`)
    }
    if (typeof ej.validar !== 'function') falla(`${clave}.validar no es una función`)
    if (!Array.isArray(ej.pistas) || ej.pistas.length === 0) falla(`${clave} sin pistas`)
  }
  if (!Array.isArray(l.verificacion) || l.verificacion.length === 0) falla('verificacion vacía')
  for (const q of l.verificacion ?? []) {
    if (!q.id || !q.pregunta?.trim() || !q.explicacion?.trim()) falla(`pregunta ${q.id ?? '(sin id)'} incompleta`)
    if (!Array.isArray(q.opciones) || q.opciones.length < 2) falla(`pregunta ${q.id}: necesita al menos 2 opciones`)
    else if (!Number.isInteger(q.respuestaCorrecta) || q.respuestaCorrecta < 0 || q.respuestaCorrecta >= q.opciones.length)
      falla(`pregunta ${q.id}: respuestaCorrecta ${q.respuestaCorrecta} fuera de rango`)
    else if (new Set(q.opciones).size !== q.opciones.length) falla(`pregunta ${q.id}: opciones repetidas`)
  }
}

/** Genera las tareas de ejecución de una lección. */
function tareasDeLeccion(l) {
  const tareas = []
  tareas.push({ leccion: l.id, que: 'ejemploMinimo', codigo: l.ejemploMinimo, esperar: 'sin-error' })
  tareas.push({ leccion: l.id, que: 'ejemploAplicado', codigo: l.ejemploAplicado, esperar: 'sin-error' })
  for (const [clave, ej] of [['practicaGuiada', l.practicaGuiada], ['reto', l.reto]]) {
    tareas.push({ leccion: l.id, que: `${clave}.solucion`, codigo: ej.solucion, esperar: 'pasa', ejercicio: ej })
    tareas.push({ leccion: l.id, que: `${clave}.codigoInicial`, codigo: ej.codigoInicial, esperar: 'no-pasa', ejercicio: ej })
  }
  return tareas
}

function evaluar(tarea, r) {
  const advertencias = /\b(?:\w+Warning)\b/.test(r.stderr) ? [ultimasLineas(r.stderr, 2)] : []
  if (tarea.esperar === 'sin-error') {
    if (r.codigo !== 0) return { ok: false, detalle: `terminó con código ${r.codigo}:\n${ultimasLineas(r.stderr)}`, advertencias }
    return { ok: true, advertencias }
  }
  if (tarea.esperar === 'pasa') {
    if (r.codigo !== 0) return { ok: false, detalle: `la solución falló (código ${r.codigo}):\n${ultimasLineas(r.stderr)}`, advertencias }
    const v = validar(tarea.ejercicio, r.stdout)
    if (!v.ok) return { ok: false, detalle: `la solución no pasa validar. Salida: ${JSON.stringify(r.stdout.trim().slice(0, 200))} — ${v.mensaje}`, advertencias }
    return { ok: true, advertencias }
  }
  // 'no-pasa': el código inicial puede fallar o imprimir algo, pero no debe validar como correcto
  if (r.codigo === 0 && validar(tarea.ejercicio, r.stdout).ok) {
    return { ok: false, detalle: `el código inicial ya pasa validar sin que el estudiante haga nada (salida: ${JSON.stringify(r.stdout.trim().slice(0, 100))})`, advertencias }
  }
  return { ok: true, advertencias }
}

const inicio = Date.now()
const modulos = listarModulos().filter((n) => filtro.length === 0 || filtro.includes(n))
if (modulos.length === 0) {
  console.error('No hay módulos que probar con ese filtro.')
  process.exit(2)
}

const version = await ejecutarPython('import sys; print(sys.version.split()[0])')
if (version.codigo !== 0) {
  console.error(`No se pudo ejecutar "${PYTHON}". Instala Python o define la variable PYTHON.`)
  process.exit(2)
}
console.log(`Python ${version.stdout.trim()} (${PYTHON}) · módulos: ${modulos.join(', ')}${estricto ? ' · modo estricto' : ''}\n`)

const fallos = []
const advertencias = []
let lecciones = 0
let tareasEjecutadas = 0
const idsEjercicio = new Set()

const porModulo = []
for (const n of modulos) {
  const contenido = await cargarLecciones(n)
  lecciones += contenido.length
  for (const l of contenido) {
    comprobarEstructura(l, n, fallos)
    for (const ej of [l.practicaGuiada, l.reto]) {
      if (ej?.id) {
        if (idsEjercicio.has(ej.id)) fallos.push({ leccion: l.id, que: 'estructura', detalle: `id de ejercicio repetido: ${ej.id}` })
        idsEjercicio.add(ej.id)
      }
    }
  }
  const tareas = contenido.filter((l) => l.practicaGuiada && l.reto).flatMap(tareasDeLeccion)
  const resultados = await conConcurrencia(tareas, CONCURRENCIA, async (t) => ({ t, r: await ejecutarPython(t.codigo) }))
  let falloModulo = 0
  for (const { t, r } of resultados) {
    tareasEjecutadas++
    const ev = evaluar(t, r)
    for (const a of ev.advertencias) advertencias.push({ leccion: t.leccion, que: t.que, detalle: a })
    if (!ev.ok || (estricto && ev.advertencias.length)) {
      falloModulo++
      fallos.push({ leccion: t.leccion, que: t.que, detalle: ev.detalle ?? `advertencia de Python: ${ev.advertencias[0]}` })
    }
  }
  porModulo.push({ n, lecciones: contenido.length, tareas: tareas.length, falloModulo })
  console.log(`  módulo ${String(n).padStart(2)}: ${String(contenido.length).padStart(2)} lecciones, ${String(tareas.length).padStart(3)} ejecuciones ${falloModulo ? `✗ ${falloModulo} con fallos` : '✓'}`)
}

const segundos = ((Date.now() - inicio) / 1000).toFixed(1)
if (advertencias.length) {
  console.log(`\nAdvertencias de Python (${advertencias.length}; fallan solo con --strict):`)
  for (const a of advertencias.slice(0, 15)) console.log(`  · ${a.leccion} ${a.que}: ${a.detalle.split('\n')[0].slice(0, 150)}`)
}
if (fallos.length) {
  console.log(`\n✗ ${fallos.length} fallo(s):\n`)
  for (const f of fallos) console.log(`  [${f.leccion}] ${f.que}\n    ${f.detalle.replace(/\n/g, '\n    ')}\n`)
  console.log(`${lecciones} lecciones, ${tareasEjecutadas} ejecuciones de Python en ${segundos}s`)
  process.exit(1)
}
console.log(`\n✓ Todo en orden: ${lecciones} lecciones, ${tareasEjecutadas} ejecuciones de Python en ${segundos}s`)
