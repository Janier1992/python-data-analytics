import type { Lesson } from '../../types'

// Generador del dataset sintético del proyecto (mismo código en todas las lecciones).
// RandomState (generador "legacy" de NumPy) garantiza los mismos datos en cualquier versión.
const GENERADOR = `def generar_clientes(n=600, semilla=7):
    rng = np.random.RandomState(semilla)
    antiguedad = rng.randint(1, 61, n)
    plan = rng.choice(["Basico", "Estandar", "Premium"], n, p=[0.5, 0.3, 0.2])
    base = np.where(plan == "Basico", 20, np.where(plan == "Estandar", 40, 70))
    cargo = (base + rng.normal(0, 3, n)).round(2)
    tickets = rng.poisson(2, n)
    horas = np.clip(rng.normal(30, 10, n), 1, None).round(1)
    logit = -1.3 + 0.45 * tickets - 0.04 * antiguedad - 0.03 * horas + 0.9 * (plan == "Basico")
    abandono = (rng.uniform(size=n) < 1 / (1 + np.exp(-logit))).astype(int)
    df = pd.DataFrame({
        "cliente_id": np.arange(1, n + 1),
        "antiguedad_meses": antiguedad,
        "plan": plan,
        "cargo_mensual": cargo,
        "tickets_soporte": tickets,
        "horas_uso": horas,
        "abandono": abandono,
    })
    df.loc[rng.choice(n, 30, replace=False), "horas_uso"] = np.nan   # datos faltantes
    return df`

const IMPORTS_BASE = `import numpy as np
import pandas as pd`

const IMPORTS_ML = `import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler`

const PREP = `df = generar_clientes()
X = df.drop(columns=["cliente_id", "abandono"])
y = df["abandono"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)

numericas = ["antiguedad_meses", "cargo_mensual", "tickets_soporte", "horas_uso"]
categoricas = ["plan"]
preprocesador = ColumnTransformer([
    ("num", Pipeline([("imputar", SimpleImputer(strategy="median")), ("escalar", StandardScaler())]), numericas),
    ("cat", OneHotEncoder(), categoricas),
])`

export const module18Lessons: Lesson[] = [
  {
    id: 'm18-l1',
    moduloId: 'modulo-18',
    titulo: 'Proyecto: define el problema y explora los datos',
    objetivo: 'Plantear un problema de predicción de abandono de clientes y hacer una primera exploración que revele el desbalance de clases y los datos faltantes.',
    porQueImporta:
      'Todo proyecto de ciencia de datos empieza por una pregunta de negocio y una exploración honesta. "TeleConecta" es una empresa de suscripciones que pierde clientes cada mes. Retener a un cliente cuesta mucho menos que conseguir uno nuevo, así que predecir quién se irá permite actuar a tiempo.',
    concepto: `**El problema de negocio**: TeleConecta quiere responder: *"¿Qué clientes tienen más probabilidad de abandonar el servicio, y qué factores influyen, para que el equipo de retención pueda contactarlos antes de que se vayan?"*

Esto es un problema de **clasificación binaria**: la variable objetivo \`abandono\` vale 1 si el cliente se fue y 0 si se quedó. Antes de modelar, define cómo medirás el éxito. Aquí el costo importa: **no detectar a un cliente que se va** (falso negativo) pierde ingresos, mientras que contactar a uno que no se iba (falso positivo) cuesta solo una llamada. Por eso vigilaremos sobre todo el **recall** de la clase "abandona", sin descuidar la precisión.

El dataset es **sintético**: lo genera la función \`generar_clientes()\` con una semilla fija, así todos obtienen exactamente los mismos datos. Tiene antigüedad, plan, cargo mensual, tickets de soporte, horas de uso y el abandono, además de algunos datos faltantes a propósito.

\`\`\`python
${GENERADOR}
\`\`\`

La primera exploración responde cuatro preguntas:

\`\`\`python
df.shape                                   # ¿cuántos clientes y columnas?
df.isna().sum()                            # ¿qué columnas tienen datos faltantes?
df["abandono"].value_counts(normalize=True)  # ¿qué tan desbalanceado está el objetivo?
df.groupby("plan")["abandono"].mean()      # ¿abandonan más unos planes que otros?
\`\`\``,
    ejemploMinimo: `${IMPORTS_BASE}

${GENERADOR}

df = generar_clientes()
print(df.shape)`,
    ejemploAplicado: `${IMPORTS_BASE}

${GENERADOR}

df = generar_clientes()

print("Forma:", df.shape)
print("Nulos por columna:")
print(df.isna().sum()[df.isna().sum() > 0])
print("Tasa de abandono:", round(df["abandono"].mean(), 3))
print("Abandono por plan:")
print(df.groupby("plan")["abandono"].mean().round(2))`,
    errorFrecuente: {
      codigo: `df = generar_clientes()
# Directo a entrenar, sin explorar
modelo.fit(df.drop(columns=["abandono"]), df["abandono"])
print(modelo.score(X_test, y_test))   # "¡86% de accuracy, listo!"`,
      explicacion:
        'Saltarse la exploración esconde dos problemas: el objetivo está **desbalanceado** (aprox. 19% de abandono, así que un modelo que nunca predice abandono ya acierta ~81%) y hay **datos faltantes** y una columna identificadora (`cliente_id`) que no debe usarse como feature. Explora siempre antes de modelar.',
    },
    practicaGuiada: {
      id: 'm18-l1-practica',
      enunciado:
        'Genera el dataset con `generar_clientes()` e imprime su forma (`df.shape`) para saber cuántos clientes y columnas hay.',
      codigoInicial: `${IMPORTS_BASE}\n\n${GENERADOR}\n\nprint((0, 0))`,
      solucion: `${IMPORTS_BASE}\n\n${GENERADOR}\n\ndf = generar_clientes()\nprint(df.shape)`,
      pistas: ['`df = generar_clientes()` crea el DataFrame.', '`df.shape` devuelve (filas, columnas).'],
      validar: (stdout) => {
        const ok = stdout.trim() === '(600, 7)'
        return { ok, mensaje: ok ? 'Correcto: 600 clientes y 7 columnas.' : 'El resultado esperado es (600, 7).' }
      },
    },
    reto: {
      id: 'm18-l1-reto',
      enunciado:
        'Calcula la **tasa de abandono** (la media de la columna `abandono`) e imprímela redondeada a 3 decimales. Es la primera señal de que las clases están desbalanceadas.',
      codigoInicial: `${IMPORTS_BASE}\n\n${GENERADOR}\n\ndf = generar_clientes()\n# imprime la tasa de abandono con 3 decimales`,
      solucion: `${IMPORTS_BASE}\n\n${GENERADOR}\n\ndf = generar_clientes()\nprint(round(df["abandono"].mean(), 3))`,
      pistas: ['La media de una columna de 0 y 1 es la proporción de unos.', '`round(valor, 3)` redondea a 3 decimales.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.187'
        return { ok, mensaje: ok ? 'Correcto: cerca del 19% de los clientes abandona. Las clases están desbalanceadas.' : 'El resultado esperado es 0.187.' }
      },
    },
    verificacion: [
      {
        id: 'm18-l1-q1',
        pregunta: 'En este problema, ¿qué error es más costoso para el negocio?',
        opciones: [
          'Contactar a un cliente que no se iba a ir (falso positivo)',
          'No detectar a un cliente que sí se va a ir (falso negativo)',
          'Ambos cuestan exactamente lo mismo',
          'Ninguno importa',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Perder un cliente cuesta ingresos; una llamada de retención innecesaria cuesta poco. Por eso se prioriza el recall de la clase "abandona".',
      },
      {
        id: 'm18-l1-q2',
        pregunta: 'Si el 19% de los clientes abandona, ¿qué accuracy obtiene un modelo que siempre predice "se queda"?',
        opciones: ['19%', '50%', 'Aproximadamente 81%', '100%'],
        respuestaCorrecta: 2,
        explicacion: 'Acierta a todos los que se quedan (81%) y falla con todos los que se van. Por eso accuracy no basta con clases desbalanceadas.',
      },
    ],
    resumen: [
      'Un proyecto empieza con una pregunta de negocio y una definición de éxito (aquí, recall de los que abandonan).',
      'Es un problema de clasificación binaria con clases desbalanceadas (~19% de abandono).',
      'La exploración inicial revela forma, nulos, desbalance y diferencias por segmento.',
      '`cliente_id` es un identificador: no es una feature útil.',
    ],
    proximoPaso: 'Con el problema claro, prepararemos los datos: imputar nulos, codificar el plan, escalar y dividir sin filtrar información.',
    conceptos: ['proyecto-churn', 'definicion-problema', 'exploracion-inicial'],
  },
  {
    id: 'm18-l2',
    moduloId: 'modulo-18',
    titulo: 'Proyecto: prepara los datos sin filtrar información',
    objetivo: 'Construir un preprocesador con ColumnTransformer (imputación, escalado, One-Hot) y dividir los datos de forma estratificada.',
    porQueImporta:
      'Es la etapa donde más errores sutiles se cuelan. Aplicar todo el preprocesamiento dentro de un Pipeline asegura que las estadísticas (medianas, medias, categorías) se calculen solo con el entrenamiento, evitando data leakage.',
    concepto: `Los pasos de preparación, en el orden correcto:

1. **Separa features y objetivo**, quitando \`cliente_id\` (un identificador no predice nada).
2. **Divide primero** en entrenamiento y prueba con \`stratify=y\` para conservar la proporción de abandono en ambos.
3. **Define un preprocesador** distinto por tipo de columna con \`ColumnTransformer\`:
   - Numéricas: imputar nulos con la **mediana** y luego **escalar**.
   - Categórica (\`plan\`): **One-Hot Encoding**.

\`\`\`python
${PREP}
\`\`\`

\`ColumnTransformer\` aplica a cada grupo de columnas su propio tratamiento y junta el resultado. Como lo usaremos dentro de un \`Pipeline\`, el \`fit\` solo verá los datos de entrenamiento: la mediana de \`horas_uso\` se calcula únicamente con ellos, y se reutiliza para rellenar los nulos de prueba.

Con 4 columnas numéricas y 3 categorías de plan, el resultado transformado tiene **7 columnas**.`,
    ejemploMinimo: `${IMPORTS_BASE}

${GENERADOR}

df = generar_clientes()
print(df["horas_uso"].isna().sum())`,
    ejemploAplicado: `${IMPORTS_ML}

${GENERADOR}

${PREP}

print("Train:", X_train.shape, "Test:", X_test.shape)
print("Abandono train:", round(y_train.mean(), 3), "| test:", round(y_test.mean(), 3))
print("Forma transformada:", preprocesador.fit_transform(X_train).shape)`,
    errorFrecuente: {
      codigo: `df["horas_uso"] = df["horas_uso"].fillna(df["horas_uso"].median())   # con TODOS los datos
X_train, X_test, y_train, y_test = train_test_split(X, y)             # y luego se divide`,
      explicacion:
        'Calcular la mediana con todo el dataset antes de dividir filtra información de la prueba hacia el entrenamiento (data leakage). Además, sin `stratify=y` la proporción de abandono podría diferir entre train y test. Divide primero y deja la imputación dentro del Pipeline.',
    },
    practicaGuiada: {
      id: 'm18-l2-practica',
      enunciado:
        'Cuenta cuántos valores faltantes tiene la columna `horas_uso` con `df["horas_uso"].isna().sum()` e imprime el resultado.',
      codigoInicial: `${IMPORTS_BASE}\n\n${GENERADOR}\n\ndf = generar_clientes()\nprint(0)`,
      solucion: `${IMPORTS_BASE}\n\n${GENERADOR}\n\ndf = generar_clientes()\nprint(int(df["horas_uso"].isna().sum()))`,
      pistas: ['`isna()` marca los nulos como True; `sum()` los cuenta.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '30'
        return { ok, mensaje: ok ? 'Correcto: 30 clientes sin dato de horas de uso (5%).' : 'El resultado esperado es 30.' }
      },
    },
    reto: {
      id: 'm18-l2-reto',
      enunciado:
        'Ajusta el preprocesador con los datos de entrenamiento y aplícalo: imprime la forma de `preprocesador.fit_transform(X_train)`. Debe tener una fila por cliente de entrenamiento y una columna por feature resultante.',
      codigoInicial: `${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\n# transforma X_train e imprime la forma del resultado`,
      solucion: `${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\nX_train_t = preprocesador.fit_transform(X_train)\nprint(X_train_t.shape)`,
      pistas: ['`preprocesador.fit_transform(X_train)` aprende la mediana y las categorías, y transforma.', '4 columnas numéricas + 3 categorías del plan = 7.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '(450, 7)'
        return { ok, mensaje: ok ? 'Correcto: 450 clientes de entrenamiento y 7 features listas para el modelo.' : 'El resultado esperado es (450, 7).' }
      },
    },
    verificacion: [
      {
        id: 'm18-l2-q1',
        pregunta: '¿Por qué se usa `stratify=y` al dividir los datos de abandono?',
        opciones: [
          'Para que el entrenamiento sea más rápido',
          'Para conservar la misma proporción de abandono en entrenamiento y prueba',
          'Para eliminar los nulos',
          'Para escalar el objetivo',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Con una clase minoritaria, la estratificación evita que la prueba quede con muy pocos (o ningún) caso positivo.',
      },
      {
        id: 'm18-l2-q2',
        pregunta: '¿Qué ventaja da meter la imputación y el escalado dentro de un Pipeline?',
        opciones: [
          'Que las estadísticas se calculen solo con el entrenamiento, evitando data leakage',
          'Que el modelo siempre sea más preciso',
          'Que no hace falta dividir los datos',
          'Que se eliminan las columnas categóricas',
        ],
        respuestaCorrecta: 0,
        explicacion: 'El Pipeline ejecuta `fit` solo con el entrenamiento y reutiliza esos valores en la prueba.',
      },
    ],
    resumen: [
      'Quita identificadores, divide primero y estratifica por el objetivo.',
      '`ColumnTransformer` aplica un tratamiento distinto a columnas numéricas y categóricas.',
      'Mediana para imputar, `StandardScaler` para escalar y One-Hot para el plan.',
      'Todo dentro de un Pipeline para evitar data leakage.',
    ],
    proximoPaso: 'Ya con datos limpios, establecemos una línea base y entrenamos el primer modelo.',
    conceptos: ['columntransformer', 'preprocesamiento-proyecto', 'split-estratificado'],
  },
  {
    id: 'm18-l3',
    moduloId: 'modulo-18',
    titulo: 'Proyecto: línea base y primer modelo',
    objetivo: 'Establecer una línea base con DummyClassifier y entrenar una regresión logística completa en un Pipeline para compararla.',
    porQueImporta:
      'Un modelo solo "es bueno" en comparación con algo. La línea base mínima es no usar ningún modelo inteligente: predecir siempre la clase mayoritaria. Si tu modelo no supera claramente ese punto de partida, no aporta valor.',
    concepto: `**Línea base**: \`DummyClassifier(strategy="most_frequent")\` predice siempre la clase más común (aquí, "se queda"). No aprende nada de las features.

\`\`\`python
from sklearn.dummy import DummyClassifier

base = DummyClassifier(strategy="most_frequent").fit(X_train, y_train)
base.predict(X_test)
\`\`\`

**Primer modelo**: un Pipeline que encadena el preprocesador y una regresión logística (un modelo simple, rápido e interpretable).

\`\`\`python
modelo = Pipeline([
    ("prep", preprocesador),
    ("clf", LogisticRegression()),
])
modelo.fit(X_train, y_train)
prediccion = modelo.predict(X_test)
\`\`\`

Al comparar ambos verás algo muy instructivo: la **accuracy** de la línea base es altísima (~81%) solo por predecir "se queda", y el modelo real apenas la supera en accuracy. La diferencia real aparece en el **recall** de los clientes que abandonan: la línea base detecta **cero** abandonos.`,
    ejemploMinimo: `from sklearn.dummy import DummyClassifier

X = [[0], [1], [2], [3], [4]]
y = [0, 0, 0, 0, 1]
print(DummyClassifier(strategy="most_frequent").fit(X, y).predict([[10]]).tolist())`,
    ejemploAplicado: `from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, recall_score
${IMPORTS_ML}

${GENERADOR}

${PREP}

base = DummyClassifier(strategy="most_frequent").fit(X_train, y_train)
modelo = Pipeline([("prep", preprocesador), ("clf", LogisticRegression())]).fit(X_train, y_train)

for nombre, m in [("Línea base", base), ("Regresión logística", modelo)]:
    pred = m.predict(X_test)
    print(nombre, "| accuracy:", round(accuracy_score(y_test, pred), 2), "| recall:", round(recall_score(y_test, pred), 2))`,
    errorFrecuente: {
      codigo: `modelo = LogisticRegression().fit(X_train, y_train)
# ValueError: could not convert string to float: 'Basico'`,
      explicacion:
        'Entrenar el modelo directamente sobre las columnas sin preprocesar falla (texto en `plan`, nulos en `horas_uso`). Usa el Pipeline completo `Pipeline([("prep", preprocesador), ("clf", LogisticRegression())])` para que cada paso reciba lo que espera.',
    },
    practicaGuiada: {
      id: 'm18-l3-practica',
      enunciado:
        'Entrena la línea base `DummyClassifier(strategy="most_frequent")` y calcula su accuracy sobre el conjunto de prueba con `accuracy_score(y_test, base.predict(X_test))`. Imprímela redondeada a 2 decimales.',
      codigoInicial: `from sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import accuracy_score\n${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\n# entrena la línea base e imprime su accuracy en prueba`,
      solucion: `from sklearn.dummy import DummyClassifier\nfrom sklearn.metrics import accuracy_score\n${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\nbase = DummyClassifier(strategy="most_frequent").fit(X_train, y_train)\nprint(round(accuracy_score(y_test, base.predict(X_test)), 2))`,
      pistas: ['`DummyClassifier(strategy="most_frequent").fit(X_train, y_train)`.', 'Predice siempre "se queda", así que acierta tantas veces como clientes se quedan.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.81'
        return { ok, mensaje: ok ? 'Correcto: 81% de accuracy sin aprender nada. Este es el número a superar.' : 'El resultado esperado es 0.81.' }
      },
    },
    reto: {
      id: 'm18-l3-reto',
      enunciado:
        'Entrena el Pipeline (preprocesador + `LogisticRegression()`) y calcula el **recall** de los clientes que abandonan sobre el conjunto de prueba con `recall_score(y_test, prediccion)`. Imprímelo redondeado a 2 decimales.',
      codigoInicial: `from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import recall_score\n${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\n# entrena el pipeline e imprime el recall en prueba`,
      solucion: `from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import recall_score\n${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\nmodelo = Pipeline([("prep", preprocesador), ("clf", LogisticRegression())]).fit(X_train, y_train)\nprediccion = modelo.predict(X_test)\nprint(round(recall_score(y_test, prediccion), 2))`,
      pistas: ['`Pipeline([("prep", preprocesador), ("clf", LogisticRegression())]).fit(X_train, y_train)`.', 'El recall mide qué fracción de los clientes que realmente abandonaron fue detectada.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.29'
        return { ok, mensaje: ok ? 'Correcto: el modelo detecta menos de 3 de cada 10 abandonos. Hay margen de mejora.' : 'El resultado esperado es 0.29.' }
      },
    },
    verificacion: [
      {
        id: 'm18-l3-q1',
        pregunta: '¿Para qué sirve el DummyClassifier en un proyecto?',
        opciones: [
          'Para reemplazar al modelo final',
          'Como línea base mínima que el modelo real debe superar',
          'Para imputar valores faltantes',
          'Para escalar variables',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Si tu modelo no mejora a "predecir siempre la clase mayoritaria", no está aportando valor.',
      },
      {
        id: 'm18-l3-q2',
        pregunta: 'El modelo tiene 86% de accuracy y la línea base 81%. ¿Cuál es la lectura más honesta?',
        opciones: [
          'El modelo es excelente',
          'La mejora en accuracy es pequeña; hay que mirar el recall de la clase que abandona',
          'La línea base es mejor',
          'Hay que descartar la columna de plan',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Con clases desbalanceadas la accuracy engaña: lo que importa es cuántos de los abandonos reales se detectan.',
      },
    ],
    resumen: [
      'La línea base `most_frequent` muestra cuánta accuracy se logra sin aprender nada (~81%).',
      'El Pipeline completo encadena preprocesamiento y modelo.',
      'La regresión logística inicial mejora poco la accuracy y detecta menos de 3 de cada 10 abandonos.',
      'Siempre compara contra una línea base antes de celebrar un resultado.',
    ],
    proximoPaso: 'El recall es bajo. Veremos cómo evaluar con más detalle y mejorarlo con class_weight.',
    conceptos: ['linea-base', 'dummyclassifier', 'pipeline-completo'],
  },
  {
    id: 'm18-l4',
    moduloId: 'modulo-18',
    titulo: 'Proyecto: evalúa bien y maneja el desbalance',
    objetivo: 'Evaluar con la matriz de confusión, precisión, recall y F1, y mejorar la detección de abandonos con class_weight="balanced".',
    porQueImporta:
      'El primer modelo acierta mucho pero deja pasar a siete de cada diez clientes que se van. Como objetivo de negocio es retenerlos, hay que cambiar el equilibrio entre precisión y recall conscientemente, no por casualidad.',
    concepto: `\`\`\`python
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score

confusion_matrix(y_test, prediccion)   # [[TN, FP], [FN, TP]]
\`\`\`

Con el modelo inicial, la matriz de confusión muestra muchos **falsos negativos**: clientes que abandonaron y no fueron detectados. Una forma directa de corregirlo es \`class_weight="balanced"\`, que hace que un error en la clase minoritaria pese más al entrenar:

\`\`\`python
LogisticRegression(class_weight="balanced")
\`\`\`

El resultado típico de este cambio:

- **Recall sube mucho** (se detectan más abandonos).
- **Precisión baja** (se generan más falsas alarmas).
- **Accuracy puede bajar**, y está bien: no es la métrica que importa aquí.

Esto es el **compromiso precisión–recall**. La decisión final depende del costo para el negocio: si contactar a un cliente que no se iba cuesta poco y perderlo cuesta mucho, conviene un recall alto aunque la precisión sea moderada. **F1** resume ambas en un número y sirve para comparar modelos.

Otra palanca es mover el **umbral** de decisión con \`predict_proba\`: en vez de marcar abandono cuando la probabilidad supera 0.5, se puede usar 0.3 para atrapar más casos riesgosos.`,
    ejemploMinimo: `from sklearn.metrics import confusion_matrix

print(confusion_matrix([1, 1, 0, 0], [1, 0, 0, 0]).tolist())`,
    ejemploAplicado: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_score, recall_score, f1_score
${IMPORTS_ML}

${GENERADOR}

${PREP}

for nombre, clf in [("Normal", LogisticRegression()), ("Balanceado", LogisticRegression(class_weight="balanced"))]:
    modelo = Pipeline([("prep", preprocesador), ("clf", clf)]).fit(X_train, y_train)
    pred = modelo.predict(X_test)
    print(nombre, "| precisión:", round(precision_score(y_test, pred), 2),
          "| recall:", round(recall_score(y_test, pred), 2),
          "| F1:", round(f1_score(y_test, pred), 2))`,
    errorFrecuente: {
      codigo: `modelo = Pipeline([("prep", preprocesador), ("clf", LogisticRegression(class_weight="balanced"))])
modelo.fit(X_train, y_train)
print(modelo.score(X_test, y_test))   # baja de 0.86 a 0.68: "empeoró, vuelvo al anterior"`,
      explicacion:
        'Que baje la accuracy al usar `class_weight="balanced"` es esperable: el modelo ahora acepta más falsas alarmas a cambio de detectar muchos más abandonos. Juzga el cambio con recall, precisión y F1 (y con el costo de negocio), no solo con accuracy.',
    },
    practicaGuiada: {
      id: 'm18-l4-practica',
      enunciado:
        'Con el Pipeline de regresión logística normal ya entrenado, calcula el **F1** de la clase "abandona" con `f1_score(y_test, prediccion)` e imprímelo redondeado a 2 decimales.',
      codigoInicial: `from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import f1_score\n${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\nmodelo = Pipeline([("prep", preprocesador), ("clf", LogisticRegression())]).fit(X_train, y_train)\nprediccion = modelo.predict(X_test)\n# imprime el F1 con 2 decimales`,
      solucion: `from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import f1_score\n${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\nmodelo = Pipeline([("prep", preprocesador), ("clf", LogisticRegression())]).fit(X_train, y_train)\nprediccion = modelo.predict(X_test)\nprint(round(f1_score(y_test, prediccion), 2))`,
      pistas: ['`f1_score(y_test, prediccion)` combina precisión y recall.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.43'
        return { ok, mensaje: ok ? 'Correcto: F1 de 0.43, un punto de partida modesto.' : 'El resultado esperado es 0.43.' }
      },
    },
    reto: {
      id: 'm18-l4-reto',
      enunciado:
        'Entrena dos Pipelines, uno con `LogisticRegression()` y otro con `LogisticRegression(class_weight="balanced")`. Imprime `True` si el **recall** del modelo balanceado es mayor que el del modelo normal.',
      codigoInicial: `from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import recall_score\n${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\n# entrena ambos modelos, calcula sus recalls e imprime si el balanceado es mayor`,
      solucion: `from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import recall_score\n${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\nnormal = Pipeline([("prep", preprocesador), ("clf", LogisticRegression())]).fit(X_train, y_train)\nbalanceado = Pipeline([("prep", preprocesador), ("clf", LogisticRegression(class_weight="balanced"))]).fit(X_train, y_train)\nrecall_normal = recall_score(y_test, normal.predict(X_test))\nrecall_balanceado = recall_score(y_test, balanceado.predict(X_test))\nprint(bool(recall_balanceado > recall_normal))`,
      pistas: ['Construye los dos Pipelines igual, cambiando solo `class_weight`.', 'Compara `recall_score(y_test, modelo.predict(X_test))` de cada uno.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'True'
        return { ok, mensaje: ok ? 'Correcto: el modelo balanceado detecta muchos más abandonos.' : 'El resultado esperado es True.' }
      },
    },
    verificacion: [
      {
        id: 'm18-l4-q1',
        pregunta: 'Al usar class_weight="balanced" suben el recall y las falsas alarmas. ¿Cuándo es una buena decisión?',
        opciones: [
          'Nunca, la accuracy bajó',
          'Cuando perder un cliente cuesta mucho más que contactar a uno que no se iba',
          'Solo si el dataset es muy pequeño',
          'Solo con variables categóricas',
        ],
        respuestaCorrecta: 1,
        explicacion: 'La elección entre precisión y recall debe seguir el costo relativo de cada tipo de error para el negocio.',
      },
      {
        id: 'm18-l4-q2',
        pregunta: '¿Qué efecto tiene bajar el umbral de decisión de 0.5 a 0.3 con predict_proba?',
        opciones: [
          'Se marcan menos clientes como abandono',
          'Se marcan más clientes como abandono: sube el recall y baja la precisión',
          'Sube la accuracy siempre',
          'No cambia nada',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Con un umbral más bajo basta una probabilidad menor para alertar, lo que detecta más abandonos a costa de más falsas alarmas.',
      },
    ],
    resumen: [
      'La matriz de confusión desglosa aciertos, falsas alarmas y abandonos no detectados.',
      '`class_weight="balanced"` sube el recall a costa de precisión y accuracy.',
      'El equilibrio correcto depende del costo de negocio de cada tipo de error.',
      'F1 resume precisión y recall; el umbral de `predict_proba` es otra palanca.',
    ],
    proximoPaso: 'Una sola división puede engañar. Compararemos modelos con validación cruzada y prepararemos las conclusiones.',
    conceptos: ['class-weight-proyecto', 'compromiso-precision-recall', 'metricas-churn'],
  },
  {
    id: 'm18-l5',
    moduloId: 'modulo-18',
    titulo: 'Proyecto: compara modelos y comunica conclusiones',
    objetivo: 'Comparar modelos con validación cruzada, interpretar los factores de abandono y redactar conclusiones accionables.',
    porQueImporta:
      'El trabajo no termina con una métrica: termina cuando alguien toma una decisión mejor gracias a tu análisis. Comparar con rigor y explicar los factores de abandono es lo que convierte un modelo en una recomendación de negocio.',
    concepto: `**1. Compara con validación cruzada** (más estable que una sola partición). Usa \`StratifiedKFold\` para conservar la proporción de abandono en cada pliegue y mide **F1**:

\`\`\`python
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
cross_val_score(modelo, X, y, cv=cv, scoring="f1")
\`\`\`

Como el Pipeline incluye el preprocesamiento, cada pliegue lo ajusta solo con sus datos de entrenamiento: sin leakage.

Se comparan tres candidatos: regresión logística normal, regresión logística balanceada y una red neuronal pequeña (\`MLPClassifier\`). Resultado típico: la logística balanceada gana. Una red más compleja **no es automáticamente mejor** en datos tabulares pequeños.

**2. Interpreta el modelo ganador.** La regresión logística tiene un coeficiente por feature: signo positivo = más riesgo de abandono, negativo = protege. Con \`get_feature_names_out()\` obtienes los nombres tras el preprocesamiento:

\`\`\`python
nombres = modelo.named_steps["prep"].get_feature_names_out()
coeficientes = modelo.named_steps["clf"].coef_[0]
\`\`\`

Las features están escaladas, así que sus coeficientes son comparables en magnitud.

**3. Comunica.** Un buen cierre incluye: el problema y la métrica elegida, la comparación con la línea base, los factores principales, **recomendaciones accionables** y las **limitaciones** (aquí, los datos son sintéticos; en la vida real validarías con datos recientes y vigilarías el modelo en producción).`,
    ejemploMinimo: `from sklearn.model_selection import StratifiedKFold

cv = StratifiedKFold(n_splits=3, shuffle=True, random_state=0)
print(cv.get_n_splits())`,
    ejemploAplicado: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score
${IMPORTS_ML}

${GENERADOR}

${PREP}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
candidatos = {
    "Logística": LogisticRegression(),
    "Logística balanceada": LogisticRegression(class_weight="balanced"),
}
for nombre, clf in candidatos.items():
    modelo = Pipeline([("prep", preprocesador), ("clf", clf)])
    f1 = cross_val_score(modelo, X, y, cv=cv, scoring="f1")
    print(nombre, "-> F1 medio:", round(f1.mean(), 2), "±", round(f1.std(), 2))`,
    errorFrecuente: {
      codigo: `# "Gana la red neuronal, ¡es más sofisticada!"
mejor = "Red neuronal"
print("Recomiendo la red neuronal para producción")`,
      explicacion:
        'Elegir un modelo por ser más complejo en lugar de por sus resultados con validación cruzada es un error común. Decide con la métrica adecuada (aquí F1 del abandono) y su variabilidad, y considera también la interpretabilidad: un modelo simple que ganó es más fácil de explicar y mantener.',
    },
    practicaGuiada: {
      id: 'm18-l5-practica',
      enunciado:
        'Entrena el Pipeline con regresión logística balanceada sobre **todos** los datos (`X`, `y`), obtén los nombres de las features y los coeficientes, y imprime la lista **ordenada alfabéticamente** de los 3 nombres con mayor coeficiente en valor absoluto. Pista: `sorted(...)` sobre los 3 primeros de una lista ordenada por `abs(coef)` de mayor a menor.',
      codigoInicial: `from sklearn.linear_model import LogisticRegression\n${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\nmodelo = Pipeline([("prep", preprocesador), ("clf", LogisticRegression(class_weight="balanced"))])\n# entrena con X, y; obtén nombres y coeficientes; imprime los 3 más importantes ordenados alfabéticamente`,
      solucion: `from sklearn.linear_model import LogisticRegression\n${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\nmodelo = Pipeline([("prep", preprocesador), ("clf", LogisticRegression(class_weight="balanced"))])\nmodelo.fit(X, y)\nnombres = modelo.named_steps["prep"].get_feature_names_out()\ncoeficientes = modelo.named_steps["clf"].coef_[0]\nordenados = sorted(zip(nombres, coeficientes), key=lambda par: abs(par[1]), reverse=True)\nprint(sorted(str(nombre) for nombre, _ in ordenados[:3]))`,
      pistas: ['`zip(nombres, coeficientes)` junta cada nombre con su coeficiente.', '`sorted(..., key=lambda par: abs(par[1]), reverse=True)` los ordena por magnitud.', 'Convierte los nombres con `str(...)` para imprimirlos limpios.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "['cat__plan_Basico', 'num__antiguedad_meses', 'num__tickets_soporte']"
        return { ok, mensaje: ok ? 'Correcto: plan Básico, pocos meses de antigüedad y muchos tickets de soporte son los factores clave.' : "El resultado esperado es ['cat__plan_Basico', 'num__antiguedad_meses', 'num__tickets_soporte']." }
      },
    },
    reto: {
      id: 'm18-l5-reto',
      enunciado:
        'Compara tres candidatos con validación cruzada (5 pliegues, F1) y, usando el diccionario `resultados` (nombre → F1 medio), imprime el nombre del **ganador** con `max(resultados, key=resultados.get)`.',
      codigoInicial: `from sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import StratifiedKFold, cross_val_score\nfrom sklearn.neural_network import MLPClassifier\n${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)\ncandidatos = {\n    "Logística": LogisticRegression(),\n    "Logística balanceada": LogisticRegression(class_weight="balanced"),\n    "Red neuronal": MLPClassifier(hidden_layer_sizes=(8,), max_iter=500, random_state=0),\n}\nresultados = {}\n# calcula el F1 medio de cada candidato en 'resultados' e imprime el nombre del ganador`,
      solucion: `from sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import StratifiedKFold, cross_val_score\nfrom sklearn.neural_network import MLPClassifier\n${IMPORTS_ML}\n\n${GENERADOR}\n\n${PREP}\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)\ncandidatos = {\n    "Logística": LogisticRegression(),\n    "Logística balanceada": LogisticRegression(class_weight="balanced"),\n    "Red neuronal": MLPClassifier(hidden_layer_sizes=(8,), max_iter=500, random_state=0),\n}\nresultados = {}\nfor nombre, clf in candidatos.items():\n    modelo = Pipeline([("prep", preprocesador), ("clf", clf)])\n    resultados[nombre] = cross_val_score(modelo, X, y, cv=cv, scoring="f1").mean()\nprint(max(resultados, key=resultados.get))`,
      pistas: ['Dentro de un bucle, crea el Pipeline de cada candidato y guarda `cross_val_score(...).mean()` en `resultados[nombre]`.', 'Usa `scoring="f1"` y `cv=cv`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Logística balanceada'
        return { ok, mensaje: ok ? 'Correcto: el modelo simple y balanceado supera a la red neuronal. Complejidad no es sinónimo de mejor resultado.' : 'El resultado esperado es "Logística balanceada".' }
      },
    },
    verificacion: [
      {
        id: 'm18-l5-q1',
        pregunta: '¿Cuál sería una recomendación de negocio coherente con los resultados del proyecto?',
        opciones: [
          'Ofrecer retención proactiva a clientes del plan Básico, con poca antigüedad y varios tickets de soporte',
          'Eliminar el plan Premium',
          'Ignorar los tickets de soporte',
          'Subir el precio a todos los clientes',
        ],
        respuestaCorrecta: 0,
        explicacion: 'Esos son los factores que más se asocian al abandono en el modelo; las acciones de retención deben enfocarse en ese perfil.',
      },
      {
        id: 'm18-l5-q2',
        pregunta: '¿Qué limitación debe mencionarse al presentar este proyecto?',
        opciones: [
          'Ninguna, el modelo es perfecto',
          'Que los datos son sintéticos y, en producción, habría que validar con datos reales y vigilar el modelo en el tiempo',
          'Que scikit-learn no sirve para esto',
          'Que no se usó una red neuronal más grande',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Todo reporte honesto declara sus límites: origen de los datos, periodo cubierto, y la necesidad de monitoreo y reentrenamiento.',
      },
    ],
    resumen: [
      'Compara candidatos con validación cruzada estratificada y una métrica alineada al negocio (F1 / recall del abandono).',
      'Un modelo más complejo no siempre gana: aquí la regresión logística balanceada supera a la red neuronal.',
      'Los coeficientes de la regresión logística permiten explicar qué factores empujan el abandono.',
      'Un buen cierre combina métricas, factores, recomendaciones accionables y limitaciones.',
    ],
    proximoPaso:
      'Con esto cierras el curso de Machine Learning. Para complementar tu perfil, los cursos de SQL, Terminal y Git, y Comunicación y negocio cubren las herramientas del día a día.',
    conceptos: ['comparacion-modelos', 'interpretacion-modelo', 'comunicacion-resultados', 'proyecto-integrador-ds'],
  },
]
