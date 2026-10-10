import type { Lesson } from '../../types'

export const module49Lessons: Lesson[] = [
  {
    id: "m49-l1",
    moduloId: "modulo-49",
    titulo: "RAG: responder con tus propios documentos",
    objetivo: "Construir el flujo de generación aumentada por recuperación (dividir, indexar, recuperar, armar el prompt, citar) y evaluar la recuperación por separado.",
    porQueImporta:
      "Un modelo no conoce los documentos de tu empresa. RAG es la técnica más usada para que responda con información propia y actualizada, y reduce las invenciones porque cada respuesta se apoya en fragmentos concretos.",
    concepto: "> **Nota**: este curso **no llama a ningún modelo de lenguaje real**. Los «modelos» de los ejercicios son funciones simuladas y deterministas; practicas la lógica de la aplicación que los rodea. Para usar un modelo real necesitas una cuenta y una clave de API de un proveedor.\n\n**RAG** (*retrieval-augmented generation*) combina búsqueda y generación:\n\n1. **Preparar** (una vez): dividir los documentos en **fragmentos** (*chunks*), vectorizarlos (embeddings) y guardarlos en un índice.\n2. **Recuperar**: para cada pregunta, buscar los fragmentos más relevantes.\n3. **Aumentar**: construir el prompt con la pregunta y esos fragmentos, delimitados, con la instrucción de **responder solo con ellos** y de **citar la fuente**.\n4. **Generar**: el modelo redacta la respuesta; tu código **valida** las citas.\n\n**Fragmentación**: fragmentos demasiado grandes diluyen la relevancia y gastan tokens; demasiado pequeños pierden contexto. Se suele usar un tamaño moderado con **solape** (los fragmentos comparten algunas palabras con el anterior) para no cortar una idea por la mitad, y conservar **metadatos** (documento, sección, fecha).\n\n**La recuperación manda**: si el fragmento correcto no se recupera, el mejor modelo no puede responder bien. Por eso se evalúa **por separado**: ¿el fragmento correcto está en el primer resultado (*hit@1*) o entre los k primeros (*hit@k*)? Y se define un **umbral** de similitud para responder «no tengo esa información» cuando nada es relevante.\n\nLimitaciones habituales: la recuperación léxica falla con sinónimos y paráfrasis (los embeddings semánticos ayudan); un umbral no separa perfectamente lo relevante de lo irrelevante; los documentos desactualizados producen respuestas desactualizadas; y hay que **respetar los permisos** (que cada persona solo recupere documentos que puede ver).\n\n**¿RAG o contexto largo?** Las ventanas de contexto actuales son grandes y a veces basta poner los documentos completos en el prompt. RAG sigue siendo útil cuando el corpus es muy grande, cambia con frecuencia, necesita permisos por documento o interesa reducir costo y latencia.\n\nEn los ejercicios usamos una pequeña base de preguntas frecuentes de una tienda ficticia y recuperación TF-IDF.",
    ejemploMinimo: "texto = \"uno dos tres cuatro cinco seis siete ocho nueve diez\"\npalabras = texto.split()\ntamano, solape = 4, 1\npaso = tamano - solape\n\nfragmentos = []\nfor inicio in range(0, len(palabras), paso):\n    fragmentos.append(\" \".join(palabras[inicio:inicio + tamano]))\n    if inicio + tamano >= len(palabras):      # este fragmento ya llegó al final\n        break\nprint(fragmentos)",
    ejemploAplicado: "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\n\nFAQ = {\n    1: \"Los envíos nacionales tardan entre 2 y 5 días hábiles. Los envíos a Bogotá, Medellín y Cali llegan en 2 días hábiles. El envío es gratis en compras superiores a 150000 pesos.\",\n    2: \"Puedes devolver un producto dentro de los 30 días posteriores a la entrega si está sin usar y en su empaque original. El reembolso se procesa en 7 días hábiles.\",\n    3: \"Todos los productos tecnológicos tienen garantía de 12 meses por defectos de fábrica. La garantía no cubre daños por golpes ni por líquidos.\",\n    4: \"Aceptamos tarjetas de crédito, tarjetas débito, PSE y transferencia bancaria. El pago con tarjeta de crédito se puede diferir hasta en 12 cuotas.\",\n    5: \"La factura electrónica se envía al correo registrado dentro de las 24 horas siguientes a la compra. Para cambiar los datos de facturación escribe a soporte antes de 5 días.\",\n    6: \"El soporte atiende de lunes a viernes de 8 a.m. a 6 p.m. por chat y correo electrónico. Los sábados atendemos solo por chat hasta las 2 p.m.\",\n}\nPALABRAS_VACIAS = [\"de\", \"la\", \"el\", \"los\", \"las\", \"un\", \"una\", \"y\", \"a\", \"en\", \"por\", \"con\", \"para\", \"se\", \"es\", \"que\", \"del\", \"al\",\n                   \"lo\", \"su\", \"mi\", \"mis\", \"tu\", \"o\", \"me\", \"si\", \"no\", \"hay\", \"puedo\", \"puedes\", \"cual\", \"como\", \"cuanto\",\n                   \"cuantos\", \"tienen\", \"tiene\", \"son\", \"ni\", \"sin\", \"solo\", \"hasta\", \"entre\", \"antes\", \"dentro\", \"todos\",\n                   \"esta\", \"esto\", \"ese\", \"pueden\", \"cuales\", \"donde\", \"cuando\", \"venden\", \"atienden\"]\n\nclass Buscador:\n    \"\"\"Índice TF-IDF sobre las preguntas frecuentes (representación léxica, sin modelo de embeddings).\"\"\"\n    def __init__(self, documentos):\n        self.ids = list(documentos)\n        self.vec = TfidfVectorizer(strip_accents=\"unicode\", stop_words=PALABRAS_VACIAS)\n        self.matriz = self.vec.fit_transform([documentos[i] for i in self.ids])\n\n    def buscar(self, pregunta):\n        \"\"\"Devuelve (id, similitud) del documento más parecido.\"\"\"\n        similitudes = cosine_similarity(self.vec.transform([pregunta]), self.matriz)[0]\n        mejor = int(similitudes.argmax())\n        return self.ids[mejor], round(float(similitudes[mejor]), 2)\n\nbuscador = Buscador(FAQ)\nfor pregunta in [\"¿Cuánto tardan los envíos a Medellín?\", \"¿Puedo devolver un producto?\"]:\n    print(pregunta, \"->\", buscador.buscar(pregunta))",
    errorFrecuente: {
      codigo: "Pregunta: \"¿Venden productos usados?\"  →  el índice devuelve el documento de la garantía de productos tecnológicos (similitud 0.27)\n→ la respuesta se apoya en un fragmento que no responde la pregunta",
      explicacion:
        "La recuperación siempre devuelve «el más parecido», aunque no sea relevante, y un umbral no separa perfectamente lo relevante de lo irrelevante (aquí, por compartir la palabra «productos»). Por eso se combinan: un umbral calibrado con ejemplos reales, la instrucción de responder «no tengo esa información» si el contexto no responde, y la evaluación de la recuperación con preguntas que sí y que no están cubiertas.",
    },
    practicaGuiada: {
      id: "m49-l1-practica",
      enunciado: "Escribe `dividir(texto, tamano, solape)`: divide el texto en fragmentos de `tamano` palabras con un solape de `solape` palabras (el paso es `tamano - solape`). Se detiene cuando un fragmento llega al final del texto (el último puede ser más corto). Imprime un fragmento por línea.",
      codigoInicial: "def dividir(texto, tamano, solape):\n    return []\n\ntexto = \"uno dos tres cuatro cinco seis siete ocho nueve diez\"\nfor fragmento in dividir(texto, 4, 1):\n    print(fragmento)",
      solucion: "def dividir(texto, tamano, solape):\n    palabras = texto.split()\n    paso = tamano - solape\n    fragmentos = []\n    for inicio in range(0, len(palabras), paso):\n        fragmentos.append(\" \".join(palabras[inicio:inicio + tamano]))\n        if inicio + tamano >= len(palabras):\n            break\n    return fragmentos\n\ntexto = \"uno dos tres cuatro cinco seis siete ocho nueve diez\"\nfor fragmento in dividir(texto, 4, 1):\n    print(fragmento)",
      pistas: ["Recorre `range(0, len(palabras), paso)` con `paso = tamano - solape`.", "Detén el bucle cuando `inicio + tamano >= len(palabras)`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"uno dos tres cuatro\",\"cuatro cinco seis siete\",\"siete ocho nueve diez\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: uno dos tres cuatro\ncuatro cinco seis siete\nsiete ocho nueve diez" }
      },
    },
    reto: {
      id: "m49-l1-reto",
      enunciado: "Usa el `Buscador` (ya definido) para escribir `responder_o_declinar(pregunta, umbral)`: devuelve `\"doc N\"` (el id recuperado) si la similitud es **mayor o igual** al umbral, y `\"sin informacion\"` en otro caso. Evalúa 7 preguntas con umbral `0.25` e imprime `pregunta -> resultado`.",
      codigoInicial: "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\n\nFAQ = {\n    1: \"Los envíos nacionales tardan entre 2 y 5 días hábiles. Los envíos a Bogotá, Medellín y Cali llegan en 2 días hábiles. El envío es gratis en compras superiores a 150000 pesos.\",\n    2: \"Puedes devolver un producto dentro de los 30 días posteriores a la entrega si está sin usar y en su empaque original. El reembolso se procesa en 7 días hábiles.\",\n    3: \"Todos los productos tecnológicos tienen garantía de 12 meses por defectos de fábrica. La garantía no cubre daños por golpes ni por líquidos.\",\n    4: \"Aceptamos tarjetas de crédito, tarjetas débito, PSE y transferencia bancaria. El pago con tarjeta de crédito se puede diferir hasta en 12 cuotas.\",\n    5: \"La factura electrónica se envía al correo registrado dentro de las 24 horas siguientes a la compra. Para cambiar los datos de facturación escribe a soporte antes de 5 días.\",\n    6: \"El soporte atiende de lunes a viernes de 8 a.m. a 6 p.m. por chat y correo electrónico. Los sábados atendemos solo por chat hasta las 2 p.m.\",\n}\nPALABRAS_VACIAS = [\"de\", \"la\", \"el\", \"los\", \"las\", \"un\", \"una\", \"y\", \"a\", \"en\", \"por\", \"con\", \"para\", \"se\", \"es\", \"que\", \"del\", \"al\",\n                   \"lo\", \"su\", \"mi\", \"mis\", \"tu\", \"o\", \"me\", \"si\", \"no\", \"hay\", \"puedo\", \"puedes\", \"cual\", \"como\", \"cuanto\",\n                   \"cuantos\", \"tienen\", \"tiene\", \"son\", \"ni\", \"sin\", \"solo\", \"hasta\", \"entre\", \"antes\", \"dentro\", \"todos\",\n                   \"esta\", \"esto\", \"ese\", \"pueden\", \"cuales\", \"donde\", \"cuando\", \"venden\", \"atienden\"]\n\nclass Buscador:\n    \"\"\"Índice TF-IDF sobre las preguntas frecuentes (representación léxica, sin modelo de embeddings).\"\"\"\n    def __init__(self, documentos):\n        self.ids = list(documentos)\n        self.vec = TfidfVectorizer(strip_accents=\"unicode\", stop_words=PALABRAS_VACIAS)\n        self.matriz = self.vec.fit_transform([documentos[i] for i in self.ids])\n\n    def buscar(self, pregunta):\n        \"\"\"Devuelve (id, similitud) del documento más parecido.\"\"\"\n        similitudes = cosine_similarity(self.vec.transform([pregunta]), self.matriz)[0]\n        mejor = int(similitudes.argmax())\n        return self.ids[mejor], round(float(similitudes[mejor]), 2)\n\nbuscador = Buscador(FAQ)\n\ndef responder_o_declinar(pregunta, umbral):\n    return None\n\nPREGUNTAS = [\"¿Cuánto tardan los envíos a Medellín?\", \"¿Puedo devolver un producto?\", \"¿Los productos tecnológicos tienen garantía?\",\n             \"¿Puedo pagar en cuotas con tarjeta de crédito?\", \"¿Cómo cambio mis datos de facturación?\", \"¿Atienden los sábados?\",\n             \"¿Cuál es la capital de Francia?\"]\nfor p in PREGUNTAS:\n    print(p, \"->\", responder_o_declinar(p, 0.25))",
      solucion: "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\n\nFAQ = {\n    1: \"Los envíos nacionales tardan entre 2 y 5 días hábiles. Los envíos a Bogotá, Medellín y Cali llegan en 2 días hábiles. El envío es gratis en compras superiores a 150000 pesos.\",\n    2: \"Puedes devolver un producto dentro de los 30 días posteriores a la entrega si está sin usar y en su empaque original. El reembolso se procesa en 7 días hábiles.\",\n    3: \"Todos los productos tecnológicos tienen garantía de 12 meses por defectos de fábrica. La garantía no cubre daños por golpes ni por líquidos.\",\n    4: \"Aceptamos tarjetas de crédito, tarjetas débito, PSE y transferencia bancaria. El pago con tarjeta de crédito se puede diferir hasta en 12 cuotas.\",\n    5: \"La factura electrónica se envía al correo registrado dentro de las 24 horas siguientes a la compra. Para cambiar los datos de facturación escribe a soporte antes de 5 días.\",\n    6: \"El soporte atiende de lunes a viernes de 8 a.m. a 6 p.m. por chat y correo electrónico. Los sábados atendemos solo por chat hasta las 2 p.m.\",\n}\nPALABRAS_VACIAS = [\"de\", \"la\", \"el\", \"los\", \"las\", \"un\", \"una\", \"y\", \"a\", \"en\", \"por\", \"con\", \"para\", \"se\", \"es\", \"que\", \"del\", \"al\",\n                   \"lo\", \"su\", \"mi\", \"mis\", \"tu\", \"o\", \"me\", \"si\", \"no\", \"hay\", \"puedo\", \"puedes\", \"cual\", \"como\", \"cuanto\",\n                   \"cuantos\", \"tienen\", \"tiene\", \"son\", \"ni\", \"sin\", \"solo\", \"hasta\", \"entre\", \"antes\", \"dentro\", \"todos\",\n                   \"esta\", \"esto\", \"ese\", \"pueden\", \"cuales\", \"donde\", \"cuando\", \"venden\", \"atienden\"]\n\nclass Buscador:\n    \"\"\"Índice TF-IDF sobre las preguntas frecuentes (representación léxica, sin modelo de embeddings).\"\"\"\n    def __init__(self, documentos):\n        self.ids = list(documentos)\n        self.vec = TfidfVectorizer(strip_accents=\"unicode\", stop_words=PALABRAS_VACIAS)\n        self.matriz = self.vec.fit_transform([documentos[i] for i in self.ids])\n\n    def buscar(self, pregunta):\n        \"\"\"Devuelve (id, similitud) del documento más parecido.\"\"\"\n        similitudes = cosine_similarity(self.vec.transform([pregunta]), self.matriz)[0]\n        mejor = int(similitudes.argmax())\n        return self.ids[mejor], round(float(similitudes[mejor]), 2)\n\nbuscador = Buscador(FAQ)\n\ndef responder_o_declinar(pregunta, umbral):\n    doc_id, similitud = buscador.buscar(pregunta)\n    return f\"doc {doc_id}\" if similitud >= umbral else \"sin informacion\"\n\nPREGUNTAS = [\"¿Cuánto tardan los envíos a Medellín?\", \"¿Puedo devolver un producto?\", \"¿Los productos tecnológicos tienen garantía?\",\n             \"¿Puedo pagar en cuotas con tarjeta de crédito?\", \"¿Cómo cambio mis datos de facturación?\", \"¿Atienden los sábados?\",\n             \"¿Cuál es la capital de Francia?\"]\nfor p in PREGUNTAS:\n    print(p, \"->\", responder_o_declinar(p, 0.25))",
      pistas: ["`buscador.buscar(pregunta)` devuelve `(id, similitud)`.", "Compara la similitud con el umbral."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"¿Cuánto tardan los envíos a Medellín? -> doc 1\",\"¿Puedo devolver un producto? -> doc 2\",\"¿Los productos tecnológicos tienen garantía? -> doc 3\",\"¿Puedo pagar en cuotas con tarjeta de crédito? -> doc 4\",\"¿Cómo cambio mis datos de facturación? -> doc 5\",\"¿Atienden los sábados? -> doc 6\",\"¿Cuál es la capital de Francia? -> sin informacion\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: ¿Cuánto tardan los envíos a Medellín? -> doc 1\n¿Puedo devolver un producto? -> doc 2\n¿Los productos tecnológicos tienen garantía? -> doc 3\n¿Puedo pagar en cuotas con tarjeta de crédito? -> doc 4\n¿Cómo" }
      },
    },
    verificacion: [
      {
        id: "m49-l1-q1",
        pregunta: "¿Qué hace RAG?",
        opciones: ["Entrena un modelo nuevo con tus documentos", "Recupera fragmentos relevantes y los incluye en el prompt para que el modelo responda con ellos", "Elimina las alucinaciones por completo", "Sustituye a las bases de datos"],
        respuestaCorrecta: 1,
        explicacion: "No modifica el modelo: le da, en cada consulta, el contexto relevante. Reduce las invenciones, no las elimina.",
      },
      {
        id: "m49-l1-q2",
        pregunta: "¿Para qué sirve el solape entre fragmentos?",
        opciones: ["Para ahorrar tokens", "Para no cortar una idea por la mitad entre dos fragmentos", "Para cifrar los datos", "Para ordenar los documentos"],
        respuestaCorrecta: 1,
        explicacion: "Comparten algunas palabras con el anterior, de modo que la información en el borde no se pierda.",
      },
      {
        id: "m49-l1-q3",
        pregunta: "¿Por qué conviene evaluar la recuperación por separado de la generación?",
        opciones: ["No conviene", "Porque si no se recupera el fragmento correcto, el modelo no puede responder bien", "Porque es más barato", "Porque lo exige la API"],
        respuestaCorrecta: 1,
        explicacion: "Medir hit@k localiza si el fallo está en la búsqueda o en el modelo.",
      },
    ],
    resumen: ["RAG = fragmentar e indexar, recuperar, armar el prompt con la fuente y citar.", "La recuperación manda: evalúa hit@k y calibra un umbral para «no tengo esa información».", "Respeta permisos y vigencia de los documentos."],
    proximoPaso: "Veremos cómo el modelo puede usar herramientas (consultar datos, calcular) con llamadas a funciones.",
    conceptos: ["rag", "chunking"],
  },
  {
    id: "m49-l2",
    moduloId: "modulo-49",
    titulo: "Herramientas: que el modelo consulte datos y ejecute funciones",
    objetivo: "Entender el uso de herramientas (function calling): el modelo pide una llamada con argumentos, tu código la ejecuta de forma segura y devuelve el resultado.",
    porQueImporta:
      "Los modelos no deben calcular de memoria ni inventar datos de tu empresa. Con herramientas consultan una base de datos, hacen cálculos exactos o actúan en otros sistemas, y tú controlas exactamente qué pueden hacer.",
    concepto: "> **Nota**: este curso **no llama a ningún modelo de lenguaje real**. Los «modelos» de los ejercicios son funciones simuladas y deterministas; practicas la lógica de la aplicación que los rodea. Para usar un modelo real necesitas una cuenta y una clave de API de un proveedor.\n\nUna **herramienta** (*tool*, *function calling*) es una función de tu programa que describes al modelo (nombre, qué hace y los parámetros que acepta, normalmente con un esquema JSON). El flujo:\n\n1. Envías al modelo la pregunta y la **descripción de las herramientas** disponibles.\n2. El modelo decide si necesita una y responde con una **petición de llamada**: el nombre y los argumentos (JSON). **No ejecuta nada por sí mismo.**\n3. **Tu código** valida la petición y ejecuta la función.\n4. Devuelves el **resultado** al modelo, que redacta la respuesta final (o pide otra herramienta).\n\nEsto permite cálculos exactos, datos actualizados (pedidos, inventario, precios) y acciones.\n\n**Seguridad: tú tienes el control.**\n\n- **Lista de permitidas**: ejecuta solo las herramientas que registraste; ante un nombre desconocido, devuelve un error. Nunca ejecutes texto del modelo con `eval` ni `exec`.\n- **Valida los argumentos** (tipos, rangos, que el usuario tenga permiso sobre ese recurso) como lo harías con la entrada de cualquier usuario.\n- **Mínimo privilegio**: da acceso de solo lectura cuando basta; las acciones con efectos (reembolsos, borrados, envíos) piden confirmación humana (lo veremos con los agentes).\n- **Devuelve los errores al modelo** como resultado, en lugar de dejar que el programa falle: así puede corregir el argumento o explicar el problema.\n\nLas descripciones de las herramientas son parte del prompt: nombres claros y descripciones precisas mejoran las decisiones del modelo.",
    ejemploMinimo: "PEDIDOS = {101: \"enviado\", 102: \"en preparacion\", 103: \"entregado\"}\n\ndef consultar_pedido(id):\n    return PEDIDOS.get(id, \"no existe\")\n\ndef porcentaje(parte, total):\n    return round(parte / total * 100, 1)\n\nHERRAMIENTAS = {\"consultar_pedido\": consultar_pedido, \"porcentaje\": porcentaje}\n\nllamada = {\"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 101}}   # lo que \"pediría\" el modelo\nfuncion = HERRAMIENTAS[llamada[\"herramienta\"]]\nprint(funcion(**llamada[\"argumentos\"]))",
    ejemploAplicado: "PEDIDOS = {101: \"enviado\", 102: \"en preparacion\", 103: \"entregado\"}\n\ndef consultar_pedido(id):\n    return PEDIDOS.get(id, \"no existe\")\n\ndef porcentaje(parte, total):\n    return round(parte / total * 100, 1)\n\nHERRAMIENTAS = {\"consultar_pedido\": consultar_pedido, \"porcentaje\": porcentaje}\n\ndef ejecutar(llamada):\n    funcion = HERRAMIENTAS.get(llamada[\"herramienta\"])\n    if funcion is None:\n        return \"Error: herramienta desconocida\"\n    return funcion(**llamada[\"argumentos\"])\n\nprint(ejecutar({\"herramienta\": \"porcentaje\", \"argumentos\": {\"parte\": 30, \"total\": 120}}))\nprint(ejecutar({\"herramienta\": \"borrar_todo\", \"argumentos\": {}}))",
    errorFrecuente: {
      codigo: "llamada = modelo_pide_herramienta(...)\nresultado = eval(llamada[\"codigo\"])        # ejecuta el texto que generó el modelo",
      explicacion:
        "Ejecutar con `eval` o `exec` lo que genera el modelo (o cualquier texto externo) permite que un prompt malicioso ejecute código arbitrario en tu sistema. Registra un conjunto fijo de funciones, valida los argumentos y ejecuta solo esas.",
    },
    practicaGuiada: {
      id: "m49-l2-practica",
      enunciado: "Escribe `ejecutar(llamada, herramientas)`: la llamada es un diccionario `{\"herramienta\": nombre, \"argumentos\": {...}}`. Devuelve el resultado de llamar a la función registrada con esos argumentos (`funcion(**argumentos)`).",
      codigoInicial: "PEDIDOS = {101: \"enviado\", 102: \"en preparacion\", 103: \"entregado\"}\n\ndef consultar_pedido(id):\n    return PEDIDOS.get(id, \"no existe\")\n\ndef porcentaje(parte, total):\n    return round(parte / total * 100, 1)\n\nHERRAMIENTAS = {\"consultar_pedido\": consultar_pedido, \"porcentaje\": porcentaje}\n\ndef ejecutar(llamada, herramientas):\n    return None\n\nprint(ejecutar({\"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 102}}, HERRAMIENTAS))\nprint(ejecutar({\"herramienta\": \"porcentaje\", \"argumentos\": {\"parte\": 30, \"total\": 120}}, HERRAMIENTAS))",
      solucion: "PEDIDOS = {101: \"enviado\", 102: \"en preparacion\", 103: \"entregado\"}\n\ndef consultar_pedido(id):\n    return PEDIDOS.get(id, \"no existe\")\n\ndef porcentaje(parte, total):\n    return round(parte / total * 100, 1)\n\nHERRAMIENTAS = {\"consultar_pedido\": consultar_pedido, \"porcentaje\": porcentaje}\n\ndef ejecutar(llamada, herramientas):\n    funcion = herramientas[llamada[\"herramienta\"]]\n    return funcion(**llamada[\"argumentos\"])\n\nprint(ejecutar({\"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 102}}, HERRAMIENTAS))\nprint(ejecutar({\"herramienta\": \"porcentaje\", \"argumentos\": {\"parte\": 30, \"total\": 120}}, HERRAMIENTAS))",
      pistas: ["Busca la función en `herramientas` por su nombre.", "`funcion(**argumentos)` desempaqueta el diccionario como argumentos con nombre."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"en preparacion\",\"25.0\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: en preparacion\n25.0" }
      },
    },
    reto: {
      id: "m49-l2-reto",
      enunciado: "Hazla **robusta**: devuelve el texto `Error: herramienta desconocida` si el nombre no está registrado, `Error: argumentos invalidos` si la función lanza `TypeError` (faltan o sobran argumentos) y `Error: division por cero` si lanza `ZeroDivisionError`. En los demás casos, el resultado como texto (`str`).",
      codigoInicial: "PEDIDOS = {101: \"enviado\", 102: \"en preparacion\", 103: \"entregado\"}\n\ndef consultar_pedido(id):\n    return PEDIDOS.get(id, \"no existe\")\n\ndef porcentaje(parte, total):\n    return round(parte / total * 100, 1)\n\nHERRAMIENTAS = {\"consultar_pedido\": consultar_pedido, \"porcentaje\": porcentaje}\n\ndef ejecutar(llamada, herramientas):\n    return None\n\npruebas = [\n    {\"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 103}},\n    {\"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 999}},\n    {\"herramienta\": \"borrar_todo\", \"argumentos\": {}},\n    {\"herramienta\": \"porcentaje\", \"argumentos\": {\"parte\": 5}},\n    {\"herramienta\": \"porcentaje\", \"argumentos\": {\"parte\": 5, \"total\": 0}},\n]\nfor p in pruebas:\n    print(ejecutar(p, HERRAMIENTAS))",
      solucion: "PEDIDOS = {101: \"enviado\", 102: \"en preparacion\", 103: \"entregado\"}\n\ndef consultar_pedido(id):\n    return PEDIDOS.get(id, \"no existe\")\n\ndef porcentaje(parte, total):\n    return round(parte / total * 100, 1)\n\nHERRAMIENTAS = {\"consultar_pedido\": consultar_pedido, \"porcentaje\": porcentaje}\n\ndef ejecutar(llamada, herramientas):\n    funcion = herramientas.get(llamada[\"herramienta\"])\n    if funcion is None:\n        return \"Error: herramienta desconocida\"\n    try:\n        return str(funcion(**llamada[\"argumentos\"]))\n    except TypeError:\n        return \"Error: argumentos invalidos\"\n    except ZeroDivisionError:\n        return \"Error: division por cero\"\n\npruebas = [\n    {\"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 103}},\n    {\"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 999}},\n    {\"herramienta\": \"borrar_todo\", \"argumentos\": {}},\n    {\"herramienta\": \"porcentaje\", \"argumentos\": {\"parte\": 5}},\n    {\"herramienta\": \"porcentaje\", \"argumentos\": {\"parte\": 5, \"total\": 0}},\n]\nfor p in pruebas:\n    print(ejecutar(p, HERRAMIENTAS))",
      pistas: ["Usa `herramientas.get(nombre)` para detectar nombres desconocidos.", "Atrapa `TypeError` y `ZeroDivisionError` con `try/except`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"entregado\",\"no existe\",\"Error: herramienta desconocida\",\"Error: argumentos invalidos\",\"Error: division por cero\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: entregado\nno existe\nError: herramienta desconocida\nError: argumentos invalidos\nError: division por cero" }
      },
    },
    verificacion: [
      {
        id: "m49-l2-q1",
        pregunta: "¿Quién ejecuta realmente una herramienta cuando el modelo «la llama»?",
        opciones: ["El modelo", "Tu código, que valida la petición y ejecuta la función", "El proveedor siempre", "Nadie"],
        respuestaCorrecta: 1,
        explicacion: "El modelo solo pide la llamada (nombre y argumentos); tu aplicación decide si la ejecuta.",
      },
      {
        id: "m49-l2-q2",
        pregunta: "¿Por qué es peligroso ejecutar con `eval` el texto que genera el modelo?",
        opciones: ["Porque es lento", "Porque un prompt malicioso podría ejecutar código arbitrario", "Porque no funciona con JSON", "No es peligroso"],
        respuestaCorrecta: 1,
        explicacion: "Usa una lista de funciones permitidas y valida los argumentos.",
      },
      {
        id: "m49-l2-q3",
        pregunta: "Cuando una herramienta falla, ¿qué conviene hacer?",
        opciones: ["Que el programa se detenga", "Devolver el error al modelo como resultado para que pueda corregir o explicar", "Ignorarlo", "Reiniciar el servidor"],
        respuestaCorrecta: 1,
        explicacion: "El modelo puede reaccionar al mensaje de error (corregir un argumento, informar al usuario).",
      },
    ],
    resumen: ["El modelo pide la llamada; tu código la valida y la ejecuta.", "Lista de herramientas permitidas, validación de argumentos y mínimo privilegio.", "Devuelve los errores como resultado; nunca uses `eval`."],
    proximoPaso: "Combinando herramientas en un ciclo, llegamos a los agentes.",
    conceptos: ["function-calling", "herramientas"],
  },
  {
    id: "m49-l3",
    moduloId: "modulo-49",
    titulo: "Agentes: el ciclo de decidir, actuar y observar",
    objetivo: "Entender el ciclo de un agente (decidir → usar una herramienta → observar → repetir), limitar sus pasos y exigir aprobación humana en las acciones de riesgo.",
    porQueImporta:
      "Un agente puede resolver tareas de varios pasos por su cuenta, pero también equivocarse, entrar en bucles o ejecutar una acción irreversible. Su valor depende de los límites y los controles que le pongas.",
    concepto: "> **Nota**: este curso **no llama a ningún modelo de lenguaje real**. Los «modelos» de los ejercicios son funciones simuladas y deterministas; practicas la lógica de la aplicación que los rodea. Para usar un modelo real necesitas una cuenta y una clave de API de un proveedor.\n\nUn **agente** es un programa donde un modelo decide, **en un ciclo**, qué hacer a continuación:\n\n1. **Decide**: según el objetivo y lo observado hasta ahora, elige una acción: usar una herramienta o dar la respuesta final.\n2. **Actúa**: tu código ejecuta la herramienta.\n3. **Observa**: el resultado se añade al contexto.\n4. **Repite** hasta que el modelo responde o se alcanza un límite.\n\nEs más flexible que un flujo fijo (el modelo decide el camino), pero menos predecible, más caro y más difícil de depurar. **Empieza simple**: una sola llamada, o un flujo de pasos que tú controlas, resuelve la mayoría de los casos; usa un agente cuando la tarea es abierta y el camino no se puede definir de antemano.\n\n**Controles imprescindibles**\n\n- **Límite de pasos** (y de costo/tiempo): evita bucles infinitos y facturas inesperadas.\n- **Herramientas mínimas** y con permisos acotados.\n- **Aprobación humana** (*human-in-the-loop*) para acciones con efectos difíciles de revertir (reembolsos, borrados, envíos masivos, pagos).\n- **Registro** (traza) de cada paso para auditar y depurar.\n- **Pruebas** con casos de éxito y de fallo antes de dar autonomía.\n\nMás autonomía exige más controles: la capacidad de equivocarse a gran escala crece con ella.\n\nEn el ejercicio, una **política simulada** hace de modelo: decide según lo observado, sin conocer nada más.",
    ejemploMinimo: "PEDIDOS = {101: \"enviado\", 102: \"en preparacion\", 103: \"entregado\"}\n\ndef consultar_pedido(id):\n    return PEDIDOS.get(id, \"no existe\")\n\ndef porcentaje(parte, total):\n    return round(parte / total * 100, 1)\n\nHERRAMIENTAS = {\"consultar_pedido\": consultar_pedido, \"porcentaje\": porcentaje}\n\ndef ejecutar(llamada, herramientas):\n    funcion = herramientas.get(llamada[\"herramienta\"])\n    if funcion is None:\n        return \"Error: herramienta desconocida\"\n    try:\n        return str(funcion(**llamada[\"argumentos\"]))\n    except (TypeError, ZeroDivisionError):\n        return \"Error: argumentos invalidos\"\n\ndef politica_simulada(observaciones):\n    \"\"\"Modelo simulado: decide la siguiente acción según lo que ya observó.\"\"\"\n    if len(observaciones) == 0:\n        return {\"tipo\": \"herramienta\", \"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 102}}\n    if len(observaciones) == 1:\n        return {\"tipo\": \"herramienta\", \"herramienta\": \"porcentaje\", \"argumentos\": {\"parte\": 3, \"total\": 12}}\n    return {\"tipo\": \"respuesta\", \"texto\": f\"Tu pedido está {observaciones[0]} y el avance es {observaciones[1]} %.\"}\n\nobservaciones = []\naccion = politica_simulada(observaciones)\nprint(accion[\"tipo\"], accion[\"herramienta\"])",
    ejemploAplicado: "PEDIDOS = {101: \"enviado\", 102: \"en preparacion\", 103: \"entregado\"}\n\ndef consultar_pedido(id):\n    return PEDIDOS.get(id, \"no existe\")\n\ndef porcentaje(parte, total):\n    return round(parte / total * 100, 1)\n\nHERRAMIENTAS = {\"consultar_pedido\": consultar_pedido, \"porcentaje\": porcentaje}\n\ndef ejecutar(llamada, herramientas):\n    funcion = herramientas.get(llamada[\"herramienta\"])\n    if funcion is None:\n        return \"Error: herramienta desconocida\"\n    try:\n        return str(funcion(**llamada[\"argumentos\"]))\n    except (TypeError, ZeroDivisionError):\n        return \"Error: argumentos invalidos\"\n\ndef politica_simulada(observaciones):\n    \"\"\"Modelo simulado: decide la siguiente acción según lo que ya observó.\"\"\"\n    if len(observaciones) == 0:\n        return {\"tipo\": \"herramienta\", \"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 102}}\n    if len(observaciones) == 1:\n        return {\"tipo\": \"herramienta\", \"herramienta\": \"porcentaje\", \"argumentos\": {\"parte\": 3, \"total\": 12}}\n    return {\"tipo\": \"respuesta\", \"texto\": f\"Tu pedido está {observaciones[0]} y el avance es {observaciones[1]} %.\"}\n\nobservaciones, paso = [], 0\nwhile paso < 5:\n    paso += 1\n    accion = politica_simulada(observaciones)\n    if accion[\"tipo\"] == \"respuesta\":\n        print(\"respuesta:\", accion[\"texto\"])\n        break\n    resultado = ejecutar(accion, HERRAMIENTAS)\n    observaciones.append(resultado)\n    print(f\"paso {paso}: {accion['herramienta']} -> {resultado}\")",
    errorFrecuente: {
      codigo: "while True:                               # sin límite de pasos\n    accion = modelo.decidir(historial)\n    ejecutar(accion)                      # incluida \"reembolsar_todo\" sin pedir confirmación",
      explicacion:
        "Un agente sin límite de pasos puede entrar en un bucle (y gastar dinero) y, sin aprobación humana, puede ejecutar acciones de alto impacto por un malentendido o por instrucciones ocultas en los datos que lee. Pon siempre un límite y confirma las acciones irreversibles con una persona.",
    },
    practicaGuiada: {
      id: "m49-l3-practica",
      enunciado: "Completa `ejecutar_agente(politica, herramientas, max_pasos)`: en cada paso pide la acción a la política (le pasa la lista de observaciones). Si es una `respuesta`, imprime `respuesta: <texto>` y termina; si es una herramienta, ejecútala con `ejecutar`, guarda el resultado en las observaciones e imprime `paso N: <herramienta> -> <resultado>`. Si se agotan los pasos, imprime `limite de pasos`.",
      codigoInicial: "PEDIDOS = {101: \"enviado\", 102: \"en preparacion\", 103: \"entregado\"}\n\ndef consultar_pedido(id):\n    return PEDIDOS.get(id, \"no existe\")\n\ndef porcentaje(parte, total):\n    return round(parte / total * 100, 1)\n\nHERRAMIENTAS = {\"consultar_pedido\": consultar_pedido, \"porcentaje\": porcentaje}\n\ndef ejecutar(llamada, herramientas):\n    funcion = herramientas.get(llamada[\"herramienta\"])\n    if funcion is None:\n        return \"Error: herramienta desconocida\"\n    try:\n        return str(funcion(**llamada[\"argumentos\"]))\n    except (TypeError, ZeroDivisionError):\n        return \"Error: argumentos invalidos\"\n\ndef politica_simulada(observaciones):\n    \"\"\"Modelo simulado: decide la siguiente acción según lo que ya observó.\"\"\"\n    if len(observaciones) == 0:\n        return {\"tipo\": \"herramienta\", \"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 102}}\n    if len(observaciones) == 1:\n        return {\"tipo\": \"herramienta\", \"herramienta\": \"porcentaje\", \"argumentos\": {\"parte\": 3, \"total\": 12}}\n    return {\"tipo\": \"respuesta\", \"texto\": f\"Tu pedido está {observaciones[0]} y el avance es {observaciones[1]} %.\"}\n\ndef ejecutar_agente(politica, herramientas, max_pasos):\n    pass\n\nejecutar_agente(politica_simulada, HERRAMIENTAS, 5)\nprint(\"---\")\nejecutar_agente(politica_simulada, HERRAMIENTAS, 1)",
      solucion: "PEDIDOS = {101: \"enviado\", 102: \"en preparacion\", 103: \"entregado\"}\n\ndef consultar_pedido(id):\n    return PEDIDOS.get(id, \"no existe\")\n\ndef porcentaje(parte, total):\n    return round(parte / total * 100, 1)\n\nHERRAMIENTAS = {\"consultar_pedido\": consultar_pedido, \"porcentaje\": porcentaje}\n\ndef ejecutar(llamada, herramientas):\n    funcion = herramientas.get(llamada[\"herramienta\"])\n    if funcion is None:\n        return \"Error: herramienta desconocida\"\n    try:\n        return str(funcion(**llamada[\"argumentos\"]))\n    except (TypeError, ZeroDivisionError):\n        return \"Error: argumentos invalidos\"\n\ndef politica_simulada(observaciones):\n    \"\"\"Modelo simulado: decide la siguiente acción según lo que ya observó.\"\"\"\n    if len(observaciones) == 0:\n        return {\"tipo\": \"herramienta\", \"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 102}}\n    if len(observaciones) == 1:\n        return {\"tipo\": \"herramienta\", \"herramienta\": \"porcentaje\", \"argumentos\": {\"parte\": 3, \"total\": 12}}\n    return {\"tipo\": \"respuesta\", \"texto\": f\"Tu pedido está {observaciones[0]} y el avance es {observaciones[1]} %.\"}\n\ndef ejecutar_agente(politica, herramientas, max_pasos):\n    observaciones = []\n    for paso in range(1, max_pasos + 1):\n        accion = politica(observaciones)\n        if accion[\"tipo\"] == \"respuesta\":\n            print(\"respuesta:\", accion[\"texto\"])\n            return\n        resultado = ejecutar(accion, herramientas)\n        observaciones.append(resultado)\n        print(f\"paso {paso}: {accion['herramienta']} -> {resultado}\")\n    print(\"limite de pasos\")\n\nejecutar_agente(politica_simulada, HERRAMIENTAS, 5)\nprint(\"---\")\nejecutar_agente(politica_simulada, HERRAMIENTAS, 1)",
      pistas: ["Un bucle `for paso in range(1, max_pasos + 1)` limita los pasos.", "Si el bucle termina sin respuesta, imprime `limite de pasos`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"paso 1: consultar_pedido -> en preparacion\",\"paso 2: porcentaje -> 25.0\",\"respuesta: Tu pedido está en preparacion y el avance es 25.0 %.\",\"---\",\"paso 1: consultar_pedido -> en preparacion\",\"limite de pasos\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: paso 1: consultar_pedido -> en preparacion\npaso 2: porcentaje -> 25.0\nrespuesta: Tu pedido está en preparacion y el avance es 25.0 %.\n---\npaso 1: consultar_pedido -> en preparacion\nlimite de pasos" }
      },
    },
    reto: {
      id: "m49-l3-reto",
      enunciado: "Añade **aprobación humana**. Las herramientas de la lista `RIESGOSAS` no se ejecutan sin que `aprobar(accion)` devuelva `True`. Si la persona rechaza, imprime `paso N: <herramienta> -> rechazado por la persona` y termina el agente. Prueba con una política que intenta `reembolsar` (aprobado en el primer caso, rechazado en el segundo).",
      codigoInicial: "HERRAMIENTAS = {\"consultar_pedido\": lambda id: \"enviado\", \"reembolsar\": lambda id: \"reembolso emitido\"}\nRIESGOSAS = [\"reembolsar\"]\n\ndef politica(observaciones):\n    if not observaciones:\n        return {\"tipo\": \"herramienta\", \"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 101}}\n    if len(observaciones) == 1:\n        return {\"tipo\": \"herramienta\", \"herramienta\": \"reembolsar\", \"argumentos\": {\"id\": 101}}\n    return {\"tipo\": \"respuesta\", \"texto\": \"Listo.\"}\n\ndef ejecutar_agente(politica, herramientas, aprobar, max_pasos=5):\n    pass\n\nprint(\"== aprueba ==\")\nejecutar_agente(politica, HERRAMIENTAS, lambda accion: True)\nprint(\"== rechaza ==\")\nejecutar_agente(politica, HERRAMIENTAS, lambda accion: False)",
      solucion: "HERRAMIENTAS = {\"consultar_pedido\": lambda id: \"enviado\", \"reembolsar\": lambda id: \"reembolso emitido\"}\nRIESGOSAS = [\"reembolsar\"]\n\ndef politica(observaciones):\n    if not observaciones:\n        return {\"tipo\": \"herramienta\", \"herramienta\": \"consultar_pedido\", \"argumentos\": {\"id\": 101}}\n    if len(observaciones) == 1:\n        return {\"tipo\": \"herramienta\", \"herramienta\": \"reembolsar\", \"argumentos\": {\"id\": 101}}\n    return {\"tipo\": \"respuesta\", \"texto\": \"Listo.\"}\n\ndef ejecutar_agente(politica, herramientas, aprobar, max_pasos=5):\n    observaciones = []\n    for paso in range(1, max_pasos + 1):\n        accion = politica(observaciones)\n        if accion[\"tipo\"] == \"respuesta\":\n            print(\"respuesta:\", accion[\"texto\"])\n            return\n        nombre = accion[\"herramienta\"]\n        if nombre in RIESGOSAS and not aprobar(accion):\n            print(f\"paso {paso}: {nombre} -> rechazado por la persona\")\n            return\n        resultado = herramientas[nombre](**accion[\"argumentos\"])\n        observaciones.append(resultado)\n        print(f\"paso {paso}: {nombre} -> {resultado}\")\n    print(\"limite de pasos\")\n\nprint(\"== aprueba ==\")\nejecutar_agente(politica, HERRAMIENTAS, lambda accion: True)\nprint(\"== rechaza ==\")\nejecutar_agente(politica, HERRAMIENTAS, lambda accion: False)",
      pistas: ["Comprueba `nombre in RIESGOSAS and not aprobar(accion)` antes de ejecutar.", "Al rechazar, imprime el mensaje y haz `return`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"== aprueba ==\",\"paso 1: consultar_pedido -> enviado\",\"paso 2: reembolsar -> reembolso emitido\",\"respuesta: Listo.\",\"== rechaza ==\",\"paso 1: consultar_pedido -> enviado\",\"paso 2: reembolsar -> rechazado por la persona\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: == aprueba ==\npaso 1: consultar_pedido -> enviado\npaso 2: reembolsar -> reembolso emitido\nrespuesta: Listo.\n== rechaza ==\npaso 1: consultar_pedido -> enviado\npaso 2: reembolsar -> rechazado por la per" }
      },
    },
    verificacion: [
      {
        id: "m49-l3-q1",
        pregunta: "¿Cuál es el ciclo básico de un agente?",
        opciones: ["Entrenar, evaluar, desplegar", "Decidir, actuar con una herramienta, observar y repetir", "Leer, escribir, borrar", "Consultar una sola vez"],
        respuestaCorrecta: 1,
        explicacion: "El modelo decide la siguiente acción en cada vuelta, usando lo observado.",
      },
      {
        id: "m49-l3-q2",
        pregunta: "¿Por qué hay que poner un límite de pasos?",
        opciones: ["Para que sea más rápido siempre", "Para evitar bucles infinitos y costos inesperados", "Porque la API lo exige", "Para cifrar los datos"],
        respuestaCorrecta: 1,
        explicacion: "Un agente puede repetir acciones sin avanzar; el límite acota tiempo y gasto.",
      },
      {
        id: "m49-l3-q3",
        pregunta: "¿Cuándo se necesita aprobación humana?",
        opciones: ["Nunca", "En acciones con efectos difíciles de revertir (reembolsos, borrados, pagos)", "Solo en consultas", "Solo de noche"],
        respuestaCorrecta: 1,
        explicacion: "A más autonomía y más impacto, más necesidad de supervisión.",
      },
    ],
    resumen: ["Un agente decide, actúa, observa y repite; es flexible pero menos predecible y más caro.", "Empieza simple; usa agentes cuando el camino no se puede definir de antemano.", "Límite de pasos, herramientas mínimas, aprobación humana en lo irreversible y trazas."],
    proximoPaso: "Aplicaremos todo a una tarea típica de analista: automatizar la clasificación de tickets y decidir si conviene usar un modelo.",
    conceptos: ["agentes", "human-in-the-loop"],
  },
  {
    id: "m49-l4",
    moduloId: "modulo-49",
    titulo: "Automatizar tareas de analista: clasificar, extraer y decidir si vale la pena",
    objetivo: "Aplicar un modelo a tareas repetitivas (clasificar, resumir, extraer), enviar a revisión humana los casos de baja confianza y estimar costos para decidir entre reglas, un modelo o procesamiento manual.",
    porQueImporta:
      "Clasificar miles de tickets, extraer datos de correos o resumir comentarios son tareas donde un modelo ahorra mucho tiempo. La decisión profesional no es «usar IA», sino si conviene frente a las alternativas, y cómo controlar los errores.",
    concepto: "> **Nota**: este curso **no llama a ningún modelo de lenguaje real**. Los «modelos» de los ejercicios son funciones simuladas y deterministas; practicas la lógica de la aplicación que los rodea. Para usar un modelo real necesitas una cuenta y una clave de API de un proveedor.\n\nTareas donde un modelo de lenguaje suele aportar: **clasificar** textos (tickets, reseñas), **extraer** campos (fechas, importes, nombres de un correo), **resumir** y **normalizar** (unificar nombres de proveedores, corregir formatos).\n\n**¿Reglas, modelo clásico o LLM?**\n\n- **Reglas** (palabras clave, expresiones regulares): baratas, rápidas y explicables; sirven cuando los casos son simples y estables.\n- **Modelo clásico de machine learning** (por ejemplo, TF-IDF + regresión logística): muy bueno cuando tienes miles de ejemplos etiquetados y las categorías son fijas; barato de ejecutar.\n- **LLM**: flexible, sin necesidad de entrenar con muchos datos, bueno con lenguaje variado; cuesta más por documento, es más lento y requiere validar la salida.\n\nCriterios: volumen, variedad del lenguaje, costo de un error, latencia permitida, privacidad de los datos y facilidad de mantenimiento.\n\n**Diseño del flujo**: clasificar, validar el formato, y enviar a **revisión humana** los casos de **baja confianza** o de alto impacto. Mide la exactitud sobre una muestra etiquetada antes de automatizar y vuelve a medir de forma periódica.\n\n**Costos y eficiencia**: el costo por documento = tokens de entrada y de salida × precios. Para volúmenes grandes hay palancas: prompts breves, **caché de prompts** para la parte repetida, modelos más pequeños para tareas sencillas y **procesamiento por lotes** (algunos proveedores lo ofrecen con descuento si no necesitas la respuesta inmediata). Compara siempre contra el costo del trabajo manual y contra el costo de los errores.\n\nLos precios y tiempos de los ejercicios son **ficticios**.",
    ejemploMinimo: "import pandas as pd\n\ntickets = pd.DataFrame({\"texto\": [\"Mi pedido no llegó\", \"Cobro doble en mi tarjeta\", \"Quiero devolver el teclado\"],\n                        \"categoria_modelo\": [\"envio\", \"pago\", \"devolucion\"],\n                        \"confianza\": [0.95, 0.88, 0.55]})\nprint(tickets[[\"categoria_modelo\", \"confianza\"]])",
    ejemploAplicado: "import pandas as pd\n\ntickets = pd.DataFrame({\n    \"categoria_modelo\": [\"envio\", \"pago\", \"devolucion\", \"envio\", \"pago\", \"envio\"],\n    \"confianza\": [0.95, 0.88, 0.55, 0.91, 0.62, 0.97],\n})\ntickets[\"revision_humana\"] = tickets[\"confianza\"] < 0.7\nprint(tickets[\"revision_humana\"].value_counts().to_dict())\nprint(tickets.groupby(\"categoria_modelo\").size().to_dict())",
    errorFrecuente: {
      codigo: "# Se automatiza la clasificación y se envía el reporte a la dirección, sin medir la exactitud ni revisar casos dudosos",
      explicacion:
        "Automatizar sin medir es apostar. Antes de poner un modelo a trabajar sin supervisión, evalúa su exactitud sobre una muestra etiquetada, define qué pasa con los casos de baja confianza (revisión humana) y vuelve a medir de forma periódica porque los datos cambian con el tiempo.",
    },
    practicaGuiada: {
      id: "m49-l4-practica",
      enunciado: "Con la tabla de tickets clasificados, marca para **revisión humana** los de confianza menor a `0.7` y calcula cuántos tickets son de cada categoría **sin revisión** (los automáticos). Imprime primero el número de tickets a revisión y después, en orden alfabético de categoría, `categoria cantidad` para los automáticos.",
      codigoInicial: "import pandas as pd\n\ntickets = pd.DataFrame({\n    \"categoria_modelo\": [\"envio\", \"pago\", \"devolucion\", \"envio\", \"pago\", \"envio\", \"devolucion\", \"pago\"],\n    \"confianza\": [0.95, 0.88, 0.55, 0.91, 0.62, 0.97, 0.80, 0.93],\n})\n\nprint(None)",
      solucion: "import pandas as pd\n\ntickets = pd.DataFrame({\n    \"categoria_modelo\": [\"envio\", \"pago\", \"devolucion\", \"envio\", \"pago\", \"envio\", \"devolucion\", \"pago\"],\n    \"confianza\": [0.95, 0.88, 0.55, 0.91, 0.62, 0.97, 0.80, 0.93],\n})\n\nrevision = tickets[\"confianza\"] < 0.7\nprint(int(revision.sum()))\nautomaticos = tickets[~revision].groupby(\"categoria_modelo\").size()\nfor categoria, n in automaticos.items():\n    print(categoria, n)",
      pistas: ["`tickets[\"confianza\"] < 0.7` da una serie booleana.", "Los automáticos son `tickets[~revision]`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"2\",\"devolucion 1\",\"envio 3\",\"pago 2\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 2\ndevolucion 1\nenvio 3\npago 2" }
      },
    },
    reto: {
      id: "m49-l4-reto",
      enunciado: "Estima el costo **mensual** de clasificar 20 000 tickets con un modelo y compáralo con el manual. Datos ficticios: 350 tokens de entrada y 30 de salida por ticket; precios de 1 (entrada) y 5 (salida) dólares por millón de tokens; con procesamiento por lotes el precio baja un 50 %; clasificar a mano toma 20 segundos por ticket a 6 dólares la hora. Imprime `estandar`, `lotes` y `manual` (en dólares, 2 decimales), una por línea (`estandar 10.0`).",
      codigoInicial: "TICKETS = 20000\nTOK_ENTRADA, TOK_SALIDA = 350, 30\nPRECIO_ENTRADA, PRECIO_SALIDA = 1, 5          # dólares por millón de tokens (ficticios)\nDESCUENTO_LOTES = 0.5\nSEGUNDOS_MANUAL, DOLARES_HORA = 20, 6\n\nestandar = None\nprint(\"estandar\", estandar)",
      solucion: "TICKETS = 20000\nTOK_ENTRADA, TOK_SALIDA = 350, 30\nPRECIO_ENTRADA, PRECIO_SALIDA = 1, 5          # dólares por millón de tokens (ficticios)\nDESCUENTO_LOTES = 0.5\nSEGUNDOS_MANUAL, DOLARES_HORA = 20, 6\n\nestandar = TICKETS * (TOK_ENTRADA * PRECIO_ENTRADA + TOK_SALIDA * PRECIO_SALIDA) / 1_000_000\nlotes = estandar * (1 - DESCUENTO_LOTES)\nmanual = TICKETS * SEGUNDOS_MANUAL / 3600 * DOLARES_HORA\nprint(\"estandar\", round(estandar, 2))\nprint(\"lotes\", round(lotes, 2))\nprint(\"manual\", round(manual, 2))",
      pistas: ["Costo por ticket = (350 × 1 + 30 × 5) / 1 000 000.", "El manual: tickets × segundos / 3600 × dólares por hora."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"estandar 10.0\",\"lotes 5.0\",\"manual 666.67\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: estandar 10.0\nlotes 5.0\nmanual 666.67" }
      },
    },
    verificacion: [
      {
        id: "m49-l4-q1",
        pregunta: "¿Cuándo conviene más un modelo clásico que un LLM para clasificar?",
        opciones: ["Nunca", "Con muchos ejemplos etiquetados y categorías fijas, por costo y rapidez", "Con pocos datos y categorías cambiantes", "Cuando el lenguaje es muy variable"],
        respuestaCorrecta: 1,
        explicacion: "Si tienes datos suficientes y el problema es estable, un clasificador clásico es más barato y rápido.",
      },
      {
        id: "m49-l4-q2",
        pregunta: "¿Qué se hace con los casos de baja confianza?",
        opciones: ["Se descartan", "Se envían a revisión humana", "Se publican igual", "Se reintentan sin límite"],
        respuestaCorrecta: 1,
        explicacion: "La revisión humana de lo dudoso protege la calidad del proceso.",
      },
      {
        id: "m49-l4-q3",
        pregunta: "¿Qué se compara para decidir si conviene automatizar?",
        opciones: ["Solo el costo del modelo", "Costo del modelo frente al trabajo manual, calidad medida y costo de los errores", "Solo la velocidad", "Nada"],
        respuestaCorrecta: 1,
        explicacion: "La decisión incluye costo, calidad, riesgo y mantenimiento.",
      },
    ],
    resumen: ["Los LLM aportan en clasificar, extraer, resumir y normalizar, con salida validada.", "Compara reglas, modelo clásico y LLM según volumen, variedad, riesgo, latencia y privacidad.", "Mide antes de automatizar, revisa lo dudoso y estima costos con lotes y caché."],
    proximoPaso: "Último módulo: uso responsable (privacidad, sesgos, regulación) y el proyecto final del curso.",
    conceptos: ["automatizacion", "costo-por-ticket"],
  },
]
