import type { Lesson } from '../../types'

export const module14Lessons: Lesson[] = [
  {
    id: 'm14-l1',
    moduloId: 'modulo-14',
    titulo: 'Métricas de regresión: MAE, RMSE y R²',
    objetivo: 'Medir qué tan bien predice un modelo de regresión usando MAE, RMSE y R², e interpretar cada una.',
    porQueImporta:
      'Un modelo sin métrica es una opinión. Cada métrica responde una pregunta distinta: ¿cuánto me equivoco en promedio?, ¿me penalizan más los errores grandes?, ¿qué tanto de la variación explico?',
    concepto: `\`\`\`python
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

mean_absolute_error(y_real, y_pred)        # MAE
mean_squared_error(y_real, y_pred) ** 0.5  # RMSE
r2_score(y_real, y_pred)                   # R²
\`\`\`

- **MAE** (error absoluto medio): el error promedio, en las mismas unidades que el objetivo. Fácil de explicar: "me equivoco en promedio por 2.3 unidades".
- **RMSE** (raíz del error cuadrático medio): también en las unidades del objetivo, pero **penaliza más los errores grandes** porque eleva al cuadrado antes de promediar. Siempre es ≥ MAE.
- **R²**: proporción de la variación del objetivo que el modelo explica. 1 es perfecto, 0 equivale a predecir siempre la media, y puede ser negativo si el modelo es peor que eso.

Si RMSE es mucho mayor que MAE, hay algunos errores muy grandes escondidos en el promedio.`,
    ejemploMinimo: `from sklearn.metrics import mean_absolute_error

y_real = [10, 20, 30]
y_pred = [12, 18, 33]
print(round(mean_absolute_error(y_real, y_pred), 2))`,
    ejemploAplicado: `from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

precios_reales = [200, 250, 300, 400]
precios_pred = [210, 240, 330, 380]

mae = mean_absolute_error(precios_reales, precios_pred)
rmse = mean_squared_error(precios_reales, precios_pred) ** 0.5
r2 = r2_score(precios_reales, precios_pred)

print("MAE:", round(mae, 2))
print("RMSE:", round(rmse, 2))
print("R2:", round(r2, 3))`,
    errorFrecuente: {
      codigo: `from sklearn.metrics import mean_absolute_error

# Argumentos invertidos y sin entender la métrica
mean_absolute_error(y_pred, y_real)
# "R² = 0.30 es malo, ¡siempre hay que superar 0.9!"`,
      explicacion:
        'En métricas como R² el orden importa: primero el valor real y luego la predicción (`r2_score(y_real, y_pred)`); invertirlos da un resultado distinto sin avisar. Además, qué se considera un buen valor depende del problema: un R² de 0.30 puede ser excelente prediciendo comportamiento humano y pésimo prediciendo física.',
    },
    practicaGuiada: {
      id: 'm14-l1-practica',
      enunciado:
        'Calcula el MAE entre `y_real` y `y_pred` con `mean_absolute_error` e imprímelo redondeado a 2 decimales.',
      codigoInicial: `from sklearn.metrics import mean_absolute_error\n\ny_real = [10, 20, 30]\ny_pred = [12, 18, 33]\nprint(0)`,
      solucion: `from sklearn.metrics import mean_absolute_error\n\ny_real = [10, 20, 30]\ny_pred = [12, 18, 33]\nprint(round(mean_absolute_error(y_real, y_pred), 2))`,
      pistas: ['Los errores son 2, 2 y 3; su promedio es 7/3.', '`round(valor, 2)` redondea a 2 decimales.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2.33'
        return { ok, mensaje: ok ? 'Correcto: te equivocas en promedio por 2.33 unidades.' : 'El resultado esperado es 2.33.' }
      },
    },
    reto: {
      id: 'm14-l1-reto',
      enunciado:
        'Calcula el RMSE de las predicciones: usa `mean_squared_error(y_real, y_pred)` y sácale la raíz cuadrada con `** 0.5`. Imprímelo redondeado a 2 decimales.',
      codigoInicial: `from sklearn.metrics import mean_squared_error\n\ny_real = [100, 200, 300]\ny_pred = [110, 190, 330]\n# calcula e imprime el RMSE redondeado a 2 decimales`,
      solucion: `from sklearn.metrics import mean_squared_error\n\ny_real = [100, 200, 300]\ny_pred = [110, 190, 330]\nrmse = mean_squared_error(y_real, y_pred) ** 0.5\nprint(round(rmse, 2))`,
      pistas: ['Los errores son 10, 10 y 30. El error cuadrático medio es 1100/3.', '`** 0.5` equivale a la raíz cuadrada.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '19.15'
        return { ok, mensaje: ok ? 'Correcto. Nota que el RMSE (19.15) supera al MAE (16.67) por el error de 30.' : 'El resultado esperado es 19.15.' }
      },
    },
    verificacion: [
      {
        id: 'm14-l1-q1',
        pregunta: 'Un modelo tiene MAE = 5 y RMSE = 15. ¿Qué sugiere esa diferencia?',
        opciones: [
          'Que el modelo es perfecto',
          'Que hay algunos errores muy grandes que el RMSE penaliza más',
          'Que hay un error de cálculo, ambos deberían ser iguales',
          'Que el R² es negativo necesariamente',
        ],
        respuestaCorrecta: 1,
        explicacion: 'El RMSE eleva los errores al cuadrado, así que los errores grandes pesan mucho más que en el MAE. Una brecha grande entre ambos delata errores extremos.',
      },
      {
        id: 'm14-l1-q2',
        pregunta: '¿Qué significa un R² negativo?',
        opciones: [
          'Que el modelo explica todo con signo invertido',
          'Que el modelo es peor que predecir siempre la media',
          'Que hay datos faltantes',
          'Que el modelo está bien pero mal escalado',
        ],
        respuestaCorrecta: 1,
        explicacion: 'R² = 0 equivale a predecir siempre la media del objetivo; un valor negativo indica que el modelo lo hace aún peor que esa referencia trivial.',
      },
    ],
    resumen: [
      'MAE: error promedio en las unidades del objetivo, fácil de comunicar.',
      'RMSE: penaliza más los errores grandes; siempre es ≥ MAE.',
      'R²: fracción de variación explicada; 0 = predecir la media, negativo = peor que eso.',
      'El primer argumento es siempre el valor real y el segundo la predicción.',
    ],
    proximoPaso: 'Ahora pasamos de predecir números a predecir categorías: clasificación con regresión logística.',
    conceptos: ['mae-rmse-r2', 'metricas-regresion'],
  },
  {
    id: 'm14-l2',
    moduloId: 'modulo-14',
    titulo: 'Clasificación con regresión logística',
    objetivo: 'Entrenar un clasificador con LogisticRegression y obtener tanto la clase predicha como su probabilidad.',
    porQueImporta:
      'Muchas preguntas de negocio son de tipo sí/no: ¿el cliente se irá?, ¿la transacción es fraude?, ¿aprobará el crédito? La regresión logística es el punto de partida estándar: simple, rápida e interpretable.',
    concepto: `\`\`\`python
from sklearn.linear_model import LogisticRegression

modelo = LogisticRegression()
modelo.fit(X_train, y_train)
modelo.predict(X_nuevo)        # clase: 0 o 1
modelo.predict_proba(X_nuevo)  # probabilidades [P(0), P(1)]
\`\`\`

A pesar de su nombre, la regresión logística es un modelo de **clasificación**. Calcula la probabilidad de pertenecer a la clase 1 y, por defecto, predice 1 cuando esa probabilidad supera **0.5**.

- \`predict\` devuelve la clase final.
- \`predict_proba\` devuelve una fila por muestra con la probabilidad de cada clase (las columnas siguen el orden de \`modelo.classes_\`, normalmente [0, 1]).

Las probabilidades son útiles porque el umbral de 0.5 no siempre es el correcto para el negocio; lo veremos en la lección de desbalance.`,
    ejemploMinimo: `from sklearn.linear_model import LogisticRegression

X = [[1], [2], [3], [6], [7], [8]]
y = [0, 0, 0, 1, 1, 1]

modelo = LogisticRegression().fit(X, y)
print(modelo.predict([[2], [7]]).tolist())`,
    ejemploAplicado: `from sklearn.linear_model import LogisticRegression

# Horas de estudio -> aprobó (1) o no (0)
horas = [[1], [2], [3], [4], [5], [6], [7], [8]]
aprobo = [0, 0, 0, 0, 1, 1, 1, 1]

modelo = LogisticRegression().fit(horas, aprobo)

nuevo = [[7.5]]
print("Clase predicha:", modelo.predict(nuevo)[0])
print("P(aprobar):", round(modelo.predict_proba(nuevo)[0][1], 2))`,
    errorFrecuente: {
      codigo: `from sklearn.linear_model import LogisticRegression

modelo = LogisticRegression().fit(X_train, y_train)
prediccion = modelo.predict_proba(X_test)
print(prediccion[0])  # "¿por qué hay dos números y no una clase?"`,
      explicacion:
        '`predict_proba` devuelve una probabilidad por cada clase, no la clase predicha. Para obtener la probabilidad de la clase positiva toma la columna 1 (`predict_proba(X)[:, 1]`); para obtener la clase usa `predict(X)`.',
    },
    practicaGuiada: {
      id: 'm14-l2-practica',
      enunciado:
        'Entrena un `LogisticRegression` con `X` e `y`, predice la clase del valor `[[8]]` e imprímela como entero.',
      codigoInicial: `from sklearn.linear_model import LogisticRegression\n\nX = [[1], [2], [3], [4], [5], [6], [7], [8]]\ny = [0, 0, 0, 0, 1, 1, 1, 1]\nprint(0)`,
      solucion: `from sklearn.linear_model import LogisticRegression\n\nX = [[1], [2], [3], [4], [5], [6], [7], [8]]\ny = [0, 0, 0, 0, 1, 1, 1, 1]\nmodelo = LogisticRegression().fit(X, y)\nprint(int(modelo.predict([[8]])[0]))`,
      pistas: ['`LogisticRegression().fit(X, y)` entrena el modelo.', '`modelo.predict([[8]])` devuelve un arreglo; toma su elemento `[0]`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1'
        return { ok, mensaje: ok ? 'Correcto: 8 horas cae en el grupo que aprueba.' : 'El resultado esperado es 1.' }
      },
    },
    reto: {
      id: 'm14-l2-reto',
      enunciado:
        'Entrena el modelo y usa `predict_proba` sobre `[[2]]`. Imprime `True` si la probabilidad de la clase 1 (`[0][1]`) es menor a 0.5, es decir, si el modelo cree que NO aprobará.',
      codigoInicial: `from sklearn.linear_model import LogisticRegression\n\nX = [[1], [2], [3], [4], [5], [6], [7], [8]]\ny = [0, 0, 0, 0, 1, 1, 1, 1]\n# entrena, calcula P(clase 1) para [[2]] e imprime si es menor a 0.5`,
      solucion: `from sklearn.linear_model import LogisticRegression\n\nX = [[1], [2], [3], [4], [5], [6], [7], [8]]\ny = [0, 0, 0, 0, 1, 1, 1, 1]\nmodelo = LogisticRegression().fit(X, y)\np = modelo.predict_proba([[2]])[0][1]\nprint(bool(p < 0.5))`,
      pistas: ['`modelo.predict_proba([[2]])` devuelve `[[P(0), P(1)]]`.', 'Convierte con `bool(...)` para imprimir `True` o `False` de Python.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'True'
        return { ok, mensaje: ok ? 'Correcto: con 2 horas la probabilidad de aprobar es baja.' : 'El resultado esperado es True.' }
      },
    },
    verificacion: [
      {
        id: 'm14-l2-q1',
        pregunta: '¿Qué devuelve `modelo.predict_proba(X)` en un problema binario?',
        opciones: [
          'La clase predicha (0 o 1)',
          'Una probabilidad por cada clase, para cada muestra',
          'El error del modelo',
          'Los coeficientes del modelo',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Devuelve una fila por muestra con la probabilidad de cada clase; `predict` es el que devuelve la clase final.',
      },
      {
        id: 'm14-l2-q2',
        pregunta: '¿Por qué la regresión logística se considera un modelo de clasificación aunque se llame "regresión"?',
        opciones: [
          'Porque predice valores continuos sin límites',
          'Porque estima una probabilidad y la convierte en una clase usando un umbral',
          'Porque solo funciona con texto',
          'Es un error histórico, en realidad es de regresión',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Modela la probabilidad de pertenecer a una clase y asigna la clase según un umbral (0.5 por defecto).',
      },
    ],
    resumen: [
      '`LogisticRegression` es un clasificador: estima probabilidades y las convierte en clases.',
      '`predict` devuelve la clase; `predict_proba` devuelve la probabilidad de cada clase.',
      'El umbral por defecto es 0.5, pero se puede ajustar según el costo de cada tipo de error.',
    ],
    proximoPaso: 'Un clasificador necesita sus propias métricas. Veremos matriz de confusión, precisión, recall y F1.',
    conceptos: ['regresion-logistica', 'clasificacion', 'predict-proba'],
  },
  {
    id: 'm14-l3',
    moduloId: 'modulo-14',
    titulo: 'Métricas de clasificación: matriz de confusión, precisión, recall y F1',
    objetivo: 'Leer una matriz de confusión y calcular precisión, recall y F1 para decidir qué tan bueno es un clasificador.',
    porQueImporta:
      'La exactitud (accuracy) sola engaña. Un detector de fraude puede acertar el 99% de las veces y aun así dejar pasar casi todos los fraudes. Precisión y recall muestran qué tipo de error cometes.',
    concepto: `\`\`\`python
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score

confusion_matrix(y_real, y_pred)   # [[TN, FP], [FN, TP]]
precision_score(y_real, y_pred)
recall_score(y_real, y_pred)
f1_score(y_real, y_pred)
\`\`\`

La matriz de confusión (clase 1 = positivo) tiene cuatro celdas:

| | Predijo 0 | Predijo 1 |
|---|---|---|
| **Real 0** | TN (verdadero negativo) | FP (falso positivo) |
| **Real 1** | FN (falso negativo) | TP (verdadero positivo) |

- **Precisión** = TP / (TP + FP): de los que marqué como positivos, ¿cuántos lo eran? Importa cuando un falso positivo es costoso (marcar como fraude a un cliente legítimo).
- **Recall** = TP / (TP + FN): de todos los positivos reales, ¿cuántos encontré? Importa cuando un falso negativo es costoso (no detectar una enfermedad).
- **F1**: media armónica de precisión y recall; un solo número que castiga que alguno de los dos sea bajo.

Hay un compromiso entre precisión y recall: subir uno suele bajar el otro.`,
    ejemploMinimo: `from sklearn.metrics import confusion_matrix

y_real = [1, 1, 0, 0]
y_pred = [1, 0, 0, 1]
print(confusion_matrix(y_real, y_pred).tolist())`,
    ejemploAplicado: `from sklearn.metrics import precision_score, recall_score, f1_score

y_real = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
y_pred = [1, 1, 1, 0, 1, 1, 0, 0, 0, 0]

print("Precision:", precision_score(y_real, y_pred))
print("Recall:", recall_score(y_real, y_pred))
print("F1:", round(f1_score(y_real, y_pred), 2))`,
    errorFrecuente: {
      codigo: `from sklearn.metrics import accuracy_score

# 990 clientes legítimos, 10 fraudes. El modelo marca todo como "legítimo".
y_pred = [0] * 1000
print(accuracy_score(y_real, y_pred))  # 0.99 -> "¡modelo excelente!"`,
      explicacion:
        'Con clases desbalanceadas, un modelo inútil que siempre responde la clase mayoritaria obtiene accuracy altísima. Su recall para fraudes sería 0. Evalúa siempre con precisión, recall y la matriz de confusión, no solo con accuracy.',
    },
    practicaGuiada: {
      id: 'm14-l3-practica',
      enunciado:
        'Calcula la precisión con `precision_score(y_real, y_pred)` e imprímela. Hay 5 predicciones positivas, de las cuales 3 son correctas.',
      codigoInicial: `from sklearn.metrics import precision_score\n\ny_real = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0]\ny_pred = [1, 1, 1, 0, 1, 1, 0, 0, 0, 0]\nprint(0)`,
      solucion: `from sklearn.metrics import precision_score\n\ny_real = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0]\ny_pred = [1, 1, 1, 0, 1, 1, 0, 0, 0, 0]\nprint(precision_score(y_real, y_pred))`,
      pistas: ['Precisión = TP / (TP + FP) = 3 / 5.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.6'
        return { ok, mensaje: ok ? 'Correcto: 3 de 5 alertas fueron acertadas.' : 'El resultado esperado es 0.6.' }
      },
    },
    reto: {
      id: 'm14-l3-reto',
      enunciado:
        'Calcula el F1 con `f1_score(y_real, y_pred)` e imprímelo redondeado a 2 decimales.',
      codigoInicial: `from sklearn.metrics import f1_score\n\ny_real = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0]\ny_pred = [1, 1, 1, 0, 1, 1, 0, 0, 0, 0]\n# calcula e imprime el F1 redondeado a 2 decimales`,
      solucion: `from sklearn.metrics import f1_score\n\ny_real = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0]\ny_pred = [1, 1, 1, 0, 1, 1, 0, 0, 0, 0]\nprint(round(f1_score(y_real, y_pred), 2))`,
      pistas: ['Precisión = 0.6 y recall = 0.75. F1 = 2·P·R / (P + R).'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.67'
        return { ok, mensaje: ok ? 'Correcto: F1 resume precisión y recall en un número.' : 'El resultado esperado es 0.67.' }
      },
    },
    verificacion: [
      {
        id: 'm14-l3-q1',
        pregunta: 'Estás detectando una enfermedad grave y es peor no detectar a un enfermo que alarmar a un sano. ¿Qué métrica priorizas?',
        opciones: ['Precisión', 'Recall', 'Accuracy', 'R²'],
        respuestaCorrecta: 1,
        explicacion: 'El recall mide cuántos positivos reales encuentras. Cuando un falso negativo es muy costoso, se prioriza el recall.',
      },
      {
        id: 'm14-l3-q2',
        pregunta: 'En la matriz de confusión, un "falso positivo" es:',
        opciones: [
          'Un caso real positivo que el modelo predijo negativo',
          'Un caso real negativo que el modelo predijo positivo',
          'Un caso bien clasificado como positivo',
          'Un caso sin datos',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Falso positivo: la realidad es 0 pero el modelo dijo 1 (falsa alarma).',
      },
    ],
    resumen: [
      'La matriz de confusión desglosa aciertos y los dos tipos de error (FP y FN).',
      'Precisión: de lo que marqué positivo, cuánto lo era. Recall: de los positivos reales, cuántos encontré.',
      'F1 combina ambas; accuracy puede engañar cuando las clases están desbalanceadas.',
    ],
    proximoPaso: 'Una sola partición train/test puede dar un resultado afortunado o desafortunado. La validación cruzada lo hace más confiable.',
    conceptos: ['matriz-confusion', 'precision-recall', 'f1-score'],
  },
  {
    id: 'm14-l4',
    moduloId: 'modulo-14',
    titulo: 'Validación cruzada',
    objetivo: 'Estimar el rendimiento de un modelo de forma más estable con cross_val_score en lugar de un único train/test split.',
    porQueImporta:
      'Con una sola partición, la métrica depende de qué filas cayeron en test por azar. La validación cruzada promedia varias particiones y te dice además cuánto varía el resultado.',
    concepto: `\`\`\`python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(modelo, X, y, cv=5)
scores.mean(), scores.std()
\`\`\`

En validación cruzada de **k pliegues** (k-fold), los datos se dividen en k partes. Se entrena k veces: en cada ronda una parte distinta se usa como prueba y las otras k-1 como entrenamiento. El resultado es un arreglo con k puntajes.

- \`scores.mean()\`: estimación del rendimiento.
- \`scores.std()\`: qué tan estable es; una desviación alta indica que el resultado depende mucho de la partición.
- \`scoring="..."\` elige la métrica (por defecto R² en regresión y accuracy en clasificación). Las métricas de error van con signo negativo, por ejemplo \`"neg_mean_absolute_error"\`, porque sklearn siempre maximiza.
- Con clasificación, \`cv=5\` usa pliegues estratificados automáticamente.

La validación cruzada sirve para **comparar y elegir modelos**. El modelo final se reentrena con todos los datos de entrenamiento.`,
    ejemploMinimo: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_score

X = [[i] for i in range(10)]
y = [2 * i + 1 for i in range(10)]

scores = cross_val_score(LinearRegression(), X, y, cv=5)
print(len(scores))`,
    ejemploAplicado: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

X = [[i] for i in range(20)]
y = [0] * 10 + [1] * 10

scores = cross_val_score(LogisticRegression(), X, y, cv=5)
print("Accuracy por pliegue:", scores.round(2).tolist())
print("Promedio:", round(scores.mean(), 2))`,
    errorFrecuente: {
      codigo: `from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import StandardScaler

X_escalado = StandardScaler().fit_transform(X)   # escala con TODOS los datos
scores = cross_val_score(modelo, X_escalado, y, cv=5)`,
      explicacion:
        'Escalar antes de la validación cruzada filtra información de los pliegues de prueba hacia el entrenamiento (data leakage). La solución es meter el escalador y el modelo en un `Pipeline` y pasar el pipeline a `cross_val_score`: así el escalador se ajusta solo con los pliegues de entrenamiento de cada ronda.',
    },
    practicaGuiada: {
      id: 'm14-l4-practica',
      enunciado:
        'Ejecuta `cross_val_score` con `cv=5` sobre el modelo y los datos, e imprime cuántos puntajes se obtuvieron con `len(scores)`.',
      codigoInicial: `from sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import cross_val_score\n\nX = [[i] for i in range(10)]\ny = [2 * i + 1 for i in range(10)]\nprint(0)`,
      solucion: `from sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import cross_val_score\n\nX = [[i] for i in range(10)]\ny = [2 * i + 1 for i in range(10)]\nscores = cross_val_score(LinearRegression(), X, y, cv=5)\nprint(len(scores))`,
      pistas: ['`cross_val_score(LinearRegression(), X, y, cv=5)` devuelve un arreglo con un puntaje por pliegue.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '5'
        return { ok, mensaje: ok ? 'Correcto: 5 pliegues, 5 puntajes.' : 'El resultado esperado es 5.' }
      },
    },
    reto: {
      id: 'm14-l4-reto',
      enunciado:
        'Calcula la validación cruzada (`cv=5`) con `scoring="neg_mean_absolute_error"`. Como el MAE viene en negativo, imprime `round(abs(scores.mean()), 2)`.',
      codigoInicial: `from sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import cross_val_score\n\nX = [[i] for i in range(10)]\ny = [2 * i + 1 for i in range(10)]\n# calcula la validación cruzada con scoring="neg_mean_absolute_error" e imprime el MAE promedio`,
      solucion: `from sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import cross_val_score\n\nX = [[i] for i in range(10)]\ny = [2 * i + 1 for i in range(10)]\nscores = cross_val_score(LinearRegression(), X, y, cv=5, scoring="neg_mean_absolute_error")\nprint(round(abs(scores.mean()), 2))`,
      pistas: ['Pasa `scoring="neg_mean_absolute_error"` a `cross_val_score`.', 'Los datos siguen una línea perfecta, así que el error esperado es prácticamente 0.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.0'
        return { ok, mensaje: ok ? 'Correcto: la relación es lineal exacta, el error es 0.' : 'El resultado esperado es 0.0.' }
      },
    },
    verificacion: [
      {
        id: 'm14-l4-q1',
        pregunta: '¿Qué ventaja principal tiene la validación cruzada sobre un único train/test split?',
        opciones: [
          'Entrena más rápido',
          'Da una estimación más estable y permite ver la variabilidad del rendimiento',
          'Elimina la necesidad de datos de prueba',
          'Evita el overfitting automáticamente',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Al promediar varias particiones, el resultado depende menos de una división afortunada, y la desviación estándar muestra su estabilidad.',
      },
      {
        id: 'm14-l4-q2',
        pregunta: '¿Por qué conviene pasar un Pipeline (escalador + modelo) a `cross_val_score` en vez de escalar antes?',
        opciones: [
          'Porque es más corto de escribir',
          'Para evitar data leakage: el escalador se ajusta solo con los pliegues de entrenamiento de cada ronda',
          'Porque cross_val_score no acepta datos sin escalar',
          'No hay diferencia',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Escalar todo el conjunto antes filtra información de los pliegues de prueba. El Pipeline reajusta el preprocesamiento en cada pliegue.',
      },
    ],
    resumen: [
      '`cross_val_score` entrena y evalúa k veces con distintas particiones y devuelve k puntajes.',
      'Reporta la media y la desviación estándar para conocer rendimiento y estabilidad.',
      'Las métricas de error usan signo negativo en `scoring` (por ejemplo `neg_mean_absolute_error`).',
      'Usa Pipeline dentro de la validación cruzada para evitar data leakage.',
    ],
    proximoPaso: 'Cerramos el módulo con un problema muy común en el mundo real: clases desbalanceadas.',
    conceptos: ['validacion-cruzada', 'cross-val-score'],
  },
  {
    id: 'm14-l5',
    moduloId: 'modulo-14',
    titulo: 'Datos desbalanceados: estratificación y class_weight',
    objetivo: 'Reconocer el problema del desbalance de clases y aplicar estratificación y class_weight para manejarlo.',
    porQueImporta:
      'Fraude, abandono de clientes, fallas de equipos y enfermedades raras tienen algo en común: la clase que más importa es la menos frecuente. Un modelo ingenuo la ignora y aun así parece bueno.',
    concepto: `\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
modelo = LogisticRegression(class_weight="balanced")
\`\`\`

Tres herramientas básicas:

1. **Mide el desbalance primero**: \`pd.Series(y).value_counts(normalize=True)\`. Si la clase minoritaria es el 5% del total, accuracy deja de ser informativa.
2. **\`stratify=y\`** en \`train_test_split\`: mantiene la misma proporción de clases en entrenamiento y prueba. Sin esto, test podría quedar sin ejemplos de la clase rara.
3. **\`class_weight="balanced"\`**: le indica al modelo que un error en la clase minoritaria pesa más, proporcionalmente a su rareza. Suele subir el recall de la clase rara a costa de algo de precisión.

Otras opciones, para ir más allá: ajustar el umbral de decisión usando \`predict_proba\`, o remuestrear los datos (sobremuestrear la clase minoritaria o submuestrear la mayoritaria). Cualquier remuestreo debe hacerse **solo sobre el conjunto de entrenamiento**, nunca sobre test.`,
    ejemploMinimo: `import pandas as pd

y = [0] * 95 + [1] * 5
print(pd.Series(y).value_counts(normalize=True).round(2).to_dict())`,
    ejemploAplicado: `from sklearn.model_selection import train_test_split

y = [0] * 90 + [1] * 10
X = [[i] for i in range(100)]

_, _, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

print("Positivos en train:", sum(y_train), "de", len(y_train))
print("Positivos en test:", sum(y_test), "de", len(y_test))`,
    errorFrecuente: {
      codigo: `from sklearn.model_selection import train_test_split

# 100 muestras, solo 5 fraudes
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
# Sin stratify, test podría quedar con 0 fraudes y recall quedaría indefinido`,
      explicacion:
        'Sin `stratify=y`, el azar puede dejar pocas o ninguna muestra de la clase rara en el conjunto de prueba, y las métricas de esa clase pierden sentido. Con clases desbalanceadas usa siempre `stratify=y`.',
    },
    practicaGuiada: {
      id: 'm14-l5-practica',
      enunciado:
        'Un modelo "perezoso" predice siempre 0. Calcula su accuracy con `accuracy_score(y_real, y_pred)` e imprímela. Observa lo alta que es aunque el modelo no detecta nada.',
      codigoInicial: `from sklearn.metrics import accuracy_score\n\ny_real = [0] * 95 + [1] * 5\ny_pred = [0] * 100\nprint(0)`,
      solucion: `from sklearn.metrics import accuracy_score\n\ny_real = [0] * 95 + [1] * 5\ny_pred = [0] * 100\nprint(accuracy_score(y_real, y_pred))`,
      pistas: ['Acierta los 95 casos de clase 0 y falla los 5 de clase 1.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.95'
        return { ok, mensaje: ok ? 'Correcto: 95% de accuracy sin detectar ni un solo caso positivo. Por eso accuracy no basta.' : 'El resultado esperado es 0.95.' }
      },
    },
    reto: {
      id: 'm14-l5-reto',
      enunciado:
        'Divide los datos con `train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)` e imprime cuántos positivos quedaron en `y_test` con `sum(y_test)`.',
      codigoInicial: `from sklearn.model_selection import train_test_split\n\ny = [0] * 90 + [1] * 10\nX = [[i] for i in range(100)]\n# divide estratificadamente e imprime cuántos positivos hay en y_test`,
      solucion: `from sklearn.model_selection import train_test_split\n\ny = [0] * 90 + [1] * 10\nX = [[i] for i in range(100)]\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)\nprint(sum(y_test))`,
      pistas: ['Con `stratify=y`, test conserva la proporción 10%: 20 muestras, de las cuales 2 son positivas.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: la proporción del 10% se conserva en test.' : 'El resultado esperado es 2. Verifica que usaste stratify=y.' }
      },
    },
    verificacion: [
      {
        id: 'm14-l5-q1',
        pregunta: 'Un modelo de fraude tiene 99% de accuracy y solo 1% de los casos son fraude. ¿Qué conclusión es correcta?',
        opciones: [
          'El modelo es excelente',
          'No se puede saber sin ver recall y precisión de la clase fraude',
          'El modelo está en overfitting',
          'Hay que eliminar la clase fraude',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Un modelo que nunca detecta fraude también obtiene 99%. Hay que mirar recall, precisión y la matriz de confusión de la clase minoritaria.',
      },
      {
        id: 'm14-l5-q2',
        pregunta: '¿Para qué sirve `stratify=y` en `train_test_split`?',
        opciones: [
          'Para mezclar mejor los datos',
          'Para mantener la misma proporción de clases en entrenamiento y prueba',
          'Para eliminar los valores atípicos',
          'Para escalar el objetivo',
        ],
        respuestaCorrecta: 1,
        explicacion: 'La estratificación garantiza que ambas particiones reflejen la distribución original de las clases.',
      },
      {
        id: 'm14-l5-q3',
        pregunta: 'Vas a sobremuestrear la clase minoritaria. ¿Sobre qué datos debes hacerlo?',
        opciones: [
          'Sobre todo el dataset antes de dividir',
          'Solo sobre el conjunto de entrenamiento',
          'Solo sobre el conjunto de prueba',
          'Sobre ambos por separado',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Remuestrear antes de dividir duplica filas entre train y test (data leakage) e infla las métricas. Se hace solo en entrenamiento.',
      },
    ],
    resumen: [
      'Con clases desbalanceadas, accuracy engaña; evalúa recall, precisión y matriz de confusión.',
      '`stratify=y` mantiene las proporciones de clase en train y test.',
      '`class_weight="balanced"` penaliza más los errores en la clase minoritaria.',
      'Cualquier remuestreo se aplica solo al conjunto de entrenamiento.',
    ],
    proximoPaso:
      'Con regresión, clasificación, métricas y validación cruzada dominadas, en el siguiente módulo exploramos el aprendizaje no supervisado: K-Means, DBSCAN y PCA.',
    conceptos: ['datos-desbalanceados', 'stratify', 'class-weight'],
  },
]
