import type { Lesson } from '../../types'

export const module5Lessons: Lesson[] = [
  {
    id: 'm5-l1',
    moduloId: 'modulo-5',
    titulo: 'Manejo de excepciones: try/except',
    objetivo: 'Capturar y manejar errores de forma controlada con try/except/finally, sin que el programa se detenga.',
    porQueImporta:
      'Cuando proceses datos reales, habrá valores inesperados (texto donde esperabas un número, archivos faltantes). Un programa profesional anticipa esos casos en vez de romperse.',
    concepto: `\`\`\`python
try:
    # código que puede fallar
except TipoDeError as e:
    # qué hacer si falla
finally:
    # se ejecuta siempre, falle o no
\`\`\`

Es buena práctica capturar el tipo de error **específico** (\`ValueError\`, \`ZeroDivisionError\`, \`KeyError\`) en vez de un \`except\` genérico, para no ocultar errores inesperados.`,
    ejemploMinimo: `try:
    resultado = 10 / 0
except ZeroDivisionError:
    print("No se puede dividir entre cero")`,
    ejemploAplicado: `datos = ["10", "25", "abc", "40"]
validos = []
for valor in datos:
    try:
        validos.append(int(valor))
    except ValueError:
        print(f"'{valor}' no es un número válido, se omite")

print("Valores válidos:", validos)`,
    errorFrecuente: {
      codigo: `try:
    edad = int("veinte")
except:
    print("Error")`,
      explicacion:
        'Usar `except:` sin especificar el tipo captura **cualquier** error, incluso los que no anticipaste, dificultando la depuración. Es mejor escribir `except ValueError:` para capturar justo el error esperado al convertir texto no numérico.',
    },
    practicaGuiada: {
      id: 'm5-l1-practica',
      enunciado:
        'Completa el bloque try/except para que, al intentar convertir `"hola"` a entero, se capture el `ValueError` e imprima "No es un número".',
      codigoInicial: `try:\n    numero = int("hola")\nexcept ValueError:\n    print("ESCRIBE_AQUI")`,
      solucion: `try:\n    numero = int("hola")\nexcept ValueError:\n    print("No es un número")`,
      pistas: ['Reemplaza "ESCRIBE_AQUI" por el texto exacto solicitado.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'No es un número'
        return { ok, mensaje: ok ? 'Correcto.' : 'Debe imprimir "No es un número".' }
      },
    },
    reto: {
      id: 'm5-l1-reto',
      enunciado:
        'Escribe una función `dividir_seguro(a, b)` que devuelva `a / b`, pero si `b` es 0, capture `ZeroDivisionError` y devuelva `None`. Imprime `dividir_seguro(10, 0)`.',
      codigoInicial: `def dividir_seguro(a, b):\n    return a / b\n\nprint(dividir_seguro(10, 0))`,
      solucion: `def dividir_seguro(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\nprint(dividir_seguro(10, 0))`,
      pistas: ['Envuelve el `return a / b` en un try.', 'En el except, devuelve `None`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'None'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es None.' }
      },
    },
    verificacion: [
      {
        id: 'm5-l1-q1',
        pregunta: '¿Por qué es mejor usar `except ValueError:` en vez de `except:` a secas?',
        opciones: [
          'Porque except: no existe en Python',
          'Porque except: es más lento',
          'Porque capturar el tipo específico evita ocultar errores inesperados',
          'No hay diferencia',
        ],
        respuestaCorrecta: 2,
        explicacion: 'Capturar un tipo específico deja que otros errores no previstos sigan visibles, lo cual facilita detectarlos y corregirlos.',
      },
    ],
    resumen: [
      '`try/except` evita que un error detenga todo el programa.',
      'Captura tipos de error específicos (`ValueError`, `KeyError`, `ZeroDivisionError`) en vez de genéricos.',
      '`finally` se ejecuta siempre, haya habido error o no.',
    ],
    proximoPaso: 'Ahora veremos cómo leer y escribir archivos, y cómo manejar rutas con pathlib.',
    conceptos: ['excepciones', 'try-except'],
  },
  {
    id: 'm5-l2',
    moduloId: 'modulo-5',
    titulo: 'Archivos y pathlib',
    objetivo: 'Leer y escribir archivos de texto usando with/open, y manejar rutas con pathlib.',
    porQueImporta:
      'Antes de usar pandas para leer CSV o Excel, es importante entender cómo Python abre, lee y cierra archivos de forma segura.',
    concepto: `\`\`\`python
with open("datos.txt", "w") as f:
    f.write("Hola\\n")

with open("datos.txt", "r") as f:
    contenido = f.read()
\`\`\`

El bloque \`with\` cierra el archivo automáticamente al terminar, incluso si ocurre un error. \`pathlib.Path\` es la forma moderna de manejar rutas de archivos de forma independiente del sistema operativo:

\`\`\`python
from pathlib import Path
ruta = Path("datos") / "ventas.csv"
\`\`\``,
    ejemploMinimo: `with open("saludo.txt", "w") as f:
    f.write("Hola, archivo")

with open("saludo.txt", "r") as f:
    print(f.read())`,
    ejemploAplicado: `from pathlib import Path

ruta = Path("reporte.txt")
ruta.write_text("Ventas del mes: 1500")
print(ruta.read_text())
print("¿Existe el archivo?", ruta.exists())`,
    errorFrecuente: {
      codigo: `f = open("datos.txt", "r")
contenido = f.read()
print(contenido)`,
      explicacion:
        'Si el archivo "datos.txt" no existe, se lanza `FileNotFoundError`. Además, al abrir sin `with`, si ocurre un error el archivo queda sin cerrarse. Siempre usa `with open(...) as f:` para manejo seguro de archivos.',
    },
    practicaGuiada: {
      id: 'm5-l2-practica',
      enunciado: 'Usa `with open(...)` para escribir "Reporte generado" en "nota.txt", luego ábrelo de nuevo y imprime su contenido.',
      codigoInicial: `with open("nota.txt", "w") as f:\n    f.write("ESCRIBE_AQUI")\n\nwith open("nota.txt", "r") as f:\n    print(f.read())`,
      solucion: `with open("nota.txt", "w") as f:\n    f.write("Reporte generado")\n\nwith open("nota.txt", "r") as f:\n    print(f.read())`,
      pistas: ['Reemplaza "ESCRIBE_AQUI" por el texto exacto: Reporte generado.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Reporte generado'
        return { ok, mensaje: ok ? 'Correcto.' : 'Debe imprimir "Reporte generado".' }
      },
    },
    reto: {
      id: 'm5-l2-reto',
      enunciado:
        'Usa `pathlib.Path` para crear un archivo "config.txt" con el texto "modo=produccion" usando `.write_text()`, y luego imprime si `.exists()` usando `print()`.',
      codigoInicial: `from pathlib import Path\n\nruta = Path("config.txt")\n# escribe el texto y luego imprime si existe`,
      solucion: `from pathlib import Path\n\nruta = Path("config.txt")\nruta.write_text("modo=produccion")\nprint(ruta.exists())`,
      pistas: ['`.write_text("texto")` escribe directamente sin necesitar `with open`.', '`.exists()` devuelve True/False.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'True'
        return { ok, mensaje: ok ? 'Correcto.' : 'Debe imprimir True tras crear el archivo.' }
      },
    },
    verificacion: [
      {
        id: 'm5-l2-q1',
        pregunta: '¿Qué ventaja tiene usar `with open(...) as f:` en vez de `open()` sin with?',
        opciones: [
          'Es más rápido para archivos grandes',
          'Cierra el archivo automáticamente, incluso si ocurre un error',
          'Permite leer archivos binarios únicamente',
          'No hay ninguna diferencia',
        ],
        respuestaCorrecta: 1,
        explicacion: 'El bloque `with` garantiza que el archivo se cierre correctamente, incluso si hay una excepción dentro del bloque.',
      },
    ],
    resumen: [
      '`with open(archivo, modo) as f:` es la forma segura de trabajar con archivos.',
      '`pathlib.Path` ofrece una API moderna para rutas: `.write_text()`, `.read_text()`, `.exists()`.',
      'Acceder a un archivo que no existe lanza `FileNotFoundError`.',
    ],
    proximoPaso: 'Veremos cómo trabajar con los formatos de datos más comunes: JSON y CSV.',
    conceptos: ['archivos', 'pathlib'],
  },
  {
    id: 'm5-l3',
    moduloId: 'modulo-5',
    titulo: 'JSON y CSV',
    objetivo: 'Leer y escribir datos en formato JSON y CSV, los dos formatos más comunes al intercambiar datos.',
    porQueImporta:
      'Las APIs devuelven JSON; muchos datasets vienen en CSV. Saber convertir entre estos formatos y estructuras de Python es una habilidad diaria en analítica de datos.',
    concepto: `**JSON** (muy parecido a un diccionario de Python):

\`\`\`python
import json
texto = json.dumps({"nombre": "Ana", "edad": 28})  # dict -> texto JSON
datos = json.loads(texto)                           # texto JSON -> dict
\`\`\`

**CSV** (filas separadas por comas):

\`\`\`python
import csv
import io

texto_csv = "nombre,edad\\nAna,28\\nLuis,35"
lector = csv.DictReader(io.StringIO(texto_csv))
for fila in lector:
    print(fila)  # cada fila es un diccionario
\`\`\``,
    ejemploMinimo: `import json

persona = {"nombre": "Ana", "edad": 28}
texto = json.dumps(persona)
print(texto)
print(json.loads(texto))`,
    ejemploAplicado: `import csv
import io

texto_csv = "producto,precio\\nMouse,15\\nTeclado,45"
lector = csv.DictReader(io.StringIO(texto_csv))

total = 0
for fila in lector:
    total += float(fila["precio"])

print("Total:", total)`,
    errorFrecuente: {
      codigo: `import json
datos = json.loads({"nombre": "Ana"})`,
      explicacion:
        '`json.loads()` espera un **string** con formato JSON, no un diccionario de Python directamente: lanza `TypeError`. Para convertir un diccionario a texto JSON se usa `json.dumps()`, y `json.loads()` es para el camino inverso (texto a diccionario).',
    },
    practicaGuiada: {
      id: 'm5-l3-practica',
      enunciado:
        'Dado el diccionario `producto = {"nombre": "Mouse", "precio": 15}`, conviértelo a texto JSON con `json.dumps()` e imprímelo.',
      codigoInicial: `import json\nproducto = {"nombre": "Mouse", "precio": 15}\nprint(producto)`,
      solucion: `import json\nproducto = {"nombre": "Mouse", "precio": 15}\nprint(json.dumps(producto))`,
      pistas: ['Usa `json.dumps(producto)` dentro del print.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '{"nombre": "Mouse", "precio": 15}'
        return { ok, mensaje: ok ? 'Correcto.' : 'Debe imprimir el JSON: {"nombre": "Mouse", "precio": 15}' }
      },
    },
    reto: {
      id: 'm5-l3-reto',
      enunciado:
        'Dado `texto_csv = "nombre,ventas\\nAna,100\\nLuis,200\\nEva,150"`, usa `csv.DictReader` para sumar la columna "ventas" de todas las filas e imprime el total (como entero).',
      codigoInicial: `import csv\nimport io\n\ntexto_csv = "nombre,ventas\\nAna,100\\nLuis,200\\nEva,150"\n# usa DictReader para sumar la columna ventas`,
      solucion: `import csv\nimport io\n\ntexto_csv = "nombre,ventas\\nAna,100\\nLuis,200\\nEva,150"\nlector = csv.DictReader(io.StringIO(texto_csv))\ntotal = 0\nfor fila in lector:\n    total += int(fila["ventas"])\nprint(total)`,
      pistas: ['`csv.DictReader(io.StringIO(texto_csv))` convierte cada fila en un diccionario.', 'Convierte `fila["ventas"]` a `int` antes de sumar.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '450'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 450.' }
      },
    },
    verificacion: [
      {
        id: 'm5-l3-q1',
        pregunta: '¿Qué función convierte un diccionario de Python en texto JSON?',
        opciones: ['json.loads()', 'json.dumps()', 'json.read()', 'json.parse()'],
        respuestaCorrecta: 1,
        explicacion: '`json.dumps()` convierte un objeto Python a una cadena JSON; `json.loads()` hace lo inverso.',
      },
    ],
    resumen: [
      '`json.dumps()` convierte Python → JSON; `json.loads()` convierte JSON → Python.',
      '`csv.DictReader` convierte cada fila de un CSV en un diccionario usando los encabezados como claves.',
      'Los valores leídos de CSV siempre llegan como texto: conviértelos a número si vas a operar con ellos.',
    ],
    proximoPaso: 'Veremos type hints y dataclasses para escribir código más claro y mantenible.',
    conceptos: ['json', 'csv'],
  },
  {
    id: 'm5-l4',
    moduloId: 'modulo-5',
    titulo: 'Type hints y dataclasses',
    objetivo: 'Documentar el tipo esperado de parámetros y variables, y modelar registros de forma clara con dataclasses.',
    porQueImporta:
      'Los type hints hacen que el código sea más fácil de entender y de revisar por herramientas automáticas; las dataclasses son una forma limpia de representar un registro, evitando diccionarios "mágicos" sin estructura clara.',
    concepto: `**Type hints** documentan (sin forzar en tiempo de ejecución) el tipo esperado:

\`\`\`python
def calcular_total(precio: float, cantidad: int) -> float:
    return precio * cantidad
\`\`\`

**Dataclasses** generan automáticamente un constructor y una representación legible para una clase que solo almacena datos:

\`\`\`python
from dataclasses import dataclass

@dataclass
class Producto:
    nombre: str
    precio: float
    stock: int = 0
\`\`\``,
    ejemploMinimo: `def saludar(nombre: str) -> str:
    return f"Hola, {nombre}"

print(saludar("Ana"))`,
    ejemploAplicado: `from dataclasses import dataclass

@dataclass
class Cliente:
    nombre: str
    compras: int = 0

c = Cliente(nombre="Ana", compras=5)
print(c)
print(c.nombre, c.compras)`,
    errorFrecuente: {
      codigo: `from dataclasses import dataclass

@dataclass
class Producto:
    nombre: str
    precio: float = 0
    stock: int`,
      explicacion:
        'Igual que en funciones, un campo sin valor por defecto (`stock`) no puede ir después de uno que sí lo tiene (`precio = 0`): lanza `TypeError: non-default argument \'stock\' follows default argument`. Los campos con valor por defecto van siempre al final.',
    },
    practicaGuiada: {
      id: 'm5-l4-practica',
      enunciado:
        'Completa la función `area_rectangulo(base: float, altura: float) -> float` para que devuelva `base * altura`. Imprime `area_rectangulo(4, 5)`.',
      codigoInicial: `def area_rectangulo(base: float, altura: float) -> float:\n    return 0\n\nprint(area_rectangulo(4, 5))`,
      solucion: `def area_rectangulo(base: float, altura: float) -> float:\n    return base * altura\n\nprint(area_rectangulo(4, 5))`,
      pistas: ['El cuerpo debe devolver `base * altura`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '20'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 20.' }
      },
    },
    reto: {
      id: 'm5-l4-reto',
      enunciado:
        'Define una dataclass `Empleado` con campos `nombre: str` y `salario: float`. Crea una instancia con nombre "Sara" y salario 2500, e imprime `empleado.salario`.',
      codigoInicial: `from dataclasses import dataclass\n\n# define la dataclass Empleado aquí\n\nempleado = None\nprint(empleado)`,
      solucion: `from dataclasses import dataclass\n\n@dataclass\nclass Empleado:\n    nombre: str\n    salario: float\n\nempleado = Empleado(nombre="Sara", salario=2500)\nprint(empleado.salario)`,
      pistas: ['Usa el decorador `@dataclass` antes de `class Empleado:`.', 'Accede al campo con `empleado.salario`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2500'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 2500.' }
      },
    },
    verificacion: [
      {
        id: 'm5-l4-q1',
        pregunta: '¿Los type hints impiden pasar un tipo distinto al declarado?',
        opciones: [
          'Sí, Python lanza un error automáticamente',
          'No, son solo documentación; Python no los valida en tiempo de ejecución',
          'Solo en Python 2',
          'Solo dentro de dataclasses',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Los type hints son informativos; herramientas externas (como mypy) pueden validarlos, pero Python no lo hace por sí solo en tiempo de ejecución.',
      },
    ],
    resumen: [
      'Los type hints (`param: tipo`, `-> tipo`) documentan el tipo esperado sin forzarlo en tiempo de ejecución.',
      '`@dataclass` genera automáticamente constructor y representación legible para clases de datos.',
      'Los campos con valor por defecto van siempre al final, igual que en funciones.',
    ],
    proximoPaso: 'Cerramos el módulo con buenas prácticas: código limpio (PEP 8), debugging y testing básico.',
    conceptos: ['type-hints', 'dataclasses'],
  },
  {
    id: 'm5-l5',
    moduloId: 'modulo-5',
    titulo: 'Código limpio, debugging y testing básico',
    objetivo: 'Aplicar convenciones de PEP 8, depurar código con una metodología clara y escribir pruebas simples con assert.',
    porQueImporta:
      'Un analista de datos profesional entrega código que otros pueden leer, depurar y confiar en que funciona. Esto diferencia un script "que funcionó una vez" de un proceso reproducible.',
    concepto: `**PEP 8** (convenciones de estilo): nombres de variables y funciones en \`snake_case\`, 4 espacios de indentación, nombres descriptivos (\`total_ventas\` mejor que \`tv\`).

**Debugging**: lee el traceback de abajo hacia arriba, identifica la línea exacta del error, y usa \`print()\` estratégicos para inspeccionar valores intermedios cuando no es obvio qué está pasando.

**Testing básico con \`assert\`**: verifica que una función se comporta como esperas.

\`\`\`python
def sumar(a, b):
    return a + b

assert sumar(2, 3) == 5, "sumar(2,3) debería ser 5"
\`\`\`

Si la condición es falsa, \`assert\` lanza un \`AssertionError\` con el mensaje indicado.`,
    ejemploMinimo: `def es_positivo(n):
    return n > 0

assert es_positivo(5) == True
assert es_positivo(-3) == False
print("Todas las pruebas pasaron")`,
    ejemploAplicado: `def calcular_descuento(precio, porcentaje):
    return precio - (precio * porcentaje / 100)

# Pequeña batería de pruebas antes de confiar en la función
assert calcular_descuento(100, 10) == 90, "Descuento del 10% sobre 100 debería ser 90"
assert calcular_descuento(200, 50) == 100, "Descuento del 50% sobre 200 debería ser 100"
print("calcular_descuento pasó todas las pruebas")`,
    errorFrecuente: {
      codigo: `def calcular_iva(precio):
    return precio * 0.19

assert calcular_iva(100) == 20, "El IVA de 100 debería ser 20"`,
      explicacion:
        'El cálculo real da 19.0, no 20, así que el `assert` falla con `AssertionError: El IVA de 100 debería ser 20`. Esto es justamente lo valioso del testing: revela que la expectativa (o el código) estaba equivocada antes de que el error llegue a producción.',
    },
    practicaGuiada: {
      id: 'm5-l5-practica',
      enunciado:
        'Dada la función `doble(n)` que devuelve `n * 2`, completa un `assert` que verifique que `doble(4)` es igual a 8, y al final imprime "OK" si no falló nada.',
      codigoInicial: `def doble(n):\n    return n * 2\n\nassert doble(4) == 0\nprint("OK")`,
      solucion: `def doble(n):\n    return n * 2\n\nassert doble(4) == 8\nprint("OK")`,
      pistas: ['El valor correcto de `doble(4)` es 8.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'OK'
        return { ok, mensaje: ok ? 'Correcto: la prueba pasó.' : 'Debe imprimir "OK" (ajusta el valor esperado en el assert).' }
      },
    },
    reto: {
      id: 'm5-l5-reto',
      enunciado:
        'Escribe una función `promedio(lista)` que devuelva el promedio de una lista de números. Agrega al menos dos `assert` que la validen (por ejemplo con `[2, 4, 6]` y con `[10]`), e imprime "Todas las pruebas pasaron" al final.',
      codigoInicial: `def promedio(lista):\n    pass\n\n# agrega tus asserts aquí\n# y al final imprime "Todas las pruebas pasaron"`,
      solucion: `def promedio(lista):\n    return sum(lista) / len(lista)\n\nassert promedio([2, 4, 6]) == 4\nassert promedio([10]) == 10\nprint("Todas las pruebas pasaron")`,
      pistas: ['`promedio` debe devolver `sum(lista) / len(lista)`.', 'Verifica con casos simples donde conozcas el resultado exacto.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Todas las pruebas pasaron'
        return { ok, mensaje: ok ? 'Correcto: tu función pasó sus propias pruebas.' : 'Debe imprimir "Todas las pruebas pasaron" sin que falle ningún assert.' }
      },
    },
    verificacion: [
      {
        id: 'm5-l5-q1',
        pregunta: '¿Qué ocurre si la condición de un `assert` es falsa?',
        opciones: ['No pasa nada', 'Se lanza un AssertionError', 'El programa se pausa esperando input', 'Se ignora silenciosamente'],
        respuestaCorrecta: 1,
        explicacion: 'Un `assert` con condición falsa lanza `AssertionError`, deteniendo la ejecución y mostrando el mensaje indicado.',
      },
      {
        id: 'm5-l5-q2',
        pregunta: '¿Qué convención de nombres recomienda PEP 8 para variables y funciones?',
        opciones: ['camelCase', 'PascalCase', 'snake_case', 'kebab-case'],
        respuestaCorrecta: 2,
        explicacion: 'PEP 8 recomienda `snake_case` (minúsculas con guiones bajos) para variables y funciones en Python.',
      },
    ],
    resumen: [
      'PEP 8 recomienda `snake_case`, nombres descriptivos y 4 espacios de indentación.',
      'Depurar es más eficiente leyendo el traceback de abajo hacia arriba e inspeccionando valores con print().',
      '`assert condicion, mensaje` es la forma más simple de probar que tu código hace lo que crees que hace.',
    ],
    proximoPaso:
      'Con los fundamentos de Python profesional listos, el siguiente módulo te introduce a NumPy y pandas: las herramientas centrales para trabajar con datos reales.',
    conceptos: ['pep8', 'debugging', 'testing-basico'],
  },
]
