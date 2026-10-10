import type { Lesson } from '../../types'

export const module7Lessons: Lesson[] = [
  {
    id: 'm7-l1',
    moduloId: 'modulo-7',
    titulo: 'Detectar y eliminar duplicados',
    objetivo: 'Encontrar filas duplicadas en un DataFrame y decidir cómo eliminarlas correctamente.',
    porQueImporta:
      'Los registros duplicados son uno de los problemas de calidad de datos más comunes (un formulario enviado dos veces, una importación repetida) y pueden inflar artificialmente tus métricas si no los detectas.',
    concepto: `\`\`\`python
df.duplicated()          # Series de True/False: True si la fila es un duplicado exacto de una anterior
df.duplicated().sum()    # cuántas filas están duplicadas
df.drop_duplicates()     # elimina duplicados, conservando la primera aparición
\`\`\`

También puedes buscar duplicados considerando solo algunas columnas:

\`\`\`python
df.duplicated(subset=["email"])
\`\`\`

Esto es útil cuando dos filas no son idénticas en todo, pero representan al mismo registro (por ejemplo, mismo cliente con distinta fecha de carga).`,
    ejemploMinimo: `import pandas as pd

df = pd.DataFrame({"nombre": ["Ana", "Luis", "Ana"], "edad": [28, 35, 28]})
print(df.duplicated().sum())`,
    ejemploAplicado: `import pandas as pd

clientes = pd.DataFrame({
    "email": ["ana@mail.com", "luis@mail.com", "ana@mail.com", "eva@mail.com"],
    "nombre": ["Ana", "Luis", "Ana Garcia", "Eva"],
})

duplicados_por_email = clientes.duplicated(subset=["email"]).sum()
clientes_unicos = clientes.drop_duplicates(subset=["email"], keep="first")

print("Duplicados por email:", duplicados_por_email)
print("Filas tras limpiar:", len(clientes_unicos))`,
    errorFrecuente: {
      codigo: `import pandas as pd

df = pd.DataFrame({"nombre": ["Ana", "Luis", "Ana"]})
df.drop_duplicates()
print(len(df))`,
      explicacion:
        '`drop_duplicates()` devuelve un **nuevo** DataFrame; no modifica `df` en el lugar (a menos que uses `inplace=True`). Por eso `len(df)` sigue mostrando 3. Debes guardar el resultado: `df = df.drop_duplicates()`.',
    },
    practicaGuiada: {
      id: 'm7-l1-practica',
      enunciado:
        'Dado un DataFrame con nombres duplicados, usa `.drop_duplicates()` y guarda el resultado en `df_limpio`. Imprime `len(df_limpio)`.',
      codigoInicial: `import pandas as pd\n\ndf = pd.DataFrame({"nombre": ["Ana", "Luis", "Ana", "Eva"]})\ndf_limpio = df\nprint(len(df_limpio))`,
      solucion: `import pandas as pd\n\ndf = pd.DataFrame({"nombre": ["Ana", "Luis", "Ana", "Eva"]})\ndf_limpio = df.drop_duplicates()\nprint(len(df_limpio))`,
      pistas: ['Reemplaza `df_limpio = df` por `df_limpio = df.drop_duplicates()`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '3'
        return { ok, mensaje: ok ? 'Correcto: quedan 3 filas únicas.' : 'El resultado esperado es 3.' }
      },
    },
    reto: {
      id: 'm7-l1-reto',
      enunciado:
        'Dado `pedidos` con una columna "id_pedido" que tiene valores repetidos, cuenta cuántos duplicados hay considerando solo esa columna (`subset=["id_pedido"]`) e imprime el número.',
      codigoInicial: `import pandas as pd\n\npedidos = pd.DataFrame({\n    "id_pedido": [101, 102, 101, 103, 103, 103],\n    "monto": [50, 30, 50, 20, 25, 20],\n})\n# cuenta duplicados por id_pedido`,
      solucion: `import pandas as pd\n\npedidos = pd.DataFrame({\n    "id_pedido": [101, 102, 101, 103, 103, 103],\n    "monto": [50, 30, 50, 20, 25, 20],\n})\nprint(pedidos.duplicated(subset=["id_pedido"]).sum())`,
      pistas: ['Usa `.duplicated(subset=["id_pedido"])` y súmalo con `.sum()`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '3'
        return { ok, mensaje: ok ? 'Correcto: 101 se repite una vez más y 103 aparece tres veces (2 duplicados extra) = 3 en total.' : 'El resultado esperado es 3.' }
      },
    },
    verificacion: [
      {
        id: 'm7-l1-q1',
        pregunta: '¿Qué hace `df.drop_duplicates()` por defecto?',
        opciones: [
          'Modifica df directamente y no devuelve nada',
          'Devuelve un nuevo DataFrame sin filas duplicadas, conservando la primera aparición',
          'Elimina todas las filas que tengan algún valor repetido en cualquier columna',
          'Lanza un error si encuentra duplicados',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Por defecto, `drop_duplicates()` compara todas las columnas y devuelve un nuevo DataFrame sin modificar el original.',
      },
    ],
    resumen: [
      '`.duplicated()` marca cada fila como True/False según si ya apareció antes.',
      '`.drop_duplicates()` devuelve un nuevo DataFrame sin duplicados (no modifica in-place por defecto).',
      'El parámetro `subset=[...]` permite buscar duplicados considerando solo ciertas columnas clave.',
    ],
    proximoPaso: 'Ahora veremos el otro problema de calidad más común: los valores ausentes (NaN).',
    conceptos: ['duplicados', 'drop-duplicates'],
  },
  {
    id: 'm7-l2',
    moduloId: 'modulo-7',
    titulo: 'Valores ausentes: detectar, eliminar y rellenar',
    objetivo: 'Identificar valores NaN en un DataFrame y decidir entre eliminarlos o rellenarlos según el contexto.',
    porQueImporta:
      'Casi ningún dataset real llega completo. Decidir qué hacer con los valores ausentes (eliminarlos vs. imputarlos) afecta directamente la validez de cualquier análisis posterior.',
    concepto: `\`\`\`python
df.isna().sum()          # valores ausentes por columna
df.dropna()               # elimina filas con AL MENOS un valor ausente
df.dropna(subset=["col"]) # elimina filas con NaN solo en esa columna
df["col"].fillna(0)       # rellena los NaN de esa columna con 0
df["col"].fillna(df["col"].mean())  # rellena con el promedio (imputación común)
\`\`\`

No hay una regla única: eliminar filas pierde datos, pero rellenar con un valor inventado puede introducir sesgo. La decisión depende de cuántos valores faltan y de qué representa esa columna.`,
    ejemploMinimo: `import pandas as pd
import numpy as np

df = pd.DataFrame({"precio": [10, np.nan, 30]})
print(df["precio"].fillna(0).tolist())`,
    ejemploAplicado: `import pandas as pd
import numpy as np

ventas = pd.DataFrame({
    "producto": ["A", "B", "C", "D"],
    "cantidad": [5, np.nan, 3, np.nan],
})

cantidad_promedio = ventas["cantidad"].mean()
ventas["cantidad"] = ventas["cantidad"].fillna(cantidad_promedio)
print(ventas["cantidad"].tolist())`,
    errorFrecuente: {
      codigo: `import pandas as pd
import numpy as np

df = pd.DataFrame({"precio": [10, np.nan, 30]})
print(df["precio"] == np.nan)`,
      explicacion:
        'Comparar con `== np.nan` siempre da `False`, incluso para los valores que sí son NaN (es una peculiaridad matemática: NaN nunca es igual a nada, ni a sí mismo). Para detectar ausentes siempre debes usar `.isna()`, nunca `== np.nan`.',
    },
    practicaGuiada: {
      id: 'm7-l2-practica',
      enunciado:
        'Dada la columna "edad" con un valor ausente, cuenta cuántos valores ausentes tiene usando `.isna().sum()` e imprime el resultado.',
      codigoInicial: `import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({"edad": [25, np.nan, 30, np.nan]})\nprint(0)`,
      solucion: `import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({"edad": [25, np.nan, 30, np.nan]})\nprint(df["edad"].isna().sum())`,
      pistas: ['Usa `df["edad"].isna().sum()`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 2.' }
      },
    },
    reto: {
      id: 'm7-l2-reto',
      enunciado:
        'Dado `df` con una columna "stock" que tiene valores ausentes, elimina las filas donde "stock" sea NaN usando `dropna(subset=["stock"])` e imprime cuántas filas quedan.',
      codigoInicial: `import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    "producto": ["A", "B", "C", "D"],\n    "stock": [10, np.nan, 5, np.nan],\n})\n# elimina filas con stock ausente e imprime cuántas quedan`,
      solucion: `import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    "producto": ["A", "B", "C", "D"],\n    "stock": [10, np.nan, 5, np.nan],\n})\ndf_limpio = df.dropna(subset=["stock"])\nprint(len(df_limpio))`,
      pistas: ['`df.dropna(subset=["stock"])` elimina solo las filas con NaN en esa columna.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: quedan A y C.' : 'El resultado esperado es 2.' }
      },
    },
    verificacion: [
      {
        id: 'm7-l2-q1',
        pregunta: '¿Por qué `df["col"] == np.nan` no funciona para detectar valores ausentes?',
        opciones: [
          'Porque pandas no soporta NaN',
          'Porque NaN nunca es igual a nada, ni siquiera a sí mismo; hay que usar .isna()',
          'Porque hay que usar comillas alrededor de np.nan',
          'Sí funciona correctamente',
        ],
        respuestaCorrecta: 1,
        explicacion: 'NaN es un valor especial que por definición matemática nunca es igual a otro valor. `.isna()` es la forma correcta de detectarlo.',
      },
    ],
    resumen: [
      '`.isna().sum()` cuenta valores ausentes por columna.',
      '`.dropna()` elimina filas con NaN; `subset=[...]` limita a columnas específicas.',
      '`.fillna(valor)` rellena los ausentes; usar la media/mediana es una estrategia común pero no siempre correcta.',
      'Nunca compares con `== np.nan`: usa siempre `.isna()`.',
    ],
    proximoPaso: 'Veremos cómo asegurar que cada columna tenga el tipo de dato correcto, incluyendo fechas.',
    conceptos: ['valores-ausentes', 'fillna-dropna'],
  },
  {
    id: 'm7-l3',
    moduloId: 'modulo-7',
    titulo: 'Tipos de datos y fechas',
    objetivo: 'Convertir columnas al tipo de dato correcto, incluyendo fechas, usando astype y pd.to_datetime.',
    porQueImporta:
      'Un dataset real casi siempre llega con tipos incorrectos (números como texto, fechas como string). Si no los corriges, no podrás hacer cálculos ni ordenar cronológicamente.',
    concepto: `\`\`\`python
df["precio"] = df["precio"].astype(float)       # texto -> número
df["fecha"] = pd.to_datetime(df["fecha"])        # texto -> fecha real

df["fecha"].dt.year    # extraer el año
df["fecha"].dt.month   # extraer el mes
\`\`\`

El accesor \`.dt\` solo funciona después de convertir la columna con \`pd.to_datetime()\`; antes de eso, pandas la trata como texto plano y no entiende "año" o "mes".`,
    ejemploMinimo: `import pandas as pd

df = pd.DataFrame({"precio": ["10", "20", "30"]})
df["precio"] = df["precio"].astype(float)
print(df["precio"].sum())`,
    ejemploAplicado: `import pandas as pd

ventas = pd.DataFrame({
    "fecha": ["2024-01-15", "2024-02-20", "2024-01-30"],
    "monto": [100, 200, 150],
})

ventas["fecha"] = pd.to_datetime(ventas["fecha"])
ventas["mes"] = ventas["fecha"].dt.month

ventas_enero = ventas[ventas["mes"] == 1]
print(ventas_enero["monto"].sum())`,
    errorFrecuente: {
      codigo: `import pandas as pd

df = pd.DataFrame({"fecha": ["2024-01-15", "2024-02-20"]})
print(df["fecha"].dt.year)`,
      explicacion:
        'La columna "fecha" sigue siendo texto (`str`), no un tipo de fecha real, así que `.dt` lanza `AttributeError: Can only use .dt accessor with datetimelike values`. Primero hay que convertirla: `df["fecha"] = pd.to_datetime(df["fecha"])`.',
    },
    practicaGuiada: {
      id: 'm7-l3-practica',
      enunciado:
        'Convierte la columna "cantidad" (texto) a tipo entero con `.astype(int)` e imprime la suma con `.sum()`.',
      codigoInicial: `import pandas as pd\n\ndf = pd.DataFrame({"cantidad": ["5", "10", "15"]})\nprint(df["cantidad"].sum())`,
      solucion: `import pandas as pd\n\ndf = pd.DataFrame({"cantidad": ["5", "10", "15"]})\ndf["cantidad"] = df["cantidad"].astype(int)\nprint(df["cantidad"].sum())`,
      pistas: ['Antes de sumar, convierte la columna: `df["cantidad"] = df["cantidad"].astype(int)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '30'
        return { ok, mensaje: ok ? 'Correcto: 5+10+15=30.' : 'El resultado esperado es 30 (si no conviertes el tipo, obtendrás "51015" por concatenación de texto).' }
      },
    },
    reto: {
      id: 'm7-l3-reto',
      enunciado:
        'Dado `pedidos` con columna "fecha" en texto, conviértela con `pd.to_datetime`, extrae el año con `.dt.year` en una columna "anio", y cuenta cuántos pedidos son del año 2024 (`(pedidos["anio"] == 2024).sum()`).',
      codigoInicial: `import pandas as pd\n\npedidos = pd.DataFrame({\n    "fecha": ["2023-12-01", "2024-01-15", "2024-03-10", "2023-06-05"],\n})\n# convierte la fecha, extrae el año y cuenta los pedidos de 2024`,
      solucion: `import pandas as pd\n\npedidos = pd.DataFrame({\n    "fecha": ["2023-12-01", "2024-01-15", "2024-03-10", "2023-06-05"],\n})\npedidos["fecha"] = pd.to_datetime(pedidos["fecha"])\npedidos["anio"] = pedidos["fecha"].dt.year\nprint((pedidos["anio"] == 2024).sum())`,
      pistas: ['Primero `pd.to_datetime()`, luego `.dt.year`.', 'Compara la nueva columna "anio" con 2024 y suma los True.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: dos pedidos son de 2024.' : 'El resultado esperado es 2.' }
      },
    },
    verificacion: [
      {
        id: 'm7-l3-q1',
        pregunta: '¿Qué función convierte una columna de texto a fechas reales en pandas?',
        opciones: ['pd.to_numeric()', 'pd.to_datetime()', 'df.astype("fecha")', 'pd.date()'],
        respuestaCorrecta: 1,
        explicacion: '`pd.to_datetime()` convierte texto (en formatos reconocibles) a un tipo de fecha que soporta el accesor `.dt`.',
      },
    ],
    resumen: [
      '`.astype(tipo)` convierte el tipo de una columna (por ejemplo, texto a número).',
      '`pd.to_datetime()` convierte texto a fechas reales, habilitando el accesor `.dt`.',
      '`.dt.year`, `.dt.month`, `.dt.day` extraen componentes de una fecha ya convertida.',
    ],
    proximoPaso: 'Cerramos el módulo combinando múltiples fuentes de datos con concat y merge, tal como lo harías con tablas reales.',
    conceptos: ['tipos-de-datos-pandas', 'fechas-pandas'],
  },
  {
    id: 'm7-l4',
    moduloId: 'modulo-7',
    titulo: 'Combinar datasets: concat y merge',
    objetivo: 'Unir varias fuentes de datos: apilar filas con concat y cruzar tablas relacionadas con merge.',
    porQueImporta:
      'En la práctica, los datos casi nunca viven en una sola tabla: ventas en un archivo, clientes en otro. Combinarlos correctamente es una habilidad central del analista.',
    concepto: `**\`pd.concat\`**: apila DataFrames (por ejemplo, ventas de enero + ventas de febrero):

\`\`\`python
pd.concat([df_enero, df_febrero], ignore_index=True)
\`\`\`

**\`pd.merge\`**: cruza dos tablas por una columna en común (como un JOIN de SQL):

\`\`\`python
pd.merge(ventas, clientes, on="id_cliente", how="left")
\`\`\`

\`how="inner"\` conserva solo las coincidencias en ambas tablas; \`how="left"\` conserva todas las filas de la izquierda aunque no tengan coincidencia (rellenando con NaN).`,
    ejemploMinimo: `import pandas as pd

enero = pd.DataFrame({"producto": ["A"], "ventas": [100]})
febrero = pd.DataFrame({"producto": ["B"], "ventas": [150]})

total = pd.concat([enero, febrero], ignore_index=True)
print(len(total))`,
    ejemploAplicado: `import pandas as pd

pedidos = pd.DataFrame({"id_cliente": [1, 2, 3], "monto": [100, 200, 50]})
clientes = pd.DataFrame({"id_cliente": [1, 2], "nombre": ["Ana", "Luis"]})

pedidos_completos = pd.merge(pedidos, clientes, on="id_cliente", how="left")
print(pedidos_completos["nombre"].isna().sum())`,
    errorFrecuente: {
      codigo: `import pandas as pd

a = pd.DataFrame({"id": [1, 2], "valor": [10, 20]})
b = pd.DataFrame({"id": [1, 2], "valor": [100, 200]})

combinado = pd.merge(a, b, on="id")
print(combinado["valor"])`,
      explicacion:
        'Como ambas tablas tienen una columna "valor" (distinta de la clave "id"), pandas renombra automáticamente a "valor_x" y "valor_y" para evitar ambigüedad. Acceder a `combinado["valor"]` lanza `KeyError`. Hay que usar `combinado["valor_x"]` o `combinado["valor_y"]`, o renombrar las columnas antes de combinar.',
    },
    practicaGuiada: {
      id: 'm7-l4-practica',
      enunciado:
        'Combina `ventas_q1` y `ventas_q2` con `pd.concat` (usa `ignore_index=True`) en una variable `ventas_anuales`, e imprime `len(ventas_anuales)`.',
      codigoInicial: `import pandas as pd\n\nventas_q1 = pd.DataFrame({"mes": ["ene", "feb", "mar"], "total": [100, 120, 90]})\nventas_q2 = pd.DataFrame({"mes": ["abr", "may", "jun"], "total": [110, 130, 95]})\nventas_anuales = ventas_q1\nprint(len(ventas_anuales))`,
      solucion: `import pandas as pd\n\nventas_q1 = pd.DataFrame({"mes": ["ene", "feb", "mar"], "total": [100, 120, 90]})\nventas_q2 = pd.DataFrame({"mes": ["abr", "may", "jun"], "total": [110, 130, 95]})\nventas_anuales = pd.concat([ventas_q1, ventas_q2], ignore_index=True)\nprint(len(ventas_anuales))`,
      pistas: ['Usa `pd.concat([ventas_q1, ventas_q2], ignore_index=True)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '6'
        return { ok, mensaje: ok ? 'Correcto: 3 + 3 = 6 filas.' : 'El resultado esperado es 6.' }
      },
    },
    reto: {
      id: 'm7-l4-reto',
      enunciado:
        'Dadas las tablas `productos` (id_producto, nombre) y `ventas` (id_producto, cantidad), combínalas con `pd.merge(ventas, productos, on="id_producto", how="left")` y suma la columna "cantidad" agrupando... en realidad solo imprime cuántas filas tiene el resultado combinado con `len()`.',
      codigoInicial: `import pandas as pd\n\nproductos = pd.DataFrame({"id_producto": [1, 2, 3], "nombre": ["Mouse", "Teclado", "Monitor"]})\nventas = pd.DataFrame({"id_producto": [1, 1, 2, 3], "cantidad": [2, 1, 5, 3]})\n# combina ambas tablas con merge e imprime cuántas filas tiene el resultado`,
      solucion: `import pandas as pd\n\nproductos = pd.DataFrame({"id_producto": [1, 2, 3], "nombre": ["Mouse", "Teclado", "Monitor"]})\nventas = pd.DataFrame({"id_producto": [1, 1, 2, 3], "cantidad": [2, 1, 5, 3]})\ncombinado = pd.merge(ventas, productos, on="id_producto", how="left")\nprint(len(combinado))`,
      pistas: ['`pd.merge(ventas, productos, on="id_producto", how="left")` conserva todas las filas de ventas.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '4'
        return { ok, mensaje: ok ? 'Correcto: el resultado tiene 4 filas (una por cada venta).' : 'El resultado esperado es 4.' }
      },
    },
    verificacion: [
      {
        id: 'm7-l4-q1',
        pregunta: '¿Cuándo usarías pd.concat en vez de pd.merge?',
        opciones: [
          'Cuando quieres cruzar dos tablas por una columna en común',
          'Cuando quieres apilar filas de DataFrames con estructura similar (ej. ventas de distintos meses)',
          'Nunca, son lo mismo',
          'Solo para eliminar duplicados',
        ],
        respuestaCorrecta: 1,
        explicacion: '`concat` apila datos (filas u columnas); `merge` cruza tablas relacionadas por una clave, como un JOIN de SQL.',
      },
    ],
    resumen: [
      '`pd.concat([...], ignore_index=True)` apila DataFrames con estructura similar.',
      '`pd.merge(a, b, on="clave", how="...")` cruza tablas relacionadas, igual que un JOIN de SQL.',
      '`how="left"` conserva todas las filas de la tabla izquierda; `how="inner"` solo las coincidencias.',
      'Columnas con el mismo nombre en ambas tablas (distintas de la clave) se renombran automáticamente con sufijos `_x`/`_y`.',
    ],
    proximoPaso:
      'Con los datos ya limpios y combinados, en el siguiente módulo aprenderás a transformarlos y agregarlos para calcular métricas de negocio reales.',
    conceptos: ['concat', 'merge', 'combinar-datasets'],
  },
]
