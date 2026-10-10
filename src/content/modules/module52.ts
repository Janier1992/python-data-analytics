import type { Lesson } from '../../types'

export const module52Lessons: Lesson[] = [
  {
    id: "m52-l1",
    moduloId: "modulo-52",
    titulo: "Análisis y modelo: línea base, validación y fugas de información",
    objetivo: "Construir un modelo con una línea base de comparación, evaluarlo en datos de prueba y detectar variables que filtran la respuesta (fuga de información).",
    porQueImporta:
      "Un modelo con 99 % de exactitud suele ser señal de un error, no de un éxito. Comparar contra una línea base, separar bien entrenamiento y prueba y revisar las fugas es lo que distingue un análisis confiable de uno que solo lo parece.",
    concepto: "> **Nota**: este curso **no puede calificar tu proyecto personal** (no hay servidor ni evaluadores). Lo que sí hace: te da un método, herramientas de autoevaluación y verificaciones automáticas sobre un caso guiado con datos sintéticos. Para que tu proyecto valga en el portafolio, pide retroalimentación a una persona con experiencia (mentores, comunidades, colegas).\n\nPasos del análisis en el caso guiado (¿qué clientes se darán de baja?):\n\n1. **Línea base**: un modelo trivial contra el que comparar. Para clasificación, predecir siempre la clase mayoritaria. Si tu modelo no la supera con claridad, no aporta.\n2. **Separar datos**: entrenamiento y prueba (aquí 75 % / 25 %, con `stratify` para mantener la proporción de bajas y una semilla fija). El modelo solo se evalúa con datos que **no vio** al entrenar.\n3. **Modelo simple primero**: regresión logística; es rápida, interpretable y suele ser un buen punto de partida.\n4. **Métricas adecuadas**: exactitud, pero también **F1** (equilibra precisión y recall) y **AUC** (qué tan bien ordena a los clientes por riesgo). Con clases desbalanceadas, la exactitud engaña.\n5. **Revisar fugas**: una **fuga de información** (*data leakage*) ocurre cuando una variable contiene información que no existiría **en el momento de predecir**. Ejemplo: `motivo_baja` solo tiene valor para quien ya se dio de baja; usarla para «predecir» la baja da un resultado perfecto y falso. Señales de alerta: una variable casi perfectamente correlacionada con el objetivo, o métricas demasiado buenas.\n6. **Interpretar y limitar**: qué variables pesan más y qué **no** se puede concluir (correlación no es causalidad).\n\nUna advertencia honesta sobre este caso: los datos son **sintéticos y generados por una regla**, por lo que el modelo los aprende con facilidad. Con datos reales los resultados suelen ser bastante peores, y eso es normal: no es un fracaso, es el trabajo.",
    ejemploMinimo: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score, f1_score, roc_auc_score\nfrom sklearn.model_selection import train_test_split\n\nX = pd.get_dummies(clientes[[\"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\"]], drop_first=True).astype(float)\ny = clientes[\"baja\"]\nX_entrenamiento, X_prueba, y_entrenamiento, y_prueba = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\n\nmayoritaria = max(y_prueba.mean(), 1 - y_prueba.mean())\nprint(\"Línea base (clase mayoritaria):\", round(mayoritaria, 2))",
    ejemploAplicado: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score, f1_score, roc_auc_score\nfrom sklearn.model_selection import train_test_split\n\nX = pd.get_dummies(clientes[[\"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\"]], drop_first=True).astype(float)\ny = clientes[\"baja\"]\nX_entrenamiento, X_prueba, y_entrenamiento, y_prueba = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\n\nmodelo = LogisticRegression(max_iter=1000).fit(X_entrenamiento, y_entrenamiento)\npredicho = modelo.predict(X_prueba)\nprint(\"Exactitud:\", round(accuracy_score(y_prueba, predicho), 2))\nprint(\"F1:\", round(f1_score(y_prueba, predicho), 2))\nprint(\"AUC:\", round(roc_auc_score(y_prueba, modelo.predict_proba(X_prueba)[:, 1]), 2))",
    errorFrecuente: {
      codigo: "X = clientes[[\"antiguedad_meses\", \"tickets_mes\", \"motivo_baja\"]]     # motivo_baja solo existe si ya hubo baja\n→ exactitud 100 %: el modelo \"predice\" lo que ya sabe",
      explicacion:
        "Si el modelo acierta casi todo, desconfía. Una variable que solo se conoce **después** del evento que quieres predecir (el motivo de la baja, la fecha de cancelación) hace trampa: en producción no la tendrás. Para cada variable pregunta: ¿la conocería en el momento de la predicción?",
    },
    practicaGuiada: {
      id: "m52-l1-practica",
      enunciado: "Calcula la **línea base** (exactitud de predecir siempre la clase mayoritaria en el conjunto de prueba) y la **exactitud del modelo** de regresión logística entrenado con `X_entrenamiento`. Imprime `baseline <valor>` y `modelo <valor>`, ambos con 2 decimales.",
      codigoInicial: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score, f1_score, roc_auc_score\nfrom sklearn.model_selection import train_test_split\n\nX = pd.get_dummies(clientes[[\"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\"]], drop_first=True).astype(float)\ny = clientes[\"baja\"]\nX_entrenamiento, X_prueba, y_entrenamiento, y_prueba = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\n\nprint(\"baseline\", None)\nprint(\"modelo\", None)",
      solucion: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score, f1_score, roc_auc_score\nfrom sklearn.model_selection import train_test_split\n\nX = pd.get_dummies(clientes[[\"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\"]], drop_first=True).astype(float)\ny = clientes[\"baja\"]\nX_entrenamiento, X_prueba, y_entrenamiento, y_prueba = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)\n\nbaseline = max(y_prueba.mean(), 1 - y_prueba.mean())\nmodelo = LogisticRegression(max_iter=1000).fit(X_entrenamiento, y_entrenamiento)\nexactitud = accuracy_score(y_prueba, modelo.predict(X_prueba))\nprint(\"baseline\", round(baseline, 2))\nprint(\"modelo\", round(exactitud, 2))",
      pistas: ["La línea base es la proporción de la clase más frecuente en `y_prueba`.", "Entrena `LogisticRegression(max_iter=1000)` y evalúa con `accuracy_score` en `X_prueba`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"baseline 0.55\",\"modelo 0.92\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: baseline 0.55\nmodelo 0.92" }
      },
    },
    reto: {
      id: "m52-l1-reto",
      enunciado: "Escribe `variables_sospechosas(df, objetivo, umbral)`: devuelve la **lista ordenada** de columnas (distintas del objetivo) cuya **correlación absoluta** con el objetivo supera el umbral. Para columnas de texto usa su indicador de «tiene valor» (`notna()`) como número. Úsala con umbral `0.9` sobre `clientes` para detectar la fuga.",
      codigoInicial: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\ndef variables_sospechosas(df, objetivo, umbral):\n    return None\n\nprint(variables_sospechosas(clientes, \"baja\", 0.9))",
      solucion: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\ndef variables_sospechosas(df, objetivo, umbral):\n    sospechosas = []\n    for columna in df.columns:\n        if columna == objetivo:\n            continue\n        serie = df[columna]\n        numerica = serie if pd.api.types.is_numeric_dtype(serie) else serie.notna().astype(float)\n        if numerica.nunique() < 2:          # una columna constante no tiene correlación\n            continue\n        correlacion = numerica.corr(df[objetivo])\n        if abs(correlacion) > umbral:\n            sospechosas.append(columna)\n    return sorted(sospechosas)\n\nprint(variables_sospechosas(clientes, \"baja\", 0.9))",
      pistas: ["Convierte las columnas de texto con `serie.notna().astype(float)`.", "`numerica.corr(df[objetivo])` da la correlación; omite las columnas constantes (`nunique() < 2`)."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"['motivo_baja']\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: ['motivo_baja']" }
      },
    },
    verificacion: [
      {
        id: "m52-l1-q1",
        pregunta: "¿Para qué sirve una línea base?",
        opciones: ["Para decorar el informe", "Para comparar: un modelo útil debe superarla con claridad", "Para acelerar el entrenamiento", "Para validar los datos"],
        respuestaCorrecta: 1,
        explicacion: "Sin una referencia simple no se sabe si el modelo aporta algo.",
      },
      {
        id: "m52-l1-q2",
        pregunta: "¿Qué es una fuga de información (data leakage)?",
        opciones: ["Perder datos", "Usar una variable que contiene información que no existiría al momento de predecir", "Un error de red", "Un tipo de modelo"],
        respuestaCorrecta: 1,
        explicacion: "Produce métricas excelentes y falsas que no se repiten en producción.",
      },
      {
        id: "m52-l1-q3",
        pregunta: "¿Por qué evaluar con datos que el modelo no vio?",
        opciones: ["Por costumbre", "Porque mide cómo se comportará con casos nuevos, no cuánto memorizó", "Porque es más rápido", "No es necesario"],
        respuestaCorrecta: 1,
        explicacion: "La separación entrenamiento/prueba da una estimación honesta del rendimiento.",
      },
    ],
    resumen: ["Línea base → separar datos → modelo simple → métricas adecuadas (F1, AUC) → revisar fugas.", "Métricas casi perfectas son señal de alerta, no de éxito.", "Datos sintéticos facilitan el problema: con datos reales los resultados suelen ser más modestos."],
    proximoPaso: "Convertiremos el análisis en un mensaje de negocio: resumen ejecutivo, escenarios y recomendaciones.",
    conceptos: ["baseline", "data-leakage"],
  },
  {
    id: "m52-l2",
    moduloId: "modulo-52",
    titulo: "Comunicar resultados: impacto de negocio y recomendaciones",
    objetivo: "Traducir resultados del análisis a un impacto de negocio con supuestos explícitos, un análisis de sensibilidad y recomendaciones con sus límites.",
    porQueImporta:
      "Quien lee tu proyecto (un reclutador, un jefe) no quiere saber el AUC: quiere saber qué debe hacer y cuánto vale. Convertir un resultado técnico en una decisión, con sus supuestos a la vista, es la habilidad que más diferencia a un analista.",
    concepto: "> **Nota**: este curso **no puede calificar tu proyecto personal** (no hay servidor ni evaluadores). Lo que sí hace: te da un método, herramientas de autoevaluación y verificaciones automáticas sobre un caso guiado con datos sintéticos. Para que tu proyecto valga en el portafolio, pide retroalimentación a una persona con experiencia (mentores, comunidades, colegas).\n\n**Resumen ejecutivo**: tres o cuatro frases que responden a la pregunta del proyecto, con las cifras clave y la recomendación. Ejemplo de estructura: *hallazgo → magnitud → recomendación → límite*.\n\n**Impacto de negocio con supuestos explícitos**. Un modelo de bajas por sí solo no genera valor: lo genera una **acción** (por ejemplo, una campaña de retención). Para estimar su valor necesitas supuestos, y deben estar **escritos y a la vista**:\n\n- Cuántos clientes se contactan.\n- Cuánto cuesta contactar a cada uno.\n- En cuántos puntos porcentuales se espera reducir la baja (¡supuesto, no un dato!).\n- Cuánto vale conservar a un cliente (margen que aportaría en el tiempo restante).\n\n`beneficio neto = clientes × reducción × valor − clientes × costo_por_cliente`\n\n**Análisis de sensibilidad**: como los supuestos son inciertos, muestra qué pasa si cambian (reducción de 2, 5 o 10 puntos) y calcula el **punto de equilibrio** (la reducción mínima para que la campaña no pierda dinero: `costo / valor`). Así la decisión no depende de un único número optimista.\n\n**Límites que debes decir**:\n\n- Los datos son una foto del pasado; no prueban que la campaña funcione (eso se comprueba con un **experimento**, por ejemplo una prueba A/B).\n- Correlación no es causalidad: un cliente con muchos tickets no se va *por* los tickets.\n- Los resultados aplican a los clientes y al periodo analizados.\n\nRecomienda un **siguiente paso concreto y barato** (por ejemplo, un piloto con un grupo de control antes de escalar).\n\nLos valores monetarios de los ejercicios son **ficticios**.",
    ejemploMinimo: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\nprint(clientes.groupby(\"plan\")[\"baja\"].mean().round(3).to_dict())",
    ejemploAplicado: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\nbasico = clientes[clientes[\"plan\"] == \"Basico\"]\nprint(\"Clientes Basico:\", len(basico), \"- tasa de baja:\", round(basico[\"baja\"].mean(), 3))\nprint(\"Bajas esperadas sin campaña:\", int(basico[\"baja\"].sum()))",
    errorFrecuente: {
      codigo: "\"El modelo identifica a los clientes en riesgo, así que la campaña reducirá las bajas en un 30 %.\"",
      explicacion:
        "Predecir quién se irá **no** prueba que contactarlo evite que se vaya. La reducción de bajas por una campaña es un supuesto (o el resultado de un experimento), no algo que salga del modelo. Preséntalo como supuesto, calcula con varios escenarios y propón un piloto con grupo de control.",
    },
    practicaGuiada: {
      id: "m52-l2-practica",
      enunciado: "Estima el beneficio neto de una campaña de retención dirigida a los clientes del plan `Basico`. Supuestos: reduce la baja en **10 puntos porcentuales**; cada cliente retenido vale **120** (ficticio); contactar a cada cliente cuesta **5**. Imprime `clientes <n>`, `retenidos <n>` (clientes × reducción, 1 decimal) y `neto <valor>` (1 decimal).",
      codigoInicial: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\nREDUCCION, VALOR, COSTO = 0.10, 120, 5\nbasico = clientes[clientes[\"plan\"] == \"Basico\"]\n\nprint(\"neto\", None)",
      solucion: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\nREDUCCION, VALOR, COSTO = 0.10, 120, 5\nbasico = clientes[clientes[\"plan\"] == \"Basico\"]\n\nn = len(basico)\nretenidos = n * REDUCCION\nneto = retenidos * VALOR - n * COSTO\nprint(\"clientes\", n)\nprint(\"retenidos\", round(retenidos, 1))\nprint(\"neto\", round(neto, 1))",
      pistas: ["Clientes = `len(basico)`; retenidos = clientes × 0.10.", "Neto = retenidos × valor − clientes × costo."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"clientes 134\",\"retenidos 13.4\",\"neto 938.0\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: clientes 134\nretenidos 13.4\nneto 938.0" }
      },
    },
    reto: {
      id: "m52-l2-reto",
      enunciado: "Haz el **análisis de sensibilidad**: calcula el beneficio neto para reducciones de la baja de 2, 5 y 10 puntos porcentuales (misma población, valor y costo) e imprime `puntos neto` (1 decimal). Después imprime el **punto de equilibrio** en puntos porcentuales (`costo / valor × 100`, 2 decimales) como `equilibrio <valor>`.",
      codigoInicial: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\nVALOR, COSTO = 120, 5\nn = int((clientes[\"plan\"] == \"Basico\").sum())\n\nprint(\"equilibrio\", None)",
      solucion: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\nVALOR, COSTO = 120, 5\nn = int((clientes[\"plan\"] == \"Basico\").sum())\n\nfor puntos in (2, 5, 10):\n    neto = n * (puntos / 100) * VALOR - n * COSTO\n    print(puntos, round(neto, 1))\nprint(\"equilibrio\", round(COSTO / VALOR * 100, 2))",
      pistas: ["Neto(p) = n × (p/100) × valor − n × costo.", "El equilibrio es el p que hace el neto igual a 0."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"2 -348.4\",\"5 134.0\",\"10 938.0\",\"equilibrio 4.17\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 2 -348.4\n5 134.0\n10 938.0\nequilibrio 4.17" }
      },
    },
    verificacion: [
      {
        id: "m52-l2-q1",
        pregunta: "¿Por qué los supuestos de una estimación de impacto deben estar a la vista?",
        opciones: ["Por estética", "Porque determinan el resultado y el lector debe poder juzgarlos y cambiarlos", "Porque lo exige Python", "Para alargar el informe"],
        respuestaCorrecta: 1,
        explicacion: "Un número sin supuestos visibles no se puede evaluar ni discutir.",
      },
      {
        id: "m52-l2-q2",
        pregunta: "¿Qué es el punto de equilibrio en el análisis de la campaña?",
        opciones: ["El máximo beneficio", "La reducción mínima de bajas para que la campaña no pierda dinero", "El número de clientes", "La tasa de baja actual"],
        respuestaCorrecta: 1,
        explicacion: "Es el punto donde el beneficio neto es cero.",
      },
      {
        id: "m52-l2-q3",
        pregunta: "¿Cómo se comprueba realmente si una campaña reduce las bajas?",
        opciones: ["Con el AUC del modelo", "Con un experimento (por ejemplo, un piloto con grupo de control)", "Con un gráfico", "No se puede"],
        respuestaCorrecta: 1,
        explicacion: "Predecir el riesgo no prueba el efecto de la acción: hace falta un experimento.",
      },
    ],
    resumen: ["Resumen ejecutivo: hallazgo → magnitud → recomendación → límite.", "El valor lo genera una acción: estima su impacto con supuestos escritos y sensibilidad.", "Propón un siguiente paso concreto (piloto con grupo de control) y di qué no se puede concluir."],
    proximoPaso: "Cerramos con la documentación, la revisión final y la publicación del proyecto.",
    conceptos: ["impacto-de-negocio", "sensibilidad"],
  },
  {
    id: "m52-l3",
    moduloId: "modulo-52",
    titulo: "Documentar, revisar y publicar el proyecto",
    objetivo: "Escribir un README completo, revisarlo con una lista de comprobación, autoevaluar el proyecto con una rúbrica y publicarlo con una presentación breve.",
    porQueImporta:
      "El README es lo primero (y a veces lo único) que se lee de tu proyecto. Un trabajo excelente con un README pobre pasa desapercibido; uno bien documentado se entiende en dos minutos.",
    concepto: "> **Nota**: este curso **no puede calificar tu proyecto personal** (no hay servidor ni evaluadores). Lo que sí hace: te da un método, herramientas de autoevaluación y verificaciones automáticas sobre un caso guiado con datos sintéticos. Para que tu proyecto valga en el portafolio, pide retroalimentación a una persona con experiencia (mentores, comunidades, colegas).\n\n**Estructura de un buen README**\n\n1. **Problema**: la pregunta de negocio y la decisión que informa, en dos o tres frases.\n2. **Datos**: fuente, licencia, periodo, tamaño y un enlace al diccionario de datos.\n3. **Método**: pasos del análisis (limpieza, línea base, modelo, validación) y por qué.\n4. **Resultados**: cifras clave y un gráfico o dos; la recomendación.\n5. **Limitaciones**: qué no se puede concluir, supuestos, posibles sesgos.\n6. **Cómo reproducir**: versión de Python, instalar dependencias (`pip install -r requirements.txt`) y qué ejecutar, en un bloque de código.\n\n**Lista de comprobación final**\n\n- Repositorio público con nombre descriptivo y descripción corta, y una licencia.\n- Estructura ordenada; sin claves, contraseñas ni datos personales; `.gitignore` configurado.\n- Notebooks limpios (se ejecutan de arriba abajo sin errores) o scripts en `src/`.\n- Resultados reproducibles (semillas y versiones).\n- Un resumen visual: capturas del tablero o un informe en PDF dentro de `reports/`.\n- Un texto breve para LinkedIn o tu portafolio y una **presentación de 2 minutos**: problema → qué hiciste → qué encontraste → qué recomiendas → qué limitaciones tiene.\n\n**Rúbrica de autoevaluación (100 puntos)**\n\n- Pregunta, decisión y alcance: 10\n- Datos y control de calidad: 15\n- Análisis, modelo y validación (línea base, fugas): 25\n- Comunicación (resumen ejecutivo, impacto, visuales): 20\n- Reproducibilidad y repositorio: 20\n- Honestidad sobre límites y ética (privacidad, sesgo): 10\n\nPuntúate con honestidad por criterio, y pide a otra persona que haga lo mismo: las diferencias muestran dónde mejorar. Para preparar la entrevista, repasa el módulo de portafolio y entrevistas del curso de Comunicación y negocio.",
    ejemploMinimo: "readme = \"\"\"# Riesgo de baja de clientes\n\n## Problema\n¿Qué clientes tienen más riesgo de darse de baja?\n\n## Datos\nClientes sintéticos (ficticios).\n\"\"\"\nsecciones = [linea[3:] for linea in readme.splitlines() if linea.startswith(\"## \")]\nprint(secciones)",
    ejemploAplicado: "import unicodedata\n\ndef normalizar(texto):\n    sin_tildes = unicodedata.normalize(\"NFD\", texto.lower())\n    return \"\".join(c for c in sin_tildes if unicodedata.category(c) != \"Mn\")\n\nprint(normalizar(\"Método y Limitaciones\"))",
    errorFrecuente: {
      codigo: "README.md: \"Proyecto de análisis de datos. Ver notebook.\"",
      explicacion:
        "Un README de una línea obliga al lector a abrir el notebook y descifrar el proyecto: la mayoría no lo hará. Escribe el README pensando en alguien que tiene dos minutos: qué problema resolviste, con qué datos, qué encontraste y cómo reproducirlo.",
    },
    practicaGuiada: {
      id: "m52-l3-practica",
      enunciado: "Escribe `secciones_faltantes(readme)`: busca los encabezados (líneas que empiezan por `#`), normalízalos (minúsculas y sin tildes) y devuelve la **lista ordenada** de las secciones obligatorias que no aparecen: `problema`, `datos`, `metodo`, `resultados`, `limitaciones` y `reproducir`. Una sección cuenta si el encabezado **contiene** esa palabra.",
      codigoInicial: "import unicodedata\n\nOBLIGATORIAS = [\"problema\", \"datos\", \"metodo\", \"resultados\", \"limitaciones\", \"reproducir\"]\n\ndef normalizar(texto):\n    sin_tildes = unicodedata.normalize(\"NFD\", texto.lower())\n    return \"\".join(c for c in sin_tildes if unicodedata.category(c) != \"Mn\")\n\ndef secciones_faltantes(readme):\n    return None\n\ncompleto = \"\"\"# Proyecto\n## Problema\n## Datos\n## Método\n## Resultados\n## Limitaciones\n## Cómo reproducir\n\"\"\"\nincompleto = \"\"\"# Proyecto\n## Descripción\n## Datos\n## Resultados\n\"\"\"\nprint(secciones_faltantes(completo))\nprint(secciones_faltantes(incompleto))",
      solucion: "import unicodedata\n\nOBLIGATORIAS = [\"problema\", \"datos\", \"metodo\", \"resultados\", \"limitaciones\", \"reproducir\"]\n\ndef normalizar(texto):\n    sin_tildes = unicodedata.normalize(\"NFD\", texto.lower())\n    return \"\".join(c for c in sin_tildes if unicodedata.category(c) != \"Mn\")\n\ndef secciones_faltantes(readme):\n    encabezados = [normalizar(linea) for linea in readme.splitlines() if linea.startswith(\"#\")]\n    return sorted(s for s in OBLIGATORIAS if not any(s in e for e in encabezados))\n\ncompleto = \"\"\"# Proyecto\n## Problema\n## Datos\n## Método\n## Resultados\n## Limitaciones\n## Cómo reproducir\n\"\"\"\nincompleto = \"\"\"# Proyecto\n## Descripción\n## Datos\n## Resultados\n\"\"\"\nprint(secciones_faltantes(completo))\nprint(secciones_faltantes(incompleto))",
      pistas: ["Los encabezados son las líneas que empiezan por `#`.", "Comprueba `s in e` para cada sección obligatoria `s` y cada encabezado normalizado `e`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"[]\",\"['limitaciones', 'metodo', 'problema', 'reproducir']\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: []\n['limitaciones', 'metodo', 'problema', 'reproducir']" }
      },
    },
    reto: {
      id: "m52-l3-reto",
      enunciado: "Escribe `calificar(puntajes)`: recibe un diccionario con el puntaje obtenido en cada criterio de la rúbrica (máximos: `pregunta` 10, `datos` 15, `analisis` 25, `comunicacion` 20, `reproducibilidad` 20, `etica` 10) y devuelve `(total, nivel)`: el total y el nivel (`\"excelente\"` si es 85 o más, `\"bueno\"` si es 70 o más, `\"en progreso\"` si es 50 o más y `\"inicial\"` en otro caso). Si algún puntaje supera su máximo, devuelve `(\"puntaje invalido\", None)`.",
      codigoInicial: "MAXIMOS = {\"pregunta\": 10, \"datos\": 15, \"analisis\": 25, \"comunicacion\": 20, \"reproducibilidad\": 20, \"etica\": 10}\n\ndef calificar(puntajes):\n    return None\n\ncasos = [\n    {\"pregunta\": 9, \"datos\": 13, \"analisis\": 22, \"comunicacion\": 17, \"reproducibilidad\": 18, \"etica\": 8},\n    {\"pregunta\": 7, \"datos\": 10, \"analisis\": 15, \"comunicacion\": 12, \"reproducibilidad\": 10, \"etica\": 6},\n    {\"pregunta\": 4, \"datos\": 8, \"analisis\": 10, \"comunicacion\": 8, \"reproducibilidad\": 5, \"etica\": 3},\n    {\"pregunta\": 12, \"datos\": 8, \"analisis\": 10, \"comunicacion\": 8, \"reproducibilidad\": 5, \"etica\": 3},\n]\nfor c in casos:\n    print(calificar(c))",
      solucion: "MAXIMOS = {\"pregunta\": 10, \"datos\": 15, \"analisis\": 25, \"comunicacion\": 20, \"reproducibilidad\": 20, \"etica\": 10}\n\ndef calificar(puntajes):\n    if any(puntajes[c] > MAXIMOS[c] for c in MAXIMOS):\n        return (\"puntaje invalido\", None)\n    total = sum(puntajes[c] for c in MAXIMOS)\n    if total >= 85:\n        nivel = \"excelente\"\n    elif total >= 70:\n        nivel = \"bueno\"\n    elif total >= 50:\n        nivel = \"en progreso\"\n    else:\n        nivel = \"inicial\"\n    return (total, nivel)\n\ncasos = [\n    {\"pregunta\": 9, \"datos\": 13, \"analisis\": 22, \"comunicacion\": 17, \"reproducibilidad\": 18, \"etica\": 8},\n    {\"pregunta\": 7, \"datos\": 10, \"analisis\": 15, \"comunicacion\": 12, \"reproducibilidad\": 10, \"etica\": 6},\n    {\"pregunta\": 4, \"datos\": 8, \"analisis\": 10, \"comunicacion\": 8, \"reproducibilidad\": 5, \"etica\": 3},\n    {\"pregunta\": 12, \"datos\": 8, \"analisis\": 10, \"comunicacion\": 8, \"reproducibilidad\": 5, \"etica\": 3},\n]\nfor c in casos:\n    print(calificar(c))",
      pistas: ["Primero valida que ningún puntaje supere su máximo.", "Evalúa los niveles de mayor a menor umbral."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"(87, 'excelente')\",\"(60, 'en progreso')\",\"(38, 'inicial')\",\"('puntaje invalido', None)\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: (87, 'excelente')\n(60, 'en progreso')\n(38, 'inicial')\n('puntaje invalido', None)" }
      },
    },
    verificacion: [
      {
        id: "m52-l3-q1",
        pregunta: "¿Qué debe incluir como mínimo el README de un proyecto?",
        opciones: ["Solo el título", "Problema, datos, método, resultados, limitaciones y cómo reproducir", "Solo el código", "Solo imágenes"],
        respuestaCorrecta: 1,
        explicacion: "Permite entender y reproducir el proyecto en pocos minutos.",
      },
      {
        id: "m52-l3-q2",
        pregunta: "¿Por qué incluir una sección de limitaciones?",
        opciones: ["Para restar mérito al proyecto", "Porque la honestidad sobre lo que no se puede concluir es señal de criterio profesional", "Porque es obligatorio por ley", "Para alargar el README"],
        respuestaCorrecta: 1,
        explicacion: "Mostrar los límites genera confianza en el resto del trabajo.",
      },
      {
        id: "m52-l3-q3",
        pregunta: "¿Qué conviene tener antes de publicar el repositorio?",
        opciones: ["Claves en el código", "Sin claves ni datos personales, con `.gitignore` y una licencia", "Notebooks con errores", "Rutas absolutas"],
        respuestaCorrecta: 1,
        explicacion: "Revisa que no se filtre nada sensible y que el proyecto corra desde cero.",
      },
    ],
    resumen: ["README con problema, datos, método, resultados, limitaciones y cómo reproducir.", "Lista de comprobación: repositorio ordenado, sin secretos, reproducible, con resumen visual y presentación de 2 minutos.", "Autoevalúate con la rúbrica y pide retroalimentación a una persona con experiencia."],
    proximoPaso: "¡Has llegado al final de la ruta! Publica tu proyecto, compártelo y sigue construyendo: el mejor portafolio es el que se actualiza.",
    conceptos: ["readme", "rubrica-de-proyecto"],
  },
]
