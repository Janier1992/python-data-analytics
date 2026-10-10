import type { Lesson } from '../../types'

export const module22Lessons: Lesson[] = [
  {
    "id": "m22-l1",
    "moduloId": "modulo-22",
    "motor": "calculo",
    "titulo": "Población, muestra y tipos de variables",
    "objetivo": "Distinguir población de muestra y clasificar una variable como cualitativa o cuantitativa, discreta o continua.",
    "porQueImporta": "Todo análisis empieza por saber qué datos tienes y de dónde vienen. Si confundes una muestra con la población, o tratas una etiqueta como si fuera una cantidad, todos los números que calcules después serán engañosos.",
    "concepto": "- **Población**: el conjunto completo de individuos que te interesa estudiar (todos los clientes de una empresa).\n- **Muestra**: un subconjunto de la población que sí puedes observar. Casi siempre trabajamos con muestras, porque estudiar a toda la población es caro, lento o imposible.\n- **Variable**: una característica que se mide en cada individuo (edad, ciudad, ingreso).\n- **Parámetro** y **estadístico**: un número que describe a la población es un *parámetro*; el mismo cálculo hecho con una muestra es un *estadístico* y sirve para estimar el parámetro.\n\nLas variables se clasifican así:\n\n| Tipo | Subtipo | Ejemplos |\n|---|---|---|\n| **Cualitativa** (categorías) | Nominal / ordinal | ciudad, color, nivel educativo |\n| **Cuantitativa** (números con sentido) | Discreta (se cuenta) | número de hijos, productos comprados |\n| | Continua (se mide) | estatura, ingreso, temperatura |\n\nUn número no siempre es una cantidad: un **código postal** o un **número de cédula** son etiquetas. Sumarlos o promediarlos no tiene sentido.\n\nPara clasificar una variable pregúntate dos cosas: ¿**se pueden hacer cuentas con ella** (sumar, promediar) con sentido? Si no, es cualitativa. Y si sí: ¿**se cuenta** (valores enteros separados) o **se mide** (cualquier valor dentro de un intervalo)?",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Clasificar las variables de una encuesta",
      "datos": [
        {
          "columnas": [
            "Cliente",
            "Ciudad",
            "Edad",
            "Hijos",
            "Nivel educativo",
            "Código postal"
          ],
          "filas": [
            [
              "Ana",
              "Cali",
              23,
              0,
              "Profesional",
              760001
            ],
            [
              "Luis",
              "Bogotá",
              31,
              2,
              "Técnico",
              110111
            ],
            [
              "Marta",
              "Cali",
              45,
              3,
              "Bachiller",
              760001
            ]
          ],
          "titulo": "Tres clientes encuestados"
        }
      ],
      "pasos": [
        "**Ciudad**: son nombres, no se puede hacer aritmética con ellos → **cualitativa nominal**.",
        "**Edad**: se mide y puede tomar cualquier valor (23.5 años) → **cuantitativa continua**.",
        "**Hijos**: se cuenta y solo toma valores enteros (0, 1, 2…) → **cuantitativa discreta**.",
        "**Nivel educativo**: son categorías con un orden natural (bachiller < técnico < profesional) → **cualitativa ordinal**.",
        "**Código postal**: aunque son cifras, es una etiqueta; su promedio no significa nada → **cualitativa nominal**."
      ],
      "conclusion": "Antes de calcular cualquier cosa, decide qué tipo de variable tienes: eso determina qué resúmenes y gráficos tienen sentido."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Error de muestreo: la muestra no es la población",
      "datos": [
        {
          "columnas": [
            "Grupo",
            "Edades (años)"
          ],
          "filas": [
            [
              "Población (10 personas)",
              "18, 21, 24, 26, 29, 31, 33, 36, 40, 42"
            ],
            [
              "Muestra (4 personas)",
              "21, 29, 36, 42"
            ]
          ]
        }
      ],
      "pasos": [
        "**Media de la población** (parámetro): suma = 300; 300 ÷ 10 = **30.0** años.",
        "**Media de la muestra** (estadístico): suma = 128; 128 ÷ 4 = **32.0** años.",
        "**Error de muestreo** = |media muestral − media poblacional| = |32.0 − 30.0| = **2.0** años."
      ],
      "conclusion": "La muestra casi nunca da exactamente el valor de la población: esa diferencia se llama error de muestreo, y gran parte de la estadística consiste en medirla y controlarla."
    },
    "errorFrecuente": {
      "codigo": "Código postal promedio de cuatro clientes: (110111 + 760001 + 110111 + 50001) ÷ 4 = 257556\n→ no corresponde a ningún lugar real",
      "explicacion": "El código postal es una etiqueta, no una cantidad: su promedio (257 556) no se refiere a ningún sitio. Que algo esté escrito con cifras no lo vuelve una variable cuantitativa. Pregúntate siempre si sumar o promediar esos valores tiene algún significado."
    },
    "practicaGuiada": {
      "id": "m22-l1-practica",
      "enunciado": "Un laboratorio estudia la edad de **10 empleados** (la población) y toma una **muestra** de 4 de ellos. Calcula la media de cada grupo y el error de muestreo.",
      "datos": [
        {
          "columnas": [
            "Grupo",
            "Edades (años)"
          ],
          "filas": [
            [
              "Población (10 empleados)",
              "18, 21, 24, 26, 29, 31, 33, 36, 40, 42"
            ],
            [
              "Muestra (4 empleados)",
              "21, 29, 36, 42"
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media de la población (años)",
          "valor": 30,
          "calculo": "=PROMEDIO(18;21;24;26;29;31;33;36;40;42)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Media de la muestra (años)",
          "valor": 32,
          "calculo": "=PROMEDIO(21;29;36;42)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Error de muestreo: |media muestral − media poblacional|",
          "valor": 2,
          "calculo": "=ABS(32-30)"
        }
      ],
      "solucion": [
        "Suma de la población: 300. Media = 300 ÷ 10 = 30.",
        "Suma de la muestra: 128. Media = 128 ÷ 4 = 32.",
        "Error de muestreo = |32 − 30| = 2 años."
      ],
      "pistas": [
        "La media es la suma de los valores dividida entre cuántos son.",
        "El error de muestreo es la diferencia (sin signo) entre las dos medias."
      ]
    },
    "reto": {
      "id": "m22-l1-reto",
      "enunciado": "La tabla describe seis variables de una base de clientes. Clasifícalas y cuenta cuántas son cuantitativas.",
      "datos": [
        {
          "columnas": [
            "Variable",
            "Ejemplo de valor"
          ],
          "filas": [
            [
              "Edad",
              "34 años"
            ],
            [
              "Ciudad",
              "Cali"
            ],
            [
              "Código postal",
              "760001"
            ],
            [
              "Ingreso mensual",
              "2.8 millones"
            ],
            [
              "Número de hijos",
              "2"
            ],
            [
              "Talla",
              "M"
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "«Código postal» es una variable…",
          "opciones": [
            "cuantitativa continua",
            "cuantitativa discreta",
            "cualitativa nominal (una etiqueta)",
            "cualitativa ordinal"
          ],
          "correcta": 2
        },
        {
          "tipo": "opcion",
          "etiqueta": "«Número de hijos» es una variable…",
          "opciones": [
            "cuantitativa continua",
            "cuantitativa discreta",
            "cualitativa nominal",
            "cualitativa ordinal"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "«Talla (S, M, L, XL)» es una variable…",
          "opciones": [
            "cuantitativa discreta",
            "cuantitativa continua",
            "cualitativa nominal",
            "cualitativa ordinal"
          ],
          "correcta": 3
        },
        {
          "tipo": "numero",
          "etiqueta": "¿Cuántas de las seis variables son cuantitativas?",
          "valor": 3
        }
      ],
      "solucion": [
        "**Código postal**: etiqueta → cualitativa nominal.",
        "**Número de hijos**: se cuenta → cuantitativa discreta.",
        "**Talla**: categorías con orden → cualitativa ordinal.",
        "Cuantitativas: edad (continua), ingreso (continua) y número de hijos (discreta) → **3**."
      ],
      "pistas": [
        "Pregúntate si tiene sentido sumar o promediar la variable.",
        "Las tallas tienen un orden natural (S < M < L < XL)."
      ]
    },
    "verificacion": [
      {
        "id": "m22-l1-q1",
        "pregunta": "Quieres conocer la opinión de todos los clientes de una tienda, pero encuestas a 200 de ellos. Esos 200 son:",
        "opciones": [
          "La población",
          "Una muestra",
          "Una variable",
          "Un parámetro"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Son un subconjunto de la población completa (todos los clientes): una muestra."
      },
      {
        "id": "m22-l1-q2",
        "pregunta": "¿Qué tipo de variable es el «número de hijos»?",
        "opciones": [
          "Cualitativa nominal",
          "Cuantitativa continua",
          "Cuantitativa discreta",
          "Cualitativa ordinal"
        ],
        "respuestaCorrecta": 2,
        "explicacion": "Se obtiene contando y solo toma valores enteros: es cuantitativa discreta."
      }
    ],
    "resumen": [
      "La población es el total que te interesa; la muestra es la parte que observas.",
      "Las variables pueden ser cualitativas (categorías) o cuantitativas (números con sentido).",
      "Que algo esté escrito con cifras no significa que sea una cantidad."
    ],
    "proximoPaso": "Veremos las escalas de medición, que determinan qué operaciones tienen sentido con cada variable.",
    "conceptos": [
      "poblacion-muestra",
      "tipos-de-variable"
    ]
  },
  {
    "id": "m22-l2",
    "moduloId": "modulo-22",
    "motor": "calculo",
    "titulo": "Escalas de medición: nominal, ordinal, de intervalo y de razón",
    "objetivo": "Identificar la escala de una variable y saber qué cálculos estadísticos son válidos en cada una.",
    "porQueImporta": "La escala decide qué puedes calcular. Promediar colores o decir que 20 °C es «el doble» de 10 °C son errores muy comunes que llevan a conclusiones falsas.",
    "concepto": "Existen cuatro escalas, de menos a más información:\n\n| Escala | Qué permite | Ejemplos | Resumen válido |\n|---|---|---|---|\n| **Nominal** | Solo distinguir categorías | color, ciudad | moda |\n| **Ordinal** | Distinguir y ordenar | talla S/M/L, nivel de satisfacción | moda, mediana |\n| **De intervalo** | Ordenar y medir diferencias; el cero es arbitrario | temperatura en °C, año | media, desviación |\n| **De razón** | Todo lo anterior y el cero es real | edad, ingreso, peso | todo, incluidas proporciones |\n\nCada escala incluye las posibilidades de la anterior. Dos ideas para no equivocarse:\n\n- En una escala **ordinal** se puede ordenar, pero **no se puede medir la distancia** entre categorías: la diferencia entre «malo» y «regular» no tiene por qué ser igual a la que hay entre «bueno» y «excelente». Por eso no se promedia: se usa la **mediana** y la **moda**.\n- Solo en una escala **de razón** (cero absoluto, que significa «nada») tienen sentido las frases «el doble de» o «la mitad de».",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "¿Qué escala tiene cada variable?",
      "datos": [
        {
          "columnas": [
            "Variable",
            "Ejemplo",
            "Escala",
            "Por qué"
          ],
          "filas": [
            [
              "Color de ojos",
              "café",
              "Nominal",
              "Solo distingue categorías"
            ],
            [
              "Nivel de satisfacción",
              "bueno",
              "Ordinal",
              "Hay orden, pero no distancias iguales"
            ],
            [
              "Temperatura (°C)",
              "20",
              "Intervalo",
              "Mide diferencias; el 0 °C es arbitrario"
            ],
            [
              "Ingreso mensual",
              "2.8 millones",
              "Razón",
              "El cero significa «sin ingreso»"
            ]
          ]
        }
      ],
      "pasos": [
        "Pregunta 1: ¿las categorías tienen orden? Si no → **nominal**.",
        "Pregunta 2: ¿la diferencia entre valores es medible y constante? Si no → **ordinal**.",
        "Pregunta 3: ¿el cero significa «ausencia total»? Si no → **intervalo**; si sí → **razón**."
      ],
      "conclusion": "Con la escala sabes qué resumen es válido: moda (nominal), mediana (ordinal), media (intervalo y razón)."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "¿20 °C es el doble de 10 °C?",
      "pasos": [
        "La temperatura en °C es de **intervalo**: su cero es arbitrario (el punto de congelación del agua).",
        "Para comparar proporciones hay que pasar a una escala de razón, los **kelvin**: K = °C + 273.15.",
        "10 °C = 283.15 K y 20 °C = 293.15 K.",
        "Proporción real: 293.15 ÷ 283.15 = **1.035**, es decir, solo un 3.5 % más de energía térmica, no el doble."
      ],
      "conclusion": "Las proporciones («el doble», «la mitad») solo son válidas en escala de razón."
    },
    "errorFrecuente": {
      "codigo": "Hoy hace 20 °C y ayer hacía 10 °C → «hoy hace el doble de calor».",
      "explicacion": "La temperatura en °C es una escala de intervalo: su cero es arbitrario, así que no se pueden hacer proporciones. 20 °C no es «el doble» de 10 °C: en kelvin (escala de razón) serían 293.15 K y 283.15 K, apenas un 3.5 % más."
    },
    "practicaGuiada": {
      "id": "m22-l2-practica",
      "enunciado": "Clasifica cada variable por su escala de medición.",
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "«Ciudad de residencia»",
          "opciones": [
            "Nominal",
            "Ordinal",
            "De intervalo",
            "De razón"
          ],
          "correcta": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "«Estrato socioeconómico (1 a 6)»",
          "opciones": [
            "Nominal",
            "Ordinal",
            "De intervalo",
            "De razón"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "«Año de nacimiento»",
          "opciones": [
            "Nominal",
            "Ordinal",
            "De intervalo",
            "De razón"
          ],
          "correcta": 2
        },
        {
          "tipo": "opcion",
          "etiqueta": "«Peso en kilogramos»",
          "opciones": [
            "Nominal",
            "Ordinal",
            "De intervalo",
            "De razón"
          ],
          "correcta": 3
        }
      ],
      "solucion": [
        "**Ciudad**: solo distingue categorías → nominal.",
        "**Estrato**: hay orden (1 < 2 < … < 6), pero la distancia entre estratos no es medible → ordinal.",
        "**Año de nacimiento**: se pueden medir diferencias (años), pero el año 0 no significa «sin tiempo» → intervalo.",
        "**Peso**: el 0 kg significa ausencia de peso → razón."
      ],
      "pistas": [
        "Pregunta primero si hay orden, luego si hay distancias medibles y por último si el cero es real."
      ]
    },
    "reto": {
      "id": "m22-l2-reto",
      "enunciado": "Nueve clientes calificaron el servicio como **malo < regular < bueno < excelente** (escala ordinal). Analiza las respuestas.",
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
            "9"
          ],
          "filas": [
            [
              "Respuesta",
              "regular",
              "bueno",
              "malo",
              "bueno",
              "excelente",
              "bueno",
              "regular",
              "malo",
              "bueno"
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "¿Cuántos clientes respondieron «bueno»?",
          "valor": 4
        },
        {
          "tipo": "numero",
          "etiqueta": "¿Qué porcentaje de los clientes respondió «bueno»? (1 decimal)",
          "valor": 44.4,
          "calculo": "=REDONDEAR(4/9*100;1)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "La **mediana** de las respuestas (la del cliente que queda en el centro al ordenarlas de peor a mejor) es…",
          "opciones": [
            "malo",
            "regular",
            "bueno",
            "excelente"
          ],
          "correcta": 2
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Por qué no se calcula la **media** de estas respuestas?",
          "opciones": [
            "Porque son pocas",
            "Porque la distancia entre categorías ordinales no es medible",
            "Porque son números",
            "Sí se puede calcular siempre"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Cuenta los «bueno»: cuatro de nueve clientes.",
        "Porcentaje: 4 ÷ 9 × 100 = 44.4 %.",
        "Ordenadas: malo, malo, regular, regular, bueno, bueno, bueno, bueno, excelente. Con 9 datos, la mediana es el quinto: **bueno**.",
        "La media exigiría que la distancia «malo → regular» fuera igual a «bueno → excelente», y eso no se puede afirmar en una escala ordinal."
      ],
      "pistas": [
        "Para la mediana ordena primero las nueve respuestas del peor nivel al mejor.",
        "Con 9 datos, la mediana ocupa la posición (9 + 1) ÷ 2 = 5."
      ]
    },
    "verificacion": [
      {
        "id": "m22-l2-q1",
        "pregunta": "¿Qué escala tiene «nivel de satisfacción: bajo, medio, alto»?",
        "opciones": [
          "Nominal",
          "Ordinal",
          "De intervalo",
          "De razón"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Las categorías tienen un orden, pero la distancia entre ellas no se puede medir: es ordinal."
      },
      {
        "id": "m22-l2-q2",
        "pregunta": "¿Por qué no tiene sentido decir que 20 °C es el doble de 10 °C?",
        "opciones": [
          "Porque la temperatura es cualitativa",
          "Porque el cero de los °C es arbitrario (escala de intervalo)",
          "Porque 20 no es múltiplo de 10",
          "Sí tiene sentido"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "En una escala de intervalo el cero no significa «ausencia», así que las proporciones no son válidas."
      }
    ],
    "resumen": [
      "Nominal: solo distingue; ordinal: además ordena.",
      "Intervalo: mide diferencias, pero el cero es arbitrario; razón: el cero es real.",
      "La escala decide qué resumen es válido: moda, mediana o media."
    ],
    "proximoPaso": "Ahora resumiremos variables con tablas de frecuencia.",
    "conceptos": [
      "escalas-de-medicion"
    ]
  },
  {
    "id": "m22-l3",
    "moduloId": "modulo-22",
    "motor": "calculo",
    "titulo": "Tablas de frecuencia",
    "objetivo": "Construir tablas de frecuencia absoluta, relativa y acumulada e interpretarlas.",
    "porQueImporta": "Una tabla de frecuencias es el primer resumen que se hace de cualquier variable: te dice qué valores existen, cuáles dominan y cuáles son raros, sin mirar fila por fila.",
    "concepto": "Para cada valor de una variable se calcula:\n\n- **Frecuencia absoluta** (f): cuántas veces aparece.\n- **Frecuencia relativa** (fr): la proporción sobre el total, `fr = f ÷ n`. Suma 1 (o 100 %).\n- **Frecuencia acumulada**: la suma progresiva de las frecuencias (absolutas o relativas) siguiendo el orden de la tabla.\n\nProcedimiento para construir la tabla:\n\n1. Lista los valores distintos de la variable.\n2. **Cuenta** cuántas veces aparece cada uno (frecuencia absoluta); la suma debe dar `n`.\n3. Divide cada frecuencia entre `n` (frecuencia relativa); la suma debe dar 1.\n4. Acumula de arriba abajo.\n\n**Orden**: si la variable es nominal, es habitual ordenar de mayor a menor frecuencia; si es ordinal o numérica, se respeta su orden natural (1, 2, 3, 4, 5 estrellas).",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Colores de 5 camisetas vendidas: rojo, azul, rojo, verde, rojo",
      "datos": [
        {
          "columnas": [
            "Color",
            "Frecuencia absoluta",
            "Frecuencia relativa"
          ],
          "filas": [
            [
              "rojo",
              3,
              0.6
            ],
            [
              "azul",
              1,
              0.2
            ],
            [
              "verde",
              1,
              0.2
            ],
            [
              "Total",
              5,
              1.0
            ]
          ]
        }
      ],
      "pasos": [
        "Cuenta: rojo aparece 3 veces, azul 1 y verde 1. Total: 3 + 1 + 1 = 5.",
        "Frecuencias relativas: 3 ÷ 5 = 0.6; 1 ÷ 5 = 0.2; 1 ÷ 5 = 0.2.",
        "Comprobación: las relativas suman 1."
      ],
      "conclusion": "El rojo concentra el 60 % de las ventas."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Canal por el que se hizo cada una de 10 ventas",
      "datos": [
        {
          "columnas": [
            "Canal",
            "Absoluta",
            "Relativa",
            "Relativa acumulada"
          ],
          "filas": [
            [
              "web",
              5,
              0.5,
              0.5
            ],
            [
              "tienda",
              3,
              0.3,
              0.8
            ],
            [
              "app",
              2,
              0.2,
              1.0
            ],
            [
              "Total",
              10,
              1.0,
              ""
            ]
          ],
          "nota": "Ordenados de mayor a menor frecuencia."
        }
      ],
      "graficos": [
        {
          "tipo": "barras",
          "categorias": [
            "web",
            "tienda",
            "app"
          ],
          "valores": [
            5,
            3,
            2
          ],
          "titulo": "Ventas por canal",
          "etiquetaY": "Ventas"
        }
      ],
      "pasos": [
        "Registros: web, tienda, web, app, web, tienda, web, app, web, tienda (n = 10).",
        "Conteo: web 5, tienda 3, app 2.",
        "Relativas: 5 ÷ 10 = 0.5; 3 ÷ 10 = 0.3; 2 ÷ 10 = 0.2.",
        "Acumuladas: 0.5; 0.5 + 0.3 = 0.8; 0.8 + 0.2 = 1.0."
      ],
      "conclusion": "Web y tienda juntos concentran el 80 % de las ventas."
    },
    "errorFrecuente": {
      "codigo": "Calificaciones de 1 a 5 estrellas ordenadas por frecuencia: 5★, 4★, 3★, 1★, 2★ …",
      "explicacion": "Ordenar por frecuencia mezcla las estrellas (5, 4, 3, 1, 2) y se pierde la lectura natural de la variable. Cuando la variable tiene un orden natural (estrellas, edades, tallas), la tabla debe respetarlo: 1, 2, 3, 4, 5."
    },
    "practicaGuiada": {
      "id": "m22-l3-practica",
      "enunciado": "Se registró la ciudad de origen de 8 clientes. Construye la tabla de frecuencias de «Bogotá».",
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
            "8"
          ],
          "filas": [
            [
              "Ciudad",
              "Bogotá",
              "Cali",
              "Bogotá",
              "Medellín",
              "Cali",
              "Bogotá",
              "Medellín",
              "Barranquilla"
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Frecuencia absoluta de «Bogotá»",
          "valor": 3
        },
        {
          "tipo": "numero",
          "etiqueta": "Frecuencia relativa de «Bogotá» (3 decimales)",
          "valor": 0.375,
          "calculo": "=3/8"
        },
        {
          "tipo": "numero",
          "etiqueta": "Porcentaje de clientes que **no** son de Bogotá",
          "valor": 62.5,
          "calculo": "=(8-3)/8*100"
        }
      ],
      "solucion": [
        "Bogotá aparece 3 veces (posiciones 1, 3 y 6).",
        "Frecuencia relativa = 3 ÷ 8 = 0.375.",
        "No son de Bogotá 8 − 3 = 5 clientes: 5 ÷ 8 = 0.625 → 62.5 %."
      ],
      "pistas": [
        "Cuenta cuántas veces aparece «Bogotá» en la lista.",
        "La frecuencia relativa es la frecuencia absoluta dividida entre el total (8)."
      ]
    },
    "reto": {
      "id": "m22-l3-reto",
      "enunciado": "Con las 10 ventas por canal (web 5, tienda 3, app 2) responde.",
      "datos": [
        {
          "columnas": [
            "Canal",
            "Absoluta"
          ],
          "filas": [
            [
              "web",
              5
            ],
            [
              "tienda",
              3
            ],
            [
              "app",
              2
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Frecuencia relativa acumulada de los **dos canales principales** (web y tienda)",
          "valor": 0.8,
          "calculo": "=(5+3)/10"
        },
        {
          "tipo": "numero",
          "etiqueta": "Porcentaje de ventas del canal «app»",
          "valor": 20,
          "calculo": "=2/10*100"
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué significa que la frecuencia relativa acumulada de «tienda» sea 0.8?",
          "opciones": [
            "Que tienda vendió el 80 % del total",
            "Que web y tienda juntos suman el 80 % de las ventas",
            "Que hubo 8 ventas por tienda",
            "Que la app vendió el 80 %"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Acumulada de tienda = 0.5 (web) + 0.3 (tienda) = 0.8.",
        "App: 2 ÷ 10 = 0.2 → 20 %.",
        "La acumulada suma las frecuencias desde el primer valor hasta ese: web + tienda = 80 %."
      ],
      "pistas": [
        "Acumular es sumar las frecuencias relativas de arriba hacia abajo."
      ]
    },
    "verificacion": [
      {
        "id": "m22-l3-q1",
        "pregunta": "Si un valor aparece 15 veces en 60 registros, su frecuencia relativa es:",
        "opciones": [
          "15",
          "0.15",
          "0.25",
          "4"
        ],
        "respuestaCorrecta": 2,
        "explicacion": "15 / 60 = 0.25, es decir, el 25 %."
      },
      {
        "id": "m22-l3-q2",
        "pregunta": "¿Qué indica la frecuencia acumulada?",
        "opciones": [
          "Cuántas veces aparece un valor",
          "La suma progresiva de las frecuencias hasta ese valor",
          "El valor más repetido",
          "El promedio"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Acumula las frecuencias de arriba abajo; la última vale el total (o 1 si es relativa)."
      }
    ],
    "resumen": [
      "Absoluta = conteo; relativa = proporción; acumulada = suma progresiva.",
      "Las relativas suman 1 (100 %); las absolutas suman n.",
      "Respeta el orden natural de la variable cuando exista."
    ],
    "proximoPaso": "Pasaremos de contar categorías a resumir números con la media, la mediana y la moda.",
    "conceptos": [
      "tabla-de-frecuencias",
      "frecuencia-relativa"
    ]
  },
  {
    "id": "m22-l4",
    "moduloId": "modulo-22",
    "motor": "calculo",
    "titulo": "Medidas de tendencia central: media, mediana y moda",
    "objetivo": "Calcular la media, la mediana, la moda y la media ponderada, e interpretar qué representa cada una.",
    "porQueImporta": "Cuando alguien pide «el valor típico» de un conjunto de datos, hay tres respuestas posibles. Saber cuál usar y cuándo es la base de casi todo informe descriptivo.",
    "concepto": "- **Media** (x̄): suma de los valores dividida entre cuántos son, `x̄ = Σx ÷ n`. Usa toda la información, pero se deja arrastrar por valores extremos.\n- **Mediana**: el valor central al **ordenar** los datos. Si `n` es impar es el dato de la posición `(n + 1) ÷ 2`; si `n` es par es el promedio de los dos datos centrales.\n- **Moda**: el valor que más se repite. Es la única que sirve también para categorías, y puede haber varias (o ninguna).\n- **Media ponderada**: cada valor pesa distinto, `Σ(x·peso) ÷ Σ(pesos)`. Por ejemplo, las notas de un curso donde cada examen vale un porcentaje distinto.\n\nConviene calcular las tres: cuando difieren mucho, los datos tienen valores extremos o una forma asimétrica (lo veremos en la próxima lección).",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Datos: 2, 3, 3, 4, 8, 9, 10",
      "pasos": [
        "**Media**: suma = 39; 39 ÷ 7 = **5.57**.",
        "**Mediana**: los datos ya están ordenados. Con n = 7 la mediana es el dato de la posición (7 + 1) ÷ 2 = 4 → **4**.",
        "**Moda**: el 3 aparece dos veces y los demás una → **3**."
      ],
      "conclusion": "La media (5.57) es mayor que la mediana (4): los valores altos (8, 9, 10) la empujan hacia arriba."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Media ponderada: la nota final de un curso",
      "datos": [
        {
          "columnas": [
            "Examen",
            "Nota",
            "Peso"
          ],
          "filas": [
            [
              "Parcial 1",
              4.0,
              "20 %"
            ],
            [
              "Parcial 2",
              3.0,
              "30 %"
            ],
            [
              "Examen final",
              5.0,
              "50 %"
            ]
          ]
        }
      ],
      "pasos": [
        "Media simple: (4.0 + 3.0 + 5.0) ÷ 3 = **4.0**.",
        "Media ponderada: 4.0 × 0.2 + 3.0 × 0.3 + 5.0 × 0.5 = 0.8 + 0.9 + 2.5 = **4.2**."
      ],
      "conclusion": "La ponderada sube a 4.2 porque la nota más alta pertenece al examen que más pesa."
    },
    "errorFrecuente": {
      "codigo": "Datos: 20, 22, 22, 30, 30 → «la moda es 22».",
      "explicacion": "Hay dos modas: el 22 y el 30 (ambos aparecen dos veces). Afirmar que la moda es una sola oculta información. Cuando varios valores empatan se dice que la distribución es bimodal (o multimodal)."
    },
    "practicaGuiada": {
      "id": "m22-l4-practica",
      "enunciado": "Calcula las tres medidas de tendencia central de estos siete datos.",
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
            "7"
          ],
          "filas": [
            [
              "Valor",
              3,
              5,
              5,
              7,
              8,
              9,
              15
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media (2 decimales)",
          "valor": 7.43,
          "calculo": "=REDONDEAR(PROMEDIO(3;5;5;7;8;9;15);2)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Mediana",
          "valor": 7,
          "calculo": "=MEDIANA(3;5;5;7;8;9;15)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Moda",
          "valor": 5
        }
      ],
      "solucion": [
        "Suma = 52; media = 52 ÷ 7 = 7.4286 ≈ **7.43**.",
        "Datos ordenados (ya lo están). Con n = 7, la mediana es el dato 4 → **7**.",
        "El 5 aparece dos veces; los demás una → **5**."
      ],
      "pistas": [
        "Suma los siete datos y divide entre 7.",
        "La mediana es el dato del medio de la lista ordenada (el 4.º)."
      ]
    },
    "reto": {
      "id": "m22-l4-reto",
      "enunciado": "Un estudiante sacó 4.0, 3.0 y 5.0 en tres pruebas que pesan 20 %, 30 % y 50 %. Compara.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Nota final **ponderada** (1 decimal)",
          "valor": 4.2,
          "calculo": "=4*0.2+3*0.3+5*0.5"
        },
        {
          "tipo": "numero",
          "etiqueta": "Promedio simple de las tres notas",
          "valor": 4.0
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Cuál refleja mejor su desempeño real en el curso?",
          "opciones": [
            "El promedio simple",
            "La media ponderada, porque las pruebas pesan distinto",
            "La moda",
            "Ninguna"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Ponderada: 4.0·0.2 + 3.0·0.3 + 5.0·0.5 = 0.8 + 0.9 + 2.5 = 4.2.",
        "Simple: (4 + 3 + 5) ÷ 3 = 4.0.",
        "La ponderada respeta la importancia de cada prueba."
      ],
      "pistas": [
        "Multiplica cada nota por su peso (como proporción: 20 % = 0.2) y suma."
      ]
    },
    "verificacion": [
      {
        "id": "m22-l4-q1",
        "pregunta": "¿Cuál de estas medidas sirve también para variables cualitativas?",
        "opciones": [
          "La media",
          "La mediana",
          "La moda",
          "Ninguna"
        ],
        "respuestaCorrecta": 2,
        "explicacion": "La moda solo requiere contar repeticiones, así que funciona con categorías."
      },
      {
        "id": "m22-l4-q2",
        "pregunta": "Un estudiante saca 5.0 en un examen de 70 % y 2.0 en uno de 30 %. Su nota final correcta es:",
        "opciones": [
          "3.5, el promedio simple",
          "4.1, la media ponderada",
          "2.0",
          "5.0"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "5.0·0.7 + 2.0·0.3 = 4.1. El promedio simple ignoraría que los exámenes pesan distinto."
      }
    ],
    "resumen": [
      "Media: usa todos los datos, pero es sensible a extremos.",
      "Mediana: el valor central; resistente a extremos.",
      "Moda: el más frecuente; puede haber varias.",
      "La media ponderada da más peso a lo que más importa."
    ],
    "proximoPaso": "Veremos cómo decidir cuál medida usar según la forma de los datos.",
    "conceptos": [
      "media",
      "mediana",
      "moda",
      "media-ponderada"
    ]
  },
  {
    "id": "m22-l5",
    "moduloId": "modulo-22",
    "motor": "calculo",
    "titulo": "Elegir la medida adecuada: simetría y sesgo",
    "objetivo": "Usar la relación entre media y mediana, y el coeficiente de asimetría de Pearson, para decidir qué medida describe mejor una variable.",
    "porQueImporta": "Los ingresos, los precios de las viviendas y los tiempos de espera casi nunca son simétricos. Reportar la media en esos casos es una de las formas más comunes de mentir con datos sin querer.",
    "concepto": "Cuando los datos son **simétricos**, media y mediana coinciden aproximadamente y cualquiera sirve.\n\nCuando hay **sesgo**:\n\n- **Sesgo a la derecha** (cola larga hacia valores altos): media > mediana. Típico de ingresos y precios.\n- **Sesgo a la izquierda** (cola larga hacia valores bajos): media < mediana.\n\nEl **coeficiente de asimetría de Pearson** resume esto en un número:\n\n`Asimetría = 3 × (media − mediana) ÷ s`\n\ndonde `s` es la desviación estándar de la muestra. Cerca de 0 → simétrica; positivo → sesgo a la derecha; negativo → sesgo a la izquierda. Una regla práctica: si el valor absoluto supera **0.5**, la **mediana** representa mejor el caso típico. En distribuciones con sesgo marcado, informa **ambas**.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Seis sueldos y un directivo",
      "datos": [
        {
          "columnas": [
            "Persona",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6"
          ],
          "filas": [
            [
              "Sueldo (millones)",
              2.0,
              2.2,
              2.1,
              2.4,
              2.3,
              15.0
            ]
          ]
        }
      ],
      "graficos": [
        {
          "tipo": "caja",
          "datos": [
            2.0,
            2.2,
            2.1,
            2.4,
            2.3,
            15.0
          ],
          "titulo": "Sueldos (millones): un valor muy alto",
          "etiquetaX": "Millones"
        }
      ],
      "pasos": [
        "**Media**: (2.0 + 2.2 + 2.1 + 2.4 + 2.3 + 15.0) ÷ 6 = 26.0 ÷ 6 = **4.33**.",
        "Mediana: ordenados 2.0, 2.1, 2.2, 2.3, 2.4, 15.0; con n = 6 se promedian los dos centrales: (2.2 + 2.3) ÷ 2 = **2.25**.",
        "La media (4.33) es casi el doble que la mediana (2.25): el 15.0 la arrastra."
      ],
      "conclusion": "Cinco de seis personas ganan entre 2.0 y 2.4: la mediana describe al caso típico; la media, no."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Pearson con ingresos de siete hogares",
      "datos": [
        {
          "columnas": [
            "Hogar",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7"
          ],
          "filas": [
            [
              "Ingreso (millones)",
              1.8,
              2.0,
              2.1,
              2.2,
              2.4,
              2.5,
              12.0
            ]
          ]
        }
      ],
      "pasos": [
        "Media = 25.0 ÷ 7 = **3.57**; mediana (4.º dato) = **2.2**.",
        "Desviación estándar de la muestra: s = **3.72** (se obtiene con la calculadora o con la fórmula de la próxima unidad).",
        "Asimetría = 3 × (3.57 − 2.2) ÷ 3.72 = **1.10**.",
        "Como 1.10 > 0.5 y es positivo: sesgo a la derecha → conviene reportar la mediana."
      ],
      "conclusion": "La diferencia media − mediana es una alarma rápida; el coeficiente de Pearson la convierte en un número comparable."
    },
    "errorFrecuente": {
      "codigo": "Ingresos de 7 hogares (1.8, 2.0, 2.1, 2.2, 2.4, 2.5 y 12.0 millones). «El ingreso típico es 3.57 millones».",
      "explicacion": "La media (3.57) queda muy por encima de lo que gana casi todo el grupo, porque el valor 12.0 la arrastra. Con sesgo a la derecha, la mediana (2.2) describe mejor al caso típico. Comparar ambas es la forma más rápida de detectarlo."
    },
    "practicaGuiada": {
      "id": "m22-l5-practica",
      "enunciado": "Siete empleados de una empresa ganan (en millones) lo que muestra la tabla.",
      "datos": [
        {
          "columnas": [
            "Empleado",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7"
          ],
          "filas": [
            [
              "Sueldo (millones)",
              2.0,
              2.2,
              2.1,
              2.4,
              2.3,
              2.2,
              15.0
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Media (2 decimales)",
          "valor": 4.03,
          "calculo": "=REDONDEAR(PROMEDIO(2.0;2.2;2.1;2.4;2.3;2.2;15.0);2)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Mediana",
          "valor": 2.2,
          "calculo": "=MEDIANA(2.0;2.2;2.1;2.4;2.3;2.2;15.0)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Diferencia media − mediana (2 decimales)",
          "valor": 1.83
        },
        {
          "tipo": "opcion",
          "etiqueta": "La distribución tiene…",
          "opciones": [
            "sesgo a la izquierda",
            "sesgo a la derecha",
            "simetría perfecta"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Suma = 28.2; media = 28.2 ÷ 7 = 4.0286 ≈ **4.03**.",
        "Ordenados: 2.0, 2.1, 2.2, 2.2, 2.3, 2.4, 15.0; el 4.º dato es **2.2**.",
        "Diferencia = 4.03 − 2.2 = **1.83**.",
        "Media > mediana por mucho: cola larga hacia valores altos → sesgo a la derecha."
      ],
      "pistas": [
        "Ordena los datos para hallar la mediana (el 4.º de 7).",
        "Si la media supera a la mediana, hay sesgo a la derecha."
      ]
    },
    "reto": {
      "id": "m22-l5-reto",
      "enunciado": "Aplica la regla de Pearson (3 × (media − mediana) ÷ s; si |valor| > 0.5 se prefiere la mediana). Para las edades: media = 31.0, mediana = 31.0, s = 1.31. Para los sueldos: media = 4.03, mediana = 2.2, s = 4.84.",
      "datos": [
        {
          "columnas": [
            "Variable",
            "Datos"
          ],
          "filas": [
            [
              "Edades",
              "30, 32, 31, 33, 29, 31, 30, 32"
            ],
            [
              "Sueldos (millones)",
              "2.0, 2.2, 2.1, 2.4, 2.3, 2.2, 15.0"
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Coeficiente de Pearson de las **edades**",
          "valor": 0.0
        },
        {
          "tipo": "numero",
          "etiqueta": "Coeficiente de Pearson de los **sueldos** (2 decimales)",
          "valor": 1.13,
          "calculo": "=REDONDEAR(3*(4.0285714286-2.2)/4.8396674423;2)",
          "tolerancia": 0.03
        },
        {
          "tipo": "opcion",
          "etiqueta": "Para describir las **edades** conviene…",
          "opciones": [
            "la media",
            "la mediana"
          ],
          "correcta": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "Para describir los **sueldos** conviene…",
          "opciones": [
            "la media",
            "la mediana"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Edades: 3 × (31.0 − 31.0) ÷ 1.31 = **0.00** → simétricas → media (o mediana).",
        "Sueldos: 3 × (4.03 − 2.2) ÷ 4.84 = **1.13** > 0.5 → sesgo a la derecha → mediana."
      ],
      "pistas": [
        "Sustituye los valores en 3 × (media − mediana) ÷ s.",
        "Compara el valor absoluto del resultado con 0.5."
      ]
    },
    "verificacion": [
      {
        "id": "m22-l5-q1",
        "pregunta": "Si la media es mucho mayor que la mediana, la distribución probablemente tiene:",
        "opciones": [
          "Sesgo a la izquierda",
          "Sesgo a la derecha",
          "Simetría perfecta",
          "Ninguna cola"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Valores altos extremos arrastran la media hacia arriba: sesgo a la derecha."
      },
      {
        "id": "m22-l5-q2",
        "pregunta": "Para describir el salario típico de una empresa con unos pocos sueldos muy altos conviene:",
        "opciones": [
          "La media",
          "La mediana",
          "El máximo",
          "La suma"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La mediana no se deja arrastrar por los sueldos extremos."
      }
    ],
    "resumen": [
      "Media ≈ mediana indica simetría; media > mediana indica sesgo a la derecha.",
      "El coeficiente de Pearson, 3 × (media − mediana) ÷ s, resume la asimetría en un número.",
      "Con sesgo marcado, usa la mediana o informa ambas medidas."
    ],
    "proximoPaso": "En el siguiente módulo medimos cuánto se dispersan los datos alrededor de su centro.",
    "conceptos": [
      "asimetria-sesgo",
      "eleccion-de-medida"
    ]
  }
]
