import type { Lesson } from '../../types'

export const module31Lessons: Lesson[] = [
  {
    "id": "m31-l1",
    "moduloId": "modulo-31",
    "motor": "calculo",
    "titulo": "La lógica de las pruebas de hipótesis",
    "objetivo": "Plantear hipótesis nula y alternativa, interpretar el p-valor y distinguir los errores tipo I y tipo II.",
    "porQueImporta": "Una prueba de hipótesis responde: «¿lo que veo en la muestra es compatible con el azar, o es evidencia de un efecto real?». Es la base de las pruebas A/B, el control de calidad y casi toda decisión basada en datos.",
    "concepto": "1. **Hipótesis nula (`H₀`)**: la afirmación de «no hay efecto / no hay diferencia» (por ejemplo, `μ = 50`).\n2. **Hipótesis alternativa (`H₁`)**: lo que queremos probar (`μ ≠ 50` bilateral, `μ > 50` o `μ < 50` unilateral).\n3. **Estadístico de prueba**: mide qué tan lejos está la muestra de lo que predice `H₀` (en unidades de error estándar).\n4. **p-valor**: la probabilidad de obtener un resultado *al menos tan extremo* como el observado **si `H₀` fuera cierta**.\n5. **Decisión**: si `p < α` (nivel de significancia, típicamente 0.05) se **rechaza `H₀`**; si no, **no se rechaza** (no se «acepta»).\n\n| | `H₀` es cierta | `H₀` es falsa |\n|---|---|---|\n| Rechazo `H₀` | **Error tipo I** (falso positivo), probabilidad `α` | Decisión correcta (potencia `1 − β`) |\n| No rechazo `H₀` | Decisión correcta | **Error tipo II** (falso negativo), probabilidad `β` |\n\nEl p-valor **no** es la probabilidad de que `H₀` sea cierta.\n\nPara un estadístico `z` bilateral: `p = 2 × (1 − Φ(|z|))`, es decir `=2*(1-DISTR.NORM.ESTAND.N(ABS(z);VERDADERO))`.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Una prueba con z = 2.1 (bilateral)",
      "pasos": [
        "p = 2 × (1 − Φ(2.1)) = 2 × (1 − 0.9821) = **0.0357**.",
        "Con α = 0.05: 0.0357 < 0.05 → se **rechaza H₀**.",
        "Con α = 0.01: 0.0357 > 0.01 → **no** se rechaza H₀."
      ],
      "conclusion": "La decisión depende del nivel de significancia elegido de antemano."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Planteamos las hipótesis de un caso",
      "pasos": [
        "«¿El nuevo diseño de la página aumenta la conversión del 4 % actual?»",
        "**H₀**: p = 0.04 (no cambia). **H₁**: p > 0.04 (prueba unilateral derecha).",
        "Un **error tipo I** sería lanzar el diseño cuando en realidad no mejora; un **error tipo II**, descartar un diseño que sí mejora."
      ],
      "conclusion": "La alternativa se plantea según la pregunta de negocio, antes de mirar los datos."
    },
    "errorFrecuente": {
      "codigo": "«p = 0.03 significa que hay un 3 % de probabilidad de que H₀ sea cierta.»",
      "explicacion": "El p-valor es la probabilidad de ver datos tan extremos suponiendo que H₀ es cierta; no es la probabilidad de H₀. Tampoco mide el tamaño del efecto. Y si p > α no se «demuestra» H₀: solo se dice que no hay evidencia suficiente en su contra."
    },
    "practicaGuiada": {
      "id": "m31-l1-practica",
      "enunciado": "Una prueba bilateral da un estadístico z = 1.8.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "p-valor (4 decimales)",
          "valor": 0.0719,
          "calculo": "=2*(1-DISTR.NORM.ESTAND.N(1.8;VERDADERO))"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con α = 0.05, la decisión es…",
          "opciones": [
            "Rechazar H₀",
            "No rechazar H₀"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con α = 0.10, la decisión es…",
          "opciones": [
            "Rechazar H₀",
            "No rechazar H₀"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "Φ(1.8) = 0.9641; p = 2 × 0.0359 = 0.0719.",
        "0.0719 > 0.05 → no se rechaza H₀.",
        "0.0719 < 0.10 → se rechaza H₀."
      ],
      "pistas": [
        "p = 2 × (1 − Φ(|z|)) en una prueba bilateral."
      ]
    },
    "reto": {
      "id": "m31-l1-reto",
      "enunciado": "Un hospital quiere comprobar si un nuevo protocolo reduce el tiempo medio de atención, que hoy es de 30 minutos.",
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "Hipótesis nula correcta",
          "opciones": [
            "μ < 30",
            "μ = 30",
            "μ > 30"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "Hipótesis alternativa correcta",
          "opciones": [
            "μ < 30",
            "μ ≠ 30",
            "μ = 30"
          ],
          "correcta": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "Adoptar el protocolo cuando en realidad no reduce el tiempo es un…",
          "opciones": [
            "Error tipo I",
            "Error tipo II",
            "Acierto"
          ],
          "correcta": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "No adoptarlo cuando sí reduce el tiempo es un…",
          "opciones": [
            "Error tipo I",
            "Error tipo II",
            "Acierto"
          ],
          "correcta": 1
        },
        {
          "tipo": "numero",
          "etiqueta": "Si z = −2.4 (unilateral izquierda), el p-valor (4 decimales) es",
          "valor": 0.0082,
          "calculo": "=DISTR.NORM.ESTAND.N(-2.4;VERDADERO)"
        }
      ],
      "solucion": [
        "H₀ afirma «no hay cambio»: μ = 30. H₁ es lo que se quiere probar: μ < 30.",
        "Rechazar H₀ siendo cierta = error tipo I; no rechazarla siendo falsa = tipo II.",
        "p unilateral = Φ(−2.4) = 0.0082."
      ],
      "pistas": [
        "La alternativa refleja la pregunta de la investigación."
      ]
    },
    "verificacion": [
      {
        "id": "m31-l1-q1",
        "pregunta": "Si p < α, la decisión es:",
        "opciones": [
          "No rechazar H₀",
          "Rechazar H₀",
          "Aceptar H₀",
          "Repetir siempre"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Evidencia suficiente contra H₀."
      },
      {
        "id": "m31-l1-q2",
        "pregunta": "El error tipo I es:",
        "opciones": [
          "No rechazar una H₀ falsa",
          "Rechazar una H₀ cierta",
          "Tomar una muestra pequeña",
          "Calcular mal"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Un falso positivo, con probabilidad α."
      }
    ],
    "resumen": [
      "H₀: sin efecto. H₁: lo que queremos probar.",
      "p < α → rechazar H₀.",
      "Tipo I = falso positivo; tipo II = falso negativo."
    ],
    "proximoPaso": "Aplicaremos esto a la media con la prueba t.",
    "conceptos": [
      "hipotesis-nula",
      "p-valor",
      "errores-tipo-i-ii"
    ]
  },
  {
    "id": "m31-l2",
    "moduloId": "modulo-31",
    "motor": "calculo",
    "titulo": "Prueba t para una media",
    "objetivo": "Contrastar si la media de una población difiere de un valor de referencia usando la prueba t de una muestra.",
    "porQueImporta": "Muchas preguntas comparan un promedio con una meta: ¿el tiempo medio cumple el estándar?, ¿el peso medio del envase es el declarado?",
    "concepto": "Para contrastar `H₀: μ = μ₀`:\n\n`t = (x̄ − μ₀) ÷ (s ÷ √n)`  con  `gl = n − 1`\n\nEl valor `t` mide a cuántos errores estándar está la media muestral del valor de referencia. El p-valor se obtiene de la distribución t:\n\n- Bilateral: `=DISTR.T.2C(ABS(t); gl)`.\n- Unilateral: `=DISTR.T.CD(t; gl)` (cola derecha si `t > 0`).\n\nAlternativa con el intervalo de confianza: si `μ₀` queda fuera del IC del 95 %, la prueba bilateral rechaza `H₀` con α = 0.05.\n\nSupuestos: datos independientes y distribución aproximadamente normal (o `n` grande).",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Meta: tiempo medio de 50 minutos. Muestra: n = 16, x̄ = 52, s = 8",
      "pasos": [
        "H₀: μ = 50. H₁: μ ≠ 50.",
        "EE = 8 ÷ √16 = 2; t = (52 − 50) ÷ 2 = **1.00**; gl = 15.",
        "p = DISTR.T.2C(1; 15) = **0.3332**.",
        "0.333 > 0.05 → no se rechaza H₀."
      ],
      "conclusion": "Con estos datos no hay evidencia de que el tiempo medio difiera de 50 minutos."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Lectura con el intervalo de confianza",
      "pasos": [
        "IC 95 %: 52 ± 2.131 × 2 = (47.74; 56.26).",
        "El 50 está dentro del intervalo → coherente con no rechazar H₀."
      ],
      "conclusion": "IC y prueba de hipótesis cuentan la misma historia desde ángulos distintos."
    },
    "errorFrecuente": {
      "codigo": "«p = 0.33 > 0.05 → demostramos que el tiempo medio es exactamente 50.»",
      "explicacion": "No rechazar H₀ no la demuestra: solo indica que los datos no son suficientes para detectar una diferencia. Con n = 16 la prueba tiene poca potencia; con más datos podría aparecer una diferencia."
    },
    "practicaGuiada": {
      "id": "m31-l2-practica",
      "enunciado": "Un envase debe contener 100 g en promedio. Se pesan 25 envases: x̄ = 105 y s = 15. Contraste bilateral.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Error estándar",
          "valor": 3,
          "calculo": "=15/RAIZ(25)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Estadístico t (3 decimales)",
          "valor": 1.667,
          "calculo": "=(105-100)/(15/RAIZ(25))"
        },
        {
          "tipo": "numero",
          "etiqueta": "Grados de libertad",
          "valor": 24
        },
        {
          "tipo": "numero",
          "etiqueta": "p-valor bilateral (4 decimales)",
          "valor": 0.1086,
          "calculo": "=DISTR.T.2C(ABS(5/3);24)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con α = 0.05…",
          "opciones": [
            "Se rechaza H₀",
            "No se rechaza H₀"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "EE = 15 ÷ 5 = 3.",
        "t = 5 ÷ 3 = 1.667; gl = 24.",
        "p = 0.1086 > 0.05.",
        "No hay evidencia suficiente de que el peso medio difiera de 100 g."
      ],
      "pistas": [
        "Usa =DISTR.T.2C(valor absoluto de t; gl)."
      ]
    },
    "reto": {
      "id": "m31-l2-reto",
      "enunciado": "Una línea afirma que el tiempo medio de reparación es de 5 horas. El equipo cree que es menor. Muestra: n = 36, x̄ = 4.6, s = 0.8. Prueba unilateral izquierda.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "t (3 decimales)",
          "valor": -3.0,
          "calculo": "=(4.6-5)/(0.8/RAIZ(36))"
        },
        {
          "tipo": "numero",
          "etiqueta": "p-valor unilateral (4 decimales)",
          "valor": 0.0025,
          "calculo": "=DISTR.T.CD(3;35)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con α = 0.05…",
          "opciones": [
            "Se rechaza H₀: hay evidencia de que la media es menor",
            "No se rechaza H₀"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "EE = 0.8 ÷ 6 = 0.1333; t = −0.4 ÷ 0.1333 = −3.",
        "Cola izquierda con 35 gl: p = 0.0025 (igual a DISTR.T.CD(3; 35)).",
        "p < 0.05: se rechaza H₀."
      ],
      "pistas": [
        "Por simetría, P(T ≤ −3) = P(T ≥ 3)."
      ]
    },
    "verificacion": [
      {
        "id": "m31-l2-q1",
        "pregunta": "En la prueba t de una muestra los grados de libertad son:",
        "opciones": [
          "n",
          "n − 1",
          "n − 2",
          "2n"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "gl = n − 1."
      },
      {
        "id": "m31-l2-q2",
        "pregunta": "Si μ₀ está dentro del IC del 95 %, la prueba bilateral con α = 0.05:",
        "opciones": [
          "Rechaza H₀",
          "No rechaza H₀",
          "No se puede saber",
          "Da p = 0"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Son equivalentes."
      }
    ],
    "resumen": [
      "t = (x̄ − μ₀)/(s/√n), gl = n − 1.",
      "Bilateral: DISTR.T.2C; unilateral: DISTR.T.CD.",
      "No rechazar no es demostrar."
    ],
    "proximoPaso": "Compararemos dos grupos.",
    "conceptos": [
      "prueba-t-una-muestra"
    ]
  },
  {
    "id": "m31-l3",
    "moduloId": "modulo-31",
    "motor": "calculo",
    "titulo": "Comparar dos grupos: t independiente y t pareada",
    "objetivo": "Elegir entre la prueba t para muestras independientes y la pareada, y calcular e interpretar el estadístico.",
    "porQueImporta": "«¿El método B vende más que el A?», «¿mejoró el rendimiento tras la capacitación?». La elección entre prueba independiente y pareada depende de cómo se tomaron los datos.",
    "concepto": "**Muestras independientes** (grupos distintos de individuos): prueba t de Welch.\n\n`t = (x̄₁ − x̄₂) ÷ √(s₁²/n₁ + s₂²/n₂)`\n\nLos grados de libertad dependen de las varianzas y los tamaños. Para el cálculo manual puedes usar la cota conservadora `gl = min(n₁, n₂) − 1`; el valor exacto (fórmula de Welch) da un p-valor algo menor.\n\n**Muestras pareadas** (mismas unidades medidas dos veces, antes/después): se calculan las **diferencias** `d = después − antes` y se hace una prueba t de una muestra sobre ellas:\n\n`t = d̄ ÷ (s_d ÷ √n)`  con  `gl = n − 1`.\n\nRegla: si cada dato de un grupo tiene su pareja natural en el otro, usa la **pareada**; es más potente porque elimina la variabilidad entre individuos.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Dos métodos de entrenamiento (6 personas por método, grupos distintos)",
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
            "Media",
            "Desv."
          ],
          "filas": [
            [
              "Método A",
              23,
              25,
              28,
              30,
              27,
              26,
              "26.50",
              "2.429"
            ],
            [
              "Método B",
              30,
              31,
              29,
              34,
              33,
              32,
              "31.50",
              "1.871"
            ]
          ]
        }
      ],
      "pasos": [
        "EE = √(2.429²/6 + 1.871²/6) = **1.252**.",
        "t = (26.50 − 31.50) ÷ 1.252 = **-3.995**.",
        "gl conservador = 5 → p = 0.0104; con la fórmula exacta de Welch (gl ≈ 9.4) p = 0.0029."
      ],
      "conclusion": "p < 0.05: hay evidencia de que los métodos difieren; el método B obtiene en promedio puntajes más altos."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Antes y después de una capacitación (mismos 8 empleados)",
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
            "8"
          ],
          "filas": [
            [
              "Antes",
              82,
              90,
              75,
              88,
              79,
              85,
              91,
              77
            ],
            [
              "Después",
              86,
              93,
              78,
              90,
              85,
              87,
              95,
              80
            ],
            [
              "Diferencia",
              4,
              3,
              3,
              2,
              6,
              2,
              4,
              3
            ]
          ]
        }
      ],
      "pasos": [
        "Media de las diferencias d̄ = 3.375; desviación s_d = 1.302.",
        "t = 3.375 ÷ (1.302 ÷ √8) = **7.329**; gl = 7.",
        "p = DISTR.T.2C(7.329; 7) = **0.0002**."
      ],
      "conclusion": "Hay evidencia de que la capacitación mejoró el puntaje (aumento medio de ≈ 3.4 puntos)."
    },
    "errorFrecuente": {
      "codigo": "Mismos 8 empleados medidos antes y después → «aplico la prueba de dos muestras independientes».",
      "explicacion": "Los datos están emparejados: la variabilidad entre personas es grande y no es relevante para el cambio. La prueba independiente la incluye como ruido y pierde potencia. La pareada trabaja con las diferencias por persona."
    },
    "practicaGuiada": {
      "id": "m31-l3-practica",
      "enunciado": "Con los puntajes de los métodos A y B de la lección (grupos independientes), usa la calculadora para completar.",
      "datos": [
        {
          "columnas": [
            "",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"
          ],
          "filas": [
            [
              "Método A",
              23,
              25,
              28,
              30,
              27,
              26
            ],
            [
              "Método B",
              30,
              31,
              29,
              34,
              33,
              32
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media del método B menos media del A (2 decimales)",
          "valor": 5.0,
          "calculo": "=PROMEDIO(30;31;29;34;33;32)-PROMEDIO(23;25;28;30;27;26)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Error estándar de la diferencia (3 decimales)",
          "valor": 1.252
        },
        {
          "tipo": "numero",
          "etiqueta": "t de Welch (valor absoluto, 3 decimales)",
          "valor": 3.995
        },
        {
          "tipo": "numero",
          "etiqueta": "p-valor bilateral con gl = 5 (4 decimales)",
          "valor": 0.0104,
          "calculo": "=DISTR.T.2C(3.994677;5)"
        }
      ],
      "solucion": [
        "x̄_B − x̄_A = 31.50 − 26.50 = 5.00.",
        "EE = √(5.900/6 + 3.500/6) = 1.252.",
        "t = 3.995.",
        "p (gl = 5) = 0.0104 < 0.05."
      ],
      "pistas": [
        "Usa DESVEST.M para s₁ y s₂."
      ]
    },
    "reto": {
      "id": "m31-l3-reto",
      "enunciado": "Con los datos pareados antes/después de la lección.",
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
            "8"
          ],
          "filas": [
            [
              "Antes",
              82,
              90,
              75,
              88,
              79,
              85,
              91,
              77
            ],
            [
              "Después",
              86,
              93,
              78,
              90,
              85,
              87,
              95,
              80
            ],
            [
              "Diferencia",
              4,
              3,
              3,
              2,
              6,
              2,
              4,
              3
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media de las diferencias (3 decimales)",
          "valor": 3.375,
          "calculo": "=PROMEDIO(4;3;3;2;6;2;4;3)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Desviación estándar de las diferencias (3 decimales)",
          "valor": 1.302,
          "calculo": "=DESVEST.M(4;3;3;2;6;2;4;3)"
        },
        {
          "tipo": "numero",
          "etiqueta": "t pareada (3 decimales)",
          "valor": 7.329
        },
        {
          "tipo": "numero",
          "etiqueta": "p-valor bilateral (4 decimales)",
          "valor": 0.0002
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con α = 0.05 la conclusión es…",
          "opciones": [
            "Hay evidencia de mejora",
            "No hay evidencia de mejora"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "Diferencias: [4, 3, 3, 2, 6, 2, 4, 3].",
        "d̄ = 3.375; s_d = 1.302; t = 7.329.",
        "p = 0.0002 < 0.05."
      ],
      "pistas": [
        "Convierte el problema en una prueba de una muestra sobre las diferencias."
      ]
    },
    "verificacion": [
      {
        "id": "m31-l3-q1",
        "pregunta": "Mides la presión de 10 pacientes antes y después de un fármaco. Prueba adecuada:",
        "opciones": [
          "t independiente",
          "t pareada",
          "Chi-cuadrado",
          "ANOVA"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Mismas unidades medidas dos veces."
      },
      {
        "id": "m31-l3-q2",
        "pregunta": "¿Qué compara la t pareada?",
        "opciones": [
          "Dos medias de grupos distintos",
          "La media de las diferencias contra 0",
          "Dos varianzas",
          "Dos proporciones"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "H₀: μ_d = 0."
      }
    ],
    "resumen": [
      "Independiente: grupos distintos (Welch).",
      "Pareada: diferencias por individuo.",
      "Elegir mal la prueba reduce la potencia o invalida la conclusión."
    ],
    "proximoPaso": "Compararemos proporciones: pruebas A/B.",
    "conceptos": [
      "prueba-t-dos-muestras",
      "prueba-t-pareada"
    ]
  },
  {
    "id": "m31-l4",
    "moduloId": "modulo-31",
    "motor": "calculo",
    "titulo": "Comparar proporciones y A/B testing",
    "objetivo": "Contrastar la diferencia entre dos proporciones con la prueba z y aplicarla a una prueba A/B.",
    "porQueImporta": "Una prueba A/B compara dos versiones (de una página, un correo, un precio) y mide una tasa: conversión, clics, abandonos. Hay que decidir si la diferencia observada es real o ruido.",
    "concepto": "Para `H₀: p_A = p_B` con muestras de tamaño `n_A` y `n_B` y éxitos `x_A`, `x_B`:\n\n1. Proporciones: `p̂_A = x_A ÷ n_A`, `p̂_B = x_B ÷ n_B`.\n2. **Proporción combinada** (porque bajo `H₀` son iguales): `p̄ = (x_A + x_B) ÷ (n_A + n_B)`.\n3. Error estándar: `EE = √( p̄(1 − p̄) · (1/n_A + 1/n_B) )`.\n4. Estadístico: `z = (p̂_B − p̂_A) ÷ EE`.\n5. p-valor bilateral: `=2*(1-DISTR.NORM.ESTAND.N(ABS(z);VERDADERO))`.\n\nBuenas prácticas en A/B: define la métrica y el tamaño de muestra **antes**, asigna al azar y no mires el resultado a mitad de la prueba para parar cuando salga «significativo».",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Página A: 120/1000 conversiones. Página B: 150/1000",
      "pasos": [
        "p̂_A = 0.120; p̂_B = 0.150; diferencia = 0.030.",
        "p̄ = 270 ÷ 2000 = 0.135; EE = √(0.135 × 0.865 × 2/1000) = **0.01528**.",
        "z = 0.030 ÷ 0.01528 = **1.963**; p = **0.0496**."
      ],
      "conclusion": "p ≈ 0.0496 < 0.05 apenas: evidencia débil. Una decisión de negocio debería considerar también el tamaño del efecto y repetir la prueba."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Intervalo de la diferencia",
      "pasos": [
        "EE (no combinado) = √(0.120·0.880/1000 + 0.150·0.850/1000) = 0.01527.",
        "IC 95 % de p_B − p_A = 0.030 ± 1.96 × 0.01527 = (0.0001; 0.0599)."
      ],
      "conclusion": "El intervalo apenas excluye el 0: la mejora podría ser desde casi nula hasta unos 6 puntos."
    },
    "errorFrecuente": {
      "codigo": "«B convierte 15 % y A 12 %: B es mejor, no hace falta ninguna prueba.»",
      "explicacion": "Con 1000 visitantes por grupo, una diferencia de 3 puntos está en el límite de lo que el azar puede producir (p ≈ 0.05). Sin prueba se confunde ruido con efecto. Y mirar los resultados a cada rato y detener la prueba cuando salga p < 0.05 infla el error tipo I."
    },
    "practicaGuiada": {
      "id": "m31-l4-practica",
      "enunciado": "Correo A: 40/400 clics. Correo B: 64/400 clics.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "p̂_A",
          "valor": 0.1,
          "calculo": "=40/400"
        },
        {
          "tipo": "numero",
          "etiqueta": "p̂_B",
          "valor": 0.16,
          "calculo": "=64/400"
        },
        {
          "tipo": "numero",
          "etiqueta": "Proporción combinada p̄ (3 decimales)",
          "valor": 0.13
        },
        {
          "tipo": "numero",
          "etiqueta": "Error estándar (4 decimales)",
          "valor": 0.0238
        },
        {
          "tipo": "numero",
          "etiqueta": "z (2 decimales)",
          "valor": 2.52
        },
        {
          "tipo": "numero",
          "etiqueta": "p-valor bilateral (4 decimales)",
          "valor": 0.0116
        }
      ],
      "solucion": [
        "p̂_A = 0.100; p̂_B = 0.160.",
        "p̄ = 104 ÷ 800 = 0.130; EE = 0.0238.",
        "z = 0.06 ÷ 0.0238 = 2.52; p = 0.0116."
      ],
      "pistas": [
        "Usa la proporción combinada en el error estándar."
      ]
    },
    "reto": {
      "id": "m31-l4-reto",
      "enunciado": "Con los mismos datos del correo A/B.",
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "Con α = 0.05, la conclusión es…",
          "opciones": [
            "B tiene un clic-rate significativamente distinto",
            "No hay diferencia"
          ],
          "correcta": 0
        },
        {
          "tipo": "numero",
          "etiqueta": "Aumento relativo de B sobre A (%)",
          "valor": 60,
          "calculo": "=(0.16-0.1)/0.1*100"
        },
        {
          "tipo": "numero",
          "etiqueta": "Límite inferior del IC 95 % de p_B − p_A (3 decimales)",
          "valor": 0.014
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué conviene hacer además de mirar el p-valor?",
          "opciones": [
            "Nada más",
            "Considerar el tamaño del efecto y su intervalo",
            "Detener la prueba cuando p < 0.05"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "p = 0.0116 < 0.05.",
        "Aumento relativo = (0.16 − 0.10) ÷ 0.10 = 60 %.",
        "IC: 0.060 ± 1.96 × 0.0237."
      ],
      "pistas": [
        "El IC de la diferencia usa el EE sin combinar."
      ]
    },
    "verificacion": [
      {
        "id": "m31-l4-q1",
        "pregunta": "En la prueba de dos proporciones, ¿qué proporción se usa para el EE bajo H₀?",
        "opciones": [
          "La de A",
          "La de B",
          "La combinada",
          "Ninguna"
        ],
        "respuestaCorrecta": 2,
        "explicacion": "Bajo H₀ ambas son iguales."
      },
      {
        "id": "m31-l4-q2",
        "pregunta": "Detener una prueba A/B en cuanto p < 0.05…",
        "opciones": [
          "Es lo correcto",
          "Infla la tasa de falsos positivos",
          "Aumenta la potencia",
          "No tiene efectos"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Mirar repetidamente es una forma de p-hacking."
      }
    ],
    "resumen": [
      "z con proporción combinada.",
      "Reporta diferencia, IC y p-valor.",
      "Define el diseño antes de ver los datos."
    ],
    "proximoPaso": "Veremos la prueba chi-cuadrado para variables categóricas.",
    "conceptos": [
      "ab-testing",
      "prueba-dos-proporciones"
    ]
  },
  {
    "id": "m31-l5",
    "moduloId": "modulo-31",
    "motor": "calculo",
    "titulo": "Prueba chi-cuadrado de independencia",
    "objetivo": "Contrastar si dos variables categóricas están asociadas usando una tabla de contingencia y el estadístico chi-cuadrado.",
    "porQueImporta": "«¿La tasa de compra depende del dispositivo?», «¿el canal está asociado a la satisfacción?». La prueba chi-cuadrado responde si la asociación observada en una tabla puede ser azar.",
    "concepto": "Se parte de la **tabla de contingencia** de frecuencias observadas `O`.\n\n1. Bajo `H₀` (las variables son independientes), la frecuencia **esperada** de cada celda es:\n\n   `E = (total de la fila × total de la columna) ÷ total general`\n\n2. Estadístico: `χ² = Σ (O − E)² ÷ E`, sumando todas las celdas.\n3. Grados de libertad: `gl = (filas − 1) × (columnas − 1)`.\n4. p-valor: `=DISTR.CHICUAD.CD(χ²; gl)` (cola derecha).\n\n**Condición**: las frecuencias esperadas deben ser al menos ≈ 5 en (casi) todas las celdas. Chi-cuadrado detecta *asociación*, no causalidad, y no dice qué tan fuerte es.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Compra según dispositivo (300 visitas)",
      "datos": [
        {
          "columnas": [
            "Dispositivo",
            "Compra",
            "No compra",
            "Total"
          ],
          "filas": [
            [
              "Móvil",
              30,
              70,
              100
            ],
            [
              "Escritorio",
              50,
              50,
              100
            ],
            [
              "Tableta",
              40,
              60,
              100
            ],
            [
              "Total",
              120,
              180,
              300
            ]
          ]
        }
      ],
      "pasos": [
        "Esperada de «Móvil, compra» = 100 × 120 ÷ 300 = **40**. Las esperadas son 40 (compra) y 60 (no compra) en las tres filas.",
        "χ² = (30−40)²/40 + (70−60)²/60 + (50−40)²/40 + (50−60)²/60 + (40−40)²/40 + (60−60)²/60 = **8.333**.",
        "gl = (3 − 1)(2 − 1) = 2 → p = DISTR.CHICUAD.CD(8.333; 2) = **0.0155**."
      ],
      "conclusion": "p < 0.05: hay evidencia de asociación entre el dispositivo y la compra (en escritorio se compra más)."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Lectura: ¿dónde está la diferencia?",
      "datos": [
        {
          "columnas": [
            "Dispositivo",
            "Tasa de compra"
          ],
          "filas": [
            [
              "Móvil",
              "30 %"
            ],
            [
              "Escritorio",
              "50 %"
            ],
            [
              "Tableta",
              "40 %"
            ]
          ]
        }
      ],
      "pasos": [
        "Chi-cuadrado dice que hay asociación, no dónde.",
        "Se compara la tasa de compra por fila: escritorio supera a móvil en 20 puntos."
      ],
      "conclusion": "Tras una chi-cuadrado significativa, se miran los porcentajes por fila o se hacen comparaciones específicas."
    },
    "errorFrecuente": {
      "codigo": "«Chi-cuadrado significativo: ser de escritorio causa que se compre más.»",
      "explicacion": "Chi-cuadrado solo prueba asociación. Los usuarios de escritorio pueden tener otro perfil (horario, intención de compra) que explique la diferencia. Para causalidad hace falta un diseño experimental."
    },
    "practicaGuiada": {
      "id": "m31-l5-practica",
      "enunciado": "Satisfacción por canal de atención (100 clientes por canal).",
      "datos": [
        {
          "columnas": [
            "Canal",
            "Satisfecho",
            "No satisfecho",
            "Total"
          ],
          "filas": [
            [
              "Chat",
              45,
              55,
              100
            ],
            [
              "Teléfono",
              30,
              70,
              100
            ],
            [
              "Total",
              75,
              125,
              200
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Esperada de «Chat, satisfecho» (1 decimal)",
          "valor": 37.5
        },
        {
          "tipo": "numero",
          "etiqueta": "χ² (3 decimales)",
          "valor": 4.8
        },
        {
          "tipo": "numero",
          "etiqueta": "Grados de libertad",
          "valor": 1
        },
        {
          "tipo": "numero",
          "etiqueta": "p-valor (4 decimales)",
          "valor": 0.0285,
          "calculo": "=DISTR.CHICUAD.CD(4.800000;1)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con α = 0.05…",
          "opciones": [
            "Hay evidencia de asociación",
            "No hay evidencia de asociación"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "Totales: satisfechos 75, no 125; filas 100 y 100, total 200. E = 100 × 75 ÷ 200 = 37.5.",
        "χ² = 4.800.",
        "gl = (2 − 1)(2 − 1) = 1.",
        "p = 0.0285."
      ],
      "pistas": [
        "Calcula las cuatro esperadas: sale 37.5 y 62.5 en cada fila."
      ]
    },
    "reto": {
      "id": "m31-l5-reto",
      "enunciado": "Aprobación de una política por grupo de edad (50 jóvenes y 50 mayores).",
      "datos": [
        {
          "columnas": [
            "Edad",
            "Aprueba",
            "No aprueba",
            "Total"
          ],
          "filas": [
            [
              "Joven",
              18,
              32,
              50
            ],
            [
              "Mayor",
              30,
              20,
              50
            ],
            [
              "Total",
              48,
              52,
              100
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Esperada de «Joven, aprueba» (1 decimal)",
          "valor": 24.0
        },
        {
          "tipo": "numero",
          "etiqueta": "χ² (3 decimales)",
          "valor": 5.769
        },
        {
          "tipo": "numero",
          "etiqueta": "p-valor (4 decimales)",
          "valor": 0.0163
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con α = 0.05…",
          "opciones": [
            "Hay evidencia de asociación entre edad y aprobación",
            "No hay evidencia"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "Totales: aprueban 48, no 52, total 100. E = 50 × 48 ÷ 100 = 24.0.",
        "χ² = 5.769; gl = 1.",
        "p = 0.0163."
      ],
      "pistas": [
        "Totales por columna: 18 + 30 = 48 y 32 + 20 = 52."
      ]
    },
    "verificacion": [
      {
        "id": "m31-l5-q1",
        "pregunta": "Los grados de libertad de una tabla 3×4 son:",
        "opciones": [
          "12",
          "6",
          "7",
          "3"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "(3 − 1)(4 − 1) = 6."
      },
      {
        "id": "m31-l5-q2",
        "pregunta": "Una chi-cuadrado significativa indica:",
        "opciones": [
          "Causalidad",
          "Asociación entre las variables",
          "Que no hay relación",
          "Que n es pequeño"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Solo asociación."
      }
    ],
    "resumen": [
      "E = fila × columna ÷ total.",
      "χ² = Σ(O − E)²/E; gl = (f−1)(c−1).",
      "Significativa → asociación, no causalidad."
    ],
    "proximoPaso": "Pasamos a regresión y ANOVA.",
    "conceptos": [
      "chi-cuadrado",
      "independencia-categoricas"
    ]
  }
]
