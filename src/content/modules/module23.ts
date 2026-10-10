import type { Lesson } from '../../types'

export const module23Lessons: Lesson[] = [
  {
    "id": "m23-l1",
    "moduloId": "modulo-23",
    "motor": "calculo",
    "titulo": "Rango, varianza y desviación estándar",
    "objetivo": "Medir la dispersión de una variable con el rango, la varianza y la desviación estándar, y distinguir la versión poblacional de la muestral.",
    "porQueImporta": "Dos grupos pueden tener la misma media y ser completamente distintos: uno muy homogéneo y otro muy variable. La dispersión es la mitad de la historia que la media no cuenta.",
    "concepto": "- **Rango**: máximo menos mínimo. Es simple, pero depende solo de dos valores.\n- **Varianza**: promedio de los **cuadrados** de las desviaciones respecto a la media.\n- **Desviación estándar**: la raíz cuadrada de la varianza. Tiene las mismas unidades que los datos, así que es la más fácil de interpretar.\n\nProcedimiento (a mano o con calculadora):\n\n1. Calcula la media `x̄`.\n2. Resta la media a cada dato: la **desviación** `x − x̄`. (Si las sumas, da 0: por eso se elevan al cuadrado.)\n3. Eleva cada desviación al cuadrado y súmalas: `Σ(x − x̄)²`.\n4. Divide entre `n − 1` si los datos son una **muestra** (varianza muestral, `s²`) o entre `n` si son la **población completa** (varianza poblacional, `σ²`).\n5. La desviación estándar es la raíz cuadrada de la varianza.\n\n**¿Por qué `n − 1` en una muestra?** Las desviaciones se miden respecto a la media de la muestra, que está más cerca de los datos que la media real de la población; dividir entre `n` subestimaría la variabilidad. Dividir entre `n − 1` lo corrige.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Datos de una muestra: 4, 8, 6, 5, 3",
      "datos": [
        {
          "columnas": [
            "x",
            "x − media",
            "(x − media)²"
          ],
          "filas": [
            [
              4,
              "-1.2",
              "1.44"
            ],
            [
              8,
              "+2.8",
              "7.84"
            ],
            [
              6,
              "+0.8",
              "0.64"
            ],
            [
              5,
              "-0.2",
              "0.04"
            ],
            [
              3,
              "-2.2",
              "4.84"
            ],
            [
              "Suma",
              "0",
              "14.80"
            ]
          ]
        }
      ],
      "pasos": [
        "**Rango** = 8 − 3 = **5**.",
        "**Media** = 26 ÷ 5 = **5.2**.",
        "Suma de cuadrados = **14.8**.",
        "**Varianza muestral** = 14.8 ÷ (5 − 1) = **3.70**.",
        "**Desviación estándar** = √3.70 = **1.92**."
      ],
      "conclusion": "Los datos se alejan de la media, en promedio, unas 1.92 unidades."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Misma media, dispersión muy distinta",
      "datos": [
        {
          "columnas": [
            "Grupo",
            "Datos",
            "Media",
            "Rango",
            "Desv. estándar"
          ],
          "filas": [
            [
              "A",
              "48, 50, 52, 49, 51",
              50,
              4,
              "1.58"
            ],
            [
              "B",
              "30, 70, 50, 40, 60",
              50,
              40,
              "15.81"
            ]
          ]
        }
      ],
      "pasos": [
        "Ambos grupos tienen **media 50**: con ese único número parecen iguales.",
        "El grupo A es muy homogéneo (rango 4, desviación 1.58); el grupo B es muy variable (rango 40, desviación 15.81)."
      ],
      "conclusion": "Nunca describas un conjunto de datos solo con su media: acompáñala de una medida de dispersión."
    },
    "errorFrecuente": {
      "codigo": "Datos: 4, 8, 6, 5, 3 (una muestra).\nVarianza = 14.8 ÷ 5 = 2.96 → «la varianza es 2.96»",
      "explicacion": "Dividir entre `n` (5) en lugar de `n − 1` (4) da la varianza poblacional (2.96), que subestima la de la población cuando los datos son una muestra. Para una muestra la varianza es 14.8 ÷ 4 = 3.70. Pregúntate siempre si tus datos son la población completa o una muestra."
    },
    "practicaGuiada": {
      "id": "m23-l1-practica",
      "enunciado": "Estas son las temperaturas máximas (°C) de cinco días: una **muestra** de la temperatura de la ciudad.",
      "datos": [
        {
          "columnas": [
            "Dato",
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "filas": [
            [
              "Temperatura (°C)",
              12,
              15,
              11,
              18,
              14
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Rango (°C)",
          "valor": 7,
          "calculo": "=18-11"
        },
        {
          "tipo": "numero",
          "etiqueta": "Media (°C)",
          "valor": 14,
          "calculo": "=PROMEDIO(12;15;11;18;14)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Varianza muestral (2 decimales)",
          "valor": 7.5,
          "calculo": "=VAR.S(12;15;11;18;14)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Desviación estándar muestral (2 decimales)",
          "valor": 2.74,
          "calculo": "=DESVEST.M(12;15;11;18;14)"
        }
      ],
      "solucion": [
        "Rango = máximo − mínimo = 18 − 11 = 7.",
        "Media = (12 + 15 + 11 + 18 + 14) ÷ 5 = 70 ÷ 5 = 14.",
        "Desviaciones: −2, +1, −3, +4, 0. Cuadrados: 4, 1, 9, 16, 0. Suma = 30.",
        "Varianza muestral = 30 ÷ (5 − 1) = 7.5. Desviación estándar = √7.5 = 2.74."
      ],
      "pistas": [
        "Calcula primero la media; luego las desviaciones y sus cuadrados.",
        "En una muestra se divide entre n − 1 = 4."
      ]
    },
    "reto": {
      "id": "m23-l1-reto",
      "enunciado": "Un taller tiene exactamente **8 trabajadores** y esta tabla muestra su antigüedad en años. Como son **todos** los trabajadores, los datos son la población completa.",
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
            "8"
          ],
          "filas": [
            [
              "Antigüedad (años)",
              2,
              4,
              4,
              4,
              5,
              5,
              7,
              9
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media poblacional (años)",
          "valor": 5,
          "calculo": "=PROMEDIO(2;4;4;4;5;5;7;9)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Varianza poblacional σ² (2 decimales)",
          "valor": 4
        },
        {
          "tipo": "numero",
          "etiqueta": "Desviación estándar poblacional σ (2 decimales)",
          "valor": 2
        },
        {
          "tipo": "numero",
          "etiqueta": "Si por error usaras la fórmula muestral (n − 1), la desviación estándar saldría (2 decimales)",
          "valor": 2.14,
          "calculo": "=DESVEST.M(2;4;4;4;5;5;7;9)"
        }
      ],
      "solucion": [
        "Media = 40 ÷ 8 = 5.",
        "Desviaciones: −3, −1, −1, −1, 0, 0, 2, 4. Cuadrados: 9, 1, 1, 1, 0, 0, 4, 16. Suma = 32.",
        "Poblacional: σ² = 32 ÷ 8 = 4; σ = 2.",
        "Muestral (equivocada aquí): 32 ÷ 7 = 4.57; √4.57 = 2.14."
      ],
      "pistas": [
        "Al ser la población completa, divide entre n = 8."
      ]
    },
    "verificacion": [
      {
        "id": "m23-l1-q1",
        "pregunta": "¿Por qué se prefiere la desviación estándar a la varianza para interpretar?",
        "opciones": [
          "Porque es siempre menor",
          "Porque está en las mismas unidades que los datos",
          "Porque no usa la media",
          "Porque es más fácil de calcular a mano"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La varianza está en unidades al cuadrado; la raíz devuelve las unidades originales."
      },
      {
        "id": "m23-l1-q2",
        "pregunta": "Tienes los datos de TODOS los empleados de una empresa de 40 personas. ¿Entre cuánto divides la suma de cuadrados?",
        "opciones": [
          "39 (n − 1)",
          "40 (n)",
          "38",
          "Da igual"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Es la población completa, no una muestra, así que se divide entre n."
      }
    ],
    "resumen": [
      "El rango usa solo extremos; varianza y desviación usan todos los datos.",
      "La desviación estándar tiene las unidades de los datos.",
      "Muestra: divide entre n − 1. Población completa: divide entre n."
    ],
    "proximoPaso": "Compararemos la dispersión de variables con unidades distintas usando el coeficiente de variación.",
    "conceptos": [
      "rango",
      "varianza",
      "desviacion-estandar"
    ]
  },
  {
    "id": "m23-l2",
    "moduloId": "modulo-23",
    "motor": "calculo",
    "titulo": "Coeficiente de variación: comparar dispersiones",
    "objetivo": "Calcular el coeficiente de variación para comparar la variabilidad relativa de variables con distinta escala o unidades.",
    "porQueImporta": "Una desviación de 5 kg y una de 5 mm no son comparables. El coeficiente de variación convierte la dispersión en un porcentaje de la media, y así permite comparar peras con manzanas.",
    "concepto": "El **coeficiente de variación** (CV) expresa la desviación estándar como proporción de la media:\n\n`CV = desviación estándar ÷ media`\n\nSe suele leer en porcentaje (`× 100`). Un CV bajo indica datos homogéneos; uno alto, datos muy variables respecto a su nivel. Una referencia orientativa (no es una norma): por debajo del 10 % la variabilidad se considera baja; entre 10 % y 30 %, moderada; por encima de 30 %, alta.\n\nÚsalo solo con variables de **razón** (cero real) y con una media **claramente distinta de cero**: si la media es casi 0, el CV se dispara sin sentido.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Ventas diarias (miles de pesos): 90, 100, 110, 95, 105",
      "pasos": [
        "Media = 500 ÷ 5 = **100**.",
        "Desviación estándar muestral = **7.91** (suma de cuadrados 250 ÷ 4 = 62.5; √62.5).",
        "CV = 7.91 ÷ 100 = **0.0791**, es decir, **7.9 %**."
      ],
      "conclusion": "Las ventas se desvían de su media en promedio un 7.9 %: variabilidad baja."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "¿Qué varía más: la estatura o el peso?",
      "datos": [
        {
          "columnas": [
            "Variable",
            "Datos",
            "Media",
            "Desv. estándar",
            "CV"
          ],
          "filas": [
            [
              "Estatura (cm)",
              "160, 165, 170, 175, 180",
              170,
              "7.91",
              "4.7 %"
            ],
            [
              "Peso (kg)",
              "55, 60, 70, 80, 85",
              70,
              "12.75",
              "18.2 %"
            ]
          ]
        }
      ],
      "pasos": [
        "La desviación de la estatura (7.91 cm) y la del peso (12.75 kg) están en unidades distintas: no se pueden comparar directamente.",
        "Con el CV sí: estatura 4.7 % frente a peso 18.2 %."
      ],
      "conclusion": "El peso es mucho más variable que la estatura en este grupo."
    },
    "errorFrecuente": {
      "codigo": "Temperatura media de la semana: 0 °C, desviación estándar 4 °C → CV = 4 ÷ 0 = ¿infinito?",
      "explicacion": "La media es 0, así que el CV no está definido (o se dispara sin sentido). Además los °C son una escala de intervalo (cero arbitrario). El CV solo es válido con variables de razón y una media claramente distinta de cero."
    },
    "practicaGuiada": {
      "id": "m23-l2-practica",
      "enunciado": "Estas son las ventas diarias (miles de pesos) de una tienda durante cinco días (una muestra).",
      "datos": [
        {
          "columnas": [
            "Dato",
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "filas": [
            [
              "Ventas (miles)",
              80,
              90,
              100,
              110,
              120
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media",
          "valor": 100,
          "calculo": "=PROMEDIO(80;90;100;110;120)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Desviación estándar muestral (2 decimales)",
          "valor": 15.81,
          "calculo": "=DESVEST.M(80;90;100;110;120)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Coeficiente de variación (en %, 1 decimal)",
          "valor": 15.8
        }
      ],
      "solucion": [
        "Media = 500 ÷ 5 = 100.",
        "Desviaciones: −20, −10, 0, +10, +20; cuadrados: 400, 100, 0, 100, 400; suma = 1000. Varianza = 1000 ÷ 4 = 250; desviación = 15.81.",
        "CV = 15.81 ÷ 100 = 0.1581 → 15.8 %."
      ],
      "pistas": [
        "CV = desviación estándar ÷ media; multiplica por 100 para el porcentaje."
      ]
    },
    "reto": {
      "id": "m23-l2-reto",
      "enunciado": "Para cinco pedidos se registraron el tiempo de entrega (días) y el costo del envío (miles de pesos). ¿Cuál de las dos variables es relativamente más variable?",
      "datos": [
        {
          "columnas": [
            "Pedido",
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "filas": [
            [
              "Tiempo (días)",
              2,
              3,
              4,
              3,
              3
            ],
            [
              "Costo (miles)",
              20,
              25,
              30,
              22,
              28
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "CV del tiempo de entrega (%, 1 decimal)",
          "valor": 23.6
        },
        {
          "tipo": "numero",
          "etiqueta": "CV del costo del envío (%, 1 decimal)",
          "valor": 16.5
        },
        {
          "tipo": "opcion",
          "etiqueta": "La variable más variable (en términos relativos) es…",
          "opciones": [
            "El tiempo de entrega",
            "El costo del envío"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "Tiempo: media 3.0, desviación 0.707; CV = 23.6 %.",
        "Costo: media 25.0, desviación 4.123; CV = 16.5 %.",
        "El tiempo de entrega tiene el CV mayor."
      ],
      "pistas": [
        "Calcula media y desviación de cada variable por separado.",
        "Compara los coeficientes de variación, no las desviaciones."
      ]
    },
    "verificacion": [
      {
        "id": "m23-l2-q1",
        "pregunta": "¿Qué mide el coeficiente de variación?",
        "opciones": [
          "La media dividida entre la mediana",
          "La desviación estándar como proporción de la media",
          "El rango dividido entre dos",
          "La correlación"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "CV = desviación estándar ÷ media: dispersión relativa."
      },
      {
        "id": "m23-l2-q2",
        "pregunta": "¿Cuándo NO es adecuado el coeficiente de variación?",
        "opciones": [
          "Cuando la variable es de razón",
          "Cuando la media es cercana a cero",
          "Cuando hay más de 30 datos",
          "Cuando los datos son positivos"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Dividir entre una media casi nula hace que el CV se dispare y pierda sentido."
      }
    ],
    "resumen": [
      "CV = desviación estándar ÷ media.",
      "Permite comparar variabilidad entre variables con distintas unidades.",
      "Solo es válido con variables de razón y media lejos de cero."
    ],
    "proximoPaso": "Ahora describiremos la posición de un dato con cuantiles y percentiles.",
    "conceptos": [
      "coeficiente-de-variacion"
    ]
  },
  {
    "id": "m23-l3",
    "moduloId": "modulo-23",
    "motor": "calculo",
    "titulo": "Cuantiles, percentiles y rango intercuartílico",
    "objetivo": "Calcular cuartiles y percentiles y resumir la dispersión central con el rango intercuartílico (IQR).",
    "porQueImporta": "Los percentiles responden preguntas muy concretas: «¿qué tan bueno es este resultado frente al resto?». El IQR resume la dispersión sin dejarse engañar por los extremos.",
    "concepto": "Los **cuantiles** dividen los datos ordenados en partes con igual cantidad de observaciones:\n\n- **Cuartiles**: Q1 (25 %), Q2 (50 %, la mediana) y Q3 (75 %).\n- **Percentil p**: el valor por debajo del cual está el p % de los datos.\n- **IQR** (rango intercuartílico): `Q3 − Q1`. Contiene al 50 % central.\n\n**Cómo calcular un percentil** (método de interpolación lineal, el que usan las hojas de cálculo con `PERCENTIL.INC` y `CUARTIL.INC`):\n\n1. Ordena los datos de menor a mayor.\n2. Calcula su **posición**: `pos = 1 + (n − 1) × p` (con `p` como fracción: 0.25, 0.5, 0.9…).\n3. Si la posición es un entero, ese dato es el percentil. Si tiene decimales, **interpola** entre el dato de la posición entera y el siguiente: `dato_k + parte_decimal × (dato_k+1 − dato_k)`.\n\nExisten otros métodos de cálculo que dan resultados ligeramente distintos con pocos datos; lo importante es usar el mismo método siempre y decir cuál se usó.\n\nA diferencia del rango y la desviación, el IQR es **resistente** a valores extremos.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Nueve datos ordenados: 3, 5, 7, 8, 9, 11, 13, 15, 18",
      "pasos": [
        "**Q1**: pos = 1 + 8 × 0.25 = 3 → es el 3.er dato: **7**.",
        "**Mediana (Q2)**: pos = 1 + 8 × 0.5 = 5 → el 5.º dato: **9**.",
        "**Q3**: pos = 1 + 8 × 0.75 = 7 → el 7.º dato: **13**.",
        "**IQR** = Q3 − Q1 = 13 − 7 = **6**."
      ],
      "conclusion": "El 50 % central de los datos está entre 7 y 13."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Ocho datos (n par, hay que interpolar): 10, 12, 15, 18, 20, 22, 25, 30",
      "graficos": [
        {
          "tipo": "caja",
          "datos": [
            10,
            12,
            15,
            18,
            20,
            22,
            25,
            30
          ],
          "titulo": "Diagrama de caja de los ocho datos",
          "etiquetaX": "Valor"
        }
      ],
      "pasos": [
        "**Q1**: pos = 1 + 7 × 0.25 = 2.75. Entre el 2.º dato (12) y el 3.º (15): 12 + 0.75 × (15 − 12) = **14.25**.",
        "**Q2**: pos = 1 + 7 × 0.5 = 4.5 → 18 + 0.5 × (20 − 18) = **19**.",
        "**Q3**: pos = 1 + 7 × 0.75 = 6.25 → 22 + 0.25 × (25 − 22) = **22.75**.",
        "**Percentil 90**: pos = 1 + 7 × 0.9 = 7.3 → 25 + 0.3 × (30 − 25) = **26.5**.",
        "IQR = 22.75 − 14.25 = **8.5**."
      ],
      "conclusion": "El diagrama de caja dibuja justo estos números: la caja va de Q1 a Q3 y la línea interior es la mediana."
    },
    "errorFrecuente": {
      "codigo": "Un estudiante está en el percentil 90 de una prueba → «sacó el 90 % de la nota máxima».",
      "explicacion": "El percentil habla de posición, no de puntaje: estar en el percentil 90 significa que el 90 % de las personas obtuvo un resultado menor o igual, sin importar cuál fue la nota. Se puede estar en el percentil 90 con 4.0 o con 85 puntos."
    },
    "practicaGuiada": {
      "id": "m23-l3-practica",
      "enunciado": "Estos son los puntajes de diez estudiantes en una prueba (ya ordenados). Usa la interpolación lineal.",
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
            "10"
          ],
          "filas": [
            [
              "Puntaje",
              55,
              60,
              62,
              65,
              70,
              72,
              75,
              80,
              85,
              90
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Q1: percentil 25 (2 decimales)",
          "valor": 62.75
        },
        {
          "tipo": "numero",
          "etiqueta": "Q3: percentil 75 (2 decimales)",
          "valor": 78.75
        },
        {
          "tipo": "numero",
          "etiqueta": "Percentil 90 (1 decimal)",
          "valor": 85.5
        },
        {
          "tipo": "numero",
          "etiqueta": "IQR",
          "valor": 16
        }
      ],
      "solucion": [
        "n = 10. Q1: pos = 1 + 9 × 0.25 = 3.25 → 62 + 0.25 × (65 − 62) = 62.75.",
        "Q3: pos = 1 + 9 × 0.75 = 7.75 → 75 + 0.75 × (80 − 75) = 78.75.",
        "Percentil 90: pos = 1 + 9 × 0.9 = 9.1 → 85 + 0.1 × (90 − 85) = 85.5.",
        "IQR = 78.75 − 62.75 = 16."
      ],
      "pistas": [
        "La posición es 1 + (n − 1) × p.",
        "Si la posición es 3.25, toma el 3.er dato y suma 0.25 de la distancia hasta el 4.º."
      ]
    },
    "reto": {
      "id": "m23-l3-reto",
      "enunciado": "Estos son nueve salarios (millones de pesos), ya ordenados.",
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
              "Salario (millones)",
              1.8,
              2.0,
              2.2,
              2.5,
              2.8,
              3.0,
              3.4,
              4.0,
              6.5
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Q1 (1 decimal)",
          "valor": 2.2
        },
        {
          "tipo": "numero",
          "etiqueta": "Q3 (1 decimal)",
          "valor": 3.4
        },
        {
          "tipo": "numero",
          "etiqueta": "IQR (1 decimal)",
          "valor": 1.2
        },
        {
          "tipo": "opcion",
          "etiqueta": "El rango (máx − mín = 4.7) y el IQR (1.2) describen dispersión. ¿Cuál se deja influir más por el salario de 6.5?",
          "opciones": [
            "El rango",
            "El IQR"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "n = 9. Q1: pos = 1 + 8 × 0.25 = 3 → 3.er dato = 2.2. Q3: pos = 7 → 7.º dato = 3.4.",
        "IQR = 3.4 − 2.2 = 1.2.",
        "Si el 6.5 fuera 20.0, el rango cambiaría muchísimo y el IQR seguiría siendo 1.2: el IQR es resistente."
      ],
      "pistas": [
        "Con n = 9 las posiciones de Q1 y Q3 son enteras: no hace falta interpolar."
      ]
    },
    "verificacion": [
      {
        "id": "m23-l3-q1",
        "pregunta": "El segundo cuartil (Q2) coincide con:",
        "opciones": [
          "La media",
          "La moda",
          "La mediana",
          "El rango"
        ],
        "respuestaCorrecta": 2,
        "explicacion": "Q2 deja el 50 % de los datos por debajo: es la mediana."
      },
      {
        "id": "m23-l3-q2",
        "pregunta": "¿Qué porcentaje de los datos contiene el IQR?",
        "opciones": [
          "25 %",
          "50 %",
          "75 %",
          "100 %"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Va de Q1 a Q3: contiene el 50 % central."
      }
    ],
    "resumen": [
      "Los cuartiles dividen los datos en cuatro partes iguales.",
      "Posición del percentil: 1 + (n − 1) × p, con interpolación si no es entera.",
      "El IQR (Q3 − Q1) resume la dispersión central y resiste a extremos."
    ],
    "proximoPaso": "Veremos cómo estandarizar valores con puntuaciones z.",
    "conceptos": [
      "cuantiles",
      "percentiles",
      "iqr"
    ]
  },
  {
    "id": "m23-l4",
    "moduloId": "modulo-23",
    "motor": "calculo",
    "titulo": "Puntuaciones z: medir qué tan lejos está un dato",
    "objetivo": "Estandarizar valores con puntuaciones z para compararlos entre distribuciones distintas.",
    "porQueImporta": "¿Quién destacó más: quien sacó 85 en un examen difícil o quien sacó 92 en uno fácil? La puntuación z responde ubicando cada resultado respecto a su propio grupo.",
    "concepto": "La **puntuación z** indica a cuántas desviaciones estándar está un valor de la media:\n\n`z = (valor − media) ÷ desviación estándar`\n\n- `z = 0`: el valor está justo en la media.\n- `z = +2`: dos desviaciones por encima (es un valor alto).\n- `z = −1`: una desviación por debajo.\n\nComo no tiene unidades, permite comparar variables distintas. Por convención, valores con `|z| > 3` se consideran muy poco comunes (y con `|z| > 2`, inusuales).\n\nEl procedimiento inverso también es útil: si conoces `z`, el valor es `media + z × desviación`.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Una estatura de 170 cm en un grupo con media 165 cm y desviación 5 cm",
      "pasos": [
        "z = (170 − 165) ÷ 5 = **+1**.",
        "Interpretación: esa persona mide una desviación estándar más que el promedio."
      ],
      "conclusion": "Un z de +1 es una persona algo más alta que la mayoría, pero nada excepcional."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Dos exámenes con dificultad distinta",
      "datos": [
        {
          "columnas": [
            "Estudiante",
            "Nota",
            "Media del grupo",
            "Desv. estándar"
          ],
          "filas": [
            [
              "Sara (examen difícil)",
              70,
              60,
              5
            ],
            [
              "Pablo (examen fácil)",
              88,
              80,
              8
            ]
          ]
        }
      ],
      "pasos": [
        "Sara: z = (70 − 60) ÷ 5 = **+2.00**.",
        "Pablo: z = (88 − 80) ÷ 8 = **+1.00**.",
        "Sara tiene el mayor z: está 2 desviaciones por encima de su grupo; Pablo, solo 1."
      ],
      "conclusion": "Aunque la nota de Pablo es más alta (88 frente a 70), el desempeño relativo de Sara fue mejor."
    },
    "errorFrecuente": {
      "codigo": "Media del grupo: 80. Un estudiante saca 90 → «su puntuación z es 90 − 80 = 10».",
      "explicacion": "Restar la media solo centra los datos; falta dividir entre la desviación estándar para que el resultado esté en «desviaciones estándar». Sin ese paso no es una puntuación z y no se puede comparar entre variables."
    },
    "practicaGuiada": {
      "id": "m23-l4-practica",
      "enunciado": "Las notas de un grupo de cinco estudiantes son 70, 75, 80, 85 y 90 (es la muestra completa del grupo).",
      "datos": [
        {
          "columnas": [
            "Dato",
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "filas": [
            [
              "Nota",
              70,
              75,
              80,
              85,
              90
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media del grupo",
          "valor": 80
        },
        {
          "tipo": "numero",
          "etiqueta": "Desviación estándar muestral (2 decimales)",
          "valor": 7.91,
          "calculo": "=DESVEST.M(70;75;80;85;90)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Puntuación z de quien sacó 85 (2 decimales)",
          "valor": 0.63
        }
      ],
      "solucion": [
        "Media = 400 ÷ 5 = 80.",
        "Desviaciones: −10, −5, 0, 5, 10; cuadrados: 100, 25, 0, 25, 100; suma = 250. Varianza = 250 ÷ 4 = 62.5; desviación = 7.91.",
        "z = (85 − 80) ÷ 7.91 = 0.63."
      ],
      "pistas": [
        "z = (valor − media) ÷ desviación estándar."
      ]
    },
    "reto": {
      "id": "m23-l4-reto",
      "enunciado": "Ana sacó 85 en el examen difícil (media del grupo 70, desviación 10). Luis sacó 92 en el examen fácil (media 84, desviación 8).",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "z de Ana",
          "valor": 1.5,
          "calculo": "=(85-70)/10"
        },
        {
          "tipo": "numero",
          "etiqueta": "z de Luis",
          "valor": 1,
          "calculo": "=(92-84)/8"
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Quién tuvo el mejor desempeño relativo?",
          "opciones": [
            "Ana",
            "Luis",
            "Empataron"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "Ana: (85 − 70) ÷ 10 = 1.5.",
        "Luis: (92 − 84) ÷ 8 = 1.0.",
        "Ana está 1.5 desviaciones por encima de su grupo; Luis, 1.0: Ana destacó más."
      ],
      "pistas": [
        "Calcula el z de cada uno con su propia media y su propia desviación."
      ]
    },
    "verificacion": [
      {
        "id": "m23-l4-q1",
        "pregunta": "Un valor con z = −2 significa que está:",
        "opciones": [
          "2 unidades por encima de la media",
          "2 desviaciones estándar por debajo de la media",
          "En la media",
          "En el percentil 2"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "El signo indica dirección y el número, cuántas desviaciones estándar."
      },
      {
        "id": "m23-l4-q2",
        "pregunta": "¿Por qué sirve el z para comparar variables distintas?",
        "opciones": [
          "Porque no tiene unidades",
          "Porque siempre es positivo",
          "Porque usa la mediana",
          "Porque elimina los outliers"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Al dividir entre la desviación estándar las unidades se cancelan."
      }
    ],
    "resumen": [
      "z = (valor − media) ÷ desviación estándar.",
      "Indica cuántas desviaciones se aleja un dato de su media.",
      "Permite comparar resultados de distribuciones diferentes."
    ],
    "proximoPaso": "Usaremos la regla del IQR y los diagramas de caja para detectar valores atípicos.",
    "conceptos": [
      "puntuacion-z",
      "estandarizacion"
    ]
  },
  {
    "id": "m23-l5",
    "moduloId": "modulo-23",
    "motor": "calculo",
    "titulo": "Valores atípicos: regla del IQR y diagrama de caja",
    "objetivo": "Detectar valores atípicos con la regla del IQR y decidir qué hacer con ellos.",
    "porQueImporta": "Un solo dato extraño puede arruinar una media o una conclusión. Detectarlo es fácil; lo difícil (y lo importante) es decidir si es un error, un caso real o información valiosa.",
    "concepto": "La regla más usada define los límites con el IQR:\n\n`límite inferior = Q1 − 1.5 × IQR`\n`límite superior = Q3 + 1.5 × IQR`\n\nTodo valor fuera de esos límites es un **posible atípico** (es la misma regla que dibuja los puntos sueltos en un diagrama de caja).\n\n**Un atípico no es automáticamente un error.** Antes de eliminarlo pregúntate: ¿es un error de captura (un precio con un cero de más)?, ¿es un caso real pero excepcional?, ¿es justo lo que busco (un posible fraude)? Documenta siempre lo que decidas y por qué.\n\nEn el **diagrama de caja** (*boxplot*): la caja va de Q1 a Q3, la línea interior es la mediana, los «bigotes» llegan al dato más extremo que aún cae dentro de los límites, y los puntos sueltos son los atípicos.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Nueve datos: 10, 12, 12, 13, 14, 15, 16, 18, 40",
      "graficos": [
        {
          "tipo": "caja",
          "datos": [
            10,
            12,
            12,
            13,
            14,
            15,
            16,
            18,
            40
          ],
          "titulo": "Un valor muy alejado del resto",
          "etiquetaX": "Valor"
        }
      ],
      "pasos": [
        "Q1 = 12 y Q3 = 16 (posiciones 3 y 7 de 9 datos); IQR = 16 − 12 = **4**.",
        "Límite inferior = 12 − 1.5 × 4 = **6**.",
        "Límite superior = 16 + 1.5 × 4 = **22**.",
        "El dato **40** supera 22: es un posible atípico. Los demás están entre 6 y 22."
      ],
      "conclusion": "Antes de eliminar el 40, hay que averiguar su origen (¿un error de captura o un caso real?)."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Precios de once productos (ordenados): 2, 20, 22, 23, 25, 26, 28, 29, 31, 32, 60",
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
            "11"
          ],
          "filas": [
            [
              "Precio (miles)",
              2,
              20,
              22,
              23,
              25,
              26,
              28,
              29,
              31,
              32,
              60
            ]
          ]
        }
      ],
      "pasos": [
        "n = 11: Q1 = posición 1 + 10 × 0.25 = 3.5 → entre 23 y 25 = **22**; Q3 = posición 8.5 → entre 31 y 32 = **30.0**.",
        "IQR = 30.0 − 22 = **7.5**.",
        "Límites: 22 − 1.5 × 7.5 = **11.25** y 30.0 + 1.5 × 7.5 = **41.25**.",
        "Atípicos: **2** (por debajo del límite inferior) y **60** (por encima del superior)."
      ],
      "conclusion": "Hay atípicos en ambos extremos: el 2 podría ser un precio mal digitado y el 60, un producto de gama alta."
    },
    "errorFrecuente": {
      "codigo": "«Elimino todo lo que sea mayor que 50, porque me parece demasiado alto.»",
      "explicacion": "Un límite arbitrario no es un criterio estadístico: depende de tu intuición y no se puede justificar ni reproducir con otros datos. Calcula los límites con el IQR y documenta por qué eliminas (o conservas) cada atípico."
    },
    "practicaGuiada": {
      "id": "m23-l5-practica",
      "enunciado": "Con estos nueve datos, aplica la regla del IQR (interpolación lineal).",
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
              "Dato",
              5,
              7,
              8,
              9,
              10,
              11,
              12,
              14,
              30
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Q1",
          "valor": 8.0
        },
        {
          "tipo": "numero",
          "etiqueta": "Q3",
          "valor": 12.0
        },
        {
          "tipo": "numero",
          "etiqueta": "IQR",
          "valor": 4.0
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite superior (Q3 + 1.5 × IQR)",
          "valor": 18.0
        }
      ],
      "solucion": [
        "n = 9: Q1 es el 3.er dato = 8; Q3 es el 7.º dato = 12.",
        "IQR = 12 − 8 = 4.",
        "Límite superior = 12 + 1.5 × 4 = 18. (El dato 30 lo supera: es un atípico.)"
      ],
      "pistas": [
        "Con n = 9 las posiciones 3 y 7 son enteras.",
        "Límite superior = Q3 + 1.5 × IQR."
      ]
    },
    "reto": {
      "id": "m23-l5-reto",
      "enunciado": "Estos son los precios (miles de pesos) de once productos de una tienda; ya están ordenados. Q1 = 22.5 y Q3 = 30.",
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
            "11"
          ],
          "filas": [
            [
              "Precio (miles)",
              2,
              20,
              22,
              23,
              25,
              26,
              28,
              29,
              31,
              32,
              60
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "IQR",
          "valor": 7.5
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite inferior (2 decimales)",
          "valor": 11.25
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite superior (2 decimales)",
          "valor": 41.25
        },
        {
          "tipo": "numero",
          "etiqueta": "¿Cuántos precios son atípicos?",
          "valor": 2
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué conviene hacer con los atípicos?",
          "opciones": [
            "Eliminarlos siempre",
            "Dejarlos siempre",
            "Investigar si son errores o casos reales y documentar la decisión",
            "Sustituirlos por la media sin mirar"
          ],
          "correcta": 2
        }
      ],
      "solucion": [
        "IQR = 30 − 22.5 = 7.5.",
        "Límite inferior = 22.5 − 1.5 × 7.5 = 11.25. Límite superior = 30 + 11.25 = 41.25.",
        "Fuera de los límites: 2 (< 11.25) y 60 (> 41.25): dos atípicos.",
        "Un atípico es un candidato a revisión, no un error automático."
      ],
      "pistas": [
        "Aplica Q1 − 1.5 × IQR y Q3 + 1.5 × IQR y compara cada precio."
      ]
    },
    "verificacion": [
      {
        "id": "m23-l5-q1",
        "pregunta": "Según la regla del IQR, un valor es atípico si está fuera de:",
        "opciones": [
          "Media ± 1 desviación",
          "Q1 − 1.5·IQR y Q3 + 1.5·IQR",
          "El rango",
          "Mediana ± 10"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Esos son los límites estándar de los diagramas de caja."
      },
      {
        "id": "m23-l5-q2",
        "pregunta": "Encuentras un valor atípico en tus datos de ventas. Lo correcto es:",
        "opciones": [
          "Eliminarlo siempre",
          "Dejarlo siempre",
          "Investigar si es un error o un caso real antes de decidir",
          "Reemplazarlo por la media sin mirar"
        ],
        "respuestaCorrecta": 2,
        "explicacion": "Un atípico puede ser un error o información valiosa; hay que investigarlo y documentar la decisión."
      }
    ],
    "resumen": [
      "Límites: Q1 − 1.5·IQR y Q3 + 1.5·IQR.",
      "Un atípico es un candidato a revisar, no un error automático.",
      "Documenta siempre qué haces con los atípicos y por qué."
    ],
    "proximoPaso": "En el siguiente módulo estudiaremos la forma de la distribución y la relación entre variables.",
    "conceptos": [
      "valores-atipicos",
      "regla-iqr"
    ]
  }
]
