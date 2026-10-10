import type { Lesson } from '../../types'

export const module47Lessons: Lesson[] = [
  {
    id: "m47-l1",
    moduloId: "modulo-47",
    titulo: "Qué es un modelo de lenguaje: tokens, contexto y costo",
    objetivo: "Entender cómo un modelo de lenguaje procesa texto en tokens, qué es la ventana de contexto y cómo se calcula el costo de una llamada, incluida la conversación que crece.",
    porQueImporta:
      "Antes de construir con IA conviene entender de qué está hecha: el texto se mide en tokens, los modelos tienen un límite de contexto y se cobra por tokens de entrada y de salida. Eso determina qué se puede construir y cuánto cuesta.",
    concepto: "> **Nota**: este curso **no llama a ningún modelo de lenguaje real**: el navegador del curso no tiene cuenta ni claves de ningún proveedor. Practicas la **lógica de las aplicaciones con IA** (tokens y costos, prompts, validación, recuperación de información, herramientas, evaluación, privacidad) con funciones y «modelos simulados» deterministas que se corrigen automáticamente. Para llamar a un modelo real necesitas una cuenta y una clave de API del proveedor que elijas.\n\nUn **modelo de lenguaje grande** (LLM) es un modelo entrenado con enormes cantidades de texto para **predecir el siguiente fragmento de texto** dado lo anterior. Aplicado una y otra vez, genera respuestas completas. No «consulta una base de datos»: genera texto plausible a partir de patrones aprendidos y del contexto que le das.\n\n**Tokens**. Los modelos no leen letras ni palabras, sino **tokens**: fragmentos de texto (una palabra corta, parte de una palabra, un signo). Como regla aproximada, en inglés un token son unos 4 caracteres; en español suele haber algo más de tokens por palabra. Cada proveedor usa su propio tokenizador, así que el conteo **exacto** se obtiene con la herramienta de conteo del proveedor, no con una regla.\n\n**Ventana de contexto**: el máximo de tokens que el modelo puede considerar en una llamada (entrada + salida). Todo lo que quieres que «sepa» (instrucciones, documentos, historial de la conversación) debe caber ahí.\n\n**Costo**. Los proveedores cobran por **millón de tokens**, con precios distintos para la entrada y para la salida (la salida suele costar varias veces más). Costo = `(tokens_entrada × precio_entrada + tokens_salida × precio_salida) / 1 000 000`. Los precios cambian: consulta siempre la página oficial del proveedor.\n\n**La conversación crece**: la API de los modelos no recuerda nada entre llamadas. En cada turno **reenvías todo el historial**, así que los tokens de entrada crecen turno a turno y el costo acumulado de una conversación larga crece más que linealmente. Algunos proveedores ofrecen **caché de prompts**: la parte repetida del inicio se factura más barata. Y para historiales muy largos se resumen o recortan los turnos antiguos.\n\nLos precios de los ejercicios (3 y 15 dólares por millón de tokens) son **ficticios**, solo para practicar el cálculo.",
    ejemploMinimo: "import re\n\ntexto = \"Los modelos de lenguaje leen tokens, no palabras.\"\ntokens_aprox = re.findall(r\"\\w+|[^\\w\\s]\", texto)   # aproximación muy simple: palabras y signos\nprint(len(texto), \"caracteres;\", len(tokens_aprox), \"piezas;\", \"regla 4 car/token:\", len(texto) // 4)",
    ejemploAplicado: "import math\n\ndef estimar_tokens(texto, caracteres_por_token=4):\n    \"\"\"Estimación aproximada (no es el conteo real de ningún proveedor).\"\"\"\n    return math.ceil(len(texto) / caracteres_por_token)\n\ndocumento = \"Resumen del informe trimestral de ventas. \" * 50\ntokens = estimar_tokens(documento)\nprint(\"Tokens estimados:\", tokens)\nprint(\"Cabe en una ventana de 8 000 tokens:\", tokens < 8000)",
    errorFrecuente: {
      codigo: "Presupuesto calculado como: tokens de la pregunta × precio de entrada\n→ olvida el system prompt, el historial reenviado en cada turno y los tokens de la respuesta",
      explicacion:
        "El costo real de una llamada incluye **todo** lo que se envía (instrucciones del sistema, historial, documentos de contexto) y todo lo que el modelo genera. Calcular solo la pregunta del usuario subestima el costo por mucho, sobre todo en conversaciones largas o con documentos recuperados.",
    },
    practicaGuiada: {
      id: "m47-l1-practica",
      enunciado: "Escribe `costo(tokens_entrada, tokens_salida, precio_entrada, precio_salida)`: el costo en dólares de una llamada, con los precios **por millón de tokens**. El programa calcula el costo con precios ficticios de 3 (entrada) y 15 (salida) dólares por millón.",
      codigoInicial: "def costo(tokens_entrada, tokens_salida, precio_entrada, precio_salida):\n    return None\n\nprint(costo(2000, 500, 3, 15))\nprint(costo(10000, 1000, 3, 15))",
      solucion: "def costo(tokens_entrada, tokens_salida, precio_entrada, precio_salida):\n    return (tokens_entrada * precio_entrada + tokens_salida * precio_salida) / 1_000_000\n\nprint(costo(2000, 500, 3, 15))\nprint(costo(10000, 1000, 3, 15))",
      pistas: ["Costo = (entrada × precio_entrada + salida × precio_salida) / 1 000 000."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"0.0135\",\"0.045\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 0.0135\n0.045" }
      },
    },
    reto: {
      id: "m47-l1-reto",
      enunciado: "Simula una conversación de 6 turnos en la que **se reenvía todo el historial** en cada llamada. El *system prompt* tiene 300 tokens; cada mensaje del usuario, 100; cada respuesta, 200. En el turno `k` la entrada es: system + los `k-1` turnos anteriores completos (usuario + respuesta) + el mensaje nuevo del usuario. Imprime los tokens de entrada de cada turno y, al final, el **total de entrada facturado**.",
      codigoInicial: "SISTEMA, USUARIO, RESPUESTA = 300, 100, 200\n\ntotal = 0\n# calcula los tokens de entrada de cada turno (1 a 6), imprímelos y acumula el total\nprint(\"total\", total)",
      solucion: "SISTEMA, USUARIO, RESPUESTA = 300, 100, 200\n\ntotal = 0\nfor turno in range(1, 7):\n    entrada = SISTEMA + (turno - 1) * (USUARIO + RESPUESTA) + USUARIO\n    total += entrada\n    print(turno, entrada)\nprint(\"total\", total)",
      pistas: ["En el turno `k` hay `k - 1` turnos anteriores completos.", "Entrada del turno = SISTEMA + (k-1) × (USUARIO + RESPUESTA) + USUARIO."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"1 400\",\"2 700\",\"3 1000\",\"4 1300\",\"5 1600\",\"6 1900\",\"total 6900\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 1 400\n2 700\n3 1000\n4 1300\n5 1600\n6 1900\ntotal 6900" }
      },
    },
    verificacion: [
      {
        id: "m47-l1-q1",
        pregunta: "¿Qué es un token?",
        opciones: ["Una palabra completa siempre", "Un fragmento de texto que el modelo procesa (parte de una palabra, una palabra o un signo)", "Una clave de acceso", "Un tipo de modelo"],
        respuestaCorrecta: 1,
        explicacion: "Los modelos leen y generan tokens; el número de tokens, no el de palabras, determina el límite de contexto y el costo.",
      },
      {
        id: "m47-l1-q2",
        pregunta: "¿Por qué crece el costo de una conversación larga más que linealmente?",
        opciones: ["Porque los modelos se cansan", "Porque en cada turno se reenvía todo el historial como entrada", "Porque la salida cuesta menos", "No crece"],
        respuestaCorrecta: 1,
        explicacion: "La API no recuerda: cada llamada incluye todo el contexto anterior, que se vuelve más largo turno a turno.",
      },
      {
        id: "m47-l1-q3",
        pregunta: "¿Cómo se obtiene el conteo exacto de tokens de un texto?",
        opciones: ["Dividiendo caracteres entre 4", "Con la herramienta de conteo del proveedor del modelo", "Contando palabras", "Con cualquier tokenizador"],
        respuestaCorrecta: 1,
        explicacion: "Cada proveedor tiene su tokenizador; la regla de 4 caracteres es solo una aproximación.",
      },
    ],
    resumen: ["Un LLM predice texto token a token a partir del contexto que le das.", "Costo = tokens de entrada y de salida por sus precios; la conversación reenvía el historial en cada turno.", "El conteo exacto lo da el proveedor; las reglas solo estiman."],
    proximoPaso: "Veremos cómo elige el modelo cada token: probabilidades y temperatura.",
    conceptos: ["llm", "tokens", "costo-llm"],
  },
  {
    id: "m47-l2",
    moduloId: "modulo-47",
    titulo: "Cómo elige el modelo el siguiente token: probabilidades y temperatura",
    objetivo: "Entender cómo se convierten las puntuaciones del modelo en probabilidades (softmax), cómo la temperatura cambia la variedad de las respuestas y por qué dos respuestas pueden diferir.",
    porQueImporta:
      "Explica por qué el mismo prompt puede dar respuestas distintas, por qué a veces conviene respuestas más deterministas y por qué una aplicación seria no puede depender de que el modelo responda siempre igual.",
    concepto: "> **Nota**: este curso **no llama a ningún modelo de lenguaje real**: el navegador del curso no tiene cuenta ni claves de ningún proveedor. Practicas la **lógica de las aplicaciones con IA** (tokens y costos, prompts, validación, recuperación de información, herramientas, evaluación, privacidad) con funciones y «modelos simulados» deterministas que se corrigen automáticamente. Para llamar a un modelo real necesitas una cuenta y una clave de API del proveedor que elijas.\n\nEn cada paso el modelo calcula una **puntuación** (*logit*) para cada token posible. La función **softmax** las convierte en probabilidades que suman 1:\n\n`p_i = exp(z_i) / Σ exp(z_j)`\n\nDespués se **elige** un token:\n\n- **Voraz** (*greedy*): siempre el más probable. Es determinista.\n- **Muestreo**: se sortea según las probabilidades, así que el resultado varía entre ejecuciones.\n\nLa **temperatura** `T` reescala las puntuaciones antes del softmax (`z / T`):\n\n- `T` baja (cercana a 0): la distribución se concentra en el token más probable → respuestas más predecibles.\n- `T = 1`: la distribución original.\n- `T` alta: se aplana → más variedad, pero también más probabilidad de respuestas poco coherentes.\n\nOtros controles de muestreo son **top-k** (solo los k tokens más probables) y **top-p** (el conjunto mínimo cuya probabilidad suma p).\n\nConsecuencias prácticas:\n\n- Para extracción de datos, clasificación o código, interesa poca variación; para lluvia de ideas, más.\n- **Aun con temperatura baja no hay garantía de respuestas idénticas** en todos los proveedores y modelos (hay otras fuentes de variación). Una aplicación debe validar la salida, no confiar en que sea siempre igual.\n- Algunos modelos recientes limitan o ya no exponen estos parámetros de muestreo y los gestionan internamente: consulta la documentación del modelo que uses. Los conceptos siguen siendo la base para entender el comportamiento.",
    ejemploMinimo: "import numpy as np\n\ndef softmax(z):\n    e = np.exp(z - np.max(z))     # restar el máximo evita desbordamientos\n    return e / e.sum()\n\nprint(np.round(softmax(np.array([2.0, 1.0, 0.1])), 3))",
    ejemploAplicado: "import numpy as np\n\ndef softmax(z):\n    e = np.exp(z - np.max(z))\n    return e / e.sum()\n\nlogits = np.array([2.0, 1.0, 0.1])\nfor T in (0.5, 1.0, 2.0):\n    print(\"T =\", T, np.round(softmax(logits / T), 3))",
    errorFrecuente: {
      codigo: "temperatura = 0.9\n# \"Con temperatura baja el modelo siempre responderá lo mismo, así que no necesito validar la salida\"",
      explicacion:
        "La temperatura baja reduce la variación, pero no la elimina ni garantiza que la salida cumpla el formato que esperas. Cualquier aplicación que use la respuesta del modelo en un proceso (una base de datos, otra función) debe **validarla** y manejar los casos en que falle.",
    },
    practicaGuiada: {
      id: "m47-l2-practica",
      enunciado: "Implementa `softmax_con_temperatura(logits, T)` (divide los logits entre `T` y aplica softmax) y muestra las probabilidades redondeadas a 3 decimales para `T = 0.5`, `1` y `2`.",
      codigoInicial: "import numpy as np\n\ndef softmax_con_temperatura(logits, T):\n    return None\n\nlogits = np.array([2.0, 1.0, 0.1])\nfor T in (0.5, 1, 2):\n    print(T, softmax_con_temperatura(logits, T))",
      solucion: "import numpy as np\n\ndef softmax_con_temperatura(logits, T):\n    z = np.asarray(logits) / T\n    e = np.exp(z - np.max(z))\n    return np.round(e / e.sum(), 3)\n\nlogits = np.array([2.0, 1.0, 0.1])\nfor T in (0.5, 1, 2):\n    print(T, softmax_con_temperatura(logits, T))",
      pistas: ["Divide los logits entre `T` antes del softmax.", "Redondea con `np.round(..., 3)`."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"0.5 [0.864 0.117 0.019]\",\"1 [0.659 0.242 0.099]\",\"2 [0.502 0.304 0.194]\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 0.5 [0.864 0.117 0.019]\n1 [0.659 0.242 0.099]\n2 [0.502 0.304 0.194]" }
      },
    },
    reto: {
      id: "m47-l2-reto",
      enunciado: "Calcula la **probabilidad del token más probable** (el primero) para cada temperatura de la lista `[0.2, 0.5, 1, 2, 5]` con los mismos logits, redondeada a 3 decimales, e imprime `T probabilidad`. Verás que sube cuando la temperatura baja y se aplana cuando sube.",
      codigoInicial: "import numpy as np\n\nlogits = np.array([2.0, 1.0, 0.1])\nfor T in (0.2, 0.5, 1, 2, 5):\n    print(T)",
      solucion: "import numpy as np\n\ndef softmax(z):\n    e = np.exp(z - np.max(z))\n    return e / e.sum()\n\nlogits = np.array([2.0, 1.0, 0.1])\nfor T in (0.2, 0.5, 1, 2, 5):\n    print(T, round(float(softmax(logits / T)[0]), 3))",
      pistas: ["Aplica softmax a `logits / T` y toma el primer elemento.", "La probabilidad de `T = 0.2` es cercana a 1."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"0.2 0.993\",\"0.5 0.864\",\"1 0.659\",\"2 0.502\",\"5 0.4\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 0.2 0.993\n0.5 0.864\n1 0.659\n2 0.502\n5 0.4" }
      },
    },
    verificacion: [
      {
        id: "m47-l2-q1",
        pregunta: "¿Qué efecto tiene una temperatura muy baja?",
        opciones: ["Respuestas más variadas", "Respuestas más predecibles, concentradas en el token más probable", "Respuestas más largas", "Ningún efecto"],
        respuestaCorrecta: 1,
        explicacion: "Concentra la distribución en las opciones de mayor probabilidad.",
      },
      {
        id: "m47-l2-q2",
        pregunta: "¿Garantiza una temperatura baja que el modelo responda exactamente igual cada vez?",
        opciones: ["Sí, siempre", "No: reduce la variación pero no la elimina", "Solo con top-p", "Solo con prompts largos"],
        respuestaCorrecta: 1,
        explicacion: "Hay otras fuentes de variación y no todos los modelos exponen estos parámetros; hay que validar la salida.",
      },
      {
        id: "m47-l2-q3",
        pregunta: "¿Qué hace la función softmax?",
        opciones: ["Ordena los tokens", "Convierte puntuaciones en probabilidades que suman 1", "Cuenta tokens", "Elimina duplicados"],
        respuestaCorrecta: 1,
        explicacion: "Transforma los logits en una distribución de probabilidad sobre los tokens posibles.",
      },
    ],
    resumen: ["Softmax convierte puntuaciones en probabilidades; luego se elige un token (voraz o por muestreo).", "La temperatura aplana o concentra la distribución.", "Nunca confíes en que la salida sea idéntica o tenga el formato correcto: valídala."],
    proximoPaso: "Veremos los límites de estos modelos: alucinaciones, fecha de corte y cómo verificar.",
    conceptos: ["softmax", "temperatura"],
  },
  {
    id: "m47-l3",
    moduloId: "modulo-47",
    titulo: "Límites de los modelos: alucinaciones, fecha de corte y verificación",
    objetivo: "Reconocer las limitaciones de los modelos de lenguaje (datos inventados, conocimiento desactualizado, sesgos) y verificar automáticamente afirmaciones contra una fuente confiable.",
    porQueImporta:
      "Un modelo puede escribir con total seguridad una cifra o una cita inexistente. Quien construye aplicaciones con IA debe diseñar la verificación desde el principio, no esperar que el modelo «no se equivoque».",
    concepto: "> **Nota**: este curso **no llama a ningún modelo de lenguaje real**: el navegador del curso no tiene cuenta ni claves de ningún proveedor. Practicas la **lógica de las aplicaciones con IA** (tokens y costos, prompts, validación, recuperación de información, herramientas, evaluación, privacidad) con funciones y «modelos simulados» deterministas que se corrigen automáticamente. Para llamar a un modelo real necesitas una cuenta y una clave de API del proveedor que elijas.\n\nLimitaciones que afectan a cualquier aplicación:\n\n- **Alucinaciones (confabulación)**: el modelo produce texto plausible pero falso: cifras, citas, funciones de librerías que no existen. No «sabe que no sabe»: puede responder con seguridad aunque se equivoque.\n- **Fecha de corte**: el conocimiento propio del modelo termina en la fecha de su entrenamiento. No conoce lo posterior, a menos que se lo des como contexto o use una herramienta de búsqueda.\n- **Sesgos**: reflejan sesgos presentes en los datos de entrenamiento.\n- **Sensibilidad al prompt**: cambios pequeños en la redacción pueden cambiar la respuesta.\n- **Aritmética y datos exactos**: no son su punto fuerte si calculan «de memoria»; es mejor que usen una herramienta (calculadora, base de datos).\n\n**Cómo se reducen los riesgos** en una aplicación:\n\n1. **Darle la fuente**: poner en el prompt los documentos o datos relevantes y pedir que responda **solo** con ellos (lo veremos en RAG).\n2. **Exigir citas** y comprobar que existen en las fuentes entregadas.\n3. **Verificar lo verificable**: cifras, fechas, nombres contra la base de datos.\n4. **Herramientas** para cálculo y consulta de datos.\n5. **Revisión humana** en las decisiones de alto impacto, y avisar a quien usa el sistema de que puede equivocarse.\n\nLa verificación automática no descarta todos los errores, pero atrapa los más costosos (una cifra equivocada en un reporte).",
    ejemploMinimo: "respuesta_modelo = \"Las ventas de 2024 fueron 2 122 730.\"\ncifra_real = 2122730\ncifra_en_respuesta = int(respuesta_modelo.split(\"fueron\")[1].strip(\" .\").replace(\" \", \"\"))\nprint(\"Coincide con la fuente:\", cifra_en_respuesta == cifra_real)",
    ejemploAplicado: "datos = {\"2023\": 1773060, \"2024\": 2122730}\nafirmaciones = [(\"2023\", 1773060), (\"2024\", 2000000)]   # (año, cifra que dijo el modelo)\n\nfor anio, dicho in afirmaciones:\n    estado = \"OK\" if datos[anio] == dicho else f\"ERROR (real: {datos[anio]})\"\n    print(anio, dicho, estado)",
    errorFrecuente: {
      codigo: "pregunta = \"¿Cuál fue el ingreso de 2024?\"\nrespuesta = llamar_modelo(pregunta)      # sin darle los datos\nguardar_en_reporte(respuesta)            # se publica sin verificar",
      explicacion:
        "Preguntar por cifras internas sin darle los datos al modelo y publicar su respuesta sin verificarla es la receta de la alucinación en un reporte. El modelo no conoce los datos de tu empresa: entrégaselos como contexto, o haz que los consulte con una herramienta, y verifica el resultado.",
    },
    practicaGuiada: {
      id: "m47-l3-practica",
      enunciado: "Escribe `afirmaciones_incorrectas(afirmaciones, datos)`: recibe una lista de pares `(clave, valor_dicho)` y un diccionario de datos reales, y devuelve la **lista de claves cuyo valor no coincide** (o que no existen en los datos), en el orden recibido.",
      codigoInicial: "def afirmaciones_incorrectas(afirmaciones, datos):\n    return None\n\ndatos = {\"Norte\": 100, \"Sur\": 80, \"Este\": 120}\ndicho = [(\"Norte\", 100), (\"Sur\", 90), (\"Este\", 120), (\"Oeste\", 70)]\nprint(afirmaciones_incorrectas(dicho, datos))",
      solucion: "def afirmaciones_incorrectas(afirmaciones, datos):\n    return [clave for clave, valor in afirmaciones if datos.get(clave) != valor]\n\ndatos = {\"Norte\": 100, \"Sur\": 80, \"Este\": 120}\ndicho = [(\"Norte\", 100), (\"Sur\", 90), (\"Este\", 120), (\"Oeste\", 70)]\nprint(afirmaciones_incorrectas(dicho, datos))",
      pistas: ["`datos.get(clave)` devuelve `None` si la clave no existe.", "Una lista por comprensión basta."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"['Sur', 'Oeste']\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: ['Sur', 'Oeste']" }
      },
    },
    reto: {
      id: "m47-l3-reto",
      enunciado: "Escribe `citas_inexistentes(respuesta, ids_fuentes)`: la respuesta del modelo cita fuentes como `[doc:3]`. Devuelve la **lista ordenada de ids citados que no existen** en `ids_fuentes` (una cita a una fuente que no se entregó es señal de invención). Usa `re.findall(r\"\\[doc:(\\d+)\\]\", respuesta)`.",
      codigoInicial: "import re\n\ndef citas_inexistentes(respuesta, ids_fuentes):\n    return None\n\nrespuesta = \"El envío tarda 2 días [doc:1]. Hay garantía de 24 meses [doc:7] y devolución en 30 días [doc:2].\"\nprint(citas_inexistentes(respuesta, {1, 2, 3}))",
      solucion: "import re\n\ndef citas_inexistentes(respuesta, ids_fuentes):\n    citados = {int(i) for i in re.findall(r\"\\[doc:(\\d+)\\]\", respuesta)}\n    return sorted(citados - set(ids_fuentes))\n\nrespuesta = \"El envío tarda 2 días [doc:1]. Hay garantía de 24 meses [doc:7] y devolución en 30 días [doc:2].\"\nprint(citas_inexistentes(respuesta, {1, 2, 3}))",
      pistas: ["Convierte los ids encontrados a enteros y usa conjuntos.", "La diferencia `citados - set(ids_fuentes)` da los inexistentes."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"[7]\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: [7]" }
      },
    },
    verificacion: [
      {
        id: "m47-l3-q1",
        pregunta: "¿Qué es una alucinación en un modelo de lenguaje?",
        opciones: ["Un error de red", "Texto plausible pero falso, dicho con seguridad", "Una respuesta muy larga", "Un token raro"],
        respuestaCorrecta: 1,
        explicacion: "El modelo puede inventar cifras, citas o hechos sin avisar.",
      },
      {
        id: "m47-l3-q2",
        pregunta: "¿Cómo se reduce el riesgo de datos inventados en una aplicación?",
        opciones: ["Con temperatura alta", "Dándole la fuente, exigiendo citas y verificando lo verificable", "Haciendo el prompt más corto", "Usando solo mayúsculas"],
        respuestaCorrecta: 1,
        explicacion: "La combinación de contexto, citas, verificación y revisión humana reduce el riesgo; no lo elimina.",
      },
      {
        id: "m47-l3-q3",
        pregunta: "¿Qué indica una cita a un documento que no se entregó al modelo?",
        opciones: ["Que el modelo es muy preciso", "Probable invención", "Que el documento está en caché", "Nada"],
        respuestaCorrecta: 1,
        explicacion: "Una cita inexistente es una señal clara de que la respuesta no se apoya en las fuentes.",
      },
    ],
    resumen: ["Los modelos alucinan, tienen fecha de corte y sesgos.", "Dale la fuente, exige citas, verifica lo verificable y revisa lo importante.", "Una cita a una fuente inexistente es señal de invención."],
    proximoPaso: "Veremos cómo representar el significado del texto con números para buscar información: embeddings.",
    conceptos: ["alucinaciones", "verificacion"],
  },
  {
    id: "m47-l4",
    moduloId: "modulo-47",
    titulo: "Embeddings y búsqueda semántica",
    objetivo: "Entender qué es un embedding, medir similitud con el coseno y buscar documentos por significado (aquí con TF-IDF como representación sencilla).",
    porQueImporta:
      "Casi todas las aplicaciones de IA con documentos propios (asistentes de preguntas, buscadores internos) empiezan por encontrar los fragmentos relevantes. Eso se hace comparando vectores.",
    concepto: "> **Nota**: este curso **no llama a ningún modelo de lenguaje real**: el navegador del curso no tiene cuenta ni claves de ningún proveedor. Practicas la **lógica de las aplicaciones con IA** (tokens y costos, prompts, validación, recuperación de información, herramientas, evaluación, privacidad) con funciones y «modelos simulados» deterministas que se corrigen automáticamente. Para llamar a un modelo real necesitas una cuenta y una clave de API del proveedor que elijas.\n\nUn **embedding** representa un texto como un **vector de números** (cientos o miles de dimensiones) de modo que textos con significado parecido quedan **cerca** en ese espacio. Los embeddings «reales» los produce un modelo especializado, que se consulta por API; no los generamos aquí.\n\n**Similitud del coseno**: mide el ángulo entre dos vectores; vale 1 si apuntan igual, 0 si son perpendiculares (sin relación) y -1 si son opuestos:\n\n`coseno(a, b) = (a · b) / (‖a‖ ‖b‖)`\n\n**Búsqueda semántica**: se calcula el embedding de cada documento (una vez) y de la pregunta (en cada consulta), y se devuelven los documentos con mayor similitud.\n\nPara practicar sin un modelo de embeddings usamos **TF-IDF** (`TfidfVectorizer` de scikit-learn): representa cada texto por el peso de sus palabras, dando más importancia a las poco frecuentes en el conjunto. Es una representación **léxica**: encuentra coincidencias de palabras exactas (para TF-IDF «envío» y «envíos» son palabras distintas), mientras que un embedding semántico real también encuentra sinónimos («automóvil» ≈ «carro»). La lógica de la búsqueda (vectorizar, comparar, ordenar) es la misma.\n\nDetalles de ingeniería: guardar los embeddings en un índice (una base de datos vectorial o una simple matriz), usar siempre **el mismo modelo** para documentos y consultas, y definir un **umbral** de similitud por debajo del cual se responde «no encontré información».",
    ejemploMinimo: "import numpy as np\n\ndef coseno(a, b):\n    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)\n    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))\n\nprint(round(coseno([1, 0, 1], [1, 0, 1]), 3), round(coseno([1, 0, 0], [0, 1, 0]), 3))",
    ejemploAplicado: "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\n\ndocs = [\"Los envios nacionales tardan entre 2 y 5 dias habiles\",\n        \"La garantia cubre defectos de fabrica por 12 meses\",\n        \"Aceptamos pagos con tarjeta y transferencia\"]\nvec = TfidfVectorizer()\nmatriz = vec.fit_transform(docs)\npregunta = vec.transform([\"cuanto tardan los envios nacionales\"])\nprint(cosine_similarity(pregunta, matriz).round(3))",
    errorFrecuente: {
      codigo: "docs_vec = modelo_A.embed(documentos)\nconsulta_vec = modelo_B.embed(pregunta)       # otro modelo distinto\nsimilitud(consulta_vec, docs_vec)             # los espacios no son comparables",
      explicacion:
        "Los vectores de dos modelos de embeddings distintos (o de dos versiones) viven en espacios diferentes: compararlos no tiene sentido. Documentos y consultas deben vectorizarse con el **mismo** modelo; si cambias de modelo, hay que recalcular todo el índice.",
    },
    practicaGuiada: {
      id: "m47-l4-practica",
      enunciado: "Implementa `coseno(a, b)` con NumPy y calcula la similitud entre tres pares de vectores, redondeada a 3 decimales: vectores iguales, perpendiculares y `[1, 1]` frente a `[1, 0]`.",
      codigoInicial: "import numpy as np\n\ndef coseno(a, b):\n    return None\n\nprint(coseno([1, 2, 3], [1, 2, 3]))\nprint(coseno([1, 0], [0, 1]))\nprint(coseno([1, 1], [1, 0]))",
      solucion: "import numpy as np\n\ndef coseno(a, b):\n    a, b = np.asarray(a, dtype=float), np.asarray(b, dtype=float)\n    return round(float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b))), 3)\n\nprint(coseno([1, 2, 3], [1, 2, 3]))\nprint(coseno([1, 0], [0, 1]))\nprint(coseno([1, 1], [1, 0]))",
      pistas: ["`a @ b` es el producto escalar y `np.linalg.norm(a)` la norma.", "Redondea el resultado a 3 decimales."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"1.0\",\"0.0\",\"0.707\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: 1.0\n0.0\n0.707" }
      },
    },
    reto: {
      id: "m47-l4-reto",
      enunciado: "Con `TfidfVectorizer`, escribe `mas_parecido(pregunta, documentos)` que devuelva el **índice del documento más similar** a la pregunta (mayor coseno). El programa busca para tres preguntas.",
      codigoInicial: "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\n\ndocumentos = [\n    \"los envios nacionales tardan entre 2 y 5 dias habiles\",\n    \"la garantia cubre defectos de fabrica por 12 meses\",\n    \"aceptamos pagos con tarjeta de credito y transferencia bancaria\",\n]\n\ndef mas_parecido(pregunta, documentos):\n    return None\n\nfor p in [\"cuanto tardan los envios\", \"que cubre la garantia\", \"puedo pagar con tarjeta\"]:\n    print(p, \"->\", mas_parecido(p, documentos))",
      solucion: "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\n\ndocumentos = [\n    \"los envios nacionales tardan entre 2 y 5 dias habiles\",\n    \"la garantia cubre defectos de fabrica por 12 meses\",\n    \"aceptamos pagos con tarjeta de credito y transferencia bancaria\",\n]\n\ndef mas_parecido(pregunta, documentos):\n    vec = TfidfVectorizer()\n    matriz = vec.fit_transform(documentos)\n    similitudes = cosine_similarity(vec.transform([pregunta]), matriz)[0]\n    return int(similitudes.argmax())\n\nfor p in [\"cuanto tardan los envios\", \"que cubre la garantia\", \"puedo pagar con tarjeta\"]:\n    print(p, \"->\", mas_parecido(p, documentos))",
      pistas: ["Ajusta el vectorizador con los documentos y transforma la pregunta con el mismo vectorizador.", "`argmax()` da la posición de la mayor similitud."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"cuanto tardan los envios -> 0\",\"que cubre la garantia -> 1\",\"puedo pagar con tarjeta -> 2\"]"
        return { ok, mensaje: ok ? "Correcto." : "El resultado no coincide. Debería ser: cuanto tardan los envios -> 0\nque cubre la garantia -> 1\npuedo pagar con tarjeta -> 2" }
      },
    },
    verificacion: [
      {
        id: "m47-l4-q1",
        pregunta: "¿Qué mide la similitud del coseno?",
        opciones: ["La longitud de un texto", "El ángulo entre dos vectores: qué tan parecidos son en dirección", "La cantidad de palabras", "El costo"],
        respuestaCorrecta: 1,
        explicacion: "1 significa misma dirección; 0, sin relación; -1, opuestos.",
      },
      {
        id: "m47-l4-q2",
        pregunta: "¿Por qué no se pueden comparar embeddings de dos modelos distintos?",
        opciones: ["Porque son de distinto tamaño siempre", "Porque cada modelo define su propio espacio de vectores", "Porque están cifrados", "Sí se pueden comparar"],
        respuestaCorrecta: 1,
        explicacion: "Documentos y consultas deben vectorizarse con el mismo modelo.",
      },
      {
        id: "m47-l4-q3",
        pregunta: "¿Qué ventaja tiene un embedding semántico real sobre TF-IDF?",
        opciones: ["Es más barato", "Puede relacionar textos con significado parecido aunque no compartan palabras", "Es más corto", "No necesita índice"],
        respuestaCorrecta: 1,
        explicacion: "TF-IDF solo ve coincidencias de palabras; un embedding aprendido captura sinónimos y paráfrasis.",
      },
    ],
    resumen: ["Un embedding es un vector que representa el significado de un texto.", "La búsqueda semántica compara vectores con el coseno y devuelve los más cercanos.", "Mismo modelo para documentos y consultas; define un umbral para el «no encontré»."],
    proximoPaso: "En el módulo 48 aprenderás a pedir bien: prompts, ejemplos y salidas estructuradas.",
    conceptos: ["embeddings", "similitud-coseno"],
  },
]
