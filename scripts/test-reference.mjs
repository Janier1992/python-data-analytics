// Prueba automática de la guía de referencia (src/content/reference/*).
//
// Comprueba la estructura de cada entrada y EJECUTA su ejemplo con Python real (los de SQL, sobre la
// base de práctica con sqlite3). Si la entrada declara `salida`, la salida real debe coincidir.
// Los ejemplos de terminal/Git (bash) no se ejecutan.
//
// Uso:  npm run test:reference            (todas las colecciones)
//       npm run test:reference -- pandas  (solo la colección indicada)
import { build } from 'esbuild'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { raiz } from './lib/cargar-modulos.mjs'
import { PYTHON, conConcurrencia, ejecutarPython, ultimasLineas } from './lib/python-runner.mjs'

const CONCURRENCIA = Math.max(2, Number(process.env.TEST_CONCURRENCY) || 4)
const filtro = process.argv.slice(2).filter((a) => !a.startsWith('-'))

const { outputFiles } = await build({
  stdin: {
    contents: `export { colecciones } from './content/reference/todas'\nexport { envolverSql } from './content/sqlPractica'`,
    resolveDir: path.join(raiz, 'src'),
    loader: 'ts',
  },
  bundle: true,
  format: 'esm',
  write: false,
  logLevel: 'silent',
})
const { colecciones, envolverSql } = await import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`)

const idsLecciones = new Set([...readFileSync(path.join(raiz, 'src/content/generated.ts'), 'utf8').matchAll(/\{ id: "([^"]+)", moduloId/g)].map((m) => m[1]))
const todas = colecciones.flatMap((c) => c.entradas.map((e) => ({ ...e, coleccion: c })))
const idsEntradas = new Set(todas.map((e) => e.id))

const fallos = []
const falla = (e, que, detalle) => fallos.push({ id: e.id, que, detalle })

// ───── Estructura ─────
const vistos = new Set()
for (const c of colecciones) {
  for (const campo of ['id', 'titulo', 'descripcion', 'icono']) if (!c[campo]?.trim()) fallos.push({ id: c.id, que: 'estructura', detalle: `colección sin ${campo}` })
  if (!['python', 'sql', 'bash'].includes(c.lenguaje)) fallos.push({ id: c.id, que: 'estructura', detalle: `lenguaje inválido: ${c.lenguaje}` })
  if (c.entradas.length === 0) fallos.push({ id: c.id, que: 'estructura', detalle: 'colección vacía' })
}
for (const e of todas) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.id)) falla(e, 'estructura', 'el id debe ser minúsculas, números y guiones')
  if (vistos.has(e.id)) falla(e, 'estructura', 'id repetido')
  vistos.add(e.id)
  if (!e.id.startsWith(`${e.coleccion.id}-`)) falla(e, 'estructura', `el id debería empezar por "${e.coleccion.id}-"`)
  for (const campo of ['nombre', 'grupo', 'resumen', 'ejemplo']) if (typeof e[campo] !== 'string' || !e[campo].trim()) falla(e, 'estructura', `campo "${campo}" vacío`)
  if (e.resumen && e.resumen.length > 140) falla(e, 'estructura', `el resumen debe caber en una línea (≤140 caracteres, tiene ${e.resumen.length})`)
  const nombresParam = new Set()
  for (const p of e.parametros ?? []) {
    if (!p.nombre?.trim() || !p.descripcion?.trim()) falla(e, 'estructura', 'parámetro sin nombre o descripción')
    if (nombresParam.has(p.nombre)) falla(e, 'estructura', `parámetro repetido: ${p.nombre}`)
    nombresParam.add(p.nombre)
  }
  for (const r of e.relacionadas ?? []) if (!idsEntradas.has(r)) falla(e, 'estructura', `relacionada inexistente: ${r}`)
  for (const l of e.lecciones ?? []) if (!idsLecciones.has(l)) falla(e, 'estructura', `lección inexistente: ${l}`)
}

// ───── Ejemplos ─────
const aEjecutar = todas.filter((e) => (filtro.length === 0 || filtro.includes(e.coleccion.id)) && e.coleccion.lenguaje !== 'bash')
console.log(`Python ${PYTHON} · ${colecciones.length} colecciones, ${todas.length} entradas; ejecutando ${aEjecutar.length} ejemplos${filtro.length ? ` de: ${filtro.join(', ')}` : ''}\n`)

const inicio = Date.now()
const resultados = await conConcurrencia(aEjecutar, CONCURRENCIA, async (e) => {
  const codigo = e.coleccion.lenguaje === 'sql' ? envolverSql(e.ejemplo) : e.ejemplo
  return { e, r: await ejecutarPython(codigo) }
})

for (const { e, r } of resultados) {
  if (r.codigo !== 0) {
    falla(e, 'ejemplo', `terminó con código ${r.codigo}:\n${ultimasLineas(r.stderr)}`)
    continue
  }
  if (/\b(FutureWarning|DeprecationWarning)\b/.test(r.stderr)) falla(e, 'ejemplo', `usa algo obsoleto:\n${ultimasLineas(r.stderr, 3)}`)
  if (e.salida !== undefined && r.stdout.trim() !== e.salida.trim()) {
    falla(e, 'salida', `la salida declarada no coincide.\n  esperada: ${JSON.stringify(e.salida.trim())}\n  real:     ${JSON.stringify(r.stdout.trim())}`)
  }
}

const porColeccion = colecciones.map((c) => {
  const nFallos = fallos.filter((f) => todas.find((e) => e.id === f.id)?.coleccion.id === c.id || f.id === c.id).length
  return `  ${c.icono} ${c.id.padEnd(14)} ${String(c.entradas.length).padStart(3)} entradas ${nFallos ? `✗ ${nFallos} fallo(s)` : '✓'}`
})
console.log(porColeccion.join('\n'))
const segundos = ((Date.now() - inicio) / 1000).toFixed(1)
if (fallos.length) {
  console.log(`\n✗ ${fallos.length} fallo(s):\n`)
  for (const f of fallos) console.log(`  [${f.id}] ${f.que}\n    ${f.detalle.replace(/\n/g, '\n    ')}\n`)
  console.log(`${aEjecutar.length} ejemplos ejecutados en ${segundos}s`)
  process.exit(1)
}
console.log(`\n✓ Guía de referencia en orden: ${todas.length} entradas, ${aEjecutar.length} ejemplos ejecutados en ${segundos}s`)
