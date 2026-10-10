import type { Lesson } from '../../types'

export const module2Lessons: Lesson[] = [
  {
    id: 'm2-l1',
    moduloId: 'modulo-2',
    titulo: 'Condicionales: if, elif, else',
    objetivo: 'Tomar decisiones en tu código según condiciones, usando if/elif/else.',
    porQueImporta:
      'Filtrar registros, clasificar clientes o detectar valores atípicos siempre implica preguntar "¿esta condición se cumple?". Los condicionales son la base de cualquier lógica de negocio en análisis de datos.',
    concepto: `La estructura básica es:

\`\`\`python
if condicion:
    # se ejecuta si condicion es True
elif otra_condicion:
    # se ejecuta si la anterior fue False y esta es True
else:
    # se ejecuta si ninguna condición anterior fue True
\`\`\`

Python usa **indentación** (espacios al inicio de línea) para definir qué código pertenece a cada bloque. Esto no es opcional: una indentación incorrecta causa un \`IndentationError\`.`,
    ejemploMinimo: `edad = 20
if edad >= 18:
    print("Mayor de edad")
else:
    print("Menor de edad")`,
    ejemploAplicado: `ventas = 850
meta = 1000

if ventas >= meta:
    categoria = "Meta cumplida"
elif ventas >= meta * 0.8:
    categoria = "Cerca de la meta"
else:
    categoria = "Bajo rendimiento"

print(f"Ventas: {ventas} -> {categoria}")`,
    errorFrecuente: {
      codigo: `nota = 7
if nota >= 6:
print("Aprobado")`,
      explicacion:
        'Falta la indentación en la línea del `print`. Todo el código dentro de un bloque `if` debe estar indentado (normalmente 4 espacios); si no, Python lanza `IndentationError: expected an indented block`.',
    },
    practicaGuiada: {
      id: 'm2-l1-practica',
      enunciado:
        'Dado `stock = 0`, imprime "Sin stock" si `stock` es 0, o "Disponible" en cualquier otro caso, usando if/else.',
      codigoInicial: `stock = 0\nif stock == 0:\n    print("ESCRIBE_AQUI")\nelse:\n    print("ESCRIBE_AQUI")`,
      solucion: `stock = 0\nif stock == 0:\n    print("Sin stock")\nelse:\n    print("Disponible")`,
      pistas: ['Reemplaza cada "ESCRIBE_AQUI" por el texto exacto solicitado.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Sin stock'
        return { ok, mensaje: ok ? 'Correcto: con stock 0 debe decir "Sin stock".' : 'Con stock = 0, el resultado debe ser "Sin stock".' }
      },
    },
    reto: {
      id: 'm2-l1-reto',
      enunciado:
        'Dado `promedio = 7.5`, clasifica con if/elif/else e imprime: "Excelente" si promedio >= 9, "Bueno" si promedio >= 7, o "Necesita mejorar" en otro caso.',
      codigoInicial: `promedio = 7.5\n# escribe tu if/elif/else aquí`,
      solucion: `promedio = 7.5\nif promedio >= 9:\n    print("Excelente")\nelif promedio >= 7:\n    print("Bueno")\nelse:\n    print("Necesita mejorar")`,
      pistas: ['Evalúa primero la condición más alta (>= 9).', 'Con 7.5, la primera condición es falsa pero la segunda (>= 7) es verdadera.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Bueno'
        return { ok, mensaje: ok ? 'Correcto: 7.5 cae en "Bueno".' : 'Con promedio 7.5 el resultado esperado es "Bueno".' }
      },
    },
    verificacion: [
      {
        id: 'm2-l1-q1',
        pregunta: '¿Qué define qué código pertenece a un bloque `if` en Python?',
        opciones: ['Los paréntesis', 'Las llaves {}', 'La indentación', 'El punto y coma'],
        respuestaCorrecta: 2,
        explicacion: 'Python usa la indentación (espacios) para delimitar bloques de código, a diferencia de otros lenguajes que usan llaves.',
      },
    ],
    resumen: [
      'if/elif/else permiten ejecutar código según condiciones.',
      'La indentación define qué pertenece a cada bloque.',
      'Solo se ejecuta el primer bloque cuya condición sea True.',
    ],
    proximoPaso: 'Ahora veremos cómo repetir acciones con bucles for, clave para procesar colecciones de datos.',
    conceptos: ['condicionales', 'indentacion'],
  },
  {
    id: 'm2-l2',
    moduloId: 'modulo-2',
    titulo: 'Bucle for y range',
    objetivo: 'Recorrer secuencias con for y generar rangos numéricos con range().',
    porQueImporta:
      'Procesar cada fila de un dataset, calcular un total acumulado o repetir una transformación son tareas que dependen de iterar con for.',
    concepto: `\`for\` recorre los elementos de una secuencia (lista, string, rango, etc.):

\`\`\`python
for elemento in secuencia:
    # se ejecuta una vez por cada elemento
\`\`\`

\`range(n)\` genera números de 0 a n-1. \`range(a, b)\` genera de a a b-1. Es muy usado para repetir algo "n veces" o recorrer índices.`,
    ejemploMinimo: `for i in range(5):
    print(i)`,
    ejemploAplicado: `ventas = [120, 340, 560, 80]
total = 0
for venta in ventas:
    total = total + venta
print("Total acumulado:", total)`,
    errorFrecuente: {
      codigo: `ventas = [100, 200, 300]
for i in range(len(ventas)):
    print(ventas[i + 1])`,
      explicacion:
        'Al llegar al último índice, `i + 1` se sale del rango de la lista y lanza `IndexError: list index out of range`. Si solo necesitas los valores (no el índice), itera directamente sobre la lista: `for venta in ventas`.',
    },
    practicaGuiada: {
      id: 'm2-l2-practica',
      enunciado: 'Usa un for con range(1, 4) para imprimir los números 1, 2 y 3, cada uno en su línea.',
      codigoInicial: `for i in range(0, 0):\n    print(i)`,
      solucion: `for i in range(1, 4):\n    print(i)`,
      pistas: ['`range(1, 4)` genera 1, 2 y 3 (el límite superior no se incluye).'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1\n2\n3'
        return { ok, mensaje: ok ? 'Correcto.' : 'Debe imprimir 1, 2 y 3 en líneas separadas.' }
      },
    },
    reto: {
      id: 'm2-l2-reto',
      enunciado:
        'Dada `temperaturas = [18, 22, 31, 15, 27]`, usa un for para contar cuántas son mayores a 20 e imprime solo ese número.',
      codigoInicial: `temperaturas = [18, 22, 31, 15, 27]\ncontador = 0\n# completa el bucle\nprint(contador)`,
      solucion: `temperaturas = [18, 22, 31, 15, 27]\ncontador = 0\nfor t in temperaturas:\n    if t > 20:\n        contador = contador + 1\nprint(contador)`,
      pistas: ['Dentro del for, usa un if para verificar `t > 20`.', 'Incrementa `contador` en 1 cada vez que la condición sea verdadera.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '3'
        return { ok, mensaje: ok ? 'Correcto: 22, 31 y 27 son mayores a 20.' : 'El resultado esperado es 3.' }
      },
    },
    verificacion: [
      {
        id: 'm2-l2-q1',
        pregunta: '¿Qué genera `range(2, 5)`?',
        opciones: ['2, 3, 4, 5', '2, 3, 4', '1, 2, 3, 4', '0, 1, 2, 3, 4'],
        respuestaCorrecta: 1,
        explicacion: '`range(a, b)` genera desde a hasta b-1, es decir 2, 3, 4.',
      },
    ],
    resumen: [
      '`for elemento in secuencia` recorre cada elemento.',
      '`range(n)` / `range(a, b)` genera secuencias numéricas.',
      'Acceder a un índice fuera de rango lanza `IndexError`.',
    ],
    proximoPaso: 'Veremos while para repetir mientras se cumpla una condición, y cómo controlar bucles con break y continue.',
    conceptos: ['bucle-for', 'range'],
  },
  {
    id: 'm2-l3',
    moduloId: 'modulo-2',
    titulo: 'While, break y continue',
    objetivo: 'Repetir código mientras se cumpla una condición, y controlar el flujo con break/continue.',
    porQueImporta:
      'Cuando no sabes de antemano cuántas veces debes repetir algo (por ejemplo, hasta que un valor supere un umbral), `while` es la herramienta correcta, muy usada en procesos iterativos de limpieza o simulación.',
    concepto: `\`while\` repite mientras la condición sea \`True\`:

\`\`\`python
while condicion:
    # se repite mientras condicion sea True
\`\`\`

- \`break\`: sale inmediatamente del bucle.
- \`continue\`: salta a la siguiente iteración sin ejecutar el resto del bloque.

**Cuidado**: si la condición nunca se vuelve \`False\`, tienes un bucle infinito.`,
    ejemploMinimo: `contador = 0
while contador < 3:
    print(contador)
    contador += 1`,
    ejemploAplicado: `saldo = 1000
retiro = 300

while saldo > 0:
    saldo -= retiro
    if saldo < 0:
        print("Último retiro parcial, saldo insuficiente")
        break
    print("Saldo restante:", saldo)`,
    errorFrecuente: {
      codigo: `contador = 0
while contador < 5:
    print(contador)`,
      explicacion:
        'Nunca se actualiza `contador`, así que la condición `contador < 5` siempre es `True`: es un bucle infinito. Siempre asegúrate de modificar la variable de control dentro del bucle (`contador += 1`).',
    },
    practicaGuiada: {
      id: 'm2-l3-practica',
      enunciado: 'Completa el bucle while para que imprima 10, 20 y 30 (incrementando de 10 en 10) y se detenga.',
      codigoInicial: `n = 10\nwhile n <= 30:\n    print(n)\n    n = n + 100`,
      solucion: `n = 10\nwhile n <= 30:\n    print(n)\n    n = n + 10`,
      pistas: ['El incremento debe ser de 10 en cada vuelta, no 0 (eso causaría un bucle infinito).'],
      validar: (stdout) => {
        const ok = stdout.trim() === '10\n20\n30'
        return { ok, mensaje: ok ? 'Correcto.' : 'Debe imprimir 10, 20 y 30.' }
      },
    },
    reto: {
      id: 'm2-l3-reto',
      enunciado:
        'Dada una lista `numeros = [4, 7, -1, 9, -3]` (con dos negativos), recórrela con un for y usa `break` para detenerte tras imprimir el **primer** número negativo que encuentres.',
      codigoInicial: `numeros = [4, 7, -1, 9, -3]\nfor n in numeros:\n    if n < 0:\n        print(n)\n        # falta detener el bucle`,
      solucion: `numeros = [4, 7, -1, 9, -3]\nfor n in numeros:\n    if n < 0:\n        print(n)\n        break`,
      pistas: ['Agrega `break` justo después del `print` dentro del `if`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '-1'
        return { ok, mensaje: ok ? 'Correcto: -1 es el primer número negativo y el bucle se detuvo ahí.' : 'Debe imprimir únicamente -1 (usa break para no seguir hasta el -3).' }
      },
    },
    verificacion: [
      {
        id: 'm2-l3-q1',
        pregunta: '¿Qué hace `continue` dentro de un bucle?',
        opciones: ['Termina el bucle por completo', 'Salta a la siguiente iteración sin ejecutar el resto del bloque', 'Reinicia el contador', 'No hace nada'],
        respuestaCorrecta: 1,
        explicacion: '`continue` omite el resto del código de esa vuelta y pasa directamente a la siguiente iteración.',
      },
    ],
    resumen: [
      '`while condicion` repite mientras la condición sea True.',
      'Olvidar actualizar la variable de control causa bucles infinitos.',
      '`break` termina el bucle; `continue` salta a la siguiente vuelta.',
    ],
    proximoPaso: 'Cerramos el módulo con comprensión de listas: una forma compacta y muy usada en ciencia de datos para crear listas.',
    conceptos: ['bucle-while', 'break-continue'],
  },
  {
    id: 'm2-l4',
    moduloId: 'modulo-2',
    titulo: 'Comprensión de listas',
    objetivo: 'Crear listas de forma compacta con list comprehensions, combinando for y condicionales en una sola línea.',
    porQueImporta:
      'La comprensión de listas es el estilo idiomático de Python para transformar y filtrar datos, y la verás constantemente en código profesional de análisis de datos.',
    concepto: `En vez de escribir:

\`\`\`python
resultado = []
for x in secuencia:
    resultado.append(x * 2)
\`\`\`

puedes escribir:

\`\`\`python
resultado = [x * 2 for x in secuencia]
\`\`\`

También puedes filtrar agregando una condición al final:

\`\`\`python
pares = [x for x in secuencia if x % 2 == 0]
\`\`\``,
    ejemploMinimo: `cuadrados = [x**2 for x in range(5)]
print(cuadrados)`,
    ejemploAplicado: `precios = [10, 25, 8, 40, 15]
precios_con_descuento = [p * 0.9 for p in precios if p > 10]
print(precios_con_descuento)`,
    errorFrecuente: {
      codigo: `numeros = [1, 2, 3]
dobles = [x * 2 for x in numeros if]`,
      explicacion:
        'Falta la condición después del `if`, lo que produce un `SyntaxError`. La estructura siempre es `[expresion for item in secuencia if condicion]`; si no necesitas filtrar, omite el `if` completo.',
    },
    practicaGuiada: {
      id: 'm2-l4-practica',
      enunciado: 'Crea una lista `triples` que contenga el triple de cada número en `[1, 2, 3]` usando comprensión de listas, e imprímela.',
      codigoInicial: `numeros = [1, 2, 3]\ntriples = []\nprint(triples)`,
      solucion: `numeros = [1, 2, 3]\ntriples = [n * 3 for n in numeros]\nprint(triples)`,
      pistas: ['La sintaxis es `[expresion for item in lista]`.', 'La expresión aquí es `n * 3`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '[3, 6, 9]'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es [3, 6, 9].' }
      },
    },
    reto: {
      id: 'm2-l4-reto',
      enunciado:
        'Dada `edades = [15, 22, 17, 30, 12, 19]`, crea con comprensión de listas una lista `mayores` con solo las edades mayores o iguales a 18, e imprímela.',
      codigoInicial: `edades = [15, 22, 17, 30, 12, 19]\nmayores = []\nprint(mayores)`,
      solucion: `edades = [15, 22, 17, 30, 12, 19]\nmayores = [e for e in edades if e >= 18]\nprint(mayores)`,
      pistas: ['Usa la forma `[item for item in lista if condicion]`.', 'La condición es `e >= 18`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '[22, 30, 19]'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es [22, 30, 19].' }
      },
    },
    verificacion: [
      {
        id: 'm2-l4-q1',
        pregunta: '¿Cuál es la forma correcta de una comprensión de listas con filtro?',
        opciones: [
          '[x for x in lista where x > 0]',
          '[x for x in lista if x > 0]',
          '[if x > 0 for x in lista]',
          '[x in lista if x > 0]',
        ],
        respuestaCorrecta: 1,
        explicacion: 'La sintaxis correcta es `[expresion for item in secuencia if condicion]`.',
      },
    ],
    resumen: [
      'Las comprensiones de listas condensan un for (y opcionalmente un if) en una sola línea.',
      'Son el estilo idiomático de Python para transformar/filtrar colecciones.',
      'Forma general: `[expresion for item in secuencia if condicion]`.',
    ],
    proximoPaso: 'En el siguiente módulo profundizamos en las estructuras de datos: listas, tuplas, diccionarios y conjuntos.',
    conceptos: ['comprension-listas'],
  },
]
