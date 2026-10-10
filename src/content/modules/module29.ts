import type { Lesson } from '../../types'

export const module29Lessons: Lesson[] = [
  {
    "id": "m29-l1",
    "moduloId": "modulo-29",
    "motor": "calculo",
    "titulo": "Proyecto: modela la calidad de un lote (binomial)",
    "objetivo": "Elegir la distribución adecuada para un problema real y calcular probabilidades de defectos por lote.",
    "porQueImporta": "El primer paso de un proyecto de probabilidad es decidir qué distribución describe el fenómeno. Un acierto aquí hace que el resto del análisis sea fiable.",
    "concepto": "**El caso**: una planta ensambla dispositivos y quiere responder tres preguntas de operación:\n\n1. **Calidad**: cada lote tiene 50 piezas y cada una sale defectuosa con probabilidad 0.04. ¿Qué tan probable es un lote limpio o con muchos defectos?\n2. **Pedidos**: llegan en promedio 6 pedidos por hora. ¿Cuántos operarios hacen falta para cubrir casi todas las horas?\n3. **Tiempos**: armar un dispositivo toma en promedio 45 minutos con desviación de 5 minutos. ¿Qué plazo prometer al cliente?\n\n**Primera pregunta: calidad.** Hay un número fijo de intentos (50 piezas), cada pieza es defectuosa o no, con la misma probabilidad (0.04), y se asumen independientes. Eso es una **binomial**: `X ~ Binomial(50, 0.04)`.\n\nEn la calculadora: `=DISTR.BINOM.N(0; 50; 0.04; FALSO)` para `P(X = 0)` y `=DISTR.BINOM.N(3; 50; 0.04; VERDADERO)` para `P(X ≤ 3)`.\n\nAntes de calcular, **justifica el modelo**: ¿son razonables la independencia y la misma probabilidad? Si los defectos vinieran en tandas por una máquina descalibrada, la binomial no sería adecuada.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Defectos esperados y probabilidad de un lote limpio",
      "pasos": [
        "Defectos esperados: μ = n·p = 50 × 0.04 = **2**.",
        "Desviación: σ = √(50 × 0.04 × 0.96) = **1.386**.",
        "P(X = 0) = 0.96⁵⁰ = **0.1299**."
      ],
      "conclusion": "Solo el 13 % de los lotes sale limpio; lo habitual es encontrar alrededor de 2 defectos."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "La distribución completa de defectos por lote",
      "datos": [
        {
          "columnas": [
            "Defectos k",
            "P(X = k)"
          ],
          "filas": [
            [
              0,
              "0.1299"
            ],
            [
              1,
              "0.2706"
            ],
            [
              2,
              "0.2762"
            ],
            [
              3,
              "0.1842"
            ],
            [
              4,
              "0.0902"
            ],
            [
              5,
              "0.0346"
            ],
            [
              6,
              "0.0108"
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
            "5",
            "6",
            "7"
          ],
          "valores": [
            0.1299,
            0.2706,
            0.2762,
            0.1842,
            0.0902,
            0.0346,
            0.0108,
            0.0028
          ],
          "titulo": "Binomial(50; 0.04)",
          "etiquetaY": "Probabilidad"
        }
      ],
      "pasos": [
        "Cada probabilidad se obtiene con =DISTR.BINOM.N(k; 50; 0.04; FALSO).",
        "Los valores más probables son 1 y 2 defectos (0.2706 y 0.2762)."
      ],
      "conclusion": "La distribución es asimétrica a la derecha: son raros los lotes con muchos defectos."
    },
    "errorFrecuente": {
      "codigo": "Modelar los defectos de un lote de 50 piezas con Poisson(2) porque «la media es 2».",
      "explicacion": "Poisson también tiene media 2, pero aquí hay un número fijo de piezas (50): los defectos no pueden pasar de 50 y cada pieza es un intento. Eso describe una binomial. Poisson da P(0) = 0.1353 en lugar de 0.1299: parecido, pero el modelo equivocado falla con probabilidades más altas."
    },
    "practicaGuiada": {
      "id": "m29-l1-practica",
      "enunciado": "Con X ~ Binomial(50; 0.04):",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(lote sin defectos) (4 decimales)",
          "valor": 0.1299,
          "calculo": "=DISTR.BINOM.N(0;50;0.04;FALSO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(exactamente 2 defectos) (4 decimales)",
          "valor": 0.2762,
          "calculo": "=DISTR.BINOM.N(2;50;0.04;FALSO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Defectos esperados",
          "valor": 2,
          "calculo": "=50*0.04"
        }
      ],
      "solucion": [
        "P(0) = 0.96⁵⁰ = 0.1299.",
        "P(2) = C(50, 2) · 0.04² · 0.96⁴⁸ = 0.2762.",
        "μ = 50 × 0.04 = 2."
      ],
      "pistas": [
        "Usa DISTR.BINOM.N con FALSO."
      ]
    },
    "reto": {
      "id": "m29-l1-reto",
      "enunciado": "La planta rechaza un lote si tiene **más de 3 defectos**.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(X ≤ 3) (4 decimales)",
          "valor": 0.8609,
          "calculo": "=DISTR.BINOM.N(3;50;0.04;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Probabilidad de rechazo P(X > 3) (4 decimales)",
          "valor": 0.1391,
          "calculo": "=1-DISTR.BINOM.N(3;50;0.04;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Lotes rechazados esperados entre 200 lotes (redondeado a entero)",
          "valor": 28,
          "tolerancia": 1
        }
      ],
      "solucion": [
        "P(X ≤ 3) = 0.8609.",
        "Rechazo = 1 − 0.8609 = 0.1391.",
        "En 200 lotes: 200 × 0.1391 = 27.8 ≈ 28."
      ],
      "pistas": [
        "Más de 3 = el complemento de «3 o menos»."
      ]
    },
    "verificacion": [
      {
        "id": "m29-l1-q1",
        "pregunta": "¿Por qué la binomial describe los defectos de un lote de 50 piezas?",
        "opciones": [
          "Porque la media es 2",
          "Porque hay 50 ensayos independientes con la misma probabilidad de defecto",
          "Porque los defectos son raros",
          "Porque la varianza es pequeña"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Número fijo de ensayos, éxito/fracaso, p constante e independientes."
      },
      {
        "id": "m29-l1-q2",
        "pregunta": "Si cambia a lotes de 100 piezas con p = 0.04, los defectos esperados son:",
        "opciones": [
          "2",
          "4",
          "8",
          "0.04"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "n·p = 100 × 0.04."
      }
    ],
    "resumen": [
      "Justifica el modelo antes de calcular.",
      "Binomial: n fijo, p constante, independencia.",
      "P(rechazo) = 1 − P(X ≤ 3)."
    ],
    "proximoPaso": "Dimensionaremos la capacidad con la distribución de Poisson.",
    "conceptos": [
      "proyecto-probabilidad"
    ]
  },
  {
    "id": "m29-l2",
    "moduloId": "modulo-29",
    "motor": "calculo",
    "titulo": "Proyecto: dimensiona la capacidad (Poisson)",
    "objetivo": "Usar la distribución de Poisson para estimar la probabilidad de picos de pedidos y dimensionar la capacidad.",
    "porQueImporta": "Dimensionar con el promedio deja la operación al límite la mitad del tiempo. Con la distribución completa se elige una capacidad que cubra, por ejemplo, el 95 % de las horas.",
    "concepto": "**Segunda pregunta: pedidos.** Los pedidos llegan al azar a una tasa media de 6 por hora: `X ~ Poisson(6)`.\n\n- `P(X ≥ 10) = 1 − P(X ≤ 9)`, con `=1-POISSON.DIST(9; 6; VERDADERO)`.\n- **Capacidad al 95 %**: el menor `k` tal que `P(X ≤ k) ≥ 0.95`. Se encuentra probando valores con la calculadora.\n\nEl promedio (6) no es la capacidad adecuada: habrá horas con más pedidos.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "¿Cuántas horas superan el promedio?",
      "datos": [
        {
          "columnas": [
            "k",
            "P(X = k)",
            "P(X ≤ k)"
          ],
          "filas": [
            [
              0,
              "0.0025",
              "0.0025"
            ],
            [
              1,
              "0.0149",
              "0.0174"
            ],
            [
              2,
              "0.0446",
              "0.0620"
            ],
            [
              3,
              "0.0892",
              "0.1512"
            ],
            [
              4,
              "0.1339",
              "0.2851"
            ],
            [
              5,
              "0.1606",
              "0.4457"
            ],
            [
              6,
              "0.1606",
              "0.6063"
            ],
            [
              7,
              "0.1377",
              "0.7440"
            ],
            [
              8,
              "0.1033",
              "0.8472"
            ],
            [
              9,
              "0.0688",
              "0.9161"
            ],
            [
              10,
              "0.0413",
              "0.9574"
            ],
            [
              11,
              "0.0225",
              "0.9799"
            ],
            [
              12,
              "0.0113",
              "0.9912"
            ]
          ]
        }
      ],
      "pasos": [
        "P(X ≥ 10) = 1 − P(X ≤ 9) = 1 − 0.9161 = **0.0839**.",
        "Cada fila de la tabla se obtiene con POISSON.DIST(k; 6; FALSO / VERDADERO)."
      ],
      "conclusion": "Solo el 8.4 % de las horas llegan 10 o más pedidos."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Capacidad que cubre el 95 % de las horas",
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
            "10",
            "11",
            "12",
            "13"
          ],
          "valores": [
            0.0025,
            0.0174,
            0.062,
            0.1512,
            0.2851,
            0.4457,
            0.6063,
            0.744,
            0.8472,
            0.9161,
            0.9574,
            0.9799,
            0.9912,
            0.9964
          ],
          "titulo": "Probabilidad acumulada P(X ≤ k), λ = 6",
          "etiquetaY": "Acumulada"
        }
      ],
      "pasos": [
        "P(X ≤ 8) = 0.8472  < 0.95.",
        "P(X ≤ 10) = 0.9574  ≥ 0.95.",
        "La capacidad mínima es **10 pedidos por hora**."
      ],
      "conclusion": "Atender hasta 10 pedidos por hora cubre el 95 % de las horas (con un promedio de 6, hace falta casi un 70 % más de capacidad)."
    },
    "errorFrecuente": {
      "codigo": "«Llegan 6 pedidos por hora de promedio, así que con capacidad 6 cubrimos todo.»",
      "explicacion": "Con capacidad 6 solo se cubre P(X ≤ 6) = 0.6063: en más del 39 % de las horas llegan más pedidos de los que se pueden atender. La capacidad debe elegirse con la cola de la distribución, no con la media."
    },
    "practicaGuiada": {
      "id": "m29-l2-practica",
      "enunciado": "Con X ~ Poisson(6):",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(X ≥ 10) (4 decimales)",
          "valor": 0.0839,
          "calculo": "=1-POISSON.DIST(9;6;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(X ≤ 4) (4 decimales)",
          "valor": 0.2851,
          "calculo": "=POISSON.DIST(4;6;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(X = 6) (4 decimales)",
          "valor": 0.1606,
          "calculo": "=POISSON.DIST(6;6;FALSO)"
        }
      ],
      "solucion": [
        "P(X ≤ 9) = 0.9161; P(X ≥ 10) = 0.0839.",
        "P(X ≤ 4) = 0.2851.",
        "P(X = 6) = 0.1606."
      ],
      "pistas": [
        "Usa POISSON.DIST con VERDADERO para acumuladas."
      ]
    },
    "reto": {
      "id": "m29-l2-reto",
      "enunciado": "Busca la capacidad con la calculadora.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(X ≤ 9) (4 decimales)",
          "valor": 0.9161,
          "calculo": "=POISSON.DIST(9;6;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Capacidad mínima para cubrir al menos el 95 % de las horas",
          "valor": 10
        },
        {
          "tipo": "numero",
          "etiqueta": "Capacidad mínima para cubrir al menos el 99 % (prueba valores)",
          "valor": 12
        },
        {
          "tipo": "opcion",
          "etiqueta": "Pasar de 95 % a 99 % de cobertura exige…",
          "opciones": [
            "La misma capacidad",
            "Más capacidad: la cola derecha se alarga",
            "Menos capacidad"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "P(X ≤ 9) = 0.9161.",
        "P(X ≤ 9) = 0.9161 < 0.95 y P(X ≤ 10) = 0.9574 ≥ 0.95 → 10.",
        "Para el 99 %: 12."
      ],
      "pistas": [
        "Prueba k = 8, 9, 10… hasta que la acumulada pase de 0.95."
      ]
    },
    "verificacion": [
      {
        "id": "m29-l2-q1",
        "pregunta": "Dimensionar la capacidad con el promedio:",
        "opciones": [
          "Cubre el 100 % de las horas",
          "Deja muchas horas sin cubrir",
          "Es lo más eficiente siempre",
          "No tiene riesgo"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Las horas con más pedidos que el promedio son frecuentes."
      },
      {
        "id": "m29-l2-q2",
        "pregunta": "Para cubrir el 95 % de las horas se busca el menor k tal que:",
        "opciones": [
          "P(X = k) ≥ 0.95",
          "P(X ≤ k) ≥ 0.95",
          "k = λ",
          "P(X > k) ≥ 0.95"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Se usa la probabilidad acumulada."
      }
    ],
    "resumen": [
      "X ~ Poisson(6) para pedidos por hora.",
      "Capacidad = menor k con acumulada ≥ nivel deseado.",
      "Los picos importan más que el promedio."
    ],
    "proximoPaso": "Prometeremos un plazo de entrega con la distribución normal.",
    "conceptos": [
      "dimensionar-capacidad"
    ]
  },
  {
    "id": "m29-l3",
    "moduloId": "modulo-29",
    "motor": "calculo",
    "titulo": "Proyecto: promete un plazo (distribución normal)",
    "objetivo": "Calcular probabilidades de retraso y el plazo que se cumple con una confianza dada usando la distribución normal.",
    "porQueImporta": "Prometer el tiempo promedio incumple la mitad de las veces. Con la normal se elige un plazo que se cumpla con la confianza que el negocio necesita.",
    "concepto": "**Tercera pregunta: plazos.** El tiempo de armado es aproximadamente normal con `μ = 45` minutos y `σ = 5`: `T ~ N(45, 5)`.\n\n- `P(T > 55) = 1 − DISTR.NORM.N(55; 45; 5; VERDADERO)`.\n- **Plazo con confianza 95 %**: el percentil 95, `=INV.NORM(0.95; 45; 5)`.\n\nSi el plazo prometido se cumple el 95 % de las veces, el 5 % de los envíos llegará tarde.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "¿Qué tan probable es tardar más de 55 minutos?",
      "graficos": [
        {
          "tipo": "normal",
          "media": 45,
          "desv": 5,
          "desde": 55,
          "titulo": "Cola derecha desde 55 minutos"
        }
      ],
      "pasos": [
        "z = (55 − 45) ÷ 5 = **2**.",
        "P(T > 55) = 1 − Φ(2) = 1 − 0.9772 = **0.0228**."
      ],
      "conclusion": "Solo el 2.3 % de los dispositivos tarda más de 55 minutos."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "El plazo al 95 %",
      "pasos": [
        "z del percentil 95 = 1.645.",
        "Plazo = 45 + 1.645 × 5 = **53.22 minutos**."
      ],
      "conclusion": "Prometer 53 minutos se cumple el 95 % de las veces; prometer 45 (la media) se cumpliría solo la mitad."
    },
    "errorFrecuente": {
      "codigo": "«El tiempo promedio es 45 minutos: prometemos 45.»",
      "explicacion": "Como la normal es simétrica, el 50 % de los dispositivos tardará más que la media. Un plazo con confianza se calcula con el percentil (aquí el 95) y siempre es mayor que la media."
    },
    "practicaGuiada": {
      "id": "m29-l3-practica",
      "enunciado": "Con T ~ N(45, 5):",
      "graficos": [
        {
          "tipo": "normal",
          "media": 45,
          "desv": 5,
          "desde": 40,
          "hasta": 50,
          "titulo": "T ~ N(45, 5)"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(T > 55) (4 decimales)",
          "valor": 0.0228,
          "calculo": "=1-DISTR.NORM.N(55;45;5;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(T < 40) (4 decimales)",
          "valor": 0.1587,
          "calculo": "=DISTR.NORM.N(40;45;5;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(40 < T < 50) (4 decimales)",
          "valor": 0.6827,
          "calculo": "=DISTR.NORM.N(50;45;5;VERDADERO)-DISTR.NORM.N(40;45;5;VERDADERO)"
        }
      ],
      "solucion": [
        "z(55) = 2; cola = 0.0228.",
        "z(40) = −1; P = 0.1587.",
        "40 y 50 son μ ± σ: 0.6827."
      ],
      "pistas": [
        "Estandariza y usa la tabla/calculadora."
      ]
    },
    "reto": {
      "id": "m29-l3-reto",
      "enunciado": "Define el plazo que se promete al cliente.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Plazo que se cumple el 95 % de las veces (2 decimales)",
          "valor": 53.22,
          "calculo": "=INV.NORM(0.95;45;5)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Plazo que se cumple el 99 % de las veces (2 decimales)",
          "valor": 56.63,
          "calculo": "=INV.NORM(0.99;45;5)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(cumplir el plazo de 50 minutos) (4 decimales)",
          "valor": 0.8413,
          "calculo": "=DISTR.NORM.N(50;45;5;VERDADERO)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Si se exige más confianza, el plazo prometido…",
          "opciones": [
            "Baja",
            "Sube",
            "Se mantiene"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "z95 = 1.645 → 53.22.",
        "z99 = 2.326 → 56.63.",
        "z(50) = 1 → 0.8413."
      ],
      "pistas": [
        "Usa INV.NORM(confianza; 45; 5)."
      ]
    },
    "verificacion": [
      {
        "id": "m29-l3-q1",
        "pregunta": "El plazo prometido con 95 % de confianza es:",
        "opciones": [
          "La media",
          "El percentil 95",
          "La mediana",
          "El mínimo"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Deja el 95 % de los casos a su izquierda."
      },
      {
        "id": "m29-l3-q2",
        "pregunta": "En una normal, el 50 % de los tiempos supera:",
        "opciones": [
          "La media",
          "μ + σ",
          "μ + 2σ",
          "Nada"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "La media coincide con la mediana."
      }
    ],
    "resumen": [
      "T ~ N(45, 5).",
      "Cola derecha = 1 − acumulada.",
      "Plazo con confianza = percentil."
    ],
    "proximoPaso": "Cerraremos con una validación por simulación y el reporte final.",
    "conceptos": [
      "plazo-con-confianza"
    ]
  },
  {
    "id": "m29-l4",
    "moduloId": "modulo-29",
    "motor": "calculo",
    "titulo": "Proyecto: valida por simulación y reporta",
    "objetivo": "Contrastar un resultado teórico con una simulación pequeña y redactar un reporte final con las tres cifras del proyecto.",
    "porQueImporta": "Un modelo teórico se vuelve más convincente cuando una simulación lo corrobora, y un análisis solo sirve si se comunica con claridad.",
    "concepto": "**Validar por simulación.** Se simula el proceso muchas veces y se cuenta con qué frecuencia ocurre el evento (método Monte Carlo). Aquí se dan los resultados de 40 lotes simulados: en cada uno, el número de defectos de 50 piezas.\n\nCon más lotes simulados, la frecuencia se acerca al valor teórico; con solo 40 lotes la estimación tiene un error típico de `√(p(1−p) ÷ 40)`.\n\n**Reporte final**: una cifra por pregunta, con su interpretación:\n\n1. Calidad: probabilidad de rechazo de un lote.\n2. Pedidos: capacidad para cubrir el 95 % de las horas.\n3. Tiempos: plazo que se cumple el 95 % de las veces.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "40 lotes simulados",
      "datos": [
        {
          "columnas": [
            "Lote",
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
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
            "32",
            "33",
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40"
          ],
          "filas": [
            [
              "Defectos",
              1,
              5,
              1,
              4,
              1,
              4,
              3,
              2,
              5,
              3,
              5,
              2,
              3,
              2,
              3,
              4,
              1,
              1,
              3,
              2,
              4,
              1,
              1,
              0,
              2,
              0,
              1,
              3,
              1,
              4,
              4,
              3,
              2,
              6,
              1,
              3,
              4,
              2,
              0,
              0
            ]
          ]
        }
      ],
      "pasos": [
        "Lotes con más de 3 defectos: **11** de 40.",
        "Estimación de la probabilidad de rechazo = 11 ÷ 40 = **0.275**.",
        "Valor teórico = 0.1391."
      ],
      "conclusion": "La simulación pequeña es compatible con el valor teórico, pero con solo 40 lotes la estimación es poco precisa."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "¿Cuánta precisión tiene la simulación?",
      "pasos": [
        "Error típico con 40 lotes = √(0.1391 × 0.8609 ÷ 40) = **0.0547**.",
        "Con 4000 lotes = **0.0055**: diez veces menor, con 100 veces más lotes."
      ],
      "conclusion": "Para estimar bien probabilidades pequeñas hacen falta muchas repeticiones."
    },
    "errorFrecuente": {
      "codigo": "«En la simulación salieron 2 lotes rechazados de 40 (0.05), pero la teoría dice 0.14: la teoría está mal.»",
      "explicacion": "Con solo 40 repeticiones la estimación varía mucho. Una diferencia de este tamaño es esperable por azar (error típico ≈ 0.055). Antes de descartar el modelo hay que repetir muchas más veces."
    },
    "practicaGuiada": {
      "id": "m29-l4-practica",
      "enunciado": "Usa la tabla de 40 lotes simulados.",
      "datos": [
        {
          "columnas": [
            "Lote",
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
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
            "32",
            "33",
            "34",
            "35",
            "36",
            "37",
            "38",
            "39",
            "40"
          ],
          "filas": [
            [
              "Defectos",
              1,
              5,
              1,
              4,
              1,
              4,
              3,
              2,
              5,
              3,
              5,
              2,
              3,
              2,
              3,
              4,
              1,
              1,
              3,
              2,
              4,
              1,
              1,
              0,
              2,
              0,
              1,
              3,
              1,
              4,
              4,
              3,
              2,
              6,
              1,
              3,
              4,
              2,
              0,
              0
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Lotes con más de 3 defectos",
          "valor": 11
        },
        {
          "tipo": "numero",
          "etiqueta": "Estimación de la probabilidad de rechazo (3 decimales)",
          "valor": 0.275
        },
        {
          "tipo": "numero",
          "etiqueta": "Diferencia absoluta respecto al valor teórico 0.1391 (4 decimales)",
          "valor": 0.1359
        }
      ],
      "solucion": [
        "Se cuentan los lotes con 4 o más defectos: 11.",
        "11 ÷ 40 = 0.275.",
        "|0.275 − 0.1391| = 0.1359."
      ],
      "pistas": [
        "Cuenta los valores 4, 5, 6… en la tabla."
      ]
    },
    "reto": {
      "id": "m29-l4-reto",
      "enunciado": "Reúne las tres cifras del reporte final con los valores teóricos del proyecto.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Probabilidad de rechazo de un lote (4 decimales)",
          "valor": 0.1391,
          "calculo": "=1-DISTR.BINOM.N(3;50;0.04;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Capacidad para cubrir el 95 % de las horas (pedidos/hora)",
          "valor": 10
        },
        {
          "tipo": "numero",
          "etiqueta": "Plazo que se cumple el 95 % de las veces (minutos, 2 decimales)",
          "valor": 53.22,
          "calculo": "=INV.NORM(0.95;45;5)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué incluye un reporte honesto?",
          "opciones": [
            "Solo las cifras",
            "Las cifras, los supuestos del modelo y sus límites",
            "Solo el gráfico"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Rechazo: 0.1391.",
        "Capacidad: 10 pedidos por hora.",
        "Plazo: 53.22 minutos.",
        "Menciona supuestos (independencia, p constante, tasa estable, normalidad) y límites."
      ],
      "pistas": [
        "Los valores salen de las lecciones anteriores del proyecto."
      ]
    },
    "verificacion": [
      {
        "id": "m29-l4-q1",
        "pregunta": "Para reducir 10 veces el error de una simulación hay que:",
        "opciones": [
          "Repetir 10 veces más",
          "Repetir 100 veces más",
          "Repetir el doble"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "El error baja con la raíz de n."
      },
      {
        "id": "m29-l4-q2",
        "pregunta": "Un reporte de probabilidad debe indicar además:",
        "opciones": [
          "Solo los números",
          "Los supuestos del modelo",
          "La edad de los clientes",
          "Nada más"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Los resultados valen lo que valgan los supuestos."
      }
    ],
    "resumen": [
      "Simula para corroborar el modelo teórico.",
      "Más repeticiones → menos error.",
      "Reporta cifras, supuestos y límites."
    ],
    "proximoPaso": "Has completado Probabilidad. Sigue con Estadística inferencial: de la muestra a la población.",
    "conceptos": [
      "reporte-probabilidad"
    ]
  }
]
