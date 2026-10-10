import type { Lesson } from '../../types'

export const module45Lessons: Lesson[] = [
  {
    "id": "m45-l1",
    "moduloId": "modulo-45",
    "motor": "calculo",
    "titulo": "DAX: medidas, columnas calculadas y contexto de filtro",
    "objetivo": "Distinguir una medida de una columna calculada y entender que el resultado de una medida depende del contexto de filtro de cada celda del informe.",
    "porQueImporta": "Este es el concepto que más cuesta y más importa en DAX: una medida no tiene «un valor», tiene uno distinto en cada celda de cada visual, según los filtros activos. Quien lo entiende, entiende DAX.",
    "concepto": "> **Nota**: DAX no se ejecuta en el navegador de este curso. Cada lección muestra la fórmula tal como se escribe en Power BI Desktop (barra de fórmulas), qué devuelve cada celda del visual y te pide **calcular ese resultado a mano o con la calculadora**; así se aprende a «leer» una medida. Para verlas funcionar de verdad, créalas en Power BI Desktop (gratuito, solo Windows) con los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv).\n\n**Columna calculada** vs **medida**:\n\n- Una **columna calculada** se calcula **fila por fila** al cargar o actualizar los datos y se **almacena** en el modelo (ocupa memoria). Sirve para atributos que quieres usar en filtros, ejes o segmentaciones: `Línea = Ventas[unidades] * Ventas[precio_unitario]`.\n- Una **medida** se calcula **al momento de mostrar** cada celda del informe, según los filtros activos. No ocupa espacio en las filas. Es lo que se usa para totales, promedios, porcentajes y KPI.\n\nMedidas básicas (se escriben en *Modelado → Nueva medida*):\n\n```dax\nUnidades = SUM(Ventas[unidades])\nIngreso = SUMX(Ventas, Ventas[unidades] * Ventas[precio_unitario])\nProductos vendidos = DISTINCTCOUNT(Ventas[id_producto])\nPrecio medio = DIVIDE([Ingreso], [Unidades])\n```\n\n`SUMX` (y las demás funciones que terminan en X) **itera** fila por fila, evalúa una expresión y suma el resultado. `DIVIDE` divide y devuelve BLANK (o un valor alternativo) si el denominador es 0, en lugar de un error.\n\n**Contexto de filtro**: el conjunto de filtros que afectan a una celda: la fila y la columna del visual (por ejemplo, «región = Norte» y «categoría = Tecnologia»), las segmentaciones, los filtros de la página o del informe y los filtros que llegan a través de las relaciones. Una misma medida, `[Ingreso]`, da un resultado distinto en cada celda de una matriz porque en cada una el contexto es distinto. El **total** de la matriz es la medida evaluada **sin** el filtro de esa fila o columna.\n\nPara leer una medida: **1)** ¿cuál es el contexto de la celda? **2)** ¿qué filas del modelo quedan? **3)** aplica la fórmula a esas filas.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "La medida [Unidades] en tres celdas distintas",
      "datos": [
        {
          "columnas": [
            "producto",
            "region",
            "unidades",
            "precio_unitario",
            "Línea (col. calculada)"
          ],
          "filas": [
            [
              "Laptop",
              "Norte",
              10,
              2400,
              24000
            ],
            [
              "Laptop",
              "Sur",
              15,
              2400,
              36000
            ],
            [
              "Laptop",
              "Este",
              9,
              2400,
              21600
            ],
            [
              "Laptop",
              "Oeste",
              14,
              2400,
              33600
            ],
            [
              "Monitor",
              "Norte",
              17,
              700,
              11900
            ],
            [
              "Monitor",
              "Sur",
              11,
              700,
              7700
            ],
            [
              "Monitor",
              "Este",
              16,
              700,
              11200
            ],
            [
              "Monitor",
              "Oeste",
              10,
              700,
              7000
            ],
            [
              "Teclado",
              "Norte",
              13,
              90,
              1170
            ],
            [
              "Teclado",
              "Sur",
              7,
              90,
              630
            ],
            [
              "Teclado",
              "Este",
              12,
              90,
              1080
            ],
            [
              "Teclado",
              "Oeste",
              17,
              90,
              1530
            ],
            [
              "Mouse",
              "Norte",
              9,
              40,
              360
            ],
            [
              "Mouse",
              "Sur",
              14,
              40,
              560
            ],
            [
              "Mouse",
              "Este",
              8,
              40,
              320
            ],
            [
              "Mouse",
              "Oeste",
              13,
              40,
              520
            ],
            [
              "Silla",
              "Norte",
              16,
              300,
              4800
            ],
            [
              "Silla",
              "Sur",
              10,
              300,
              3000
            ],
            [
              "Silla",
              "Este",
              15,
              300,
              4500
            ],
            [
              "Silla",
              "Oeste",
              9,
              300,
              2700
            ]
          ],
          "resaltar": {
            "filas": [
              0,
              4,
              8,
              12,
              16
            ]
          },
          "leyenda": "Filas que entran en el contexto: Region[region] = Norte",
          "titulo": "Ventas de enero de 2024 (20 filas)"
        }
      ],
      "pantallas": [
        {
          "tipo": "medida",
          "dax": "Unidades = SUM(Ventas[unidades])",
          "objeto": "medida",
          "tabla": "Medidas",
          "resultado": [
            {
              "contexto": "Celda de la fila «Norte» (contexto: región = Norte)",
              "valor": "65"
            },
            {
              "contexto": "Celda de la fila «Sur» (contexto: región = Sur)",
              "valor": "57"
            },
            {
              "contexto": "Fila «Total» (sin filtro de región)",
              "valor": "245"
            }
          ]
        }
      ],
      "pasos": [
        "En la fila «Norte» el contexto deja solo las filas resaltadas: SUM(unidades) = **65**.",
        "En la fila «Sur» el contexto cambia y el resultado también: **la misma medida, otro valor**.",
        "En el total no hay filtro de región: se suman las 20 filas = **245**."
      ],
      "conclusion": "Una medida no tiene un valor: tiene uno por cada contexto de filtro."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "SUMX itera fila por fila",
      "pantallas": [
        {
          "tipo": "medida",
          "dax": "Ingreso = SUMX(Ventas, Ventas[unidades] * Ventas[precio_unitario])",
          "objeto": "medida",
          "tabla": "Medidas",
          "resultado": [
            {
              "contexto": "Contexto: región = Norte",
              "valor": "42 230"
            },
            {
              "contexto": "Sin filtro",
              "valor": "174 170"
            }
          ]
        }
      ],
      "pasos": [
        "`SUMX` recorre cada fila del contexto  calcula `unidades × precio_unitario` y suma: en Norte  **42 230**.",
        "`[Precio medio]` = DIVIDE([Ingreso]  [Unidades]) = 42 230 ÷ 65 = **649.69**.",
        "Sumar `unidades` por un lado y `precio_unitario` por otro, y luego multiplicar, daría un resultado distinto: el precio varía entre filas."
      ],
      "conclusion": "Cuando el cálculo necesita operar fila por fila (cantidad × precio), se usa una función con X."
    },
    "errorFrecuente": {
      "codigo": "Crear «% de ventas» como columna calculada para que cambie con las segmentaciones.",
      "explicacion": "Un porcentaje o un total que debe reaccionar a los filtros del informe tiene que ser una medida, no una columna calculada: la columna se calcula una vez al cargar los datos y no conoce el contexto de cada visual. Regla práctica: si el resultado debe cambiar cuando el usuario filtra, es una medida."
    },
    "practicaGuiada": {
      "id": "m45-l1-practica",
      "enunciado": "Evalúa las medidas de la lección para el contexto **región = Norte** en la tabla de enero de 2024 (filas resaltadas).",
      "datos": [
        {
          "columnas": [
            "producto",
            "region",
            "unidades",
            "precio_unitario",
            "Línea (col. calculada)"
          ],
          "filas": [
            [
              "Laptop",
              "Norte",
              10,
              2400,
              24000
            ],
            [
              "Laptop",
              "Sur",
              15,
              2400,
              36000
            ],
            [
              "Laptop",
              "Este",
              9,
              2400,
              21600
            ],
            [
              "Laptop",
              "Oeste",
              14,
              2400,
              33600
            ],
            [
              "Monitor",
              "Norte",
              17,
              700,
              11900
            ],
            [
              "Monitor",
              "Sur",
              11,
              700,
              7700
            ],
            [
              "Monitor",
              "Este",
              16,
              700,
              11200
            ],
            [
              "Monitor",
              "Oeste",
              10,
              700,
              7000
            ],
            [
              "Teclado",
              "Norte",
              13,
              90,
              1170
            ],
            [
              "Teclado",
              "Sur",
              7,
              90,
              630
            ],
            [
              "Teclado",
              "Este",
              12,
              90,
              1080
            ],
            [
              "Teclado",
              "Oeste",
              17,
              90,
              1530
            ],
            [
              "Mouse",
              "Norte",
              9,
              40,
              360
            ],
            [
              "Mouse",
              "Sur",
              14,
              40,
              560
            ],
            [
              "Mouse",
              "Este",
              8,
              40,
              320
            ],
            [
              "Mouse",
              "Oeste",
              13,
              40,
              520
            ],
            [
              "Silla",
              "Norte",
              16,
              300,
              4800
            ],
            [
              "Silla",
              "Sur",
              10,
              300,
              3000
            ],
            [
              "Silla",
              "Este",
              15,
              300,
              4500
            ],
            [
              "Silla",
              "Oeste",
              9,
              300,
              2700
            ]
          ],
          "resaltar": {
            "filas": [
              0,
              4,
              8,
              12,
              16
            ]
          },
          "leyenda": "Filas que entran en el contexto: Region[region] = Norte",
          "titulo": "Ventas de enero de 2024 (20 filas)"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "[Unidades] en el contexto Norte",
          "valor": 65
        },
        {
          "tipo": "numero",
          "etiqueta": "[Ingreso] en el contexto Norte",
          "valor": 42230
        },
        {
          "tipo": "numero",
          "etiqueta": "[Precio medio] en el contexto Norte (2 decimales)",
          "valor": 649.69
        }
      ],
      "solucion": [
        "Unidades de Norte (5 filas resaltadas): 10 + 17 + 13 + 9 + 16 = 65.",
        "Ingreso = 10×2400 + 17×700 + 13×90 + 9×40 + 16×300 = 42230.",
        "Precio medio = 42230 ÷ 65 = 649.69."
      ],
      "pistas": [
        "Selecciona solo las filas de Norte y aplica la fórmula."
      ]
    },
    "reto": {
      "id": "m45-l1-reto",
      "enunciado": "Ahora el contexto es **toda la tabla de enero** (la fila «Total» de la matriz).",
      "datos": [
        {
          "columnas": [
            "producto",
            "region",
            "unidades",
            "precio_unitario",
            "Línea (col. calculada)"
          ],
          "filas": [
            [
              "Laptop",
              "Norte",
              10,
              2400,
              24000
            ],
            [
              "Laptop",
              "Sur",
              15,
              2400,
              36000
            ],
            [
              "Laptop",
              "Este",
              9,
              2400,
              21600
            ],
            [
              "Laptop",
              "Oeste",
              14,
              2400,
              33600
            ],
            [
              "Monitor",
              "Norte",
              17,
              700,
              11900
            ],
            [
              "Monitor",
              "Sur",
              11,
              700,
              7700
            ],
            [
              "Monitor",
              "Este",
              16,
              700,
              11200
            ],
            [
              "Monitor",
              "Oeste",
              10,
              700,
              7000
            ],
            [
              "Teclado",
              "Norte",
              13,
              90,
              1170
            ],
            [
              "Teclado",
              "Sur",
              7,
              90,
              630
            ],
            [
              "Teclado",
              "Este",
              12,
              90,
              1080
            ],
            [
              "Teclado",
              "Oeste",
              17,
              90,
              1530
            ],
            [
              "Mouse",
              "Norte",
              9,
              40,
              360
            ],
            [
              "Mouse",
              "Sur",
              14,
              40,
              560
            ],
            [
              "Mouse",
              "Este",
              8,
              40,
              320
            ],
            [
              "Mouse",
              "Oeste",
              13,
              40,
              520
            ],
            [
              "Silla",
              "Norte",
              16,
              300,
              4800
            ],
            [
              "Silla",
              "Sur",
              10,
              300,
              3000
            ],
            [
              "Silla",
              "Este",
              15,
              300,
              4500
            ],
            [
              "Silla",
              "Oeste",
              9,
              300,
              2700
            ]
          ],
          "resaltar": {
            "filas": [
              0,
              4,
              8,
              12,
              16
            ]
          },
          "leyenda": "Filas que entran en el contexto: Region[region] = Norte",
          "titulo": "Ventas de enero de 2024 (20 filas)"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "[Unidades] sin filtro",
          "valor": 245
        },
        {
          "tipo": "numero",
          "etiqueta": "[Ingreso] sin filtro",
          "valor": 174170
        },
        {
          "tipo": "numero",
          "etiqueta": "¿Qué porcentaje del ingreso de enero corresponde a Norte? (%, 1 decimal)",
          "valor": 24.2
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Cuál de estos cálculos DEBE ser una medida?",
          "opciones": [
            "Línea = unidades × precio_unitario (para cada fila)",
            "Ingreso que cambia al usar una segmentación de región",
            "Nombre del mes de cada fecha",
            "Categoría de cada producto"
          ],
          "correcta": 1
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Cuáles son características de una columna calculada?",
          "opciones": [
            "Se calcula fila por fila al cargar los datos",
            "Se almacena en el modelo y ocupa memoria",
            "Se recalcula con cada filtro del visual",
            "Sirve para ejes, filtros y segmentaciones"
          ],
          "correctas": [
            0,
            1,
            3
          ]
        }
      ],
      "solucion": [
        "Unidades: 245. Ingreso: 174170.",
        "Norte aporta 42230 ÷ 174170 = 24.2 %.",
        "Lo que cambia con las segmentaciones es una medida.",
        "La columna calculada se calcula al cargar, ocupa memoria y sirve para ejes y filtros."
      ],
      "pistas": [
        "Suma todas las filas, sin filtro."
      ]
    },
    "verificacion": [
      {
        "id": "m45-l1-q1",
        "pregunta": "¿Cuál es la diferencia principal entre una medida y una columna calculada?",
        "opciones": [
          "No hay diferencia",
          "La medida se calcula al mostrar cada celda según los filtros; la columna se calcula fila por fila y se almacena",
          "La columna usa DAX y la medida no",
          "La medida solo suma"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La medida reacciona al contexto de filtro."
      },
      {
        "id": "m45-l1-q2",
        "pregunta": "¿Qué hace SUMX(Ventas, Ventas[unidades] * Ventas[precio_unitario])?",
        "opciones": [
          "Suma solo unidades",
          "Recorre las filas, evalúa la expresión en cada una y suma los resultados",
          "Multiplica los totales",
          "Cuenta filas"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "SUMX itera fila por fila."
      },
      {
        "id": "m45-l1-q3",
        "pregunta": "¿Por qué un porcentaje que debe cambiar con las segmentaciones debe ser una medida?",
        "opciones": [
          "Por estética",
          "Porque la medida se recalcula con el contexto de filtro de cada visual",
          "Porque las columnas no admiten números",
          "No debe serlo"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La columna no conoce el contexto de cada visual."
      }
    ],
    "resumen": [
      "Columna calculada: fila por fila, almacenada. Medida: al mostrar cada celda, según el contexto.",
      "SUMX itera; DIVIDE evita errores por cero.",
      "Para leer una medida, identifica el contexto de la celda."
    ],
    "proximoPaso": "Veremos CALCULATE, la función que cambia el contexto de filtro.",
    "conceptos": [
      "dax",
      "medida",
      "contexto-de-filtro"
    ]
  },
  {
    "id": "m45-l2",
    "moduloId": "modulo-45",
    "motor": "calculo",
    "titulo": "CALCULATE: modificar el contexto de filtro",
    "objetivo": "Usar CALCULATE para cambiar o quitar filtros y leer medidas de porcentaje del total y del grupo.",
    "porQueImporta": "CALCULATE es la función más importante de DAX: casi todas las medidas de negocio útiles (porcentaje del total, comparación con el año anterior, acumulados) son variaciones de ella.",
    "concepto": "> **Nota**: DAX no se ejecuta en el navegador de este curso. Cada lección muestra la fórmula tal como se escribe en Power BI Desktop (barra de fórmulas), qué devuelve cada celda del visual y te pide **calcular ese resultado a mano o con la calculadora**; así se aprende a «leer» una medida. Para verlas funcionar de verdad, créalas en Power BI Desktop (gratuito, solo Windows) con los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv).\n\n`CALCULATE(<expresión>, <filtro1>, <filtro2>, …)` **evalúa la expresión en un contexto de filtro modificado** por los filtros que le pasas:\n\n```dax\nIngreso Norte = CALCULATE([Ingreso], Region[region] = \"Norte\")\n```\n\nAquí la medida siempre calcula el ingreso de Norte, sin importar qué región muestre la fila del visual: el filtro de CALCULATE **reemplaza** el filtro existente sobre `Region[region]`.\n\n**Quitar filtros** con `REMOVEFILTERS` (o `ALL`) para obtener totales de referencia:\n\n```dax\nIngreso total = CALCULATE([Ingreso], REMOVEFILTERS(Region[region]))\n% del total = DIVIDE([Ingreso], CALCULATE([Ingreso], REMOVEFILTERS(Region[region])))\n```\n\nEl denominador ignora el filtro de región, de modo que cada región se compara con el total general.\n\n**Quitar todos los filtros excepto algunos**, con `ALLEXCEPT`: el porcentaje de cada región **dentro de su categoría**:\n\n```dax\n% dentro de categoría =\nDIVIDE([Ingreso], CALCULATE([Ingreso], ALLEXCEPT(Producto, Producto[categoria])))\n```\n\nIdea clave: **CALCULATE cambia el contexto de filtro; el resto es agregación normal.** Para leer una medida con CALCULATE: (1) parte del contexto de la celda, (2) aplica las modificaciones de CALCULATE, (3) calcula la expresión con el contexto resultante.\n\nUna advertencia: el filtro simple (`Region[region] = \"Norte\"`) funciona sobre una sola columna; para condiciones entre varias columnas se usa `FILTER`, que es más costoso, así que conviene usar los filtros simples siempre que sea posible.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "[Ingreso Norte] en la fila «Sur»",
      "datos": [
        {
          "columnas": [
            "region",
            "Accesorios",
            "Oficina",
            "Tecnologia",
            "Total"
          ],
          "filas": [
            [
              "Norte",
              19470,
              46200,
              463700,
              529370
            ],
            [
              "Sur",
              19130,
              44400,
              471500,
              535030
            ],
            [
              "Este",
              19340,
              45900,
              460600,
              525840
            ],
            [
              "Oeste",
              19990,
              44100,
              468400,
              532490
            ],
            [
              "Total",
              77930,
              180600,
              1864200,
              2122730
            ]
          ],
          "titulo": "[Ingreso] 2024 por región y categoría (cada celda es el resultado de la medida)"
        }
      ],
      "pantallas": [
        {
          "tipo": "medida",
          "dax": "Ingreso Norte = CALCULATE([Ingreso], Region[region] = \"Norte\")",
          "objeto": "medida",
          "tabla": "Medidas",
          "resultado": [
            {
              "contexto": "Celda de la fila «Norte»",
              "valor": "529 370"
            },
            {
              "contexto": "Celda de la fila «Sur»",
              "valor": "529 370"
            },
            {
              "contexto": "Celda de la fila «Total»",
              "valor": "529 370"
            }
          ]
        }
      ],
      "pasos": [
        "En la fila «Sur» el contexto inicial es región = Sur.",
        "CALCULATE **reemplaza** ese filtro por región = Norte.",
        "Se calcula [Ingreso] con región = Norte: **529 370**, en todas las filas."
      ],
      "conclusion": "El filtro de CALCULATE manda sobre el filtro de la fila para esa columna."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "% del total y % dentro de la categoría",
      "datos": [
        {
          "columnas": [
            "region",
            "Accesorios",
            "Oficina",
            "Tecnologia",
            "Total"
          ],
          "filas": [
            [
              "Norte",
              19470,
              46200,
              463700,
              529370
            ],
            [
              "Sur",
              19130,
              44400,
              471500,
              535030
            ],
            [
              "Este",
              19340,
              45900,
              460600,
              525840
            ],
            [
              "Oeste",
              19990,
              44100,
              468400,
              532490
            ],
            [
              "Total",
              77930,
              180600,
              1864200,
              2122730
            ]
          ],
          "titulo": "[Ingreso] 2024 por región y categoría (cada celda es el resultado de la medida)"
        }
      ],
      "pantallas": [
        {
          "tipo": "medida",
          "dax": "% del total =\nDIVIDE(\n    [Ingreso],\n    CALCULATE([Ingreso], REMOVEFILTERS(Region[region]))\n)",
          "objeto": "medida",
          "tabla": "Medidas",
          "resultado": [
            {
              "contexto": "Norte",
              "valor": "24.9 %"
            },
            {
              "contexto": "Total",
              "valor": "100 %"
            }
          ]
        }
      ],
      "pasos": [
        "Norte: 529 370 ÷ 2 122 730 = **24.9 %** del total.",
        "Para el % dentro de la categoría Tecnologia, el denominador conserva el filtro de categoría y quita los demás (ALLEXCEPT): Norte-Tecnologia = 463 700 ÷ 1 864 200 = **24.9 %**."
      ],
      "conclusion": "Un porcentaje es una división de dos contextos distintos: el de la celda y el de referencia."
    },
    "errorFrecuente": {
      "codigo": "% del total = DIVIDE([Ingreso], [Ingreso]) → «da 100 % en todas las filas».",
      "explicacion": "Un porcentaje del total necesita que el denominador ignore el filtro de la fila. Si numerador y denominador usan el mismo contexto, el resultado es siempre 100 %. Quitar el filtro con REMOVEFILTERS/ALL en el denominador es el patrón estándar."
    },
    "practicaGuiada": {
      "id": "m45-l2-practica",
      "enunciado": "Usa la matriz de ingreso 2024 de la lección.",
      "datos": [
        {
          "columnas": [
            "region",
            "Accesorios",
            "Oficina",
            "Tecnologia",
            "Total"
          ],
          "filas": [
            [
              "Norte",
              19470,
              46200,
              463700,
              529370
            ],
            [
              "Sur",
              19130,
              44400,
              471500,
              535030
            ],
            [
              "Este",
              19340,
              45900,
              460600,
              525840
            ],
            [
              "Oeste",
              19990,
              44100,
              468400,
              532490
            ],
            [
              "Total",
              77930,
              180600,
              1864200,
              2122730
            ]
          ],
          "titulo": "[Ingreso] 2024 por región y categoría (cada celda es el resultado de la medida)"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "[Ingreso] en la celda Sur-Oficina",
          "valor": 44400
        },
        {
          "tipo": "numero",
          "etiqueta": "`CALCULATE([Ingreso], Region[region] = \"Este\")` evaluada en la fila «Sur» (cualquier celda de Total)",
          "valor": 525840
        },
        {
          "tipo": "numero",
          "etiqueta": "% del total de la región Oeste (%, 1 decimal)",
          "valor": 25.1,
          "calculo": "=532490/2122730*100",
          "tolerancia": 0.05
        }
      ],
      "solucion": [
        "Sur-Oficina es una celda de la matriz: 44400.",
        "CALCULATE reemplaza el filtro de región por Este: 525840.",
        "Oeste: 532490 ÷ 2122730 = 25.1 %."
      ],
      "pistas": [
        "El total de la fila Este es el ingreso de esa región."
      ]
    },
    "reto": {
      "id": "m45-l2-reto",
      "enunciado": "Lee medidas más complejas sobre la misma matriz.",
      "datos": [
        {
          "columnas": [
            "region",
            "Accesorios",
            "Oficina",
            "Tecnologia",
            "Total"
          ],
          "filas": [
            [
              "Norte",
              19470,
              46200,
              463700,
              529370
            ],
            [
              "Sur",
              19130,
              44400,
              471500,
              535030
            ],
            [
              "Este",
              19340,
              45900,
              460600,
              525840
            ],
            [
              "Oeste",
              19990,
              44100,
              468400,
              532490
            ],
            [
              "Total",
              77930,
              180600,
              1864200,
              2122730
            ]
          ],
          "titulo": "[Ingreso] 2024 por región y categoría (cada celda es el resultado de la medida)"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "% de Tecnologia sobre el total de Sur (denominador: total de la región Sur) (%, 1 decimal)",
          "valor": 88.1,
          "tolerancia": 0.05
        },
        {
          "tipo": "numero",
          "etiqueta": "% de la región Norte dentro de la categoría Accesorios (ALLEXCEPT por categoría) (%, 1 decimal)",
          "valor": 25.0,
          "tolerancia": 0.05
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué devuelve `CALCULATE([Ingreso], REMOVEFILTERS(Region[region]))` en la celda Norte-Oficina?",
          "opciones": [
            "El ingreso de Norte-Oficina",
            "El ingreso de la categoría Oficina de todas las regiones",
            "El ingreso total de 2024 sin ningún filtro",
            "Un error"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué ocurre si el denominador del porcentaje es [Ingreso] sin CALCULATE?",
          "opciones": [
            "El resultado es siempre 100 % en cada celda",
            "El resultado es el total",
            "Es un error",
            "El resultado es 0"
          ],
          "correcta": 0
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Qué hace REMOVEFILTERS(Region[region])?",
          "opciones": [
            "Ignora el filtro de región en ese cálculo",
            "Conserva los demás filtros del contexto (como la categoría)",
            "Borra la tabla Region del modelo",
            "Se usa para obtener totales de referencia"
          ],
          "correctas": [
            0,
            1,
            3
          ]
        }
      ],
      "solucion": [
        "Sur-Tecnologia = 471500; total Sur = 535030; 88.1 %.",
        "Norte-Accesorios = 19470; total Accesorios = 77930; 25.0 %.",
        "REMOVEFILTERS quita solo el filtro de región; el de categoría (Oficina) se mantiene.",
        "Con el mismo contexto en ambos lados, el cociente es 1.",
        "REMOVEFILTERS ignora ese filtro, conserva los demás y sirve para totales de referencia."
      ],
      "pistas": [
        "Identifica qué filtros quedan en el denominador."
      ]
    },
    "verificacion": [
      {
        "id": "m45-l2-q1",
        "pregunta": "¿Qué hace CALCULATE([Ingreso], Region[region] = \"Norte\")?",
        "opciones": [
          "Suma las regiones",
          "Evalúa [Ingreso] con el filtro de región reemplazado por Norte",
          "Borra la región Norte",
          "Cuenta filas"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Modifica el contexto de filtro."
      },
      {
        "id": "m45-l2-q2",
        "pregunta": "¿Para qué sirve REMOVEFILTERS dentro de CALCULATE?",
        "opciones": [
          "Para ignorar filtros y obtener un total de referencia",
          "Para borrar datos",
          "Para ordenar",
          "Para crear relaciones"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Quita filtros del contexto en ese cálculo."
      },
      {
        "id": "m45-l2-q3",
        "pregunta": "¿Por qué un % del total con el mismo contexto en numerador y denominador da siempre 100 %?",
        "opciones": [
          "Por un error de Power BI",
          "Porque ambos valores son iguales en cada celda",
          "Porque falta el calendario",
          "No ocurre"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "N ÷ N = 1."
      }
    ],
    "resumen": [
      "CALCULATE evalúa en un contexto modificado.",
      "REMOVEFILTERS/ALL para totales; ALLEXCEPT para porcentajes dentro de un grupo.",
      "Lee: contexto → modificación → cálculo."
    ],
    "proximoPaso": "Aplicaremos CALCULATE al tiempo: acumulado del año y año anterior.",
    "conceptos": [
      "calculate",
      "porcentaje-del-total"
    ]
  },
  {
    "id": "m45-l3",
    "moduloId": "modulo-45",
    "motor": "calculo",
    "titulo": "Inteligencia de tiempo: acumulado del año y año anterior",
    "objetivo": "Leer y calcular el acumulado del año (YTD) y la comparación con el mismo periodo del año anterior a partir de las medidas DAX de inteligencia de tiempo.",
    "porQueImporta": "«¿Cuánto llevamos en el año?» y «¿cómo vamos frente al año pasado?» son las dos preguntas que más se repiten en cualquier reunión de resultados.",
    "concepto": "> **Nota**: DAX no se ejecuta en el navegador de este curso. Cada lección muestra la fórmula tal como se escribe en Power BI Desktop (barra de fórmulas), qué devuelve cada celda del visual y te pide **calcular ese resultado a mano o con la calculadora**; así se aprende a «leer» una medida. Para verlas funcionar de verdad, créalas en Power BI Desktop (gratuito, solo Windows) con los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv).\n\nLas funciones de inteligencia de tiempo requieren una **tabla de fechas** continua, relacionada con los hechos y marcada como tabla de fechas (lección anterior). Las más usadas:\n\n```dax\nIngreso YTD = TOTALYTD([Ingreso], Calendario[Fecha])\n\nIngreso año anterior =\nCALCULATE([Ingreso], SAMEPERIODLASTYEAR(Calendario[Fecha]))\n\nVar % año anterior =\nDIVIDE([Ingreso] - [Ingreso año anterior], [Ingreso año anterior])\n\nIngreso últimos 3 meses =\nCALCULATE([Ingreso], DATESINPERIOD(Calendario[Fecha], MAX(Calendario[Fecha]), -3, MONTH))\n```\n\n- `TOTALYTD` (*year to date*) acumula desde el 1 de enero hasta la fecha del contexto. Admite un tercer argumento para años fiscales que no empiezan en enero.\n- `SAMEPERIODLASTYEAR` devuelve las mismas fechas desplazadas un año atrás: al envolverla en `CALCULATE`, la medida mira el periodo equivalente del año anterior. `DATEADD` generaliza la idea a otros desplazamientos (meses, trimestres).\n- `DATESINPERIOD` define ventanas móviles.\n\nCuidado con los **totales** y los **periodos incompletos**: si el año en curso solo tiene datos hasta octubre, comparar el total del año con el año anterior completo es engañoso; compara contra el mismo periodo (YTD contra YTD).\n\nLos datos de Aurora cubren 24 meses completos (2023 y 2024), así que la comparación año contra año es válida para los 12 meses de 2024.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Leer las medidas en marzo de 2024",
      "datos": [
        {
          "columnas": [
            "Mes",
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun"
          ],
          "filas": [
            [
              "Ingreso 2023",
              135140,
              145930,
              138900,
              152000,
              119120,
              151360
            ],
            [
              "Ingreso 2024",
              174170,
              167140,
              180240,
              147360,
              179600,
              154420
            ]
          ],
          "titulo": "[Ingreso] por mes (primer semestre)"
        }
      ],
      "pantallas": [
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "lineas",
              "titulo": "Ingreso mensual: 2023 frente a 2024 (primer semestre)",
              "etiquetas": [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun"
              ],
              "series": [
                {
                  "nombre": "2024",
                  "valores": [
                    174170,
                    167140,
                    180240,
                    147360,
                    179600,
                    154420
                  ]
                },
                {
                  "nombre": "2023",
                  "valores": [
                    135140,
                    145930,
                    138900,
                    152000,
                    119120,
                    151360
                  ]
                }
              ]
            },
            {
              "tipo": "tarjeta",
              "titulo": "Ingreso YTD a marzo de 2024",
              "valor": "521 550"
            },
            {
              "tipo": "tarjeta",
              "titulo": "Ingreso de marzo de 2023",
              "valor": "138 900",
              "variacion": "+29.8 % marzo 2024 vs. marzo 2023",
              "positivo": true
            }
          ],
          "pagina": "Tiempo"
        }
      ],
      "pasos": [
        "**[Ingreso YTD]** en marzo de 2024 = ene + feb + mar = 174170 + 167140 + 180240 = **521 550**.",
        "**[Ingreso año anterior]** en marzo de 2024 = el ingreso de **marzo de 2023** = **138 900**.",
        "**[Var % año anterior]** = (180240 − 138900) ÷ 138900 = **29.8 %**."
      ],
      "conclusion": "Cada medida mira otro conjunto de fechas, pero todas parten de la misma tabla de calendario."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Una ventana móvil de 3 meses",
      "pantallas": [
        {
          "tipo": "medida",
          "dax": "Ingreso últimos 3 meses =\nCALCULATE(\n    [Ingreso],\n    DATESINPERIOD(Calendario[Fecha], MAX(Calendario[Fecha]), -3, MONTH)\n)",
          "objeto": "medida",
          "tabla": "Medidas",
          "resultado": [
            {
              "contexto": "Contexto: marzo de 2024",
              "valor": "521 550"
            },
            {
              "contexto": "Contexto: abril de 2024",
              "valor": "494 740"
            }
          ]
        }
      ],
      "pasos": [
        "En marzo, la ventana abarca enero, febrero y marzo: 174170 + 167140 + 180240 = **521 550** (coincide con el YTD solo en marzo).",
        "En abril se desplaza: febrero + marzo + abril = 167140 + 180240 + 147360 = **494 740**."
      ],
      "conclusion": "YTD acumula desde enero; la ventana móvil mantiene siempre 3 meses."
    },
    "errorFrecuente": {
      "codigo": "Comparar el ingreso de enero–octubre de 2024 con el total de 2023 completo.",
      "explicacion": "Comparar un periodo incompleto con uno completo da una conclusión falsa. Usa siempre el mismo periodo en ambos lados (por ejemplo, enero–octubre de ambos años), que es lo que hace SAMEPERIODLASTYEAR junto con un acumulado."
    },
    "practicaGuiada": {
      "id": "m45-l3-practica",
      "enunciado": "Con la tabla de ingreso mensual de la lección calcula lo que devolvería cada medida en **abril de 2024**.",
      "datos": [
        {
          "columnas": [
            "Mes",
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun"
          ],
          "filas": [
            [
              "Ingreso 2023",
              135140,
              145930,
              138900,
              152000,
              119120,
              151360
            ],
            [
              "Ingreso 2024",
              174170,
              167140,
              180240,
              147360,
              179600,
              154420
            ]
          ],
          "titulo": "[Ingreso] por mes (primer semestre)"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "[Ingreso YTD] en abril de 2024",
          "valor": 668910,
          "calculo": "=174170+167140+180240+147360"
        },
        {
          "tipo": "numero",
          "etiqueta": "[Ingreso año anterior] en abril de 2024 (ingreso de abril de 2023)",
          "valor": 152000
        },
        {
          "tipo": "numero",
          "etiqueta": "[Var % año anterior] en abril (%, 1 decimal)",
          "valor": -3.1,
          "tolerancia": 0.05
        }
      ],
      "solucion": [
        "YTD abril = 174170 + 167140 + 180240 + 147360 = 668910.",
        "Abril de 2023 = 152000.",
        "(147360 − 152000) ÷ 152000 = -3.1 %."
      ],
      "pistas": [
        "YTD suma los meses desde enero hasta el actual."
      ]
    },
    "reto": {
      "id": "m45-l3-reto",
      "enunciado": "Los 12 meses de 2024 suman 2 122 730 y los de 2023, 1 773 060.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "[Ingreso YTD] en diciembre de 2024",
          "valor": 2122730
        },
        {
          "tipo": "numero",
          "etiqueta": "[Ingreso año anterior] en diciembre de 2024",
          "valor": 1773060
        },
        {
          "tipo": "numero",
          "etiqueta": "[Var % año anterior] del año completo (%, 1 decimal)",
          "valor": 19.7,
          "tolerancia": 0.05
        },
        {
          "tipo": "opcion",
          "etiqueta": "Si 2024 solo tuviera datos hasta junio, comparar su total con el 2023 completo sería…",
          "opciones": [
            "Correcto",
            "Engañoso: hay que comparar enero–junio con enero–junio",
            "Imposible en Power BI",
            "Irrelevante"
          ],
          "correcta": 1
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Qué necesitan las funciones de inteligencia de tiempo para funcionar bien?",
          "opciones": [
            "Una tabla de fechas continua",
            "Que la tabla de fechas esté relacionada con los hechos y marcada como tabla de fechas",
            "Que las fechas tengan huecos",
            "Años completos en el calendario"
          ],
          "correctas": [
            0,
            1,
            3
          ]
        }
      ],
      "solucion": [
        "YTD de diciembre = total del año = 2122730.",
        "Año anterior = 1773060.",
        "(2122730 − 1773060) ÷ 1773060 = 19.7 %.",
        "Periodos de distinta longitud no se comparan.",
        "Calendario continuo, relacionado, marcado y con años completos."
      ],
      "pistas": [
        "En diciembre, el YTD es el año entero."
      ]
    },
    "verificacion": [
      {
        "id": "m45-l3-q1",
        "pregunta": "¿Qué necesitan las funciones de inteligencia de tiempo para funcionar bien?",
        "opciones": [
          "Una tabla de fechas continua y relacionada con los hechos",
          "Ningún requisito",
          "Solo una columna de texto",
          "Un filtro por región"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Sin calendario completo dan resultados vacíos o erróneos."
      },
      {
        "id": "m45-l3-q2",
        "pregunta": "¿Qué hace TOTALYTD?",
        "opciones": [
          "Acumula desde el inicio del año hasta la fecha del contexto",
          "Compara con el año anterior",
          "Calcula el máximo",
          "Cuenta días"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Year to date: acumulado del año."
      },
      {
        "id": "m45-l3-q3",
        "pregunta": "¿Por qué es engañoso comparar el año actual (10 meses) con el año anterior completo?",
        "opciones": [
          "Porque se comparan periodos de distinta longitud",
          "Porque faltan colores",
          "Porque DAX no lo permite",
          "No es engañoso"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Hay que comparar el mismo periodo."
      }
    ],
    "resumen": [
      "TOTALYTD acumula desde enero; SAMEPERIODLASTYEAR mira el mismo periodo un año atrás.",
      "La variación se calcula contra el año anterior del mismo periodo.",
      "Requiere una tabla de fechas continua y marcada."
    ],
    "proximoPaso": "Cerraremos DAX con variables, condicionales y rankings.",
    "conceptos": [
      "inteligencia-de-tiempo",
      "ytd"
    ]
  },
  {
    "id": "m45-l4",
    "moduloId": "modulo-45",
    "motor": "calculo",
    "titulo": "Variables, condicionales y rankings en DAX",
    "objetivo": "Leer medidas con VAR/RETURN y SWITCH, calcular rankings como los de RANKX y clasificar elementos (análisis ABC).",
    "porQueImporta": "Las medidas reales se vuelven largas. Las variables las hacen legibles y más eficientes, y los rankings y clasificaciones («los productos que generan el 80 % del ingreso») son de las preguntas de negocio más frecuentes.",
    "concepto": "> **Nota**: DAX no se ejecuta en el navegador de este curso. Cada lección muestra la fórmula tal como se escribe en Power BI Desktop (barra de fórmulas), qué devuelve cada celda del visual y te pide **calcular ese resultado a mano o con la calculadora**; así se aprende a «leer» una medida. Para verlas funcionar de verdad, créalas en Power BI Desktop (gratuito, solo Windows) con los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv).\n\n**Variables** con `VAR` … `RETURN`: guardan un valor para usarlo después; evitan repetir cálculos y mejoran la lectura.\n\n```dax\nVar % año anterior =\nVAR Actual   = [Ingreso]\nVAR Anterior = [Ingreso año anterior]\nRETURN\n    DIVIDE(Actual - Anterior, Anterior)\n```\n\n**Condicionales**: `IF(condición, si_verdadero, si_falso)` y, para varios casos, `SWITCH(TRUE(), condición1, valor1, condición2, valor2, …, valor_por_defecto)`. Las condiciones se evalúan **en orden** y gana la primera que se cumple.\n\n```dax\nEstado =\nSWITCH(TRUE(),\n    [Ingreso] >= [Meta], \"Verde\",\n    [Ingreso] >= 0.9 * [Meta], \"Amarillo\",\n    \"Rojo\")\n```\n\n**Ranking** con `RANKX(<tabla>, <expresión>, [valor], [orden], [empates])`. El orden por defecto es descendente (el mayor es el puesto 1) y `empates` puede ser `Skip` (por defecto: 1, 1, 3) o `Dense` (1, 1, 2). `TOPN(n, tabla, expresión)` devuelve las `n` filas con mayor valor.\n\n```dax\nRanking producto = RANKX(ALL(Producto[producto]), [Ingreso], , DESC, Dense)\n```\n\n**Análisis ABC (Pareto)**: ordena los elementos de mayor a menor, calcula el **porcentaje acumulado** del total y clasifica. Una convención común: A hasta el 80 % acumulado, B hasta el 95 % y C el resto. Como todo umbral, se acuerda con el negocio.\n\n**Buenas prácticas**: nombres claros, medidas en una tabla propia, formato (miles, porcentaje) definido en la medida, comentarios con `//` y evitar columnas calculadas cuando una medida resuelve el problema.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Un semáforo con SWITCH",
      "pantallas": [
        {
          "tipo": "medida",
          "dax": "Estado =\nSWITCH(\n    TRUE(),\n    [Ingreso] >= [Meta], \"Verde\",\n    [Ingreso] >= 0.9 * [Meta], \"Amarillo\",\n    \"Rojo\"\n)",
          "objeto": "medida",
          "tabla": "Medidas",
          "resultado": [
            {
              "contexto": "Ingreso 410, meta 400",
              "valor": "Verde"
            },
            {
              "contexto": "Ingreso 372, meta 400",
              "valor": "Amarillo"
            },
            {
              "contexto": "Ingreso 340, meta 400",
              "valor": "Rojo"
            }
          ]
        }
      ],
      "pasos": [
        "SWITCH recorre las condiciones **en orden** y devuelve el valor de la primera que se cumple.",
        "410 ≥ 400 → **Verde**. 372 no llega a 400, pero 372 ≥ 0.9 × 400 = 360 → **Amarillo**. 340 < 360 → ninguna → valor por defecto **Rojo**."
      ],
      "conclusion": "Se ordenan de la condición más restrictiva a la más general."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Ranking y análisis ABC de los productos",
      "datos": [
        {
          "columnas": [
            "Puesto",
            "producto",
            "Ingreso 2024",
            "% del total",
            "% acumulado",
            "Clase ABC"
          ],
          "filas": [
            [
              1,
              "Laptop",
              1440000,
              "67.8 %",
              "67.8 %",
              "A"
            ],
            [
              2,
              "Monitor",
              424200,
              "20.0 %",
              "87.8 %",
              "B"
            ],
            [
              3,
              "Silla",
              180600,
              "8.5 %",
              "96.3 %",
              "C"
            ],
            [
              4,
              "Teclado",
              54090,
              "2.5 %",
              "98.9 %",
              "C"
            ],
            [
              5,
              "Mouse",
              23840,
              "1.1 %",
              "100.0 %",
              "C"
            ]
          ]
        }
      ],
      "pantallas": [
        {
          "tipo": "medida",
          "dax": "Ranking producto =\nRANKX(ALL(Producto[producto]), [Ingreso], , DESC, Dense)",
          "objeto": "medida",
          "tabla": "Medidas",
          "resultado": [
            {
              "contexto": "Laptop",
              "valor": "1"
            },
            {
              "contexto": "Monitor",
              "valor": "2"
            },
            {
              "contexto": "Silla",
              "valor": "3"
            },
            {
              "contexto": "Teclado",
              "valor": "4"
            },
            {
              "contexto": "Mouse",
              "valor": "5"
            }
          ]
        }
      ],
      "pasos": [
        "`RANKX` ordena de mayor a menor: el producto con mayor ingreso es el puesto 1.",
        "El ABC suma el porcentaje: Laptop aporta 67.8 %; con Monitor el acumulado llega a 87.8 %.",
        "Con A hasta 80 %, B hasta 95 % y C el resto, se clasifica cada producto por su acumulado."
      ],
      "conclusion": "Pocos productos explican la mayor parte del ingreso: es el principio de Pareto."
    },
    "errorFrecuente": {
      "codigo": "SWITCH(TRUE(), [Ingreso] >= 0.9 * [Meta], \"Amarillo\", [Ingreso] >= [Meta], \"Verde\", \"Rojo\") → «nunca devuelve Verde».",
      "explicacion": "En SWITCH las condiciones se evalúan en orden y gana la primera que se cumple. Si pones primero la condición más amplia (≥ 90 %), los valores que cumplen la meta completa también entran en ella y las demás no se alcanzan nunca. Ordena siempre de la más restrictiva a la más general."
    },
    "practicaGuiada": {
      "id": "m45-l4-practica",
      "enunciado": "Lee estas medidas con los datos de la lección.",
      "datos": [
        {
          "columnas": [
            "producto",
            "Ingreso 2024"
          ],
          "filas": [
            [
              "Laptop",
              1440000
            ],
            [
              "Monitor",
              424200
            ],
            [
              "Silla",
              180600
            ],
            [
              "Teclado",
              54090
            ],
            [
              "Mouse",
              23840
            ]
          ],
          "titulo": "[Ingreso] 2024 por producto"
        }
      ],
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "Estado con ingreso 360 y meta 400 (usando la medida Estado de la lección)",
          "opciones": [
            "Verde",
            "Amarillo",
            "Rojo"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "Estado con ingreso 359 y meta 400",
          "opciones": [
            "Verde",
            "Amarillo",
            "Rojo"
          ],
          "correcta": 2
        },
        {
          "tipo": "numero",
          "etiqueta": "Puesto de «Silla» en el ranking por ingreso 2024 (1 = el mayor)",
          "valor": 3
        },
        {
          "tipo": "numero",
          "etiqueta": "Porcentaje del total que aporta el producto de mayor ingreso (%, 1 decimal)",
          "valor": 67.8,
          "tolerancia": 0.05
        }
      ],
      "solucion": [
        "360 = 0.9 × 400: cumple la segunda condición → Amarillo.",
        "359 < 360: no cumple ninguna → Rojo.",
        "Orden por ingreso: Laptop, Monitor, Silla, Teclado, Mouse.",
        "Laptop: 1440000 ÷ 2122730 = 67.8 %."
      ],
      "pistas": [
        "Ordena los productos de mayor a menor ingreso."
      ]
    },
    "reto": {
      "id": "m45-l4-reto",
      "enunciado": "Clasifica los productos y analiza los empates.",
      "datos": [
        {
          "columnas": [
            "producto",
            "Ingreso 2024"
          ],
          "filas": [
            [
              "Laptop",
              1440000
            ],
            [
              "Monitor",
              424200
            ],
            [
              "Silla",
              180600
            ],
            [
              "Teclado",
              54090
            ],
            [
              "Mouse",
              23840
            ]
          ],
          "titulo": "[Ingreso] 2024 por producto"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "% acumulado de los dos primeros productos (%, 1 decimal)",
          "valor": 87.8,
          "tolerancia": 0.05
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con las reglas de la lección (A hasta 80 %, B hasta 95 %), ¿qué clase tiene Silla?",
          "opciones": [
            "A",
            "B",
            "C"
          ],
          "correcta": 2
        },
        {
          "tipo": "opcion",
          "etiqueta": "Valores 100, 100, 90, 80 con RANKX y empates **Skip**: el puesto del valor 90 es…",
          "opciones": [
            "2",
            "3",
            "4"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con empates **Dense** el puesto del valor 90 es…",
          "opciones": [
            "2",
            "3",
            "4"
          ],
          "correcta": 0
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Qué ventajas tienen las variables (VAR)?",
          "opciones": [
            "Evitan repetir cálculos",
            "Mejoran la legibilidad",
            "Convierten la medida en columna calculada",
            "Pueden hacer la medida más eficiente"
          ],
          "correctas": [
            0,
            1,
            3
          ]
        }
      ],
      "solucion": [
        "Acumulado de Laptop y Monitor: 87.8 %.",
        "Silla llega a 96.3 % acumulado → clase C.",
        "Skip: 1, 1, 3, 4 → el 90 queda en el puesto 3.",
        "Dense: 1, 1, 2, 3 → el 90 queda en el puesto 2.",
        "Las variables evitan repetir, mejoran la lectura y pueden ser más eficientes."
      ],
      "pistas": [
        "Skip salta posiciones tras un empate; Dense no."
      ]
    },
    "verificacion": [
      {
        "id": "m45-l4-q1",
        "pregunta": "¿Qué ventaja tienen las variables (VAR) en DAX?",
        "opciones": [
          "Evitan repetir cálculos y mejoran la legibilidad",
          "Hacen más lento el modelo",
          "Crean columnas",
          "Cambian el filtro"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Se calculan una vez y se reutilizan."
      },
      {
        "id": "m45-l4-q2",
        "pregunta": "En SWITCH(TRUE(), ...), ¿qué ocurre si dos condiciones se cumplen?",
        "opciones": [
          "Gana la primera que se cumple",
          "Gana la última",
          "Es un error",
          "Se devuelven las dos"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Se evalúa en orden."
      },
      {
        "id": "m45-l4-q3",
        "pregunta": "¿Qué diferencia hay entre empates Skip y Dense en RANKX?",
        "opciones": [
          "Ninguna",
          "Con Skip tras un empate se salta una posición (1, 1, 3); con Dense no (1, 1, 2)",
          "Skip no admite empates",
          "Dense solo ordena ascendente"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Cambia la numeración tras un empate."
      }
    ],
    "resumen": [
      "VAR/RETURN: legibilidad y eficiencia.",
      "SWITCH(TRUE(), …): gana la primera condición verdadera.",
      "RANKX y el ABC organizan elementos por su aporte."
    ],
    "proximoPaso": "Pasaremos de las medidas al informe: diseño, interacción y publicación.",
    "conceptos": [
      "variables-dax",
      "rankx",
      "analisis-abc"
    ]
  }
]
