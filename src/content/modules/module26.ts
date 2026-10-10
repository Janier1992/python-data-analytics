import type { Lesson } from '../../types'

export const module26Lessons: Lesson[] = [
  {
    "id": "m26-l1",
    "moduloId": "modulo-26",
    "motor": "calculo",
    "titulo": "Experimentos, espacio muestral y eventos",
    "objetivo": "Describir un experimento aleatorio con su espacio muestral y calcular probabilidades de eventos con la regla clásica.",
    "porQueImporta": "La probabilidad es el lenguaje con el que se razona bajo incertidumbre: pronósticos de demanda, riesgo de fallas, resultados de una prueba A/B. Todo empieza por saber qué resultados son posibles.",
    "concepto": "- **Experimento aleatorio**: proceso cuyo resultado no se puede predecir con certeza (lanzar un dado, atender a un cliente).\n- **Espacio muestral** `S`: el conjunto de todos los resultados posibles.\n- **Evento**: un subconjunto del espacio muestral (por ejemplo, «sale par»).\n\nSi todos los resultados son **igualmente probables**, la **probabilidad clásica** es:\n\n`P(A) = casos favorables ÷ casos posibles`\n\nUna probabilidad siempre está entre 0 (imposible) y 1 (seguro), y se puede dar como fracción, decimal o porcentaje. La suma de las probabilidades de todos los resultados del espacio muestral es 1.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Un dado de 6 caras: ¿cuál es la probabilidad de que salga par?",
      "pasos": [
        "Espacio muestral: S = {1, 2, 3, 4, 5, 6} → 6 resultados igualmente probables.",
        "Evento A = «par» = {2, 4, 6} → 3 casos favorables.",
        "P(A) = 3 ÷ 6 = **0.5**."
      ],
      "conclusion": "La mitad de las veces esperamos un número par."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Dos dados: la suma más probable",
      "datos": [
        {
          "columnas": [
            "Suma",
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
              "Casos (de 36)",
              1,
              2,
              3,
              4,
              5,
              6,
              5,
              4,
              3,
              2,
              1
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "barras",
          "categorias": [
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
          "valores": [
            1,
            2,
            3,
            4,
            5,
            6,
            5,
            4,
            3,
            2,
            1
          ],
          "titulo": "Maneras de obtener cada suma",
          "etiquetaY": "Casos de 36"
        }
      ],
      "pasos": [
        "Con dos dados el espacio muestral tiene 6 × 6 = **36** parejas igualmente probables.",
        "La suma 7 se obtiene de 6 formas: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).",
        "P(suma 7) = 6 ÷ 36 = **0.1667**."
      ],
      "conclusion": "El 7 es la suma más probable; el 2 y el 12 son las menos probables (1 caso de 36 cada una)."
    },
    "errorFrecuente": {
      "codigo": "Con dos dados las sumas posibles son 2, 3, …, 12 (11 resultados) → «P(suma 7) = 1/11».",
      "explicacion": "Los 11 resultados NO son igualmente probables, así que no se puede dividir entre 11. Hay que contar las 36 parejas equiprobables: la suma 7 se da en 6 de ellas, P = 6/36."
    },
    "practicaGuiada": {
      "id": "m26-l1-practica",
      "enunciado": "Se lanzan dos dados equilibrados. Usa la tabla de casos por suma de la lección.",
      "datos": [
        {
          "columnas": [
            "Suma",
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
              "Casos (de 36)",
              1,
              2,
              3,
              4,
              5,
              6,
              5,
              4,
              3,
              2,
              1
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Casos posibles en total",
          "valor": 36
        },
        {
          "tipo": "numero",
          "etiqueta": "Casos favorables de «suma 8»",
          "valor": 5
        },
        {
          "tipo": "numero",
          "etiqueta": "P(suma 8) (4 decimales)",
          "valor": 0.1389,
          "calculo": "=5/36"
        }
      ],
      "solucion": [
        "Hay 6 × 6 = 36 parejas.",
        "Suma 8: (2,6), (3,5), (4,4), (5,3), (6,2) → 5 casos.",
        "P = 5 ÷ 36 = 0.1389."
      ],
      "pistas": [
        "Lista las parejas (a, b) con a + b = 8."
      ]
    },
    "reto": {
      "id": "m26-l1-reto",
      "enunciado": "Una urna tiene 5 bolas rojas, 3 azules y 2 verdes. Se extrae una bola al azar.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(roja) (1 decimal)",
          "valor": 0.5,
          "calculo": "=5/10"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(no sea verde) (1 decimal)",
          "valor": 0.8,
          "calculo": "=8/10"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(azul o verde) (1 decimal)",
          "valor": 0.5,
          "calculo": "=5/10"
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Cuánto suman las probabilidades de roja, azul y verde?",
          "opciones": [
            "0.5",
            "1",
            "Depende de las bolas",
            "10"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Total: 5 + 3 + 2 = 10 bolas.",
        "P(roja) = 5/10 = 0.5. P(no verde) = 8/10 = 0.8. P(azul o verde) = (3 + 2)/10 = 0.5.",
        "Las tres probabilidades suman 0.5 + 0.3 + 0.2 = 1."
      ],
      "pistas": [
        "Cuenta los casos favorables de cada evento y divide entre 10."
      ]
    },
    "verificacion": [
      {
        "id": "m26-l1-q1",
        "pregunta": "El espacio muestral de un experimento es:",
        "opciones": [
          "El resultado más probable",
          "El conjunto de todos los resultados posibles",
          "La probabilidad total",
          "Un evento imposible"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "S reúne todos los resultados posibles."
      },
      {
        "id": "m26-l1-q2",
        "pregunta": "Una probabilidad de 1.3 es:",
        "opciones": [
          "Posible",
          "Imposible: las probabilidades están entre 0 y 1",
          "Muy alta pero válida",
          "Un porcentaje"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Una probabilidad nunca supera 1."
      }
    ],
    "resumen": [
      "Espacio muestral = todos los resultados; evento = un subconjunto.",
      "Con resultados equiprobables: P = favorables ÷ posibles.",
      "Toda probabilidad está entre 0 y 1."
    ],
    "proximoPaso": "Veremos las reglas del complemento y de la unión.",
    "conceptos": [
      "espacio-muestral",
      "probabilidad-clasica"
    ]
  },
  {
    "id": "m26-l2",
    "moduloId": "modulo-26",
    "motor": "calculo",
    "titulo": "Reglas de probabilidad: complemento y unión",
    "objetivo": "Aplicar la regla del complemento y la regla de la suma, con eventos mutuamente excluyentes o que se traslapan.",
    "porQueImporta": "Muchas preguntas piden «al menos uno» o «uno u otro». Con estas dos reglas se resuelven sin tener que contar caso por caso.",
    "concepto": "- **Complemento**: `P(no A) = 1 − P(A)`. Útil para «al menos uno» = 1 − «ninguno».\n- **Regla de la suma**: `P(A o B) = P(A) + P(B) − P(A y B)`. Se resta la intersección para no contarla dos veces.\n- Si A y B son **mutuamente excluyentes** (no pueden ocurrir juntos), `P(A y B) = 0` y la regla se simplifica: `P(A o B) = P(A) + P(B)`.\n\nUn diagrama de Venn o una tabla de conteos ayuda a ver la intersección.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Clientes que usan la app, la web o ambas",
      "datos": [
        {
          "columnas": [
            "Evento",
            "Probabilidad"
          ],
          "filas": [
            [
              "A: usa la app",
              0.6
            ],
            [
              "B: usa la web",
              0.4
            ],
            [
              "A y B: usa ambas",
              0.25
            ]
          ]
        }
      ],
      "pasos": [
        "P(A o B) = 0.60 + 0.40 − 0.25 = **0.75**.",
        "P(ninguna) = 1 − 0.75 = **0.25**."
      ],
      "conclusion": "El 75 % usa al menos un canal digital; el 25 % no usa ninguno."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "«Al menos uno» con el complemento",
      "pasos": [
        "Un lote tiene 3 piezas independientes y cada una falla con probabilidad 0.1.",
        "P(ninguna falla) = 0.9 × 0.9 × 0.9 = 0.729.",
        "P(al menos una falla) = 1 − 0.729 = **0.271**."
      ],
      "conclusion": "Calcular «ninguno» y restar de 1 es mucho más corto que sumar los casos con 1, 2 y 3 fallas."
    },
    "errorFrecuente": {
      "codigo": "P(A) = 0.6, P(B) = 0.4 → «P(A o B) = 0.6 + 0.4 = 1.0, seguro».",
      "explicacion": "Si A y B se traslapan, sumar sin restar P(A y B) cuenta dos veces los casos comunes. Solo si son mutuamente excluyentes basta con sumar."
    },
    "practicaGuiada": {
      "id": "m26-l2-practica",
      "enunciado": "En una empresa, el 50 % de los pedidos llega en menos de 2 días (A), el 30 % lleva envío gratis (B) y el 10 % cumple ambas condiciones.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(A o B) (1 decimal)",
          "valor": 0.7,
          "calculo": "=0.5+0.3-0.1"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(ni A ni B) (1 decimal)",
          "valor": 0.3,
          "calculo": "=1-0.7"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(A pero no B) (1 decimal)",
          "valor": 0.4,
          "calculo": "=0.5-0.1"
        }
      ],
      "solucion": [
        "P(A o B) = 0.5 + 0.3 − 0.1 = 0.7.",
        "Complemento: 1 − 0.7 = 0.3.",
        "Solo A: P(A) − P(A y B) = 0.5 − 0.1 = 0.4."
      ],
      "pistas": [
        "Resta la intersección una vez en la unión."
      ]
    },
    "reto": {
      "id": "m26-l2-reto",
      "enunciado": "Una tienda tiene 100 clientes: 40 compran en línea (E), 30 son menores de 30 años (J) y 12 son jóvenes que compran en línea.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(E) (2 decimales)",
          "valor": 0.4
        },
        {
          "tipo": "numero",
          "etiqueta": "P(E o J) (2 decimales)",
          "valor": 0.58,
          "calculo": "=0.4+0.3-0.12"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(ni E ni J) (2 decimales)",
          "valor": 0.42,
          "calculo": "=1-0.58"
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿E y J son mutuamente excluyentes?",
          "opciones": [
            "Sí",
            "No, porque P(E y J) = 0.12 ≠ 0"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "P(E) = 40/100; P(J) = 30/100; P(E y J) = 12/100.",
        "P(E o J) = 0.40 + 0.30 − 0.12 = 0.58; complemento 0.42.",
        "Hay 12 clientes en ambos: no son excluyentes."
      ],
      "pistas": [
        "Convierte los conteos a probabilidades dividiendo entre 100."
      ]
    },
    "verificacion": [
      {
        "id": "m26-l2-q1",
        "pregunta": "P(A) = 0.7 → P(no A) =",
        "opciones": [
          "0.7",
          "0.3",
          "1.7",
          "0.49"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Complemento: 1 − 0.7."
      },
      {
        "id": "m26-l2-q2",
        "pregunta": "Dos eventos mutuamente excluyentes cumplen que:",
        "opciones": [
          "P(A y B) = 0",
          "P(A y B) = 1",
          "P(A) = P(B)",
          "P(A o B) = 0"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "No pueden ocurrir a la vez."
      }
    ],
    "resumen": [
      "P(no A) = 1 − P(A).",
      "P(A o B) = P(A) + P(B) − P(A y B).",
      "«Al menos uno» = 1 − P(ninguno)."
    ],
    "proximoPaso": "Pasaremos a la probabilidad condicional.",
    "conceptos": [
      "complemento",
      "regla-de-la-suma"
    ]
  },
  {
    "id": "m26-l3",
    "moduloId": "modulo-26",
    "motor": "calculo",
    "titulo": "Probabilidad condicional",
    "objetivo": "Calcular y interpretar P(A | B), la probabilidad de A sabiendo que ocurrió B, usando una tabla de conteos.",
    "porQueImporta": "Casi toda decisión usa información previa: la probabilidad de que un cliente compre cambia si ya abrió el correo. La probabilidad condicional actualiza el cálculo con lo que ya se sabe.",
    "concepto": "La **probabilidad condicional** de A dado B es:\n\n`P(A | B) = P(A y B) ÷ P(B)`\n\nAl condicionar, el espacio muestral se **reduce** a los casos en que B ocurrió. En una tabla de conteos significa: tomar la fila (o columna) de B como nuevo total.\n\n`P(A | B)` y `P(B | A)` son cosas distintas: invertirlas es uno de los errores más comunes en probabilidad.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Renovación de suscripción según el plan (200 clientes)",
      "datos": [
        {
          "columnas": [
            "Plan",
            "Renueva",
            "No renueva",
            "Total"
          ],
          "filas": [
            [
              "Premium",
              60,
              40,
              100
            ],
            [
              "Estándar",
              30,
              70,
              100
            ],
            [
              "Total",
              90,
              110,
              200
            ]
          ]
        }
      ],
      "pasos": [
        "P(renueva) = 90 ÷ 200 = 0.45.",
        "P(renueva | Premium) = 60 ÷ 100 = **0.60** (el espacio muestral es la fila Premium).",
        "P(renueva | Estándar) = 30 ÷ 100 = **0.30**."
      ],
      "conclusion": "Saber que el cliente es Premium eleva la probabilidad de renovación de 0.45 a 0.60."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Con la fórmula",
      "pasos": [
        "P(Premium y renueva) = 60 ÷ 200 = 0.30; P(Premium) = 100 ÷ 200 = 0.50.",
        "P(renueva | Premium) = 0.30 ÷ 0.50 = **0.60**.",
        "Compara con P(Premium | renueva) = 60 ÷ 90 = **0.667**: no es lo mismo."
      ],
      "conclusion": "Dos probabilidades condicionales invertidas dan resultados distintos."
    },
    "errorFrecuente": {
      "codigo": "P(renueva | Premium) = 0.60 → «P(Premium | renueva) también es 0.60».",
      "explicacion": "P(A | B) ≠ P(B | A). Aquí P(Premium | renueva) = 60/90 = 0.667 porque el denominador cambia (los clientes que renuevan, no los Premium). Fíjate siempre en qué evento va después de la barra: es el nuevo total."
    },
    "practicaGuiada": {
      "id": "m26-l3-practica",
      "enunciado": "Una tienda registra si el cliente abrió el correo promocional y si compró.",
      "datos": [
        {
          "columnas": [
            "",
            "Compró",
            "No compró",
            "Total"
          ],
          "filas": [
            [
              "Abrió el correo",
              45,
              15,
              60
            ],
            [
              "No abrió",
              35,
              105,
              140
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Total de clientes",
          "valor": 200
        },
        {
          "tipo": "numero",
          "etiqueta": "P(compra | abrió) (2 decimales)",
          "valor": 0.75,
          "calculo": "=45/60"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(compra | no abrió) (2 decimales)",
          "valor": 0.25,
          "calculo": "=35/140"
        }
      ],
      "solucion": [
        "Total = 45 + 15 + 35 + 105 = 200.",
        "Abrieron: 45 + 15 = 60 → P(compra | abrió) = 45 ÷ 60 = 0.75.",
        "No abrieron: 35 + 105 = 140 → P(compra | no abrió) = 35 ÷ 140 = 0.25."
      ],
      "pistas": [
        "Usa como total la fila de la condición."
      ]
    },
    "reto": {
      "id": "m26-l3-reto",
      "enunciado": "Con la misma tabla, invierte la pregunta: ahora la condición es haber comprado.",
      "datos": [
        {
          "columnas": [
            "",
            "Compró",
            "No compró",
            "Total"
          ],
          "filas": [
            [
              "Abrió el correo",
              45,
              15,
              60
            ],
            [
              "No abrió",
              35,
              105,
              140
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Total de clientes que compraron",
          "valor": 80
        },
        {
          "tipo": "numero",
          "etiqueta": "P(abrió | compró) (4 decimales)",
          "valor": 0.5625,
          "calculo": "=45/80"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(compró | abrió) (2 decimales)",
          "valor": 0.75,
          "calculo": "=45/60"
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Son iguales P(compró | abrió) y P(abrió | compró)?",
          "opciones": [
            "Sí, siempre",
            "No: tienen denominadores distintos"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Compraron: 45 + 35 = 80.",
        "P(abrió | compró) = 45 ÷ 80 = 0.5625.",
        "P(compró | abrió) = 45 ÷ 60 = 0.75: la condición cambia el total."
      ],
      "pistas": [
        "Ahora el total es la columna «Compró»."
      ]
    },
    "verificacion": [
      {
        "id": "m26-l3-q1",
        "pregunta": "P(A | B) se calcula como:",
        "opciones": [
          "P(A) × P(B)",
          "P(A y B) ÷ P(B)",
          "P(B) ÷ P(A)",
          "P(A) + P(B)"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Se divide la intersección entre la probabilidad de la condición."
      },
      {
        "id": "m26-l3-q2",
        "pregunta": "Al condicionar en B, el espacio muestral:",
        "opciones": [
          "Se mantiene igual",
          "Se reduce a los casos en que ocurrió B",
          "Se duplica",
          "Desaparece"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Solo cuentan los casos con B."
      }
    ],
    "resumen": [
      "P(A | B) = P(A y B) ÷ P(B).",
      "La condición define el nuevo total.",
      "P(A | B) ≠ P(B | A)."
    ],
    "proximoPaso": "Estudiaremos cuándo los eventos son independientes.",
    "conceptos": [
      "probabilidad-condicional"
    ]
  },
  {
    "id": "m26-l4",
    "moduloId": "modulo-26",
    "motor": "calculo",
    "titulo": "Independencia y regla del producto",
    "objetivo": "Decidir si dos eventos son independientes y aplicar la regla del producto para calcular la probabilidad de que ocurran ambos.",
    "porQueImporta": "Cuando varios componentes de un proceso fallan o funcionan por separado, la regla del producto permite calcular la probabilidad de que todo el sistema funcione o falle.",
    "concepto": "Dos eventos son **independientes** si saber que uno ocurrió no cambia la probabilidad del otro:\n\n`P(A | B) = P(A)`  ⟺  `P(A y B) = P(A) × P(B)`\n\n- **Regla del producto (general)**: `P(A y B) = P(A) × P(B | A)`.\n- **Con independencia**: `P(A y B) = P(A) × P(B)`. Con varios eventos independientes se multiplican todas las probabilidades.\n\n**Independiente no es lo mismo que excluyente**: si dos eventos con probabilidad positiva son excluyentes, saber que uno ocurrió *elimina* el otro, así que son dependientes.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Dos componentes en serie",
      "pasos": [
        "Un sistema funciona solo si funcionan dos componentes independientes, con probabilidades 0.9 y 0.95.",
        "P(funcionan ambos) = 0.9 × 0.95 = **0.855**.",
        "P(el sistema falla) = 1 − 0.855 = **0.145**."
      ],
      "conclusion": "Aunque cada componente es confiable, el sistema en serie lo es menos que cualquiera de ellos."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "¿Son independientes la jornada y la compra?",
      "datos": [
        {
          "columnas": [
            "",
            "Compra",
            "No compra",
            "Total"
          ],
          "filas": [
            [
              "Mañana",
              24,
              36,
              60
            ],
            [
              "Tarde",
              16,
              24,
              40
            ],
            [
              "Total",
              40,
              60,
              100
            ]
          ]
        }
      ],
      "pasos": [
        "P(compra) = 40 ÷ 100 = 0.40.",
        "P(compra | mañana) = 24 ÷ 60 = 0.40 y P(compra | tarde) = 16 ÷ 40 = 0.40.",
        "Todas valen 0.40: P(compra | jornada) = P(compra).",
        "Verificación con el producto: P(mañana y compra) = 24 ÷ 100 = 0.24 = 0.60 × 0.40."
      ],
      "conclusion": "La compra es independiente de la jornada: conocer la jornada no cambia la probabilidad de compra."
    },
    "errorFrecuente": {
      "codigo": "P(llueve) = 0.3 y P(llueve mañana | llueve hoy) = 0.6 → «P(llueve ambos días) = 0.3 × 0.3».",
      "explicacion": "Multiplicar las probabilidades marginales solo es válido con independencia. Aquí los días son dependientes, así que se usa la regla general: P = P(hoy) × P(mañana | hoy) = 0.3 × 0.6 = 0.18."
    },
    "practicaGuiada": {
      "id": "m26-l4-practica",
      "enunciado": "Un proceso tiene tres etapas independientes con probabilidad de éxito 0.9, 0.8 y 0.95.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(las tres etapas tienen éxito) (3 decimales)",
          "valor": 0.684,
          "calculo": "=0.9*0.8*0.95"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(al menos una etapa falla) (3 decimales)",
          "valor": 0.316,
          "calculo": "=1-0.684"
        }
      ],
      "solucion": [
        "Independientes: 0.9 × 0.8 × 0.95 = 0.684.",
        "Al menos una falla = 1 − 0.684 = 0.316."
      ],
      "pistas": [
        "Multiplica las tres probabilidades; luego usa el complemento."
      ]
    },
    "reto": {
      "id": "m26-l4-reto",
      "enunciado": "En una encuesta de 200 personas se registró si usan la app y si compraron.",
      "datos": [
        {
          "columnas": [
            "",
            "Compra",
            "No compra",
            "Total"
          ],
          "filas": [
            [
              "Usa la app",
              60,
              40,
              100
            ],
            [
              "No la usa",
              20,
              80,
              100
            ],
            [
              "Total",
              80,
              120,
              200
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(usa app) (2 decimales)",
          "valor": 0.5,
          "calculo": "=100/200"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(compra) (2 decimales)",
          "valor": 0.4,
          "calculo": "=80/200"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(usa app y compra) (2 decimales)",
          "valor": 0.3,
          "calculo": "=60/200"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(usa app) × P(compra) (2 decimales)",
          "valor": 0.2,
          "calculo": "=0.5*0.4"
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Son independientes usar la app y comprar?",
          "opciones": [
            "Sí, porque ambas probabilidades son positivas",
            "No: P(usa y compra) = 0.30 ≠ 0.5 × 0.4 = 0.20",
            "No se puede saber"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "P(app) = 100/200; P(compra) = 80/200; P(ambos) = 60/200.",
        "Producto de marginales: 0.5 × 0.4 = 0.20, distinto de 0.30.",
        "Si fueran independientes coincidirían: hay dependencia (quienes usan la app compran más)."
      ],
      "pistas": [
        "Compara P(A y B) con P(A) × P(B)."
      ]
    },
    "verificacion": [
      {
        "id": "m26-l4-q1",
        "pregunta": "Si A y B son independientes, P(A y B) =",
        "opciones": [
          "P(A) + P(B)",
          "P(A) × P(B)",
          "P(A) − P(B)",
          "0"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Con independencia las probabilidades se multiplican."
      },
      {
        "id": "m26-l4-q2",
        "pregunta": "Eventos mutuamente excluyentes con probabilidad positiva son:",
        "opciones": [
          "Siempre independientes",
          "Dependientes",
          "Iguales",
          "Imposibles"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Si uno ocurre, el otro no puede ocurrir: se afectan."
      }
    ],
    "resumen": [
      "Independencia: P(A | B) = P(A).",
      "P(A y B) = P(A)·P(B) solo si son independientes.",
      "En serie, multiplica; «al menos uno», complemento."
    ],
    "proximoPaso": "Cerramos la unidad con el teorema de Bayes.",
    "conceptos": [
      "independencia",
      "regla-del-producto"
    ]
  },
  {
    "id": "m26-l5",
    "moduloId": "modulo-26",
    "motor": "calculo",
    "titulo": "Teorema de Bayes: actualizar probabilidades con evidencia",
    "objetivo": "Aplicar el teorema de Bayes y la ley de la probabilidad total para calcular la probabilidad de una causa dada la evidencia.",
    "porQueImporta": "Detectar fraude, filtrar spam o interpretar una prueba médica son problemas de Bayes: sabemos con qué frecuencia aparece la evidencia en cada caso y queremos la probabilidad inversa.",
    "concepto": "Con una partición del espacio muestral en `H` («hipótesis») y no `H`:\n\n- **Probabilidad total** de la evidencia `E`: `P(E) = P(E | H)·P(H) + P(E | no H)·P(no H)`.\n- **Teorema de Bayes**: `P(H | E) = P(E | H)·P(H) ÷ P(E)`.\n\nCómo se llama cada pieza: `P(H)` es la **prevalencia** o probabilidad previa; `P(E | H)` es la **sensibilidad**; `P(E | no H)` es la tasa de **falsos positivos**.\n\nUn truco para no perderse: imagina 10 000 casos y cuenta cuántos caen en cada rama («frecuencias naturales»).",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Prueba médica: prevalencia 1 %, sensibilidad 95 %, falsos positivos 5 %",
      "datos": [
        {
          "columnas": [
            "Grupo",
            "Personas (de 10 000)",
            "Dan positivo"
          ],
          "filas": [
            [
              "Enfermos (1 %)",
              100,
              95
            ],
            [
              "Sanos (99 %)",
              9900,
              495
            ],
            [
              "Total",
              10000,
              590
            ]
          ]
        }
      ],
      "pasos": [
        "De 10 000 personas, 100 están enfermas y 95 de ellas dan positivo.",
        "De las 9 900 sanas, el 5 % (495) también da positivo.",
        "P(enfermo | positivo) = 95 ÷ (95 + 495) = **0.161**."
      ],
      "conclusion": "Aunque la prueba parece muy buena, solo el 16.1 % de los positivos está realmente enfermo: la baja prevalencia pesa mucho."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "La misma cuenta con la fórmula",
      "pasos": [
        "P(+) = 0.95 × 0.01 + 0.05 × 0.99 = 0.0095 + 0.0495 = 0.0590.",
        "P(enfermo | +) = 0.0095 ÷ 0.0590 = **0.161**."
      ],
      "conclusion": "Un segundo examen independiente subiría la probabilidad: Bayes permite actualizarla paso a paso."
    },
    "errorFrecuente": {
      "codigo": "La prueba detecta al 95 % de los enfermos → «un positivo significa 95 % de probabilidad de estar enfermo».",
      "explicacion": "Se confunde P(+ | enfermo) = 0.95 con P(enfermo | +). Son probabilidades inversas y solo Bayes las relaciona, incorporando la prevalencia y los falsos positivos. Aquí P(enfermo | +) ≈ 0.16."
    },
    "practicaGuiada": {
      "id": "m26-l5-practica",
      "enunciado": "Un detector de fraude: el 2 % de las transacciones son fraudulentas; marca el 90 % de los fraudes y el 3 % de las legítimas.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Fraudes marcados por cada 10 000 transacciones",
          "valor": 180,
          "calculo": "=10000*0.02*0.9"
        },
        {
          "tipo": "numero",
          "etiqueta": "Legítimas marcadas por cada 10 000",
          "valor": 294,
          "calculo": "=10000*0.98*0.03"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(fraude | marcada) (3 decimales)",
          "valor": 0.38,
          "calculo": "=180/(180+294)"
        }
      ],
      "solucion": [
        "Fraudes: 10 000 × 0.02 = 200; marcados: 200 × 0.90 = 180.",
        "Legítimas: 9 800; marcadas: 9 800 × 0.03 = 294.",
        "P(fraude | marcada) = 180 ÷ (180 + 294) = 0.380."
      ],
      "pistas": [
        "Imagina 10 000 transacciones y cuenta cada rama."
      ]
    },
    "reto": {
      "id": "m26-l5-reto",
      "enunciado": "Un filtro de correo: el 30 % del correo es spam; la palabra «gratis» aparece en el 60 % del spam y en el 5 % del correo legítimo.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(gratis) (3 decimales)",
          "valor": 0.215,
          "calculo": "=0.3*0.6+0.7*0.05"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(spam | gratis) (3 decimales)",
          "valor": 0.837,
          "calculo": "=(0.3*0.6)/(0.3*0.6+0.7*0.05)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Si un correo contiene «gratis», la probabilidad de que sea spam…",
          "opciones": [
            "Sigue siendo 0.30",
            "Aumenta con respecto a 0.30",
            "Baja con respecto a 0.30"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "P(gratis) = 0.3 × 0.6 + 0.7 × 0.05 = 0.18 + 0.035 = 0.215.",
        "P(spam | gratis) = 0.18 ÷ 0.215 = 0.837.",
        "La evidencia «gratis» eleva la probabilidad de spam de 0.30 a 0.84."
      ],
      "pistas": [
        "Probabilidad total en el denominador; Bayes en el numerador."
      ]
    },
    "verificacion": [
      {
        "id": "m26-l5-q1",
        "pregunta": "Una prueba con 99 % de sensibilidad aplicada a una enfermedad muy rara…",
        "opciones": [
          "Garantiza que los positivos están enfermos",
          "Puede tener muchos más falsos que verdaderos positivos",
          "No puede dar falsos positivos",
          "Tiene probabilidad posterior 0.99"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Con baja prevalencia, los falsos positivos de la población sana dominan."
      },
      {
        "id": "m26-l5-q2",
        "pregunta": "En el teorema de Bayes, P(E) se calcula con:",
        "opciones": [
          "La probabilidad total",
          "La regla del complemento solamente",
          "La media",
          "La condicional inversa"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "P(E) suma las contribuciones de cada hipótesis."
      }
    ],
    "resumen": [
      "P(H | E) = P(E | H)·P(H) ÷ P(E).",
      "La prevalencia pesa mucho en el resultado.",
      "Con 10 000 casos imaginarios se ve el cálculo claro."
    ],
    "proximoPaso": "Pasamos a las variables aleatorias y sus distribuciones.",
    "conceptos": [
      "teorema-de-bayes",
      "probabilidad-total"
    ]
  }
]
