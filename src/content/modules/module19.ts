import type { Lesson } from '../../types'

// Base de datos de práctica: una tienda con clientes, productos y pedidos.
// Se crea en memoria con sqlite3 (incluido en Python), así que corre 100% en el navegador.
const SETUP = `import sqlite3

conn = sqlite3.connect(":memory:")
conn.executescript("""
CREATE TABLE clientes (id INTEGER PRIMARY KEY, nombre TEXT, ciudad TEXT, plan TEXT);
CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, categoria TEXT, precio REAL);
CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, producto_id INTEGER, cantidad INTEGER, fecha TEXT);

INSERT INTO clientes VALUES
  (1, 'Ana', 'Bogota', 'Premium'), (2, 'Luis', 'Medellin', 'Basico'), (3, 'Marta', 'Bogota', 'Basico'),
  (4, 'Pedro', 'Cali', 'Premium'), (5, 'Sofia', 'Medellin', 'Estandar'), (6, 'Diego', 'Bogota', 'Estandar');
INSERT INTO productos VALUES
  (1, 'Laptop', 'Electronica', 2500), (2, 'Mouse', 'Accesorios', 50), (3, 'Teclado', 'Accesorios', 120),
  (4, 'Monitor', 'Electronica', 800), (5, 'Audifonos', 'Accesorios', 150);
INSERT INTO pedidos VALUES
  (1, 1, 1, 1, '2024-01-10'), (2, 1, 2, 2, '2024-01-12'), (3, 2, 3, 1, '2024-01-15'),
  (4, 3, 4, 2, '2024-02-01'), (5, 4, 1, 1, '2024-02-05'), (6, 5, 5, 3, '2024-02-10'),
  (7, 2, 2, 4, '2024-02-14'), (8, 1, 5, 1, '2024-03-01'), (9, 3, 2, 5, '2024-03-03'),
  (10, 5, 4, 1, '2024-03-09');
""")`

export const module19Lessons: Lesson[] = [
  {
    id: 'm19-l1',
    moduloId: 'modulo-19',
    titulo: 'SQL: SELECT, WHERE, ORDER BY y LIMIT',
    objetivo: 'Consultar una tabla con SELECT, filtrar filas con WHERE, ordenarlas con ORDER BY y limitar el resultado con LIMIT.',
    porQueImporta:
      'La mayoría de los datos de las empresas viven en bases de datos relacionales, no en archivos CSV. SQL es el idioma para pedírselos, y es una de las habilidades más solicitadas en cualquier puesto de datos.',
    concepto: `En esta ruta trabajamos con **SQLite**, un motor de base de datos que viene incluido en Python (módulo \`sqlite3\`) y corre dentro del navegador. Usaremos una tienda con tres tablas: \`clientes\`, \`productos\` y \`pedidos\`.

\`\`\`python
${SETUP}
\`\`\`

Una **tabla** es como un DataFrame: filas (registros) y columnas (campos). Para consultarla ejecutas una sentencia SQL y recoges las filas:

\`\`\`python
filas = conn.execute("SELECT nombre, ciudad FROM clientes").fetchall()
\`\`\`

\`fetchall()\` devuelve una lista de **tuplas**, una por fila.

Las cláusulas básicas, **en este orden**:

\`\`\`sql
SELECT columnas        -- qué columnas quiero
FROM tabla             -- de qué tabla
WHERE condicion        -- qué filas cumplen (opcional)
ORDER BY columna DESC  -- en qué orden (opcional; ASC por defecto)
LIMIT n                -- cuántas filas como máximo (opcional)
\`\`\`

Detalles útiles:
- \`SELECT *\` trae todas las columnas (cómodo para explorar; en análisis serios, pide solo las que necesitas).
- En \`WHERE\` usas \`=\`, \`<>\`, \`>\`, \`<\`, \`AND\`, \`OR\`, \`IN (...)\`, \`LIKE '%texto%'\` y \`BETWEEN a AND b\`.
- Los textos van entre **comillas simples**: \`ciudad = 'Bogota'\`.
- SQL no distingue mayúsculas en las palabras clave, pero por convención se escriben en mayúsculas.`,
    ejemploMinimo: `${SETUP}

print(conn.execute("SELECT COUNT(*) FROM clientes").fetchall())`,
    ejemploAplicado: `${SETUP}

sql = """
SELECT nombre, precio
FROM productos
WHERE categoria = 'Accesorios' AND precio >= 100
ORDER BY precio DESC
"""
for fila in conn.execute(sql).fetchall():
    print(fila)`,
    errorFrecuente: {
      codigo: `conn.execute('SELECT nombre FROM clientes WHERE ciudad = "Bogota"')
conn.execute("SELECT nombre FROM clientes ORDER BY nombre WHERE ciudad = 'Bogota'")   # error de sintaxis`,
      explicacion:
        'Dos errores típicos: (1) en SQL estándar los textos van entre **comillas simples** (las dobles se reservan para nombres de columnas o tablas); (2) el **orden de las cláusulas importa**: `WHERE` va antes de `ORDER BY`, no después.',
    },
    practicaGuiada: {
      id: 'm19-l1-practica',
      enunciado:
        'Escribe una consulta que traiga los nombres (`nombre`) de los clientes de la ciudad `Bogota`, ordenados alfabéticamente. Imprime la lista de nombres con `[fila[0] for fila in filas]`.',
      codigoInicial: `${SETUP}\n\nsql = ""   # escribe aquí tu consulta\nfilas = conn.execute(sql).fetchall() if sql else []\nprint([fila[0] for fila in filas])`,
      solucion: `${SETUP}\n\nsql = "SELECT nombre FROM clientes WHERE ciudad = 'Bogota' ORDER BY nombre"\nfilas = conn.execute(sql).fetchall()\nprint([fila[0] for fila in filas])`,
      pistas: ['`SELECT nombre FROM clientes WHERE ciudad = \'Bogota\'`', 'Añade `ORDER BY nombre` al final.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "['Ana', 'Diego', 'Marta']"
        return { ok, mensaje: ok ? 'Correcto: tres clientes en Bogotá.' : "El resultado esperado es ['Ana', 'Diego', 'Marta']." }
      },
    },
    reto: {
      id: 'm19-l1-reto',
      enunciado:
        'Obtén los nombres de los **2 productos más caros** entre los que cuestan más de 100, de mayor a menor precio (usa `WHERE`, `ORDER BY ... DESC` y `LIMIT`). Imprime la lista de nombres.',
      codigoInicial: `${SETUP}\n\nsql = ""   # escribe aquí tu consulta\nfilas = conn.execute(sql).fetchall() if sql else []\nprint([fila[0] for fila in filas])`,
      solucion: `${SETUP}\n\nsql = "SELECT nombre FROM productos WHERE precio > 100 ORDER BY precio DESC LIMIT 2"\nfilas = conn.execute(sql).fetchall()\nprint([fila[0] for fila in filas])`,
      pistas: ['`WHERE precio > 100`, luego `ORDER BY precio DESC`.', '`LIMIT 2` va al final de la consulta.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "['Laptop', 'Monitor']"
        return { ok, mensaje: ok ? 'Correcto: Laptop (2500) y Monitor (800).' : "El resultado esperado es ['Laptop', 'Monitor']." }
      },
    },
    verificacion: [
      {
        id: 'm19-l1-q1',
        pregunta: '¿Cuál es el orden correcto de las cláusulas en una consulta SQL?',
        opciones: [
          'SELECT, WHERE, FROM, ORDER BY, LIMIT',
          'SELECT, FROM, WHERE, ORDER BY, LIMIT',
          'FROM, SELECT, ORDER BY, WHERE, LIMIT',
          'WHERE, SELECT, FROM, LIMIT, ORDER BY',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Se escribe SELECT → FROM → WHERE → ORDER BY → LIMIT.',
      },
      {
        id: 'm19-l1-q2',
        pregunta: '¿Cómo se escribe correctamente un valor de texto en una condición WHERE?',
        opciones: ["ciudad = 'Bogota'", 'ciudad = Bogota', 'ciudad == "Bogota"', "ciudad := 'Bogota'"],
        respuestaCorrecta: 0,
        explicacion: 'Los textos van entre comillas simples y la comparación usa un solo `=`.',
      },
    ],
    resumen: [
      'SQL consulta tablas: SELECT (columnas) → FROM (tabla) → WHERE (filtro) → ORDER BY (orden) → LIMIT (cantidad).',
      '`conn.execute(sql).fetchall()` devuelve una lista de tuplas.',
      'Los textos van entre comillas simples.',
      'SQLite viene incluido en Python y funciona dentro del navegador.',
    ],
    proximoPaso: 'Ahora resumiremos miles de filas en pocos números con funciones de agregación y GROUP BY.',
    conceptos: ['sql-select', 'sql-where', 'sql-order-limit'],
  },
  {
    id: 'm19-l2',
    moduloId: 'modulo-19',
    titulo: 'Agregaciones: COUNT, SUM, AVG, GROUP BY y HAVING',
    objetivo: 'Resumir datos con funciones de agregación, agruparlos con GROUP BY y filtrar grupos con HAVING.',
    porQueImporta:
      '"¿Cuántos clientes hay por ciudad?", "¿cuál es el ticket promedio por categoría?": casi todas las preguntas de negocio son agregaciones. Es el equivalente SQL de `groupby` en pandas.',
    concepto: `Las **funciones de agregación** convierten muchas filas en un solo valor:

| Función | Qué calcula |
|---|---|
| \`COUNT(*)\` | cuántas filas |
| \`SUM(col)\` | suma |
| \`AVG(col)\` | promedio |
| \`MIN(col)\` / \`MAX(col)\` | mínimo / máximo |

\`\`\`sql
SELECT COUNT(*) FROM pedidos;
SELECT categoria, AVG(precio) FROM productos GROUP BY categoria;
\`\`\`

**GROUP BY** divide las filas en grupos (uno por cada valor distinto de la columna) y aplica la agregación a cada grupo. Regla: toda columna del \`SELECT\` que no sea una agregación debe aparecer en el \`GROUP BY\`.

**WHERE vs HAVING**:
- \`WHERE\` filtra **filas antes** de agrupar.
- \`HAVING\` filtra **grupos después** de agrupar (puede usar agregaciones).

\`\`\`sql
SELECT ciudad, COUNT(*)
FROM clientes
WHERE plan <> 'Basico'          -- filtra filas
GROUP BY ciudad
HAVING COUNT(*) >= 2            -- filtra grupos
ORDER BY ciudad;
\`\`\`

El orden completo ahora es: \`SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT\`. Puedes poner un alias con \`AS\` (\`COUNT(*) AS total\`) para nombrar el resultado, y \`ROUND(valor, 2)\` para redondear.`,
    ejemploMinimo: `${SETUP}

print(conn.execute("SELECT SUM(cantidad) FROM pedidos").fetchall())`,
    ejemploAplicado: `${SETUP}

sql = """
SELECT categoria, COUNT(*) AS productos, ROUND(AVG(precio), 2) AS precio_medio
FROM productos
GROUP BY categoria
ORDER BY categoria
"""
for fila in conn.execute(sql).fetchall():
    print(fila)`,
    errorFrecuente: {
      codigo: `SELECT ciudad, COUNT(*)
FROM clientes
WHERE COUNT(*) >= 2
GROUP BY ciudad`,
      explicacion:
        'Error: "misuse of aggregate". `WHERE` se evalúa **antes** de agrupar, así que todavía no existe `COUNT(*)` por grupo. Para filtrar por el resultado de una agregación usa `HAVING COUNT(*) >= 2` después del `GROUP BY`.',
    },
    practicaGuiada: {
      id: 'm19-l2-practica',
      enunciado:
        'Cuenta cuántos pedidos hay en total con `SELECT COUNT(*) FROM pedidos`. Imprime el número (primer valor de la primera fila).',
      codigoInicial: `${SETUP}\n\nsql = ""   # escribe aquí tu consulta\nfilas = conn.execute(sql).fetchall() if sql else [(0,)]\nprint(filas[0][0])`,
      solucion: `${SETUP}\n\nsql = "SELECT COUNT(*) FROM pedidos"\nfilas = conn.execute(sql).fetchall()\nprint(filas[0][0])`,
      pistas: ['`COUNT(*)` cuenta todas las filas de la tabla.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '10'
        return { ok, mensaje: ok ? 'Correcto: hay 10 pedidos.' : 'El resultado esperado es 10.' }
      },
    },
    reto: {
      id: 'm19-l2-reto',
      enunciado:
        'Obtén las ciudades que tienen **al menos 2 clientes**, con el número de clientes de cada una, ordenadas por ciudad. Usa `GROUP BY` y `HAVING COUNT(*) >= 2`. Imprime la lista de filas completa.',
      codigoInicial: `${SETUP}\n\nsql = ""   # escribe aquí tu consulta\nfilas = conn.execute(sql).fetchall() if sql else []\nprint(filas)`,
      solucion: `${SETUP}\n\nsql = "SELECT ciudad, COUNT(*) FROM clientes GROUP BY ciudad HAVING COUNT(*) >= 2 ORDER BY ciudad"\nfilas = conn.execute(sql).fetchall()\nprint(filas)`,
      pistas: ['`SELECT ciudad, COUNT(*) FROM clientes GROUP BY ciudad`', 'Añade `HAVING COUNT(*) >= 2` y luego `ORDER BY ciudad`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "[('Bogota', 3), ('Medellin', 2)]"
        return { ok, mensaje: ok ? 'Correcto: Cali solo tiene 1 cliente y queda fuera.' : "El resultado esperado es [('Bogota', 3), ('Medellin', 2)]." }
      },
    },
    verificacion: [
      {
        id: 'm19-l2-q1',
        pregunta: '¿Cuál es la diferencia entre WHERE y HAVING?',
        opciones: [
          'No hay diferencia',
          'WHERE filtra filas antes de agrupar; HAVING filtra grupos después de agrupar',
          'HAVING filtra filas antes de agrupar; WHERE filtra grupos',
          'WHERE solo sirve con números',
        ],
        respuestaCorrecta: 1,
        explicacion: 'WHERE actúa sobre filas individuales; HAVING sobre los resultados agregados de cada grupo.',
      },
      {
        id: 'm19-l2-q2',
        pregunta: 'En `SELECT ciudad, plan, COUNT(*) FROM clientes GROUP BY ciudad`, ¿cuál es el problema conceptual?',
        opciones: [
          'COUNT(*) no se puede usar con GROUP BY',
          '`plan` no está agrupado ni agregado: no está claro qué valor mostrar por cada ciudad',
          'Falta un ORDER BY',
          'Falta un LIMIT',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Toda columna del SELECT debe estar en el GROUP BY o dentro de una función de agregación.',
      },
    ],
    resumen: [
      'COUNT, SUM, AVG, MIN y MAX resumen muchas filas en un valor.',
      'GROUP BY calcula la agregación por cada grupo.',
      'WHERE filtra filas antes de agrupar; HAVING filtra grupos después.',
      'Usa alias (`AS`) y `ROUND` para resultados legibles.',
    ],
    proximoPaso: 'Los datos reales están repartidos en varias tablas. Aprenderemos a combinarlas con JOIN.',
    conceptos: ['sql-agregaciones', 'sql-group-by', 'sql-having'],
  },
  {
    id: 'm19-l3',
    moduloId: 'modulo-19',
    titulo: 'JOIN: combinar tablas',
    objetivo: 'Combinar tablas relacionadas con INNER JOIN y LEFT JOIN, y encontrar registros sin coincidencia.',
    porQueImporta:
      'Una base de datos bien diseñada reparte la información en varias tablas (clientes, productos, pedidos) enlazadas por identificadores. Responder preguntas reales casi siempre exige unirlas.',
    concepto: `Las tablas se relacionan mediante **claves**: \`pedidos.cliente_id\` apunta a \`clientes.id\` y \`pedidos.producto_id\` a \`productos.id\`. Un **JOIN** une filas de dos tablas cuando se cumple una condición (\`ON\`).

\`\`\`sql
SELECT c.nombre, p.nombre, pe.cantidad
FROM pedidos pe
JOIN clientes c  ON c.id = pe.cliente_id
JOIN productos p ON p.id = pe.producto_id;
\`\`\`

Los **alias** de tabla (\`pe\`, \`c\`, \`p\`) acortan el código y evitan ambigüedades cuando dos tablas tienen columnas con el mismo nombre (\`nombre\`).

Los tipos de JOIN más usados:

- **\`JOIN\` / \`INNER JOIN\`**: solo las filas con coincidencia en **ambas** tablas. Un cliente sin pedidos no aparece.
- **\`LEFT JOIN\`**: todas las filas de la tabla izquierda, y los datos de la derecha cuando existen (si no, \`NULL\`).

Patrón muy útil: **encontrar registros sin coincidencia** con \`LEFT JOIN ... WHERE derecha.id IS NULL\`. Por ejemplo, clientes que nunca han comprado:

\`\`\`sql
SELECT c.nombre
FROM clientes c
LEFT JOIN pedidos pe ON pe.cliente_id = c.id
WHERE pe.id IS NULL;
\`\`\`

Puedes combinar JOIN con agregaciones: por ejemplo, ventas por categoría = \`SUM(pe.cantidad * p.precio)\` agrupando por \`p.categoria\`. Para comparar con NULL se usa \`IS NULL\` / \`IS NOT NULL\`, nunca \`= NULL\`.`,
    ejemploMinimo: `${SETUP}

sql = "SELECT c.nombre, pe.cantidad FROM pedidos pe JOIN clientes c ON c.id = pe.cliente_id WHERE pe.id = 1"
print(conn.execute(sql).fetchall())`,
    ejemploAplicado: `${SETUP}

sql = """
SELECT c.ciudad, SUM(pe.cantidad) AS unidades
FROM pedidos pe
JOIN clientes c ON c.id = pe.cliente_id
GROUP BY c.ciudad
ORDER BY c.ciudad
"""
for fila in conn.execute(sql).fetchall():
    print(fila)`,
    errorFrecuente: {
      codigo: `SELECT c.nombre
FROM clientes c
JOIN pedidos pe ON pe.cliente_id = c.id
WHERE pe.id IS NULL      -- "clientes sin pedidos"... devuelve vacío`,
      explicacion:
        'Con `JOIN` (inner) solo quedan clientes que **sí** tienen pedido, así que nunca habrá `pe.id IS NULL`. Para encontrar clientes sin pedidos necesitas `LEFT JOIN`, que conserva a todos los clientes y deja `NULL` donde no hay coincidencia.',
    },
    practicaGuiada: {
      id: 'm19-l3-practica',
      enunciado:
        'Calcula las **ventas totales por categoría** (`SUM(pe.cantidad * p.precio)`) uniendo `pedidos` (alias `pe`) con `productos` (alias `p`), agrupando por `p.categoria` y ordenando por categoría. Imprime la lista de filas.',
      codigoInicial: `${SETUP}\n\nsql = ""   # escribe aquí tu consulta\nfilas = conn.execute(sql).fetchall() if sql else []\nprint(filas)`,
      solucion: `${SETUP}\n\nsql = """\nSELECT p.categoria, SUM(pe.cantidad * p.precio)\nFROM pedidos pe\nJOIN productos p ON p.id = pe.producto_id\nGROUP BY p.categoria\nORDER BY p.categoria\n"""\nfilas = conn.execute(sql).fetchall()\nprint(filas)`,
      pistas: ['`FROM pedidos pe JOIN productos p ON p.id = pe.producto_id`', 'La venta de cada fila es `pe.cantidad * p.precio`; súmala por `p.categoria`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "[('Accesorios', 1270.0), ('Electronica', 7400.0)]"
        return { ok, mensaje: ok ? 'Correcto: Electrónica factura mucho más que Accesorios.' : "El resultado esperado es [('Accesorios', 1270.0), ('Electronica', 7400.0)]." }
      },
    },
    reto: {
      id: 'm19-l3-reto',
      enunciado:
        'Encuentra los **clientes que nunca han hecho un pedido** con un `LEFT JOIN` entre `clientes` (alias `c`) y `pedidos` (alias `pe`) y la condición `pe.id IS NULL`. Imprime la lista de nombres.',
      codigoInicial: `${SETUP}\n\nsql = ""   # escribe aquí tu consulta\nfilas = conn.execute(sql).fetchall() if sql else []\nprint([fila[0] for fila in filas])`,
      solucion: `${SETUP}\n\nsql = """\nSELECT c.nombre\nFROM clientes c\nLEFT JOIN pedidos pe ON pe.cliente_id = c.id\nWHERE pe.id IS NULL\n"""\nfilas = conn.execute(sql).fetchall()\nprint([fila[0] for fila in filas])`,
      pistas: ['`FROM clientes c LEFT JOIN pedidos pe ON pe.cliente_id = c.id`', '`WHERE pe.id IS NULL` deja solo los clientes sin coincidencia.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "['Diego']"
        return { ok, mensaje: ok ? 'Correcto: Diego es el único cliente sin pedidos.' : "El resultado esperado es ['Diego']." }
      },
    },
    verificacion: [
      {
        id: 'm19-l3-q1',
        pregunta: '¿Qué devuelve un LEFT JOIN de clientes con pedidos?',
        opciones: [
          'Solo los clientes que tienen pedidos',
          'Todos los clientes, con los datos del pedido cuando existen y NULL cuando no',
          'Solo los pedidos sin cliente',
          'Un producto cartesiano de ambas tablas',
        ],
        respuestaCorrecta: 1,
        explicacion: 'LEFT JOIN conserva todas las filas de la tabla izquierda aunque no tengan coincidencia.',
      },
      {
        id: 'm19-l3-q2',
        pregunta: '¿Cómo se comprueba correctamente si un valor es nulo en SQL?',
        opciones: ['col = NULL', 'col == NULL', 'col IS NULL', 'col = "NULL"'],
        respuestaCorrecta: 2,
        explicacion: 'NULL representa "desconocido", y no es igual a nada (ni a sí mismo); se usa `IS NULL` o `IS NOT NULL`.',
      },
    ],
    resumen: [
      'Las tablas se enlazan por claves; JOIN las combina con una condición ON.',
      'INNER JOIN deja solo coincidencias; LEFT JOIN conserva todas las filas de la izquierda.',
      '`LEFT JOIN ... WHERE derecha.id IS NULL` encuentra registros sin coincidencia.',
      'Los alias de tabla acortan el código y evitan ambigüedades.',
    ],
    proximoPaso: 'Para consultas más expresivas veremos CASE, subconsultas y CTE (WITH).',
    conceptos: ['sql-join', 'sql-left-join', 'sql-claves'],
  },
  {
    id: 'm19-l4',
    moduloId: 'modulo-19',
    titulo: 'CASE, subconsultas y CTE (WITH)',
    objetivo: 'Crear categorías con CASE, usar subconsultas y organizar consultas complejas con CTE.',
    porQueImporta:
      'Cuando una pregunta de negocio necesita varios pasos ("clientes cuyo gasto supera cierto monto"), escribir todo en una sola consulta ilegible no escala. CASE, subconsultas y CTE permiten construir resultados paso a paso y mantenerlos legibles.',
    concepto: `**CASE**: el "if / elif / else" de SQL. Crea columnas derivadas, como segmentos:

\`\`\`sql
SELECT nombre,
       CASE WHEN precio >= 800 THEN 'Alto'
            WHEN precio >= 100 THEN 'Medio'
            ELSE 'Bajo' END AS nivel
FROM productos;
\`\`\`

**Subconsulta**: una consulta dentro de otra, entre paréntesis. Útil para comparar con un valor calculado:

\`\`\`sql
SELECT nombre FROM productos
WHERE precio > (SELECT AVG(precio) FROM productos);
\`\`\`

**CTE** (*Common Table Expression*, con \`WITH\`): le das un **nombre** a una consulta intermedia y luego la usas como si fuera una tabla. Es mucho más legible que subconsultas anidadas:

\`\`\`sql
WITH gasto AS (
    SELECT c.nombre AS nombre, SUM(pe.cantidad * p.precio) AS total
    FROM clientes c
    JOIN pedidos pe  ON pe.cliente_id = c.id
    JOIN productos p ON p.id = pe.producto_id
    GROUP BY c.id
)
SELECT nombre, total
FROM gasto
WHERE total > 2000
ORDER BY total DESC;
\`\`\`

Piensa en un CTE como "primero calculo esto, y luego trabajo sobre ese resultado". Puedes encadenar varios CTE separados por comas. Es la forma recomendada de escribir análisis largos: cada paso tiene nombre y se puede revisar por separado.`,
    ejemploMinimo: `${SETUP}

sql = "SELECT nombre FROM productos WHERE precio > (SELECT AVG(precio) FROM productos) ORDER BY nombre"
print(conn.execute(sql).fetchall())`,
    ejemploAplicado: `${SETUP}

sql = """
WITH gasto AS (
    SELECT c.nombre AS nombre, SUM(pe.cantidad * p.precio) AS total
    FROM clientes c
    JOIN pedidos pe  ON pe.cliente_id = c.id
    JOIN productos p ON p.id = pe.producto_id
    GROUP BY c.id
)
SELECT nombre, total FROM gasto ORDER BY total DESC LIMIT 3
"""
for fila in conn.execute(sql).fetchall():
    print(fila)`,
    errorFrecuente: {
      codigo: `SELECT nombre,
       CASE WHEN precio >= 800 THEN 'Alto'
            WHEN precio >= 100 THEN 'Medio'
            ELSE 'Bajo'
FROM productos;      -- syntax error`,
      explicacion:
        'Falta cerrar el `CASE` con `END`. Siempre termina con `END` (y, de preferencia, dale un nombre a la columna con `AS nivel`). Además, `CASE` evalúa las condiciones **en orden** y se queda con la primera verdadera: coloca primero la más restrictiva.',
    },
    practicaGuiada: {
      id: 'm19-l4-practica',
      enunciado:
        'Clasifica cada producto por nivel de precio con `CASE`: `Alto` si `precio >= 800`, `Medio` si `precio >= 100`, y `Bajo` en otro caso. Devuelve `nombre` y el nivel, ordenado por `id`, e imprime la lista de filas.',
      codigoInicial: `${SETUP}\n\nsql = ""   # escribe aquí tu consulta\nfilas = conn.execute(sql).fetchall() if sql else []\nprint(filas)`,
      solucion: `${SETUP}\n\nsql = """\nSELECT nombre,\n       CASE WHEN precio >= 800 THEN 'Alto'\n            WHEN precio >= 100 THEN 'Medio'\n            ELSE 'Bajo' END AS nivel\nFROM productos\nORDER BY id\n"""\nfilas = conn.execute(sql).fetchall()\nprint(filas)`,
      pistas: ['`CASE WHEN ... THEN ... WHEN ... THEN ... ELSE ... END`', 'Termina con `ORDER BY id`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "[('Laptop', 'Alto'), ('Mouse', 'Bajo'), ('Teclado', 'Medio'), ('Monitor', 'Alto'), ('Audifonos', 'Medio')]"
        return { ok, mensaje: ok ? 'Correcto: cada producto quedó en su nivel.' : 'Revisa el orden de las condiciones del CASE y que ordenes por id.' }
      },
    },
    reto: {
      id: 'm19-l4-reto',
      enunciado:
        'Usa un CTE llamado `gasto` (nombre del cliente y total gastado, como en el ejemplo) y devuelve los clientes cuyo `total` supera **2000**, de mayor a menor gasto. Imprime la lista de filas.',
      codigoInicial: `${SETUP}\n\nsql = ""   # escribe aquí tu consulta con WITH\nfilas = conn.execute(sql).fetchall() if sql else []\nprint(filas)`,
      solucion: `${SETUP}\n\nsql = """\nWITH gasto AS (\n    SELECT c.nombre AS nombre, SUM(pe.cantidad * p.precio) AS total\n    FROM clientes c\n    JOIN pedidos pe  ON pe.cliente_id = c.id\n    JOIN productos p ON p.id = pe.producto_id\n    GROUP BY c.id\n)\nSELECT nombre, total FROM gasto WHERE total > 2000 ORDER BY total DESC\n"""\nfilas = conn.execute(sql).fetchall()\nprint(filas)`,
      pistas: ['Copia la estructura del CTE del ejemplo.', 'La consulta final: `SELECT nombre, total FROM gasto WHERE total > 2000 ORDER BY total DESC`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "[('Ana', 2750.0), ('Pedro', 2500.0)]"
        return { ok, mensaje: ok ? 'Correcto: Ana y Pedro son los clientes de mayor valor.' : "El resultado esperado es [('Ana', 2750.0), ('Pedro', 2500.0)]." }
      },
    },
    verificacion: [
      {
        id: 'm19-l4-q1',
        pregunta: '¿Qué ventaja principal tiene un CTE (WITH) frente a subconsultas anidadas?',
        opciones: [
          'Es siempre más rápido',
          'Da nombre a los pasos intermedios, haciendo la consulta más legible y fácil de revisar',
          'Permite modificar datos',
          'Evita usar JOIN',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Un CTE nombra un resultado intermedio y lo reutiliza como si fuera una tabla, lo que facilita leer y depurar.',
      },
      {
        id: 'm19-l4-q2',
        pregunta: 'En un CASE con varias condiciones WHEN, ¿cómo se evalúan?',
        opciones: [
          'Todas a la vez y se suman',
          'En orden, y se usa la primera que sea verdadera',
          'De la última a la primera',
          'Al azar',
        ],
        respuestaCorrecta: 1,
        explicacion: 'CASE recorre las condiciones de arriba abajo y devuelve el resultado de la primera que se cumple.',
      },
    ],
    resumen: [
      'CASE ... END crea columnas derivadas con lógica condicional.',
      'Una subconsulta entre paréntesis permite comparar con un valor calculado.',
      'WITH nombra consultas intermedias (CTE) para análisis legibles paso a paso.',
      'Cierra siempre el CASE con END.',
    ],
    proximoPaso: 'Para cerrar, conectaremos SQL con pandas y veremos cómo usar parámetros de forma segura.',
    conceptos: ['sql-case', 'sql-subconsultas', 'sql-cte'],
  },
  {
    id: 'm19-l5',
    moduloId: 'modulo-19',
    titulo: 'SQL desde Python: pandas y consultas parametrizadas',
    objetivo: 'Cargar resultados SQL en un DataFrame con pandas y pasar valores a las consultas de forma segura con parámetros.',
    porQueImporta:
      'En el trabajo real, SQL extrae los datos y Python/pandas los analiza. Además, construir consultas pegando texto es la causa de la inyección SQL, una de las vulnerabilidades más graves y comunes. Hacerlo bien desde el principio es parte del oficio.',
    concepto: `**De SQL a pandas** con \`pd.read_sql_query\`: ejecuta la consulta y devuelve un DataFrame, listo para analizar o graficar.

\`\`\`python
import pandas as pd

df = pd.read_sql_query("SELECT nombre, plan FROM clientes WHERE ciudad = ?", conn, params=("Bogota",))
\`\`\`

El flujo típico: **SQL hace el trabajo pesado** (filtrar, unir y agregar cerca de los datos) y **pandas hace el análisis fino** (estadística, gráficos, modelos). No traigas millones de filas para filtrarlas en pandas si un \`WHERE\` lo resuelve antes.

**Consultas parametrizadas.** Nunca construyas SQL pegando valores de usuarios en el texto (f-strings, \`+\`, \`%\`). Usa marcadores \`?\` y pasa los valores aparte con \`params\`:

\`\`\`python
# ✅ Seguro: el valor viaja separado y se trata siempre como dato
conn.execute("SELECT COUNT(*) FROM clientes WHERE ciudad = ?", (ciudad,))

# ❌ Peligroso: el valor se mezcla con el código SQL
conn.execute(f"SELECT COUNT(*) FROM clientes WHERE ciudad = '{ciudad}'")
\`\`\`

Si alguien escribe como ciudad \`Bogota' OR '1'='1\`, la versión peligrosa se convierte en una condición que siempre es verdadera y devuelve **todas** las filas (en otros casos, podría borrar tablas). Con parámetros, ese texto se busca literalmente como una ciudad y no devuelve nada. Eso es **inyección SQL**, y los parámetros son su defensa.

Los marcadores solo sustituyen **valores**, no nombres de tablas o columnas.

También puedes volcar un DataFrame a la base con \`df.to_sql("tabla", conn, index=False)\`, útil para practicar con tus propios datos.`,
    ejemploMinimo: `import pandas as pd
${SETUP}

df = pd.read_sql_query("SELECT * FROM productos", conn)
print(df.shape)`,
    ejemploAplicado: `import pandas as pd
${SETUP}

ciudad = "Bogota' OR '1'='1"     # intento de inyección

inseguro = conn.execute(f"SELECT COUNT(*) FROM clientes WHERE ciudad = '{ciudad}'").fetchall()
seguro = conn.execute("SELECT COUNT(*) FROM clientes WHERE ciudad = ?", (ciudad,)).fetchall()

print("Sin parámetros:", inseguro[0][0], "clientes (¡devolvió todos!)")
print("Con parámetros:", seguro[0][0], "clientes")`,
    errorFrecuente: {
      codigo: `ciudad = input("Ciudad: ")
df = pd.read_sql_query(f"SELECT * FROM clientes WHERE ciudad = '{ciudad}'", conn)`,
      explicacion:
        'Interpolar el valor en el texto SQL abre la puerta a la inyección SQL. Usa siempre parámetros: `pd.read_sql_query("SELECT * FROM clientes WHERE ciudad = ?", conn, params=(ciudad,))`. Nota que `params` recibe una **tupla** (de ahí la coma en `(ciudad,)`).',
    },
    practicaGuiada: {
      id: 'm19-l5-practica',
      enunciado:
        'Usa `pd.read_sql_query` con un parámetro `?` para traer `nombre` y `plan` de los clientes de la ciudad `"Bogota"` (pásala con `params=("Bogota",)`). Imprime la forma del DataFrame con `df.shape`.',
      codigoInicial: `import pandas as pd\n${SETUP}\n\n# trae nombre y plan de los clientes de Bogota con una consulta parametrizada\nprint((0, 0))`,
      solucion: `import pandas as pd\n${SETUP}\n\ndf = pd.read_sql_query("SELECT nombre, plan FROM clientes WHERE ciudad = ?", conn, params=("Bogota",))\nprint(df.shape)`,
      pistas: ['`pd.read_sql_query(sql, conn, params=("Bogota",))`', 'Usa `?` en el SQL en lugar de escribir la ciudad.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '(3, 2)'
        return { ok, mensaje: ok ? 'Correcto: 3 clientes y 2 columnas.' : 'El resultado esperado es (3, 2).' }
      },
    },
    reto: {
      id: 'm19-l5-reto',
      enunciado:
        'Calcula las **ventas por mes** con SQL: une `pedidos` y `productos`, agrupa por `strftime(\'%Y-%m\', pe.fecha)` (alias `mes`) y suma `pe.cantidad * p.precio` (alias `ventas`), ordenado por mes. Cárgalo en un DataFrame con `pd.read_sql_query` e imprime `df.set_index("mes")["ventas"].to_dict()`.',
      codigoInicial: `import pandas as pd\n${SETUP}\n\nsql = ""   # escribe aquí tu consulta\ndf = pd.read_sql_query(sql, conn) if sql else pd.DataFrame({"mes": [], "ventas": []})\nprint(df.set_index("mes")["ventas"].to_dict())`,
      solucion: `import pandas as pd\n${SETUP}\n\nsql = """\nSELECT strftime('%Y-%m', pe.fecha) AS mes, SUM(pe.cantidad * p.precio) AS ventas\nFROM pedidos pe\nJOIN productos p ON p.id = pe.producto_id\nGROUP BY mes\nORDER BY mes\n"""\ndf = pd.read_sql_query(sql, conn)\nprint(df.set_index("mes")["ventas"].to_dict())`,
      pistas: ['`strftime(\'%Y-%m\', pe.fecha) AS mes` extrae año y mes de la fecha.', 'Puedes agrupar por el alias: `GROUP BY mes`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "{'2024-01': 2720.0, '2024-02': 4750.0, '2024-03': 1200.0}"
        return { ok, mensaje: ok ? 'Correcto: febrero fue el mejor mes de ventas.' : "El resultado esperado es {'2024-01': 2720.0, '2024-02': 4750.0, '2024-03': 1200.0}." }
      },
    },
    verificacion: [
      {
        id: 'm19-l5-q1',
        pregunta: '¿Por qué es peligroso construir una consulta SQL con f-strings usando texto del usuario?',
        opciones: [
          'Porque es más lento',
          'Porque permite inyección SQL: el usuario puede alterar el significado de la consulta',
          'Porque pandas no lo permite',
          'Porque cambia el orden de las columnas',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Mezclar el valor con el código SQL permite que un texto malicioso cambie la lógica de la consulta o ejecute otras sentencias.',
      },
      {
        id: 'm19-l5-q2',
        pregunta: 'Para filtrar por un valor que viene de una variable, ¿qué es lo correcto?',
        opciones: [
          'Usar un marcador `?` y pasar el valor en `params`',
          'Concatenar el texto con +',
          'Usar una f-string',
          'Hacerlo siempre con SELECT *',
        ],
        respuestaCorrecta: 0,
        explicacion: 'Los parámetros mantienen separados el código SQL y los datos, lo que previene la inyección.',
      },
    ],
    resumen: [
      '`pd.read_sql_query(sql, conn)` lleva el resultado de una consulta a un DataFrame.',
      'Filtra y agrega en SQL; analiza y modela en pandas.',
      'Usa siempre consultas parametrizadas (`?` + `params`), nunca f-strings con datos externos.',
      'Los parámetros sirven para valores, no para nombres de tablas o columnas.',
    ],
    proximoPaso:
      'Con SQL listo, el Módulo 20 te enseña la línea de comandos y Git: las herramientas para moverte en un proyecto y versionar tu trabajo.',
    conceptos: ['sql-pandas', 'consultas-parametrizadas', 'inyeccion-sql'],
  },
]
