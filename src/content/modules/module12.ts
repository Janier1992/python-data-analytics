import type { Lesson } from '../../types'

export const module12Lessons: Lesson[] = [
  {
    id: 'm12-l1',
    moduloId: 'modulo-12',
    titulo: 'Train/test split: la base de la generalización',
    objetivo: 'Entender por qué se divide un dataset en entrenamiento y prueba, y aplicarlo con scikit-learn.',
    porQueImporta:
      'Un modelo que solo "memoriza" los datos que vio no sirve para predecir casos nuevos. Separar datos de entrenamiento y prueba es la única forma honesta de saber si un modelo realmente generaliza.',
    concepto: `\`\`\`python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
\`\`\`

- \`X\`: las *features* (variables de entrada).
- \`y\`: el *target* (lo que queremos predecir).
- \`test_size=0.2\`: 20% de los datos se reserva para evaluar, nunca se usa para entrenar.
- \`random_state\`: fija la "semilla" aleatoria para que el split sea reproducible.

El modelo **nunca** debe ver los datos de prueba durante el entrenamiento — si lo hace, su evaluación queda contaminada y deja de ser confiable.`,
    ejemploMinimo: `from sklearn.model_selection import train_test_split

X = [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]]
y = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(len(X_train), len(X_test))`,
    ejemploAplicado: `from sklearn.model_selection import train_test_split

precios = [[50], [60], [70], [80], [90], [100], [110], [120], [130], [140]]
ventas = [30, 28, 25, 24, 20, 18, 16, 15, 12, 10]

X_train, X_test, y_train, y_test = train_test_split(precios, ventas, test_size=0.3, random_state=0)
print(f"Entrenamiento: {len(X_train)} filas, Prueba: {len(X_test)} filas")`,
    errorFrecuente: {
      codigo: `from sklearn.model_selection import train_test_split

X = [[1], [2], [3]]
y = [10, 20, 30]

X_train, y_train, X_test, y_test = train_test_split(X, y, test_size=0.3)`,
      explicacion:
        '`train_test_split` siempre devuelve en el orden `X_train, X_test, y_train, y_test`. Asignar las variables en otro orden (como aquí) no lanza un error inmediato, pero mezcla silenciosamente features con targets equivocados, arruinando cualquier entrenamiento posterior.',
    },
    practicaGuiada: {
      id: 'm12-l1-practica',
      enunciado:
        'Divide `X` e `y` con `test_size=0.2` y `random_state=42`. Imprime `len(X_test)`.',
      codigoInicial: `from sklearn.model_selection import train_test_split\n\nX = [[i] for i in range(10)]\ny = [i * 2 for i in range(10)]\nprint(0)`,
      solucion: `from sklearn.model_selection import train_test_split\n\nX = [[i] for i in range(10)]\ny = [i * 2 for i in range(10)]\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nprint(len(X_test))`,
      pistas: ['`train_test_split(X, y, test_size=0.2, random_state=42)` devuelve 4 valores en ese orden.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: 20% de 10 filas son 2.' : 'El resultado esperado es 2.' }
      },
    },
    reto: {
      id: 'm12-l1-reto',
      enunciado:
        'Dado un dataset de 20 observaciones, haz el split con `test_size=0.25` y `random_state=1`, e imprime la proporción de datos de entrenamiento con `len(X_train) / 20`.',
      codigoInicial: `from sklearn.model_selection import train_test_split\n\nX = [[i] for i in range(20)]\ny = [i for i in range(20)]\n# haz el split e imprime la proporción de entrenamiento`,
      solucion: `from sklearn.model_selection import train_test_split\n\nX = [[i] for i in range(20)]\ny = [i for i in range(20)]\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)\nprint(len(X_train) / 20)`,
      pistas: ['Con `test_size=0.25` sobre 20 filas, el entrenamiento debe quedar con 15 filas.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.75'
        return { ok, mensaje: ok ? 'Correcto: 75% de los datos quedó para entrenamiento.' : 'El resultado esperado es 0.75.' }
      },
    },
    verificacion: [
      {
        id: 'm12-l1-q1',
        pregunta: '¿Por qué nunca se debe entrenar un modelo con los datos de prueba?',
        opciones: [
          'Porque scikit-learn no lo permite técnicamente',
          'Porque contaminaría la evaluación: el modelo parecería mejor de lo que realmente es al predecir',
          'Porque es más lento',
          'No hay ningún problema en hacerlo',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Si el modelo ve los datos de prueba durante el entrenamiento, su buen desempeño en esos datos ya no prueba que generalice a datos nuevos.',
      },
    ],
    resumen: [
      '`train_test_split(X, y, test_size, random_state)` separa datos de entrenamiento y prueba.',
      'El orden de retorno siempre es `X_train, X_test, y_train, y_test`.',
      '`random_state` fija la aleatoriedad para resultados reproducibles.',
    ],
    proximoPaso: 'Con los datos ya divididos, entrenamos tu primer modelo de machine learning.',
    conceptos: ['train-test-split', 'generalizacion'],
  },
  {
    id: 'm12-l2',
    moduloId: 'modulo-12',
    titulo: 'Tu primer modelo: regresión lineal',
    objetivo: 'Entrenar y usar un modelo de regresión lineal con scikit-learn siguiendo el patrón fit/predict.',
    porQueImporta:
      'La regresión lineal es el modelo más simple de machine learning, y su patrón de uso (`fit` para entrenar, `predict` para predecir) es el mismo que usarás con modelos mucho más complejos después.',
    concepto: `Todo modelo de scikit-learn sigue el mismo patrón:

\`\`\`python
from sklearn.linear_model import LinearRegression

modelo = LinearRegression()
modelo.fit(X_train, y_train)          # entrena con los datos de entrenamiento
predicciones = modelo.predict(X_test)  # predice sobre datos nuevos
\`\`\`

\`.fit()\` ajusta los parámetros internos del modelo a los datos de entrenamiento. \`.predict()\` usa esos parámetros aprendidos para generar predicciones sobre datos que el modelo no vio durante el entrenamiento.`,
    ejemploMinimo: `from sklearn.linear_model import LinearRegression

X = [[1], [2], [3], [4]]
y = [2, 4, 6, 8]

modelo = LinearRegression()
modelo.fit(X, y)
print(modelo.predict([[5]]))`,
    ejemploAplicado: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

horas_estudio = [[1], [2], [3], [4], [5], [6], [7], [8]]
calificacion = [50, 55, 65, 70, 78, 85, 88, 95]

X_train, X_test, y_train, y_test = train_test_split(horas_estudio, calificacion, test_size=0.25, random_state=0)

modelo = LinearRegression()
modelo.fit(X_train, y_train)
prediccion = modelo.predict([[6.5]])
print(round(prediccion[0], 1))`,
    errorFrecuente: {
      codigo: `from sklearn.linear_model import LinearRegression

modelo = LinearRegression()
prediccion = modelo.predict([[5]])`,
      explicacion:
        'Llamar a `.predict()` antes de `.fit()` lanza `NotFittedError`. El modelo necesita aprender de datos de entrenamiento antes de poder predecir nada.',
    },
    practicaGuiada: {
      id: 'm12-l2-practica',
      enunciado: 'Entrena un `LinearRegression()` con `X` e `y`, y predice para `[[10]]`. Imprime la predicción redondeada con `round(pred[0])`.',
      codigoInicial: `from sklearn.linear_model import LinearRegression\n\nX = [[1], [2], [3], [4]]\ny = [10, 20, 30, 40]\nmodelo = LinearRegression()\n# entrena el modelo y predice para [[10]]\nprint(0)`,
      solucion: `from sklearn.linear_model import LinearRegression\n\nX = [[1], [2], [3], [4]]\ny = [10, 20, 30, 40]\nmodelo = LinearRegression()\nmodelo.fit(X, y)\npred = modelo.predict([[10]])\nprint(round(pred[0]))`,
      pistas: ['Llama a `modelo.fit(X, y)` antes de `modelo.predict(...)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '100'
        return { ok, mensaje: ok ? 'Correcto: el patrón es y = 10x, así que para x=10, y=100.' : 'El resultado esperado es 100.' }
      },
    },
    reto: {
      id: 'm12-l2-reto',
      enunciado:
        'Entrena un modelo con `anios_experiencia` y `salario`. Predice el salario para 6 años de experiencia e imprímelo redondeado a 0 decimales.',
      codigoInicial: `from sklearn.linear_model import LinearRegression\n\nanios_experiencia = [[1], [2], [3], [4], [5]]\nsalario = [2000, 2400, 2800, 3200, 3600]\n# entrena el modelo y predice para 6 años de experiencia`,
      solucion: `from sklearn.linear_model import LinearRegression\n\nanios_experiencia = [[1], [2], [3], [4], [5]]\nsalario = [2000, 2400, 2800, 3200, 3600]\nmodelo = LinearRegression()\nmodelo.fit(anios_experiencia, salario)\npred = modelo.predict([[6]])\nprint(round(pred[0]))`,
      pistas: ['El patrón es salario = 1600 + 400 * años, así que para 6 años el resultado debería ser 4000.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '4000'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 4000.' }
      },
    },
    verificacion: [
      {
        id: 'm12-l2-q1',
        pregunta: '¿Qué hace el método `.fit()` de un modelo de scikit-learn?',
        opciones: [
          'Genera predicciones nuevas',
          'Ajusta los parámetros internos del modelo usando los datos de entrenamiento',
          'Elimina valores ausentes',
          'Divide los datos en train/test',
        ],
        respuestaCorrecta: 1,
        explicacion: '`.fit()` es el paso de entrenamiento: el modelo aprende los parámetros que mejor se ajustan a los datos de entrenamiento.',
      },
    ],
    resumen: [
      'Todo modelo de scikit-learn sigue el patrón `fit()` (entrenar) y `predict()` (predecir).',
      '`LinearRegression()` ajusta una línea recta que minimiza el error entre predicciones y valores reales.',
      'Llamar `.predict()` antes de `.fit()` lanza un error: el modelo debe entrenarse primero.',
    ],
    proximoPaso: 'Ahora aprenderás a medir qué tan bueno es un modelo, y a distinguir overfitting de underfitting.',
    conceptos: ['scikit-learn', 'regresion-lineal', 'fit-predict'],
  },
  {
    id: 'm12-l3',
    moduloId: 'modulo-12',
    titulo: 'Evaluar un modelo: overfitting y underfitting',
    objetivo: 'Calcular el error de un modelo y reconocer la diferencia entre overfitting y underfitting.',
    porQueImporta:
      'Un modelo con buen desempeño en los datos de entrenamiento pero malo en los de prueba está "memorizando" en vez de "aprendiendo" — overfitting. Detectarlo es esencial antes de confiar en cualquier modelo.',
    concepto: `\`\`\`python
from sklearn.metrics import mean_absolute_error

mae_train = mean_absolute_error(y_train, modelo.predict(X_train))
mae_test = mean_absolute_error(y_test, modelo.predict(X_test))
\`\`\`

- **Underfitting**: el modelo es demasiado simple; le va mal tanto en entrenamiento como en prueba.
- **Overfitting**: el modelo "memorizó" el entrenamiento (error bajo ahí) pero le va mal en datos nuevos (error alto en prueba).
- **Buen ajuste**: el error en entrenamiento y en prueba es similar y razonablemente bajo.

Comparar \`mae_train\` vs \`mae_test\` es la forma más directa de diagnosticar cuál de estos tres escenarios tienes.`,
    ejemploMinimo: `from sklearn.metrics import mean_absolute_error

y_real = [10, 20, 30]
y_pred = [12, 18, 33]
print(round(mean_absolute_error(y_real, y_pred), 2))`,
    ejemploAplicado: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

X = [[i] for i in range(1, 21)]
y = [i * 3 + 5 for i in range(1, 21)]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1)

modelo = LinearRegression()
modelo.fit(X_train, y_train)

mae_train = mean_absolute_error(y_train, modelo.predict(X_train))
mae_test = mean_absolute_error(y_test, modelo.predict(X_test))

print(f"Error en train: {mae_train:.2f}, Error en test: {mae_test:.2f}")`,
    errorFrecuente: {
      codigo: `from sklearn.metrics import mean_absolute_error

y_train_real = [10, 20, 30]
predicciones_test = [11, 21, 29]
error = mean_absolute_error(y_train_real, predicciones_test)`,
      explicacion:
        'Comparar valores reales de **entrenamiento** contra predicciones de **prueba** no tiene sentido: son de conjuntos distintos. Siempre compara `y_train` con predicciones sobre `X_train`, y `y_test` con predicciones sobre `X_test`, por separado.',
    },
    practicaGuiada: {
      id: 'm12-l3-practica',
      enunciado: 'Calcula el error absoluto medio (MAE) entre `y_real` y `y_pred` con `mean_absolute_error`, redondeado a 2 decimales.',
      codigoInicial: `from sklearn.metrics import mean_absolute_error\n\ny_real = [100, 200, 300]\ny_pred = [110, 190, 310]\nprint(0)`,
      solucion: `from sklearn.metrics import mean_absolute_error\n\ny_real = [100, 200, 300]\ny_pred = [110, 190, 310]\nprint(round(mean_absolute_error(y_real, y_pred), 2))`,
      pistas: ['`mean_absolute_error(y_real, y_pred)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '10.0'
        return { ok, mensaje: ok ? 'Correcto: el error promedio es 10.' : 'El resultado esperado es 10.0.' }
      },
    },
    reto: {
      id: 'm12-l3-reto',
      enunciado:
        'Entrena un modelo sobre el `X_train`/`y_train` dado, calcula `mae_train` y `mae_test`, e imprime `True` si `mae_test` es más del doble de `mae_train` (señal de posible overfitting), o `False` en otro caso.',
      codigoInicial: `from sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error\n\nX_train = [[1], [2], [3], [4], [5], [6]]\ny_train = [10, 20, 30, 40, 50, 60]\nX_test = [[7], [8]]\ny_test = [90, 200]\n# entrena, calcula ambos errores, compara`,
      solucion: `from sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error\n\nX_train = [[1], [2], [3], [4], [5], [6]]\ny_train = [10, 20, 30, 40, 50, 60]\nX_test = [[7], [8]]\ny_test = [90, 200]\nmodelo = LinearRegression()\nmodelo.fit(X_train, y_train)\nmae_train = mean_absolute_error(y_train, modelo.predict(X_train))\nmae_test = mean_absolute_error(y_test, modelo.predict(X_test))\nprint(mae_test > mae_train * 2)`,
      pistas: ['Calcula `mae_train` y `mae_test` por separado.', 'Compara `mae_test > mae_train * 2`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'True'
        return { ok, mensaje: ok ? 'Correcto: el error en test es mucho mayor, señal de que el patrón cambió fuera del rango de entrenamiento.' : 'El resultado esperado es True.' }
      },
    },
    verificacion: [
      {
        id: 'm12-l3-q1',
        pregunta: '¿Qué indica un error muy bajo en entrenamiento pero muy alto en prueba?',
        opciones: ['Underfitting', 'Overfitting', 'Que el modelo es perfecto', 'Que hay un error de código obligatoriamente'],
        respuestaCorrecta: 1,
        explicacion: 'Esa combinación es la firma clásica de overfitting: el modelo memorizó el entrenamiento pero no generaliza a datos nuevos.',
      },
    ],
    resumen: [
      'Comparar el error en entrenamiento vs. prueba es la forma estándar de diagnosticar un modelo.',
      'Overfitting: error bajo en train, alto en test. Underfitting: error alto en ambos.',
      '`mean_absolute_error(y_real, y_pred)` es una métrica simple e interpretable del error de un modelo de regresión.',
    ],
    proximoPaso: 'Cerramos el módulo construyendo un pipeline simple que combine preprocesamiento y modelo en un solo paso.',
    conceptos: ['overfitting', 'underfitting', 'mae'],
  },
  {
    id: 'm12-l4',
    moduloId: 'modulo-12',
    titulo: 'Pipelines: preprocesamiento + modelo en un solo paso',
    objetivo: 'Construir un Pipeline de scikit-learn que combine escalado de datos y modelo, evitando errores de orden y fuga de información.',
    porQueImporta:
      'En proyectos reales casi nunca usas un modelo "solo": necesitas escalar, codificar variables, etc. Un Pipeline empaqueta todo eso en un solo objeto reproducible, evitando errores comunes.',
    concepto: `\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

pipeline = Pipeline([
    ("escalado", StandardScaler()),
    ("modelo", LinearRegression()),
])

pipeline.fit(X_train, y_train)
predicciones = pipeline.predict(X_test)
\`\`\`

El pipeline aplica cada paso en orden, tanto al entrenar (\`fit\`) como al predecir (\`predict\`), garantizando que el escalado se calcule **solo** con datos de entrenamiento y se aplique consistentemente a los datos de prueba — evitando una fuga de información (data leakage) sutil pero común.`,
    ejemploMinimo: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

pipeline = Pipeline([("escalado", StandardScaler()), ("modelo", LinearRegression())])
X = [[1], [2], [3], [4]]
y = [10, 20, 30, 40]
pipeline.fit(X, y)
print(round(pipeline.predict([[5]])[0]))`,
    ejemploAplicado: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

X = [[i] for i in range(1, 21)]
y = [i * 100 + 50 for i in range(1, 21)]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

pipeline = Pipeline([
    ("escalado", StandardScaler()),
    ("modelo", LinearRegression()),
])
pipeline.fit(X_train, y_train)
print(round(pipeline.score(X_test, y_test), 3))`,
    errorFrecuente: {
      codigo: `from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

X = [[1], [2], [3]]
y = [10, 20, 30]

escalador = StandardScaler()
X_escalado = escalador.fit_transform(X)

modelo = LinearRegression()
modelo.fit(X, y)  # ¡usó X sin escalar!
print(modelo.predict(X_escalado[:1]))`,
      explicacion:
        'Al hacer el escalado y el modelo por separado, es fácil cometer el error de entrenar el modelo con los datos **sin escalar** pero predecir con datos **escalados** (o viceversa), dando resultados sin sentido. Un `Pipeline` elimina este riesgo al aplicar siempre los mismos pasos, en el mismo orden, automáticamente.',
    },
    practicaGuiada: {
      id: 'm12-l4-practica',
      enunciado:
        'Completa el `Pipeline` con los pasos `("escalado", StandardScaler())` y `("modelo", LinearRegression())`, entrena con `X`, `y`, y predice para `[[5]]` imprimiendo el valor redondeado.',
      codigoInicial: `from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\n\nX = [[1], [2], [3], [4]]\ny = [100, 200, 300, 400]\npipeline = Pipeline([])\n# agrega los pasos, entrena y predice\nprint(0)`,
      solucion: `from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\n\nX = [[1], [2], [3], [4]]\ny = [100, 200, 300, 400]\npipeline = Pipeline([("escalado", StandardScaler()), ("modelo", LinearRegression())])\npipeline.fit(X, y)\nprint(round(pipeline.predict([[5]])[0]))`,
      pistas: ['`Pipeline([("escalado", StandardScaler()), ("modelo", LinearRegression())])`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '500'
        return { ok, mensaje: ok ? 'Correcto: el patrón es y = 100x.' : 'El resultado esperado es 500.' }
      },
    },
    reto: {
      id: 'm12-l4-reto',
      enunciado:
        'Construye un pipeline con `StandardScaler` y `LinearRegression`, entrena con `X_train`/`y_train`, y usa `.score(X_test, y_test)` (R², más cercano a 1 es mejor) para imprimir el resultado redondeado a 2 decimales.',
      codigoInicial: `from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\n\nX_train = [[1], [2], [3], [4], [5], [6], [7], [8]]\ny_train = [10, 20, 30, 40, 50, 60, 70, 80]\nX_test = [[9], [10]]\ny_test = [90, 100]\n# construye el pipeline, entrena, evalúa con .score()`,
      solucion: `from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\n\nX_train = [[1], [2], [3], [4], [5], [6], [7], [8]]\ny_train = [10, 20, 30, 40, 50, 60, 70, 80]\nX_test = [[9], [10]]\ny_test = [90, 100]\npipeline = Pipeline([("escalado", StandardScaler()), ("modelo", LinearRegression())])\npipeline.fit(X_train, y_train)\nprint(round(pipeline.score(X_test, y_test), 2))`,
      pistas: ['`.score()` en un modelo de regresión devuelve el coeficiente R².', 'Con una relación perfectamente lineal, el R² debería dar 1.0.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1.0'
        return { ok, mensaje: ok ? 'Correcto: R²=1.0 indica un ajuste perfecto a esta relación lineal.' : 'El resultado esperado es 1.0.' }
      },
    },
    verificacion: [
      {
        id: 'm12-l4-q1',
        pregunta: '¿Qué problema previene principalmente el uso de un Pipeline?',
        opciones: [
          'Que el modelo tarde más en entrenar',
          'Aplicar pasos de preprocesamiento de forma inconsistente entre entrenamiento y predicción (fuga de información)',
          'Que el código sea más corto únicamente',
          'No previene ningún problema real',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Un Pipeline garantiza que los mismos pasos de preprocesamiento se apliquen exactamente igual en entrenamiento y en predicción.',
      },
    ],
    resumen: [
      'Un `Pipeline` encadena pasos de preprocesamiento y modelo en un solo objeto.',
      'Previene errores de orden/inconsistencia entre cómo se transforman los datos de entrenamiento y de prueba.',
      '`.score()` en modelos de regresión de scikit-learn devuelve R² por defecto (1.0 es ajuste perfecto).',
    ],
    proximoPaso:
      'En el siguiente módulo veremos ingeniería de características: cómo preparar variables categóricas y prevenir el data leakage de forma más general.',
    conceptos: ['pipeline', 'standardscaler'],
  },
]
