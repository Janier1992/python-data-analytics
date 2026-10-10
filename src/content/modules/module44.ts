import type { Lesson } from '../../types'

export const module44Lessons: Lesson[] = [
  {
    id: "m44-l1",
    moduloId: "modulo-44",
    titulo: "Power BI: el flujo de trabajo y la calidad de los datos",
    objetivo: "Entender las piezas de Power BI y el flujo obtener → transformar → modelar → visualizar → publicar, y perfilar la calidad de los datos antes de usarlos.",
    porQueImporta:
      "Antes de aprender botones conviene entender el mapa: qué hace cada pieza y en qué orden. Y la mayor parte del tiempo de un proyecto de BI se va en preparar y validar datos, no en dibujar gráficos.",
    concepto: "> **Nota**: Power BI Desktop no se ejecuta dentro del navegador de este curso. Aquí practicas la **lógica** de cada paso con Python (que se corrige automáticamente) y, en paralelo, puedes repetirlo en Power BI Desktop (gratuito, solo para Windows) o en el servicio web de Power BI.\n\n**Las piezas de Power BI**\n\n- **Power BI Desktop**: la aplicación gratuita donde se construyen los informes. Es solo para **Windows**; en Mac se usa una máquina virtual con Windows o el editor web del servicio, con funciones más limitadas.\n- **Servicio de Power BI** (en la nube, en el navegador): donde se publican, comparten y actualizan los informes. Compartir con otras personas suele requerir licencias de pago o una capacidad de Microsoft Fabric; las condiciones cambian con frecuencia, así que consulta la página oficial de licencias antes de planificar un despliegue.\n- **Power BI Mobile**: aplicación para consultar informes desde el teléfono.\n\n**El flujo de trabajo**\n\n1. **Obtener datos**: conectar con archivos (Excel, CSV), bases de datos (SQL), servicios en línea…\n2. **Transformar** con **Power Query** (lenguaje M): limpiar, cambiar tipos, combinar, filtrar. Cada paso queda registrado y se repite en cada actualización.\n3. **Modelar**: relacionar tablas (modelo en estrella) y crear **medidas** con **DAX**.\n4. **Visualizar**: construir las páginas del informe.\n5. **Publicar y compartir**: enviar al servicio, programar la actualización de datos y controlar quién ve qué.\n\nEl archivo de Desktop es un `.pbix` (o un proyecto `.pbip` con carpetas de texto, mejor para control de versiones con Git).\n\n**Perfilado de datos**: Power Query muestra por columna el porcentaje de valores válidos, errores y vacíos, y el número de valores distintos. Haz ese diagnóstico siempre antes de modelar: aquí lo hacemos con pandas.\n\nLos datos de práctica del curso son sintéticos: las ventas de una tienda ficticia, «Aurora», con 480 registros en 24 meses. Puedes descargarlos en [`ventas-aurora.csv`](/datos/ventas-aurora.csv) para usarlos también en Power BI.",
    ejemploMinimo: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nprint(ventas.dtypes)\nprint(\"Filas:\", len(ventas))\nprint(\"Fecha mínima y máxima:\", ventas[\"fecha\"].min(), ventas[\"fecha\"].max())",
    ejemploAplicado: "import pandas as pd\nfrom io import StringIO\n\ntexto = \"\"\"fecha,producto,unidades\n2024-01-05,Mouse,10\n2024-01-06,Teclado,\n2024-01-07,Mouse,abc\n2024-01-07,Mouse,10\n\"\"\"\ndf = pd.read_csv(StringIO(texto))\nperfil = pd.DataFrame({\n    \"tipo\": df.dtypes.astype(str),\n    \"vacios\": df.isna().sum(),\n    \"distintos\": df.nunique(),\n})\nprint(perfil)",
    errorFrecuente: {
      codigo: "fecha,monto\n2024-03-01,\"1,200.50\"       → como texto: pandas (y Power Query) no lo reconocen como número hasta limpiarlo",
      explicacion:
        "Los datos que parecen números pero llegan como texto (con comas de miles, símbolos de moneda o espacios) son una fuente clásica de errores: las sumas dan 0 o falla la conversión. Revisa siempre el tipo de cada columna y la configuración regional con la que se leen los números y las fechas.",
    },
    practicaGuiada: {
      id: "m44-l1-practica",
      enunciado: "Construye el **perfil de calidad** de la tabla `df`: para cada columna, imprime una línea `columna: vacios=X distintos=Y` (valores vacíos y valores distintos, sin contar los vacíos). Usa `df.isna().sum()` y `df.nunique()`.",
      codigoInicial: "import pandas as pd\nfrom io import StringIO\n\ndf = pd.read_csv(StringIO(\"\"\"producto,region,unidades\nMouse,Norte,10\nMouse,Sur,\nTeclado,Norte,5\nTeclado,,5\nMouse,Norte,10\n\"\"\"))\n\nfor columna in df.columns:\n    print(columna)",
      solucion: "import pandas as pd\nfrom io import StringIO\n\ndf = pd.read_csv(StringIO(\"\"\"producto,region,unidades\nMouse,Norte,10\nMouse,Sur,\nTeclado,Norte,5\nTeclado,,5\nMouse,Norte,10\n\"\"\"))\n\nfor columna in df.columns:\n    print(f\"{columna}: vacios={df[columna].isna().sum()} distintos={df[columna].nunique()}\")",
      pistas: ["Para cada columna: `df[columna].isna().sum()` y `df[columna].nunique()`.", "`nunique()` ya ignora los vacíos."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"producto: vacios=0 distintos=2\",\"region: vacios=1 distintos=2\",\"unidades: vacios=1 distintos=2\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: producto: vacios=0 distintos=2\nregion: vacios=1 distintos=2\nunidades: vacios=1 distintos=2" }
      },
    },
    reto: {
      id: "m44-l1-reto",
      enunciado: "La columna `monto` llegó como texto con errores. Conviértela a número con `pd.to_numeric(..., errors=\"coerce\")` (lo no convertible queda vacío, como el «Error» de Power Query) e imprime cuántos valores no se pudieron convertir y la suma de los válidos.",
      codigoInicial: "import pandas as pd\n\ndf = pd.DataFrame({\"monto\": [\"100\", \"250\", \"N/A\", \"75\", \"abc\", \"300\"]})\n\nerrores = None\ntotal = None\nprint(errores, total)",
      solucion: "import pandas as pd\n\ndf = pd.DataFrame({\"monto\": [\"100\", \"250\", \"N/A\", \"75\", \"abc\", \"300\"]})\n\ndf[\"monto\"] = pd.to_numeric(df[\"monto\"], errors=\"coerce\")\nerrores = df[\"monto\"].isna().sum()\ntotal = df[\"monto\"].sum()\nprint(errores, total)",
      pistas: ["`pd.to_numeric(df[\"monto\"], errors=\"coerce\")` pone NaN donde no puede convertir.", "Cuenta los NaN con `isna().sum()`; `sum()` ignora los NaN."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"2 725.0\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 2 725.0" }
      },
    },
    verificacion: [
      {
        id: "m44-l1-q1",
        pregunta: "¿En qué sistema operativo se ejecuta Power BI Desktop?",
        opciones: ["Windows", "Windows, Mac y Linux", "Solo en el navegador", "Solo en Mac"],
        respuestaCorrecta: 0,
        explicacion: "Power BI Desktop es solo para Windows. En Mac se usa una máquina virtual o el servicio web, con funciones más limitadas.",
      },
      {
        id: "m44-l1-q2",
        pregunta: "¿Cuál es el orden habitual del flujo de trabajo en Power BI?",
        opciones: ["Visualizar, transformar, modelar, publicar", "Obtener datos, transformar, modelar, visualizar, publicar", "Publicar, visualizar, modelar", "Modelar, obtener datos, publicar"],
        respuestaCorrecta: 1,
        explicacion: "Primero se obtienen y preparan los datos; después se modelan y se visualizan; al final se publican.",
      },
      {
        id: "m44-l1-q3",
        pregunta: "¿Para qué sirve perfilar los datos?",
        opciones: ["Para dar color a las columnas", "Para conocer vacíos, errores y valores distintos antes de modelar", "Para publicar el informe", "Para ordenar las tablas"],
        respuestaCorrecta: 1,
        explicacion: "El perfil revela problemas de calidad que, si no se detectan, contaminan todos los cálculos posteriores.",
      },
    ],
    resumen: ["Desktop (Windows, gratis) construye; el Servicio publica y comparte (licencias aparte).", "Flujo: obtener → transformar (Power Query) → modelar (DAX) → visualizar → publicar.", "Perfila siempre los datos antes de modelar."],
    proximoPaso: "Veremos las transformaciones de Power Query más usadas y su equivalente en pandas.",
    conceptos: ["power-bi", "perfilado-de-datos"],
  },
  {
    id: "m44-l2",
    moduloId: "modulo-44",
    titulo: "Power Query: transformaciones y su equivalente en pandas",
    objetivo: "Conocer las transformaciones esenciales de Power Query (filtrar, tipos, anular dinamización, combinar, agrupar) y reproducirlas con pandas.",
    porQueImporta:
      "Power Query convierte tareas que en Excel se hacían a mano en pasos repetibles. Quien entiende la lógica (unpivot, merge, group by) la aplica igual en Power Query, pandas o SQL.",
    concepto: "> **Nota**: Power BI Desktop no se ejecuta dentro del navegador de este curso. Aquí practicas la **lógica** de cada paso con Python (que se corrige automáticamente) y, en paralelo, puedes repetirlo en Power BI Desktop (gratuito, solo para Windows) o en el servicio web de Power BI.\n\nEn Power Query cada acción de la interfaz genera un paso en un lenguaje llamado **M**. Los más usados y su equivalente en pandas:\n\n- **Filtrar filas**: `Table.SelectRows(Origen, each [unidades] > 0)` → `df[df[\"unidades\"] > 0]`.\n- **Quitar columnas**: `Table.RemoveColumns(Origen, {\"nota\"})` → `df.drop(columns=[\"nota\"])`.\n- **Cambiar tipo**: `Table.TransformColumnTypes(Origen, {{\"fecha\", type date}})` → `pd.to_datetime`, `astype`.\n- **Columna nueva**: `Table.AddColumn(Origen, \"ingreso\", each [unidades] * [precio])` → `df[\"ingreso\"] = df[\"unidades\"] * df[\"precio\"]`.\n- **Quitar duplicados**: `Table.Distinct(Origen)` → `df.drop_duplicates()`.\n- **Rellenar hacia abajo**: `Table.FillDown(Origen, {\"region\"})` → `df[\"region\"].ffill()`.\n- **Agrupar**: `Table.Group(Origen, {\"region\"}, {{\"total\", each List.Sum([ingreso]), type number}})` → `groupby().sum()`.\n- **Anular dinamización** (columnas → filas): `Table.UnpivotOtherColumns(Origen, {\"producto\"}, \"mes\", \"ventas\")` → `pd.melt`.\n- **Combinar consultas** (como un JOIN): `Table.NestedJoin(...)` y luego expandir → `df.merge(...)`.\n- **Anexar consultas** (apilar tablas con las mismas columnas): `Table.Combine({t1, t2})` → `pd.concat`.\n\n**Anular dinamización** es la transformación que más tiempo ahorra: los informes de Excel suelen venir con un mes por columna (formato ancho), pero para analizar y graficar se necesita un formato largo, con una columna «mes» y otra «ventas».\n\n**Plegado de consultas** (*query folding*): cuando la fuente es una base de datos, Power Query intenta traducir los pasos a una sola consulta SQL que se ejecuta en el servidor, mucho más rápido que traer todos los datos. Conviene hacer primero los pasos que se pueden plegar (filtros, selección de columnas) y dejar para el final los que lo impiden.",
    ejemploMinimo: "import pandas as pd\n\nancho = pd.DataFrame({\"producto\": [\"Mouse\", \"Teclado\"], \"ene\": [10, 5], \"feb\": [12, 7]})\nlargo = ancho.melt(id_vars=\"producto\", var_name=\"mes\", value_name=\"ventas\")\nprint(largo)",
    ejemploAplicado: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\ncatalogo = pd.DataFrame({\"producto\": [\"Laptop\", \"Monitor\", \"Teclado\", \"Mouse\", \"Silla\"],\n                         \"proveedor\": [\"TechCo\", \"TechCo\", \"PerifSA\", \"PerifSA\", \"OficinaPlus\"]})\n\nunion = ventas.merge(catalogo, on=\"producto\", how=\"left\")\nprint(union.groupby(\"proveedor\")[\"ingreso\"].sum())",
    errorFrecuente: {
      codigo: "Combinar consultas con una columna que tiene espacios o mayúsculas distintas (\"Mouse \" frente a \"mouse\")\n→ Las filas no encuentran pareja y el resultado trae valores vacíos (null) en las columnas de la otra tabla",
      explicacion:
        "Los combinados fallan casi siempre por claves sucias: espacios al final, mayúsculas distintas, tipos diferentes (número frente a texto). Antes de combinar, limpia las claves (recortar espacios, unificar mayúsculas, igualar tipos) y comprueba cuántas filas quedan sin pareja.",
    },
    practicaGuiada: {
      id: "m44-l2-practica",
      enunciado: "La tabla `ancho` tiene un mes por columna. **Anula su dinamización** (`melt`) a formato largo con las columnas `producto`, `mes` y `ventas`, y luego imprime el total de ventas por mes (`ene`, `feb`, `mar`, en ese orden).",
      codigoInicial: "import pandas as pd\n\nancho = pd.DataFrame({\n    \"producto\": [\"Mouse\", \"Teclado\", \"Monitor\"],\n    \"ene\": [10, 5, 2],\n    \"feb\": [12, 7, 3],\n    \"mar\": [9, 8, 4],\n})\n\nlargo = None\nprint(largo)",
      solucion: "import pandas as pd\n\nancho = pd.DataFrame({\n    \"producto\": [\"Mouse\", \"Teclado\", \"Monitor\"],\n    \"ene\": [10, 5, 2],\n    \"feb\": [12, 7, 3],\n    \"mar\": [9, 8, 4],\n})\n\nlargo = ancho.melt(id_vars=\"producto\", var_name=\"mes\", value_name=\"ventas\")\ntotales = largo.groupby(\"mes\")[\"ventas\"].sum()\nfor mes in [\"ene\", \"feb\", \"mar\"]:\n    print(mes, totales[mes])",
      pistas: ["`ancho.melt(id_vars=\"producto\", var_name=\"mes\", value_name=\"ventas\")`", "Luego `groupby(\"mes\")[\"ventas\"].sum()`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"ene 17\",\"feb 22\",\"mar 21\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: ene 17\nfeb 22\nmar 21" }
      },
    },
    reto: {
      id: "m44-l2-reto",
      enunciado: "Combina `ventas` con el `catalogo` de proveedores (equivale a **Combinar consultas** con unión externa izquierda) e imprime el ingreso total de 2024 por proveedor, de mayor a menor, redondeado a entero, con el formato `proveedor: ingreso`.",
      codigoInicial: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\ncatalogo = pd.DataFrame({\"producto\": [\"Laptop\", \"Monitor\", \"Teclado\", \"Mouse\", \"Silla\"],\n                         \"proveedor\": [\"TechCo\", \"TechCo\", \"PerifSA\", \"PerifSA\", \"OficinaPlus\"]})\n\nresultado = None\nprint(resultado)",
      solucion: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\ncatalogo = pd.DataFrame({\"producto\": [\"Laptop\", \"Monitor\", \"Teclado\", \"Mouse\", \"Silla\"],\n                         \"proveedor\": [\"TechCo\", \"TechCo\", \"PerifSA\", \"PerifSA\", \"OficinaPlus\"]})\n\nv24 = ventas[ventas[\"fecha\"] >= \"2024-01-01\"]\nunion = v24.merge(catalogo, on=\"producto\", how=\"left\")\npor_proveedor = union.groupby(\"proveedor\")[\"ingreso\"].sum().sort_values(ascending=False)\nfor proveedor, ingreso in por_proveedor.items():\n    print(f\"{proveedor}: {round(ingreso)}\")",
      pistas: ["Filtra primero `fecha >= \"2024-01-01\"`.", "`merge(catalogo, on=\"producto\", how=\"left\")`, luego `groupby(\"proveedor\")`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"TechCo: 1864200\",\"OficinaPlus: 180600\",\"PerifSA: 77930\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: TechCo: 1864200\nOficinaPlus: 180600\nPerifSA: 77930" }
      },
    },
    verificacion: [
      {
        id: "m44-l2-q1",
        pregunta: "¿Qué hace «Anular dinamización de columnas» en Power Query?",
        opciones: ["Une dos tablas", "Convierte columnas (por ejemplo, un mes por columna) en filas", "Elimina duplicados", "Cambia el tipo de dato"],
        respuestaCorrecta: 1,
        explicacion: "Pasa del formato ancho al largo, que es el que se necesita para analizar y graficar.",
      },
      {
        id: "m44-l2-q2",
        pregunta: "¿Qué equivale en pandas a «Combinar consultas» con unión externa izquierda?",
        opciones: ["`pd.concat`", "`df.merge(otra, how=\"left\")`", "`df.melt`", "`df.drop_duplicates`"],
        respuestaCorrecta: 1,
        explicacion: "Combinar consultas es un JOIN: `merge` en pandas.",
      },
      {
        id: "m44-l2-q3",
        pregunta: "¿Qué es el plegado de consultas (*query folding*)?",
        opciones: ["Comprimir el archivo .pbix", "Que Power Query traduzca los pasos a una consulta que ejecuta el servidor de origen", "Plegar visuales en el informe", "Ocultar columnas"],
        respuestaCorrecta: 1,
        explicacion: "Evita traer todos los datos a Power BI: el trabajo lo hace la base de datos.",
      },
    ],
    resumen: ["Cada acción de Power Query es un paso M, repetible en cada actualización.", "Anular dinamización (melt), combinar (merge), anexar (concat) y agrupar son la base.", "Limpia las claves antes de combinar; haz primero los pasos que se pliegan."],
    proximoPaso: "Con los datos limpios, el siguiente paso es el modelo en estrella.",
    conceptos: ["power-query", "unpivot", "merge-queries"],
  },
  {
    id: "m44-l3",
    moduloId: "modulo-44",
    titulo: "Modelo en estrella: hechos, dimensiones y relaciones",
    objetivo: "Separar una tabla plana en tabla de hechos y dimensiones, definir relaciones uno-a-muchos y comprobar la integridad del modelo.",
    porQueImporta:
      "Un buen modelo es la diferencia entre un informe que responde bien y rápido, y uno que da totales incorrectos o se vuelve lento. Casi todos los problemas de DAX que ve un principiante vienen de un modelo mal planteado.",
    concepto: "> **Nota**: Power BI Desktop no se ejecuta dentro del navegador de este curso. Aquí practicas la **lógica** de cada paso con Python (que se corrige automáticamente) y, en paralelo, puedes repetirlo en Power BI Desktop (gratuito, solo para Windows) o en el servicio web de Power BI.\n\n**Tabla de hechos**: registra eventos o transacciones (una venta, un pedido): contiene **medidas numéricas** (unidades, importe) y **claves** hacia las dimensiones. Suele ser la tabla más grande.\n\n**Tablas de dimensión**: describen el contexto por el que se quiere filtrar o agrupar (producto, región, cliente, fecha). Tienen **una fila por elemento**, con una clave única y atributos descriptivos.\n\n**Esquema en estrella**: una tabla de hechos en el centro y las dimensiones alrededor, cada una relacionada con la de hechos mediante una relación **uno a muchos** (`1:*`): un producto aparece en muchas ventas, pero cada venta es de un solo producto.\n\nReglas prácticas:\n\n- La clave de la dimensión debe ser **única** y sin vacíos; si hay duplicados, la relación `1:*` no se puede crear.\n- El filtro viaja **de la dimensión (lado uno) hacia los hechos (lado muchos)**: al seleccionar «Norte» en una segmentación, se filtran las ventas de Norte. Mantén la dirección **única** por defecto; el filtro bidireccional y las relaciones muchos a muchos solo se usan con una razón clara, porque generan ambigüedad y lentitud.\n- **Granularidad**: define qué representa una fila de hechos (aquí: un mes, un producto y una región). Todo debe ser coherente con ella.\n- Evita una única tabla ancha con todo repetido: ocupa más memoria, es más difícil de mantener y complica los cálculos.\n\nPower BI almacena el modelo de forma columnar y comprimida; una dimensión de pocos valores repetidos en millones de filas se comprime muy bien, pero el texto repetido en la tabla de hechos no se comprime igual de bien.",
    ejemploMinimo: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\ndim_producto = ventas[[\"producto\", \"categoria\"]].drop_duplicates().reset_index(drop=True)\nprint(dim_producto)\nprint(\"Claves únicas:\", dim_producto[\"producto\"].is_unique)",
    ejemploAplicado: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\ndim_producto = ventas[[\"producto\", \"categoria\", \"precio_unitario\"]].drop_duplicates().reset_index(drop=True)\ndim_producto[\"id_producto\"] = dim_producto.index + 1\ndim_region = pd.DataFrame({\"region\": REGIONES, \"id_region\": range(1, len(REGIONES) + 1)})\n\nhechos = (ventas\n          .merge(dim_producto[[\"producto\", \"id_producto\"]], on=\"producto\")\n          .merge(dim_region, on=\"region\")\n          [[\"fecha\", \"id_producto\", \"id_region\", \"unidades\"]])\n\nprint(hechos.head(3))\nprint(\"Filas de hechos:\", len(hechos), \"- coincide con la tabla original:\", len(hechos) == len(ventas))",
    errorFrecuente: {
      codigo: "dim_producto con dos filas para \"Mouse\" (una con precio 40 y otra con 45)\n→ no se puede crear la relación uno a muchos: la clave de la dimensión no es única",
      explicacion:
        "Si la «dimensión» tiene claves repetidas, Power BI no puede crear una relación `1:*` (o la convierte en muchos a muchos), y los totales se duplican al combinar. Antes de modelar, verifica que la clave de cada dimensión es única y no tiene vacíos; los cambios de precio se resuelven con una tabla de hechos que lleve el precio vigente o con una dimensión de historial.",
    },
    practicaGuiada: {
      id: "m44-l3-practica",
      enunciado: "Divide la tabla plana en una **dimensión de producto** y una tabla de **hechos**. Con `ventas`, crea `dim_producto` (columnas `producto`, `categoria`, sin duplicados) e imprime cuántas filas tiene y cuántos productos tiene la categoría `Accesorios`, con el formato `filas categoria_accesorios`.",
      codigoInicial: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\ndim_producto = None\nprint(dim_producto)",
      solucion: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\ndim_producto = ventas[[\"producto\", \"categoria\"]].drop_duplicates()\nprint(len(dim_producto), (dim_producto[\"categoria\"] == \"Accesorios\").sum())",
      pistas: ["`ventas[[\"producto\", \"categoria\"]].drop_duplicates()`", "Cuenta con `(dim_producto[\"categoria\"] == \"Accesorios\").sum()`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"5 2\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 5 2" }
      },
    },
    reto: {
      id: "m44-l3-reto",
      enunciado: "Escribe `claves_duplicadas(dim, clave)` que devuelva la **lista ordenada de claves repetidas** de una dimensión (las que impedirían una relación 1:*) y úsala sobre dos dimensiones de prueba. Usa `dim[clave][dim[clave].duplicated()]`.",
      codigoInicial: "import pandas as pd\n\ndef claves_duplicadas(dim, clave):\n    return None\n\nbuena = pd.DataFrame({\"producto\": [\"Mouse\", \"Teclado\", \"Monitor\"], \"categoria\": [\"Acc\", \"Acc\", \"Tec\"]})\nmala = pd.DataFrame({\"producto\": [\"Mouse\", \"Teclado\", \"Mouse\", \"Monitor\", \"Teclado\"], \"precio\": [40, 90, 45, 700, 95]})\n\nprint(claves_duplicadas(buena, \"producto\"))\nprint(claves_duplicadas(mala, \"producto\"))",
      solucion: "import pandas as pd\n\ndef claves_duplicadas(dim, clave):\n    return sorted(dim[clave][dim[clave].duplicated()].unique())\n\nbuena = pd.DataFrame({\"producto\": [\"Mouse\", \"Teclado\", \"Monitor\"], \"categoria\": [\"Acc\", \"Acc\", \"Tec\"]})\nmala = pd.DataFrame({\"producto\": [\"Mouse\", \"Teclado\", \"Mouse\", \"Monitor\", \"Teclado\"], \"precio\": [40, 90, 45, 700, 95]})\n\nprint(claves_duplicadas(buena, \"producto\"))\nprint(claves_duplicadas(mala, \"producto\"))",
      pistas: ["`dim[clave].duplicated()` marca las repeticiones.", "Usa `.unique()` y `sorted(...)` para devolver cada clave una vez, ordenada."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"[]\",\"['Mouse', 'Teclado']\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: []\n['Mouse', 'Teclado']" }
      },
    },
    verificacion: [
      {
        id: "m44-l3-q1",
        pregunta: "En un esquema en estrella, ¿qué tipo de relación une una dimensión con la tabla de hechos?",
        opciones: ["Uno a muchos (`1:*`)", "Muchos a muchos", "Uno a uno siempre", "Ninguna"],
        respuestaCorrecta: 0,
        explicacion: "Una fila de la dimensión se relaciona con muchas filas de hechos.",
      },
      {
        id: "m44-l3-q2",
        pregunta: "¿Por qué es un problema que la clave de una dimensión tenga duplicados?",
        opciones: ["Hace el informe más bonito", "Impide la relación 1:* y puede duplicar los totales", "No tiene ningún efecto", "Solo ocupa más espacio"],
        respuestaCorrecta: 1,
        explicacion: "Para que el filtrado sea correcto, cada valor de la clave debe identificar a una única fila de la dimensión.",
      },
      {
        id: "m44-l3-q3",
        pregunta: "¿En qué dirección viaja el filtro, por defecto, en una relación 1:*?",
        opciones: ["De hechos a dimensión", "De la dimensión (lado uno) a los hechos (lado muchos)", "En ambos sentidos", "No viaja"],
        respuestaCorrecta: 1,
        explicacion: "Al filtrar por una dimensión, se filtran los hechos relacionados. Mantén la dirección única salvo razón clara.",
      },
    ],
    resumen: ["Hechos = eventos con números; dimensiones = contexto con una fila por elemento.", "Relaciones 1:* con filtro de la dimensión hacia los hechos; evita el bidireccional por defecto.", "Comprueba que las claves de las dimensiones son únicas."],
    proximoPaso: "La dimensión más importante de casi todo modelo: la tabla de fechas.",
    conceptos: ["modelo-en-estrella", "hechos-y-dimensiones"],
  },
  {
    id: "m44-l4",
    moduloId: "modulo-44",
    titulo: "La tabla de fechas (calendario) y el tiempo en el modelo",
    objetivo: "Construir una tabla de calendario con las columnas habituales (año, mes, trimestre) y entender por qué el análisis temporal en Power BI la necesita.",
    porQueImporta:
      "Comparar contra el año anterior, acumular en el año o agrupar por trimestre solo funciona bien si existe una tabla de fechas completa y correctamente relacionada. Es la dimensión que más se reutiliza en cualquier proyecto.",
    concepto: "> **Nota**: Power BI Desktop no se ejecuta dentro del navegador de este curso. Aquí practicas la **lógica** de cada paso con Python (que se corrige automáticamente) y, en paralelo, puedes repetirlo en Power BI Desktop (gratuito, solo para Windows) o en el servicio web de Power BI.\n\n**Por qué una tabla de calendario**: la columna de fechas de la tabla de hechos tiene huecos (días sin ventas) y no trae atributos (nombre del mes, trimestre, semana). La **tabla de fechas** tiene:\n\n- **Una fila por día**, sin huecos, que cubre años completos (de 1 de enero a 31 de diciembre).\n- Atributos: año, número y nombre del mes, trimestre, día de la semana…\n- Columnas de **orden**: el nombre del mes ordena alfabéticamente (abril antes que enero), así que se ordena por el número del mes.\n\nEn Power BI se crea con DAX (`Calendario = CALENDAR(DATE(2023,1,1), DATE(2024,12,31))`, o `CALENDARAUTO()`), con Power Query, o se importa desde una tabla existente. Después se relaciona con la tabla de hechos (`Calendario[Fecha]` 1 : * `Ventas[fecha]`) y se **marca como tabla de fechas** (*Mark as date table*), lo que habilita las funciones de inteligencia de tiempo.\n\nDetalles:\n\n- En nuestra tabla, las ventas se registran el primer día de cada mes: la tabla de fechas sigue teniendo todos los días, y la relación enlaza solo los días que existen en los hechos.\n- Power BI puede crear tablas de fechas ocultas automáticamente (*Auto date/time*), pero en modelos serios se suele desactivar y usar una tabla propia, que es la misma para todas las tablas de hechos.\n- Un año bisiesto tiene 366 días: la tabla de 2024 tiene 366 filas.",
    ejemploMinimo: "import pandas as pd\n\ncalendario = pd.DataFrame({\"fecha\": pd.date_range(\"2024-01-01\", \"2024-12-31\", freq=\"D\")})\nprint(len(calendario))\nprint(calendario[\"fecha\"].min().date(), calendario[\"fecha\"].max().date())",
    ejemploAplicado: "import pandas as pd\n\ncalendario = pd.DataFrame({\"fecha\": pd.date_range(\"2024-01-01\", \"2024-12-31\", freq=\"D\")})\ncalendario[\"anio\"] = calendario[\"fecha\"].dt.year\ncalendario[\"mes_num\"] = calendario[\"fecha\"].dt.month\ncalendario[\"trimestre\"] = \"T\" + calendario[\"fecha\"].dt.quarter.astype(str)\ncalendario[\"dia_semana\"] = calendario[\"fecha\"].dt.dayofweek   # 0 = lunes\n\nprint(calendario.head(3))\nprint(calendario[\"trimestre\"].value_counts().sort_index())",
    errorFrecuente: {
      codigo: "Usar solo la columna de fecha de la tabla de hechos para filtrar \"el mismo periodo del año anterior\"\n→ si en el año anterior no hubo ventas en algunos días, esos días no existen y la comparación falla",
      explicacion:
        "Las funciones de inteligencia de tiempo necesitan fechas **continuas** y completas. Con las fechas de la tabla de hechos hay días ausentes, y los cálculos del tipo «mismo periodo del año anterior» dan resultados incorrectos o vacíos. Usa una tabla de calendario propia, que cubra años completos.",
    },
    practicaGuiada: {
      id: "m44-l4-practica",
      enunciado: "Crea el calendario de **2024** (un día por fila) e imprime: cuántas filas tiene, y la última fecha. Usa `pd.date_range(\"2024-01-01\", \"2024-12-31\")`. Formato de salida: `filas ultima_fecha`.",
      codigoInicial: "import pandas as pd\n\ncalendario = None\nprint(calendario)",
      solucion: "import pandas as pd\n\ncalendario = pd.DataFrame({\"fecha\": pd.date_range(\"2024-01-01\", \"2024-12-31\", freq=\"D\")})\nprint(len(calendario), calendario[\"fecha\"].max().date())",
      pistas: ["`pd.date_range(\"2024-01-01\", \"2024-12-31\", freq=\"D\")`", "`.max().date()` para mostrar solo la fecha."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"366 2024-12-31\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 366 2024-12-31" }
      },
    },
    reto: {
      id: "m44-l4-reto",
      enunciado: "Añade al calendario 2024 las columnas `mes` (número) y `trimestre` (`T1`…`T4`) y la **columna de orden** que necesita el nombre del mes. Imprime cuántos días tiene cada trimestre, de `T1` a `T4`, en una línea cada uno (`T1 91`).",
      codigoInicial: "import pandas as pd\n\ncalendario = pd.DataFrame({\"fecha\": pd.date_range(\"2024-01-01\", \"2024-12-31\", freq=\"D\")})\n\ndias = None\nprint(dias)",
      solucion: "import pandas as pd\n\ncalendario = pd.DataFrame({\"fecha\": pd.date_range(\"2024-01-01\", \"2024-12-31\", freq=\"D\")})\ncalendario[\"mes\"] = calendario[\"fecha\"].dt.month\ncalendario[\"trimestre\"] = \"T\" + calendario[\"fecha\"].dt.quarter.astype(str)\n\ndias = calendario.groupby(\"trimestre\").size()\nfor trimestre, n in dias.items():\n    print(trimestre, n)",
      pistas: ["`calendario[\"fecha\"].dt.quarter` da el número del trimestre.", "`groupby(\"trimestre\").size()` cuenta los días."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"T1 91\",\"T2 91\",\"T3 92\",\"T4 92\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: T1 91\nT2 91\nT3 92\nT4 92" }
      },
    },
    verificacion: [
      {
        id: "m44-l4-q1",
        pregunta: "¿Cuántas filas debe tener la tabla de fechas de 2024?",
        opciones: ["365", "366", "12", "52"],
        respuestaCorrecta: 1,
        explicacion: "2024 es bisiesto: 366 días, una fila por día.",
      },
      {
        id: "m44-l4-q2",
        pregunta: "¿Por qué hay que ordenar el nombre del mes por el número del mes?",
        opciones: ["Por estética", "Porque alfabéticamente «abril» iría antes que «enero»", "Porque Power BI no admite texto", "No hace falta"],
        respuestaCorrecta: 1,
        explicacion: "Las columnas de texto se ordenan alfabéticamente; la columna de orden numérica lo corrige.",
      },
      {
        id: "m44-l4-q3",
        pregunta: "¿Qué hace «Marcar como tabla de fechas»?",
        opciones: ["Ocultar la tabla", "Habilitar la inteligencia de tiempo sobre esa tabla", "Eliminar duplicados", "Cambiar el idioma"],
        respuestaCorrecta: 1,
        explicacion: "Le indica a Power BI qué columna contiene las fechas contiguas y completas.",
      },
    ],
    resumen: ["La tabla de fechas tiene una fila por día, sin huecos, en años completos.", "Incluye columnas de atributos y de orden, y se relaciona 1:* con los hechos.", "Es la base de la inteligencia de tiempo en DAX."],
    proximoPaso: "Pasamos a DAX: medidas, contexto de filtro y cálculos de negocio.",
    conceptos: ["tabla-de-fechas", "calendario"],
  },
]
