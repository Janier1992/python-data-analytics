import type { Lesson } from '../../types'

export const module34Lessons: Lesson[] = [
  {
    "id": "m34-l1",
    "moduloId": "modulo-34",
    "motor": "excel",
    "titulo": "La hoja de cálculo: celdas, rangos y fórmulas",
    "objetivo": "Escribir fórmulas básicas con referencias a celdas, entender los rangos y el orden de las operaciones.",
    "porQueImporta": "Una hoja de cálculo se vuelve útil cuando deja de ser una tabla estática y calcula por ti: si cambias un dato, todo lo que depende de él se actualiza solo. Todo el curso se apoya en esta idea.",
    "concepto": "Una hoja es una cuadrícula de **celdas**. Cada celda tiene una dirección formada por su **columna** (letra) y su **fila** (número): `B3` es la columna B, fila 3.\n\n- Un **rango** es un grupo de celdas contiguas: `B2:B6` (una columna) o `A1:C4` (un bloque).\n- Una celda puede contener **números**, **texto**, **fechas** (que Excel guarda como un número de serie) o **valores lógicos** (`VERDADERO`/`FALSO`).\n- Una **fórmula** empieza siempre con `=`. Sin el signo igual, Excel lo toma como texto.\n\nOperadores aritméticos: `+` suma, `-` resta, `*` multiplica, `/` divide, `^` potencia, `%` porcentaje y `&` une textos.\n\n**Orden de las operaciones**: primero lo que va entre paréntesis, luego `^`, después `*` y `/`, y por último `+` y `-`. Usa paréntesis para dejar claro lo que quieres.\n\n```\n=B2*C2            multiplica el contenido de dos celdas\n=(B2+B3)*2        los paréntesis cambian el orden\n=B2*(1-10%)       un descuento del 10 %\n```\n\nEn tu Excel el separador de argumentos puede ser «;» o «,» según la configuración regional del equipo (en este curso puedes usar cualquiera de los dos).",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            10,
            20
          ],
          [
            30,
            40
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=A1+B1",
          "esperado": 30
        },
        {
          "formula": "=A1*B2",
          "esperado": 400
        },
        {
          "formula": "=(A1+B1)*2",
          "esperado": 60
        },
        {
          "formula": "=A1+B1*2",
          "esperado": 50
        },
        {
          "formula": "=A1^2",
          "esperado": 100
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Producto",
            "Cantidad",
            "Precio"
          ],
          [
            "Mouse",
            3,
            15000
          ],
          [
            "Teclado",
            2,
            45000
          ],
          [
            "Monitor",
            1,
            200000
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "D2",
          "formula": "=B2*C2",
          "esperado": 45000
        },
        {
          "celda": "D3",
          "formula": "=B3*C3",
          "esperado": 90000
        },
        {
          "celda": "D4",
          "formula": "=B4*C4",
          "esperado": 200000
        },
        {
          "celda": "F1",
          "formula": "=B2*C2+B3*C3+B4*C4",
          "esperado": 335000
        }
      ],
      "nota": "Cada fórmula usa las celdas de su fila. Si cambias la cantidad de un producto, el total se recalcula solo."
    },
    "errorFrecuente": {
      "codigo": "B2*C2",
      "explicacion": "Sin el signo `=` al principio, Excel no lo reconoce como una fórmula: lo guarda como **texto** y lo muestra tal cual en lugar de calcularlo. Toda fórmula empieza con `=`."
    },
    "practicaGuiada": {
      "id": "m34-l1-practica",
      "enunciado": "Calcula el total de la primera línea del pedido (cantidad × precio).",
      "hoja": {
        "celdas": [
          [
            "Producto",
            "Cantidad",
            "Precio"
          ],
          [
            "Mouse",
            3,
            15000
          ],
          [
            "Teclado",
            2,
            45000
          ],
          [
            "Monitor",
            1,
            200000
          ]
        ],
        "encabezado": true
      },
      "celda": "D2",
      "formulaInicial": "=",
      "solucion": "=B2*C2",
      "esperado": 45000,
      "pistas": [
        "Multiplica la celda de la cantidad por la del precio.",
        "Empieza con el signo =."
      ]
    },
    "reto": {
      "id": "m34-l1-reto",
      "enunciado": "Una compra de 4 unidades a 20 000 cada una tiene un 10 % de descuento. Calcula el total a pagar usando las celdas B2 y C2 y el porcentaje dentro de la fórmula.",
      "hoja": {
        "celdas": [
          [
            "Producto",
            "Cantidad",
            "Precio"
          ],
          [
            "Impresora",
            4,
            20000
          ]
        ],
        "encabezado": true
      },
      "celda": "D2",
      "formulaInicial": "=",
      "solucion": "=B2*C2*(1-10%)",
      "esperado": 72000,
      "pistas": [
        "Primero el total sin descuento: B2*C2.",
        "Un descuento del 10 % deja el 90 %: multiplica por (1-10%)."
      ]
    },
    "verificacion": [
      {
        "id": "m34-l1-q1",
        "pregunta": "¿Qué hace Excel con `=2+3*4`?",
        "opciones": [
          "Da 20, porque calcula de izquierda a derecha",
          "Da 14, porque la multiplicación va antes que la suma",
          "Da 9",
          "Da error"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La multiplicación tiene prioridad sobre la suma: 3×4 = 12 y 2 + 12 = 14. Con paréntesis, `=(2+3)*4` daría 20."
      },
      {
        "id": "m34-l1-q2",
        "pregunta": "¿Qué indica el rango `B2:B6`?",
        "opciones": [
          "Solo las celdas B2 y B6",
          "Todas las celdas de la columna B desde la fila 2 hasta la 6",
          "La suma de B2 y B6",
          "Las columnas B y 6"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Los dos puntos significan «desde … hasta»: incluye B2, B3, B4, B5 y B6."
      }
    ],
    "resumen": [
      "Una fórmula empieza con `=` y puede usar números, operadores y referencias a celdas.",
      "Un rango como `B2:B6` agrupa celdas contiguas.",
      "El orden de las operaciones es: paréntesis, `^`, `*` y `/`, y por último `+` y `-`."
    ],
    "proximoPaso": "Veremos las funciones de resumen: SUMA, PROMEDIO, MIN, MAX y CONTAR.",
    "conceptos": [
      "celdas-y-rangos",
      "formulas-basicas",
      "orden-de-operaciones"
    ]
  },
  {
    "id": "m34-l2",
    "moduloId": "modulo-34",
    "motor": "excel",
    "titulo": "Funciones de resumen: SUMA, PROMEDIO, MIN, MAX y CONTAR",
    "objetivo": "Resumir una columna de datos con las funciones más usadas y entender la diferencia entre CONTAR y CONTARA.",
    "porQueImporta": "Sumar celda por celda es lento y propenso a errores. Las funciones de resumen trabajan sobre un rango completo y se actualizan solas cuando agregas o cambias datos.",
    "concepto": "Una **función** recibe argumentos entre paréntesis y devuelve un resultado: `=SUMA(B2:B6)`.\n\n| Función | Qué hace |\n|---|---|\n| `SUMA(rango)` | Suma los números |\n| `PROMEDIO(rango)` | Media aritmética |\n| `MIN(rango)` y `MAX(rango)` | Valor menor y mayor |\n| `CONTAR(rango)` | Cuenta las celdas que contienen **números** |\n| `CONTARA(rango)` | Cuenta las celdas **no vacías** (números o texto) |\n| `CONTAR.BLANCO(rango)` | Cuenta las celdas vacías |\n\nEstas funciones **ignoran el texto** de un rango: si una celda de ventas dice «n/d», no se suma y tampoco entra al promedio.\n\nLos dos puntos de `B2:B6` forman un rango. El punto y coma (o la coma) **separa argumentos distintos**: `=SUMA(B2;B6)` suma solo dos celdas, `=SUMA(B2:B6)` suma las cinco.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            4
          ],
          [
            8
          ],
          [
            6
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=SUMA(A1:A3)",
          "esperado": 18
        },
        {
          "formula": "=PROMEDIO(A1:A3)",
          "esperado": 6
        },
        {
          "formula": "=MAX(A1:A3)",
          "esperado": 8
        },
        {
          "formula": "=MIN(A1:A3)",
          "esperado": 4
        },
        {
          "formula": "=CONTAR(A1:A3)",
          "esperado": 3
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Ventas"
          ],
          [
            "Ana",
            1200
          ],
          [
            "Luis",
            950
          ],
          [
            "Eva",
            1800
          ],
          [
            "Carlos",
            700
          ],
          [
            "Marta",
            1350
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "D1",
          "formula": "=SUMA(B2:B6)",
          "esperado": 6000
        },
        {
          "celda": "D2",
          "formula": "=PROMEDIO(B2:B6)",
          "esperado": 1200
        },
        {
          "celda": "D3",
          "formula": "=MAX(B2:B6)",
          "esperado": 1800
        },
        {
          "celda": "D4",
          "formula": "=MIN(B2:B6)",
          "esperado": 700
        },
        {
          "celda": "D5",
          "formula": "=CONTAR(B2:B6)",
          "esperado": 5
        },
        {
          "celda": "D6",
          "formula": "=CONTARA(A2:A6)",
          "esperado": 5
        }
      ]
    },
    "errorFrecuente": {
      "codigo": "=SUMA(B2;B6)",
      "explicacion": "Con el separador de argumentos (`;`) se le dan a la función **dos** valores: solo B2 y B6, no el rango entre ellas. Para sumar todas las celdas desde B2 hasta B6 se usan los dos puntos: `=SUMA(B2:B6)`."
    },
    "practicaGuiada": {
      "id": "m34-l2-practica",
      "enunciado": "Calcula la venta promedio del equipo.",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Ventas"
          ],
          [
            "Ana",
            1200
          ],
          [
            "Luis",
            950
          ],
          [
            "Eva",
            1800
          ],
          [
            "Carlos",
            700
          ],
          [
            "Marta",
            1350
          ]
        ],
        "encabezado": true
      },
      "celda": "D2",
      "formulaInicial": "=",
      "solucion": "=PROMEDIO(B2:B6)",
      "esperado": 1200,
      "pistas": [
        "Usa PROMEDIO sobre el rango de ventas.",
        "El rango va de B2 a B6."
      ]
    },
    "reto": {
      "id": "m34-l2-reto",
      "enunciado": "Calcula la diferencia entre la mejor y la peor venta (MAX menos MIN).",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Ventas"
          ],
          [
            "Ana",
            1200
          ],
          [
            "Luis",
            950
          ],
          [
            "Eva",
            1800
          ],
          [
            "Carlos",
            700
          ],
          [
            "Marta",
            1350
          ]
        ],
        "encabezado": true
      },
      "celda": "D2",
      "formulaInicial": "=",
      "solucion": "=MAX(B2:B6)-MIN(B2:B6)",
      "esperado": 1100,
      "pistas": [
        "Puedes combinar dos funciones en una fórmula.",
        "Resta la peor venta a la mejor."
      ]
    },
    "verificacion": [
      {
        "id": "m34-l2-q1",
        "pregunta": "Una columna tiene los valores 10, 20, «n/d» y 30. ¿Cuánto da `=PROMEDIO(A1:A4)`?",
        "opciones": [
          "15",
          "20",
          "12",
          "Error"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "El texto «n/d» se ignora: el promedio es (10 + 20 + 30) / 3 = 20, no entre 4."
      },
      {
        "id": "m34-l2-q2",
        "pregunta": "¿En qué se diferencia `CONTARA` de `CONTAR`?",
        "opciones": [
          "En nada",
          "CONTARA cuenta también las celdas con texto; CONTAR solo las que tienen números",
          "CONTARA cuenta solo texto",
          "CONTAR cuenta celdas vacías"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "CONTAR cuenta números; CONTARA cuenta todo lo que no esté vacío."
      }
    ],
    "resumen": [
      "SUMA, PROMEDIO, MIN, MAX y CONTAR resumen un rango completo.",
      "Estas funciones ignoran el texto que haya en el rango.",
      "Dos puntos forman un rango; el separador de argumentos (; o ,) separa valores distintos."
    ],
    "proximoPaso": "Aprenderemos a copiar fórmulas con referencias relativas y absolutas ($).",
    "conceptos": [
      "suma-promedio-minmax",
      "contar-contara"
    ]
  },
  {
    "id": "m34-l3",
    "moduloId": "modulo-34",
    "motor": "excel",
    "titulo": "Referencias relativas, absolutas y mixtas",
    "objetivo": "Copiar una fórmula hacia abajo o hacia los lados sabiendo qué referencias se mueven y cuáles deben quedar fijas con $.",
    "porQueImporta": "La verdadera potencia de la hoja está en escribir una fórmula una vez y copiarla a cientos de filas. Si no controlas qué referencias se desplazan, los resultados salen mal sin que Excel avise.",
    "concepto": "Al **copiar** o arrastrar una fórmula, Excel ajusta las referencias según cuánto se movió:\n\n- **Relativa** (`B2`): se desplaza. Copiada una fila más abajo, se convierte en `B3`.\n- **Absoluta** (`$B$2`): no se mueve nunca. El `$` fija la columna y la fila.\n- **Mixta** (`$B2` o `B$2`): fija solo la columna o solo la fila.\n\nMientras editas una fórmula, la tecla **F4** (en Windows) alterna entre `B2`, `$B$2`, `B$2` y `$B2` (en Mac se usa Cmd + T).\n\nEjemplo típico: el porcentaje de cada venta sobre el total.\n\n```\n=B2/SUMA($B$2:$B$6)\n```\n\nEl `B2` debe moverse con cada fila, pero el rango del total (`$B$2:$B$6`) debe **quedar fijo**. Si lo escribes sin `$`, al copiar el rango también baja y cada fila se divide entre una suma distinta.\n\nEn los ejercicios de esta lección, la fórmula se copia automáticamente hacia abajo, como al arrastrar el controlador de relleno (el cuadrito de la esquina de la celda).",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            10,
            100
          ],
          [
            20,
            100
          ],
          [
            30,
            100
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "celda": "B1",
          "formula": "=A1/SUMA($A$1:$A$3)",
          "esperado": 0.16666666666666666
        },
        {
          "celda": "B2",
          "formula": "=A2/SUMA($A$1:$A$3)",
          "esperado": 0.3333333333333333
        },
        {
          "celda": "B3",
          "formula": "=A3/SUMA($A$1:$A$3)",
          "esperado": 0.5
        }
      ],
      "nota": "Estas son las tres filas de la fórmula `=A1/SUMA($A$1:$A$3)` copiada hacia abajo: el numerador cambia (A1, A2, A3) y el rango fijo no."
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Ventas",
            "Comisión",
            "",
            "Tasa de comisión"
          ],
          [
            "Ana",
            1200,
            null,
            null,
            0.05
          ],
          [
            "Luis",
            950
          ],
          [
            "Eva",
            1800
          ],
          [
            "Carlos",
            700
          ],
          [
            "Marta",
            1350
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "C2",
          "formula": "=B2*$E$2",
          "esperado": 60
        },
        {
          "celda": "C3",
          "formula": "=B3*$E$2",
          "esperado": 47.5
        },
        {
          "celda": "C4",
          "formula": "=B4*$E$2",
          "esperado": 90
        }
      ],
      "nota": "La tasa de comisión está en una sola celda (E2). Con `$E$2` todas las filas la usan. Si cambias la tasa, todas las comisiones se recalculan."
    },
    "errorFrecuente": {
      "codigo": "=B2/SUMA(B2:B6)",
      "explicacion": "Al copiarla a la fila siguiente se convierte en `=B3/SUMA(B3:B7)`: el rango del total se corre y deja de incluir las primeras ventas. Excel no muestra ningún error, solo da porcentajes equivocados. La fórmula correcta fija el rango: `=B2/SUMA($B$2:$B$6)`."
    },
    "practicaGuiada": {
      "id": "m34-l3-practica",
      "enunciado": "Calcula el porcentaje que representa cada venta sobre el total. Escribe la fórmula en C2 (se copiará a las 5 filas).",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Ventas",
            "% del total"
          ],
          [
            "Ana",
            1200
          ],
          [
            "Luis",
            950
          ],
          [
            "Eva",
            1800
          ],
          [
            "Carlos",
            700
          ],
          [
            "Marta",
            1350
          ]
        ],
        "encabezado": true
      },
      "celda": "C2",
      "formulaInicial": "=",
      "solucion": "=B2/SUMA($B$2:$B$6)",
      "esperado": [
        0.2,
        0.15833333333333333,
        0.3,
        0.11666666666666667,
        0.225
      ],
      "rellenarFilas": 5,
      "formato": "porcentaje",
      "tolerancia": 1e-06,
      "pistas": [
        "El numerador es la venta de la fila: B2, que debe moverse al copiar.",
        "El total (SUMA del rango) debe quedar fijo con $: $B$2:$B$6."
      ]
    },
    "reto": {
      "id": "m34-l3-reto",
      "enunciado": "Calcula la comisión de cada vendedor multiplicando su venta por la tasa de la celda E2. Escribe la fórmula en C2 (se copia a las 5 filas).",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Ventas",
            "Comisión",
            "",
            "Tasa de comisión"
          ],
          [
            "Ana",
            1200,
            null,
            null,
            0.05
          ],
          [
            "Luis",
            950
          ],
          [
            "Eva",
            1800
          ],
          [
            "Carlos",
            700
          ],
          [
            "Marta",
            1350
          ]
        ],
        "encabezado": true
      },
      "celda": "C2",
      "formulaInicial": "=",
      "solucion": "=B2*$E$2",
      "esperado": [
        60,
        47.5,
        90,
        35,
        67.5
      ],
      "rellenarFilas": 5,
      "tolerancia": 1e-06,
      "pistas": [
        "La venta de cada fila es relativa: B2.",
        "La tasa está en una sola celda: fíjala con $E$2 para que no se mueva."
      ]
    },
    "verificacion": [
      {
        "id": "m34-l3-q1",
        "pregunta": "Copias `=A1*B1` a la celda de abajo. ¿Cómo queda?",
        "opciones": [
          "=A1*B1",
          "=A2*B2",
          "=A1*B2",
          "=A2*B1"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Las dos referencias son relativas y bajan una fila."
      },
      {
        "id": "m34-l3-q2",
        "pregunta": "¿Para qué sirve el signo `$` en `$B$2`?",
        "opciones": [
          "Para formato de moneda",
          "Para que la referencia no cambie al copiar la fórmula",
          "Para sumar B2",
          "Para multiplicar por 100"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "El `$` fija la columna y/o la fila: es lo que hace absoluta la referencia."
      }
    ],
    "resumen": [
      "Una referencia relativa se mueve al copiar la fórmula; una absoluta ($) no.",
      "Fija con $ los valores que usan todas las filas (un total, una tasa).",
      "F4 (Windows) o Cmd + T (Mac) alterna entre los tipos de referencia al editar."
    ],
    "proximoPaso": "Veremos cómo tomar decisiones dentro de una fórmula con SI, Y, O y SI.ERROR.",
    "conceptos": [
      "referencias-relativas",
      "referencias-absolutas",
      "copiar-formulas"
    ]
  },
  {
    "id": "m34-l4",
    "moduloId": "modulo-34",
    "motor": "excel",
    "titulo": "Lógica en las fórmulas: SI, Y, O y SI.ERROR",
    "objetivo": "Hacer que una fórmula devuelva un resultado u otro según una condición, y combinar condiciones.",
    "porQueImporta": "Casi todo análisis necesita clasificar: ¿cumplió la meta?, ¿qué bono le corresponde?, ¿hay un error que debo ocultar? Las funciones lógicas convierten esas reglas en fórmulas.",
    "concepto": "`SI(prueba; si_verdadero; si_falso)` evalúa una condición y devuelve uno de dos resultados:\n\n```\n=SI(B2>=1000; \"Cumple\"; \"No cumple\")\n```\n\n- Los **textos** van entre comillas dobles.\n- Operadores de comparación: `=`, `<>` (distinto), `<`, `>`, `<=`, `>=`.\n- `Y(c1; c2…)` es verdadera si **todas** las condiciones se cumplen; `O(c1; c2…)` si **al menos una** se cumple; `NO(c)` invierte el resultado.\n- Se pueden **anidar** varios SI: el segundo `SI` va en el lugar del «si es falso» del primero.\n- `SI.ERROR(valor; si_error)` devuelve el valor alternativo cuando la fórmula produce cualquier error (`#¡DIV/0!`, `#N/D`…). Úsalo con cuidado: también esconde errores que quizá debías corregir.\n\n```\n=SI(B2>=1500; 200; SI(B2>=1000; 100; 0))\n```\n\nSi omites el tercer argumento de `SI` y la condición es falsa, Excel devuelve `FALSO`.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            15
          ],
          [
            8
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=SI(A1>10;\"alto\";\"bajo\")",
          "esperado": "alto"
        },
        {
          "formula": "=SI(A2>10;\"alto\";\"bajo\")",
          "esperado": "bajo"
        },
        {
          "formula": "=Y(A1>10;A2>5)",
          "esperado": true
        },
        {
          "formula": "=O(A1<5;A2<5)",
          "esperado": false
        },
        {
          "formula": "=SI.ERROR(A1/0;\"sin dato\")",
          "esperado": "sin dato"
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Ventas",
            "Meta"
          ],
          [
            "Ana",
            1200,
            1000
          ],
          [
            "Luis",
            950,
            1000
          ],
          [
            "Eva",
            1800,
            1500
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "D2",
          "formula": "=SI(B2>=C2;\"Cumplió\";\"No cumplió\")",
          "esperado": "Cumplió"
        },
        {
          "celda": "D3",
          "formula": "=SI(B3>=C3;\"Cumplió\";\"No cumplió\")",
          "esperado": "No cumplió"
        },
        {
          "celda": "D4",
          "formula": "=SI(Y(B4>=C4;B4>=1500);\"Bono\";\"Sin bono\")",
          "esperado": "Bono"
        }
      ]
    },
    "errorFrecuente": {
      "codigo": "=SI(B2>=1000;\"Cumple\")",
      "explicacion": "Falta el tercer argumento. Cuando la condición es falsa, la fórmula no devuelve un texto vacío, sino el valor lógico `FALSO`, que aparece en la celda y puede arruinar cálculos posteriores. Escribe siempre qué debe pasar en ambos casos: `=SI(B2>=1000;\"Cumple\";\"No cumple\")`."
    },
    "practicaGuiada": {
      "id": "m34-l4-practica",
      "enunciado": "Escribe en C2 una fórmula que diga «Cumple» si la venta es de 1000 o más y «No cumple» si no. Se copiará a las 5 filas. Usa exactamente esos textos.",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Ventas",
            "Resultado"
          ],
          [
            "Ana",
            1200
          ],
          [
            "Luis",
            950
          ],
          [
            "Eva",
            1800
          ],
          [
            "Carlos",
            700
          ],
          [
            "Marta",
            1350
          ]
        ],
        "encabezado": true
      },
      "celda": "C2",
      "formulaInicial": "=",
      "solucion": "=SI(B2>=1000;\"Cumple\";\"No cumple\")",
      "esperado": [
        "Cumple",
        "No cumple",
        "Cumple",
        "No cumple",
        "Cumple"
      ],
      "rellenarFilas": 5,
      "pistas": [
        "La condición es B2>=1000.",
        "Los textos van entre comillas dobles, con la mayúscula inicial."
      ]
    },
    "reto": {
      "id": "m34-l4-reto",
      "enunciado": "Calcula el bono de cada vendedor: 200 si vendió 1500 o más; 100 si vendió 1000 o más (pero menos de 1500); 0 en otro caso. Escribe la fórmula en C2 (se copia a las 5 filas).",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Ventas",
            "Resultado"
          ],
          [
            "Ana",
            1200
          ],
          [
            "Luis",
            950
          ],
          [
            "Eva",
            1800
          ],
          [
            "Carlos",
            700
          ],
          [
            "Marta",
            1350
          ]
        ],
        "encabezado": true
      },
      "celda": "C2",
      "formulaInicial": "=",
      "solucion": "=SI(B2>=1500;200;SI(B2>=1000;100;0))",
      "esperado": [
        100,
        0,
        200,
        0,
        100
      ],
      "rellenarFilas": 5,
      "pistas": [
        "Empieza por la condición más exigente (1500).",
        "Si no se cumple, el valor para «falso» es otro SI para la condición de 1000."
      ]
    },
    "verificacion": [
      {
        "id": "m34-l4-q1",
        "pregunta": "¿Qué devuelve `=SI(5>10;\"a\";\"b\")`?",
        "opciones": [
          "a",
          "b",
          "FALSO",
          "Error"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La condición 5>10 es falsa, así que devuelve el tercer argumento: «b»."
      },
      {
        "id": "m34-l4-q2",
        "pregunta": "¿Cuándo es verdadera `=Y(A1>0;A2>0)`?",
        "opciones": [
          "Cuando alguna de las dos celdas es positiva",
          "Cuando las dos celdas son positivas",
          "Nunca",
          "Cuando A1 es igual a A2"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "`Y` exige que se cumplan todas las condiciones."
      }
    ],
    "resumen": [
      "`SI(prueba; si_verdadero; si_falso)` elige entre dos resultados.",
      "`Y` y `O` combinan condiciones; los `SI` se pueden anidar.",
      "`SI.ERROR` oculta errores: úsalo sabiendo qué errores puede esconder."
    ],
    "proximoPaso": "Veremos cómo limpiar y manipular texto y fechas con fórmulas.",
    "conceptos": [
      "funcion-si",
      "y-o-no",
      "si-error"
    ]
  },
  {
    "id": "m34-l5",
    "moduloId": "modulo-34",
    "motor": "excel",
    "titulo": "Texto y fechas: IZQUIERDA, EXTRAE, NOMPROPIO, AÑO y MES",
    "objetivo": "Extraer y limpiar partes de un texto, unir textos y obtener el año, el mes y el día de una fecha.",
    "porQueImporta": "Los datos reales llegan desordenados: nombres con espacios de más, códigos que mezclan letras y números, fechas que hay que agrupar por mes. Las funciones de texto y de fecha los dejan listos para analizar.",
    "concepto": "**Texto**\n\n| Función | Qué hace |\n|---|---|\n| `IZQUIERDA(texto; n)` / `DERECHA(texto; n)` | Los primeros / últimos *n* caracteres |\n| `EXTRAE(texto; inicio; n)` | *n* caracteres a partir de la posición *inicio* |\n| `LARGO(texto)` | Cantidad de caracteres |\n| `ESPACIOS(texto)` | Quita espacios sobrantes (al inicio, al final y repetidos) |\n| `MAYUSC`, `MINUSC`, `NOMPROPIO` | Todo en mayúsculas, minúsculas o «Tipo Nombre Propio» |\n| `A2&\" \"&B2` o `CONCATENAR` | Une textos |\n\n**Fechas.** Excel guarda cada fecha como un **número de serie** (los días desde 1900) y solo cambia su formato de presentación. Por eso se puede restar dos fechas para obtener días.\n\n- `FECHA(año; mes; día)` construye una fecha.\n- `AÑO(fecha)`, `MES(fecha)` y `DIA(fecha)` extraen cada parte.\n- `DIASEM(fecha)` da el día de la semana (1 = domingo en la forma por defecto).\n- `FIN.MES(fecha; meses)` da el último día del mes, desplazándose los meses indicados.\n\nPara que una fecha de la hoja se vea como fecha, la celda debe tener formato de fecha (en la hoja de práctica ya lo tiene).",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            "Colombia",
            {
              "fecha": "2024-03-15"
            }
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=IZQUIERDA(A1;3)",
          "esperado": "Col"
        },
        {
          "formula": "=DERECHA(A1;4)",
          "esperado": "mbia"
        },
        {
          "formula": "=EXTRAE(A1;4;3)",
          "esperado": "omb"
        },
        {
          "formula": "=LARGO(A1)",
          "esperado": 8
        },
        {
          "formula": "=MAYUSC(A1)",
          "esperado": "COLOMBIA"
        },
        {
          "formula": "=AÑO(B1)",
          "esperado": 2024
        },
        {
          "formula": "=MES(B1)",
          "esperado": 3
        },
        {
          "formula": "=DIA(B1)",
          "esperado": 15
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Código",
            "Nombre"
          ],
          [
            "CO-0012",
            "  ana maría LÓPEZ "
          ],
          [
            "MX-0345",
            "LUIS  pérez"
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "C2",
          "formula": "=ESPACIOS(B2)",
          "esperado": "ana maría LÓPEZ"
        },
        {
          "celda": "C2",
          "formula": "=NOMPROPIO(ESPACIOS(B2))",
          "esperado": "Ana María López"
        },
        {
          "celda": "C3",
          "formula": "=NOMPROPIO(ESPACIOS(B3))",
          "esperado": "Luis Pérez"
        },
        {
          "celda": "D2",
          "formula": "=IZQUIERDA(A2;2)",
          "esperado": "CO"
        },
        {
          "celda": "D3",
          "formula": "=DERECHA(A3;4)",
          "esperado": "0345"
        }
      ],
      "nota": "`ESPACIOS` quita los espacios de más y `NOMPROPIO` pone la inicial de cada palabra en mayúscula. Combinar funciones (una dentro de otra) es lo normal en la limpieza de datos."
    },
    "errorFrecuente": {
      "codigo": "=B2+C2",
      "explicacion": "Si `B2` y `C2` son textos como «Ana» y «López», `+` intenta sumarlos como números y da `#¡VALOR!`. Para unir textos se usa `&`: `=B2&\" \"&C2`."
    },
    "practicaGuiada": {
      "id": "m34-l5-practica",
      "enunciado": "El nombre de B2 tiene espacios de más y mayúsculas inconsistentes. Escribe en C2 una fórmula que lo deje como «Ana María López».",
      "hoja": {
        "celdas": [
          [
            "Código",
            "Nombre"
          ],
          [
            "CO-0012",
            "  ana maría LÓPEZ "
          ]
        ],
        "encabezado": true
      },
      "celda": "C2",
      "formulaInicial": "=",
      "solucion": "=NOMPROPIO(ESPACIOS(B2))",
      "esperado": "Ana María López",
      "pistas": [
        "Primero quita los espacios sobrantes con ESPACIOS.",
        "Después aplica NOMPROPIO al resultado (una función dentro de la otra)."
      ]
    },
    "reto": {
      "id": "m34-l5-reto",
      "enunciado": "La fecha de B2 es el 15 de marzo de 2024. Escribe en C2 una fórmula que devuelva el texto «3/2024» (mes, una barra y año) usando MES, AÑO y el operador &.",
      "hoja": {
        "celdas": [
          [
            "Pedido",
            "Fecha"
          ],
          [
            "P-001",
            {
              "fecha": "2024-03-15"
            }
          ]
        ],
        "encabezado": true
      },
      "celda": "C2",
      "formulaInicial": "=",
      "solucion": "=MES(B2)&\"/\"&AÑO(B2)",
      "esperado": "3/2024",
      "pistas": [
        "MES(B2) da el número del mes y AÑO(B2) el año.",
        "Une las dos partes con la barra entre comillas: &\"/\"&."
      ]
    },
    "verificacion": [
      {
        "id": "m34-l5-q1",
        "pregunta": "Una celda tiene «CO-0012». ¿Qué devuelve `=DERECHA(A1;4)`?",
        "opciones": [
          "CO-0",
          "0012",
          "12",
          "CO"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "`DERECHA` toma los últimos 4 caracteres: «0012»."
      },
      {
        "id": "m34-l5-q2",
        "pregunta": "¿Qué guarda Excel internamente en una celda con una fecha?",
        "opciones": [
          "El texto con la fecha",
          "Un número de serie (días desde 1900)",
          "Tres columnas ocultas",
          "Nada: solo se muestra"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Una fecha es un número con formato de fecha; por eso se puede restar para obtener días."
      }
    ],
    "resumen": [
      "IZQUIERDA, DERECHA y EXTRAE sacan partes de un texto; ESPACIOS y NOMPROPIO lo limpian.",
      "El operador `&` une textos (no uses `+`).",
      "Las fechas son números de serie; AÑO, MES y DIA extraen sus partes."
    ],
    "proximoPaso": "En el siguiente módulo analizaremos datos con condiciones: CONTAR.SI, SUMAR.SI y búsquedas.",
    "conceptos": [
      "funciones-de-texto",
      "fechas-en-excel"
    ]
  },
]
