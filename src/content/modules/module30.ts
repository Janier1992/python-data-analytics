import type { Lesson } from '../../types'

export const module30Lessons: Lesson[] = [
  {
    "id": "m30-l1",
    "moduloId": "modulo-30",
    "motor": "calculo",
    "titulo": "Muestreo y sesgo de selección",
    "objetivo": "Distinguir los principales tipos de muestreo y reconocer el sesgo de selección y de no respuesta.",
    "porQueImporta": "La estadística inferencial supone que la muestra representa a la población. Si el muestreo es malo, ningún cálculo posterior lo corrige: es el error más caro y más difícil de detectar.",
    "concepto": "La **inferencia** consiste en sacar conclusiones sobre una población a partir de una muestra. Todo depende de cómo se eligió esa muestra.\n\n**Muestreo probabilístico** (cada elemento tiene una probabilidad conocida de ser elegido):\n\n- **Aleatorio simple**: todos tienen la misma probabilidad; se sortea de la lista completa.\n- **Sistemático**: se elige uno cada `k = N ÷ n` elementos, con un arranque aleatorio.\n- **Estratificado**: se divide la población en grupos homogéneos (estratos) y se sortea dentro de cada uno; con **asignación proporcional**, cada estrato aporta a la muestra en proporción a su tamaño.\n- **Por conglomerados**: se sortean grupos completos (sucursales, barrios) y se encuesta a todos sus miembros.\n\n**Muestreo no probabilístico** (conveniencia, voluntarios): barato pero no permite generalizar con rigor.\n\n**Sesgos frecuentes**: de **selección** (algunos quedan fuera del marco), de **no respuesta** (quienes no contestan difieren de quienes sí) y de **supervivencia** (solo se observa a quienes «sobrevivieron»). Una muestra grande **no** corrige un sesgo.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Una empresa de 1200 empleados quiere encuestar a 60",
      "pasos": [
        "Muestreo **sistemático**: k = N ÷ n = 1200 ÷ 60 = **20**.",
        "Se elige un arranque al azar entre 1 y 20 (por ejemplo 7) y se toman los empleados 7, 27, 47, …",
        "Muestreo **estratificado proporcional**: si hay 720 de planta, 360 administrativos y 120 gerentes, cada estrato aporta 60 × 720/1200 = **36**, 18 y 6."
      ],
      "conclusion": "El estratificado garantiza que cada tipo de empleado esté representado en proporción a su tamaño."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Una encuesta con sesgo",
      "pasos": [
        "Se pregunta por satisfacción por correo y responde el 8 % de los clientes, casi todos muy contentos o muy molestos.",
        "Es **sesgo de no respuesta**: los 92 % restantes pueden pensar distinto.",
        "Aumentar la muestra no ayuda: hay que mejorar la tasa de respuesta o ponderar por segmentos."
      ],
      "conclusion": "Una muestra grande pero sesgada da una conclusión precisa… y equivocada."
    },
    "errorFrecuente": {
      "codigo": "«Encuestamos a 5000 personas en una red social: es una muestra enorme, así que representa a todo el país.»",
      "explicacion": "El tamaño no corrige el sesgo de selección. Solo están quienes usan esa red social y respondieron: no tienen la misma probabilidad de ser elegidos que el resto del país. Una muestra pequeña pero aleatoria suele ser mucho mejor."
    },
    "practicaGuiada": {
      "id": "m30-l1-practica",
      "enunciado": "Un colegio tiene 1500 estudiantes y quiere una muestra de 100.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Intervalo del muestreo sistemático (k = N ÷ n)",
          "valor": 15,
          "calculo": "=1500/100"
        },
        {
          "tipo": "numero",
          "etiqueta": "Probabilidad de que un estudiante sea elegido en un muestreo aleatorio simple (4 decimales)",
          "valor": 0.0667,
          "calculo": "=100/1500"
        },
        {
          "tipo": "numero",
          "etiqueta": "Si hay 900 estudiantes de primaria, ¿cuántos entran en una muestra estratificada proporcional?",
          "valor": 60,
          "calculo": "=100*900/1500"
        }
      ],
      "solucion": [
        "k = 1500 ÷ 100 = 15.",
        "Probabilidad = 100 ÷ 1500 = 0.0667.",
        "Primaria aporta 100 × 900/1500 = 60."
      ],
      "pistas": [
        "La asignación proporcional repite la proporción de la población."
      ]
    },
    "reto": {
      "id": "m30-l1-reto",
      "enunciado": "Identifica el sesgo en cada caso.",
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "Una tienda pregunta la satisfacción solo a los clientes que llegan a la caja en horario de oficina.",
          "opciones": [
            "Sesgo de selección",
            "Sesgo de no respuesta",
            "No hay sesgo"
          ],
          "correcta": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "Se estudian las empresas exitosas de hoy para ver «qué hicieron bien», ignorando las que quebraron.",
          "opciones": [
            "Sesgo de supervivencia",
            "Sesgo de no respuesta",
            "Muestreo estratificado"
          ],
          "correcta": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "Se envían 2000 encuestas y contestan 150 personas, casi todas jubiladas.",
          "opciones": [
            "Sesgo de no respuesta",
            "Muestreo sistemático",
            "Sesgo de confirmación"
          ],
          "correcta": 0
        },
        {
          "tipo": "numero",
          "etiqueta": "Si se envían 2000 encuestas y contestan 150, la tasa de respuesta (%, 1 decimal) es",
          "valor": 7.5,
          "calculo": "=150/2000*100"
        }
      ],
      "solucion": [
        "El marco excluye a los clientes de otros horarios.",
        "Solo se observan los que «sobrevivieron».",
        "La tasa de respuesta es 150 ÷ 2000 = 7.5 %."
      ],
      "pistas": [
        "Pregúntate quién queda fuera de la muestra y por qué."
      ]
    },
    "verificacion": [
      {
        "id": "m30-l1-q1",
        "pregunta": "En el muestreo estratificado:",
        "opciones": [
          "Se sortean grupos completos",
          "Se divide en estratos homogéneos y se sortea dentro de cada uno",
          "Se elige por conveniencia",
          "Se usa siempre n = 30"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Cada estrato queda representado."
      },
      {
        "id": "m30-l1-q2",
        "pregunta": "Una muestra muy grande:",
        "opciones": [
          "Elimina el sesgo de selección",
          "No corrige el sesgo de selección",
          "Siempre es representativa",
          "No tiene error"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "El tamaño reduce la variabilidad, no el sesgo."
      }
    ],
    "resumen": [
      "El muestreo aleatorio es la base de la inferencia.",
      "Estratificar, sistematizar o usar conglomerados.",
      "El sesgo no se arregla con más datos."
    ],
    "proximoPaso": "Veremos los estimadores: media y varianza muestrales.",
    "conceptos": [
      "muestreo",
      "sesgo-de-seleccion"
    ]
  },
  {
    "id": "m30-l2",
    "moduloId": "modulo-30",
    "motor": "calculo",
    "titulo": "Estimadores: media y varianza muestrales",
    "objetivo": "Distinguir parámetro, estadístico y estimador, y entender por qué la varianza muestral divide entre n − 1.",
    "porQueImporta": "Rara vez conocemos la población completa. Estimamos sus parámetros con estadísticos de la muestra, y conviene saber cuándo un estimador es «bueno» (insesgado).",
    "concepto": "- **Parámetro**: un valor de la población (`μ`, `σ²`, `p`). Es fijo y casi siempre desconocido.\n- **Estadístico**: un valor calculado con la muestra (`x̄`, `s²`, `p̂`). Cambia de muestra en muestra.\n- **Estimador**: la fórmula que usamos para estimar un parámetro.\n\nUn estimador es **insesgado** si, promediando sobre todas las muestras posibles, da el valor verdadero del parámetro.\n\n- `x̄ = Σx ÷ n` estima a `μ` sin sesgo.\n- `s² = Σ(x − x̄)² ÷ (n − 1)` estima a `σ²` sin sesgo. Con `n` en el denominador se subestimaría la varianza.\n\nEl **error estándar** mide cuánto varía un estimador de muestra en muestra.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Una población diminuta {1, 3, 5} y todas las muestras de tamaño 2 (con reemplazo)",
      "datos": [
        {
          "columnas": [
            "Muestra",
            "Media x̄",
            "s² (÷ n−1)",
            "Con ÷ n"
          ],
          "filas": [
            [
              "(1, 1)",
              "1",
              "0",
              "0"
            ],
            [
              "(1, 3)",
              "2",
              "2",
              "1"
            ],
            [
              "(1, 5)",
              "3",
              "8",
              "4"
            ],
            [
              "(3, 1)",
              "2",
              "2",
              "1"
            ],
            [
              "(3, 3)",
              "3",
              "0",
              "0"
            ],
            [
              "(3, 5)",
              "4",
              "2",
              "1"
            ],
            [
              "(5, 1)",
              "3",
              "8",
              "4"
            ],
            [
              "(5, 3)",
              "4",
              "2",
              "1"
            ],
            [
              "(5, 5)",
              "5",
              "0",
              "0"
            ],
            [
              "Promedio",
              "3",
              "2.667",
              "1.333"
            ]
          ]
        }
      ],
      "pasos": [
        "Población: μ = 3; σ² = ((1−3)² + 0 + (5−3)²) ÷ 3 = 2.667.",
        "El promedio de todas las x̄ es **3** = μ: la media muestral es insesgada.",
        "El promedio de s² con n − 1 es **2.667** = σ²; con n es solo **1.333** (la mitad): subestima."
      ],
      "conclusion": "Dividir entre n − 1 corrige el sesgo de la varianza muestral."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Estimar con una muestra real: tiempos de respuesta (segundos)",
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
              "Tiempo",
              12,
              15,
              11,
              18,
              14
            ]
          ]
        }
      ],
      "pasos": [
        "x̄ = 70 ÷ 5 = **14** s (estima μ).",
        "s² = 30 ÷ 4 = **7.5** s² (estima σ²) y s = √7.5 = **2.74** s.",
        "Error estándar de la media = s ÷ √n = 2.74 ÷ 2.236 = **1.22** s."
      ],
      "conclusion": "Con estos cinco datos estimamos que el tiempo medio es ≈ 14 s, con una incertidumbre típica de 1.22 s."
    },
    "errorFrecuente": {
      "codigo": "«x̄ = 14, así que la media poblacional μ es exactamente 14.»",
      "explicacion": "x̄ es solo una estimación: otra muestra daría otro valor. La media muestral varía en torno a μ con un error estándar. Por eso la estadística inferencial acompaña las estimaciones con intervalos y pruebas."
    },
    "practicaGuiada": {
      "id": "m30-l2-practica",
      "enunciado": "Una muestra de 6 pedidos tiene estos tiempos de entrega (días): 3, 5, 4, 6, 2, 4.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media muestral x̄",
          "valor": 4,
          "calculo": "=PROMEDIO(3;5;4;6;2;4)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Varianza muestral s² (÷ n − 1)",
          "valor": 2,
          "calculo": "=VAR.S(3;5;4;6;2;4)"
        },
        {
          "tipo": "numero",
          "etiqueta": "s (3 decimales)",
          "valor": 1.414,
          "calculo": "=DESVEST.M(3;5;4;6;2;4)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Error estándar de la media (3 decimales)",
          "valor": 0.577,
          "calculo": "=DESVEST.M(3;5;4;6;2;4)/RAIZ(6)"
        }
      ],
      "solucion": [
        "x̄ = 24 ÷ 6 = 4.",
        "Desviaciones: −1, 1, 0, 2, −2, 0 → cuadrados 1, 1, 0, 4, 4, 0 = 10. s² = 10 ÷ 5 = 2.",
        "s = 1.414; EE = 1.414 ÷ 2.449 = 0.577."
      ],
      "pistas": [
        "Divide la suma de cuadrados entre n − 1 = 5."
      ]
    },
    "reto": {
      "id": "m30-l2-reto",
      "enunciado": "Con los mismos datos.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Varianza si se dividiera (erróneamente) entre n (3 decimales)",
          "valor": 1.667
        },
        {
          "tipo": "numero",
          "etiqueta": "Cociente entre la varianza correcta y la errónea",
          "valor": 1.2,
          "calculo": "=(6/5)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Dividir entre n en lugar de n − 1 hace que la varianza estimada sea…",
          "opciones": [
            "Mayor que la verdadera",
            "Menor en promedio: subestima",
            "Igual"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "10 ÷ 6 = 1.667.",
        "La razón entre ambas es n ÷ (n − 1) = 6 ÷ 5 = 1.2.",
        "Dividir entre n subestima la varianza poblacional."
      ],
      "pistas": [
        "El cociente entre las varianzas es n/(n−1)."
      ]
    },
    "verificacion": [
      {
        "id": "m30-l2-q1",
        "pregunta": "Un estimador insesgado es aquel que…",
        "opciones": [
          "Siempre acierta",
          "En promedio sobre todas las muestras da el valor del parámetro",
          "Tiene varianza cero",
          "Usa muestras grandes"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "No tiene error sistemático."
      },
      {
        "id": "m30-l2-q2",
        "pregunta": "Un parámetro es…",
        "opciones": [
          "Un valor de la muestra",
          "Un valor fijo de la población",
          "Una fórmula",
          "Un gráfico"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Describe a la población."
      }
    ],
    "resumen": [
      "Parámetro (población) vs estadístico (muestra).",
      "x̄ y s² (÷ n−1) son insesgados.",
      "El error estándar mide la variación del estimador."
    ],
    "proximoPaso": "Calcularemos el error estándar y el tamaño de muestra necesario.",
    "conceptos": [
      "estimador-insesgado",
      "varianza-muestral"
    ]
  },
  {
    "id": "m30-l3",
    "moduloId": "modulo-30",
    "motor": "calculo",
    "titulo": "Error estándar y tamaño de muestra",
    "objetivo": "Calcular el error estándar de una media y de una proporción y determinar el tamaño de muestra para una precisión deseada.",
    "porQueImporta": "Antes de recoger datos hay que decidir cuántos hacen falta. Muy pocos dan estimaciones inútiles; demasiados cuestan dinero y tiempo.",
    "concepto": "**Error estándar** (EE): la desviación típica de un estimador.\n\n- Media: `EE = s ÷ √n` (o `σ ÷ √n`).\n- Proporción: `EE = √(p̂(1 − p̂) ÷ n)`.\n\n**Margen de error** = valor crítico × EE. Con 95 % de confianza el valor crítico de la normal es `z = 1.96`.\n\n**Tamaño de muestra** para un margen de error `E` deseado:\n\n- Media: `n = (z · σ ÷ E)²`.\n- Proporción: `n = z² · p(1 − p) ÷ E²` (si no hay estimación previa, usa `p = 0.5`, el caso más exigente).\n\nSiempre se **redondea hacia arriba**. Como el EE depende de `√n`, para reducir el margen a la mitad hay que cuadruplicar la muestra.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "¿Cuántos clientes hay que medir para estimar el gasto medio con margen ±3?",
      "pasos": [
        "Se conoce por estudios previos σ ≈ 15 pesos; se quiere E = 3 con 95 % de confianza (z = 1.96).",
        "n = (1.96 × 15 ÷ 3)² = (9.8)² = 96.04 → **97** clientes."
      ],
      "conclusion": "Con 97 clientes el margen de error del 95 % no supera ±3."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Sondeo de proporción con margen ±4 %",
      "pasos": [
        "Sin estimación previa se usa p = 0.5 (máxima variabilidad).",
        "n = 1.96² × 0.5 × 0.5 ÷ 0.04² = 600.23 → **601** personas."
      ],
      "conclusion": "Los sondeos de ~600 personas tienen un margen de error cercano a ±4 %."
    },
    "errorFrecuente": {
      "codigo": "«Para estimar con la mitad de margen basta con duplicar la muestra.»",
      "explicacion": "El EE decrece con √n: duplicar n solo lo reduce a 1/√2 ≈ 0.71. Para dividir el margen entre 2 hay que cuadruplicar la muestra."
    },
    "practicaGuiada": {
      "id": "m30-l3-practica",
      "enunciado": "Una muestra de n = 49 pagos tiene media 800 y desviación s = 70.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Error estándar de la media",
          "valor": 10,
          "calculo": "=70/RAIZ(49)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Margen de error al 95 % con z = 1.96 (1 decimal)",
          "valor": 19.6,
          "calculo": "=1.96*10"
        },
        {
          "tipo": "numero",
          "etiqueta": "Tamaño necesario para un margen de ±10 con σ = 70 (redondea hacia arriba)",
          "valor": 189
        }
      ],
      "solucion": [
        "EE = 70 ÷ 7 = 10.",
        "Margen = 1.96 × 10 = 19.6.",
        "n = (1.96 × 70 ÷ 10)² = 13.72² = 188.2 → 189."
      ],
      "pistas": [
        "Redondea siempre hacia arriba."
      ]
    },
    "reto": {
      "id": "m30-l3-reto",
      "enunciado": "Una startup quiere estimar la proporción de usuarios que usarían una función nueva.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "n para un margen de ±5 % con 95 % (p = 0.5)",
          "valor": 385
        },
        {
          "tipo": "numero",
          "etiqueta": "EE de una proporción p̂ = 0.3 con n = 400 (4 decimales)",
          "valor": 0.0229,
          "calculo": "=RAIZ(0.3*0.7/400)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Para reducir el margen de ±5 % a ±2.5 % hay que…",
          "opciones": [
            "Duplicar n",
            "Cuadruplicar n",
            "Aumentar n un 10 %"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "n = 1.96² × 0.25 ÷ 0.05² = 384.1 → 385.",
        "EE = √(0.21 ÷ 400) = 0.0229.",
        "Para dividir el margen entre 2 se necesita 4 veces la muestra."
      ],
      "pistas": [
        "Con p desconocido, usa p = 0.5."
      ]
    },
    "verificacion": [
      {
        "id": "m30-l3-q1",
        "pregunta": "Duplicar el tamaño de muestra hace que el error estándar…",
        "opciones": [
          "Se reduzca a la mitad",
          "Se multiplique por 0.71 (1/√2)",
          "Se duplique",
          "No cambie"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "EE ∝ 1/√n."
      },
      {
        "id": "m30-l3-q2",
        "pregunta": "Si no se conoce p, para el tamaño de muestra se usa:",
        "opciones": [
          "p = 0",
          "p = 0.5",
          "p = 1",
          "p = 0.1"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "p = 0.5 maximiza p(1 − p)."
      }
    ],
    "resumen": [
      "EE = s/√n; EE(p̂) = √(p̂(1−p̂)/n).",
      "n = (zσ/E)² o z²p(1−p)/E².",
      "Margen a la mitad = muestra × 4."
    ],
    "proximoPaso": "Construiremos intervalos de confianza para la media.",
    "conceptos": [
      "error-estandar-media",
      "tamano-de-muestra"
    ]
  },
  {
    "id": "m30-l4",
    "moduloId": "modulo-30",
    "motor": "calculo",
    "titulo": "Intervalo de confianza para la media",
    "objetivo": "Construir e interpretar un intervalo de confianza para la media con la distribución t.",
    "porQueImporta": "Una estimación puntual como «el tiempo medio es 52 minutos» no dice cuánta confianza merece. El intervalo de confianza da un rango razonable para el verdadero valor y una medida de la incertidumbre.",
    "concepto": "Cuando `σ` es desconocida (lo habitual), el intervalo de confianza para la media usa la **distribución t de Student**:\n\n`x̄ ± t* · (s ÷ √n)`\n\ndonde `t*` es el valor crítico con `n − 1` **grados de libertad** (gl). En la calculadora: `=INV.T.2C(1 − nivel; gl)`; por ejemplo `=INV.T.2C(0.05; 15)` para 95 % con 16 datos.\n\n**Interpretación**: «con 95 % de confianza, la media poblacional está entre A y B». Significa que el *método* captura la media verdadera en el 95 % de las muestras; **no** que haya un 95 % de probabilidad de que μ esté en este intervalo concreto.\n\nMás confianza → intervalo más ancho. Más datos → más estrecho. La distribución t tiene colas más pesadas que la normal; con muestras grandes se parecen.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Muestra de n = 16: x̄ = 52 y s = 8",
      "pasos": [
        "Error estándar = 8 ÷ √16 = **2**.",
        "t* para 95 % con gl = 15 → **2.131**.",
        "Margen = 2.131 × 2 = 4.26.",
        "Intervalo = 52 ± 4.26 → **(47.74; 56.26)**."
      ],
      "conclusion": "Con 95 % de confianza, la media poblacional está entre 47.7 y 56.3."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Efecto del nivel de confianza",
      "datos": [
        {
          "columnas": [
            "Confianza",
            "t* (gl = 15)",
            "Margen",
            "Intervalo"
          ],
          "filas": [
            [
              "90 %",
              "1.753",
              "3.51",
              "(48.49; 55.51)"
            ],
            [
              "95 %",
              "2.131",
              "4.26",
              "(47.74; 56.26)"
            ],
            [
              "99 %",
              "2.947",
              "5.89",
              "(46.11; 57.89)"
            ]
          ]
        }
      ],
      "pasos": [
        "Con los mismos datos, subir la confianza amplía el intervalo.",
        "Es el costo de estar más seguro: menos precisión."
      ],
      "conclusion": "Hay un equilibrio entre confianza y precisión."
    },
    "errorFrecuente": {
      "codigo": "«Con 95 % de confianza, el 95 % de los clientes tarda entre 47.7 y 56.3 minutos.»",
      "explicacion": "El intervalo es para la media poblacional, no para los datos individuales. Los datos individuales varían mucho más (desviación 8); el intervalo de la media es más estrecho porque usa el error estándar (2)."
    },
    "practicaGuiada": {
      "id": "m30-l4-practica",
      "enunciado": "Una muestra de n = 25 compras tiene x̄ = 120 y s = 15. Construye el IC del 95 %.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Error estándar",
          "valor": 3.0,
          "calculo": "=15/RAIZ(25)"
        },
        {
          "tipo": "numero",
          "etiqueta": "t* con gl = 24 (3 decimales)",
          "valor": 2.064,
          "calculo": "=INV.T.2C(0.05;24)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Margen de error (2 decimales)",
          "valor": 6.19
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite inferior (2 decimales)",
          "valor": 113.81
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite superior (2 decimales)",
          "valor": 126.19
        }
      ],
      "solucion": [
        "EE = 15 ÷ 5 = 3.",
        "t* = 2.064 (gl = 24).",
        "Margen = 2.064 × 3 = 6.19.",
        "IC = (113.81; 126.19)."
      ],
      "pistas": [
        "Usa =INV.T.2C(0.05; 24) para t*."
      ]
    },
    "reto": {
      "id": "m30-l4-reto",
      "enunciado": "Con los mismos datos, compara y razona.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "t* para 99 % con gl = 24 (3 decimales)",
          "valor": 2.797,
          "calculo": "=INV.T.2C(0.01;24)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite inferior del IC del 99 % (2 decimales)",
          "valor": 111.61
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite superior del IC del 99 % (2 decimales)",
          "valor": 128.39
        },
        {
          "tipo": "opcion",
          "etiqueta": "El IC del 99 % es…",
          "opciones": [
            "Más estrecho que el del 95 %",
            "Más ancho que el del 95 %",
            "Igual"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "t*(99 %) = 2.797.",
        "Margen = 8.39.",
        "IC = (111.61; 128.39), más ancho que el del 95 %."
      ],
      "pistas": [
        "Cambia 0.05 por 0.01 en INV.T.2C."
      ]
    },
    "verificacion": [
      {
        "id": "m30-l4-q1",
        "pregunta": "Si aumentas el nivel de confianza (con los mismos datos), el intervalo:",
        "opciones": [
          "Se estrecha",
          "Se ensancha",
          "No cambia",
          "Desaparece"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Más confianza exige más margen."
      },
      {
        "id": "m30-l4-q2",
        "pregunta": "La interpretación correcta de un IC del 95 % es:",
        "opciones": [
          "El 95 % de los datos está dentro",
          "El método captura la media verdadera en el 95 % de las muestras",
          "μ tiene 95 % de probabilidad de estar en este intervalo concreto",
          "x̄ es exacta"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La confianza se refiere al procedimiento."
      }
    ],
    "resumen": [
      "IC = x̄ ± t*·s/√n con gl = n − 1.",
      "Más confianza → más ancho; más n → más estrecho.",
      "Es un intervalo para la media, no para los datos."
    ],
    "proximoPaso": "Haremos lo mismo para una proporción.",
    "conceptos": [
      "intervalo-de-confianza-media",
      "distribucion-t"
    ]
  },
  {
    "id": "m30-l5",
    "moduloId": "modulo-30",
    "motor": "calculo",
    "titulo": "Intervalo de confianza para una proporción",
    "objetivo": "Estimar una proporción poblacional con un intervalo de confianza y verificar sus condiciones.",
    "porQueImporta": "Tasas de conversión, de satisfacción o de defectos son proporciones. Reportar «55 % de aprobación» sin un intervalo oculta cuánto puede variar la cifra.",
    "concepto": "Para una proporción muestral `p̂ = éxitos ÷ n`:\n\n`p̂ ± z* · √(p̂(1 − p̂) ÷ n)`\n\ncon `z* = 1.96` para 95 % (`=INV.NORM.ESTAND(0.975)`), 1.645 para 90 % y 2.576 para 99 %.\n\n**Condición**: que haya al menos unos 10 éxitos y 10 fracasos (`n·p̂ ≥ 10` y `n·(1 − p̂) ≥ 10`). Con pocos datos o `p̂` muy cercana a 0 o 1 el intervalo normal no es fiable.\n\nEl **margen de error** `E = z*·EE` es lo que se reporta como «±». Para 95 % con `p̂ = 0.5` el margen es aproximadamente `1 ÷ √n`.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Encuesta: 220 de 400 usuarios aprueban la nueva función",
      "pasos": [
        "p̂ = 220 ÷ 400 = **0.55**.",
        "EE = √(0.55 × 0.45 ÷ 400) = **0.0249**.",
        "Margen = 1.96 × 0.0249 = **0.0488**.",
        "IC 95 % = **(0.501; 0.599)**."
      ],
      "conclusion": "Con 95 % de confianza, la aprobación está entre 50.1 % y 59.9 %: no se puede asegurar que sea mayoría."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Condiciones y lectura",
      "pasos": [
        "Éxitos: 220 ≥ 10 y fracasos: 180 ≥ 10: se cumple la condición.",
        "El 50 % está dentro del intervalo (0.501; 0.599): con estos datos no hay evidencia clara de que más de la mitad apruebe."
      ],
      "conclusion": "Un intervalo que contiene 0.5 no permite afirmar mayoría."
    },
    "errorFrecuente": {
      "codigo": "«55 % de aprobación, así que la mayoría aprueba.»",
      "explicacion": "El 55 % es solo la estimación de la muestra. Con n = 400 el margen es ±4.9 puntos y el intervalo incluye valores por debajo del 50 %. Sin el intervalo se sobre-interpreta una diferencia que puede ser ruido."
    },
    "practicaGuiada": {
      "id": "m30-l5-practica",
      "enunciado": "De 250 clientes encuestados, 100 dijeron que recomendarían el servicio.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Proporción muestral p̂",
          "valor": 0.4,
          "calculo": "=100/250"
        },
        {
          "tipo": "numero",
          "etiqueta": "Error estándar (4 decimales)",
          "valor": 0.031,
          "calculo": "=RAIZ(0.4*0.6/250)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Margen de error al 95 % (4 decimales)",
          "valor": 0.0607
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite inferior (3 decimales)",
          "valor": 0.339
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite superior (3 decimales)",
          "valor": 0.461
        }
      ],
      "solucion": [
        "p̂ = 100 ÷ 250 = 0.4.",
        "EE = √(0.4 × 0.6 ÷ 250) = 0.0310.",
        "Margen = 1.96 × 0.0310 = 0.0607.",
        "IC = (0.339; 0.461)."
      ],
      "pistas": [
        "Usa z* = 1.96."
      ]
    },
    "reto": {
      "id": "m30-l5-reto",
      "enunciado": "Una fábrica inspecciona 500 piezas y encuentra 30 defectuosas.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "p̂ (3 decimales)",
          "valor": 0.06
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite inferior del IC 95 % (3 decimales)",
          "valor": 0.039
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite superior del IC 95 % (3 decimales)",
          "valor": 0.081
        },
        {
          "tipo": "opcion",
          "etiqueta": "Si la meta es tener a lo sumo 5 % de defectuosas, ¿qué se puede concluir?",
          "opciones": [
            "Se cumple con seguridad",
            "El 5 % está dentro del intervalo: no se puede descartar que se cumpla ni que se incumpla",
            "Se incumple seguro"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "p̂ = 30 ÷ 500 = 0.06.",
        "EE = √(0.06 × 0.94 ÷ 500) = 0.0106; margen = 0.0208.",
        "IC = (0.039; 0.081) contiene 0.05."
      ],
      "pistas": [
        "El intervalo contiene 0.05 si el límite inferior es menor que 0.05."
      ]
    },
    "verificacion": [
      {
        "id": "m30-l5-q1",
        "pregunta": "El margen de error de una proporción depende de:",
        "opciones": [
          "Solo de p̂",
          "De p̂, n y el nivel de confianza",
          "Solo de n",
          "De la media"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "E = z*·√(p̂(1−p̂)/n)."
      },
      {
        "id": "m30-l5-q2",
        "pregunta": "El intervalo normal para proporciones requiere:",
        "opciones": [
          "n < 10",
          "Al menos ~10 éxitos y ~10 fracasos",
          "p̂ = 0.5",
          "Que σ sea conocida"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Para aproximar con la normal."
      }
    ],
    "resumen": [
      "IC = p̂ ± z*·√(p̂(1−p̂)/n).",
      "Verifica ≥ 10 éxitos y fracasos.",
      "Si el intervalo contiene el valor de referencia, no hay evidencia clara."
    ],
    "proximoPaso": "Pasaremos de estimar a contrastar: la lógica de las pruebas de hipótesis.",
    "conceptos": [
      "intervalo-de-confianza-proporcion"
    ]
  }
]
