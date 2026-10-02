import type { Lesson } from '../../types'

export const module3Lessons: Lesson[] = [
  {
    id: 'm3-l1',
    moduloId: 'modulo-3',
    titulo: 'Listas: indexación, slicing y métodos',
    objetivo: 'Dominar listas: acceder a elementos, cortar sublistas (slicing) y usar métodos comunes.',
    porQueImporta:
      'Las listas son la estructura más usada para representar colecciones de datos en Python antes de pasar a pandas. Saber indexarlas y recortarlas es la base para manipular filas y columnas más adelante.',
    concepto: `Una lista es una colección ordenada y modificable: \`numeros = [10, 20, 30, 40]\`.

- Indexación: \`numeros[0]\` (primer elemento), \`numeros[-1]\` (último elemento).
- Slicing: \`numeros[1:3]\` devuelve los elementos desde el índice 1 hasta el 2 (el límite superior no se incluye).
- Métodos comunes: \`.append(x)\` agrega al final, \`.remove(x)\` elimina el primer valor igual a x, \`.sort()\` ordena en el lugar, \`.pop()\` remueve y devuelve el último elemento.`,
    ejemploMinimo: `numeros = [10, 20, 30, 40, 50]
print(numeros[0], numeros[-1])
print(numeros[1:3])`,
    ejemploAplicado: `ventas_semana = [120, 95, 230, 180, 300, 90, 150]
ventas_findesemana = ventas_semana[-2:]
ventas_semana.sort()
print("Fin de semana:", ventas_findesemana)
print("Ordenadas:", ventas_semana)`,
    errorFrecuente: {
      codigo: `numeros = [10, 20, 30]
print(numeros[3])`,
      explicacion:
        'La lista tiene índices 0, 1 y 2 (3 elementos), así que `numeros[3]` no existe y lanza `IndexError: list index out of range`. Recuerda que el último índice válido es `len(lista) - 1`.',
    },
    practicaGuiada: {
      id: 'm3-l1-practica',
      enunciado: 'Dada `frutas = ["manzana", "pera", "uva", "kiwi"]`, imprime el segundo elemento (índice 1) y el último usando índice negativo.',
      codigoInicial: `frutas = ["manzana", "pera", "uva", "kiwi"]\nprint(frutas[0], frutas[0])`,
      solucion: `frutas = ["manzana", "pera", "uva", "kiwi"]\nprint(frutas[1], frutas[-1])`,
      pistas: ['El segundo elemento tiene índice 1.', 'El último elemento se accede con índice -1.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'pera kiwi'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es "pera kiwi".' }
      },
    },
    reto: {
      id: 'm3-l1-reto',
      enunciado:
        'Dada `precios = [50, 20, 80, 10, 60]`, ordénala de mayor a menor con `.sort(reverse=True)` e imprime la lista completa.',
      codigoInicial: `precios = [50, 20, 80, 10, 60]\n# ordena de mayor a menor e imprime`,
      solucion: `precios = [50, 20, 80, 10, 60]\nprecios.sort(reverse=True)\nprint(precios)`,
      pistas: ['`.sort(reverse=True)` ordena de mayor a menor.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '[80, 60, 50, 20, 10]'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es [80, 60, 50, 20, 10].' }
      },
    },
    verificacion: [
      {
        id: 'm3-l1-q1',
        pregunta: '¿Qué devuelve `[10, 20, 30, 40][1:3]`?',
        opciones: ['[10, 20]', '[20, 30]', '[20, 30, 40]', '[30, 40]'],
        respuestaCorrecta: 1,
        explicacion: 'El slicing `[1:3]` incluye los índices 1 y 2, es decir 20 y 30.',
      },
    ],
    resumen: [
      'Las listas se indexan desde 0; los índices negativos cuentan desde el final.',
      'El slicing `[a:b]` no incluye el índice b.',
      '`.append()`, `.remove()`, `.sort()` y `.pop()` son métodos esenciales de listas.',
    ],
    proximoPaso: 'Veremos tuplas (inmutables) y diccionarios (pares clave-valor), fundamentales para representar registros.',
    conceptos: ['listas', 'indexacion', 'slicing'],
  },
  {
    id: 'm3-l2',
    moduloId: 'modulo-3',
    titulo: 'Tuplas y diccionarios',
    objetivo: 'Usar tuplas para datos inmutables y diccionarios para representar registros clave-valor.',
    porQueImporta:
      'Un diccionario es la forma natural de representar un registro (por ejemplo, un cliente con nombre, edad y ciudad). Más adelante, cada fila de un DataFrame de pandas se parece mucho a esto.',
    concepto: `**Tupla**: colección ordenada e **inmutable** (no se puede modificar tras crearla). Se define con paréntesis: \`coordenada = (4.5, 10.2)\`.

**Diccionario**: colección de pares \`clave: valor\`, muy usado para representar un registro:

\`\`\`python
cliente = {"nombre": "Ana", "edad": 28, "ciudad": "Bogotá"}
print(cliente["nombre"])       # acceso por clave
cliente["activo"] = True       # agregar una clave nueva
\`\`\`

Usa \`.keys()\`, \`.values()\` y \`.items()\` para iterar sobre un diccionario.`,
    ejemploMinimo: `cliente = {"nombre": "Ana", "edad": 28}
print(cliente["nombre"])
print(cliente.get("ciudad", "No especificada"))`,
    ejemploAplicado: `producto = {"nombre": "Teclado", "precio": 45.0, "stock": 12}
for clave, valor in producto.items():
    print(f"{clave}: {valor}")`,
    errorFrecuente: {
      codigo: `cliente = {"nombre": "Ana"}
print(cliente["edad"])`,
      explicacion:
        'La clave `"edad"` no existe en el diccionario, así que lanza `KeyError: \'edad\'`. Para evitarlo de forma segura, usa `cliente.get("edad", valor_por_defecto)`.',
    },
    practicaGuiada: {
      id: 'm3-l2-practica',
      enunciado:
        'Crea un diccionario `libro` con las claves "titulo" ("Python Básico") y "paginas" (120). Imprime `libro["titulo"]`.',
      codigoInicial: `libro = {}\nprint(libro)`,
      solucion: `libro = {"titulo": "Python Básico", "paginas": 120}\nprint(libro["titulo"])`,
      pistas: ['Un diccionario se define con llaves: `{"clave": valor}`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Python Básico'
        return { ok, mensaje: ok ? 'Correcto.' : 'Debe imprimir "Python Básico".' }
      },
    },
    reto: {
      id: 'm3-l2-reto',
      enunciado:
        'Dado `inventario = {"lapiz": 50, "borrador": 20, "cuaderno": 15}`, usa `.get("marcador", 0)` para imprimir cuántos marcadores hay (sin que falle, aunque no exista esa clave).',
      codigoInicial: `inventario = {"lapiz": 50, "borrador": 20, "cuaderno": 15}\nprint(inventario["marcador"])`,
      solucion: `inventario = {"lapiz": 50, "borrador": 20, "cuaderno": 15}\nprint(inventario.get("marcador", 0))`,
      pistas: ['Reemplaza el acceso directo `["marcador"]` por `.get("marcador", 0)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0'
        return { ok, mensaje: ok ? 'Correcto: al no existir, devuelve el valor por defecto 0.' : 'El resultado esperado es 0.' }
      },
    },
    verificacion: [
      {
        id: 'm3-l2-q1',
        pregunta: '¿Qué diferencia principal tiene una tupla frente a una lista?',
        opciones: ['Una tupla no puede tener números', 'Una tupla es inmutable (no se puede modificar)', 'Una tupla solo acepta un elemento', 'No hay diferencia'],
        respuestaCorrecta: 1,
        explicacion: 'Las tuplas son inmutables: una vez creadas, no puedes agregar, quitar o cambiar sus elementos.',
      },
      {
        id: 'm3-l2-q2',
        pregunta: '¿Qué pasa si accedes a una clave inexistente con `diccionario["clave"]`?',
        opciones: ['Devuelve None', 'Devuelve 0', 'Lanza KeyError', 'Crea la clave automáticamente'],
        respuestaCorrecta: 2,
        explicacion: 'Acceder con corchetes a una clave que no existe lanza `KeyError`. Usa `.get()` para evitarlo.',
      },
    ],
    resumen: [
      'Las tuplas son colecciones ordenadas e inmutables.',
      'Los diccionarios almacenan pares clave-valor, ideales para representar registros.',
      '`.get(clave, valor_default)` accede de forma segura sin lanzar error.',
    ],
    proximoPaso: 'Veremos conjuntos (sets), útiles para eliminar duplicados y hacer operaciones de conjuntos.',
    conceptos: ['tuplas', 'diccionarios'],
  },
  {
    id: 'm3-l3',
    moduloId: 'modulo-3',
    titulo: 'Conjuntos (sets)',
    objetivo: 'Usar conjuntos para eliminar duplicados y realizar operaciones de unión/intersección.',
    porQueImporta:
      'Detectar valores únicos en una columna (por ejemplo, categorías distintas de productos) es una tarea diaria en limpieza de datos, y los sets la resuelven de forma directa y eficiente.',
    concepto: `Un \`set\` es una colección **no ordenada** de elementos **únicos**:

\`\`\`python
categorias = {"ropa", "hogar", "ropa", "tecnología"}
print(categorias)  # {"ropa", "hogar", "tecnología"} (sin duplicados)
\`\`\`

Operaciones comunes: \`a | b\` (unión), \`a & b\` (intersección), \`a - b\` (diferencia). Para convertir una lista con duplicados en valores únicos: \`set(lista)\`.`,
    ejemploMinimo: `numeros = [1, 2, 2, 3, 3, 3]
unicos = set(numeros)
print(unicos)`,
    ejemploAplicado: `clientes_2023 = {"Ana", "Luis", "Marta"}
clientes_2024 = {"Luis", "Carla", "Marta"}

print("Clientes en ambos años:", clientes_2023 & clientes_2024)
print("Clientes nuevos en 2024:", clientes_2024 - clientes_2023)`,
    errorFrecuente: {
      codigo: `numeros = [1, 2, 3]
print(numeros[0])
conjunto = set(numeros)
print(conjunto[0])`,
      explicacion:
        'Los sets no tienen orden ni índices, así que `conjunto[0]` lanza `TypeError: \'set\' object is not subscriptable`. Si necesitas acceder por posición, conviértelo primero a lista: `list(conjunto)[0]`.',
    },
    practicaGuiada: {
      id: 'm3-l3-practica',
      enunciado: 'Dada la lista `colores = ["rojo", "azul", "rojo", "verde", "azul"]`, crea un set `colores_unicos` y usa `len()` para imprimir cuántos colores distintos hay.',
      codigoInicial: `colores = ["rojo", "azul", "rojo", "verde", "azul"]\ncolores_unicos = colores\nprint(len(colores_unicos))`,
      solucion: `colores = ["rojo", "azul", "rojo", "verde", "azul"]\ncolores_unicos = set(colores)\nprint(len(colores_unicos))`,
      pistas: ['Usa `set(colores)` para quedarte solo con los valores únicos.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '3'
        return { ok, mensaje: ok ? 'Correcto: rojo, azul y verde son 3 colores distintos.' : 'El resultado esperado es 3.' }
      },
    },
    reto: {
      id: 'm3-l3-reto',
      enunciado:
        'Dados `set_a = {1, 2, 3, 4}` y `set_b = {3, 4, 5, 6}`, imprime la unión de ambos conjuntos usando `|`.',
      codigoInicial: `set_a = {1, 2, 3, 4}\nset_b = {3, 4, 5, 6}\nprint(set_a)`,
      solucion: `set_a = {1, 2, 3, 4}\nset_b = {3, 4, 5, 6}\nprint(set_a | set_b)`,
      pistas: ['El operador `|` calcula la unión de dos conjuntos.'],
      validar: (stdout) => {
        const nums = stdout.trim().replace(/[{}]/g, '').split(',').map((s) => s.trim()).filter(Boolean).sort()
        const ok = JSON.stringify(nums) === JSON.stringify(['1', '2', '3', '4', '5', '6'])
        return { ok, mensaje: ok ? 'Correcto: la unión contiene del 1 al 6.' : 'La unión debe contener los números del 1 al 6.' }
      },
    },
    verificacion: [
      {
        id: 'm3-l3-q1',
        pregunta: '¿Qué característica tienen los elementos de un set?',
        opciones: ['Pueden repetirse', 'Son únicos (sin duplicados)', 'Siempre están ordenados', 'Deben ser todos números'],
        respuestaCorrecta: 1,
        explicacion: 'Un set elimina automáticamente los duplicados: cada elemento aparece una sola vez.',
      },
    ],
    resumen: [
      'Un set no tiene duplicados ni orden garantizado.',
      '`set(lista)` convierte una lista en un conjunto de valores únicos.',
      '`|` unión, `&` intersección, `-` diferencia.',
    ],
    proximoPaso: 'Cerramos el módulo combinando listas, tuplas y diccionarios en estructuras anidadas, como las verás en datos reales.',
    conceptos: ['conjuntos', 'sets'],
  },
  {
    id: 'm3-l4',
    moduloId: 'modulo-3',
    titulo: 'Estructuras anidadas',
    objetivo: 'Combinar listas y diccionarios para representar datos tabulares simples, como una mini "tabla" de registros.',
    porQueImporta:
      'Antes de usar pandas, es común representar un conjunto de registros como una lista de diccionarios. Entender esta estructura hace mucho más fácil comprender un DataFrame después.',
    concepto: `Una lista de diccionarios representa varios registros con la misma forma:

\`\`\`python
clientes = [
    {"nombre": "Ana", "compras": 3},
    {"nombre": "Luis", "compras": 7},
]
\`\`\`

Puedes recorrerla con un for normal, y acceder a cada campo con la clave correspondiente: \`cliente["nombre"]\`.`,
    ejemploMinimo: `personas = [{"nombre": "Ana"}, {"nombre": "Luis"}]
for p in personas:
    print(p["nombre"])`,
    ejemploAplicado: `ventas = [
    {"producto": "Mouse", "cantidad": 5, "precio": 15},
    {"producto": "Teclado", "cantidad": 2, "precio": 45},
]

total_general = 0
for venta in ventas:
    subtotal = venta["cantidad"] * venta["precio"]
    total_general += subtotal
    print(f"{venta['producto']}: subtotal {subtotal}")

print("Total general:", total_general)`,
    errorFrecuente: {
      codigo: `ventas = [{"producto": "Mouse", "precio": 15}]
print(ventas["precio"])`,
      explicacion:
        '`ventas` es una lista, no un diccionario, así que no se puede acceder con una clave de texto: lanza `TypeError: list indices must be integers`. Primero hay que acceder al elemento de la lista: `ventas[0]["precio"]`.',
    },
    practicaGuiada: {
      id: 'm3-l4-practica',
      enunciado:
        'Dada `empleados = [{"nombre": "Sara", "salario": 2000}, {"nombre": "Pedro", "salario": 2500}]`, imprime el salario del segundo empleado (Pedro) accediendo correctamente.',
      codigoInicial: `empleados = [{"nombre": "Sara", "salario": 2000}, {"nombre": "Pedro", "salario": 2500}]\nprint(empleados[0]["salario"])`,
      solucion: `empleados = [{"nombre": "Sara", "salario": 2000}, {"nombre": "Pedro", "salario": 2500}]\nprint(empleados[1]["salario"])`,
      pistas: ['Pedro está en el índice 1 de la lista.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2500'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 2500.' }
      },
    },
    reto: {
      id: 'm3-l4-reto',
      enunciado:
        'Dada la lista de diccionarios `productos = [{"nombre": "A", "stock": 0}, {"nombre": "B", "stock": 5}, {"nombre": "C", "stock": 0}]`, recórrela e imprime el nombre de cada producto cuyo stock sea 0.',
      codigoInicial: `productos = [{"nombre": "A", "stock": 0}, {"nombre": "B", "stock": 5}, {"nombre": "C", "stock": 0}]\n# recorre e imprime los nombres con stock 0`,
      solucion: `productos = [{"nombre": "A", "stock": 0}, {"nombre": "B", "stock": 5}, {"nombre": "C", "stock": 0}]\nfor p in productos:\n    if p["stock"] == 0:\n        print(p["nombre"])`,
      pistas: ['Usa un for para recorrer la lista.', 'Dentro, un if que compare `p["stock"] == 0`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'A\nC'
        return { ok, mensaje: ok ? 'Correcto: A y C tienen stock 0.' : 'Debe imprimir A y C (los productos con stock 0).' }
      },
    },
    verificacion: [
      {
        id: 'm3-l4-q1',
        pregunta: '¿Cómo se accede al campo "precio" del primer elemento de `ventas = [{"precio": 10}]`?',
        opciones: ['ventas["precio"]', 'ventas[0].precio', 'ventas[0]["precio"]', 'ventas.precio[0]'],
        respuestaCorrecta: 2,
        explicacion: 'Primero se accede al índice de la lista y luego a la clave del diccionario: `ventas[0]["precio"]`.',
      },
    ],
    resumen: [
      'Una lista de diccionarios representa varios registros con la misma estructura.',
      'Se accede combinando índice de lista y clave de diccionario: `lista[i]["clave"]`.',
      'Esta estructura es el antecedente directo de un DataFrame de pandas.',
    ],
    proximoPaso: 'En el Módulo 4 aprenderás a organizar este tipo de lógica en funciones reutilizables.',
    conceptos: ['estructuras-anidadas', 'lista-de-diccionarios'],
  },
]
