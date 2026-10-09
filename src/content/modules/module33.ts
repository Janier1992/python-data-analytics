import type { Lesson } from '../../types'

export const module33Lessons: Lesson[] = [
  {
    id: "m33-l1",
    moduloId: "modulo-33",
    titulo: "Proyecto: plantea el experimento y estima la conversión",
    objetivo: "Formular las hipótesis de un A/B test y estimar la tasa de conversión de cada versión con su intervalo de confianza.",
    porQueImporta:
      "Antes de contrastar nada hay que dejar escrito qué se quiere probar y con qué criterio se decidirá. Y toda cifra de conversión debe acompañarse de su incertidumbre.",
    concepto: "**El caso**: una tienda en línea probó un nuevo diseño de la página de pago (versión **B**) frente al actual (versión **A**). Se asignaron visitantes al azar a cada versión.\n\n| | Visitantes | Compras |\n|---|---|---|\n| **A** (control) | 2 400 | 288 |\n| **B** (nuevo diseño) | 2 400 | 336 |\n\nAdemás se midió cuántos segundos tardaron en pagar 20 clientes de cada versión.\n\nLa decisión de negocio: ¿se lanza el nuevo diseño para todos?\n\n**Hipótesis**:\n\n- H₀: la tasa de conversión de B es igual a la de A.\n- H₁: las tasas son distintas.\n- α = 0.05, definido **antes** de mirar los resultados.\n\nPrimer paso: estimar cada tasa con su intervalo de confianza del 95 %:\n\n```python\np = compras / visitantes\nmargen = 1.96 * (p * (1 - p) / visitantes) ** 0.5\n```",
    ejemploMinimo: "compras_a, visitantes_a = 288, 2400\nprint(compras_a / visitantes_a)",
    ejemploAplicado: "import math\n\nfor nombre, compras, visitantes in [(\"A\", 288, 2400), (\"B\", 336, 2400)]:\n    p = compras / visitantes\n    margen = 1.96 * math.sqrt(p * (1 - p) / visitantes)\n    print(f\"{nombre}: {p:.1%}  ·  IC 95 %: [{p - margen:.4f}, {p + margen:.4f}]\")",
    errorFrecuente: {
      codigo: "compras_a, visitantes_a = 288, 2400\ncompras_b, visitantes_b = 336, 2400\nprint(\"B convierte más:\", compras_b > compras_a)",
      explicacion:
        "Comparar a simple vista no es una prueba. Que B tenga más compras puede ser un efecto real o simple azar del muestreo. Para decidir hace falta cuantificar la incertidumbre (intervalos) y contrastar la diferencia con una prueba estadística, cosa que haremos en las siguientes lecciones.",
    },
    practicaGuiada: {
      id: "m33-l1-practica",
      enunciado: "Calcula el **margen de error del 95 %** de la conversión de la versión A (`1.96 · √(p(1-p)/n)`) e imprímelo con 3 decimales.",
      codigoInicial: "import math\n\ncompras, visitantes = 288, 2400\np = compras / visitantes\n\nmargen = 0\nprint(margen)",
      solucion: "import math\n\ncompras, visitantes = 288, 2400\np = compras / visitantes\n\nmargen = round(1.96 * math.sqrt(p * (1 - p) / visitantes), 3)\nprint(margen)",
      pistas: ["`1.96 * math.sqrt(p * (1 - p) / visitantes)`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.013) <= 0.0006
        return { ok, mensaje: ok ? "Correcto: ±1.3 puntos porcentuales." : "El resultado esperado es 0.013." }
      },
    },
    reto: {
      id: "m33-l1-reto",
      enunciado: "Imprime los límites del **IC del 95 %** de la conversión de A (inferior y superior, 3 decimales, separados por un espacio).",
      codigoInicial: "import math\n\ncompras, visitantes = 288, 2400\np = compras / visitantes\nmargen = 1.96 * math.sqrt(p * (1 - p) / visitantes)\n\nprint(f\"{p:.3f} {p:.3f}\")",
      solucion: "import math\n\ncompras, visitantes = 288, 2400\np = compras / visitantes\nmargen = 1.96 * math.sqrt(p * (1 - p) / visitantes)\n\nprint(f\"{p - margen:.3f} {p + margen:.3f}\")",
      pistas: ["Resta y suma `margen` a `p`."],
      validar: (stdout) => {
        const ok = stdout.trim() === "0.107 0.133"
        return { ok, mensaje: ok ? "Correcto: A convierte entre 10.7 % y 13.3 %." : "El resultado esperado es «0.107 0.133»." }
      },
    },
    verificacion: [
      {
        id: "m33-l1-q1",
        pregunta: "¿Por qué se fija α antes de mirar los resultados?",
        opciones: ["Para que el p-valor sea menor", "Para evitar ajustar el criterio a lo que salió y así inflar los falsos positivos", "Porque lo exige Python", "Para reducir el tamaño de muestra"],
        respuestaCorrecta: 1,
        explicacion: "Decidir el criterio después de ver los datos es una forma de p-hacking.",
      },
      {
        id: "m33-l1-q2",
        pregunta: "El IC de A es [10.7 %, 13.3 %] y el de B [12.6 %, 15.4 %]. Estos intervalos:",
        opciones: ["Son idénticos", "Se solapan un poco, así que hace falta una prueba formal para decidir", "Prueban que B es mejor", "Prueban que no hay diferencia"],
        respuestaCorrecta: 1,
        explicacion: "Un solapamiento parcial no resuelve la cuestión: se contrasta la diferencia directamente.",
      },
    ],
    resumen: ["Define H₀, H₁ y α antes del experimento.", "Reporta cada conversión con su intervalo de confianza.", "Comparar a simple vista no sustituye una prueba estadística."],
    proximoPaso: "Contrastaremos formalmente si la diferencia entre A y B es significativa.",
    conceptos: ["proyecto-inferencia"],
  },
  {
    id: "m33-l2",
    moduloId: "modulo-33",
    titulo: "Proyecto: contrasta la diferencia de conversión",
    objetivo: "Aplicar la prueba z de dos proporciones al A/B test y construir el intervalo de confianza de la diferencia.",
    porQueImporta:
      "Aquí se responde la pregunta central: ¿la mejora observada es real? Y, igual de importante, ¿de qué tamaño podría ser?",
    concepto: "Prueba z de dos proporciones (la misma de la lección de A/B testing):\n\n```python\np_comb = (x1 + x2) / (n1 + n2)\nee = (p_comb * (1 - p_comb) * (1 / n1 + 1 / n2)) ** 0.5\nz = (p2 - p1) / ee\np_valor = 2 * norm.sf(abs(z))\n```\n\nPara el **tamaño** del efecto se construye un intervalo de confianza de la diferencia `p₂ - p₁`, con el error estándar sin combinar:\n\n```python\nee_dif = (p1 * (1 - p1) / n1 + p2 * (1 - p2) / n2) ** 0.5\n(p2 - p1) ± 1.96 * ee_dif\n```\n\nUn resultado puede ser significativo y, aun así, el intervalo incluir efectos muy pequeños.",
    ejemploMinimo: "x1, n1 = 288, 2400\nx2, n2 = 336, 2400\nprint(round(x2 / n2 - x1 / n1, 3))",
    ejemploAplicado: "from scipy.stats import norm\n\nx1, n1 = 288, 2400\nx2, n2 = 336, 2400\np1, p2 = x1 / n1, x2 / n2\n\np_comb = (x1 + x2) / (n1 + n2)\nee = (p_comb * (1 - p_comb) * (1 / n1 + 1 / n2)) ** 0.5\nz = (p2 - p1) / ee\n\nprint(f\"diferencia = {p2 - p1:.3f}   z = {z:.3f}   p-valor = {2 * norm.sf(abs(z)):.4f}\")",
    errorFrecuente: {
      codigo: "p1, p2 = 0.12, 0.14\nprint(\"Mejora del 2 %\")",
      explicacion:
        "La diferencia es de **2 puntos porcentuales**, no «2 %». Y como mejora relativa, de 12 % a 14 % es un aumento del 16.7 %. Confundir puntos porcentuales con porcentajes es una fuente constante de malentendidos en los reportes: indica siempre cuál de los dos usas.",
    },
    practicaGuiada: {
      id: "m33-l2-practica",
      enunciado: "Calcula la **proporción combinada** de ambas versiones e imprímela con 2 decimales.",
      codigoInicial: "x1, n1 = 288, 2400\nx2, n2 = 336, 2400\n\np_comb = 0\nprint(p_comb)",
      solucion: "x1, n1 = 288, 2400\nx2, n2 = 336, 2400\n\np_comb = round((x1 + x2) / (n1 + n2), 2)\nprint(p_comb)",
      pistas: ["`(x1 + x2) / (n1 + n2)`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.13) <= 0.005
        return { ok, mensaje: ok ? "Correcto: 624 compras de 4 800 visitantes." : "El resultado esperado es 0.13." }
      },
    },
    reto: {
      id: "m33-l2-reto",
      enunciado: "Calcula el **p-valor bilateral** de la prueba z de dos proporciones e imprímelo con 4 decimales.",
      codigoInicial: "from scipy.stats import norm\n\nx1, n1 = 288, 2400\nx2, n2 = 336, 2400\np1, p2 = x1 / n1, x2 / n2\n\np_comb = (x1 + x2) / (n1 + n2)\nee = (p_comb * (1 - p_comb) * (1 / n1 + 1 / n2)) ** 0.5\n\np_valor = 1\nprint(round(p_valor, 4))",
      solucion: "from scipy.stats import norm\n\nx1, n1 = 288, 2400\nx2, n2 = 336, 2400\np1, p2 = x1 / n1, x2 / n2\n\np_comb = (x1 + x2) / (n1 + n2)\nee = (p_comb * (1 - p_comb) * (1 / n1 + 1 / n2)) ** 0.5\nz = (p2 - p1) / ee\n\np_valor = 2 * norm.sf(abs(z))\nprint(round(p_valor, 4))",
      pistas: ["`z = (p2 - p1) / ee` y después `2 * norm.sf(abs(z))`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.0394) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: p = 0.0394 < 0.05." : "El resultado esperado es 0.0394." }
      },
    },
    verificacion: [
      {
        id: "m33-l2-q1",
        pregunta: "Con p = 0.0394 y α = 0.05, la decisión es:",
        opciones: ["No rechazar H₀", "Rechazar H₀: hay evidencia de que las conversiones difieren", "Aceptar H₀", "Repetir el test hasta que p sea menor"],
        respuestaCorrecta: 1,
        explicacion: "Como p < α se rechaza la hipótesis de que las tasas son iguales.",
      },
      {
        id: "m33-l2-q2",
        pregunta: "De 12 % a 14 % de conversión, el aumento es de:",
        opciones: ["2 % relativo", "2 puntos porcentuales (16.7 % relativo)", "14 puntos", "0.02 %"],
        respuestaCorrecta: 1,
        explicacion: "Distingue puntos porcentuales (absoluto) de porcentaje (relativo).",
      },
    ],
    resumen: ["La prueba z de dos proporciones arroja p = 0.0394.", "Distingue puntos porcentuales de cambio relativo.", "El intervalo de la diferencia dice qué tan grande podría ser el efecto."],
    proximoPaso: "Analizaremos el tiempo de pago con una prueba t y mediremos el tamaño del efecto.",
    conceptos: ["prueba-ab-proyecto"],
  },
  {
    id: "m33-l3",
    moduloId: "modulo-33",
    titulo: "Proyecto: compara los tiempos de pago y mide el efecto",
    objetivo: "Comparar dos grupos con la prueba t de Welch y cuantificar el tamaño del efecto con la d de Cohen.",
    porQueImporta:
      "El nuevo diseño no solo busca más compras: también pagos más rápidos. Para decidir si vale la pena hay que contrastar la diferencia y medir su magnitud, no solo su significancia.",
    concepto: "Los tiempos de pago de 20 clientes de cada versión:\n\n```python\ntiempo_a = [95, 100, 90, 79, 87, 77, 96, 119, 86, 84, 104, 101, 97, 78, 94, 108, 71, 87, 61, 72]\ntiempo_b = [51, 80, 61, 89, 87, 81, 39, 74, 83, 86, 56, 75, 66, 69, 103, 69, 83, 100, 73, 82]\n```\n\nSe contrasta con la prueba t de Welch y se mide el tamaño del efecto con la **d de Cohen**:\n\n```python\nr = stats.ttest_ind(tiempo_a, tiempo_b, equal_var=False)\nd = (media_a - media_b) / desviacion_combinada\n```\n\nSi el p-valor es pequeño **y** la d es grande, la mejora es real y relevante. Si p es pequeño pero d es mínima, el efecto existe pero quizá no compense el costo del cambio.",
    ejemploMinimo: "import numpy as np\n\ntiempo_a = [95, 100, 90, 79, 87, 77, 96, 119, 86, 84, 104, 101, 97, 78, 94, 108, 71, 87, 61, 72]\ntiempo_b = [51, 80, 61, 89, 87, 81, 39, 74, 83, 86, 56, 75, 66, 69, 103, 69, 83, 100, 73, 82]\nprint(np.mean(tiempo_a), np.mean(tiempo_b))",
    ejemploAplicado: "import numpy as np\nfrom scipy import stats\n\ntiempo_a = [95, 100, 90, 79, 87, 77, 96, 119, 86, 84, 104, 101, 97, 78, 94, 108, 71, 87, 61, 72]\ntiempo_b = [51, 80, 61, 89, 87, 81, 39, 74, 83, 86, 56, 75, 66, 69, 103, 69, 83, 100, 73, 82]\n\nr = stats.ttest_ind(tiempo_a, tiempo_b, equal_var=False)\nprint(f\"media A = {np.mean(tiempo_a):.1f} s, media B = {np.mean(tiempo_b):.1f} s\")\nprint(f\"t = {r.statistic:.3f}, p = {r.pvalue:.4f}\")",
    errorFrecuente: {
      codigo: "import numpy as np\n\ntiempo_a = [95, 100, 90, 79, 87, 77, 96, 119, 86, 84, 104, 101, 97, 78, 94, 108, 71, 87, 61, 72]\ntiempo_b = [51, 80, 61, 89, 87, 81, 39, 74, 83, 86, 56, 75, 66, 69, 103, 69, 83, 100, 73, 82]\nprint(\"Diferencia:\", np.mean(tiempo_a) - np.mean(tiempo_b), \"s, entonces B es mejor\")",
      explicacion:
        "Una diferencia de medias, por grande que parezca, puede ser ruido si los datos varían mucho. Hay que contrastarla con la variabilidad (prueba t) y expresar su magnitud relativa a la dispersión (d de Cohen).",
    },
    practicaGuiada: {
      id: "m33-l3-practica",
      enunciado: "Aplica la prueba t de Welch a los tiempos e imprime el **p-valor** con 4 decimales.",
      codigoInicial: "from scipy import stats\n\ntiempo_a = [95, 100, 90, 79, 87, 77, 96, 119, 86, 84, 104, 101, 97, 78, 94, 108, 71, 87, 61, 72]\ntiempo_b = [51, 80, 61, 89, 87, 81, 39, 74, 83, 86, 56, 75, 66, 69, 103, 69, 83, 100, 73, 82]\n\np = 1\nprint(p)",
      solucion: "from scipy import stats\n\ntiempo_a = [95, 100, 90, 79, 87, 77, 96, 119, 86, 84, 104, 101, 97, 78, 94, 108, 71, 87, 61, 72]\ntiempo_b = [51, 80, 61, 89, 87, 81, 39, 74, 83, 86, 56, 75, 66, 69, 103, 69, 83, 100, 73, 82]\n\np = round(stats.ttest_ind(tiempo_a, tiempo_b, equal_var=False).pvalue, 4)\nprint(p)",
      pistas: ["`stats.ttest_ind(tiempo_a, tiempo_b, equal_var=False).pvalue`"],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.0053) <= 6e-05
        return { ok, mensaje: ok ? "Correcto: p = 0.0053; B es significativamente más rápida." : "El resultado esperado es 0.0053." }
      },
    },
    reto: {
      id: "m33-l3-reto",
      enunciado: "Calcula la **d de Cohen** `(media_a - media_b) / desviación_combinada`, con `sp = √(((n-1)·s²_a + (n-1)·s²_b) / (2n-2))`, e imprímela con 2 decimales.",
      codigoInicial: "import numpy as np\n\ntiempo_a = [95, 100, 90, 79, 87, 77, 96, 119, 86, 84, 104, 101, 97, 78, 94, 108, 71, 87, 61, 72]\ntiempo_b = [51, 80, 61, 89, 87, 81, 39, 74, 83, 86, 56, 75, 66, 69, 103, 69, 83, 100, 73, 82]\nn = len(tiempo_a)\nva, vb = np.var(tiempo_a, ddof=1), np.var(tiempo_b, ddof=1)\n\nd = 0\nprint(round(d, 2))",
      solucion: "import numpy as np\n\ntiempo_a = [95, 100, 90, 79, 87, 77, 96, 119, 86, 84, 104, 101, 97, 78, 94, 108, 71, 87, 61, 72]\ntiempo_b = [51, 80, 61, 89, 87, 81, 39, 74, 83, 86, 56, 75, 66, 69, 103, 69, 83, 100, 73, 82]\nn = len(tiempo_a)\nva, vb = np.var(tiempo_a, ddof=1), np.var(tiempo_b, ddof=1)\n\nsp = np.sqrt(((n - 1) * va + (n - 1) * vb) / (2 * n - 2))\nd = (np.mean(tiempo_a) - np.mean(tiempo_b)) / sp\nprint(round(d, 2))",
      pistas: ["Calcula primero `sp` con la fórmula del enunciado.", "Después divide la diferencia de medias entre `sp`."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.94) <= 0.006
        return { ok, mensaje: ok ? "Correcto: d = 0.94, un efecto grande." : "El resultado esperado es 0.94." }
      },
    },
    verificacion: [
      {
        id: "m33-l3-q1",
        pregunta: "Un d de Cohen de 0.94 se considera:",
        opciones: ["Insignificante", "Pequeño", "Mediano", "Grande"],
        respuestaCorrecta: 3,
        explicacion: "Por encima de 0.8 se interpreta como un efecto grande.",
      },
      {
        id: "m33-l3-q2",
        pregunta: "Si el p-valor es pequeño pero d = 0.05, ¿qué conclusión es razonable?",
        opciones: ["El efecto es enorme", "La diferencia es detectable pero prácticamente irrelevante", "No hay diferencia", "El test es inválido"],
        respuestaCorrecta: 1,
        explicacion: "Significancia no implica relevancia práctica.",
      },
    ],
    resumen: ["Welch contrasta si los tiempos difieren (p = 0.0053).", "La d de Cohen (0.94) mide cuán grande es la diferencia.", "Decide con significancia y con magnitud, no solo con p."],
    proximoPaso: "Cerraremos con el reporte final y la recomendación.",
    conceptos: ["d-de-cohen-proyecto"],
  },
  {
    id: "m33-l4",
    moduloId: "modulo-33",
    titulo: "Proyecto: reporte y recomendación",
    objetivo: "Resumir los resultados de un experimento con cifras, intervalos, decisión y limitaciones.",
    porQueImporta:
      "La estadística sirve cuando alguien toma una decisión con ella. Un reporte claro dice qué se encontró, con cuánta incertidumbre, qué se recomienda y qué no se puede afirmar.",
    concepto: "Contenido del reporte:\n\n1. **Resultado principal** con la diferencia estimada y su intervalo de confianza.\n2. **Significancia** (p-valor) y **relevancia** (tamaño del efecto).\n3. **Recomendación** basada en ambos.\n4. **Limitaciones**: duración del test, efecto novedad, un solo mercado, múltiples métricas analizadas (¿se corrigió α?).\n\nPara este caso: la conversión sube 2 puntos porcentuales (IC95 % de 0.1 a 3.9 puntos) con p = 0.0394, y los pagos son más rápidos con un efecto grande. Es **prometedor**, pero el límite inferior del intervalo (0.1 puntos) deja abierta la posibilidad de un beneficio muy pequeño, así que la decisión depende del costo del cambio.\n\nSe analizaron dos métricas (conversión y tiempo): con Bonferroni, α = 0.025. El p-valor de la conversión (0.0394) **no** supera ese umbral más estricto; el del tiempo (0.0053) sí.",
    ejemploMinimo: "p1, p2 = 288 / 2400, 336 / 2400\nprint(f\"{(p2 - p1) * 100:.2f} puntos\")",
    ejemploAplicado: "import math\n\nx1, n1, x2, n2 = 288, 2400, 336, 2400\np1, p2 = x1 / n1, x2 / n2\nee = math.sqrt(p1 * (1 - p1) / n1 + p2 * (1 - p2) / n2)\ndif = p2 - p1\n\nprint(f\"Diferencia: {dif * 100:.2f} puntos\")\nprint(f\"IC 95 %: {(dif - 1.96 * ee) * 100:.2f} a {(dif + 1.96 * ee) * 100:.2f} puntos\")",
    errorFrecuente: {
      codigo: "print(\"p = 0.0394 < 0.05, así que hay un 96 % de probabilidad de que B sea mejor\")",
      explicacion:
        "El p-valor no es la probabilidad de que B sea mejor. Dice cuán incompatibles son los datos con la hipótesis de que A y B son iguales. Para afirmar «probabilidad de que B sea mejor» habría que usar otro enfoque (bayesiano).",
    },
    practicaGuiada: {
      id: "m33-l4-practica",
      enunciado: "Calcula el **límite inferior** del IC del 95 % de la diferencia `p2 - p1` (sin combinar proporciones), en puntos porcentuales y con 2 decimales.",
      codigoInicial: "import math\n\nx1, n1, x2, n2 = 288, 2400, 336, 2400\np1, p2 = x1 / n1, x2 / n2\nee = math.sqrt(p1 * (1 - p1) / n1 + p2 * (1 - p2) / n2)\n\nlimite_inferior = 0\nprint(limite_inferior)",
      solucion: "import math\n\nx1, n1, x2, n2 = 288, 2400, 336, 2400\np1, p2 = x1 / n1, x2 / n2\nee = math.sqrt(p1 * (1 - p1) / n1 + p2 * (1 - p2) / n2)\n\nlimite_inferior = round(((p2 - p1) - 1.96 * ee) * 100, 2)\nprint(limite_inferior)",
      pistas: ["`(p2 - p1) - 1.96 * ee`, multiplicado por 100 para pasarlo a puntos porcentuales."],
      validar: (stdout) => {
        const v = parseFloat(stdout.trim())
        const ok = !Number.isNaN(v) && Math.abs(v - 0.1) <= 0.006
        return { ok, mensaje: ok ? "Correcto: en el peor caso la mejora sería de 0.10 puntos." : "El resultado esperado es 0.1." }
      },
    },
    reto: {
      id: "m33-l4-reto",
      enunciado: "Genera el **reporte final** con las cuatro líneas indicadas (diferencia y límites en puntos porcentuales con 2 decimales, p-valor con 4 decimales).",
      codigoInicial: "import math\nfrom scipy.stats import norm\n\nx1, n1, x2, n2 = 288, 2400, 336, 2400\np1, p2 = x1 / n1, x2 / n2\ndif = p2 - p1\n\nprint(f\"Conversión A: {p1:.2%}\")\nprint(f\"Conversión B: {p2:.2%}\")\nprint(\"Diferencia: 0.00 puntos (IC 95 %: 0.00 a 0.00)\")\nprint(\"p-valor: 1.0000\")",
      solucion: "import math\nfrom scipy.stats import norm\n\nx1, n1, x2, n2 = 288, 2400, 336, 2400\np1, p2 = x1 / n1, x2 / n2\ndif = p2 - p1\n\nee_dif = math.sqrt(p1 * (1 - p1) / n1 + p2 * (1 - p2) / n2)\np_comb = (x1 + x2) / (n1 + n2)\nee = math.sqrt(p_comb * (1 - p_comb) * (1 / n1 + 1 / n2))\np_valor = 2 * norm.sf(abs(dif / ee))\n\nprint(f\"Conversión A: {p1:.2%}\")\nprint(f\"Conversión B: {p2:.2%}\")\nprint(f\"Diferencia: {dif * 100:.2f} puntos (IC 95 %: {(dif - 1.96 * ee_dif) * 100:.2f} a {(dif + 1.96 * ee_dif) * 100:.2f})\")\nprint(f\"p-valor: {p_valor:.4f}\")",
      pistas: ["El IC de la diferencia usa el error estándar **sin combinar**.", "El p-valor usa el error estándar **con proporción combinada**."],
      validar: (stdout) => {
        const l = stdout.trim().split('\n').map((x) => x.trim())
        const ok = JSON.stringify(l) === "[\"Conversión A: 12.00%\",\"Conversión B: 14.00%\",\"Diferencia: 2.00 puntos (IC 95 %: 0.10 a 3.90)\",\"p-valor: 0.0394\"]"
        return { ok, mensaje: ok ? "Correcto: reporte completo." : "Se esperaban las cuatro líneas del reporte con los valores 12.00%, 14.00%, 2.00 (0.10 a 3.90) y 0.0394." }
      },
    },
    verificacion: [
      {
        id: "m33-l4-q1",
        pregunta: "El IC de la diferencia va de 0.10 a 3.90 puntos. ¿Qué implica para la decisión?",
        opciones: ["Que B es mejor con certeza y por mucho", "Que el beneficio es probablemente positivo, pero podría ser muy pequeño", "Que no hay efecto", "Que hay que repetir el test"],
        respuestaCorrecta: 1,
        explicacion: "El límite inferior cerca de cero deja abierta la posibilidad de un efecto mínimo.",
      },
      {
        id: "m33-l4-q2",
        pregunta: "¿Por qué conviene corregir α cuando se analizan varias métricas?",
        opciones: ["Para obtener p-valores más pequeños", "Para controlar el riesgo acumulado de falsos positivos", "Porque Python lo exige", "No conviene"],
        respuestaCorrecta: 1,
        explicacion: "Cada métrica adicional aumenta la probabilidad de encontrar algo significativo por azar.",
      },
    ],
    resumen: ["Un reporte incluye diferencia, intervalo, p-valor, tamaño del efecto y limitaciones.", "El p-valor no es la probabilidad de que una hipótesis sea cierta.", "Con varias métricas, corrige el nivel de significancia."],
    proximoPaso: "Con esto completas el curso de Estadística inferencial.",
    conceptos: ["reporte-inferencial"],
  },
]
