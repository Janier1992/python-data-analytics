import type { Lesson } from '../../types'

export const module24Lessons: Lesson[] = [
  {
    "id": "m24-l1",
    "moduloId": "modulo-24",
    "motor": "calculo",
    "titulo": "Forma de la distribución: asimetría y curtosis",
    "objetivo": "Describir la forma de una distribución —simétrica o sesgada, de colas ligeras o pesadas— y medir el sesgo con el coeficiente de Pearson.",
    "porQueImporta": "La forma de los datos decide qué resumen, qué gráfico y, más adelante, qué prueba estadística son adecuados. Dos variables con la misma media y desviación pueden tener formas completamente distintas.",
    "concepto": "- **Asimetría**: hacia qué lado se estira la cola de la distribución.\n  - Cola larga a la **derecha** → sesgo **positivo** (la media queda por encima de la mediana).\n  - Cola larga a la **izquierda** → sesgo **negativo** (la media queda por debajo de la mediana).\n  - Sin cola dominante → **simétrica** (media ≈ mediana).\n- **Curtosis**: qué tan pesadas son las colas frente a una normal. Colas pesadas = más valores extremos; colas ligeras = menos.\n\nUna medida sencilla del sesgo es el **coeficiente de asimetría de Pearson**:\n\n`Asim = 3 × (media − mediana) ÷ desviación estándar`\n\nRegla práctica: entre −0.5 y 0.5 se considera aproximadamente simétrica; fuera de −1 y 1, claramente sesgada.\n\nEl nombre del sesgo depende de **hacia dónde se estira la cola**, no de dónde se concentran los datos.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Datos: 1, 2, 2, 3, 3, 3, 4, 4, 10",
      "pasos": [
        "Media = 32 ÷ 9 = **3.56**.",
        "Mediana (dato central, el 5.º) = **3**.",
        "Desviación estándar muestral = **2.60**.",
        "Asimetría = 3 × (3.56 − 3) ÷ 2.60 = **0.64**."
      ],
      "conclusion": "La media (3.56) supera a la mediana (3) y el coeficiente es positivo: el valor 10 estira la cola hacia la derecha (sesgo positivo)."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Tres formas con el mismo tipo de resumen",
      "datos": [
        {
          "columnas": [
            "Distribución",
            "Media",
            "Mediana",
            "Desv. estándar",
            "Asimetría"
          ],
          "filas": [
            [
              "Simétrica",
              "50.00",
              50,
              "1.87",
              "0.00"
            ],
            [
              "Cola a la derecha",
              "4.78",
              2,
              "7.64",
              "1.09"
            ],
            [
              "Cola a la izquierda",
              "48.78",
              54,
              "14.65",
              "-1.07"
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "histograma",
          "datos": [
            1,
            1,
            2,
            2,
            2,
            3,
            3,
            4,
            25
          ],
          "titulo": "Cola larga a la derecha",
          "etiquetaX": "Valor"
        }
      ],
      "pasos": [
        "En la simétrica, media y mediana casi coinciden y el coeficiente es cercano a 0.",
        "En la de cola derecha la media es mayor que la mediana (el 25 la arrastra) y el coeficiente es positivo.",
        "En la de cola izquierda ocurre lo contrario: la media es menor que la mediana y el coeficiente es negativo."
      ],
      "conclusion": "Comparar media y mediana es la forma más rápida de intuir el sesgo."
    },
    "errorFrecuente": {
      "codigo": "Media 3.56 > mediana 3 → «hay sesgo a la izquierda».",
      "explicacion": "Se confunde el sentido del sesgo. Si la media supera a la mediana, algunos valores muy altos estiran la cola hacia la derecha: sesgo positivo (a la derecha). El nombre depende de hacia dónde se estira la cola, no de dónde se concentra la mayoría."
    },
    "practicaGuiada": {
      "id": "m24-l1-practica",
      "enunciado": "Estos son los tiempos de espera (minutos) de nueve clientes. Usa la calculadora para la media y la desviación estándar muestral.",
      "datos": [
        {
          "columnas": [
            "Dato",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9"
          ],
          "filas": [
            [
              "Espera (min)",
              2,
              3,
              3,
              4,
              5,
              6,
              6,
              7,
              20
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media (2 decimales)",
          "valor": 6.22
        },
        {
          "tipo": "numero",
          "etiqueta": "Mediana",
          "valor": 5
        },
        {
          "tipo": "numero",
          "etiqueta": "Asimetría de Pearson (2 decimales)",
          "valor": 0.68
        },
        {
          "tipo": "opcion",
          "etiqueta": "La distribución tiene…",
          "opciones": [
            "Sesgo positivo (cola a la derecha)",
            "Sesgo negativo (cola a la izquierda)",
            "Forma simétrica"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "Media = 56 ÷ 9 = 6.22. Mediana (5.º dato ordenado) = 5.",
        "Desviación estándar muestral = 5.43.",
        "Asimetría = 3 × (6.22 − 5) ÷ 5.43 = 0.68.",
        "Es positiva y mayor que 0.5: la espera de 20 minutos estira la cola hacia la derecha."
      ],
      "pistas": [
        "Los datos ya están ordenados; la mediana es el dato central.",
        "Sustituye media, mediana y desviación en la fórmula."
      ]
    },
    "reto": {
      "id": "m24-l1-reto",
      "enunciado": "Una empresa registra los días que tarda en cobrar nueve facturas. Calcula el sesgo y decide qué resumen central usarías.",
      "datos": [
        {
          "columnas": [
            "Dato",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9"
          ],
          "filas": [
            [
              "Días de cobro",
              3,
              28,
              30,
              31,
              32,
              33,
              34,
              35,
              36
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media (2 decimales)",
          "valor": 29.11
        },
        {
          "tipo": "numero",
          "etiqueta": "Mediana",
          "valor": 32
        },
        {
          "tipo": "numero",
          "etiqueta": "Asimetría de Pearson (2 decimales)",
          "valor": -0.86
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué resumen central describe mejor un cobro «típico»?",
          "opciones": [
            "La media, porque usa todos los datos",
            "La mediana, porque la cola izquierda distorsiona la media",
            "La moda siempre",
            "Ninguno"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Media = 262 ÷ 9 = 29.11; mediana = 32.",
        "Desviación estándar = 10.11; asimetría = 3 × (29.11 − 32) ÷ 10.11 = -0.86.",
        "Es negativa: un cobro muy rápido (3 días) estira la cola hacia la izquierda y arrastran la media hacia abajo.",
        "En una distribución sesgada la mediana representa mejor el caso típico."
      ],
      "pistas": [
        "Si la media es menor que la mediana, ¿hacia dónde está la cola?"
      ]
    },
    "verificacion": [
      {
        "id": "m24-l1-q1",
        "pregunta": "Un coeficiente de asimetría de +2.5 indica:",
        "opciones": [
          "Cola larga a la izquierda",
          "Cola larga a la derecha",
          "Distribución simétrica",
          "Datos sin variación"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Un sesgo positivo significa que la cola se estira hacia valores altos (derecha)."
      },
      {
        "id": "m24-l1-q2",
        "pregunta": "Una curtosis alta (colas pesadas) indica:",
        "opciones": [
          "Colas más ligeras que la normal",
          "Más valores extremos que en una normal",
          "Que la media es mayor que la mediana",
          "Que los datos son discretos"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Colas pesadas significan que los valores extremos son más frecuentes."
      }
    ],
    "resumen": [
      "Sesgo positivo: cola a la derecha, media > mediana.",
      "Sesgo negativo: cola a la izquierda, media < mediana.",
      "Asim = 3(media − mediana)/desviación; cerca de 0 es simétrica."
    ],
    "proximoPaso": "Veremos cómo se agrupan los datos numéricos en un histograma.",
    "conceptos": [
      "asimetria",
      "curtosis"
    ]
  },
  {
    "id": "m24-l2",
    "moduloId": "modulo-24",
    "motor": "calculo",
    "titulo": "Histogramas: agrupar datos en clases",
    "objetivo": "Agrupar una variable numérica en clases, construir la tabla de frecuencias y leer la forma de un histograma.",
    "porQueImporta": "El histograma es el gráfico estrella para ver la forma de una variable numérica: dónde se concentra, si es simétrica y si hay grupos o huecos. Pero su aspecto cambia mucho según cuántas clases uses.",
    "concepto": "Un **histograma** divide el rango de la variable en intervalos (clases) y cuenta cuántos datos caen en cada uno. Las barras van **pegadas** porque la variable es continua.\n\n**Cómo construir la tabla de frecuencias**\n\n1. Cuenta los datos `n` y halla el **rango** (máximo − mínimo).\n2. Elige el número de clases `k`. La **regla de Sturges** da un punto de partida: `k = 1 + log₂(n)`, redondeado hacia arriba. (En la calculadora: `=1+LOG(n;2)`.)\n3. La **amplitud** de cada clase es aproximadamente `rango ÷ k`; redondéala a un número cómodo.\n4. Cuenta cuántos datos caen en cada clase. Cada intervalo incluye su borde izquierdo y excluye el derecho (salvo el último, que incluye ambos).\n5. Añade la **frecuencia relativa** (`frecuencia ÷ n`) y la **acumulada**.\n\n¿Cuántas clases? Ni muy pocas (se pierde la forma) ni demasiadas (se ve ruido).",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Datos: 3, 7, 12, 14, 18, 21, 22, 25, 27, 29, 33, 38",
      "datos": [
        {
          "columnas": [
            "Clase",
            "Frecuencia",
            "Frec. relativa",
            "Acumulada"
          ],
          "filas": [
            [
              "[0, 10)",
              2,
              "0.17",
              2
            ],
            [
              "[10, 20)",
              3,
              "0.25",
              5
            ],
            [
              "[20, 30)",
              5,
              "0.42",
              10
            ],
            [
              "[30, 40]",
              2,
              "0.17",
              12
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "histograma",
          "datos": [
            3,
            7,
            12,
            14,
            18,
            21,
            22,
            25,
            27,
            29,
            33,
            38
          ],
          "cortes": [
            0,
            10,
            20,
            30,
            40
          ],
          "titulo": "Histograma con 4 clases",
          "etiquetaX": "Valor"
        }
      ],
      "pasos": [
        "n = 12 datos; rango = 38 − 3 = 35; con 4 clases de amplitud 10 cubrimos de 0 a 40.",
        "Conteo por clase: 2, 3, 5 y 2 datos.",
        "La frecuencia relativa es cada frecuencia ÷ 12; la acumulada va sumando."
      ],
      "conclusion": "La mayoría de los datos están en la clase central [20, 30)."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Tiempos de atención de 20 clientes (minutos)",
      "datos": [
        {
          "columnas": [
            "Dato",
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
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20"
          ],
          "filas": [
            [
              "Minutos",
              12,
              15,
              11,
              18,
              14,
              13,
              16,
              19,
              12,
              15,
              14,
              13,
              17,
              15,
              14,
              16,
              22,
              13,
              15,
              14
            ]
          ]
        },
        {
          "columnas": [
            "Clase",
            "Frecuencia",
            "Frec. relativa",
            "Acumulada"
          ],
          "filas": [
            [
              "[10, 12)",
              1,
              "0.05",
              1
            ],
            [
              "[12, 14)",
              5,
              "0.25",
              6
            ],
            [
              "[14, 16)",
              8,
              "0.40",
              14
            ],
            [
              "[16, 18)",
              3,
              "0.15",
              17
            ],
            [
              "[18, 20)",
              2,
              "0.10",
              19
            ],
            [
              "[20, 22)",
              0,
              "0.00",
              19
            ],
            [
              "[22, 24]",
              1,
              "0.05",
              20
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "histograma",
          "datos": [
            12,
            15,
            11,
            18,
            14,
            13,
            16,
            19,
            12,
            15,
            14,
            13,
            17,
            15,
            14,
            16,
            22,
            13,
            15,
            14
          ],
          "cortes": [
            10,
            12,
            14,
            16,
            18,
            20,
            22,
            24
          ],
          "titulo": "Tiempos de atención",
          "etiquetaX": "Minutos"
        }
      ],
      "pasos": [
        "n = 20 → Sturges: k = 1 + log₂(20) = 5.32 → **6 clases**.",
        "Rango = 22 − 11 = 11 → amplitud ≈ 11 ÷ 6 = 1.83 → usamos amplitud 2 (clases [10, 12), [12, 14), …).",
        "Las frecuencias son 1, 5, 8, 3, 2, 0, 1; suman 20."
      ],
      "conclusion": "Los tiempos se concentran entre 12 y 16 minutos, con una cola corta a la derecha (el 22)."
    },
    "errorFrecuente": {
      "codigo": "Datos: 1, 2, 2, 3, 3, 3, 4, 4, 5, 5. Con 2 clases todo parece plano; con 50 clases casi todas están vacías.",
      "explicacion": "Con muy pocas clases todo se mezcla y no se ve la forma; con demasiadas, cada clase tiene uno o ningún dato y solo se ve ruido. Parte de la regla de Sturges y ajusta hasta que la forma sea clara."
    },
    "practicaGuiada": {
      "id": "m24-l2-practica",
      "enunciado": "Estos son los tiempos de entrega (horas) de 12 pedidos. Agrúpalos en las clases [0, 10), [10, 20), [20, 30) y [30, 40].",
      "datos": [
        {
          "columnas": [
            "Dato",
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
              3,
              7,
              12,
              14,
              18,
              21,
              22,
              25,
              27,
              29,
              33,
              38
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Frecuencia de la clase [0, 10)",
          "valor": 2
        },
        {
          "tipo": "numero",
          "etiqueta": "Frecuencia de la clase [10, 20)",
          "valor": 3
        },
        {
          "tipo": "numero",
          "etiqueta": "Frecuencia de la clase [20, 30)",
          "valor": 5
        },
        {
          "tipo": "numero",
          "etiqueta": "Frecuencia de la clase [30, 40]",
          "valor": 2
        },
        {
          "tipo": "numero",
          "etiqueta": "Frecuencia relativa de la clase [20, 30) (2 decimales)",
          "valor": 0.42
        }
      ],
      "solucion": [
        "[0,10): 3 y 7 → 2. [10,20): 12, 14, 18 → 3.",
        "[20,30): 21, 22, 25, 27, 29 → 5. [30,40]: 33, 38 → 2.",
        "Frecuencia relativa = 5 ÷ 12 = 0.42."
      ],
      "pistas": [
        "Recuerda: el borde izquierdo se incluye y el derecho no (excepto en la última clase)."
      ]
    },
    "reto": {
      "id": "m24-l2-reto",
      "enunciado": "Se registró la edad de 20 clientes de una aplicación. Usa las clases [20, 40), [40, 60), [60, 80) y [80, 100].",
      "datos": [
        {
          "columnas": [
            "Dato",
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
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20"
          ],
          "filas": [
            [
              "Edad",
              23,
              27,
              31,
              35,
              36,
              38,
              41,
              44,
              45,
              47,
              48,
              52,
              55,
              58,
              61,
              66,
              72,
              75,
              80,
              94
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Número de clases sugerido por Sturges (redondeado hacia arriba)",
          "valor": 6,
          "calculo": "=REDONDEAR.MAS(1+LOG(20;2);0)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Frecuencia de [20, 40)",
          "valor": 6
        },
        {
          "tipo": "numero",
          "etiqueta": "Frecuencia de [40, 60)",
          "valor": 8
        },
        {
          "tipo": "numero",
          "etiqueta": "Frecuencia de [60, 80)",
          "valor": 4
        },
        {
          "tipo": "numero",
          "etiqueta": "Frecuencia de [80, 100]",
          "valor": 2
        },
        {
          "tipo": "opcion",
          "etiqueta": "La forma del histograma es…",
          "opciones": [
            "Simétrica",
            "Con cola larga a la derecha",
            "Con cola larga a la izquierda"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "n = 20 → k = 1 + log₂(20) = 5.32 → 6 clases (aquí se usan 4 por comodidad).",
        "Conteo: 6, 8, 4, 2 (suman 20).",
        "Las frecuencias bajan hacia las edades altas: cola larga a la derecha."
      ],
      "pistas": [
        "Para Sturges usa la calculadora: =1+LOG(20;2).",
        "Cuenta clase por clase sin repetir ni saltarte datos."
      ]
    },
    "verificacion": [
      {
        "id": "m24-l2-q1",
        "pregunta": "Si usas demasiadas clases en un histograma:",
        "opciones": [
          "Se ve mejor la forma general",
          "Aparece ruido y la forma se pierde",
          "Siempre se ve una campana",
          "Desaparecen los atípicos"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Con muchas clases cada una tiene pocos datos y se ve ruido, no la forma."
      },
      {
        "id": "m24-l2-q2",
        "pregunta": "La regla de Sturges sugiere el número de clases a partir de:",
        "opciones": [
          "La media",
          "El tamaño de la muestra (n)",
          "La desviación estándar",
          "El máximo"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "k = 1 + log₂(n) depende solo de cuántos datos hay."
      }
    ],
    "resumen": [
      "El histograma cuenta datos por intervalos con barras pegadas.",
      "Tabla de frecuencias: absoluta, relativa y acumulada.",
      "Sturges (k = 1 + log₂ n) es un punto de partida para elegir las clases."
    ],
    "proximoPaso": "Pasamos a estudiar la relación entre dos variables: covarianza y correlación.",
    "conceptos": [
      "histograma",
      "regla-de-sturges"
    ]
  },
  {
    "id": "m24-l3",
    "moduloId": "modulo-24",
    "motor": "calculo",
    "titulo": "Covarianza y correlación de Pearson",
    "objetivo": "Medir la relación lineal entre dos variables numéricas con la covarianza y el coeficiente de correlación de Pearson.",
    "porQueImporta": "Muchas preguntas de negocio son preguntas de relación: ¿más publicidad significa más ventas?, ¿más horas de estudio, mejores notas? La correlación pone un número a esa relación.",
    "concepto": "- **Covarianza** (`s_xy`): indica si dos variables suben juntas (positiva) o una sube cuando la otra baja (negativa). Su valor depende de las unidades, así que es difícil de interpretar.\n- **Correlación de Pearson (r)**: la covarianza estandarizada. Siempre está entre **−1 y +1**.\n\n| r | Interpretación |\n|---|---|\n| cerca de +1 | relación lineal positiva fuerte |\n| cerca de 0 | no hay relación **lineal** |\n| cerca de −1 | relación lineal negativa fuerte |\n\n**Cálculo paso a paso** con una tabla de apoyo:\n\n1. Calcula las medias `x̄` y `ȳ`.\n2. Para cada pareja, halla `x − x̄`, `y − ȳ` y su producto.\n3. `Sxy = Σ(x − x̄)(y − ȳ)`, `Sxx = Σ(x − x̄)²`, `Syy = Σ(y − ȳ)²`.\n4. Covarianza muestral: `s_xy = Sxy ÷ (n − 1)`.\n5. Correlación: `r = Sxy ÷ √(Sxx × Syy)`.\n\nOrientación habitual: |r| < 0.3 débil, 0.3–0.7 moderada, > 0.7 fuerte. Pearson solo detecta relaciones **lineales**.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Horas de estudio (x) y calificación (y) de 5 estudiantes",
      "datos": [
        {
          "columnas": [
            "x",
            "y",
            "x − x̄",
            "y − ȳ",
            "(x−x̄)(y−ȳ)",
            "(x−x̄)²",
            "(y−ȳ)²"
          ],
          "filas": [
            [
              1,
              50,
              "-2",
              "-15",
              "30",
              "4",
              "225"
            ],
            [
              2,
              55,
              "-1",
              "-10",
              "10",
              "1",
              "100"
            ],
            [
              3,
              65,
              "+0",
              "+0",
              "0",
              "0",
              "0"
            ],
            [
              4,
              70,
              "+1",
              "+5",
              "5",
              "1",
              "25"
            ],
            [
              5,
              85,
              "+2",
              "+20",
              "40",
              "4",
              "400"
            ],
            [
              "Suma",
              "",
              "",
              "",
              "85",
              "10",
              "750"
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "dispersion",
          "x": [
            1,
            2,
            3,
            4,
            5
          ],
          "y": [
            50,
            55,
            65,
            70,
            85
          ],
          "titulo": "Horas de estudio y calificación",
          "etiquetaX": "Horas",
          "etiquetaY": "Calificación"
        }
      ],
      "pasos": [
        "Medias: x̄ = 3, ȳ = 65.",
        "Sxy = 85, Sxx = 10, Syy = 750.",
        "Covarianza = 85 ÷ 4 = **21.25**.",
        "r = 85 ÷ √(10 × 750) = **0.981**."
      ],
      "conclusion": "r ≈ 0.98: relación lineal positiva muy fuerte; más horas de estudio van con calificaciones mayores."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Una relación negativa: precio y unidades vendidas",
      "datos": [
        {
          "columnas": [
            "Precio (x)",
            "Unidades (y)"
          ],
          "filas": [
            [
              1,
              9
            ],
            [
              2,
              8
            ],
            [
              3,
              6
            ],
            [
              4,
              5
            ],
            [
              5,
              2
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "dispersion",
          "x": [
            1,
            2,
            3,
            4,
            5
          ],
          "y": [
            9,
            8,
            6,
            5,
            2
          ],
          "titulo": "A mayor precio, menos unidades",
          "etiquetaX": "Precio",
          "etiquetaY": "Unidades"
        }
      ],
      "pasos": [
        "x̄ = 3, ȳ = 6; Sxy = -17, Sxx = 10, Syy = 30.",
        "r = -17 ÷ √(10 × 30) = **-0.981**."
      ],
      "conclusion": "r es negativo y cercano a −1: cuando el precio sube, las unidades vendidas bajan, casi en línea recta."
    },
    "errorFrecuente": {
      "codigo": "r = 0.02 entre x e y → «no hay ninguna relación».",
      "explicacion": "Pearson solo mide relación lineal. Si y = x² con x simétrico alrededor de 0, la relación es perfecta pero curva y r sale ≈ 0. Mira siempre el diagrama de dispersión antes de interpretar r."
    },
    "practicaGuiada": {
      "id": "m24-l3-practica",
      "enunciado": "Una tienda registró la inversión en publicidad (x, miles) y las ventas (y, miles) de cinco semanas. Completa los cálculos con la calculadora.",
      "datos": [
        {
          "columnas": [
            "Semana",
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "filas": [
            [
              "Publicidad (x)",
              2,
              4,
              6,
              8,
              10
            ],
            [
              "Ventas (y)",
              5,
              9,
              6,
              11,
              14
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "dispersion",
          "x": [
            2,
            4,
            6,
            8,
            10
          ],
          "y": [
            5,
            9,
            6,
            11,
            14
          ],
          "etiquetaX": "Publicidad",
          "etiquetaY": "Ventas"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media de x",
          "valor": 6
        },
        {
          "tipo": "numero",
          "etiqueta": "Media de y",
          "valor": 9
        },
        {
          "tipo": "numero",
          "etiqueta": "Sxy = Σ(x − x̄)(y − ȳ)",
          "valor": 40
        },
        {
          "tipo": "numero",
          "etiqueta": "Sxx",
          "valor": 40
        },
        {
          "tipo": "numero",
          "etiqueta": "Syy",
          "valor": 54
        },
        {
          "tipo": "numero",
          "etiqueta": "Correlación r (3 decimales)",
          "valor": 0.861
        }
      ],
      "solucion": [
        "x̄ = 6; ȳ = 9.",
        "Sxy = 40; Sxx = 40; Syy = 54.",
        "r = 40 ÷ √(40 × 54) = 0.861."
      ],
      "pistas": [
        "Arma una tabla con x − x̄, y − ȳ y su producto."
      ]
    },
    "reto": {
      "id": "m24-l3-reto",
      "enunciado": "Con los mismos datos de la práctica, interpreta el resultado.",
      "datos": [
        {
          "columnas": [
            "Semana",
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "filas": [
            [
              "Publicidad (x)",
              2,
              4,
              6,
              8,
              10
            ],
            [
              "Ventas (y)",
              5,
              9,
              6,
              11,
              14
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Covarianza muestral (2 decimales)",
          "valor": 10.0
        },
        {
          "tipo": "opcion",
          "etiqueta": "La relación entre publicidad y ventas es…",
          "opciones": [
            "Lineal positiva fuerte",
            "Lineal negativa fuerte",
            "Prácticamente inexistente"
          ],
          "correcta": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "Si la publicidad se midiera en pesos en vez de miles, ¿qué ocurriría con r?",
          "opciones": [
            "Cambiaría",
            "No cambiaría: r no depende de las unidades",
            "Se haría negativa"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Covarianza = 40 ÷ 4 = 10.00.",
        "r = 0.861 > 0.7: relación lineal positiva fuerte.",
        "r es adimensional: no cambia al cambiar las unidades (la covarianza sí)."
      ],
      "pistas": [
        "La covarianza muestral divide Sxy entre n − 1."
      ]
    },
    "verificacion": [
      {
        "id": "m24-l3-q1",
        "pregunta": "Un valor de r = −0.9 indica:",
        "opciones": [
          "Relación lineal negativa fuerte",
          "Relación lineal positiva fuerte",
          "No hay relación",
          "Un error de cálculo"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "r negativo y cercano a −1: cuando una variable sube, la otra baja de forma casi lineal."
      },
      {
        "id": "m24-l3-q2",
        "pregunta": "¿Qué limitación tiene Pearson?",
        "opciones": [
          "Solo detecta relaciones lineales",
          "Solo funciona con 2 datos",
          "Depende de las unidades",
          "No puede ser negativo"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Una relación curva puede tener r cercano a 0."
      }
    ],
    "resumen": [
      "Covarianza: signo de la relación, depende de las unidades.",
      "r = Sxy ÷ √(Sxx·Syy), entre −1 y 1.",
      "Mira siempre el diagrama de dispersión."
    ],
    "proximoPaso": "Veremos Spearman y por qué correlación no implica causalidad.",
    "conceptos": [
      "covarianza",
      "correlacion-de-pearson"
    ]
  },
  {
    "id": "m24-l4",
    "moduloId": "modulo-24",
    "motor": "calculo",
    "titulo": "Correlación de Spearman y por qué correlación no es causalidad",
    "objetivo": "Calcular la correlación de Spearman con rangos y distinguir correlación de causalidad.",
    "porQueImporta": "Cuando la relación no es lineal o hay valores extremos, Pearson puede engañar. Spearman funciona con **rangos** y es más robusta. Y, sobre todo, una correlación nunca prueba por sí sola que una variable cause la otra.",
    "concepto": "**Spearman (ρ)** es la correlación de Pearson aplicada a los **rangos** (posición de cada dato al ordenarlos de menor a mayor). Mide relaciones **monótonas** (siempre crecientes o siempre decrecientes), no necesariamente rectas.\n\nProcedimiento (sin empates):\n\n1. Asigna rangos 1, 2, 3… a los datos de `x` y, por separado, a los de `y`.\n2. Calcula la diferencia de rangos `d` de cada pareja y `d²`.\n3. `ρ = 1 − 6 × Σd² ÷ (n × (n² − 1))`\n\n**Correlación no es causalidad.** Que dos variables se muevan juntas puede deberse a:\n\n- causalidad real (A causa B),\n- causalidad inversa (B causa A),\n- una **tercera variable** que afecta a ambas (variable confusora),\n- pura coincidencia.\n\nEjemplo clásico: las ventas de helados y los ahogamientos suben juntos; la tercera variable es el calor del verano.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Una relación creciente pero no lineal: y = 2ˣ",
      "datos": [
        {
          "columnas": [
            "x",
            "y",
            "rango x",
            "rango y"
          ],
          "filas": [
            [
              1,
              2,
              1,
              1
            ],
            [
              2,
              4,
              2,
              2
            ],
            [
              3,
              8,
              3,
              3
            ],
            [
              4,
              16,
              4,
              4
            ],
            [
              5,
              32,
              5,
              5
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "dispersion",
          "x": [
            1,
            2,
            3,
            4,
            5
          ],
          "y": [
            2,
            4,
            8,
            16,
            32
          ],
          "titulo": "Creciente pero curva",
          "etiquetaX": "x",
          "etiquetaY": "y"
        }
      ],
      "pasos": [
        "Los rangos de x y de y coinciden en todas las parejas: d = 0 y Σd² = 0.",
        "ρ = 1 − 6 × 0 ÷ (5 × 24) = **1**.",
        "Pearson, en cambio, da r = 0.933: menor que 1 porque la relación no es una recta."
      ],
      "conclusion": "Spearman detecta que la relación es perfectamente monótona aunque no sea lineal."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Seis productos: puntuación de calidad (x) y de satisfacción (y)",
      "datos": [
        {
          "columnas": [
            "Producto",
            "x",
            "y",
            "rango x",
            "rango y",
            "d",
            "d²"
          ],
          "filas": [
            [
              1,
              1,
              1,
              1,
              1,
              0,
              0
            ],
            [
              2,
              2,
              3,
              2,
              3,
              -1,
              1
            ],
            [
              3,
              3,
              2,
              3,
              2,
              1,
              1
            ],
            [
              4,
              4,
              5,
              4,
              5,
              -1,
              1
            ],
            [
              5,
              5,
              4,
              5,
              4,
              1,
              1
            ],
            [
              6,
              6,
              6,
              6,
              6,
              0,
              0
            ],
            [
              "Suma",
              "",
              "",
              "",
              "",
              "",
              4
            ]
          ]
        }
      ],
      "pasos": [
        "Σd² = 4; n = 6.",
        "ρ = 1 − 6 × 4 ÷ (6 × 35) = 1 − 24 ÷ 210 = **0.886**."
      ],
      "conclusion": "ρ ≈ 0.89: asociación monótona positiva fuerte. Aun así, no demuestra que la calidad cause la satisfacción."
    },
    "errorFrecuente": {
      "codigo": "Las ventas de helados y los ahogamientos tienen r = 0.9 → «los helados causan ahogamientos».",
      "explicacion": "Es el error de confundir correlación con causalidad: ambos suben en verano (variable confusora). Para afirmar causalidad hace falta un diseño que la respalde (experimento aleatorizado, control de confusoras, mecanismo plausible), no solo un coeficiente alto."
    },
    "practicaGuiada": {
      "id": "m24-l4-practica",
      "enunciado": "Cinco ciudades: posición por inversión en publicidad (x) y posición por ventas (y). Ya son rangos.",
      "datos": [
        {
          "columnas": [
            "Ciudad",
            "A",
            "B",
            "C",
            "D",
            "E"
          ],
          "filas": [
            [
              "Rango publicidad (x)",
              1,
              2,
              3,
              4,
              5
            ],
            [
              "Rango ventas (y)",
              1,
              3,
              2,
              4,
              5
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Σd²",
          "valor": 2
        },
        {
          "tipo": "numero",
          "etiqueta": "ρ de Spearman (2 decimales)",
          "valor": 0.9
        }
      ],
      "solucion": [
        "Las diferencias de rangos son 0, 1, −1, 0 y 0, con cuadrados 0, 1, 1, 0, 0: Σd² = 2.",
        "ρ = 1 − 6 × 2 ÷ (5 × 24) = 1 − 12/120 = 0.90."
      ],
      "pistas": [
        "d = rango x − rango y; luego se eleva al cuadrado."
      ]
    },
    "reto": {
      "id": "m24-l4-reto",
      "enunciado": "Cinco observaciones, una con un valor extremo en y (100).",
      "datos": [
        {
          "columnas": [
            "Obs.",
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "filas": [
            [
              "x",
              1,
              2,
              3,
              4,
              5
            ],
            [
              "y",
              10,
              12,
              13,
              15,
              100
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Correlación de Spearman (rangos 1-5 vs 1-5)",
          "valor": 1
        },
        {
          "tipo": "numero",
          "etiqueta": "Correlación de Pearson (2 decimales)",
          "valor": 0.74
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué medida describe mejor la tendencia ordenada de los datos?",
          "opciones": [
            "Pearson, porque usa los valores",
            "Spearman, porque trabaja con rangos y no se deja arrastrar por el extremo",
            "Ninguna"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Los rangos de x e y son iguales (1 a 5): Σd² = 0 y ρ = 1.",
        "Pearson = 0.74: el 100 pesa mucho en la fórmula.",
        "Spearman es más robusta ante valores extremos."
      ],
      "pistas": [
        "Para Spearman solo importa el orden, no cuánto vale cada dato."
      ]
    },
    "verificacion": [
      {
        "id": "m24-l4-q1",
        "pregunta": "Spearman se calcula a partir de:",
        "opciones": [
          "Los valores originales",
          "Los rangos de los datos",
          "Solo los extremos",
          "La varianza"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Es Pearson aplicado a los rangos."
      },
      {
        "id": "m24-l4-q2",
        "pregunta": "Dos variables muy correlacionadas implican que:",
        "opciones": [
          "Una causa la otra",
          "Una causa la otra, siempre que r > 0.9",
          "No se puede concluir causalidad solo con la correlación",
          "Son la misma variable"
        ],
        "respuestaCorrecta": 2,
        "explicacion": "La causalidad requiere más que un coeficiente: diseño, control de confusoras y mecanismo."
      }
    ],
    "resumen": [
      "Spearman = Pearson sobre rangos; detecta relaciones monótonas.",
      "ρ = 1 − 6Σd² ÷ (n(n² − 1)) si no hay empates.",
      "Correlación no es causalidad: piensa en confusoras, causalidad inversa y azar."
    ],
    "proximoPaso": "Cerramos con tablas de contingencia para relacionar dos variables categóricas.",
    "conceptos": [
      "spearman",
      "correlacion-vs-causalidad"
    ]
  },
  {
    "id": "m24-l5",
    "moduloId": "modulo-24",
    "motor": "calculo",
    "titulo": "Tablas de contingencia: relacionar dos variables categóricas",
    "objetivo": "Construir e interpretar una tabla de contingencia con totales marginales y porcentajes por fila.",
    "porQueImporta": "Las variables categóricas (canal, segmento, sí/no) no se relacionan con una correlación sino con una tabla cruzada. Es la herramienta base de los análisis de clientes y de las pruebas A/B.",
    "concepto": "Una **tabla de contingencia** cruza dos variables categóricas: las filas son las categorías de una y las columnas, las de la otra. Cada celda es el número de casos con esa combinación.\n\n- Los **totales marginales** son las sumas de filas y columnas.\n- Los **porcentajes por fila** (cada celda ÷ total de su fila) responden: «dentro de cada grupo, ¿qué proporción hace qué?»\n- Si los porcentajes por fila son muy distintos entre filas, hay **asociación** entre las variables; si son parecidos, parecen independientes.\n\nCompara siempre porcentajes, no frecuencias absolutas: dos grupos de tamaño diferente no se comparan por conteos brutos.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Canal de contacto y compra (200 clientes)",
      "datos": [
        {
          "columnas": [
            "Canal",
            "No compra",
            "Compra",
            "Total"
          ],
          "filas": [
            [
              "Correo",
              40,
              60,
              100
            ],
            [
              "Redes",
              25,
              75,
              100
            ],
            [
              "Total",
              65,
              135,
              200
            ]
          ]
        }
      ],
      "pasos": [
        "Totales marginales: 100 por canal; 65 no compran y 135 sí compran.",
        "Porcentaje de compra por fila: correo 60 ÷ 100 = **60 %**; redes 75 ÷ 100 = **75 %**."
      ],
      "conclusion": "Los clientes contactados por redes compran más (75 % frente a 60 %): hay una asociación entre el canal y la compra."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Grupos de distinto tamaño: conviene comparar porcentajes",
      "datos": [
        {
          "columnas": [
            "Plan",
            "Se queda",
            "Se va",
            "Total"
          ],
          "filas": [
            [
              "Básico",
              160,
              40,
              200
            ],
            [
              "Premium",
              70,
              30,
              100
            ],
            [
              "Total",
              230,
              70,
              300
            ]
          ]
        }
      ],
      "pasos": [
        "Básico: 160 ÷ 200 = **80 %** se queda. Premium: 70 ÷ 100 = **70 %** se queda.",
        "Aunque el plan Básico tiene más clientes que se quedan en número, la comparación justa es por porcentaje."
      ],
      "conclusion": "La retención es mayor en el plan Básico (80 % frente a 70 %)."
    },
    "errorFrecuente": {
      "codigo": "Básico tiene 160 retenidos y Premium 70 → «el plan Básico retiene mejor».",
      "explicacion": "Los grupos tienen tamaños distintos (200 y 100), así que los conteos brutos engañan. Hay que comparar porcentajes por fila: 80 % frente a 70 %. En este caso la conclusión coincide, pero con otros tamaños podría invertirse."
    },
    "practicaGuiada": {
      "id": "m24-l5-practica",
      "enunciado": "Una encuesta a 150 personas: 60 mujeres y 90 hombres. De las mujeres, 36 prefieren la app; de los hombres, 36 también.",
      "datos": [
        {
          "columnas": [
            "Sexo",
            "Prefiere la app",
            "No la prefiere",
            "Total"
          ],
          "filas": [
            [
              "Mujeres",
              36,
              24,
              60
            ],
            [
              "Hombres",
              36,
              54,
              90
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Total de personas que prefieren la app",
          "valor": 72
        },
        {
          "tipo": "numero",
          "etiqueta": "% de mujeres que prefieren la app",
          "valor": 60
        },
        {
          "tipo": "numero",
          "etiqueta": "% de hombres que prefieren la app",
          "valor": 40
        }
      ],
      "solucion": [
        "Total que prefiere la app = 36 + 36 = 72.",
        "Mujeres: 36 ÷ 60 = 60 %. Hombres: 36 ÷ 90 = 40 %.",
        "Aunque ambos grupos aportan 36 personas, el porcentaje es muy distinto: hay asociación entre sexo y preferencia."
      ],
      "pistas": [
        "Divide cada celda entre el total de su fila."
      ]
    },
    "reto": {
      "id": "m24-l5-reto",
      "enunciado": "Un comercio quiere saber si el método de pago se relaciona con las devoluciones.",
      "datos": [
        {
          "columnas": [
            "Método",
            "Devuelve",
            "No devuelve",
            "Total"
          ],
          "filas": [
            [
              "Tarjeta",
              25,
              225,
              250
            ],
            [
              "Efectivo",
              30,
              120,
              150
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Total de ventas",
          "valor": 400
        },
        {
          "tipo": "numero",
          "etiqueta": "% de devoluciones con tarjeta",
          "valor": 10
        },
        {
          "tipo": "numero",
          "etiqueta": "% de devoluciones con efectivo",
          "valor": 20
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué conclusión es la más razonable?",
          "opciones": [
            "Las devoluciones son independientes del método de pago",
            "Con efectivo la tasa de devolución es el doble que con tarjeta: parece haber asociación",
            "Con tarjeta hay más devoluciones porque hay más ventas"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Total = 250 + 150 = 400.",
        "Tarjeta: 25 ÷ 250 = 10 %. Efectivo: 30 ÷ 150 = 20 %.",
        "La tasa en efectivo duplica la de tarjeta; la diferencia es de porcentajes, no de conteos."
      ],
      "pistas": [
        "Compara porcentajes por fila, no frecuencias absolutas."
      ]
    },
    "verificacion": [
      {
        "id": "m24-l5-q1",
        "pregunta": "Una tabla de contingencia sirve para:",
        "opciones": [
          "Ver la relación entre dos variables categóricas",
          "Calcular la media",
          "Dibujar un histograma",
          "Medir la curtosis"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Cruza dos variables categóricas y cuenta las combinaciones."
      },
      {
        "id": "m24-l5-q2",
        "pregunta": "Para comparar grupos de tamaño distinto conviene usar:",
        "opciones": [
          "Frecuencias absolutas",
          "Porcentajes por fila",
          "Solo los totales",
          "Solo la última columna"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Los porcentajes ajustan por el tamaño de cada grupo."
      }
    ],
    "resumen": [
      "Tabla de contingencia = cruce de dos variables categóricas.",
      "Totales marginales y porcentajes por fila.",
      "Compara porcentajes, no conteos brutos."
    ],
    "proximoPaso": "En el proyecto final del curso aplicarás todo el análisis descriptivo a un caso completo.",
    "conceptos": [
      "tabla-de-contingencia"
    ]
  }
]
