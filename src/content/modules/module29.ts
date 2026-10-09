import type { Lesson } from '../../types'

export const module29Lessons: Lesson[] = [
  {
    id: "m29-l1",
    moduloId: "modulo-29",
    titulo: "Proyecto: modela la calidad de un lote (binomial)",
    objetivo: "Elegir la distribución adecuada para un problema real y calcular probabilidades de defectos por lote.",
    porQueImporta:
      "El primer paso de un proyecto de probabilidad es decidir qué distribución describe el fenómeno. Un acierto aquí hace que el resto del análisis sea fiable.",
    concepto: "**El caso**: una planta ensambla dispositivos y quiere responder tres preguntas de operación:\n\n1. **Calidad**: cada lote tiene 50 piezas y cada una sale defectuosa con probabilidad 0.04. ¿Qué tan probable es un lote limpio o con muchos defectos?\n2. **Pedidos**: llegan en promedio 6 pedidos por hora. ¿Cuántos operarios hacen falta para cubrir casi todas las horas?\n3. **Tiempos**: armar un dispositivo toma en promedio 45 minutos con desviación de 5 minutos. ¿Qué plazo prometer al cliente?\n\n**Primera pregunta: calidad.** Hay un número fijo de intentos (50 piezas), cada pieza es defectuosa o no, con la misma probabilidad (0.04), y se asumen independientes. Eso es una **binomial**: `X ~ Binomial(50, 0.04)`.\n\n```python\nfrom scipy.stats import binom\n\nbinom.pmf(0, 50, 0.04)          # P(lote sin defectos)\n1 - binom.cdf(3, 50, 0.04)      # P(más de 3 defectos)\n```\n\nAntes de calcular, **justifica el modelo**: ¿son razonables la independencia y la misma probabilidad? Si los defectos vinieran en tandas por una máquina descalibrada, la binomial no sería adecuada.",
    ejemploMinimo: "from scipy.stats import binom\n\nprint(round(binom.mean(50, 0.04), 2))",
    ejemploAplicado: "from scipy.stats import binom\n\nn, p = 50, 0.04\nprint(\"Defectos esperados por lote:\", n * p)\nfor k in range(5):\n    print(f\"P(X = {k}) = {binom.pmf(k, n, p):.4f}\")",
    errorFrecuente: {
      codigo: "from scipy.stats import poisson\n\n# Modelar defectos de un lote de 50 piezas con Poisson(2)\nprint(poisson.pmf(0, 2))",
      explicacion:
        "Poisson también tiene media 2, pero aquí hay un número **fijo** de piezas (50): los defectos no pueden pasar de 50 y cada pieza es un intento. Eso describe una binomial. Usar Poisson da 0.1353 en lugar de 0.1299: una diferencia pequeña, pero el modelo equivocado se nota con probabilidades más altas.",
    },
    practicaGuiada: {
      id: "m29-l1-practica",
      enunciado: "Calcula la probabilidad de que un lote **no tenga ningún defecto** con `binom.pmf`. Imprímela con 4 decimales.",
      codigoInicial: "from scipy.stats import binom\n\nn, p = 50, 0.04\n\nprobabilidad = 0\nprint(probabilidad)",
      solucion: "from scipy.stats import binom\n\nn, p = 50, 0.04\n\nprobabilidad = round(binom.pmf(0, n, p), 4)\nprint(probabilidad)",
      pistas: ["`binom.pmf(0, n, p)`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.1299) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: solo el 13 % de los lotes sale limpio." : "El resultado esperado es 0.1299." }
      },
    },
    reto: {
      id: "m29-l1-reto",
      enunciado: "La planta rechaza un lote si tiene **más de 3 defectos**. Calcula la probabilidad de rechazo (`1 - cdf(3)`) e imprímela con 4 decimales.",
      codigoInicial: "from scipy.stats import binom\n\nn, p = 50, 0.04\n\nrechazo = binom.cdf(3, n, p)      # esto es P(X <= 3)\nprint(round(rechazo, 4))",
      solucion: "from scipy.stats import binom\n\nn, p = 50, 0.04\n\nrechazo = 1 - binom.cdf(3, n, p)\nprint(round(rechazo, 4))",
      pistas: ["«Más de 3» es el complemento de «3 o menos»."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.1391) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: se rechaza el 13.91 % de los lotes." : "El resultado esperado es 0.1391." }
      },
    },
    verificacion: [
      {
        id: "m29-l1-q1",
        pregunta: "¿Por qué es adecuada la binomial para los defectos de un lote de 50 piezas?",
        opciones: ["Porque el tiempo es continuo", "Porque hay un número fijo de intentos independientes con la misma probabilidad de defecto", "Porque los datos son simétricos", "Porque la media es 2"],
        respuestaCorrecta: 1,
        explicacion: "Cumple las condiciones de la binomial: n fijo, intentos independientes, misma probabilidad.",
      },
      {
        id: "m29-l1-q2",
        pregunta: "¿Qué supuesto sería preocupante para este modelo?",
        opciones: ["Que p sea 0.04", "Que los defectos vengan en tandas por una máquina descalibrada (no independientes)", "Que n sea 50", "Que haya lotes limpios"],
        respuestaCorrecta: 1,
        explicacion: "Si los defectos están correlacionados, la independencia falla y la binomial subestima los lotes con muchos defectos.",
      },
    ],
    resumen: ["Elige la distribución según la naturaleza del fenómeno y justifica los supuestos.", "Defectos en n piezas con probabilidad p: binomial.", "«Más de k» se calcula con el complemento de la acumulada."],
    proximoPaso: "Modelaremos la llegada de pedidos con una distribución de Poisson.",
    conceptos: ["proyecto-probabilidad"],
  },
  {
    id: "m29-l2",
    moduloId: "modulo-29",
    titulo: "Proyecto: dimensiona la capacidad (Poisson)",
    objetivo: "Usar la distribución de Poisson para calcular riesgos de saturación y dimensionar capacidad.",
    porQueImporta:
      "Dimensionar capacidad siempre es un equilibrio: demasiada cuesta dinero, muy poca deja pedidos sin atender. La distribución de Poisson permite cuantificar ese riesgo.",
    concepto: "**Segunda pregunta: pedidos.** Llegan en promedio 6 pedidos por hora, de forma independiente. El número de pedidos por hora sigue una **Poisson(6)**.\n\n```python\nfrom scipy.stats import poisson\n\n1 - poisson.cdf(9, 6)       # P(10 o más pedidos en una hora)\npoisson.ppf(0.95, 6)        # capacidad que cubre el 95 % de las horas\n```\n\n`ppf(0.95)` devuelve el menor `k` tal que `P(X ≤ k) ≥ 0.95`. Es la forma directa de responder: «¿para cuántos pedidos por hora debo estar preparado si quiero cubrir el 95 % de las horas?».",
    ejemploMinimo: "from scipy.stats import poisson\n\nprint(round(poisson.pmf(6, 6), 4))",
    ejemploAplicado: "from scipy.stats import poisson\n\nlam = 6\nfor k in (4, 6, 8, 10):\n    print(f\"P(X = {k:>2}) = {poisson.pmf(k, lam):.4f}   P(X <= {k:>2}) = {poisson.cdf(k, lam):.4f}\")",
    errorFrecuente: {
      codigo: "from scipy.stats import poisson\n\n# ¿P(10 o más pedidos en una hora)?\nprint(1 - poisson.cdf(10, 6))",
      explicacion:
        "`cdf(10)` ya incluye el 10, así que `1 - cdf(10)` es `P(X > 10)` = «11 o más». Para «10 o más» hay que restar solo hasta 9: `1 - poisson.cdf(9, 6)` = 0.0839. Un desfase de un valor cambia la respuesta (0.0426 frente a 0.0839).",
    },
    practicaGuiada: {
      id: "m29-l2-practica",
      enunciado: "Calcula la probabilidad de recibir **10 o más** pedidos en una hora e imprímela con 4 decimales.",
      codigoInicial: "from scipy.stats import poisson\n\nlam = 6\n\nprobabilidad = 0\nprint(probabilidad)",
      solucion: "from scipy.stats import poisson\n\nlam = 6\n\nprobabilidad = round(1 - poisson.cdf(9, lam), 4)\nprint(probabilidad)",
      pistas: ["«10 o más» es el complemento de «9 o menos»."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.0839) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: ocurre en el 8.39 % de las horas." : "El resultado esperado es 0.0839." }
      },
    },
    reto: {
      id: "m29-l2-reto",
      enunciado: "¿Cuántos pedidos por hora debe poder atender la planta para cubrir **al menos el 95 %** de las horas? Usa `poisson.ppf` e imprime el número entero.",
      codigoInicial: "from scipy.stats import poisson\n\nlam = 6\n\ncapacidad = int(lam)       # el promedio no cubre el 95 % de las horas\nprint(capacidad)",
      solucion: "from scipy.stats import poisson\n\nlam = 6\n\ncapacidad = int(poisson.ppf(0.95, lam))\nprint(capacidad)",
      pistas: ["`poisson.ppf(0.95, lam)` devuelve el menor k con probabilidad acumulada ≥ 0.95."],
      validar: (stdout) => {
        const ok = stdout.trim() === "10"
        return { ok, mensaje: ok ? "Correcto: con capacidad para 10 pedidos se cubre el 95.7 % de las horas." : "El resultado esperado es 10." }
      },
    },
    verificacion: [
      {
        id: "m29-l2-q1",
        pregunta: "Si la capacidad es igual al promedio de llegadas (6 por hora), ¿qué ocurre?",
        opciones: ["Nunca se satura", "Se satura en una fracción importante de las horas", "Siempre sobra capacidad", "No se puede saber"],
        respuestaCorrecta: 1,
        explicacion: "Por la variabilidad de Poisson, muchas horas tendrán más de 6 pedidos.",
      },
      {
        id: "m29-l2-q2",
        pregunta: "`poisson.ppf(0.95, 6)` responde:",
        opciones: ["La probabilidad de 6 pedidos", "La menor cantidad k tal que P(X ≤ k) ≥ 0.95", "La media de pedidos", "La varianza"],
        respuestaCorrecta: 1,
        explicacion: "Es el percentil 95 de la distribución.",
      },
    ],
    resumen: ["Los pedidos por hora siguen una Poisson con λ igual al promedio.", "Dimensionar con el promedio deja muchas horas saturadas.", "`ppf` da la capacidad que cubre el porcentaje deseado."],
    proximoPaso: "Modelaremos los tiempos de armado con una distribución normal.",
    conceptos: ["dimensionar-capacidad"],
  },
  {
    id: "m29-l3",
    moduloId: "modulo-29",
    titulo: "Proyecto: promete un plazo (distribución normal)",
    objetivo: "Usar la normal para calcular el riesgo de retraso y elegir un plazo con un nivel de confianza.",
    porQueImporta:
      "Prometer el tiempo promedio incumple casi la mitad de las veces. Un buen plazo se calcula con un percentil, no con la media.",
    concepto: "**Tercera pregunta: tiempos.** Armar un dispositivo tarda en promedio 45 minutos con desviación de 5. Suponemos `T ~ Normal(45, 5)`.\n\n```python\nfrom scipy.stats import norm\n\nnorm.sf(55, 45, 5)          # P(T > 55): probabilidad de tardar más de 55 minutos\nnorm.ppf(0.95, 45, 5)       # plazo que se cumple el 95 % de las veces\n```\n\nPrometer 45 minutos (la media) se incumple el 50 % de las veces. El percentil 95 es un plazo que se cumple 19 de cada 20 veces.",
    ejemploMinimo: "from scipy.stats import norm\n\nprint(norm.cdf(45, 45, 5))",
    ejemploAplicado: "from scipy.stats import norm\n\nmu, sigma = 45, 5\nfor plazo in (45, 50, 55):\n    print(f\"Plazo {plazo} min → se cumple el {norm.cdf(plazo, mu, sigma):.1%} de las veces\")",
    errorFrecuente: {
      codigo: "from scipy.stats import norm\n\n# Plazo que se cumple el 95 % de las veces\nprint(norm.cdf(0.95, 45, 5))",
      explicacion:
        "`cdf` convierte un valor en probabilidad; aquí se busca lo contrario: a partir de la probabilidad (0.95) obtener el tiempo. Eso lo hace `ppf`: `norm.ppf(0.95, 45, 5)` ≈ 53.22 minutos.",
    },
    practicaGuiada: {
      id: "m29-l3-practica",
      enunciado: "Calcula la probabilidad de que armar un dispositivo tarde **más de 55 minutos** (`norm.sf`) e imprímela con 4 decimales.",
      codigoInicial: "from scipy.stats import norm\n\nmu, sigma = 45, 5\n\nprobabilidad = 0\nprint(probabilidad)",
      solucion: "from scipy.stats import norm\n\nmu, sigma = 45, 5\n\nprobabilidad = round(norm.sf(55, mu, sigma), 4)\nprint(probabilidad)",
      pistas: ["`norm.sf(55, mu, sigma)` o `1 - norm.cdf(55, mu, sigma)`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.0228) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: apenas el 2.28 % tarda más de 55 minutos." : "El resultado esperado es 0.0228." }
      },
    },
    reto: {
      id: "m29-l3-reto",
      enunciado: "¿Qué plazo en minutos se cumple el **95 %** de las veces? Calcula el percentil 95 con `norm.ppf` e imprímelo con 2 decimales.",
      codigoInicial: "from scipy.stats import norm\n\nmu, sigma = 45, 5\n\nplazo = mu           # el promedio solo se cumple la mitad de las veces\nprint(round(plazo, 2))",
      solucion: "from scipy.stats import norm\n\nmu, sigma = 45, 5\n\nplazo = norm.ppf(0.95, mu, sigma)\nprint(round(plazo, 2))",
      pistas: ["`norm.ppf(0.95, mu, sigma)`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 53.22) <= 0.006
        return { ok, mensaje: ok ? "Correcto: prometer 53.22 minutos se cumple el 95 % de las veces." : "El resultado esperado es 53.22." }
      },
    },
    verificacion: [
      {
        id: "m29-l3-q1",
        pregunta: "Si prometes un plazo igual a la media de una normal, lo cumples aproximadamente:",
        opciones: ["El 95 % de las veces", "El 50 % de las veces", "El 68 % de las veces", "Siempre"],
        respuestaCorrecta: 1,
        explicacion: "La normal es simétrica: la mitad de los tiempos supera la media.",
      },
      {
        id: "m29-l3-q2",
        pregunta: "Para elegir un plazo con 99 % de cumplimiento usarías:",
        opciones: ["norm.cdf(0.99)", "norm.ppf(0.99, mu, sigma)", "La media más 1 desviación", "norm.pdf"],
        respuestaCorrecta: 1,
        explicacion: "El percentil 99 se obtiene con la función inversa ppf.",
      },
    ],
    resumen: ["La media no es un buen plazo: se incumple la mitad de las veces.", "`norm.sf` da el riesgo de exceder un valor.", "`norm.ppf` da el plazo para un nivel de cumplimiento."],
    proximoPaso: "Cerraremos validando todo por simulación y escribiendo el reporte.",
    conceptos: ["plazo-con-confianza"],
  },
  {
    id: "m29-l4",
    moduloId: "modulo-29",
    titulo: "Proyecto: valida por simulación y reporta",
    objetivo: "Verificar un cálculo teórico con una simulación Monte Carlo y presentar los resultados del proyecto en un reporte breve.",
    porQueImporta:
      "Un resultado teórico basado en supuestos debe comprobarse. La simulación es una forma barata de detectar errores de cálculo, y un buen reporte resume hallazgos, supuestos y limitaciones.",
    concepto: "Para validar el cálculo de la probabilidad de rechazo de lote (más de 3 defectos), se simulan muchos lotes:\n\n```python\nimport numpy as np\n\nrng = np.random.default_rng(42)\ndefectos = rng.binomial(n=50, p=0.04, size=100_000)    # 100 000 lotes simulados\n(defectos > 3).mean()                                   # debe acercarse a 0.1391\n```\n\nSi la simulación y la teoría coinciden, ganas confianza en el cálculo. Si no, hay un error o un supuesto mal implementado.\n\n**Estructura del reporte**:\n\n1. Preguntas y modelos elegidos (con sus supuestos).\n2. Resultados clave con cifras.\n3. Recomendaciones.\n4. Limitaciones: independencia, parámetros estimados, datos reales por verificar.",
    ejemploMinimo: "import numpy as np\n\nrng = np.random.default_rng(0)\nprint(rng.binomial(50, 0.04, size=5))",
    ejemploAplicado: "import numpy as np\nfrom scipy.stats import binom\n\nrng = np.random.default_rng(42)\ndefectos = rng.binomial(50, 0.04, size=100_000)\n\nprint(\"Simulado :\", round((defectos > 3).mean(), 4))\nprint(\"Teórico  :\", round(1 - binom.cdf(3, 50, 0.04), 4))",
    errorFrecuente: {
      codigo: "import numpy as np\n\nrng = np.random.default_rng(42)\ndefectos = rng.binomial(50, 0.04, size=20)\nprint(\"P(rechazo) ≈\", (defectos > 3).mean())",
      explicacion:
        "Con solo 20 lotes simulados la estimación es muy ruidosa y puede variar enormemente entre ejecuciones. Para validar una probabilidad de ~14 % hacen falta decenas de miles de simulaciones.",
    },
    practicaGuiada: {
      id: "m29-l4-practica",
      enunciado: "Simula 100 000 lotes (`rng.binomial(50, 0.04, size=100_000)`) y estima la probabilidad de rechazo (**más de 3 defectos**). Imprímela con 2 decimales.",
      codigoInicial: "import numpy as np\n\nrng = np.random.default_rng(42)\ndefectos = rng.binomial(50, 0.04, size=100_000)\n\nestimado = 0\nprint(estimado)",
      solucion: "import numpy as np\n\nrng = np.random.default_rng(42)\ndefectos = rng.binomial(50, 0.04, size=100_000)\n\nestimado = round((defectos > 3).mean(), 2)\nprint(estimado)",
      pistas: ["`(defectos > 3).mean()` es la fracción de lotes rechazados."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && v >= 0.13 && v <= 0.15
        return { ok, mensaje: ok ? 'Correcto: la simulación coincide con el 13.91 % teórico.' : 'La estimación debería rondar 0.14 (teórico 0.1391).' }
      },
    },
    reto: {
      id: "m29-l4-reto",
      enunciado: "Genera el **reporte final** con tres líneas usando los valores teóricos de las lecciones anteriores: lote sin defectos (binomial, 4 decimales), 10 o más pedidos por hora (Poisson, 4 decimales) y plazo que cubre el 95 % (normal, 2 decimales).",
      codigoInicial: "from scipy.stats import binom, poisson, norm\n\nprint(f\"P(lote sin defectos): {0:.4f}\")\nprint(f\"P(10 o más pedidos en una hora): {0:.4f}\")\nprint(f\"Tiempo que cubre el 95 %: {0:.2f} min\")",
      solucion: "from scipy.stats import binom, poisson, norm\n\nprint(f\"P(lote sin defectos): {binom.pmf(0, 50, 0.04):.4f}\")\nprint(f\"P(10 o más pedidos en una hora): {1 - poisson.cdf(9, 6):.4f}\")\nprint(f\"Tiempo que cubre el 95 %: {norm.ppf(0.95, 45, 5):.2f} min\")",
      pistas: ["Reemplaza cada 0 por el cálculo correspondiente: `binom.pmf(0, 50, 0.04)`, `1 - poisson.cdf(9, 6)` y `norm.ppf(0.95, 45, 5)`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"P(lote sin defectos): 0.1299\",\"P(10 o más pedidos en una hora): 0.0839\",\"Tiempo que cubre el 95 %: 53.22 min\"]"
        return { ok, mensaje: ok ? "Correcto: reporte completo." : "Revisa los valores: 0.1299, 0.0839 y 53.22." }
      },
    },
    verificacion: [
      {
        id: "m29-l4-q1",
        pregunta: "¿Para qué sirve validar un cálculo teórico con una simulación?",
        opciones: ["Para reemplazar la teoría", "Para detectar errores de cálculo o supuestos mal implementados", "Para obtener siempre valores exactos", "No sirve"],
        respuestaCorrecta: 1,
        explicacion: "Si teoría y simulación divergen, hay algo que revisar.",
      },
      {
        id: "m29-l4-q2",
        pregunta: "Un reporte honesto de este proyecto debe mencionar como limitación:",
        opciones: ["Que la binomial es muy complicada", "Que los parámetros (0.04, 6, 45, 5) son supuestos que deben verificarse con datos reales", "Que Python es lento", "Nada, los modelos son exactos"],
        respuestaCorrecta: 1,
        explicacion: "Los resultados dependen de supuestos y parámetros que en la práctica se estiman con datos.",
      },
    ],
    resumen: ["Valida los cálculos teóricos con simulación.", "El reporte incluye modelos, supuestos, cifras, recomendaciones y limitaciones.", "Los parámetros del modelo deben contrastarse con datos reales."],
    proximoPaso: "Con esto completas el curso de Probabilidad y distribuciones. El siguiente paso es la estadística inferencial: estimar y decidir a partir de muestras.",
    conceptos: ["reporte-probabilidad"],
  },
]
