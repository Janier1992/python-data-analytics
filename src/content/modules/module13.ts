import type { Lesson } from '../../types'

export const module13Lessons: Lesson[] = [
  {
    id: 'm13-l1',
    moduloId: 'modulo-13',
    titulo: 'Variables categóricas: One-Hot Encoding',
    objetivo: 'Convertir variables categóricas de texto en columnas numéricas que un modelo pueda usar, con One-Hot Encoding.',
    porQueImporta:
      'Los modelos de machine learning solo entienden números. Una columna como "ciudad" con texto debe transformarse antes de poder usarse como feature.',
    concepto: `\`\`\`python
import pandas as pd

pd.get_dummies(df["ciudad"])
\`\`\`

El One-Hot Encoding crea una columna binaria (0/1) por cada categoría única. Por ejemplo, "ciudad" con valores Bogotá/Lima se convierte en dos columnas: \`ciudad_Bogota\` y \`ciudad_Lima\`, cada una con 1 si esa fila pertenece a esa ciudad, 0 si no.

Esto evita el error de tratar categorías como si tuvieran un orden numérico (Bogotá=1, Lima=2 no tiene sentido matemático real).`,
    ejemploMinimo: `import pandas as pd

df = pd.DataFrame({"ciudad": ["Bogota", "Lima", "Bogota"]})
print(pd.get_dummies(df["ciudad"]).columns.tolist())`,
    ejemploAplicado: `import pandas as pd

clientes = pd.DataFrame({
    "plan": ["Basico", "Premium", "Basico", "Pro"],
    "gasto": [20, 80, 25, 50],
})

clientes_codificados = pd.get_dummies(clientes, columns=["plan"])
print(clientes_codificados.columns.tolist())`,
    errorFrecuente: {
      codigo: `df = {"ciudad": ["Bogota", "Lima"]}
ciudad_numero = {"Bogota": 1, "Lima": 2}
df["ciudad_cod"] = [ciudad_numero[c] for c in df["ciudad"]]`,
      explicacion:
        'Asignar números arbitrarios (Bogotá=1, Lima=2) a una categoría sin orden real implica, sin querer, que "Lima es el doble de Bogotá" para el modelo. Esto confunde a algoritmos que asumen relaciones numéricas (como la regresión lineal). One-Hot Encoding evita ese supuesto falso.',
    },
    practicaGuiada: {
      id: 'm13-l1-practica',
      enunciado:
        'Aplica `pd.get_dummies()` a la columna "talla" e imprime cuántas columnas nuevas se crearon con `len(...columns)`.',
      codigoInicial: `import pandas as pd\n\ndf = pd.DataFrame({"talla": ["S", "M", "L", "M"]})\nprint(0)`,
      solucion: `import pandas as pd\n\ndf = pd.DataFrame({"talla": ["S", "M", "L", "M"]})\ncodificado = pd.get_dummies(df["talla"])\nprint(len(codificado.columns))`,
      pistas: ['`pd.get_dummies(df["talla"])` crea una columna por cada categoría única.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '3'
        return { ok, mensaje: ok ? 'Correcto: S, M y L son 3 categorías únicas.' : 'El resultado esperado es 3.' }
      },
    },
    reto: {
      id: 'm13-l1-reto',
      enunciado:
        'Dado `df` con columnas "plan" y "gasto", usa `pd.get_dummies(df, columns=["plan"])` e imprime `True` si la columna "plan_Premium" existe en el resultado, usando `"plan_Premium" in resultado.columns`.',
      codigoInicial: `import pandas as pd\n\ndf = pd.DataFrame({"plan": ["Basico", "Premium", "Basico"], "gasto": [20, 80, 25]})\n# codifica con get_dummies e imprime si existe la columna plan_Premium`,
      solucion: `import pandas as pd\n\ndf = pd.DataFrame({"plan": ["Basico", "Premium", "Basico"], "gasto": [20, 80, 25]})\nresultado = pd.get_dummies(df, columns=["plan"])\nprint("plan_Premium" in resultado.columns)`,
      pistas: ['`pd.get_dummies(df, columns=["plan"])` genera columnas con el prefijo "plan_".'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'True'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es True.' }
      },
    },
    verificacion: [
      {
        id: 'm13-l1-q1',
        pregunta: '¿Por qué no se recomienda asignar números arbitrarios a categorías sin orden (como ciudades)?',
        opciones: [
          'Porque es más lento de calcular',
          'Porque implicaría falsamente una relación numérica/de orden entre categorías que no existe',
          'Porque pandas no lo permite',
          'No hay ningún problema en hacerlo',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Muchos modelos interpretan los números como relaciones de orden o magnitud, lo cual no aplica a categorías sin jerarquía real.',
      },
    ],
    resumen: [
      '`pd.get_dummies()` convierte una columna categórica en varias columnas binarias (One-Hot Encoding).',
      'Evita asignar números arbitrarios a categorías sin orden real.',
      'Es el paso de preparación más común antes de entrenar modelos con variables categóricas.',
    ],
    proximoPaso: 'Ahora veremos cómo escalar variables numéricas para que tengan rangos comparables.',
    conceptos: ['one-hot-encoding', 'variables-categoricas'],
  },
  {
    id: 'm13-l2',
    moduloId: 'modulo-13',
    titulo: 'Escalado de variables numéricas',
    objetivo: 'Aplicar StandardScaler y MinMaxScaler para poner variables numéricas en rangos comparables.',
    porQueImporta:
      'Si "edad" va de 18 a 90 y "ingresos" va de 0 a 10,000,000, muchos modelos (especialmente los basados en distancias) le darán peso desproporcionado a la variable con números más grandes, sin que eso refleje su importancia real.',
    concepto: `\`\`\`python
from sklearn.preprocessing import StandardScaler, MinMaxScaler

StandardScaler().fit_transform(X)  # media 0, desviación estándar 1
MinMaxScaler().fit_transform(X)    # rango 0 a 1
\`\`\`

- **StandardScaler**: centra los datos en 0 con desviación estándar 1. Útil para modelos que asumen distribuciones (regresión, redes neuronales).
- **MinMaxScaler**: comprime todo al rango [0, 1]. Útil cuando necesitas límites fijos.

**Regla de oro**: ajusta (\`fit\`) el escalador **solo** con datos de entrenamiento, y luego aplica (\`transform\`) esa misma transformación a los datos de prueba.`,
    ejemploMinimo: `from sklearn.preprocessing import StandardScaler

X = [[10], [20], [30], [40]]
escalador = StandardScaler()
print(escalador.fit_transform(X).round(2).tolist())`,
    ejemploAplicado: `from sklearn.preprocessing import StandardScaler

edades = [[18], [25], [40], [60], [90]]
escalador = StandardScaler()
edades_escaladas = escalador.fit_transform(edades)

print("Media tras escalar:", round(edades_escaladas.mean(), 2))
print("Desviación estándar tras escalar:", round(edades_escaladas.std(), 2))`,
    errorFrecuente: {
      codigo: `from sklearn.preprocessing import StandardScaler

X_train = [[10], [20], [30]]
X_test = [[15], [25]]

escalador_train = StandardScaler().fit(X_train)
escalador_test = StandardScaler().fit(X_test)  # ¡un escalador nuevo!
X_test_escalado = escalador_test.transform(X_test)`,
      explicacion:
        'Ajustar un escalador **distinto** sobre los datos de prueba rompe la consistencia: cada conjunto quedaría escalado con una referencia diferente. Siempre se ajusta (`fit`) un único escalador sobre `X_train`, y se usa `.transform()` (no `.fit()`) sobre `X_test`.',
    },
    practicaGuiada: {
      id: 'm13-l2-practica',
      enunciado: 'Aplica `StandardScaler().fit_transform(X)` e imprime la media resultante redondeada (debe ser prácticamente 0).',
      codigoInicial: `from sklearn.preprocessing import StandardScaler\n\nX = [[5], [10], [15], [20]]\nprint(1)`,
      solucion: `from sklearn.preprocessing import StandardScaler\n\nX = [[5], [10], [15], [20]]\nescalador = StandardScaler()\nX_escalado = escalador.fit_transform(X)\nprint(round(X_escalado.mean()))`,
      pistas: ['`StandardScaler().fit_transform(X)` seguido de `.mean()`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0'
        return { ok, mensaje: ok ? 'Correcto: tras escalar, la media siempre es 0.' : 'El resultado esperado es 0.' }
      },
    },
    reto: {
      id: 'm13-l2-reto',
      enunciado:
        'Ajusta un `MinMaxScaler()` sobre `X_train`, y usa `.transform()` (no `.fit()`) sobre `X_test`. Imprime el resultado de `X_test` escalado, redondeado a 2 decimales, como lista con `.round(2).tolist()`.',
      codigoInicial: `from sklearn.preprocessing import MinMaxScaler\n\nX_train = [[0], [50], [100]]\nX_test = [[25], [75]]\n# ajusta el escalador con X_train y transforma X_test`,
      solucion: `from sklearn.preprocessing import MinMaxScaler\n\nX_train = [[0], [50], [100]]\nX_test = [[25], [75]]\nescalador = MinMaxScaler()\nescalador.fit(X_train)\nX_test_escalado = escalador.transform(X_test)\nprint(X_test_escalado.round(2).tolist())`,
      pistas: ['Primero `escalador.fit(X_train)`, luego `escalador.transform(X_test)` (sin volver a ajustar).'],
      validar: (stdout) => {
        const ok = stdout.trim() === '[[0.25], [0.75]]'
        return { ok, mensaje: ok ? 'Correcto: 25 y 75 quedan en 0.25 y 0.75 dentro del rango [0, 100].' : 'El resultado esperado es [[0.25], [0.75]].' }
      },
    },
    verificacion: [
      {
        id: 'm13-l2-q1',
        pregunta: '¿Por qué se debe ajustar (fit) el escalador solo con datos de entrenamiento?',
        opciones: [
          'Por velocidad de cómputo',
          'Para evitar que información de los datos de prueba "se filtre" en la preparación de los datos de entrenamiento',
          'No importa, se puede ajustar con todos los datos',
          'Porque scikit-learn lo exige técnicamente',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Ajustar el escalador con datos de prueba filtraría información de esos datos hacia el proceso de entrenamiento, un tipo de data leakage.',
      },
    ],
    resumen: [
      'StandardScaler centra en media 0 y desviación estándar 1; MinMaxScaler comprime al rango [0, 1].',
      'El escalador se ajusta (`fit`) solo con `X_train`, y se aplica (`transform`) igual a `X_test`.',
      'Escalar es especialmente importante para modelos basados en distancias o gradientes.',
    ],
    proximoPaso: 'Veremos cómo extraer features útiles a partir de columnas de fecha.',
    conceptos: ['escalado', 'standardscaler-minmaxscaler'],
  },
  {
    id: 'm13-l3',
    moduloId: 'modulo-13',
    titulo: 'Ingeniería de características temporales',
    objetivo: 'Extraer features útiles (día de la semana, mes, fin de semana) a partir de una columna de fecha.',
    porQueImporta:
      'Una fecha en bruto no es útil para un modelo, pero lo que representa sí: "es fin de semana", "es diciembre" (temporada alta) son señales predictivas poderosas que hay que extraer explícitamente.',
    concepto: `\`\`\`python
df["fecha"] = pd.to_datetime(df["fecha"])

df["dia_semana"] = df["fecha"].dt.dayofweek   # 0=lunes, 6=domingo
df["mes"] = df["fecha"].dt.month
df["es_fin_de_semana"] = df["dia_semana"] >= 5
\`\`\`

Estas nuevas columnas (features derivadas) suelen ser más predictivas que la fecha cruda, porque capturan patrones de estacionalidad que el modelo puede aprovechar directamente.`,
    ejemploMinimo: `import pandas as pd

df = pd.DataFrame({"fecha": ["2024-01-06", "2024-01-08"]})
df["fecha"] = pd.to_datetime(df["fecha"])
print(df["fecha"].dt.dayofweek.tolist())`,
    ejemploAplicado: `import pandas as pd

ventas = pd.DataFrame({
    "fecha": ["2024-01-05", "2024-01-06", "2024-01-08", "2024-12-24"],
    "monto": [100, 250, 90, 500],
})

ventas["fecha"] = pd.to_datetime(ventas["fecha"])
ventas["es_fin_de_semana"] = ventas["fecha"].dt.dayofweek >= 5
ventas["mes"] = ventas["fecha"].dt.month

print(ventas[ventas["es_fin_de_semana"]]["monto"].mean())`,
    errorFrecuente: {
      codigo: `import pandas as pd

df = pd.DataFrame({"fecha": ["2024-01-05"]})
print(df["fecha"].dt.dayofweek)`,
      explicacion:
        'Igual que vimos en el módulo de limpieza de datos, el accesor `.dt` solo funciona si la columna ya es de tipo fecha. Aquí "fecha" sigue siendo texto: hay que convertirla primero con `pd.to_datetime()`.',
    },
    practicaGuiada: {
      id: 'm13-l3-practica',
      enunciado:
        'Convierte "fecha" con `pd.to_datetime()` y crea una columna "mes" con `.dt.month`. Imprime `df["mes"].tolist()`.',
      codigoInicial: `import pandas as pd\n\ndf = pd.DataFrame({"fecha": ["2024-03-10", "2024-07-15"]})\nprint([])`,
      solucion: `import pandas as pd\n\ndf = pd.DataFrame({"fecha": ["2024-03-10", "2024-07-15"]})\ndf["fecha"] = pd.to_datetime(df["fecha"])\ndf["mes"] = df["fecha"].dt.month\nprint(df["mes"].tolist())`,
      pistas: ['Convierte primero con `pd.to_datetime()`, luego usa `.dt.month`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '[3, 7]'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es [3, 7].' }
      },
    },
    reto: {
      id: 'm13-l3-reto',
      enunciado:
        'Dado `ventas` con una columna "fecha", crea "es_fin_de_semana" (`.dt.dayofweek >= 5`) e imprime cuántas ventas ocurrieron en fin de semana con `.sum()`.',
      codigoInicial: `import pandas as pd\n\nventas = pd.DataFrame({"fecha": ["2024-01-05", "2024-01-06", "2024-01-07", "2024-01-08"]})\n# convierte la fecha, crea es_fin_de_semana e imprime cuántas son fin de semana`,
      solucion: `import pandas as pd\n\nventas = pd.DataFrame({"fecha": ["2024-01-05", "2024-01-06", "2024-01-07", "2024-01-08"]})\nventas["fecha"] = pd.to_datetime(ventas["fecha"])\nventas["es_fin_de_semana"] = ventas["fecha"].dt.dayofweek >= 5\nprint(ventas["es_fin_de_semana"].sum())`,
      pistas: ['`dayofweek` 5 y 6 corresponden a sábado y domingo.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: el 6 (sábado) y el 7 (domingo) de enero de 2024 son fin de semana.' : 'El resultado esperado es 2.' }
      },
    },
    verificacion: [
      {
        id: 'm13-l3-q1',
        pregunta: '¿Qué valores devuelve `.dt.dayofweek` para sábado y domingo?',
        opciones: ['0 y 1', '6 y 7', '5 y 6', '1 y 7'],
        respuestaCorrecta: 2,
        explicacion: '`dayofweek` numera de 0 (lunes) a 6 (domingo), por lo que sábado es 5 y domingo es 6.',
      },
    ],
    resumen: [
      'Las fechas crudas rara vez son útiles directamente; hay que derivar features como día de la semana, mes o fin de semana.',
      '`.dt.dayofweek`, `.dt.month` y comparaciones simples permiten construir estas features fácilmente.',
      'Estas features de estacionalidad suelen mejorar notablemente el desempeño de un modelo.',
    ],
    proximoPaso: 'Cerramos el módulo con el concepto central que conecta todo lo anterior: cómo prevenir el data leakage.',
    conceptos: ['features-temporales', 'feature-engineering'],
  },
  {
    id: 'm13-l4',
    moduloId: 'modulo-13',
    titulo: 'Prevenir el data leakage',
    objetivo: 'Reconocer las formas más comunes de fuga de información (data leakage) y cómo evitarlas en el flujo de preparación de datos.',
    porQueImporta:
      'El data leakage es una de las causas más frecuentes de que un modelo funcione "perfecto" en desarrollo y falle por completo en producción. Es un error silencioso y peligroso.',
    concepto: `Formas comunes de data leakage:

1. **Escalar/imputar antes de dividir train/test**: calcular la media de toda la columna (incluyendo test) para rellenar NaN, filtrando información del futuro hacia el entrenamiento.
2. **Usar variables que no estarían disponibles en el momento de la predicción real** (por ejemplo, predecir si un cliente cancelará usando una columna que solo existe después de que cancela).
3. **Duplicados entre train y test**: si la misma fila aparece en ambos conjuntos, el modelo "ya la vio".

**Regla general**: toda decisión de preparación de datos que dependa de estadísticas (media, escalado, imputación) debe calcularse **solo** con el conjunto de entrenamiento.

\`\`\`python
# Correcto: dividir primero, ajustar después
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
escalador = StandardScaler().fit(X_train)   # solo con train
\`\`\``,
    ejemploMinimo: `from sklearn.model_selection import train_test_split

X = [[i] for i in range(10)]
y = [i for i in range(10)]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
print(len(X_train), len(X_test))`,
    ejemploAplicado: `import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.DataFrame({"x": list(range(10)), "y": [i * 2 for i in range(10)]})

# Correcto: dividir ANTES de calcular cualquier estadística de imputación/escalado
train, test = train_test_split(df, test_size=0.3, random_state=0)
media_train = train["x"].mean()

print("Media calculada solo con entrenamiento:", media_train)
print("Filas de train:", len(train), "- Filas de test:", len(test))`,
    errorFrecuente: {
      codigo: `import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.DataFrame({"x": [1, 2, None, 4, 5, 6, 7, 8, 9, 10]})
df["x"] = df["x"].fillna(df["x"].mean())  # usa TODO el dataset, incluyendo lo que será test

train, test = train_test_split(df, test_size=0.3, random_state=0)`,
      explicacion:
        'Aquí se rellenan los valores ausentes usando la media de **todo** el dataset, antes de separar entrenamiento y prueba. Eso significa que información del conjunto de prueba (su contribución a esa media) ya influyó en los datos de entrenamiento: es data leakage. El orden correcto es dividir primero, calcular la media solo con train, y aplicarla a ambos conjuntos.',
    },
    practicaGuiada: {
      id: 'm13-l4-practica',
      enunciado:
        'Divide `df` en train/test con `train_test_split(df, test_size=0.3, random_state=0)` ANTES de calcular ninguna estadística. Imprime `len(train)`.',
      codigoInicial: `import pandas as pd\nfrom sklearn.model_selection import train_test_split\n\ndf = pd.DataFrame({"x": list(range(10))})\nprint(0)`,
      solucion: `import pandas as pd\nfrom sklearn.model_selection import train_test_split\n\ndf = pd.DataFrame({"x": list(range(10))})\ntrain, test = train_test_split(df, test_size=0.3, random_state=0)\nprint(len(train))`,
      pistas: ['`train_test_split(df, test_size=0.3, random_state=0)` devuelve dos DataFrames.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '7'
        return { ok, mensaje: ok ? 'Correcto: 70% de 10 filas son 7.' : 'El resultado esperado es 7.' }
      },
    },
    reto: {
      id: 'm13-l4-reto',
      enunciado:
        'Corrige el siguiente flujo con data leakage: primero divide `df` en train/test, luego calcula la media de "x" **solo** con `train`, e imprímela redondeada a 2 decimales.',
      codigoInicial: `import pandas as pd\nfrom sklearn.model_selection import train_test_split\n\ndf = pd.DataFrame({"x": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]})\n# divide primero, luego calcula la media SOLO con el conjunto de entrenamiento`,
      solucion: `import pandas as pd\nfrom sklearn.model_selection import train_test_split\n\ndf = pd.DataFrame({"x": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]})\ntrain, test = train_test_split(df, test_size=0.3, random_state=0)\nmedia_train = train["x"].mean()\nprint(round(media_train, 2))`,
      pistas: ['Divide con `train_test_split` antes de calcular `.mean()`.', 'Calcula la media solo sobre `train["x"]`, nunca sobre `df["x"]` completo.'],
      validar: (stdout) => {
        const valor = parseFloat(stdout.trim())
        const ok = !Number.isNaN(valor)
        return { ok, mensaje: ok ? 'Correcto: calculaste la media sin usar información del conjunto de prueba.' : 'Debe imprimir un número (la media del conjunto de entrenamiento).' }
      },
    },
    verificacion: [
      {
        id: 'm13-l4-q1',
        pregunta: '¿Cuál es la regla general para evitar data leakage al preparar datos?',
        opciones: [
          'Usar siempre todo el dataset para mayor precisión',
          'Dividir train/test primero, y calcular cualquier estadística de preparación solo con el conjunto de entrenamiento',
          'No dividir nunca los datos',
          'Usar solo datos de prueba para las estadísticas',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Cualquier estadística usada para preparar los datos (media, escalado, imputación) debe derivarse únicamente del conjunto de entrenamiento.',
      },
    ],
    resumen: [
      'Data leakage: cuando información del conjunto de prueba (o del futuro) se filtra hacia el entrenamiento.',
      'Regla de oro: divide primero, calcula estadísticas de preparación solo con train, aplica igual a test.',
      'Un Pipeline (visto en Fundamentos de Machine Learning) ayuda a evitar leakage automáticamente al encapsular estos pasos.',
    ],
    proximoPaso:
      'Con los datos bien preparados, en el siguiente módulo nos enfocamos en aprendizaje supervisado: regresión y clasificación con métricas específicas.',
    conceptos: ['data-leakage'],
  },
]
