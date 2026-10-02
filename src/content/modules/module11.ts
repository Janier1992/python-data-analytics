import type { Lesson } from '../../types'

export const module11Lessons: Lesson[] = [
  {
    id: 'm11-l1',
    moduloId: 'modulo-11',
    titulo: 'Proyecto: define el problema y carga los datos',
    objetivo: 'Plantear una pregunta de negocio clara y cargar un dataset real en pandas como primer paso del proyecto.',
    porQueImporta:
      'Un proyecto de analítica nunca empieza por el código: empieza por una pregunta de negocio concreta. "Tienda Aurora" es una tienda de tecnología que quiere entender su desempeño de ventas del primer trimestre. Este proyecto integrador recorre las 4 etapas de un análisis real, de principio a fin.',
    concepto: `**El problema de negocio**: Tienda Aurora quiere responder: *"¿Qué categorías y productos impulsan más nuestras ventas, y hay algo raro en los datos que debamos corregir primero?"*

Antes de analizar, siempre carga los datos y haz una primera inspección:

\`\`\`python
df = pd.read_csv(io.StringIO(csv_texto))
print(df.shape)
print(df.head())
print(df.dtypes)
\`\`\`

Esta primera mirada te dice cuántos registros tienes, qué columnas existen y si los tipos de datos son los esperados — antes de confiar en ningún número.`,
    ejemploMinimo: `import pandas as pd
import io

csv_texto = "producto,cantidad\\nMouse,3\\nTeclado,5"
df = pd.read_csv(io.StringIO(csv_texto))
print(df.shape)`,
    ejemploAplicado: `import pandas as pd
import io

csv_ventas = """producto,categoria,fecha,cantidad,precio
Mouse,Accesorios,2024-01-05,3,15
Teclado,Accesorios,2024-01-07,,45
Monitor,Electronica,2024-01-10,2,200
Mouse,Accesorios,2024-01-05,3,15
Audifonos,accesorios,2024-02-02,5,30
Monitor,Electronica,2024-02-15,1,210"""

df = pd.read_csv(io.StringIO(csv_ventas))
print("Filas y columnas:", df.shape)
print("Valores ausentes:", df.isna().sum().sum())`,
    errorFrecuente: {
      codigo: `import pandas as pd
import io

csv_texto = "producto,cantidad\\nMouse,3"
df = pd.read_csv(io.StringIO(csv_texto))
print(df.shape())`,
      explicacion:
        '`.shape` es un **atributo**, no un método: no lleva paréntesis. Escribir `df.shape()` lanza `TypeError: \'tuple\' object is not callable`. La forma correcta es `df.shape`.',
    },
    practicaGuiada: {
      id: 'm11-l1-practica',
      enunciado:
        'Carga el `csv_ventas` dado (el dataset real del proyecto) y usa `.isna().sum().sum()` para imprimir el total de valores ausentes en todo el DataFrame.',
      codigoInicial: `import pandas as pd\nimport io\n\ncsv_ventas = """producto,categoria,fecha,cantidad,precio\nMouse,Accesorios,2024-01-05,3,15\nTeclado,Accesorios,2024-01-07,,45\nMonitor,Electronica,2024-01-10,2,200\nMouse,Accesorios,2024-01-05,3,15\nAudifonos,accesorios,2024-02-02,5,30\nMonitor,Electronica,2024-02-15,1,210"""\ndf = pd.read_csv(io.StringIO(csv_ventas))\nprint(0)`,
      solucion: `import pandas as pd\nimport io\n\ncsv_ventas = """producto,categoria,fecha,cantidad,precio\nMouse,Accesorios,2024-01-05,3,15\nTeclado,Accesorios,2024-01-07,,45\nMonitor,Electronica,2024-01-10,2,200\nMouse,Accesorios,2024-01-05,3,15\nAudifonos,accesorios,2024-02-02,5,30\nMonitor,Electronica,2024-02-15,1,210"""\ndf = pd.read_csv(io.StringIO(csv_ventas))\nprint(df.isna().sum().sum())`,
      pistas: ['`.isna()` marca ausentes, el primer `.sum()` suma por columna, el segundo suma el total general.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1'
        return { ok, mensaje: ok ? 'Correcto: hay exactamente 1 valor ausente (cantidad de Teclado).' : 'El resultado esperado es 1.' }
      },
    },
    reto: {
      id: 'm11-l1-reto',
      enunciado:
        'Sobre el mismo `csv_ventas`, usa `.duplicated().sum()` para imprimir cuántas filas están completamente duplicadas.',
      codigoInicial: `import pandas as pd\nimport io\n\ncsv_ventas = """producto,categoria,fecha,cantidad,precio\nMouse,Accesorios,2024-01-05,3,15\nTeclado,Accesorios,2024-01-07,,45\nMonitor,Electronica,2024-01-10,2,200\nMouse,Accesorios,2024-01-05,3,15\nAudifonos,accesorios,2024-02-02,5,30\nMonitor,Electronica,2024-02-15,1,210"""\ndf = pd.read_csv(io.StringIO(csv_ventas))\n# imprime cuántas filas están duplicadas`,
      solucion: `import pandas as pd\nimport io\n\ncsv_ventas = """producto,categoria,fecha,cantidad,precio\nMouse,Accesorios,2024-01-05,3,15\nTeclado,Accesorios,2024-01-07,,45\nMonitor,Electronica,2024-01-10,2,200\nMouse,Accesorios,2024-01-05,3,15\nAudifonos,accesorios,2024-02-02,5,30\nMonitor,Electronica,2024-02-15,1,210"""\ndf = pd.read_csv(io.StringIO(csv_ventas))\nprint(df.duplicated().sum())`,
      pistas: ['`df.duplicated().sum()`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1'
        return { ok, mensaje: ok ? 'Correcto: la fila de "Mouse" del 2024-01-05 está duplicada.' : 'El resultado esperado es 1.' }
      },
    },
    verificacion: [
      {
        id: 'm11-l1-q1',
        pregunta: '¿Por qué es importante inspeccionar shape, head() y dtypes antes de analizar un dataset?',
        opciones: [
          'No es importante, se puede analizar directamente',
          'Para detectar problemas de calidad y confirmar que los datos se cargaron como se esperaba',
          'Solo sirve para hacer el código más largo',
          'Porque pandas lo exige obligatoriamente',
        ],
        respuestaCorrecta: 1,
        explicacion: 'La inspección inicial detecta problemas temprano (filas faltantes, tipos incorrectos) antes de construir cualquier análisis sobre datos defectuosos.',
      },
    ],
    resumen: [
      'Todo proyecto de analítica parte de una pregunta de negocio clara.',
      'Siempre inspecciona `.shape`, `.head()` y `.dtypes` justo después de cargar los datos.',
      'El dataset de "Tienda Aurora" tiene al menos un valor ausente y una fila duplicada que corregiremos en el siguiente paso.',
    ],
    proximoPaso: 'Con el problema definido y los datos cargados, ahora los limpiamos antes de calcular cualquier métrica.',
    conceptos: ['proyecto-definicion-problema', 'inspeccion-inicial'],
  },
  {
    id: 'm11-l2',
    moduloId: 'modulo-11',
    titulo: 'Proyecto: limpia el dataset',
    objetivo: 'Aplicar en conjunto las técnicas de limpieza del Módulo 7 sobre el dataset real del proyecto: duplicados, ausentes y categorías inconsistentes.',
    porQueImporta:
      'Ningún hallazgo del proyecto es confiable si no se corrigen antes los problemas de calidad detectados en el paso anterior. Esta es la etapa que más tiempo toma en un proyecto real — y la más importante.',
    concepto: `Plan de limpieza para "Tienda Aurora", basado en lo que detectamos:

1. Eliminar duplicados exactos con \`.drop_duplicates()\`.
2. Rellenar el valor ausente en "cantidad" con la mediana de esa columna.
3. Normalizar la columna "categoria" a un formato consistente con \`.str.title()\` (para que "accesorios" y "Accesorios" se traten igual).
4. Convertir "fecha" a tipo fecha real con \`pd.to_datetime()\`.`,
    ejemploMinimo: `import pandas as pd

serie = pd.Series(["accesorios", "Accesorios", "ACCESORIOS"])
print(serie.str.title().unique())`,
    ejemploAplicado: `import pandas as pd
import io

csv_ventas = """producto,categoria,fecha,cantidad,precio
Mouse,Accesorios,2024-01-05,3,15
Teclado,Accesorios,2024-01-07,,45
Monitor,Electronica,2024-01-10,2,200
Mouse,Accesorios,2024-01-05,3,15
Audifonos,accesorios,2024-02-02,5,30"""

df = pd.read_csv(io.StringIO(csv_ventas))
df = df.drop_duplicates()
df["cantidad"] = df["cantidad"].fillna(df["cantidad"].median())
df["categoria"] = df["categoria"].str.title()

print(df["categoria"].unique())
print(df.shape)`,
    errorFrecuente: {
      codigo: `import pandas as pd

df = pd.DataFrame({"categoria": ["accesorios", "Accesorios"]})
df["categoria"].str.title()
print(df["categoria"].unique())`,
      explicacion:
        '`.str.title()` devuelve un nuevo valor; no modifica la columna original si no se reasigna. Hay que escribir `df["categoria"] = df["categoria"].str.title()` para que el cambio se guarde.',
    },
    practicaGuiada: {
      id: 'm11-l2-practica',
      enunciado:
        'Aplica `.drop_duplicates()` al DataFrame del proyecto y guarda el resultado en `df`. Imprime `df.shape[0]` (número de filas tras limpiar).',
      codigoInicial: `import pandas as pd\nimport io\n\ncsv_ventas = """producto,categoria,fecha,cantidad,precio\nMouse,Accesorios,2024-01-05,3,15\nTeclado,Accesorios,2024-01-07,,45\nMonitor,Electronica,2024-01-10,2,200\nMouse,Accesorios,2024-01-05,3,15\nAudifonos,accesorios,2024-02-02,5,30"""\ndf = pd.read_csv(io.StringIO(csv_ventas))\nprint(df.shape[0])`,
      solucion: `import pandas as pd\nimport io\n\ncsv_ventas = """producto,categoria,fecha,cantidad,precio\nMouse,Accesorios,2024-01-05,3,15\nTeclado,Accesorios,2024-01-07,,45\nMonitor,Electronica,2024-01-10,2,200\nMouse,Accesorios,2024-01-05,3,15\nAudifonos,accesorios,2024-02-02,5,30"""\ndf = pd.read_csv(io.StringIO(csv_ventas))\ndf = df.drop_duplicates()\nprint(df.shape[0])`,
      pistas: ['`df = df.drop_duplicates()` antes del print.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '4'
        return { ok, mensaje: ok ? 'Correcto: de 5 filas, quedan 4 tras eliminar el duplicado.' : 'El resultado esperado es 4.' }
      },
    },
    reto: {
      id: 'm11-l2-reto',
      enunciado:
        'Sobre el dataset ya sin duplicados, rellena "cantidad" con la mediana, normaliza "categoria" con `.str.title()`, e imprime cuántas categorías únicas quedan con `df["categoria"].nunique()` (debe dar 2, no 3).',
      codigoInicial: `import pandas as pd\nimport io\n\ncsv_ventas = """producto,categoria,fecha,cantidad,precio\nMouse,Accesorios,2024-01-05,3,15\nTeclado,Accesorios,2024-01-07,,45\nMonitor,Electronica,2024-01-10,2,200\nMouse,Accesorios,2024-01-05,3,15\nAudifonos,accesorios,2024-02-02,5,30"""\ndf = pd.read_csv(io.StringIO(csv_ventas))\ndf = df.drop_duplicates()\n# rellena cantidad, normaliza categoria, imprime nunique()`,
      solucion: `import pandas as pd\nimport io\n\ncsv_ventas = """producto,categoria,fecha,cantidad,precio\nMouse,Accesorios,2024-01-05,3,15\nTeclado,Accesorios,2024-01-07,,45\nMonitor,Electronica,2024-01-10,2,200\nMouse,Accesorios,2024-01-05,3,15\nAudifonos,accesorios,2024-02-02,5,30"""\ndf = pd.read_csv(io.StringIO(csv_ventas))\ndf = df.drop_duplicates()\ndf["cantidad"] = df["cantidad"].fillna(df["cantidad"].median())\ndf["categoria"] = df["categoria"].str.title()\nprint(df["categoria"].nunique())`,
      pistas: ['`df["cantidad"].fillna(df["cantidad"].median())`.', '`df["categoria"].str.title()` normaliza mayúsculas/minúsculas.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: "Accesorios" y "Electronica" (ya no hay 3 variantes distintas).' : 'El resultado esperado es 2.' }
      },
    },
    verificacion: [
      {
        id: 'm11-l2-q1',
        pregunta: '¿Por qué normalizar texto como "accesorios" vs "Accesorios" antes de agrupar datos?',
        opciones: [
          'Por estética únicamente',
          'Porque pandas los trataría como categorías distintas, distorsionando cualquier agregación por categoría',
          'No es necesario, pandas los unifica automáticamente',
          'Solo importa para datos numéricos',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Sin normalizar, un `groupby("categoria")` trataría "accesorios" y "Accesorios" como grupos distintos, subestimando el total real de cada categoría.',
      },
    ],
    resumen: [
      'La limpieza combina varias técnicas: duplicados, ausentes y texto inconsistente.',
      '`.str.title()` normaliza mayúsculas/minúsculas en columnas de texto.',
      'Siempre reasigna el resultado (`df["col"] = ...`) para que los cambios de limpieza se conserven.',
    ],
    proximoPaso: 'Con los datos limpios, calculamos las métricas clave y las visualizamos.',
    conceptos: ['proyecto-limpieza'],
  },
  {
    id: 'm11-l3',
    moduloId: 'modulo-11',
    titulo: 'Proyecto: métricas y visualización',
    objetivo: 'Calcular las métricas clave del proyecto con groupby/agg y visualizar el hallazgo principal.',
    porQueImporta:
      'Esta es la etapa donde los datos limpios se convierten en respuestas concretas a la pregunta de negocio original: ¿qué categoría y producto impulsan más las ventas?',
    concepto: `Con el dataset limpio, calculamos ingresos por fila (\`cantidad * precio\`) y agregamos por categoría:

\`\`\`python
df["ingreso"] = df["cantidad"] * df["precio"]
resumen = df.groupby("categoria")["ingreso"].sum().sort_values(ascending=False)
\`\`\`

\`.sort_values(ascending=False)\` ordena el resultado de mayor a menor, dejando el hallazgo principal (la categoría líder) en la primera posición — justo lo que queremos resaltar en el reporte final.`,
    ejemploMinimo: `import pandas as pd

df = pd.DataFrame({"categoria": ["A", "B", "A"], "ingreso": [100, 300, 150]})
resumen = df.groupby("categoria")["ingreso"].sum().sort_values(ascending=False)
print(resumen.index[0])`,
    ejemploAplicado: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "categoria": ["Accesorios", "Electronica", "Accesorios", "Electronica"],
    "cantidad": [3, 2, 5, 1],
    "precio": [15, 200, 30, 210],
})
df["ingreso"] = df["cantidad"] * df["precio"]
resumen = df.groupby("categoria")["ingreso"].sum().sort_values(ascending=False)

plt.bar(resumen.index, resumen.values, color="#346dff")
plt.ylabel("Ingreso total")
plt.title("Ingresos por categoría")
print("Categoría líder:", resumen.index[0])`,
    errorFrecuente: {
      codigo: `import pandas as pd

df = pd.DataFrame({"categoria": ["A", "B"], "ingreso": [100, 300]})
resumen = df.groupby("categoria")["ingreso"].sum()
print(resumen[0])`,
      explicacion:
        'Tras un `groupby`, el resultado está indexado por categoría (no por posición numérica 0, 1, 2...). `resumen[0]` puede fallar o dar un resultado inesperado. Para la categoría líder, usa `.sort_values(ascending=False)` y luego `.index[0]`.',
    },
    practicaGuiada: {
      id: 'm11-l3-practica',
      enunciado:
        'Dado `df` con "cantidad" y "precio", crea la columna "ingreso" (cantidad * precio) e imprime `df["ingreso"].sum()`.',
      codigoInicial: `import pandas as pd\n\ndf = pd.DataFrame({"cantidad": [3, 2, 5], "precio": [15, 200, 30]})\nprint(0)`,
      solucion: `import pandas as pd\n\ndf = pd.DataFrame({"cantidad": [3, 2, 5], "precio": [15, 200, 30]})\ndf["ingreso"] = df["cantidad"] * df["precio"]\nprint(df["ingreso"].sum())`,
      pistas: ['`df["ingreso"] = df["cantidad"] * df["precio"]`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '595'
        return { ok, mensaje: ok ? 'Correcto: 45+400+150=595.' : 'El resultado esperado es 595.' }
      },
    },
    reto: {
      id: 'm11-l3-reto',
      enunciado:
        'Sobre el dataset completo del proyecto (ya limpio), calcula el ingreso por fila, agrupa por "categoria" sumando el ingreso, ordena descendente, e imprime el nombre de la categoría líder con `.index[0]`.',
      codigoInicial: `import pandas as pd\n\ndf = pd.DataFrame({\n    "categoria": ["Accesorios", "Electronica", "Accesorios", "Electronica", "Accesorios"],\n    "cantidad": [3, 2, 5, 1, 6],\n    "precio": [15, 200, 30, 210, 14],\n})\n# calcula ingreso, agrupa por categoria, ordena e imprime la categoría líder`,
      solucion: `import pandas as pd\n\ndf = pd.DataFrame({\n    "categoria": ["Accesorios", "Electronica", "Accesorios", "Electronica", "Accesorios"],\n    "cantidad": [3, 2, 5, 1, 6],\n    "precio": [15, 200, 30, 210, 14],\n})\ndf["ingreso"] = df["cantidad"] * df["precio"]\nresumen = df.groupby("categoria")["ingreso"].sum().sort_values(ascending=False)\nprint(resumen.index[0])`,
      pistas: ['Primero crea "ingreso", luego agrupa y ordena, y finalmente usa `.index[0]`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Electronica'
        return { ok, mensaje: ok ? 'Correcto: Electronica suma 610 frente a 219 de Accesorios.' : 'El resultado esperado es Electronica.' }
      },
    },
    verificacion: [
      {
        id: 'm11-l3-q1',
        pregunta: '¿Para qué sirve `.sort_values(ascending=False)` después de un groupby?',
        opciones: [
          'Para eliminar valores duplicados',
          'Para ordenar el resultado de mayor a menor y resaltar el valor más alto primero',
          'Para convertir el resultado en una lista',
          'No tiene ningún efecto práctico',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Ordenar de mayor a menor deja el hallazgo principal (el valor más alto) en la primera posición, ideal para reportes.',
      },
    ],
    resumen: [
      'Las métricas de negocio normalmente se calculan como una nueva columna (ej. ingreso = cantidad × precio) antes de agregarse.',
      '`groupby().sum().sort_values(ascending=False)` es un patrón habitual para encontrar al "líder" de una categoría.',
      'Un gráfico de barras simple comunica claramente el resultado de este tipo de agregación.',
    ],
    proximoPaso: 'Cerramos el proyecto (y la Ruta 2 completa) con la etapa final: comunicar las conclusiones en un reporte ejecutivo.',
    conceptos: ['proyecto-metricas', 'proyecto-visualizacion'],
  },
  {
    id: 'm11-l4',
    moduloId: 'modulo-11',
    titulo: 'Proyecto: conclusiones y reporte ejecutivo',
    objetivo: 'Sintetizar los hallazgos del proyecto en un resumen ejecutivo claro, con números concretos y una recomendación.',
    porQueImporta:
      'Un análisis que no se comunica no genera ningún impacto. Esta última etapa es la que convierte tu trabajo técnico en algo que una persona del negocio puede leer y usar para decidir.',
    concepto: `Un buen resumen ejecutivo responde, en pocas líneas:

1. **¿Cuál era la pregunta?**
2. **¿Qué encontraste?** (con números concretos)
3. **¿Qué deberíamos hacer con esta información?**

\`\`\`python
reporte = (
    f"La categoría líder es {categoria_lider} con \${ingreso_lider:,.0f} en ingresos, "
    f"representando el {participacion:.0f}% del total analizado."
)
\`\`\`

Nota el uso de f-strings con formato (\`:,.0f\` para separador de miles sin decimales, \`:.0f\` para porcentaje sin decimales) — detalles que hacen un reporte mucho más legible.`,
    ejemploMinimo: `ingreso_total = 1250.567
print(f"Ingreso total: \${ingreso_total:,.0f}")`,
    ejemploAplicado: `categoria_lider = "Electronica"
ingreso_lider = 610
ingreso_total = 829

participacion = ingreso_lider / ingreso_total * 100

reporte = (
    f"La categoría líder es {categoria_lider} con \${ingreso_lider:,.0f} en ingresos, "
    f"representando el {participacion:.0f}% del total analizado."
)
print(reporte)`,
    errorFrecuente: {
      codigo: `ingreso = 1500000
print(f"Ingreso: {ingreso:,.0f}")
print(f"Ingreso mal formateado: {ingreso:.0f,}")`,
      explicacion:
        'El orden de los especificadores de formato importa: `{valor:,.0f}` es correcto (separador de miles, 0 decimales), pero `{valor:.0f,}` lanza `ValueError: Invalid format specifier`. La coma siempre va antes del punto en el especificador.',
    },
    practicaGuiada: {
      id: 'm11-l4-practica',
      enunciado:
        'Dado `ingreso_total = 829`, imprime: `Ingreso total: $829` usando una f-string con formato `:,.0f`.',
      codigoInicial: `ingreso_total = 829\nprint(f"ESCRIBE_AQUI")`,
      solucion: `ingreso_total = 829\nprint(f"Ingreso total: \${ingreso_total:,.0f}")`,
      pistas: ['La f-string es `f"Ingreso total: ${ingreso_total:,.0f}"`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Ingreso total: $829'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es "Ingreso total: $829".' }
      },
    },
    reto: {
      id: 'm11-l4-reto',
      enunciado:
        'Dados `categoria_lider = "Electronica"`, `ingreso_lider = 610` e `ingreso_total = 829`, construye el `reporte` final (participación redondeada sin decimales) e imprímelo. Debe decir exactamente: `La categoría líder es Electronica con el 74% de los ingresos.`',
      codigoInicial: `categoria_lider = "Electronica"\ningreso_lider = 610\ningreso_total = 829\n# calcula la participación y construye el reporte`,
      solucion: `categoria_lider = "Electronica"\ningreso_lider = 610\ningreso_total = 829\nparticipacion = ingreso_lider / ingreso_total * 100\nreporte = f"La categoría líder es {categoria_lider} con el {participacion:.0f}% de los ingresos."\nprint(reporte)`,
      pistas: ['`participacion = ingreso_lider / ingreso_total * 100`.', 'Usa `{participacion:.0f}` para redondear sin decimales dentro de la f-string.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'La categoría líder es Electronica con el 74% de los ingresos.'
        return { ok, mensaje: ok ? '¡Proyecto completo! Ya puedes comunicar un hallazgo de principio a fin.' : 'Revisa el texto y el redondeo del porcentaje (debe dar 74%).' }
      },
    },
    verificacion: [
      {
        id: 'm11-l4-q1',
        pregunta: '¿Cuáles son los tres elementos clave de un buen resumen ejecutivo según esta lección?',
        opciones: [
          'Código, gráficos y tablas',
          'La pregunta original, el hallazgo con números concretos, y una recomendación',
          'Solo el código fuente del análisis',
          'Una lista de todas las librerías usadas',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Un resumen ejecutivo efectivo conecta la pregunta de negocio con un hallazgo concreto y una acción recomendada.',
      },
    ],
    resumen: [
      'Un resumen ejecutivo conecta pregunta → hallazgo (con números) → recomendación.',
      'Los especificadores de formato en f-strings (`:,.0f`, `:.0f`) hacen reportes mucho más legibles.',
      'Completaste el ciclo completo de un proyecto de analista: definir, limpiar, analizar y comunicar.',
    ],
    proximoPaso:
      '¡Felicidades, completaste la Ruta 2! En la Ruta 3 (próximamente) darás el salto de analizar datos a construir modelos predictivos con Machine Learning.',
    conceptos: ['proyecto-conclusiones', 'f-strings-formato'],
  },
]
