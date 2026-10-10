import type { Lesson } from '../../types'

export const module51Lessons: Lesson[] = [
  {
    id: "m51-l1",
    moduloId: "modulo-51",
    titulo: "Elegir el proyecto y plantear la pregunta de negocio",
    objetivo: "Elegir un proyecto de portafolio con una pregunta clara, una decisión que informar, una métrica de éxito y un alcance realista, y validar el planteamiento antes de empezar.",
    porQueImporta:
      "Los proyectos que más se recuerdan en una entrevista no son los que usan la técnica más sofisticada, sino los que responden una pregunta real con rigor. Un buen planteamiento ahorra semanas de trabajo en la dirección equivocada.",
    concepto: "> **Nota**: este curso **no puede calificar tu proyecto personal** (no hay servidor ni evaluadores). Lo que sí hace: te da un método, herramientas de autoevaluación y verificaciones automáticas sobre un caso guiado con datos sintéticos. Para que tu proyecto valga en el portafolio, pide retroalimentación a una persona con experiencia (mentores, comunidades, colegas).\n\n**Un buen proyecto de portafolio tiene**\n\n1. **Una pregunta de negocio concreta**: «¿qué clientes tienen más riesgo de darse de baja el próximo mes?» es mejor que «analizar datos de clientes».\n2. **Una decisión que informa**: ¿qué cambiaría alguien con la respuesta? (si no cambia nada, la pregunta no importa).\n3. **Una métrica de éxito**: cómo sabrás que respondiste bien (por ejemplo, F1 mayor que el de una regla simple, o una reducción estimada de bajas).\n4. **Datos accesibles y legales**: fuente, licencia y ausencia de datos personales sin autorización.\n5. **Alcance realista**: de 2 a 6 semanas de trabajo parcial. Mejor un proyecto pequeño terminado y bien documentado que uno enorme a medias.\n6. **Un entregable visible**: un repositorio con README, y un informe, tablero o presentación.\n\n**Dónde conseguir datos** (revisa siempre la licencia y las condiciones de uso de cada conjunto):\n\n- Datos abiertos del gobierno: el portal **datos.gov.co** y las estadísticas del **DANE** (Colombia).\n- **Banco Mundial**, **Our World in Data** y otros organismos internacionales.\n- **Repositorio de aprendizaje automático de UCI** y **Kaggle** (esta última exige cuenta y revisar la licencia de cada conjunto).\n- **Datos propios o de tu trabajo**, con autorización y anonimizados: suelen ser los más valiosos, porque cuentan algo que nadie más tiene.\n\nLos conjuntos más usados en tutoriales (por ejemplo, el del Titanic) aparecen en miles de portafolios: si los usas, aporta una pregunta o un análisis propios.\n\n**Valida el planteamiento antes de empezar**: escribirlo en una ficha (*brief*) obliga a ser concreto. En el ejercicio la ficha es un diccionario y una función la valida.",
    ejemploMinimo: "brief = {\n    \"titulo\": \"Riesgo de baja de clientes\",\n    \"pregunta\": \"¿Qué clientes tienen más riesgo de darse de baja el próximo mes?\",\n    \"decision\": \"A quién ofrecer la campaña de retención\",\n}\nfor campo, valor in brief.items():\n    print(f\"{campo}: {valor}\")",
    ejemploAplicado: "CAMPOS = [\"titulo\", \"pregunta\", \"decision\", \"metrica_exito\", \"datos_fuente\", \"licencia\", \"alcance_semanas\"]\n\nbrief = {\"titulo\": \"Riesgo de baja\", \"pregunta\": \"¿Quién se dará de baja?\", \"decision\": \"A quién llamar\",\n         \"metrica_exito\": \"F1 mayor que la regla simple\", \"datos_fuente\": \"datos de la empresa (anonimizados)\", \"licencia\": \"uso interno\"}\nfaltan = [c for c in CAMPOS if c not in brief]\nprint(\"Faltan:\", faltan)",
    errorFrecuente: {
      codigo: "Título: \"Análisis exploratorio del dataset X\"\nPregunta: (ninguna)  ·  Decisión: (ninguna)  ·  Métrica: (ninguna)",
      explicacion:
        "Un proyecto sin pregunta ni decisión es solo una colección de gráficos: no demuestra que sabes resolver problemas de negocio. Antes de abrir los datos, escribe la pregunta, qué decisión informa y cómo medirás el éxito.",
    },
    practicaGuiada: {
      id: "m51-l1-practica",
      enunciado: "Escribe `validar_brief(brief)`: devuelve la **lista ordenada** de problemas: `\"falta <campo>\"` por cada campo ausente o vacío (campos: `titulo`, `pregunta`, `decision`, `metrica_exito`, `datos_fuente`, `licencia`, `alcance_semanas`); `\"pregunta sin signo de interrogacion\"` si la pregunta no termina en `?`; y `\"alcance fuera de rango\"` si `alcance_semanas` no está entre 1 y 6.",
      codigoInicial: "CAMPOS = [\"titulo\", \"pregunta\", \"decision\", \"metrica_exito\", \"datos_fuente\", \"licencia\", \"alcance_semanas\"]\n\ndef validar_brief(brief):\n    return None\n\nb1 = {\"titulo\": \"Riesgo de baja\", \"pregunta\": \"¿Quién se dará de baja?\", \"decision\": \"A quién llamar\",\n      \"metrica_exito\": \"F1 mayor que la regla simple\", \"datos_fuente\": \"UCI\", \"licencia\": \"CC BY 4.0\", \"alcance_semanas\": 4}\nb2 = {\"titulo\": \"Analisis de ventas\", \"pregunta\": \"Analizar las ventas\", \"alcance_semanas\": 12}\nfor b in (b1, b2):\n    print(validar_brief(b))",
      solucion: "CAMPOS = [\"titulo\", \"pregunta\", \"decision\", \"metrica_exito\", \"datos_fuente\", \"licencia\", \"alcance_semanas\"]\n\ndef validar_brief(brief):\n    problemas = []\n    for campo in CAMPOS:\n        if campo not in brief or brief[campo] in (\"\", None):\n            problemas.append(f\"falta {campo}\")\n    if brief.get(\"pregunta\") and not brief[\"pregunta\"].strip().endswith(\"?\"):\n        problemas.append(\"pregunta sin signo de interrogacion\")\n    semanas = brief.get(\"alcance_semanas\")\n    if semanas is not None and not 1 <= semanas <= 6:\n        problemas.append(\"alcance fuera de rango\")\n    return sorted(problemas)\n\nb1 = {\"titulo\": \"Riesgo de baja\", \"pregunta\": \"¿Quién se dará de baja?\", \"decision\": \"A quién llamar\",\n      \"metrica_exito\": \"F1 mayor que la regla simple\", \"datos_fuente\": \"UCI\", \"licencia\": \"CC BY 4.0\", \"alcance_semanas\": 4}\nb2 = {\"titulo\": \"Analisis de ventas\", \"pregunta\": \"Analizar las ventas\", \"alcance_semanas\": 12}\nfor b in (b1, b2):\n    print(validar_brief(b))",
      pistas: ["Recorre `CAMPOS` y comprueba si cada uno está y no está vacío.", "Devuelve `sorted(problemas)`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"[]\",\"['alcance fuera de rango', 'falta datos_fuente', 'falta decision', 'falta licencia', 'falta metrica_exito', 'pregunta sin signo de interrogacion']\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: []\n['alcance fuera de rango', 'falta datos_fuente', 'falta decision', 'falta licencia', 'falta metrica_exito', 'pregunta sin signo de interrogacion']" }
      },
    },
    reto: {
      id: "m51-l1-reto",
      enunciado: "Usa una **matriz de decisión** para elegir entre tres ideas. Cada idea tiene puntajes de 1 a 5 en `impacto`, `datos` (disponibilidad), `factibilidad` y `originalidad`, con pesos 0.4, 0.3, 0.2 y 0.1. Calcula el puntaje ponderado de cada idea (2 decimales) e imprime el ranking de mayor a menor con el formato `idea puntaje`.",
      codigoInicial: "PESOS = {\"impacto\": 0.4, \"datos\": 0.3, \"factibilidad\": 0.2, \"originalidad\": 0.1}\nideas = {\n    \"riesgo de baja\": {\"impacto\": 5, \"datos\": 4, \"factibilidad\": 4, \"originalidad\": 2},\n    \"prediccion de ventas\": {\"impacto\": 4, \"datos\": 5, \"factibilidad\": 5, \"originalidad\": 2},\n    \"analisis de reclamos con IA\": {\"impacto\": 4, \"datos\": 2, \"factibilidad\": 3, \"originalidad\": 5},\n}\n\nprint(None)",
      solucion: "PESOS = {\"impacto\": 0.4, \"datos\": 0.3, \"factibilidad\": 0.2, \"originalidad\": 0.1}\nideas = {\n    \"riesgo de baja\": {\"impacto\": 5, \"datos\": 4, \"factibilidad\": 4, \"originalidad\": 2},\n    \"prediccion de ventas\": {\"impacto\": 4, \"datos\": 5, \"factibilidad\": 5, \"originalidad\": 2},\n    \"analisis de reclamos con IA\": {\"impacto\": 4, \"datos\": 2, \"factibilidad\": 3, \"originalidad\": 5},\n}\n\npuntajes = {nombre: round(sum(PESOS[c] * v for c, v in notas.items()), 2) for nombre, notas in ideas.items()}\nfor nombre, puntaje in sorted(puntajes.items(), key=lambda par: -par[1]):\n    print(nombre, puntaje)",
      pistas: ["Puntaje = suma de `PESOS[criterio] * nota`.", "Ordena con `sorted(..., key=lambda par: -par[1])`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"prediccion de ventas 4.3\",\"riesgo de baja 4.2\",\"analisis de reclamos con IA 3.3\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: prediccion de ventas 4.3\nriesgo de baja 4.2\nanalisis de reclamos con IA 3.3" }
      },
    },
    verificacion: [
      {
        id: "m51-l1-q1",
        pregunta: "¿Qué hace buena a la pregunta de un proyecto de portafolio?",
        opciones: ["Que sea muy general", "Que sea concreta y su respuesta informe una decisión", "Que use el modelo más complejo", "Que no tenga métrica"],
        respuestaCorrecta: 1,
        explicacion: "Una pregunta concreta, con decisión y métrica de éxito, guía todo el trabajo.",
      },
      {
        id: "m51-l1-q2",
        pregunta: "¿Por qué conviene un alcance de 2 a 6 semanas?",
        opciones: ["Porque Python lo exige", "Porque es mejor un proyecto pequeño terminado que uno enorme a medias", "Porque los datos caducan", "Porque es más barato"],
        respuestaCorrecta: 1,
        explicacion: "Un proyecto terminado y bien documentado demuestra más que uno inconcluso.",
      },
      {
        id: "m51-l1-q3",
        pregunta: "Antes de usar un conjunto de datos público, ¿qué debes revisar?",
        opciones: ["Nada", "Su licencia y condiciones de uso, y que no contenga datos personales sin autorización", "Solo su tamaño", "Solo su formato"],
        respuestaCorrecta: 1,
        explicacion: "La licencia y la privacidad determinan si puedes usar y publicar los datos.",
      },
    ],
    resumen: ["Pregunta concreta, decisión que informa, métrica de éxito, datos legales, alcance realista y entregable visible.", "Valida el planteamiento en una ficha antes de abrir los datos.", "Una matriz de decisión ayuda a elegir entre ideas."],
    proximoPaso: "Ahora prepararemos los datos: fuentes, estructura del repositorio y control de calidad.",
    conceptos: ["proyecto-de-portafolio", "brief"],
  },
  {
    id: "m51-l2",
    moduloId: "modulo-51",
    titulo: "Datos del proyecto: estructura del repositorio y control de calidad",
    objetivo: "Organizar el repositorio de un proyecto reproducible, documentar los datos con un diccionario y detectar problemas de calidad antes de analizar.",
    porQueImporta:
      "Un proyecto que otra persona no puede reproducir pierde credibilidad, y un análisis sobre datos sin revisar produce conclusiones erróneas. La organización y el control de calidad se notan de inmediato al revisar un repositorio.",
    concepto: "> **Nota**: este curso **no puede calificar tu proyecto personal** (no hay servidor ni evaluadores). Lo que sí hace: te da un método, herramientas de autoevaluación y verificaciones automáticas sobre un caso guiado con datos sintéticos. Para que tu proyecto valga en el portafolio, pide retroalimentación a una persona con experiencia (mentores, comunidades, colegas).\n\n**Estructura sugerida del repositorio**\n\n```text\nmi-proyecto/\n├── README.md            # problema, datos, método, resultados, límites, cómo reproducir\n├── requirements.txt     # versiones de las librerías\n├── data/\n│   ├── raw/             # datos originales: NUNCA se editan a mano\n│   └── processed/       # datos limpios generados por tu código\n├── notebooks/           # exploración (limpia y ordenada)\n├── src/                 # funciones reutilizables\n└── reports/             # figuras, informe, capturas del tablero\n```\n\nPrincipios de **reproducibilidad**:\n\n- Los datos crudos no se modifican: toda limpieza se hace con código, dejando constancia de cada paso.\n- Rutas relativas (nunca `C:\\Usuarios\\mi_nombre\\...`) y semillas aleatorias fijas.\n- `requirements.txt` con las versiones de las librerías.\n- Ningún dato sensible ni clave en el repositorio público (usa `.gitignore`).\n\n**Diccionario de datos**: una tabla con cada columna, su significado, tipo, unidad y valores posibles. Es la documentación más útil y la más olvidada.\n\n**Control de calidad antes de analizar**:\n\n- **Duplicados** en la clave (dos filas con el mismo identificador).\n- **Valores vacíos**: cuántos y en qué columnas; ¿tienen significado (por ejemplo, «sin motivo de baja» porque no se dio de baja)?\n- **Rangos imposibles**: antigüedades negativas, porcentajes mayores a 100.\n- **Categorías inconsistentes** («Premium», «premium », «PREMIUM»).\n- **Coherencia entre columnas** (una fecha de baja anterior a la de alta).\n\nConvierte cada control en una función que se pueda volver a ejecutar cada vez que cambien los datos.\n\nEn el caso guiado trabajamos con una tabla de **clientes sintéticos** de una empresa de suscripción (ficticia), generada con una función; la columna `baja` indica si el cliente se dio de baja.",
    ejemploMinimo: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\nprint(clientes.shape)\nprint(clientes.head(3))",
    ejemploAplicado: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\nprint(clientes.dtypes)\nprint(\"Nulos por columna:\", clientes.isna().sum().to_dict())\nprint(\"Tasa de bajas:\", round(clientes[\"baja\"].mean(), 3))",
    errorFrecuente: {
      codigo: "df = pd.read_csv(\"C:/Users/maria/Escritorio/datos_finales_v2_ARREGLADO.csv\")\n# edito el CSV a mano en Excel y lo guardo con el mismo nombre",
      explicacion:
        "Una ruta absoluta de tu computador hace que el proyecto no corra en ningún otro, y editar a mano los datos originales borra el rastro de lo que cambió. Guarda los datos crudos intactos en `data/raw`, usa rutas relativas y haz la limpieza con código versionado.",
    },
    practicaGuiada: {
      id: "m51-l2-practica",
      enunciado: "Escribe `calidad(df)`: devuelve la **lista ordenada** de problemas encontrados: `\"ids duplicados: N\"` si hay `id_cliente` repetidos, `\"nulos en <columna>: N\"` por cada columna con valores vacíos **excepto `motivo_baja`** (que está vacío a propósito para quien no se dio de baja) y `\"antiguedad fuera de rango: N\"` si hay antigüedades fuera de 1 a 60 meses. El programa revisa una tabla con defectos inyectados.",
      codigoInicial: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\ndef calidad(df):\n    return None\n\nsucio = generar_clientes(50)\nsucio = pd.concat([sucio, sucio.iloc[[3]]], ignore_index=True)     # un cliente duplicado\nsucio.loc[5, \"horas_uso\"] = None                                    # un valor vacío\nsucio.loc[7, \"antiguedad_meses\"] = -3                               # un valor imposible\nprint(calidad(sucio))\nprint(calidad(generar_clientes(50)))",
      solucion: "import pandas as pd\n\ndef generar_clientes(n=400):\n    \"\"\"Clientes sintéticos de una empresa de suscripción (datos ficticios, hechos para practicar).\"\"\"\n    filas = []\n    for i in range(n):\n        antiguedad = (i * 7) % 48 + 1\n        plan = [\"Basico\", \"Estandar\", \"Premium\"][i % 3]\n        tickets = (i * 5) % 7\n        uso = (i * 13) % 40 + 1\n        puntaje = 2 * tickets - uso / 8 - antiguedad / 6 + (3 if plan == \"Basico\" else 0) + (4 if i % 11 == 0 else 0)\n        baja = 1 if puntaje > 1.5 else 0\n        motivo = (\"precio\" if i % 2 else \"servicio\") if baja else None\n        filas.append((1000 + i, antiguedad, plan, tickets, uso, baja, motivo))\n    return pd.DataFrame(filas, columns=[\"id_cliente\", \"antiguedad_meses\", \"plan\", \"tickets_mes\", \"horas_uso\", \"baja\", \"motivo_baja\"])\n\nclientes = generar_clientes()\n\ndef calidad(df):\n    problemas = []\n    duplicados = int(df[\"id_cliente\"].duplicated().sum())\n    if duplicados:\n        problemas.append(f\"ids duplicados: {duplicados}\")\n    for columna in df.columns:\n        if columna == \"motivo_baja\":\n            continue\n        nulos = int(df[columna].isna().sum())\n        if nulos:\n            problemas.append(f\"nulos en {columna}: {nulos}\")\n    fuera = int((~df[\"antiguedad_meses\"].between(1, 60)).sum())\n    if fuera:\n        problemas.append(f\"antiguedad fuera de rango: {fuera}\")\n    return sorted(problemas)\n\nsucio = generar_clientes(50)\nsucio = pd.concat([sucio, sucio.iloc[[3]]], ignore_index=True)     # un cliente duplicado\nsucio.loc[5, \"horas_uso\"] = None                                    # un valor vacío\nsucio.loc[7, \"antiguedad_meses\"] = -3                               # un valor imposible\nprint(calidad(sucio))\nprint(calidad(generar_clientes(50)))",
      pistas: ["`df[\"id_cliente\"].duplicated().sum()` cuenta repetidos.", "`df[\"antiguedad_meses\"].between(1, 60)` marca los valores válidos; niégalo con `~`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"['antiguedad fuera de rango: 1', 'ids duplicados: 1', 'nulos en horas_uso: 1']\",\"[]\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: ['antiguedad fuera de rango: 1', 'ids duplicados: 1', 'nulos en horas_uso: 1']\n[]" }
      },
    },
    reto: {
      id: "m51-l2-reto",
      enunciado: "Escribe `faltan_rutas(rutas)`: dada la lista de archivos y carpetas de un repositorio, devuelve la **lista ordenada** de elementos obligatorios que faltan entre `README.md`, `requirements.txt`, `data/raw`, `data/processed` y `src`. Evalúa dos repositorios.",
      codigoInicial: "REQUERIDAS = [\"README.md\", \"requirements.txt\", \"data/raw\", \"data/processed\", \"src\"]\n\ndef faltan_rutas(rutas):\n    return None\n\nrepo_a = [\"README.md\", \"requirements.txt\", \"data/raw\", \"data/processed\", \"src\", \"notebooks\"]\nrepo_b = [\"analisis_final_v3.ipynb\", \"datos.csv\", \"README.md\"]\nprint(faltan_rutas(repo_a))\nprint(faltan_rutas(repo_b))",
      solucion: "REQUERIDAS = [\"README.md\", \"requirements.txt\", \"data/raw\", \"data/processed\", \"src\"]\n\ndef faltan_rutas(rutas):\n    return sorted(set(REQUERIDAS) - set(rutas))\n\nrepo_a = [\"README.md\", \"requirements.txt\", \"data/raw\", \"data/processed\", \"src\", \"notebooks\"]\nrepo_b = [\"analisis_final_v3.ipynb\", \"datos.csv\", \"README.md\"]\nprint(faltan_rutas(repo_a))\nprint(faltan_rutas(repo_b))",
      pistas: ["La diferencia de conjuntos `set(REQUERIDAS) - set(rutas)` da lo que falta.", "Devuelve el resultado ordenado con `sorted(...)`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"[]\",\"['data/processed', 'data/raw', 'requirements.txt', 'src']\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: []\n['data/processed', 'data/raw', 'requirements.txt', 'src']" }
      },
    },
    verificacion: [
      {
        id: "m51-l2-q1",
        pregunta: "¿Qué debe pasar con los datos crudos de un proyecto?",
        opciones: ["Editarse a mano cuando haga falta", "Guardarse sin modificar y limpiarse solo con código", "Borrarse al terminar", "Subirse siempre con datos personales"],
        respuestaCorrecta: 1,
        explicacion: "Mantener los originales intactos permite reproducir y auditar la limpieza.",
      },
      {
        id: "m51-l2-q2",
        pregunta: "¿Qué es un diccionario de datos?",
        opciones: ["Una lista de palabras", "Una tabla que describe cada columna: significado, tipo, unidad y valores", "Un tipo de gráfico", "Un modelo"],
        respuestaCorrecta: 1,
        explicacion: "Documenta qué significa cada variable para que otra persona pueda usarla.",
      },
      {
        id: "m51-l2-q3",
        pregunta: "¿Por qué es mala práctica usar rutas absolutas del computador?",
        opciones: ["Porque son largas", "Porque el proyecto no corre en otros equipos", "Porque pandas no las lee", "Porque no existen en Windows"],
        respuestaCorrecta: 1,
        explicacion: "Usa rutas relativas al repositorio.",
      },
    ],
    resumen: ["Estructura clara: README, requirements, data/raw, data/processed, src, notebooks y reports.", "Reproducibilidad: datos crudos intactos, rutas relativas, semillas y versiones.", "Controles de calidad como funciones que se pueden volver a ejecutar."],
    proximoPaso: "En el siguiente módulo: análisis y modelo base, comunicación de resultados y entrega del proyecto.",
    conceptos: ["reproducibilidad", "calidad-de-datos"],
  },
]
