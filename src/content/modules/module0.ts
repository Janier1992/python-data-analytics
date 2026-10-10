import type { Lesson } from '../../types'

export const module0Lessons: Lesson[] = [
  {
    id: 'm0-l1',
    moduloId: 'modulo-0',
    titulo: '¿Qué es Python y para qué sirve en datos?',
    objetivo:
      'Entender qué es Python, por qué es el lenguaje más usado en analítica de datos y ejecutar tu primera línea de código.',
    porQueImporta:
      'Casi todo lo que vas a construir en ciencia de datos (limpieza, análisis, visualización, machine learning) se escribe en Python. Antes de tocar datos reales necesitas saber ejecutar código y leer lo que Python te devuelve.',
    concepto: `Python es un lenguaje de programación **interpretado**, es decir, el código se ejecuta línea por línea sin necesidad de "compilarlo" antes.

En esta aplicación vas a escribir Python y ejecutarlo directamente en tu navegador (no necesitas instalar nada). El flujo siempre es el mismo:

1. Escribes código en el editor.
2. Lo ejecutas.
3. Lees la salida (lo que se imprime con \`print()\`) o el error.

La función \`print()\` es tu herramienta más importante al aprender: te permite "ver" lo que está pasando dentro de tu programa.`,
    ejemploMinimo: `print("Hola, ciencia de datos")`,
    ejemploAplicado: `# Así se vería un primer vistazo a datos de ventas
ventas = [120, 340, 560, 80]
print("Ventas registradas:", ventas)
print("Total de ventas:", sum(ventas))`,
    errorFrecuente: {
      codigo: `print("Hola)`,
      explicacion:
        'Falta la comilla de cierre. Python no puede saber dónde termina el texto, así que lanza un `SyntaxError`. Siempre que abras una comilla, un paréntesis o un corchete, revisa que lo hayas cerrado.',
    },
    practicaGuiada: {
      id: 'm0-l1-practica',
      enunciado:
        'Completa el código para que imprima exactamente: `Analizando datos con Python`. Modifica el texto dentro de `print()`.',
      codigoInicial: `print("ESCRIBE_AQUI")`,
      solucion: `print("Analizando datos con Python")`,
      pistas: [
        'Recuerda que el texto debe ir entre comillas, igual que en el ejemplo mínimo.',
        'El texto debe coincidir exactamente, incluyendo mayúsculas y espacios: Analizando datos con Python',
      ],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Analizando datos con Python'
        return {
          ok,
          mensaje: ok
            ? 'Perfecto, ejecutaste tu primera instrucción de Python.'
            : 'Aún no coincide. Revisa el texto exacto que debe imprimirse.',
        }
      },
    },
    reto: {
      id: 'm0-l1-reto',
      enunciado:
        'Crea una variable llamada `nombre` con tu nombre (texto) y una variable `edad` con tu edad (número). Luego imprime: `Hola, me llamo <nombre> y tengo <edad> años` usando una sola instrucción `print()` con comas.',
      codigoInicial: `nombre = ""\nedad = 0\nprint("Hola, me llamo", nombre, "y tengo", edad, "años")`,
      solucion: `nombre = "Ana"\nedad = 28\nprint("Hola, me llamo", nombre, "y tengo", edad, "años")`,
      pistas: [
        'Asigna un valor de texto a `nombre` usando comillas.',
        'Asigna un número entero a `edad`, sin comillas.',
        '`print()` puede recibir varios valores separados por comas; los separa automáticamente con espacios.',
      ],
      validar: (stdout) => {
        const ok = /^Hola, me llamo .+ y tengo \d+ años$/.test(stdout.trim())
        return {
          ok,
          mensaje: ok
            ? 'Exacto. Ya combinas texto y variables en un solo mensaje.'
            : 'Revisa el formato: debe decir "Hola, me llamo <nombre> y tengo <edad> años".',
        }
      },
    },
    verificacion: [
      {
        id: 'm0-l1-q1',
        pregunta: '¿Qué función se usa para mostrar un resultado en pantalla?',
        opciones: ['show()', 'print()', 'display()', 'echo()'],
        respuestaCorrecta: 1,
        explicacion: '`print()` es la función estándar de Python para mostrar salida en consola.',
      },
      {
        id: 'm0-l1-q2',
        pregunta: '¿Por qué Python es muy usado en ciencia de datos?',
        opciones: [
          'Porque es el único lenguaje que existe',
          'Porque tiene una sintaxis simple y un ecosistema maduro de librerías (NumPy, pandas, scikit-learn, etc.)',
          'Porque solo funciona en la nube',
          'Porque no permite usar funciones',
        ],
        respuestaCorrecta: 1,
        explicacion:
          'Python combina sintaxis legible con librerías especializadas en datos y machine learning, lo que lo volvió el estándar de la industria.',
      },
    ],
    resumen: [
      'Python se ejecuta línea por línea.',
      '`print()` muestra resultados en pantalla.',
      'Las variables guardan valores (texto, números, etc.) para reutilizarlos.',
      'Un `SyntaxError` casi siempre es una comilla, paréntesis o corchete sin cerrar.',
    ],
    proximoPaso:
      'Ahora que ejecutaste tus primeras líneas, vamos a ver cómo se organiza un entorno de trabajo real (notebooks vs scripts).',
    conceptos: ['python-basico', 'print', 'variables'],
  },
  {
    id: 'm0-l2',
    moduloId: 'modulo-0',
    titulo: 'Entornos de trabajo: notebooks vs scripts',
    objetivo:
      'Distinguir cuándo usar un notebook (Jupyter) y cuándo un script `.py`, y entender la estructura mínima de un proyecto de datos.',
    porQueImporta:
      'En la práctica profesional vas a explorar datos en notebooks y luego "productivizar" ese análisis en scripts. Confundir ambos contextos es un error común de quienes empiezan.',
    concepto: `Existen dos formas principales de escribir Python para datos:

- **Notebooks (Jupyter/JupyterLab)**: el código se ejecuta en celdas independientes. Ideal para explorar datos, probar ideas y visualizar resultados paso a paso.
- **Scripts (\`.py\`)**: archivos de código que se ejecutan de principio a fin. Ideales para automatizar procesos, producción y reproducibilidad.

En esta aplicación simulamos ese flujo: cada bloque de código que ejecutas es como una "celda" de notebook, pensada para que explores y recibas feedback inmediato.`,
    ejemploMinimo: `# En un notebook normalmente separarías esto en celdas:
x = 10
y = 20
print(x + y)`,
    ejemploAplicado: `# Un script típico de análisis empieza así:
import pandas as pd  # (lo usaremos más adelante)

datos = {"producto": ["A", "B", "C"], "ventas": [100, 200, 150]}
print("Estructura de datos de ejemplo:", datos)`,
    errorFrecuente: {
      codigo: `print(x + y)\nx = 10\ny = 20`,
      explicacion:
        'Se usa `x` e `y` antes de definirlas. Python ejecuta de arriba hacia abajo, así que lanza `NameError: name \'x\' is not defined`. Siempre define una variable antes de usarla.',
    },
    practicaGuiada: {
      id: 'm0-l2-practica',
      enunciado:
        'Define primero las variables `precio` (10) y `cantidad` (3), y luego imprime el resultado de `precio * cantidad`.',
      codigoInicial: `print(precio * cantidad)\nprecio = 10\ncantidad = 3`,
      solucion: `precio = 10\ncantidad = 3\nprint(precio * cantidad)`,
      pistas: [
        'El orden importa: Python lee de arriba hacia abajo.',
        'Mueve las asignaciones de `precio` y `cantidad` antes del `print()`.',
      ],
      validar: (stdout) => {
        const ok = stdout.trim() === '30'
        return { ok, mensaje: ok ? 'Bien: 10 x 3 = 30.' : 'Revisa el orden de las instrucciones.' }
      },
    },
    reto: {
      id: 'm0-l2-reto',
      enunciado:
        'Simula una pequeña "celda de exploración": crea una variable `productos` con una lista de 3 nombres de productos (texto) e imprime cuántos productos hay usando `len()`.',
      codigoInicial: `productos = []\nprint(len(productos))`,
      solucion: `productos = ["Teclado", "Mouse", "Monitor"]\nprint(len(productos))`,
      pistas: [
        'Una lista se escribe entre corchetes: `["a", "b"]`.',
        '`len()` devuelve cuántos elementos tiene una lista.',
      ],
      validar: (stdout) => {
        const ok = stdout.trim() === '3'
        return { ok, mensaje: ok ? 'Correcto, tu lista tiene 3 productos.' : 'Tu lista debe tener exactamente 3 elementos.' }
      },
    },
    verificacion: [
      {
        id: 'm0-l2-q1',
        pregunta: '¿Cuál es la ventaja principal de un notebook frente a un script?',
        opciones: [
          'Ejecuta código más rápido',
          'Permite ejecutar y explorar en celdas independientes, ideal para exploración de datos',
          'Es la única forma de usar pandas',
          'No permite errores',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Los notebooks están pensados para exploración iterativa, no para ser más rápidos.',
      },
    ],
    resumen: [
      'Los notebooks son ideales para explorar; los scripts, para automatizar y producir.',
      'Python ejecuta de arriba hacia abajo: una variable debe existir antes de usarse.',
      '`NameError` indica que usaste algo que no habías definido todavía.',
    ],
    proximoPaso: 'Con el entorno claro, en el siguiente módulo construimos los fundamentos: variables, tipos de datos y operadores.',
    conceptos: ['notebooks-vs-scripts', 'orden-ejecucion'],
  },
]
