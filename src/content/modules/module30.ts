import type { Lesson } from '../../types'

export const module30Lessons: Lesson[] = [
  {
    id: "m30-l1",
    moduloId: "modulo-30",
    titulo: "Muestreo y sesgo de selección",
    objetivo: "Distinguir los principales tipos de muestreo y reconocer el sesgo de selección y de no respuesta.",
    porQueImporta:
      "La estadística inferencial supone que la muestra representa a la población. Si el muestreo es malo, ningún cálculo posterior lo corrige: es el error más caro y más difícil de detectar.",
    concepto: "La **inferencia** consiste en sacar conclusiones sobre una población a partir de una muestra. Todo depende de cómo se eligió esa muestra:\n\n- **Muestreo aleatorio simple**: cada individuo tiene la misma probabilidad de ser elegido.\n- **Muestreo estratificado**: se divide la población en grupos (estratos) y se toma una muestra proporcional de cada uno. Garantiza que los grupos pequeños queden representados.\n- **Muestreo por conveniencia**: se toma a quien es fácil de alcanzar. Es barato, pero casi siempre sesgado.\n\nFuentes de sesgo frecuentes:\n\n- **Sesgo de selección**: la forma de elegir favorece a ciertos individuos.\n- **Sesgo de no respuesta**: quienes responden son distintos de quienes no lo hacen (en una encuesta de satisfacción responden sobre todo los muy contentos o los muy molestos).\n\n```python\ndf.sample(n=50, random_state=0)                        # aleatorio simple\ndf.groupby(\"region\").sample(frac=0.2, random_state=0)  # estratificado: 20 % de cada región\n```",
    ejemploMinimo: "import pandas as pd\n\ndf = pd.DataFrame({\"cliente\": range(1, 101)})\nmuestra = df.sample(n=10, random_state=0)\nprint(len(muestra))",
    ejemploAplicado: "import pandas as pd\n\ndf = pd.DataFrame({\"region\": [\"norte\"] * 60 + [\"sur\"] * 30 + [\"este\"] * 10, \"id\": range(100)})\n\nestratificada = df.groupby(\"region\").sample(frac=0.2, random_state=1)\nprint(estratificada[\"region\"].value_counts())",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ndf = pd.DataFrame({\"region\": [\"norte\"] * 60 + [\"sur\"] * 30 + [\"este\"] * 10})\nmuestra = df.head(20)\nprint(muestra[\"region\"].value_counts())",
      explicacion:
        "`head(20)` toma los primeros registros, que aquí son todos del norte: la muestra no representa a la población (faltan sur y este por completo). Tomar «los primeros» o «los más fáciles» es muestreo por conveniencia y produce sesgo. Hay que elegir al azar, idealmente estratificando.",
    },
    practicaGuiada: {
      id: "m30-l1-practica",
      enunciado: "Toma una muestra **estratificada** del 20 % de cada región con `groupby(\"region\").sample(frac=0.2, random_state=1)` e imprime cuántos elementos de la región `\"norte\"` quedaron.",
      codigoInicial: "import pandas as pd\n\ndf = pd.DataFrame({\"region\": [\"norte\"] * 60 + [\"sur\"] * 30 + [\"este\"] * 10})\n\nmuestra = df\nprint(len(muestra))",
      solucion: "import pandas as pd\n\ndf = pd.DataFrame({\"region\": [\"norte\"] * 60 + [\"sur\"] * 30 + [\"este\"] * 10})\n\nmuestra = df.groupby(\"region\").sample(frac=0.2, random_state=1)\nprint((muestra[\"region\"] == \"norte\").sum())",
      pistas: ["`df.groupby(\"region\").sample(frac=0.2, random_state=1)`", "Cuenta las filas con `region == \"norte\"`."],
      validar: (stdout) => {
        const ok = stdout.trim() === "12"
        return { ok, mensaje: ok ? "Correcto: 20 % de 60 = 12." : "El resultado esperado es 12." }
      },
    },
    reto: {
      id: "m30-l1-reto",
      enunciado: "En una encuesta de satisfacción solo responden quienes dieron 4 o 5. Calcula cuánto **sobreestima** la media de los respondientes la media de toda la población (`media_respondientes - media_poblacion`, 2 decimales).",
      codigoInicial: "import pandas as pd\n\npoblacion = pd.Series([2, 3, 3, 4, 4, 4, 5, 5, 5, 5])\nrespondientes = poblacion[poblacion >= 4]\n\nsesgo = 0\nprint(sesgo)",
      solucion: "import pandas as pd\n\npoblacion = pd.Series([2, 3, 3, 4, 4, 4, 5, 5, 5, 5])\nrespondientes = poblacion[poblacion >= 4]\n\nsesgo = round(respondientes.mean() - poblacion.mean(), 2)\nprint(sesgo)",
      pistas: ["Resta la media de `poblacion` a la media de `respondientes`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.57) <= 0.006
        return { ok, mensaje: ok ? "Correcto: la encuesta sobreestima la satisfacción en 0.57 puntos." : "El resultado esperado es 0.57." }
      },
    },
    verificacion: [
      {
        id: "m30-l1-q1",
        pregunta: "¿Qué ventaja tiene el muestreo estratificado?",
        opciones: ["Es el más barato", "Asegura que los grupos pequeños queden representados", "Elimina todo el sesgo", "No necesita aleatoriedad"],
        respuestaCorrecta: 1,
        explicacion: "Se toma una muestra proporcional de cada estrato, así ningún grupo importante queda fuera.",
      },
      {
        id: "m30-l1-q2",
        pregunta: "Una encuesta online voluntaria suele tener sesgo porque:",
        opciones: ["Es demasiado grande", "Quienes responden no son representativos de quienes no responden", "Usa números", "Tiene preguntas"],
        respuestaCorrecta: 1,
        explicacion: "Es sesgo de autoselección / no respuesta: los que participan difieren de los que no.",
      },
    ],
    resumen: ["La inferencia solo es válida si la muestra representa a la población.", "Aleatorio simple y estratificado reducen el sesgo; la conveniencia lo aumenta.", "Un tamaño de muestra enorme no corrige un muestreo sesgado."],
    proximoPaso: "Veremos cómo se comportan los estimadores calculados a partir de una muestra.",
    conceptos: ["muestreo", "sesgo-de-seleccion"],
  },
  {
    id: "m30-l2",
    moduloId: "modulo-30",
    titulo: "Estimadores: media y varianza muestrales",
    objetivo: "Usar la media y la varianza muestrales como estimadores de los parámetros poblacionales y entender por qué la varianza divide entre n - 1.",
    porQueImporta:
      "Casi nunca conocemos los parámetros de la población (μ, σ). Los estimamos con la muestra, y conviene saber si el estimador acierta en promedio (insesgado) o se equivoca de forma sistemática.",
    concepto: "- **Parámetro**: un valor de la población (μ, σ², p). Es fijo y casi siempre desconocido.\n- **Estadístico / estimador**: un valor calculado de la muestra que sirve para estimar el parámetro (x̄, s², p̂). Cambia de muestra en muestra.\n\nUn estimador es **insesgado** si, en promedio sobre muchas muestras, da el valor del parámetro.\n\n- La **media muestral** x̄ es un estimador insesgado de μ.\n- La **varianza muestral** `s² = Σ(x - x̄)² / (n - 1)` es insesgada para σ². Si se dividiera entre `n`, subestimaría σ² sistemáticamente (porque las desviaciones se miden respecto a x̄, no a μ).\n\n```python\nserie.var()          # ddof=1: varianza muestral (insesgada)\nserie.var(ddof=0)    # divide entre n: sesgada como estimador de σ²\n```",
    ejemploMinimo: "import pandas as pd\n\nx = pd.Series([12, 15, 11, 18, 14, 13, 16, 19])\nprint(x.mean(), round(x.var(), 2))",
    ejemploAplicado: "import numpy as np\n\nrng = np.random.default_rng(42)\n# 100 000 muestras de tamaño 5 de una población con σ² = 4\nmuestras = rng.normal(10, 2, size=(100_000, 5))\n\nprint(\"Promedio de s² (ddof=1):\", round(muestras.var(axis=1, ddof=1).mean(), 2))\nprint(\"Promedio de s² (ddof=0):\", round(muestras.var(axis=1, ddof=0).mean(), 2))\nprint(\"σ² verdadera: 4\")",
    errorFrecuente: {
      codigo: "import pandas as pd\n\nx = pd.Series([12, 15, 11, 18, 14, 13, 16, 19])\nprint(\"Varianza muestral:\", x.var(ddof=0))",
      explicacion:
        "Con `ddof=0` se divide entre `n` y se obtiene la varianza **de esos datos como si fueran toda la población** (6.94). Para estimar la varianza de la población a partir de una muestra se usa `ddof=1` (7.93), que corrige el sesgo.",
    },
    practicaGuiada: {
      id: "m30-l2-practica",
      enunciado: "Calcula la **varianza muestral** (`ddof=1`, el valor por defecto de pandas) de `x` e imprímela con 2 decimales.",
      codigoInicial: "import pandas as pd\n\nx = pd.Series([12, 15, 11, 18, 14, 13, 16, 19])\n\nvarianza = x.var(ddof=0)\nprint(round(varianza, 2))",
      solucion: "import pandas as pd\n\nx = pd.Series([12, 15, 11, 18, 14, 13, 16, 19])\n\nvarianza = x.var()\nprint(round(varianza, 2))",
      pistas: ["`x.var()` ya usa `ddof=1` por defecto."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 7.93) <= 0.006
        return { ok, mensaje: ok ? "Correcto: s² = 7.93." : "El resultado esperado es 7.93." }
      },
    },
    reto: {
      id: "m30-l2-reto",
      enunciado: "Comprueba por simulación que `ddof=1` es **insesgado**: imprime el promedio de la varianza muestral (`ddof=1`) de 100 000 muestras de tamaño 5 de una normal con σ² = 4, redondeado a 1 decimal.",
      codigoInicial: "import numpy as np\n\nrng = np.random.default_rng(42)\nmuestras = rng.normal(10, 2, size=(100_000, 5))\n\npromedio = muestras.var(axis=1, ddof=0).mean()\nprint(round(promedio, 1))",
      solucion: "import numpy as np\n\nrng = np.random.default_rng(42)\nmuestras = rng.normal(10, 2, size=(100_000, 5))\n\npromedio = muestras.var(axis=1, ddof=1).mean()\nprint(round(promedio, 1))",
      pistas: ["Cambia `ddof=0` por `ddof=1`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 4.0) <= 0.15
        return { ok, mensaje: ok ? "Correcto: en promedio la estimación es 4, el valor real de σ²." : "El resultado debería rondar 4.0." }
      },
    },
    verificacion: [
      {
        id: "m30-l2-q1",
        pregunta: "¿Qué significa que un estimador sea insesgado?",
        opciones: ["Que siempre acierta", "Que en promedio, sobre muchas muestras, da el valor del parámetro", "Que usa muchos datos", "Que no varía"],
        respuestaCorrecta: 1,
        explicacion: "Puede errar en una muestra concreta, pero no se equivoca de forma sistemática.",
      },
      {
        id: "m30-l2-q2",
        pregunta: "La varianza muestral divide entre n - 1 para:",
        opciones: ["Hacerla más pequeña", "Corregir el sesgo de usar x̄ en lugar de μ", "Evitar dividir entre cero", "Que sume 1"],
        respuestaCorrecta: 1,
        explicacion: "Las desviaciones respecto a x̄ son más pequeñas que respecto a μ; n - 1 lo compensa.",
      },
    ],
    resumen: ["Los parámetros son de la población; los estadísticos, de la muestra.", "x̄ es insesgada para μ; s² (con n - 1) lo es para σ².", "Un estadístico cambia de muestra en muestra: tiene su propia distribución."],
    proximoPaso: "Mediremos cuánto varía una media muestral con el error estándar y veremos qué tamaño de muestra necesitas.",
    conceptos: ["estimador-insesgado", "varianza-muestral"],
  },
  {
    id: "m30-l3",
    moduloId: "modulo-30",
    titulo: "Error estándar y tamaño de muestra",
    objetivo: "Calcular el error estándar de la media y determinar el tamaño de muestra necesario para un margen de error dado.",
    porQueImporta:
      "Antes de hacer una encuesta o un experimento hay que decidir cuántos datos recoger: pocos dan resultados imprecisos; demasiados cuestan dinero. El error estándar y el margen de error ordenan esa decisión.",
    concepto: "Por el teorema central del límite, la media muestral tiene un **error estándar**:\n\n```\nEE = σ / √n        (se estima con s / √n)\n```\n\nMide cuánto suele variar la media entre muestras. Para duplicar la precisión hay que **cuadruplicar** n.\n\nEl **margen de error** de una media con confianza del 95 % es aproximadamente `1.96 · EE`.\n\nPara elegir el **tamaño de muestra** que da un margen de error `E` (con σ conocida o estimada):\n\n```\nn = (z · σ / E)²        (redondeado hacia arriba)\n```\n\ncon z = 1.96 para el 95 % de confianza.\n\n```python\nimport math\nn = math.ceil((1.96 * sigma / margen) ** 2)\n```",
    ejemploMinimo: "import numpy as np\n\nprint(12 / np.sqrt(36))",
    ejemploAplicado: "import math\n\nsigma = 10        # desviación estándar estimada\nfor margen in (4, 2, 1):\n    n = math.ceil((1.96 * sigma / margen) ** 2)\n    print(f\"Margen ±{margen}: n = {n}\")",
    errorFrecuente: {
      codigo: "import math\n\nsigma, margen = 10, 2\nn = (1.96 * sigma / margen)\nprint(math.ceil(n))",
      explicacion:
        "Falta elevar al cuadrado: la fórmula es `n = (z·σ/E)²`. Sin el cuadrado se obtiene 10 (en lugar de 97), una muestra diez veces demasiado pequeña. Y al reducir a la mitad el margen de error, el tamaño de muestra se cuadruplica.",
    },
    practicaGuiada: {
      id: "m30-l3-practica",
      enunciado: "Calcula el **error estándar** de la media con `s = 12` y `n = 36` (`s / √n`) e imprímelo.",
      codigoInicial: "import numpy as np\n\ns, n = 12, 36\n\nerror_estandar = 0\nprint(error_estandar)",
      solucion: "import numpy as np\n\ns, n = 12, 36\n\nerror_estandar = s / np.sqrt(n)\nprint(error_estandar)",
      pistas: ["`s / np.sqrt(n)`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 2.0) <= 0.0005
        return { ok, mensaje: ok ? "Correcto: EE = 2." : "El resultado esperado es 2.0." }
      },
    },
    reto: {
      id: "m30-l3-reto",
      enunciado: "¿Qué tamaño de muestra se necesita para un **margen de error de ±2** con 95 % de confianza si σ ≈ 10? Usa `n = (1.96 · σ / E)²` redondeado hacia arriba con `math.ceil`.",
      codigoInicial: "import math\n\nsigma, margen = 10, 2\n\nn = math.ceil((2 * sigma / margen) ** 2)      # usa z = 1.96, no 2\nprint(n)",
      solucion: "import math\n\nsigma, margen = 10, 2\n\nn = math.ceil((1.96 * sigma / margen) ** 2)\nprint(n)",
      pistas: ["Reemplaza el 2 por 1.96, que es el valor z del 95 %."],
      validar: (stdout) => {
        const ok = stdout.trim() === "97"
        return { ok, mensaje: ok ? "Correcto: se necesitan 97 observaciones (96.04 redondeado hacia arriba)." : "El resultado esperado es 97." }
      },
    },
    verificacion: [
      {
        id: "m30-l3-q1",
        pregunta: "Para reducir a la mitad el error estándar, el tamaño de muestra debe:",
        opciones: ["Duplicarse", "Cuadruplicarse", "Triplicarse", "Mantenerse"],
        respuestaCorrecta: 1,
        explicacion: "EE = σ/√n: para dividirlo entre 2 hay que multiplicar n por 4.",
      },
      {
        id: "m30-l3-q2",
        pregunta: "El tamaño de muestra se redondea siempre hacia arriba porque:",
        opciones: ["Es más bonito", "Con un valor menor no se alcanzaría el margen de error deseado", "Lo exige Python", "Así crece σ"],
        respuestaCorrecta: 1,
        explicacion: "Redondear hacia abajo dejaría un margen de error mayor al buscado.",
      },
    ],
    resumen: ["EE = σ/√n mide la variabilidad de la media muestral.", "Margen de error ≈ 1.96 · EE (95 % de confianza).", "n = (z·σ/E)²: reducir el margen a la mitad cuadruplica n."],
    proximoPaso: "Con el error estándar construiremos intervalos de confianza para la media.",
    conceptos: ["error-estandar-media", "tamano-de-muestra"],
  },
  {
    id: "m30-l4",
    moduloId: "modulo-30",
    titulo: "Intervalo de confianza para la media",
    objetivo: "Construir e interpretar un intervalo de confianza del 95 % para una media usando la distribución t.",
    porQueImporta:
      "Un promedio solo es una estimación. El intervalo de confianza dice entre qué valores plausibles podría estar la media real y es la forma correcta de reportar un resultado de muestra.",
    concepto: "Un **intervalo de confianza (IC)** para la media da un rango de valores plausibles del parámetro:\n\n```\nx̄ ± t* · (s / √n)\n```\n\n`t*` viene de la distribución **t de Student** con `n - 1` grados de libertad (se usa en lugar de z porque s es una estimación y las muestras suelen ser pequeñas).\n\n```python\nfrom scipy import stats\n\nn = len(datos)\nmedia = datos.mean()\nee = stats.sem(datos)                       # s / √n\nstats.t.interval(0.95, df=n - 1, loc=media, scale=ee)\n```\n\n**Interpretación correcta**: si repitiéramos el muestreo muchas veces y construyéramos el intervalo cada vez, el 95 % de esos intervalos contendría la media real. **No** significa «hay un 95 % de probabilidad de que μ esté en este intervalo concreto».\n\nUn IC más estrecho indica estimación más precisa (más datos o menos variabilidad).",
    ejemploMinimo: "from scipy import stats\n\nprint(round(stats.t.ppf(0.975, df=9), 3))",
    ejemploAplicado: "import pandas as pd\nfrom scipy import stats\n\ndatos = pd.Series([52, 48, 55, 60, 47, 53, 58, 51, 49, 56])\nn = len(datos)\n\nee = stats.sem(datos)\nbajo, alto = stats.t.interval(0.95, df=n - 1, loc=datos.mean(), scale=ee)\nprint(f\"Media = {datos.mean():.1f}  ·  IC 95 % = [{bajo:.2f}, {alto:.2f}]\")",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ndatos = pd.Series([52, 48, 55, 60, 47, 53, 58, 51, 49, 56])\nee = datos.std() / len(datos) ** 0.5\nprint(datos.mean() - 1.96 * ee, datos.mean() + 1.96 * ee)",
      explicacion:
        "Con una muestra pequeña (n = 10) usar z = 1.96 da un intervalo demasiado estrecho: el valor t correcto con 9 grados de libertad es 2.262, bastante mayor. Un intervalo muy estrecho promete más precisión de la que hay. Para medias con s estimada, usa la distribución t.",
    },
    practicaGuiada: {
      id: "m30-l4-practica",
      enunciado: "Calcula el **error estándar** de `datos` con `stats.sem` e imprímelo redondeado a 2 decimales.",
      codigoInicial: "import pandas as pd\nfrom scipy import stats\n\ndatos = pd.Series([52, 48, 55, 60, 47, 53, 58, 51, 49, 56])\n\nee = 0\nprint(ee)",
      solucion: "import pandas as pd\nfrom scipy import stats\n\ndatos = pd.Series([52, 48, 55, 60, 47, 53, 58, 51, 49, 56])\n\nee = round(stats.sem(datos), 2)\nprint(ee)",
      pistas: ["`stats.sem(datos)` devuelve s / √n."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 1.37) <= 0.006
        return { ok, mensaje: ok ? "Correcto: EE = 1.37." : "El resultado esperado es 1.37." }
      },
    },
    reto: {
      id: "m30-l4-reto",
      enunciado: "Construye el **IC del 95 %** para la media con la distribución t (`stats.t.interval`) e imprime sus límites con 2 decimales, separados por un espacio (por ejemplo `49.80 56.00`).",
      codigoInicial: "import pandas as pd\nfrom scipy import stats\n\ndatos = pd.Series([52, 48, 55, 60, 47, 53, 58, 51, 49, 56])\nee = stats.sem(datos)\n\nbajo = datos.mean() - 1.96 * ee      # usa la distribución t, no 1.96\nalto = datos.mean() + 1.96 * ee\nprint(f\"{bajo:.2f} {alto:.2f}\")",
      solucion: "import pandas as pd\nfrom scipy import stats\n\ndatos = pd.Series([52, 48, 55, 60, 47, 53, 58, 51, 49, 56])\nee = stats.sem(datos)\n\nbajo, alto = stats.t.interval(0.95, df=len(datos) - 1, loc=datos.mean(), scale=ee)\nprint(f\"{bajo:.2f} {alto:.2f}\")",
      pistas: ["`stats.t.interval(0.95, df=n-1, loc=media, scale=ee)` devuelve (límite inferior, límite superior)."],
      validar: (stdout) => {
        const ok = stdout.trim() === "49.80 56.00"
        return { ok, mensaje: ok ? "Correcto: IC 95 % = [49.80, 56.00]." : "El resultado esperado es «49.80 56.00»." }
      },
    },
    verificacion: [
      {
        id: "m30-l4-q1",
        pregunta: "La interpretación correcta de un IC del 95 % es:",
        opciones: ["Hay 95 % de probabilidad de que μ esté en este intervalo concreto", "El 95 % de los intervalos construidos así contendría la media real", "El 95 % de los datos está dentro del intervalo", "La media muestral tiene error 5 %"],
        respuestaCorrecta: 1,
        explicacion: "La confianza describe el procedimiento a largo plazo, no un intervalo individual.",
      },
      {
        id: "m30-l4-q2",
        pregunta: "Si aumentas el tamaño de la muestra (con la misma variabilidad), el intervalo de confianza:",
        opciones: ["Se ensancha", "Se estrecha", "No cambia", "Desaparece"],
        respuestaCorrecta: 1,
        explicacion: "Un n mayor reduce el error estándar y estrecha el intervalo.",
      },
    ],
    resumen: ["IC = x̄ ± t*·(s/√n), con t de Student y n - 1 grados de libertad.", "`stats.t.interval` y `stats.sem` lo calculan en pocas líneas.", "La confianza describe el método, no un intervalo en particular."],
    proximoPaso: "Haremos lo mismo para una proporción, el caso típico de las encuestas.",
    conceptos: ["intervalo-de-confianza-media", "distribucion-t"],
  },
  {
    id: "m30-l5",
    moduloId: "modulo-30",
    titulo: "Intervalo de confianza para una proporción",
    objetivo: "Estimar una proporción poblacional con su margen de error e intervalo de confianza.",
    porQueImporta:
      "Encuestas de opinión, tasas de conversión y porcentajes de defectos son proporciones. Reportar «56 %» sin su margen de error es incompleto y puede llevar a conclusiones equivocadas.",
    concepto: "Para una proporción muestral `p̂ = éxitos / n`, el error estándar es:\n\n```\nEE = √( p̂ · (1 - p̂) / n )\n```\n\ny el intervalo de confianza del 95 % (aproximación normal):\n\n```\np̂ ± 1.96 · EE\n```\n\nLa aproximación es razonable cuando `n·p̂ ≥ 10` y `n·(1 - p̂) ≥ 10`.\n\n```python\nimport math\np_hat = 224 / 400\nee = math.sqrt(p_hat * (1 - p_hat) / 400)\nmargen = 1.96 * ee\n```\n\nEl margen de error es máximo cuando `p̂ = 0.5`; por eso las encuestas usan ese valor para calcular el tamaño de muestra en el peor caso.",
    ejemploMinimo: "import math\n\np_hat, n = 0.56, 400\nprint(round(math.sqrt(p_hat * (1 - p_hat) / n), 4))",
    ejemploAplicado: "import math\n\nexitos, n = 224, 400\np_hat = exitos / n\nee = math.sqrt(p_hat * (1 - p_hat) / n)\nmargen = 1.96 * ee\n\nprint(f\"p̂ = {p_hat:.2f} ± {margen:.4f}\")\nprint(f\"IC 95 %: [{p_hat - margen:.4f}, {p_hat + margen:.4f}]\")",
    errorFrecuente: {
      codigo: "p_hat, n = 0.56, 400\nprint(\"Margen de error:\", 1.96 * (p_hat * (1 - p_hat) / n))",
      explicacion:
        "Falta la raíz cuadrada: el error estándar es `√(p̂(1-p̂)/n)`. Sin ella, el resultado es 0.0006 (en vez de un margen de ±0.0486): el intervalo parecería absurdamente preciso.",
    },
    practicaGuiada: {
      id: "m30-l5-practica",
      enunciado: "Con `p_hat = 0.56` y `n = 400`, calcula el **margen de error** del 95 % (`1.96 · EE`) e imprímelo con 4 decimales.",
      codigoInicial: "import math\n\np_hat, n = 0.56, 400\n\nmargen = 0\nprint(margen)",
      solucion: "import math\n\np_hat, n = 0.56, 400\n\nmargen = round(1.96 * math.sqrt(p_hat * (1 - p_hat) / n), 4)\nprint(margen)",
      pistas: ["EE = `math.sqrt(p_hat * (1 - p_hat) / n)`; después multiplica por 1.96."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.0486) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: el margen de error es ±4.86 puntos." : "El resultado esperado es 0.0486." }
      },
    },
    reto: {
      id: "m30-l5-reto",
      enunciado: "Imprime los límites del **IC del 95 %** para la proporción (inferior y superior, 4 decimales, separados por un espacio).",
      codigoInicial: "import math\n\np_hat, n = 0.56, 400\nee = math.sqrt(p_hat * (1 - p_hat) / n)\n\nprint(f\"{p_hat:.4f} {p_hat:.4f}\")      # falta restar y sumar el margen de error",
      solucion: "import math\n\np_hat, n = 0.56, 400\nee = math.sqrt(p_hat * (1 - p_hat) / n)\nmargen = 1.96 * ee\n\nprint(f\"{p_hat - margen:.4f} {p_hat + margen:.4f}\")",
      pistas: ["Límite inferior: `p_hat - margen`; superior: `p_hat + margen`."],
      validar: (stdout) => {
        const ok = stdout.trim() === "0.5114 0.6086"
        return { ok, mensaje: ok ? "Correcto: IC 95 % = [0.5114, 0.6086]." : "El resultado esperado es «0.5114 0.6086»." }
      },
    },
    verificacion: [
      {
        id: "m30-l5-q1",
        pregunta: "Una encuesta con n = 400 y p̂ = 0.56 tiene un margen de error de aproximadamente:",
        opciones: ["±0.5 puntos", "±5 puntos", "±15 puntos", "±0.05 puntos"],
        respuestaCorrecta: 1,
        explicacion: "1.96·√(0.56·0.44/400) ≈ 0.0486, es decir, unos 5 puntos porcentuales.",
      },
      {
        id: "m30-l5-q2",
        pregunta: "¿Con qué valor de p̂ el margen de error es máximo?",
        opciones: ["0", "0.5", "1", "Es igual siempre"],
        respuestaCorrecta: 1,
        explicacion: "p̂(1 - p̂) es máximo cuando p̂ = 0.5.",
      },
    ],
    resumen: ["EE de una proporción = √(p̂(1-p̂)/n).", "IC 95 % = p̂ ± 1.96·EE.", "Reporta siempre una proporción con su margen de error."],
    proximoPaso: "En el siguiente módulo pasamos de estimar a decidir: pruebas de hipótesis.",
    conceptos: ["intervalo-de-confianza-proporcion"],
  },
]
