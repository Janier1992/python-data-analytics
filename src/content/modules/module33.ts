import type { Lesson } from '../../types'

export const module33Lessons: Lesson[] = [
  {
    "id": "m33-l1",
    "moduloId": "modulo-33",
    "motor": "calculo",
    "titulo": "Proyecto: plantea el experimento y estima la conversión",
    "objetivo": "Formular las hipótesis de un A/B test y estimar la tasa de conversión de cada versión con su intervalo de confianza.",
    "porQueImporta": "Antes de contrastar nada hay que dejar escrito qué se quiere probar y con qué criterio se decidirá. Y toda cifra de conversión debe acompañarse de su incertidumbre.",
    "concepto": "**El caso**: una tienda en línea probó un nuevo diseño de la página de pago (versión **B**) frente al actual (versión **A**). Se asignaron visitantes al azar a cada versión.\n\n| | Visitantes | Compras |\n|---|---|---|\n| **A** (control) | 2 400 | 288 |\n| **B** (nuevo diseño) | 2 400 | 336 |\n\nAdemás se midió cuántos segundos tardaron en pagar 20 clientes de cada versión.\n\nLa decisión de negocio: ¿se lanza el nuevo diseño para todos?\n\n**Hipótesis**:\n\n- H₀: la tasa de conversión de B es igual a la de A.\n- H₁: las tasas son distintas.\n- α = 0.05, definido **antes** de mirar los resultados.\n\nPrimer paso: estimar cada tasa con su intervalo de confianza del 95 %: `p̂ ± 1.96·√(p̂(1 − p̂) ÷ n)`.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Tasas de conversión",
      "datos": [
        {
          "columnas": [
            "Versión",
            "Visitantes",
            "Compras"
          ],
          "filas": [
            [
              "A (control)",
              2400,
              288
            ],
            [
              "B (nuevo diseño)",
              2400,
              336
            ]
          ]
        }
      ],
      "pasos": [
        "p̂_A = 288 ÷ 2400 = **0.120** (12 %).",
        "p̂_B = 336 ÷ 2400 = **0.140** (14 %).",
        "La diferencia observada es de 2 puntos porcentuales; falta saber si es real o ruido."
      ],
      "conclusion": "B convierte más en la muestra; la prueba decidirá si la diferencia es creíble."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Intervalos de confianza del 95 %",
      "datos": [
        {
          "columnas": [
            "Versión",
            "p̂",
            "EE",
            "Margen",
            "IC 95 %"
          ],
          "filas": [
            [
              "A",
              "0.120",
              "0.0066",
              "0.0130",
              "(0.1070; 0.1330)"
            ],
            [
              "B",
              "0.140",
              "0.0071",
              "0.0139",
              "(0.1261; 0.1539)"
            ]
          ]
        }
      ],
      "pasos": [
        "Los intervalos se traslapan ligeramente: la diferencia no es obvia a simple vista.",
        "Un traslape no equivale a «sin diferencia»; la prueba formal de la siguiente lección da la respuesta."
      ],
      "conclusion": "Siempre se reporta la tasa con su intervalo, no solo el punto."
    },
    "errorFrecuente": {
      "codigo": "«B convierte 14 % y A 12 %: B gana, lancémoslo.»",
      "explicacion": "Sin una prueba y un intervalo no se sabe si 2 puntos son un efecto real o variación del azar. Y las hipótesis, el nivel α y la métrica deben fijarse antes de ver los datos, no después."
    },
    "practicaGuiada": {
      "id": "m33-l1-practica",
      "enunciado": "Con los datos del experimento.",
      "datos": [
        {
          "columnas": [
            "Versión",
            "Visitantes",
            "Compras"
          ],
          "filas": [
            [
              "A (control)",
              2400,
              288
            ],
            [
              "B (nuevo diseño)",
              2400,
              336
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "p̂_A",
          "valor": 0.12,
          "calculo": "=288/2400"
        },
        {
          "tipo": "numero",
          "etiqueta": "p̂_B (3 decimales)",
          "valor": 0.14,
          "calculo": "=336/2400"
        },
        {
          "tipo": "numero",
          "etiqueta": "Error estándar de p̂_B (4 decimales)",
          "valor": 0.0071,
          "calculo": "=RAIZ(0.14*0.86/2400)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite inferior del IC 95 % de B (4 decimales)",
          "valor": 0.1261
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite superior del IC 95 % de B (4 decimales)",
          "valor": 0.1539
        }
      ],
      "solucion": [
        "p̂_A = 0.12; p̂_B = 0.14.",
        "EE_B = √(0.14 × 0.86 ÷ 2400) = 0.0071.",
        "Margen = 1.96 × 0.0071 = 0.0139.",
        "IC B = (0.1261; 0.1539)."
      ],
      "pistas": [
        "Usa z* = 1.96."
      ]
    },
    "reto": {
      "id": "m33-l1-reto",
      "enunciado": "Planea el experimento.",
      "datos": [
        {
          "columnas": [
            "Versión",
            "Visitantes",
            "Compras"
          ],
          "filas": [
            [
              "A (control)",
              2400,
              288
            ],
            [
              "B (nuevo diseño)",
              2400,
              336
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "Hipótesis nula",
          "opciones": [
            "p_B = p_A",
            "p_B > p_A",
            "p_B ≠ p_A"
          ],
          "correcta": 0
        },
        {
          "tipo": "numero",
          "etiqueta": "Aumento relativo observado de B sobre A (%)",
          "valor": 16.7,
          "calculo": "=(336/2400-288/2400)/(288/2400)*100",
          "tolerancia": 0.05
        },
        {
          "tipo": "numero",
          "etiqueta": "IC 95 % de A: límite inferior (4 decimales)",
          "valor": 0.107
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Cuándo se define α y la métrica de éxito?",
          "opciones": [
            "Antes de ver los resultados",
            "Después, según lo que salga",
            "No hace falta definirlos"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "H₀ afirma que no hay diferencia.",
        "(0.14 − 0.12) ÷ 0.12 = 16.7 %.",
        "EE_A = 0.0066; IC A inferior = 0.1070.",
        "Definir antes evita el p-hacking."
      ],
      "pistas": [
        "Aumento relativo = (B − A) ÷ A."
      ]
    },
    "verificacion": [
      {
        "id": "m33-l1-q1",
        "pregunta": "¿Qué hipótesis se plantea normalmente como nula en un A/B test?",
        "opciones": [
          "B es mejor que A",
          "No hay diferencia entre A y B",
          "A es mejor que B",
          "B > 0"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "H₀: p_A = p_B."
      },
      {
        "id": "m33-l1-q2",
        "pregunta": "Un traslape entre los IC de A y B…",
        "opciones": [
          "Prueba que no hay diferencia",
          "No equivale a ausencia de diferencia; se necesita la prueba formal",
          "Prueba que A es mejor",
          "Anula el experimento"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La prueba directa de la diferencia es más precisa."
      }
    ],
    "resumen": [
      "Fija hipótesis, α y métrica antes de ver los datos.",
      "Estima cada tasa con su IC.",
      "La decisión se toma tras la prueba formal."
    ],
    "proximoPaso": "Contrastaremos formalmente la diferencia de conversión.",
    "conceptos": [
      "proyecto-inferencia"
    ]
  },
  {
    "id": "m33-l2",
    "moduloId": "modulo-33",
    "motor": "calculo",
    "titulo": "Proyecto: contrasta la diferencia de conversión",
    "objetivo": "Aplicar la prueba z de dos proporciones al experimento y calcular el intervalo de confianza de la diferencia.",
    "porQueImporta": "Es el momento de decidir si la mejora observada es creíble. La prueba da el p-valor y el intervalo da el rango de efectos plausibles.",
    "concepto": "Con `x_A = 288`, `x_B = 336` y `n_A = n_B = 2400`:\n\n1. Proporción combinada `p̄ = (x_A + x_B) ÷ (n_A + n_B)`.\n2. `EE = √( p̄(1 − p̄)(1/n_A + 1/n_B) )`.\n3. `z = (p̂_B − p̂_A) ÷ EE` y `p = 2·(1 − Φ(|z|))`.\n4. IC de la diferencia: `(p̂_B − p̂_A) ± 1.96·√( p̂_A(1−p̂_A)/n_A + p̂_B(1−p̂_B)/n_B )`.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Prueba de dos proporciones",
      "datos": [
        {
          "columnas": [
            "Versión",
            "Visitantes",
            "Compras"
          ],
          "filas": [
            [
              "A (control)",
              2400,
              288
            ],
            [
              "B (nuevo diseño)",
              2400,
              336
            ]
          ]
        }
      ],
      "pasos": [
        "p̄ = 624 ÷ 4800 = **0.130**.",
        "EE = √(0.130 × 0.870 × 2/2400) = **0.00971**.",
        "z = 0.02 ÷ 0.00971 = **2.060**.",
        "p = 2 × (1 − Φ(2.060)) = **0.0394**."
      ],
      "conclusion": "p < 0.05: se rechaza H₀; hay evidencia de que B convierte distinto de A (y más, según los datos)."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Intervalo de la diferencia",
      "pasos": [
        "EE de la diferencia (sin combinar) = 0.00970.",
        "IC 95 % = 0.020 ± 1.96 × 0.00970 = **(0.0010; 0.0390)**.",
        "El intervalo apenas excluye el 0: la mejora podría ser casi nula o de ≈ 4 puntos."
      ],
      "conclusion": "La evidencia es positiva pero modesta: conviene considerar el costo de equivocarse."
    },
    "errorFrecuente": {
      "codigo": "«p = 0.039: hay un 3.9 % de probabilidad de que B no sea mejor.»",
      "explicacion": "El p-valor no es la probabilidad de que H₀ sea cierta. Es la probabilidad de observar una diferencia al menos tan grande si en realidad A y B convirtieran igual. Por eso se acompaña de un IC y de la magnitud del efecto."
    },
    "practicaGuiada": {
      "id": "m33-l2-practica",
      "enunciado": "Completa la prueba.",
      "datos": [
        {
          "columnas": [
            "Versión",
            "Visitantes",
            "Compras"
          ],
          "filas": [
            [
              "A (control)",
              2400,
              288
            ],
            [
              "B (nuevo diseño)",
              2400,
              336
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "p̄ (3 decimales)",
          "valor": 0.13,
          "calculo": "=(288+336)/4800"
        },
        {
          "tipo": "numero",
          "etiqueta": "EE (5 decimales)",
          "valor": 0.00971
        },
        {
          "tipo": "numero",
          "etiqueta": "z (3 decimales)",
          "valor": 2.06
        },
        {
          "tipo": "numero",
          "etiqueta": "p-valor bilateral (4 decimales)",
          "valor": 0.0394,
          "calculo": "=2*(1-DISTR.NORM.ESTAND.N(2.060105;VERDADERO))"
        }
      ],
      "solucion": [
        "p̄ = 624/4800 = 0.130.",
        "EE = 0.00971.",
        "z = 2.060.",
        "p = 0.0394."
      ],
      "pistas": [
        "Usa la proporción combinada."
      ]
    },
    "reto": {
      "id": "m33-l2-reto",
      "enunciado": "Interpreta.",
      "datos": [
        {
          "columnas": [
            "Versión",
            "Visitantes",
            "Compras"
          ],
          "filas": [
            [
              "A (control)",
              2400,
              288
            ],
            [
              "B (nuevo diseño)",
              2400,
              336
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Límite inferior del IC 95 % de p_B − p_A (4 decimales)",
          "valor": 0.001
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite superior (4 decimales)",
          "valor": 0.039
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con α = 0.05…",
          "opciones": [
            "Se rechaza H₀",
            "No se rechaza H₀"
          ],
          "correcta": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con α = 0.01…",
          "opciones": [
            "Se rechaza H₀",
            "No se rechaza H₀"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "IC = 0.020 ± 0.0190.",
        "p = 0.0394 < 0.05.",
        "p = 0.0394 > 0.01."
      ],
      "pistas": [
        "Compara el p-valor con cada α."
      ]
    },
    "verificacion": [
      {
        "id": "m33-l2-q1",
        "pregunta": "El IC de la diferencia (0.0010; 0.0390) indica que…",
        "opciones": [
          "La diferencia es exactamente 0.02",
          "La diferencia plausible va de casi nula a unos 4 puntos",
          "No hay efecto",
          "B es peor"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Muestra el rango de efectos compatibles con los datos."
      },
      {
        "id": "m33-l2-q2",
        "pregunta": "Si cambia α a 0.01 el resultado…",
        "opciones": [
          "Se vuelve más significativo",
          "Puede dejar de ser significativo",
          "No se ve afectado nunca",
          "Se invalida"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "El criterio es más exigente."
      }
    ],
    "resumen": [
      "z con proporción combinada.",
      "IC de la diferencia con EE sin combinar.",
      "Reporta p-valor e intervalo."
    ],
    "proximoPaso": "Compararemos los tiempos de pago y mediremos el efecto.",
    "conceptos": [
      "prueba-ab-proyecto"
    ]
  },
  {
    "id": "m33-l3",
    "moduloId": "modulo-33",
    "motor": "calculo",
    "titulo": "Proyecto: compara los tiempos de pago y mide el efecto",
    "objetivo": "Comparar los tiempos de pago de dos versiones con una prueba t de Welch y cuantificar el tamaño del efecto con la d de Cohen.",
    "porQueImporta": "La conversión no es la única métrica: un diseño debería además facilitar el pago. Aquí se evalúa si B reduce el tiempo y cuánto importa esa reducción.",
    "concepto": "Se compara el tiempo de pago (segundos) de dos grupos de 20 clientes.\n\n- Prueba t de Welch: `t = (x̄_A − x̄_B) ÷ √(s_A²/n_A + s_B²/n_B)`; para el cálculo manual usa `gl = min(n) − 1 = 19`.\n- **d de Cohen**: `d = (x̄_A − x̄_B) ÷ s_p`, con `s_p = √((s_A² + s_B²) ÷ 2)` cuando los grupos tienen el mismo tamaño.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Resumen de tiempos",
      "datos": [
        {
          "columnas": [
            "Cliente",
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
              "Tiempo A (s)",
              95,
              100,
              90,
              79,
              87,
              77,
              96,
              119,
              86,
              84,
              104,
              101,
              97,
              78,
              94,
              108,
              71,
              87,
              61,
              72
            ],
            [
              "Tiempo B (s)",
              51,
              80,
              61,
              89,
              87,
              81,
              39,
              74,
              83,
              86,
              56,
              75,
              66,
              69,
              103,
              69,
              83,
              100,
              73,
              82
            ]
          ]
        },
        {
          "columnas": [
            "Versión",
            "Media (s)",
            "Desv. (s)"
          ],
          "filas": [
            [
              "A",
              "89.30",
              "14.01"
            ],
            [
              "B",
              "75.35",
              "15.72"
            ]
          ]
        }
      ],
      "pasos": [
        "Media A = **89.30** s; media B = **75.35** s; diferencia = 13.95 s.",
        "EE = √(14.01²/20 + 15.72²/20) = **4.707**.",
        "t = 13.95 ÷ 4.707 = **2.963**.",
        "p (gl = 19) = **0.0080**; con gl de Welch (37.5) p = 0.0053."
      ],
      "conclusion": "La diferencia es estadísticamente significativa: B reduce el tiempo de pago."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Tamaño del efecto",
      "pasos": [
        "s_p = √((14.01² + 15.72²) ÷ 2) = **14.89**.",
        "d = 13.95 ÷ 14.89 = **0.94**.",
        "Un efecto de d ≈ 1 es grande: B no solo es significativamente más rápido, sino de forma muy relevante."
      ],
      "conclusion": "Significancia y relevancia coinciden aquí: la reducción es estadística y prácticamente importante."
    },
    "errorFrecuente": {
      "codigo": "«p = 0.001 → el efecto es enorme.»",
      "explicacion": "El p-valor no mide la magnitud. Hay que calcular el tamaño del efecto (d) y expresar la diferencia en unidades útiles (segundos ahorrados por cliente), junto con un intervalo de confianza."
    },
    "practicaGuiada": {
      "id": "m33-l3-practica",
      "enunciado": "Con las medias y desviaciones calculadas (usa la calculadora para ellas).",
      "datos": [
        {
          "columnas": [
            "Cliente",
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
              "Tiempo A (s)",
              95,
              100,
              90,
              79,
              87,
              77,
              96,
              119,
              86,
              84,
              104,
              101,
              97,
              78,
              94,
              108,
              71,
              87,
              61,
              72
            ],
            [
              "Tiempo B (s)",
              51,
              80,
              61,
              89,
              87,
              81,
              39,
              74,
              83,
              86,
              56,
              75,
              66,
              69,
              103,
              69,
              83,
              100,
              73,
              82
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media A (2 decimales)",
          "valor": 89.3,
          "calculo": "=PROMEDIO(95;100;90;79;87;77;96;119;86;84;104;101;97;78;94;108;71;87;61;72)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Media B (2 decimales)",
          "valor": 75.35,
          "calculo": "=PROMEDIO(51;80;61;89;87;81;39;74;83;86;56;75;66;69;103;69;83;100;73;82)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Desviación A (2 decimales)",
          "valor": 14.01,
          "calculo": "=DESVEST.M(95;100;90;79;87;77;96;119;86;84;104;101;97;78;94;108;71;87;61;72)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Desviación B (2 decimales)",
          "valor": 15.72,
          "calculo": "=DESVEST.M(51;80;61;89;87;81;39;74;83;86;56;75;66;69;103;69;83;100;73;82)"
        },
        {
          "tipo": "numero",
          "etiqueta": "t de Welch (valor absoluto, 2 decimales)",
          "valor": 2.96
        }
      ],
      "solucion": [
        "Media A = 89.30; B = 75.35.",
        "Desviaciones: 14.01 y 15.72.",
        "EE = 4.707; t = 2.96."
      ],
      "pistas": [
        "Pega las 20 cifras de cada fila en la función."
      ]
    },
    "reto": {
      "id": "m33-l3-reto",
      "enunciado": "Mide el efecto.",
      "datos": [
        {
          "columnas": [
            "Cliente",
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
              "Tiempo A (s)",
              95,
              100,
              90,
              79,
              87,
              77,
              96,
              119,
              86,
              84,
              104,
              101,
              97,
              78,
              94,
              108,
              71,
              87,
              61,
              72
            ],
            [
              "Tiempo B (s)",
              51,
              80,
              61,
              89,
              87,
              81,
              39,
              74,
              83,
              86,
              56,
              75,
              66,
              69,
              103,
              69,
              83,
              100,
              73,
              82
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "p-valor bilateral con gl = 19 (4 decimales)",
          "valor": 0.008,
          "calculo": "=DISTR.T.2C(2.963402;19)"
        },
        {
          "tipo": "numero",
          "etiqueta": "s_p (2 decimales)",
          "valor": 14.89
        },
        {
          "tipo": "numero",
          "etiqueta": "d de Cohen (2 decimales)",
          "valor": 0.94
        },
        {
          "tipo": "opcion",
          "etiqueta": "Según la orientación habitual, d ≈ 1.0 es un efecto…",
          "opciones": [
            "Pequeño",
            "Mediano",
            "Grande"
          ],
          "correcta": 2
        }
      ],
      "solucion": [
        "p = 0.0080 (< 0.05).",
        "s_p = 14.89.",
        "d = 13.95 ÷ 14.89 = 0.94.",
        "d ≥ 0.8 se considera grande."
      ],
      "pistas": [
        "d = diferencia de medias ÷ desviación combinada."
      ]
    },
    "verificacion": [
      {
        "id": "m33-l3-q1",
        "pregunta": "La d de Cohen mide…",
        "opciones": [
          "La probabilidad de error",
          "La diferencia de medias en unidades de desviación estándar",
          "La correlación",
          "El tamaño de muestra"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Es un tamaño del efecto estandarizado."
      },
      {
        "id": "m33-l3-q2",
        "pregunta": "Un p-valor muy pequeño demuestra…",
        "opciones": [
          "Un efecto grande",
          "Que el efecto no es exactamente cero, sin decir cuán grande es",
          "Que no hay efecto",
          "Que n es pequeño"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La magnitud se mide con el tamaño del efecto."
      }
    ],
    "resumen": [
      "t de Welch para dos medias independientes.",
      "d de Cohen mide la magnitud del efecto.",
      "Reporta p-valor, d y diferencia en unidades de negocio."
    ],
    "proximoPaso": "Cerramos con el reporte y la recomendación.",
    "conceptos": [
      "d-de-cohen-proyecto"
    ]
  },
  {
    "id": "m33-l4",
    "moduloId": "modulo-33",
    "motor": "calculo",
    "titulo": "Proyecto: reporte y recomendación",
    "objetivo": "Integrar los resultados del experimento en un reporte con recomendación, límites y siguientes pasos.",
    "porQueImporta": "La decisión final no depende solo del p-valor: pesa el tamaño del efecto, el costo del cambio y los riesgos. Un buen reporte los junta de forma honesta.",
    "concepto": "Estructura del reporte de un experimento:\n\n1. **Pregunta y diseño**: qué se probó, cómo se asignó, cuántos casos y qué métricas.\n2. **Resultados**: tasa por versión, diferencia con su IC y p-valor; efecto sobre la métrica secundaria.\n3. **Relevancia práctica**: traducir el efecto a negocio (ventas extra, segundos ahorrados).\n4. **Límites**: duración, estacionalidad, múltiples métricas, validez externa.\n5. **Recomendación** y siguientes pasos.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Traducir el efecto a negocio",
      "pasos": [
        "Diferencia de conversión = **2 puntos** (IC 95 %: 0.1 a 3.9 puntos).",
        "Por cada 10 000 visitantes: 10 000 × 0.02 = **200** compras extra.",
        "Con un ticket promedio de 50: 200 × 50 = **10 000** de ingreso extra (rango plausible: 9 a 390 compras)."
      ],
      "conclusion": "El efecto esperado es positivo y relevante, aunque el intervalo incluye valores pequeños."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Un reporte breve",
      "pasos": [
        "**Diseño**: asignación aleatoria, 2 400 visitantes por versión; α = 0.05 definido de antemano.",
        "**Conversión**: A 12.0 %, B 14.0 %; diferencia 2.0 puntos (p = 0.039; IC 95 %: 0.1 a 3.9 puntos).",
        "**Tiempo de pago**: A 89.3 s, B 75.3 s; reducción de 14.0 s (d = 0.94, p < 0.01).",
        "**Límites**: una sola semana de datos; dos métricas analizadas; no se sabe si el efecto persiste.",
        "**Recomendación**: lanzar B por etapas y seguir monitoreando la conversión durante un mes."
      ],
      "conclusion": "La recomendación reconoce la incertidumbre en lugar de esconderla."
    },
    "errorFrecuente": {
      "codigo": "«Reporte: B aumenta las ventas un 2 % (p = 0.039). Lanzar a todos.»",
      "explicacion": "Confunde puntos porcentuales con porcentaje (de 12 % a 14 % son 2 puntos, +16.7 % en relación), omite el intervalo y los límites y no traduce el efecto a negocio. Un reporte honesto incluye todo eso."
    },
    "practicaGuiada": {
      "id": "m33-l4-practica",
      "enunciado": "Traduce el efecto a negocio (ticket promedio de 50).",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Compras extra por cada 10 000 visitantes",
          "valor": 200,
          "calculo": "=10000*0.02"
        },
        {
          "tipo": "numero",
          "etiqueta": "Ingreso extra por cada 10 000 visitantes",
          "valor": 10000,
          "calculo": "=200*50"
        },
        {
          "tipo": "numero",
          "etiqueta": "Aumento relativo de la conversión (%, 1 decimal)",
          "valor": 16.7,
          "tolerancia": 0.05
        }
      ],
      "solucion": [
        "10 000 × 0.02 = 200 compras.",
        "200 × 50 = 10 000.",
        "(0.14 − 0.12) ÷ 0.12 = 16.7 %."
      ],
      "pistas": [
        "Pasa de puntos porcentuales a conteos."
      ]
    },
    "reto": {
      "id": "m33-l4-reto",
      "enunciado": "Valora el rango plausible del efecto (IC de la diferencia de conversión).",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Compras extra por 10 000 visitantes en el extremo inferior del IC (redondea a entero)",
          "valor": 10,
          "tolerancia": 2
        },
        {
          "tipo": "numero",
          "etiqueta": "Compras extra por 10 000 visitantes en el extremo superior del IC (redondea a entero)",
          "valor": 390,
          "tolerancia": 2
        },
        {
          "tipo": "opcion",
          "etiqueta": "Si el costo del rediseño equivale a 5 000 en ingresos, con el escenario pesimista (≈ 10 compras extra por 10 000 visitantes, 500 en ingreso)…",
          "opciones": [
            "Se recupera fácilmente",
            "Podría no recuperarse: conviene considerar el riesgo y la escala",
            "No hay ninguna incertidumbre"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "La recomendación más prudente es…",
          "opciones": [
            "Lanzar a todos de inmediato",
            "Lanzar por etapas y monitorear, reportando la incertidumbre",
            "Descartar B porque p está cerca de 0.05"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Inferior: 10 000 × 0.0010 = 10.",
        "Superior: 10 000 × 0.0390 = 390.",
        "El rango de ingresos extra es amplio: la decisión depende del costo y la escala.",
        "Un lanzamiento escalonado con monitoreo equilibra riesgo y beneficio."
      ],
      "pistas": [
        "Multiplica los límites del IC por 10 000."
      ]
    },
    "verificacion": [
      {
        "id": "m33-l4-q1",
        "pregunta": "Pasar de 12 % a 14 % es un aumento de…",
        "opciones": [
          "2 % relativo",
          "2 puntos porcentuales (≈ 16.7 % relativo)",
          "14 %",
          "0.2 %"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Distingue puntos porcentuales de porcentaje relativo."
      },
      {
        "id": "m33-l4-q2",
        "pregunta": "Un reporte de experimento debe incluir…",
        "opciones": [
          "Solo el p-valor",
          "Efecto, intervalo, relevancia práctica, límites y recomendación",
          "Solo gráficos",
          "Solo la media"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Para decidir con honestidad."
      }
    ],
    "resumen": [
      "Traduce el efecto a unidades de negocio.",
      "Reporta intervalo y límites, no solo p.",
      "Recomienda con prudencia y define cómo seguirás midiendo."
    ],
    "proximoPaso": "Has cerrado Estadística inferencial. Continúa con Excel para aplicar todo esto a hojas de cálculo reales.",
    "conceptos": [
      "reporte-inferencial"
    ]
  }
]
