import type { Lesson } from '../../types'

export const module28Lessons: Lesson[] = [
  {
    "id": "m28-l1",
    "moduloId": "modulo-28",
    "motor": "calculo",
    "titulo": "Variables continuas, densidad y distribución uniforme",
    "objetivo": "Entender que en una variable continua la probabilidad es un área bajo la curva de densidad y calcular probabilidades de una distribución uniforme.",
    "porQueImporta": "Tiempos, pesos, montos y distancias son variables continuas. Para ellas no se pregunta por un valor exacto sino por un intervalo: «¿qué probabilidad hay de que tarde entre 10 y 15 minutos?».",
    "concepto": "Una variable **continua** puede tomar cualquier valor en un intervalo. Su modelo es una **función de densidad** `f(x)`:\n\n- `f(x) ≥ 0` y el área total bajo la curva es 1.\n- `P(a < X < b)` es el **área** bajo la curva entre `a` y `b`.\n- `P(X = valor exacto) = 0`; por eso `<` y `≤` dan lo mismo.\n\n**Distribución uniforme** `U(a, b)`: todos los valores del intervalo son igualmente probables. La densidad es constante, `f(x) = 1 ÷ (b − a)`, y el área es la de un rectángulo:\n\n- `P(c < X < d) = (d − c) ÷ (b − a)`\n- Media `μ = (a + b) ÷ 2`, varianza `σ² = (b − a)² ÷ 12`.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "El tiempo de entrega es uniforme entre 10 y 20 minutos",
      "pasos": [
        "Densidad: f(x) = 1 ÷ (20 − 10) = **0.1** (altura del rectángulo).",
        "P(12 < X < 15) = (15 − 12) ÷ 10 = **0.3**.",
        "Media = (10 + 20) ÷ 2 = **15**; σ² = 10² ÷ 12 = 8.33; σ = 2.89."
      ],
      "conclusion": "El 30 % de las entregas tarda entre 12 y 15 minutos; en promedio, 15 minutos."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Una probabilidad de «cola»",
      "pasos": [
        "Con X ~ U(10, 20): P(X > 18) = (20 − 18) ÷ 10 = **0.2**.",
        "P(X = 15) = 0: un punto no tiene área.",
        "P(X ≤ 15) = (15 − 10) ÷ 10 = 0.5: la mediana coincide con la media."
      ],
      "conclusion": "En la uniforme basta medir longitudes de intervalo."
    },
    "errorFrecuente": {
      "codigo": "X ~ U(0, 1) → «P(X = 0.5) = 0.5» o «P(X = 0.5) = 1/2».",
      "explicacion": "En una variable continua la probabilidad de un valor exacto es 0. Solo tienen probabilidad los intervalos: P(0.4 < X < 0.6) = 0.2."
    },
    "practicaGuiada": {
      "id": "m28-l1-practica",
      "enunciado": "Una máquina rellena botellas con un volumen uniforme entre 495 ml y 505 ml.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Altura de la densidad (2 decimales)",
          "valor": 0.1,
          "calculo": "=1/(505-495)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(X < 497)",
          "valor": 0.2,
          "calculo": "=(497-495)/10"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(499 < X < 503) (1 decimal)",
          "valor": 0.4,
          "calculo": "=(503-499)/10"
        },
        {
          "tipo": "numero",
          "etiqueta": "Media (ml)",
          "valor": 500,
          "calculo": "=(495+505)/2"
        },
        {
          "tipo": "numero",
          "etiqueta": "Desviación estándar (3 decimales)",
          "valor": 2.887,
          "calculo": "=RAIZ(100/12)"
        }
      ],
      "solucion": [
        "f(x) = 1/10 = 0.1.",
        "P(X < 497) = (497 − 495) ÷ 10 = 0.2.",
        "P(499 < X < 503) = 4 ÷ 10 = 0.4.",
        "μ = 500; σ = √(100 ÷ 12) = 2.887."
      ],
      "pistas": [
        "El área de un rectángulo es base × altura."
      ]
    },
    "reto": {
      "id": "m28-l1-reto",
      "enunciado": "Un autobús pasa cada 20 minutos y llegas a la parada en un momento al azar: tu espera sigue una uniforme U(0, 20).",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(esperar menos de 5 minutos)",
          "valor": 0.25,
          "calculo": "=5/20"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(esperar más de 15 minutos)",
          "valor": 0.25,
          "calculo": "=5/20"
        },
        {
          "tipo": "numero",
          "etiqueta": "Espera media (minutos)",
          "valor": 10,
          "calculo": "=20/2"
        },
        {
          "tipo": "numero",
          "etiqueta": "Varianza (2 decimales)",
          "valor": 33.33,
          "calculo": "=400/12"
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué es P(esperar exactamente 7 minutos)?",
          "opciones": [
            "1/20",
            "0",
            "0.35"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "P(X < 5) = 5/20 = 0.25. P(X > 15) = 5/20 = 0.25.",
        "μ = 10; σ² = 20² ÷ 12 = 33.33.",
        "Un valor exacto tiene probabilidad 0."
      ],
      "pistas": [
        "Divide la longitud del intervalo favorable entre 20."
      ]
    },
    "verificacion": [
      {
        "id": "m28-l1-q1",
        "pregunta": "En una variable continua, P(X = 3) es:",
        "opciones": [
          "La altura de la densidad",
          "0",
          "1",
          "Depende de la media"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Los puntos aislados no tienen área."
      },
      {
        "id": "m28-l1-q2",
        "pregunta": "El área total bajo una función de densidad es:",
        "opciones": [
          "0",
          "1",
          "Depende de la media",
          "100"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Es la probabilidad total, siempre 1."
      }
    ],
    "resumen": [
      "Probabilidad = área bajo la densidad.",
      "Uniforme: altura 1/(b−a); P = longitud ÷ (b−a).",
      "μ = (a+b)/2; σ² = (b−a)²/12."
    ],
    "proximoPaso": "Veremos la distribución normal.",
    "conceptos": [
      "variable-continua",
      "distribucion-uniforme"
    ]
  },
  {
    "id": "m28-l2",
    "moduloId": "modulo-28",
    "motor": "calculo",
    "titulo": "La distribución normal",
    "objetivo": "Describir la distribución normal y usar la regla empírica y la calculadora para obtener probabilidades.",
    "porQueImporta": "La normal modela estaturas, errores de medición, tiempos de proceso y, gracias al teorema central del límite, los promedios de casi cualquier variable. Es la distribución más usada en estadística.",
    "concepto": "La **distribución normal** `N(μ, σ)` tiene forma de campana simétrica centrada en `μ`; `σ` controla el ancho.\n\n**Regla empírica (68-95-99.7):**\n\n- ≈ 68 % de los datos está entre `μ − σ` y `μ + σ`.\n- ≈ 95 % entre `μ − 2σ` y `μ + 2σ`.\n- ≈ 99.7 % entre `μ − 3σ` y `μ + 3σ`.\n\nPara otras probabilidades se usa la calculadora:\n\n- `=DISTR.NORM.N(x; μ; σ; VERDADERO)` → `P(X ≤ x)`.\n- `P(X > x) = 1 − P(X ≤ x)` y `P(a < X < b) = P(X ≤ b) − P(X ≤ a)`.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Estatura de adultos: N(170, 10) cm",
      "graficos": [
        {
          "tipo": "normal",
          "media": 170,
          "desv": 10,
          "desde": 160,
          "hasta": 180,
          "titulo": "Entre 160 y 180 cm (≈ 68 %)"
        }
      ],
      "pasos": [
        "160 = μ − σ y 180 = μ + σ → por la regla empírica, **≈ 68 %** de los adultos mide entre 160 y 180 cm.",
        "Con la calculadora: P(160 < X < 180) = DISTR.NORM.N(180;170;10;V) − DISTR.NORM.N(160;170;10;V) = 0.8413 − 0.1587 = **0.6827**."
      ],
      "conclusion": "La regla empírica da la aproximación rápida y la calculadora el valor exacto."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Más de 185 cm",
      "graficos": [
        {
          "tipo": "normal",
          "media": 170,
          "desv": 10,
          "desde": 185,
          "titulo": "Cola derecha desde 185 cm"
        }
      ],
      "pasos": [
        "P(X ≤ 185) = 0.9332 (calculadora).",
        "P(X > 185) = 1 − 0.9332 = **0.0668**."
      ],
      "conclusion": "Cerca del 6.7 % de los adultos supera 185 cm."
    },
    "errorFrecuente": {
      "codigo": "Tiempo de proceso ~ N(50, 8) → «P(X > 58) = DISTR.NORM.N(58;50;8;V) = 0.84».",
      "explicacion": "DISTR.NORM.N con VERDADERO da la probabilidad acumulada a la izquierda, P(X ≤ 58) = 0.8413. Para una cola derecha hay que restar: P(X > 58) = 1 − 0.8413 = 0.1587."
    },
    "practicaGuiada": {
      "id": "m28-l2-practica",
      "enunciado": "El tiempo de un proceso sigue N(50, 8) minutos.",
      "graficos": [
        {
          "tipo": "normal",
          "media": 50,
          "desv": 8,
          "desde": 42,
          "hasta": 58,
          "titulo": "N(50, 8)"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(X ≤ 58) (4 decimales)",
          "valor": 0.8413,
          "calculo": "=DISTR.NORM.N(58;50;8;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(X > 58) (4 decimales)",
          "valor": 0.1587,
          "calculo": "=1-DISTR.NORM.N(58;50;8;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(42 < X < 58) (4 decimales)",
          "valor": 0.6827,
          "calculo": "=DISTR.NORM.N(58;50;8;VERDADERO)-DISTR.NORM.N(42;50;8;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(34 < X < 66) con la regla empírica, ≈ (2 decimales)",
          "valor": 0.95
        }
      ],
      "solucion": [
        "58 = μ + σ: P(X ≤ 58) = 0.8413.",
        "P(X > 58) = 1 − 0.8413 = 0.1587.",
        "P(42 < X < 58) = 0.8413 − 0.1587 = 0.6827 (≈ 68 %).",
        "34 = μ − 2σ y 66 = μ + 2σ: ≈ 95 %."
      ],
      "pistas": [
        "Cola derecha = 1 − acumulada."
      ]
    },
    "reto": {
      "id": "m28-l2-reto",
      "enunciado": "Un lote de tornillos tiene longitud ~ N(500, 4) mm. Un tornillo es aceptable entre 496 y 504 mm.",
      "graficos": [
        {
          "tipo": "normal",
          "media": 500,
          "desv": 4,
          "desde": 496,
          "hasta": 504,
          "titulo": "Rango aceptable"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(aceptable) (4 decimales)",
          "valor": 0.6827,
          "calculo": "=DISTR.NORM.N(504;500;4;VERDADERO)-DISTR.NORM.N(496;500;4;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(longitud > 508) (4 decimales)",
          "valor": 0.0228,
          "calculo": "=1-DISTR.NORM.N(508;500;4;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Tornillos fuera de especificación por cada 10 000 (redondeado a entero)",
          "valor": 3173,
          "tolerancia": 2
        }
      ],
      "solucion": [
        "496 y 504 son μ ± σ: P = 0.6827.",
        "508 = μ + 2σ: P(X > 508) = 0.0228.",
        "Fuera: 1 − 0.6827 = 0.3173 → unos 3173 de 10 000."
      ],
      "pistas": [
        "Los límites están a una desviación de la media."
      ]
    },
    "verificacion": [
      {
        "id": "m28-l2-q1",
        "pregunta": "Según la regla empírica, ¿qué porcentaje de datos hay entre μ − 2σ y μ + 2σ?",
        "opciones": [
          "68 %",
          "95 %",
          "99.7 %",
          "50 %"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Aproximadamente 95 %."
      },
      {
        "id": "m28-l2-q2",
        "pregunta": "DISTR.NORM.N(x; μ; σ; VERDADERO) devuelve:",
        "opciones": [
          "P(X > x)",
          "P(X ≤ x)",
          "La altura de la curva",
          "El percentil z"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Es la probabilidad acumulada a la izquierda."
      }
    ],
    "resumen": [
      "Campana simétrica con parámetros μ y σ.",
      "Regla 68-95-99.7.",
      "Cola derecha = 1 − acumulada; intervalo = diferencia de acumuladas."
    ],
    "proximoPaso": "Estandarizaremos con puntuaciones z y calcularemos percentiles.",
    "conceptos": [
      "distribucion-normal",
      "regla-empirica"
    ]
  },
  {
    "id": "m28-l3",
    "moduloId": "modulo-28",
    "motor": "calculo",
    "titulo": "Normal estándar, puntuaciones z y percentiles",
    "objetivo": "Estandarizar valores con la puntuación z, leer una tabla normal estándar y calcular percentiles con la función inversa.",
    "porQueImporta": "La puntuación z lleva cualquier variable normal a una escala común (media 0, desviación 1). Así se comparan resultados de pruebas distintas y se obtienen percentiles y puntos de corte.",
    "concepto": "La **normal estándar** `Z ~ N(0, 1)`. Para estandarizar un valor de `X ~ N(μ, σ)`:\n\n`z = (x − μ) ÷ σ`\n\n`z` dice a cuántas desviaciones de la media está el valor. Con `z` se lee la probabilidad acumulada `Φ(z)` en una tabla o en la calculadora (`=DISTR.NORM.ESTAND.N(z; VERDADERO)`).\n\n| z | Φ(z) |\n|---|---|\n| −2 | 0.0228 |\n| −1 | 0.1587 |\n| 0 | 0.5000 |\n| 1 | 0.8413 |\n| 1.645 | 0.9500 |\n| 1.96 | 0.9750 |\n| 2 | 0.9772 |\n\n**Percentiles (problema inverso):** el valor `x` que deja una proporción `p` a su izquierda es `x = μ + z_p · σ`, con `z_p = INV.NORM.ESTAND(p)`; o directamente `=INV.NORM(p; μ; σ)`.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Examen con media 70 y desviación 10: ¿cómo va un 85?",
      "pasos": [
        "z = (85 − 70) ÷ 10 = **1.5**.",
        "Φ(1.5) = **0.9332**: un 85 supera al 93.3 % de los estudiantes.",
        "Percentil 90: z = 1.2816 → x = 70 + 1.2816 × 10 = **82.82**."
      ],
      "conclusion": "Un 85 está en torno al percentil 93; el percentil 90 corresponde a una nota de 82.8."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Comparar a dos candidatos en pruebas distintas",
      "datos": [
        {
          "columnas": [
            "Candidato",
            "Prueba",
            "Puntaje",
            "Media",
            "Desv.",
            "z"
          ],
          "filas": [
            [
              "Ana",
              "Lógica",
              78,
              70,
              8,
              "1.00"
            ],
            [
              "Luis",
              "Verbal",
              640,
              600,
              50,
              "0.80"
            ]
          ]
        }
      ],
      "pasos": [
        "Ana: z = (78 − 70) ÷ 8 = 1.00. Luis: z = (640 − 600) ÷ 50 = 0.80.",
        "Los puntajes no se pueden comparar directamente, pero las z sí."
      ],
      "conclusion": "Ana destaca más respecto a su grupo (percentil 84.1 frente a 78.8)."
    },
    "errorFrecuente": {
      "codigo": "x = 85, μ = 70, σ = 10 → «z = (70 − 85) ÷ 10 = −1.5, o sea, por debajo del promedio».",
      "explicacion": "Se invirtió la resta. El valor va primero: z = (x − μ) ÷ σ = (85 − 70) ÷ 10 = +1.5. Un z positivo significa por encima de la media."
    },
    "practicaGuiada": {
      "id": "m28-l3-practica",
      "enunciado": "Los salarios (miles) de una empresa siguen N(3000, 500).",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "z de un salario de 4000",
          "valor": 2,
          "calculo": "=(4000-3000)/500"
        },
        {
          "tipo": "numero",
          "etiqueta": "Proporción con salario menor a 4000 (4 decimales)",
          "valor": 0.9772,
          "calculo": "=DISTR.NORM.ESTAND.N(2;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Salario del percentil 90 (redondea al entero)",
          "valor": 3641,
          "calculo": "=INV.NORM(0.9;3000;500)",
          "tolerancia": 0.5
        },
        {
          "tipo": "numero",
          "etiqueta": "z que deja el 5 % superior (3 decimales)",
          "valor": 1.645,
          "calculo": "=INV.NORM.ESTAND(0.95)"
        }
      ],
      "solucion": [
        "z = (4000 − 3000) ÷ 500 = 2; Φ(2) = 0.9772.",
        "Percentil 90: z = 1.2816; x = 3000 + 1.2816 × 500 = 3641.",
        "z del percentil 95 = 1.645."
      ],
      "pistas": [
        "Usa =INV.NORM(p; μ; σ) para los percentiles."
      ]
    },
    "reto": {
      "id": "m28-l3-reto",
      "enunciado": "Un hospital tiene tiempos de espera ~ N(40, 12) minutos y quiere fijar un objetivo que cumpla el 95 % de los pacientes.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "z del percentil 95 (3 decimales)",
          "valor": 1.645,
          "calculo": "=INV.NORM.ESTAND(0.95)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Tiempo máximo que cumple el 95 % (1 decimal)",
          "valor": 59.7,
          "calculo": "=INV.NORM(0.95;40;12)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(esperar más de 60 min) (4 decimales)",
          "valor": 0.0478,
          "calculo": "=1-DISTR.NORM.N(60;40;12;VERDADERO)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Un paciente que espera 64 minutos tiene z = …",
          "opciones": [
            "−2",
            "+2",
            "+1.5"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "z95 = 1.645; x = 40 + 1.645 × 12 = 59.7.",
        "z(60) = 1.667; P(X > 60) = 0.0478.",
        "z(64) = (64 − 40) ÷ 12 = 2."
      ],
      "pistas": [
        "El percentil 95 deja 0.95 de probabilidad a la izquierda."
      ]
    },
    "verificacion": [
      {
        "id": "m28-l3-q1",
        "pregunta": "Una z = −1.2 significa que el valor está:",
        "opciones": [
          "1.2 desviaciones por debajo de la media",
          "1.2 unidades por encima",
          "En el percentil 120",
          "Igual a la media"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "El signo indica el lado; el valor, el número de desviaciones."
      },
      {
        "id": "m28-l3-q2",
        "pregunta": "La función inversa INV.NORM sirve para:",
        "opciones": [
          "Obtener la probabilidad de un valor",
          "Obtener el valor que deja una proporción dada a la izquierda",
          "Calcular la media",
          "Calcular la varianza"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Devuelve el percentil."
      }
    ],
    "resumen": [
      "z = (x − μ)/σ.",
      "Φ(z) da la proporción por debajo; la inversa da el percentil.",
      "Las z permiten comparar variables distintas."
    ],
    "proximoPaso": "Veremos la exponencial para tiempos de espera.",
    "conceptos": [
      "normal-estandar",
      "percentiles-ppf"
    ]
  },
  {
    "id": "m28-l4",
    "moduloId": "modulo-28",
    "motor": "calculo",
    "titulo": "Distribución exponencial: tiempos de espera",
    "objetivo": "Modelar el tiempo entre eventos con la exponencial y calcular probabilidades y tiempos medios.",
    "porQueImporta": "Si los eventos llegan al azar según Poisson, el tiempo entre dos llegadas es exponencial. Sirve para dimensionar colas, vidas útiles y tiempos de respuesta.",
    "concepto": "`T ~ Exponencial(λ)` modela el **tiempo hasta el próximo evento** cuando los eventos ocurren a una tasa media `λ` por unidad de tiempo.\n\n- Media `1 ÷ λ`; desviación estándar `1 ÷ λ`.\n- `P(T ≤ t) = 1 − e^(−λt)`  y  `P(T > t) = e^(−λt)`.\n- En la calculadora: `=DISTR.EXP.N(t; λ; VERDADERO)`.\n- **Sin memoria**: `P(T > s + t | T > s) = P(T > t)`. Lo que ya esperaste no cambia la probabilidad de lo que falta.\n\nRelación con Poisson: si el número de llegadas por hora es Poisson(λ), el tiempo entre llegadas (en horas) es Exponencial(λ).",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Un cliente llega cada 2 minutos en promedio (λ = 0.5 por minuto)",
      "pasos": [
        "Tiempo medio entre llegadas = 1 ÷ 0.5 = **2 minutos**.",
        "P(T ≤ 1) = 1 − e^(−0.5) = **0.3935**.",
        "P(T > 3) = e^(−1.5) = **0.2231**."
      ],
      "conclusion": "Hay un 22.3 % de probabilidad de esperar más de 3 minutos hasta el siguiente cliente."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Sin memoria",
      "pasos": [
        "Ya esperaste 3 minutos sin que llegue nadie. ¿Probabilidad de esperar al menos 2 minutos más?",
        "P(T > 5 | T > 3) = P(T > 2) = e^(−1) = **0.3679**."
      ],
      "conclusion": "La exponencial «olvida» el tiempo ya esperado: no hay «ya le toca»."
    },
    "errorFrecuente": {
      "codigo": "λ = 0.5 clientes por minuto → «el tiempo medio entre clientes es 0.5 minutos».",
      "explicacion": "La media es 1 ÷ λ = 2 minutos. λ es una tasa (eventos por minuto), no un tiempo. Si λ = 0.5 por minuto, el tiempo promedio entre eventos es 2 minutos."
    },
    "practicaGuiada": {
      "id": "m28-l4-practica",
      "enunciado": "Una línea de soporte recibe llamadas a razón de 3 por hora; el tiempo entre llamadas es exponencial con λ = 3 por hora.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Tiempo medio entre llamadas (minutos)",
          "valor": 20,
          "calculo": "=60/3"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(esperar menos de 10 minutos para la siguiente llamada) (4 decimales)",
          "valor": 0.3935,
          "calculo": "=DISTR.EXP.N(10/60;3;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(más de 30 minutos sin llamadas) (4 decimales)",
          "valor": 0.2231,
          "calculo": "=1-DISTR.EXP.N(30/60;3;VERDADERO)"
        }
      ],
      "solucion": [
        "Media = 1/3 hora = 20 minutos.",
        "10 minutos = 1/6 hora: P(T ≤ 1/6) = 1 − e^(−0.5) = 0.3935.",
        "30 minutos = 0.5 hora: P(T > 0.5) = e^(−1.5) = 0.2231."
      ],
      "pistas": [
        "Convierte los minutos a horas antes de usar λ."
      ]
    },
    "reto": {
      "id": "m28-l4-reto",
      "enunciado": "Un componente electrónico dura en promedio 1000 horas (exponencial, λ = 0.001 por hora).",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "P(dura más de 1000 horas) (4 decimales)",
          "valor": 0.3679,
          "calculo": "=1-DISTR.EXP.N(1000;0.001;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(falla antes de 500 horas) (4 decimales)",
          "valor": 0.3935,
          "calculo": "=DISTR.EXP.N(500;0.001;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Mediana: tiempo que deja 50 % a cada lado, −ln(0.5)/λ (horas, entero)",
          "valor": 693,
          "calculo": "=-LN(0.5)/0.001",
          "tolerancia": 0.5
        },
        {
          "tipo": "opcion",
          "etiqueta": "Si ya lleva 800 horas funcionando, P(durar otras 1000) es…",
          "opciones": [
            "Menor que para uno nuevo",
            "Igual que para uno nuevo (sin memoria)",
            "Mayor que para uno nuevo"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "P(T > 1000) = e^(−1) = 0.3679.",
        "P(T ≤ 500) = 1 − e^(−0.5) = 0.3935.",
        "Mediana = ln 2 ÷ 0.001 = 693 horas (menor que la media: distribución sesgada).",
        "Por la falta de memoria, el uso previo no cambia la probabilidad futura."
      ],
      "pistas": [
        "P(T > t) = e^(−λt)."
      ]
    },
    "verificacion": [
      {
        "id": "m28-l4-q1",
        "pregunta": "Si λ = 4 eventos por hora, el tiempo medio entre eventos es:",
        "opciones": [
          "4 horas",
          "15 minutos",
          "1 hora",
          "0.25 minutos"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "1/4 hora = 15 minutos."
      },
      {
        "id": "m28-l4-q2",
        "pregunta": "La propiedad de falta de memoria significa que:",
        "opciones": [
          "El pasado no cambia la probabilidad del tiempo restante",
          "Los eventos son periódicos",
          "La media es cero",
          "La varianza es constante"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "P(T > s + t | T > s) = P(T > t)."
      }
    ],
    "resumen": [
      "Exponencial: tiempo entre eventos de un proceso Poisson.",
      "Media = 1/λ; P(T > t) = e^(−λt).",
      "Sin memoria."
    ],
    "proximoPaso": "Cerramos con el teorema central del límite.",
    "conceptos": [
      "distribucion-exponencial"
    ]
  },
  {
    "id": "m28-l5",
    "moduloId": "modulo-28",
    "motor": "calculo",
    "titulo": "Teorema central del límite",
    "objetivo": "Aplicar el teorema central del límite para calcular el error estándar de la media y probabilidades sobre promedios.",
    "porQueImporta": "Casi todas las conclusiones sobre una población usan el promedio de una muestra. El teorema central del límite explica por qué esos promedios siguen una distribución casi normal, aunque los datos individuales no lo hagan.",
    "concepto": "**Teorema central del límite (TCL):** si se toman muestras de tamaño `n` de una población con media `μ` y desviación `σ`, la distribución de la media muestral `x̄` es aproximadamente normal cuando `n` es grande (como regla, `n ≥ 30`), con:\n\n- media `μ` y\n- **error estándar** `EE = σ ÷ √n`.\n\n`x̄ ~ N(μ, σ/√n)`\n\nImporta por dos cosas: (1) vale para casi cualquier forma de la población y (2) el error estándar disminuye al aumentar `n`, pero con la **raíz**: para reducirlo a la mitad hay que cuadruplicar la muestra.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Ventas diarias: μ = 100, σ = 30; muestra de n = 36 días",
      "pasos": [
        "Error estándar: 30 ÷ √36 = 30 ÷ 6 = **5**.",
        "x̄ ~ N(100, 5). P(x̄ > 105) = 1 − Φ((105 − 100) ÷ 5) = 1 − Φ(1) = **0.1587**.",
        "Comparación: un día individual supera 105 con probabilidad 1 − Φ(0.167) = 0.4338, mucho más alta."
      ],
      "conclusion": "Los promedios varían mucho menos que los datos individuales."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Una población muy sesgada produce medias casi normales",
      "datos": [
        {
          "columnas": [
            "Fuente",
            "n",
            "Media observada",
            "Desviación observada"
          ],
          "filas": [
            [
              "Tiempos individuales (exponencial)",
              60,
              "12.29",
              "11.15"
            ],
            [
              "Medias de muestras de 30",
              60,
              "9.81",
              "1.83"
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "histograma",
          "datos": [
            2.7,
            7.9,
            4.6,
            9.3,
            9.8,
            0.7,
            0.1,
            18.2,
            3.0,
            2.7,
            54.4,
            6.4,
            18.1,
            6.5,
            10.2,
            1.6,
            10.1,
            20.3,
            7.4,
            13.5,
            11.1,
            0.7,
            14.2,
            8.9,
            3.6,
            0.3,
            20.1,
            6.4,
            12.7,
            21.1,
            12.5,
            25.4,
            5.0,
            16.1,
            5.9,
            27.4,
            21.1,
            1.0,
            1.5,
            2.4,
            33.7,
            5.7,
            9.9,
            3.6,
            7.1,
            4.9,
            4.3,
            8.8,
            8.8,
            23.5,
            11.5,
            26.4,
            19.4,
            47.1,
            11.1,
            1.8,
            19.7,
            33.4,
            23.5,
            8.4
          ],
          "titulo": "60 tiempos individuales: cola larga a la derecha",
          "etiquetaX": "Minutos"
        },
        {
          "tipo": "histograma",
          "datos": [
            11.81,
            9.78,
            7.49,
            8.08,
            13.36,
            9.37,
            6.67,
            10.44,
            9.41,
            9.05,
            9.02,
            10.45,
            10.65,
            8.28,
            7.3,
            10.03,
            12.03,
            5.86,
            6.07,
            10.38,
            8.69,
            9.17,
            9.25,
            13.02,
            12.2,
            8.79,
            8.46,
            11.19,
            10.89,
            11.15,
            11.61,
            11.85,
            13.05,
            8.85,
            8.67,
            10.47,
            10.24,
            7.37,
            11.57,
            8.81,
            10.77,
            10.1,
            9.94,
            6.7,
            12.12,
            9.48,
            7.15,
            8.75,
            11.87,
            11.22,
            7.15,
            10.27,
            11.21,
            9.76,
            8.67,
            7.56,
            11.27,
            9.69,
            12.32,
            11.82
          ],
          "titulo": "60 medias de muestras de 30: forma de campana",
          "etiquetaX": "Media (min)"
        }
      ],
      "pasos": [
        "La población es exponencial con media 10 y desviación 10 (muy sesgada).",
        "El TCL predice medias con centro 10 y error estándar 10 ÷ √30 = 1.83.",
        "Las 60 medias simuladas tienen un centro y una dispersión cercanos a lo predicho y una forma mucho más simétrica."
      ],
      "conclusion": "El histograma de medias se parece a una campana aunque los datos individuales no."
    },
    "errorFrecuente": {
      "codigo": "Datos con σ = 30 y n = 36 → «los promedios varían 30 en torno a la media».",
      "explicacion": "La desviación de los promedios es el error estándar σ/√n = 5, no σ. Confundir ambas es sobreestimar mucho la variabilidad de la media (o subestimarla si se usa σ de los datos al revés)."
    },
    "practicaGuiada": {
      "id": "m28-l5-practica",
      "enunciado": "El peso de un paquete tiene μ = 500 g y σ = 20 g. Se examina una muestra de n = 100 paquetes.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Error estándar de la media (g)",
          "valor": 2,
          "calculo": "=20/RAIZ(100)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(x̄ < 497) (4 decimales)",
          "valor": 0.0668,
          "calculo": "=DISTR.NORM.N(497;500;2;VERDADERO)"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(498 < x̄ < 502) (4 decimales)",
          "valor": 0.6827,
          "calculo": "=DISTR.NORM.N(502;500;2;VERDADERO)-DISTR.NORM.N(498;500;2;VERDADERO)"
        }
      ],
      "solucion": [
        "EE = 20 ÷ √100 = 2.",
        "z = (497 − 500) ÷ 2 = −1.5; Φ(−1.5) = 0.0668.",
        "498 y 502 están a ±1 EE: 0.8413 − 0.1587 = 0.6827."
      ],
      "pistas": [
        "Estandariza con el EE, no con σ."
      ]
    },
    "reto": {
      "id": "m28-l5-reto",
      "enunciado": "Con la misma población (μ = 500, σ = 20).",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Error estándar con n = 25 (g)",
          "valor": 4,
          "calculo": "=20/RAIZ(25)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Tamaño de muestra necesario para que el error estándar sea 1 g",
          "valor": 400,
          "calculo": "=(20/1)^2"
        },
        {
          "tipo": "numero",
          "etiqueta": "P(x̄ > 501) con n = 400 (4 decimales)",
          "valor": 0.1587,
          "calculo": "=1-DISTR.NORM.N(501;500;1;VERDADERO)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Para reducir el error estándar a la mitad hay que…",
          "opciones": [
            "Duplicar n",
            "Cuadruplicar n",
            "Multiplicar n por 10"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "EE = 20/5 = 4.",
        "n = (σ ÷ EE)² = 20² = 400.",
        "Con n = 400, EE = 1 → z = 1; P = 0.1587.",
        "EE depende de 1/√n: para dividir entre 2, n × 4."
      ],
      "pistas": [
        "n = (σ / EE)²."
      ]
    },
    "verificacion": [
      {
        "id": "m28-l5-q1",
        "pregunta": "El error estándar de la media es:",
        "opciones": [
          "σ",
          "σ/√n",
          "σ²/n",
          "μ/√n"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Es la desviación de la media muestral."
      },
      {
        "id": "m28-l5-q2",
        "pregunta": "El TCL permite usar la normal para x̄ incluso si la población no lo es porque…",
        "opciones": [
          "Siempre es exacta",
          "Con n grande la distribución de x̄ es aproximadamente normal",
          "La media es igual a la mediana",
          "La varianza es cero"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Es un resultado asintótico."
      }
    ],
    "resumen": [
      "x̄ ~ N(μ, σ/√n) para n grande.",
      "EE = σ/√n.",
      "Cuadruplicar n reduce el error a la mitad."
    ],
    "proximoPaso": "En el proyecto aplicarás las distribuciones a un caso de negocio.",
    "conceptos": [
      "teorema-central-limite",
      "error-estandar"
    ]
  }
]
