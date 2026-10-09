import type { Lesson } from '../../types'

export const module26Lessons: Lesson[] = [
  {
    id: "m26-l1",
    moduloId: "modulo-26",
    titulo: "Experimentos, espacio muestral y eventos",
    objetivo: "Definir un experimento aleatorio, su espacio muestral y sus eventos, y calcular probabilidades contando casos.",
    porQueImporta:
      "La probabilidad es el lenguaje con el que se razona sobre la incertidumbre: riesgo de abandono, de fraude, de falla. Antes de cualquier modelo hay que saber contar los casos posibles y los favorables.",
    concepto: "- **Experimento aleatorio**: un proceso cuyo resultado no se puede predecir con certeza (lanzar un dado).\n- **Espacio muestral** (Ω): el conjunto de todos los resultados posibles.\n- **Evento**: un subconjunto del espacio muestral (por ejemplo, «sale par»).\n\nCuando todos los resultados son **igualmente probables**, la probabilidad clásica es:\n\n```\nP(evento) = casos favorables / casos posibles\n```\n\nLa probabilidad siempre está entre 0 (imposible) y 1 (seguro).\n\n```python\nfrom itertools import product\nresultados = list(product(range(1, 7), repeat=2))   # los 36 resultados de dos dados\nfavorables = [r for r in resultados if sum(r) == 7]\nlen(favorables) / len(resultados)\n```",
    ejemploMinimo: "dado = [1, 2, 3, 4, 5, 6]\npares = [x for x in dado if x % 2 == 0]\nprint(len(pares) / len(dado))",
    ejemploAplicado: "from itertools import product\n\nresultados = list(product(range(1, 7), repeat=2))\nprint(\"Resultados posibles:\", len(resultados))\n\nfor suma in (2, 7, 12):\n    favorables = [r for r in resultados if sum(r) == suma]\n    print(f\"P(suma = {suma}) = {len(favorables)}/{len(resultados)} = {len(favorables) / len(resultados):.4f}\")",
    errorFrecuente: {
      codigo: "# Dos monedas: ¿cuál es la probabilidad de obtener una cara y un sello?\nresultados = [\"CC\", \"CS\", \"SS\"]\nfavorables = [\"CS\"]\nprint(len(favorables) / len(resultados))",
      explicacion:
        "Lista mal el espacio muestral: «CS» y «SC» son resultados distintos (moneda 1 y moneda 2). El espacio correcto tiene 4 resultados (CC, CS, SC, SS) y la probabilidad es 2/4 = 0.5, no 1/3. Con el espacio muestral mal definido, todo el cálculo queda mal.",
    },
    practicaGuiada: {
      id: "m26-l1-practica",
      enunciado: "Con los 36 resultados de dos dados, calcula la probabilidad de que la suma sea 7 e imprímela redondeada a 4 decimales.",
      codigoInicial: "from itertools import product\n\nresultados = list(product(range(1, 7), repeat=2))\n\nprobabilidad = 0\nprint(probabilidad)",
      solucion: "from itertools import product\n\nresultados = list(product(range(1, 7), repeat=2))\n\nfavorables = [r for r in resultados if sum(r) == 7]\nprobabilidad = round(len(favorables) / len(resultados), 4)\nprint(probabilidad)",
      pistas: ["Filtra con `sum(r) == 7` y divide entre `len(resultados)`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.1667) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: 6 de 36 combinaciones suman 7." : "El resultado esperado es 0.1667 (6/36)." }
      },
    },
    reto: {
      id: "m26-l1-reto",
      enunciado: "Calcula la probabilidad de obtener **al menos un 6** al lanzar dos dados. Una pareja es favorable si `6 in r`. Imprímela redondeada a 4 decimales.",
      codigoInicial: "from itertools import product\n\nresultados = list(product(range(1, 7), repeat=2))\n\nfavorables = [r for r in resultados if r[0] == 6]      # solo mira el primer dado\nprint(round(len(favorables) / len(resultados), 4))",
      solucion: "from itertools import product\n\nresultados = list(product(range(1, 7), repeat=2))\n\nfavorables = [r for r in resultados if 6 in r]\nprint(round(len(favorables) / len(resultados), 4))",
      pistas: ["«Al menos un 6» incluye que salga en cualquiera de los dos dados.", "Usa `6 in r`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.3056) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: 11 de 36 combinaciones tienen al menos un 6." : "El resultado esperado es 0.3056 (11/36)." }
      },
    },
    verificacion: [
      {
        id: "m26-l1-q1",
        pregunta: "Al lanzar un dado justo, ¿cuál es la probabilidad de obtener un número mayor que 4?",
        opciones: ["1/6", "1/3", "1/2", "2/3"],
        respuestaCorrecta: 1,
        explicacion: "Los favorables son 5 y 6: 2 casos de 6, es decir 1/3.",
      },
      {
        id: "m26-l1-q2",
        pregunta: "Una probabilidad nunca puede ser:",
        opciones: ["0", "1", "0.5", "1.2"],
        respuestaCorrecta: 3,
        explicacion: "Toda probabilidad está entre 0 y 1; un valor de 1.2 indica un error de cálculo.",
      },
    ],
    resumen: ["El espacio muestral reúne todos los resultados posibles.", "Un evento es un subconjunto del espacio muestral.", "Con resultados igualmente probables: P = favorables / posibles."],
    proximoPaso: "Veremos las reglas del complemento y de la unión para combinar probabilidades.",
    conceptos: ["espacio-muestral", "probabilidad-clasica"],
  },
  {
    id: "m26-l2",
    moduloId: "modulo-26",
    titulo: "Reglas de probabilidad: complemento y unión",
    objetivo: "Aplicar la regla del complemento y la regla de la suma para calcular la probabilidad de que ocurra «A o B».",
    porQueImporta:
      "En la práctica rara vez interesa un evento aislado: «¿qué tan probable es que un cliente compre el producto A o el B?». Estas reglas evitan contar dos veces los casos que están en ambos.",
    concepto: "- **Complemento**: la probabilidad de que un evento NO ocurra.\n  `P(no A) = 1 - P(A)`\n- **Regla de la suma (unión)**: probabilidad de que ocurra A **o** B (o ambos).\n  `P(A o B) = P(A) + P(B) - P(A y B)`\n\nSe resta `P(A y B)` porque los casos donde ocurren ambos se contaron dos veces.\n\nDos eventos son **mutuamente excluyentes** si no pueden ocurrir a la vez: entonces `P(A y B) = 0` y la unión es simplemente `P(A) + P(B)`.\n\nEl complemento es un atajo muy útil para «al menos uno»: `P(al menos uno) = 1 - P(ninguno)`.",
    ejemploMinimo: "p_a = 0.4\nprint(1 - p_a)",
    ejemploAplicado: "# 100 clientes: 40 compraron A, 30 compraron B, 10 compraron ambos\np_a, p_b, p_ambos = 0.40, 0.30, 0.10\n\np_union = p_a + p_b - p_ambos\nprint(\"P(A o B) =\", round(p_union, 2))\nprint(\"P(ninguno) =\", round(1 - p_union, 2))",
    errorFrecuente: {
      codigo: "p_a, p_b, p_ambos = 0.40, 0.30, 0.10\nprint(\"P(A o B) =\", p_a + p_b)",
      explicacion:
        "Sumar `P(A) + P(B)` sin restar la intersección cuenta dos veces a los clientes que compraron ambos productos. La unión correcta es `0.40 + 0.30 - 0.10 = 0.60`, no 0.70.",
    },
    practicaGuiada: {
      id: "m26-l2-practica",
      enunciado: "Calcula `P(A o B)` con la regla de la suma e imprímela redondeada a 2 decimales.",
      codigoInicial: "p_a = 0.50\np_b = 0.40\np_ambos = 0.20\n\np_union = 0\nprint(p_union)",
      solucion: "p_a = 0.50\np_b = 0.40\np_ambos = 0.20\n\np_union = round(p_a + p_b - p_ambos, 2)\nprint(p_union)",
      pistas: ["`P(A o B) = P(A) + P(B) - P(A y B)`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.7) <= 0.005
        return { ok, mensaje: ok ? "Correcto: P(A o B) = 0.70." : "El resultado esperado es 0.7." }
      },
    },
    reto: {
      id: "m26-l2-reto",
      enunciado: "Calcula la probabilidad de que un cliente **no compre ninguno** de los dos productos (el complemento de la unión) e imprímela redondeada a 2 decimales.",
      codigoInicial: "p_a = 0.50\np_b = 0.40\np_ambos = 0.20\n\np_ninguno = 1 - p_a - p_b       # ¿es correcto restar así?\nprint(round(p_ninguno, 2))",
      solucion: "p_a = 0.50\np_b = 0.40\np_ambos = 0.20\n\np_union = p_a + p_b - p_ambos\np_ninguno = 1 - p_union\nprint(round(p_ninguno, 2))",
      pistas: ["Primero calcula la unión con la regla de la suma.", "Después réstala de 1."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.3) <= 0.005
        return { ok, mensaje: ok ? "Correcto: el 30 % no compra ninguno." : "El resultado esperado es 0.3." }
      },
    },
    verificacion: [
      {
        id: "m26-l2-q1",
        pregunta: "Si P(A) = 0.3, P(B) = 0.5 y A y B son mutuamente excluyentes, P(A o B) es:",
        opciones: ["0.15", "0.8", "0.2", "0.5"],
        respuestaCorrecta: 1,
        explicacion: "No hay intersección que restar: 0.3 + 0.5 = 0.8.",
      },
      {
        id: "m26-l2-q2",
        pregunta: "La probabilidad de «al menos uno» se calcula más fácil con:",
        opciones: ["La unión directa", "El complemento de «ninguno»", "Multiplicando todo", "La mediana"],
        respuestaCorrecta: 1,
        explicacion: "P(al menos uno) = 1 - P(ninguno), que suele ser un cálculo más corto.",
      },
    ],
    resumen: ["Complemento: P(no A) = 1 - P(A).", "Suma: P(A o B) = P(A) + P(B) - P(A y B).", "«Al menos uno» = 1 - P(ninguno)."],
    proximoPaso: "Estudiaremos cómo cambia una probabilidad cuando ya sabemos que otro evento ocurrió.",
    conceptos: ["complemento", "regla-de-la-suma"],
  },
  {
    id: "m26-l3",
    moduloId: "modulo-26",
    titulo: "Probabilidad condicional",
    objetivo: "Calcular la probabilidad de un evento sabiendo que otro ya ocurrió, a partir de una tabla de datos.",
    porQueImporta:
      "Casi toda pregunta útil es condicional: «¿qué probabilidad de abandono tiene un cliente del plan básico?». Condicionar es restringir la población al grupo que importa.",
    concepto: "La **probabilidad condicional** de A dado B es:\n\n```\nP(A | B) = P(A y B) / P(B)\n```\n\nSe lee «probabilidad de A sabiendo B». Equivale a mirar solo los casos donde B ocurre y preguntar qué fracción cumple A.\n\n```python\ngrupo = df[df[\"plan\"] == \"basico\"]            # restringir a B\n(grupo[\"abandono\"] == \"si\").mean()            # fracción que cumple A\n```\n\nOjo con el orden: `P(A | B)` casi nunca es igual a `P(B | A)`.",
    ejemploMinimo: "import pandas as pd\n\ndf = pd.DataFrame({\"plan\": [\"basico\", \"basico\", \"premium\", \"premium\"], \"abandono\": [\"si\", \"no\", \"no\", \"no\"]})\nbasico = df[df[\"plan\"] == \"basico\"]\nprint((basico[\"abandono\"] == \"si\").mean())",
    ejemploAplicado: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"plan\": [\"basico\"] * 100 + [\"premium\"] * 100,\n    \"abandono\": [\"si\"] * 30 + [\"no\"] * 70 + [\"si\"] * 10 + [\"no\"] * 90,\n})\n\nprint(\"P(abandono) =\", (df[\"abandono\"] == \"si\").mean())\nprint(\"P(abandono | basico) =\", (df[df[\"plan\"] == \"basico\"][\"abandono\"] == \"si\").mean())\nprint(\"P(abandono | premium) =\", (df[df[\"plan\"] == \"premium\"][\"abandono\"] == \"si\").mean())",
    errorFrecuente: {
      codigo: "import pandas as pd\n\ndf = pd.DataFrame({\"plan\": [\"basico\"] * 100 + [\"premium\"] * 100, \"abandono\": [\"si\"] * 30 + [\"no\"] * 70 + [\"si\"] * 10 + [\"no\"] * 90})\nprint(((df[\"plan\"] == \"basico\") & (df[\"abandono\"] == \"si\")).mean())",
      explicacion:
        "Eso calcula `P(básico y abandono)` = 0.15, porque divide entre **todos** los clientes (200). La condicional `P(abandono | básico)` divide solo entre los clientes del plan básico (100) y vale 0.30. Condicionar significa cambiar el denominador.",
    },
    practicaGuiada: {
      id: "m26-l3-practica",
      enunciado: "Calcula `P(abandono | premium)`: la proporción de clientes premium que abandonaron. Imprímela con 2 decimales.",
      codigoInicial: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"plan\": [\"basico\"] * 100 + [\"premium\"] * 100,\n    \"abandono\": [\"si\"] * 30 + [\"no\"] * 70 + [\"si\"] * 10 + [\"no\"] * 90,\n})\n\nprobabilidad = 0\nprint(probabilidad)",
      solucion: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"plan\": [\"basico\"] * 100 + [\"premium\"] * 100,\n    \"abandono\": [\"si\"] * 30 + [\"no\"] * 70 + [\"si\"] * 10 + [\"no\"] * 90,\n})\n\npremium = df[df[\"plan\"] == \"premium\"]\nprobabilidad = round((premium[\"abandono\"] == \"si\").mean(), 2)\nprint(probabilidad)",
      pistas: ["Filtra `df[df[\"plan\"] == \"premium\"]` y calcula la media de `abandono == \"si\"`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.1) <= 0.005
        return { ok, mensaje: ok ? "Correcto: el 10 % de los clientes premium abandona." : "El resultado esperado es 0.1." }
      },
    },
    reto: {
      id: "m26-l3-reto",
      enunciado: "Ahora al revés: de los clientes que **abandonaron**, ¿qué proporción era del plan básico? Calcula `P(básico | abandono)` e imprímela con 2 decimales.",
      codigoInicial: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"plan\": [\"basico\"] * 100 + [\"premium\"] * 100,\n    \"abandono\": [\"si\"] * 30 + [\"no\"] * 70 + [\"si\"] * 10 + [\"no\"] * 90,\n})\n\nbasico = df[df[\"plan\"] == \"basico\"]\nprint(round((basico[\"abandono\"] == \"si\").mean(), 2))     # esto es P(abandono | básico)",
      solucion: "import pandas as pd\n\ndf = pd.DataFrame({\n    \"plan\": [\"basico\"] * 100 + [\"premium\"] * 100,\n    \"abandono\": [\"si\"] * 30 + [\"no\"] * 70 + [\"si\"] * 10 + [\"no\"] * 90,\n})\n\nabandonaron = df[df[\"abandono\"] == \"si\"]\nprint(round((abandonaron[\"plan\"] == \"basico\").mean(), 2))",
      pistas: ["Ahora el grupo condicionante es `abandono == \"si\"`.", "Calcula qué fracción de ese grupo es `plan == \"basico\"`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.75) <= 0.005
        return { ok, mensaje: ok ? "Correcto: el 75 % de quienes abandonan es del plan básico." : "El resultado esperado es 0.75." }
      },
    },
    verificacion: [
      {
        id: "m26-l3-q1",
        pregunta: "¿Qué cambia al calcular P(A | B) frente a P(A y B)?",
        opciones: ["El numerador", "El denominador: solo se cuentan los casos donde ocurre B", "Nada", "Se suma en vez de dividir"],
        respuestaCorrecta: 1,
        explicacion: "La condicional restringe la población al grupo donde B ocurrió.",
      },
      {
        id: "m26-l3-q2",
        pregunta: "Es cierto que P(A | B) y P(B | A):",
        opciones: ["Siempre son iguales", "Casi nunca son iguales", "Siempre suman 1", "Solo existen para dados"],
        respuestaCorrecta: 1,
        explicacion: "Responden preguntas distintas; confundirlas es un error muy frecuente.",
      },
    ],
    resumen: ["P(A | B) = P(A y B) / P(B).", "Condicionar es restringir la población al grupo donde B ocurre.", "P(A | B) y P(B | A) son cosas distintas."],
    proximoPaso: "Veremos cuándo dos eventos son independientes y la regla del producto.",
    conceptos: ["probabilidad-condicional"],
  },
  {
    id: "m26-l4",
    moduloId: "modulo-26",
    titulo: "Independencia y regla del producto",
    objetivo: "Aplicar la regla del producto y comprobar si dos eventos son independientes.",
    porQueImporta:
      "Muchos modelos asumen independencia (lanzamientos de moneda, transacciones). Si la suposición es falsa, las probabilidades calculadas se desvían, a veces gravemente.",
    concepto: "Dos eventos A y B son **independientes** si saber que uno ocurrió no cambia la probabilidad del otro:\n\n```\nP(A | B) = P(A)        equivale a        P(A y B) = P(A) · P(B)\n```\n\n**Regla del producto**: si A y B son independientes, la probabilidad de que ocurran ambos es el producto de sus probabilidades. Para varios eventos independientes se multiplican todos.\n\nPara comprobar independencia con datos, compara `P(A y B)` con `P(A) · P(B)` (con una tolerancia, por el ruido de la muestra):\n\n```python\nimport math\nmath.isclose(p_ab, p_a * p_b, rel_tol=0.05)\n```\n\n**Independiente no es lo mismo que excluyente**: dos eventos excluyentes con probabilidad positiva son totalmente *dependientes* (si ocurre uno, el otro no puede ocurrir).",
    ejemploMinimo: "p_cara = 0.5\nprint(p_cara * p_cara)",
    ejemploAplicado: "import math\n\n# P(plan básico) = 0.50 · P(abandono) = 0.20 · P(básico y abandono) = 0.15\np_a, p_b, p_ab = 0.50, 0.20, 0.15\n\nprint(\"Producto:\", round(p_a * p_b, 2))\nprint(\"¿Independientes?\", math.isclose(p_ab, p_a * p_b, rel_tol=0.05))",
    errorFrecuente: {
      codigo: "# Una moneda sale cara 5 veces seguidas: ¿la siguiente tiene más probabilidad de sello?\np_sello_siguiente = 0.5 + 5 * 0.05\nprint(p_sello_siguiente)",
      explicacion:
        "Es la «falacia del jugador»: los lanzamientos son independientes, así que los resultados pasados no cambian la probabilidad del siguiente, que sigue siendo 0.5.",
    },
    practicaGuiada: {
      id: "m26-l4-practica",
      enunciado: "Calcula la probabilidad de obtener **3 caras seguidas** con una moneda justa (eventos independientes) e imprímela.",
      codigoInicial: "p_cara = 0.5\n\nprobabilidad = 0\nprint(probabilidad)",
      solucion: "p_cara = 0.5\n\nprobabilidad = p_cara ** 3\nprint(probabilidad)",
      pistas: ["Multiplica la probabilidad por sí misma tres veces: `p_cara ** 3`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.125) <= 0.0005
        return { ok, mensaje: ok ? "Correcto: 0.5 · 0.5 · 0.5 = 0.125." : "El resultado esperado es 0.125." }
      },
    },
    reto: {
      id: "m26-l4-reto",
      enunciado: "Completa `son_independientes(p_a, p_b, p_ab)`: debe devolver `True` si `P(A y B)` es aproximadamente `P(A) · P(B)` (usa `math.isclose` con `rel_tol=0.05`) y `False` en caso contrario.",
      codigoInicial: "import math\n\ndef son_independientes(p_a, p_b, p_ab):\n    return False      # falta comparar p_ab con p_a * p_b\n\nprint(son_independientes(0.5, 0.4, 0.2))\nprint(son_independientes(0.5, 0.2, 0.15))",
      solucion: "import math\n\ndef son_independientes(p_a, p_b, p_ab):\n    return math.isclose(p_ab, p_a * p_b, rel_tol=0.05)\n\nprint(son_independientes(0.5, 0.4, 0.2))\nprint(son_independientes(0.5, 0.2, 0.15))",
      pistas: ["`math.isclose(p_ab, p_a * p_b, rel_tol=0.05)` devuelve directamente un booleano."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"True\",\"False\"]"
        return { ok, mensaje: ok ? "Correcto: el primer caso es independiente (0.2 = 0.5·0.4) y el segundo no (0.15 ≠ 0.10)." : "Se esperaba True y luego False." }
      },
    },
    verificacion: [
      {
        id: "m26-l4-q1",
        pregunta: "Si A y B son independientes con P(A) = 0.2 y P(B) = 0.5, P(A y B) es:",
        opciones: ["0.7", "0.1", "0.3", "0.25"],
        respuestaCorrecta: 1,
        explicacion: "Regla del producto: 0.2 · 0.5 = 0.1.",
      },
      {
        id: "m26-l4-q2",
        pregunta: "Una moneda justa salió cara 6 veces seguidas. La probabilidad de cara en el siguiente lanzamiento es:",
        opciones: ["Menor que 0.5", "Mayor que 0.5", "Exactamente 0.5", "Imposible de saber"],
        respuestaCorrecta: 2,
        explicacion: "Los lanzamientos son independientes: el pasado no influye.",
      },
    ],
    resumen: ["Independientes: P(A y B) = P(A) · P(B).", "La regla del producto se extiende a varios eventos independientes.", "Independiente no significa excluyente."],
    proximoPaso: "Cerraremos el módulo con el teorema de Bayes: cómo actualizar una probabilidad con nueva evidencia.",
    conceptos: ["independencia", "regla-del-producto"],
  },
  {
    id: "m26-l5",
    moduloId: "modulo-26",
    titulo: "Teorema de Bayes: actualizar probabilidades con evidencia",
    objetivo: "Aplicar el teorema de Bayes y la probabilidad total para interpretar correctamente pruebas diagnósticas y alertas.",
    porQueImporta:
      "Un detector de fraude con 95 % de acierto puede estar equivocado la mayoría de las veces que dispara la alarma si el fraude es raro. Bayes explica por qué, y es esencial para interpretar cualquier clasificador.",
    concepto: "El **teorema de Bayes** invierte una probabilidad condicional:\n\n```\nP(A | B) = P(B | A) · P(A) / P(B)\n```\n\nEl denominador se calcula con la **probabilidad total**:\n\n```\nP(B) = P(B | A) · P(A) + P(B | no A) · P(no A)\n```\n\nEjemplo con una prueba diagnóstica:\n\n- **Prevalencia**: P(enfermo) = 1 %.\n- **Sensibilidad**: P(positivo | enfermo) = 95 %.\n- **Falsos positivos**: P(positivo | sano) = 5 %.\n\nLa pregunta útil es `P(enfermo | positivo)`, y no es 95 %. Como casi todos son sanos, la mayoría de los positivos son falsos.",
    ejemploMinimo: "prevalencia = 0.01\nsensibilidad = 0.95\nfalsos_positivos = 0.05\n\np_positivo = sensibilidad * prevalencia + falsos_positivos * (1 - prevalencia)\nprint(round(p_positivo, 4))",
    ejemploAplicado: "prevalencia = 0.01\nsensibilidad = 0.95\nfalsos_positivos = 0.05\n\np_positivo = sensibilidad * prevalencia + falsos_positivos * (1 - prevalencia)\np_enfermo_dado_positivo = sensibilidad * prevalencia / p_positivo\n\nprint(f\"P(positivo) = {p_positivo:.4f}\")\nprint(f\"P(enfermo | positivo) = {p_enfermo_dado_positivo:.3f}\")",
    errorFrecuente: {
      codigo: "sensibilidad = 0.95\nprint(\"Si das positivo, tienes un\", sensibilidad * 100, \"% de probabilidad de estar enfermo\")",
      explicacion:
        "Confunde `P(positivo | enfermo)` (la sensibilidad) con `P(enfermo | positivo)`. Son probabilidades condicionales distintas. Con una prevalencia de 1 %, quien da positivo está enfermo solo el 16 % de las veces: hay que aplicar Bayes con la prevalencia.",
    },
    practicaGuiada: {
      id: "m26-l5-practica",
      enunciado: "Calcula la **probabilidad total** de dar positivo: `sensibilidad · prevalencia + falsos_positivos · (1 - prevalencia)`. Imprímela redondeada a 4 decimales.",
      codigoInicial: "prevalencia = 0.01\nsensibilidad = 0.95\nfalsos_positivos = 0.05\n\np_positivo = 0\nprint(p_positivo)",
      solucion: "prevalencia = 0.01\nsensibilidad = 0.95\nfalsos_positivos = 0.05\n\np_positivo = round(sensibilidad * prevalencia + falsos_positivos * (1 - prevalencia), 4)\nprint(p_positivo)",
      pistas: ["Suma los positivos verdaderos (`sensibilidad · prevalencia`) y los falsos positivos."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.059) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: el 5.9 % de las pruebas da positivo." : "El resultado esperado es 0.059." }
      },
    },
    reto: {
      id: "m26-l5-reto",
      enunciado: "Aplica Bayes: calcula `P(enfermo | positivo)` e imprímela redondeada a 3 decimales.",
      codigoInicial: "prevalencia = 0.01\nsensibilidad = 0.95\nfalsos_positivos = 0.05\n\np_positivo = sensibilidad * prevalencia + falsos_positivos * (1 - prevalencia)\nresultado = sensibilidad          # esto es P(positivo | enfermo), no lo que se pide\nprint(round(resultado, 3))",
      solucion: "prevalencia = 0.01\nsensibilidad = 0.95\nfalsos_positivos = 0.05\n\np_positivo = sensibilidad * prevalencia + falsos_positivos * (1 - prevalencia)\nresultado = sensibilidad * prevalencia / p_positivo\nprint(round(resultado, 3))",
      pistas: ["Numerador: `sensibilidad * prevalencia`.", "Denominador: `p_positivo`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.161) <= 0.0006
        return { ok, mensaje: ok ? "Correcto: solo el 16.1 % de los positivos están realmente enfermos." : "El resultado esperado es 0.161." }
      },
    },
    verificacion: [
      {
        id: "m26-l5-q1",
        pregunta: "En una prueba con prevalencia muy baja, muchos de los positivos son falsos porque:",
        opciones: ["La prueba es mala siempre", "Hay muchos más sanos que enfermos, así que incluso una tasa pequeña de falsos positivos produce muchos casos", "La sensibilidad es baja", "Bayes no aplica"],
        respuestaCorrecta: 1,
        explicacion: "Una tasa de error pequeña sobre una población enorme de sanos genera más falsos positivos que verdaderos.",
      },
      {
        id: "m26-l5-q2",
        pregunta: "En Bayes, el denominador P(B) se obtiene con:",
        opciones: ["La regla del producto", "La probabilidad total", "El complemento", "La mediana"],
        respuestaCorrecta: 1,
        explicacion: "Se suman todas las formas en que puede ocurrir B.",
      },
    ],
    resumen: ["Bayes: P(A | B) = P(B | A) · P(A) / P(B).", "P(B) se calcula con la probabilidad total.", "La prevalencia (probabilidad a priori) importa tanto como la precisión de la prueba."],
    proximoPaso: "Pasaremos a las variables aleatorias: asignar números a los resultados.",
    conceptos: ["teorema-de-bayes", "probabilidad-total"],
  },
]
