import type { Lesson } from '../../types'

export const module9Lessons: Lesson[] = [
  {
    id: 'm9-l1',
    moduloId: 'modulo-9',
    titulo: 'matplotlib básico: líneas y barras',
    objetivo: 'Crear gráficos de línea y de barras con matplotlib, las dos visualizaciones más usadas en reportes de negocio.',
    porQueImporta:
      'Un número en una tabla no siempre comunica; una tendencia en un gráfico de línea o una comparación en un gráfico de barras sí. Comunicar hallazgos es tan importante como calcularlos.',
    concepto: `\`\`\`python
import matplotlib.pyplot as plt

plt.plot(meses, ventas)       # gráfico de línea (tendencias en el tiempo)
plt.bar(categorias, valores)  # gráfico de barras (comparar categorías)

plt.xlabel("Mes")
plt.ylabel("Ventas")
plt.title("Ventas mensuales")
plt.show()
\`\`\`

Siempre etiqueta los ejes y pon un título: un gráfico sin contexto no sirve para comunicar nada a otra persona.`,
    ejemploMinimo: `import matplotlib.pyplot as plt

meses = ["Ene", "Feb", "Mar"]
ventas = [100, 150, 120]
plt.plot(meses, ventas)
plt.title("Ventas por mes")
print("Gráfico de línea generado")`,
    ejemploAplicado: `import matplotlib.pyplot as plt

productos = ["Mouse", "Teclado", "Monitor"]
unidades = [50, 30, 15]

plt.bar(productos, unidades, color="#346dff")
plt.xlabel("Producto")
plt.ylabel("Unidades vendidas")
plt.title("Unidades vendidas por producto")
print("Gráfico de barras generado para", len(productos), "productos")`,
    errorFrecuente: {
      codigo: `import matplotlib.pyplot as plt

ventas = [100, 150, 120]
plt.plot(ventas)
plt.titulo("Ventas")`,
      explicacion:
        'El método correcto es `plt.title()`, no `plt.titulo()` (en inglés). matplotlib no tiene métodos en español; usar un nombre inventado lanza `AttributeError: module \'matplotlib.pyplot\' has no attribute \'titulo\'`.',
    },
    practicaGuiada: {
      id: 'm9-l1-practica',
      enunciado:
        'Completa el gráfico de barras con `plt.bar(categorias, valores)`, agrega un título con `plt.title("Ventas por categoría")`, y termina con `print("listo")`.',
      codigoInicial: `import matplotlib.pyplot as plt\n\ncategorias = ["A", "B", "C"]\nvalores = [30, 50, 20]\n# crea el gráfico de barras y el título\nprint("listo")`,
      solucion: `import matplotlib.pyplot as plt\n\ncategorias = ["A", "B", "C"]\nvalores = [30, 50, 20]\nplt.bar(categorias, valores)\nplt.title("Ventas por categoría")\nprint("listo")`,
      pistas: ['Usa `plt.bar(categorias, valores)` seguido de `plt.title("Ventas por categoría")`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'listo'
        return { ok, mensaje: ok ? 'Correcto, revisa el gráfico generado abajo en la consola.' : 'Debe imprimir "listo" después de crear el gráfico.' }
      },
    },
    reto: {
      id: 'm9-l1-reto',
      enunciado:
        'Dadas `dias = ["Lun", "Mar", "Mie", "Jue", "Vie"]` y `visitas = [120, 135, 90, 160, 200]`, crea un gráfico de línea, agrega `plt.xlabel("Día")` y `plt.ylabel("Visitas")`, y al final imprime el día con más visitas usando `dias[visitas.index(max(visitas))]`.',
      codigoInicial: `import matplotlib.pyplot as plt\n\ndias = ["Lun", "Mar", "Mie", "Jue", "Vie"]\nvisitas = [120, 135, 90, 160, 200]\n# crea el gráfico de línea con etiquetas e imprime el día con más visitas`,
      solucion: `import matplotlib.pyplot as plt\n\ndias = ["Lun", "Mar", "Mie", "Jue", "Vie"]\nvisitas = [120, 135, 90, 160, 200]\nplt.plot(dias, visitas)\nplt.xlabel("Día")\nplt.ylabel("Visitas")\nprint(dias[visitas.index(max(visitas))])`,
      pistas: ['`visitas.index(max(visitas))` encuentra la posición del valor máximo.', 'Usa esa posición para indexar `dias`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Vie'
        return { ok, mensaje: ok ? 'Correcto: el viernes tuvo el pico de visitas (200).' : 'El resultado esperado es Vie.' }
      },
    },
    verificacion: [
      {
        id: 'm9-l1-q1',
        pregunta: '¿Cuándo es mejor usar un gráfico de línea en vez de uno de barras?',
        opciones: [
          'Siempre, son intercambiables',
          'Cuando quieres mostrar una tendencia a lo largo del tiempo',
          'Cuando solo tienes una categoría',
          'Nunca, las barras son siempre mejores',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Las líneas comunican tendencias/evolución en el tiempo; las barras comparan magnitudes entre categorías discretas.',
      },
    ],
    resumen: [
      '`plt.plot()` crea gráficos de línea; `plt.bar()`, de barras.',
      'Siempre etiqueta con `plt.xlabel()`, `plt.ylabel()` y `plt.title()`.',
      'Elige el tipo de gráfico según la pregunta: tendencia en el tiempo (línea) vs. comparación entre categorías (barras).',
    ],
    proximoPaso: 'Veremos histogramas y boxplots, claves para entender cómo se distribuyen tus datos.',
    conceptos: ['matplotlib', 'graficos-linea-barras'],
  },
  {
    id: 'm9-l2',
    moduloId: 'modulo-9',
    titulo: 'Histogramas y boxplots',
    objetivo: 'Visualizar la distribución de una variable numérica con histogramas y detectar outliers con boxplots.',
    porQueImporta:
      'Antes de resumir una variable con un solo número (como el promedio), necesitas ver su distribución completa: ¿está concentrada, dispersa, tiene valores extremos?',
    concepto: `\`\`\`python
plt.hist(datos, bins=10)   # histograma: agrupa valores en "cajas" (bins) y cuenta frecuencias
plt.boxplot(datos)         # boxplot: muestra mediana, cuartiles y posibles outliers (puntos fuera de los "bigotes")
\`\`\`

El boxplot es especialmente útil para detectar outliers de un vistazo: cualquier punto dibujado fuera de los bigotes se considera un valor atípico según el criterio del rango intercuartílico.`,
    ejemploMinimo: `import matplotlib.pyplot as plt

datos = [10, 12, 11, 13, 90, 12, 11, 14]
plt.hist(datos, bins=5)
print("Histograma generado")`,
    ejemploAplicado: `import matplotlib.pyplot as plt

salarios = [2000, 2200, 2100, 2300, 2150, 9500, 2050]
plt.boxplot(salarios)
plt.title("Distribución de salarios")
print("Valor máximo:", max(salarios))`,
    errorFrecuente: {
      codigo: `import matplotlib.pyplot as plt

datos = [1, 2, 3, 4, 5]
plt.hist(datos, bins="muchos")`,
      explicacion:
        'El parámetro `bins` espera un número entero (o una secuencia de bordes), no un texto como `"muchos"`: lanza un error de tipo. Usa un entero, por ejemplo `bins=10`.',
    },
    practicaGuiada: {
      id: 'm9-l2-practica',
      enunciado: 'Crea un histograma de `datos` con `bins=4` e imprime `len(datos)` al final.',
      codigoInicial: `import matplotlib.pyplot as plt\n\ndatos = [5, 7, 8, 6, 9, 7, 5, 8, 10, 6]\n# crea el histograma con bins=4\nprint(len(datos))`,
      solucion: `import matplotlib.pyplot as plt\n\ndatos = [5, 7, 8, 6, 9, 7, 5, 8, 10, 6]\nplt.hist(datos, bins=4)\nprint(len(datos))`,
      pistas: ['`plt.hist(datos, bins=4)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '10'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 10.' }
      },
    },
    reto: {
      id: 'm9-l2-reto',
      enunciado:
        'Dado `tiempos_respuesta` con un valor claramente atípico, crea un boxplot con `plt.boxplot(tiempos_respuesta)` e imprime cuántos valores hay por encima de 100 usando una comprensión de listas.',
      codigoInicial: `import matplotlib.pyplot as plt\n\ntiempos_respuesta = [12, 15, 14, 13, 16, 12, 150, 14]\n# crea el boxplot e imprime cuántos valores superan 100`,
      solucion: `import matplotlib.pyplot as plt\n\ntiempos_respuesta = [12, 15, 14, 13, 16, 12, 150, 14]\nplt.boxplot(tiempos_respuesta)\natipicos = [t for t in tiempos_respuesta if t > 100]\nprint(len(atipicos))`,
      pistas: ['Usa una comprensión de listas: `[t for t in tiempos_respuesta if t > 100]`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1'
        return { ok, mensaje: ok ? 'Correcto: solo 150 supera 100.' : 'El resultado esperado es 1.' }
      },
    },
    verificacion: [
      {
        id: 'm9-l2-q1',
        pregunta: '¿Qué muestra un boxplot que un histograma no resalta tan claramente?',
        opciones: [
          'El valor promedio exacto',
          'Los cuartiles, la mediana y los posibles outliers de un vistazo',
          'El número total de datos',
          'El nombre de las columnas',
        ],
        respuestaCorrecta: 1,
        explicacion: 'El boxplot está diseñado específicamente para resaltar la mediana, los cuartiles y los valores atípicos.',
      },
    ],
    resumen: [
      '`plt.hist()` muestra la distribución de frecuencias de una variable numérica.',
      '`plt.boxplot()` resalta mediana, cuartiles y outliers de un vistazo.',
      'Siempre visualiza la distribución antes de resumir una variable con un solo número.',
    ],
    proximoPaso: 'Veremos scatter plots para explorar relaciones entre dos variables.',
    conceptos: ['histogramas', 'boxplots'],
  },
  {
    id: 'm9-l3',
    moduloId: 'modulo-9',
    titulo: 'Scatter plots: relaciones entre variables',
    objetivo: 'Explorar la relación entre dos variables numéricas con scatter plots y mejorar su estilo visual.',
    porQueImporta:
      '¿El precio influye en las ventas? ¿La inversión en marketing se relaciona con los ingresos? Estas preguntas de relación entre variables se exploran visualmente con scatter plots.',
    concepto: `\`\`\`python
plt.scatter(x, y)   # cada punto es una observación (x, y)
\`\`\`

Puedes mejorar la legibilidad con parámetros simples:

\`\`\`python
plt.scatter(x, y, color="#346dff", alpha=0.7, s=60)  # alpha = transparencia, s = tamaño del punto
plt.grid(alpha=0.3)
\`\`\`

Un patrón ascendente sugiere relación positiva; descendente, relación negativa; una nube sin patrón sugiere poca o ninguna relación (lo confirmaremos con correlación en el próximo módulo).`,
    ejemploMinimo: `import matplotlib.pyplot as plt

horas_estudio = [1, 2, 3, 4, 5]
nota = [60, 65, 70, 80, 95]
plt.scatter(horas_estudio, nota)
print("Scatter generado")`,
    ejemploAplicado: `import matplotlib.pyplot as plt

inversion = [100, 200, 300, 400, 500]
ingresos = [500, 900, 1400, 1800, 2600]

plt.scatter(inversion, ingresos, color="#346dff", alpha=0.8, s=80)
plt.grid(alpha=0.3)
plt.xlabel("Inversión en marketing")
plt.ylabel("Ingresos")
print("Relación visualizada entre inversión e ingresos")`,
    errorFrecuente: {
      codigo: `import matplotlib.pyplot as plt

x = [1, 2, 3]
y = [10, 20, 30]
plt.scatter(x, y, alpha=2)`,
      explicacion:
        'El parámetro `alpha` (transparencia) debe estar entre 0 y 1. Usar `alpha=2` lanza un error de valor fuera de rango. Para puntos semi-transparentes usa algo como `alpha=0.7`.',
    },
    practicaGuiada: {
      id: 'm9-l3-practica',
      enunciado: 'Crea un scatter plot con `plt.scatter(x, y)` e imprime "ok" al final.',
      codigoInicial: `import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 15, 13, 18]\n# crea el scatter plot\nprint("ok")`,
      solucion: `import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 15, 13, 18]\nplt.scatter(x, y)\nprint("ok")`,
      pistas: ['`plt.scatter(x, y)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'ok'
        return { ok, mensaje: ok ? 'Correcto.' : 'Debe imprimir "ok".' }
      },
    },
    reto: {
      id: 'm9-l3-reto',
      enunciado:
        'Crea un scatter plot de `temperatura` vs `ventas_helado` con `plt.scatter(temperatura, ventas_helado, alpha=0.8)`, y luego imprime el valor máximo de `ventas_helado`.',
      codigoInicial: `import matplotlib.pyplot as plt\n\ntemperatura = [20, 25, 30, 35, 28]\nventas_helado = [50, 80, 120, 160, 95]\n# crea el scatter plot e imprime el máximo de ventas_helado`,
      solucion: `import matplotlib.pyplot as plt\n\ntemperatura = [20, 25, 30, 35, 28]\nventas_helado = [50, 80, 120, 160, 95]\nplt.scatter(temperatura, ventas_helado, alpha=0.8)\nprint(max(ventas_helado))`,
      pistas: ['`plt.scatter(temperatura, ventas_helado, alpha=0.8)`.', '`max(ventas_helado)` da el valor máximo de la lista.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '160'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 160.' }
      },
    },
    verificacion: [
      {
        id: 'm9-l3-q1',
        pregunta: '¿Qué sugiere un patrón ascendente de izquierda a derecha en un scatter plot?',
        opciones: ['Relación negativa', 'Relación positiva', 'No hay relación', 'Un error en los datos'],
        respuestaCorrecta: 1,
        explicacion: 'Un patrón ascendente sugiere que, al aumentar x, y también tiende a aumentar: relación positiva.',
      },
    ],
    resumen: [
      '`plt.scatter(x, y)` visualiza la relación entre dos variables numéricas.',
      'Parámetros como `alpha` (transparencia) y `s` (tamaño) mejoran la legibilidad con muchos puntos.',
      'Un patrón visual sugiere relación, pero confirmarla requiere calcular correlación (próximo módulo).',
    ],
    proximoPaso: 'Cerramos el módulo con principios de storytelling: cómo elegir el gráfico correcto y comunicar un hallazgo con claridad.',
    conceptos: ['scatter-plot'],
  },
  {
    id: 'm9-l4',
    moduloId: 'modulo-9',
    titulo: 'Storytelling: elegir el gráfico correcto',
    objetivo: 'Aplicar un criterio claro para elegir el tipo de gráfico según la pregunta de negocio, y comunicar un solo hallazgo por gráfico.',
    porQueImporta:
      'Un gráfico técnicamente correcto pero mal elegido confunde en vez de aclarar. Un analista profesional diseña cada visualización pensando en la pregunta que responde y en quién la va a leer.',
    concepto: `Guía rápida para elegir el gráfico correcto:

| Pregunta | Gráfico |
|---|---|
| ¿Cómo cambia algo en el tiempo? | Línea |
| ¿Cómo se comparan categorías? | Barras |
| ¿Cómo se distribuye una variable? | Histograma / boxplot |
| ¿Hay relación entre dos variables? | Scatter plot |
| ¿Cómo se compone un total? | Barras apiladas / torta (con moderación) |

Principio clave de storytelling: **un gráfico, un mensaje**. Si tu gráfico necesita un párrafo de explicación para entenderse, probablemente intenta decir demasiado a la vez.`,
    ejemploMinimo: `import matplotlib.pyplot as plt

ventas_2023 = [100, 120, 90, 150]
ventas_2024 = [110, 140, 95, 180]
trimestres = ["Q1", "Q2", "Q3", "Q4"]

plt.plot(trimestres, ventas_2023, label="2023")
plt.plot(trimestres, ventas_2024, label="2024")
plt.legend()
print("Comparación de dos años en un solo gráfico de línea")`,
    ejemploAplicado: `import matplotlib.pyplot as plt

canal = ["Online", "Tienda física", "Telefónico"]
participacion = [55, 35, 10]

plt.bar(canal, participacion, color=["#346dff", "#5a94ff", "#8cbaff"])
plt.ylabel("% de ventas")
plt.title("¿De dónde vienen nuestras ventas?")
print("Mensaje principal: el canal Online domina con", max(participacion), "%")`,
    errorFrecuente: {
      codigo: `import matplotlib.pyplot as plt

categorias = ["A", "B", "C", "D", "E", "F", "G", "H"]
valores = [10, 15, 8, 20, 5, 12, 18, 9]
plt.pie(valores, labels=categorias)`,
      explicacion:
        'Un gráfico de torta con 8 categorías es difícil de leer: el ojo humano no compara bien ángulos entre muchas porciones pequeñas. Con más de 4-5 categorías, un gráfico de barras ordenado comunica mejor la comparación.',
    },
    practicaGuiada: {
      id: 'm9-l4-practica',
      enunciado:
        'Tienes datos de ventas por trimestre (una tendencia en el tiempo). Elige el gráfico correcto (`plot` o `bar`) usando `plt.plot(trimestres, ventas)`, e imprime "linea" si usaste el correcto.',
      codigoInicial: `import matplotlib.pyplot as plt\n\ntrimestres = ["Q1", "Q2", "Q3", "Q4"]\nventas = [100, 120, 90, 150]\n# elige el gráfico correcto para una tendencia en el tiempo\nprint("linea")`,
      solucion: `import matplotlib.pyplot as plt\n\ntrimestres = ["Q1", "Q2", "Q3", "Q4"]\nventas = [100, 120, 90, 150]\nplt.plot(trimestres, ventas)\nprint("linea")`,
      pistas: ['Una tendencia en el tiempo se visualiza mejor con `plt.plot()`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'linea'
        return { ok, mensaje: ok ? 'Correcto: para tendencias en el tiempo, la línea es la elección adecuada.' : 'Debe imprimir "linea".' }
      },
    },
    reto: {
      id: 'm9-l4-reto',
      enunciado:
        'Tienes la participación de 3 vendedores en las ventas totales (comparar categorías, no tiempo). Crea el gráfico correcto con `plt.bar()`, y además imprime el nombre del vendedor con mayor participación usando `vendedores[participacion.index(max(participacion))]`.',
      codigoInicial: `import matplotlib.pyplot as plt\n\nvendedores = ["Ana", "Luis", "Eva"]\nparticipacion = [45, 30, 25]\n# crea el gráfico de barras e imprime el vendedor líder`,
      solucion: `import matplotlib.pyplot as plt\n\nvendedores = ["Ana", "Luis", "Eva"]\nparticipacion = [45, 30, 25]\nplt.bar(vendedores, participacion)\nprint(vendedores[participacion.index(max(participacion))])`,
      pistas: ['Comparar categorías (vendedores) se hace con `plt.bar()`.', '`participacion.index(max(participacion))` encuentra la posición del valor más alto.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Ana'
        return { ok, mensaje: ok ? 'Correcto: Ana lidera con 45%.' : 'El resultado esperado es Ana.' }
      },
    },
    verificacion: [
      {
        id: 'm9-l4-q1',
        pregunta: '¿Cuál es el principio clave del storytelling con datos mencionado en esta lección?',
        opciones: [
          'Usar siempre gráficos de torta',
          'Un gráfico, un mensaje',
          'Incluir la mayor cantidad de datos posible en un solo gráfico',
          'Nunca usar colores',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Cada gráfico debe comunicar un único hallazgo claro; combinar demasiados mensajes en un gráfico dificulta su lectura.',
      },
    ],
    resumen: [
      'La pregunta de negocio determina el tipo de gráfico: tiempo → línea, comparación → barras, distribución → histograma/boxplot, relación → scatter.',
      'Evita gráficos de torta con muchas categorías: las barras suelen comunicar mejor.',
      'Principio clave: un gráfico, un mensaje.',
    ],
    proximoPaso:
      'En el Módulo 10 combinamos visualización con estadística: análisis exploratorio de datos (EDA), correlaciones, outliers y pruebas de hipótesis.',
    conceptos: ['storytelling-datos', 'seleccion-grafico'],
  },
]
