import type { Lesson } from '../../types'

export const module28Lessons: Lesson[] = [
  {
    id: "m28-l1",
    moduloId: "modulo-28",
    titulo: "Variables continuas, densidad y distribución uniforme",
    objetivo: "Entender que en una variable continua la probabilidad es un área bajo la densidad, y calcular probabilidades de la uniforme.",
    porQueImporta:
      "Tiempos, pesos y montos son continuos. Con ellos la probabilidad de un valor exacto es cero, y todo se calcula sobre intervalos. Esta idea cambia cómo se razona con distribuciones.",
    concepto: "Una **variable continua** puede tomar cualquier valor en un intervalo. Se describe con una **función de densidad** `f(x)`:\n\n- La probabilidad de un intervalo es el **área bajo la curva** entre sus extremos.\n- `P(X = valor exacto) = 0`; por eso `P(X < 5)` y `P(X ≤ 5)` son iguales.\n- El área total bajo la densidad vale 1.\n\nLa **distribución uniforme** reparte la probabilidad por igual en un intervalo `[a, b]`.\n\n```python\nfrom scipy.stats import uniform\n\n# espera uniforme entre 0 y 10 minutos: loc = inicio, scale = ancho\nuniform.cdf(3, loc=0, scale=10)                                  # P(X <= 3)\nuniform.cdf(8, loc=0, scale=10) - uniform.cdf(2, loc=0, scale=10) # P(2 < X < 8)\n```\n\nEn scipy, `cdf(x)` es la probabilidad acumulada `P(X ≤ x)`; la probabilidad de un intervalo es la diferencia de dos `cdf`.",
    ejemploMinimo: "from scipy.stats import uniform\n\nprint(uniform.cdf(3, loc=0, scale=10))",
    ejemploAplicado: "from scipy.stats import uniform\n\n# El bus llega en cualquier momento entre 0 y 10 minutos\ninicio, ancho = 0, 10\n\nprint(\"P(esperar menos de 3 min) =\", uniform.cdf(3, inicio, ancho))\nprint(\"P(esperar entre 2 y 5 min) =\", round(uniform.cdf(5, inicio, ancho) - uniform.cdf(2, inicio, ancho), 2))\nprint(\"P(esperar más de 8 min)    =\", round(uniform.sf(8, inicio, ancho), 2))",
    errorFrecuente: {
      codigo: "from scipy.stats import uniform\n\n# Espera uniforme entre 0 y 10 minutos: P(esperar entre 2 y 5)\nprint(uniform.cdf(5, 0, 10))",
      explicacion:
        "`cdf(5)` es `P(X ≤ 5)`: incluye desde 0. Para un intervalo hay que restar las dos acumuladas: `cdf(5) - cdf(2)` = 0.3. Dar `cdf(5)` = 0.5 cuenta también el tramo de 0 a 2.",
    },
    practicaGuiada: {
      id: "m28-l1-practica",
      enunciado: "El tiempo de espera es uniforme entre 0 y 10 minutos. Calcula `P(X ≤ 4)` con `uniform.cdf` e imprímelo.",
      codigoInicial: "from scipy.stats import uniform\n\nprobabilidad = 0\nprint(probabilidad)",
      solucion: "from scipy.stats import uniform\n\nprobabilidad = uniform.cdf(4, loc=0, scale=10)\nprint(probabilidad)",
      pistas: ["`uniform.cdf(4, loc=0, scale=10)`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.4) <= 0.0005
        return { ok, mensaje: ok ? "Correcto: 4/10 = 0.4." : "El resultado esperado es 0.4." }
      },
    },
    reto: {
      id: "m28-l1-reto",
      enunciado: "Un envío tarda un tiempo uniforme entre 0 y 15 días. Calcula la probabilidad de que tarde **entre 5 y 12 días** (diferencia de dos `cdf`) e imprímela con 3 decimales.",
      codigoInicial: "from scipy.stats import uniform\n\nprobabilidad = uniform.cdf(12, loc=0, scale=15)      # esto es P(X <= 12)\nprint(round(probabilidad, 3))",
      solucion: "from scipy.stats import uniform\n\nprobabilidad = uniform.cdf(12, loc=0, scale=15) - uniform.cdf(5, loc=0, scale=15)\nprint(round(probabilidad, 3))",
      pistas: ["Resta `cdf(5)` a `cdf(12)`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.467) <= 0.0006
        return { ok, mensaje: ok ? "Correcto: 7/15 ≈ 0.467." : "El resultado esperado es 0.467." }
      },
    },
    verificacion: [
      {
        id: "m28-l1-q1",
        pregunta: "En una variable continua, P(X = 5) vale:",
        opciones: ["1", "0", "0.5", "Depende de la densidad"],
        respuestaCorrecta: 1,
        explicacion: "Un punto exacto tiene área cero; la probabilidad se mide en intervalos.",
      },
      {
        id: "m28-l1-q2",
        pregunta: "¿Qué representa la probabilidad de un intervalo en una variable continua?",
        opciones: ["La altura de la curva", "El área bajo la densidad en ese intervalo", "La pendiente", "El promedio"],
        respuestaCorrecta: 1,
        explicacion: "La probabilidad es el área bajo la función de densidad.",
      },
    ],
    resumen: ["En variables continuas la probabilidad es un área bajo la densidad.", "P(X = valor exacto) = 0.", "P(a < X < b) = cdf(b) - cdf(a)."],
    proximoPaso: "Estudiaremos la distribución normal, la más importante de la estadística.",
    conceptos: ["variable-continua", "distribucion-uniforme"],
  },
  {
    id: "m28-l2",
    moduloId: "modulo-28",
    titulo: "La distribución normal",
    objetivo: "Calcular probabilidades de una distribución normal con cdf y aplicar la regla empírica 68-95-99.7.",
    porQueImporta:
      "La normal aparece en alturas, errores de medición, promedios y, por el teorema central del límite, en muchísimos fenómenos. Casi toda la inferencia estadística se apoya en ella.",
    concepto: "La **distribución normal** tiene forma de campana simétrica y se define por dos parámetros: la media **μ** (el centro) y la desviación estándar **σ** (el ancho).\n\n**Regla empírica 68-95-99.7**:\n\n| Intervalo | Porcentaje aproximado |\n|---|---|\n| μ ± 1σ | 68 % |\n| μ ± 2σ | 95 % |\n| μ ± 3σ | 99.7 % |\n\n```python\nfrom scipy.stats import norm\n\nnorm.cdf(180, loc=170, scale=10)     # P(X <= 180) con μ=170, σ=10\nnorm.sf(180, 170, 10)                # P(X > 180)\nnorm.cdf(185, 170, 10) - norm.cdf(160, 170, 10)   # P(160 < X < 185)\n```\n\n`scale` es la desviación estándar **σ**, no la varianza.",
    ejemploMinimo: "from scipy.stats import norm\n\nprint(round(norm.cdf(180, loc=170, scale=10), 4))",
    ejemploAplicado: "from scipy.stats import norm\n\nmu, sigma = 170, 10      # estaturas en cm\n\nfor k in (1, 2, 3):\n    p = norm.cdf(mu + k * sigma, mu, sigma) - norm.cdf(mu - k * sigma, mu, sigma)\n    print(f\"Dentro de ±{k}σ: {p:.4f}\")",
    errorFrecuente: {
      codigo: "from scipy.stats import norm\n\nmu, varianza = 170, 100\nprint(norm.cdf(180, loc=mu, scale=varianza))",
      explicacion:
        "`scale` espera la **desviación estándar** (10), no la varianza (100). Con `scale=100` la campana es diez veces más ancha y el resultado (0.54) es incorrecto. La respuesta correcta con σ = 10 es 0.8413.",
    },
    practicaGuiada: {
      id: "m28-l2-practica",
      enunciado: "Las estaturas siguen una normal con μ = 170 y σ = 10. Calcula la probabilidad de medir **menos de 180 cm** con `norm.cdf` e imprímela con 4 decimales.",
      codigoInicial: "from scipy.stats import norm\n\nprobabilidad = 0\nprint(probabilidad)",
      solucion: "from scipy.stats import norm\n\nprobabilidad = round(norm.cdf(180, loc=170, scale=10), 4)\nprint(probabilidad)",
      pistas: ["`norm.cdf(180, loc=170, scale=10)`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.8413) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: aproximadamente el 84 %." : "El resultado esperado es 0.8413." }
      },
    },
    reto: {
      id: "m28-l2-reto",
      enunciado: "Calcula la probabilidad de medir **entre 160 y 185 cm** con la misma normal (diferencia de dos `cdf`). Imprímela con 4 decimales.",
      codigoInicial: "from scipy.stats import norm\n\nprobabilidad = norm.cdf(185, 170, 10)       # falta restar el tramo inferior\nprint(round(probabilidad, 4))",
      solucion: "from scipy.stats import norm\n\nprobabilidad = norm.cdf(185, 170, 10) - norm.cdf(160, 170, 10)\nprint(round(probabilidad, 4))",
      pistas: ["Resta `norm.cdf(160, 170, 10)`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.7745) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: el 77.45 % mide entre 160 y 185." : "El resultado esperado es 0.7745." }
      },
    },
    verificacion: [
      {
        id: "m28-l2-q1",
        pregunta: "En una normal, aproximadamente qué porcentaje de datos cae dentro de μ ± 2σ:",
        opciones: ["68 %", "95 %", "99.7 %", "50 %"],
        respuestaCorrecta: 1,
        explicacion: "La regla empírica: 68 %, 95 % y 99.7 % para 1, 2 y 3 desviaciones.",
      },
      {
        id: "m28-l2-q2",
        pregunta: "El parámetro `scale` de `norm` corresponde a:",
        opciones: ["La media", "La varianza", "La desviación estándar", "El rango"],
        respuestaCorrecta: 2,
        explicacion: "scale = σ.",
      },
    ],
    resumen: ["La normal se define por μ (centro) y σ (ancho).", "Regla empírica: 68 % / 95 % / 99.7 %.", "En scipy, `scale` es la desviación estándar."],
    proximoPaso: "Veremos la normal estándar, las puntuaciones z y cómo obtener percentiles con `ppf`.",
    conceptos: ["distribucion-normal", "regla-empirica"],
  },
  {
    id: "m28-l3",
    moduloId: "modulo-28",
    titulo: "Normal estándar, puntuaciones z y percentiles",
    objetivo: "Estandarizar valores con z, calcular probabilidades de cola y obtener percentiles con la función inversa ppf.",
    porQueImporta:
      "Convertir cualquier normal en una normal estándar permite comparar escalas distintas, y la función inversa responde preguntas como «¿qué puntaje deja al 90 % de la gente por debajo?».",
    concepto: "La **normal estándar** tiene μ = 0 y σ = 1. Cualquier normal se estandariza con la puntuación z que ya conoces del Curso 1:\n\n```\nz = (x - μ) / σ\n```\n\n- `norm.cdf(z)`: probabilidad acumulada (de izquierda a x).\n- `norm.sf(z)` o `1 - norm.cdf(z)`: probabilidad de **cola derecha** (mayor que x).\n- `norm.ppf(p)`: **función inversa**: el valor cuya probabilidad acumulada es `p` (el percentil).\n\n```python\nnorm.ppf(0.95)                # 1.645 (z del percentil 95)\nnorm.ppf(0.90, 100, 15)       # percentil 90 de una N(100, 15)\n```\n\n`ppf` y `cdf` son inversas: `norm.ppf(norm.cdf(x)) == x`.",
    ejemploMinimo: "from scipy.stats import norm\n\nprint(round(norm.ppf(0.95), 3))",
    ejemploAplicado: "from scipy.stats import norm\n\nmu, sigma = 100, 15       # puntaje de CI\n\nx = 130\nz = (x - mu) / sigma\nprint(\"z =\", z)\nprint(\"P(X > 130) =\", round(norm.sf(x, mu, sigma), 4))\nprint(\"Percentil 90 =\", round(norm.ppf(0.90, mu, sigma), 2))",
    errorFrecuente: {
      codigo: "from scipy.stats import norm\n\n# ¿Qué puntaje deja al 90 % por debajo? (μ=100, σ=15)\nprint(norm.cdf(0.90, 100, 15))",
      explicacion:
        "`cdf` recibe un **valor** y devuelve una probabilidad; para obtener el valor a partir de una probabilidad se necesita su inversa, `ppf`. `norm.ppf(0.90, 100, 15)` ≈ 119.22.",
    },
    practicaGuiada: {
      id: "m28-l3-practica",
      enunciado: "Para una normal con μ = 100 y σ = 15, calcula el **percentil 90** con `norm.ppf` e imprímelo con 2 decimales.",
      codigoInicial: "from scipy.stats import norm\n\npercentil_90 = 0\nprint(percentil_90)",
      solucion: "from scipy.stats import norm\n\npercentil_90 = round(norm.ppf(0.90, loc=100, scale=15), 2)\nprint(percentil_90)",
      pistas: ["`norm.ppf(0.90, loc=100, scale=15)`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 119.22) <= 0.006
        return { ok, mensaje: ok ? "Correcto: el 90 % de la población está por debajo de 119.22." : "El resultado esperado es 119.22." }
      },
    },
    reto: {
      id: "m28-l3-reto",
      enunciado: "Una persona obtiene 130 en un test con μ = 100 y σ = 15. Imprime en dos líneas su **z** y la probabilidad de obtener un puntaje **mayor** (cola derecha, 4 decimales).",
      codigoInicial: "from scipy.stats import norm\n\nmu, sigma, x = 100, 15, 130\n\nz = 0\ncola = 0\nprint(z)\nprint(cola)",
      solucion: "from scipy.stats import norm\n\nmu, sigma, x = 100, 15, 130\n\nz = (x - mu) / sigma\ncola = round(norm.sf(x, mu, sigma), 4)\nprint(z)\nprint(cola)",
      pistas: ["`z = (x - mu) / sigma`", "`norm.sf(x, mu, sigma)` o `1 - norm.cdf(x, mu, sigma)`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"2.0\",\"0.0228\"]"
        return { ok, mensaje: ok ? "Correcto: z = 2 y solo el 2.28 % supera ese puntaje." : "Se esperaba 2.0 y luego 0.0228." }
      },
    },
    verificacion: [
      {
        id: "m28-l3-q1",
        pregunta: "Un valor con z = 2 en una normal está:",
        opciones: ["2 unidades sobre la media", "2 desviaciones estándar sobre la media", "En el percentil 2", "En la media"],
        respuestaCorrecta: 1,
        explicacion: "z mide la distancia a la media en desviaciones estándar.",
      },
      {
        id: "m28-l3-q2",
        pregunta: "Para encontrar el valor que deja el 95 % de la distribución por debajo usas:",
        opciones: ["norm.cdf", "norm.ppf", "norm.pdf", "norm.sf"],
        respuestaCorrecta: 1,
        explicacion: "ppf es la función inversa de la acumulada.",
      },
    ],
    resumen: ["z = (x - μ) / σ estandariza cualquier normal.", "`cdf` va de valor a probabilidad; `ppf` de probabilidad a valor.", "`sf` da la cola derecha."],
    proximoPaso: "Pasaremos a la distribución exponencial, para tiempos de espera.",
    conceptos: ["normal-estandar", "percentiles-ppf"],
  },
  {
    id: "m28-l4",
    moduloId: "modulo-28",
    titulo: "Distribución exponencial: tiempos de espera",
    objetivo: "Modelar el tiempo entre eventos con la distribución exponencial y calcular probabilidades con cdf y sf.",
    porQueImporta:
      "Si los eventos llegan según un proceso de Poisson, el tiempo entre llegadas es exponencial: tiempo hasta la próxima llamada, duración de un componente, espera en una fila.",
    concepto: "La **exponencial** modela el tiempo hasta que ocurre el próximo evento, cuando los eventos ocurren a tasa constante.\n\n- Parámetro: la media `1/λ` (tiempo promedio entre eventos). En scipy se pasa como `scale`.\n- Su media es `scale` y su desviación estándar también es `scale`.\n- Es asimétrica: muchos tiempos cortos y pocos muy largos.\n- **Falta de memoria**: si ya esperaste 5 minutos, el tiempo que falta tiene la misma distribución que al comenzar.\n\n```python\nfrom scipy.stats import expon\n\nexpon.cdf(5, scale=5)     # P(T <= 5)\nexpon.sf(10, scale=5)     # P(T > 10) = e^(-10/5)\n```\n\nRelación con Poisson: si llegan en promedio λ eventos por hora, el tiempo medio entre eventos es `1/λ` horas.",
    ejemploMinimo: "from scipy.stats import expon\n\nprint(round(expon.sf(10, scale=5), 4))",
    ejemploAplicado: "from scipy.stats import expon\n\nmedia = 5          # en promedio, una llamada cada 5 minutos\n\nprint(\"P(esperar más de 10 min) =\", round(expon.sf(10, scale=media), 4))\nprint(\"P(esperar menos de 2 min) =\", round(expon.cdf(2, scale=media), 4))\nprint(\"Mediana del tiempo de espera =\", round(expon.ppf(0.5, scale=media), 2), \"min\")",
    errorFrecuente: {
      codigo: "from scipy.stats import expon\n\n# Llegan 12 clientes por hora. ¿P(que pasen más de 10 minutos sin llegar ninguno)?\nprint(expon.sf(10, scale=12))",
      explicacion:
        "La tasa son 12 clientes por hora, pero `scale` es el **tiempo medio entre llegadas**: 60 / 12 = 5 minutos. Con `scale=5` el resultado es 0.1353; con `scale=12` sería otro valor incorrecto. Hay que convertir la tasa en tiempo medio y mantener las mismas unidades.",
    },
    practicaGuiada: {
      id: "m28-l4-practica",
      enunciado: "El tiempo entre llamadas es exponencial con media de 5 minutos. Calcula la probabilidad de esperar **más de 10 minutos** con `expon.sf` e imprímela con 4 decimales.",
      codigoInicial: "from scipy.stats import expon\n\nprobabilidad = 0\nprint(probabilidad)",
      solucion: "from scipy.stats import expon\n\nprobabilidad = round(expon.sf(10, scale=5), 4)\nprint(probabilidad)",
      pistas: ["`expon.sf(10, scale=5)`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.1353) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: e⁻² ≈ 0.1353." : "El resultado esperado es 0.1353." }
      },
    },
    reto: {
      id: "m28-l4-reto",
      enunciado: "Con la misma exponencial, calcula la probabilidad de que la espera dure **entre 2 y 6 minutos** (diferencia de dos `cdf`) e imprímela con 4 decimales.",
      codigoInicial: "from scipy.stats import expon\n\nprobabilidad = expon.cdf(6, scale=5)       # falta restar el tramo de 0 a 2\nprint(round(probabilidad, 4))",
      solucion: "from scipy.stats import expon\n\nprobabilidad = expon.cdf(6, scale=5) - expon.cdf(2, scale=5)\nprint(round(probabilidad, 4))",
      pistas: ["Resta `expon.cdf(2, scale=5)`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.3691) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: 36.91 %." : "El resultado esperado es 0.3691." }
      },
    },
    verificacion: [
      {
        id: "m28-l4-q1",
        pregunta: "La propiedad de «falta de memoria» de la exponencial significa que:",
        opciones: ["El tiempo siempre es constante", "Haber esperado ya un tiempo no cambia la distribución del tiempo restante", "No se puede calcular la media", "Es simétrica"],
        respuestaCorrecta: 1,
        explicacion: "El futuro no depende de cuánto tiempo ya transcurrió.",
      },
      {
        id: "m28-l4-q2",
        pregunta: "Si llegan en promedio 6 clientes por hora, el tiempo medio entre llegadas es:",
        opciones: ["6 minutos", "10 minutos", "60 minutos", "0.6 minutos"],
        respuestaCorrecta: 1,
        explicacion: "60 minutos / 6 clientes = 10 minutos entre llegadas.",
      },
    ],
    resumen: ["Exponencial: tiempo hasta el próximo evento con tasa constante.", "En scipy, `scale` = tiempo medio = 1/λ.", "Poisson cuenta eventos; la exponencial mide el tiempo entre ellos."],
    proximoPaso: "Cerraremos con el teorema central del límite, que explica por qué la normal está en todas partes.",
    conceptos: ["distribucion-exponencial"],
  },
  {
    id: "m28-l5",
    moduloId: "modulo-28",
    titulo: "Teorema central del límite",
    objetivo: "Comprobar por simulación que la media de muestras grandes es aproximadamente normal y calcular el error estándar.",
    porQueImporta:
      "Es el resultado que hace posible la inferencia estadística: aunque los datos originales no sean normales, el promedio de muchos datos sí se comporta como una normal. De aquí salen los intervalos de confianza y las pruebas de hipótesis.",
    concepto: "**Teorema central del límite (TCL)**: si tomas muestras de tamaño `n` de una población con media **μ** y desviación **σ** (de cualquier forma), las **medias muestrales**:\n\n- Se distribuyen aproximadamente como una **normal**, cuando `n` es suficientemente grande (como regla práctica, 30 o más).\n- Tienen media **μ**.\n- Tienen desviación estándar **σ / √n**, llamada **error estándar**.\n\n```python\nimport numpy as np\n\nrng = np.random.default_rng(42)\nmedias = rng.exponential(scale=2, size=(5000, 36)).mean(axis=1)   # 5000 muestras de tamaño 36\nmedias.mean()    # ≈ 2   (μ)\nmedias.std()     # ≈ 2 / √36 = 0.333   (error estándar)\n```\n\nCuanto mayor es `n`, más pequeño es el error estándar: promedios de muestras grandes son más precisos.",
    ejemploMinimo: "import numpy as np\n\nprint(10 / np.sqrt(25))",
    ejemploAplicado: "import numpy as np\n\nrng = np.random.default_rng(42)\nsigma = 2                      # la exponencial con scale=2 tiene media 2 y σ = 2\n\nfor n in (1, 5, 30, 100):\n    medias = rng.exponential(scale=2, size=(5000, n)).mean(axis=1)\n    print(f\"n = {n:>3}: media de medias = {medias.mean():.2f}, desv. = {medias.std():.3f}, σ/√n = {sigma / np.sqrt(n):.3f}\")",
    errorFrecuente: {
      codigo: "import numpy as np\n\nsigma, n = 10, 25\nprint(\"Error estándar:\", sigma / n)",
      explicacion:
        "El error estándar es `σ / √n`, no `σ / n`. Con σ = 10 y n = 25 vale 2 (no 0.4). Dividir entre n en lugar de su raíz subestima mucho la variabilidad de la media.",
    },
    practicaGuiada: {
      id: "m28-l5-practica",
      enunciado: "Una población tiene σ = 10. Calcula el **error estándar** de la media para muestras de tamaño n = 25 (`σ / √n`) e imprímelo.",
      codigoInicial: "import numpy as np\n\nsigma, n = 10, 25\n\nerror_estandar = 0\nprint(error_estandar)",
      solucion: "import numpy as np\n\nsigma, n = 10, 25\n\nerror_estandar = sigma / np.sqrt(n)\nprint(error_estandar)",
      pistas: ["Usa `np.sqrt(n)` en el denominador."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 2.0) <= 0.0005
        return { ok, mensaje: ok ? "Correcto: 10 / 5 = 2." : "El resultado esperado es 2.0." }
      },
    },
    reto: {
      id: "m28-l5-reto",
      enunciado: "Simula 5 000 muestras de tamaño 36 de una exponencial con `scale=2` (media 2 y σ = 2), calcula la media de cada una e imprime la **desviación estándar de esas medias** con 2 decimales. El TCL predice `2 / √36 ≈ 0.33`.",
      codigoInicial: "import numpy as np\n\nrng = np.random.default_rng(42)\nmuestras = rng.exponential(scale=2, size=(5000, 36))\n\ndesviacion = muestras.std()       # esto es la dispersión de los datos individuales\nprint(round(desviacion, 2))",
      solucion: "import numpy as np\n\nrng = np.random.default_rng(42)\nmuestras = rng.exponential(scale=2, size=(5000, 36))\n\nmedias = muestras.mean(axis=1)\nprint(round(medias.std(), 2))",
      pistas: ["Calcula primero la media de cada fila con `.mean(axis=1)`.", "Después, la desviación estándar de esas 5 000 medias."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.33) <= 0.03
        return { ok, mensaje: ok ? "Correcto: la dispersión de las medias es mucho menor, cercana a σ/√n." : "El resultado debería rondar 0.33 (σ/√n = 2/6)." }
      },
    },
    verificacion: [
      {
        id: "m28-l5-q1",
        pregunta: "El teorema central del límite afirma que la distribución de las medias muestrales es aproximadamente:",
        opciones: ["Exponencial", "Normal, para n grande", "Uniforme", "Igual a la de los datos originales"],
        respuestaCorrecta: 1,
        explicacion: "Aunque la población no sea normal, las medias de muestras grandes lo son.",
      },
      {
        id: "m28-l5-q2",
        pregunta: "Si cuadruplicas el tamaño de la muestra, el error estándar:",
        opciones: ["Se cuadruplica", "Se reduce a la mitad", "No cambia", "Se reduce a la cuarta parte"],
        respuestaCorrecta: 1,
        explicacion: "σ/√n: al multiplicar n por 4, la raíz se duplica y el error se divide entre 2.",
      },
    ],
    resumen: ["Las medias muestrales son aproximadamente normales si n es grande.", "Su media es μ y su desviación (error estándar) es σ/√n.", "Más datos → promedios más precisos, pero con rendimientos decrecientes."],
    proximoPaso: "Cerramos el curso con un proyecto que combina binomial, Poisson, normal y simulación.",
    conceptos: ["teorema-central-limite", "error-estandar"],
  },
]
