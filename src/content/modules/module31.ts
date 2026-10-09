import type { Lesson } from '../../types'

export const module31Lessons: Lesson[] = [
  {
    id: "m31-l1",
    moduloId: "modulo-31",
    titulo: "La lógica de las pruebas de hipótesis",
    objetivo: "Formular hipótesis nula y alternativa, calcular un estadístico z y un p-valor, y decidir con un nivel de significancia.",
    porQueImporta:
      "Las pruebas de hipótesis son el método estándar para decidir si un efecto observado (una mejora, una diferencia) es real o pudo deberse al azar. Entender su lógica evita malinterpretar el p-valor, el error más común en análisis de datos.",
    concepto: "Una prueba de hipótesis compara dos afirmaciones:\n\n- **H₀ (hipótesis nula)**: no hay efecto ni diferencia («la media es 100»).\n- **H₁ (alternativa)**: sí hay efecto («la media no es 100»).\n\nPasos:\n\n1. Fijar el nivel de significancia **α** (casi siempre 0.05).\n2. Calcular un **estadístico de prueba** a partir de la muestra (por ejemplo `z = (x̄ - μ₀) / (σ/√n)`).\n3. Calcular el **p-valor**: la probabilidad, **suponiendo que H₀ es cierta**, de obtener un resultado al menos tan extremo como el observado.\n4. Decidir: si `p < α`, se **rechaza H₀**; si no, **no se rechaza** (no se dice «se acepta»).\n\n```python\nfrom scipy.stats import norm\nz = (xbar - mu0) / (sigma / n ** 0.5)\np = 2 * norm.sf(abs(z))          # prueba bilateral\n```\n\n**Errores posibles**: tipo I (rechazar una H₀ verdadera, probabilidad α) y tipo II (no rechazar una H₀ falsa).\n\n**El p-valor NO es** la probabilidad de que H₀ sea cierta.",
    ejemploMinimo: "from scipy.stats import norm\n\nprint(round(2 * norm.sf(1.96), 4))",
    ejemploAplicado: "from scipy.stats import norm\n\nmu0, sigma, n, xbar = 100, 10, 25, 103\nz = (xbar - mu0) / (sigma / n ** 0.5)\np = 2 * norm.sf(abs(z))\n\nprint(\"z =\", round(z, 2))\nprint(\"p-valor =\", round(p, 4))\nprint(\"Decisión (α = 0.05):\", \"Se rechaza H0\" if p < 0.05 else \"No se rechaza H0\")",
    errorFrecuente: {
      codigo: "p = 0.0336\nprint(f\"Hay un {p:.1%} de probabilidad de que la hipótesis nula sea cierta\")",
      explicacion:
        "El p-valor es `P(datos tan extremos | H₀ cierta)`, no `P(H₀ cierta | datos)`. Son probabilidades condicionales invertidas (como en Bayes). Un p-valor de 0.03 dice que los datos serían poco comunes si H₀ fuera cierta, no que H₀ tenga 3 % de probabilidad.",
    },
    practicaGuiada: {
      id: "m31-l1-practica",
      enunciado: "Calcula el estadístico `z = (xbar - mu0) / (sigma / √n)` e imprímelo con 2 decimales.",
      codigoInicial: "mu0, sigma, n, xbar = 100, 10, 25, 103\n\nz = 0\nprint(z)",
      solucion: "mu0, sigma, n, xbar = 100, 10, 25, 103\n\nz = round((xbar - mu0) / (sigma / n ** 0.5), 2)\nprint(z)",
      pistas: ["El error estándar es `sigma / n ** 0.5`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 1.5) <= 0.005
        return { ok, mensaje: ok ? "Correcto: z = 1.5." : "El resultado esperado es 1.5." }
      },
    },
    reto: {
      id: "m31-l1-reto",
      enunciado: "Calcula el **p-valor bilateral** (`2 * norm.sf(abs(z))`) y la decisión con α = 0.05. Imprime dos líneas: el p-valor con 4 decimales y `Se rechaza H0` o `No se rechaza H0`.",
      codigoInicial: "from scipy.stats import norm\n\nmu0, sigma, n, xbar = 100, 10, 25, 103\nz = (xbar - mu0) / (sigma / n ** 0.5)\n\nprint(round(z, 4))\nprint(\"Se rechaza H0\")",
      solucion: "from scipy.stats import norm\n\nmu0, sigma, n, xbar = 100, 10, 25, 103\nz = (xbar - mu0) / (sigma / n ** 0.5)\n\np = 2 * norm.sf(abs(z))\nprint(round(p, 4))\nprint(\"Se rechaza H0\" if p < 0.05 else \"No se rechaza H0\")",
      pistas: ["`p = 2 * norm.sf(abs(z))`", "Compara `p` con 0.05."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"0.1336\",\"No se rechaza H0\"]"
        return { ok, mensaje: ok ? "Correcto: p = 0.1336 > 0.05, no hay evidencia suficiente." : "Se esperaba 0.1336 y «No se rechaza H0»." }
      },
    },
    verificacion: [
      {
        id: "m31-l1-q1",
        pregunta: "Si p-valor = 0.03 y α = 0.05, se debe:",
        opciones: ["Aceptar H₀", "Rechazar H₀", "Repetir el experimento", "Concluir que H₁ es cierta con 97 % de probabilidad"],
        respuestaCorrecta: 1,
        explicacion: "Como p < α se rechaza H₀. Eso no mide la probabilidad de que H₁ sea cierta.",
      },
      {
        id: "m31-l1-q2",
        pregunta: "¿Qué es un error de tipo I?",
        opciones: ["No rechazar una H₀ falsa", "Rechazar una H₀ verdadera", "Calcular mal z", "Usar muy pocos datos"],
        respuestaCorrecta: 1,
        explicacion: "Es un falso positivo; su probabilidad es α.",
      },
    ],
    resumen: ["H₀: sin efecto; H₁: hay efecto.", "p-valor: probabilidad de datos tan extremos si H₀ fuera cierta.", "Si p < α se rechaza H₀; si no, simplemente no se rechaza."],
    proximoPaso: "Aplicaremos esta lógica con la prueba t para una media.",
    conceptos: ["hipotesis-nula", "p-valor", "errores-tipo-i-ii"],
  },
  {
    id: "m31-l2",
    moduloId: "modulo-31",
    titulo: "Prueba t para una media",
    objetivo: "Contrastar la media de una muestra con un valor de referencia usando ttest_1samp.",
    porQueImporta:
      "Es la prueba clásica para preguntas como «¿el tiempo medio de entrega realmente supera los 50 minutos prometidos?» cuando solo se tiene una muestra pequeña y σ es desconocida.",
    concepto: "Cuando la desviación estándar poblacional es desconocida (lo habitual) el estadístico sigue una **distribución t** con `n - 1` grados de libertad:\n\n```\nt = (x̄ - μ₀) / (s / √n)\n```\n\nEn scipy:\n\n```python\nfrom scipy import stats\n\nresultado = stats.ttest_1samp(datos, popmean=50)\nresultado.statistic    # t\nresultado.pvalue       # p-valor bilateral\n```\n\n- La prueba es **bilateral** por defecto (H₁: μ ≠ μ₀).\n- Para una cola: `alternative=\"greater\"` o `alternative=\"less\"`.\n- Supuestos: observaciones independientes y distribución aproximadamente normal (o n suficientemente grande).",
    ejemploMinimo: "from scipy import stats\n\ndatos = [52, 48, 55, 60, 47, 53, 58, 51, 49, 56]\nprint(stats.ttest_1samp(datos, 50).pvalue < 0.05)",
    ejemploAplicado: "import pandas as pd\nfrom scipy import stats\n\ndatos = pd.Series([52, 48, 55, 60, 47, 53, 58, 51, 49, 56])\n\nr = stats.ttest_1samp(datos, popmean=50)\nprint(f\"media = {datos.mean():.1f}  t = {r.statistic:.3f}  p = {r.pvalue:.4f}\")",
    errorFrecuente: {
      codigo: "from scipy import stats\n\ndatos = [52, 48, 55, 60, 47, 53, 58, 51, 49, 56]\np = stats.ttest_1samp(datos, 50).pvalue\nprint(\"p > 0.05, así que la media es exactamente 50\")",
      explicacion:
        "No rechazar H₀ **no demuestra** que sea cierta: solo indica que no hay evidencia suficiente en contra con estos datos. La media muestral es 52.9 y con más datos podría detectarse una diferencia. «Ausencia de evidencia» no es «evidencia de ausencia».",
    },
    practicaGuiada: {
      id: "m31-l2-practica",
      enunciado: "Contrasta si la media de `datos` difiere de 50 con `stats.ttest_1samp` e imprime el **p-valor** con 4 decimales.",
      codigoInicial: "import pandas as pd\nfrom scipy import stats\n\ndatos = pd.Series([52, 48, 55, 60, 47, 53, 58, 51, 49, 56])\n\np = 1\nprint(p)",
      solucion: "import pandas as pd\nfrom scipy import stats\n\ndatos = pd.Series([52, 48, 55, 60, 47, 53, 58, 51, 49, 56])\n\np = round(stats.ttest_1samp(datos, popmean=50).pvalue, 4)\nprint(p)",
      pistas: ["`stats.ttest_1samp(datos, popmean=50).pvalue`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.0634) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: p = 0.0634 > 0.05, no se rechaza H₀." : "El resultado esperado es 0.0634." }
      },
    },
    reto: {
      id: "m31-l2-reto",
      enunciado: "Ahora contrasta contra `popmean=48`. Imprime `Se rechaza H0` si el p-valor es menor que 0.05 y `No se rechaza H0` en caso contrario.",
      codigoInicial: "import pandas as pd\nfrom scipy import stats\n\ndatos = pd.Series([52, 48, 55, 60, 47, 53, 58, 51, 49, 56])\n\nprint(\"No se rechaza H0\")",
      solucion: "import pandas as pd\nfrom scipy import stats\n\ndatos = pd.Series([52, 48, 55, 60, 47, 53, 58, 51, 49, 56])\n\np = stats.ttest_1samp(datos, popmean=48).pvalue\nprint(\"Se rechaza H0\" if p < 0.05 else \"No se rechaza H0\")",
      pistas: ["Calcula el p-valor con `popmean=48` y compáralo con 0.05."],
      validar: (stdout) => {
        const ok = stdout.trim() === "Se rechaza H0"
        return { ok, mensaje: ok ? "Correcto: con μ₀ = 48 el p-valor es 0.006." : "El resultado esperado es «Se rechaza H0»." }
      },
    },
    verificacion: [
      {
        id: "m31-l2-q1",
        pregunta: "¿Por qué se usa la distribución t y no la normal para esta prueba?",
        opciones: ["Porque la muestra es siempre grande", "Porque σ es desconocida y se estima con s", "Porque la t es más sencilla", "Porque los datos son categóricos"],
        respuestaCorrecta: 1,
        explicacion: "Al estimar σ con s se añade incertidumbre; la t tiene colas más pesadas para reflejarlo.",
      },
      {
        id: "m31-l2-q2",
        pregunta: "Si no se rechaza H₀, la conclusión correcta es:",
        opciones: ["H₀ es verdadera", "No hay evidencia suficiente para rechazar H₀", "H₁ es falsa", "El experimento falló"],
        respuestaCorrecta: 1,
        explicacion: "No rechazar no equivale a demostrar la hipótesis nula.",
      },
    ],
    resumen: ["`ttest_1samp` contrasta una media con un valor de referencia.", "Devuelve el estadístico t y el p-valor bilateral.", "No rechazar H₀ no prueba que sea cierta."],
    proximoPaso: "Compararemos dos grupos entre sí con la prueba t de dos muestras.",
    conceptos: ["prueba-t-una-muestra"],
  },
  {
    id: "m31-l3",
    moduloId: "modulo-31",
    titulo: "Comparar dos grupos: t independiente y t pareada",
    objetivo: "Comparar las medias de dos grupos independientes (Welch) y de mediciones pareadas (antes/después).",
    porQueImporta:
      "Comparar grupos es el corazón de la analítica aplicada: ¿vende más la tienda A que la B?, ¿mejoró la capacitación el desempeño? Elegir entre prueba independiente y pareada cambia por completo el resultado.",
    concepto: "- **Grupos independientes** (individuos distintos en cada grupo): prueba t de Welch.\n\n```python\nstats.ttest_ind(grupo_a, grupo_b, equal_var=False)\n```\n\n- **Mediciones pareadas** (los mismos individuos medidos dos veces, p. ej. antes y después): prueba t pareada.\n\n```python\nstats.ttest_rel(antes, despues)\n```\n\nLa pareada trabaja con las **diferencias** de cada individuo, eliminando la variabilidad entre personas, y por eso suele detectar efectos que la independiente no ve.\n\n`equal_var=False` (Welch) es la opción recomendada por defecto: no exige que ambos grupos tengan la misma varianza.",
    ejemploMinimo: "from scipy import stats\n\na = [23, 25, 28, 22, 26, 30, 27, 24]\nb = [29, 31, 27, 33, 35, 30, 32, 34]\nprint(round(stats.ttest_ind(a, b, equal_var=False).pvalue, 4))",
    ejemploAplicado: "import pandas as pd\nfrom scipy import stats\n\na = pd.Series([23, 25, 28, 22, 26, 30, 27, 24])\nb = pd.Series([29, 31, 27, 33, 35, 30, 32, 34])\n\nr = stats.ttest_ind(a, b, equal_var=False)\nprint(f\"media A = {a.mean():.2f}, media B = {b.mean():.2f}\")\nprint(f\"t = {r.statistic:.3f}, p = {r.pvalue:.4f}\")",
    errorFrecuente: {
      codigo: "from scipy import stats\n\nantes = [82, 75, 90, 68, 77, 85, 73, 80]\ndespues = [78, 72, 85, 66, 70, 83, 70, 76]\nprint(stats.ttest_ind(antes, despues).pvalue)",
      explicacion:
        "Son los **mismos 8 empleados** medidos antes y después: los datos están pareados. `ttest_ind` ignora ese emparejamiento y trata las mediciones como grupos distintos, de modo que pierde potencia (p ≈ 0.29 frente a p ≈ 0.0004 con la prueba pareada). Si hay emparejamiento, usa `ttest_rel`.",
    },
    practicaGuiada: {
      id: "m31-l3-practica",
      enunciado: "Compara los grupos independientes `a` y `b` con `ttest_ind(..., equal_var=False)` e imprime el **p-valor** con 4 decimales.",
      codigoInicial: "from scipy import stats\n\na = [23, 25, 28, 22, 26, 30, 27, 24]\nb = [29, 31, 27, 33, 35, 30, 32, 34]\n\np = 1\nprint(p)",
      solucion: "from scipy import stats\n\na = [23, 25, 28, 22, 26, 30, 27, 24]\nb = [29, 31, 27, 33, 35, 30, 32, 34]\n\np = round(stats.ttest_ind(a, b, equal_var=False).pvalue, 4)\nprint(p)",
      pistas: ["`stats.ttest_ind(a, b, equal_var=False).pvalue`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.0007) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: p = 0.0007; hay evidencia de que los grupos difieren." : "El resultado esperado es 0.0007." }
      },
    },
    reto: {
      id: "m31-l3-reto",
      enunciado: "Los mismos 8 empleados fueron evaluados antes y después de una capacitación. Usa la prueba **pareada** (`ttest_rel`) e imprime el p-valor con 4 decimales.",
      codigoInicial: "from scipy import stats\n\nantes = [82, 75, 90, 68, 77, 85, 73, 80]\ndespues = [78, 72, 85, 66, 70, 83, 70, 76]\n\np = stats.ttest_ind(antes, despues).pvalue\nprint(round(p, 4))",
      solucion: "from scipy import stats\n\nantes = [82, 75, 90, 68, 77, 85, 73, 80]\ndespues = [78, 72, 85, 66, 70, 83, 70, 76]\n\np = stats.ttest_rel(antes, despues).pvalue\nprint(round(p, 4))",
      pistas: ["Cambia `ttest_ind` por `ttest_rel`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.0004) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: p = 0.0004; hay una reducción significativa." : "El resultado esperado es 0.0004." }
      },
    },
    verificacion: [
      {
        id: "m31-l3-q1",
        pregunta: "¿Cuándo usarías una prueba t pareada?",
        opciones: ["Con dos grupos de personas distintas", "Con mediciones repetidas de los mismos individuos", "Con más de dos grupos", "Con variables categóricas"],
        respuestaCorrecta: 1,
        explicacion: "Cuando cada observación de un grupo tiene su pareja natural en el otro.",
      },
      {
        id: "m31-l3-q2",
        pregunta: "`equal_var=False` en `ttest_ind` significa:",
        opciones: ["Que los grupos son iguales", "Que no se asume igualdad de varianzas (Welch)", "Que no hay varianza", "Que la prueba es de una cola"],
        respuestaCorrecta: 1,
        explicacion: "Welch no supone varianzas iguales y es la opción más segura.",
      },
    ],
    resumen: ["Grupos distintos → `ttest_ind` (Welch); mismos individuos → `ttest_rel`.", "Ignorar el emparejamiento pierde potencia estadística.", "Un p-valor pequeño indica diferencia, no cuán grande ni importante es."],
    proximoPaso: "Veremos cómo comparar proporciones, la base del A/B testing.",
    conceptos: ["prueba-t-dos-muestras", "prueba-t-pareada"],
  },
  {
    id: "m31-l4",
    moduloId: "modulo-31",
    titulo: "Comparar proporciones y A/B testing",
    objetivo: "Contrastar dos tasas de conversión con una prueba z de dos proporciones y decidir si la diferencia es significativa.",
    porQueImporta:
      "Un A/B test compara dos versiones (una página, un correo, un precio) para saber cuál convierte más. Es probablemente la aplicación más común de la inferencia estadística en negocios.",
    concepto: "Se comparan dos proporciones `p̂₁ = x₁/n₁` y `p̂₂ = x₂/n₂`.\n\nBajo H₀ (las dos tasas son iguales) se usa la **proporción combinada**:\n\n```\np̂ = (x₁ + x₂) / (n₁ + n₂)\nEE = √( p̂(1 - p̂) · (1/n₁ + 1/n₂) )\nz = (p̂₂ - p̂₁) / EE\np-valor = 2 · P(Z > |z|)\n```\n\n```python\nfrom scipy.stats import norm\np_valor = 2 * norm.sf(abs(z))\n```\n\nBuenas prácticas de un A/B test:\n\n- Decide el tamaño de muestra y la duración **antes** de empezar.\n- No mires el p-valor cada día y detengas el test cuando salga significativo (inflas los falsos positivos).\n- Un resultado significativo no implica que el efecto sea grande o rentable.",
    ejemploMinimo: "x1, n1 = 200, 2000\nx2, n2 = 250, 2000\nprint(x1 / n1, x2 / n2)",
    ejemploAplicado: "from scipy.stats import norm\n\nx1, n1 = 200, 2000      # versión A\nx2, n2 = 250, 2000      # versión B\n\np_comb = (x1 + x2) / (n1 + n2)\nee = (p_comb * (1 - p_comb) * (1 / n1 + 1 / n2)) ** 0.5\nz = (x2 / n2 - x1 / n1) / ee\n\nprint(f\"p combinada = {p_comb:.4f}   z = {z:.3f}   p-valor = {2 * norm.sf(abs(z)):.4f}\")",
    errorFrecuente: {
      codigo: "x1, n1 = 200, 2000\nx2, n2 = 250, 2000\nprint(\"B es mejor:\", x2 > x1)",
      explicacion:
        "Comparar conteos o porcentajes a simple vista no dice si la diferencia es real o ruido de muestreo. 12.5 % frente a 10 % puede parecer claro, pero hay que verificar con una prueba que tenga en cuenta el tamaño de las muestras.",
    },
    practicaGuiada: {
      id: "m31-l4-practica",
      enunciado: "Calcula la **proporción combinada** `(x1 + x2) / (n1 + n2)` e imprímela con 4 decimales.",
      codigoInicial: "x1, n1 = 200, 2000\nx2, n2 = 250, 2000\n\np_comb = 0\nprint(p_comb)",
      solucion: "x1, n1 = 200, 2000\nx2, n2 = 250, 2000\n\np_comb = round((x1 + x2) / (n1 + n2), 4)\nprint(p_comb)",
      pistas: ["Suma los éxitos de ambos grupos y divide entre el total de observaciones."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.1125) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: p combinada = 0.1125." : "El resultado esperado es 0.1125." }
      },
    },
    reto: {
      id: "m31-l4-reto",
      enunciado: "Calcula el **p-valor bilateral** de la prueba z de dos proporciones e imprímelo con 4 decimales.",
      codigoInicial: "from scipy.stats import norm\n\nx1, n1 = 200, 2000\nx2, n2 = 250, 2000\n\np_comb = (x1 + x2) / (n1 + n2)\nee = (p_comb * (1 - p_comb) * (1 / n1 + 1 / n2)) ** 0.5\n\np_valor = 1\nprint(round(p_valor, 4))",
      solucion: "from scipy.stats import norm\n\nx1, n1 = 200, 2000\nx2, n2 = 250, 2000\n\np_comb = (x1 + x2) / (n1 + n2)\nee = (p_comb * (1 - p_comb) * (1 / n1 + 1 / n2)) ** 0.5\nz = (x2 / n2 - x1 / n1) / ee\n\np_valor = 2 * norm.sf(abs(z))\nprint(round(p_valor, 4))",
      pistas: ["Calcula `z = (x2/n2 - x1/n1) / ee`.", "Luego `2 * norm.sf(abs(z))`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.0124) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: p = 0.0124 < 0.05; la diferencia es significativa." : "El resultado esperado es 0.0124." }
      },
    },
    verificacion: [
      {
        id: "m31-l4-q1",
        pregunta: "¿Por qué no es buena práctica detener un A/B test en cuanto el p-valor baja de 0.05?",
        opciones: ["Porque el p-valor no cambia", "Porque mirar repetidamente y parar al primer resultado significativo infla los falsos positivos", "Porque el test debe durar un año", "Porque B siempre es mejor"],
        respuestaCorrecta: 1,
        explicacion: "Cada vez que se mira hay una nueva oportunidad de un falso positivo; hay que fijar el diseño de antemano.",
      },
      {
        id: "m31-l4-q2",
        pregunta: "Un A/B test da p = 0.01. Esto significa:",
        opciones: ["Que B es mucho mejor", "Que la diferencia observada sería muy poco probable si A y B fueran iguales", "Que hay 1 % de probabilidad de que B sea mejor", "Que A es peor"],
        respuestaCorrecta: 1,
        explicacion: "Indica incompatibilidad con H₀, no el tamaño ni la importancia del efecto.",
      },
    ],
    resumen: ["Bajo H₀ se usa la proporción combinada para el error estándar.", "z = diferencia de proporciones / EE; p-valor = 2·sf(|z|).", "Define de antemano el tamaño de muestra del A/B test."],
    proximoPaso: "Cerraremos el módulo con la prueba chi-cuadrado para variables categóricas.",
    conceptos: ["ab-testing", "prueba-dos-proporciones"],
  },
  {
    id: "m31-l5",
    moduloId: "modulo-31",
    titulo: "Prueba chi-cuadrado de independencia",
    objetivo: "Contrastar si dos variables categóricas están asociadas usando una tabla de contingencia y chi2_contingency.",
    porQueImporta:
      "Muchas preguntas de negocio cruzan categorías: ¿el plan contratado se asocia con el abandono?, ¿el canal con la compra? La chi-cuadrado dice si la asociación observada puede ser casualidad.",
    concepto: "La prueba **chi-cuadrado de independencia** compara la tabla de conteos observados con la que se esperaría si las dos variables fueran independientes (H₀).\n\n```python\nimport numpy as np\nfrom scipy import stats\n\ntabla = np.array([[30, 70],     # plan básico: abandonó / se quedó\n                  [10, 90]])    # plan premium\nchi2, p, gl, esperadas = stats.chi2_contingency(tabla)\n```\n\n- `chi2`: estadístico de la prueba.\n- `p`: p-valor. Si es menor que α, hay evidencia de asociación.\n- `gl`: grados de libertad.\n- `esperadas`: la tabla de frecuencias esperadas bajo independencia.\n\nCondición habitual: las frecuencias esperadas deben ser ≥ 5 en (casi) todas las celdas.\n\nLa prueba dice **si** hay asociación, no **cuán fuerte** es ni la dirección: para eso, compara las proporciones por fila.",
    ejemploMinimo: "import numpy as np\nfrom scipy import stats\n\ntabla = np.array([[30, 70], [10, 90]])\nchi2, p, gl, esperadas = stats.chi2_contingency(tabla)\nprint(gl)",
    ejemploAplicado: "import numpy as np\nfrom scipy import stats\n\ntabla = np.array([[30, 70], [10, 90]])\nchi2, p, gl, esperadas = stats.chi2_contingency(tabla)\n\nprint(f\"chi2 = {chi2:.3f}   gl = {gl}   p = {p:.4f}\")\nprint(\"Frecuencias esperadas:\")\nprint(esperadas)",
    errorFrecuente: {
      codigo: "import pandas as pd\nfrom scipy import stats\n\ndf = pd.DataFrame({\"plan\": [\"basico\", \"premium\"], \"abandonos\": [30, 10]})\nprint(stats.chi2_contingency(df[\"abandonos\"]))",
      explicacion:
        "La prueba espera una **tabla de contingencia** de dos dimensiones (conteos por combinación de categorías), no una sola columna. Construye la tabla completa (abandonó / se quedó para cada plan) con `pd.crosstab` o `np.array([[...], [...]])`.",
    },
    practicaGuiada: {
      id: "m31-l5-practica",
      enunciado: "Aplica `chi2_contingency` a la tabla e imprime el **p-valor** con 4 decimales.",
      codigoInicial: "import numpy as np\nfrom scipy import stats\n\ntabla = np.array([[30, 70], [10, 90]])\n\np = 1\nprint(p)",
      solucion: "import numpy as np\nfrom scipy import stats\n\ntabla = np.array([[30, 70], [10, 90]])\n\nchi2, p, gl, esperadas = stats.chi2_contingency(tabla)\nprint(round(p, 4))",
      pistas: ["`chi2, p, gl, esperadas = stats.chi2_contingency(tabla)`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.0008) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: p = 0.0008; hay asociación entre plan y abandono." : "El resultado esperado es 0.0008." }
      },
    },
    reto: {
      id: "m31-l5-reto",
      enunciado: "Imprime la **frecuencia esperada** de la primera celda (plan básico que abandona) bajo independencia: `esperadas[0][0]`.",
      codigoInicial: "import numpy as np\nfrom scipy import stats\n\ntabla = np.array([[30, 70], [10, 90]])\n\nchi2, p, gl, esperadas = stats.chi2_contingency(tabla)\nprint(tabla[0][0])      # esto es lo observado, no lo esperado",
      solucion: "import numpy as np\nfrom scipy import stats\n\ntabla = np.array([[30, 70], [10, 90]])\n\nchi2, p, gl, esperadas = stats.chi2_contingency(tabla)\nprint(esperadas[0][0])",
      pistas: ["La cuarta salida de `chi2_contingency` es la tabla de esperadas."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 20.0) <= 0.005
        return { ok, mensaje: ok ? "Correcto: si no hubiera asociación se esperarían 20 abandonos en el plan básico." : "El resultado esperado es 20.0." }
      },
    },
    verificacion: [
      {
        id: "m31-l5-q1",
        pregunta: "La hipótesis nula de la prueba chi-cuadrado de independencia es que:",
        opciones: ["Las variables están asociadas", "Las variables son independientes", "Las medias son iguales", "Hay más de dos grupos"],
        respuestaCorrecta: 1,
        explicacion: "H₀: no hay relación entre las dos variables categóricas.",
      },
      {
        id: "m31-l5-q2",
        pregunta: "Un p-valor pequeño en chi-cuadrado indica:",
        opciones: ["Que la asociación es fuerte", "Que hay evidencia de asociación, sin decir su fuerza", "Que las variables son independientes", "Que los datos son erróneos"],
        respuestaCorrecta: 1,
        explicacion: "Detecta si hay asociación, no cuán grande es; para eso se miran proporciones.",
      },
    ],
    resumen: ["`chi2_contingency` compara observados con esperados bajo independencia.", "Devuelve chi2, p-valor, grados de libertad y frecuencias esperadas.", "Indica si hay asociación, no su fuerza ni su dirección."],
    proximoPaso: "En el siguiente módulo modelaremos relaciones entre variables numéricas con regresión.",
    conceptos: ["chi-cuadrado", "independencia-categoricas"],
  },
]
