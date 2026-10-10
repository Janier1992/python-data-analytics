import type { Lesson } from '../../types'

export const module43Lessons: Lesson[] = [
  {
    id: "m43-l1",
    moduloId: "modulo-43",
    titulo: "Elegir el gráfico según la pregunta",
    objetivo: "Relacionar cada tipo de pregunta (comparar, evolución, distribución, relación, composición) con el gráfico que mejor la responde.",
    porQueImporta:
      "La mayoría de los gráficos malos no fallan por estética sino por haber elegido el tipo equivocado para la pregunta. Elegir bien convierte un dato en un mensaje que se entiende en segundos.",
    concepto: "Antes de abrir cualquier herramienta (Python, Excel o Power BI), formula **la pregunta** que el gráfico debe responder. Cada tipo de pregunta tiene un gráfico natural:\n\n- **Comparar categorías** («¿qué producto vende más?»): **barras** (horizontales si los nombres son largos), ordenadas de mayor a menor.\n- **Evolución en el tiempo** («¿cómo cambian las ventas mes a mes?»): **líneas** (o columnas si son pocos periodos).\n- **Distribución** («¿cómo se reparten los precios o las edades?»): **histograma** o diagrama de caja.\n- **Relación entre dos variables numéricas** («¿más publicidad implica más ventas?»): **dispersión** (*scatter*).\n- **Composición** («¿qué parte del total aporta cada categoría?»): **barras apiladas** o 100 % apiladas. Un gráfico circular solo sirve con pocas partes (hasta unas 4 o 5) y una diferencia clara entre ellas.\n\nReglas rápidas:\n\n- Un gráfico, una pregunta. Si necesitas explicar qué se ve, probablemente el gráfico es demasiado complejo.\n- Si dudas entre una tabla y un gráfico: la tabla sirve para consultar valores exactos y el gráfico para ver patrones.\n- Evita los gráficos 3D y los efectos decorativos: distorsionan la percepción de las cantidades.\n\nEstas reglas valen igual para matplotlib, Excel y Power BI: lo que cambia es dónde haces clic.",
    ejemploMinimo: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nimport matplotlib.pyplot as plt\n\npor_mes = ventas.groupby(\"fecha\")[\"ingreso\"].sum()\nplt.plot(por_mes.index.str[5:], por_mes.values)\nplt.title(\"Ingreso mensual (tienda Aurora, 2023-2024)\")\nplt.xlabel(\"Mes\")\nplt.ylabel(\"Ingreso\")\nprint(\"Meses graficados:\", len(por_mes))",
    ejemploAplicado: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nimport matplotlib.pyplot as plt\n\nfig, ejes = plt.subplots(1, 3, figsize=(12, 3.5))\n\npor_categoria = ventas.groupby(\"categoria\")[\"ingreso\"].sum().sort_values()\nejes[0].barh(por_categoria.index, por_categoria.values)\nejes[0].set_title(\"Comparar: ingreso por categoría\")\n\npor_mes = ventas.groupby(\"fecha\")[\"ingreso\"].sum()\nejes[1].plot(range(len(por_mes)), por_mes.values)\nejes[1].set_title(\"Evolución: ingreso mensual\")\n\nejes[2].hist(ventas[\"unidades\"], bins=8)\nejes[2].set_title(\"Distribución: unidades por registro\")\n\nfig.tight_layout()\nprint(por_categoria.round(0).to_dict())",
    errorFrecuente: {
      codigo: "# Pregunta: «¿qué parte del ingreso aporta cada uno de los 12 productos?»\nplt.pie(ingresos, labels=productos)        # 12 porciones: casi imposible comparar los tamaños\n\n# Mejor: barras horizontales ordenadas, con el porcentaje escrito en cada barra\nplt.barh(productos_ordenados, ingresos_ordenados)",
      explicacion:
        "El ojo humano compara mal los ángulos y las áreas, y comparan mucho mejor longitudes alineadas. Un gráfico circular con muchas porciones o con valores parecidos no permite ver quién es mayor. Las barras ordenadas responden la misma pregunta con mucha más claridad.",
    },
    practicaGuiada: {
      id: "m43-l1-practica",
      enunciado: "Completa la función `grafico_para(pregunta)` para que devuelva el gráfico recomendado: `\"comparar\"` → `\"barras\"`, `\"evolucion\"` → `\"lineas\"`, `\"distribucion\"` → `\"histograma\"`, `\"relacion\"` → `\"dispersion\"` y `\"composicion\"` → `\"barras apiladas\"`.",
      codigoInicial: "def grafico_para(pregunta):\n    # devuelve el tipo de gráfico recomendado\n    return None\n\nfor p in [\"comparar\", \"evolucion\", \"distribucion\", \"relacion\", \"composicion\"]:\n    print(p, \"->\", grafico_para(p))",
      solucion: "def grafico_para(pregunta):\n    recomendado = {\n        \"comparar\": \"barras\",\n        \"evolucion\": \"lineas\",\n        \"distribucion\": \"histograma\",\n        \"relacion\": \"dispersion\",\n        \"composicion\": \"barras apiladas\",\n    }\n    return recomendado[pregunta]\n\nfor p in [\"comparar\", \"evolucion\", \"distribucion\", \"relacion\", \"composicion\"]:\n    print(p, \"->\", grafico_para(p))",
      pistas: ["Un diccionario de pregunta a gráfico es la forma más clara.", "Devuelve `recomendado[pregunta]`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"comparar -> barras\",\"evolucion -> lineas\",\"distribucion -> histograma\",\"relacion -> dispersion\",\"composicion -> barras apiladas\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: comparar -> barras\nevolucion -> lineas\ndistribucion -> histograma\nrelacion -> dispersion\ncomposicion -> barras apiladas" }
      },
    },
    reto: {
      id: "m43-l1-reto",
      enunciado: "Prepara los datos de un gráfico de **barras horizontales** con la participación de cada producto en el ingreso de 2023. Con `ventas12` (ventas de 2023), calcula el ingreso por producto, ordénalo de **menor a mayor** (así el mayor queda arriba en un `barh`) e imprime una línea por producto con el formato `producto: porcentaje %` (porcentaje con 1 decimal).",
      codigoInicial: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nventas12 = ventas[ventas[\"fecha\"] < \"2024-01-01\"]\n\npor_producto = None   # ingreso por producto, ordenado de menor a mayor\nprint(por_producto)",
      solucion: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nventas12 = ventas[ventas[\"fecha\"] < \"2024-01-01\"]\n\npor_producto = ventas12.groupby(\"producto\")[\"ingreso\"].sum().sort_values()\nporcentaje = (por_producto / por_producto.sum() * 100).round(1)\nfor producto, pct in porcentaje.items():\n    print(f\"{producto}: {pct} %\")",
      pistas: ["`ventas12.groupby(\"producto\")[\"ingreso\"].sum().sort_values()`", "Porcentaje = valor / total × 100, con `.round(1)`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"Mouse: 1.2 %\",\"Teclado: 2.6 %\",\"Silla: 8.5 %\",\"Monitor: 19.7 %\",\"Laptop: 68.1 %\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: Mouse: 1.2 %\nTeclado: 2.6 %\nSilla: 8.5 %\nMonitor: 19.7 %\nLaptop: 68.1 %" }
      },
    },
    verificacion: [
      {
        id: "m43-l1-q1",
        pregunta: "Quieres mostrar cómo cambian las ventas mes a mes durante dos años. ¿Qué gráfico eliges?",
        opciones: ["Circular", "Líneas", "Dispersión", "Histograma"],
        respuestaCorrecta: 1,
        explicacion: "Para evolución en el tiempo, la línea muestra la tendencia y los cambios de ritmo.",
      },
      {
        id: "m43-l1-q2",
        pregunta: "¿Cuándo es aceptable un gráfico circular?",
        opciones: ["Siempre", "Con muchas categorías de tamaño parecido", "Con pocas partes (4 o 5) y diferencias claras", "Nunca existe un caso"],
        respuestaCorrecta: 2,
        explicacion: "Con pocas partes y diferencias evidentes se entiende; con muchas, las barras ordenadas comunican mejor.",
      },
      {
        id: "m43-l1-q3",
        pregunta: "Quieres saber si el gasto en publicidad se relaciona con las ventas. ¿Qué gráfico usas?",
        opciones: ["Barras apiladas", "Línea", "Dispersión (scatter)", "Circular"],
        respuestaCorrecta: 2,
        explicacion: "Dos variables numéricas y la pregunta de su relación piden un diagrama de dispersión.",
      },
    ],
    resumen: ["Primero la pregunta; después el gráfico.", "Comparar → barras; evolución → líneas; distribución → histograma; relación → dispersión; composición → barras apiladas.", "Las barras ordenadas casi siempre superan al gráfico circular."],
    proximoPaso: "Veremos cómo el diseño (orden, color, ejes) hace que el mensaje se entienda, o lo distorsiona.",
    conceptos: ["tipos-de-grafico", "visualizacion"],
  },
  {
    id: "m43-l2",
    moduloId: "modulo-43",
    titulo: "Diseño que comunica: orden, color y ejes honestos",
    objetivo: "Aplicar principios de diseño (orden, color con intención, eje desde cero en barras, títulos que dicen el mensaje) y detectar gráficos que exageran diferencias.",
    porQueImporta:
      "Un gráfico puede ser técnicamente correcto y aun así engañar, o confundir por exceso de adornos. Quien lee tu informe decide con lo que ve: la honestidad y la claridad son parte del trabajo del analista.",
    concepto: "Principios que se aplican en cualquier herramienta:\n\n1. **El título dice el mensaje**: «Laptop genera el 60 % del ingreso» informa más que «Ingreso por producto».\n2. **Ordena las categorías** por valor (salvo que tengan un orden natural, como los meses o las edades).\n3. **Usa el color con intención**: un color neutro (gris) para todo y uno de énfasis para lo que importa. Más de 5 o 6 colores distintos dejan de poder distinguirse.\n4. **Etiqueta directamente** (valores sobre las barras) y elimina lo que sobra: cuadrículas pesadas, bordes, leyendas redundantes.\n5. **Barras desde cero**: la longitud de una barra representa la cantidad, así que cortar el eje la exagera. En gráficos de líneas sí es aceptable no empezar en cero, si se indica claramente.\n6. **Evita**: gráficos 3D, ejes secundarios que sugieren relaciones inexistentes, y proporciones que cambian de una página a otra.\n\n**El efecto del eje truncado**. Si dos barras valen 100 y 98 y el eje empieza en 96, la segunda se ve de la mitad de altura: `(98 - 96) / (100 - 96) = 0,5`, cuando la diferencia real es solo del 2 %.\n\nPiensa en tu lector: casi nunca tendrá tiempo de estudiar el gráfico. Si el mensaje no se ve en 5 segundos, rediseña.",
    ejemploMinimo: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nimport matplotlib.pyplot as plt\n\npor_producto = ventas.groupby(\"producto\")[\"ingreso\"].sum().sort_values()\ncolores = [\"#346dff\" if v == por_producto.max() else \"#9aa4b2\" for v in por_producto]\n\nplt.barh(por_producto.index, por_producto.values, color=colores)\nplt.title(\"Laptop es el producto que más ingreso genera\")\nprint(list(por_producto.index))",
    ejemploAplicado: "import matplotlib.pyplot as plt\n\nvalores = [100, 98]\nfig, ejes = plt.subplots(1, 2, figsize=(7, 3))\n\nejes[0].bar([\"A\", \"B\"], valores)\nejes[0].set_ylim(96, 100.5)\nejes[0].set_title(\"Eje truncado (engaña)\")\n\nejes[1].bar([\"A\", \"B\"], valores)\nejes[1].set_ylim(0, 105)\nejes[1].set_title(\"Eje desde cero (honesto)\")\nfig.tight_layout()\nprint(\"Diferencia real:\", round((100 - 98) / 100 * 100, 1), \"%\")",
    errorFrecuente: {
      codigo: "plt.bar([\"Q1\", \"Q2\"], [98, 100])\nplt.ylim(97, 100.5)       # la barra de Q1 parece un cuarto de la de Q2, pero la diferencia real es del 2 %",
      explicacion:
        "Cortar el eje en un gráfico de barras hace que la diferencia visual sea mucho mayor que la real. Si el lector solo mira la altura, saca una conclusión falsa. Usa un eje desde cero para barras, o muestra la diferencia en un gráfico de líneas o con un número, de forma explícita.",
    },
    practicaGuiada: {
      id: "m43-l2-practica",
      enunciado: "Escribe `colores_barras(valores)` que devuelva una lista de colores: `\"#346dff\"` para la barra de **mayor valor** y `\"#9aa4b2\"` (gris) para las demás. Es el principio «un color de énfasis, el resto neutro».",
      codigoInicial: "def colores_barras(valores):\n    return []\n\nprint(colores_barras([120, 340, 90, 340 - 10]))",
      solucion: "def colores_barras(valores):\n    maximo = max(valores)\n    return [\"#346dff\" if v == maximo else \"#9aa4b2\" for v in valores]\n\nprint(colores_barras([120, 340, 90, 340 - 10]))",
      pistas: ["Calcula `max(valores)` una vez.", "Una lista por comprensión devuelve un color por valor."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"['#9aa4b2', '#346dff', '#9aa4b2', '#9aa4b2']\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: ['#9aa4b2', '#346dff', '#9aa4b2', '#9aa4b2']" }
      },
    },
    reto: {
      id: "m43-l2-reto",
      enunciado: "Escribe `razon_aparente(a, b, eje_min)`: la proporción entre la altura visible de la barra `b` y la de `a` cuando el eje vertical empieza en `eje_min` (`(b - eje_min) / (a - eje_min)`, redondeada a 2 decimales). Compárala con la proporción real (`b / a`) para los tres ejes del ejemplo.",
      codigoInicial: "def razon_aparente(a, b, eje_min):\n    return None\n\nfor eje in (0, 90, 96):\n    print(eje, razon_aparente(100, 98, eje))",
      solucion: "def razon_aparente(a, b, eje_min):\n    return round((b - eje_min) / (a - eje_min), 2)\n\nfor eje in (0, 90, 96):\n    print(eje, razon_aparente(100, 98, eje))",
      pistas: ["La altura visible de una barra es `valor - eje_min`.", "Con `eje_min = 0` el resultado es la proporción real: 0.98."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"0 0.98\",\"90 0.8\",\"96 0.5\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 0 0.98\n90 0.8\n96 0.5" }
      },
    },
    verificacion: [
      {
        id: "m43-l2-q1",
        pregunta: "¿Por qué las barras deben empezar en cero?",
        opciones: ["Por tradición", "Porque su longitud representa la cantidad: cortarla exagera las diferencias", "Porque matplotlib lo exige", "Para que ocupen más espacio"],
        respuestaCorrecta: 1,
        explicacion: "En un gráfico de barras, la longitud es el dato. Un eje truncado hace que diferencias pequeñas parezcan enormes.",
      },
      {
        id: "m43-l2-q2",
        pregunta: "¿Qué significa «usar el color con intención»?",
        opciones: ["Usar muchos colores llamativos", "Un color neutro para todo y uno de énfasis para lo importante", "Usar siempre rojo y verde", "No usar color"],
        respuestaCorrecta: 1,
        explicacion: "El color guía la mirada hacia el mensaje; si todo tiene color, nada destaca.",
      },
      {
        id: "m43-l2-q3",
        pregunta: "¿Cuál es un buen título de gráfico?",
        opciones: ["Gráfico 1", "Ingreso por producto", "Laptop genera el 60 % del ingreso", "Datos de ventas"],
        respuestaCorrecta: 2,
        explicacion: "El título que enuncia el mensaje ahorra trabajo al lector.",
      },
    ],
    resumen: ["Título con el mensaje, categorías ordenadas, un color de énfasis.", "Barras desde cero; los ejes truncados exageran.", "Si el mensaje no se ve en 5 segundos, rediseña."],
    proximoPaso: "Pasaremos de gráficos sueltos a un tablero: KPI, jerarquía visual y semáforos.",
    conceptos: ["diseno-de-graficos", "eje-truncado"],
  },
  {
    id: "m43-l3",
    moduloId: "modulo-43",
    titulo: "Tableros: KPI, jerarquía visual y semáforos",
    objetivo: "Diseñar la estructura de un tablero (KPI arriba, detalle abajo) y calcular tarjetas de KPI con variación y estado respecto a una meta.",
    porQueImporta:
      "Un tablero útil responde en segundos «¿cómo vamos?». Para eso necesita pocas cifras bien definidas, comparadas con algo (mes anterior, meta, año anterior) y ubicadas donde el ojo las busca primero.",
    concepto: "**Estructura típica de una página de tablero**:\n\n1. **Arriba**: 3 a 5 **tarjetas de KPI** con el valor actual y su comparación (variación frente al periodo anterior o a la meta).\n2. **Centro**: el gráfico principal (normalmente la evolución en el tiempo).\n3. **Abajo o a los lados**: desgloses (por región, producto, categoría) y filtros (segmentaciones).\n\nLos lectores recorren la pantalla de arriba a la izquierda hacia abajo a la derecha: pon lo más importante donde empiezan a mirar.\n\n**Una tarjeta de KPI buena** tiene tres elementos: el valor, con formato claro (miles, moneda); una **comparación** (un número solo no dice si es bueno o malo); y un **estado** visual cuando hay meta.\n\n- Variación porcentual: `(actual - anterior) / anterior × 100`.\n- Cumplimiento de meta: `actual / meta`.\n- Un **semáforo** necesita umbrales explícitos y acordados con el negocio, por ejemplo: verde si se alcanza la meta, amarillo si se llega al 90 % de la meta, rojo por debajo. No son una norma: son una convención que debe documentarse.\n\n**Reglas de orden**: 6 a 8 visuales por página como orden de magnitud (más es difícil de leer), mismos colores y formatos en todas las páginas, y una sola fuente de verdad para cada cifra (definir el KPI una vez, en el modelo, y reutilizarlo).\n\nEn Power BI las tarjetas y el formato condicional hacen esto sin código; aquí practicamos la **lógica** que hay detrás.",
    ejemploMinimo: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\npor_mes = ventas.groupby(\"fecha\")[\"ingreso\"].sum()\nultimo, anterior = por_mes.iloc[-1], por_mes.iloc[-2]\nprint(\"Ingreso del último mes:\", ultimo)\nprint(\"Mes anterior:\", anterior)\nprint(\"Variación:\", round((ultimo - anterior) / anterior * 100, 1), \"%\")",
    ejemploAplicado: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\npor_mes = ventas.groupby(\"fecha\")[\"ingreso\"].sum()\ndic24, dic23 = por_mes[\"2024-12-01\"], por_mes[\"2023-12-01\"]\n\ntarjetas = {\n    \"Ingreso dic-2024\": f\"{dic24:,.0f}\",\n    \"vs. dic-2023\": f\"{(dic24 - dic23) / dic23 * 100:+.1f} %\",\n    \"Ingreso acumulado 2024\": f\"{por_mes['2024-01-01':].sum():,.0f}\",\n}\nfor nombre, valor in tarjetas.items():\n    print(f\"{nombre:<25}{valor:>12}\")",
    errorFrecuente: {
      codigo: "Ingreso del mes: 412 000     ← ¿es bueno o malo?",
      explicacion:
        "Un número solo no comunica nada: nadie sabe si 412 000 es un buen mes. Toda tarjeta de KPI debería incluir una comparación (mes anterior, mismo mes del año pasado, meta) para que se pueda interpretar.",
    },
    practicaGuiada: {
      id: "m43-l3-practica",
      enunciado: "Calcula la tarjeta de KPI del **último mes** (diciembre de 2024): imprime el ingreso del mes, el del mes anterior y la variación porcentual (1 decimal) con el formato `actual anterior variacion %`, por ejemplo `100 90 11.1 %`.",
      codigoInicial: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\npor_mes = ventas.groupby(\"fecha\")[\"ingreso\"].sum()\nactual = None\nanterior = None\nprint(actual, anterior)",
      solucion: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\npor_mes = ventas.groupby(\"fecha\")[\"ingreso\"].sum()\nactual = por_mes.iloc[-1]\nanterior = por_mes.iloc[-2]\nvariacion = round((actual - anterior) / anterior * 100, 1)\nprint(actual, anterior, variacion, \"%\")",
      pistas: ["`por_mes.iloc[-1]` es el último mes y `iloc[-2]` el anterior.", "Variación = (actual - anterior) / anterior × 100."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"188290 177500 6.1 %\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 188290 177500 6.1 %" }
      },
    },
    reto: {
      id: "m43-l3-reto",
      enunciado: "Escribe `estado(real, meta)`: devuelve `\"verde\"` si `real >= meta`, `\"amarillo\"` si `real >= 0.9 * meta` y `\"rojo\"` en otro caso. Es una convención de ejemplo: en un proyecto real los umbrales se acuerdan con el negocio.",
      codigoInicial: "def estado(real, meta):\n    return None\n\nfor real, meta in [(105, 100), (100, 100), (92, 100), (90, 100), (70, 100)]:\n    print(real, meta, estado(real, meta))",
      solucion: "def estado(real, meta):\n    if real >= meta:\n        return \"verde\"\n    if real >= 0.9 * meta:\n        return \"amarillo\"\n    return \"rojo\"\n\nfor real, meta in [(105, 100), (100, 100), (92, 100), (90, 100), (70, 100)]:\n    print(real, meta, estado(real, meta))",
      pistas: ["Evalúa de la condición más exigente a la menos exigente.", "Con `real = 90` y `meta = 100` el resultado es amarillo (`>=` al 90 %)."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"105 100 verde\",\"100 100 verde\",\"92 100 amarillo\",\"90 100 amarillo\",\"70 100 rojo\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 105 100 verde\n100 100 verde\n92 100 amarillo\n90 100 amarillo\n70 100 rojo" }
      },
    },
    verificacion: [
      {
        id: "m43-l3-q1",
        pregunta: "¿Qué debe acompañar a un valor en una tarjeta de KPI?",
        opciones: ["Un adorno", "Una comparación (periodo anterior, meta, año anterior)", "Otro KPI", "Un gráfico circular"],
        respuestaCorrecta: 1,
        explicacion: "Sin comparación, el número no permite saber si el resultado es bueno.",
      },
      {
        id: "m43-l3-q2",
        pregunta: "¿Dónde conviene poner los KPI principales de la página?",
        opciones: ["Abajo a la derecha", "Arriba, donde empieza la lectura", "Escondidos en un tooltip", "En otra página"],
        respuestaCorrecta: 1,
        explicacion: "La mirada empieza arriba a la izquierda; allí va lo más importante.",
      },
      {
        id: "m43-l3-q3",
        pregunta: "¿Quién debe definir los umbrales de un semáforo?",
        opciones: ["Cada lector por su cuenta", "El analista junto con el negocio, y quedar documentados", "Power BI automáticamente", "Nadie"],
        respuestaCorrecta: 1,
        explicacion: "Los umbrales son una convención del negocio: deben acordarse y documentarse.",
      },
    ],
    resumen: ["KPI arriba, gráfico principal en el centro, detalle y filtros después.", "Cada KPI lleva comparación y, si hay meta, un estado con umbrales documentados.", "Misma definición y formato de cada cifra en todo el tablero."],
    proximoPaso: "Cerramos el módulo con accesibilidad, contraste de color y storytelling.",
    conceptos: ["tablero", "kpi", "semaforo"],
  },
  {
    id: "m43-l4",
    moduloId: "modulo-43",
    titulo: "Accesibilidad, contraste y storytelling",
    objetivo: "Calcular la razón de contraste entre dos colores según WCAG, evaluar si cumplen los niveles AA y AAA, y estructurar un mensaje con datos.",
    porQueImporta:
      "Un informe que no se puede leer (texto gris claro sobre blanco, colores que un daltónico no distingue) fracasa aunque los datos sean perfectos. Y un informe sin historia es una colección de gráficos que nadie recuerda.",
    concepto: "**Accesibilidad del color**. Las pautas WCAG (*Web Content Accessibility Guidelines*) definen la **razón de contraste** entre dos colores: un número entre 1 (iguales) y 21 (negro sobre blanco).\n\n- Texto normal: mínimo **4,5 : 1** (nivel AA) o **7 : 1** (nivel AAA).\n- Texto grande (por ejemplo 18 pt o más, o 14 pt en negrita) y elementos gráficos como barras o iconos: mínimo **3 : 1** (AA); 4,5 : 1 para AAA en texto grande.\n\nCálculo: se convierte cada canal sRGB (0–255) a luz lineal, se obtiene la **luminancia relativa** `L = 0,2126·R + 0,7152·G + 0,0722·B` y la razón es `(L_claro + 0,05) / (L_oscuro + 0,05)`. Para cada canal `c` (entre 0 y 1): si `c <= 0,04045`, `c / 12,92`; si no, `((c + 0,055) / 1,055) ^ 2,4`.\n\nOtras prácticas de accesibilidad:\n\n- **No dependas solo del color**: añade etiquetas, formas o texturas. Una parte importante de la población, alrededor de 1 de cada 12 hombres y 1 de cada 200 mujeres según estimaciones habituales, tiene alguna deficiencia de percepción del color (sobre todo rojo-verde).\n- **Texto alternativo** en los visuales para lectores de pantalla (Power BI lo permite) y un orden de tabulación lógico.\n- Tamaños de letra legibles.\n\n**Storytelling con datos**. Un informe memorable sigue una estructura sencilla: **contexto** (qué situación miramos), **hallazgo** (qué dicen los datos) y **acción** (qué recomendamos hacer). Cada gráfico debe aportar a esa historia; el que no aporta, se elimina.",
    ejemploMinimo: "def a_lineal(c):\n    c = c / 255\n    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4\n\ndef luminancia(hex_color):\n    r, g, b = (int(hex_color[i:i + 2], 16) for i in (1, 3, 5))\n    return 0.2126 * a_lineal(r) + 0.7152 * a_lineal(g) + 0.0722 * a_lineal(b)\n\nprint(round(luminancia(\"#ffffff\"), 4), round(luminancia(\"#000000\"), 4))",
    ejemploAplicado: "def a_lineal(c):\n    c = c / 255\n    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4\n\ndef luminancia(h):\n    r, g, b = (int(h[i:i + 2], 16) for i in (1, 3, 5))\n    return 0.2126 * a_lineal(r) + 0.7152 * a_lineal(g) + 0.0722 * a_lineal(b)\n\ndef contraste(c1, c2):\n    l1, l2 = sorted((luminancia(c1), luminancia(c2)), reverse=True)\n    return round((l1 + 0.05) / (l2 + 0.05), 2)\n\nfor texto in (\"#000000\", \"#767676\", \"#999999\"):\n    print(texto, \"sobre blanco:\", contraste(texto, \"#ffffff\"))",
    errorFrecuente: {
      codigo: "Gris claro (#999999) sobre blanco, texto de 10 pt   → contraste 2.85 : 1  (no cumple ni el mínimo de 3 : 1)",
      explicacion:
        "El texto gris claro sobre fondo blanco es uno de los errores más frecuentes en tableros, y uno de los más difíciles de leer en una pantalla con brillo bajo o una proyección. Calcula el contraste o usa un verificador antes de elegir los colores de la plantilla.",
    },
    practicaGuiada: {
      id: "m43-l4-practica",
      enunciado: "Completa `contraste(c1, c2)`: la razón de contraste WCAG entre dos colores hexadecimales, redondeada a 2 decimales (`(L_claro + 0.05) / (L_oscuro + 0.05)`). Ya tienes `luminancia`. El programa imprime el contraste de negro, `#767676` y `#999999` sobre blanco.",
      codigoInicial: "def a_lineal(c):\n    c = c / 255\n    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4\n\ndef luminancia(h):\n    r, g, b = (int(h[i:i + 2], 16) for i in (1, 3, 5))\n    return 0.2126 * a_lineal(r) + 0.7152 * a_lineal(g) + 0.0722 * a_lineal(b)\n\ndef contraste(c1, c2):\n    return None\n\nfor texto in (\"#000000\", \"#767676\", \"#999999\"):\n    print(texto, contraste(texto, \"#ffffff\"))",
      solucion: "def a_lineal(c):\n    c = c / 255\n    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4\n\ndef luminancia(h):\n    r, g, b = (int(h[i:i + 2], 16) for i in (1, 3, 5))\n    return 0.2126 * a_lineal(r) + 0.7152 * a_lineal(g) + 0.0722 * a_lineal(b)\n\ndef contraste(c1, c2):\n    claro, oscuro = sorted((luminancia(c1), luminancia(c2)), reverse=True)\n    return round((claro + 0.05) / (oscuro + 0.05), 2)\n\nfor texto in (\"#000000\", \"#767676\", \"#999999\"):\n    print(texto, contraste(texto, \"#ffffff\"))",
      pistas: ["Ordena las dos luminancias de mayor a menor con `sorted(..., reverse=True)`.", "La razón es `(claro + 0.05) / (oscuro + 0.05)`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"#000000 21.0\",\"#767676 4.54\",\"#999999 2.85\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: #000000 21.0\n#767676 4.54\n#999999 2.85" }
      },
    },
    reto: {
      id: "m43-l4-reto",
      enunciado: "Escribe `nivel(razon, texto_grande=False)`: devuelve `\"AAA\"` si la razón es al menos 7 (4.5 si el texto es grande), `\"AA\"` si es al menos 4.5 (3 si el texto es grande) y `\"No cumple\"` en otro caso. El programa evalúa cuatro casos.",
      codigoInicial: "def nivel(razon, texto_grande=False):\n    return None\n\nfor razon, grande in [(21.0, False), (5.0, False), (3.2, False), (3.2, True)]:\n    print(razon, grande, nivel(razon, grande))",
      solucion: "def nivel(razon, texto_grande=False):\n    aaa, aa = (4.5, 3) if texto_grande else (7, 4.5)\n    if razon >= aaa:\n        return \"AAA\"\n    if razon >= aa:\n        return \"AA\"\n    return \"No cumple\"\n\nfor razon, grande in [(21.0, False), (5.0, False), (3.2, False), (3.2, True)]:\n    print(razon, grande, nivel(razon, grande))",
      pistas: ["Los umbrales de texto grande son 4.5 (AAA) y 3 (AA); los de texto normal, 7 y 4.5.", "Comprueba primero el nivel más exigente."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"21.0 False AAA\",\"5.0 False AA\",\"3.2 False No cumple\",\"3.2 True AA\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 21.0 False AAA\n5.0 False AA\n3.2 False No cumple\n3.2 True AA" }
      },
    },
    verificacion: [
      {
        id: "m43-l4-q1",
        pregunta: "Según WCAG, ¿qué contraste mínimo (nivel AA) necesita el texto normal?",
        opciones: ["2 : 1", "3 : 1", "4,5 : 1", "21 : 1"],
        respuestaCorrecta: 2,
        explicacion: "El nivel AA pide 4,5 : 1 para texto normal y 3 : 1 para texto grande y elementos gráficos.",
      },
      {
        id: "m43-l4-q2",
        pregunta: "¿Por qué no conviene distinguir categorías solo por rojo y verde?",
        opciones: ["Porque son colores feos", "Porque algunas personas con daltonismo no los distinguen", "Porque no existen en Power BI", "Porque ocupan más memoria"],
        respuestaCorrecta: 1,
        explicacion: "La deficiencia rojo-verde es la más común; añade etiquetas, formas o patrones.",
      },
      {
        id: "m43-l4-q3",
        pregunta: "¿Qué estructura sigue una buena historia con datos?",
        opciones: ["Gráfico, gráfico, gráfico", "Contexto, hallazgo y acción", "Solo conclusiones", "Solo tablas"],
        respuestaCorrecta: 1,
        explicacion: "Situar al lector, mostrar qué dicen los datos y proponer qué hacer.",
      },
    ],
    resumen: ["El contraste mínimo (AA) es 4,5 : 1 para texto normal y 3 : 1 para texto grande y elementos gráficos.", "No dependas solo del color: añade etiquetas, formas o texto alternativo.", "Contexto → hallazgo → acción."],
    proximoPaso: "En el siguiente módulo pasamos a Power BI: su flujo de trabajo y la preparación de datos con Power Query.",
    conceptos: ["accesibilidad", "contraste-wcag", "storytelling"],
  },
]
