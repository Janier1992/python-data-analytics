import type { Lesson } from '../../types'

export const module32Lessons: Lesson[] = [
  {
    id: "m32-l1",
    moduloId: "modulo-32",
    titulo: "Regresión lineal simple",
    objetivo: "Ajustar una recta a dos variables numéricas con linregress e interpretar su pendiente e intercepto.",
    porQueImporta:
      "La regresión es la herramienta básica para cuantificar relaciones: «por cada hora extra de estudio, ¿cuánto sube la nota?». Es también el punto de partida de los modelos predictivos que verás más adelante.",
    concepto: "La **regresión lineal simple** ajusta la recta `y = a + b·x` que mejor describe cómo cambia `y` cuando cambia `x` (mínimos cuadrados: minimiza la suma de los errores al cuadrado).\n\n- **Pendiente (b)**: cuánto cambia `y` en promedio por cada unidad que aumenta `x`.\n- **Intercepto (a)**: el valor predicho de `y` cuando `x = 0` (a veces no tiene sentido práctico).\n\n```python\nfrom scipy import stats\n\nr = stats.linregress(x, y)\nr.slope        # b\nr.intercept    # a\nr.rvalue       # correlación\nr.pvalue       # p-valor de H0: pendiente = 0\nr.stderr       # error estándar de la pendiente\nprediccion = r.intercept + r.slope * 9\n```\n\nPredecir **dentro** del rango de `x` observado (interpolar) es razonable; **fuera** de él (extrapolar) es arriesgado.",
    ejemploMinimo: "from scipy import stats\n\nx = [1, 2, 3, 4, 5]\ny = [2, 4, 6, 8, 10]\nprint(stats.linregress(x, y).slope)",
    ejemploAplicado: "import numpy as np\nfrom scipy import stats\n\nhoras = np.array([1, 2, 3, 4, 5, 6, 7, 8])\nnotas = np.array([2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6])\n\nr = stats.linregress(horas, notas)\nprint(f\"nota = {r.intercept:.2f} + {r.slope:.2f} · horas\")\nprint(f\"r = {r.rvalue:.3f}, p = {r.pvalue:.6f}\")",
    errorFrecuente: {
      codigo: "import numpy as np\nfrom scipy import stats\n\nhoras = np.array([1, 2, 3, 4, 5, 6, 7, 8])\nnotas = np.array([2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6])\nr = stats.linregress(horas, notas)\nprint(\"Con 40 horas la nota esperada es\", r.intercept + r.slope * 40)",
      explicacion:
        "Es una **extrapolación** muy fuera del rango observado (1 a 8 horas): el modelo da una nota de 14.15, imposible en una escala de 1 a 5. La recta solo describe la relación dentro de los datos que vio; fuera de ese rango no hay garantía de que siga siendo lineal.",
    },
    practicaGuiada: {
      id: "m32-l1-practica",
      enunciado: "Ajusta la regresión de `notas` sobre `horas` con `stats.linregress` e imprime la **pendiente** con 2 decimales.",
      codigoInicial: "import numpy as np\nfrom scipy import stats\n\nhoras = np.array([1, 2, 3, 4, 5, 6, 7, 8])\nnotas = np.array([2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6])\n\npendiente = 0\nprint(pendiente)",
      solucion: "import numpy as np\nfrom scipy import stats\n\nhoras = np.array([1, 2, 3, 4, 5, 6, 7, 8])\nnotas = np.array([2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6])\n\npendiente = round(stats.linregress(horas, notas).slope, 2)\nprint(pendiente)",
      pistas: ["`stats.linregress(horas, notas).slope`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.3) <= 0.005
        return { ok, mensaje: ok ? "Correcto: cada hora extra sube la nota 0.30 puntos en promedio." : "El resultado esperado es 0.3." }
      },
    },
    reto: {
      id: "m32-l1-reto",
      enunciado: "Predice la nota esperada para un estudiante que estudia **9 horas** (`intercepto + pendiente · 9`). Imprímela con 2 decimales.",
      codigoInicial: "import numpy as np\nfrom scipy import stats\n\nhoras = np.array([1, 2, 3, 4, 5, 6, 7, 8])\nnotas = np.array([2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6])\nr = stats.linregress(horas, notas)\n\nprediccion = r.slope * 9      # falta sumar el intercepto\nprint(round(prediccion, 2))",
      solucion: "import numpy as np\nfrom scipy import stats\n\nhoras = np.array([1, 2, 3, 4, 5, 6, 7, 8])\nnotas = np.array([2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6])\nr = stats.linregress(horas, notas)\n\nprediccion = r.intercept + r.slope * 9\nprint(round(prediccion, 2))",
      pistas: ["La recta es `intercepto + pendiente · x`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 4.85) <= 0.006
        return { ok, mensaje: ok ? "Correcto: 2.15 + 0.30·9 = 4.85." : "El resultado esperado es 4.85." }
      },
    },
    verificacion: [
      {
        id: "m32-l1-q1",
        pregunta: "En `y = 2.15 + 0.30·x`, el 0.30 significa:",
        opciones: ["Que y vale 0.30 cuando x = 0", "Que por cada unidad que sube x, y sube en promedio 0.30", "Que la correlación es 0.30", "Que hay 30 % de error"],
        respuestaCorrecta: 1,
        explicacion: "La pendiente es el cambio promedio de y por unidad de x.",
      },
      {
        id: "m32-l1-q2",
        pregunta: "¿Qué es la extrapolación y por qué es riesgosa?",
        opciones: ["Predecir dentro del rango de datos, es seguro", "Predecir fuera del rango observado, donde la relación puede no ser lineal", "Eliminar atípicos", "Aumentar n"],
        respuestaCorrecta: 1,
        explicacion: "No hay datos que respalden que el patrón continúe fuera del rango.",
      },
    ],
    resumen: ["La regresión ajusta la recta que minimiza los errores al cuadrado.", "Pendiente = cambio promedio de y por unidad de x.", "Evita extrapolar fuera del rango de los datos."],
    proximoPaso: "Veremos cómo medir la calidad del ajuste con R² y los residuos.",
    conceptos: ["regresion-lineal-simple", "pendiente-intercepto"],
  },
  {
    id: "m32-l2",
    moduloId: "modulo-32",
    titulo: "R², residuos y calidad del ajuste",
    objetivo: "Interpretar el coeficiente de determinación R² y analizar los residuos de una regresión.",
    porQueImporta:
      "Una recta siempre se puede ajustar, pero no siempre es buena. R² y los residuos dicen cuánto de la variación explica el modelo y si hay patrones que el modelo no captó.",
    concepto: "- **Residuo**: la diferencia entre el valor real y el predicho: `e = y - ŷ`.\n- **R²** (coeficiente de determinación): la fracción de la variabilidad de `y` que explica el modelo. Va de 0 a 1. En regresión simple es el cuadrado de la correlación: `R² = r²`.\n\n```python\nr = stats.linregress(x, y)\nprediccion = r.intercept + r.slope * x\nresiduos = y - prediccion\nr2 = r.rvalue ** 2\n```\n\nQué mirar en los residuos:\n\n- Deben oscilar al azar alrededor de 0, sin patrón (curva, abanico).\n- Residuos muy grandes señalan observaciones mal ajustadas o atípicas.\n- La suma de los cuadrados de los residuos (SSE) es lo que la regresión minimiza.\n\nUn R² alto **no** prueba causalidad ni que el modelo sea correcto.",
    ejemploMinimo: "from scipy import stats\n\nx = [1, 2, 3, 4, 5]\ny = [2.1, 3.9, 6.2, 7.8, 10.1]\nprint(round(stats.linregress(x, y).rvalue ** 2, 4))",
    ejemploAplicado: "import numpy as np\nfrom scipy import stats\n\nx = np.array([1, 2, 3, 4, 5, 6, 7, 8])\ny = np.array([2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6])\n\nr = stats.linregress(x, y)\nresiduos = y - (r.intercept + r.slope * x)\n\nprint(\"R² =\", round(r.rvalue ** 2, 3))\nprint(\"Residuos:\", residuos.round(2).tolist())",
    errorFrecuente: {
      codigo: "from scipy import stats\n\nx = [1, 2, 3, 4, 5, 6, 7, 8]\ny = [2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6]\nr = stats.linregress(x, y)\nprint(\"R² =\", r.rvalue)",
      explicacion:
        "`rvalue` es la **correlación** r (0.979), no R². El coeficiente de determinación es su cuadrado: `r.rvalue ** 2` = 0.959. Confundirlos exagera cuánto explica el modelo.",
    },
    practicaGuiada: {
      id: "m32-l2-practica",
      enunciado: "Calcula **R²** (`rvalue ** 2`) de la regresión e imprímelo con 3 decimales.",
      codigoInicial: "import numpy as np\nfrom scipy import stats\n\nx = np.array([1, 2, 3, 4, 5, 6, 7, 8])\ny = np.array([2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6])\nr = stats.linregress(x, y)\n\nr2 = r.rvalue\nprint(round(r2, 3))",
      solucion: "import numpy as np\nfrom scipy import stats\n\nx = np.array([1, 2, 3, 4, 5, 6, 7, 8])\ny = np.array([2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6])\nr = stats.linregress(x, y)\n\nr2 = r.rvalue ** 2\nprint(round(r2, 3))",
      pistas: ["Eleva `r.rvalue` al cuadrado."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.959) <= 0.0006
        return { ok, mensaje: ok ? "Correcto: el modelo explica el 95.9 % de la variación." : "El resultado esperado es 0.959." }
      },
    },
    reto: {
      id: "m32-l2-reto",
      enunciado: "Calcula los residuos (`y - (intercepto + pendiente · x)`) e imprime el **mayor residuo en valor absoluto** con 2 decimales. Señala qué observación se ajusta peor.",
      codigoInicial: "import numpy as np\nfrom scipy import stats\n\nx = np.array([1, 2, 3, 4, 5, 6, 7, 8])\ny = np.array([2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6])\nr = stats.linregress(x, y)\n\nresiduos = y - y.mean()      # los residuos son respecto a la recta, no a la media\nprint(round(np.abs(residuos).max(), 2))",
      solucion: "import numpy as np\nfrom scipy import stats\n\nx = np.array([1, 2, 3, 4, 5, 6, 7, 8])\ny = np.array([2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6])\nr = stats.linregress(x, y)\n\nresiduos = y - (r.intercept + r.slope * x)\nprint(round(np.abs(residuos).max(), 2))",
      pistas: ["Predice con `r.intercept + r.slope * x` y réstale eso a `y`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.35) <= 0.006
        return { ok, mensaje: ok ? "Correcto: el residuo mayor es 0.35 (la observación x = 4)." : "El resultado esperado es 0.35." }
      },
    },
    verificacion: [
      {
        id: "m32-l2-q1",
        pregunta: "Un R² de 0.80 significa que:",
        opciones: ["El modelo acierta el 80 % de las predicciones", "El modelo explica el 80 % de la variabilidad de y", "La correlación es 0.80", "Hay 20 datos"],
        respuestaCorrecta: 1,
        explicacion: "R² es la proporción de variación de y explicada por el modelo.",
      },
      {
        id: "m32-l2-q2",
        pregunta: "¿Qué indicaría un patrón curvo en los residuos?",
        opciones: ["Que el modelo es perfecto", "Que la relación no es lineal y el modelo la ajusta mal", "Que n es grande", "Que hay que eliminar la pendiente"],
        respuestaCorrecta: 1,
        explicacion: "Los residuos de un buen modelo lineal no muestran patrones.",
      },
    ],
    resumen: ["Residuo = valor real - valor predicho.", "R² = fracción de variación explicada; en simple, R² = r².", "Los residuos deben parecer ruido sin patrón."],
    proximoPaso: "Pasaremos a la regresión múltiple con varias variables explicativas.",
    conceptos: ["r-cuadrado", "residuos"],
  },
  {
    id: "m32-l3",
    moduloId: "modulo-32",
    titulo: "Regresión múltiple con statsmodels",
    objetivo: "Ajustar un modelo con varias variables explicativas con statsmodels e interpretar sus coeficientes controlando por las demás.",
    porQueImporta:
      "En la práctica un resultado depende de varios factores a la vez. La regresión múltiple aísla el efecto de cada uno manteniendo constantes los demás, algo que las correlaciones simples no hacen.",
    concepto: "La regresión múltiple modela `y = b₀ + b₁·x₁ + b₂·x₂ + …`. Cada coeficiente `bᵢ` es el cambio promedio de `y` por unidad de `xᵢ` **manteniendo constantes las demás variables**.\n\n```python\nimport pandas as pd\nimport statsmodels.api as sm\n\nX = sm.add_constant(df[[\"x1\", \"x2\"]])     # añade el intercepto\nmodelo = sm.OLS(df[\"y\"], X).fit()\n\nmodelo.params         # coeficientes\nmodelo.pvalues        # p-valor de cada coeficiente\nmodelo.rsquared       # R²\nmodelo.summary()      # resumen completo\n```\n\nCuidado con:\n\n- **Multicolinealidad**: si dos variables explicativas están muy correlacionadas, sus coeficientes se vuelven inestables.\n- Añadir variables siempre sube R²; para comparar modelos conviene el **R² ajustado**.",
    ejemploMinimo: "import numpy as np\nimport statsmodels.api as sm\n\nx = np.array([1, 2, 3, 4, 5, 6.0])\ny = np.array([3, 5, 7, 9, 11, 13.0])\nmodelo = sm.OLS(y, sm.add_constant(x)).fit()\nprint(modelo.params.round(2))",
    ejemploAplicado: "import numpy as np\nimport pandas as pd\nimport statsmodels.api as sm\n\ndf = pd.DataFrame({\n    \"x1\": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10.0],\n    \"x2\": [5, 3, 6, 2, 7, 4, 8, 3, 6, 5.0],\n})\nruido = np.array([.1, -.2, .15, -.1, .2, -.15, .05, .1, -.05, -.1])\ndf[\"y\"] = 2 + 3 * df[\"x1\"] - 1 * df[\"x2\"] + ruido\n\nmodelo = sm.OLS(df[\"y\"], sm.add_constant(df[[\"x1\", \"x2\"]])).fit()\nprint(modelo.params.round(3))\nprint(\"R² =\", round(modelo.rsquared, 4))",
    errorFrecuente: {
      codigo: "import pandas as pd\nimport statsmodels.api as sm\n\ndf = pd.DataFrame({\"x1\": [1, 2, 3, 4, 5.0], \"y\": [3, 5, 7, 9, 11.0]})\nmodelo = sm.OLS(df[\"y\"], df[[\"x1\"]]).fit()\nprint(modelo.params)",
      explicacion:
        "Falta `sm.add_constant`: sin él, statsmodels fuerza la recta a pasar por el origen (sin intercepto) y los coeficientes cambian. Aquí obtendría una pendiente de 2.27 en lugar de la verdadera (2) con intercepto 1.",
    },
    practicaGuiada: {
      id: "m32-l3-practica",
      enunciado: "Ajusta el modelo y de `x1` y `x2` e imprime el coeficiente de **`x1`** redondeado a 2 decimales.",
      codigoInicial: "import numpy as np\nimport pandas as pd\nimport statsmodels.api as sm\n\ndf = pd.DataFrame({\n    \"x1\": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10.0],\n    \"x2\": [5, 3, 6, 2, 7, 4, 8, 3, 6, 5.0],\n})\nruido = np.array([.1, -.2, .15, -.1, .2, -.15, .05, .1, -.05, -.1])\ndf[\"y\"] = 2 + 3 * df[\"x1\"] - 1 * df[\"x2\"] + ruido\n\ncoef_x1 = 0\nprint(coef_x1)",
      solucion: "import numpy as np\nimport pandas as pd\nimport statsmodels.api as sm\n\ndf = pd.DataFrame({\n    \"x1\": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10.0],\n    \"x2\": [5, 3, 6, 2, 7, 4, 8, 3, 6, 5.0],\n})\nruido = np.array([.1, -.2, .15, -.1, .2, -.15, .05, .1, -.05, -.1])\ndf[\"y\"] = 2 + 3 * df[\"x1\"] - 1 * df[\"x2\"] + ruido\n\nmodelo = sm.OLS(df[\"y\"], sm.add_constant(df[[\"x1\", \"x2\"]])).fit()\ncoef_x1 = round(modelo.params[\"x1\"], 2)\nprint(coef_x1)",
      pistas: ["`sm.OLS(df[\"y\"], sm.add_constant(df[[\"x1\", \"x2\"]])).fit()`", "`modelo.params[\"x1\"]`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 2.99) <= 0.006
        return { ok, mensaje: ok ? "Correcto: cada unidad de x1 suma 2.99 a y, manteniendo x2 constante." : "El resultado esperado es 2.99." }
      },
    },
    reto: {
      id: "m32-l3-reto",
      enunciado: "Imprime el **R²** del modelo (`modelo.rsquared`) con 4 decimales.",
      codigoInicial: "import numpy as np\nimport pandas as pd\nimport statsmodels.api as sm\n\ndf = pd.DataFrame({\n    \"x1\": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10.0],\n    \"x2\": [5, 3, 6, 2, 7, 4, 8, 3, 6, 5.0],\n})\nruido = np.array([.1, -.2, .15, -.1, .2, -.15, .05, .1, -.05, -.1])\ndf[\"y\"] = 2 + 3 * df[\"x1\"] - 1 * df[\"x2\"] + ruido\n\nmodelo = sm.OLS(df[\"y\"], sm.add_constant(df[[\"x1\"]])).fit()      # solo usa x1\nprint(round(modelo.rsquared, 4))",
      solucion: "import numpy as np\nimport pandas as pd\nimport statsmodels.api as sm\n\ndf = pd.DataFrame({\n    \"x1\": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10.0],\n    \"x2\": [5, 3, 6, 2, 7, 4, 8, 3, 6, 5.0],\n})\nruido = np.array([.1, -.2, .15, -.1, .2, -.15, .05, .1, -.05, -.1])\ndf[\"y\"] = 2 + 3 * df[\"x1\"] - 1 * df[\"x2\"] + ruido\n\nmodelo = sm.OLS(df[\"y\"], sm.add_constant(df[[\"x1\", \"x2\"]])).fit()\nprint(round(modelo.rsquared, 4))",
      pistas: ["Incluye ambas variables: `df[[\"x1\", \"x2\"]]`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.9998) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: con ambas variables el modelo explica casi toda la variación." : "El resultado esperado es 0.9998." }
      },
    },
    verificacion: [
      {
        id: "m32-l3-q1",
        pregunta: "En regresión múltiple, el coeficiente de x₁ se interpreta como el cambio en y por unidad de x₁:",
        opciones: ["Sin importar las demás variables", "Manteniendo constantes las demás variables", "Multiplicado por R²", "Solo si x₂ = 0"],
        respuestaCorrecta: 1,
        explicacion: "Es el efecto de x₁ controlando por el resto de variables del modelo.",
      },
      {
        id: "m32-l3-q2",
        pregunta: "¿Qué hace `sm.add_constant`?",
        opciones: ["Elimina el intercepto", "Añade la columna de unos para estimar el intercepto", "Estandariza las variables", "Calcula R²"],
        respuestaCorrecta: 1,
        explicacion: "Sin ella, el modelo no tiene intercepto.",
      },
    ],
    resumen: ["`sm.OLS(y, sm.add_constant(X)).fit()` ajusta la regresión múltiple.", "Cada coeficiente es el efecto de su variable manteniendo las otras constantes.", "Vigila la multicolinealidad y compara modelos con R² ajustado."],
    proximoPaso: "Veremos ANOVA, que compara las medias de tres o más grupos.",
    conceptos: ["regresion-multiple", "statsmodels-ols"],
  },
  {
    id: "m32-l4",
    moduloId: "modulo-32",
    titulo: "ANOVA: comparar tres o más grupos",
    objetivo: "Contrastar si las medias de varios grupos difieren con un ANOVA de un factor (f_oneway).",
    porQueImporta:
      "Comparar varios grupos con muchas pruebas t acumula falsos positivos. El ANOVA hace una sola prueba global: ¿hay alguna diferencia entre los grupos?",
    concepto: "El **ANOVA de un factor** contrasta:\n\n- **H₀**: todas las medias de los grupos son iguales.\n- **H₁**: al menos una media es distinta.\n\nCompara la variabilidad **entre** grupos con la variabilidad **dentro** de los grupos mediante el estadístico **F**.\n\n```python\nfrom scipy import stats\n\nF, p = stats.f_oneway(grupo1, grupo2, grupo3)\n```\n\nSi `p < α`, hay evidencia de que **alguna** media difiere, pero el ANOVA **no dice cuál**. Para saberlo se hacen comparaciones posteriores (por ejemplo, la prueba de Tukey) o pruebas t con corrección por comparaciones múltiples.\n\nSupuestos: observaciones independientes, aproximadamente normales dentro de cada grupo y varianzas parecidas.",
    ejemploMinimo: "from scipy import stats\n\ng1, g2, g3 = [1, 2, 3], [2, 3, 4], [5, 6, 7]\nprint(round(stats.f_oneway(g1, g2, g3).statistic, 2))",
    ejemploAplicado: "from scipy import stats\n\nmañana = [23, 25, 28, 22, 26, 30, 27, 24]\ntarde = [29, 31, 27, 33, 35, 30, 32, 34]\nnoche = [38, 36, 41, 35, 40, 37, 39, 42]\n\nF, p = stats.f_oneway(mañana, tarde, noche)\nprint(f\"F = {F:.2f}   p = {p:.2e}\")",
    errorFrecuente: {
      codigo: "from scipy import stats\n\ng1 = [23, 25, 28, 22, 26, 30, 27, 24]\ng2 = [29, 31, 27, 33, 35, 30, 32, 34]\ng3 = [38, 36, 41, 35, 40, 37, 39, 42]\nfor a, b in [(g1, g2), (g1, g3), (g2, g3)]:\n    print(stats.ttest_ind(a, b).pvalue < 0.05)",
      explicacion:
        "Hacer varias pruebas t con α = 0.05 cada una acumula el riesgo de falsos positivos (con 3 comparaciones es de alrededor del 14 % en lugar del 5 %). El ANOVA hace una sola prueba global; después se hacen comparaciones corrigiendo α.",
    },
    practicaGuiada: {
      id: "m32-l4-practica",
      enunciado: "Aplica `stats.f_oneway` a los tres grupos e imprime el estadístico **F** con 2 decimales.",
      codigoInicial: "from scipy import stats\n\ng1 = [23, 25, 28, 22, 26, 30, 27, 24]\ng2 = [29, 31, 27, 33, 35, 30, 32, 34]\ng3 = [38, 36, 41, 35, 40, 37, 39, 42]\n\nF = 0\nprint(F)",
      solucion: "from scipy import stats\n\ng1 = [23, 25, 28, 22, 26, 30, 27, 24]\ng2 = [29, 31, 27, 33, 35, 30, 32, 34]\ng3 = [38, 36, 41, 35, 40, 37, 39, 42]\n\nF = round(stats.f_oneway(g1, g2, g3).statistic, 2)\nprint(F)",
      pistas: ["`stats.f_oneway(g1, g2, g3).statistic`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 49.3) <= 0.006
        return { ok, mensaje: ok ? "Correcto: F = 49.30." : "El resultado esperado es 49.3." }
      },
    },
    reto: {
      id: "m32-l4-reto",
      enunciado: "Con α = 0.05, imprime `Hay diferencias entre los grupos` si el p-valor del ANOVA es menor que 0.05 y `No hay evidencia de diferencias` en caso contrario.",
      codigoInicial: "from scipy import stats\n\ng1 = [23, 25, 28, 22, 26, 30, 27, 24]\ng2 = [29, 31, 27, 33, 35, 30, 32, 34]\ng3 = [38, 36, 41, 35, 40, 37, 39, 42]\n\nprint(\"No hay evidencia de diferencias\")",
      solucion: "from scipy import stats\n\ng1 = [23, 25, 28, 22, 26, 30, 27, 24]\ng2 = [29, 31, 27, 33, 35, 30, 32, 34]\ng3 = [38, 36, 41, 35, 40, 37, 39, 42]\n\np = stats.f_oneway(g1, g2, g3).pvalue\nprint(\"Hay diferencias entre los grupos\" if p < 0.05 else \"No hay evidencia de diferencias\")",
      pistas: ["Obtén el p-valor con `stats.f_oneway(...).pvalue` y compáralo con 0.05."],
      validar: (stdout) => {
        const ok = stdout.trim() === "Hay diferencias entre los grupos"
        return { ok, mensaje: ok ? "Correcto: el p-valor es minúsculo." : "El resultado esperado es «Hay diferencias entre los grupos»." }
      },
    },
    verificacion: [
      {
        id: "m32-l4-q1",
        pregunta: "La hipótesis nula del ANOVA de un factor es que:",
        opciones: ["Todas las medias son iguales", "Al menos una media es distinta", "Las varianzas son distintas", "Hay solo dos grupos"],
        respuestaCorrecta: 0,
        explicacion: "H₀: no hay diferencias entre las medias de los grupos.",
      },
      {
        id: "m32-l4-q2",
        pregunta: "Si el ANOVA da p < 0.05, ¿qué se puede concluir?",
        opciones: ["Que todos los grupos difieren entre sí", "Que al menos un grupo difiere, sin saber cuál", "Que la media más alta es la mejor", "Nada"],
        respuestaCorrecta: 1,
        explicacion: "El ANOVA es una prueba global; para localizar las diferencias hacen falta comparaciones posteriores.",
      },
    ],
    resumen: ["ANOVA compara tres o más medias con una sola prueba.", "`stats.f_oneway` devuelve F y el p-valor.", "Un resultado significativo no indica cuáles grupos difieren."],
    proximoPaso: "Cerraremos el módulo con los riesgos de interpretar mal los resultados: comparaciones múltiples y relevancia práctica.",
    conceptos: ["anova", "estadistico-f"],
  },
  {
    id: "m32-l5",
    moduloId: "modulo-32",
    titulo: "Significancia, relevancia práctica y comparaciones múltiples",
    objetivo: "Distinguir significancia estadística de relevancia práctica, medir el tamaño del efecto y corregir por comparaciones múltiples.",
    porQueImporta:
      "Un p-valor pequeño no significa que el hallazgo importe, y hacer muchas pruebas casi garantiza «encontrar» algo por azar. Estos dos errores producen la mayoría de las conclusiones falsas que circulan en análisis de datos.",
    concepto: "**Significancia ≠ relevancia.** Con muestras enormes, hasta diferencias minúsculas salen «significativas». Hay que medir también cuán **grande** es el efecto:\n\n```\nd de Cohen = (media₂ - media₁) / desviación combinada\n```\n\nOrientación: 0.2 pequeño, 0.5 mediano, 0.8 grande.\n\n**Comparaciones múltiples.** Si haces 20 pruebas con α = 0.05, esperas ≈ 1 falso positivo aunque no haya nada real. La **corrección de Bonferroni** divide α entre el número de pruebas:\n\n```python\nalfa_corregido = 0.05 / numero_de_pruebas\nsignificativos = [p for p in p_valores if p < alfa_corregido]\n```\n\nOtras malas prácticas a evitar (**p-hacking**): probar muchas variables o subgrupos y reportar solo los que salieron significativos, o detener la recolección de datos al obtener p < 0.05.",
    ejemploMinimo: "alfa = 0.05\npruebas = 10\nprint(alfa / pruebas)",
    ejemploAplicado: "import math\nimport pandas as pd\n\na = pd.Series([23, 25, 28, 22, 26, 30, 27, 24])\nb = pd.Series([29, 31, 27, 33, 35, 30, 32, 34])\n\nsp = math.sqrt(((len(a) - 1) * a.var() + (len(b) - 1) * b.var()) / (len(a) + len(b) - 2))\nd = (b.mean() - a.mean()) / sp\nprint(f\"d de Cohen = {d:.2f}  (efecto grande: > 0.8)\")",
    errorFrecuente: {
      codigo: "p_valores = [0.001, 0.012, 0.03, 0.04, 0.2, 0.0004, 0.06, 0.5, 0.008, 0.02]\nsignificativos = [p for p in p_valores if p < 0.05]\nprint(f\"{len(significativos)} de {len(p_valores)} variables son significativas\")",
      explicacion:
        "Con 10 pruebas, usar α = 0.05 en cada una infla el riesgo global de algún falso positivo (alrededor del 40 %). Hay que corregir: con Bonferroni, α = 0.05/10 = 0.005, y solo 2 de las 7 «significativas» siguen siéndolo.",
    },
    practicaGuiada: {
      id: "m32-l5-practica",
      enunciado: "Calcula el nivel de significancia corregido por **Bonferroni** para 10 pruebas (`0.05 / 10`) e imprímelo.",
      codigoInicial: "alfa = 0.05\npruebas = 10\n\nalfa_corregido = alfa\nprint(alfa_corregido)",
      solucion: "alfa = 0.05\npruebas = 10\n\nalfa_corregido = alfa / pruebas\nprint(alfa_corregido)",
      pistas: ["Divide `alfa` entre `pruebas`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.005) <= 1e-05
        return { ok, mensaje: ok ? "Correcto: α corregido = 0.005." : "El resultado esperado es 0.005." }
      },
    },
    reto: {
      id: "m32-l5-reto",
      enunciado: "Con la lista de p-valores, cuenta cuántos siguen siendo significativos después de la corrección de Bonferroni (`p < 0.05 / len(p_valores)`) e imprime el número.",
      codigoInicial: "p_valores = [0.001, 0.012, 0.03, 0.04, 0.2, 0.0004, 0.06, 0.5, 0.008, 0.02]\n\nsignificativos = [p for p in p_valores if p < 0.05]\nprint(len(significativos))",
      solucion: "p_valores = [0.001, 0.012, 0.03, 0.04, 0.2, 0.0004, 0.06, 0.5, 0.008, 0.02]\n\nalfa_corregido = 0.05 / len(p_valores)\nsignificativos = [p for p in p_valores if p < alfa_corregido]\nprint(len(significativos))",
      pistas: ["El umbral corregido es `0.05 / len(p_valores)`."],
      validar: (stdout) => {
        const ok = stdout.trim() === "2"
        return { ok, mensaje: ok ? "Correcto: solo 0.001 y 0.0004 superan el umbral de 0.005." : "El resultado esperado es 2." }
      },
    },
    verificacion: [
      {
        id: "m32-l5-q1",
        pregunta: "Con una muestra gigantesca, un p-valor muy pequeño puede corresponder a:",
        opciones: ["Siempre un efecto grande", "Una diferencia estadísticamente significativa pero prácticamente irrelevante", "Un error de cálculo", "Una hipótesis nula verdadera"],
        respuestaCorrecta: 1,
        explicacion: "La significancia depende del tamaño de muestra; el tamaño del efecto mide la relevancia.",
      },
      {
        id: "m32-l5-q2",
        pregunta: "El p-hacking consiste en:",
        opciones: ["Usar un p-valor pequeño", "Probar muchas hipótesis o variantes y reportar solo las que salen significativas", "Corregir con Bonferroni", "Repetir un experimento una vez"],
        respuestaCorrecta: 1,
        explicacion: "Multiplica las oportunidades de falsos positivos sin declararlo.",
      },
    ],
    resumen: ["Significativo no significa importante: mide el tamaño del efecto (d de Cohen).", "Con muchas pruebas, corrige α (Bonferroni).", "Define las hipótesis antes de ver los datos para evitar el p-hacking."],
    proximoPaso: "Cerraremos el curso con un proyecto integrador: el análisis de un A/B test.",
    conceptos: ["tamano-del-efecto", "comparaciones-multiples", "p-hacking"],
  },
]
