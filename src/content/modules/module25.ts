import type { Lesson } from '../../types'

export const module25Lessons: Lesson[] = [
  {
    "id": "m25-l1",
    "moduloId": "modulo-25",
    "motor": "calculo",
    "titulo": "Proyecto: define la pregunta y revisa los datos",
    "objetivo": "Plantear una pregunta de análisis, revisar la tabla de datos y clasificar cada variable según su tipo y escala.",
    "porQueImporta": "Todo análisis descriptivo empieza por una pregunta y por conocer los datos: cuántos registros hay, qué mide cada columna y cuáles son realmente cantidades. Aquí aplicas todo el curso a un caso completo.",
    "concepto": "**El caso**: una universidad encuestó a 12 estudiantes sobre sus hábitos y registró su nota. La pregunta:\n\n> *¿Qué hábitos se asocian con mejores notas, y qué tan confiables son los datos que tenemos?*\n\nLas columnas:\n\n| Columna | Qué es | Tipo / escala |\n|---|---|---|\n| Id | identificador | etiqueta (no es una cantidad) |\n| Jornada | mañana, tarde, noche | cualitativa nominal |\n| Horas de estudio | horas por semana | cuantitativa continua (razón) |\n| Horas de sueño | horas por noche | cuantitativa continua (razón) |\n| Nota | nota final de 1 a 5 | cuantitativa continua |\n| Satisfacción | malo < regular < bueno < excelente | cualitativa ordinal |\n\n**Primera revisión de cualquier conjunto de datos**: cuántos registros y variables hay, de qué tipo es cada una y cuántos casos tiene cada categoría. No se calcula nada todavía: se *entiende* el dato.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Tamaño y tipos",
      "datos": [
        {
          "columnas": [
            "Id",
            "Jornada",
            "Horas de estudio/semana",
            "Horas de sueño/noche",
            "Nota (1 a 5)",
            "Satisfacción"
          ],
          "filas": [
            [
              "E01",
              "Mañana",
              4,
              8,
              2.8,
              "regular"
            ],
            [
              "E02",
              "Tarde",
              6,
              7,
              3.2,
              "bueno"
            ],
            [
              "E03",
              "Noche",
              8,
              7,
              3.6,
              "regular"
            ],
            [
              "E04",
              "Mañana",
              10,
              6,
              3.9,
              "bueno"
            ],
            [
              "E05",
              "Tarde",
              12,
              6,
              4.1,
              "excelente"
            ],
            [
              "E06",
              "Noche",
              5,
              8,
              3.0,
              "malo"
            ],
            [
              "E07",
              "Mañana",
              7,
              7,
              3.4,
              "bueno"
            ],
            [
              "E08",
              "Tarde",
              9,
              6,
              3.7,
              "bueno"
            ],
            [
              "E09",
              "Noche",
              11,
              5,
              4.0,
              "excelente"
            ],
            [
              "E10",
              "Mañana",
              14,
              5,
              4.4,
              "excelente"
            ],
            [
              "E11",
              "Tarde",
              3,
              8,
              2.6,
              "malo"
            ],
            [
              "E12",
              "Noche",
              30,
              4,
              4.5,
              "excelente"
            ]
          ],
          "titulo": "Encuesta a 12 estudiantes"
        }
      ],
      "pasos": [
        "**Registros**: 12 estudiantes (filas). **Variables**: 6 (columnas).",
        "Numéricas de verdad: horas de estudio, horas de sueño y nota (3). El Id es una etiqueta.",
        "Categóricas: jornada (nominal) y satisfacción (ordinal)."
      ],
      "conclusion": "3 variables cuantitativas, 2 cualitativas y 1 identificador."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Cuántos estudiantes hay en cada jornada",
      "datos": [
        {
          "columnas": [
            "Jornada",
            "Frecuencia",
            "Porcentaje"
          ],
          "filas": [
            [
              "Mañana",
              4,
              "33.3 %"
            ],
            [
              "Tarde",
              4,
              "33.3 %"
            ],
            [
              "Noche",
              4,
              "33.3 %"
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "barras",
          "categorias": [
            "Mañana",
            "Tarde",
            "Noche"
          ],
          "valores": [
            4,
            4,
            4
          ],
          "titulo": "Estudiantes por jornada",
          "etiquetaY": "Estudiantes"
        }
      ],
      "pasos": [
        "Se cuentan las filas de cada jornada: Mañana 4, Tarde 4, Noche 4.",
        "La muestra está balanceada: 4 estudiantes por jornada."
      ],
      "conclusion": "Con tan pocos casos, cualquier conclusión será orientativa: la muestra es pequeña."
    },
    "errorFrecuente": {
      "codigo": "«El Id va de E01 a E12; su media es 6.5.»",
      "explicacion": "Un identificador solo distingue registros: calcular su media no tiene interpretación. Aunque el id fuese un número (1, 2, 3…), sigue siendo una etiqueta, no una cantidad."
    },
    "practicaGuiada": {
      "id": "m25-l1-practica",
      "enunciado": "Revisa la tabla de datos de la encuesta.",
      "datos": [
        {
          "columnas": [
            "Id",
            "Jornada",
            "Horas de estudio/semana",
            "Horas de sueño/noche",
            "Nota (1 a 5)",
            "Satisfacción"
          ],
          "filas": [
            [
              "E01",
              "Mañana",
              4,
              8,
              2.8,
              "regular"
            ],
            [
              "E02",
              "Tarde",
              6,
              7,
              3.2,
              "bueno"
            ],
            [
              "E03",
              "Noche",
              8,
              7,
              3.6,
              "regular"
            ],
            [
              "E04",
              "Mañana",
              10,
              6,
              3.9,
              "bueno"
            ],
            [
              "E05",
              "Tarde",
              12,
              6,
              4.1,
              "excelente"
            ],
            [
              "E06",
              "Noche",
              5,
              8,
              3.0,
              "malo"
            ],
            [
              "E07",
              "Mañana",
              7,
              7,
              3.4,
              "bueno"
            ],
            [
              "E08",
              "Tarde",
              9,
              6,
              3.7,
              "bueno"
            ],
            [
              "E09",
              "Noche",
              11,
              5,
              4.0,
              "excelente"
            ],
            [
              "E10",
              "Mañana",
              14,
              5,
              4.4,
              "excelente"
            ],
            [
              "E11",
              "Tarde",
              3,
              8,
              2.6,
              "malo"
            ],
            [
              "E12",
              "Noche",
              30,
              4,
              4.5,
              "excelente"
            ]
          ],
          "titulo": "Encuesta a 12 estudiantes"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Número de registros (estudiantes)",
          "valor": 12
        },
        {
          "tipo": "numero",
          "etiqueta": "Número de variables (columnas)",
          "valor": 6
        },
        {
          "tipo": "numero",
          "etiqueta": "Número de variables cuantitativas",
          "valor": 3
        },
        {
          "tipo": "opcion",
          "etiqueta": "La escala de la satisfacción (malo, regular, bueno, excelente) es…",
          "opciones": [
            "Nominal",
            "Ordinal",
            "De razón",
            "De intervalo"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Hay 12 filas y 6 columnas.",
        "Cuantitativas: horas de estudio, horas de sueño y nota.",
        "Las categorías de satisfacción tienen un orden pero no una distancia medible: ordinal."
      ],
      "pistas": [
        "Cuenta filas y columnas; el Id no es una cantidad."
      ]
    },
    "reto": {
      "id": "m25-l1-reto",
      "enunciado": "Con la misma tabla, cuenta categorías.",
      "datos": [
        {
          "columnas": [
            "Id",
            "Jornada",
            "Horas de estudio/semana",
            "Horas de sueño/noche",
            "Nota (1 a 5)",
            "Satisfacción"
          ],
          "filas": [
            [
              "E01",
              "Mañana",
              4,
              8,
              2.8,
              "regular"
            ],
            [
              "E02",
              "Tarde",
              6,
              7,
              3.2,
              "bueno"
            ],
            [
              "E03",
              "Noche",
              8,
              7,
              3.6,
              "regular"
            ],
            [
              "E04",
              "Mañana",
              10,
              6,
              3.9,
              "bueno"
            ],
            [
              "E05",
              "Tarde",
              12,
              6,
              4.1,
              "excelente"
            ],
            [
              "E06",
              "Noche",
              5,
              8,
              3.0,
              "malo"
            ],
            [
              "E07",
              "Mañana",
              7,
              7,
              3.4,
              "bueno"
            ],
            [
              "E08",
              "Tarde",
              9,
              6,
              3.7,
              "bueno"
            ],
            [
              "E09",
              "Noche",
              11,
              5,
              4.0,
              "excelente"
            ],
            [
              "E10",
              "Mañana",
              14,
              5,
              4.4,
              "excelente"
            ],
            [
              "E11",
              "Tarde",
              3,
              8,
              2.6,
              "malo"
            ],
            [
              "E12",
              "Noche",
              30,
              4,
              4.5,
              "excelente"
            ]
          ],
          "titulo": "Encuesta a 12 estudiantes"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Estudiantes de la jornada de la noche",
          "valor": 4
        },
        {
          "tipo": "numero",
          "etiqueta": "Estudiantes con satisfacción «excelente»",
          "valor": 4
        },
        {
          "tipo": "numero",
          "etiqueta": "Porcentaje con satisfacción «excelente» (1 decimal)",
          "valor": 33.3
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Por qué no resumirías el Id con una media?",
          "opciones": [
            "Porque es muy grande",
            "Porque es una etiqueta: su media no significa nada",
            "Porque tiene atípicos"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Noche: E03, E06, E09 y E12 → 4.",
        "Excelente: E05, E09, E10 y E12 → 4; 4 ÷ 12 = 33.3 %.",
        "Un identificador no es una cantidad."
      ],
      "pistas": [
        "Recorre la columna de satisfacción contando «excelente»."
      ]
    },
    "verificacion": [
      {
        "id": "m25-l1-q1",
        "pregunta": "En este conjunto de datos, ¿qué escala tiene la satisfacción?",
        "opciones": [
          "Nominal",
          "Ordinal",
          "De razón",
          "De intervalo"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Las categorías tienen un orden natural pero no una distancia medible: ordinal."
      },
      {
        "id": "m25-l1-q2",
        "pregunta": "¿Por qué el Id no debe incluirse en un resumen numérico?",
        "opciones": [
          "Porque es muy grande",
          "Porque es una etiqueta: su media no significa nada",
          "Porque es negativo",
          "Porque tiene atípicos"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Un identificador solo distingue registros."
      }
    ],
    "resumen": [
      "Un análisis empieza con una pregunta y con conocer los datos.",
      "Clasifica cada variable por su tipo y escala antes de calcular.",
      "Los identificadores son etiquetas aunque sean números."
    ],
    "proximoPaso": "Resumiremos las variables numéricas y buscaremos valores atípicos.",
    "conceptos": [
      "proyecto-estadistica-descriptiva"
    ]
  },
  {
    "id": "m25-l2",
    "moduloId": "modulo-25",
    "motor": "calculo",
    "titulo": "Proyecto: resume las variables numéricas",
    "objetivo": "Resumir una variable numérica con medidas de tendencia central y dispersión y detectar valores atípicos con la regla del IQR.",
    "porQueImporta": "Un buen resumen cabe en pocas líneas pero dice dónde está el centro, cuánto varían los datos y si hay valores que merecen una revisión.",
    "concepto": "Un buen resumen de una variable numérica combina:\n\n- **Centro**: media y mediana.\n- **Dispersión**: desviación estándar y, si hace falta comparar, el coeficiente de variación.\n- **Posición**: cuartiles `Q1` y `Q3` (método de interpolación lineal: posición `1 + (n − 1)p`).\n- **Atípicos**: valores fuera de `[Q1 − 1.5·IQR, Q3 + 1.5·IQR]`.\n\nSi la media y la mediana difieren mucho, o hay atípicos, la mediana y el IQR describen mejor el caso típico. Un atípico se **revisa**, no se borra automáticamente.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Resumen de la nota",
      "datos": [
        {
          "columnas": [
            "Nota",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ],
          "filas": [
            [
              "Valor",
              2.8,
              3.2,
              3.6,
              3.9,
              4.1,
              3.0,
              3.4,
              3.7,
              4.0,
              4.4,
              2.6,
              4.5
            ]
          ]
        }
      ],
      "pasos": [
        "Media = 43.2 ÷ 12 = **3.60**.",
        "Mediana (promedio del 6.º y 7.º dato ordenado) = **3.65**.",
        "Desviación estándar muestral = **0.61**; CV = 17.1 %."
      ],
      "conclusion": "Las notas rondan 3.6 con poca dispersión relativa (17 %): grupo bastante homogéneo."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Horas de estudio: ¿hay algún valor atípico?",
      "datos": [
        {
          "columnas": [
            "Horas",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ],
          "filas": [
            [
              "Valor",
              4,
              6,
              8,
              10,
              12,
              5,
              7,
              9,
              11,
              14,
              3,
              30
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "caja",
          "datos": [
            4,
            6,
            8,
            10,
            12,
            5,
            7,
            9,
            11,
            14,
            3,
            30
          ],
          "titulo": "Horas de estudio por semana",
          "etiquetaX": "Horas"
        }
      ],
      "pasos": [
        "Q1 = 5.75 y Q3 = 11.25 (posiciones 3.75 y 9.25 del orden).",
        "IQR = 5.50; límite superior = 11.25 + 1.5 × 5.50 = **19.500**.",
        "El dato 30 supera el límite: es un atípico. Estudiar 30 horas/semana es posible, pero puede ser un error de captura: hay que verificarlo."
      ],
      "conclusion": "Se marca el dato 30 para revisión antes de seguir con el análisis."
    },
    "errorFrecuente": {
      "codigo": "«Hay un 30 en las horas de estudio: lo borro y no digo nada.»",
      "explicacion": "Eliminar un atípico sin investigar ni documentar oculta información. Puede ser un error (se corrige) o un caso real (se conserva y se explica). Registra siempre qué hiciste y por qué."
    },
    "practicaGuiada": {
      "id": "m25-l2-practica",
      "enunciado": "Resume las horas de sueño por noche de los 12 estudiantes.",
      "datos": [
        {
          "columnas": [
            "Sueño",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ],
          "filas": [
            [
              "Horas",
              8,
              7,
              7,
              6,
              6,
              8,
              7,
              6,
              5,
              5,
              8,
              4
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media (2 decimales)",
          "valor": 6.42
        },
        {
          "tipo": "numero",
          "etiqueta": "Mediana",
          "valor": 6.5
        },
        {
          "tipo": "numero",
          "etiqueta": "Desviación estándar muestral (2 decimales)",
          "valor": 1.31
        },
        {
          "tipo": "numero",
          "etiqueta": "Coeficiente de variación (%, 1 decimal)",
          "valor": 20.4
        }
      ],
      "solucion": [
        "Media = 77 ÷ 12 = 6.42.",
        "Mediana: ordenados, el 6.º y el 7.º valen 6 y 7 → 6.5.",
        "Desviación estándar muestral = 1.31; CV = 20.4 %."
      ],
      "pistas": [
        "Usa la calculadora: =PROMEDIO(…), =MEDIANA(…), =DESVEST.M(…)."
      ]
    },
    "reto": {
      "id": "m25-l2-reto",
      "enunciado": "Aplica la regla del IQR a la nota.",
      "datos": [
        {
          "columnas": [
            "Nota ordenada",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ],
          "filas": [
            [
              "Valor",
              2.6,
              2.8,
              3.0,
              3.2,
              3.4,
              3.6,
              3.7,
              3.9,
              4.0,
              4.1,
              4.4,
              4.5
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Q1 de la nota (2 decimales)",
          "valor": 3.15
        },
        {
          "tipo": "numero",
          "etiqueta": "Q3 de la nota (2 decimales)",
          "valor": 4.025
        },
        {
          "tipo": "numero",
          "etiqueta": "IQR (3 decimales)",
          "valor": 0.875
        },
        {
          "tipo": "numero",
          "etiqueta": "¿Cuántas notas son atípicas?",
          "valor": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué conclusión es correcta?",
          "opciones": [
            "Hay atípicos en la nota que deben eliminarse",
            "No hay atípicos en la nota: ningún valor sale de los límites",
            "La nota es asimétrica a la izquierda"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Q1 = 3.15 (posición 3.75); Q3 = 4.025 (posición 9.25).",
        "IQR = 0.875; límites 1.838 y 5.338.",
        "La nota mínima (2.6) y la máxima (4.5) están dentro: no hay atípicos."
      ],
      "pistas": [
        "Q1 está en la posición 1 + 11 × 0.25 = 3.75: interpola entre el 3.er y el 4.º dato."
      ]
    },
    "verificacion": [
      {
        "id": "m25-l2-q1",
        "pregunta": "Si en una variable hay un atípico fuerte, ¿qué resumen central es más robusto?",
        "opciones": [
          "La media",
          "La mediana",
          "El máximo",
          "La suma"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La mediana casi no cambia por un valor extremo; la media sí."
      },
      {
        "id": "m25-l2-q2",
        "pregunta": "¿Qué haces con un valor atípico?",
        "opciones": [
          "Lo eliminas siempre",
          "Lo investigas y documentas la decisión",
          "Lo ignoras",
          "Lo conviertes en la media"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Un atípico puede ser error o dato real: hay que investigarlo."
      }
    ],
    "resumen": [
      "Centro, dispersión y posición resumen una variable.",
      "La regla del IQR señala atípicos candidatos a revisión.",
      "Documenta todo lo que decidas."
    ],
    "proximoPaso": "Estudiaremos las relaciones entre variables y compararemos grupos.",
    "conceptos": [
      "proyecto-estadistica-descriptiva"
    ]
  },
  {
    "id": "m25-l3",
    "moduloId": "modulo-25",
    "motor": "calculo",
    "titulo": "Proyecto: relaciones entre variables y comparación de grupos",
    "objetivo": "Medir relaciones con la correlación de Pearson, ver el efecto de un atípico y comparar grupos con medias por categoría.",
    "porQueImporta": "La pregunta del proyecto es de relación: ¿qué hábitos se asocian con mejores notas? Para responderla se calculan correlaciones y se comparan grupos, siempre con prudencia.",
    "concepto": "Dos herramientas para este paso:\n\n- **Correlación de Pearson** entre pares de variables numéricas (con la tabla de apoyo `x − x̄`, `y − ȳ` de la lección de correlación, o con la calculadora si tienes una función de correlación).\n- **Comparación de grupos**: la media (o mediana) de una variable numérica dentro de cada categoría.\n\nRecuerda: un **atípico** puede cambiar mucho una correlación, y **correlación no es causalidad**: dos variables pueden estar asociadas por una tercera.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Medias de la nota por jornada",
      "datos": [
        {
          "columnas": [
            "Jornada",
            "Notas",
            "Media"
          ],
          "filas": [
            [
              "Mañana",
              "2.8, 3.9, 3.4, 4.4",
              "3.625"
            ],
            [
              "Tarde",
              "3.2, 4.1, 3.7, 2.6",
              "3.400"
            ],
            [
              "Noche",
              "3.6, 3.0, 4.0, 4.5",
              "3.775"
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "barras",
          "categorias": [
            "Mañana",
            "Tarde",
            "Noche"
          ],
          "valores": [
            3.625,
            3.4,
            3.775
          ],
          "titulo": "Nota media por jornada",
          "etiquetaY": "Nota"
        }
      ],
      "pasos": [
        "Mañana: promedio de sus cuatro notas = **3.625**.",
        "Tarde: promedio de sus cuatro notas = **3.400**.",
        "Noche: promedio de sus cuatro notas = **3.775**."
      ],
      "conclusion": "Las diferencias entre jornadas son pequeñas (menos de 0.4 puntos) y con solo 4 casos por grupo no se pueden considerar concluyentes."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Efecto del atípico en la correlación estudio-nota",
      "datos": [
        {
          "columnas": [
            "Escenario",
            "n",
            "r (estudio, nota)"
          ],
          "filas": [
            [
              "Con todos los estudiantes",
              12,
              "0.82"
            ],
            [
              "Sin el registro de 30 horas",
              11,
              "0.99"
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "dispersion",
          "x": [
            4,
            6,
            8,
            10,
            12,
            5,
            7,
            9,
            11,
            14,
            3,
            30
          ],
          "y": [
            2.8,
            3.2,
            3.6,
            3.9,
            4.1,
            3.0,
            3.4,
            3.7,
            4.0,
            4.4,
            2.6,
            4.5
          ],
          "titulo": "Horas de estudio y nota (con el atípico)",
          "etiquetaX": "Horas",
          "etiquetaY": "Nota"
        }
      ],
      "pasos": [
        "Con todos: r = **0.82**. Sin el registro de 30 horas: r = **0.99**.",
        "Un solo dato extremo cambia visiblemente el coeficiente: por eso se revisa antes de reportar."
      ],
      "conclusion": "La relación estudio-nota es positiva y fuerte en ambos escenarios, pero su valor exacto depende del atípico."
    },
    "errorFrecuente": {
      "codigo": "«Dormir más baja la nota: la correlación entre sueño y nota es −0.95.»",
      "explicacion": "Es un salto causal. En estos datos los estudiantes que más estudian duermen menos: el estudio es una variable confusora. La correlación negativa refleja esa estructura, no que dormir perjudique la nota."
    },
    "practicaGuiada": {
      "id": "m25-l3-practica",
      "enunciado": "Compara la nota media por jornada y la de todo el grupo.",
      "datos": [
        {
          "columnas": [
            "Id",
            "Jornada",
            "Horas de estudio/semana",
            "Horas de sueño/noche",
            "Nota (1 a 5)",
            "Satisfacción"
          ],
          "filas": [
            [
              "E01",
              "Mañana",
              4,
              8,
              2.8,
              "regular"
            ],
            [
              "E02",
              "Tarde",
              6,
              7,
              3.2,
              "bueno"
            ],
            [
              "E03",
              "Noche",
              8,
              7,
              3.6,
              "regular"
            ],
            [
              "E04",
              "Mañana",
              10,
              6,
              3.9,
              "bueno"
            ],
            [
              "E05",
              "Tarde",
              12,
              6,
              4.1,
              "excelente"
            ],
            [
              "E06",
              "Noche",
              5,
              8,
              3.0,
              "malo"
            ],
            [
              "E07",
              "Mañana",
              7,
              7,
              3.4,
              "bueno"
            ],
            [
              "E08",
              "Tarde",
              9,
              6,
              3.7,
              "bueno"
            ],
            [
              "E09",
              "Noche",
              11,
              5,
              4.0,
              "excelente"
            ],
            [
              "E10",
              "Mañana",
              14,
              5,
              4.4,
              "excelente"
            ],
            [
              "E11",
              "Tarde",
              3,
              8,
              2.6,
              "malo"
            ],
            [
              "E12",
              "Noche",
              30,
              4,
              4.5,
              "excelente"
            ]
          ],
          "titulo": "Encuesta a 12 estudiantes"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Nota media de la jornada de la mañana (3 decimales)",
          "valor": 3.625
        },
        {
          "tipo": "numero",
          "etiqueta": "Nota media de la jornada de la tarde (3 decimales)",
          "valor": 3.4
        },
        {
          "tipo": "numero",
          "etiqueta": "Nota media de la jornada de la noche (3 decimales)",
          "valor": 3.775
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué jornada tiene la nota media más alta?",
          "opciones": [
            "Mañana",
            "Tarde",
            "Noche"
          ],
          "correcta": 2
        }
      ],
      "solucion": [
        "Mañana: 2.8 + 3.9 + 3.4 + 4.4 → media 3.625.",
        "Tarde: 3.2 + 4.1 + 3.7 + 2.6 → media 3.400.",
        "Noche: 3.6 + 3.0 + 4.0 + 4.5 → media 3.775."
      ],
      "pistas": [
        "Separa las cuatro notas de cada jornada y promédialas."
      ]
    },
    "reto": {
      "id": "m25-l3-reto",
      "enunciado": "Interpreta las correlaciones del proyecto (ya calculadas con los datos completos).",
      "datos": [
        {
          "columnas": [
            "Id",
            "Jornada",
            "Horas de estudio/semana",
            "Horas de sueño/noche",
            "Nota (1 a 5)",
            "Satisfacción"
          ],
          "filas": [
            [
              "E01",
              "Mañana",
              4,
              8,
              2.8,
              "regular"
            ],
            [
              "E02",
              "Tarde",
              6,
              7,
              3.2,
              "bueno"
            ],
            [
              "E03",
              "Noche",
              8,
              7,
              3.6,
              "regular"
            ],
            [
              "E04",
              "Mañana",
              10,
              6,
              3.9,
              "bueno"
            ],
            [
              "E05",
              "Tarde",
              12,
              6,
              4.1,
              "excelente"
            ],
            [
              "E06",
              "Noche",
              5,
              8,
              3.0,
              "malo"
            ],
            [
              "E07",
              "Mañana",
              7,
              7,
              3.4,
              "bueno"
            ],
            [
              "E08",
              "Tarde",
              9,
              6,
              3.7,
              "bueno"
            ],
            [
              "E09",
              "Noche",
              11,
              5,
              4.0,
              "excelente"
            ],
            [
              "E10",
              "Mañana",
              14,
              5,
              4.4,
              "excelente"
            ],
            [
              "E11",
              "Tarde",
              3,
              8,
              2.6,
              "malo"
            ],
            [
              "E12",
              "Noche",
              30,
              4,
              4.5,
              "excelente"
            ]
          ],
          "titulo": "Encuesta a 12 estudiantes"
        }
      ],
      "graficos": [
        {
          "tipo": "dispersion",
          "x": [
            8,
            7,
            7,
            6,
            6,
            8,
            7,
            6,
            5,
            5,
            8,
            4
          ],
          "y": [
            2.8,
            3.2,
            3.6,
            3.9,
            4.1,
            3.0,
            3.4,
            3.7,
            4.0,
            4.4,
            2.6,
            4.5
          ],
          "titulo": "Horas de sueño y nota",
          "etiquetaX": "Horas de sueño",
          "etiquetaY": "Nota"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Correlación estudio-nota (2 decimales)",
          "valor": 0.82
        },
        {
          "tipo": "numero",
          "etiqueta": "Correlación sueño-nota (2 decimales)",
          "valor": -0.95
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué conclusión es prudente?",
          "opciones": [
            "Dormir menos causa mejores notas",
            "Estudiar más y dormir menos van juntos en estos datos, pero no se puede afirmar causalidad",
            "No hay ninguna relación"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "r(estudio, nota) = 0.82: positiva y fuerte.",
        "r(sueño, nota) = -0.95: negativa y fuerte, pero explicada en parte por el tiempo de estudio.",
        "Correlación no es causalidad; hay una variable confusora."
      ],
      "pistas": [
        "Introduce las 12 parejas en la calculadora o usa Sxy, Sxx y Syy."
      ]
    },
    "verificacion": [
      {
        "id": "m25-l3-q1",
        "pregunta": "Un atípico en x puede…",
        "opciones": [
          "No afectar nunca a r",
          "Cambiar notablemente la correlación",
          "Hacer r igual a 1",
          "Eliminar la covarianza"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Pearson usa los valores originales y es sensible a extremos."
      },
      {
        "id": "m25-l3-q2",
        "pregunta": "Una correlación negativa entre sueño y nota demuestra que…",
        "opciones": [
          "Dormir causa peores notas",
          "No se puede afirmar causalidad: puede haber confusoras",
          "Los datos están mal",
          "La nota baja siempre"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Correlación no implica causalidad."
      }
    ],
    "resumen": [
      "Compara grupos con medidas por categoría.",
      "Revisa cuánto influye un atípico en la correlación.",
      "Interpreta con prudencia: asociación no es causalidad."
    ],
    "proximoPaso": "Cerraremos el proyecto con las conclusiones y el reporte final.",
    "conceptos": [
      "proyecto-estadistica-descriptiva"
    ]
  },
  {
    "id": "m25-l4",
    "moduloId": "modulo-25",
    "motor": "calculo",
    "titulo": "Proyecto: conclusiones y reporte final",
    "objetivo": "Redactar un reporte descriptivo breve con hallazgos, límites y recomendaciones basados en los números.",
    "porQueImporta": "Un análisis solo sirve si se comunica con claridad. El reporte final junta lo que sabes, lo que no puedes afirmar y lo que harías después.",
    "concepto": "Estructura de un reporte descriptivo breve:\n\n1. **Pregunta y datos**: qué se quería saber y con cuántos casos (12 estudiantes).\n2. **Hallazgos clave**: dos o tres cifras que respondan la pregunta (medias, correlaciones, proporciones).\n3. **Calidad de los datos**: atípicos, tamaño de la muestra, posibles sesgos.\n4. **Límites**: asociación no es causalidad; muestra pequeña.\n5. **Recomendaciones / próximos pasos**: qué verificar o medir después.\n\nUna proporción útil: el **porcentaje que aprueba** (nota ≥ 3.0).",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Proporción de estudiantes que aprobó",
      "datos": [
        {
          "columnas": [
            "Nota ordenada",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ],
          "filas": [
            [
              "Valor",
              2.6,
              2.8,
              3.0,
              3.2,
              3.4,
              3.6,
              3.7,
              3.9,
              4.0,
              4.1,
              4.4,
              4.5
            ]
          ]
        }
      ],
      "pasos": [
        "Notas ≥ 3.0: 10 de 12.",
        "Proporción = 10 ÷ 12 = **0.83** (83.3 %)."
      ],
      "conclusion": "Aprobó el 83.3 % del grupo; los 2 restantes tienen nota menor a 3.0."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Un reporte breve",
      "pasos": [
        "**Datos**: encuesta a 12 estudiantes de tres jornadas (4 por jornada).",
        "**Hallazgo 1**: la nota media es 3.60 (mediana 3.65), con poca dispersión (CV 17 %).",
        "**Hallazgo 2**: estudio y nota se asocian positivamente (r = 0.82; 0.99 sin el registro de 30 horas).",
        "**Calidad**: un valor atípico (30 h/semana) debe verificarse; la muestra es muy pequeña.",
        "**Límite**: asociación no es causalidad (sueño y estudio están entrelazados).",
        "**Siguiente paso**: ampliar la muestra y repetir el análisis; en el curso de inferencia veremos cómo medir la incertidumbre."
      ],
      "conclusion": "Un buen reporte cabe en una página y deja claro qué se sabe, qué no y qué hacer."
    },
    "errorFrecuente": {
      "codigo": "«Reporte: estudiar mucho produce notas altas (r = 0.99).»",
      "explicacion": "Afirma causalidad con una correlación, sin mencionar el atípico ni el tamaño de la muestra. Un reporte honesto dice «se asocia», muestra el efecto del atípico y advierte que n = 12 es pequeño."
    },
    "practicaGuiada": {
      "id": "m25-l4-practica",
      "enunciado": "Con las notas del proyecto calcula indicadores para el reporte.",
      "datos": [
        {
          "columnas": [
            "Nota",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ],
          "filas": [
            [
              "Valor",
              2.8,
              3.2,
              3.6,
              3.9,
              4.1,
              3.0,
              3.4,
              3.7,
              4.0,
              4.4,
              2.6,
              4.5
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Número de estudiantes que aprobó (nota ≥ 3.0)",
          "valor": 10
        },
        {
          "tipo": "numero",
          "etiqueta": "Proporción que aprobó (2 decimales)",
          "valor": 0.83
        },
        {
          "tipo": "numero",
          "etiqueta": "Nota mínima",
          "valor": 2.6
        },
        {
          "tipo": "numero",
          "etiqueta": "Nota máxima",
          "valor": 4.5
        }
      ],
      "solucion": [
        "Notas menores a 3.0: 2.8 y 2.6 → aprobaron 10.",
        "Proporción = 10 ÷ 12 = 0.83.",
        "Mínima 2.6; máxima 4.5."
      ],
      "pistas": [
        "Cuenta cuántas notas son menores que 3.0."
      ]
    },
    "reto": {
      "id": "m25-l4-reto",
      "enunciado": "Completa los números del reporte final **excluyendo el registro atípico** (E12, el de 30 horas): quedan 11 estudiantes.",
      "datos": [
        {
          "columnas": [
            "Id",
            "Jornada",
            "Horas de estudio/semana",
            "Horas de sueño/noche",
            "Nota (1 a 5)",
            "Satisfacción"
          ],
          "filas": [
            [
              "E01",
              "Mañana",
              4,
              8,
              2.8,
              "regular"
            ],
            [
              "E02",
              "Tarde",
              6,
              7,
              3.2,
              "bueno"
            ],
            [
              "E03",
              "Noche",
              8,
              7,
              3.6,
              "regular"
            ],
            [
              "E04",
              "Mañana",
              10,
              6,
              3.9,
              "bueno"
            ],
            [
              "E05",
              "Tarde",
              12,
              6,
              4.1,
              "excelente"
            ],
            [
              "E06",
              "Noche",
              5,
              8,
              3.0,
              "malo"
            ],
            [
              "E07",
              "Mañana",
              7,
              7,
              3.4,
              "bueno"
            ],
            [
              "E08",
              "Tarde",
              9,
              6,
              3.7,
              "bueno"
            ],
            [
              "E09",
              "Noche",
              11,
              5,
              4.0,
              "excelente"
            ],
            [
              "E10",
              "Mañana",
              14,
              5,
              4.4,
              "excelente"
            ],
            [
              "E11",
              "Tarde",
              3,
              8,
              2.6,
              "malo"
            ],
            [
              "E12",
              "Noche",
              30,
              4,
              4.5,
              "excelente"
            ]
          ],
          "titulo": "Encuesta a 12 estudiantes"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Estudiantes en el reporte",
          "valor": 11
        },
        {
          "tipo": "numero",
          "etiqueta": "Nota mediana (2 decimales)",
          "valor": 3.6
        },
        {
          "tipo": "numero",
          "etiqueta": "Correlación estudio-nota sin el atípico (2 decimales)",
          "valor": 0.99
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Cuál es la redacción más honesta?",
          "opciones": [
            "Estudiar más causa mejores notas",
            "Estudiar más se asocia con mejores notas en esta muestra pequeña; no se puede afirmar causalidad",
            "Las notas no dependen de nada"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Quedan 11 estudiantes; mediana de sus notas = 3.60.",
        "r(estudio, nota) sin E12 = 0.99.",
        "La redacción honesta menciona asociación, tamaño de muestra y límites."
      ],
      "pistas": [
        "Elimina la fila E12 y vuelve a calcular."
      ]
    },
    "verificacion": [
      {
        "id": "m25-l4-q1",
        "pregunta": "Un reporte descriptivo honesto debe incluir:",
        "opciones": [
          "Solo los resultados favorables",
          "Hallazgos, calidad de los datos y límites",
          "Solo gráficos",
          "Solo la media"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Incluye lo que se sabe, la calidad de los datos y lo que no se puede afirmar."
      },
      {
        "id": "m25-l4-q2",
        "pregunta": "La proporción que aprueba se calcula como:",
        "opciones": [
          "Aprobados ÷ total",
          "Total ÷ aprobados",
          "Aprobados × total",
          "Media de notas"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Proporción = casos que cumplen ÷ casos totales."
      }
    ],
    "resumen": [
      "Pregunta, hallazgos, calidad de datos, límites y siguientes pasos.",
      "Di «se asocia», no «causa».",
      "Comunica también lo que no sabes."
    ],
    "proximoPaso": "Has cerrado Estadística descriptiva. Sigue con Probabilidad: el lenguaje de la incertidumbre.",
    "conceptos": [
      "proyecto-estadistica-descriptiva"
    ]
  }
]
