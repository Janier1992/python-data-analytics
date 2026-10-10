import type { Lesson } from '../../types'

export const module27Lessons: Lesson[] = [
  {
    "id": "m27-l1",
    "moduloId": "modulo-27",
    "motor": "calculo",
    "titulo": "Conteo: factoriales, permutaciones y combinaciones",
    "objetivo": "Contar arreglos con factoriales, permutaciones (el orden importa) y combinaciones (el orden no importa).",
    "porQueImporta": "Para calcular probabilidades clásicas hay que contar casos favorables y posibles: ¿cuántos podios?, ¿cuántos comités?, ¿cuántas contraseñas? Las fórmulas de conteo evitan enumerar uno por uno.",
    "concepto": "- **Factorial**: `n! = n × (n−1) × … × 2 × 1`, con `0! = 1`. Es el número de formas de ordenar `n` objetos distintos.\n- **Permutaciones** (el **orden importa**): formas de elegir y ordenar `k` de `n`: `P(n, k) = n! ÷ (n − k)!`.\n- **Combinaciones** (el **orden no importa**): formas de elegir `k` de `n`: `C(n, k) = n! ÷ (k! × (n − k)!)`.\n\nPregunta clave: *¿cambiar el orden da un resultado distinto?* Un podio (oro, plata, bronce) sí; un comité no.\n\nEn la calculadora: `=FACT(5)`, `=PERMUTACIONES(8;3)`, `=COMBINAT(8;3)`.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Ocho finalistas: podio frente a comité",
      "pasos": [
        "Podio de 3 (el orden importa): P(8, 3) = 8 × 7 × 6 = **336**.",
        "Comité de 3 (el orden no importa): C(8, 3) = 336 ÷ 3! = 336 ÷ 6 = **56**.",
        "Cada comité de 3 personas corresponde a 3! = 6 podios distintos, por eso 336 = 56 × 6."
      ],
      "conclusion": "Si el orden importa se cuentan más resultados que si no importa."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Probabilidad de ganar una lotería 6 de 49",
      "pasos": [
        "Se eligen 6 números de 49 sin importar el orden: C(49, 6) = **13 983 816**.",
        "Solo una combinación gana: P = 1 ÷ 13 983 816 ≈ **0.0000000715**."
      ],
      "conclusion": "Las combinaciones permiten calcular la probabilidad contando una sola vez."
    },
    "errorFrecuente": {
      "codigo": "Elegir 3 representantes de 8 personas → «8 × 7 × 6 = 336 comités».",
      "explicacion": "Esa cuenta distingue el orden (da podios). Un comité {Ana, Luis, Eva} es el mismo en cualquier orden, así que hay que dividir entre 3! = 6: C(8, 3) = 56."
    },
    "practicaGuiada": {
      "id": "m27-l1-practica",
      "enunciado": "Una empresa tiene 10 candidatos para 3 puestos.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Formas de ordenar los 10 candidatos en fila",
          "valor": 3628800,
          "calculo": "=FACT(10)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Formas de asignar 3 puestos distintos (el orden importa)",
          "valor": 720,
          "calculo": "=PERMUTACIONES(10;3)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Formas de elegir un equipo de 3 (el orden no importa)",
          "valor": 120,
          "calculo": "=COMBINAT(10;3)"
        }
      ],
      "solucion": [
        "10! = 3 628 800.",
        "P(10, 3) = 10 × 9 × 8 = 720.",
        "C(10, 3) = 720 ÷ 6 = 120."
      ],
      "pistas": [
        "¿Importa el orden en cada caso?"
      ]
    },
    "reto": {
      "id": "m27-l1-reto",
      "enunciado": "Un comité de 3 se elige al azar entre 5 mujeres y 4 hombres.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Comités posibles (9 personas, 3 plazas)",
          "valor": 84,
          "calculo": "=COMBINAT(9;3)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Comités con 2 mujeres y 1 hombre",
          "valor": 40,
          "calculo": "=COMBINAT(5;2)*COMBINAT(4;1)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(2 mujeres y 1 hombre) (3 decimales)",
          "valor": 0.476,
          "calculo": "=40/84"
        }
      ],
      "solucion": [
        "C(9, 3) = 84.",
        "Elegir 2 de 5 mujeres: C(5, 2) = 10; 1 de 4 hombres: C(4, 1) = 4; por el principio del producto 10 × 4 = 40.",
        "P = 40 ÷ 84 = 0.476."
      ],
      "pistas": [
        "Multiplica las elecciones independientes de cada grupo."
      ]
    },
    "verificacion": [
      {
        "id": "m27-l1-q1",
        "pregunta": "¿Cuántas formas hay de ordenar 4 libros distintos en un estante?",
        "opciones": [
          "4",
          "16",
          "24",
          "8"
        ],
        "respuestaCorrecta": 2,
        "explicacion": "4! = 24."
      },
      {
        "id": "m27-l1-q2",
        "pregunta": "Cuando el orden NO importa se usan:",
        "opciones": [
          "Permutaciones",
          "Combinaciones",
          "Factoriales solo",
          "Probabilidades condicionales"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Las combinaciones cuentan subconjuntos sin orden."
      }
    ],
    "resumen": [
      "n! ordena n objetos.",
      "P(n, k) = n!/(n−k)! si el orden importa.",
      "C(n, k) = n!/(k!(n−k)!) si no importa."
    ],
    "proximoPaso": "Pasamos a las variables aleatorias discretas: esperanza y varianza.",
    "conceptos": [
      "permutaciones",
      "combinaciones"
    ]
  },
  {
    "id": "m27-l2",
    "moduloId": "modulo-27",
    "motor": "calculo",
    "titulo": "Variables aleatorias discretas: esperanza y varianza",
    "objetivo": "Calcular la esperanza (media), la varianza y la desviación estándar de una variable aleatoria discreta a partir de su tabla de probabilidades.",
    "porQueImporta": "La esperanza resume «cuánto esperamos en promedio a largo plazo» y la varianza «cuánto puede variar». Con ellas se evalúan decisiones con incertidumbre: promociones, inventarios, seguros.",
    "concepto": "Una **variable aleatoria discreta** `X` toma valores `x` con probabilidades `P(x)` que suman 1.\n\n- **Esperanza (media)**: `E(X) = μ = Σ x · P(x)`.\n- **Varianza**: `Var(X) = σ² = Σ (x − μ)² · P(x)`, o también `E(X²) − μ²` con `E(X²) = Σ x² · P(x)`.\n- **Desviación estándar**: `σ = √σ²`.\n\nLa esperanza no tiene por qué ser un valor que `X` pueda tomar: es un promedio a largo plazo.\n\nPropiedades útiles: `E(aX + b) = a·E(X) + b` y `Var(aX + b) = a²·Var(X)`.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Unidades vendidas por hora",
      "datos": [
        {
          "columnas": [
            "x",
            "P(x)",
            "x·P(x)",
            "x²·P(x)"
          ],
          "filas": [
            [
              0,
              0.1,
              0.0,
              0.0
            ],
            [
              1,
              0.3,
              0.3,
              0.3
            ],
            [
              2,
              0.4,
              0.8,
              1.6
            ],
            [
              3,
              0.2,
              0.6,
              1.8
            ],
            [
              "Suma",
              1,
              1.7,
              3.7
            ]
          ]
        }
      ],
      "pasos": [
        "E(X) = 0·0.1 + 1·0.3 + 2·0.4 + 3·0.2 = **1.7**.",
        "E(X²) = 3.7; Var(X) = 3.7 − 1.7² = **0.81**.",
        "σ = √0.81 = **0.900**."
      ],
      "conclusion": "En promedio se venden 1.7 unidades por hora, con una desviación típica de 0.9."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "¿Conviene la promoción? Ganancia esperada",
      "datos": [
        {
          "columnas": [
            "Resultado",
            "Ganancia (x)",
            "P(x)"
          ],
          "filas": [
            [
              "Pierde",
              -10,
              0.5
            ],
            [
              "Empata",
              5,
              0.3
            ],
            [
              "Gana",
              20,
              0.2
            ]
          ]
        }
      ],
      "pasos": [
        "E(X) = (−10)(0.5) + 5(0.3) + 20(0.2) = −5 + 1.5 + 4 = **0.5**.",
        "Var(X) = (−10 − 0.5)²(0.5) + (5 − 0.5)²(0.3) + (20 − 0.5)²(0.2) = **137.25**; σ = 11.72."
      ],
      "conclusion": "La ganancia esperada es negativa (−0.5): a largo plazo la promoción pierde dinero, aunque a veces gane 20."
    },
    "errorFrecuente": {
      "codigo": "Probabilidades: 0.2, 0.3, 0.4, 0.3 → «E(X) = 0·0.2 + 1·0.3 + 2·0.4 + 3·0.3».",
      "explicacion": "Las probabilidades suman 1.2: no es una distribución válida. Antes de calcular, comprueba siempre que cada P(x) esté entre 0 y 1 y que sumen exactamente 1."
    },
    "practicaGuiada": {
      "id": "m27-l2-practica",
      "enunciado": "Número de clientes que llegan a una caja en un minuto.",
      "datos": [
        {
          "columnas": [
            "x",
            "0",
            "1",
            "2",
            "3",
            "4"
          ],
          "filas": [
            [
              "P(x)",
              0.05,
              0.15,
              0.3,
              0.35,
              0.15
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Esperanza E(X) (2 decimales)",
          "valor": 2.4,
          "calculo": "=0*0.05+1*0.15+2*0.3+3*0.35+4*0.15"
        },
        {
          "tipo": "numero",
          "etiqueta": "E(X²) (2 decimales)",
          "valor": 6.9
        },
        {
          "tipo": "numero",
          "etiqueta": "Varianza (4 decimales)",
          "valor": 1.14
        },
        {
          "tipo": "numero",
          "etiqueta": "Desviación estándar (3 decimales)",
          "valor": 1.068
        }
      ],
      "solucion": [
        "E(X) = 2.40.",
        "E(X²) = 6.90.",
        "Var(X) = 6.90 − 2.40² = 1.1400; σ = 1.068."
      ],
      "pistas": [
        "Apóyate en la calculadora para las sumas."
      ]
    },
    "reto": {
      "id": "m27-l2-reto",
      "enunciado": "Un vendedor recibe una comisión de 100 con probabilidad 0.2, de 50 con probabilidad 0.5 y de 0 con probabilidad 0.3. Cada comisión está sujeta a un descuento fijo de 10 y un incentivo del 20 % (la comisión final es 0.8·X − 10).",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "E(X) (comisión base)",
          "valor": 45,
          "calculo": "=100*0.2+50*0.5"
        },
        {
          "tipo": "numero",
          "etiqueta": "E(0.8·X − 10) usando E(aX + b) = a·E(X) + b",
          "valor": 26,
          "calculo": "=0.8*45-10"
        },
        {
          "tipo": "numero",
          "etiqueta": "Var(X)",
          "valor": 1225
        },
        {
          "tipo": "numero",
          "etiqueta": "Var(0.8·X − 10) = a²·Var(X)",
          "valor": 784
        }
      ],
      "solucion": [
        "E(X) = 100(0.2) + 50(0.5) + 0(0.3) = 45.",
        "E(0.8X − 10) = 0.8 × 45 − 10 = 26.",
        "E(X²) = 10000(0.2) + 2500(0.5) = 3250; Var(X) = 3250 − 45² = 1225.",
        "Var(0.8X − 10) = 0.8² × 1225 = 0.64 × 1225 = 784 (sumar una constante no cambia la varianza)."
      ],
      "pistas": [
        "La constante b no cambia la varianza."
      ]
    },
    "verificacion": [
      {
        "id": "m27-l2-q1",
        "pregunta": "La esperanza de una variable discreta es:",
        "opciones": [
          "El valor más probable",
          "La suma de x·P(x)",
          "La suma de las probabilidades",
          "El máximo"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "E(X) = Σ x·P(x)."
      },
      {
        "id": "m27-l2-q2",
        "pregunta": "Las probabilidades de una distribución discreta deben:",
        "opciones": [
          "Ser iguales",
          "Sumar 1",
          "Ser enteras",
          "Ser decrecientes"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Cubren todos los resultados posibles."
      }
    ],
    "resumen": [
      "E(X) = Σ x·P(x).",
      "Var(X) = E(X²) − μ².",
      "Una esperanza negativa en una decisión indica pérdida a largo plazo."
    ],
    "proximoPaso": "Veremos una distribución discreta clásica: la binomial.",
    "conceptos": [
      "variable-aleatoria",
      "esperanza",
      "varianza-discreta"
    ]
  },
  {
    "id": "m27-l3",
    "moduloId": "modulo-27",
    "motor": "calculo",
    "titulo": "Distribución binomial",
    "objetivo": "Calcular probabilidades binomiales con la fórmula y con la función de la calculadora, y obtener su media y desviación.",
    "porQueImporta": "Muchos procesos son «n intentos, éxito o fracaso»: piezas defectuosas en un lote, clientes que compran entre n visitantes, respuestas correctas en un test. La binomial los modela.",
    "concepto": "Una variable `X ~ Binomial(n, p)` cuenta los **éxitos** en `n` ensayos si:\n\n- hay un número fijo `n` de ensayos,\n- cada ensayo tiene solo dos resultados (éxito/fracaso),\n- la probabilidad de éxito `p` es la misma en cada ensayo,\n- los ensayos son **independientes**.\n\n`P(X = k) = C(n, k) · p^k · (1 − p)^(n−k)`\n\nMedia `μ = n·p` y desviación `σ = √(n·p·(1−p))`.\n\nEn la calculadora: `=DISTR.BINOM.N(k; n; p; FALSO)` da `P(X = k)` y con `VERDADERO` da la probabilidad acumulada `P(X ≤ k)`. «Al menos uno» se resuelve con el complemento: `P(X ≥ 1) = 1 − P(X = 0)`.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Lote de 10 piezas con 10 % de defectuosas",
      "pasos": [
        "X ~ Binomial(n = 10, p = 0.1). P(X = 2) = C(10, 2) · 0.1² · 0.9⁸ = 45 · 0.01 · 0.4305 = **0.1937**.",
        "P(X ≤ 1) = P(0) + P(1) = 0.3487 + 0.3874 = **0.7361**.",
        "Media = 10 × 0.1 = 1 defectuosa; σ = √(10 × 0.1 × 0.9) = 0.949."
      ],
      "conclusion": "Es probable (≈ 74 %) encontrar 0 o 1 defectuosas en el lote."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Conversión: 5 visitantes con probabilidad de compra 0.6",
      "datos": [
        {
          "columnas": [
            "k",
            "P(X = k)"
          ],
          "filas": [
            [
              0,
              "0.0102"
            ],
            [
              1,
              "0.0768"
            ],
            [
              2,
              "0.2304"
            ],
            [
              3,
              "0.3456"
            ],
            [
              4,
              "0.2592"
            ],
            [
              5,
              "0.0778"
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "barras",
          "categorias": [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5"
          ],
          "valores": [
            0.0102,
            0.0768,
            0.2304,
            0.3456,
            0.2592,
            0.0778
          ],
          "titulo": "Binomial(5; 0.6)",
          "etiquetaY": "Probabilidad"
        }
      ],
      "pasos": [
        "P(X = 3) = C(5, 3) · 0.6³ · 0.4² = 10 · 0.216 · 0.16 = **0.3456**.",
        "P(X ≥ 4) = P(4) + P(5) = 0.2592 + 0.0778 = **0.3370**."
      ],
      "conclusion": "El valor más probable es 3 compras (la media es 3)."
    },
    "errorFrecuente": {
      "codigo": "Se extraen 3 cartas de un mazo SIN reponerlas y se cuenta cuántas son corazones → «es binomial con p = 0.25».",
      "explicacion": "Sin reposición, los ensayos no son independientes y p cambia en cada extracción. La binomial exige independencia y p constante (con reposición, o con una población enorme)."
    },
    "practicaGuiada": {
      "id": "m27-l3-practica",
      "enunciado": "Una moneda sesgada cae cara con probabilidad 0.25. Se lanza 8 veces.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(X = 3) (4 decimales)",
          "valor": 0.2076,
          "calculo": "=DISTR.BINOM.N(3;8;0.25;FALSO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(X ≤ 2) (4 decimales)",
          "valor": 0.6785,
          "calculo": "=DISTR.BINOM.N(2;8;0.25;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(X ≥ 1) (4 decimales)",
          "valor": 0.8999,
          "calculo": "=1-DISTR.BINOM.N(0;8;0.25;FALSO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Media n·p",
          "valor": 2
        }
      ],
      "solucion": [
        "P(3) = C(8, 3) · 0.25³ · 0.75⁵ = 0.2076.",
        "P(X ≤ 2) = 0.6785 (acumulada).",
        "P(X ≥ 1) = 1 − 0.75⁸ = 0.8999.",
        "μ = 8 × 0.25 = 2."
      ],
      "pistas": [
        "Usa =DISTR.BINOM.N(k; n; p; FALSO) o la fórmula."
      ]
    },
    "reto": {
      "id": "m27-l3-reto",
      "enunciado": "Una prueba de 10 preguntas de opción múltiple con 4 opciones cada una; un estudiante responde al azar (p = 0.25 de acertar cada una).",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(acertar exactamente 5) (4 decimales)",
          "valor": 0.0584,
          "calculo": "=DISTR.BINOM.N(5;10;0.25;FALSO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(aprobar con 6 o más aciertos) (4 decimales)",
          "valor": 0.0197,
          "calculo": "=1-DISTR.BINOM.N(5;10;0.25;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Aciertos esperados",
          "valor": 2.5
        },
        {
          "tipo": "numero",
          "etiqueta": "Desviación estándar (3 decimales)",
          "valor": 1.369,
          "calculo": "=RAIZ(10*0.25*0.75)"
        }
      ],
      "solucion": [
        "P(5) = 0.0584.",
        "P(X ≥ 6) = 1 − P(X ≤ 5) = 1 − 0.9803 = 0.0197.",
        "μ = 2.5; σ = √(10 × 0.25 × 0.75) = 1.369."
      ],
      "pistas": [
        "P(X ≥ 6) = 1 − P(X ≤ 5)."
      ]
    },
    "verificacion": [
      {
        "id": "m27-l3-q1",
        "pregunta": "¿Cuál NO es una condición de la binomial?",
        "opciones": [
          "Ensayos independientes",
          "p constante",
          "Número fijo de ensayos",
          "Más de dos resultados por ensayo"
        ],
        "respuestaCorrecta": 3,
        "explicacion": "Cada ensayo debe ser éxito o fracaso."
      },
      {
        "id": "m27-l3-q2",
        "pregunta": "Si X ~ Binomial(20; 0.3), la media es:",
        "opciones": [
          "3",
          "6",
          "14",
          "0.3"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "n·p = 20 × 0.3 = 6."
      }
    ],
    "resumen": [
      "Binomial: n ensayos independientes, éxito con probabilidad p.",
      "P(X = k) = C(n, k) p^k (1−p)^(n−k).",
      "μ = np y σ = √(np(1−p))."
    ],
    "proximoPaso": "Veremos la distribución de Poisson para conteos de eventos.",
    "conceptos": [
      "distribucion-binomial"
    ]
  },
  {
    "id": "m27-l4",
    "moduloId": "modulo-27",
    "motor": "calculo",
    "titulo": "Distribución de Poisson",
    "objetivo": "Calcular probabilidades de conteos de eventos en un intervalo con la distribución de Poisson.",
    "porQueImporta": "Llamadas por minuto, fallas por semana, pedidos por hora: cuando contamos eventos que ocurren al azar a una tasa promedio, la Poisson dice cuántos esperar y con qué probabilidad.",
    "concepto": "`X ~ Poisson(λ)` cuenta eventos en un intervalo (de tiempo o espacio) si los eventos ocurren de forma independiente y a una tasa promedio `λ` constante.\n\n`P(X = k) = e^(−λ) · λ^k ÷ k!`\n\nMedia y varianza son iguales: `μ = σ² = λ`.\n\nLa tasa se ajusta al intervalo: si ocurren 4 eventos por hora, en 30 minutos `λ = 2`.\n\nEn la calculadora: `=POISSON.DIST(k; λ; FALSO)` para `P(X = k)` y `=POISSON.DIST(k; λ; VERDADERO)` para `P(X ≤ k)`.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Llegan en promedio 4 clientes por hora (λ = 4)",
      "pasos": [
        "P(X = 2) = e⁻⁴ · 4² ÷ 2! = 0.0183 · 16 ÷ 2 = **0.1465**.",
        "P(X ≤ 2) = 0.0183 + 0.0733 + 0.1465 = **0.2381**.",
        "P(X > 6) = 1 − P(X ≤ 6) = 1 − 0.8893 = **0.1107**."
      ],
      "conclusion": "Hay solo un 11.1 % de probabilidad de que lleguen más de 6 clientes en una hora."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Ajustar λ al intervalo",
      "graficos": [
        {
          "tipo": "barras",
          "categorias": [
            "0",
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
          "valores": [
            0.0183,
            0.0733,
            0.1465,
            0.1954,
            0.1954,
            0.1563,
            0.1042,
            0.0595,
            0.0298,
            0.0132,
            0.0053
          ],
          "titulo": "Poisson(λ = 4)",
          "etiquetaY": "Probabilidad"
        }
      ],
      "pasos": [
        "Tasa: 4 clientes por hora → en 15 minutos λ = 4 × 0.25 = 1.",
        "P(ninguno en 15 min) = e⁻¹ = **0.3679**.",
        "P(al menos uno) = 1 − 0.3679 = **0.6321**."
      ],
      "conclusion": "Cambiar el intervalo obliga a recalcular λ antes de usar la fórmula."
    },
    "errorFrecuente": {
      "codigo": "Hay 4 llamadas por hora → «la probabilidad de 0 llamadas en 15 minutos usa λ = 4».",
      "explicacion": "λ debe corresponder al intervalo de la pregunta. En 15 minutos λ = 4 × 15/60 = 1, y P(0) = e⁻¹ = 0.3679, no e⁻⁴ = 0.0183."
    },
    "practicaGuiada": {
      "id": "m27-l4-practica",
      "enunciado": "Un servidor registra en promedio 2.5 errores por día (λ = 2.5).",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(X = 0) (4 decimales)",
          "valor": 0.0821,
          "calculo": "=POISSON.DIST(0;2.5;FALSO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(X = 3) (4 decimales)",
          "valor": 0.2138,
          "calculo": "=POISSON.DIST(3;2.5;FALSO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(X ≤ 2) (4 decimales)",
          "valor": 0.5438,
          "calculo": "=POISSON.DIST(2;2.5;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Desviación estándar (3 decimales)",
          "valor": 1.581,
          "calculo": "=RAIZ(2.5)"
        }
      ],
      "solucion": [
        "P(0) = e⁻²·⁵ = 0.0821.",
        "P(3) = e⁻²·⁵ · 2.5³ ÷ 6 = 0.2138.",
        "P(X ≤ 2) = 0.5438.",
        "σ² = λ = 2.5; σ = 1.581."
      ],
      "pistas": [
        "Usa =POISSON.DIST(k; λ; FALSO)."
      ]
    },
    "reto": {
      "id": "m27-l4-reto",
      "enunciado": "Una tienda recibe en promedio 6 pedidos por hora. ¿Cuántos operarios conviene tener?",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "λ para media hora",
          "valor": 3
        },
        {
          "tipo": "numero",
          "etiqueta": "P(más de 5 pedidos en media hora) (4 decimales)",
          "valor": 0.0839,
          "calculo": "=1-POISSON.DIST(5;3;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(ninguno en 10 minutos) (4 decimales)",
          "valor": 0.3679,
          "calculo": "=POISSON.DIST(0;1;FALSO)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con λ = 6 por hora, la capacidad de 6 pedidos por hora…",
          "opciones": [
            "Basta siempre",
            "Se excede con probabilidad considerable (≈ 39 % de las horas)",
            "Nunca se excede"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Media hora: λ = 6 × 0.5 = 3. P(X > 5) = 1 − P(X ≤ 5) = 1 − 0.9161 = 0.0839.",
        "10 minutos: λ = 1; P(0) = 0.3679.",
        "Con λ = 6, P(X > 6) = 0.394: en cerca de 4 de cada 10 horas se superaría la capacidad."
      ],
      "pistas": [
        "Ajusta λ al intervalo antes de calcular."
      ]
    },
    "verificacion": [
      {
        "id": "m27-l4-q1",
        "pregunta": "En una Poisson(λ), la media y la varianza son:",
        "opciones": [
          "Distintas",
          "Ambas iguales a λ",
          "λ y λ²",
          "Cero"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Media = varianza = λ."
      },
      {
        "id": "m27-l4-q2",
        "pregunta": "Si hay 12 eventos por hora, ¿cuál es λ para 5 minutos?",
        "opciones": [
          "12",
          "1",
          "5",
          "60"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "12 × 5/60 = 1."
      }
    ],
    "resumen": [
      "Poisson cuenta eventos independientes con tasa media λ.",
      "P(X = k) = e^−λ λ^k / k!.",
      "Ajusta λ al intervalo."
    ],
    "proximoPaso": "Terminamos con simulación manual y la ley de los grandes números.",
    "conceptos": [
      "distribucion-poisson"
    ]
  },
  {
    "id": "m27-l5",
    "moduloId": "modulo-27",
    "motor": "calculo",
    "titulo": "Simulación Monte Carlo y ley de los grandes números",
    "objetivo": "Estimar probabilidades contando resultados de una simulación y entender por qué más repeticiones dan estimaciones más estables.",
    "porQueImporta": "Cuando la cuenta exacta es difícil, se puede simular el proceso muchas veces y medir con qué frecuencia ocurre el evento. Es la base de la analítica de riesgo y de los métodos Monte Carlo.",
    "concepto": "La **simulación Monte Carlo** estima una probabilidad repitiendo un experimento aleatorio muchas veces:\n\n`P(A) ≈ veces que ocurrió A ÷ número de repeticiones`\n\nSin computador, se puede simular con una **tabla de dígitos aleatorios** (0 a 9, cada uno con probabilidad 0.1): los dígitos 0 a 2 representan un evento de probabilidad 0.3, por ejemplo.\n\nLa **ley de los grandes números** dice que, al aumentar el número de repeticiones, la frecuencia relativa se acerca a la probabilidad verdadera. El error típico de una estimación por frecuencia es aproximadamente `√(p(1 − p) ÷ n)`: **para dividir el error entre 10 hay que repetir 100 veces más**.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Estimar P(dígito ≥ 7) con 50 dígitos aleatorios (probabilidad real 0.3)",
      "datos": [
        {
          "columnas": [
            "",
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
              "Fila 1",
              7,
              2,
              9,
              4,
              3,
              6,
              4,
              8,
              3,
              7
            ],
            [
              "Fila 2",
              5,
              6,
              8,
              9,
              3,
              4,
              8,
              5,
              8,
              1
            ],
            [
              "Fila 3",
              3,
              7,
              2,
              8,
              3,
              6,
              0,
              5,
              6,
              7
            ],
            [
              "Fila 4",
              1,
              2,
              5,
              6,
              5,
              5,
              3,
              5,
              6,
              6
            ],
            [
              "Fila 5",
              5,
              9,
              3,
              6,
              3,
              3,
              0,
              3,
              0,
              4
            ]
          ]
        }
      ],
      "pasos": [
        "Contamos los dígitos 7, 8 o 9: hay **12** de 50.",
        "Estimación = 12 ÷ 50 = **0.24**.",
        "Valor teórico 3/10 = 0.30; diferencia = 0.06."
      ],
      "conclusion": "Una simulación pequeña da una estimación aproximada, no exacta."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Ley de los grandes números con una moneda",
      "datos": [
        {
          "columnas": [
            "Lanzamientos",
            "Caras",
            "Proporción",
            "|Error| respecto a 0.5"
          ],
          "filas": [
            [
              10,
              6,
              "0.6000",
              "0.1000"
            ],
            [
              100,
              44,
              "0.4400",
              "0.0600"
            ],
            [
              1000,
              488,
              "0.4880",
              "0.0120"
            ],
            [
              10000,
              4994,
              "0.4994",
              "0.0006"
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "barras",
          "categorias": [
            "10",
            "100",
            "1000",
            "10000"
          ],
          "valores": [
            0.6,
            0.44,
            0.488,
            0.4994
          ],
          "titulo": "Proporción de caras según el número de lanzamientos",
          "etiquetaY": "Proporción"
        }
      ],
      "pasos": [
        "Con pocos lanzamientos la proporción puede alejarse bastante de 0.5.",
        "Al crecer n, la proporción se estabiliza alrededor de 0.5.",
        "El error típico √(0.5·0.5 ÷ n) baja de 0.158 (n = 10) a 0.005 (n = 10 000)."
      ],
      "conclusion": "Más repeticiones → estimaciones más estables, aunque nunca exactas."
    },
    "errorFrecuente": {
      "codigo": "Una moneda justa cae cara 7 de las primeras 10 veces → «la moneda está cargada» o «ahora tiene que salir cruz para compensar».",
      "explicacion": "Con 10 lanzamientos es normal ver 7 caras. Y la ley de los grandes números no «compensa» el pasado: cada lanzamiento es independiente. Solo dice que la proporción se estabiliza al crecer n, porque los primeros resultados pesan cada vez menos."
    },
    "practicaGuiada": {
      "id": "m27-l5-practica",
      "enunciado": "Se simularon 20 lanzamientos de dos dados y se anotó la suma de cada uno.",
      "datos": [
        {
          "columnas": [
            "Lanzamiento",
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
              "Suma",
              8,
              9,
              12,
              11,
              5,
              8,
              3,
              4,
              6,
              9,
              6,
              3,
              8,
              7,
              6,
              3,
              7,
              9,
              4,
              2
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Veces que la suma fue 10 o más",
          "valor": 2
        },
        {
          "tipo": "numero",
          "etiqueta": "Estimación de P(suma ≥ 10) (2 decimales)",
          "valor": 0.1
        },
        {
          "tipo": "numero",
          "etiqueta": "Valor teórico 6/36 (4 decimales)",
          "valor": 0.1667,
          "calculo": "=6/36"
        },
        {
          "tipo": "numero",
          "etiqueta": "Diferencia absoluta entre estimación y valor teórico (4 decimales)",
          "valor": 0.0667
        }
      ],
      "solucion": [
        "Sumas ≥ 10: 2 de 20.",
        "Estimación = 2 ÷ 20 = 0.10.",
        "Teórico = 6 ÷ 36 = 0.1667.",
        "Diferencia = 0.0667."
      ],
      "pistas": [
        "Cuenta cuántas sumas de la tabla son 10, 11 o 12."
      ]
    },
    "reto": {
      "id": "m27-l5-reto",
      "enunciado": "Con la tabla de 40 dígitos aleatorios estima probabilidades y evalúa la precisión.",
      "datos": [
        {
          "columnas": [
            "",
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
              "Fila 1",
              6,
              6,
              3,
              9,
              2,
              3,
              3,
              2,
              1,
              4
            ],
            [
              "Fila 2",
              6,
              8,
              8,
              1,
              9,
              7,
              3,
              6,
              9,
              9
            ],
            [
              "Fila 3",
              3,
              5,
              6,
              3,
              2,
              7,
              2,
              9,
              5,
              1
            ],
            [
              "Fila 4",
              8,
              1,
              7,
              5,
              6,
              0,
              4,
              8,
              0,
              6
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Estimación de P(dígito par, incluyendo el 0) (3 decimales)",
          "valor": 0.475
        },
        {
          "tipo": "numero",
          "etiqueta": "Estimación de P(dígito < 3) (3 decimales)",
          "valor": 0.25
        },
        {
          "tipo": "numero",
          "etiqueta": "Error típico √(p(1−p)/n) con p = 0.3 y n = 40 (3 decimales)",
          "valor": 0.072,
          "calculo": "=RAIZ(0.3*0.7/40)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Error típico si se repitiera 4000 veces (3 decimales)",
          "valor": 0.007,
          "calculo": "=RAIZ(0.3*0.7/4000)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Para reducir el error a la décima parte hay que…",
          "opciones": [
            "Repetir 10 veces más",
            "Repetir 100 veces más",
            "Repetir el doble"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Pares (0, 2, 4, 6, 8): 19 de 40 → 0.475.",
        "Dígitos < 3 (0, 1, 2): 10 de 40 → 0.250.",
        "Error típico n = 40: √(0.21 ÷ 40) = 0.072; n = 4000: 0.007.",
        "Como el error es proporcional a 1/√n, dividirlo entre 10 exige 100 veces más repeticiones."
      ],
      "pistas": [
        "La probabilidad teórica de un dígito par es 0.5 y la de un dígito < 3 es 0.3."
      ]
    },
    "verificacion": [
      {
        "id": "m27-l5-q1",
        "pregunta": "Una simulación Monte Carlo estima una probabilidad como:",
        "opciones": [
          "La mediana de los resultados",
          "Veces que ocurre el evento ÷ repeticiones",
          "La media de las repeticiones",
          "El máximo"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Es la frecuencia relativa del evento en las repeticiones."
      },
      {
        "id": "m27-l5-q2",
        "pregunta": "La ley de los grandes números afirma que, al aumentar n…",
        "opciones": [
          "El resultado siguiente compensa al anterior",
          "La frecuencia relativa se acerca a la probabilidad",
          "La varianza aumenta",
          "El error crece"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "No hay compensación: la frecuencia se estabiliza."
      }
    ],
    "resumen": [
      "Monte Carlo: P ≈ ocurrencias ÷ repeticiones.",
      "Más repeticiones → estimación más estable.",
      "Para reducir el error 10 veces hay que repetir 100 veces más."
    ],
    "proximoPaso": "Pasamos a las variables continuas: uniforme, normal y exponencial.",
    "conceptos": [
      "monte-carlo",
      "ley-grandes-numeros"
    ]
  }
]
