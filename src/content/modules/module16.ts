import type { Lesson } from '../../types'

export const module16Lessons: Lesson[] = [
  {
    id: 'm16-l1',
    moduloId: 'modulo-16',
    titulo: 'Series temporales con pandas: índice de fechas, resample y ventanas móviles',
    objetivo: 'Trabajar una serie temporal con DatetimeIndex, agregarla por periodos con resample y suavizarla con rolling.',
    porQueImporta:
      'Ventas diarias, tráfico web, sensores, precios: una enorme parte de los datos del mundo real son series en el tiempo. Aquí el orden de las filas es información, y las herramientas de pandas para fechas te ahorran muchísimo código.',
    concepto: `\`\`\`python
import pandas as pd

serie = pd.Series(valores, index=pd.date_range("2024-01-01", periods=n, freq="D"))

serie.resample("W").sum()      # agrega por semana
serie.rolling(3).mean()        # media móvil de 3 periodos
serie.shift(1)                 # desplaza un periodo hacia adelante
\`\`\`

Cuando el índice de un \`Series\` o \`DataFrame\` es de tipo fecha (\`DatetimeIndex\`), pandas entiende el tiempo:

- **\`pd.date_range(inicio, periods=n, freq="D")\`** crea fechas consecutivas (\`"D"\` = día, \`"W"\` = semana, \`"h"\` = hora).
- **\`resample("W")\`** agrupa por periodos de tiempo, igual que un \`groupby\` pero por calendario. Se encadena con \`.sum()\`, \`.mean()\`, etc. Con \`"W"\` las semanas terminan en domingo.
- **\`rolling(k).mean()\`** calcula la media de una ventana de los últimos k puntos. Suaviza el ruido para ver la tendencia. Los primeros k-1 valores son \`NaN\` porque aún no hay suficientes datos.
- **\`shift(n)\`** mueve los valores n posiciones; la base para construir rezagos (lags) en las próximas lecciones.

Si tus fechas vienen como texto, conviértelas primero con \`pd.to_datetime(...)\` y colócalas como índice con \`df.set_index("fecha")\`.`,
    ejemploMinimo: `import pandas as pd

ventas = pd.Series([10, 12, 11, 13], index=pd.date_range("2024-01-01", periods=4, freq="D"))
print(ventas.rolling(2).mean().tolist())`,
    ejemploAplicado: `import pandas as pd

ventas = pd.Series(range(1, 15), index=pd.date_range("2024-01-01", periods=14, freq="D"))

semanal = ventas.resample("W").sum()
print("Ventas por semana:", semanal.tolist())
print("Media móvil (3 días), valores 3 a 5:", ventas.rolling(3).mean().iloc[2:5].tolist())`,
    errorFrecuente: {
      codigo: `import pandas as pd

df = pd.DataFrame({"fecha": ["2024-01-01", "2024-01-02"], "ventas": [10, 12]})
df.resample("W").sum()   # TypeError: Only valid with DatetimeIndex...`,
      explicacion:
        '`resample` solo funciona si el índice es de tipo fecha. Si "fecha" es una columna de texto, primero conviértela y úsala como índice: `df["fecha"] = pd.to_datetime(df["fecha"])` y luego `df = df.set_index("fecha")`.',
    },
    practicaGuiada: {
      id: 'm16-l1-practica',
      enunciado:
        'Calcula la media móvil de 3 días con `ventas.rolling(3).mean()` e imprime el valor del tercer día (`.iloc[2]`), el primero que tiene ventana completa.',
      codigoInicial: `import pandas as pd\n\nventas = pd.Series([10, 12, 11, 13, 15, 14, 16], index=pd.date_range("2024-01-01", periods=7, freq="D"))\nprint(0)`,
      solucion: `import pandas as pd\n\nventas = pd.Series([10, 12, 11, 13, 15, 14, 16], index=pd.date_range("2024-01-01", periods=7, freq="D"))\nmedia_movil = ventas.rolling(3).mean()\nprint(media_movil.iloc[2])`,
      pistas: ['`ventas.rolling(3).mean()` devuelve otra serie del mismo tamaño.', 'Los dos primeros valores son NaN; el tercero es (10 + 12 + 11) / 3.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '11.0'
        return { ok, mensaje: ok ? 'Correcto: (10 + 12 + 11) / 3 = 11.0.' : 'El resultado esperado es 11.0.' }
      },
    },
    reto: {
      id: 'm16-l1-reto',
      enunciado:
        'Agrega las ventas diarias por semana con `resample("W").sum()` e imprime el resultado como lista con `.tolist()`.',
      codigoInicial: `import pandas as pd\n\nventas = pd.Series(range(1, 15), index=pd.date_range("2024-01-01", periods=14, freq="D"))\n# agrega por semana e imprime la lista de totales`,
      solucion: `import pandas as pd\n\nventas = pd.Series(range(1, 15), index=pd.date_range("2024-01-01", periods=14, freq="D"))\nprint(ventas.resample("W").sum().tolist())`,
      pistas: ['El 1 de enero de 2024 fue lunes, así que hay dos semanas completas.', '`resample("W")` seguido de `.sum()` y `.tolist()`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '[28, 77]'
        return { ok, mensaje: ok ? 'Correcto: 1+…+7 = 28 y 8+…+14 = 77.' : 'El resultado esperado es [28, 77].' }
      },
    },
    verificacion: [
      {
        id: 'm16-l1-q1',
        pregunta: '¿Para qué sirve una media móvil (`rolling`) en una serie temporal?',
        opciones: [
          'Para ordenar las fechas',
          'Para suavizar el ruido y ver mejor la tendencia',
          'Para eliminar los valores NaN',
          'Para convertir texto en fechas',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Promediar una ventana de puntos consecutivos atenúa las fluctuaciones puntuales y deja ver la dirección general.',
      },
      {
        id: 'm16-l1-q2',
        pregunta: '¿Qué requisito tiene `resample` para funcionar?',
        opciones: [
          'Que la serie tenga más de 100 filas',
          'Que el índice sea de tipo fecha (DatetimeIndex)',
          'Que los valores sean enteros',
          'Que no haya valores repetidos',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Necesita un índice temporal para saber a qué periodo pertenece cada observación.',
      },
    ],
    resumen: [
      'Un índice de tipo fecha (`DatetimeIndex`) activa las herramientas temporales de pandas.',
      '`resample` agrega por periodos del calendario; `rolling` calcula estadísticas sobre ventanas móviles.',
      '`shift` desplaza la serie y es la base de las variables de rezago.',
      'Convierte texto a fecha con `pd.to_datetime` antes de usarlo como índice.',
    ],
    proximoPaso: 'Antes de predecir una serie, hay que aprender a evaluarla bien: la validación cronológica.',
    conceptos: ['series-temporales', 'resample', 'rolling', 'datetimeindex'],
  },
  {
    id: 'm16-l2',
    moduloId: 'modulo-16',
    titulo: 'Validación temporal: nunca mezcles el futuro con el pasado',
    objetivo: 'Dividir datos temporales de forma cronológica y usar TimeSeriesSplit en lugar de un split aleatorio.',
    porQueImporta:
      'En producción solo conoces el pasado y predices el futuro. Si en la evaluación mezclas filas al azar, el modelo "ve" datos posteriores a los que debe predecir (data leakage temporal) y tus métricas serán demasiado optimistas.',
    concepto: `\`\`\`python
# Split cronológico manual
corte = int(len(df) * 0.8)
train = df.iloc[:corte]
test = df.iloc[corte:]

# Validación cruzada que respeta el orden
from sklearn.model_selection import TimeSeriesSplit
for idx_train, idx_test in TimeSeriesSplit(n_splits=3).split(df):
    ...
\`\`\`

Reglas para datos temporales:

1. **Nunca uses \`shuffle=True\`** (ni el \`train_test_split\` por defecto) con series temporales.
2. El conjunto de **prueba siempre es posterior** al de entrenamiento: entrena con lo antiguo, evalúa con lo reciente.
3. **\`TimeSeriesSplit\`** es la versión de validación cruzada para series: cada pliegue entrena con todo lo anterior a su bloque de prueba, y el bloque de entrenamiento va **creciendo**:

\`\`\`
pliegue 1: train [0 1 2 3]            test [4 5]
pliegue 2: train [0 1 2 3 4 5]        test [6 7]
pliegue 3: train [0 1 2 3 4 5 6 7]    test [8 9]
\`\`\`

Nunca se entrena con datos más recientes que los de prueba. Puedes pasarlo como \`cv=\` a \`cross_val_score\`.`,
    ejemploMinimo: `valores = list(range(10))
corte = int(len(valores) * 0.8)
print(valores[:corte], valores[corte:])`,
    ejemploAplicado: `from sklearn.model_selection import TimeSeriesSplit

for numero, (idx_train, idx_test) in enumerate(TimeSeriesSplit(n_splits=3).split(range(10)), start=1):
    print("Pliegue", numero, "-> train:", idx_train.tolist(), "test:", idx_test.tolist())`,
    errorFrecuente: {
      codigo: `from sklearn.model_selection import train_test_split

# ventas ordenadas por fecha
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
# mezcla al azar: el modelo entrena con días POSTERIORES a los que evalúa`,
      explicacion:
        '`train_test_split` mezcla las filas por defecto. Con series temporales, esto filtra información del futuro hacia el entrenamiento y las métricas no reflejan el rendimiento real. Usa un corte cronológico (`iloc[:corte]` / `iloc[corte:]`) o `train_test_split(..., shuffle=False)`.',
    },
    practicaGuiada: {
      id: 'm16-l2-practica',
      enunciado:
        'Divide `ventas` de forma cronológica: 80% para entrenar y 20% para probar, usando `iloc`. Imprime `len(train)` y `len(test)` en una sola línea separados por espacio: `print(len(train), len(test))`.',
      codigoInicial: `import pandas as pd\n\nventas = pd.Series(range(10), index=pd.date_range("2024-01-01", periods=10, freq="D"))\nprint(0, 0)`,
      solucion: `import pandas as pd\n\nventas = pd.Series(range(10), index=pd.date_range("2024-01-01", periods=10, freq="D"))\ncorte = int(len(ventas) * 0.8)\ntrain = ventas.iloc[:corte]\ntest = ventas.iloc[corte:]\nprint(len(train), len(test))`,
      pistas: ['`corte = int(len(ventas) * 0.8)` da la posición de corte.', '`ventas.iloc[:corte]` son los primeros datos; `ventas.iloc[corte:]` los últimos.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '8 2'
        return { ok, mensaje: ok ? 'Correcto: se entrena con los 8 primeros días y se prueba con los 2 últimos.' : 'El resultado esperado es "8 2".' }
      },
    },
    reto: {
      id: 'm16-l2-reto',
      enunciado:
        'Recorre `TimeSeriesSplit(n_splits=3).split(range(10))` y, al terminar el bucle, imprime cuántos datos tuvo el conjunto de entrenamiento del **último** pliegue (`len(idx_train)`).',
      codigoInicial: `from sklearn.model_selection import TimeSeriesSplit\n\nfor idx_train, idx_test in TimeSeriesSplit(n_splits=3).split(range(10)):\n    pass\n# imprime el tamaño del entrenamiento del último pliegue`,
      solucion: `from sklearn.model_selection import TimeSeriesSplit\n\nfor idx_train, idx_test in TimeSeriesSplit(n_splits=3).split(range(10)):\n    pass\nprint(len(idx_train))`,
      pistas: ['Tras el bucle, `idx_train` conserva el valor de la última iteración.', 'El último pliegue entrena con todo lo anterior a sus 2 datos de prueba.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '8'
        return { ok, mensaje: ok ? 'Correcto: el último pliegue entrena con 8 datos y prueba con los 2 finales.' : 'El resultado esperado es 8.' }
      },
    },
    verificacion: [
      {
        id: 'm16-l2-q1',
        pregunta: '¿Por qué es un error usar `train_test_split` con mezcla aleatoria en una serie temporal?',
        opciones: [
          'Porque es más lento',
          'Porque el modelo puede entrenar con datos posteriores a los que evalúa, inflando las métricas',
          'Porque pandas lo prohíbe',
          'Porque elimina las fechas',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Mezclar rompe el orden temporal y filtra información del futuro al entrenamiento (leakage temporal).',
      },
      {
        id: 'm16-l2-q2',
        pregunta: 'En `TimeSeriesSplit`, ¿cómo evoluciona el conjunto de entrenamiento entre pliegues?',
        opciones: [
          'Es siempre del mismo tamaño y aleatorio',
          'Crece, incluyendo siempre todo lo anterior al bloque de prueba',
          'Se reduce en cada pliegue',
          'Contiene datos futuros',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Cada pliegue entrena con todo el pasado disponible hasta el inicio de su bloque de prueba.',
      },
    ],
    resumen: [
      'En series temporales el test siempre debe ser posterior al entrenamiento.',
      'No uses mezcla aleatoria; corta por posición con `iloc` o usa `shuffle=False`.',
      '`TimeSeriesSplit` hace validación cruzada respetando el orden, con entrenamiento creciente.',
    ],
    proximoPaso: 'Ahora construiremos un modelo de pronóstico con variables de rezago y lo compararemos con una línea base.',
    conceptos: ['validacion-temporal', 'timeseriessplit', 'leakage-temporal'],
  },
  {
    id: 'm16-l3',
    moduloId: 'modulo-16',
    titulo: 'Pronóstico con variables de rezago y línea base',
    objetivo: 'Crear variables de rezago con shift, entrenar un modelo para predecir el siguiente valor y compararlo contra una línea base ingenua.',
    porQueImporta:
      'Un modelo de pronóstico solo vale algo si supera la alternativa más simple: "mañana será igual que hoy". Sin esa comparación no sabes si tu modelo aporta valor o solo complica el sistema.',
    concepto: `\`\`\`python
df["lag_1"] = df["ventas"].shift(1)   # valor de ayer
df["lag_2"] = df["ventas"].shift(2)   # valor de antier
df = df.dropna()                      # las primeras filas quedan sin rezago
\`\`\`

La idea para convertir una serie en un problema de aprendizaje supervisado: **usar valores pasados como features y el valor actual como objetivo**.

- \`shift(k)\` genera la variable de rezago k. Las primeras k filas quedan \`NaN\` y se eliminan con \`dropna()\`.
- Con \`X = lag_1\` y \`y = valor actual\`, cualquier modelo de regresión (\`LinearRegression\`, árboles…) puede aprender a pronosticar.
- Solo puedes usar rezagos **≥ 1**: usar el valor del mismo instante sería hacer trampa, pues no lo conoces al predecir.

**Línea base ingenua (naive)**: predecir que el siguiente valor es igual al anterior. Es lo mínimo que tu modelo debe superar:

\`\`\`python
y_pred_ingenuo = serie.shift(1)
mae_base = (serie - y_pred_ingenuo).abs().mean()
\`\`\`

Si tu modelo no mejora el MAE de la línea base, no hace falta: usa la regla simple. Recuerda además evaluar con un corte cronológico (lección anterior).`,
    ejemploMinimo: `import pandas as pd

serie = pd.Series([10, 12, 11, 13])
print(serie.shift(1).tolist())`,
    ejemploAplicado: `import pandas as pd
from sklearn.linear_model import LinearRegression

# Tendencia lineal: sube 2 unidades por periodo
y = pd.Series([10, 12, 14, 16, 18, 20, 22, 24])

X = [[v] for v in y[:-1]]   # valor del periodo anterior
objetivo = y[1:]            # valor actual

modelo = LinearRegression().fit(X, objetivo)
print("Pronóstico tras 24:", round(modelo.predict([[24]])[0]))`,
    errorFrecuente: {
      codigo: `df["ventas_hoy"] = df["ventas"]          # mismo instante
modelo.fit(df[["ventas_hoy"]], df["ventas"])
# R² = 1.0: "¡modelo perfecto!"`,
      explicacion:
        'Usar el valor actual como feature para predecir el valor actual es leakage puro: el modelo "acierta" copiando la respuesta. Las features de una serie deben usar solo información disponible **antes** del instante a predecir (rezagos con `shift(k)`, k ≥ 1).',
    },
    practicaGuiada: {
      id: 'm16-l3-practica',
      enunciado:
        'Entrena una `LinearRegression` con `X` (valor del periodo anterior) e `objetivo` (valor actual) y predice el siguiente valor tras 24. Imprímelo redondeado con `round(...)`.',
      codigoInicial: `import pandas as pd\nfrom sklearn.linear_model import LinearRegression\n\ny = pd.Series([10, 12, 14, 16, 18, 20, 22, 24])\nX = [[v] for v in y[:-1]]\nobjetivo = y[1:]\nprint(0)`,
      solucion: `import pandas as pd\nfrom sklearn.linear_model import LinearRegression\n\ny = pd.Series([10, 12, 14, 16, 18, 20, 22, 24])\nX = [[v] for v in y[:-1]]\nobjetivo = y[1:]\nmodelo = LinearRegression().fit(X, objetivo)\nprint(round(modelo.predict([[24]])[0]))`,
      pistas: ['`LinearRegression().fit(X, objetivo)` entrena el modelo.', 'La serie sube de 2 en 2: tras 24 viene 26.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '26'
        return { ok, mensaje: ok ? 'Correcto: el modelo aprendió la tendencia.' : 'El resultado esperado es 26.' }
      },
    },
    reto: {
      id: 'm16-l3-reto',
      enunciado:
        'Calcula el MAE de la **línea base ingenua**: el pronóstico de cada día es el valor del día anterior (`serie.shift(1)`). Usa `(serie - serie.shift(1)).abs().mean()` e imprímelo redondeado a 2 decimales.',
      codigoInicial: `import pandas as pd\n\nserie = pd.Series([10, 12, 11, 13, 15, 14, 16])\n# calcula el MAE de la línea base ingenua e imprímelo con 2 decimales`,
      solucion: `import pandas as pd\n\nserie = pd.Series([10, 12, 11, 13, 15, 14, 16])\nmae_base = (serie - serie.shift(1)).abs().mean()\nprint(round(mae_base, 2))`,
      pistas: ['`serie.shift(1)` es el valor del día anterior; el primer día no tiene predicción y `mean()` ignora los NaN.', 'Los errores son 2, 1, 2, 2, 1, 2.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1.67'
        return { ok, mensaje: ok ? 'Correcto: este es el MAE que tu modelo de pronóstico debe superar.' : 'El resultado esperado es 1.67.' }
      },
    },
    verificacion: [
      {
        id: 'm16-l3-q1',
        pregunta: '¿Para qué sirve la línea base ingenua en pronósticos?',
        opciones: [
          'Para reemplazar siempre al modelo',
          'Como referencia mínima: si tu modelo no la supera, no aporta valor',
          'Para limpiar datos faltantes',
          'Para escalar la serie',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Comparar contra "mañana igual que hoy" muestra si la complejidad del modelo se justifica.',
      },
      {
        id: 'm16-l3-q2',
        pregunta: '¿Qué problema tiene usar `shift(0)` (el valor del mismo instante) como feature?',
        opciones: [
          'Ninguno, es la mejor feature',
          'Es data leakage: el modelo copia la respuesta en lugar de predecirla',
          'Genera NaN en todas las filas',
          'Solo funciona con enteros',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Al predecir no conoces el valor del instante actual; solo puedes usar información anterior.',
      },
    ],
    resumen: [
      '`shift(k)` crea variables de rezago; elimina con `dropna()` las filas sin historial.',
      'Convierte la serie en regresión: valores pasados como X, valor actual como y.',
      'Usa solo rezagos ≥ 1 y evalúa con corte cronológico.',
      'Compara siempre contra la línea base ingenua (el valor anterior).',
    ],
    proximoPaso: 'Pasamos del tiempo al texto: cómo convertir palabras en números con bag of words.',
    conceptos: ['lags', 'shift', 'baseline-ingenuo', 'pronostico'],
  },
  {
    id: 'm16-l4',
    moduloId: 'modulo-16',
    titulo: 'NLP básico: convertir texto en números con Bag of Words',
    objetivo: 'Representar texto como una matriz de conteos de palabras con CountVectorizer.',
    porQueImporta:
      'Reseñas, correos, tickets de soporte, comentarios: el texto es el dato más abundante en las empresas. Pero los modelos solo entienden números, así que primero hay que convertirlo.',
    concepto: `\`\`\`python
from sklearn.feature_extraction.text import CountVectorizer

vectorizador = CountVectorizer()
X = vectorizador.fit_transform(textos)

vectorizador.vocabulary_            # palabra -> índice de columna
vectorizador.get_feature_names_out()
X.toarray()                         # matriz densa de conteos
\`\`\`

**Bag of Words** (bolsa de palabras) representa cada documento como un vector de conteos: una columna por cada palabra distinta del vocabulario y, en cada fila, cuántas veces aparece esa palabra en el documento. Se pierde el orden de las palabras, pero se conserva qué palabras hay y con qué frecuencia.

Qué hace \`CountVectorizer\` por ti:
- Pasa todo a **minúsculas** y separa en palabras (tokeniza).
- Construye el **vocabulario** a partir del texto con \`fit\`.
- \`transform\` devuelve una **matriz dispersa** (sparse): como la mayoría de los conteos son 0, solo guarda los no nulos. Usa \`.toarray()\` para verla completa en ejemplos pequeños.

Cuidados:
- Igual que con cualquier preprocesamiento, el vocabulario se aprende (\`fit\`) **solo con entrenamiento**; con datos nuevos usa \`transform\`. Las palabras que no estaban en el vocabulario se ignoran.
- Por defecto ignora palabras de 1 letra y no quita tildes; puedes ajustarlo con \`strip_accents="unicode"\`.
- La matriz puede tener miles de columnas; parámetros como \`min_df\` y \`max_features\` ayudan a limitarlo.`,
    ejemploMinimo: `from sklearn.feature_extraction.text import CountVectorizer

textos = ["python es genial", "me gusta python"]
vectorizador = CountVectorizer().fit(textos)
print(vectorizador.get_feature_names_out().tolist())`,
    ejemploAplicado: `from sklearn.feature_extraction.text import CountVectorizer

textos = ["me gusta python", "python es genial", "me gusta mucho"]

vectorizador = CountVectorizer()
X = vectorizador.fit_transform(textos)

print("Vocabulario:", vectorizador.get_feature_names_out().tolist())
print("Matriz:")
print(X.toarray())`,
    errorFrecuente: {
      codigo: `from sklearn.feature_extraction.text import CountVectorizer

X_train = CountVectorizer().fit_transform(textos_train)
X_test = CountVectorizer().fit_transform(textos_test)   # ¡otro vocabulario!`,
      explicacion:
        'Cada `CountVectorizer` nuevo aprende su propio vocabulario, así que train y test tendrían columnas distintas que no se corresponden. Ajusta un único vectorizador con `fit_transform` sobre entrenamiento y usa `.transform()` (no `fit`) sobre test.',
    },
    practicaGuiada: {
      id: 'm16-l4-practica',
      enunciado:
        'Aplica `CountVectorizer().fit_transform(textos)` e imprime la forma de la matriz con `.shape` (filas = documentos, columnas = palabras distintas).',
      codigoInicial: `from sklearn.feature_extraction.text import CountVectorizer\n\ntextos = ["me gusta python", "python es genial", "me gusta mucho"]\nprint((0, 0))`,
      solucion: `from sklearn.feature_extraction.text import CountVectorizer\n\ntextos = ["me gusta python", "python es genial", "me gusta mucho"]\nX = CountVectorizer().fit_transform(textos)\nprint(X.shape)`,
      pistas: ['Hay 3 documentos.', 'Las palabras distintas son: me, gusta, python, es, genial, mucho.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '(3, 6)'
        return { ok, mensaje: ok ? 'Correcto: 3 documentos y 6 palabras distintas.' : 'El resultado esperado es (3, 6).' }
      },
    },
    reto: {
      id: 'm16-l4-reto',
      enunciado:
        'Cuenta cuántas veces aparece la palabra "python" en total en todos los textos: busca su columna en `vectorizador.vocabulary_["python"]` y suma esa columna de `X.toarray()`. Imprime el resultado como entero con `int(...)`.',
      codigoInicial: `from sklearn.feature_extraction.text import CountVectorizer\n\ntextos = ["me gusta python", "python es genial", "me gusta mucho"]\nvectorizador = CountVectorizer()\nX = vectorizador.fit_transform(textos)\n# suma la columna de "python" e imprime el total`,
      solucion: `from sklearn.feature_extraction.text import CountVectorizer\n\ntextos = ["me gusta python", "python es genial", "me gusta mucho"]\nvectorizador = CountVectorizer()\nX = vectorizador.fit_transform(textos)\ncolumna = vectorizador.vocabulary_["python"]\nprint(int(X.toarray()[:, columna].sum()))`,
      pistas: ['`vectorizador.vocabulary_["python"]` es el índice de la columna.', '`X.toarray()[:, columna]` selecciona esa columna; `.sum()` suma los conteos.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: "python" aparece en 2 documentos.' : 'El resultado esperado es 2.' }
      },
    },
    verificacion: [
      {
        id: 'm16-l4-q1',
        pregunta: '¿Qué información se pierde en una representación Bag of Words?',
        opciones: [
          'La frecuencia de las palabras',
          'El orden de las palabras en el texto',
          'El vocabulario',
          'El número de documentos',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Solo se cuentan las palabras; "perro muerde hombre" y "hombre muerde perro" producen el mismo vector.',
      },
      {
        id: 'm16-l4-q2',
        pregunta: 'Para vectorizar los textos de prueba, ¿qué debes llamar sobre el vectorizador ya ajustado con entrenamiento?',
        opciones: ['`fit_transform`', '`transform`', 'Crear un `CountVectorizer` nuevo', '`fit` sobre los textos de prueba'],
        respuestaCorrecta: 1,
        explicacion: '`transform` reutiliza el vocabulario aprendido en entrenamiento, evitando leakage y columnas desalineadas.',
      },
    ],
    resumen: [
      'Bag of Words convierte cada texto en un vector de conteos de palabras.',
      '`CountVectorizer` pasa a minúsculas, tokeniza y construye el vocabulario con `fit`.',
      'El vocabulario se aprende con entrenamiento; con datos nuevos se usa `transform`.',
      'Se pierde el orden de las palabras, pero se conserva su frecuencia.',
    ],
    proximoPaso: 'Los conteos sobrevaloran palabras comunes. TF-IDF corrige eso, y con él entrenaremos un clasificador de texto.',
    conceptos: ['bag-of-words', 'countvectorizer', 'nlp-basico'],
  },
  {
    id: 'm16-l5',
    moduloId: 'modulo-16',
    titulo: 'TF-IDF y clasificación de texto',
    objetivo: 'Ponderar palabras con TF-IDF y construir un clasificador de texto con un Pipeline.',
    porQueImporta:
      'Clasificar reseñas como positivas o negativas, correos como spam, tickets por tema: son tareas de negocio muy frecuentes. TF-IDF + un modelo lineal es un punto de partida rápido, fuerte y fácil de explicar.',
    concepto: `\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

modelo = make_pipeline(TfidfVectorizer(), LogisticRegression())
modelo.fit(textos_train, etiquetas_train)
modelo.predict(["texto nuevo"])
\`\`\`

**TF-IDF** (frecuencia de término × frecuencia inversa de documento) mejora el simple conteo de palabras:

- **TF**: cuántas veces aparece la palabra en el documento.
- **IDF**: qué tan **rara** es la palabra en toda la colección. Las palabras que aparecen en casi todos los documentos ("el", "de", "que") reciben poco peso; las que distinguen a pocos documentos, mucho.

Así, las palabras informativas pesan más que las palabras de relleno.

\`TfidfVectorizer\` funciona igual que \`CountVectorizer\` (mismo \`fit\`/\`transform\`), pero devuelve pesos TF-IDF normalizados en lugar de conteos.

Para clasificar texto:
1. Vectoriza con \`TfidfVectorizer\`.
2. Entrena un clasificador (\`LogisticRegression\` es una gran primera opción; \`MultinomialNB\` también es clásico para texto).
3. **Mételos juntos en un \`Pipeline\`**: así el vectorizador se ajusta solo con los textos de entrenamiento, y al predecir recibes texto crudo directamente.

Evalúa con las métricas del Módulo 14 (precisión, recall, F1), y recuerda que el desbalance de clases también afecta al texto.`,
    ejemploMinimo: `from sklearn.feature_extraction.text import TfidfVectorizer

textos = ["gato come pescado", "gato duerme", "perro come"]
tfidf = TfidfVectorizer().fit(textos)
print(dict(zip(tfidf.get_feature_names_out().tolist(), tfidf.idf_.round(2).tolist())))`,
    ejemploAplicado: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

textos = ["excelente producto", "me encanta, muy bueno", "buen servicio excelente", "muy bueno y rápido",
          "pésimo servicio", "muy malo, no me gusta", "producto malo y lento", "terrible pésimo"]
etiquetas = [1, 1, 1, 1, 0, 0, 0, 0]   # 1 = positivo, 0 = negativo

modelo = make_pipeline(TfidfVectorizer(), LogisticRegression())
modelo.fit(textos, etiquetas)

nuevos = ["excelente servicio", "servicio lento y malo"]
print(modelo.predict(nuevos).tolist())`,
    errorFrecuente: {
      codigo: `vectorizador = TfidfVectorizer()
X = vectorizador.fit_transform(todos_los_textos)   # train + test juntos
X_train, X_test, y_train, y_test = train_test_split(X, y)`,
      explicacion:
        'Ajustar el vectorizador con todos los textos antes de dividir hace que el vocabulario y los pesos IDF incluyan información de test (data leakage). Divide primero y usa un `Pipeline`, de modo que el vectorizador se ajuste solo con el entrenamiento.',
    },
    practicaGuiada: {
      id: 'm16-l5-practica',
      enunciado:
        'Entrena el pipeline con `textos` y `etiquetas`, predice la clase del texto `"producto excelente"` e imprímela como entero.',
      codigoInicial: `from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import make_pipeline\n\ntextos = ["excelente producto", "me encanta, muy bueno", "buen servicio excelente", "muy bueno y rápido",\n          "pésimo servicio", "muy malo, no me gusta", "producto malo y lento", "terrible pésimo"]\netiquetas = [1, 1, 1, 1, 0, 0, 0, 0]\nmodelo = make_pipeline(TfidfVectorizer(), LogisticRegression())\nprint(0)`,
      solucion: `from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import make_pipeline\n\ntextos = ["excelente producto", "me encanta, muy bueno", "buen servicio excelente", "muy bueno y rápido",\n          "pésimo servicio", "muy malo, no me gusta", "producto malo y lento", "terrible pésimo"]\netiquetas = [1, 1, 1, 1, 0, 0, 0, 0]\nmodelo = make_pipeline(TfidfVectorizer(), LogisticRegression())\nmodelo.fit(textos, etiquetas)\nprint(int(modelo.predict(["producto excelente"])[0]))`,
      pistas: ['`modelo.fit(textos, etiquetas)` entrena vectorizador y clasificador a la vez.', '`modelo.predict([...])` recibe una lista de textos.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1'
        return { ok, mensaje: ok ? 'Correcto: "excelente" empuja la predicción hacia positivo.' : 'El resultado esperado es 1.' }
      },
    },
    reto: {
      id: 'm16-l5-reto',
      enunciado:
        'Con el modelo ya entrenado, predice la clase de los textos `["pésimo y malo", "servicio lento y malo"]` e imprime el resultado como lista con `.tolist()`.',
      codigoInicial: `from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import make_pipeline\n\ntextos = ["excelente producto", "me encanta, muy bueno", "buen servicio excelente", "muy bueno y rápido",\n          "pésimo servicio", "muy malo, no me gusta", "producto malo y lento", "terrible pésimo"]\netiquetas = [1, 1, 1, 1, 0, 0, 0, 0]\nmodelo = make_pipeline(TfidfVectorizer(), LogisticRegression())\nmodelo.fit(textos, etiquetas)\n# predice los dos textos nuevos e imprime la lista de clases`,
      solucion: `from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import make_pipeline\n\ntextos = ["excelente producto", "me encanta, muy bueno", "buen servicio excelente", "muy bueno y rápido",\n          "pésimo servicio", "muy malo, no me gusta", "producto malo y lento", "terrible pésimo"]\netiquetas = [1, 1, 1, 1, 0, 0, 0, 0]\nmodelo = make_pipeline(TfidfVectorizer(), LogisticRegression())\nmodelo.fit(textos, etiquetas)\nprint(modelo.predict(["pésimo y malo", "servicio lento y malo"]).tolist())`,
      pistas: ['`modelo.predict(["...", "..."]).tolist()` devuelve una lista de 0 y 1.', 'Ambos textos contienen palabras muy negativas.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '[0, 0]'
        return { ok, mensaje: ok ? 'Correcto: ambos textos se clasifican como negativos.' : 'El resultado esperado es [0, 0].' }
      },
    },
    verificacion: [
      {
        id: 'm16-l5-q1',
        pregunta: '¿Qué ventaja tiene TF-IDF sobre un simple conteo de palabras?',
        opciones: [
          'Es más rápido de calcular',
          'Da menos peso a palabras que aparecen en casi todos los documentos y más a las que distinguen',
          'Conserva el orden de las palabras',
          'Elimina automáticamente las faltas de ortografía',
        ],
        respuestaCorrecta: 1,
        explicacion: 'El factor IDF reduce el peso de palabras comunes y resalta las poco frecuentes, que suelen ser más informativas.',
      },
      {
        id: 'm16-l5-q2',
        pregunta: '¿Por qué conviene meter `TfidfVectorizer` y el clasificador en un Pipeline?',
        opciones: [
          'Porque así el vectorizador se ajusta solo con los datos de entrenamiento y puedes predecir con texto crudo',
          'Porque el clasificador no acepta números',
          'Para duplicar el vocabulario',
          'Porque Pipeline mejora siempre la precisión',
        ],
        respuestaCorrecta: 0,
        explicacion: 'El Pipeline encadena preprocesamiento y modelo, evitando leakage y simplificando el uso en producción.',
      },
    ],
    resumen: [
      'TF-IDF pondera las palabras por su frecuencia en el documento y su rareza en la colección.',
      '`TfidfVectorizer` + `LogisticRegression` en un Pipeline es una base sólida para clasificar texto.',
      'Divide los datos antes de ajustar el vectorizador para evitar data leakage.',
      'Evalúa con precisión, recall y F1, igual que en cualquier clasificación.',
    ],
    proximoPaso:
      'Con series temporales y texto cubiertos, en el Módulo 17 damos el salto a las redes neuronales: cómo funciona una neurona y cómo entrenar una red pequeña.',
    conceptos: ['tf-idf', 'clasificacion-de-texto', 'pipeline-nlp'],
  },
]
