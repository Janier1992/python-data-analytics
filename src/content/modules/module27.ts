import type { Lesson } from '../../types'

export const module27Lessons: Lesson[] = [
  {
    id: "m27-l1",
    moduloId: "modulo-27",
    titulo: "Conteo: factoriales, permutaciones y combinaciones",
    objetivo: "Contar arreglos con permutaciones y selecciones con combinaciones usando el módulo math.",
    porQueImporta:
      "Para calcular probabilidades a menudo hay que contar de cuántas formas puede ocurrir algo: contraseñas, equipos, muestras. Contar mal es la causa más común de probabilidades erróneas.",
    concepto: "- **Factorial** `n!`: número de formas de ordenar `n` elementos distintos.\n- **Permutaciones** `P(n, k)`: formas de elegir `k` de `n` elementos **importando el orden**.\n- **Combinaciones** `C(n, k)`: formas de elegir `k` de `n` elementos **sin importar el orden**.\n\n```python\nimport math\n\nmath.factorial(5)   # 120\nmath.perm(10, 3)    # 720  (podio de 3 entre 10: el orden importa)\nmath.comb(10, 3)    # 120  (comité de 3 entre 10: el orden no importa)\n```\n\nLa pregunta clave: ¿cambiar el orden da un resultado distinto? Un podio (oro, plata, bronce) sí; un comité no.\n\nRelación útil: `C(n, k) = P(n, k) / k!`.",
    ejemploMinimo: "import math\n\nprint(math.factorial(4), math.perm(5, 2), math.comb(5, 2))",
    ejemploAplicado: "import math\n\n# Probabilidad de acertar una lotería 6/49 con una sola apuesta\ncombinaciones = math.comb(49, 6)\nprint(\"Combinaciones posibles:\", combinaciones)\nprint(\"Probabilidad de ganar:\", 1 / combinaciones)",
    errorFrecuente: {
      codigo: "import math\n\n# ¿Cuántos comités de 3 personas se pueden formar entre 10?\nprint(math.perm(10, 3))",
      explicacion:
        "En un comité el orden no importa (Ana-Luis-Eva es el mismo comité que Eva-Ana-Luis), así que corresponde `math.comb(10, 3)` = 120. `perm` cuenta cada orden por separado y da 720, seis veces más (3! = 6).",
    },
    practicaGuiada: {
      id: "m27-l1-practica",
      enunciado: "¿De cuántas formas se puede elegir un comité de 3 personas entre 10 (el orden no importa)? Imprime el resultado con `math.comb`.",
      codigoInicial: "import math\n\nformas = 0\nprint(formas)",
      solucion: "import math\n\nformas = math.comb(10, 3)\nprint(formas)",
      pistas: ["`math.comb(n, k)`"],
      validar: (stdout) => {
        const ok = stdout.trim() === "120"
        return { ok, mensaje: ok ? "Correcto: hay 120 comités posibles." : "El resultado esperado es 120." }
      },
    },
    reto: {
      id: "m27-l1-reto",
      enunciado: "Una contraseña tiene 4 dígitos **distintos** del 0 al 9 y el orden importa. ¿Cuántas contraseñas distintas existen? Usa `math.perm`.",
      codigoInicial: "import math\n\ncontrasenas = math.comb(10, 4)      # ¿importa el orden en una contraseña?\nprint(contrasenas)",
      solucion: "import math\n\ncontrasenas = math.perm(10, 4)\nprint(contrasenas)",
      pistas: ["En una contraseña, 1234 y 4321 son distintas: el orden importa.", "Usa `math.perm(10, 4)`."],
      validar: (stdout) => {
        const ok = stdout.trim() === "5040"
        return { ok, mensaje: ok ? "Correcto: 10·9·8·7 = 5040." : "El resultado esperado es 5040." }
      },
    },
    verificacion: [
      {
        id: "m27-l1-q1",
        pregunta: "¿Cuántas formas hay de ordenar 4 libros distintos en un estante?",
        opciones: ["4", "16", "24", "12"],
        respuestaCorrecta: 2,
        explicacion: "4! = 4·3·2·1 = 24.",
      },
      {
        id: "m27-l1-q2",
        pregunta: "Para contar equipos de fútbol de 11 jugadores elegidos entre 20, usarías:",
        opciones: ["Permutaciones", "Combinaciones", "Factorial de 20", "Nada, no se puede"],
        respuestaCorrecta: 1,
        explicacion: "El orden en que se eligen los jugadores no importa: combinaciones.",
      },
    ],
    resumen: ["Permutaciones: el orden importa; combinaciones: no importa.", "`math.perm` y `math.comb` hacen el cálculo.", "C(n, k) = P(n, k) / k!"],
    proximoPaso: "Asignaremos números a los resultados de un experimento con las variables aleatorias.",
    conceptos: ["permutaciones", "combinaciones"],
  },
  {
    id: "m27-l2",
    moduloId: "modulo-27",
    titulo: "Variables aleatorias discretas: esperanza y varianza",
    objetivo: "Representar una variable aleatoria discreta con su distribución de probabilidad y calcular su esperanza, varianza y desviación estándar.",
    porQueImporta:
      "Una variable aleatoria convierte resultados inciertos en números: demanda diaria, número de fallas, clientes por hora. Su esperanza es el «valor promedio a largo plazo» y su varianza mide el riesgo.",
    concepto: "Una **variable aleatoria discreta** toma valores separados (0, 1, 2…) con ciertas probabilidades. Su **distribución de probabilidad** lista cada valor `x` con su `P(X = x)`; las probabilidades suman 1.\n\n- **Esperanza** (valor esperado): `E[X] = Σ x · P(x)`\n- **Varianza**: `Var(X) = Σ (x - E[X])² · P(x)`\n- **Desviación estándar**: `√Var(X)`\n\n```python\nimport numpy as np\n\nx = np.array([0, 1, 2, 3])\np = np.array([0.1, 0.3, 0.4, 0.2])\n\nesperanza = (x * p).sum()\nvarianza = ((x - esperanza) ** 2 * p).sum()\n```\n\nLa esperanza no es necesariamente un valor que pueda ocurrir (1.7 clientes), sino el promedio a largo plazo.",
    ejemploMinimo: "import numpy as np\n\nx = np.array([0, 1, 2])\np = np.array([0.5, 0.3, 0.2])\nprint((x * p).sum())",
    ejemploAplicado: "import numpy as np\n\n# Demanda diaria de un producto\nx = np.array([0, 1, 2, 3])\np = np.array([0.1, 0.3, 0.4, 0.2])\n\nassert abs(p.sum() - 1) < 1e-9, \"Las probabilidades deben sumar 1\"\nesperanza = (x * p).sum()\nvarianza = ((x - esperanza) ** 2 * p).sum()\n\nprint(\"Esperanza:\", round(esperanza, 2))\nprint(\"Varianza:\", round(varianza, 2))\nprint(\"Desviación estándar:\", round(varianza ** 0.5, 2))",
    errorFrecuente: {
      codigo: "import numpy as np\n\nx = np.array([0, 1, 2, 3])\np = np.array([0.1, 0.3, 0.4, 0.2])\nprint(\"Esperanza:\", x.mean())",
      explicacion:
        "`x.mean()` es el promedio simple de los valores (1.5), que ignora cuán probable es cada uno. La esperanza pondera cada valor por su probabilidad: `(x * p).sum()` = 1.7.",
    },
    practicaGuiada: {
      id: "m27-l2-practica",
      enunciado: "Calcula la **esperanza** de la demanda con `(x * p).sum()` e imprímela redondeada a 2 decimales.",
      codigoInicial: "import numpy as np\n\nx = np.array([0, 1, 2, 3])\np = np.array([0.1, 0.3, 0.4, 0.2])\n\nesperanza = 0\nprint(esperanza)",
      solucion: "import numpy as np\n\nx = np.array([0, 1, 2, 3])\np = np.array([0.1, 0.3, 0.4, 0.2])\n\nesperanza = round((x * p).sum(), 2)\nprint(esperanza)",
      pistas: ["Multiplica cada valor por su probabilidad y suma."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 1.7) <= 0.005
        return { ok, mensaje: ok ? "Correcto: E[X] = 1.7." : "El resultado esperado es 1.7." }
      },
    },
    reto: {
      id: "m27-l2-reto",
      enunciado: "Calcula la **varianza** de la demanda (`Σ (x - E[X])² · p`) e imprímela redondeada a 2 decimales.",
      codigoInicial: "import numpy as np\n\nx = np.array([0, 1, 2, 3])\np = np.array([0.1, 0.3, 0.4, 0.2])\n\nesperanza = (x * p).sum()\nvarianza = 0\nprint(round(varianza, 2))",
      solucion: "import numpy as np\n\nx = np.array([0, 1, 2, 3])\np = np.array([0.1, 0.3, 0.4, 0.2])\n\nesperanza = (x * p).sum()\nvarianza = ((x - esperanza) ** 2 * p).sum()\nprint(round(varianza, 2))",
      pistas: ["`((x - esperanza) ** 2 * p).sum()`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.81) <= 0.005
        return { ok, mensaje: ok ? "Correcto: Var(X) = 0.81." : "El resultado esperado es 0.81." }
      },
    },
    verificacion: [
      {
        id: "m27-l2-q1",
        pregunta: "Las probabilidades de una distribución discreta deben:",
        opciones: ["Ser todas iguales", "Sumar 1", "Ser enteras", "Ser mayores que 0.5"],
        respuestaCorrecta: 1,
        explicacion: "Entre todos los valores posibles se reparte el 100 % de la probabilidad.",
      },
      {
        id: "m27-l2-q2",
        pregunta: "La esperanza de una variable aleatoria representa:",
        opciones: ["El valor más probable", "El promedio a largo plazo ponderado por probabilidades", "El valor máximo", "La mediana siempre"],
        respuestaCorrecta: 1,
        explicacion: "Es el valor medio que se obtendría repitiendo el experimento muchísimas veces.",
      },
    ],
    resumen: ["Una distribución asigna una probabilidad a cada valor posible.", "E[X] = Σ x·P(x); Var(X) = Σ (x - E[X])²·P(x).", "La varianza mide cuánto riesgo hay alrededor de la esperanza."],
    proximoPaso: "Veremos la distribución binomial, la más usada para contar éxitos.",
    conceptos: ["variable-aleatoria", "esperanza", "varianza-discreta"],
  },
  {
    id: "m27-l3",
    moduloId: "modulo-27",
    titulo: "Distribución binomial",
    objetivo: "Calcular probabilidades de la distribución binomial con scipy.stats (pmf y cdf).",
    porQueImporta:
      "La binomial modela «cuántos éxitos en n intentos»: piezas defectuosas en un lote, clientes que compran entre n visitantes, respuestas correctas en un examen.",
    concepto: "Se usa cuando:\n\n1. Hay **n** intentos independientes.\n2. Cada intento tiene dos resultados (éxito o fracaso).\n3. La probabilidad de éxito **p** es la misma en todos.\n\n`X ~ Binomial(n, p)` cuenta los éxitos. Su media es `n·p` y su desviación estándar `√(n·p·(1-p))`.\n\n```python\nfrom scipy.stats import binom\n\nbinom.pmf(2, n=10, p=0.1)   # P(X = 2)   (función de masa)\nbinom.cdf(2, n=10, p=0.1)   # P(X <= 2)  (acumulada)\n1 - binom.cdf(2, 10, 0.1)   # P(X > 2)\n```\n\n`pmf` da la probabilidad de un valor exacto; `cdf` acumula hasta ese valor (inclusive).",
    ejemploMinimo: "from scipy.stats import binom\n\nprint(round(binom.pmf(2, 10, 0.1), 4))",
    ejemploAplicado: "from scipy.stats import binom\n\nn, p = 10, 0.1       # 10 piezas, 10 % defectuosas\n\nprint(\"P(exactamente 2) =\", round(binom.pmf(2, n, p), 4))\nprint(\"P(a lo sumo 1)   =\", round(binom.cdf(1, n, p), 4))\nprint(\"Media =\", n * p, \" Desv. =\", round((n * p * (1 - p)) ** 0.5, 3))",
    errorFrecuente: {
      codigo: "from scipy.stats import binom\n\n# P(más de 2 defectos) en 10 piezas con p = 0.1\nprint(binom.cdf(2, 10, 0.1))",
      explicacion:
        "`cdf(2)` da `P(X ≤ 2)` (a lo sumo 2), no «más de 2». Lo pedido es el complemento: `1 - binom.cdf(2, 10, 0.1)`. Con distribuciones discretas, hay que cuidar si el límite se incluye o no.",
    },
    practicaGuiada: {
      id: "m27-l3-practica",
      enunciado: "Con 10 lanzamientos de una moneda justa, calcula la probabilidad de obtener **exactamente 3 caras** con `binom.pmf`. Imprímela redondeada a 4 decimales.",
      codigoInicial: "from scipy.stats import binom\n\nprobabilidad = 0\nprint(probabilidad)",
      solucion: "from scipy.stats import binom\n\nprobabilidad = round(binom.pmf(3, 10, 0.5), 4)\nprint(probabilidad)",
      pistas: ["`binom.pmf(k, n, p)` con k=3, n=10, p=0.5."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.1172) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: 120/1024 ≈ 0.1172." : "El resultado esperado es 0.1172." }
      },
    },
    reto: {
      id: "m27-l3-reto",
      enunciado: "En un lote de 20 piezas cada una es defectuosa con probabilidad 0.05. Calcula la probabilidad de encontrar **al menos 2 defectuosas** (`1 - cdf(1)`) y muéstrala con 4 decimales.",
      codigoInicial: "from scipy.stats import binom\n\nprobabilidad = binom.cdf(1, 20, 0.05)      # esto es P(X <= 1)\nprint(round(probabilidad, 4))",
      solucion: "from scipy.stats import binom\n\nprobabilidad = 1 - binom.cdf(1, 20, 0.05)\nprint(round(probabilidad, 4))",
      pistas: ["«Al menos 2» es el complemento de «a lo sumo 1»."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.2642) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: hay un 26.42 % de probabilidad." : "El resultado esperado es 0.2642." }
      },
    },
    verificacion: [
      {
        id: "m27-l3-q1",
        pregunta: "¿Cuál de estas situaciones NO se modela con una binomial?",
        opciones: ["Caras en 10 lanzamientos de moneda", "Piezas defectuosas en un lote de 50 con la misma probabilidad", "Minutos hasta que llega el próximo bus", "Respuestas correctas en 20 preguntas de opción múltiple adivinando"],
        respuestaCorrecta: 2,
        explicacion: "El tiempo de espera es continuo, no un conteo de éxitos en n intentos.",
      },
      {
        id: "m27-l3-q2",
        pregunta: "`binom.cdf(3, 10, 0.5)` calcula:",
        opciones: ["P(X = 3)", "P(X ≤ 3)", "P(X ≥ 3)", "P(X > 3)"],
        respuestaCorrecta: 1,
        explicacion: "La función acumulada incluye el valor 3.",
      },
    ],
    resumen: ["Binomial(n, p): éxitos en n intentos independientes con probabilidad p.", "`pmf` para un valor exacto; `cdf` para acumulado (≤).", "Media = n·p; desviación = √(n·p·(1-p))."],
    proximoPaso: "Veremos la distribución de Poisson, para contar eventos en un intervalo de tiempo.",
    conceptos: ["distribucion-binomial"],
  },
  {
    id: "m27-l4",
    moduloId: "modulo-27",
    titulo: "Distribución de Poisson",
    objetivo: "Modelar el número de eventos en un intervalo con la distribución de Poisson y calcular sus probabilidades.",
    porQueImporta:
      "Poisson describe cuántas veces ocurre algo en un intervalo fijo: llamadas por hora, errores por página, pedidos por día. Es la base para dimensionar personal y capacidad.",
    concepto: "Se usa cuando se cuentan eventos que ocurren de forma independiente a una **tasa promedio λ** (lambda) constante por intervalo.\n\n`X ~ Poisson(λ)`. Su media y su varianza valen ambas **λ**.\n\n```python\nfrom scipy.stats import poisson\n\npoisson.pmf(2, mu=3)    # P(X = 2) con λ = 3\npoisson.cdf(5, mu=4)    # P(X <= 5)\n1 - poisson.cdf(5, 4)   # P(X > 5)\npoisson.ppf(0.95, 4)    # menor k con P(X <= k) >= 0.95\n```\n\nLa tasa debe corresponder al mismo intervalo que la pregunta: si λ = 4 llamadas por hora, para media hora λ = 2.",
    ejemploMinimo: "from scipy.stats import poisson\n\nprint(round(poisson.pmf(0, 4), 4))",
    ejemploAplicado: "from scipy.stats import poisson\n\nlam = 4        # promedio de 4 llamadas por hora\n\nprint(\"P(ninguna llamada) =\", round(poisson.pmf(0, lam), 4))\nprint(\"P(6 o más)         =\", round(1 - poisson.cdf(5, lam), 4))\nprint(\"Capacidad para cubrir el 95 % de las horas:\", int(poisson.ppf(0.95, lam)), \"llamadas\")",
    errorFrecuente: {
      codigo: "from scipy.stats import poisson\n\n# En promedio llegan 4 llamadas por hora. ¿P(2 llamadas en media hora)?\nprint(poisson.pmf(2, 4))",
      explicacion:
        "La tasa de 4 es por **hora**, pero la pregunta es por **media hora**: hay que ajustar λ a 2 (`poisson.pmf(2, 2)` ≈ 0.2707). Usar una tasa de otro intervalo es el error más común con Poisson.",
    },
    practicaGuiada: {
      id: "m27-l4-practica",
      enunciado: "Con λ = 3 errores por página, calcula la probabilidad de **exactamente 2 errores** con `poisson.pmf`. Imprímela con 4 decimales.",
      codigoInicial: "from scipy.stats import poisson\n\nprobabilidad = 0\nprint(probabilidad)",
      solucion: "from scipy.stats import poisson\n\nprobabilidad = round(poisson.pmf(2, 3), 4)\nprint(probabilidad)",
      pistas: ["`poisson.pmf(k, mu)` con k=2 y mu=3."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.224) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: P(X = 2) = 0.2240." : "El resultado esperado es 0.224." }
      },
    },
    reto: {
      id: "m27-l4-reto",
      enunciado: "Con λ = 4 llamadas por hora, calcula la probabilidad de recibir **más de 6** llamadas en una hora. Imprímela con 4 decimales.",
      codigoInicial: "from scipy.stats import poisson\n\nprobabilidad = poisson.cdf(6, 4)       # esto es P(X <= 6)\nprint(round(probabilidad, 4))",
      solucion: "from scipy.stats import poisson\n\nprobabilidad = 1 - poisson.cdf(6, 4)\nprint(round(probabilidad, 4))",
      pistas: ["«Más de 6» es el complemento de «6 o menos»."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.1107) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: hay un 11.07 % de probabilidad." : "El resultado esperado es 0.1107." }
      },
    },
    verificacion: [
      {
        id: "m27-l4-q1",
        pregunta: "En una distribución de Poisson con λ = 5, la varianza es:",
        opciones: ["25", "5", "√5", "1"],
        respuestaCorrecta: 1,
        explicacion: "En Poisson la media y la varianza son iguales a λ.",
      },
      {
        id: "m27-l4-q2",
        pregunta: "Llegan en promedio 12 clientes por hora. Para el número de clientes en 15 minutos usarías λ =",
        opciones: ["12", "6", "3", "0.25"],
        respuestaCorrecta: 2,
        explicacion: "15 minutos es un cuarto de hora: 12 / 4 = 3.",
      },
    ],
    resumen: ["Poisson cuenta eventos por intervalo con tasa λ constante.", "Media = varianza = λ.", "Ajusta siempre λ al intervalo de la pregunta."],
    proximoPaso: "Cerraremos el módulo estimando probabilidades por simulación (Monte Carlo).",
    conceptos: ["distribucion-poisson"],
  },
  {
    id: "m27-l5",
    moduloId: "modulo-27",
    titulo: "Simulación Monte Carlo y ley de los grandes números",
    objetivo: "Estimar probabilidades simulando un experimento muchas veces y entender por qué el resultado se acerca al valor teórico.",
    porQueImporta:
      "Cuando la cuenta exacta es difícil, se simula. Es la herramienta universal de analistas y científicos de datos para evaluar riesgos, validar fórmulas y probar ideas rápido.",
    concepto: "La **ley de los grandes números** dice que, al repetir un experimento muchas veces, la **frecuencia relativa** de un evento se acerca a su probabilidad teórica.\n\nLa **simulación Monte Carlo** aprovecha esto: repite el experimento en el computador y estima la probabilidad como `veces que ocurrió / veces simuladas`.\n\n```python\nimport numpy as np\n\nrng = np.random.default_rng(42)              # semilla para resultados reproducibles\ndados = rng.integers(1, 7, size=(100_000, 2))  # 100 000 lanzamientos de 2 dados\n(dados.sum(axis=1) == 7).mean()              # ≈ 0.1667\n```\n\n- Fija una **semilla** para que el resultado sea reproducible.\n- Más simulaciones → menos error. El error típico baja con la raíz cuadrada del número de simulaciones.\n- La simulación da una **estimación**, no el valor exacto.",
    ejemploMinimo: "import numpy as np\n\nrng = np.random.default_rng(0)\ncaras = rng.integers(0, 2, size=1000)\nprint(caras.mean())",
    ejemploAplicado: "import numpy as np\n\nrng = np.random.default_rng(42)\n\nfor n in (100, 10_000, 1_000_000):\n    lanzamientos = rng.integers(1, 7, size=(n, 2))\n    estimado = (lanzamientos.sum(axis=1) == 7).mean()\n    print(f\"n = {n:>9,}  →  P(suma = 7) ≈ {estimado:.4f}   (teórico 0.1667)\")",
    errorFrecuente: {
      codigo: "import numpy as np\n\nrng = np.random.default_rng(1)\nlanzamientos = rng.integers(1, 7, size=5)\nprint(\"P(6) ≈\", (lanzamientos == 6).mean())",
      explicacion:
        "Con solo 5 simulaciones la estimación es muy ruidosa (solo puede valer 0, 0.2, 0.4…) y puede estar muy lejos del 0.1667 teórico. Para estimar probabilidades hacen falta decenas de miles de repeticiones.",
    },
    practicaGuiada: {
      id: "m27-l5-practica",
      enunciado: "Simula 100 000 lanzamientos de dos dados y estima la probabilidad de que la suma sea 7. Imprímela redondeada a 2 decimales.",
      codigoInicial: "import numpy as np\n\nrng = np.random.default_rng(42)\nlanzamientos = rng.integers(1, 7, size=(100_000, 2))\n\nestimado = 0\nprint(estimado)",
      solucion: "import numpy as np\n\nrng = np.random.default_rng(42)\nlanzamientos = rng.integers(1, 7, size=(100_000, 2))\n\nestimado = round((lanzamientos.sum(axis=1) == 7).mean(), 2)\nprint(estimado)",
      pistas: ["Suma por filas con `.sum(axis=1)`, compara con 7 y promedia el booleano."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && v >= 0.15 && v <= 0.18
        return { ok, mensaje: ok ? 'Correcto: la simulación se acerca a 0.1667.' : 'La estimación debería estar cerca de 0.17 (el valor teórico es 0.1667).' }
      },
    },
    reto: {
      id: "m27-l5-reto",
      enunciado: "Estima por simulación la probabilidad de obtener **al menos un 6 en 4 lanzamientos** de un dado (200 000 simulaciones). Imprímela redondeada a 2 decimales. El valor teórico es `1 - (5/6)⁴ ≈ 0.5177`.",
      codigoInicial: "import numpy as np\n\nrng = np.random.default_rng(42)\nlanzamientos = rng.integers(1, 7, size=(200_000, 4))\n\nestimado = 0\nprint(estimado)",
      solucion: "import numpy as np\n\nrng = np.random.default_rng(42)\nlanzamientos = rng.integers(1, 7, size=(200_000, 4))\n\nestimado = round((lanzamientos == 6).any(axis=1).mean(), 2)\nprint(estimado)",
      pistas: ["`(lanzamientos == 6).any(axis=1)` indica, por fila, si hubo algún 6.", "Promedia el resultado."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && v >= 0.5 && v <= 0.54
        return { ok, mensaje: ok ? 'Correcto: se acerca al valor teórico 0.5177.' : 'La estimación debería rondar 0.52 (teórico 0.5177).' }
      },
    },
    verificacion: [
      {
        id: "m27-l5-q1",
        pregunta: "Según la ley de los grandes números, al aumentar el número de simulaciones:",
        opciones: ["La frecuencia relativa se acerca a la probabilidad teórica", "Siempre sale exactamente la probabilidad", "El error crece", "La probabilidad cambia"],
        respuestaCorrecta: 0,
        explicacion: "Con más repeticiones, la estimación se estabiliza cerca del valor real.",
      },
      {
        id: "m27-l5-q2",
        pregunta: "¿Para qué sirve fijar una semilla (`default_rng(42)`)?",
        opciones: ["Para que la simulación sea más rápida", "Para que los resultados sean reproducibles", "Para eliminar el error", "Para que salgan números más altos"],
        respuestaCorrecta: 1,
        explicacion: "La misma semilla produce la misma secuencia de números aleatorios.",
      },
    ],
    resumen: ["Monte Carlo estima probabilidades repitiendo el experimento muchas veces.", "La ley de los grandes números garantiza que la estimación converge.", "Usa semillas para reproducibilidad y muchas repeticiones para precisión."],
    proximoPaso: "En el siguiente módulo pasamos a las distribuciones continuas: uniforme, normal y exponencial.",
    conceptos: ["monte-carlo", "ley-grandes-numeros"],
  },
]
