import type { Lesson } from '../../types'

export const module22Lessons: Lesson[] = [
  {
    id: "m22-l1",
    moduloId: "modulo-22",
    titulo: "Población, muestra y tipos de variables",
    objetivo: "Distinguir población de muestra y clasificar una variable como cualitativa o cuantitativa, discreta o continua.",
    porQueImporta:
      "Todo análisis empieza por saber qué datos tienes y de dónde vienen. Si confundes una muestra con la población, o tratas una etiqueta como si fuera una cantidad, todos los números que calcules después serán engañosos.",
    concepto: "- **Población**: el conjunto completo de individuos que te interesa estudiar (todos los clientes de una empresa).\n- **Muestra**: un subconjunto de la población que sí puedes observar. Casi siempre trabajamos con muestras.\n- **Variable**: una característica que se mide en cada individuo (edad, ciudad, ingreso).\n\nLas variables se clasifican así:\n\n| Tipo | Subtipo | Ejemplos |\n|---|---|---|\n| **Cualitativa** (categorías) | Nominal / ordinal | ciudad, color, nivel educativo |\n| **Cuantitativa** (números con sentido) | Discreta (se cuenta) | número de hijos, productos comprados |\n| | Continua (se mide) | estatura, ingreso, temperatura |\n\nUn número no siempre es una cantidad: un **código postal** o un **número de cédula** son etiquetas. Sumarlos o promediarlos no tiene sentido.\n\n```python\ndf.dtypes                             # tipo de dato de cada columna\ndf.select_dtypes(include=\"number\")    # solo las columnas numéricas\ndf[\"codigo\"] = df[\"codigo\"].astype(str)   # tratarla como etiqueta\n```",
    ejemploMinimo: "import pandas as pd\n\ndf = pd.DataFrame({\"edad\": [23, 31, 45], \"ciudad\": [\"Cali\", \"Bogotá\", \"Cali\"]})\nprint(df.dtypes)",
    ejemploAplicado: "import pandas as pd\n\npoblacion = pd.Series([20, 22, 25, 27, 30, 32, 35, 38, 40, 41])\nmuestra = poblacion.iloc[::3]          # una de cada tres personas\n\nprint(\"Media de la población:\", poblacion.mean())\nprint(\"Media de la muestra:\", round(muestra.mean(), 2))",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ncodigos = pd.Series([110111, 760001, 110111, 50001])\nprint(\"Código postal promedio:\", codigos.mean())",
      explicacion:
        "El código postal es una **etiqueta**, no una cantidad: su promedio (por ejemplo 257 K) no corresponde a ningún lugar real. Aunque pandas lo guarde como número, conceptualmente es una variable cualitativa. Conviértela con `.astype(str)` para no operar con ella por accidente.",
    },
    practicaGuiada: {
      id: "m22-l1-practica",
      enunciado: "Calcula la media de `poblacion` y la de `muestra`, e imprime la diferencia absoluta entre ambas redondeada a 1 decimal. Esa diferencia es el **error de muestreo**.",
      codigoInicial: "import pandas as pd\n\npoblacion = pd.Series([20, 22, 25, 27, 30, 32, 35, 38, 40, 41])\nmuestra = pd.Series([22, 30, 38, 40])\n\ndiferencia = 0\nprint(diferencia)",
      solucion: "import pandas as pd\n\npoblacion = pd.Series([20, 22, 25, 27, 30, 32, 35, 38, 40, 41])\nmuestra = pd.Series([22, 30, 38, 40])\n\ndiferencia = round(abs(muestra.mean() - poblacion.mean()), 1)\nprint(diferencia)",
      pistas: ["Usa `.mean()` en ambas series.", "La diferencia absoluta es `abs(a - b)`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 1.5) <= 0.05
        return { ok, mensaje: ok ? "Correcto: la muestra se desvía 1.5 de la población." : "El resultado esperado es 1.5 (media muestral 32.5 frente a media poblacional 31.0)." }
      },
    },
    reto: {
      id: "m22-l1-reto",
      enunciado: "El DataFrame tiene cuatro columnas, pero `codigo_postal` es una etiqueta. Conviértela a texto con `.astype(str)` y luego imprime cuántas columnas son realmente numéricas con `select_dtypes`.",
      codigoInicial: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"edad\": [23, 31, 45, 52],\n    \"ciudad\": [\"Cali\", \"Bogotá\", \"Cali\", \"Medellín\"],\n    \"codigo_postal\": [760001, 110111, 760001, 50001],\n    \"ingreso\": [2.1, 3.4, 2.8, 4.0],\n})\n\n# convierte codigo_postal a texto (es una etiqueta, no una cantidad)\nnumericas = df.select_dtypes(include=\"number\").columns\nprint(len(numericas))",
      solucion: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"edad\": [23, 31, 45, 52],\n    \"ciudad\": [\"Cali\", \"Bogotá\", \"Cali\", \"Medellín\"],\n    \"codigo_postal\": [760001, 110111, 760001, 50001],\n    \"ingreso\": [2.1, 3.4, 2.8, 4.0],\n})\n\ndf[\"codigo_postal\"] = df[\"codigo_postal\"].astype(str)\nnumericas = df.select_dtypes(include=\"number\").columns\nprint(len(numericas))",
      pistas: ["`df[\"codigo_postal\"] = df[\"codigo_postal\"].astype(str)`", "Después de convertirla, solo `edad` e `ingreso` quedan como numéricas."],
      validar: (stdout) => {
        const ok = stdout.trim() === "2"
        return { ok, mensaje: ok ? "Correcto: solo edad e ingreso son cantidades." : "El resultado esperado es 2 (edad e ingreso)." }
      },
    },
    verificacion: [
      {
        id: "m22-l1-q1",
        pregunta: "Quieres conocer la opinión de todos los clientes de una tienda, pero encuestas a 200 de ellos. Esos 200 son:",
        opciones: ["La población", "Una muestra", "Una variable", "Un parámetro"],
        respuestaCorrecta: 1,
        explicacion: "Son un subconjunto de la población completa (todos los clientes): una muestra.",
      },
      {
        id: "m22-l1-q2",
        pregunta: "¿Qué tipo de variable es el «número de hijos»?",
        opciones: ["Cualitativa nominal", "Cuantitativa continua", "Cuantitativa discreta", "Cualitativa ordinal"],
        respuestaCorrecta: 2,
        explicacion: "Se obtiene contando y solo toma valores enteros: es cuantitativa discreta.",
      },
    ],
    resumen: ["La población es el total que te interesa; la muestra es la parte que observas.", "Las variables pueden ser cualitativas (categorías) o cuantitativas (números con sentido).", "Que algo esté guardado como número no significa que sea una cantidad."],
    proximoPaso: "Veremos las escalas de medición, que determinan qué operaciones tienen sentido con cada variable.",
    conceptos: ["poblacion-muestra", "tipos-de-variable"],
  },
  {
    id: "m22-l2",
    moduloId: "modulo-22",
    titulo: "Escalas de medición: nominal, ordinal, de intervalo y de razón",
    objetivo: "Identificar la escala de una variable y saber qué cálculos estadísticos son válidos en cada una.",
    porQueImporta:
      "La escala decide qué puedes calcular. Promediar colores o decir que 20 °C es «el doble» de 10 °C son errores muy comunes que llevan a conclusiones falsas.",
    concepto: "Existen cuatro escalas, de menos a más información:\n\n| Escala | Qué permite | Ejemplos | Resumen válido |\n|---|---|---|---|\n| **Nominal** | Solo distinguir categorías | color, ciudad | moda |\n| **Ordinal** | Distinguir y ordenar | talla S/M/L, nivel de satisfacción | moda, mediana |\n| **De intervalo** | Ordenar y medir diferencias; el cero es arbitrario | temperatura en °C, año | media, desviación |\n| **De razón** | Todo lo anterior y el cero es real | edad, ingreso, peso | todo, incluidas proporciones |\n\nEn pandas, una variable ordinal se representa con una categoría **ordenada**:\n\n```python\ntallas = pd.Categorical([\"M\", \"S\", \"L\"], categories=[\"S\", \"M\", \"L\"], ordered=True)\ntallas.max()   # 'L'\n```\n\nSin `ordered=True` pandas no sabe qué categoría es «mayor» y `.max()` o `.min()` lanzan un error.",
    ejemploMinimo: "import pandas as pd\n\nniveles = pd.Categorical([\"bajo\", \"alto\", \"medio\", \"bajo\"], categories=[\"bajo\", \"medio\", \"alto\"], ordered=True)\nprint(niveles.max())",
    ejemploAplicado: "import pandas as pd\n\nrespuestas = pd.Series([\"regular\", \"bueno\", \"malo\", \"bueno\", \"excelente\", \"bueno\", \"regular\"])\norden = [\"malo\", \"regular\", \"bueno\", \"excelente\"]\nsatisfaccion = pd.Categorical(respuestas, categories=orden, ordered=True)\n\nprint(pd.Series(satisfaccion).value_counts().sort_index())",
    errorFrecuente: {
      codigo: "celsius_antes, celsius_ahora = 10, 20\nprint(\"¿Hace el doble de calor?\", celsius_ahora / celsius_antes == 2)",
      explicacion:
        "La temperatura en °C es una escala de **intervalo**: su cero es arbitrario, así que no se pueden hacer proporciones. 20 °C no es «el doble» de 10 °C: en Kelvin (escala de razón) serían 293.15 K y 283.15 K, apenas un 3.5 % más.",
    },
    practicaGuiada: {
      id: "m22-l2-practica",
      enunciado: "Las respuestas son ordinales: malo < regular < bueno < excelente. Crea una categoría ordenada con `pd.Categorical(..., categories=orden, ordered=True)` e imprime la respuesta **mínima** con `.min()`.",
      codigoInicial: "import pandas as pd\n\nsatisfacciones = [\"regular\", \"bueno\", \"malo\", \"bueno\", \"excelente\"]\norden = [\"malo\", \"regular\", \"bueno\", \"excelente\"]\n\nprint(min(satisfacciones))   # min() ordena alfabéticamente, no por nivel",
      solucion: "import pandas as pd\n\nsatisfacciones = [\"regular\", \"bueno\", \"malo\", \"bueno\", \"excelente\"]\norden = [\"malo\", \"regular\", \"bueno\", \"excelente\"]\n\nvalores = pd.Categorical(satisfacciones, categories=orden, ordered=True)\nprint(valores.min())",
      pistas: ["`pd.Categorical(satisfacciones, categories=orden, ordered=True)`", "Después llama `.min()` sobre el resultado."],
      validar: (stdout) => {
        const ok = stdout.trim() === "malo"
        return { ok, mensaje: ok ? "Correcto: «malo» es el nivel más bajo." : "El resultado esperado es malo." }
      },
    },
    reto: {
      id: "m22-l2-reto",
      enunciado: "Las tallas tienen un orden natural S < M < L < XL. Haz que `tallas` sea una categoría **ordenada** para que `.max()` funcione, e imprime la talla máxima y cuántas veces aparece, en el formato `XL 1`.",
      codigoInicial: "import pandas as pd\n\ndatos = [\"M\", \"L\", \"S\", \"M\", \"XL\", \"M\", \"L\"]\ntallas = pd.Categorical(datos, categories=[\"S\", \"M\", \"L\", \"XL\"])\n\nmaxima = tallas.max()\nveces = datos.count(maxima)\nprint(maxima, veces)",
      solucion: "import pandas as pd\n\ndatos = [\"M\", \"L\", \"S\", \"M\", \"XL\", \"M\", \"L\"]\ntallas = pd.Categorical(datos, categories=[\"S\", \"M\", \"L\", \"XL\"], ordered=True)\n\nmaxima = tallas.max()\nveces = datos.count(maxima)\nprint(maxima, veces)",
      pistas: ["Falta el argumento `ordered=True`.", "Sin él, pandas lanza un error porque no sabe qué categoría es mayor."],
      validar: (stdout) => {
        const ok = stdout.trim() === "XL 1"
        return { ok, mensaje: ok ? "Correcto: XL es la talla mayor y aparece una vez." : "El resultado esperado es «XL 1»." }
      },
    },
    verificacion: [
      {
        id: "m22-l2-q1",
        pregunta: "¿Qué escala tiene «nivel de satisfacción: bajo, medio, alto»?",
        opciones: ["Nominal", "Ordinal", "De intervalo", "De razón"],
        respuestaCorrecta: 1,
        explicacion: "Las categorías tienen un orden, pero la distancia entre ellas no se puede medir: es ordinal.",
      },
      {
        id: "m22-l2-q2",
        pregunta: "¿Por qué no tiene sentido decir que 20 °C es el doble de 10 °C?",
        opciones: ["Porque la temperatura es cualitativa", "Porque el cero de los °C es arbitrario (escala de intervalo)", "Porque 20 no es múltiplo de 10", "Sí tiene sentido"],
        respuestaCorrecta: 1,
        explicacion: "En una escala de intervalo el cero no significa «ausencia», así que las proporciones no son válidas.",
      },
    ],
    resumen: ["Nominal: solo distingue; ordinal: además ordena.", "Intervalo: mide diferencias, pero el cero es arbitrario; razón: el cero es real.", "En pandas, `ordered=True` indica que una categoría tiene orden."],
    proximoPaso: "Ahora resumiremos variables con tablas de frecuencia.",
    conceptos: ["escalas-de-medicion", "categoria-ordenada"],
  },
  {
    id: "m22-l3",
    moduloId: "modulo-22",
    titulo: "Tablas de frecuencia",
    objetivo: "Construir tablas de frecuencia absoluta, relativa y acumulada con value_counts.",
    porQueImporta:
      "Una tabla de frecuencias es el primer resumen que se hace de cualquier variable: te dice qué valores existen, cuáles dominan y cuáles son raros, sin mirar fila por fila.",
    concepto: "Para cada valor de una variable se calcula:\n\n- **Frecuencia absoluta**: cuántas veces aparece.\n- **Frecuencia relativa**: la proporción sobre el total (suma 1, o 100 %).\n- **Frecuencia acumulada**: la suma progresiva de las frecuencias.\n\n```python\nserie.value_counts()                    # absoluta (de mayor a menor)\nserie.value_counts(normalize=True)      # relativa\nserie.value_counts(normalize=True).cumsum()   # relativa acumulada\nserie.value_counts().sort_index()       # ordenada por categoría, no por frecuencia\n```\n\n`value_counts()` ordena por frecuencia. Si la variable es ordinal o numérica, usa `.sort_index()` para respetar su orden natural.",
    ejemploMinimo: "import pandas as pd\n\ncolores = pd.Series([\"rojo\", \"azul\", \"rojo\", \"verde\", \"rojo\"])\nprint(colores.value_counts())",
    ejemploAplicado: "import pandas as pd\n\ncanales = pd.Series([\"web\", \"tienda\", \"web\", \"app\", \"web\", \"tienda\", \"web\", \"app\", \"web\", \"tienda\"])\n\ntabla = pd.DataFrame({\n    \"absoluta\": canales.value_counts(),\n    \"relativa\": canales.value_counts(normalize=True),\n})\ntabla[\"acumulada\"] = tabla[\"relativa\"].cumsum()\nprint(tabla)",
    errorFrecuente: {
      codigo: "import pandas as pd\n\nestrellas = pd.Series([5, 3, 4, 5, 1, 4, 5, 2])\nprint(estrellas.value_counts())",
      explicacion:
        "`value_counts()` ordena por frecuencia (5, 4, 3…), así que las estrellas aparecen mezcladas. Para variables con un orden natural usa `estrellas.value_counts().sort_index()`: así ves 1, 2, 3, 4, 5 en orden.",
    },
    practicaGuiada: {
      id: "m22-l3-practica",
      enunciado: "Calcula la frecuencia relativa de `\"Bogotá\"` con `value_counts(normalize=True)` e imprímela redondeada a 3 decimales.",
      codigoInicial: "import pandas as pd\n\nciudades = pd.Series([\"Bogotá\", \"Cali\", \"Bogotá\", \"Medellín\", \"Cali\", \"Bogotá\", \"Medellín\", \"Barranquilla\"])\n\nproporcion = 0\nprint(proporcion)",
      solucion: "import pandas as pd\n\nciudades = pd.Series([\"Bogotá\", \"Cali\", \"Bogotá\", \"Medellín\", \"Cali\", \"Bogotá\", \"Medellín\", \"Barranquilla\"])\n\nproporcion = round(ciudades.value_counts(normalize=True)[\"Bogotá\"], 3)\nprint(proporcion)",
      pistas: ["`ciudades.value_counts(normalize=True)` devuelve una serie indexada por ciudad.", "Selecciona la fila con `[\"Bogotá\"]`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.375) <= 0.0005
        return { ok, mensaje: ok ? "Correcto: Bogotá aparece en 3 de 8 registros." : "El resultado esperado es 0.375 (3 de 8)." }
      },
    },
    reto: {
      id: "m22-l3-reto",
      enunciado: "¿Qué proporción de las ventas concentran los **dos canales principales**? Calcula la frecuencia relativa **acumulada** con `.cumsum()` e imprime el valor del segundo canal redondeado a 2 decimales.",
      codigoInicial: "import pandas as pd\n\ncanales = pd.Series([\"web\", \"tienda\", \"web\", \"app\", \"web\", \"tienda\", \"web\", \"app\", \"web\", \"tienda\"])\n\nfrecuencia = canales.value_counts(normalize=True)\nacumulada = frecuencia      # falta acumular con .cumsum()\nprint(round(acumulada.iloc[1], 2))",
      solucion: "import pandas as pd\n\ncanales = pd.Series([\"web\", \"tienda\", \"web\", \"app\", \"web\", \"tienda\", \"web\", \"app\", \"web\", \"tienda\"])\n\nfrecuencia = canales.value_counts(normalize=True)\nacumulada = frecuencia.cumsum()\nprint(round(acumulada.iloc[1], 2))",
      pistas: ["Añade `.cumsum()` a la serie de frecuencias relativas.", "`.iloc[1]` toma el segundo elemento."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.8) <= 0.005
        return { ok, mensaje: ok ? "Correcto: web y tienda concentran el 80 % de las ventas." : "El resultado esperado es 0.8." }
      },
    },
    verificacion: [
      {
        id: "m22-l3-q1",
        pregunta: "Si un valor aparece 15 veces en 60 registros, su frecuencia relativa es:",
        opciones: ["15", "0.15", "0.25", "4"],
        respuestaCorrecta: 2,
        explicacion: "15 / 60 = 0.25, es decir, el 25 %.",
      },
      {
        id: "m22-l3-q2",
        pregunta: "¿Qué hace `.cumsum()` sobre una serie de frecuencias relativas?",
        opciones: ["Las ordena", "Las acumula progresivamente hasta llegar a 1", "Las multiplica por 100", "Elimina duplicados"],
        respuestaCorrecta: 1,
        explicacion: "Suma de forma progresiva: la última frecuencia acumulada vale 1 (100 %).",
      },
    ],
    resumen: ["Absoluta = conteo; relativa = proporción; acumulada = suma progresiva.", "`value_counts(normalize=True)` da frecuencias relativas.", "Usa `.sort_index()` cuando la variable tenga orden natural."],
    proximoPaso: "Pasaremos de contar categorías a resumir números con la media, la mediana y la moda.",
    conceptos: ["tabla-de-frecuencias", "frecuencia-relativa"],
  },
  {
    id: "m22-l4",
    moduloId: "modulo-22",
    titulo: "Medidas de tendencia central: media, mediana y moda",
    objetivo: "Calcular la media, la mediana, la moda y la media ponderada, e interpretar qué representa cada una.",
    porQueImporta:
      "Cuando alguien pide «el valor típico» de un conjunto de datos, hay tres respuestas posibles. Saber cuál usar y cuándo es la base de casi todo informe descriptivo.",
    concepto: "- **Media**: suma de los valores dividida entre cuántos son. Usa toda la información, pero se deja arrastrar por valores extremos.\n- **Mediana**: el valor central al ordenar los datos. Divide el conjunto en dos mitades iguales.\n- **Moda**: el valor que más se repite. Es la única que sirve también para categorías.\n- **Media ponderada**: cada valor pesa distinto (por ejemplo, las notas de un curso con créditos diferentes).\n\n```python\nserie.mean()\nserie.median()\nserie.mode()                         # puede devolver más de un valor\nnp.average(valores, weights=pesos)   # media ponderada\n```\n\n`serie.mode()` devuelve una **serie**, porque puede haber varias modas. Para quedarte con la primera usa `serie.mode()[0]`.",
    ejemploMinimo: "import pandas as pd\n\ndatos = pd.Series([2, 3, 3, 4, 8, 9, 10])\nprint(datos.mean(), datos.median(), datos.mode()[0])",
    ejemploAplicado: "import numpy as np\n\nnotas = [4.0, 3.0, 5.0]\ncreditos = [2, 3, 5]\n\nprint(\"Media simple:\", round(np.mean(notas), 2))\nprint(\"Media ponderada:\", round(np.average(notas, weights=creditos), 2))",
    errorFrecuente: {
      codigo: "import pandas as pd\n\nedades = pd.Series([20, 22, 22, 30, 30])\nmoda = edades.mode()\nprint(\"La moda es\", moda * 2)",
      explicacion:
        "`mode()` devuelve una **serie** y no un número, porque los datos pueden tener varias modas (aquí 22 y 30). Operar con ella multiplica ambos valores y devuelve otra serie. Si necesitas un solo valor, selecciona uno: `edades.mode()[0]`.",
    },
    practicaGuiada: {
      id: "m22-l4-practica",
      enunciado: "Imprime la **moda** de `datos` (el valor que más se repite). Recuerda que `mode()` devuelve una serie.",
      codigoInicial: "import pandas as pd\n\ndatos = pd.Series([2, 3, 3, 4, 8, 9, 10])\nprint(datos.median())",
      solucion: "import pandas as pd\n\ndatos = pd.Series([2, 3, 3, 4, 8, 9, 10])\nprint(datos.mode()[0])",
      pistas: ["Usa `datos.mode()` y toma el primer elemento con `[0]`."],
      validar: (stdout) => {
        const ok = stdout.trim() === "3"
        return { ok, mensaje: ok ? "Correcto: el 3 es el valor más frecuente." : "El resultado esperado es 3." }
      },
    },
    reto: {
      id: "m22-l4-reto",
      enunciado: "Calcula la nota final **ponderada** del estudiante con `np.average(notas, weights=pesos)` e imprímela redondeada a 2 decimales.",
      codigoInicial: "import numpy as np\n\nnotas = [4.0, 3.0, 5.0]\npesos = [0.2, 0.3, 0.5]\n\nfinal = np.mean(notas)      # esto ignora los pesos\nprint(round(final, 2))",
      solucion: "import numpy as np\n\nnotas = [4.0, 3.0, 5.0]\npesos = [0.2, 0.3, 0.5]\n\nfinal = np.average(notas, weights=pesos)\nprint(round(final, 2))",
      pistas: ["`np.average` acepta el argumento `weights=`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 4.2) <= 0.005
        return { ok, mensaje: ok ? "Correcto: 4.0·0.2 + 3.0·0.3 + 5.0·0.5 = 4.2." : "El resultado esperado es 4.2." }
      },
    },
    verificacion: [
      {
        id: "m22-l4-q1",
        pregunta: "¿Cuál de estas medidas sirve también para variables cualitativas?",
        opciones: ["La media", "La mediana", "La moda", "Ninguna"],
        respuestaCorrecta: 2,
        explicacion: "La moda solo requiere contar repeticiones, así que funciona con categorías.",
      },
      {
        id: "m22-l4-q2",
        pregunta: "Un estudiante saca 5.0 en un examen de 70 % y 2.0 en uno de 30 %. Su nota final correcta es:",
        opciones: ["3.5, el promedio simple", "4.1, la media ponderada", "2.0", "5.0"],
        respuestaCorrecta: 1,
        explicacion: "5.0·0.7 + 2.0·0.3 = 4.1. El promedio simple ignoraría que los exámenes pesan distinto.",
      },
    ],
    resumen: ["Media: usa todos los datos, pero es sensible a extremos.", "Mediana: el valor central; resistente a extremos.", "Moda: el más frecuente; puede haber varias.", "La media ponderada da más peso a lo que más importa."],
    proximoPaso: "Veremos cómo decidir cuál medida usar según la forma de los datos.",
    conceptos: ["media", "mediana", "moda", "media-ponderada"],
  },
  {
    id: "m22-l5",
    moduloId: "modulo-22",
    titulo: "Elegir la medida adecuada: simetría y sesgo",
    objetivo: "Usar la relación entre media y mediana, y el coeficiente de asimetría, para decidir qué medida describe mejor una variable.",
    porQueImporta:
      "Los ingresos, los precios de las viviendas y los tiempos de espera casi nunca son simétricos. Reportar la media en esos casos es una de las formas más comunes de mentir con datos sin querer.",
    concepto: "Cuando los datos son **simétricos**, media y mediana coinciden aproximadamente y cualquiera sirve.\n\nCuando hay **sesgo**:\n\n- **Sesgo a la derecha** (cola larga hacia valores altos): media > mediana. Típico de ingresos y precios.\n- **Sesgo a la izquierda** (cola larga hacia valores bajos): media < mediana.\n\nEl coeficiente de asimetría resume esto en un número:\n\n```python\nserie.skew()   # ≈ 0 simétrica · > 0 sesgo a la derecha · < 0 sesgo a la izquierda\n```\n\nUna regla práctica: si `abs(skew) > 0.5`, la mediana representa mejor el caso típico. En distribuciones con sesgo marcado, informa **ambas**.",
    ejemploMinimo: "import pandas as pd\n\nsueldos = pd.Series([2.0, 2.2, 2.1, 2.4, 2.3, 15.0])\nprint(round(sueldos.mean(), 2), sueldos.median(), round(sueldos.skew(), 2))",
    ejemploAplicado: "import pandas as pd\n\nsimetrica = pd.Series([48, 50, 52, 49, 51, 50, 50])\nsesgada = pd.Series([1, 1, 2, 2, 2, 3, 3, 4, 25])\n\nfor nombre, serie in [(\"simétrica\", simetrica), (\"sesgada\", sesgada)]:\n    print(nombre, \"→ media\", round(serie.mean(), 2), \"mediana\", serie.median(), \"skew\", round(serie.skew(), 2))",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ningresos = pd.Series([1.8, 2.0, 2.1, 2.2, 2.4, 2.5, 12.0])\nprint(\"Ingreso típico:\", round(ingresos.mean(), 2))",
      explicacion:
        "La media (3.57) queda muy por encima de lo que gana casi todo el grupo, porque el valor 12.0 la arrastra. Con sesgo a la derecha, la mediana (2.2) describe mejor al caso típico. Comparar ambas es la forma más rápida de detectarlo.",
    },
    practicaGuiada: {
      id: "m22-l5-practica",
      enunciado: "Calcula la diferencia `media - mediana` de los ingresos e imprímela redondeada a 2 decimales. Una diferencia grande y positiva delata sesgo a la derecha.",
      codigoInicial: "import pandas as pd\n\ningresos = pd.Series([1.8, 2.0, 2.1, 2.2, 2.4, 2.5, 12.0])\n\ndiferencia = 0\nprint(diferencia)",
      solucion: "import pandas as pd\n\ningresos = pd.Series([1.8, 2.0, 2.1, 2.2, 2.4, 2.5, 12.0])\n\ndiferencia = round(ingresos.mean() - ingresos.median(), 2)\nprint(diferencia)",
      pistas: ["Resta `ingresos.median()` a `ingresos.mean()`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 1.37) <= 0.006
        return { ok, mensaje: ok ? "Correcto: la media supera a la mediana en 1.37." : "El resultado esperado es 1.37 (media 3.57 menos mediana 2.2)." }
      },
    },
    reto: {
      id: "m22-l5-reto",
      enunciado: "Completa la función `elegir_medida(serie)`: debe devolver `\"mediana\"` si el valor absoluto de `serie.skew()` es mayor que 0.5, y `\"media\"` en caso contrario. El código imprime la recomendación para dos series.",
      codigoInicial: "import pandas as pd\n\ndef elegir_medida(serie):\n    return \"media\"      # falta decidir según el sesgo\n\nedades = pd.Series([30, 32, 31, 33, 29, 31, 30, 32])\nsueldos = pd.Series([2.0, 2.2, 2.1, 2.4, 2.3, 2.2, 15.0])\n\nprint(elegir_medida(edades))\nprint(elegir_medida(sueldos))",
      solucion: "import pandas as pd\n\ndef elegir_medida(serie):\n    if abs(serie.skew()) > 0.5:\n        return \"mediana\"\n    return \"media\"\n\nedades = pd.Series([30, 32, 31, 33, 29, 31, 30, 32])\nsueldos = pd.Series([2.0, 2.2, 2.1, 2.4, 2.3, 2.2, 15.0])\n\nprint(elegir_medida(edades))\nprint(elegir_medida(sueldos))",
      pistas: ["Usa `abs(serie.skew()) > 0.5` en un `if`.", "Devuelve un texto en cada rama."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"media\",\"mediana\"]"
        return { ok, mensaje: ok ? "Correcto: edades → media, sueldos → mediana." : "Se esperaba «media» para edades y «mediana» para sueldos." }
      },
    },
    verificacion: [
      {
        id: "m22-l5-q1",
        pregunta: "Si la media es mucho mayor que la mediana, la distribución probablemente tiene:",
        opciones: ["Sesgo a la izquierda", "Sesgo a la derecha", "Simetría perfecta", "Ninguna cola"],
        respuestaCorrecta: 1,
        explicacion: "Valores altos extremos arrastran la media hacia arriba: sesgo a la derecha.",
      },
      {
        id: "m22-l5-q2",
        pregunta: "Para describir el salario típico de una empresa con unos pocos sueldos muy altos conviene:",
        opciones: ["La media", "La mediana", "El máximo", "La suma"],
        respuestaCorrecta: 1,
        explicacion: "La mediana no se deja arrastrar por los sueldos extremos.",
      },
    ],
    resumen: ["Media ≈ mediana indica simetría; media > mediana indica sesgo a la derecha.", "`skew()` resume la asimetría en un número.", "Con sesgo marcado, usa la mediana o informa ambas medidas."],
    proximoPaso: "En el siguiente módulo medimos cuánto se dispersan los datos alrededor de su centro.",
    conceptos: ["asimetria-sesgo", "eleccion-de-medida"],
  },
]
