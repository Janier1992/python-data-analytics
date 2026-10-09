import type { Lesson } from '../../types'

export const module23Lessons: Lesson[] = [
  {
    id: "m23-l1",
    moduloId: "modulo-23",
    titulo: "Rango, varianza y desviación estándar",
    objetivo: "Medir la dispersión de una variable con el rango, la varianza y la desviación estándar, y distinguir la versión poblacional de la muestral.",
    porQueImporta:
      "Dos grupos pueden tener la misma media y ser completamente distintos: uno muy homogéneo y otro muy variable. La dispersión es la mitad de la historia que la media no cuenta.",
    concepto: "- **Rango**: máximo menos mínimo. Es simple, pero depende solo de dos valores.\n- **Varianza**: promedio de los cuadrados de las desviaciones respecto a la media.\n- **Desviación estándar**: la raíz cuadrada de la varianza. Tiene las mismas unidades que los datos, así que es la más fácil de interpretar.\n\n```python\nserie.max() - serie.min()   # rango\nserie.var()                 # varianza muestral (divide entre n - 1)\nserie.std()                 # desviación estándar muestral\nserie.std(ddof=0)           # desviación estándar poblacional (divide entre n)\n```\n\n**Muestral o poblacional**: si tus datos son una **muestra**, divide entre `n - 1` (el valor por defecto de pandas, `ddof=1`). Si tienes la **población completa**, divide entre `n` (`ddof=0`). NumPy hace lo contrario por defecto: `np.std` usa `ddof=0`.",
    ejemploMinimo: "import pandas as pd\n\na = pd.Series([48, 50, 52])\nb = pd.Series([10, 50, 90])\nprint(a.mean(), b.mean())\nprint(a.std(), b.std())",
    ejemploAplicado: "import pandas as pd\n\nturno_a = pd.Series([30, 31, 29, 30, 30])\nturno_b = pd.Series([20, 40, 25, 35, 30])\n\nfor nombre, t in [(\"A\", turno_a), (\"B\", turno_b)]:\n    print(nombre, \"media\", t.mean(), \"rango\", t.max() - t.min(), \"desv.\", round(t.std(), 2))",
    errorFrecuente: {
      codigo: "import numpy as np\nimport pandas as pd\n\ndatos = [2, 4, 4, 4, 5, 5, 7, 9]\nprint(np.std(datos), pd.Series(datos).std())",
      explicacion:
        "Los dos resultados difieren (2.0 frente a 2.14) porque NumPy divide entre `n` por defecto (`ddof=0`) y pandas entre `n - 1` (`ddof=1`). No es un error: son dos fórmulas distintas. Define siempre cuál necesitas, según si tus datos son la población o una muestra.",
    },
    practicaGuiada: {
      id: "m23-l1-practica",
      enunciado: "Calcula el **rango** de `temperaturas` (máximo menos mínimo) e imprímelo.",
      codigoInicial: "import pandas as pd\n\ntemperaturas = pd.Series([18, 22, 25, 19, 30, 24])\n\nrango = 0\nprint(rango)",
      solucion: "import pandas as pd\n\ntemperaturas = pd.Series([18, 22, 25, 19, 30, 24])\n\nrango = temperaturas.max() - temperaturas.min()\nprint(rango)",
      pistas: ["Usa `.max()` y `.min()`."],
      validar: (stdout) => {
        const ok = stdout.trim() === "12"
        return { ok, mensaje: ok ? "Correcto: 30 - 18 = 12." : "El resultado esperado es 12." }
      },
    },
    reto: {
      id: "m23-l1-reto",
      enunciado: "`datos` representa a **toda la población** (no una muestra). Calcula su desviación estándar poblacional con `ddof=0` e imprímela redondeada a 2 decimales.",
      codigoInicial: "import pandas as pd\n\ndatos = pd.Series([2, 4, 4, 4, 5, 5, 7, 9])\n\ndesviacion = datos.std()      # por defecto es la versión muestral\nprint(round(desviacion, 2))",
      solucion: "import pandas as pd\n\ndatos = pd.Series([2, 4, 4, 4, 5, 5, 7, 9])\n\ndesviacion = datos.std(ddof=0)\nprint(round(desviacion, 2))",
      pistas: ["`datos.std(ddof=0)` divide entre n en vez de n - 1."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 2.0) <= 0.005
        return { ok, mensaje: ok ? "Correcto: la desviación poblacional es 2.0." : "El resultado esperado es 2.0." }
      },
    },
    verificacion: [
      {
        id: "m23-l1-q1",
        pregunta: "¿Por qué se prefiere la desviación estándar a la varianza para interpretar?",
        opciones: ["Porque es siempre menor", "Porque está en las mismas unidades que los datos", "Porque no usa la media", "Porque es más fácil de calcular a mano"],
        respuestaCorrecta: 1,
        explicacion: "La varianza está en unidades al cuadrado; la raíz devuelve las unidades originales.",
      },
      {
        id: "m23-l1-q2",
        pregunta: "Tienes los datos de TODOS los empleados de una empresa de 40 personas. ¿Qué `ddof` corresponde?",
        opciones: ["ddof=1", "ddof=0", "ddof=2", "Da igual"],
        respuestaCorrecta: 1,
        explicacion: "Es la población completa, no una muestra, así que se divide entre n (ddof=0).",
      },
    ],
    resumen: ["El rango usa solo extremos; varianza y desviación usan todos los datos.", "La desviación estándar tiene las unidades de los datos.", "Pandas usa `ddof=1` (muestral) y NumPy `ddof=0` (poblacional) por defecto."],
    proximoPaso: "Compararemos la dispersión de variables con unidades distintas usando el coeficiente de variación.",
    conceptos: ["rango", "varianza", "desviacion-estandar"],
  },
  {
    id: "m23-l2",
    moduloId: "modulo-23",
    titulo: "Coeficiente de variación: comparar dispersiones",
    objetivo: "Calcular el coeficiente de variación para comparar la variabilidad relativa de variables con distinta escala o unidades.",
    porQueImporta:
      "Una desviación de 5 kg y una de 5 mm no son comparables. El coeficiente de variación convierte la dispersión en un porcentaje de la media, y así permite comparar peras con manzanas.",
    concepto: "El **coeficiente de variación** (CV) expresa la desviación estándar como proporción de la media:\n\n```\nCV = desviación estándar / media\n```\n\nSe suele leer en porcentaje. Un CV bajo indica datos homogéneos; uno alto, datos muy variables respecto a su nivel.\n\n```python\ncv = serie.std() / serie.mean()\nprint(f\"{cv:.1%}\")\n```\n\nÚsalo solo con variables de **razón** (cero real) y con media distinta de cero o cercana a cero: si la media es casi 0, el CV se dispara sin sentido.",
    ejemploMinimo: "import pandas as pd\n\nedades = pd.Series([30, 32, 28, 31])\nprint(round(edades.std() / edades.mean(), 3))",
    ejemploAplicado: "import pandas as pd\n\nestaturas_cm = pd.Series([165, 170, 175, 168, 172])\npesos_kg = pd.Series([60, 72, 85, 64, 78])\n\nfor nombre, s in [(\"estatura\", estaturas_cm), (\"peso\", pesos_kg)]:\n    print(nombre, \"CV =\", f\"{s.std() / s.mean():.1%}\")",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ntemperaturas_c = pd.Series([-2, 1, -1, 2, 0])\nprint(temperaturas_c.std() / temperaturas_c.mean())",
      explicacion:
        "La media de la temperatura es 0, así que el CV tiende a infinito o a un valor sin sentido. Además los °C son una escala de intervalo (cero arbitrario). El CV solo es válido con variables de razón y media claramente distinta de cero.",
    },
    practicaGuiada: {
      id: "m23-l2-practica",
      enunciado: "Calcula el coeficiente de variación de `ventas` (`std() / mean()`) e imprímelo redondeado a 3 decimales.",
      codigoInicial: "import pandas as pd\n\nventas = pd.Series([100, 120, 90, 110, 80])\n\ncv = 0\nprint(cv)",
      solucion: "import pandas as pd\n\nventas = pd.Series([100, 120, 90, 110, 80])\n\ncv = round(ventas.std() / ventas.mean(), 3)\nprint(cv)",
      pistas: ["Divide `ventas.std()` entre `ventas.mean()`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.158) <= 0.001
        return { ok, mensaje: ok ? "Correcto: el CV es 15.8 %." : "El resultado esperado es 0.158." }
      },
    },
    reto: {
      id: "m23-l2-reto",
      enunciado: "Dos variables con unidades distintas. Calcula el CV de cada una e imprime el **nombre de la más variable** (`\"estatura\"` o `\"peso\"`).",
      codigoInicial: "import pandas as pd\n\nestatura_cm = pd.Series([165, 170, 175, 168, 172])\npeso_kg = pd.Series([60, 72, 85, 64, 78])\n\n# compara la dispersión relativa y muestra el nombre de la más variable\nprint(\"estatura\")",
      solucion: "import pandas as pd\n\nestatura_cm = pd.Series([165, 170, 175, 168, 172])\npeso_kg = pd.Series([60, 72, 85, 64, 78])\n\ncv_estatura = estatura_cm.std() / estatura_cm.mean()\ncv_peso = peso_kg.std() / peso_kg.mean()\nprint(\"estatura\" if cv_estatura > cv_peso else \"peso\")",
      pistas: ["Calcula `std() / mean()` para cada serie.", "Compara los dos resultados con un `if` o una expresión condicional."],
      validar: (stdout) => {
        const ok = stdout.trim() === "peso"
        return { ok, mensaje: ok ? "Correcto: el peso varía más en términos relativos." : "El resultado esperado es peso." }
      },
    },
    verificacion: [
      {
        id: "m23-l2-q1",
        pregunta: "¿Qué mide el coeficiente de variación?",
        opciones: ["La media dividida entre la mediana", "La desviación estándar como proporción de la media", "El rango dividido entre dos", "La correlación"],
        respuestaCorrecta: 1,
        explicacion: "CV = desviación estándar / media: dispersión relativa.",
      },
      {
        id: "m23-l2-q2",
        pregunta: "¿Cuándo NO es adecuado el coeficiente de variación?",
        opciones: ["Cuando la variable es de razón", "Cuando la media es cercana a cero", "Cuando hay más de 30 datos", "Cuando los datos son positivos"],
        respuestaCorrecta: 1,
        explicacion: "Dividir entre una media casi nula hace que el CV se dispare y pierda sentido.",
      },
    ],
    resumen: ["CV = desviación estándar / media.", "Permite comparar variabilidad entre variables con distintas unidades.", "Solo es válido con variables de razón y media lejos de cero."],
    proximoPaso: "Ahora describiremos la posición de un dato con cuantiles y percentiles.",
    conceptos: ["coeficiente-de-variacion"],
  },
  {
    id: "m23-l3",
    moduloId: "modulo-23",
    titulo: "Cuantiles, percentiles y rango intercuartílico",
    objetivo: "Calcular cuartiles y percentiles con quantile y resumir la dispersión central con el rango intercuartílico (IQR).",
    porQueImporta:
      "Los percentiles responden preguntas muy concretas: «¿qué tan bueno es este resultado frente al resto?». El IQR resume la dispersión sin dejarse engañar por los extremos.",
    concepto: "Los **cuantiles** dividen los datos ordenados en partes con igual cantidad de observaciones:\n\n- **Cuartiles**: Q1 (25 %), Q2 (50 %, la mediana) y Q3 (75 %).\n- **Percentil p**: el valor por debajo del cual está el p % de los datos.\n- **IQR** (rango intercuartílico): `Q3 - Q1`. Contiene al 50 % central.\n\n```python\nserie.quantile(0.25)             # Q1\nserie.quantile([0.25, 0.5, 0.75])\nserie.quantile(0.90)             # percentil 90\nserie.describe()                 # count, mean, std, min, 25%, 50%, 75%, max\n```\n\nA diferencia del rango y la desviación, el IQR es **resistente** a valores extremos.",
    ejemploMinimo: "import pandas as pd\n\nnotas = pd.Series([2.0, 3.0, 3.5, 4.0, 4.5, 5.0])\nprint(notas.quantile([0.25, 0.5, 0.75]))",
    ejemploAplicado: "import pandas as pd\n\ntiempos = pd.Series([12, 15, 11, 18, 14, 13, 16, 40, 12, 15])\nq1, q3 = tiempos.quantile(0.25), tiempos.quantile(0.75)\n\nprint(\"Q1:\", q1, \" Q3:\", q3, \" IQR:\", q3 - q1)\nprint(\"Percentil 90:\", tiempos.quantile(0.90))",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ndatos = pd.Series([1, 2, 3, 4, 5])\nprint(datos.quantile(25))",
      explicacion:
        "`quantile` espera una **fracción** entre 0 y 1, no un porcentaje. `quantile(25)` lanza un error (`percentiles should all be in the interval [0, 1]`). Para el percentil 25 se escribe `quantile(0.25)`.",
    },
    practicaGuiada: {
      id: "m23-l3-practica",
      enunciado: "Imprime el **percentil 90** de `puntajes` con `quantile`.",
      codigoInicial: "import pandas as pd\n\npuntajes = pd.Series([55, 60, 65, 70, 75, 80, 85, 90, 95, 100])\n\np90 = 0\nprint(p90)",
      solucion: "import pandas as pd\n\npuntajes = pd.Series([55, 60, 65, 70, 75, 80, 85, 90, 95, 100])\n\np90 = puntajes.quantile(0.90)\nprint(p90)",
      pistas: ["El percentil 90 es `quantile(0.90)`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 95.5) <= 0.01
        return { ok, mensaje: ok ? "Correcto: el 90 % de los puntajes está por debajo de 95.5." : "El resultado esperado es 95.5." }
      },
    },
    reto: {
      id: "m23-l3-reto",
      enunciado: "Calcula el **IQR** (`Q3 - Q1`) de `salarios` e imprímelo.",
      codigoInicial: "import pandas as pd\n\nsalarios = pd.Series([2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4])\n\niqr = 0\nprint(iqr)",
      solucion: "import pandas as pd\n\nsalarios = pd.Series([2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4])\n\niqr = round(salarios.quantile(0.75) - salarios.quantile(0.25), 2)\nprint(iqr)",
      pistas: ["Resta `quantile(0.25)` a `quantile(0.75)`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.7) <= 0.01
        return { ok, mensaje: ok ? "Correcto: el 50 % central abarca 0.7." : "El resultado esperado es 0.7." }
      },
    },
    verificacion: [
      {
        id: "m23-l3-q1",
        pregunta: "El segundo cuartil (Q2) coincide con:",
        opciones: ["La media", "La moda", "La mediana", "El rango"],
        respuestaCorrecta: 2,
        explicacion: "Q2 deja el 50 % de los datos por debajo: es la mediana.",
      },
      {
        id: "m23-l3-q2",
        pregunta: "¿Qué porcentaje de los datos contiene el IQR?",
        opciones: ["25 %", "50 %", "75 %", "100 %"],
        respuestaCorrecta: 1,
        explicacion: "Va de Q1 a Q3: contiene el 50 % central.",
      },
    ],
    resumen: ["Los cuartiles dividen los datos en cuatro partes iguales.", "`quantile` recibe fracciones entre 0 y 1.", "El IQR (Q3 - Q1) resume la dispersión central y resiste a extremos."],
    proximoPaso: "Veremos cómo estandarizar valores con puntuaciones z.",
    conceptos: ["cuantiles", "percentiles", "iqr"],
  },
  {
    id: "m23-l4",
    moduloId: "modulo-23",
    titulo: "Puntuaciones z: medir qué tan lejos está un dato",
    objetivo: "Estandarizar valores con puntuaciones z para compararlos entre distribuciones distintas.",
    porQueImporta:
      "¿Quién destacó más: quien sacó 85 en un examen difícil o quien sacó 92 en uno fácil? La puntuación z responde ubicando cada resultado respecto a su propio grupo.",
    concepto: "La **puntuación z** indica a cuántas desviaciones estándar está un valor de la media:\n\n```\nz = (valor - media) / desviación estándar\n```\n\n- `z = 0`: el valor está justo en la media.\n- `z = +2`: dos desviaciones por encima (es un valor alto).\n- `z = -1`: una desviación por debajo.\n\nComo no tiene unidades, permite comparar variables distintas. Por convención, valores con `|z| > 3` se consideran muy poco comunes.\n\n```python\nz = (serie - serie.mean()) / serie.std()\n```",
    ejemploMinimo: "import pandas as pd\n\nnotas = pd.Series([60, 70, 80, 90, 100])\nz = (notas - notas.mean()) / notas.std()\nprint(z.round(2).tolist())",
    ejemploAplicado: "import pandas as pd\n\nexamen_dificil = pd.Series([50, 55, 60, 65, 85])\nexamen_facil = pd.Series([80, 85, 88, 90, 92])\n\nz1 = (85 - examen_dificil.mean()) / examen_dificil.std()\nz2 = (92 - examen_facil.mean()) / examen_facil.std()\nprint(\"z del 85:\", round(z1, 2))\nprint(\"z del 92:\", round(z2, 2))",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ndatos = pd.Series([10, 12, 14, 16, 18])\nz = (datos - datos.mean())\nprint(z.tolist())",
      explicacion:
        "Restar la media solo **centra** los datos; falta dividir entre la desviación estándar para que el resultado esté en «desviaciones estándar». Sin ese paso no es una puntuación z y no se puede comparar entre variables.",
    },
    practicaGuiada: {
      id: "m23-l4-practica",
      enunciado: "Calcula la puntuación z de un valor `x = 85` respecto a `grupo` e imprímela redondeada a 2 decimales.",
      codigoInicial: "import pandas as pd\n\ngrupo = pd.Series([50, 55, 60, 65, 85])\nx = 85\n\nz = 0\nprint(z)",
      solucion: "import pandas as pd\n\ngrupo = pd.Series([50, 55, 60, 65, 85])\nx = 85\n\nz = round((x - grupo.mean()) / grupo.std(), 2)\nprint(z)",
      pistas: ["`(x - grupo.mean()) / grupo.std()`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 1.63) <= 0.01
        return { ok, mensaje: ok ? "Correcto: el 85 está 1.63 desviaciones por encima de la media." : "El resultado esperado es 1.63." }
      },
    },
    reto: {
      id: "m23-l4-reto",
      enunciado: "Dos estudiantes: Ana sacó 85 en el examen difícil y Luis 92 en el fácil. Calcula el z de cada uno e imprime el nombre de quien tuvo el **mejor desempeño relativo**.",
      codigoInicial: "import pandas as pd\n\ndificil = pd.Series([50, 55, 60, 65, 85])\nfacil = pd.Series([80, 85, 88, 90, 92])\n\n# calcula los z de Ana (85 en dificil) y Luis (92 en facil)\nprint(\"Luis\")",
      solucion: "import pandas as pd\n\ndificil = pd.Series([50, 55, 60, 65, 85])\nfacil = pd.Series([80, 85, 88, 90, 92])\n\nz_ana = (85 - dificil.mean()) / dificil.std()\nz_luis = (92 - facil.mean()) / facil.std()\nprint(\"Ana\" if z_ana > z_luis else \"Luis\")",
      pistas: ["Calcula `(valor - media) / std` para cada estudiante con su propio grupo.", "Gana quien tenga el z más alto."],
      validar: (stdout) => {
        const ok = stdout.trim() === "Ana"
        return { ok, mensaje: ok ? "Correcto: Ana destacó más respecto a su grupo." : "El resultado esperado es Ana." }
      },
    },
    verificacion: [
      {
        id: "m23-l4-q1",
        pregunta: "Un valor con z = -2 significa que está:",
        opciones: ["2 unidades por encima de la media", "2 desviaciones estándar por debajo de la media", "En la media", "En el percentil 2"],
        respuestaCorrecta: 1,
        explicacion: "El signo indica dirección y el número, cuántas desviaciones estándar.",
      },
      {
        id: "m23-l4-q2",
        pregunta: "¿Por qué sirve el z para comparar variables distintas?",
        opciones: ["Porque no tiene unidades", "Porque siempre es positivo", "Porque usa la mediana", "Porque elimina los outliers"],
        respuestaCorrecta: 0,
        explicacion: "Al dividir entre la desviación estándar las unidades se cancelan.",
      },
    ],
    resumen: ["z = (valor - media) / desviación estándar.", "Indica cuántas desviaciones se aleja un dato de su media.", "Permite comparar resultados de distribuciones diferentes."],
    proximoPaso: "Usaremos la regla del IQR y los boxplots para detectar valores atípicos.",
    conceptos: ["puntuacion-z", "estandarizacion"],
  },
  {
    id: "m23-l5",
    moduloId: "modulo-23",
    titulo: "Valores atípicos: regla del IQR y boxplot",
    objetivo: "Detectar valores atípicos con la regla del IQR y decidir qué hacer con ellos.",
    porQueImporta:
      "Un solo dato extraño puede arruinar una media o una conclusión. Detectarlo es fácil; lo difícil (y lo importante) es decidir si es un error, un caso real o información valiosa.",
    concepto: "La regla más usada define los límites con el IQR:\n\n```\nlímite inferior = Q1 - 1.5 × IQR\nlímite superior = Q3 + 1.5 × IQR\n```\n\nTodo valor fuera de esos límites es un **posible atípico** (es la misma regla que dibuja los puntos sueltos en un boxplot).\n\n```python\nq1, q3 = serie.quantile(0.25), serie.quantile(0.75)\niqr = q3 - q1\natipicos = serie[(serie < q1 - 1.5 * iqr) | (serie > q3 + 1.5 * iqr)]\n```\n\n**Un atípico no es automáticamente un error.** Antes de eliminarlo pregúntate: ¿es un error de captura?, ¿es un caso real pero excepcional?, ¿es justo lo que busco (un fraude)? Documenta siempre lo que decidas.",
    ejemploMinimo: "import pandas as pd\n\ndatos = pd.Series([10, 12, 11, 13, 12, 90])\nq1, q3 = datos.quantile(0.25), datos.quantile(0.75)\nprint(q3 + 1.5 * (q3 - q1))",
    ejemploAplicado: "import pandas as pd\n\nventas = pd.Series([100, 110, 95, 105, 102, 98, 500])\nq1, q3 = ventas.quantile(0.25), ventas.quantile(0.75)\niqr = q3 - q1\n\natipicos = ventas[(ventas < q1 - 1.5 * iqr) | (ventas > q3 + 1.5 * iqr)]\nprint(\"Atípicos:\", atipicos.tolist())\nprint(\"Media con atípico:\", round(ventas.mean(), 1))\nprint(\"Media sin atípico:\", round(ventas.drop(atipicos.index).mean(), 1))",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ndatos = pd.Series([10, 12, 11, 13, 12, 90])\nsin_atipicos = datos[datos < 50]\nprint(sin_atipicos.tolist())",
      explicacion:
        "Usar un límite arbitrario (50) no es un criterio estadístico: depende de tu intuición y no se puede justificar ni reproducir con otros datos. Calcula los límites con el IQR y documenta por qué eliminas (o conservas) cada atípico.",
    },
    practicaGuiada: {
      id: "m23-l5-practica",
      enunciado: "Calcula el **límite superior** `Q3 + 1.5 × IQR` de `datos` e imprímelo.",
      codigoInicial: "import pandas as pd\n\ndatos = pd.Series([10, 12, 11, 13, 12, 14, 11, 90])\n\nlimite_superior = 0\nprint(limite_superior)",
      solucion: "import pandas as pd\n\ndatos = pd.Series([10, 12, 11, 13, 12, 14, 11, 90])\n\nq1, q3 = datos.quantile(0.25), datos.quantile(0.75)\nlimite_superior = q3 + 1.5 * (q3 - q1)\nprint(limite_superior)",
      pistas: ["Calcula Q1 y Q3 con `quantile` y luego `Q3 + 1.5 * (Q3 - Q1)`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 16.625) <= 0.01
        return { ok, mensaje: ok ? "Correcto: todo lo que supere 16.625 es atípico." : "El resultado esperado es 16.625." }
      },
    },
    reto: {
      id: "m23-l5-reto",
      enunciado: "Imprime la lista de valores atípicos de `precios` (los que están **fuera** de los dos límites del IQR) con `.tolist()`.",
      codigoInicial: "import pandas as pd\n\nprecios = pd.Series([20, 22, 21, 23, 22, 21, 22, 60, 2])\n\natipicos = precios[precios > 1000]      # reemplaza este filtro por la regla del IQR\nprint(atipicos.tolist())",
      solucion: "import pandas as pd\n\nprecios = pd.Series([20, 22, 21, 23, 22, 21, 22, 60, 2])\n\nq1, q3 = precios.quantile(0.25), precios.quantile(0.75)\niqr = q3 - q1\natipicos = precios[(precios < q1 - 1.5 * iqr) | (precios > q3 + 1.5 * iqr)]\nprint(atipicos.tolist())",
      pistas: ["Necesitas los dos límites: inferior y superior.", "Combina las dos condiciones con `|`, cada una entre paréntesis."],
      validar: (stdout) => {
        const ok = stdout.trim() === "[60, 2]"
        return { ok, mensaje: ok ? "Correcto: 60 y 2 quedan fuera de los límites." : "El resultado esperado es [60, 2]." }
      },
    },
    verificacion: [
      {
        id: "m23-l5-q1",
        pregunta: "Según la regla del IQR, un valor es atípico si está fuera de:",
        opciones: ["Media ± 1 desviación", "Q1 - 1.5·IQR y Q3 + 1.5·IQR", "El rango", "Mediana ± 10"],
        respuestaCorrecta: 1,
        explicacion: "Esos son los límites estándar de los boxplots.",
      },
      {
        id: "m23-l5-q2",
        pregunta: "Encuentras un valor atípico en tus datos de ventas. Lo correcto es:",
        opciones: ["Eliminarlo siempre", "Dejarlo siempre", "Investigar si es un error o un caso real antes de decidir", "Reemplazarlo por la media sin mirar"],
        respuestaCorrecta: 2,
        explicacion: "Un atípico puede ser un error o información valiosa; hay que investigarlo y documentar la decisión.",
      },
    ],
    resumen: ["Límites: Q1 - 1.5·IQR y Q3 + 1.5·IQR.", "Un atípico es un candidato a revisar, no un error automático.", "Documenta siempre qué haces con los atípicos y por qué."],
    proximoPaso: "En el siguiente módulo estudiaremos la forma de la distribución y la relación entre variables.",
    conceptos: ["valores-atipicos", "regla-iqr"],
  },
]
