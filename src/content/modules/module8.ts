import type { Lesson } from '../../types'

export const module8Lessons: Lesson[] = [
  {
    id: 'm8-l1',
    moduloId: 'modulo-8',
    titulo: 'groupby: agrupar y agregar',
    objetivo: 'Agrupar un DataFrame por una columna categórica y calcular agregaciones (suma, promedio, conteo) por grupo.',
    porQueImporta:
      'Preguntas como "¿cuánto vendió cada región?" o "¿cuál es el ticket promedio por categoría?" son, en esencia, un `groupby`. Es probablemente la operación más usada por un analista de datos en pandas.',
    concepto: `\`\`\`python
df.groupby("categoria")["ventas"].sum()
\`\`\`

Esto se lee como: "agrupa las filas por valores únicos de 'categoria', y dentro de cada grupo, suma la columna 'ventas'". El resultado es una Series indexada por categoría.

Otras agregaciones comunes: \`.mean()\`, \`.count()\`, \`.max()\`, \`.min()\`.`,
    ejemploMinimo: `import pandas as pd

df = pd.DataFrame({"categoria": ["A", "B", "A", "B"], "ventas": [100, 200, 150, 50]})
print(df.groupby("categoria")["ventas"].sum())`,
    ejemploAplicado: `import pandas as pd

ventas = pd.DataFrame({
    "region": ["Norte", "Sur", "Norte", "Sur", "Norte"],
    "monto": [1000, 1500, 800, 1200, 900],
})

total_por_region = ventas.groupby("region")["monto"].sum()
print(total_por_region)
print("Región con más ventas:", total_por_region.idxmax())`,
    errorFrecuente: {
      codigo: `import pandas as pd

df = pd.DataFrame({"categoria": ["A", "B"], "ventas": [100, 200]})
resultado = df.groupby("categoria").sum("ventas")`,
      explicacion:
        'La sintaxis correcta selecciona primero la columna con corchetes y luego agrega: `df.groupby("categoria")["ventas"].sum()`. Pasar el nombre de columna como argumento de `.sum()` no funciona como cabría esperar y puede incluir columnas no deseadas en el resultado.',
    },
    practicaGuiada: {
      id: 'm8-l1-practica',
      enunciado:
        'Agrupa `df` por "producto" y suma la columna "cantidad". Imprime el resultado con `print()`.',
      codigoInicial: `import pandas as pd\n\ndf = pd.DataFrame({"producto": ["A", "B", "A"], "cantidad": [5, 3, 7]})\nprint(df["cantidad"].sum())`,
      solucion: `import pandas as pd\n\ndf = pd.DataFrame({"producto": ["A", "B", "A"], "cantidad": [5, 3, 7]})\nprint(df.groupby("producto")["cantidad"].sum())`,
      pistas: ['Usa `df.groupby("producto")["cantidad"].sum()`.'],
      validar: (stdout) => {
        const ok = stdout.includes('A') && stdout.includes('12') && stdout.includes('B') && stdout.includes('3')
        return { ok, mensaje: ok ? 'Correcto: A suma 12 (5+7), B suma 3.' : 'Debe mostrar A con 12 y B con 3.' }
      },
    },
    reto: {
      id: 'm8-l1-reto',
      enunciado:
        'Dado `ventas` con columnas "vendedor" y "monto", calcula el promedio de "monto" por "vendedor" y usa `.idxmax()` para imprimir el nombre del vendedor con mayor promedio.',
      codigoInicial: `import pandas as pd\n\nventas = pd.DataFrame({\n    "vendedor": ["Ana", "Luis", "Ana", "Luis", "Eva"],\n    "monto": [200, 150, 300, 100, 500],\n})\n# calcula el promedio por vendedor e imprime quién tiene el mayor`,
      solucion: `import pandas as pd\n\nventas = pd.DataFrame({\n    "vendedor": ["Ana", "Luis", "Ana", "Luis", "Eva"],\n    "monto": [200, 150, 300, 100, 500],\n})\npromedio_por_vendedor = ventas.groupby("vendedor")["monto"].mean()\nprint(promedio_por_vendedor.idxmax())`,
      pistas: ['`.mean()` calcula el promedio por grupo.', '`.idxmax()` devuelve la etiqueta (índice) del valor máximo, no el valor en sí.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Eva'
        return { ok, mensaje: ok ? 'Correcto: Eva tiene el único valor (500), el mayor promedio.' : 'El resultado esperado es Eva.' }
      },
    },
    verificacion: [
      {
        id: 'm8-l1-q1',
        pregunta: '¿Qué hace `df.groupby("region")["monto"].sum()`?',
        opciones: [
          'Suma toda la columna "monto" sin importar la región',
          'Agrupa las filas por región y suma "monto" dentro de cada grupo',
          'Elimina la columna región',
          'Ordena el DataFrame por región',
        ],
        respuestaCorrecta: 1,
        explicacion: '`groupby` agrupa filas con el mismo valor en "region", y la agregación se calcula dentro de cada grupo por separado.',
      },
    ],
    resumen: [
      '`df.groupby("columna")["otra_columna"].agregacion()` es el patrón central de agregación en pandas.',
      'Agregaciones comunes: `.sum()`, `.mean()`, `.count()`, `.max()`, `.min()`.',
      '`.idxmax()` / `.idxmin()` devuelven la etiqueta del valor máximo/mínimo, útil tras un groupby.',
    ],
    proximoPaso: 'Veremos cómo calcular varias agregaciones a la vez y renombrar columnas con `.agg()`.',
    conceptos: ['groupby', 'agregaciones'],
  },
  {
    id: 'm8-l2',
    moduloId: 'modulo-8',
    titulo: 'Múltiples agregaciones con .agg()',
    objetivo: 'Calcular varias métricas a la vez por grupo usando .agg(), con nombres de columna claros.',
    porQueImporta:
      'Un reporte de negocio casi nunca necesita una sola métrica: normalmente quieres el total, el promedio y el conteo juntos. `.agg()` te permite construir esa tabla resumen en un solo paso.',
    concepto: `\`\`\`python
df.groupby("region")["monto"].agg(["sum", "mean", "count"])
\`\`\`

Para nombres de columna más claros, usa agregación con nombre (named aggregation):

\`\`\`python
df.groupby("region").agg(
    total=("monto", "sum"),
    promedio=("monto", "mean"),
    pedidos=("monto", "count"),
)
\`\`\``,
    ejemploMinimo: `import pandas as pd

df = pd.DataFrame({"region": ["Norte", "Sur", "Norte"], "monto": [100, 200, 300]})
print(df.groupby("region")["monto"].agg(["sum", "count"]))`,
    ejemploAplicado: `import pandas as pd

ventas = pd.DataFrame({
    "vendedor": ["Ana", "Luis", "Ana", "Luis"],
    "monto": [200, 150, 300, 100],
})

resumen = ventas.groupby("vendedor").agg(
    total_vendido=("monto", "sum"),
    num_ventas=("monto", "count"),
)
print(resumen.loc["Ana", "total_vendido"])`,
    errorFrecuente: {
      codigo: `import pandas as pd

df = pd.DataFrame({"region": ["Norte", "Sur"], "monto": [100, 200]})
resultado = df.groupby("region").agg(total=("monto", sum))
print(resultado)`,
      explicacion:
        'Usar la función built-in `sum` de Python (sin comillas) en vez del string `"sum"` puede funcionar en algunos casos pero no es la forma recomendada: pandas espera el nombre de la función como texto (`"sum"`, `"mean"`, `"count"`) para usar sus versiones optimizadas. Usa siempre comillas: `("monto", "sum")`.',
    },
    practicaGuiada: {
      id: 'm8-l2-practica',
      enunciado:
        'Agrupa `df` por "categoria" con `.agg()` creando una columna "total" (suma de "monto"). Imprime `resumen.loc["A", "total"]`.',
      codigoInicial: `import pandas as pd\n\ndf = pd.DataFrame({"categoria": ["A", "B", "A"], "monto": [10, 20, 30]})\nresumen = df.groupby("categoria").agg(total=("monto", "ESCRIBE_AQUI"))\nprint(resumen.loc["A", "total"])`,
      solucion: `import pandas as pd\n\ndf = pd.DataFrame({"categoria": ["A", "B", "A"], "monto": [10, 20, 30]})\nresumen = df.groupby("categoria").agg(total=("monto", "sum"))\nprint(resumen.loc["A", "total"])`,
      pistas: ['Reemplaza "ESCRIBE_AQUI" por "sum".'],
      validar: (stdout) => {
        const ok = stdout.trim() === '40'
        return { ok, mensaje: ok ? 'Correcto: A suma 10+30=40.' : 'El resultado esperado es 40.' }
      },
    },
    reto: {
      id: 'm8-l2-reto',
      enunciado:
        'Dado `pedidos` con "cliente" y "monto", crea un resumen con `.agg()` que tenga "total" (suma) y "pedidos" (count) por cliente, e imprime cuántos pedidos hizo "Ana" accediendo con `.loc`.',
      codigoInicial: `import pandas as pd\n\npedidos = pd.DataFrame({\n    "cliente": ["Ana", "Luis", "Ana", "Ana"],\n    "monto": [50, 100, 30, 20],\n})\n# crea el resumen con total y pedidos por cliente`,
      solucion: `import pandas as pd\n\npedidos = pd.DataFrame({\n    "cliente": ["Ana", "Luis", "Ana", "Ana"],\n    "monto": [50, 100, 30, 20],\n})\nresumen = pedidos.groupby("cliente").agg(total=("monto", "sum"), pedidos=("monto", "count"))\nprint(resumen.loc["Ana", "pedidos"])`,
      pistas: ['`.agg(total=("monto", "sum"), pedidos=("monto", "count"))`.', 'Accede con `.loc["Ana", "pedidos"]`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '3'
        return { ok, mensaje: ok ? 'Correcto: Ana tiene 3 pedidos.' : 'El resultado esperado es 3.' }
      },
    },
    verificacion: [
      {
        id: 'm8-l2-q1',
        pregunta: '¿Qué ventaja tiene la agregación con nombre (`total=("monto", "sum")`) frente a `.agg(["sum"])`?',
        opciones: [
          'Es más rápida',
          'Produce columnas con nombres claros y elegidos por ti',
          'No hay ninguna diferencia',
          'Solo funciona con una columna',
        ],
        respuestaCorrecta: 1,
        explicacion: 'La agregación con nombre te permite elegir el nombre de cada columna resultante, haciendo el resumen mucho más legible.',
      },
    ],
    resumen: [
      '`.agg(["sum", "mean"])` calcula varias agregaciones sobre una misma columna.',
      'La agregación con nombre (`nombre=("columna", "funcion")`) produce un resumen con columnas claras.',
      '`.loc[etiqueta, columna]` accede a un valor específico del resultado agregado.',
    ],
    proximoPaso: 'Ahora veremos tablas dinámicas (pivot_table), una forma alternativa y muy visual de resumir datos.',
    conceptos: ['agg', 'agregacion-con-nombre'],
  },
  {
    id: 'm8-l3',
    moduloId: 'modulo-8',
    titulo: 'Tablas dinámicas con pivot_table',
    objetivo: 'Construir tablas dinámicas que crucen dos variables categóricas, similar a una tabla dinámica de Excel.',
    porQueImporta:
      '"Ventas por región Y por mes" es un cruce de dos dimensiones. `pivot_table` resume exactamente este tipo de pregunta en una sola tabla fácil de leer.',
    concepto: `\`\`\`python
pd.pivot_table(
    df,
    values="monto",
    index="region",
    columns="mes",
    aggfunc="sum",
    fill_value=0,
)
\`\`\`

- \`index\`: qué va en las filas.
- \`columns\`: qué va en las columnas.
- \`values\`: qué se agrega dentro de cada celda.
- \`aggfunc\`: cómo se agrega (por defecto es la media).
- \`fill_value\`: qué poner donde no haya datos (evita NaN).`,
    ejemploMinimo: `import pandas as pd

df = pd.DataFrame({"region": ["Norte", "Sur", "Norte"], "mes": ["Ene", "Ene", "Feb"], "monto": [100, 200, 150]})
tabla = pd.pivot_table(df, values="monto", index="region", columns="mes", aggfunc="sum", fill_value=0)
print(tabla.loc["Norte", "Ene"])`,
    ejemploAplicado: `import pandas as pd

ventas = pd.DataFrame({
    "region": ["Norte", "Sur", "Norte", "Sur", "Norte"],
    "mes": ["Ene", "Ene", "Feb", "Feb", "Ene"],
    "monto": [100, 200, 150, 250, 50],
})

tabla = pd.pivot_table(ventas, values="monto", index="region", columns="mes", aggfunc="sum", fill_value=0)
print(tabla.loc["Norte", "Ene"])
print(tabla.loc["Sur", "Feb"])`,
    errorFrecuente: {
      codigo: `import pandas as pd

df = pd.DataFrame({"region": ["Norte", "Sur"], "mes": ["Ene", "Feb"], "monto": [100, 200]})
tabla = pd.pivot_table(df, values="monto", index="region", columns="mes")
print(tabla.loc["Norte", "Feb"])`,
      explicacion:
        'Cuando una combinación región/mes no existe en los datos originales (aquí "Norte" nunca tuvo ventas en "Feb"), la celda queda como `NaN`. Si prefieres ver 0 en vez de NaN, agrega `fill_value=0` a `pivot_table`.',
    },
    practicaGuiada: {
      id: 'm8-l3-practica',
      enunciado:
        'Completa el `pivot_table` para que agregue con `aggfunc="sum"` y use `fill_value=0`. Imprime `tabla.loc["Norte", "Ene"]`.',
      codigoInicial: `import pandas as pd\n\ndf = pd.DataFrame({"region": ["Norte", "Sur"], "mes": ["Ene", "Ene"], "monto": [100, 200]})\ntabla = pd.pivot_table(df, values="monto", index="region", columns="mes")\nprint(tabla.loc["Norte", "Ene"])`,
      solucion: `import pandas as pd\n\ndf = pd.DataFrame({"region": ["Norte", "Sur"], "mes": ["Ene", "Ene"], "monto": [100, 200]})\ntabla = pd.pivot_table(df, values="monto", index="region", columns="mes", aggfunc="sum", fill_value=0)\nprint(tabla.loc["Norte", "Ene"])`,
      pistas: ['Agrega `aggfunc="sum", fill_value=0` a los argumentos de `pivot_table`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '100'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 100.' }
      },
    },
    reto: {
      id: 'm8-l3-reto',
      enunciado:
        'Dado `datos` con "canal", "trimestre" y "ingresos", construye una tabla dinámica con `index="canal"`, `columns="trimestre"`, `aggfunc="sum"`, `fill_value=0`, e imprime el valor de "Online" en "Q2".',
      codigoInicial: `import pandas as pd\n\ndatos = pd.DataFrame({\n    "canal": ["Online", "Tienda", "Online", "Tienda"],\n    "trimestre": ["Q1", "Q1", "Q2", "Q2"],\n    "ingresos": [500, 300, 700, 400],\n})\n# construye la tabla dinámica e imprime el valor de Online en Q2`,
      solucion: `import pandas as pd\n\ndatos = pd.DataFrame({\n    "canal": ["Online", "Tienda", "Online", "Tienda"],\n    "trimestre": ["Q1", "Q1", "Q2", "Q2"],\n    "ingresos": [500, 300, 700, 400],\n})\ntabla = pd.pivot_table(datos, values="ingresos", index="canal", columns="trimestre", aggfunc="sum", fill_value=0)\nprint(tabla.loc["Online", "Q2"])`,
      pistas: ['`pd.pivot_table(datos, values="ingresos", index="canal", columns="trimestre", aggfunc="sum", fill_value=0)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '700'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 700.' }
      },
    },
    verificacion: [
      {
        id: 'm8-l3-q1',
        pregunta: '¿Para qué sirve el parámetro `fill_value=0` en pivot_table?',
        opciones: [
          'Para ordenar la tabla',
          'Para reemplazar con 0 las combinaciones que no tienen datos (en vez de NaN)',
          'Para eliminar filas vacías',
          'No tiene ningún efecto',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Sin `fill_value`, las combinaciones sin datos aparecen como NaN; con `fill_value=0` se muestran como 0.',
      },
    ],
    resumen: [
      '`pivot_table` cruza dos variables categóricas (`index` y `columns`) y agrega una tercera (`values`).',
      '`aggfunc` controla cómo se agregan los valores (por defecto es el promedio).',
      '`fill_value=0` evita NaN en combinaciones sin datos.',
    ],
    proximoPaso: 'Cerramos el módulo calculando métricas de negocio reales: ingresos, costos, margen y variación porcentual.',
    conceptos: ['pivot-table'],
  },
  {
    id: 'm8-l4',
    moduloId: 'modulo-8',
    titulo: 'Métricas de negocio: ingresos, margen y crecimiento',
    objetivo: 'Calcular métricas de negocio estándar a partir de datos agregados: margen, costos y variación porcentual entre periodos.',
    porQueImporta:
      'Un analista no solo agrega datos: traduce esas agregaciones en métricas que el negocio entiende y usa para decidir (margen, crecimiento, ROI).',
    concepto: `Fórmulas de negocio comunes:

- **Margen** = (ingresos − costos) / ingresos
- **Crecimiento %** entre dos periodos = (actual − anterior) / anterior

En pandas, el método \`.pct_change()\` calcula automáticamente la variación porcentual entre filas consecutivas de una Series, muy útil para series temporales ya ordenadas.

\`\`\`python
ventas_mensuales.pct_change()
\`\`\``,
    ejemploMinimo: `ingresos = 1000
costos = 600
margen = (ingresos - costos) / ingresos
print(round(margen, 2))`,
    ejemploAplicado: `import pandas as pd

ventas = pd.Series([1000, 1200, 900, 1500], index=["Ene", "Feb", "Mar", "Abr"])
crecimiento = ventas.pct_change()
print(round(crecimiento["Feb"], 2))`,
    errorFrecuente: {
      codigo: `ingresos = 0
costos = 50
margen = (ingresos - costos) / ingresos
print(margen)`,
      explicacion:
        'Si "ingresos" es 0, la división lanza `ZeroDivisionError`. En datos reales, siempre valida que el denominador no sea cero antes de calcular una razón o margen (por ejemplo, con un `if ingresos > 0:`).',
    },
    practicaGuiada: {
      id: 'm8-l4-practica',
      enunciado: 'Calcula el margen con `ingresos = 2000` y `costos = 1200`, redondeado a 2 decimales con `round(margen, 2)`.',
      codigoInicial: `ingresos = 2000\ncostos = 1200\nmargen = 0\nprint(margen)`,
      solucion: `ingresos = 2000\ncostos = 1200\nmargen = (ingresos - costos) / ingresos\nprint(round(margen, 2))`,
      pistas: ['Fórmula: `(ingresos - costos) / ingresos`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.4'
        return { ok, mensaje: ok ? 'Correcto: margen del 40%.' : 'El resultado esperado es 0.4.' }
      },
    },
    reto: {
      id: 'm8-l4-reto',
      enunciado:
        'Dada la Series `ventas` con ingresos mensuales, usa `.pct_change()` e imprime, redondeado a 2 decimales, el crecimiento del mes "Mar" respecto a "Feb".',
      codigoInicial: `import pandas as pd\n\nventas = pd.Series([500, 600, 450], index=["Ene", "Feb", "Mar"])\n# calcula pct_change e imprime el de Mar redondeado a 2 decimales`,
      solucion: `import pandas as pd\n\nventas = pd.Series([500, 600, 450], index=["Ene", "Feb", "Mar"])\ncrecimiento = ventas.pct_change()\nprint(round(crecimiento["Mar"], 2))`,
      pistas: ['`.pct_change()` calcula la variación respecto al valor anterior en la Series.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '-0.25'
        return { ok, mensaje: ok ? 'Correcto: cayó 25% respecto a Feb (600 -> 450).' : 'El resultado esperado es -0.25.' }
      },
    },
    verificacion: [
      {
        id: 'm8-l4-q1',
        pregunta: '¿Qué calcula `.pct_change()` en una Series de pandas?',
        opciones: [
          'La suma acumulada',
          'La variación porcentual respecto al valor anterior',
          'El promedio móvil',
          'La posición de cada valor',
        ],
        respuestaCorrecta: 1,
        explicacion: '`.pct_change()` compara cada valor con el inmediatamente anterior y devuelve la variación porcentual.',
      },
    ],
    resumen: [
      'Margen = (ingresos − costos) / ingresos.',
      '`.pct_change()` calcula automáticamente la variación porcentual entre periodos consecutivos.',
      'Siempre valida que el denominador no sea cero antes de calcular una razón.',
    ],
    proximoPaso:
      'En el Módulo 9 convertimos estas métricas en visualizaciones claras: gráficos que cuentan una historia, no solo números.',
    conceptos: ['metricas-negocio', 'pct-change'],
  },
]
