import type { Lesson } from '../../types'

export const module36Lessons: Lesson[] = [
  {
    "id": "m36-l1",
    "moduloId": "modulo-36",
    "motor": "excel",
    "titulo": "Limpieza de datos: texto con espacios y números guardados como texto",
    "objetivo": "Dejar los datos listos para analizar: quitar espacios, unificar mayúsculas, extraer partes de un código y convertir texto en números.",
    "porQueImporta": "Antes de resumir nada hay que limpiar. Un nombre escrito de tres formas cuenta como tres clientes, y un monto guardado como texto no se suma. Esta preparación es buena parte del trabajo real de un analista.",
    "concepto": "Funciones de limpieza más usadas:\n\n| Problema | Función |\n|---|---|\n| Espacios al inicio, al final o repetidos | `ESPACIOS(texto)` |\n| Mayúsculas y minúsculas mezcladas | `NOMPROPIO`, `MAYUSC`, `MINUSC` |\n| Un carácter o palabra que sobra | `SUSTITUIR(texto; antiguo; nuevo)` |\n| Una parte de un código | `IZQUIERDA`, `DERECHA`, `EXTRAE` |\n| Números guardados como texto | `VALOR(texto)` |\n| Comprobar el tipo de dato | `ESNUMERO`, `ESTEXTO` |\n\n**Números como texto.** Si una celda con «350» aparece alineada a la izquierda (o con un triángulo verde en la esquina), es texto: `SUMA` y `PROMEDIO` la **ignoran** en los rangos. `VALOR(\"350\")` la convierte en el número 350.\n\nLas funciones se **anidan**: `=NOMPROPIO(ESPACIOS(B2))` limpia los espacios y luego pone las iniciales en mayúscula.\n\nBuena práctica: no sobrescribas los datos originales. Escribe las fórmulas de limpieza en columnas nuevas y trabaja con esas.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            "  hola   mundo ",
            "350"
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=ESPACIOS(A1)",
          "esperado": "hola mundo"
        },
        {
          "formula": "=MAYUSC(ESPACIOS(A1))",
          "esperado": "HOLA MUNDO"
        },
        {
          "formula": "=ESNUMERO(B1)",
          "esperado": false
        },
        {
          "formula": "=VALOR(B1)*2",
          "esperado": 700
        },
        {
          "formula": "=ESNUMERO(VALOR(B1))",
          "esperado": true
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Código",
            "Cliente",
            "Monto"
          ],
          [
            "PED-0045",
            "  ana   LÓPEZ",
            "350"
          ],
          [
            "PED-0102",
            "LUIS pérez ",
            "1200"
          ],
          [
            "PED-0007",
            "Eva  rojas",
            "80"
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "D2",
          "formula": "=SUSTITUIR(A2;\"PED-\";\"\")",
          "esperado": "0045"
        },
        {
          "celda": "D2",
          "formula": "=VALOR(DERECHA(A2;4))",
          "esperado": 45
        },
        {
          "celda": "E3",
          "formula": "=NOMPROPIO(ESPACIOS(B3))",
          "esperado": "Luis Pérez"
        },
        {
          "celda": "F4",
          "formula": "=VALOR(C4)+20",
          "esperado": 100
        }
      ],
      "nota": "Los montos de la columna C son **texto** (en una hoja real aparecerían alineados a la izquierda). Si copias estos datos a Excel, se pegarán como números; para reproducir el problema, escribe un apóstrofo delante (por ejemplo `'350`) o dale formato Texto a la celda."
    },
    "errorFrecuente": {
      "codigo": "=SUMA(C2:C4)",
      "explicacion": "Si los montos están guardados como texto («350», «1200», «80»), `SUMA` los ignora y devuelve `0` sin mostrar ningún error. Convierte los montos con `VALOR` (en una columna auxiliar) o con la opción «Convertir en número» del triángulo verde, y suma después."
    },
    "practicaGuiada": {
      "id": "m36-l1-practica",
      "enunciado": "Limpia el nombre del cliente de la columna B: sin espacios de más y con la inicial de cada palabra en mayúscula. Escribe la fórmula en D2 (se copia a las 3 filas).",
      "hoja": {
        "celdas": [
          [
            "Código",
            "Cliente",
            "Monto"
          ],
          [
            "PED-0045",
            "  ana   LÓPEZ",
            "350"
          ],
          [
            "PED-0102",
            "LUIS pérez ",
            "1200"
          ],
          [
            "PED-0007",
            "Eva  rojas",
            "80"
          ]
        ],
        "encabezado": true
      },
      "celda": "D2",
      "formulaInicial": "=",
      "solucion": "=NOMPROPIO(ESPACIOS(B2))",
      "esperado": [
        "Ana López",
        "Luis Pérez",
        "Eva Rojas"
      ],
      "rellenarFilas": 3,
      "pistas": [
        "Primero ESPACIOS(B2) para quitar los espacios sobrantes.",
        "Después NOMPROPIO sobre ese resultado."
      ]
    },
    "reto": {
      "id": "m36-l1-reto",
      "enunciado": "El código de pedido termina con 4 dígitos (por ejemplo «PED-0045»). Extrae el número del pedido como **número** (45, 102, 7). Escribe la fórmula en D2 (se copia a las 3 filas).",
      "hoja": {
        "celdas": [
          [
            "Código",
            "Cliente",
            "Monto"
          ],
          [
            "PED-0045",
            "  ana   LÓPEZ",
            "350"
          ],
          [
            "PED-0102",
            "LUIS pérez ",
            "1200"
          ],
          [
            "PED-0007",
            "Eva  rojas",
            "80"
          ]
        ],
        "encabezado": true
      },
      "celda": "D2",
      "formulaInicial": "=",
      "solucion": "=VALOR(DERECHA(A2;4))",
      "esperado": [
        45,
        102,
        7
      ],
      "rellenarFilas": 3,
      "pistas": [
        "DERECHA(A2;4) devuelve los 4 últimos caracteres, pero como texto («0045»).",
        "VALOR convierte ese texto en número y elimina los ceros iniciales."
      ]
    },
    "verificacion": [
      {
        "id": "m36-l1-q1",
        "pregunta": "Una columna de montos aparece alineada a la izquierda y `SUMA` da 0. ¿Qué pasa probablemente?",
        "opciones": [
          "Las celdas están vacías",
          "Los montos están guardados como texto",
          "La fórmula está mal escrita",
          "Hay demasiadas filas"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "SUMA ignora el texto de un rango; los números alineados a la izquierda suelen ser texto."
      },
      {
        "id": "m36-l1-q2",
        "pregunta": "¿Qué hace `=ESPACIOS(\"  ana   lópez \")`?",
        "opciones": [
          "Quita todos los espacios",
          "Quita los espacios del inicio y el final y deja uno solo entre palabras",
          "Agrega espacios",
          "Convierte a mayúsculas"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "ESPACIOS deja un único espacio entre palabras y elimina los de los extremos."
      }
    ],
    "resumen": [
      "Limpia con ESPACIOS, NOMPROPIO, SUSTITUIR y las funciones de extracción de texto.",
      "VALOR convierte texto en número; SUMA ignora los números guardados como texto.",
      "No sobrescribas los datos originales: limpia en columnas nuevas."
    ],
    "proximoPaso": "Pasaremos a describir los datos con las funciones estadísticas de Excel.",
    "conceptos": [
      "limpieza-de-texto",
      "valor-texto-a-numero"
    ]
  },
  {
    "id": "m36-l2",
    "moduloId": "modulo-36",
    "motor": "excel",
    "titulo": "Estadística descriptiva en Excel: MEDIANA, DESVEST y cuartiles",
    "objetivo": "Resumir una variable con medidas de centro y dispersión y detectar valores atípicos con la regla del rango intercuartílico.",
    "porQueImporta": "El promedio solo no basta: un dato extremo lo arrastra. Excel trae las funciones para describir bien una columna; son las mismas ideas del curso de Estadística descriptiva.",
    "concepto": "| Función | Qué devuelve |\n|---|---|\n| `PROMEDIO(rango)` | Media aritmética |\n| `MEDIANA(rango)` | Valor central (resistente a extremos) |\n| `MODA.UNO(rango)` | Valor más frecuente (`#N/D` si ningún valor se repite) |\n| `DESVEST.M(rango)` | Desviación estándar **muestral** (divide entre n − 1) |\n| `DESVEST.P(rango)` | Desviación estándar **poblacional** (divide entre n) |\n| `CUARTIL.INC(rango; q)` | Cuartiles (q = 0 mínimo, 1 → Q1, 2 → mediana, 3 → Q3, 4 máximo) |\n| `PERCENTIL.INC(rango; k)` | Percentil, con *k* entre 0 y 1 (0,9 = percentil 90) |\n\nSi tus datos son una **muestra**, usa `DESVEST.M`; si son **toda la población**, `DESVEST.P`.\n\n**Valores atípicos (regla del IQR).** Con `Q1` y `Q3` se calcula `IQR = Q3 − Q1`; es atípico lo que queda por encima de `Q3 + 1,5 × IQR` o por debajo de `Q1 − 1,5 × IQR`. En las fórmulas de este curso escribe `3/2` en lugar de `1,5` para evitar confusiones entre la coma decimal y el separador de argumentos.\n\nEn las versiones antiguas de Excel existían `DESVEST`, `CUARTIL` y `PERCENTIL`; siguen funcionando, pero conviene usar las versiones con `.M`, `.P` e `.INC`.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            2
          ],
          [
            4
          ],
          [
            4
          ],
          [
            4
          ],
          [
            5
          ],
          [
            5
          ],
          [
            7
          ],
          [
            9
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=PROMEDIO(A1:A8)",
          "esperado": 5
        },
        {
          "formula": "=MEDIANA(A1:A8)",
          "esperado": 4.5
        },
        {
          "formula": "=MODA.UNO(A1:A8)",
          "esperado": 4
        },
        {
          "formula": "=DESVEST.P(A1:A8)",
          "esperado": 2
        },
        {
          "formula": "=REDONDEAR(DESVEST.M(A1:A8);2)",
          "esperado": 2.14
        }
      ]
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Días de entrega"
          ],
          [
            3
          ],
          [
            4
          ],
          [
            4
          ],
          [
            5
          ],
          [
            5
          ],
          [
            5
          ],
          [
            6
          ],
          [
            7
          ],
          [
            8
          ],
          [
            30
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "C1",
          "formula": "=PROMEDIO(A2:A11)",
          "esperado": 7.7
        },
        {
          "celda": "C2",
          "formula": "=MEDIANA(A2:A11)",
          "esperado": 5
        },
        {
          "celda": "C3",
          "formula": "=CUARTIL.INC(A2:A11;1)",
          "esperado": 4.25
        },
        {
          "celda": "C4",
          "formula": "=CUARTIL.INC(A2:A11;3)",
          "esperado": 6.75
        },
        {
          "celda": "C5",
          "formula": "=PERCENTIL.INC(A2:A11;9/10)",
          "esperado": 10.2
        }
      ],
      "nota": "El promedio (7,7) queda muy por encima de la mediana (5) porque el pedido de 30 días arrastra la media. Es la señal clásica de un valor atípico."
    },
    "errorFrecuente": {
      "codigo": "=PROMEDIO(A2:A11)",
      "explicacion": "Reportar «los pedidos tardan en promedio 7,7 días» describe mal al pedido típico (5 días): un solo pedido de 30 días eleva el promedio. Con datos sesgados o con atípicos, informa también la mediana (`=MEDIANA(A2:A11)`) y revisa los valores extremos antes de resumir."
    },
    "practicaGuiada": {
      "id": "m36-l2-practica",
      "enunciado": "Calcula la mediana de los días de entrega.",
      "hoja": {
        "celdas": [
          [
            "Días de entrega"
          ],
          [
            3
          ],
          [
            4
          ],
          [
            4
          ],
          [
            5
          ],
          [
            5
          ],
          [
            5
          ],
          [
            6
          ],
          [
            7
          ],
          [
            8
          ],
          [
            30
          ]
        ],
        "encabezado": true
      },
      "celda": "C2",
      "formulaInicial": "=",
      "solucion": "=MEDIANA(A2:A11)",
      "esperado": 5,
      "pistas": [
        "Usa MEDIANA sobre el rango A2:A11."
      ]
    },
    "reto": {
      "id": "m36-l2-reto",
      "enunciado": "Calcula el **límite superior de valores atípicos**: Q3 + 3/2 × (Q3 − Q1), con CUARTIL.INC (usa 3/2 en lugar de 1,5).",
      "hoja": {
        "celdas": [
          [
            "Días de entrega"
          ],
          [
            3
          ],
          [
            4
          ],
          [
            4
          ],
          [
            5
          ],
          [
            5
          ],
          [
            5
          ],
          [
            6
          ],
          [
            7
          ],
          [
            8
          ],
          [
            30
          ]
        ],
        "encabezado": true
      },
      "celda": "C2",
      "formulaInicial": "=",
      "solucion": "=CUARTIL.INC(A2:A11;3)+3/2*(CUARTIL.INC(A2:A11;3)-CUARTIL.INC(A2:A11;1))",
      "esperado": 10.5,
      "tolerancia": 1e-09,
      "pistas": [
        "Q1 es CUARTIL.INC(A2:A11;1) y Q3 es CUARTIL.INC(A2:A11;3).",
        "IQR = Q3 − Q1; el límite es Q3 + 3/2 × IQR."
      ]
    },
    "verificacion": [
      {
        "id": "m36-l2-q1",
        "pregunta": "¿Cuándo usas `DESVEST.M` y cuándo `DESVEST.P`?",
        "opciones": [
          ".M para muestras (divide entre n−1) y .P para poblaciones completas (divide entre n)",
          ".M para números y .P para texto",
          "No hay diferencia",
          ".M para mayores de 30 datos"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "La «M» es de muestra y la «P» de población."
      },
      {
        "id": "m36-l2-q2",
        "pregunta": "El promedio es 7,7 y la mediana es 5. Esto sugiere…",
        "opciones": [
          "Que los datos son simétricos",
          "Que hay valores altos extremos que arrastran el promedio",
          "Que hay un error de cálculo",
          "Que la moda es 7,7"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Cuando el promedio supera mucho a la mediana, suele haber valores extremos en la cola alta."
      }
    ],
    "resumen": [
      "MEDIANA es resistente a extremos; el promedio no.",
      "DESVEST.M para muestras, DESVEST.P para poblaciones.",
      "Con CUARTIL.INC calculas Q1 y Q3 y, con ellos, los límites de atípicos."
    ],
    "proximoPaso": "Seguiremos con las tablas dinámicas, la herramienta de Excel para resumir tablas grandes.",
    "conceptos": [
      "estadistica-en-excel",
      "atipicos-iqr"
    ]
  },
  {
    "id": "m36-l3",
    "moduloId": "modulo-36",
    "motor": "excel",
    "titulo": "Tablas dinámicas: resumir una tabla grande",
    "objetivo": "Entender qué hace una tabla dinámica, cómo se crea en Excel y qué cálculo hay detrás, reproduciéndolo con fórmulas.",
    "porQueImporta": "Cuando una tabla tiene miles de filas, las funciones condicionales fila por fila se vuelven incómodas. La tabla dinámica resume, cruza y reorganiza los datos en segundos y se actualiza con un clic.",
    "concepto": "Una **tabla dinámica** agrupa los datos de una tabla y calcula una medida (suma, promedio, conteo…) para cada grupo.\n\n**Cómo crearla en Excel** (versiones de escritorio recientes):\n\n1. Haz clic en cualquier celda de tus datos (una tabla con encabezados en la primera fila, sin filas ni columnas vacías en medio).\n2. Ve a **Insertar → Tabla dinámica** y acepta la hoja nueva.\n3. En el panel de **campos**, arrastra cada campo a una de sus cuatro áreas:\n   - **Filas** y **Columnas**: los grupos (por ejemplo, Región en filas, Producto en columnas).\n   - **Valores**: lo que se calcula (por ejemplo, Suma de Ingreso).\n   - **Filtros**: para ver solo una parte.\n4. Si cambias los datos de origen, la tabla **no se actualiza sola**: haz clic derecho sobre ella y elige **Actualizar**.\n5. Para ver porcentajes, usa **Configuración de campo de valor → Mostrar valores como → % del total general**.\n\n**Lo que hay detrás.** Una tabla dinámica con Región en filas y Suma de Ingreso en valores calcula, para cada región, lo mismo que `SUMAR.SI`:\n\n```\n=SUMAR.SI($B$2:$B$11; G2; $E$2:$E$11)\n```\n\nLos ejercicios de esta lección reproducen ese cálculo con fórmulas. La tabla dinámica en sí la creas en tu propio Excel: usa el botón «Copiar los datos para pegarlos en Excel» y prueba los pasos anteriores.",
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
          "celda": "E1",
          "formula": "=SUMAR.SI(A1:A3;\"Norte\";B1:B3)",
          "esperado": 400
        },
        {
          "celda": "E2",
          "formula": "=SUMAR.SI(A1:A3;\"Sur\";B1:B3)",
          "esperado": 200
        },
        {
          "celda": "E3",
          "formula": "=CONTAR.SI(A1:A3;\"Norte\")",
          "esperado": 2
        }
      ],
      "nota": "Esto es lo que mostraría una tabla dinámica con Región en filas: Norte 400, Sur 200 (o 2 y 1 si en Valores eliges «Recuento»)."
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Ingreso",
            null,
            "Región",
            "Ingreso"
          ],
          [
            "Ana",
            "Norte",
            "Laptop",
            2,
            6000,
            null,
            "Norte",
            null
          ],
          [
            "Luis",
            "Sur",
            "Mouse",
            10,
            1500,
            null,
            "Sur",
            null
          ],
          [
            "Eva",
            "Norte",
            "Teclado",
            5,
            2500,
            null,
            "Este",
            null
          ],
          [
            "Ana",
            "Norte",
            "Mouse",
            8,
            1200,
            null,
            null,
            null
          ],
          [
            "Carlos",
            "Sur",
            "Laptop",
            1,
            3000,
            null,
            null,
            null
          ],
          [
            "Marta",
            "Este",
            "Teclado",
            4,
            2000,
            null,
            null,
            null
          ],
          [
            "Luis",
            "Sur",
            "Laptop",
            3,
            9000,
            null,
            null,
            null
          ],
          [
            "Eva",
            "Norte",
            "Laptop",
            2,
            6000,
            null,
            null,
            null
          ],
          [
            "Marta",
            "Este",
            "Mouse",
            6,
            900,
            null,
            null,
            null
          ],
          [
            "Carlos",
            "Sur",
            "Teclado",
            3,
            1500,
            null,
            null,
            null
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "H2",
          "formula": "=SUMAR.SI($B$2:$B$11;G2;$E$2:$E$11)",
          "esperado": 15700
        },
        {
          "celda": "H3",
          "formula": "=SUMAR.SI($B$2:$B$11;G3;$E$2:$E$11)",
          "esperado": 15000
        },
        {
          "celda": "H4",
          "formula": "=SUMAR.SI($B$2:$B$11;G4;$E$2:$E$11)",
          "esperado": 2900
        },
        {
          "celda": "H5",
          "formula": "=SUMA($E$2:$E$11)",
          "esperado": 33600
        }
      ],
      "nota": "Estos son los valores de la tabla dinámica «Región × Suma de Ingreso», con su total general (la fila de totales)."
    },
    "errorFrecuente": {
      "codigo": "Cambias un dato en la hoja de origen y la tabla dinámica sigue mostrando el total anterior.",
      "explicacion": "Las tablas dinámicas guardan una copia de los datos y **no se recalculan solas**. Después de modificar, agregar o borrar filas de origen, haz clic derecho sobre la tabla → **Actualizar**. Si agregas filas nuevas fuera del rango original, conviene convertir el origen en una *Tabla* de Excel (Insertar → Tabla) para que el rango crezca automáticamente."
    },
    "practicaGuiada": {
      "id": "m36-l3-practica",
      "enunciado": "Reproduce la columna «Ingreso» de la tabla dinámica: suma el ingreso de cada región con SUMAR.SI. Escribe la fórmula en H2 (se copia a las 3 regiones; fija los rangos de datos con $).",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Ingreso",
            null,
            "Región",
            "Ingreso"
          ],
          [
            "Ana",
            "Norte",
            "Laptop",
            2,
            6000,
            null,
            "Norte",
            null
          ],
          [
            "Luis",
            "Sur",
            "Mouse",
            10,
            1500,
            null,
            "Sur",
            null
          ],
          [
            "Eva",
            "Norte",
            "Teclado",
            5,
            2500,
            null,
            "Este",
            null
          ],
          [
            "Ana",
            "Norte",
            "Mouse",
            8,
            1200,
            null,
            null,
            null
          ],
          [
            "Carlos",
            "Sur",
            "Laptop",
            1,
            3000,
            null,
            null,
            null
          ],
          [
            "Marta",
            "Este",
            "Teclado",
            4,
            2000,
            null,
            null,
            null
          ],
          [
            "Luis",
            "Sur",
            "Laptop",
            3,
            9000,
            null,
            null,
            null
          ],
          [
            "Eva",
            "Norte",
            "Laptop",
            2,
            6000,
            null,
            null,
            null
          ],
          [
            "Marta",
            "Este",
            "Mouse",
            6,
            900,
            null,
            null,
            null
          ],
          [
            "Carlos",
            "Sur",
            "Teclado",
            3,
            1500,
            null,
            null,
            null
          ]
        ],
        "encabezado": true
      },
      "celda": "H2",
      "formulaInicial": "=",
      "solucion": "=SUMAR.SI($B$2:$B$11;G2;$E$2:$E$11)",
      "esperado": [
        15700,
        15000,
        2900
      ],
      "rellenarFilas": 3,
      "pistas": [
        "El criterio es la región de la fila (G2, relativa).",
        "Los rangos de datos (B2:B11 y E2:E11) deben quedar fijos con $."
      ]
    },
    "reto": {
      "id": "m36-l3-reto",
      "enunciado": "Calcula el porcentaje que representa cada región sobre el ingreso total (como «Mostrar valores como % del total»). Escribe la fórmula en H2 (se copia a las 3 filas).",
      "hoja": {
        "celdas": [
          [
            "Vendedor",
            "Región",
            "Producto",
            "Unidades",
            "Ingreso",
            null,
            "Región",
            "Ingreso"
          ],
          [
            "Ana",
            "Norte",
            "Laptop",
            2,
            6000,
            null,
            "Norte",
            null
          ],
          [
            "Luis",
            "Sur",
            "Mouse",
            10,
            1500,
            null,
            "Sur",
            null
          ],
          [
            "Eva",
            "Norte",
            "Teclado",
            5,
            2500,
            null,
            "Este",
            null
          ],
          [
            "Ana",
            "Norte",
            "Mouse",
            8,
            1200,
            null,
            null,
            null
          ],
          [
            "Carlos",
            "Sur",
            "Laptop",
            1,
            3000,
            null,
            null,
            null
          ],
          [
            "Marta",
            "Este",
            "Teclado",
            4,
            2000,
            null,
            null,
            null
          ],
          [
            "Luis",
            "Sur",
            "Laptop",
            3,
            9000,
            null,
            null,
            null
          ],
          [
            "Eva",
            "Norte",
            "Laptop",
            2,
            6000,
            null,
            null,
            null
          ],
          [
            "Marta",
            "Este",
            "Mouse",
            6,
            900,
            null,
            null,
            null
          ],
          [
            "Carlos",
            "Sur",
            "Teclado",
            3,
            1500,
            null,
            null,
            null
          ]
        ],
        "encabezado": true
      },
      "celda": "H2",
      "formulaInicial": "=",
      "solucion": "=SUMAR.SI($B$2:$B$11;G2;$E$2:$E$11)/SUMA($E$2:$E$11)",
      "esperado": [
        0.467261904762,
        0.446428571429,
        0.08630952381
      ],
      "rellenarFilas": 3,
      "formato": "porcentaje",
      "tolerancia": 1e-06,
      "pistas": [
        "Divide el ingreso de la región entre el total de toda la columna.",
        "El total (SUMA) debe quedar fijo con $."
      ]
    },
    "verificacion": [
      {
        "id": "m36-l3-q1",
        "pregunta": "Cambias los datos de origen. ¿Qué debes hacer para que la tabla dinámica lo refleje?",
        "opciones": [
          "Nada: se actualiza sola",
          "Hacer clic derecho sobre la tabla y elegir Actualizar",
          "Crear una tabla dinámica nueva siempre",
          "Reiniciar Excel"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La tabla dinámica no se refresca automáticamente: hay que actualizarla."
      },
      {
        "id": "m36-l3-q2",
        "pregunta": "¿Qué área del panel de campos recibe lo que se va a calcular (suma, promedio…)?",
        "opciones": [
          "Filas",
          "Columnas",
          "Valores",
          "Filtros"
        ],
        "respuestaCorrecta": 2,
        "explicacion": "En «Valores» van los campos que se resumen con una función; Filas y Columnas definen los grupos."
      }
    ],
    "resumen": [
      "Una tabla dinámica agrupa datos (Filas/Columnas) y calcula una medida (Valores).",
      "Se crea con Insertar → Tabla dinámica y se actualiza manualmente.",
      "Detrás hay cálculos como SUMAR.SI que puedes reproducir con fórmulas."
    ],
    "proximoPaso": "Veremos cómo presentar los resultados con gráficos que comunican.",
    "conceptos": [
      "tablas-dinamicas"
    ]
  },
  {
    "id": "m36-l4",
    "moduloId": "modulo-36",
    "motor": "excel",
    "titulo": "Gráficos que comunican: elegir el gráfico y preparar los datos",
    "objetivo": "Elegir el tipo de gráfico adecuado para cada pregunta, aplicar buenas prácticas y calcular los datos que alimentan el gráfico.",
    "porQueImporta": "Un buen gráfico cuenta la conclusión en segundos; uno mal elegido confunde o engaña. Y casi siempre los números del gráfico se calculan antes con fórmulas.",
    "concepto": "**¿Qué gráfico usar?**\n\n| Pregunta | Gráfico |\n|---|---|\n| Comparar categorías (ventas por región) | Columnas o barras |\n| Ver cómo cambia algo en el tiempo | Líneas |\n| Un ranking con nombres largos | Barras horizontales, ordenadas |\n| Partes de un total (pocas categorías) | Circular o anillo (máximo 4–5 porciones) |\n| Relación entre dos variables numéricas | Dispersión (XY) |\n\n**Buenas prácticas**\n\n- Escribe un **título que diga la conclusión** («Las ventas de abril superaron a las de enero en un 20 %»), no solo el tema.\n- En gráficos de **columnas o barras**, el eje vertical debe **empezar en cero**: si lo recortas, las diferencias se exageran.\n- Ordena las categorías (de mayor a menor) cuando no tengan un orden natural.\n- Usa pocos colores y resalta solo lo importante; evita efectos 3D.\n- Etiqueta directamente los datos clave en lugar de depender de una leyenda lejana.\n\n**En Excel**: selecciona los datos (con sus encabezados) y ve a **Insertar → Gráficos recomendados**; Excel propone varias opciones y puedes cambiar el tipo después.\n\nDos cálculos habituales antes de graficar: la **variación porcentual** `=(actual − anterior) / anterior` y el **crecimiento acumulado** respecto a un periodo base, que exige fijar la celda base con `$`.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            100
          ],
          [
            110
          ],
          [
            99
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "celda": "B2",
          "formula": "=(A2-A1)/A1",
          "formato": "porcentaje",
          "esperado": 0.1
        },
        {
          "celda": "B3",
          "formula": "=(A3-A2)/A2",
          "formato": "porcentaje",
          "esperado": -0.1
        }
      ],
      "nota": "Una subida de 100 a 110 es +10 %; de 110 a 99 es −10 %."
    },
    "ejemploAplicado": {
      "hoja": {
        "celdas": [
          [
            "Mes",
            "Ventas",
            "Variación"
          ],
          [
            "Enero",
            1000
          ],
          [
            "Febrero",
            1100
          ],
          [
            "Marzo",
            990
          ],
          [
            "Abril",
            1200
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "C3",
          "formula": "=(B3-B2)/B2",
          "formato": "porcentaje",
          "esperado": 0.1
        },
        {
          "celda": "C4",
          "formula": "=(B4-B3)/B3",
          "formato": "porcentaje",
          "esperado": -0.1
        },
        {
          "celda": "C5",
          "formula": "=(B5-B4)/B4",
          "formato": "porcentaje",
          "esperado": 0.212121212121
        },
        {
          "celda": "D5",
          "formula": "=B5/$B$2-1",
          "formato": "porcentaje",
          "esperado": 0.2
        }
      ],
      "nota": "La variación mes a mes compara cada mes con el anterior; el crecimiento acumulado compara cada mes con enero (la celda base está fija con $)."
    },
    "errorFrecuente": {
      "codigo": "Gráfico de columnas con el eje vertical que empieza en 950 en lugar de 0.",
      "explicacion": "Recortar el eje exagera las diferencias: una ventas de 1000 contra 1100 parece que se duplican, cuando la diferencia es del 10 %. En gráficos de columnas el eje debe empezar en cero. Si necesitas ver pequeñas variaciones, usa un gráfico de líneas."
    },
    "practicaGuiada": {
      "id": "m36-l4-practica",
      "enunciado": "Calcula la variación porcentual de cada mes respecto al anterior. Escribe la fórmula en C3 (se copia a las 3 filas de febrero a abril).",
      "hoja": {
        "celdas": [
          [
            "Mes",
            "Ventas",
            "Variación"
          ],
          [
            "Enero",
            1000
          ],
          [
            "Febrero",
            1100
          ],
          [
            "Marzo",
            990
          ],
          [
            "Abril",
            1200
          ]
        ],
        "encabezado": true
      },
      "celda": "C3",
      "formulaInicial": "=",
      "solucion": "=(B3-B2)/B2",
      "esperado": [
        0.1,
        -0.1,
        0.212121212121
      ],
      "rellenarFilas": 3,
      "formato": "porcentaje",
      "tolerancia": 1e-06,
      "pistas": [
        "Resta las ventas del mes anterior (B2) a las del mes actual (B3).",
        "Divide esa diferencia entre las ventas del mes anterior."
      ]
    },
    "reto": {
      "id": "m36-l4-reto",
      "enunciado": "Calcula el crecimiento acumulado de cada mes respecto a enero (B2): ventas del mes ÷ ventas de enero − 1. Escribe la fórmula en C3 (se copia a las 3 filas; la celda de enero debe quedar fija).",
      "hoja": {
        "celdas": [
          [
            "Mes",
            "Ventas",
            "Variación"
          ],
          [
            "Enero",
            1000
          ],
          [
            "Febrero",
            1100
          ],
          [
            "Marzo",
            990
          ],
          [
            "Abril",
            1200
          ]
        ],
        "encabezado": true
      },
      "celda": "C3",
      "formulaInicial": "=",
      "solucion": "=B3/$B$2-1",
      "esperado": [
        0.1,
        -0.01,
        0.2
      ],
      "rellenarFilas": 3,
      "formato": "porcentaje",
      "tolerancia": 1e-06,
      "pistas": [
        "El mes actual (B3) es relativo.",
        "La base (enero, B2) debe quedar fija: $B$2."
      ]
    },
    "verificacion": [
      {
        "id": "m36-l4-q1",
        "pregunta": "¿Qué gráfico es más adecuado para mostrar cómo evolucionan las ventas mes a mes durante un año?",
        "opciones": [
          "Circular",
          "Líneas",
          "Dispersión",
          "Anillo"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Las líneas muestran bien la tendencia en el tiempo."
      },
      {
        "id": "m36-l4-q2",
        "pregunta": "¿Por qué un gráfico de columnas debe empezar su eje en cero?",
        "opciones": [
          "Por estética",
          "Porque la altura de la columna representa la cantidad y recortarla exagera las diferencias",
          "Porque Excel lo exige",
          "Para que quepan más datos"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La longitud de la columna debe ser proporcional al valor; si se recorta, se distorsiona la comparación."
      }
    ],
    "resumen": [
      "Elige el gráfico según la pregunta: columnas, líneas, barras, circular o dispersión.",
      "Título con la conclusión y eje en cero en columnas y barras.",
      "Calcula antes con fórmulas la variación y el acumulado que quieres mostrar."
    ],
    "proximoPaso": "Cerraremos el módulo con los errores de las fórmulas, la validación de datos y las buenas prácticas.",
    "conceptos": [
      "tipos-de-grafico",
      "variacion-porcentual"
    ]
  },
  {
    "id": "m36-l5",
    "moduloId": "modulo-36",
    "motor": "excel",
    "titulo": "Errores en las fórmulas, validación de datos y buenas prácticas",
    "objetivo": "Interpretar los errores de Excel, controlarlos sin esconderlos a ciegas y construir hojas confiables.",
    "porQueImporta": "Un error es información: dice qué salió mal. Taparlo sin entenderlo produce informes que parecen correctos y no lo son. Una hoja bien construida se puede revisar, mantener y compartir.",
    "concepto": "| Error | Qué significa | Causa típica |\n|---|---|---|\n| `#¡DIV/0!` | División por cero | Dividir entre una celda vacía o 0 |\n| `#N/D` | Valor no disponible | Una búsqueda no encontró el dato |\n| `#¡VALOR!` | Tipo de dato incorrecto | Sumar un texto, o rangos de distinto tamaño |\n| `#¡REF!` | Referencia no válida | Se borró una fila o columna que usaba la fórmula |\n| `#¿NOMBRE?` | Nombre desconocido | Función mal escrita o texto sin comillas |\n| `#¡NUM!` | Número no válido | Raíz de un negativo, resultado imposible |\n\n**Cómo controlarlos**\n\n- `SI.ERROR(valor; alternativa)` reemplaza **cualquier** error. Es cómodo, pero puede ocultar un problema real (por ejemplo, un `#¿NOMBRE?` por un error de escritura).\n- `SI.ND(valor; alternativa)` reemplaza **solo** `#N/D`: es la opción segura para búsquedas, porque los demás errores siguen visibles.\n\n**Herramientas de revisión** (pestaña **Fórmulas**): *Evaluar fórmula* (la ejecuta paso a paso), *Rastrear precedentes* y *Rastrear dependientes* (flechas hacia las celdas que usa y las que la usan).\n\n**Buenas prácticas**\n\n- **No escribas números dentro de las fórmulas** (`=B2*0,19`): ponlos en una celda con su etiqueta y refiérete a ella con `$`.\n- **Validación de datos** (pestaña **Datos → Validación de datos**): limita lo que se puede escribir en una celda (una lista desplegable, números dentro de un rango) y evita errores de captura.\n- Mantén **una sola fórmula por columna**, copiada a todas las filas, para que sea fácil de revisar.\n- Recuerda que el **formato** cambia cómo se ve el valor, no el valor: una celda que muestra «50 %» contiene 0,5.\n- No sobrescribas los datos originales y documenta los supuestos en una hoja de notas.",
    "ejemploMinimo": {
      "hoja": {
        "celdas": [
          [
            "Z",
            0
          ]
        ],
        "encabezado": false
      },
      "formulas": [
        {
          "formula": "=1/0",
          "esperado": {
            "error": "#¡DIV/0!"
          }
        },
        {
          "formula": "=\"a\"+1",
          "esperado": {
            "error": "#¡VALOR!"
          }
        },
        {
          "formula": "=BUSCARV(\"Y\";A1:B1;2;FALSO)",
          "esperado": {
            "error": "#N/D"
          }
        },
        {
          "formula": "=INVENTADA(1)",
          "esperado": {
            "error": "#¿NOMBRE?"
          }
        },
        {
          "formula": "=RAIZ(-1)",
          "esperado": {
            "error": "#¡NUM!"
          }
        }
      ]
    },
    "ejemploAplicado": {
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
          ]
        ],
        "encabezado": true
      },
      "formulas": [
        {
          "celda": "D1",
          "formula": "=BUSCARV(\"Monitor\";A2:B3;2;FALSO)",
          "esperado": {
            "error": "#N/D"
          }
        },
        {
          "celda": "D2",
          "formula": "=SI.ND(BUSCARV(\"Monitor\";A2:B3;2;FALSO);\"sin precio\")",
          "esperado": "sin precio"
        },
        {
          "celda": "D3",
          "formula": "=SI.ERROR(BUSCARV(\"Monitor\";A2:B3;2;FALSO);\"sin precio\")",
          "esperado": "sin precio"
        },
        {
          "celda": "D4",
          "formula": "=SI.ND(BUSCARV(\"Monitor\";A2:B3;2;FALSO);\"sin precio\")&\" / \"&SI.ND(BUSCARV(\"Mouse\";A2:B3;2;FALSO);\"sin precio\")",
          "esperado": "sin precio / 150"
        }
      ],
      "nota": "Cuando el error es solo `#N/D`, SI.ND y SI.ERROR dan lo mismo; la diferencia aparece con otros errores: SI.ERROR también esconde, por ejemplo, un `#¿NOMBRE?` causado por un nombre mal escrito."
    },
    "errorFrecuente": {
      "codigo": "=SI.ERROR(BUSCARV(A2;$E$2:$F$4;2;FALS0);0)",
      "explicacion": "Aquí hay un error de escritura (`FALS0` con cero en lugar de `FALSO`) que produce `#¿NOMBRE?`, pero `SI.ERROR` lo reemplaza por 0 y la hoja parece funcionar: todos los precios salen en 0 y nadie sabe por qué. Para controlar solo «no encontrado» usa `SI.ND`, que deja visibles los demás errores."
    },
    "practicaGuiada": {
      "id": "m36-l5-practica",
      "enunciado": "Calcula las ventas por visita, mostrando 0 cuando la división da error. Escribe la fórmula en C2 (se copia a las 3 filas) con SI.ERROR.",
      "hoja": {
        "celdas": [
          [
            "Ventas",
            "Visitas",
            "Ventas por visita"
          ],
          [
            10,
            2
          ],
          [
            7,
            0
          ],
          [
            9,
            3
          ]
        ],
        "encabezado": true
      },
      "celda": "C2",
      "formulaInicial": "=",
      "solucion": "=SI.ERROR(A2/B2;0)",
      "esperado": [
        5,
        0,
        3
      ],
      "rellenarFilas": 3,
      "pistas": [
        "La división es A2/B2.",
        "SI.ERROR(valor; alternativa): la alternativa es 0."
      ]
    },
    "reto": {
      "id": "m36-l5-reto",
      "enunciado": "Busca el precio de cada producto de la columna A en el catálogo (D2:E4). Si el producto no está, debe mostrar «sin precio». Escribe la fórmula en B2 (se copia a las 3 filas) con BUSCARV de coincidencia exacta y SI.ND.",
      "hoja": {
        "celdas": [
          [
            "Producto",
            "Precio",
            "",
            "Producto",
            "Precio"
          ],
          [
            "Laptop",
            null,
            null,
            "Laptop",
            3000
          ],
          [
            "Mouse",
            null,
            null,
            "Mouse",
            150
          ],
          [
            "Monitor",
            null,
            null,
            "Teclado",
            500
          ]
        ],
        "encabezado": true
      },
      "celda": "B2",
      "formulaInicial": "=",
      "solucion": "=SI.ND(BUSCARV(A2;$D$2:$E$4;2;FALSO);\"sin precio\")",
      "esperado": [
        3000,
        150,
        "sin precio"
      ],
      "rellenarFilas": 3,
      "pistas": [
        "Busca con BUSCARV(A2; $D$2:$E$4; 2; FALSO).",
        "Envuelve la búsqueda en SI.ND(…; \"sin precio\")."
      ]
    },
    "verificacion": [
      {
        "id": "m36-l5-q1",
        "pregunta": "¿Qué error aparece cuando una búsqueda no encuentra el valor?",
        "opciones": [
          "#¡DIV/0!",
          "#N/D",
          "#¡REF!",
          "#¡NUM!"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "`#N/D` significa «no disponible»: la búsqueda no halló el dato."
      },
      {
        "id": "m36-l5-q2",
        "pregunta": "¿Por qué `SI.ND` es más seguro que `SI.ERROR` para las búsquedas?",
        "opciones": [
          "Porque es más rápido",
          "Porque solo reemplaza #N/D y deja visibles otros errores que podrían indicar un problema real",
          "Porque no necesita argumentos",
          "Porque funciona sin fórmulas"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "SI.ERROR reemplaza todos los errores, incluso los que revelan fallos de escritura."
      }
    ],
    "resumen": [
      "Cada error de Excel tiene un significado: léelo antes de taparlo.",
      "SI.ND reemplaza solo #N/D; SI.ERROR reemplaza cualquier error y puede esconder problemas.",
      "No escribas números fijos dentro de las fórmulas, valida la captura y no sobrescribas los datos originales."
    ],
    "proximoPaso": "En el proyecto final analizarás las ventas de una tienda de principio a fin.",
    "conceptos": [
      "errores-de-formula",
      "validacion-de-datos",
      "buenas-practicas-hoja"
    ]
  },
]
