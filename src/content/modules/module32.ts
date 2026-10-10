import type { Lesson } from '../../types'

export const module32Lessons: Lesson[] = [
  {
    "id": "m32-l1",
    "moduloId": "modulo-32",
    "motor": "calculo",
    "titulo": "Regresión lineal simple",
    "objetivo": "Ajustar una recta de mínimos cuadrados, interpretar su pendiente e intercepto y hacer predicciones dentro del rango de los datos.",
    "porQueImporta": "La regresión cuantifica «cuánto cambia y por cada unidad de x» y permite predecir. Es la herramienta base de la analítica predictiva y del aprendizaje automático supervisado.",
    "concepto": "El modelo de **regresión lineal simple** es `ŷ = b₀ + b₁·x`, donde:\n\n- `b₁` (**pendiente**): cuánto cambia `y` en promedio cuando `x` sube una unidad.\n- `b₀` (**intercepto**): el valor predicho cuando `x = 0` (solo tiene sentido si `x = 0` es plausible).\n\nLos coeficientes de **mínimos cuadrados** (los que minimizan la suma de los errores al cuadrado) se obtienen con las sumas de la lección de correlación:\n\n`b₁ = Sxy ÷ Sxx`   y   `b₀ = ȳ − b₁·x̄`\n\ncon `Sxy = Σ(x − x̄)(y − ȳ)` y `Sxx = Σ(x − x̄)²`. La recta siempre pasa por el punto `(x̄, ȳ)`.\n\n**Extrapolar** (predecir fuera del rango de `x` observado) es arriesgado: la relación puede dejar de ser lineal.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Horas de estudio (x) y calificación (y)",
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
              "Horas",
              1,
              2,
              3,
              4,
              5
            ],
            [
              "Calificación",
              50,
              55,
              65,
              70,
              85
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
          "recta": {
            "a": 39.5,
            "b": 8.5
          },
          "titulo": "Recta ajustada",
          "etiquetaX": "Horas",
          "etiquetaY": "Calificación"
        }
      ],
      "pasos": [
        "x̄ = 3, ȳ = 65; Sxy = 85, Sxx = 10.",
        "b₁ = 85 ÷ 10 = **8.5**.",
        "b₀ = 65 − 8.5 × 3 = **39.5**.",
        "Modelo: ŷ = 39.5 + 8.5·x."
      ],
      "conclusion": "Cada hora adicional de estudio se asocia con 8.5 puntos más de calificación, en promedio."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Predecir y evitar la extrapolación",
      "pasos": [
        "Predicción para 3.5 horas: ŷ = 39.5 + 8.5 × 3.5 = **69.25** (dentro del rango 1–5: razonable).",
        "Predicción para 12 horas: ŷ = 39.5 + 8.5 × 12 = 141.5: ¡más de 100! Es extrapolación, no se debe confiar."
      ],
      "conclusion": "La recta solo es fiable dentro del rango de x observado."
    },
    "errorFrecuente": {
      "codigo": "«La pendiente es 8.5, así que estudiar una hora más causa 8.5 puntos más.»",
      "explicacion": "La regresión describe una asociación. Los estudiantes que estudian más pueden diferir en motivación o conocimientos previos. Para hablar de causa hace falta un diseño que controle esos factores."
    },
    "practicaGuiada": {
      "id": "m32-l1-practica",
      "enunciado": "Una tienda registró la inversión en publicidad (x, miles) y las ventas (y, miles) de cinco semanas.",
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
              "Publicidad",
              2,
              4,
              6,
              8,
              10
            ],
            [
              "Ventas",
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
          "recta": {
            "a": 3.0,
            "b": 1.0
          },
          "etiquetaX": "Publicidad",
          "etiquetaY": "Ventas"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Pendiente b₁",
          "valor": 1.0
        },
        {
          "tipo": "numero",
          "etiqueta": "Intercepto b₀",
          "valor": 3.0
        },
        {
          "tipo": "numero",
          "etiqueta": "Predicción de ventas con 7 de publicidad",
          "valor": 10,
          "calculo": "=3+1*7"
        },
        {
          "tipo": "numero",
          "etiqueta": "Predicción con 5 de publicidad",
          "valor": 8
        }
      ],
      "solucion": [
        "x̄ = 6, ȳ = 9; Sxy = 40; Sxx = 40.",
        "b₁ = 40 ÷ 40 = 1; b₀ = 9 − 1 × 6 = 3.",
        "ŷ = 3 + x: con x = 7 → 10; con x = 5 → 8."
      ],
      "pistas": [
        "Usa Sxy y Sxx de la lección anterior."
      ]
    },
    "reto": {
      "id": "m32-l1-reto",
      "enunciado": "Precio (x) y unidades vendidas (y) de un producto en cinco tiendas.",
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
              "Precio",
              1,
              2,
              3,
              4,
              5
            ],
            [
              "Unidades",
              9,
              8,
              6,
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
          "recta": {
            "a": 11.1,
            "b": -1.7
          },
          "etiquetaX": "Precio",
          "etiquetaY": "Unidades"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Pendiente b₁ (1 decimal)",
          "valor": -1.7
        },
        {
          "tipo": "numero",
          "etiqueta": "Intercepto b₀ (1 decimal)",
          "valor": 11.1
        },
        {
          "tipo": "numero",
          "etiqueta": "Predicción con precio 2.5 (2 decimales)",
          "valor": 6.85,
          "calculo": "=11.1-1.7*2.5"
        },
        {
          "tipo": "opcion",
          "etiqueta": "La pendiente negativa indica que…",
          "opciones": [
            "Cada aumento de 1 en el precio se asocia con 1.7 unidades menos",
            "El precio causa 1.7 ventas",
            "No hay relación"
          ],
          "correcta": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "Predecir con precio 8 es…",
          "opciones": [
            "Fiable",
            "Extrapolación: el resultado sería negativo y poco creíble"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Sxy = -17, Sxx = 10: b₁ = −1.7.",
        "b₀ = 6 − (−1.7)(3) = 11.1.",
        "ŷ(2.5) = 11.1 − 1.7 × 2.5 = 6.85. Con x = 8 sale -2.5: unidades negativas, imposible."
      ],
      "pistas": [
        "Calcula primero las medias."
      ]
    },
    "verificacion": [
      {
        "id": "m32-l1-q1",
        "pregunta": "La pendiente de la recta de regresión indica:",
        "opciones": [
          "El valor de y cuando x = 0",
          "El cambio medio en y por cada unidad de x",
          "La correlación",
          "El error"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "b₁ es el cambio medio de y por unidad de x."
      },
      {
        "id": "m32-l1-q2",
        "pregunta": "Predecir fuera del rango de x observado se llama…",
        "opciones": [
          "Interpolación",
          "Extrapolación (riesgosa)",
          "Estratificación",
          "Ajuste perfecto"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La relación puede dejar de ser lineal."
      }
    ],
    "resumen": [
      "b₁ = Sxy/Sxx; b₀ = ȳ − b₁x̄.",
      "La recta pasa por (x̄, ȳ).",
      "No extrapoles; asociación no es causalidad."
    ],
    "proximoPaso": "Evaluaremos qué tan bien ajusta la recta con R² y los residuos.",
    "conceptos": [
      "regresion-lineal-simple",
      "pendiente-intercepto"
    ]
  },
  {
    "id": "m32-l2",
    "moduloId": "modulo-32",
    "motor": "calculo",
    "titulo": "R², residuos y calidad del ajuste",
    "objetivo": "Calcular los residuos, la suma de cuadrados del error y R², y reconocer patrones que indican un mal ajuste.",
    "porQueImporta": "Una recta siempre se puede ajustar, pero ¿es útil? R² mide la proporción de variación explicada y los residuos revelan problemas que el R² esconde.",
    "concepto": "- **Valor ajustado**: `ŷ = b₀ + b₁·x`.\n- **Residuo**: `e = y − ŷ` (lo que el modelo no explica). Los residuos suman 0.\n- **SSE** (suma de cuadrados del error): `Σe²`.\n- **SST** (variación total): `Σ(y − ȳ)² = Syy`.\n- **R²** = `1 − SSE ÷ SST`: proporción de la variación de `y` explicada por `x`. En regresión simple, `R² = r²`.\n- **Error estándar de la regresión**: `s_e = √(SSE ÷ (n − 2))`, el tamaño típico del error de predicción (en unidades de y).\n\nRevisa siempre los residuos: deben verse como ruido sin patrón. Una curva, un abanico (varianza creciente) o puntos aislados lejanos indican que el modelo lineal no es adecuado, aunque R² sea alto.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Residuos de la recta ŷ = 39.5 + 8.5x",
      "datos": [
        {
          "columnas": [
            "x",
            "y",
            "ŷ",
            "e = y − ŷ",
            "e²"
          ],
          "filas": [
            [
              1,
              50,
              "48",
              "+2",
              "4"
            ],
            [
              2,
              55,
              "56.5",
              "-1.5",
              "2.25"
            ],
            [
              3,
              65,
              "65",
              "+0",
              "0"
            ],
            [
              4,
              70,
              "73.5",
              "-3.5",
              "12.25"
            ],
            [
              5,
              85,
              "82",
              "+3",
              "9"
            ],
            [
              "",
              "",
              "Suma",
              "0",
              "27.5"
            ]
          ]
        }
      ],
      "pasos": [
        "SSE = **27.5**; SST = Syy = **750**.",
        "R² = 1 − 27.5 ÷ 750 = **0.9633**.",
        "s_e = √(27.5 ÷ 3) = **3.028**."
      ],
      "conclusion": "La recta explica el 96.3 % de la variación de las calificaciones; el error típico de predicción es ≈ 3.0 puntos."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "R² alto, pero el modelo no es adecuado",
      "datos": [
        {
          "columnas": [
            "x",
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
              "y",
              1,
              4,
              9,
              16,
              25,
              36,
              49,
              64
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
            5,
            6,
            7,
            8
          ],
          "y": [
            1,
            4,
            9,
            16,
            25,
            36,
            49,
            64
          ],
          "recta": {
            "a": -15.0,
            "b": 9.0
          },
          "titulo": "Datos cuadráticos con una recta",
          "etiquetaX": "x",
          "etiquetaY": "y"
        }
      ],
      "pasos": [
        "R² de la recta = 0.953: parece muy bueno.",
        "Pero los residuos tienen forma de «U»: negativos al centro y positivos en los extremos.",
        "El patrón indica que la relación es curva y la recta es inadecuada."
      ],
      "conclusion": "Un R² alto no basta: hay que mirar los residuos."
    },
    "errorFrecuente": {
      "codigo": "«R² = 0.96, así que el modelo es excelente para predecir cualquier caso.»",
      "explicacion": "R² resume el ajuste a los datos observados. No garantiza buenas predicciones fuera de ellos, no detecta curvatura y puede subir con variables irrelevantes. Revisa los residuos, el error estándar y valida con datos nuevos."
    },
    "practicaGuiada": {
      "id": "m32-l2-practica",
      "enunciado": "Con la recta ŷ = 3 + x del ejemplo de publicidad (x = 2, 4, 6, 8, 10; y = 5, 9, 6, 11, 14).",
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
              "Publicidad",
              2,
              4,
              6,
              8,
              10
            ],
            [
              "Ventas",
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
          "etiqueta": "Suma de residuos",
          "valor": 0
        },
        {
          "tipo": "numero",
          "etiqueta": "SSE",
          "valor": 14.0
        },
        {
          "tipo": "numero",
          "etiqueta": "SST",
          "valor": 54
        },
        {
          "tipo": "numero",
          "etiqueta": "R² (4 decimales)",
          "valor": 0.7407,
          "calculo": "=1-14/54"
        },
        {
          "tipo": "numero",
          "etiqueta": "Error estándar de la regresión (3 decimales)",
          "valor": 2.16,
          "calculo": "=RAIZ(14/3)"
        }
      ],
      "solucion": [
        "Ajustados: 5, 7, 9, 11, 13. Residuos: +0, +2, -3, +0, +1.",
        "SSE = 0 + 4 + 9 + 0 + 1 = 14; SST = 54.",
        "R² = 1 − 14/54 = 0.7407; s_e = √(14/3) = 2.160."
      ],
      "pistas": [
        "Los residuos de una recta de mínimos cuadrados siempre suman 0."
      ]
    },
    "reto": {
      "id": "m32-l2-reto",
      "enunciado": "Con la recta ŷ = 11.1 − 1.7x (precio y unidades).",
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
              "Precio",
              1,
              2,
              3,
              4,
              5
            ],
            [
              "Unidades",
              9,
              8,
              6,
              5,
              2
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "SSE (2 decimales)",
          "valor": 1.1
        },
        {
          "tipo": "numero",
          "etiqueta": "SST",
          "valor": 30
        },
        {
          "tipo": "numero",
          "etiqueta": "R² (4 decimales)",
          "valor": 0.9633
        },
        {
          "tipo": "opcion",
          "etiqueta": "Un R² de 0.96 significa que…",
          "opciones": [
            "El 96 % de la variación de las unidades se explica por el precio en estos datos",
            "El 96 % de las predicciones son exactas",
            "El precio causa el 96 % de las ventas"
          ],
          "correcta": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "Residuos con forma de abanico (cada vez más dispersos) indican…",
          "opciones": [
            "Un ajuste perfecto",
            "Varianza no constante: el modelo lineal simple es inadecuado",
            "Que R² es 1"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Residuos: -0.4, +0.3, +0.0, +0.7, -0.6; SSE = 1.10.",
        "SST = 30; R² = 1 − 1.10/30 = 0.9633.",
        "R² no implica causalidad ni garantía de predicción."
      ],
      "pistas": [
        "Calcula primero los valores ajustados."
      ]
    },
    "verificacion": [
      {
        "id": "m32-l2-q1",
        "pregunta": "R² = 0.64 significa que:",
        "opciones": [
          "Hay 64 % de error",
          "x explica el 64 % de la variación de y",
          "El modelo acierta el 64 % de los casos",
          "r = 0.64"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Proporción de variación explicada."
      },
      {
        "id": "m32-l2-q2",
        "pregunta": "Un patrón en forma de U en los residuos indica:",
        "opciones": [
          "Ajuste perfecto",
          "Relación curva no capturada",
          "Datos normales",
          "Errores aleatorios"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "El modelo lineal no basta."
      }
    ],
    "resumen": [
      "Residuo = y − ŷ; suman 0.",
      "R² = 1 − SSE/SST.",
      "Revisa los residuos: R² alto no garantiza un buen modelo."
    ],
    "proximoPaso": "Interpretaremos una regresión con varias variables.",
    "conceptos": [
      "r-cuadrado",
      "residuos"
    ]
  },
  {
    "id": "m32-l3",
    "moduloId": "modulo-32",
    "motor": "calculo",
    "titulo": "Regresión múltiple: interpretar la salida",
    "objetivo": "Interpretar los coeficientes, su significancia y R² ajustado de una regresión con varias variables explicativas.",
    "porQueImporta": "En la práctica el resultado depende de muchas variables a la vez. La regresión múltiple separa el efecto de cada una «manteniendo las demás constantes». Hoy se calcula con un programa; lo importante es saber leer e interpretar la salida.",
    "concepto": "El modelo es `ŷ = b₀ + b₁·x₁ + b₂·x₂ + … + b_k·x_k`. Cada coeficiente `b_j` es el cambio medio en `y` cuando `x_j` sube una unidad **manteniendo constantes las demás variables**.\n\nUn programa estadístico entrega una tabla como esta, con cuatro columnas por coeficiente:\n\n- **Coeficiente** `b_j` y su **error estándar**.\n- **t** `= b_j ÷ EE` y su **p-valor** (con `gl = n − k − 1`): contrasta `H₀: β_j = 0`.\n- **R²** y **R² ajustado** `= 1 − (1 − R²)·(n − 1) ÷ (n − k − 1)`, que penaliza añadir variables que no aportan.\n\nCuidado con la **multicolinealidad**: si dos variables explicativas están muy correlacionadas, sus coeficientes se vuelven inestables y los p-valores engañosos.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Precio de vivienda (miles) según área, habitaciones y antigüedad (n = 30, datos ficticios)",
      "datos": [
        {
          "columnas": [
            "Variable",
            "Coeficiente",
            "Error estándar",
            "t",
            "p-valor"
          ],
          "filas": [
            [
              "Intercepto",
              20.0,
              12.0,
              "1.67",
              "0.1076"
            ],
            [
              "Área (m²)",
              1.5,
              0.3,
              "5.00",
              "0.0000"
            ],
            [
              "Habitaciones",
              5.0,
              4.0,
              "1.25",
              "0.2224"
            ],
            [
              "Antigüedad (años)",
              -0.8,
              0.5,
              "-1.60",
              "0.1217"
            ]
          ],
          "nota": "R² = 0.82; n = 30; gl = 26"
        }
      ],
      "pasos": [
        "Área: cada m² adicional se asocia con **+1.5** mil, manteniendo constantes habitaciones y antigüedad; t = 5 y p < 0.001: significativo.",
        "Habitaciones: +5, pero t = 1.25 y p = 0.22: no es significativo (no se distingue de 0).",
        "Antigüedad: −0.8 por año, p = 0.12: tampoco es claramente distinto de 0 al 5 %."
      ],
      "conclusion": "Solo el área tiene evidencia clara de efecto; las otras dos pueden ser ruido o estar correlacionadas con el área."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Predicción y R² ajustado",
      "pasos": [
        "Vivienda de 80 m², 3 habitaciones y 10 años: ŷ = 20 + 1.5 × 80 + 5 × 3 − 0.8 × 10 = **147** mil.",
        "R² ajustado = 1 − (1 − 0.82) × 29 ÷ 26 = **0.799**."
      ],
      "conclusion": "El R² ajustado es menor que el R²: penaliza la complejidad."
    },
    "errorFrecuente": {
      "codigo": "«Habitaciones tiene coeficiente +5 pero no es significativa, así que no tiene ningún efecto.»",
      "explicacion": "No significativo significa que los datos no distinguen el efecto de cero (error estándar grande), no que sea cero. Puede estar muy correlacionada con el área (multicolinealidad) o la muestra ser pequeña. Hay que mirar el intervalo de confianza y el contexto."
    },
    "practicaGuiada": {
      "id": "m32-l3-practica",
      "enunciado": "Con la tabla de la lección (n = 30; gl = 26).",
      "datos": [
        {
          "columnas": [
            "Variable",
            "Coeficiente",
            "Error estándar"
          ],
          "filas": [
            [
              "Intercepto",
              20.0,
              12.0
            ],
            [
              "Área (m²)",
              1.5,
              0.3
            ],
            [
              "Habitaciones",
              5.0,
              4.0
            ],
            [
              "Antigüedad (años)",
              -0.8,
              0.5
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Predicción para 100 m², 4 habitaciones y 5 años (miles)",
          "valor": 186,
          "calculo": "=20+1.5*100+5*4-0.8*5"
        },
        {
          "tipo": "numero",
          "etiqueta": "t del coeficiente de Antigüedad",
          "valor": -1.6,
          "calculo": "=-0.8/0.5"
        },
        {
          "tipo": "numero",
          "etiqueta": "R² ajustado (3 decimales)",
          "valor": 0.799,
          "calculo": "=1-(1-0.82)*29/26"
        },
        {
          "tipo": "numero",
          "etiqueta": "t crítico bilateral al 5 % con 26 gl (3 decimales)",
          "valor": 2.056,
          "calculo": "=INV.T.2C(0.05;26)"
        }
      ],
      "solucion": [
        "ŷ = 20 + 1.5(100) + 5(4) − 0.8(5) = 20 + 150 + 20 − 4 = 186.",
        "t = −0.8 ÷ 0.5 = −1.6.",
        "R² aj. = 1 − 0.18 × 29/26 = 0.799.",
        "|t| = 1.6 < 2.056: no significativo al 5 %."
      ],
      "pistas": [
        "Sustituye los valores en la ecuación."
      ]
    },
    "reto": {
      "id": "m32-l3-reto",
      "enunciado": "Interpreta la salida.",
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "«Cada m² extra se asocia con 1.5 mil más, a igualdad de habitaciones y antigüedad» es…",
          "opciones": [
            "Una interpretación correcta del coeficiente del área",
            "Incorrecta: el efecto es causal",
            "Incorrecta: falta el intercepto"
          ],
          "correcta": 0
        },
        {
          "tipo": "numero",
          "etiqueta": "p-valor de Área (t = 5, gl = 26; 5 decimales aprox.)",
          "valor": 3e-05,
          "calculo": "=DISTR.T.2C(5;26)",
          "tolerancia": 5e-05
        },
        {
          "tipo": "opcion",
          "etiqueta": "Si se añade una variable irrelevante, el R² ajustado puede…",
          "opciones": [
            "Bajar",
            "Subir siempre",
            "Quedar igual siempre"
          ],
          "correcta": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "Dos variables muy correlacionadas entre sí en el modelo producen…",
          "opciones": [
            "Coeficientes más estables",
            "Multicolinealidad: coeficientes inestables",
            "Un R² de cero"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "«Manteniendo las demás constantes» es la clave de la interpretación.",
        "p = DISTR.T.2C(5; 26) = 0.000034.",
        "El R² ajustado penaliza variables que no aportan.",
        "La multicolinealidad dificulta separar los efectos."
      ],
      "pistas": [
        "Recuerda: asociación, no causalidad."
      ]
    },
    "verificacion": [
      {
        "id": "m32-l3-q1",
        "pregunta": "El coeficiente b₂ en regresión múltiple es el cambio en y por unidad de x₂…",
        "opciones": [
          "Ignorando las otras variables",
          "Manteniendo constantes las demás variables",
          "Siempre positivo",
          "Igual que en regresión simple"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Efecto parcial."
      },
      {
        "id": "m32-l3-q2",
        "pregunta": "Un p-valor alto para un coeficiente indica:",
        "opciones": [
          "El efecto es cero",
          "Los datos no distinguen el efecto de cero",
          "El modelo es perfecto",
          "R² = 1"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Falta evidencia, no efecto nulo."
      }
    ],
    "resumen": [
      "Cada coeficiente es un efecto parcial.",
      "t = coeficiente/EE; gl = n − k − 1.",
      "R² ajustado penaliza variables inútiles; cuidado con la multicolinealidad."
    ],
    "proximoPaso": "Compararemos tres o más grupos con ANOVA.",
    "conceptos": [
      "regresion-multiple",
      "statsmodels-ols"
    ]
  },
  {
    "id": "m32-l4",
    "moduloId": "modulo-32",
    "motor": "calculo",
    "titulo": "ANOVA: comparar tres o más grupos",
    "objetivo": "Contrastar si las medias de tres o más grupos son iguales con el análisis de varianza de un factor.",
    "porQueImporta": "Comparar dos grupos es sencillo; con tres o más, hacer muchas pruebas t inflaría el riesgo de falsos positivos. ANOVA lo resuelve con una sola prueba global.",
    "concepto": "ANOVA de un factor contrasta `H₀: μ₁ = μ₂ = … = μ_k` (todas las medias iguales) frente a «al menos una difiere». Compara dos fuentes de variación:\n\n- **Entre grupos** (`SSB`): qué tanto se separan las medias de grupo de la media global: `Σ nᵢ(x̄ᵢ − x̄)²`.\n- **Dentro de grupos** (`SSW`): la variación de los datos alrededor de la media de su propio grupo: `Σ(x − x̄ᵢ)²`.\n\n| Fuente | SS | gl | MS = SS ÷ gl |\n|---|---|---|---|\n| Entre | SSB | k − 1 | MSB |\n| Dentro | SSW | N − k | MSW |\n\n`F = MSB ÷ MSW`. Si `H₀` es cierta, `F` ≈ 1; si las medias difieren, `F` es grande. El p-valor es `=DISTR.F.CD(F; k − 1; N − k)`.\n\nANOVA solo dice **si** hay diferencias, no **cuáles** grupos difieren (para eso se usan comparaciones posteriores con corrección).",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Tiempo de resolución (min) con tres métodos, 5 casos cada uno",
      "datos": [
        {
          "columnas": [
            "",
            "1",
            "2",
            "3",
            "4",
            "5",
            "Media"
          ],
          "filas": [
            [
              "Método A",
              12,
              14,
              11,
              13,
              15,
              "13"
            ],
            [
              "Método B",
              16,
              18,
              15,
              17,
              19,
              "17"
            ],
            [
              "Método C",
              13,
              15,
              12,
              14,
              16,
              "14"
            ],
            [
              "Media global",
              "",
              "",
              "",
              "",
              "",
              "14.6667"
            ]
          ]
        }
      ],
      "pasos": [
        "SSB = 5(13 − 14.6667)² + 5(17 − 14.6667)² + 5(14 − 14.6667)² = **43.3333**; gl = 2; MSB = 21.6667.",
        "SSW = **30**; gl = 12; MSW = 2.5.",
        "F = 21.6667 ÷ 2.5 = **8.667**.",
        "p = DISTR.F.CD(8.667; 2; 12) = **0.0047**."
      ],
      "conclusion": "p < 0.05: al menos un método difiere en tiempo medio (el método B parece más lento)."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Por qué no varias pruebas t",
      "pasos": [
        "Con 3 grupos habría 3 comparaciones por pares; con cada una al 5 %, la probabilidad de al menos un falso positivo ya sube a 1 − 0.95³ = 14.3 %.",
        "ANOVA hace una sola prueba global al 5 %."
      ],
      "conclusion": "ANOVA controla el error global; luego se comparan pares con corrección."
    },
    "errorFrecuente": {
      "codigo": "«ANOVA significativo → todos los métodos son distintos entre sí.»",
      "explicacion": "Significa que al menos un grupo difiere. Puede que solo B se separe de A y C. Para saber qué pares difieren hay que usar comparaciones múltiples con corrección (Tukey, Bonferroni)."
    },
    "practicaGuiada": {
      "id": "m32-l4-practica",
      "enunciado": "Ventas semanales con tres diseños de vitrina (4 tiendas cada uno).",
      "datos": [
        {
          "columnas": [
            "",
            "1",
            "2",
            "3",
            "4"
          ],
          "filas": [
            [
              "Diseño X",
              30,
              34,
              32,
              35
            ],
            [
              "Diseño Y",
              28,
              31,
              29,
              30
            ],
            [
              "Diseño Z",
              36,
              38,
              35,
              39
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media global (2 decimales)",
          "valor": 33.08
        },
        {
          "tipo": "numero",
          "etiqueta": "SSB (2 decimales)",
          "valor": 113.17
        },
        {
          "tipo": "numero",
          "etiqueta": "SSW (2 decimales)",
          "valor": 29.75
        },
        {
          "tipo": "numero",
          "etiqueta": "F (3 decimales)",
          "valor": 17.118
        },
        {
          "tipo": "numero",
          "etiqueta": "p-valor (4 decimales)",
          "valor": 0.0009,
          "calculo": "=DISTR.F.CD(17.117647;2;9)"
        }
      ],
      "solucion": [
        "Medias: X 32.75, Y 29.5, Z 37; global 33.0833.",
        "SSB = 113.17; SSW = 29.75.",
        "MSB = 56.58; MSW = 3.306; F = 17.118.",
        "gl = (2, 9): p = 0.0009."
      ],
      "pistas": [
        "Calcula primero las tres medias de grupo."
      ]
    },
    "reto": {
      "id": "m32-l4-reto",
      "enunciado": "Completa una tabla ANOVA con 4 grupos y 40 observaciones: SSB = 120 y SSW = 540.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "gl entre grupos",
          "valor": 3
        },
        {
          "tipo": "numero",
          "etiqueta": "gl dentro de grupos",
          "valor": 36
        },
        {
          "tipo": "numero",
          "etiqueta": "MSB",
          "valor": 40
        },
        {
          "tipo": "numero",
          "etiqueta": "MSW",
          "valor": 15
        },
        {
          "tipo": "numero",
          "etiqueta": "F (2 decimales)",
          "valor": 2.67
        },
        {
          "tipo": "numero",
          "etiqueta": "p-valor (4 decimales)",
          "valor": 0.0623,
          "calculo": "=DISTR.F.CD(40/15;3;36)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con α = 0.05…",
          "opciones": [
            "Se rechaza H₀: alguna media difiere",
            "No se rechaza H₀"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "gl_entre = 4 − 1 = 3; gl_dentro = 40 − 4 = 36.",
        "MSB = 120 ÷ 3 = 40; MSW = 540 ÷ 36 = 15.",
        "F = 40 ÷ 15 = 2.67; p = 0.0623."
      ],
      "pistas": [
        "MS = SS ÷ gl."
      ]
    },
    "verificacion": [
      {
        "id": "m32-l4-q1",
        "pregunta": "ANOVA de un factor contrasta que…",
        "opciones": [
          "Dos varianzas son iguales",
          "Todas las medias de grupo son iguales",
          "La media es cero",
          "Dos proporciones son iguales"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "H₀: μ₁ = … = μ_k."
      },
      {
        "id": "m32-l4-q2",
        "pregunta": "Un F cercano a 1 indica…",
        "opciones": [
          "Diferencias grandes entre grupos",
          "Variación entre grupos similar a la de dentro: sin evidencia de diferencias",
          "Error de cálculo",
          "p muy pequeño"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "MSB ≈ MSW."
      }
    ],
    "resumen": [
      "F = MSB/MSW con gl (k−1, N−k).",
      "ANOVA dice si hay diferencia, no entre quiénes.",
      "Evita muchas pruebas t sin corrección."
    ],
    "proximoPaso": "Cerraremos el curso con significancia, relevancia práctica y comparaciones múltiples.",
    "conceptos": [
      "anova",
      "estadistico-f"
    ]
  },
  {
    "id": "m32-l5",
    "moduloId": "modulo-32",
    "motor": "calculo",
    "titulo": "Significancia, relevancia práctica y comparaciones múltiples",
    "objetivo": "Distinguir significancia estadística de relevancia práctica con el tamaño del efecto y controlar el riesgo de falsos positivos al hacer muchas pruebas.",
    "porQueImporta": "Con datos suficientes, cualquier diferencia diminuta sale «significativa»; y con muchas pruebas, algo saldrá significativo por pura casualidad. Un analista debe saber leer ambos riesgos.",
    "concepto": "**Tamaño del efecto.** La **d de Cohen** expresa una diferencia de medias en desviaciones estándar:\n\n`d = (x̄₁ − x̄₂) ÷ s_p`,  con  `s_p = √( ((n₁−1)s₁² + (n₂−1)s₂²) ÷ (n₁ + n₂ − 2) )`\n\nOrientación (no una ley): 0.2 pequeño, 0.5 mediano, 0.8 grande.\n\n**Significancia ≠ relevancia.** El p-valor depende del tamaño de la muestra; `d` no. Una diferencia trivial con `n` enorme da p minúsculo; una diferencia grande con `n` pequeño puede no ser significativa.\n\n**Comparaciones múltiples.** Con `m` pruebas independientes al nivel α, la probabilidad de al menos un falso positivo es `1 − (1 − α)^m`. Corrección de **Bonferroni**: usar `α ÷ m` en cada prueba. Buscar entre muchos análisis hasta encontrar un p < 0.05 sin declararlo se llama **p-hacking**.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Dos estudios con la misma desviación (10)",
      "datos": [
        {
          "columnas": [
            "Estudio",
            "n por grupo",
            "Diferencia de medias",
            "t (aprox.)",
            "p",
            "d de Cohen"
          ],
          "filas": [
            [
              "A: 40 000 clientes",
              20000,
              0.5,
              "5.00",
              "0.0000",
              "0.050"
            ],
            [
              "B: 20 empleados",
              10,
              8,
              "1.79",
              "0.0905",
              "0.80"
            ]
          ]
        }
      ],
      "pasos": [
        "Estudio A: diferencia de 0.5 (en una escala con desviación 10) con n enorme → p = 0.0000 (significativo), pero d = 0.050: efecto **minúsculo**.",
        "Estudio B: diferencia de 8 con n pequeño → p = 0.0905 (no significativo al 5 %), pero d = 0.80: efecto **grande**."
      ],
      "conclusion": "Significancia y relevancia son preguntas distintas: se reportan ambas."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Cuántas pruebas hacen falta para «encontrar» algo",
      "datos": [
        {
          "columnas": [
            "Número de pruebas m",
            "P(al menos un falso positivo)",
            "α de Bonferroni"
          ],
          "filas": [
            [
              1,
              "0.050",
              "0.0500"
            ],
            [
              3,
              "0.143",
              "0.0167"
            ],
            [
              5,
              "0.226",
              "0.0100"
            ],
            [
              10,
              "0.401",
              "0.0050"
            ],
            [
              20,
              "0.642",
              "0.0025"
            ]
          ]
        }
      ],
      "pasos": [
        "Con 20 pruebas independientes sin ningún efecto real, hay ≈ 64 % de probabilidad de ver al menos un «hallazgo» con p < 0.05.",
        "Bonferroni exige p < 0.05 ÷ 20 = 0.0025 en cada una."
      ],
      "conclusion": "Declara cuántas pruebas hiciste; si son muchas, corrige."
    },
    "errorFrecuente": {
      "codigo": "«Probé 20 segmentos de clientes y en uno la diferencia salió con p = 0.03: ese segmento es la clave.»",
      "explicacion": "Con 20 pruebas era probable que alguna saliera p < 0.05 por azar (64 %). Con Bonferroni habría que exigir p < 0.0025. Ese hallazgo debe tratarse como hipótesis a confirmar con datos nuevos, no como una conclusión."
    },
    "practicaGuiada": {
      "id": "m32-l5-practica",
      "enunciado": "Dos grupos de 15 personas: medias 78 y 70, desviaciones 10 y 10.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Desviación combinada s_p",
          "valor": 10,
          "calculo": "=RAIZ((14*100+14*100)/28)"
        },
        {
          "tipo": "numero",
          "etiqueta": "d de Cohen (2 decimales)",
          "valor": 0.8,
          "calculo": "=(78-70)/10"
        },
        {
          "tipo": "numero",
          "etiqueta": "Probabilidad de al menos un falso positivo con 10 pruebas al 5 % (3 decimales)",
          "valor": 0.401,
          "calculo": "=1-0.95^10"
        },
        {
          "tipo": "numero",
          "etiqueta": "α de Bonferroni para 10 pruebas (3 decimales)",
          "valor": 0.005,
          "calculo": "=0.05/10"
        }
      ],
      "solucion": [
        "s_p = √((14·100 + 14·100) ÷ 28) = 10.",
        "d = (78 − 70) ÷ 10 = 0.8: efecto grande.",
        "1 − 0.95¹⁰ = 0.401.",
        "α corregido = 0.05 ÷ 10 = 0.005."
      ],
      "pistas": [
        "Cuando las desviaciones coinciden, s_p es ese mismo valor."
      ]
    },
    "reto": {
      "id": "m32-l5-reto",
      "enunciado": "Un equipo de marketing analiza 8 métricas distintas entre dos versiones de un sitio.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(al menos un falso positivo) con 8 pruebas al 5 % (3 decimales)",
          "valor": 0.337,
          "calculo": "=1-0.95^8"
        },
        {
          "tipo": "numero",
          "etiqueta": "α de Bonferroni por prueba (4 decimales)",
          "valor": 0.0063,
          "calculo": "=0.05/8",
          "tolerancia": 5e-05
        },
        {
          "tipo": "opcion",
          "etiqueta": "Una métrica sale con p = 0.02. Con Bonferroni (α = 0.00625) la conclusión es…",
          "opciones": [
            "Significativa",
            "No significativa tras la corrección"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "Un efecto con d = 0.05 y p = 0.001 (muestra enorme) es…",
          "opciones": [
            "Estadísticamente significativo pero prácticamente irrelevante",
            "Muy relevante",
            "Imposible"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "1 − 0.95⁸ = 0.337.",
        "0.05 ÷ 8 = 0.00625.",
        "0.02 > 0.00625: no significativa tras la corrección.",
        "d = 0.05 es un efecto diminuto aunque p sea muy pequeño."
      ],
      "pistas": [
        "Compara el p-valor con α/m."
      ]
    },
    "verificacion": [
      {
        "id": "m32-l5-q1",
        "pregunta": "Un p-valor muy pequeño con una muestra enorme indica necesariamente…",
        "opciones": [
          "Un efecto grande",
          "Que la diferencia no es exactamente cero, pero puede ser trivial",
          "Que no hay efecto",
          "Un error"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "p depende de n; el tamaño del efecto es aparte."
      },
      {
        "id": "m32-l5-q2",
        "pregunta": "La corrección de Bonferroni con m pruebas usa…",
        "opciones": [
          "α × m",
          "α ÷ m",
          "α²",
          "m ÷ α"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Se divide el nivel entre el número de pruebas."
      }
    ],
    "resumen": [
      "Reporta p-valor, tamaño del efecto e intervalo.",
      "Muchas pruebas → corrige (Bonferroni) y declara cuántas hiciste.",
      "Un hallazgo exploratorio se confirma con datos nuevos."
    ],
    "proximoPaso": "En el proyecto final del curso aplicarás todo esto en un experimento A/B completo.",
    "conceptos": [
      "tamano-del-efecto",
      "comparaciones-multiples",
      "p-hacking"
    ]
  }
]
