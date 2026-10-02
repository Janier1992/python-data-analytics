import type { Lesson } from '../../types'

export const module4Lessons: Lesson[] = [
  {
    id: 'm4-l1',
    moduloId: 'modulo-4',
    titulo: 'Definir funciones y retornar valores',
    objetivo: 'Crear funciones con def, pasar parámetros y devolver resultados con return.',
    porQueImporta:
      'Las funciones evitan repetir código y son la forma de empaquetar lógica de análisis (por ejemplo, "calcular el promedio de ventas") para reutilizarla en cualquier parte de un proyecto.',
    concepto: `Una función se define con \`def\`:

\`\`\`python
def nombre_funcion(parametro1, parametro2):
    resultado = parametro1 + parametro2
    return resultado
\`\`\`

\`return\` entrega un valor y termina la ejecución de la función. Si una función no tiene \`return\`, devuelve \`None\` por defecto.`,
    ejemploMinimo: `def sumar(a, b):
    return a + b

print(sumar(3, 4))`,
    ejemploAplicado: `def calcular_promedio(valores):
    return sum(valores) / len(valores)

notas = [8, 7, 9, 6]
print("Promedio:", calcular_promedio(notas))`,
    errorFrecuente: {
      codigo: `def sumar(a, b):
    total = a + b

resultado = sumar(3, 4)
print(resultado + 1)`,
      explicacion:
        'La función no tiene `return`, así que devuelve `None` por defecto. Al intentar `None + 1` se lanza `TypeError: unsupported operand type(s) for +`. Siempre que necesites usar el resultado de una función, asegúrate de incluir `return`.',
    },
    practicaGuiada: {
      id: 'm4-l1-practica',
      enunciado: 'Completa la función `cuadrado(n)` para que devuelva `n` elevado al cuadrado, y luego imprime `cuadrado(5)`.',
      codigoInicial: `def cuadrado(n):\n    return 0\n\nprint(cuadrado(5))`,
      solucion: `def cuadrado(n):\n    return n ** 2\n\nprint(cuadrado(5))`,
      pistas: ['Usa el operador de potencia `**`: `n ** 2`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '25'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 25.' }
      },
    },
    reto: {
      id: 'm4-l1-reto',
      enunciado:
        'Escribe una función `es_mayor_de_edad(edad)` que devuelva `True` si `edad >= 18` y `False` en otro caso. Imprime el resultado para `edad = 16`.',
      codigoInicial: `def es_mayor_de_edad(edad):\n    pass\n\nprint(es_mayor_de_edad(16))`,
      solucion: `def es_mayor_de_edad(edad):\n    return edad >= 18\n\nprint(es_mayor_de_edad(16))`,
      pistas: ['Puedes devolver directamente el resultado de una comparación: `return edad >= 18`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'False'
        return { ok, mensaje: ok ? 'Correcto.' : 'Con edad = 16, el resultado esperado es False.' }
      },
    },
    verificacion: [
      {
        id: 'm4-l1-q1',
        pregunta: '¿Qué devuelve una función que no tiene una instrucción `return`?',
        opciones: ['0', '""', 'None', 'Un error siempre'],
        respuestaCorrecta: 2,
        explicacion: 'Si una función no ejecuta ningún `return`, Python devuelve `None` automáticamente.',
      },
    ],
    resumen: [
      '`def nombre(parametros):` define una función.',
      '`return` entrega un valor y termina la función.',
      'Sin `return`, una función devuelve `None`.',
    ],
    proximoPaso: 'Veremos parámetros por defecto, *args y **kwargs para funciones más flexibles.',
    conceptos: ['funciones', 'return'],
  },
  {
    id: 'm4-l2',
    moduloId: 'modulo-4',
    titulo: 'Parámetros por defecto, *args y **kwargs',
    objetivo: 'Escribir funciones flexibles con valores por defecto y número variable de argumentos.',
    porQueImporta:
      'Las funciones de librerías como pandas o scikit-learn usan masivamente parámetros por defecto y argumentos variables; entender el patrón te ayuda a leer su documentación con confianza.',
    concepto: `**Valor por defecto**: se usa si no se pasa ese argumento.

\`\`\`python
def saludar(nombre, saludo="Hola"):
    return f"{saludo}, {nombre}"
\`\`\`

**\`*args\`**: recibe cualquier cantidad de argumentos posicionales como tupla.
**\`**kwargs\`**: recibe cualquier cantidad de argumentos con nombre como diccionario.

\`\`\`python
def sumar_todos(*args):
    return sum(args)

sumar_todos(1, 2, 3, 4)  # 10
\`\`\``,
    ejemploMinimo: `def saludar(nombre, saludo="Hola"):
    return f"{saludo}, {nombre}"

print(saludar("Ana"))
print(saludar("Luis", "Buenas tardes"))`,
    ejemploAplicado: `def resumen_ventas(*montos):
    return {"total": sum(montos), "cantidad": len(montos), "promedio": sum(montos) / len(montos)}

resultado = resumen_ventas(100, 250, 300, 80)
print(resultado)`,
    errorFrecuente: {
      codigo: `def dividir(a, b=1, c):
    return a / b / c`,
      explicacion:
        'Un parámetro sin valor por defecto (`c`) no puede ir después de uno que sí lo tiene (`b=1`): lanza `SyntaxError: non-default argument follows default argument`. Los parámetros con valor por defecto siempre van al final.',
    },
    practicaGuiada: {
      id: 'm4-l2-practica',
      enunciado:
        'Completa la función `precio_final(precio, descuento=0)` que devuelva `precio - descuento`. Imprime `precio_final(100)` (sin descuento) y `precio_final(100, 20)`.',
      codigoInicial: `def precio_final(precio, descuento=0):\n    return 0\n\nprint(precio_final(100))\nprint(precio_final(100, 20))`,
      solucion: `def precio_final(precio, descuento=0):\n    return precio - descuento\n\nprint(precio_final(100))\nprint(precio_final(100, 20))`,
      pistas: ['El cuerpo debe devolver `precio - descuento`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '100\n80'
        return { ok, mensaje: ok ? 'Correcto.' : 'Se esperaba 100 y luego 80.' }
      },
    },
    reto: {
      id: 'm4-l2-reto',
      enunciado:
        'Escribe una función `total_compra(*precios)` que use `*args` para sumar cualquier cantidad de precios. Imprime `total_compra(10, 20, 30)`.',
      codigoInicial: `def total_compra():\n    pass\n\nprint(total_compra(10, 20, 30))`,
      solucion: `def total_compra(*precios):\n    return sum(precios)\n\nprint(total_compra(10, 20, 30))`,
      pistas: ['Define el parámetro como `*precios` para aceptar cualquier cantidad de argumentos.', '`sum()` suma todos los valores de una tupla o lista.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '60'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 60.' }
      },
    },
    verificacion: [
      {
        id: 'm4-l2-q1',
        pregunta: '¿Qué tipo de dato recibe un parámetro definido como `*args` dentro de la función?',
        opciones: ['Un diccionario', 'Una tupla', 'Una lista', 'Un set'],
        respuestaCorrecta: 1,
        explicacion: '`*args` agrupa los argumentos posicionales extra en una tupla.',
      },
    ],
    resumen: [
      'Los parámetros con valor por defecto van siempre al final de la definición.',
      '`*args` agrupa argumentos posicionales variables en una tupla.',
      '`**kwargs` agrupa argumentos con nombre variables en un diccionario.',
    ],
    proximoPaso: 'Veremos el alcance (scope) de variables y las funciones lambda, útiles para operaciones rápidas.',
    conceptos: ['parametros-por-defecto', 'args-kwargs'],
  },
  {
    id: 'm4-l3',
    moduloId: 'modulo-4',
    titulo: 'Alcance de variables y funciones lambda',
    objetivo: 'Entender qué variables son visibles dentro y fuera de una función, y escribir funciones lambda simples.',
    porQueImporta:
      'Entender el alcance evita bugs confusos ("¿por qué esta variable no cambió?"), y las lambdas se usan constantemente junto a pandas (por ejemplo, dentro de `.apply()`).',
    concepto: `Una variable creada **dentro** de una función es local: no existe fuera de ella. Una variable **global** sí es visible dentro, pero para modificarla desde dentro de una función necesitas la palabra clave \`global\` (poco recomendado; mejor usar \`return\`).

Una función \`lambda\` es una función anónima de una sola expresión:

\`\`\`python
cuadrado = lambda x: x ** 2
cuadrado(4)  # 16
\`\`\`

Son útiles para funciones cortas que se usan una sola vez, por ejemplo como argumento de otra función.`,
    ejemploMinimo: `doble = lambda x: x * 2
print(doble(5))`,
    ejemploAplicado: `precios = [10, 25, 8, 40]
ordenado_desc = sorted(precios, key=lambda p: -p)
print(ordenado_desc)`,
    errorFrecuente: {
      codigo: `def calcular():
    total = 100
    return total

print(total)`,
      explicacion:
        '`total` es una variable local dentro de `calcular()`: no existe fuera de la función. Usar `print(total)` afuera lanza `NameError: name \'total\' is not defined`. Si necesitas ese valor afuera, guárdalo: `total = calcular()`.',
    },
    practicaGuiada: {
      id: 'm4-l3-practica',
      enunciado: 'Crea una función lambda `es_par` que reciba un número y devuelva `True` si es par. Imprime `es_par(10)`.',
      codigoInicial: `es_par = lambda x: False\nprint(es_par(10))`,
      solucion: `es_par = lambda x: x % 2 == 0\nprint(es_par(10))`,
      pistas: ['Un número es par si `x % 2 == 0`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'True'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es True.' }
      },
    },
    reto: {
      id: 'm4-l3-reto',
      enunciado:
        'Dada `personas = [{"nombre": "Ana", "edad": 30}, {"nombre": "Luis", "edad": 22}, {"nombre": "Eva", "edad": 45}]`, usa `sorted()` con una lambda como `key` para ordenarlas por edad, e imprime la lista resultante.',
      codigoInicial: `personas = [{"nombre": "Ana", "edad": 30}, {"nombre": "Luis", "edad": 22}, {"nombre": "Eva", "edad": 45}]\nordenadas = personas\nprint(ordenadas)`,
      solucion: `personas = [{"nombre": "Ana", "edad": 30}, {"nombre": "Luis", "edad": 22}, {"nombre": "Eva", "edad": 45}]\nordenadas = sorted(personas, key=lambda p: p["edad"])\nprint(ordenadas)`,
      pistas: ['`sorted(lista, key=lambda item: item["edad"])` ordena según ese campo.'],
      validar: (stdout) => {
        const ok = stdout.includes("'Luis'") && stdout.indexOf("'Luis'") < stdout.indexOf("'Ana'") && stdout.indexOf("'Ana'") < stdout.indexOf("'Eva'")
        return { ok, mensaje: ok ? 'Correcto: quedó ordenado por edad ascendente (Luis, Ana, Eva).' : 'Debe quedar ordenado por edad: Luis, Ana, Eva.' }
      },
    },
    verificacion: [
      {
        id: 'm4-l3-q1',
        pregunta: '¿Una variable definida dentro de una función es visible fuera de ella?',
        opciones: ['Sí, siempre', 'No, es una variable local', 'Solo si es un número', 'Solo si se usa return en otra función'],
        respuestaCorrecta: 1,
        explicacion: 'Las variables definidas dentro de una función son locales a esa función y no existen fuera de ella.',
      },
    ],
    resumen: [
      'Las variables dentro de una función son locales por defecto.',
      'Una lambda es una función anónima de una sola expresión: `lambda parametros: expresion`.',
      'Las lambdas son muy usadas como argumento `key=` en `sorted()` o dentro de `.apply()` en pandas.',
    ],
    proximoPaso: 'Cerramos el módulo viendo cómo organizar el código en módulos e imports.',
    conceptos: ['alcance-variables', 'lambda'],
  },
  {
    id: 'm4-l4',
    moduloId: 'modulo-4',
    titulo: 'Módulos e imports',
    objetivo: 'Entender cómo importar módulos de la librería estándar y organizar funciones reutilizables.',
    porQueImporta:
      'Todo proyecto real de datos depende de importar librerías (`pandas`, `numpy`, `matplotlib`) y de organizar el propio código en módulos reutilizables.',
    concepto: `Para usar código de otro módulo:

\`\`\`python
import math
print(math.sqrt(16))

from math import sqrt
print(sqrt(16))

import math as m
print(m.sqrt(16))
\`\`\`

Cada forma tiene su uso: \`import modulo\` es explícito, \`from modulo import funcion\` es más corto, y \`import modulo as alias\` es el patrón estándar en ciencia de datos (como \`import pandas as pd\`).`,
    ejemploMinimo: `import math
print(math.sqrt(25))`,
    ejemploAplicado: `import statistics as stats

ventas = [120, 340, 560, 80, 200]
print("Promedio:", stats.mean(ventas))
print("Mediana:", stats.median(ventas))`,
    errorFrecuente: {
      codigo: `from math import sqrt
print(math.sqrt(9))`,
      explicacion:
        'Al usar `from math import sqrt`, solo se importa `sqrt` directamente (no el nombre `math`). Usar `math.sqrt(9)` lanza `NameError: name \'math\' is not defined`. Con ese import debe escribirse simplemente `sqrt(9)`.',
    },
    practicaGuiada: {
      id: 'm4-l4-practica',
      enunciado: 'Importa el módulo `math` y usa `math.floor(7.8)` para imprimir el resultado (redondeo hacia abajo).',
      codigoInicial: `# importa math aquí\nprint(0)`,
      solucion: `import math\nprint(math.floor(7.8))`,
      pistas: ['Agrega `import math` en la primera línea.', '`math.floor()` redondea hacia abajo al entero más cercano.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '7'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 7.' }
      },
    },
    reto: {
      id: 'm4-l4-reto',
      enunciado:
        'Usa el módulo `statistics` para calcular e imprimir la desviación estándar (`stdev`) de `datos = [10, 12, 23, 23, 16, 23, 21, 16]` importándolo con alias `stats`.',
      codigoInicial: `datos = [10, 12, 23, 23, 16, 23, 21, 16]\n# importa statistics como stats y calcula stdev`,
      solucion: `import statistics as stats\ndatos = [10, 12, 23, 23, 16, 23, 21, 16]\nprint(round(stats.stdev(datos), 2))`,
      pistas: ['`import statistics as stats`.', '`stats.stdev(datos)` calcula la desviación estándar muestral.'],
      validar: (stdout) => {
        const valor = parseFloat(stdout.trim())
        const ok = !Number.isNaN(valor) && Math.abs(valor - 5.24) < 0.1
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es aproximadamente 5.24.' }
      },
    },
    verificacion: [
      {
        id: 'm4-l4-q1',
        pregunta: '¿Qué patrón de import es el estándar en ciencia de datos para pandas?',
        opciones: ['from pandas import *', 'import pandas', 'import pandas as pd', 'pandas.import()'],
        respuestaCorrecta: 2,
        explicacion: '`import pandas as pd` es la convención universal en la comunidad de ciencia de datos.',
      },
    ],
    resumen: [
      '`import modulo`, `from modulo import algo` e `import modulo as alias` son las tres formas de importar.',
      'El alias (`as`) es el patrón estándar para librerías de datos (`pd`, `np`, `plt`).',
      'Organizar código en módulos facilita la reutilización en proyectos grandes.',
    ],
    proximoPaso: 'En el Módulo 5 veremos manejo de errores, archivos, JSON/CSV y buenas prácticas profesionales de Python.',
    conceptos: ['imports', 'modulos'],
  },
]
