import type { Lesson } from '../../types'

export const module46Lessons: Lesson[] = [
  {
    id: "m46-l1",
    moduloId: "modulo-46",
    titulo: "Diseñar el informe en Power BI: visuales, interacción y rendimiento",
    objetivo: "Elegir visuales y funciones de interacción de Power BI, aplicar reglas de buen diseño de página y revisar un informe con una lista de comprobación.",
    porQueImporta:
      "Un informe es una herramienta de trabajo: debe responder rápido, ser claro para quien no lo construyó y cargar sin esperas. Estas decisiones de diseño pesan tanto como las medidas DAX.",
    concepto: "> **Nota**: Power BI Desktop no se ejecuta en el navegador de este curso. Las lecciones explican cada paso y practicas su lógica con Python (corrección automática); para el producto final necesitas Power BI Desktop (gratuito, solo Windows) o el servicio web.\n\n**Visuales de uso frecuente**\n\n- **Tarjeta** (y tarjeta de varias filas): cifras clave.\n- **Columnas y barras** (agrupadas o apiladas): comparar categorías.\n- **Líneas** (y áreas): evolución en el tiempo.\n- **Matriz y tabla**: valores exactos y desgloses jerárquicos.\n- **Dispersión**: relación entre dos variables.\n- **Segmentación** (*slicer*): filtros que el lector controla.\n- **Mapa**: solo si la ubicación geográfica es la pregunta.\n\n**Interacción**\n\n- **Filtrado cruzado**: al seleccionar un elemento en un visual, los demás se filtran o resaltan.\n- **Desglose** (*drill down*): bajar en una jerarquía (año → trimestre → mes).\n- **Obtener detalles** (*drill through*): saltar a una página con el detalle de un elemento.\n- **Información sobre herramientas** (*tooltips*): detalle al pasar el ratón.\n- **Marcadores** y botones: vistas guardadas y navegación entre páginas.\n\n**Reglas de diseño de página** (principios del curso, no normas oficiales):\n\n1. Hasta unos **8 visuales** por página; si necesitas más, divide en páginas.\n2. Cada visual tiene **título** claro; los gráficos circulares, **pocas** categorías.\n3. Una página de resumen incluye **KPI** con comparación.\n4. Tema de colores único, fuentes y tamaños coherentes en todo el informe.\n\n**Rendimiento**: muchos visuales por página, medidas pesadas o modelos con columnas innecesarias lo vuelven lento. El **Analizador de rendimiento** (*Performance Analyzer*) de Desktop mide cuánto tarda cada visual. Quita las columnas que no uses, usa un modelo en estrella y evita filtros bidireccionales innecesarios.\n\n**Accesibilidad y móvil**: texto alternativo en los visuales, orden de tabulación lógico, contraste suficiente y, si se va a consultar desde el teléfono, un **diseño móvil** específico.",
    ejemploMinimo: "pagina = {\n    \"nombre\": \"Resumen\",\n    \"visuales\": [\n        {\"tipo\": \"tarjeta\", \"titulo\": \"Ingreso 2024\"},\n        {\"tipo\": \"lineas\", \"titulo\": \"Ingreso mensual\"},\n        {\"tipo\": \"barras\", \"titulo\": \"Ingreso por producto\"},\n    ],\n}\nprint(pagina[\"nombre\"], \"tiene\", len(pagina[\"visuales\"]), \"visuales\")",
    ejemploAplicado: "def revisar(pagina):\n    problemas = []\n    visuales = pagina[\"visuales\"]\n    if len(visuales) > 8:\n        problemas.append(\"demasiados visuales\")\n    if not any(v[\"tipo\"] == \"tarjeta\" for v in visuales):\n        problemas.append(\"sin KPI\")\n    return problemas\n\npagina = {\"nombre\": \"Resumen\", \"visuales\": [{\"tipo\": \"lineas\", \"titulo\": \"Ingreso mensual\"}]}\nprint(revisar(pagina))",
    errorFrecuente: {
      codigo: "Una página con 14 visuales, 3 gráficos circulares de 9 categorías cada uno y sin títulos\n→ el lector no sabe dónde mirar, no puede comparar las porciones y cada interacción tarda varios segundos",
      explicacion:
        "Sobrecargar la página es el error más habitual al empezar con Power BI: «como se puede, lo pongo». Más visuales no significa más información: significa más esfuerzo para el lector y más tiempo de carga. Divide en páginas y deja en cada una una sola pregunta.",
    },
    practicaGuiada: {
      id: "m46-l1-practica",
      enunciado: "Completa `revisar(pagina)` para que devuelva la **lista ordenada alfabéticamente** de problemas: `\"demasiados visuales\"` si hay más de 8 visuales, `\"sin KPI\"` si ninguno es de tipo `\"tarjeta\"` y `\"visual sin titulo\"` si algún visual no tiene el campo `titulo`.",
      codigoInicial: "def revisar(pagina):\n    return None\n\np1 = {\"visuales\": [{\"tipo\": \"tarjeta\", \"titulo\": \"Ingreso\"}, {\"tipo\": \"lineas\", \"titulo\": \"Mensual\"}]}\np2 = {\"visuales\": [{\"tipo\": \"barras\", \"titulo\": \"Por producto\"}, {\"tipo\": \"lineas\"}]}\np3 = {\"visuales\": [{\"tipo\": \"tarjeta\", \"titulo\": f\"KPI {i}\"} for i in range(9)]}\n\nfor p in (p1, p2, p3):\n    print(revisar(p))",
      solucion: "def revisar(pagina):\n    visuales = pagina[\"visuales\"]\n    problemas = []\n    if len(visuales) > 8:\n        problemas.append(\"demasiados visuales\")\n    if not any(v[\"tipo\"] == \"tarjeta\" for v in visuales):\n        problemas.append(\"sin KPI\")\n    if any(\"titulo\" not in v for v in visuales):\n        problemas.append(\"visual sin titulo\")\n    return sorted(problemas)\n\np1 = {\"visuales\": [{\"tipo\": \"tarjeta\", \"titulo\": \"Ingreso\"}, {\"tipo\": \"lineas\", \"titulo\": \"Mensual\"}]}\np2 = {\"visuales\": [{\"tipo\": \"barras\", \"titulo\": \"Por producto\"}, {\"tipo\": \"lineas\"}]}\np3 = {\"visuales\": [{\"tipo\": \"tarjeta\", \"titulo\": f\"KPI {i}\"} for i in range(9)]}\n\nfor p in (p1, p2, p3):\n    print(revisar(p))",
      pistas: ["Acumula los problemas en una lista y devuelve `sorted(problemas)`.", "`any(\"titulo\" not in v for v in visuales)` detecta visuales sin título."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"[]\",\"['sin KPI', 'visual sin titulo']\",\"['demasiados visuales']\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: []\n['sin KPI', 'visual sin titulo']\n['demasiados visuales']" }
      },
    },
    reto: {
      id: "m46-l1-reto",
      enunciado: "Añade a `revisar` la regla del gráfico circular: si hay un visual de tipo `\"circular\"` con **más de 5 categorías** (campo `categorias`), añade el problema `\"circular con muchas partes\"`. Mantén las reglas anteriores y devuelve la lista ordenada.",
      codigoInicial: "def revisar(pagina):\n    return None\n\np1 = {\"visuales\": [{\"tipo\": \"tarjeta\", \"titulo\": \"Ingreso\"}, {\"tipo\": \"circular\", \"titulo\": \"Por categoría\", \"categorias\": 3}]}\np2 = {\"visuales\": [{\"tipo\": \"tarjeta\", \"titulo\": \"Ingreso\"}, {\"tipo\": \"circular\", \"titulo\": \"Por producto\", \"categorias\": 12}]}\np3 = {\"visuales\": [{\"tipo\": \"circular\", \"titulo\": \"Por región\", \"categorias\": 6}]}\n\nfor p in (p1, p2, p3):\n    print(revisar(p))",
      solucion: "def revisar(pagina):\n    visuales = pagina[\"visuales\"]\n    problemas = []\n    if len(visuales) > 8:\n        problemas.append(\"demasiados visuales\")\n    if not any(v[\"tipo\"] == \"tarjeta\" for v in visuales):\n        problemas.append(\"sin KPI\")\n    if any(\"titulo\" not in v for v in visuales):\n        problemas.append(\"visual sin titulo\")\n    if any(v[\"tipo\"] == \"circular\" and v.get(\"categorias\", 0) > 5 for v in visuales):\n        problemas.append(\"circular con muchas partes\")\n    return sorted(problemas)\n\np1 = {\"visuales\": [{\"tipo\": \"tarjeta\", \"titulo\": \"Ingreso\"}, {\"tipo\": \"circular\", \"titulo\": \"Por categoría\", \"categorias\": 3}]}\np2 = {\"visuales\": [{\"tipo\": \"tarjeta\", \"titulo\": \"Ingreso\"}, {\"tipo\": \"circular\", \"titulo\": \"Por producto\", \"categorias\": 12}]}\np3 = {\"visuales\": [{\"tipo\": \"circular\", \"titulo\": \"Por región\", \"categorias\": 6}]}\n\nfor p in (p1, p2, p3):\n    print(revisar(p))",
      pistas: ["`v.get(\"categorias\", 0)` evita errores en visuales sin ese campo.", "Una página puede tener varios problemas a la vez."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"[]\",\"['circular con muchas partes']\",\"['circular con muchas partes', 'sin KPI']\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: []\n['circular con muchas partes']\n['circular con muchas partes', 'sin KPI']" }
      },
    },
    verificacion: [
      {
        id: "m46-l1-q1",
        pregunta: "¿Qué es el «filtrado cruzado» en un informe de Power BI?",
        opciones: ["Un error de datos", "Que al seleccionar un elemento en un visual, los demás se filtran o resaltan", "Una función de DAX", "Un tipo de gráfico"],
        respuestaCorrecta: 1,
        explicacion: "Permite explorar los datos haciendo clic, sin configurar filtros manuales.",
      },
      {
        id: "m46-l1-q2",
        pregunta: "¿Para qué sirve el Analizador de rendimiento?",
        opciones: ["Para cambiar los colores", "Para medir cuánto tarda en cargar cada visual", "Para publicar el informe", "Para crear relaciones"],
        respuestaCorrecta: 1,
        explicacion: "Identifica qué visuales o medidas hacen lento el informe.",
      },
      {
        id: "m46-l1-q3",
        pregunta: "¿Qué acción mejora más un informe sobrecargado?",
        opciones: ["Añadir más visuales", "Dividirlo en páginas, cada una con una pregunta", "Quitar los títulos", "Cambiar la fuente"],
        respuestaCorrecta: 1,
        explicacion: "Menos elementos por página y un propósito claro mejoran la lectura y el rendimiento.",
      },
    ],
    resumen: ["Cada visual responde a una pregunta; usa filtrado cruzado, desglose y tooltips para explorar.", "Hasta unos 8 visuales por página, con título, y KPI con comparación en el resumen.", "Mide el rendimiento y cuida accesibilidad y diseño móvil."],
    proximoPaso: "Ahora publicaremos y protegeremos el acceso con seguridad a nivel de fila.",
    conceptos: ["diseno-de-informe", "interaccion"],
  },
  {
    id: "m46-l2",
    moduloId: "modulo-46",
    titulo: "Publicar, actualizar y proteger datos con seguridad por filas (RLS)",
    objetivo: "Entender cómo se publica y actualiza un informe en el servicio de Power BI y cómo la seguridad a nivel de fila limita lo que ve cada persona.",
    porQueImporta:
      "Un informe que nadie puede consultar no sirve, y uno que muestra a cada persona datos que no debería ver es un problema grave. Publicar bien y proteger bien es parte del trabajo.",
    concepto: "> **Nota**: Power BI Desktop no se ejecuta en el navegador de este curso. Las lecciones explican cada paso y practicas su lógica con Python (corrección automática); para el producto final necesitas Power BI Desktop (gratuito, solo Windows) o el servicio web.\n\n**Publicar**: desde Desktop, *Publicar* envía el informe y su **modelo semántico** (antes llamado «conjunto de datos») a un **área de trabajo** (*workspace*) del servicio. Allí otras personas lo consultan en el navegador o en la aplicación móvil. Para distribuir a mucha gente se empaqueta como una **aplicación** (*app*).\n\n**Actualización de datos**: el informe publicado no se actualiza solo. Se programa una **actualización** (por ejemplo, cada noche). Si la fuente está en una red interna o en un servidor local, hace falta una **puerta de enlace de datos** (*on-premises data gateway*) que conecte el servicio con ella.\n\n**Licencias**: Desktop es gratuito, pero compartir informes con otras personas en el servicio depende de las licencias de la organización (de pago por usuario o mediante una capacidad). Estas condiciones cambian: consulta la página oficial antes de comprometer un plan.\n\n**Cuidado con «Publicar en la web»**: genera un enlace **público**, sin autenticación. Nunca lo uses con datos internos o personales.\n\n**Seguridad a nivel de fila (RLS)**: restringe qué filas del modelo ve cada usuario.\n\n1. En Desktop se definen **roles**, cada uno con un filtro DAX sobre una tabla: por ejemplo `Region[region] = \"Norte\"`.\n2. Para no crear un rol por persona, se usa **RLS dinámica**: una tabla de usuarios (correo → región) y un filtro como `Usuarios[correo] = USERPRINCIPALNAME()`, que compara con el usuario que consulta.\n3. En el servicio se asignan personas o grupos a cada rol, y se prueba con **Ver como** (*View as*).\n\nImportante: la RLS se aplica a quienes **consultan** (rol de espectador); no limita a quienes tienen permisos de edición en el área de trabajo (administrador, miembro, colaborador), que pueden ver todos los datos. Comprueba siempre los permisos del área.\n\nY recuerda que la RLS reduce lo que se **muestra**: no sustituye las políticas de protección de datos personales de tu organización ni del país donde operas.",
    ejemploMinimo: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nventas_norte = ventas[ventas[\"region\"] == \"Norte\"]   # rol estático: Region[region] = \"Norte\"\nprint(\"Filas visibles para el rol Norte:\", len(ventas_norte), \"de\", len(ventas))",
    ejemploAplicado: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nusuarios = pd.DataFrame({\"correo\": [\"ana@aurora.com\", \"luis@aurora.com\", \"luis@aurora.com\"],\n                         \"region\": [\"Norte\", \"Sur\", \"Este\"]})\n\ndef filas_visibles(correo):\n    \"\"\"RLS dinámica: solo las regiones asignadas a ese correo.\"\"\"\n    regiones = usuarios.loc[usuarios[\"correo\"] == correo, \"region\"]\n    return ventas[ventas[\"region\"].isin(regiones)]\n\nfor correo in [\"ana@aurora.com\", \"luis@aurora.com\", \"otro@aurora.com\"]:\n    print(correo, len(filas_visibles(correo)))",
    errorFrecuente: {
      codigo: "Dar el rol «Miembro» del área de trabajo a una persona y esperar que la RLS limite lo que ve\n→ los miembros pueden editar el contenido y ven todos los datos; la RLS solo se aplica a quienes tienen acceso de espectador",
      explicacion:
        "La RLS no es una barrera para quienes tienen permisos de edición sobre el área de trabajo. Si una persona debe ver solo parte de los datos, comparte el informe con ella como espectador (por ejemplo, a través de una aplicación) y asígnala al rol de RLS correspondiente; después compruébalo con «Ver como».",
    },
    practicaGuiada: {
      id: "m46-l2-practica",
      enunciado: "Simula un **rol estático**: filtra `ventas` a la región `Norte` y calcula el ingreso total visible en ese rol, junto con cuántos registros (filas) ve. Imprime `filas ingreso`.",
      codigoInicial: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nvisibles = ventas\nprint(len(visibles), visibles[\"ingreso\"].sum())",
      solucion: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nvisibles = ventas[ventas[\"region\"] == \"Norte\"]\nprint(len(visibles), visibles[\"ingreso\"].sum())",
      pistas: ["Filtra con `ventas[ventas[\"region\"] == \"Norte\"]`.", "Imprime `len(...)` y la suma de `ingreso`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"120 963870\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 120 963870" }
      },
    },
    reto: {
      id: "m46-l2-reto",
      enunciado: "Simula la **RLS dinámica**: con la tabla `usuarios` (correo → región; un correo puede tener varias regiones), escribe `ingreso_visible(correo)` que devuelva el ingreso total de las regiones asignadas a ese correo (0 si no tiene ninguna). Imprime `correo ingreso` para los cuatro correos de prueba.",
      codigoInicial: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nusuarios = pd.DataFrame({\n    \"correo\": [\"ana@aurora.com\", \"luis@aurora.com\", \"luis@aurora.com\",\n               \"dir@aurora.com\", \"dir@aurora.com\", \"dir@aurora.com\", \"dir@aurora.com\"],\n    \"region\": [\"Norte\", \"Sur\", \"Este\", \"Norte\", \"Sur\", \"Este\", \"Oeste\"],\n})\n\ndef ingreso_visible(correo):\n    return None\n\nfor correo in [\"ana@aurora.com\", \"luis@aurora.com\", \"dir@aurora.com\", \"nadie@aurora.com\"]:\n    print(correo, ingreso_visible(correo))",
      solucion: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nusuarios = pd.DataFrame({\n    \"correo\": [\"ana@aurora.com\", \"luis@aurora.com\", \"luis@aurora.com\",\n               \"dir@aurora.com\", \"dir@aurora.com\", \"dir@aurora.com\", \"dir@aurora.com\"],\n    \"region\": [\"Norte\", \"Sur\", \"Este\", \"Norte\", \"Sur\", \"Este\", \"Oeste\"],\n})\n\ndef ingreso_visible(correo):\n    regiones = usuarios.loc[usuarios[\"correo\"] == correo, \"region\"]\n    return int(ventas[ventas[\"region\"].isin(regiones)][\"ingreso\"].sum())\n\nfor correo in [\"ana@aurora.com\", \"luis@aurora.com\", \"dir@aurora.com\", \"nadie@aurora.com\"]:\n    print(correo, ingreso_visible(correo))",
      pistas: ["Obtén las regiones del correo con `usuarios.loc[usuarios[\"correo\"] == correo, \"region\"]`.", "Filtra `ventas` con `isin(regiones)`; sin regiones, la suma es 0."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"ana@aurora.com 963870\",\"luis@aurora.com 1958950\",\"dir@aurora.com 3895790\",\"nadie@aurora.com 0\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: ana@aurora.com 963870\nluis@aurora.com 1958950\ndir@aurora.com 3895790\nnadie@aurora.com 0" }
      },
    },
    verificacion: [
      {
        id: "m46-l2-q1",
        pregunta: "¿Qué hace la seguridad a nivel de fila (RLS)?",
        opciones: ["Cifra el archivo", "Restringe qué filas del modelo puede ver cada usuario", "Acelera el informe", "Elimina duplicados"],
        respuestaCorrecta: 1,
        explicacion: "Un filtro DAX por rol limita los datos visibles para cada consulta.",
      },
      {
        id: "m46-l2-q2",
        pregunta: "¿A quién NO limita la RLS aunque esté configurada?",
        opciones: ["A los espectadores", "A quienes tienen permisos de edición en el área de trabajo", "A nadie", "A todos"],
        respuestaCorrecta: 1,
        explicacion: "Administradores, miembros y colaboradores pueden ver todos los datos del modelo.",
      },
      {
        id: "m46-l2-q3",
        pregunta: "¿Cuándo se necesita una puerta de enlace de datos?",
        opciones: ["Siempre", "Cuando la fuente está en una red interna o servidor local", "Solo con archivos CSV en la nube", "Nunca"],
        respuestaCorrecta: 1,
        explicacion: "Conecta el servicio en la nube con fuentes locales para poder actualizarlas.",
      },
    ],
    resumen: ["Publicar envía informe y modelo al servicio; la actualización de datos se programa.", "La RLS (estática o dinámica) limita las filas visibles, pero no a quienes pueden editar.", "«Publicar en la web» es público: no lo uses con datos internos."],
    proximoPaso: "Reunimos todo en el proyecto final del curso: el tablero de Aurora.",
    conceptos: ["publicar-power-bi", "rls"],
  },
  {
    id: "m46-l3",
    moduloId: "modulo-46",
    titulo: "Proyecto: tablero de ventas de la tienda Aurora",
    objetivo: "Construir un tablero completo en Power BI Desktop (preparación, modelo, medidas y diseño) y verificarlo con cifras de control calculadas en Python.",
    porQueImporta:
      "Un proyecto terminado, con datos, modelo y decisiones documentadas, es lo que se enseña en una entrevista o en un portafolio. Verificar contra cifras de control calculadas por otra vía es la práctica profesional que distingue un tablero confiable de uno que «parece bien».",
    concepto: "> **Nota**: Power BI Desktop no se ejecuta en el navegador de este curso. Las lecciones explican cada paso y practicas su lógica con Python (corrección automática); para el producto final necesitas Power BI Desktop (gratuito, solo Windows) o el servicio web.\n\n**El caso**: la dirección de la tienda Aurora quiere un tablero para responder: **¿cómo van las ventas?, ¿qué productos y regiones impulsan el crecimiento? y ¿dónde hay que actuar?**\n\n**Datos**: descarga [`ventas-aurora.csv`](/datos/ventas-aurora.csv) (480 registros: 24 meses, 5 productos y 4 regiones; datos **sintéticos** creados para el curso). Columnas: `fecha`, `producto`, `categoria`, `region`, `unidades`, `precio_unitario`.\n\n**Pasos**\n\n1. **Obtener y transformar** (Power Query): cargar el CSV, fijar tipos (fecha, números enteros), comprobar el perfil de calidad.\n2. **Modelar**: dimensiones `Producto` (producto, categoría) y `Region`, y una tabla `Calendario` marcada como tabla de fechas; hechos `Ventas`; relaciones 1:*.\n3. **Medidas DAX** (en una tabla de medidas): `Ingreso` (`SUMX`), `Unidades`, `Ingreso año anterior` (`SAMEPERIODLASTYEAR`), `Var % año anterior`, `Ingreso YTD`, `% del total`, `Ranking producto`.\n4. **Informe**, dos páginas: **Resumen** (tarjetas de KPI con comparación, evolución mensual del ingreso, ingreso por categoría) y **Detalle** (matriz producto × región, ranking, segmentaciones de año y región).\n5. **Verificar** con las cifras de control de esta lección.\n6. **Publicar** (si tienes el servicio) o exportar a PDF/capturas y documentar en el repositorio de tu portafolio.\n\n**Rúbrica de autoevaluación (100 puntos)**\n\n- Datos: tipos correctos y perfil de calidad revisado (10).\n- Modelo: estrella, relaciones 1:* con filtro único, tabla de fechas marcada (20).\n- Medidas: correctas, con nombres claros y formato (25).\n- Diseño: título con mensaje, KPI con comparación, máximo ~8 visuales por página, color con intención (20).\n- Interacción: segmentaciones y filtrado cruzado funcionan sin romper cifras (10).\n- Verificación y documentación: cifras de control coinciden; el repositorio explica decisiones y límites (15).\n\nEste curso **no puede evaluar automáticamente** tu archivo de Power BI: la rúbrica sirve para autoevaluarte o para que alguien con experiencia te dé retroalimentación. Lo que sí se corrige aquí son las **cifras de control**.",
    ejemploMinimo: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\npor_anio = ventas.groupby(ventas[\"fecha\"].str[:4])[\"ingreso\"].sum()\nprint(por_anio)",
    ejemploAplicado: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nv23 = ventas[ventas[\"fecha\"] < \"2024-01-01\"][\"ingreso\"].sum()\nv24 = ventas[ventas[\"fecha\"] >= \"2024-01-01\"][\"ingreso\"].sum()\nprint(\"Ingreso 2023:\", v23)\nprint(\"Ingreso 2024:\", v24)\nprint(\"Variación:\", round((v24 - v23) / v23 * 100, 1), \"%\")",
    errorFrecuente: {
      codigo: "Ingreso 2024 en Power BI: 2 412 000      Ingreso 2024 calculado en Python: 2 122 730\n→ ¿cuál está bien?",
      explicacion:
        "Cuando dos fuentes no coinciden, no se publica: se investiga. Las causas habituales son una relación con claves duplicadas (el total se infla), un filtro de página olvidado, un tipo de dato mal convertido o filas excluidas en Power Query. Las cifras de control calculadas por otro camino sirven justo para detectar esto antes de que lo vea la dirección.",
    },
    practicaGuiada: {
      id: "m46-l3-practica",
      enunciado: "Calcula las **cifras de control** del proyecto y compáralas con las de tu tablero: ingreso total de 2023, ingreso total de 2024 y la variación porcentual 2024 vs 2023 (1 decimal). Imprime tres líneas: `2023 valor`, `2024 valor` y `variacion %`.",
      codigoInicial: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nresultado = None\nprint(resultado)",
      solucion: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nv23 = ventas[ventas[\"fecha\"] < \"2024-01-01\"][\"ingreso\"].sum()\nv24 = ventas[ventas[\"fecha\"] >= \"2024-01-01\"][\"ingreso\"].sum()\nprint(\"2023\", v23)\nprint(\"2024\", v24)\nprint(\"variacion\", round((v24 - v23) / v23 * 100, 1), \"%\")",
      pistas: ["Separa 2023 y 2024 con la columna `fecha` (texto `AAAA-MM-DD`).", "Variación = (2024 - 2023) / 2023 × 100."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"2023 1773060\",\"2024 2122730\",\"variacion 19.7 %\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 2023 1773060\n2024 2122730\nvariacion 19.7 %" }
      },
    },
    reto: {
      id: "m46-l3-reto",
      enunciado: "Encuentra los **hallazgos** para el resumen ejecutivo: el **producto** y la **región** con mayor crecimiento del ingreso en 2024 frente a 2023. Imprime dos líneas: `producto X +Y %` y `region X +Y %` (1 decimal).",
      codigoInicial: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nresultado = None\nprint(resultado)",
      solucion: "import pandas as pd\n\nPRODUCTOS = [(\"Laptop\", \"Tecnologia\", 2400), (\"Monitor\", \"Tecnologia\", 700), (\"Teclado\", \"Accesorios\", 90),\n             (\"Mouse\", \"Accesorios\", 40), (\"Silla\", \"Oficina\", 300)]\nREGIONES = [\"Norte\", \"Sur\", \"Este\", \"Oeste\"]\n\ndef generar_ventas(meses=24):\n    \"\"\"Ventas sintéticas de la tienda Aurora: un registro por mes, producto y región (desde 2023-01).\"\"\"\n    filas = []\n    for m in range(meses):\n        fecha = f\"{2023 + m // 12}-{m % 12 + 1:02d}-01\"\n        for i, (producto, categoria, precio) in enumerate(PRODUCTOS):\n            for j, region in enumerate(REGIONES):\n                unidades = 5 + (m * 3 + i * 7 + j * 5) % 11 + m // 6\n                filas.append((fecha, producto, categoria, region, unidades, precio))\n    return pd.DataFrame(filas, columns=[\"fecha\", \"producto\", \"categoria\", \"region\", \"unidades\", \"precio_unitario\"])\n\nventas = generar_ventas()\nventas[\"ingreso\"] = ventas[\"unidades\"] * ventas[\"precio_unitario\"]\n\nv23 = ventas[ventas[\"fecha\"] < \"2024-01-01\"]\nv24 = ventas[ventas[\"fecha\"] >= \"2024-01-01\"]\n\ndef mayor_crecimiento(columna):\n    a = v23.groupby(columna)[\"ingreso\"].sum()\n    b = v24.groupby(columna)[\"ingreso\"].sum()\n    crecimiento = ((b - a) / a * 100).round(1)\n    return crecimiento.idxmax(), crecimiento.max()\n\nfor columna in (\"producto\", \"region\"):\n    nombre, valor = mayor_crecimiento(columna)\n    print(columna, nombre, f\"+{valor} %\")",
      pistas: ["Calcula el ingreso por grupo en 2023 y en 2024 y la variación porcentual.", "`idxmax()` devuelve el grupo con el mayor valor."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"producto Monitor +21.7 %\",\"region Norte +21.8 %\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: producto Monitor +21.7 %\nregion Norte +21.8 %" }
      },
    },
    verificacion: [
      {
        id: "m46-l3-q1",
        pregunta: "¿Para qué sirven las cifras de control?",
        opciones: ["Para decorar el informe", "Para verificar el tablero contra un cálculo independiente", "Para publicar más rápido", "Para ordenar las tablas"],
        respuestaCorrecta: 1,
        explicacion: "Si el tablero y el cálculo independiente no coinciden, hay un error por encontrar antes de presentar.",
      },
      {
        id: "m46-l3-q2",
        pregunta: "¿Qué suele ocurrir si la clave de una dimensión tiene duplicados?",
        opciones: ["Nada", "Los totales pueden inflarse al combinar", "Se acelera el modelo", "Se cierra Power BI"],
        respuestaCorrecta: 1,
        explicacion: "Las filas se multiplican en la relación: revisa siempre la unicidad de las claves.",
      },
      {
        id: "m46-l3-q3",
        pregunta: "¿Puede este curso corregir automáticamente tu archivo .pbix?",
        opciones: ["Sí", "No: se autoevalúa con la rúbrica y se verifican las cifras de control", "Solo si lo subes", "Solo en Mac"],
        respuestaCorrecta: 1,
        explicacion: "Las lecciones corrigen la lógica en Python; el archivo de Power BI se revisa con la rúbrica.",
      },
    ],
    resumen: ["Un tablero completo: datos preparados, modelo en estrella, medidas, informe de dos páginas y verificación.", "Las cifras de control calculadas por otra vía detectan errores antes de presentar.", "Documenta decisiones y límites en tu portafolio."],
    proximoPaso: "¡Has completado el curso de Visualización y Power BI! El siguiente paso de la ruta es Comunicación y negocio, y después Machine Learning.",
    conceptos: ["proyecto-power-bi", "cifras-de-control"],
  },
]
