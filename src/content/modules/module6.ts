import type { Lesson } from '../../types'

export const module6Lessons: Lesson[] = [
  {
    id: 'm6-l1',
    moduloId: 'modulo-6',
    titulo: 'NumPy: arrays y operaciones vectorizadas',
    objetivo: 'Crear arrays de NumPy y realizar operaciones matemáticas sobre todos sus elementos a la vez (vectorización).',
    porQueImporta:
      'NumPy es la base numérica sobre la que está construido pandas. Entender arrays y vectorización explica por qué pandas es rápido y por qué casi nunca necesitas escribir un `for` para operar columnas completas.',
    concepto: `Un array de NumPy es como una lista, pero optimizada para cálculo numérico:

\`\`\`python
import numpy as np
precios = np.array([10, 20, 30, 40])
\`\`\`

La diferencia clave frente a una lista normal es la **vectorización**: las operaciones se aplican a todos los elementos a la vez, sin bucles explícitos.

\`\`\`python
precios_con_iva = precios * 1.19   # multiplica cada elemento por 1.19
\`\`\`

Esto es mucho más rápido y legible que un \`for\` manual, y es el mismo principio que usarás constantemente en pandas.`,
    ejemploMinimo: `import numpy as np

numeros = np.array([1, 2, 3, 4, 5])
print(numeros * 2)`,
    ejemploAplicado: `import numpy as np

ventas = np.array([120, 340, 560, 80, 200])
comision = ventas * 0.05

print("Comisiones:", comision)
print("Total de ventas:", ventas.sum())
print("Venta promedio:", ventas.mean())`,
    errorFrecuente: {
      codigo: `numeros = [1, 2, 3]
print(numeros * 2)`,
      explicacion:
        'Esto NO lanza error, pero probablemente no hace lo que esperas: con una lista normal de Python, `* 2` repite la lista (`[1, 2, 3, 1, 2, 3]`), no multiplica cada elemento. Para multiplicar elemento por elemento necesitas un array de NumPy: `np.array([1, 2, 3]) * 2`.',
    },
    practicaGuiada: {
      id: 'm6-l1-practica',
      enunciado: 'Crea un array `temperaturas_c` con los valores [0, 10, 20, 30] y conviértelo a Fahrenheit con la fórmula `F = C * 9/5 + 32`. Imprime el resultado.',
      codigoInicial: `import numpy as np\n\ntemperaturas_c = np.array([0, 10, 20, 30])\nprint(temperaturas_c)`,
      solucion: `import numpy as np\n\ntemperaturas_c = np.array([0, 10, 20, 30])\ntemperaturas_f = temperaturas_c * 9 / 5 + 32\nprint(temperaturas_f)`,
      pistas: ['Aplica la fórmula directamente sobre el array: `temperaturas_c * 9 / 5 + 32`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '[32. 50. 68. 86.]'
        return { ok, mensaje: ok ? 'Correcto: 0°C=32°F, 10°C=50°F, 20°C=68°F, 30°C=86°F.' : 'El resultado esperado es [32. 50. 68. 86.]' }
      },
    },
    reto: {
      id: 'm6-l1-reto',
      enunciado:
        'Dado `gastos = np.array([200, 450, 100, 800, 300])`, usa `.mean()` y una comparación vectorizada para imprimir cuántos gastos están por encima del promedio (usa `.sum()` sobre el array booleano).',
      codigoInicial: `import numpy as np\n\ngastos = np.array([200, 450, 100, 800, 300])\n# calcula el promedio y cuenta cuántos superan el promedio`,
      solucion: `import numpy as np\n\ngastos = np.array([200, 450, 100, 800, 300])\npromedio = gastos.mean()\nsobre_promedio = (gastos > promedio).sum()\nprint(sobre_promedio)`,
      pistas: ['`gastos > promedio` da un array de booleanos.', 'Sumar un array de booleanos con `.sum()` cuenta los `True` (cada `True` vale 1).'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: 450 y 800 superan el promedio (370).' : 'El resultado esperado es 2.' }
      },
    },
    verificacion: [
      {
        id: 'm6-l1-q1',
        pregunta: '¿Qué hace `np.array([1, 2, 3]) * 2` a diferencia de `[1, 2, 3] * 2` con una lista normal?',
        opciones: [
          'Lo mismo: repite la secuencia',
          'Multiplica cada elemento por 2 (vectorización)',
          'Lanza un error',
          'Devuelve un string',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Los arrays de NumPy aplican operaciones elemento por elemento (vectorización); las listas normales repiten la secuencia.',
      },
    ],
    resumen: [
      'Un array de NumPy permite operaciones vectorizadas: se aplican a todos los elementos sin un `for` explícito.',
      '`.sum()`, `.mean()` y comparaciones (`>`, `<`, `==`) funcionan directamente sobre arrays completos.',
      'Multiplicar una lista normal por un número la repite; multiplicar un array la escala elemento por elemento.',
    ],
    proximoPaso: 'Ahora construimos sobre esta base con pandas: Series y DataFrame, las estructuras centrales para trabajar con datos tabulares.',
    conceptos: ['numpy', 'arrays', 'vectorizacion'],
  },
  {
    id: 'm6-l2',
    moduloId: 'modulo-6',
    titulo: 'pandas: Series y DataFrame',
    objetivo: 'Crear y entender las dos estructuras centrales de pandas: Series (una columna) y DataFrame (una tabla completa).',
    porQueImporta:
      'Un DataFrame es, en esencia, la hoja de cálculo o tabla de base de datos de Python: es la estructura que usarás en el 90% de tu trabajo como analista.',
    concepto: `Una **Series** es una columna con índice:

\`\`\`python
import pandas as pd
edades = pd.Series([28, 35, 22], name="edad")
\`\`\`

Un **DataFrame** es una tabla completa, normalmente creada desde un diccionario de listas (cada clave es una columna):

\`\`\`python
datos = {
    "nombre": ["Ana", "Luis", "Eva"],
    "edad": [28, 35, 22],
}
df = pd.DataFrame(datos)
\`\`\`

Con \`df.head()\` ves las primeras filas, \`df.shape\` te da (filas, columnas), y \`df["columna"]\` accede a una columna como Series.`,
    ejemploMinimo: `import pandas as pd

datos = {"producto": ["Mouse", "Teclado"], "precio": [15, 45]}
df = pd.DataFrame(datos)
print(df.shape)`,
    ejemploAplicado: `import pandas as pd

ventas = pd.DataFrame({
    "producto": ["Mouse", "Teclado", "Monitor"],
    "cantidad": [5, 2, 1],
    "precio": [15, 45, 200],
})

ventas["subtotal"] = ventas["cantidad"] * ventas["precio"]
print(ventas["subtotal"].sum())`,
    errorFrecuente: {
      codigo: `import pandas as pd

df = pd.DataFrame({"nombre": ["Ana", "Luis"], "edad": [28, 35]})
print(df.nombre_completo)`,
      explicacion:
        'La columna "nombre_completo" no existe (la columna se llama "nombre"), así que lanza `AttributeError`. Es más seguro acceder con corchetes `df["nombre"]`, que lanza un error más claro (`KeyError`) si la columna no existe.',
    },
    practicaGuiada: {
      id: 'm6-l2-practica',
      enunciado:
        'Crea un DataFrame `clientes` a partir de `{"nombre": ["Ana", "Luis", "Eva"], "compras": [3, 7, 1]}` e imprime `clientes.shape`.',
      codigoInicial: `import pandas as pd\n\nclientes = pd.DataFrame({})\nprint(clientes.shape)`,
      solucion: `import pandas as pd\n\nclientes = pd.DataFrame({"nombre": ["Ana", "Luis", "Eva"], "compras": [3, 7, 1]})\nprint(clientes.shape)`,
      pistas: ['Pasa el diccionario completo a `pd.DataFrame(...)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '(3, 2)'
        return { ok, mensaje: ok ? 'Correcto: 3 filas, 2 columnas.' : 'El resultado esperado es (3, 2).' }
      },
    },
    reto: {
      id: 'm6-l2-reto',
      enunciado:
        'Dado el DataFrame de `productos` con columnas "nombre", "precio" y "stock", crea una nueva columna "valor_inventario" (precio * stock) e imprime la suma total de esa columna.',
      codigoInicial: `import pandas as pd\n\nproductos = pd.DataFrame({\n    "nombre": ["A", "B", "C"],\n    "precio": [10, 20, 5],\n    "stock": [100, 50, 200],\n})\n# crea la columna valor_inventario e imprime su suma`,
      solucion: `import pandas as pd\n\nproductos = pd.DataFrame({\n    "nombre": ["A", "B", "C"],\n    "precio": [10, 20, 5],\n    "stock": [100, 50, 200],\n})\nproductos["valor_inventario"] = productos["precio"] * productos["stock"]\nprint(productos["valor_inventario"].sum())`,
      pistas: ['Crear una columna nueva es igual que asignar una clave a un diccionario: `df["nueva"] = ...`.', 'Usa `.sum()` sobre la columna resultante.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '3000'
        return { ok, mensaje: ok ? 'Correcto: 1000 + 1000 + 1000 = 3000.' : 'El resultado esperado es 3000.' }
      },
    },
    verificacion: [
      {
        id: 'm6-l2-q1',
        pregunta: '¿Qué representa un DataFrame de pandas?',
        opciones: ['Un solo número', 'Una tabla de datos con filas y columnas', 'Un gráfico', 'Un archivo de texto plano'],
        respuestaCorrecta: 1,
        explicacion: 'Un DataFrame es una estructura tabular: filas (registros) y columnas (variables), como una hoja de cálculo.',
      },
    ],
    resumen: [
      'Una Series es una columna; un DataFrame es una tabla completa de columnas.',
      'La forma más común de crear un DataFrame es desde un diccionario de listas.',
      'Agregar una columna nueva es tan simple como asignarla: `df["nueva"] = ...`.',
    ],
    proximoPaso: 'Veremos cómo seleccionar y filtrar filas y columnas específicas dentro de un DataFrame.',
    conceptos: ['pandas', 'series', 'dataframe'],
  },
  {
    id: 'm6-l3',
    moduloId: 'modulo-6',
    titulo: 'Selección y filtrado con loc/iloc',
    objetivo: 'Seleccionar filas y columnas específicas de un DataFrame usando filtros booleanos, .loc y .iloc.',
    porQueImporta:
      'Responder preguntas como "¿qué clientes gastaron más de $1000?" es, literalmente, filtrar un DataFrame. Es la operación más frecuente en el día a día de un analista.',
    concepto: `**Filtro booleano** (el más usado):

\`\`\`python
clientes_vip = df[df["compras"] > 5]
\`\`\`

**\`.loc[filas, columnas]\`**: selecciona por etiqueta/condición.
**\`.iloc[filas, columnas]\`**: selecciona por posición numérica (como una lista).

\`\`\`python
df.loc[df["edad"] >= 18, "nombre"]   # nombres de mayores de edad
df.iloc[0:2]                         # las dos primeras filas
\`\`\``,
    ejemploMinimo: `import pandas as pd

df = pd.DataFrame({"nombre": ["Ana", "Luis", "Eva"], "edad": [17, 35, 22]})
mayores = df[df["edad"] >= 18]
print(len(mayores))`,
    ejemploAplicado: `import pandas as pd

ventas = pd.DataFrame({
    "producto": ["Mouse", "Teclado", "Monitor", "Audífonos"],
    "cantidad": [5, 2, 1, 8],
})

alta_demanda = ventas[ventas["cantidad"] > 3]
print(alta_demanda["producto"].tolist())`,
    errorFrecuente: {
      codigo: `import pandas as pd

df = pd.DataFrame({"edad": [17, 35, 22]})
mayores = df[df["edad"] >= 18 and df["edad"] < 60]`,
      explicacion:
        'Usar `and`/`or` de Python normal con Series de pandas lanza `ValueError: The truth value of a Series is ambiguous`. Con pandas debes usar los operadores `&` (y) y `|` (o), y envolver cada condición entre paréntesis: `df[(df["edad"] >= 18) & (df["edad"] < 60)]`.',
    },
    practicaGuiada: {
      id: 'm6-l3-practica',
      enunciado:
        'Dado el DataFrame `productos` con columna "stock", filtra los que tienen `stock == 0` e imprime cuántos son con `len()`.',
      codigoInicial: `import pandas as pd\n\nproductos = pd.DataFrame({"nombre": ["A", "B", "C", "D"], "stock": [0, 5, 0, 10]})\nsin_stock = productos\nprint(len(sin_stock))`,
      solucion: `import pandas as pd\n\nproductos = pd.DataFrame({"nombre": ["A", "B", "C", "D"], "stock": [0, 5, 0, 10]})\nsin_stock = productos[productos["stock"] == 0]\nprint(len(sin_stock))`,
      pistas: ['Usa un filtro booleano: `productos[productos["stock"] == 0]`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: A y C tienen stock 0.' : 'El resultado esperado es 2.' }
      },
    },
    reto: {
      id: 'm6-l3-reto',
      enunciado:
        'Dado `empleados` con columnas "nombre", "area" y "salario", filtra los empleados del área "Ventas" con salario mayor a 2000 (usa `&` y paréntesis), e imprime la lista de nombres con `.tolist()`.',
      codigoInicial: `import pandas as pd\n\nempleados = pd.DataFrame({\n    "nombre": ["Ana", "Luis", "Eva", "Pedro"],\n    "area": ["Ventas", "Ventas", "TI", "Ventas"],\n    "salario": [2500, 1800, 3000, 2100],\n})\n# filtra y imprime los nombres`,
      solucion: `import pandas as pd\n\nempleados = pd.DataFrame({\n    "nombre": ["Ana", "Luis", "Eva", "Pedro"],\n    "area": ["Ventas", "Ventas", "TI", "Ventas"],\n    "salario": [2500, 1800, 3000, 2100],\n})\nfiltrados = empleados[(empleados["area"] == "Ventas") & (empleados["salario"] > 2000)]\nprint(filtrados["nombre"].tolist())`,
      pistas: ['Combina ambas condiciones con `&`, cada una entre paréntesis.', '`.tolist()` convierte la columna resultante en una lista de Python.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "['Ana', 'Pedro']"
        return { ok, mensaje: ok ? 'Correcto: Ana y Pedro cumplen ambas condiciones.' : "El resultado esperado es ['Ana', 'Pedro']." }
      },
    },
    verificacion: [
      {
        id: 'm6-l3-q1',
        pregunta: '¿Cómo se combinan dos condiciones al filtrar un DataFrame de pandas?',
        opciones: ['Con and/or de Python', 'Con & / | y cada condición entre paréntesis', 'No se pueden combinar', 'Con una coma'],
        respuestaCorrecta: 1,
        explicacion: 'pandas requiere los operadores bit a bit `&` y `|`, con cada condición entre paréntesis para evitar ambigüedad.',
      },
    ],
    resumen: [
      'El filtro booleano `df[condicion]` es la forma más común de seleccionar filas.',
      'Con múltiples condiciones, usa `&`/`|` y paréntesis, nunca `and`/`or`.',
      '`.loc` selecciona por etiqueta/condición; `.iloc` selecciona por posición numérica.',
    ],
    proximoPaso: 'En el Módulo 7 profundizamos en limpieza de datos: duplicados, valores ausentes y combinación de varias fuentes.',
    conceptos: ['filtrado-pandas', 'loc-iloc'],
  },
  {
    id: 'm6-l4',
    moduloId: 'modulo-6',
    titulo: 'Leer y explorar datos reales con pandas',
    objetivo: 'Cargar datos desde texto tipo CSV y hacer una primera exploración con .info(), .describe() y .head().',
    porQueImporta:
      'Antes de analizar cualquier dataset real, un analista siempre hace una primera pasada de exploración para entender tamaño, tipos de datos y posibles problemas de calidad.',
    concepto: `En un entorno normal cargarías un archivo con \`pd.read_csv("archivo.csv")\`. Aquí simulamos esto leyendo texto CSV en memoria con \`io.StringIO\`, pero el resultado es el mismo DataFrame que obtendrías de un archivo real.

Primeros pasos de exploración siempre recomendados:

- \`df.shape\`: cuántas filas y columnas.
- \`df.columns.tolist()\`: nombres de las columnas.
- \`df.describe()\`: estadísticas básicas de las columnas numéricas.
- \`df.isna().sum()\`: cuántos valores faltantes hay por columna.`,
    ejemploMinimo: `import pandas as pd
import io

csv_texto = "nombre,edad\\nAna,28\\nLuis,35"
df = pd.read_csv(io.StringIO(csv_texto))
print(df.shape)`,
    ejemploAplicado: `import pandas as pd
import io

csv_texto = """producto,precio,stock
Mouse,15,100
Teclado,45,
Monitor,200,30"""

df = pd.read_csv(io.StringIO(csv_texto))
print("Columnas:", df.columns.tolist())
print("Valores ausentes por columna:")
print(df.isna().sum())`,
    errorFrecuente: {
      codigo: `import pandas as pd
import io

csv_texto = "a;b\\n1;2"
df = pd.read_csv(io.StringIO(csv_texto))
print(df.shape)`,
      explicacion:
        'El CSV usa `;` como separador, pero `pd.read_csv` asume `,` por defecto. El resultado es un DataFrame con una sola columna mal interpretada. Hay que indicar el separador explícitamente: `pd.read_csv(io.StringIO(csv_texto), sep=";")`.',
    },
    practicaGuiada: {
      id: 'm6-l4-practica',
      enunciado:
        'Carga el `csv_texto` dado con `pd.read_csv` e imprime `df.columns.tolist()` para ver los nombres de las columnas.',
      codigoInicial: `import pandas as pd\nimport io\n\ncsv_texto = "ciudad,poblacion\\nBogota,8000000\\nMedellin,2500000"\ndf = pd.DataFrame()\nprint(df.columns.tolist())`,
      solucion: `import pandas as pd\nimport io\n\ncsv_texto = "ciudad,poblacion\\nBogota,8000000\\nMedellin,2500000"\ndf = pd.read_csv(io.StringIO(csv_texto))\nprint(df.columns.tolist())`,
      pistas: ['Reemplaza `pd.DataFrame()` por `pd.read_csv(io.StringIO(csv_texto))`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "['ciudad', 'poblacion']"
        return { ok, mensaje: ok ? 'Correcto.' : "El resultado esperado es ['ciudad', 'poblacion']." }
      },
    },
    reto: {
      id: 'm6-l4-reto',
      enunciado:
        'Dado el `csv_texto` con una columna "stock" que tiene un valor faltante, usa `.isna().sum()` para imprimir cuántos valores ausentes tiene la columna "stock" (imprime solo ese número con `.isna().sum()["stock"]`).',
      codigoInicial: `import pandas as pd\nimport io\n\ncsv_texto = """producto,stock\nA,10\nB,\nC,5\nD,"""\ndf = pd.read_csv(io.StringIO(csv_texto))\n# imprime cuántos valores ausentes tiene la columna stock`,
      solucion: `import pandas as pd\nimport io\n\ncsv_texto = """producto,stock\nA,10\nB,\nC,5\nD,"""\ndf = pd.read_csv(io.StringIO(csv_texto))\nprint(df.isna().sum()["stock"])`,
      pistas: ['`df.isna()` marca cada celda como True/False según si está ausente.', '`.sum()` cuenta los True por columna; accede a "stock" con corchetes.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: B y D tienen stock ausente.' : 'El resultado esperado es 2.' }
      },
    },
    verificacion: [
      {
        id: 'm6-l4-q1',
        pregunta: '¿Qué hace `df.isna().sum()`?',
        opciones: [
          'Suma todos los valores numéricos del DataFrame',
          'Cuenta cuántos valores ausentes (NaN) hay en cada columna',
          'Elimina los valores ausentes',
          'Cuenta cuántas columnas tiene el DataFrame',
        ],
        respuestaCorrecta: 1,
        explicacion: '`.isna()` marca cada celda como True/False; `.sum()` sobre eso cuenta cuántos True (valores ausentes) hay por columna.',
      },
    ],
    resumen: [
      '`pd.read_csv()` carga datos tabulares en un DataFrame (aquí simulado con `io.StringIO`).',
      'Siempre explora un dataset nuevo con `.shape`, `.columns`, `.describe()` e `.isna().sum()` antes de analizarlo.',
      'Un separador incorrecto en `read_csv` es un error silencioso común: siempre revisa cómo quedaron las columnas.',
    ],
    proximoPaso:
      'En el Módulo 7 nos enfocamos de lleno en limpieza de datos: corregir duplicados, valores ausentes y combinar múltiples fuentes, tal como lo hace un analista profesional.',
    conceptos: ['read-csv', 'exploracion-datos'],
  },
]
