import type { Lesson } from '../../types'

export const module35Lessons: Lesson[] = [
  {
    "id": "m35-l1",
    "moduloId": "modulo-35",
    "motor": "excel",
    "titulo": "Análisis con condiciones: CONTAR.SI, SUMAR.SI y PROMEDIO.SI",
    "objetivo": "Contar, sumar y promediar solo las filas que cumplen una condición.",
    "porQueImporta": "La mayoría de las preguntas de negocio tienen un «solo»: ¿cuánto vendió solo la región Norte?, ¿cuántos pedidos fueron solo de laptops? Estas tres funciones responden sin filtrar ni copiar datos.",
    "concepto": "Las tres funciones aplican un **criterio** a un rango:\n\n```\n=CONTAR.SI(rango; criterio)\n=SUMAR.SI(rango; criterio; [rango_suma])\n=PROMEDIO.SI(rango; criterio; [rango_promedio])\n```\n\n- En `SUMAR.SI` y `PROMEDIO.SI`, el **rango_suma** (lo que se suma o promedia) va **al final**. Si lo omites, se suma el mismo rango del criterio.\n- El **criterio** puede ser un valor (`\"Norte\"`, `300`), una celda (`H2`) o una comparación escrita **entre comillas**: `\">2000\"`, `\"<>Sur\"`, `\">=\"&H2` (para usar el valor de una celda en una comparación).\n- Los textos del criterio **no distinguen mayúsculas de minúsculas**, y admiten comodines: `*` (cualquier cantidad de caracteres) y `?` (un carácter). `\"Co*\"` coincide con «Colombia» y «Costa Rica».\n\nLos textos siempre llevan comillas dobles. Un nombre sin comillas, como `Norte`, Excel lo toma por una función o un nombre definido y da `#¿NOMBRE?`.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            "Norte",
            100
          ],
          [
            "Sur",
            200
          ],
          [
            "Norte",
            300
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=CONTAR.SI(A1:A3;\"Norte\")",
          "esperado": 2
        },
        {
          "formula": "=SUMAR.SI(A1:A3;\"Norte\";B1:B3)",
          "esperado": 400
        },
        {
          "formula": "=PROMEDIO.SI(A1:A3;\"Norte\";B1:B3)",
          "esperado": 200
        },
        {
          "formula": "=CONTAR.SI(B1:B3;\">150\")",
          "esperado": 2
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Ingreso"
          ],
          [
            "Ana",
            "Norte",
            "Laptop",
            2,
            6000
          ],
          [
            "Luis",
            "Sur",
            "Mouse",
            10,
            1500
          ],
          [
            "Eva",
            "Norte",
            "Teclado",
            5,
            2500
          ],
          [
            "Ana",
            "Norte",
            "Mouse",
            8,
            1200
          ],
          [
            "Carlos",
            "Sur",
            "Laptop",
            1,
            3000
          ],
          [
            "Marta",
            "Este",
            "Teclado",
            4,
            2000
          ],
          [
            "Luis",
            "Sur",
            "Laptop",
            3,
            9000
          ],
          [
            "Eva",
            "Norte",
            "Laptop",
            2,
            6000
          ],
          [
            "Marta",
            "Este",
            "Mouse",
            6,
            900
          ],
          [
            "Carlos",
            "Sur",
            "Teclado",
            3,
            1500
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "H1",
          "formula": "=CONTAR.SI(A2:A11;\"Ana\")",
          "esperado": 2
        },
        {
          "celda": "H2",
          "formula": "=SUMAR.SI(B2:B11;\"Norte\";E2:E11)",
          "esperado": 15700
        },
        {
          "celda": "H3",
          "formula": "=CONTAR.SI(E2:E11;\">2000\")",
          "esperado": 5
        },
        {
          "celda": "H4",
          "formula": "=PROMEDIO.SI(C2:C11;\"Laptop\";E2:E11)",
          "esperado": 6000
        },
        {
          "celda": "H5",
          "formula": "=CONTAR.SI(B2:B11;\"<>Sur\")",
          "esperado": 6
        }
      ],
      "nota": "Cada fórmula mira un solo rango para decidir qué filas cuentan y otro (el último) para saber qué sumar o promediar."
    },
    "errorFrecuente": {
      "codigo": "=CONTAR.SI(A2:A11;Ana)",
      "explicacion": "Falta entrecomillar el texto: sin comillas, Excel busca una función o nombre llamado «Ana» y devuelve `#¿NOMBRE?`. Debe ser `=CONTAR.SI(A2:A11;\"Ana\")` o apuntar a una celda que contenga «Ana»."
    },
    "practicaGuiada": {
      "id": "m35-l1-practica",
      "enunciado": "Calcula el ingreso total de la región «Sur» con SUMAR.SI.",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Ingreso"
          ],
          [
            "Ana",
            "Norte",
            "Laptop",
            2,
            6000
          ],
          [
            "Luis",
            "Sur",
            "Mouse",
            10,
            1500
          ],
          [
            "Eva",
            "Norte",
            "Teclado",
            5,
            2500
          ],
          [
            "Ana",
            "Norte",
            "Mouse",
            8,
            1200
          ],
          [
            "Carlos",
            "Sur",
            "Laptop",
            1,
            3000
          ],
          [
            "Marta",
            "Este",
            "Teclado",
            4,
            2000
          ],
          [
            "Luis",
            "Sur",
            "Laptop",
            3,
            9000
          ],
          [
            "Eva",
            "Norte",
            "Laptop",
            2,
            6000
          ],
          [
            "Marta",
            "Este",
            "Mouse",
            6,
            900
          ],
          [
            "Carlos",
            "Sur",
            "Teclado",
            3,
            1500
          ]
        ],
        "encabezado": true
      },
      "celda": "H2",
      "formulaInicial": "=",
      "solucion": "=SUMAR.SI(B2:B11;\"Sur\";E2:E11)",
      "esperado": 15000,
      "pistas": [
        "El rango del criterio es la columna Región (B2:B11).",
        "El rango que se suma es la columna Ingreso (E2:E11) y va al final."
      ]
    },
    "reto": {
      "id": "m35-l1-reto",
      "enunciado": "Calcula el promedio de unidades de los pedidos de «Mouse» con PROMEDIO.SI.",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Ingreso"
          ],
          [
            "Ana",
            "Norte",
            "Laptop",
            2,
            6000
          ],
          [
            "Luis",
            "Sur",
            "Mouse",
            10,
            1500
          ],
          [
            "Eva",
            "Norte",
            "Teclado",
            5,
            2500
          ],
          [
            "Ana",
            "Norte",
            "Mouse",
            8,
            1200
          ],
          [
            "Carlos",
            "Sur",
            "Laptop",
            1,
            3000
          ],
          [
            "Marta",
            "Este",
            "Teclado",
            4,
            2000
          ],
          [
            "Luis",
            "Sur",
            "Laptop",
            3,
            9000
          ],
          [
            "Eva",
            "Norte",
            "Laptop",
            2,
            6000
          ],
          [
            "Marta",
            "Este",
            "Mouse",
            6,
            900
          ],
          [
            "Carlos",
            "Sur",
            "Teclado",
            3,
            1500
          ]
        ],
        "encabezado": true
      },
      "celda": "H2",
      "formulaInicial": "=",
      "solucion": "=PROMEDIO.SI(C2:C11;\"Mouse\";D2:D11)",
      "esperado": 8,
      "pistas": [
        "El criterio se aplica a la columna Producto (C2:C11).",
        "Se promedia la columna Unidades (D2:D11)."
      ]
    },
    "verificacion": [
      {
        "id": "m35-l1-q1",
        "pregunta": "En `=SUMAR.SI(B2:B11;\"Norte\";E2:E11)`, ¿qué rango es el que se suma?",
        "opciones": [
          "B2:B11",
          "E2:E11",
          "Los dos",
          "Ninguno"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "El último argumento es el rango que se suma; el primero es donde se busca el criterio."
      },
      {
        "id": "m35-l1-q2",
        "pregunta": "¿Qué cuenta `=CONTAR.SI(E2:E11;\">2000\")`?",
        "opciones": [
          "Las celdas con exactamente 2000",
          "Las celdas con un valor mayor que 2000",
          "Las celdas con texto «>2000»",
          "Todas las celdas"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La comparación escrita entre comillas se interpreta como condición: mayor que 2000."
      }
    ],
    "resumen": [
      "CONTAR.SI, SUMAR.SI y PROMEDIO.SI aplican un criterio a un rango.",
      "El rango que se suma o promedia va al final.",
      "Los criterios de texto o comparación van entre comillas y admiten comodines `*` y `?`."
    ],
    "proximoPaso": "Veremos cómo combinar varias condiciones con SUMAR.SI.CONJUNTO y CONTAR.SI.CONJUNTO.",
    "conceptos": [
      "contar-si",
      "sumar-si",
      "promedio-si"
    ]
  },
  {
    "id": "m35-l2",
    "moduloId": "modulo-35",
    "motor": "excel",
    "titulo": "Varios criterios a la vez: SUMAR.SI.CONJUNTO y CONTAR.SI.CONJUNTO",
    "objetivo": "Combinar dos o más condiciones (todas deben cumplirse) para contar o sumar.",
    "porQueImporta": "Las preguntas reales suelen cruzar variables: laptops vendidas en el Norte, pedidos de Ana mayores a cierto valor. Los «conjuntos» se escriben una sola vez y evitan filtros manuales.",
    "concepto": "```\n=SUMAR.SI.CONJUNTO(rango_suma; rango1; criterio1; rango2; criterio2; …)\n=CONTAR.SI.CONJUNTO(rango1; criterio1; rango2; criterio2; …)\n```\n\n- Una fila se incluye solo si cumple **todos** los criterios (es un «y»).\n- Todos los rangos deben tener el **mismo tamaño**; si no, el resultado es `#¡VALOR!`.\n- **Ojo con el orden**: en `SUMAR.SI` el rango que se suma va al final, pero en `SUMAR.SI.CONJUNTO` va **primero**.\n- Los criterios funcionan igual que en CONTAR.SI: valores, comparaciones entre comillas, comodines.\n- Si necesitas «o» (por ejemplo, Norte **o** Sur), suma dos funciones: `=SUMAR.SI(…\"Norte\"…)+SUMAR.SI(…\"Sur\"…)`.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            "A",
            "x",
            10
          ],
          [
            "A",
            "y",
            20
          ],
          [
            "B",
            "x",
            30
          ],
          [
            "A",
            "x",
            40
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=SUMAR.SI.CONJUNTO(C1:C4;A1:A4;\"A\";B1:B4;\"x\")",
          "esperado": 50
        },
        {
          "formula": "=CONTAR.SI.CONJUNTO(A1:A4;\"A\";C1:C4;\">15\")",
          "esperado": 2
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Ingreso"
          ],
          [
            "Ana",
            "Norte",
            "Laptop",
            2,
            6000
          ],
          [
            "Luis",
            "Sur",
            "Mouse",
            10,
            1500
          ],
          [
            "Eva",
            "Norte",
            "Teclado",
            5,
            2500
          ],
          [
            "Ana",
            "Norte",
            "Mouse",
            8,
            1200
          ],
          [
            "Carlos",
            "Sur",
            "Laptop",
            1,
            3000
          ],
          [
            "Marta",
            "Este",
            "Teclado",
            4,
            2000
          ],
          [
            "Luis",
            "Sur",
            "Laptop",
            3,
            9000
          ],
          [
            "Eva",
            "Norte",
            "Laptop",
            2,
            6000
          ],
          [
            "Marta",
            "Este",
            "Mouse",
            6,
            900
          ],
          [
            "Carlos",
            "Sur",
            "Teclado",
            3,
            1500
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "H1",
          "formula": "=SUMAR.SI.CONJUNTO(E2:E11;B2:B11;\"Norte\";C2:C11;\"Laptop\")",
          "esperado": 12000
        },
        {
          "celda": "H2",
          "formula": "=CONTAR.SI.CONJUNTO(B2:B11;\"Sur\";D2:D11;\">2\")",
          "esperado": 3
        },
        {
          "celda": "H3",
          "formula": "=SUMAR.SI.CONJUNTO(D2:D11;A2:A11;\"Luis\";C2:C11;\"<>Mouse\")",
          "esperado": 3
        },
        {
          "celda": "H4",
          "formula": "=SUMAR.SI(B2:B11;\"Norte\";E2:E11)+SUMAR.SI(B2:B11;\"Este\";E2:E11)",
          "esperado": 18600
        }
      ],
      "nota": "La última fórmula suma «Norte» o «Este» usando dos SUMAR.SI."
    },
    "errorFrecuente": {
      "codigo": "=SUMAR.SI.CONJUNTO(B2:B11;E2:E11;\"Norte\")",
      "explicacion": "Se confundió el orden: en `SUMAR.SI.CONJUNTO` el rango que se suma va **primero** (`E2:E11`), y después van los pares rango–criterio. Con el orden cambiado, la fórmula intenta sumar la columna de regiones y busca el criterio en la de ingresos."
    },
    "practicaGuiada": {
      "id": "m35-l2-practica",
      "enunciado": "Calcula el ingreso de Ana en la región «Norte» (las dos condiciones a la vez) con SUMAR.SI.CONJUNTO.",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Ingreso"
          ],
          [
            "Ana",
            "Norte",
            "Laptop",
            2,
            6000
          ],
          [
            "Luis",
            "Sur",
            "Mouse",
            10,
            1500
          ],
          [
            "Eva",
            "Norte",
            "Teclado",
            5,
            2500
          ],
          [
            "Ana",
            "Norte",
            "Mouse",
            8,
            1200
          ],
          [
            "Carlos",
            "Sur",
            "Laptop",
            1,
            3000
          ],
          [
            "Marta",
            "Este",
            "Teclado",
            4,
            2000
          ],
          [
            "Luis",
            "Sur",
            "Laptop",
            3,
            9000
          ],
          [
            "Eva",
            "Norte",
            "Laptop",
            2,
            6000
          ],
          [
            "Marta",
            "Este",
            "Mouse",
            6,
            900
          ],
          [
            "Carlos",
            "Sur",
            "Teclado",
            3,
            1500
          ]
        ],
        "encabezado": true
      },
      "celda": "H2",
      "formulaInicial": "=",
      "solucion": "=SUMAR.SI.CONJUNTO(E2:E11;A2:A11;\"Ana\";B2:B11;\"Norte\")",
      "esperado": 7200,
      "pistas": [
        "El primer argumento es el rango que se suma: Ingreso (E2:E11).",
        "Después: rango Vendedor con «Ana» y rango Región con «Norte»."
      ]
    },
    "reto": {
      "id": "m35-l2-reto",
      "enunciado": "Cuenta cuántas ventas de «Laptop» tuvieron un ingreso de 6000 o más, con CONTAR.SI.CONJUNTO.",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Ingreso"
          ],
          [
            "Ana",
            "Norte",
            "Laptop",
            2,
            6000
          ],
          [
            "Luis",
            "Sur",
            "Mouse",
            10,
            1500
          ],
          [
            "Eva",
            "Norte",
            "Teclado",
            5,
            2500
          ],
          [
            "Ana",
            "Norte",
            "Mouse",
            8,
            1200
          ],
          [
            "Carlos",
            "Sur",
            "Laptop",
            1,
            3000
          ],
          [
            "Marta",
            "Este",
            "Teclado",
            4,
            2000
          ],
          [
            "Luis",
            "Sur",
            "Laptop",
            3,
            9000
          ],
          [
            "Eva",
            "Norte",
            "Laptop",
            2,
            6000
          ],
          [
            "Marta",
            "Este",
            "Mouse",
            6,
            900
          ],
          [
            "Carlos",
            "Sur",
            "Teclado",
            3,
            1500
          ]
        ],
        "encabezado": true
      },
      "celda": "H2",
      "formulaInicial": "=",
      "solucion": "=CONTAR.SI.CONJUNTO(C2:C11;\"Laptop\";E2:E11;\">=6000\")",
      "esperado": 3,
      "pistas": [
        "No hay rango de suma: solo pares rango–criterio.",
        "El segundo criterio es una comparación entre comillas: \">=6000\"."
      ]
    },
    "verificacion": [
      {
        "id": "m35-l2-q1",
        "pregunta": "¿Qué orden de argumentos tiene `SUMAR.SI.CONJUNTO`?",
        "opciones": [
          "Rango de criterio y al final el rango que se suma",
          "Primero el rango que se suma, luego pares rango–criterio",
          "Solo pares rango–criterio",
          "Es igual que SUMAR.SI"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "En el «conjunto» el rango de suma va primero."
      },
      {
        "id": "m35-l2-q2",
        "pregunta": "¿Cómo se suman las ventas de la región Norte **o** Sur?",
        "opciones": [
          "Con un solo SUMAR.SI.CONJUNTO con dos criterios sobre la misma columna",
          "Sumando dos SUMAR.SI (uno por región)",
          "Con CONTAR.SI",
          "No se puede"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Los criterios de un conjunto se combinan con «y»; para «o» se suman dos resultados."
      }
    ],
    "resumen": [
      "SUMAR.SI.CONJUNTO y CONTAR.SI.CONJUNTO exigen que se cumplan todos los criterios.",
      "En SUMAR.SI.CONJUNTO el rango que se suma va primero.",
      "Para condiciones «o», suma varias funciones."
    ],
    "proximoPaso": "Veremos cómo buscar valores en tablas con BUSCARV, INDICE y COINCIDIR.",
    "conceptos": [
      "sumar-si-conjunto",
      "contar-si-conjunto"
    ]
  },
  {
    "id": "m35-l3",
    "moduloId": "modulo-35",
    "motor": "excel",
    "titulo": "Búsquedas: BUSCARV, INDICE y COINCIDIR",
    "objetivo": "Traer un dato de una tabla de consulta (por ejemplo, el precio de un producto) buscando por una clave.",
    "porQueImporta": "Los datos viven en tablas distintas: los pedidos por un lado, el catálogo de precios por otro. Las búsquedas los unen sin copiar y pegar, y se actualizan solas cuando cambia el catálogo.",
    "concepto": "`BUSCARV(valor_buscado; tabla; columna; [coincidencia])` busca el valor en la **primera columna** de la tabla y devuelve el dato de la columna indicada, en esa misma fila.\n\n```\n=BUSCARV(\"Mouse\"; E2:F4; 2; FALSO)\n```\n\n- **columna** es el número de columna *dentro de la tabla* (1 es la primera, donde se busca).\n- El cuarto argumento decide el tipo de coincidencia: **`FALSO`** (o 0) = **exacta**. `VERDADERO` (o se omite) = **aproximada**, que exige la primera columna **ordenada de menor a mayor** y sirve para tramos (lo veremos en otra lección).\n- Si no encuentra el valor, devuelve `#N/D`.\n- Limitación: BUSCARV solo busca **hacia la derecha** de la clave.\n\n`INDICE(rango; fila)` devuelve el dato de una posición, y `COINCIDIR(valor; rango; 0)` devuelve **en qué posición** está el valor. Juntos no tienen la limitación de la izquierda:\n\n```\n=INDICE(A2:A4; COINCIDIR(\"Mouse\"; B2:B4; 0))\n```\n\nAl copiar una fórmula de búsqueda, fija la tabla con `$` (`$E$2:$F$4`) para que no se desplace.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            "Laptop",
            3000
          ],
          [
            "Mouse",
            150
          ],
          [
            "Teclado",
            500
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=BUSCARV(\"Mouse\";A1:B3;2;FALSO)",
          "esperado": 150
        },
        {
          "formula": "=BUSCARV(\"Monitor\";A1:B3;2;FALSO)",
          "esperado": {
            "error": "#N/D"
          }
        },
        {
          "formula": "=COINCIDIR(\"Teclado\";A1:A3;0)",
          "esperado": 3
        },
        {
          "formula": "=INDICE(B1:B3;3)",
          "esperado": 500
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Precio",
            "Producto"
          ],
          [
            3000,
            "Laptop"
          ],
          [
            150,
            "Mouse"
          ],
          [
            500,
            "Teclado"
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "E1",
          "formula": "=BUSCARV(\"Mouse\";A2:B4;1;FALSO)",
          "esperado": {
            "error": "#N/D"
          }
        },
        {
          "celda": "E2",
          "formula": "=INDICE(A2:A4;COINCIDIR(\"Mouse\";B2:B4;0))",
          "esperado": 150
        }
      ],
      "nota": "La clave («Mouse») está en la columna B, a la derecha del precio. BUSCARV busca siempre en la **primera** columna de la tabla (la A), donde «Mouse» no aparece, y devuelve `#N/D`. INDICE + COINCIDIR no tiene esa limitación: COINCIDIR halla la posición en la columna B e INDICE devuelve el precio de la columna A en esa misma posición."
    },
    "errorFrecuente": {
      "codigo": "=BUSCARV(A2;$E$2:$F$4;2)",
      "explicacion": "Falta el cuarto argumento. Cuando se omite, BUSCARV usa la coincidencia **aproximada**, que supone la primera columna ordenada. Con datos desordenados puede devolver un precio equivocado o `#N/D` aunque el producto exista. Para búsquedas por código o nombre, escribe siempre `FALSO` al final: `=BUSCARV(A2;$E$2:$F$4;2;FALSO)`."
    },
    "practicaGuiada": {
      "id": "m35-l3-practica",
      "enunciado": "Busca el precio del «Teclado» en el catálogo (E2:F4) con BUSCARV y coincidencia exacta.",
      "hoja": {
        "celdas": [
          [
            "Producto",
            "Cantidad",
            "Total",
            "",
            "Producto",
            "Precio"
          ],
          [
            "Laptop",
            2,
            null,
            null,
            "Laptop",
            3000
          ],
          [
            "Mouse",
            10,
            null,
            null,
            "Mouse",
            150
          ],
          [
            "Teclado",
            4,
            null,
            null,
            "Teclado",
            500
          ]
        ],
        "encabezado": true
      },
      "celda": "H2",
      "formulaInicial": "=",
      "solucion": "=BUSCARV(\"Teclado\";E2:F4;2;FALSO)",
      "esperado": 500,
      "pistas": [
        "La tabla de consulta es E2:F4: el producto está en la primera columna.",
        "Pide la columna 2 (precio) y escribe FALSO para coincidencia exacta."
      ]
    },
    "reto": {
      "id": "m35-l3-reto",
      "enunciado": "Calcula el total de cada pedido (cantidad × precio del catálogo). Escribe la fórmula en C2: el precio se busca con BUSCARV usando el producto de A2 (se copia a las 3 filas, así que fija la tabla con $).",
      "hoja": {
        "celdas": [
          [
            "Producto",
            "Cantidad",
            "Total",
            "",
            "Producto",
            "Precio"
          ],
          [
            "Laptop",
            2,
            null,
            null,
            "Laptop",
            3000
          ],
          [
            "Mouse",
            10,
            null,
            null,
            "Mouse",
            150
          ],
          [
            "Teclado",
            4,
            null,
            null,
            "Teclado",
            500
          ]
        ],
        "encabezado": true
      },
      "celda": "C2",
      "formulaInicial": "=",
      "solucion": "=B2*BUSCARV(A2;$E$2:$F$4;2;FALSO)",
      "esperado": [
        6000,
        1500,
        2000
      ],
      "rellenarFilas": 3,
      "pistas": [
        "La cantidad es B2 y el producto que se busca es A2 (relativos).",
        "La tabla del catálogo debe quedar fija: $E$2:$F$4."
      ]
    },
    "verificacion": [
      {
        "id": "m35-l3-q1",
        "pregunta": "¿Qué significa el `FALSO` al final de `BUSCARV(...;2;FALSO)`?",
        "opciones": [
          "Que la fórmula está desactivada",
          "Que se busca una coincidencia exacta",
          "Que la tabla no está ordenada",
          "Que devuelve un texto"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "FALSO pide coincidencia exacta; VERDADERO (o nada) pide aproximada."
      },
      {
        "id": "m35-l3-q2",
        "pregunta": "¿Qué limitación tiene BUSCARV?",
        "opciones": [
          "Solo busca números",
          "Solo devuelve datos de columnas a la derecha de la columna de búsqueda",
          "No funciona con texto",
          "Solo busca en tablas de 2 columnas"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "BUSCARV busca en la primera columna de la tabla y devuelve columnas posteriores; para ir a la izquierda se usa INDICE + COINCIDIR."
      }
    ],
    "resumen": [
      "BUSCARV busca en la primera columna de una tabla y devuelve la columna indicada.",
      "Usa `FALSO` para coincidencia exacta; sin él, la búsqueda es aproximada.",
      "INDICE + COINCIDIR permite buscar hacia cualquier lado."
    ],
    "proximoPaso": "Veremos BUSCARX, la búsqueda moderna, y la coincidencia aproximada para tramos.",
    "conceptos": [
      "buscarv",
      "indice-coincidir"
    ]
  },
  {
    "id": "m35-l4",
    "moduloId": "modulo-35",
    "motor": "excel",
    "titulo": "BUSCARX y búsquedas aproximadas por tramos",
    "objetivo": "Usar BUSCARX para buscar en cualquier dirección y la coincidencia aproximada para asignar valores por tramos (comisiones, descuentos, categorías).",
    "porQueImporta": "BUSCARX corrige las limitaciones de BUSCARV, y las búsquedas por tramos reemplazan largos SI anidados por una tabla fácil de mantener.",
    "concepto": "**BUSCARX** (`XLOOKUP`) está disponible en **Microsoft 365, Excel 2021 y versiones posteriores** (y en Excel para la web). Si tu Excel es anterior, usa INDICE + COINCIDIR.\n\n```\n=BUSCARX(valor; rango_búsqueda; rango_resultado; [si_no_se_encuentra]; [modo_coincidencia]; [modo_búsqueda])\n```\n\n- No cuenta columnas: indicas directamente el **rango donde buscar** y el **rango del que devolver**. Por eso puede buscar hacia la izquierda.\n- Por defecto la coincidencia es **exacta** (no hace falta escribir FALSO).\n- `si_no_se_encuentra` evita el `#N/D`: `=BUSCARX(A2;E2:E4;F2:F4;\"sin precio\")`.\n- `modo_coincidencia`: `0` exacta, `-1` exacta o el **siguiente menor**, `1` exacta o el **siguiente mayor**, `2` con comodines.\n\n**Tramos con BUSCARV aproximada.** Si la primera columna de la tabla está **ordenada de menor a mayor**, `BUSCARV(valor; tabla; col; VERDADERO)` devuelve la fila del **mayor valor que no supere** al buscado. Es ideal para tramos:\n\n| Ventas desde | Comisión |\n|---|---|\n| 0 | 2 % |\n| 1000 | 5 % |\n| 5000 | 8 % |\n\nUna venta de 5200 cae en el tramo «desde 5000». Si no ordenas la columna, el resultado no es fiable.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            "Laptop",
            3000
          ],
          [
            "Mouse",
            150
          ],
          [
            "Teclado",
            500
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=BUSCARX(\"Mouse\";A1:A3;B1:B3)",
          "esperado": 150
        },
        {
          "formula": "=BUSCARX(\"Monitor\";A1:A3;B1:B3;\"sin precio\")",
          "esperado": "sin precio"
        },
        {
          "formula": "=BUSCARX(200;B1:B3;A1:A3;;-1)",
          "esperado": "Mouse"
        },
        {
          "formula": "=BUSCARX(200;B1:B3;A1:A3;;1)",
          "esperado": "Teclado"
        }
      ],
      "nota": "La tercera fórmula busca 200 en los precios: como no existe, con modo -1 devuelve el siguiente **menor** (150, Mouse); con modo 1 devuelve el siguiente **mayor** (500, Teclado). Al buscar «hacia la izquierda» el precio está en la columna B y el nombre en la A."
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Tramo desde",
            "Comisión"
          ],
          [
            0,
            0.02
          ],
          [
            1000,
            0.05
          ],
          [
            5000,
            0.08
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "D1",
          "formula": "=BUSCARV(800;A2:B4;2;VERDADERO)",
          "esperado": 0.02
        },
        {
          "celda": "D2",
          "formula": "=BUSCARV(1000;A2:B4;2;VERDADERO)",
          "esperado": 0.05
        },
        {
          "celda": "D3",
          "formula": "=BUSCARV(5200;A2:B4;2;VERDADERO)",
          "esperado": 0.08
        },
        {
          "celda": "D4",
          "formula": "=BUSCARX(5200;A2:A4;B2:B4;;-1)",
          "esperado": 0.08
        }
      ],
      "nota": "La coincidencia aproximada exige la primera columna ordenada de menor a mayor."
    },
    "errorFrecuente": {
      "codigo": "=BUSCARV(B2;$D$2:$E$4;2;FALSO)",
      "explicacion": "Para asignar tramos hace falta la coincidencia **aproximada**. Con `FALSO` solo se encuentra una venta idéntica a 0, 1000 o 5000; cualquier otro valor (800 o 5200) devuelve `#N/D`. Para tramos se escribe `VERDADERO` (o se omite) y se ordena la tabla de menor a mayor."
    },
    "practicaGuiada": {
      "id": "m35-l4-practica",
      "enunciado": "Busca el precio del «Mouse» con BUSCARX (rango de búsqueda: A2:A4; rango de resultado: B2:B4).",
      "hoja": {
        "celdas": [
          [
            "Producto",
            "Precio"
          ],
          [
            "Laptop",
            3000
          ],
          [
            "Mouse",
            150
          ],
          [
            "Teclado",
            500
          ]
        ],
        "encabezado": true
      },
      "celda": "D2",
      "formulaInicial": "=",
      "solucion": "=BUSCARX(\"Mouse\";A2:A4;B2:B4)",
      "esperado": 150,
      "pistas": [
        "BUSCARX(valor; dónde buscar; qué devolver).",
        "No hace falta indicar coincidencia exacta: es la opción por defecto."
      ]
    },
    "reto": {
      "id": "m35-l4-reto",
      "enunciado": "Asigna a cada venta de la columna A su comisión según la tabla de tramos (D2:E4, ordenada de menor a mayor). Escribe la fórmula en B2 con BUSCARV de coincidencia aproximada (se copia a las 3 filas; fija la tabla con $).",
      "hoja": {
        "celdas": [
          [
            "Ventas",
            "Comisión",
            "",
            "Tramo desde",
            "Comisión"
          ],
          [
            800,
            null,
            null,
            0,
            0.02
          ],
          [
            1000,
            null,
            null,
            1000,
            0.05
          ],
          [
            5200,
            null,
            null,
            5000,
            0.08
          ]
        ],
        "encabezado": true
      },
      "celda": "B2",
      "formulaInicial": "=",
      "solucion": "=BUSCARV(A2;$D$2:$E$4;2;VERDADERO)",
      "esperado": [
        0.02,
        0.05,
        0.08
      ],
      "rellenarFilas": 3,
      "tolerancia": 1e-09,
      "pistas": [
        "La venta de cada fila (A2) es relativa; la tabla de tramos debe quedar fija.",
        "El cuarto argumento es VERDADERO para la coincidencia aproximada."
      ]
    },
    "verificacion": [
      {
        "id": "m35-l4-q1",
        "pregunta": "¿Cuál es una ventaja de BUSCARX sobre BUSCARV?",
        "opciones": [
          "Que funciona en todas las versiones de Excel",
          "Que puede buscar hacia la izquierda y no depende del número de columna",
          "Que no necesita rangos",
          "Que siempre devuelve un número"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "BUSCARX recibe el rango de búsqueda y el de resultado por separado; pero solo está en Excel 2021/Microsoft 365 y posteriores."
      },
      {
        "id": "m35-l4-q2",
        "pregunta": "Una tabla de tramos usa BUSCARV con coincidencia aproximada. ¿Qué debe cumplirse?",
        "opciones": [
          "La primera columna debe estar ordenada de menor a mayor",
          "La tabla debe tener solo 2 filas",
          "Debe usarse FALSO",
          "Los valores deben ser texto"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "La búsqueda aproximada supone la primera columna ordenada ascendentemente."
      }
    ],
    "resumen": [
      "BUSCARX (Excel 2021 / Microsoft 365 y posteriores) busca en cualquier dirección y es exacta por defecto.",
      "La coincidencia aproximada de BUSCARV (VERDADERO) sirve para tramos si la tabla está ordenada.",
      "Si tu Excel no tiene BUSCARX, usa INDICE + COINCIDIR."
    ],
    "proximoPaso": "Cerraremos el módulo con SUMAPRODUCTO y los rankings.",
    "conceptos": [
      "buscarx",
      "busqueda-aproximada"
    ]
  },
  {
    "id": "m35-l5",
    "moduloId": "modulo-35",
    "motor": "excel",
    "titulo": "SUMAPRODUCTO, K.ESIMO.MAYOR y JERARQUIA",
    "objetivo": "Calcular totales ponderados sin columnas auxiliares y ordenar valores (los mayores, los menores y la posición de cada uno).",
    "porQueImporta": "Un ingreso total es unidades × precio sumado por fila; un ranking dice quién va primero. Con estas funciones se resuelven en una sola celda.",
    "concepto": "- `SUMAPRODUCTO(rango1; rango2; …)` multiplica los valores de **la misma posición** en cada rango y suma los productos. Reemplaza una columna auxiliar de «unidades × precio» seguida de una suma.\n- `K.ESIMO.MAYOR(rango; k)` y `K.ESIMO.MENOR(rango; k)` devuelven el *k*-ésimo valor más grande o más pequeño (`k = 1` es el máximo o el mínimo).\n- `JERARQUIA(número; rango; [orden])` dice en qué posición queda un número dentro de un rango. `orden` 0 (o ausente) clasifica de mayor a menor; 1, de menor a mayor. Los empates reciben la misma posición.\n\n`SUMAPRODUCTO` también acepta **condiciones** multiplicando comparaciones:\n\n```\n=SUMAPRODUCTO((A2:A11=\"Norte\")*(E2:E11))\n```\n\nCada comparación da `VERDADERO`/`FALSO`, que al multiplicar valen 1/0. Es la forma de hacer lo que hace SUMAR.SI.CONJUNTO, pero con condiciones más libres.\n\nTodos los rangos de `SUMAPRODUCTO` deben tener el mismo tamaño; si no, el resultado es `#¡VALOR!`.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            1,
            10
          ],
          [
            2,
            20
          ],
          [
            3,
            30
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=SUMAPRODUCTO(A1:A3;B1:B3)",
          "esperado": 140
        },
        {
          "formula": "=K.ESIMO.MAYOR(B1:B3;2)",
          "esperado": 20
        },
        {
          "formula": "=K.ESIMO.MENOR(B1:B3;1)",
          "esperado": 10
        },
        {
          "formula": "=JERARQUIA(20;B1:B3)",
          "esperado": 2
        },
        {
          "formula": "=SUMAPRODUCTO((A1:A3>1)*B1:B3)",
          "esperado": 50
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Unidades",
            "Precio",
            "Ingreso"
          ],
          [
            "Ana",
            10,
            20,
            "=B2*C2"
          ],
          [
            "Luis",
            5,
            45,
            "=B3*C3"
          ],
          [
            "Eva",
            8,
            30,
            "=B4*C4"
          ],
          [
            "Carlos",
            12,
            15,
            "=B5*C5"
          ],
          [
            "Marta",
            6,
            35,
            "=B6*C6"
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "F1",
          "formula": "=SUMAPRODUCTO(B2:B6;C2:C6)",
          "esperado": 1055
        },
        {
          "celda": "F2",
          "formula": "=K.ESIMO.MAYOR(D2:D6;1)",
          "esperado": 240
        },
        {
          "celda": "F3",
          "formula": "=K.ESIMO.MAYOR(D2:D6;2)",
          "esperado": 225
        },
        {
          "celda": "F4",
          "formula": "=JERARQUIA(D2;D2:D6)",
          "esperado": 4
        }
      ],
      "nota": "La columna D ya tiene fórmulas (unidades × precio). `SUMAPRODUCTO(B2:B6;C2:C6)` da el mismo total sin necesitar esa columna."
    },
    "errorFrecuente": {
      "codigo": "=SUMAPRODUCTO(B2:B6;C2:C5)",
      "explicacion": "Los dos rangos tienen tamaños distintos (5 filas contra 4): `SUMAPRODUCTO` exige que coincidan y devuelve `#¡VALOR!`. Revisa que los rangos empiecen y terminen en las mismas filas."
    },
    "practicaGuiada": {
      "id": "m35-l5-practica",
      "enunciado": "Calcula el ingreso total (unidades × precio de todos los vendedores) con una sola fórmula SUMAPRODUCTO sobre las columnas B y C.",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Unidades",
            "Precio",
            "Ingreso"
          ],
          [
            "Ana",
            10,
            20,
            "=B2*C2"
          ],
          [
            "Luis",
            5,
            45,
            "=B3*C3"
          ],
          [
            "Eva",
            8,
            30,
            "=B4*C4"
          ],
          [
            "Carlos",
            12,
            15,
            "=B5*C5"
          ],
          [
            "Marta",
            6,
            35,
            "=B6*C6"
          ]
        ],
        "encabezado": true
      },
      "celda": "F2",
      "formulaInicial": "=",
      "solucion": "=SUMAPRODUCTO(B2:B6;C2:C6)",
      "esperado": 1055,
      "pistas": [
        "Pasa los dos rangos: unidades y precios.",
        "Los rangos deben tener el mismo tamaño: B2:B6 y C2:C6."
      ]
    },
    "reto": {
      "id": "m35-l5-reto",
      "enunciado": "Calcula la posición de cada vendedor según su ingreso (columna D), de mayor a menor. Escribe la fórmula en E2 con JERARQUIA (se copia a las 5 filas; fija el rango con $).",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Unidades",
            "Precio",
            "Ingreso"
          ],
          [
            "Ana",
            10,
            20,
            "=B2*C2"
          ],
          [
            "Luis",
            5,
            45,
            "=B3*C3"
          ],
          [
            "Eva",
            8,
            30,
            "=B4*C4"
          ],
          [
            "Carlos",
            12,
            15,
            "=B5*C5"
          ],
          [
            "Marta",
            6,
            35,
            "=B6*C6"
          ]
        ],
        "encabezado": true
      },
      "celda": "E2",
      "formulaInicial": "=",
      "solucion": "=JERARQUIA(D2;$D$2:$D$6)",
      "esperado": [
        4,
        2,
        1,
        5,
        3
      ],
      "rellenarFilas": 5,
      "pistas": [
        "El número que se clasifica es el ingreso de la fila: D2 (relativo).",
        "El rango con todos los ingresos debe quedar fijo: $D$2:$D$6."
      ]
    },
    "verificacion": [
      {
        "id": "m35-l5-q1",
        "pregunta": "¿Qué hace `=SUMAPRODUCTO(A1:A3;B1:B3)`?",
        "opciones": [
          "Suma A1:A3 y luego B1:B3",
          "Multiplica A1×B1, A2×B2 y A3×B3 y suma los resultados",
          "Multiplica las dos sumas",
          "Cuenta los productos"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Multiplica posición por posición y suma los productos."
      },
      {
        "id": "m35-l5-q2",
        "pregunta": "En `JERARQUIA(número; rango)` sin tercer argumento, el valor más alto del rango obtiene la posición…",
        "opciones": [
          "1",
          "0",
          "La última",
          "Depende del orden de los datos"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Por defecto la clasificación es de mayor a menor: el mayor es el número 1."
      }
    ],
    "resumen": [
      "SUMAPRODUCTO multiplica rangos posición por posición y suma.",
      "K.ESIMO.MAYOR/MENOR devuelven el k-ésimo valor; JERARQUIA da la posición de un número.",
      "Multiplicar comparaciones dentro de SUMAPRODUCTO permite condiciones."
    ],
    "proximoPaso": "En el siguiente módulo limpiaremos y analizaremos datos con herramientas de estadística, tablas dinámicas y gráficos.",
    "conceptos": [
      "sumaproducto",
      "ranking"
    ]
  },
]
