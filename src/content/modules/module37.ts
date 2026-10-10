import type { Lesson } from '../../types'

export const module37Lessons: Lesson[] = [
  {
    "id": "m37-l1",
    "moduloId": "modulo-37",
    "motor": "excel",
    "titulo": "Proyecto: revisa y prepara los datos de ventas",
    "objetivo": "Detectar los problemas de calidad de una tabla real y corregirlos con fórmulas antes de analizar.",
    "porQueImporta": "Un análisis solo es tan bueno como sus datos. En este caso hay nombres de vendedores escritos de varias formas: sin limpiarlos, «Ana», «ana » y «ANA» se contarían como tres personas distintas.",
    "concepto": "**El caso**: la tienda de tecnología *Aurora* (datos ficticios) quiere entender sus ventas del primer trimestre de 2024 para decidir dónde reforzar el equipo comercial y cuánto pagar de comisiones. Las preguntas:\n\n1. ¿Los datos están listos para analizar, o hay que limpiarlos?\n2. ¿Qué región y qué producto generan más ingreso?\n3. ¿Cuánto corresponde pagar de comisión a cada vendedor?\n4. ¿Qué se puede (y qué no) concluir con estos datos?\n\n**Primer paso: revisar.** La tabla tiene 12 ventas con fecha, vendedor, región, producto, unidades y precio. Al revisarla se ve que la columna **Vendedor** tiene espacios sobrantes y mayúsculas inconsistentes. Además faltan dos columnas que usaremos en el análisis:\n\n- **Ingreso** = unidades × precio.\n- **Mes** = el mes de la fecha, para poder agrupar por mes.\n\nCada corrección se escribe en una **columna nueva** con una fórmula; los datos originales no se tocan.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            "  ana",
            "LUIS "
          ],
          [
            "Eva",
            "marta"
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=NOMPROPIO(ESPACIOS(A1))",
          "esperado": "Ana"
        },
        {
          "formula": "=NOMPROPIO(ESPACIOS(B1))",
          "esperado": "Luis"
        },
        {
          "formula": "=NOMPROPIO(ESPACIOS(B2))",
          "esperado": "Marta"
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Fecha",
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Precio",
            "Ingreso",
            "Mes"
          ],
          [
            {
              "fecha": "2024-01-05"
            },
            "  ana",
            "Norte",
            "Laptop",
            2,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-01-12"
            },
            "LUIS ",
            "Sur",
            "Mouse",
            10,
            150,
            null,
            null
          ],
          [
            {
              "fecha": "2024-01-20"
            },
            "Eva",
            "Norte",
            "Teclado",
            5,
            500,
            null,
            null
          ],
          [
            {
              "fecha": "2024-01-28"
            },
            "ana ",
            "Norte",
            "Mouse",
            8,
            150,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-03"
            },
            "CARLOS",
            "Sur",
            "Laptop",
            1,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-10"
            },
            "marta",
            "Este",
            "Teclado",
            4,
            500,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-14"
            },
            "luis",
            "Sur",
            "Laptop",
            3,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-21"
            },
            "EVA",
            "Norte",
            "Laptop",
            2,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-27"
            },
            "Marta ",
            "Este",
            "Mouse",
            6,
            150,
            null,
            null
          ],
          [
            {
              "fecha": "2024-03-04"
            },
            "carlos",
            "Sur",
            "Teclado",
            3,
            500,
            null,
            null
          ],
          [
            {
              "fecha": "2024-03-11"
            },
            " ANA",
            "Norte",
            "Laptop",
            1,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-03-18"
            },
            "Luis",
            "Sur",
            "Teclado",
            6,
            500,
            null,
            null
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "G2",
          "formula": "=E2*F2",
          "esperado": 6000
        },
        {
          "celda": "H2",
          "formula": "=MES(A2)",
          "esperado": 1
        },
        {
          "celda": "I2",
          "formula": "=NOMPROPIO(ESPACIOS(B2))",
          "esperado": "Ana"
        },
        {
          "celda": "I3",
          "formula": "=NOMPROPIO(ESPACIOS(B3))",
          "esperado": "Luis"
        }
      ],
      "nota": "Ingreso, mes y vendedor limpio se calculan con fórmulas por fila y se copian hacia abajo."
    },
    "errorFrecuente": {
      "codigo": "=SUMAR.SI(B2:B13;\"Ana\";G2:G13)",
      "explicacion": "Sin limpiar la columna, `SUMAR.SI` con «Ana» solo encuentra las filas escritas exactamente así («Ana» o «ana», porque no distingue mayúsculas) pero **no** las que tienen espacios sobrantes («ana », « ANA»). El resultado sale incompleto sin que Excel avise. Por eso se limpian primero los datos."
    },
    "practicaGuiada": {
      "id": "m37-l1-practica",
      "enunciado": "Escribe en I2 la fórmula que deja limpio el nombre del vendedor (sin espacios de más y con la inicial en mayúscula). Se copia a las 12 filas.",
      "hoja": {
        "celdas": [
          [
            "Fecha",
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Precio",
            "Ingreso",
            "Mes"
          ],
          [
            {
              "fecha": "2024-01-05"
            },
            "  ana",
            "Norte",
            "Laptop",
            2,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-01-12"
            },
            "LUIS ",
            "Sur",
            "Mouse",
            10,
            150,
            null,
            null
          ],
          [
            {
              "fecha": "2024-01-20"
            },
            "Eva",
            "Norte",
            "Teclado",
            5,
            500,
            null,
            null
          ],
          [
            {
              "fecha": "2024-01-28"
            },
            "ana ",
            "Norte",
            "Mouse",
            8,
            150,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-03"
            },
            "CARLOS",
            "Sur",
            "Laptop",
            1,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-10"
            },
            "marta",
            "Este",
            "Teclado",
            4,
            500,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-14"
            },
            "luis",
            "Sur",
            "Laptop",
            3,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-21"
            },
            "EVA",
            "Norte",
            "Laptop",
            2,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-27"
            },
            "Marta ",
            "Este",
            "Mouse",
            6,
            150,
            null,
            null
          ],
          [
            {
              "fecha": "2024-03-04"
            },
            "carlos",
            "Sur",
            "Teclado",
            3,
            500,
            null,
            null
          ],
          [
            {
              "fecha": "2024-03-11"
            },
            " ANA",
            "Norte",
            "Laptop",
            1,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-03-18"
            },
            "Luis",
            "Sur",
            "Teclado",
            6,
            500,
            null,
            null
          ]
        ],
        "encabezado": true
      },
      "celda": "I2",
      "formulaInicial": "=",
      "solucion": "=NOMPROPIO(ESPACIOS(B2))",
      "esperado": [
        "Ana",
        "Luis",
        "Eva",
        "Ana",
        "Carlos",
        "Marta",
        "Luis",
        "Eva",
        "Marta",
        "Carlos",
        "Ana",
        "Luis"
      ],
      "rellenarFilas": 12,
      "pistas": [
        "Primero ESPACIOS(B2) y después NOMPROPIO."
      ]
    },
    "reto": {
      "id": "m37-l1-reto",
      "enunciado": "Escribe en H2 la fórmula que extrae el **mes** (número 1–12) de la fecha de la columna A. Se copia a las 12 filas.",
      "hoja": {
        "celdas": [
          [
            "Fecha",
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Precio",
            "Ingreso",
            "Mes"
          ],
          [
            {
              "fecha": "2024-01-05"
            },
            "  ana",
            "Norte",
            "Laptop",
            2,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-01-12"
            },
            "LUIS ",
            "Sur",
            "Mouse",
            10,
            150,
            null,
            null
          ],
          [
            {
              "fecha": "2024-01-20"
            },
            "Eva",
            "Norte",
            "Teclado",
            5,
            500,
            null,
            null
          ],
          [
            {
              "fecha": "2024-01-28"
            },
            "ana ",
            "Norte",
            "Mouse",
            8,
            150,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-03"
            },
            "CARLOS",
            "Sur",
            "Laptop",
            1,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-10"
            },
            "marta",
            "Este",
            "Teclado",
            4,
            500,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-14"
            },
            "luis",
            "Sur",
            "Laptop",
            3,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-21"
            },
            "EVA",
            "Norte",
            "Laptop",
            2,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-02-27"
            },
            "Marta ",
            "Este",
            "Mouse",
            6,
            150,
            null,
            null
          ],
          [
            {
              "fecha": "2024-03-04"
            },
            "carlos",
            "Sur",
            "Teclado",
            3,
            500,
            null,
            null
          ],
          [
            {
              "fecha": "2024-03-11"
            },
            " ANA",
            "Norte",
            "Laptop",
            1,
            3000,
            null,
            null
          ],
          [
            {
              "fecha": "2024-03-18"
            },
            "Luis",
            "Sur",
            "Teclado",
            6,
            500,
            null,
            null
          ]
        ],
        "encabezado": true
      },
      "celda": "H2",
      "formulaInicial": "=",
      "solucion": "=MES(A2)",
      "esperado": [
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        3,
        3,
        3
      ],
      "rellenarFilas": 12,
      "pistas": [
        "Usa la función MES sobre la fecha de la fila (A2)."
      ]
    },
    "verificacion": [
      {
        "id": "m37-l1-q1",
        "pregunta": "¿Por qué es importante limpiar la columna Vendedor antes de analizar?",
        "opciones": [
          "Para que se vea más bonita",
          "Porque el mismo nombre escrito de varias formas se trata como valores distintos y los totales salen incompletos",
          "Porque Excel no admite mayúsculas",
          "No es importante"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Las variantes («ana », «ANA») impiden agrupar correctamente."
      },
      {
        "id": "m37-l1-q2",
        "pregunta": "¿Dónde conviene escribir las fórmulas de limpieza?",
        "opciones": [
          "Sobre los datos originales",
          "En columnas nuevas, conservando los datos originales",
          "En otro libro sin relación",
          "No se deben usar fórmulas"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Así se puede revisar y repetir el proceso sin perder el dato original."
      }
    ],
    "resumen": [
      "Revisa la calidad de los datos antes de analizar.",
      "Corrige con fórmulas en columnas nuevas (ESPACIOS, NOMPROPIO, MES, unidades × precio).",
      "Los datos sucios dan totales incompletos sin avisar."
    ],
    "proximoPaso": "Con los datos listos, resumiremos las ventas con condiciones.",
    "conceptos": [
      "proyecto-excel-datos"
    ]
  },
  {
    "id": "m37-l2",
    "moduloId": "modulo-37",
    "motor": "excel",
    "titulo": "Proyecto: resume las ventas por región, producto y mes",
    "objetivo": "Responder preguntas de negocio sumando y contando con condiciones sobre la tabla ya limpia.",
    "porQueImporta": "Ahora que los datos son confiables, se pueden responder las preguntas: ¿dónde se vende más?, ¿qué producto domina?, ¿cómo evolucionan los meses?",
    "concepto": "Con la tabla limpia (vendedores normalizados y las columnas **Ingreso** y **Mes** ya calculadas) usaremos:\n\n- `SUMAR.SI` para totales por un solo criterio (región, producto, mes).\n- `SUMAR.SI.CONJUNTO` para cruzar dos criterios (un vendedor en un mes).\n- `CONTAR.SI` para contar ventas.\n\nCada total se puede verificar sumando a mano un subconjunto: es la mejor defensa contra errores de rango o de criterio. Además, la suma de los totales por región debe coincidir con el total general de la columna Ingreso.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            "Norte",
            10
          ],
          [
            "Sur",
            20
          ],
          [
            "Norte",
            30
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=SUMAR.SI(A1:A3;\"Norte\";B1:B3)",
          "esperado": 40
        },
        {
          "formula": "=SUMA(B1:B3)",
          "esperado": 60
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Fecha",
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Precio",
            "Ingreso",
            "Mes"
          ],
          [
            {
              "fecha": "2024-01-05"
            },
            "Ana",
            "Norte",
            "Laptop",
            2,
            3000,
            "=E2*F2",
            "=MES(A2)"
          ],
          [
            {
              "fecha": "2024-01-12"
            },
            "Luis",
            "Sur",
            "Mouse",
            10,
            150,
            "=E3*F3",
            "=MES(A3)"
          ],
          [
            {
              "fecha": "2024-01-20"
            },
            "Eva",
            "Norte",
            "Teclado",
            5,
            500,
            "=E4*F4",
            "=MES(A4)"
          ],
          [
            {
              "fecha": "2024-01-28"
            },
            "Ana",
            "Norte",
            "Mouse",
            8,
            150,
            "=E5*F5",
            "=MES(A5)"
          ],
          [
            {
              "fecha": "2024-02-03"
            },
            "Carlos",
            "Sur",
            "Laptop",
            1,
            3000,
            "=E6*F6",
            "=MES(A6)"
          ],
          [
            {
              "fecha": "2024-02-10"
            },
            "Marta",
            "Este",
            "Teclado",
            4,
            500,
            "=E7*F7",
            "=MES(A7)"
          ],
          [
            {
              "fecha": "2024-02-14"
            },
            "Luis",
            "Sur",
            "Laptop",
            3,
            3000,
            "=E8*F8",
            "=MES(A8)"
          ],
          [
            {
              "fecha": "2024-02-21"
            },
            "Eva",
            "Norte",
            "Laptop",
            2,
            3000,
            "=E9*F9",
            "=MES(A9)"
          ],
          [
            {
              "fecha": "2024-02-27"
            },
            "Marta",
            "Este",
            "Mouse",
            6,
            150,
            "=E10*F10",
            "=MES(A10)"
          ],
          [
            {
              "fecha": "2024-03-04"
            },
            "Carlos",
            "Sur",
            "Teclado",
            3,
            500,
            "=E11*F11",
            "=MES(A11)"
          ],
          [
            {
              "fecha": "2024-03-11"
            },
            "Ana",
            "Norte",
            "Laptop",
            1,
            3000,
            "=E12*F12",
            "=MES(A12)"
          ],
          [
            {
              "fecha": "2024-03-18"
            },
            "Luis",
            "Sur",
            "Teclado",
            6,
            500,
            "=E13*F13",
            "=MES(A13)"
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "J1",
          "formula": "=SUMA(G2:G13)",
          "esperado": 39600
        },
        {
          "celda": "J2",
          "formula": "=SUMAR.SI(C2:C13;\"Sur\";G2:G13)",
          "esperado": 18000
        },
        {
          "celda": "J3",
          "formula": "=SUMAR.SI(D2:D13;\"Laptop\";G2:G13)",
          "esperado": 27000
        },
        {
          "celda": "J4",
          "formula": "=SUMAR.SI(H2:H13;2;G2:G13)",
          "esperado": 20900
        },
        {
          "celda": "J5",
          "formula": "=CONTAR.SI(D2:D13;\"Mouse\")",
          "esperado": 3
        }
      ],
      "nota": "El ingreso total del trimestre es 39 600. Febrero es el mejor mes (20 900) y las laptops generan la mayor parte del ingreso."
    },
    "errorFrecuente": {
      "codigo": "=SUMAR.SI(C2:C13;\"Norte\")",
      "explicacion": "Al omitir el rango de suma, `SUMAR.SI` suma las celdas del propio rango de criterio (la columna de regiones, que son textos) y devuelve `0`. Hay que indicar qué columna sumar: `=SUMAR.SI(C2:C13;\"Norte\";G2:G13)`."
    },
    "practicaGuiada": {
      "id": "m37-l2-practica",
      "enunciado": "Calcula el ingreso total de la región «Norte» con SUMAR.SI sobre las columnas Región (C) e Ingreso (G).",
      "hoja": {
        "celdas": [
          [
            "Fecha",
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Precio",
            "Ingreso",
            "Mes"
          ],
          [
            {
              "fecha": "2024-01-05"
            },
            "Ana",
            "Norte",
            "Laptop",
            2,
            3000,
            "=E2*F2",
            "=MES(A2)"
          ],
          [
            {
              "fecha": "2024-01-12"
            },
            "Luis",
            "Sur",
            "Mouse",
            10,
            150,
            "=E3*F3",
            "=MES(A3)"
          ],
          [
            {
              "fecha": "2024-01-20"
            },
            "Eva",
            "Norte",
            "Teclado",
            5,
            500,
            "=E4*F4",
            "=MES(A4)"
          ],
          [
            {
              "fecha": "2024-01-28"
            },
            "Ana",
            "Norte",
            "Mouse",
            8,
            150,
            "=E5*F5",
            "=MES(A5)"
          ],
          [
            {
              "fecha": "2024-02-03"
            },
            "Carlos",
            "Sur",
            "Laptop",
            1,
            3000,
            "=E6*F6",
            "=MES(A6)"
          ],
          [
            {
              "fecha": "2024-02-10"
            },
            "Marta",
            "Este",
            "Teclado",
            4,
            500,
            "=E7*F7",
            "=MES(A7)"
          ],
          [
            {
              "fecha": "2024-02-14"
            },
            "Luis",
            "Sur",
            "Laptop",
            3,
            3000,
            "=E8*F8",
            "=MES(A8)"
          ],
          [
            {
              "fecha": "2024-02-21"
            },
            "Eva",
            "Norte",
            "Laptop",
            2,
            3000,
            "=E9*F9",
            "=MES(A9)"
          ],
          [
            {
              "fecha": "2024-02-27"
            },
            "Marta",
            "Este",
            "Mouse",
            6,
            150,
            "=E10*F10",
            "=MES(A10)"
          ],
          [
            {
              "fecha": "2024-03-04"
            },
            "Carlos",
            "Sur",
            "Teclado",
            3,
            500,
            "=E11*F11",
            "=MES(A11)"
          ],
          [
            {
              "fecha": "2024-03-11"
            },
            "Ana",
            "Norte",
            "Laptop",
            1,
            3000,
            "=E12*F12",
            "=MES(A12)"
          ],
          [
            {
              "fecha": "2024-03-18"
            },
            "Luis",
            "Sur",
            "Teclado",
            6,
            500,
            "=E13*F13",
            "=MES(A13)"
          ]
        ],
        "encabezado": true
      },
      "celda": "J2",
      "formulaInicial": "=",
      "solucion": "=SUMAR.SI(C2:C13;\"Norte\";G2:G13)",
      "esperado": 18700,
      "pistas": [
        "El criterio se busca en la columna Región: C2:C13.",
        "Se suma la columna Ingreso: G2:G13."
      ]
    },
    "reto": {
      "id": "m37-l2-reto",
      "enunciado": "Calcula cuánto vendió **Luis** (en ingreso) en el mes de **marzo** (mes 3) con SUMAR.SI.CONJUNTO, usando las columnas Vendedor (B) y Mes (H).",
      "hoja": {
        "celdas": [
          [
            "Fecha",
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Precio",
            "Ingreso",
            "Mes"
          ],
          [
            {
              "fecha": "2024-01-05"
            },
            "Ana",
            "Norte",
            "Laptop",
            2,
            3000,
            "=E2*F2",
            "=MES(A2)"
          ],
          [
            {
              "fecha": "2024-01-12"
            },
            "Luis",
            "Sur",
            "Mouse",
            10,
            150,
            "=E3*F3",
            "=MES(A3)"
          ],
          [
            {
              "fecha": "2024-01-20"
            },
            "Eva",
            "Norte",
            "Teclado",
            5,
            500,
            "=E4*F4",
            "=MES(A4)"
          ],
          [
            {
              "fecha": "2024-01-28"
            },
            "Ana",
            "Norte",
            "Mouse",
            8,
            150,
            "=E5*F5",
            "=MES(A5)"
          ],
          [
            {
              "fecha": "2024-02-03"
            },
            "Carlos",
            "Sur",
            "Laptop",
            1,
            3000,
            "=E6*F6",
            "=MES(A6)"
          ],
          [
            {
              "fecha": "2024-02-10"
            },
            "Marta",
            "Este",
            "Teclado",
            4,
            500,
            "=E7*F7",
            "=MES(A7)"
          ],
          [
            {
              "fecha": "2024-02-14"
            },
            "Luis",
            "Sur",
            "Laptop",
            3,
            3000,
            "=E8*F8",
            "=MES(A8)"
          ],
          [
            {
              "fecha": "2024-02-21"
            },
            "Eva",
            "Norte",
            "Laptop",
            2,
            3000,
            "=E9*F9",
            "=MES(A9)"
          ],
          [
            {
              "fecha": "2024-02-27"
            },
            "Marta",
            "Este",
            "Mouse",
            6,
            150,
            "=E10*F10",
            "=MES(A10)"
          ],
          [
            {
              "fecha": "2024-03-04"
            },
            "Carlos",
            "Sur",
            "Teclado",
            3,
            500,
            "=E11*F11",
            "=MES(A11)"
          ],
          [
            {
              "fecha": "2024-03-11"
            },
            "Ana",
            "Norte",
            "Laptop",
            1,
            3000,
            "=E12*F12",
            "=MES(A12)"
          ],
          [
            {
              "fecha": "2024-03-18"
            },
            "Luis",
            "Sur",
            "Teclado",
            6,
            500,
            "=E13*F13",
            "=MES(A13)"
          ]
        ],
        "encabezado": true
      },
      "celda": "J2",
      "formulaInicial": "=",
      "solucion": "=SUMAR.SI.CONJUNTO(G2:G13;B2:B13;\"Luis\";H2:H13;3)",
      "esperado": 3000,
      "pistas": [
        "El primer argumento es el rango que se suma: Ingreso (G2:G13).",
        "Luego dos pares rango–criterio: Vendedor = «Luis» y Mes = 3."
      ]
    },
    "verificacion": [
      {
        "id": "m37-l2-q1",
        "pregunta": "El ingreso total es 39 600 y los totales por región son Norte 18 700, Sur 18 000 y Este 2 900. ¿Qué verificación confirma que los cálculos están bien?",
        "opciones": [
          "Que Norte sea mayor que Sur",
          "Que 18 700 + 18 000 + 2 900 sea igual a 39 600",
          "Que Este sea el menor",
          "Ninguna es necesaria"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La suma de las partes debe igualar el total: es una comprobación de consistencia."
      },
      {
        "id": "m37-l2-q2",
        "pregunta": "¿Cuándo usarías `SUMAR.SI.CONJUNTO` en lugar de `SUMAR.SI`?",
        "opciones": [
          "Cuando hay más de 10 filas",
          "Cuando hay que cumplir dos o más condiciones a la vez",
          "Cuando los datos son texto",
          "Nunca"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "SUMAR.SI aplica un solo criterio; el conjunto permite varios."
      }
    ],
    "resumen": [
      "SUMAR.SI y SUMAR.SI.CONJUNTO responden preguntas por grupo y por cruces.",
      "Comprueba que las partes sumen el total.",
      "Indica siempre el rango de suma para evitar resultados de 0."
    ],
    "proximoPaso": "Calcularemos las comisiones de cada vendedor con búsquedas por tramos.",
    "conceptos": [
      "proyecto-excel-resumen"
    ]
  },
  {
    "id": "m37-l3",
    "moduloId": "modulo-37",
    "motor": "excel",
    "titulo": "Proyecto: calcula las comisiones por tramos",
    "objetivo": "Asignar a cada vendedor su tasa de comisión según su ingreso total y calcular lo que se le debe pagar.",
    "porQueImporta": "Las reglas de comisión por tramos se mantienen mejor en una tabla que en SI anidados: si cambia la política, se edita la tabla y todas las fórmulas siguen valiendo.",
    "concepto": "La política de comisiones de Aurora paga una tasa creciente según el **ingreso total** de cada vendedor en el trimestre:\n\n| Ingreso total desde | Tasa |\n|---|---|\n| 0 | 2 % |\n| 3 000 | 4 % |\n| 5 000 | 6 % |\n| 10 000 | 8 % |\n\nPasos:\n\n1. La **tasa** de cada vendedor se busca con `BUSCARV(ingreso; tabla; 2; VERDADERO)` (coincidencia aproximada: la tabla está ordenada de menor a mayor).\n2. La **comisión** es el ingreso total multiplicado por la tasa.\n\nUn vendedor con 8 500 queda en el tramo «desde 5 000» (6 %), porque es el mayor tramo que no supera su ingreso.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            0,
            0.02
          ],
          [
            3000,
            0.04
          ],
          [
            5000,
            0.06
          ],
          [
            10000,
            0.08
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=BUSCARV(2900;A1:B4;2;VERDADERO)",
          "esperado": 0.02
        },
        {
          "formula": "=BUSCARV(3000;A1:B4;2;VERDADERO)",
          "esperado": 0.04
        },
        {
          "formula": "=BUSCARV(8500;A1:B4;2;VERDADERO)",
          "esperado": 0.06
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Ingreso total",
            "Comisión %",
            "Comisión",
            "Tramo desde",
            "Tasa"
          ],
          [
            "Ana",
            10200,
            null,
            null,
            0,
            0.02
          ],
          [
            "Luis",
            13500,
            null,
            null,
            3000,
            0.04
          ],
          [
            "Eva",
            8500,
            null,
            null,
            5000,
            0.06
          ],
          [
            "Carlos",
            4500,
            null,
            null,
            10000,
            0.08
          ],
          [
            "Marta",
            2900
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "C2",
          "formula": "=BUSCARV(B2;$E$2:$F$5;2;VERDADERO)",
          "formato": "porcentaje",
          "esperado": 0.08
        },
        {
          "celda": "C6",
          "formula": "=BUSCARV(B6;$E$2:$F$5;2;VERDADERO)",
          "formato": "porcentaje",
          "esperado": 0.02
        },
        {
          "celda": "D2",
          "formula": "=B2*BUSCARV(B2;$E$2:$F$5;2;VERDADERO)",
          "esperado": 816
        }
      ]
    },
    "errorFrecuente": {
      "codigo": "=BUSCARV(B2;$E$2:$F$5;2;FALSO)",
      "explicacion": "Con `FALSO` (coincidencia exacta), solo se encuentra un ingreso idéntico a 0, 3000, 5000 o 10000. Cualquier otro valor (10 200, 8 500…) devuelve `#N/D`. Para asignar tramos se usa la coincidencia aproximada (`VERDADERO`) con la tabla ordenada de menor a mayor."
    },
    "practicaGuiada": {
      "id": "m37-l3-practica",
      "enunciado": "Escribe en C2 la fórmula que busca la tasa de comisión de cada vendedor según su ingreso total (columna B) en la tabla de tramos (E2:F5). Se copia a las 5 filas; fija la tabla con $.",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Ingreso total",
            "Comisión %",
            "Comisión",
            "Tramo desde",
            "Tasa"
          ],
          [
            "Ana",
            10200,
            null,
            null,
            0,
            0.02
          ],
          [
            "Luis",
            13500,
            null,
            null,
            3000,
            0.04
          ],
          [
            "Eva",
            8500,
            null,
            null,
            5000,
            0.06
          ],
          [
            "Carlos",
            4500,
            null,
            null,
            10000,
            0.08
          ],
          [
            "Marta",
            2900
          ]
        ],
        "encabezado": true
      },
      "celda": "C2",
      "formulaInicial": "=",
      "solucion": "=BUSCARV(B2;$E$2:$F$5;2;VERDADERO)",
      "esperado": [
        0.08,
        0.08,
        0.06,
        0.04,
        0.02
      ],
      "rellenarFilas": 5,
      "formato": "porcentaje",
      "tolerancia": 1e-09,
      "pistas": [
        "El ingreso del vendedor (B2) es relativo.",
        "La tabla de tramos queda fija con $E$2:$F$5 y la búsqueda es aproximada (VERDADERO)."
      ]
    },
    "reto": {
      "id": "m37-l3-reto",
      "enunciado": "Escribe en D2 la fórmula que calcula la comisión en dinero: ingreso total × tasa del tramo (buscada con BUSCARV dentro de la misma fórmula). Se copia a las 5 filas.",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Ingreso total",
            "Comisión %",
            "Comisión",
            "Tramo desde",
            "Tasa"
          ],
          [
            "Ana",
            10200,
            null,
            null,
            0,
            0.02
          ],
          [
            "Luis",
            13500,
            null,
            null,
            3000,
            0.04
          ],
          [
            "Eva",
            8500,
            null,
            null,
            5000,
            0.06
          ],
          [
            "Carlos",
            4500,
            null,
            null,
            10000,
            0.08
          ],
          [
            "Marta",
            2900
          ]
        ],
        "encabezado": true
      },
      "celda": "D2",
      "formulaInicial": "=",
      "solucion": "=B2*BUSCARV(B2;$E$2:$F$5;2;VERDADERO)",
      "esperado": [
        816,
        1080,
        510,
        180,
        58
      ],
      "rellenarFilas": 5,
      "tolerancia": 1e-09,
      "pistas": [
        "Multiplica el ingreso (B2) por la tasa que devuelve BUSCARV.",
        "No olvides fijar la tabla de tramos con $."
      ]
    },
    "verificacion": [
      {
        "id": "m37-l3-q1",
        "pregunta": "Eva tiene un ingreso de 8 500. ¿Qué tasa le corresponde según la tabla de tramos?",
        "opciones": [
          "4 %",
          "6 %",
          "8 %",
          "2 %"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "El mayor tramo que no supera 8 500 es «desde 5 000», con 6 %."
      },
      {
        "id": "m37-l3-q2",
        "pregunta": "¿Qué ventaja tiene guardar los tramos en una tabla y no en SI anidados?",
        "opciones": [
          "Ninguna",
          "Si la política cambia, se edita la tabla sin tocar las fórmulas",
          "Que es más rápido de escribir",
          "Que evita usar BUSCARV"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Separar los datos de la lógica hace la hoja más fácil de mantener."
      }
    ],
    "resumen": [
      "BUSCARV con coincidencia aproximada asigna tramos.",
      "Guarda las reglas en una tabla, no dentro de las fórmulas.",
      "Fija la tabla con $ para poder copiar la fórmula."
    ],
    "proximoPaso": "Cerraremos el proyecto con el resumen de resultados y las conclusiones.",
    "conceptos": [
      "proyecto-excel-comisiones"
    ]
  },
  {
    "id": "m37-l4",
    "moduloId": "modulo-37",
    "motor": "excel",
    "titulo": "Proyecto: reporte final y conclusiones",
    "objetivo": "Resumir los hallazgos con fórmulas que construyen las frases del reporte, y reconocer lo que los datos no permiten concluir.",
    "porQueImporta": "El análisis termina en una decisión. Un reporte claro dice qué se encontró, con qué cifras, y con qué cautelas. Las fórmulas permiten que el texto del reporte se actualice solo cuando cambian los datos.",
    "concepto": "**Resultados del proyecto**\n\n- Ingreso total del trimestre: **39 600**.\n- Por región: **Norte 18 700**, Sur 18 000 y Este 2 900. Norte y Sur están muy parejos; Este es mucho menor.\n- Por producto: las laptops concentran la mayor parte del ingreso.\n- Comisiones: se pagan de 58 (Marta) a 1 080 (Luis), según los tramos.\n\nPara que el reporte se actualice solo, se construyen las frases con fórmulas: `=INDICE(…; COINCIDIR(MAX(…); …; 0))` para obtener **el nombre** de la mejor región, y `&` para unir texto y números.\n\n**Limitaciones que debe mencionar el reporte**\n\n- Son solo **12 ventas** de **un trimestre**: no permiten hablar de tendencias ni de estacionalidad.\n- Hay **ingresos, no utilidades**: faltan los costos, así que no se sabe cuánto ganó la tienda.\n- La diferencia entre Norte y Sur (700) es pequeña respecto al total: con tan pocos datos no se puede afirmar que Norte sea «mejor» de forma sólida.\n- Los porcentajes redondeados pueden no sumar exactamente 100.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            "Región",
            "Ingreso"
          ],
          [
            "Norte",
            18700
          ],
          [
            "Sur",
            18000
          ],
          [
            "Este",
            2900
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "formula": "=INDICE(A2:A4;COINCIDIR(MAX(B2:B4);B2:B4;0))",
          "esperado": "Norte"
        },
        {
          "formula": "=MAX(B2:B4)",
          "esperado": 18700
        },
        {
          "formula": "=SUMA(B2:B4)",
          "esperado": 39600
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Región",
            "Ingreso"
          ],
          [
            "Norte",
            18700
          ],
          [
            "Sur",
            18000
          ],
          [
            "Este",
            2900
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "D1",
          "formula": "=\"Total del trimestre: \"&SUMA(B2:B4)",
          "esperado": "Total del trimestre: 39600"
        },
        {
          "celda": "D2",
          "formula": "=\"Mejor región: \"&INDICE(A2:A4;COINCIDIR(MAX(B2:B4);B2:B4;0))",
          "esperado": "Mejor región: Norte"
        },
        {
          "celda": "D3",
          "formula": "=A2&\" aporta el \"&REDONDEAR(B2/SUMA($B$2:$B$4)*100;0)&\" % del ingreso\"",
          "esperado": "Norte aporta el 47 % del ingreso"
        }
      ],
      "nota": "Los textos del reporte cambian solos si cambian las cifras."
    },
    "errorFrecuente": {
      "codigo": "=\"Norte vendió más que Sur\"",
      "explicacion": "Escribir la conclusión a mano en la celda congela el texto: si mañana cambian los datos, el reporte seguirá diciendo lo mismo aunque deje de ser cierto. Construye las frases con fórmulas, y revisa que la conclusión sea justificable (aquí la diferencia es pequeña)."
    },
    "practicaGuiada": {
      "id": "m37-l4-practica",
      "enunciado": "Escribe en D2 una fórmula que devuelva el **nombre de la región con mayor ingreso** usando INDICE, COINCIDIR y MAX.",
      "hoja": {
        "celdas": [
          [
            "Región",
            "Ingreso"
          ],
          [
            "Norte",
            18700
          ],
          [
            "Sur",
            18000
          ],
          [
            "Este",
            2900
          ]
        ],
        "encabezado": true
      },
      "celda": "D2",
      "formulaInicial": "=",
      "solucion": "=INDICE(A2:A4;COINCIDIR(MAX(B2:B4);B2:B4;0))",
      "esperado": "Norte",
      "pistas": [
        "MAX(B2:B4) da el mayor ingreso.",
        "COINCIDIR(…; B2:B4; 0) da su posición e INDICE(A2:A4; posición) devuelve la región."
      ]
    },
    "reto": {
      "id": "m37-l4-reto",
      "enunciado": "Construye para cada región la frase «Norte aporta el 47 % del ingreso» (nombre de la región, el porcentaje redondeado a un entero y el texto fijo). Escribe la fórmula en D2 (se copia a las 3 filas; fija el total con $).",
      "hoja": {
        "celdas": [
          [
            "Región",
            "Ingreso"
          ],
          [
            "Norte",
            18700
          ],
          [
            "Sur",
            18000
          ],
          [
            "Este",
            2900
          ]
        ],
        "encabezado": true
      },
      "celda": "D2",
      "formulaInicial": "=",
      "solucion": "=A2&\" aporta el \"&REDONDEAR(B2/SUMA($B$2:$B$4)*100;0)&\" % del ingreso\"",
      "esperado": [
        "Norte aporta el 47 % del ingreso",
        "Sur aporta el 45 % del ingreso",
        "Este aporta el 7 % del ingreso"
      ],
      "rellenarFilas": 3,
      "pistas": [
        "Une con & el nombre (A2), el texto fijo y el porcentaje.",
        "El porcentaje es B2/SUMA($B$2:$B$4)*100 redondeado con REDONDEAR(…;0)."
      ]
    },
    "verificacion": [
      {
        "id": "m37-l4-q1",
        "pregunta": "Los datos son 12 ventas de un solo trimestre. ¿Qué conclusión NO está justificada?",
        "opciones": [
          "El ingreso total del trimestre fue 39 600",
          "Norte es la región con más ingreso en este trimestre",
          "Las ventas crecerán en el próximo año",
          "Este tuvo el menor ingreso"
        ],
        "respuestaCorrecta": 2,
        "explicacion": "Con un solo trimestre no se puede proyectar el futuro ni hablar de tendencias."
      },
      {
        "id": "m37-l4-q2",
        "pregunta": "¿Por qué conviene construir las frases del reporte con fórmulas?",
        "opciones": [
          "Porque queda más corto",
          "Porque el texto se actualiza solo cuando cambian los datos",
          "Porque Excel lo exige",
          "Para ocultar las cifras"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Una frase escrita a mano queda desactualizada cuando cambian los datos."
      }
    ],
    "resumen": [
      "INDICE + COINCIDIR + MAX devuelven el nombre del mejor elemento.",
      "Une textos y cifras con & para que el reporte se actualice solo.",
      "Un buen reporte incluye las limitaciones de los datos."
    ],
    "proximoPaso": "Con esto completas el curso de Excel para análisis de datos. El siguiente paso en la ruta es Python, para analizar datos a mayor escala.",
    "conceptos": [
      "proyecto-excel-reporte"
    ]
  },
]
