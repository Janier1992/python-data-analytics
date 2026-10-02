import type { Lesson } from '../../types'

export const module1Lessons: Lesson[] = [
  {
    id: 'm1-l1',
    moduloId: 'modulo-1',
    titulo: 'Variables y tipos de datos',
    objetivo: 'Crear variables y reconocer los tipos de datos básicos: int, float, str y bool.',
    porQueImporta:
      'Todo dataset está compuesto por estos tipos básicos: números (edades, precios), texto (nombres, categorías) y booleanos (activo/inactivo). Si no distingues el tipo, los cálculos y filtros fallan.',
    concepto: `Python tiene tipado dinámico: no declaras el tipo, lo infiere del valor asignado.

- \`int\`: números enteros → \`edad = 28\`
- \`float\`: números decimales → \`precio = 19.99\`
- \`str\`: texto → \`categoria = "Electrónica"\`
- \`bool\`: verdadero/falso → \`activo = True\`

Puedes comprobar el tipo de cualquier variable con \`type(variable)\`.`,
    ejemploMinimo: `edad = 28
print(type(edad))`,
    ejemploAplicado: `producto = "Laptop"
precio = 899.99
en_stock = True

print(producto, "-", precio, "- disponible:", en_stock)
print(type(producto), type(precio), type(en_stock))`,
    errorFrecuente: {
      codigo: `precio = "19.99"
total = precio * 2
print(total)`,
      explicacion:
        'El resultado es `"19.9919.99"`, no 39.98. Como `precio` es un `str` (porque está entre comillas), `*` repite el texto en vez de multiplicar. Hay que convertirlo con `float(precio)`.',
    },
    practicaGuiada: {
      id: 'm1-l1-practica',
      enunciado:
        'Crea una variable `temperatura` de tipo float con el valor 36.5 y otra `es_normal` de tipo bool con `True`. Imprime ambas usando `print(temperatura, es_normal)`.',
      codigoInicial: `temperatura = 0\nes_normal = False\nprint(temperatura, es_normal)`,
      solucion: `temperatura = 36.5\nes_normal = True\nprint(temperatura, es_normal)`,
      pistas: ['Un float se escribe con punto decimal: 36.5.', 'Un bool en Python se escribe `True` o `False`, con mayúscula inicial.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '36.5 True'
        return { ok, mensaje: ok ? 'Correcto: tipos float y bool bien definidos.' : 'Revisa los valores exactos solicitados.' }
      },
    },
    reto: {
      id: 'm1-l1-reto',
      enunciado:
        'Tienes `cantidad = "5"` (texto) y `precio_unitario = 3.5`. Corrige el código para que calcule correctamente el total (cantidad × precio_unitario) convirtiendo `cantidad` a número.',
      codigoInicial: `cantidad = "5"\nprecio_unitario = 3.5\ntotal = cantidad * precio_unitario\nprint(total)`,
      solucion: `cantidad = "5"\nprecio_unitario = 3.5\ntotal = int(cantidad) * precio_unitario\nprint(total)`,
      pistas: ['Usa `int()` o `float()` para convertir el texto a número antes de multiplicar.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '17.5'
        return { ok, mensaje: ok ? 'Bien: 5 x 3.5 = 17.5.' : 'El resultado debe ser 17.5 tras convertir el tipo.' }
      },
    },
    verificacion: [
      {
        id: 'm1-l1-q1',
        pregunta: '¿Qué tipo de dato es `True`?',
        opciones: ['str', 'int', 'bool', 'float'],
        respuestaCorrecta: 2,
        explicacion: '`True` y `False` son del tipo `bool`.',
      },
      {
        id: 'm1-l1-q2',
        pregunta: '¿Qué función usarías para convertir el texto "10" en un entero?',
        opciones: ['str("10")', 'int("10")', 'bool("10")', 'len("10")'],
        respuestaCorrecta: 1,
        explicacion: '`int()` convierte un texto numérico válido en un entero.',
      },
    ],
    resumen: [
      'Python infiere el tipo según el valor asignado.',
      'int, float, str y bool son los tipos básicos más usados en datos.',
      '`type()` te dice el tipo real de una variable.',
      'Mezclar str con números en operaciones aritméticas es un error frecuente: conviértelos primero.',
    ],
    proximoPaso: 'Siguiente: cadenas de texto (strings) y cómo transformarlas, algo clave para limpiar datos.',
    conceptos: ['tipos-de-datos', 'conversion-tipos'],
  },
  {
    id: 'm1-l2',
    moduloId: 'modulo-1',
    titulo: 'Strings: creación y métodos esenciales',
    objetivo: 'Manipular texto con métodos de string comunes en limpieza de datos: strip, lower, upper, replace, split.',
    porQueImporta:
      'Los datos del mundo real llegan sucios: espacios de más, mayúsculas inconsistentes, texto con símbolos. Limpiar strings es de las tareas más frecuentes en un proyecto real.',
    concepto: `Un \`str\` es una secuencia de caracteres. Algunos métodos esenciales para limpieza de datos:

- \`.strip()\`: elimina espacios al inicio/final.
- \`.lower()\` / \`.upper()\`: normaliza mayúsculas/minúsculas.
- \`.replace(a, b)\`: reemplaza texto.
- \`.split(sep)\`: separa un string en una lista.

Estos métodos **no modifican** el string original (los strings son inmutables); devuelven uno nuevo.`,
    ejemploMinimo: `nombre = "  ana  "
print(nombre.strip().upper())`,
    ejemploAplicado: `registro = "  Juan Perez , VENTAS "
nombre_limpio = registro.split(",")[0].strip()
area_limpia = registro.split(",")[1].strip().lower()
print(nombre_limpio, "-", area_limpia)`,
    errorFrecuente: {
      codigo: `nombre = "ana"
nombre.upper()
print(nombre)`,
      explicacion:
        'Imprime "ana" en minúsculas porque `.upper()` no modifica la variable original: devuelve un nuevo string que hay que guardar: `nombre = nombre.upper()`.',
    },
    practicaGuiada: {
      id: 'm1-l2-practica',
      enunciado:
        'Dado `correo = "  ANA@EMPRESA.COM  "`, limpia el string para que quede en minúsculas y sin espacios, y guárdalo en `correo_limpio`. Imprime `correo_limpio`.',
      codigoInicial: `correo = "  ANA@EMPRESA.COM  "\ncorreo_limpio = correo\nprint(correo_limpio)`,
      solucion: `correo = "  ANA@EMPRESA.COM  "\ncorreo_limpio = correo.strip().lower()\nprint(correo_limpio)`,
      pistas: ['Encadena `.strip()` y `.lower()`.', 'Recuerda guardar el resultado en `correo_limpio`, no solo imprimirlo.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'ana@empresa.com'
        return { ok, mensaje: ok ? 'Correo normalizado correctamente.' : 'El resultado debe ser "ana@empresa.com".' }
      },
    },
    reto: {
      id: 'm1-l2-reto',
      enunciado:
        'Dado `fila = "Bogota;45;Activo"`, usa `.split(";")` para separar los campos y imprime cada uno en una línea distinta (ciudad, edad, estado).',
      codigoInicial: `fila = "Bogota;45;Activo"\n# separa fila usando split(";") e imprime cada campo`,
      solucion: `fila = "Bogota;45;Activo"\ncampos = fila.split(";")\nprint(campos[0])\nprint(campos[1])\nprint(campos[2])`,
      pistas: ['`.split(";")` devuelve una lista de 3 elementos.', 'Accede a cada elemento con índices: `campos[0]`, `campos[1]`, `campos[2]`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Bogota\n45\nActivo'
        return { ok, mensaje: ok ? 'Perfecto: separaste correctamente los 3 campos.' : 'Deben imprimirse Bogota, 45 y Activo en líneas separadas.' }
      },
    },
    verificacion: [
      {
        id: 'm1-l2-q1',
        pregunta: '¿Qué hace `"  hola  ".strip()`?',
        opciones: ['Convierte a mayúsculas', 'Elimina espacios al inicio y final', 'Divide el texto', 'Elimina todas las vocales'],
        respuestaCorrecta: 1,
        explicacion: '`.strip()` elimina espacios en blanco al inicio y al final del string.',
      },
    ],
    resumen: [
      'Los métodos de string devuelven un nuevo valor; no modifican el original.',
      '`.strip()`, `.lower()`, `.upper()`, `.replace()` y `.split()` son esenciales para limpiar texto.',
      '`.split(sep)` convierte un string en una lista de substrings.',
    ],
    proximoPaso: 'Ahora veremos operadores y expresiones para combinar valores y tomar decisiones.',
    conceptos: ['strings', 'limpieza-texto'],
  },
  {
    id: 'm1-l3',
    moduloId: 'modulo-1',
    titulo: 'Operadores y expresiones',
    objetivo: 'Usar operadores aritméticos, de comparación y lógicos para construir expresiones útiles en análisis.',
    porQueImporta:
      'Filtrar datos ("ventas mayores a 1000"), calcular métricas y validar condiciones depende directamente de operadores de comparación y lógicos.',
    concepto: `Tipos de operadores clave:

- Aritméticos: \`+ - * / // % **\`
- Comparación: \`== != > < >= <=\` (devuelven \`bool\`)
- Lógicos: \`and\`, \`or\`, \`not\`

\`/\` siempre da float; \`//\` da división entera; \`%\` da el resto (módulo), muy usado para detectar pares/impares.`,
    ejemploMinimo: `print(10 // 3, 10 % 3)`,
    ejemploAplicado: `ventas = 1500
meta = 1000
cumplio_meta = ventas >= meta
es_record = ventas > 2000

print("¿Cumplió meta?", cumplio_meta)
print("¿Buen mes y no récord?", cumplio_meta and not es_record)`,
    errorFrecuente: {
      codigo: `edad = 17
if edad = 18:
    print("mayor de edad")`,
      explicacion:
        'Usa `=` (asignación) en lugar de `==` (comparación), lo que da un error de sintaxis. Para comparar igualdad siempre se usa `==`.',
    },
    practicaGuiada: {
      id: 'm1-l3-practica',
      enunciado:
        'Dadas `stock = 0` y `precio = 25.0`, crea `disponible` que sea `True` si `stock > 0`, y luego imprime `disponible`.',
      codigoInicial: `stock = 0\nprecio = 25.0\ndisponible = None\nprint(disponible)`,
      solucion: `stock = 0\nprecio = 25.0\ndisponible = stock > 0\nprint(disponible)`,
      pistas: ['Usa el operador de comparación `>` entre `stock` y `0`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'False'
        return { ok, mensaje: ok ? 'Correcto: con stock 0 no hay disponibilidad.' : 'Con stock = 0, disponible debe ser False.' }
      },
    },
    reto: {
      id: 'm1-l3-reto',
      enunciado:
        'Dadas `edad = 20` e `ingresos = 1200`, imprime `True` solo si la persona es mayor o igual a 18 **y** tiene ingresos mayores a 1000 (usa `and`).',
      codigoInicial: `edad = 20\ningresos = 1200\n# imprime el resultado de la condición combinada`,
      solucion: `edad = 20\ningresos = 1200\nprint(edad >= 18 and ingresos > 1000)`,
      pistas: ['Combina dos comparaciones con `and`.', 'El resultado de una expresión de comparación puede imprimirse directamente.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'True'
        return { ok, mensaje: ok ? 'Correcto.' : 'Con esos valores, el resultado esperado es True.' }
      },
    },
    verificacion: [
      {
        id: 'm1-l3-q1',
        pregunta: '¿Qué devuelve `17 % 2`?',
        opciones: ['8', '8.5', '1', '0'],
        respuestaCorrecta: 2,
        explicacion: '`%` devuelve el resto de la división: 17 dividido 2 da resto 1.',
      },
    ],
    resumen: [
      'Los operadores de comparación devuelven booleanos.',
      '`and`/`or`/`not` combinan condiciones.',
      '`//` es división entera y `%` es el resto (módulo).',
      '`==` compara; `=` asigna. No confundirlos.',
    ],
    proximoPaso: 'Cerramos el módulo viendo entrada/salida y errores básicos para que puedas interactuar con el usuario y depurar.',
    conceptos: ['operadores', 'booleanos', 'expresiones'],
  },
  {
    id: 'm1-l4',
    moduloId: 'modulo-1',
    titulo: 'Entrada, salida y errores básicos',
    objetivo: 'Leer errores comunes de Python (SyntaxError, NameError, TypeError) y entender el formato de f-strings.',
    porQueImporta:
      'Saber leer un traceback es la habilidad de depuración más básica y más usada en todo tu recorrido como data scientist.',
    concepto: `Las f-strings permiten insertar variables dentro de texto de forma clara:

\`\`\`python
nombre = "Ana"
print(f"Hola, {nombre}")
\`\`\`

Errores comunes al empezar:

- **SyntaxError**: algo está mal escrito (falta cerrar comillas, paréntesis, dos puntos).
- **NameError**: usaste una variable que no existe o no se ha definido aún.
- **TypeError**: mezclaste tipos incompatibles (ej. sumar str + int).

Leer el traceback de abajo hacia arriba suele ser la forma más rápida de encontrar la causa real.`,
    ejemploMinimo: `nombre = "Carlos"
edad = 30
print(f"{nombre} tiene {edad} años")`,
    ejemploAplicado: `producto = "Mouse"
precio = 15.5
stock = 20
print(f"Producto: {producto} | Precio: \${precio} | Stock: {stock} unidades")`,
    errorFrecuente: {
      codigo: `edad = 25
print("Tengo " + edad + " años")`,
      explicacion:
        'Lanza `TypeError: can only concatenate str (not "int") to str`. No se puede unir texto y número con `+`. Soluciones: usar f-string `f"Tengo {edad} años"` o convertir con `str(edad)`.',
    },
    practicaGuiada: {
      id: 'm1-l4-practica',
      enunciado:
        'Usa una f-string para imprimir: `El producto Teclado cuesta 45.0` a partir de las variables `producto = "Teclado"` y `precio = 45.0`.',
      codigoInicial: `producto = "Teclado"\nprecio = 45.0\nprint("ESCRIBE_AQUI")`,
      solucion: `producto = "Teclado"\nprecio = 45.0\nprint(f"El producto {producto} cuesta {precio}")`,
      pistas: ['Las f-strings empiezan con `f` antes de las comillas: `f"texto {variable}"`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'El producto Teclado cuesta 45.0'
        return { ok, mensaje: ok ? 'f-string correcta.' : 'El texto debe coincidir exactamente usando las variables dadas.' }
      },
    },
    reto: {
      id: 'm1-l4-reto',
      enunciado:
        'El siguiente código falla con TypeError. Corrígelo para que imprima: `Stock restante: 7` usando una f-string.',
      codigoInicial: `stock = 7\nprint("Stock restante: " + stock)`,
      solucion: `stock = 7\nprint(f"Stock restante: {stock}")`,
      pistas: ['Reemplaza la concatenación con `+` por una f-string.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Stock restante: 7'
        return { ok, mensaje: ok ? 'Corregido correctamente.' : 'El resultado debe ser "Stock restante: 7".' }
      },
    },
    verificacion: [
      {
        id: 'm1-l4-q1',
        pregunta: '¿Qué error aparece al sumar un string con un int usando `+`?',
        opciones: ['SyntaxError', 'NameError', 'TypeError', 'IndexError'],
        respuestaCorrecta: 2,
        explicacion: 'Mezclar tipos incompatibles con `+` produce `TypeError`.',
      },
      {
        id: 'm1-l4-q2',
        pregunta: '¿Cuál es la forma correcta de insertar una variable en un texto con f-strings?',
        opciones: ['print("Hola " + nombre)', 'print(f"Hola {nombre}")', 'print("Hola %nombre%")', 'print("Hola", nombre())'],
        respuestaCorrecta: 1,
        explicacion: 'Las f-strings usan `{variable}` dentro de un string precedido por `f`.',
      },
    ],
    resumen: [
      'Las f-strings (`f"texto {variable}"`) son la forma moderna y clara de combinar texto y variables.',
      'SyntaxError = sintaxis mal escrita.',
      'NameError = variable no definida.',
      'TypeError = tipos incompatibles en una operación.',
      'Lee el traceback empezando por la última línea.',
    ],
    proximoPaso:
      'Con los fundamentos sólidos, el Módulo 2 (próximamente) introduce control de flujo: if/elif/else, for y while.',
    conceptos: ['f-strings', 'errores-basicos', 'traceback'],
  },
]
