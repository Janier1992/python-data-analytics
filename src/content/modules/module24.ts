import type { Lesson } from '../../types'

export const module24Lessons: Lesson[] = [
  {
    id: "m24-l1",
    moduloId: "modulo-24",
    titulo: "Forma de la distribución: asimetría y curtosis",
    objetivo: "Describir la forma de una distribución con la asimetría y la curtosis, y clasificarla como simétrica o sesgada.",
    porQueImporta:
      "La forma de los datos decide qué resumen, qué gráfico y más adelante qué prueba estadística son adecuados. Dos variables con la misma media y desviación pueden tener formas completamente distintas.",
    concepto: "- **Asimetría** (`skew`): hacia qué lado se estira la cola.\n  - ≈ 0: simétrica.\n  - > 0: cola larga a la derecha (sesgo positivo).\n  - < 0: cola larga a la izquierda (sesgo negativo).\n- **Curtosis** (`kurt`): qué tan pesadas son las colas respecto a una distribución normal. En pandas se reporta como *exceso de curtosis*: 0 es la normal, valores positivos indican colas pesadas (más valores extremos) y negativos, colas ligeras.\n\n```python\nserie.skew()\nserie.kurt()\n```\n\nReglas prácticas para la asimetría: entre -0.5 y 0.5 se considera aproximadamente simétrica; fuera de -1 y 1, claramente sesgada.",
    ejemploMinimo: "import pandas as pd\n\ndatos = pd.Series([1, 2, 2, 3, 3, 3, 4, 4, 10])\nprint(round(datos.skew(), 2), round(datos.kurt(), 2))",
    ejemploAplicado: "import pandas as pd\n\nsimetrica = pd.Series([48, 50, 52, 49, 51, 50, 50, 47, 53])\nderecha = pd.Series([1, 1, 2, 2, 2, 3, 3, 4, 25])\nizquierda = pd.Series([10, 50, 52, 53, 54, 54, 55, 55, 56])\n\nfor nombre, s in [(\"simétrica\", simetrica), (\"derecha\", derecha), (\"izquierda\", izquierda)]:\n    print(f\"{nombre:10} skew = {s.skew():6.2f}\")",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ndatos = pd.Series([1, 2, 2, 3, 3, 3, 4, 4, 10])\nprint(\"Sesgo a la izquierda\" if datos.skew() > 0 else \"Sesgo a la derecha\")",
      explicacion:
        "Se confunde el sentido del sesgo. El nombre depende de **hacia dónde se estira la cola**, no de dónde se concentran los datos: `skew > 0` significa cola larga a la **derecha** (sesgo positivo). Aquí el 10 estira la cola hacia la derecha.",
    },
    practicaGuiada: {
      id: "m24-l1-practica",
      enunciado: "Calcula la asimetría de `datos` con `.skew()` e imprímela redondeada a 2 decimales.",
      codigoInicial: "import pandas as pd\n\ndatos = pd.Series([1, 2, 2, 3, 3, 3, 4, 4, 10])\n\nasimetria = 0\nprint(asimetria)",
      solucion: "import pandas as pd\n\ndatos = pd.Series([1, 2, 2, 3, 3, 3, 4, 4, 10])\n\nasimetria = round(datos.skew(), 2)\nprint(asimetria)",
      pistas: ["Usa `datos.skew()` y `round(..., 2)`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 2.21) <= 0.006
        return { ok, mensaje: ok ? "Correcto: el valor 10 estira la cola hacia la derecha." : "El resultado esperado es 2.21." }
      },
    },
    reto: {
      id: "m24-l1-reto",
      enunciado: "Completa `forma(serie)`: devuelve `\"derecha\"` si `skew() > 0.5`, `\"izquierda\"` si `skew() < -0.5` y `\"simétrica\"` en otro caso.",
      codigoInicial: "import pandas as pd\n\ndef forma(serie):\n    return \"simétrica\"     # falta clasificar según el sesgo\n\na = pd.Series([48, 50, 52, 49, 51, 50, 50, 47, 53])\nb = pd.Series([10, 50, 52, 53, 54, 54, 55, 55, 56])\nc = pd.Series([1, 1, 2, 2, 2, 3, 3, 4, 25])\n\nprint(forma(a))\nprint(forma(b))\nprint(forma(c))",
      solucion: "import pandas as pd\n\ndef forma(serie):\n    asimetria = serie.skew()\n    if asimetria > 0.5:\n        return \"derecha\"\n    if asimetria < -0.5:\n        return \"izquierda\"\n    return \"simétrica\"\n\na = pd.Series([48, 50, 52, 49, 51, 50, 50, 47, 53])\nb = pd.Series([10, 50, 52, 53, 54, 54, 55, 55, 56])\nc = pd.Series([1, 1, 2, 2, 2, 3, 3, 4, 25])\n\nprint(forma(a))\nprint(forma(b))\nprint(forma(c))",
      pistas: ["Guarda `serie.skew()` en una variable y compárala con 0.5 y -0.5."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"simétrica\",\"izquierda\",\"derecha\"]"
        return { ok, mensaje: ok ? "Correcto: simétrica, izquierda y derecha." : "Se esperaba: simétrica, izquierda, derecha (una por línea)." }
      },
    },
    verificacion: [
      {
        id: "m24-l1-q1",
        pregunta: "Un `skew()` de +2.5 indica:",
        opciones: ["Cola larga a la izquierda", "Cola larga a la derecha", "Distribución simétrica", "Datos sin variación"],
        respuestaCorrecta: 1,
        explicacion: "Un sesgo positivo significa que la cola se estira hacia valores altos (derecha).",
      },
      {
        id: "m24-l1-q2",
        pregunta: "Una curtosis positiva (exceso) indica:",
        opciones: ["Colas más ligeras que la normal", "Colas más pesadas, con más valores extremos", "Que la media es mayor que la mediana", "Que los datos son discretos"],
        respuestaCorrecta: 1,
        explicacion: "El exceso de curtosis positivo señala colas pesadas.",
      },
    ],
    resumen: ["`skew()` mide hacia dónde se estira la cola.", "`kurt()` mide el peso de las colas (0 = normal).", "La forma condiciona qué resumen y qué gráfico elegir."],
    proximoPaso: "Veremos cómo se agrupan los datos numéricos en un histograma.",
    conceptos: ["asimetria", "curtosis"],
  },
  {
    id: "m24-l2",
    moduloId: "modulo-24",
    titulo: "Histogramas: agrupar datos en clases",
    objetivo: "Agrupar una variable numérica en clases con np.histogram, elegir un número razonable de clases y dibujar el histograma.",
    porQueImporta:
      "El histograma es el gráfico estrella para ver la forma de una variable numérica: dónde se concentra, si es simétrica y si hay grupos o huecos. Pero su aspecto cambia mucho según cuántas clases uses.",
    concepto: "Un **histograma** divide el rango de la variable en intervalos (clases) y cuenta cuántos datos caen en cada uno.\n\n```python\nconteos, bordes = np.histogram(datos, bins=5)          # 5 clases de igual ancho\nnp.histogram(datos, bins=[0, 10, 20, 30, 40])[0]       # bordes definidos por ti\nplt.hist(datos, bins=6)                                # dibujo con matplotlib\n```\n\n¿Cuántas clases? Ni muy pocas (se pierde la forma) ni demasiadas (se ve ruido). La **regla de Sturges** da un punto de partida:\n\n```\nk = ceil(1 + log2(n))\n```\n\nLos intervalos incluyen el borde izquierdo y excluyen el derecho, salvo el último, que incluye ambos.",
    ejemploMinimo: "import numpy as np\n\ndatos = [3, 7, 12, 14, 18, 21, 22, 25, 27, 29, 33, 38]\nconteos, bordes = np.histogram(datos, bins=4)\nprint(conteos, bordes)",
    ejemploAplicado: "import numpy as np\nimport matplotlib.pyplot as plt\n\ntiempos = [12, 15, 11, 18, 14, 13, 16, 19, 12, 15, 14, 13, 17, 15, 14, 16, 22, 13, 15, 14]\nk = int(np.ceil(1 + np.log2(len(tiempos))))\n\nplt.hist(tiempos, bins=k, edgecolor=\"white\")\nplt.title(f\"Tiempos de atención ({k} clases)\")\nplt.xlabel(\"minutos\")\nplt.ylabel(\"frecuencia\")\nplt.show()",
    errorFrecuente: {
      codigo: "import numpy as np\n\ndatos = [1, 2, 2, 3, 3, 3, 4, 4, 5, 5]\nprint(np.histogram(datos, bins=2)[0], np.histogram(datos, bins=50)[0])",
      explicacion:
        "Con muy pocas clases (2) todo se mezcla y no se ve la forma; con demasiadas (50) casi cada clase queda vacía o con un dato y solo se ve ruido. Parte de la regla de Sturges y prueba valores cercanos hasta que la forma sea clara.",
    },
    practicaGuiada: {
      id: "m24-l2-practica",
      enunciado: "Cuenta cuántos datos caen en cada clase usando los bordes `[0, 10, 20, 30, 40]` con `np.histogram(...)[0]`, e imprime los conteos con `.tolist()`.",
      codigoInicial: "import numpy as np\n\ndatos = [3, 7, 12, 14, 18, 21, 22, 25, 27, 29, 33, 38]\nbordes = [0, 10, 20, 30, 40]\n\nconteos = []\nprint(conteos)",
      solucion: "import numpy as np\n\ndatos = [3, 7, 12, 14, 18, 21, 22, 25, 27, 29, 33, 38]\nbordes = [0, 10, 20, 30, 40]\n\nconteos = np.histogram(datos, bins=bordes)[0].tolist()\nprint(conteos)",
      pistas: ["`np.histogram(datos, bins=bordes)` devuelve (conteos, bordes).", "Toma el elemento `[0]` y conviértelo con `.tolist()`."],
      validar: (stdout) => {
        const ok = stdout.trim() === "[2, 3, 5, 2]"
        return { ok, mensaje: ok ? "Correcto: 2, 3, 5 y 2 datos por clase." : "El resultado esperado es [2, 3, 5, 2]." }
      },
    },
    reto: {
      id: "m24-l2-reto",
      enunciado: "Calcula el número de clases con la **regla de Sturges** (`ceil(1 + log2(n))`), construye el histograma con ese número y escribe en una línea `k` y el conteo de la clase más grande, por ejemplo `6 7`.",
      codigoInicial: "import numpy as np\n\ndatos = [12, 15, 11, 18, 14, 13, 16, 19, 12, 15, 14, 13, 17, 15, 14, 16, 22, 13, 15, 14]\n\nk = 4      # reemplaza por la regla de Sturges\nconteos = np.histogram(datos, bins=k)[0]\nprint(k, conteos.max())",
      solucion: "import numpy as np\n\ndatos = [12, 15, 11, 18, 14, 13, 16, 19, 12, 15, 14, 13, 17, 15, 14, 16, 22, 13, 15, 14]\n\nk = int(np.ceil(1 + np.log2(len(datos))))\nconteos = np.histogram(datos, bins=k)[0]\nprint(k, conteos.max())",
      pistas: ["`np.log2(len(datos))` calcula el logaritmo en base 2 de n.", "Redondea hacia arriba con `np.ceil` y conviértelo a `int`."],
      validar: (stdout) => {
        const ok = stdout.trim() === "6 7"
        return { ok, mensaje: ok ? "Correcto: 6 clases y la mayor tiene 7 datos." : "El resultado esperado es «6 7»." }
      },
    },
    verificacion: [
      {
        id: "m24-l2-q1",
        pregunta: "Si usas demasiadas clases en un histograma:",
        opciones: ["Se ve mejor la forma general", "Aparece ruido y la forma se pierde", "Siempre se ve una campana", "Desaparecen los atípicos"],
        respuestaCorrecta: 1,
        explicacion: "Con muchas clases cada una tiene pocos datos y se ve ruido, no la forma.",
      },
      {
        id: "m24-l2-q2",
        pregunta: "La regla de Sturges sugiere el número de clases a partir de:",
        opciones: ["La media", "El tamaño de la muestra (n)", "La desviación estándar", "El máximo"],
        respuestaCorrecta: 1,
        explicacion: "k = ceil(1 + log2(n)) depende solo de cuántos datos hay.",
      },
    ],
    resumen: ["El histograma cuenta datos por intervalos.", "`np.histogram` devuelve los conteos y los bordes de las clases.", "La regla de Sturges es un punto de partida para elegir el número de clases."],
    proximoPaso: "Pasamos a estudiar la relación entre dos variables: covarianza y correlación.",
    conceptos: ["histograma", "regla-de-sturges"],
  },
  {
    id: "m24-l3",
    moduloId: "modulo-24",
    titulo: "Covarianza y correlación de Pearson",
    objetivo: "Medir la relación lineal entre dos variables numéricas con la covarianza y el coeficiente de correlación de Pearson.",
    porQueImporta:
      "Muchas preguntas de negocio son preguntas de relación: ¿más publicidad significa más ventas?, ¿más horas de estudio, mejores notas? La correlación pone un número a esa relación.",
    concepto: "- **Covarianza**: indica si dos variables suben juntas (positiva) o una sube cuando la otra baja (negativa). Su valor depende de las unidades, así que es difícil de interpretar.\n- **Correlación de Pearson (r)**: la covarianza estandarizada. Siempre está entre **-1 y +1**.\n\n| r | Interpretación |\n|---|---|\n| cerca de +1 | relación lineal positiva fuerte |\n| cerca de 0 | no hay relación **lineal** |\n| cerca de -1 | relación lineal negativa fuerte |\n\n```python\nx.cov(y)         # covarianza\nx.corr(y)        # correlación de Pearson\ndf.corr()        # matriz de correlaciones de todas las columnas numéricas\n```\n\nOrientación habitual: |r| < 0.3 débil, 0.3–0.7 moderada, > 0.7 fuerte. Pearson solo detecta relaciones **lineales**.",
    ejemploMinimo: "import pandas as pd\n\nx = pd.Series([1, 2, 3, 4, 5])\ny = pd.Series([2, 4, 6, 8, 10])\nprint(x.corr(y))",
    ejemploAplicado: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"horas_estudio\": [1, 2, 3, 4, 5, 6, 7, 8],\n    \"horas_tv\": [5, 4, 6, 3, 4, 2, 3, 2],\n    \"nota\": [2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6],\n})\nprint(df.corr().round(2))",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ndf = pd.DataFrame({\"ciudad\": [\"Cali\", \"Bogotá\", \"Cali\"], \"ventas\": [10, 20, 15], \"costos\": [4, 9, 6]})\nprint(df.corr())",
      explicacion:
        "En versiones recientes de pandas, `df.corr()` falla si hay columnas de texto (`could not convert string to float`). Selecciona antes solo las numéricas con `df.select_dtypes(\"number\").corr()` o con `df.corr(numeric_only=True)`.",
    },
    practicaGuiada: {
      id: "m24-l3-practica",
      enunciado: "Calcula la correlación de Pearson entre `x` e `y` con `x.corr(y)` e imprímela redondeada a 3 decimales.",
      codigoInicial: "import pandas as pd\n\nx = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])\ny = pd.Series([2, 4, 5, 4, 5, 7, 8, 9, 10, 11])\n\nr = 0\nprint(r)",
      solucion: "import pandas as pd\n\nx = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])\ny = pd.Series([2, 4, 5, 4, 5, 7, 8, 9, 10, 11])\n\nr = round(x.corr(y), 3)\nprint(r)",
      pistas: ["`x.corr(y)` devuelve el coeficiente de Pearson."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.975) <= 0.001
        return { ok, mensaje: ok ? "Correcto: relación lineal positiva muy fuerte." : "El resultado esperado es 0.975." }
      },
    },
    reto: {
      id: "m24-l3-reto",
      enunciado: "Con la matriz de correlaciones, imprime el nombre de la variable cuya relación con `nota` es **más fuerte** (mayor valor absoluto), sin contar la propia `nota`.",
      codigoInicial: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"horas_estudio\": [1, 2, 3, 4, 5, 6, 7, 8],\n    \"horas_tv\": [5, 4, 6, 3, 4, 2, 3, 2],\n    \"nota\": [2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6],\n})\n\n# usa df.corr()[\"nota\"], quita \"nota\" y busca el mayor valor absoluto\nprint(\"horas_tv\")",
      solucion: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"horas_estudio\": [1, 2, 3, 4, 5, 6, 7, 8],\n    \"horas_tv\": [5, 4, 6, 3, 4, 2, 3, 2],\n    \"nota\": [2.5, 2.8, 3.1, 3.0, 3.8, 4.0, 4.2, 4.6],\n})\n\nfuerte = df.corr()[\"nota\"].drop(\"nota\").abs().idxmax()\nprint(fuerte)",
      pistas: ["`df.corr()[\"nota\"]` da la columna de correlaciones con `nota`.", "Encadena `.drop(\"nota\")`, `.abs()` e `.idxmax()`."],
      validar: (stdout) => {
        const ok = stdout.trim() === "horas_estudio"
        return { ok, mensaje: ok ? "Correcto: horas_estudio tiene la relación más fuerte con la nota." : "El resultado esperado es horas_estudio." }
      },
    },
    verificacion: [
      {
        id: "m24-l3-q1",
        pregunta: "Un coeficiente r = -0.9 indica:",
        opciones: ["Relación lineal negativa fuerte", "No hay relación", "Relación positiva débil", "Un error de cálculo"],
        respuestaCorrecta: 0,
        explicacion: "Cerca de -1: cuando una variable sube, la otra baja de forma casi lineal.",
      },
      {
        id: "m24-l3-q2",
        pregunta: "Si r ≈ 0, ¿qué se puede afirmar?",
        opciones: ["Las variables son independientes", "No hay relación lineal (puede haber otra forma de relación)", "Una causa a la otra", "Los datos tienen errores"],
        respuestaCorrecta: 1,
        explicacion: "Pearson solo mide relación lineal: una curva perfecta puede dar r ≈ 0.",
      },
    ],
    resumen: ["La covarianza indica el sentido de la relación pero depende de las unidades.", "Pearson (r) la estandariza entre -1 y +1.", "`df.corr()` calcula todas las correlaciones de una vez."],
    proximoPaso: "Veremos qué hacer cuando la relación no es lineal o hay valores extremos, y por qué correlación no es causalidad.",
    conceptos: ["covarianza", "correlacion-pearson"],
  },
  {
    id: "m24-l4",
    moduloId: "modulo-24",
    titulo: "Correlación de Spearman y por qué correlación no es causalidad",
    objetivo: "Usar la correlación de Spearman cuando hay relaciones monótonas o valores extremos, y reconocer los límites de interpretar una correlación.",
    porQueImporta:
      "Un solo dato extremo puede hundir o inflar una correlación de Pearson. Y aunque dos variables vayan juntas, eso no prueba que una cause la otra: es el error de interpretación más común en informes de datos.",
    concepto: "La **correlación de Spearman** aplica Pearson sobre los **rangos** (posiciones) de los datos en vez de sobre los valores. Resulta:\n\n- Menos sensible a valores extremos.\n- Capaz de captar relaciones **monótonas** (siempre crecientes o decrecientes), aunque no sean rectas.\n\n```python\nx.corr(y)                      # Pearson (lineal)\nx.corr(y, method=\"spearman\")   # Spearman (monótona)\n```\n\n**Correlación no implica causalidad.** Tres explicaciones posibles cuando A y B se correlacionan:\n\n1. A causa B.\n2. B causa A.\n3. Una tercera variable (**confusora**) causa ambas. Las ventas de helados y los ahogamientos suben juntos en verano: el calor es la causa de ambos.\n\nY también puede ser pura coincidencia. Para afirmar causalidad hacen falta experimentos o diseños específicos, no solo correlaciones.",
    ejemploMinimo: "import pandas as pd\n\nx = pd.Series([1, 2, 3, 4, 5])\ny = pd.Series([1, 4, 9, 16, 25])\nprint(round(x.corr(y), 3), x.corr(y, method=\"spearman\"))",
    ejemploAplicado: "import pandas as pd\n\nx = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])\ny = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 100])   # un valor extremo\n\nprint(\"Pearson :\", round(x.corr(y), 2))\nprint(\"Spearman:\", round(x.corr(y, method=\"spearman\"), 2))",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ndf = pd.DataFrame({\"helados\": [10, 20, 30, 40], \"ahogamientos\": [1, 2, 4, 5]})\nprint(\"Los helados causan ahogamientos:\", df.helados.corr(df.ahogamientos) > 0.9)",
      explicacion:
        "La correlación es alta, pero la conclusión causal es falsa: ambas variables dependen de una tercera (la temperatura del verano). Una correlación describe que las variables se mueven juntas; no explica por qué.",
    },
    practicaGuiada: {
      id: "m24-l4-practica",
      enunciado: "Calcula la correlación de **Spearman** entre `x` e `y` (`method=\"spearman\"`) e imprímela redondeada a 2 decimales.",
      codigoInicial: "import pandas as pd\n\nx = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])\ny = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 100])\n\nrho = 0\nprint(rho)",
      solucion: "import pandas as pd\n\nx = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])\ny = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 100])\n\nrho = round(x.corr(y, method=\"spearman\"), 2)\nprint(rho)",
      pistas: ["`x.corr(y, method=\"spearman\")`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 1.0) <= 0.005
        return { ok, mensaje: ok ? "Correcto: el orden se conserva perfectamente, Spearman = 1." : "El resultado esperado es 1.0." }
      },
    },
    reto: {
      id: "m24-l4-reto",
      enunciado: "Imprime en dos líneas la correlación de **Pearson** y luego la de **Spearman** (ambas redondeadas a 2 decimales) para ver cómo un valor extremo afecta a cada una.",
      codigoInicial: "import pandas as pd\n\nx = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])\ny = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 100])\n\npearson = round(x.corr(y), 2)\nprint(pearson)\nprint(pearson)    # la segunda línea debe ser Spearman",
      solucion: "import pandas as pd\n\nx = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])\ny = pd.Series([1, 2, 3, 4, 5, 6, 7, 8, 9, 100])\n\nprint(round(x.corr(y), 2))\nprint(round(x.corr(y, method=\"spearman\"), 2))",
      pistas: ["La segunda línea usa `method=\"spearman\"`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"0.59\",\"1.0\"]"
        return { ok, mensaje: ok ? "Correcto: Pearson cae a 0.59, Spearman sigue en 1.0." : "Se esperaba 0.59 y luego 1.0." }
      },
    },
    verificacion: [
      {
        id: "m24-l4-q1",
        pregunta: "¿Cuándo conviene Spearman sobre Pearson?",
        opciones: ["Cuando hay valores extremos o una relación creciente que no es una recta", "Cuando las variables son categóricas nominales", "Cuando hay menos de 3 datos", "Nunca"],
        respuestaCorrecta: 0,
        explicacion: "Spearman usa rangos: resiste extremos y capta relaciones monótonas.",
      },
      {
        id: "m24-l4-q2",
        pregunta: "Las ventas de helados y los ahogamientos están correlacionados. La mejor explicación es:",
        opciones: ["Los helados causan ahogamientos", "Una variable confusora (el calor) influye en ambas", "Los ahogamientos causan ventas de helados", "Es un error de datos"],
        respuestaCorrecta: 1,
        explicacion: "La temperatura afecta a las dos variables: es una tercera variable confusora.",
      },
    ],
    resumen: ["Spearman correlaciona los rangos: resiste atípicos y capta relaciones monótonas.", "Correlación no es causalidad: puede haber causa inversa, confusores o coincidencia.", "Siempre grafica las variables antes de interpretar un coeficiente."],
    proximoPaso: "Cerramos el módulo con variables categóricas: tablas de contingencia.",
    conceptos: ["correlacion-spearman", "correlacion-no-causalidad"],
  },
  {
    id: "m24-l5",
    moduloId: "modulo-24",
    titulo: "Tablas de contingencia: relacionar dos variables categóricas",
    objetivo: "Construir tablas de contingencia con pd.crosstab y leer proporciones por fila para comparar grupos.",
    porQueImporta:
      "Muchas preguntas de negocio cruzan dos categorías: plan contratado y abandono, canal y compra, región y producto. La tabla de contingencia es la herramienta básica para responderlas.",
    concepto: "Una **tabla de contingencia** (o tabla cruzada) cuenta cuántos registros hay en cada combinación de dos variables categóricas.\n\n```python\npd.crosstab(df[\"plan\"], df[\"abandono\"])                       # conteos\npd.crosstab(df[\"plan\"], df[\"abandono\"], normalize=\"index\")    # proporción dentro de cada fila\npd.crosstab(df[\"plan\"], df[\"abandono\"], margins=True)         # añade totales\n```\n\nPara **comparar grupos de distinto tamaño** usa proporciones por fila (`normalize=\"index\"`): cada fila suma 1 y puedes leer «de los clientes del plan básico, qué porcentaje abandonó».",
    ejemploMinimo: "import pandas as pd\n\ndf = pd.DataFrame({\"plan\": [\"A\", \"A\", \"B\", \"B\", \"B\"], \"abandono\": [\"si\", \"no\", \"no\", \"no\", \"si\"]})\nprint(pd.crosstab(df[\"plan\"], df[\"abandono\"]))",
    ejemploAplicado: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"plan\": [\"basico\"] * 6 + [\"premium\"] * 4,\n    \"abandono\": [\"si\", \"si\", \"no\", \"si\", \"no\", \"no\", \"no\", \"no\", \"si\", \"no\"],\n})\n\nprint(pd.crosstab(df[\"plan\"], df[\"abandono\"]))\nprint(pd.crosstab(df[\"plan\"], df[\"abandono\"], normalize=\"index\").round(2))",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ndf = pd.DataFrame({\"plan\": [\"basico\"] * 6 + [\"premium\"] * 4, \"abandono\": [\"si\"] * 3 + [\"no\"] * 3 + [\"si\"] + [\"no\"] * 3})\nprint(pd.crosstab(df[\"plan\"], df[\"abandono\"]))",
      explicacion:
        "Comparar solo los conteos engaña cuando los grupos tienen tamaños distintos (6 clientes frente a 4). Lo justo es comparar **proporciones dentro de cada grupo** con `normalize=\"index\"`: 50 % frente a 25 %.",
    },
    practicaGuiada: {
      id: "m24-l5-practica",
      enunciado: "Construye la tabla de contingencia de `plan` y `abandono` con `pd.crosstab` e imprime cuántos clientes del plan `premium` abandonaron (`\"si\"`).",
      codigoInicial: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"plan\": [\"basico\"] * 6 + [\"premium\"] * 4,\n    \"abandono\": [\"si\", \"si\", \"no\", \"si\", \"no\", \"no\", \"no\", \"no\", \"si\", \"no\"],\n})\n\ntabla = None\nprint(0)",
      solucion: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"plan\": [\"basico\"] * 6 + [\"premium\"] * 4,\n    \"abandono\": [\"si\", \"si\", \"no\", \"si\", \"no\", \"no\", \"no\", \"no\", \"si\", \"no\"],\n})\n\ntabla = pd.crosstab(df[\"plan\"], df[\"abandono\"])\nprint(tabla.loc[\"premium\", \"si\"])",
      pistas: ["`pd.crosstab(df[\"plan\"], df[\"abandono\"])`", "Selecciona la celda con `tabla.loc[\"premium\", \"si\"]`."],
      validar: (stdout) => {
        const ok = stdout.trim() === "1"
        return { ok, mensaje: ok ? "Correcto: 1 cliente premium abandonó." : "El resultado esperado es 1." }
      },
    },
    reto: {
      id: "m24-l5-reto",
      enunciado: "Calcula la **proporción de abandono del plan básico** usando `normalize=\"index\"` e imprímela redondeada a 2 decimales.",
      codigoInicial: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"plan\": [\"basico\"] * 6 + [\"premium\"] * 4,\n    \"abandono\": [\"si\", \"si\", \"no\", \"si\", \"no\", \"no\", \"no\", \"no\", \"si\", \"no\"],\n})\n\ntabla = pd.crosstab(df[\"plan\"], df[\"abandono\"])      # faltan las proporciones por fila\nprint(tabla.loc[\"basico\", \"si\"])",
      solucion: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"plan\": [\"basico\"] * 6 + [\"premium\"] * 4,\n    \"abandono\": [\"si\", \"si\", \"no\", \"si\", \"no\", \"no\", \"no\", \"no\", \"si\", \"no\"],\n})\n\ntabla = pd.crosstab(df[\"plan\"], df[\"abandono\"], normalize=\"index\")\nprint(round(tabla.loc[\"basico\", \"si\"], 2))",
      pistas: ["Añade `normalize=\"index\"` a `pd.crosstab`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.5) <= 0.005
        return { ok, mensaje: ok ? "Correcto: la mitad de los clientes del plan básico abandonó." : "El resultado esperado es 0.5." }
      },
    },
    verificacion: [
      {
        id: "m24-l5-q1",
        pregunta: "¿Qué hace `normalize=\"index\"` en `pd.crosstab`?",
        opciones: ["Convierte los conteos en proporciones dentro de cada fila", "Ordena la tabla", "Elimina las filas vacías", "Calcula la correlación"],
        respuestaCorrecta: 0,
        explicacion: "Cada fila pasa a sumar 1, lo que facilita comparar grupos de distinto tamaño.",
      },
      {
        id: "m24-l5-q2",
        pregunta: "Para comparar la tasa de abandono entre un grupo de 600 y otro de 40 clientes conviene mirar:",
        opciones: ["Los conteos absolutos", "Las proporciones dentro de cada grupo", "El total", "Solo el grupo grande"],
        respuestaCorrecta: 1,
        explicacion: "Los conteos dependen del tamaño del grupo; las proporciones son comparables.",
      },
    ],
    resumen: ["`pd.crosstab` cuenta combinaciones de dos categorías.", "`normalize=\"index\"` da proporciones por fila.", "Compara grupos con proporciones, no con conteos absolutos."],
    proximoPaso: "Cerramos el curso con un proyecto que integra todo lo aprendido.",
    conceptos: ["tabla-de-contingencia", "comparar-proporciones"],
  },
]
