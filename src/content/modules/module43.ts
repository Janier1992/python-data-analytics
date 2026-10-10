import type { Lesson } from '../../types'

export const module43Lessons: Lesson[] = [
  {
    "id": "m43-l1",
    "moduloId": "modulo-43",
    "motor": "calculo",
    "titulo": "Elegir el gráfico según la pregunta",
    "objetivo": "Relacionar cada tipo de pregunta (comparar, evolución, distribución, relación, composición) con el visual de Power BI que mejor la responde.",
    "porQueImporta": "La mayoría de los gráficos malos no fallan por estética sino por haber elegido el tipo equivocado para la pregunta. Elegir bien convierte un dato en un mensaje que se entiende en segundos.",
    "concepto": "> **Nota**: Power BI Desktop (gratuito, solo para Windows) no se ejecuta en el navegador de este curso. Aquí ves cómo se ve cada paso en la herramienta y practicas con ejercicios de cálculo y de criterio que se corrigen solos. Para repetirlo de verdad, usa los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv) en Power BI Desktop.\n\nAntes de arrastrar un campo al lienzo, formula **la pregunta** que el visual debe responder. Cada tipo de pregunta tiene un visual natural en el panel *Visualizaciones* de Power BI:\n\n- **Comparar categorías** («¿qué producto vende más?»): **gráfico de barras** (horizontales si los nombres son largos), ordenadas de mayor a menor.\n- **Evolución en el tiempo** («¿cómo cambian las ventas mes a mes?»): **gráfico de líneas** (o de columnas si son pocos periodos).\n- **Distribución** («¿cómo se reparten los precios o las edades?»): **histograma** (en Power BI se construye agrupando un campo en intervalos) o diagrama de caja.\n- **Relación entre dos variables numéricas** («¿más publicidad implica más ventas?»): **gráfico de dispersión**.\n- **Composición** («¿qué parte del total aporta cada categoría?»): **barras apiladas** o 100 % apiladas. El gráfico circular o de anillos solo sirve con pocas partes (hasta unas 4 o 5) y una diferencia clara entre ellas.\n- **Cifras clave** (un valor): **tarjeta**. **Valores exactos y desgloses**: **tabla o matriz**.\n\nReglas rápidas:\n\n- Un visual, una pregunta. Si necesitas explicar qué se ve, probablemente es demasiado complejo.\n- La tabla sirve para consultar valores exactos y el gráfico para ver patrones.\n- Evita los efectos 3D y la decoración: distorsionan la percepción de las cantidades.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Mismos datos, dos preguntas, dos visuales",
      "pantallas": [
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "barras",
              "titulo": "Ingreso por categoría (miles)",
              "categorias": [
                "Tecnología",
                "Accesorios",
                "Audio",
                "Hogar",
                "Otros"
              ],
              "valores": [
                540,
                210,
                150,
                60,
                40
              ]
            },
            {
              "tipo": "lineas",
              "titulo": "Ingreso mensual (miles)",
              "etiquetas": [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun"
              ],
              "series": [
                {
                  "nombre": "2024",
                  "valores": [
                    310,
                    295,
                    340,
                    372,
                    365,
                    410
                  ]
                }
              ]
            }
          ],
          "pagina": "Resumen"
        }
      ],
      "pasos": [
        "**Pregunta 1**: «¿qué categoría aporta más ingreso?» compara categorías → **barras** ordenadas de mayor a menor (Tecnología destaca).",
        "**Pregunta 2**: «¿cómo evolucionó el ingreso en el semestre?» es una serie en el tiempo → **líneas** (sube, con una pequeña caída en febrero y mayo).",
        "El tipo de visual no depende de los datos sino de **la pregunta** que se quiere responder."
      ],
      "conclusion": "Primero la pregunta, después el visual."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Guía rápida de elección",
      "datos": [
        {
          "columnas": [
            "Pregunta del negocio",
            "Tipo de pregunta",
            "Visual recomendado"
          ],
          "filas": [
            [
              "¿Qué región vende más?",
              "Comparar categorías",
              "Barras ordenadas"
            ],
            [
              "¿Cómo van las ventas por mes?",
              "Evolución",
              "Líneas"
            ],
            [
              "¿Cómo se reparte el precio de los productos?",
              "Distribución",
              "Histograma"
            ],
            [
              "¿El gasto en anuncios se asocia con las ventas?",
              "Relación",
              "Dispersión"
            ],
            [
              "¿Qué parte del total aporta cada categoría?",
              "Composición",
              "Barras apiladas 100 %"
            ]
          ]
        }
      ],
      "pasos": [
        "Redactar la pregunta antes de construir el visual evita probar tipos al azar.",
        "Si dos preguntas distintas necesitan el mismo visual, probablemente sea la misma pregunta."
      ],
      "conclusion": "Una tabla como esta, pegada al borrador del informe, ahorra mucho tiempo de revisión."
    },
    "errorFrecuente": {
      "codigo": "Gráfico circular con 8 porciones de tamaños parecidos para «comparar categorías».",
      "explicacion": "El ojo humano compara mal los ángulos y las áreas; compara mucho mejor longitudes alineadas. Con muchas porciones o valores parecidos no se ve quién es mayor. Las barras ordenadas responden la misma pregunta con mucha más claridad."
    },
    "practicaGuiada": {
      "id": "m43-l1-practica",
      "enunciado": "Para cada pregunta de negocio elige el visual más adecuado.",
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "«¿Cómo han cambiado las ventas mes a mes durante dos años?»",
          "opciones": [
            "Barras ordenadas",
            "Líneas",
            "Histograma",
            "Dispersión"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "«¿Cómo se reparten las edades de los clientes?»",
          "opciones": [
            "Barras ordenadas",
            "Líneas",
            "Histograma",
            "Dispersión"
          ],
          "correcta": 2
        },
        {
          "tipo": "opcion",
          "etiqueta": "«¿Los clientes que gastan más en publicidad también venden más?»",
          "opciones": [
            "Barras ordenadas",
            "Líneas",
            "Histograma",
            "Dispersión"
          ],
          "correcta": 3
        },
        {
          "tipo": "opcion",
          "etiqueta": "«¿Qué sucursal vende más?»",
          "opciones": [
            "Barras ordenadas",
            "Líneas",
            "Histograma",
            "Dispersión"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "Evolución en el tiempo → líneas.",
        "Distribución de una variable numérica → histograma.",
        "Relación entre dos numéricas → dispersión.",
        "Comparar categorías → barras ordenadas."
      ],
      "pistas": [
        "Identifica primero el tipo de pregunta: comparar, evolución, distribución o relación."
      ]
    },
    "reto": {
      "id": "m43-l1-reto",
      "enunciado": "Una tienda reparte su ingreso (miles de pesos) en cinco categorías y quiere mostrar su composición.",
      "datos": [
        {
          "columnas": [
            "Categoría",
            "Ingreso (miles)"
          ],
          "filas": [
            [
              "Tecnología",
              540
            ],
            [
              "Accesorios",
              210
            ],
            [
              "Audio",
              150
            ],
            [
              "Hogar",
              60
            ],
            [
              "Otros",
              40
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Total de ingreso (miles)",
          "valor": 1000,
          "calculo": "=540+210+150+60+40"
        },
        {
          "tipo": "numero",
          "etiqueta": "Porcentaje que aporta Tecnología (%)",
          "valor": 54,
          "calculo": "=540/1000*100"
        },
        {
          "tipo": "numero",
          "etiqueta": "¿Cuántas categorías hacen falta, de mayor a menor, para superar el 80 % del total?",
          "valor": 3
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con cinco categorías de pesos muy distintos, ¿qué visual comunica mejor la composición?",
          "opciones": [
            "Un anillo con las cinco partes",
            "Barras ordenadas (o apiladas 100 %) con etiquetas de porcentaje",
            "Un gráfico 3D",
            "Una dispersión"
          ],
          "correcta": 1
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Cuáles son malas prácticas de visualización?",
          "opciones": [
            "Un gráfico circular 3D",
            "Barras ordenadas de mayor a menor",
            "Doce porciones de colores distintos",
            "Título que dice el mensaje",
            "Un tipo de gráfico distinto por cada página sin motivo"
          ],
          "correctas": [
            0,
            2,
            4
          ]
        }
      ],
      "solucion": [
        "Total: 540 + 210 + 150 + 60 + 40 = 1000.",
        "Tecnología: 540 ÷ 1000 = 54 %.",
        "Acumulado: Tecnología 54 %, + Accesorios 75 %, + Audio 90 % → hacen falta 3 categorías.",
        "Con partes muy desiguales, las barras con etiquetas se leen mejor que un anillo.",
        "Son malas prácticas el 3D, las muchas porciones de colores y cambiar de tipo de gráfico sin motivo."
      ],
      "pistas": [
        "Suma las categorías de mayor a menor hasta pasar de 800."
      ]
    },
    "verificacion": [
      {
        "id": "m43-l1-q1",
        "pregunta": "Quieres mostrar cómo cambian las ventas mes a mes durante dos años. ¿Qué visual eliges?",
        "opciones": [
          "Barras apiladas",
          "Líneas",
          "Anillo",
          "Tarjeta"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Una serie en el tiempo se ve mejor con líneas."
      },
      {
        "id": "m43-l1-q2",
        "pregunta": "¿Cuándo es aceptable un gráfico circular o de anillo?",
        "opciones": [
          "Siempre",
          "Con pocas partes (4 o 5) y diferencias claras",
          "Con más de diez categorías",
          "Nunca existe un caso válido"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Con muchas partes el ojo no puede comparar los ángulos."
      },
      {
        "id": "m43-l1-q3",
        "pregunta": "Quieres saber si el gasto en publicidad se relaciona con las ventas. ¿Qué visual usas?",
        "opciones": [
          "Dispersión",
          "Líneas",
          "Tarjeta",
          "Anillo"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "La dispersión muestra la relación entre dos variables numéricas."
      }
    ],
    "resumen": [
      "Primero la pregunta, después el visual.",
      "Comparar → barras; evolución → líneas; distribución → histograma; relación → dispersión; composición → apiladas.",
      "Evita el 3D y los gráficos circulares con muchas partes."
    ],
    "proximoPaso": "Veremos cómo diseñar el visual para que comunique con honestidad: orden, color y ejes.",
    "conceptos": [
      "tipos-de-grafico",
      "visualizacion"
    ]
  },
  {
    "id": "m43-l2",
    "moduloId": "modulo-43",
    "motor": "calculo",
    "titulo": "Diseño que comunica: orden, color y ejes honestos",
    "objetivo": "Aplicar principios de diseño (orden, color con intención, eje desde cero en barras, títulos que dicen el mensaje) y detectar visuales que exageran diferencias.",
    "porQueImporta": "Un visual puede ser técnicamente correcto y aun así engañar, o confundir por exceso de adornos. Quien lee tu informe decide con lo que ve: la honestidad y la claridad son parte del trabajo del analista.",
    "concepto": "> **Nota**: Power BI Desktop (gratuito, solo para Windows) no se ejecuta en el navegador de este curso. Aquí ves cómo se ve cada paso en la herramienta y practicas con ejercicios de cálculo y de criterio que se corrigen solos. Para repetirlo de verdad, usa los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv) en Power BI Desktop.\n\nPrincipios que se aplican en el panel *Formato* de cualquier visual de Power BI:\n\n1. **El título dice el mensaje**: «Tecnología genera el 54 % del ingreso» informa más que «Ingreso por categoría».\n2. **Ordena las categorías** por valor (en Power BI: menú «⋯» del visual → *Ordenar eje*), salvo que tengan un orden natural, como los meses o las edades.\n3. **Usa el color con intención**: un color neutro (gris) para todo y uno de énfasis para lo que importa. Más de 5 o 6 colores distintos dejan de distinguirse.\n4. **Etiquetas de datos** directas y menos ruido: cuadrículas pesadas, bordes y leyendas redundantes sobran.\n5. **Barras desde cero**: en *Formato → Eje Y → Inicio* debe estar en 0, porque la longitud de una barra representa la cantidad. En líneas sí es aceptable no empezar en cero, si se indica.\n6. **Evita**: gráficos 3D, ejes secundarios que sugieren relaciones inexistentes y escalas que cambian entre páginas.\n\n**El efecto del eje truncado.** Si dos barras valen 100 y 98 y el eje empieza en 96, la segunda se ve de la mitad de altura: `(98 − 96) ÷ (100 − 96) = 0.5`, cuando la diferencia real es solo del 2 %.\n\nPiensa en tu lector: casi nunca estudiará el visual. Si el mensaje no se ve en 5 segundos, rediseña.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "El mismo dato con el eje truncado y con el eje desde cero",
      "pantallas": [
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "barras",
              "titulo": "Eje truncado: ¿A es el doble de B?",
              "categorias": [
                "A",
                "B"
              ],
              "valores": [
                100,
                98
              ],
              "ejeDesde": 96
            },
            {
              "tipo": "barras",
              "titulo": "Eje desde cero: casi iguales",
              "categorias": [
                "A",
                "B"
              ],
              "valores": [
                100,
                98
              ],
              "ejeDesde": 0
            }
          ],
          "pagina": "Comparación"
        }
      ],
      "pasos": [
        "Con el eje desde 96, la barra B parece **la mitad** de A.",
        "Altura aparente de B respecto a A = (98 − 96) ÷ (100 − 96) = **0.5**.",
        "Con el eje desde 0, B mide 98 ÷ 100 = **0.98** de A: la diferencia real es del 2 %."
      ],
      "conclusion": "Cortar el eje en barras exagera la diferencia y puede llevar a una decisión equivocada."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Color con intención",
      "pantallas": [
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "barras",
              "titulo": "Ingreso por categoría (miles): Tecnología destaca",
              "categorias": [
                "Tecnología",
                "Accesorios",
                "Audio",
                "Hogar",
                "Otros"
              ],
              "valores": [
                540,
                210,
                150,
                60,
                40
              ],
              "resaltar": [
                0
              ]
            },
            {
              "tipo": "barras",
              "titulo": "Mismo visual sin énfasis",
              "categorias": [
                "Tecnología",
                "Accesorios",
                "Audio",
                "Hogar",
                "Otros"
              ],
              "valores": [
                540,
                210,
                150,
                60,
                40
              ]
            }
          ],
          "pagina": "Énfasis"
        }
      ],
      "pasos": [
        "A la izquierda, un solo color de énfasis lleva la vista a la categoría que importa; el resto queda en gris.",
        "A la derecha, todas las barras llaman la atención por igual: el lector debe buscar el mensaje."
      ],
      "conclusion": "El énfasis se usa en una o dos cosas, no en todas."
    },
    "errorFrecuente": {
      "codigo": "Gráfico de barras con el eje Y empezando en 96 para «que se noten las diferencias».",
      "explicacion": "Cortar el eje hace que la diferencia visual sea mucho mayor que la real. Si el lector solo mira la altura, saca una conclusión falsa. Usa el eje desde cero en barras, o muestra la diferencia en un número o en un gráfico de líneas, de forma explícita."
    },
    "practicaGuiada": {
      "id": "m43-l2-practica",
      "enunciado": "Se comparan dos productos que venden 250 y 240 unidades, con un eje Y que empieza en 230.",
      "pantallas": [
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "barras",
              "titulo": "Unidades vendidas (eje desde 230)",
              "categorias": [
                "Producto 1",
                "Producto 2"
              ],
              "valores": [
                250,
                240
              ],
              "ejeDesde": 230
            }
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Altura aparente de la barra del segundo producto respecto a la del primero, con el eje desde 230 (ratio, 2 decimales)",
          "valor": 0.5,
          "calculo": "=(240-230)/(250-230)"
        },
        {
          "tipo": "numero",
          "etiqueta": "Razón real entre las unidades del segundo y del primero (2 decimales)",
          "valor": 0.96,
          "calculo": "=240/250"
        },
        {
          "tipo": "numero",
          "etiqueta": "Diferencia real (en %, 1 decimal)",
          "valor": 4,
          "calculo": "=(250-240)/250*100",
          "tolerancia": 0.05
        },
        {
          "tipo": "opcion",
          "etiqueta": "Para un gráfico de barras, el eje Y debe empezar en…",
          "opciones": [
            "El valor mínimo de los datos",
            "0",
            "Cualquier valor que resalte las diferencias"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Altura aparente = (240 − 230) ÷ (250 − 230) = 10 ÷ 20 = 0.5.",
        "Razón real = 240 ÷ 250 = 0.96.",
        "Diferencia real = (250 − 240) ÷ 250 = 4 %.",
        "Las barras representan cantidades por su longitud: el eje debe empezar en 0."
      ],
      "pistas": [
        "Resta el inicio del eje a cada valor antes de comparar alturas."
      ]
    },
    "reto": {
      "id": "m43-l2-reto",
      "enunciado": "Revisa un visual de barras antes de publicar.",
      "pantallas": [
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "barras",
              "titulo": "Ingreso por categoría (miles)",
              "categorias": [
                "Tecnología",
                "Accesorios",
                "Audio",
                "Hogar",
                "Otros"
              ],
              "valores": [
                540,
                210,
                150,
                60,
                40
              ]
            }
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "¿Cuál es el mejor título para el visual de ingreso por categoría?",
          "opciones": [
            "Ingreso por categoría",
            "Gráfico 1",
            "Tecnología aporta el 54 % del ingreso",
            "Categorías"
          ],
          "correcta": 2
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Qué mejoras aplicarías?",
          "opciones": [
            "Ordenar las barras de mayor a menor",
            "Poner cada barra de un color distinto",
            "Resaltar con un color solo la categoría clave",
            "Añadir etiquetas de datos",
            "Activar la perspectiva 3D"
          ],
          "correctas": [
            0,
            2,
            3
          ]
        },
        {
          "tipo": "numero",
          "etiqueta": "Si el eje empieza en 40 y las barras valen 50 y 60, la altura aparente de la primera respecto a la segunda es (2 decimales)",
          "valor": 0.5,
          "calculo": "=(50-40)/(60-40)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Un eje truncado es aceptable en…",
          "opciones": [
            "Barras, siempre",
            "Líneas, si se indica claramente",
            "Ninguna gráfica",
            "Anillos"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "El mejor título cuenta el mensaje.",
        "Ordenar, resaltar con intención y etiquetar mejoran el visual; los colores sin criterio y el 3D lo empeoran.",
        "Altura aparente: (50 − 40) ÷ (60 − 40) = 0.5.",
        "En líneas sí puede no empezar en cero si se indica; en barras no."
      ],
      "pistas": [
        "Piensa qué entiende el lector en cinco segundos."
      ]
    },
    "verificacion": [
      {
        "id": "m43-l2-q1",
        "pregunta": "¿Por qué las barras deben empezar en cero?",
        "opciones": [
          "Por estética",
          "Porque su longitud representa la cantidad: cortarla exagera las diferencias",
          "Porque Power BI lo obliga",
          "Para que quepan más etiquetas"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Una barra cortada hace parecer enormes diferencias pequeñas."
      },
      {
        "id": "m43-l2-q2",
        "pregunta": "¿Qué significa «usar el color con intención»?",
        "opciones": [
          "Un color distinto por barra",
          "Un color neutro para todo y uno de énfasis para lo importante",
          "Usar solo rojo",
          "Colores aleatorios"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "El color guía la vista hacia el mensaje."
      },
      {
        "id": "m43-l2-q3",
        "pregunta": "¿Cuál es un buen título de visual?",
        "opciones": [
          "Gráfico 1",
          "Ingreso",
          "Tecnología genera el 54 % del ingreso",
          "Datos"
        ],
        "respuestaCorrecta": 2,
        "explicacion": "El título comunica el mensaje principal."
      }
    ],
    "resumen": [
      "Título con el mensaje, categorías ordenadas, color con intención.",
      "Barras siempre desde cero.",
      "Si el mensaje no se ve en 5 segundos, rediseña."
    ],
    "proximoPaso": "Pasaremos del visual individual a la página: el tablero con KPI y semáforos.",
    "conceptos": [
      "diseno-de-graficos",
      "eje-truncado"
    ]
  },
  {
    "id": "m43-l3",
    "moduloId": "modulo-43",
    "motor": "calculo",
    "titulo": "Tableros: KPI, jerarquía visual y semáforos",
    "objetivo": "Diseñar la estructura de una página de tablero (KPI arriba, detalle abajo) y calcular las cifras de una tarjeta con variación y estado respecto a una meta.",
    "porQueImporta": "Un tablero útil responde en segundos «¿cómo vamos?». Para eso necesita pocas cifras bien definidas, comparadas con algo (mes anterior, meta, año anterior) y ubicadas donde el ojo las busca primero.",
    "concepto": "> **Nota**: Power BI Desktop (gratuito, solo para Windows) no se ejecuta en el navegador de este curso. Aquí ves cómo se ve cada paso en la herramienta y practicas con ejercicios de cálculo y de criterio que se corrigen solos. Para repetirlo de verdad, usa los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv) en Power BI Desktop.\n\n**Estructura típica de una página de tablero**:\n\n1. **Arriba**: 3 a 5 **tarjetas de KPI** con el valor actual y su comparación (variación frente al periodo anterior o a la meta).\n2. **Centro**: el visual principal (normalmente la evolución en el tiempo).\n3. **Abajo o a los lados**: desgloses (por región, producto, categoría) y **segmentaciones** (filtros).\n\nLos lectores recorren la pantalla de arriba a la izquierda hacia abajo a la derecha: pon lo más importante donde empiezan a mirar.\n\n**Una tarjeta de KPI buena** tiene tres elementos: el valor con formato claro (miles, moneda), una **comparación** (un número solo no dice si es bueno o malo) y un **estado** visual cuando hay meta.\n\n- Variación porcentual: `(actual − anterior) ÷ anterior × 100`.\n- Cumplimiento de meta: `actual ÷ meta`.\n- **Semáforo** (en Power BI, *formato condicional*): necesita umbrales explícitos y acordados con el negocio, por ejemplo verde si se alcanza la meta, amarillo si se llega al 90 % y rojo por debajo. No son una norma: son una convención que debe documentarse.\n\n**Reglas de orden**: 6 a 8 visuales por página como orden de magnitud, mismos colores y formatos en todas las páginas y una sola definición para cada cifra (la medida se define una vez en el modelo y se reutiliza).",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Tarjetas de KPI de un mes",
      "pantallas": [
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "tarjeta",
              "titulo": "Ingreso del mes (miles)",
              "valor": "410",
              "variacion": "+12.3 % vs. mes anterior"
            },
            {
              "tipo": "tarjeta",
              "titulo": "Unidades",
              "valor": "1 280",
              "variacion": "+4.1 % vs. mes anterior"
            },
            {
              "tipo": "medidor",
              "titulo": "Cumplimiento de la meta de ingreso (miles)",
              "valor": 410,
              "meta": 400
            },
            {
              "tipo": "lineas",
              "titulo": "Ingreso mensual (miles)",
              "etiquetas": [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun"
              ],
              "series": [
                {
                  "nombre": "2024",
                  "valores": [
                    310,
                    295,
                    340,
                    372,
                    365,
                    410
                  ]
                }
              ]
            }
          ],
          "pagina": "Resumen"
        }
      ],
      "pasos": [
        "Variación del ingreso = (410 − 365) ÷ 365 = **12.3 %**.",
        "Cumplimiento de la meta = 410 ÷ 400 = **102.5 %** → verde (≥ 100 %).",
        "Cada tarjeta lleva el valor, la comparación y, si hay meta, un estado visual."
      ],
      "conclusion": "El tablero responde «¿cómo vamos?» en un vistazo, no con una sola cifra aislada."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Un semáforo con umbrales documentados",
      "datos": [
        {
          "columnas": [
            "Cumplimiento de meta",
            "Estado"
          ],
          "filas": [
            [
              "100 % o más",
              "Verde"
            ],
            [
              "90 % a menos de 100 %",
              "Amarillo"
            ],
            [
              "Menos de 90 %",
              "Rojo"
            ]
          ]
        }
      ],
      "pasos": [
        "Ingreso 372 con meta 400 → 372 ÷ 400 = 93 % → **Amarillo**.",
        "Ingreso 340 con meta 400 → 85 % → **Rojo**.",
        "Los umbrales se acuerdan con el negocio y se escriben en la documentación del informe."
      ],
      "conclusion": "Sin umbrales documentados, cada persona interpreta el color a su manera."
    },
    "errorFrecuente": {
      "codigo": "Tarjeta con «Ingreso: 412 000» sin ninguna comparación.",
      "explicacion": "Un número solo no comunica nada: nadie sabe si 412 000 es un buen mes. Toda tarjeta de KPI debería incluir una comparación (mes anterior, mismo mes del año pasado o meta) para poder interpretarse."
    },
    "practicaGuiada": {
      "id": "m43-l3-practica",
      "enunciado": "Calcula los datos de la tarjeta de unidades: este mes 1 280 y el mes anterior 1 230; meta del mes 1 300.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Variación frente al mes anterior (%, 1 decimal)",
          "valor": 4.1,
          "calculo": "=(1280-1230)/1230*100",
          "tolerancia": 0.05
        },
        {
          "tipo": "numero",
          "etiqueta": "Cumplimiento de la meta (%, 1 decimal)",
          "valor": 98.5,
          "calculo": "=1280/1300*100",
          "tolerancia": 0.05
        },
        {
          "tipo": "opcion",
          "etiqueta": "Con los umbrales de la lección, el estado de la tarjeta es…",
          "opciones": [
            "Verde",
            "Amarillo",
            "Rojo"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Variación = (1280 − 1230) ÷ 1230 × 100 = 4.07 ≈ 4.1 %.",
        "Cumplimiento = 1280 ÷ 1300 × 100 = 98.5 %.",
        "98.5 % está entre 90 % y 100 %: amarillo."
      ],
      "pistas": [
        "Variación = (actual − anterior) ÷ anterior."
      ]
    },
    "reto": {
      "id": "m43-l3-reto",
      "enunciado": "Arma las tarjetas de la página de resumen con estas cifras.",
      "pantallas": [
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "tarjeta",
              "titulo": "Ingreso (miles)",
              "valor": "412"
            },
            {
              "tipo": "tarjeta",
              "titulo": "Pedidos",
              "valor": "1 030"
            },
            {
              "tipo": "tarjeta",
              "titulo": "Meta de ingreso (miles)",
              "valor": "450"
            }
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Ingreso: variación frente a hace un año (%, 1 decimal): actual 412, hace un año 380",
          "valor": 8.4,
          "calculo": "=(412-380)/380*100",
          "tolerancia": 0.05
        },
        {
          "tipo": "numero",
          "etiqueta": "Ticket medio (ingreso ÷ pedidos, en miles, 2 decimales): ingreso 412 y 1 030 pedidos",
          "valor": 0.4,
          "calculo": "=412/1030",
          "tolerancia": 0.005
        },
        {
          "tipo": "numero",
          "etiqueta": "Cumplimiento (%, 1 decimal): ingreso 412 y meta 450",
          "valor": 91.6,
          "calculo": "=412/450*100",
          "tolerancia": 0.05
        },
        {
          "tipo": "opcion",
          "etiqueta": "Estado de ese cumplimiento con los umbrales de la lección",
          "opciones": [
            "Verde",
            "Amarillo",
            "Rojo"
          ],
          "correcta": 1
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Qué prácticas mejoran un tablero?",
          "opciones": [
            "Poner los KPI arriba a la izquierda",
            "Incluir 20 visuales en una página",
            "Usar la misma definición de una cifra en todas las páginas",
            "Mostrar cifras sin comparación",
            "Documentar los umbrales del semáforo"
          ],
          "correctas": [
            0,
            2,
            4
          ]
        }
      ],
      "solucion": [
        "(412 − 380) ÷ 380 = 8.4 %.",
        "412 ÷ 1030 = 0.40 miles por pedido (400 pesos).",
        "412 ÷ 450 = 91.6 % → amarillo (entre 90 % y 100 %).",
        "Buenas prácticas: KPI arriba, una sola definición por cifra y umbrales documentados."
      ],
      "pistas": [
        "Cada cifra debe llevar su comparación."
      ]
    },
    "verificacion": [
      {
        "id": "m43-l3-q1",
        "pregunta": "¿Qué debe acompañar a un valor en una tarjeta de KPI?",
        "opciones": [
          "Nada",
          "Una comparación (periodo anterior, meta, año anterior)",
          "Un gráfico 3D",
          "Cinco decimales"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Sin comparación no se sabe si el valor es bueno."
      },
      {
        "id": "m43-l3-q2",
        "pregunta": "¿Dónde conviene poner los KPI principales de la página?",
        "opciones": [
          "Abajo a la derecha",
          "Arriba, donde empieza la lectura",
          "En otra página",
          "Al azar"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La lectura empieza arriba a la izquierda."
      },
      {
        "id": "m43-l3-q3",
        "pregunta": "¿Quién debe definir los umbrales de un semáforo?",
        "opciones": [
          "Cada lector",
          "El analista junto con el negocio, y quedar documentados",
          "Power BI automáticamente",
          "Nadie"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Son una convención acordada."
      }
    ],
    "resumen": [
      "KPI arriba, visual principal al centro, desgloses y filtros alrededor.",
      "Cada KPI lleva comparación y, si hay meta, un estado.",
      "Umbrales acordados y documentados."
    ],
    "proximoPaso": "Cerraremos la unidad con accesibilidad, contraste y storytelling.",
    "conceptos": [
      "tablero",
      "kpi",
      "semaforo"
    ]
  },
  {
    "id": "m43-l4",
    "moduloId": "modulo-43",
    "motor": "calculo",
    "titulo": "Accesibilidad, contraste y storytelling",
    "objetivo": "Calcular la razón de contraste entre dos colores según WCAG, evaluar si cumplen los niveles AA y AAA, y estructurar un mensaje con datos.",
    "porQueImporta": "Un informe que no se puede leer (texto gris claro sobre blanco, colores que una persona daltónica no distingue) fracasa aunque los datos sean perfectos. Y un informe sin historia es una colección de gráficos que nadie recuerda.",
    "concepto": "> **Nota**: Power BI Desktop (gratuito, solo para Windows) no se ejecuta en el navegador de este curso. Aquí ves cómo se ve cada paso en la herramienta y practicas con ejercicios de cálculo y de criterio que se corrigen solos. Para repetirlo de verdad, usa los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv) en Power BI Desktop.\n\n**Accesibilidad del color.** Las pautas WCAG (*Web Content Accessibility Guidelines*) definen la **razón de contraste** entre dos colores: un número entre 1 (iguales) y 21 (negro sobre blanco).\n\n- Texto normal: mínimo **4.5 : 1** (nivel AA) o **7 : 1** (nivel AAA).\n- Texto grande (18 pt o más, o 14 pt en negrita) y elementos gráficos como barras o iconos: mínimo **3 : 1** (AA).\n\n**Cálculo.** Para un gris (R = G = B = `c`, entre 0 y 255):\n\n1. `x = c ÷ 255`.\n2. Luz lineal: si `x ≤ 0.04045`, `x ÷ 12.92`; si no, `((x + 0.055) ÷ 1.055) ^ 2.4`. Para un gris, esa es la **luminancia relativa** `L`.\n3. Razón de contraste = `(L_claro + 0.05) ÷ (L_oscuro + 0.05)`. El blanco tiene `L = 1` y el negro `L = 0`.\n\nEn la calculadora: `=((0.4627+0.055)/1.055)^2.4`.\n\nOtras prácticas de accesibilidad en Power BI:\n\n- **No dependas solo del color**: añade etiquetas, formas o texturas (alrededor de 1 de cada 12 hombres y 1 de cada 200 mujeres tiene alguna deficiencia de percepción del color, sobre todo rojo-verde, según estimaciones habituales).\n- **Texto alternativo** en cada visual (panel *Formato → General → Texto alternativo*) para lectores de pantalla, y un **orden de tabulación** lógico.\n- Tamaños de letra legibles y un **tema** de color validado.\n\n**Storytelling con datos.** Una historia memorable sigue una estructura sencilla: **contexto** (qué situación miramos), **hallazgo** (qué dicen los datos) y **acción** (qué recomendamos hacer). Cada visual debe aportar a esa historia; el que no aporta, se elimina.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Contraste del texto gris (#767676) sobre fondo blanco",
      "pantallas": [
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "tarjeta",
              "titulo": "Texto gris sobre blanco: ¿se lee bien?",
              "valor": "#767676",
              "variacion": "4.54 : 1",
              "positivo": true
            }
          ],
          "pagina": "Accesibilidad"
        }
      ],
      "pasos": [
        "c = 118 → x = 118 ÷ 255 = 0.4627.",
        "L = ((0.4627 + 0.055) ÷ 1.055) ^ 2.4 = **0.1812**.",
        "Contraste con blanco = (1 + 0.05) ÷ (0.1812 + 0.05) = **4.54 : 1**.",
        "4.54 ≥ 4.5 → cumple AA para texto normal (por poco), pero no llega a 7 (AAA)."
      ],
      "conclusion": "Es un caso límite: un gris apenas más claro ya dejaría de cumplir."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Tres grises sobre blanco",
      "datos": [
        {
          "columnas": [
            "Gris",
            "Luminancia",
            "Contraste con blanco",
            "Texto normal (AA 4.5)",
            "Elemento gráfico (3.0)"
          ],
          "filas": [
            [
              "#999999",
              "0.3185",
              "2.85 : 1",
              "No cumple",
              "No cumple"
            ],
            [
              "#767676",
              "0.1812",
              "4.54 : 1",
              "Cumple",
              "Cumple"
            ],
            [
              "#555555",
              "0.0908",
              "7.46 : 1",
              "Cumple (AAA)",
              "Cumple"
            ]
          ]
        }
      ],
      "pasos": [
        "El gris #999999 da 2.85 : 1: sirve para una barra o icono (≥ 3), pero **no** para texto normal.",
        "Oscurecer el gris sube el contraste."
      ],
      "conclusion": "Antes de elegir el gris «elegante» del tema, calcula su contraste o usa un verificador."
    },
    "errorFrecuente": {
      "codigo": "Etiquetas de datos en gris claro (#999999) sobre fondo blanco «para que no estorben».",
      "explicacion": "Su contraste es 2.85 : 1, menor que 4.5 : 1: es difícil de leer en una pantalla con poco brillo o en una proyección. El texto debe cumplir al menos AA; los elementos decorativos pueden ser más suaves."
    },
    "practicaGuiada": {
      "id": "m43-l4-practica",
      "enunciado": "Calcula el contraste de un gris #555555 (c = 85) sobre fondo blanco.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "x = 85 ÷ 255 (4 decimales)",
          "valor": 0.3333,
          "calculo": "=85/255"
        },
        {
          "tipo": "numero",
          "etiqueta": "Luminancia L (4 decimales)",
          "valor": 0.0908,
          "calculo": "=((85/255+0.055)/1.055)^2.4"
        },
        {
          "tipo": "numero",
          "etiqueta": "Razón de contraste (2 decimales)",
          "valor": 7.46,
          "calculo": "=(1+0.05)/(((85/255+0.055)/1.055)^2.4+0.05)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Cumple el nivel AAA (7 : 1) para texto normal?",
          "opciones": [
            "Sí",
            "No"
          ],
          "correcta": 0
        }
      ],
      "solucion": [
        "x = 85 ÷ 255 = 0.3333.",
        "L = ((0.3333 + 0.055) ÷ 1.055) ^ 2.4 = 0.0908.",
        "Contraste = 1.05 ÷ (0.0908 + 0.05) = 7.46 : 1.",
        "7.46 ≥ 7: cumple AAA."
      ],
      "pistas": [
        "Usa la calculadora con ^ para el exponente 2.4."
      ]
    },
    "reto": {
      "id": "m43-l4-reto",
      "enunciado": "Evalúa el gris #999999 (c = 153) sobre blanco para dos usos.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Razón de contraste (2 decimales)",
          "valor": 2.85,
          "calculo": "=(1+0.05)/(((153/255+0.055)/1.055)^2.4+0.05)"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Como texto normal (AA, 4.5 : 1)…",
          "opciones": [
            "Cumple",
            "No cumple"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "Como barra o ícono (AA, 3 : 1)…",
          "opciones": [
            "Cumple",
            "No cumple"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "Un informe que diferencia «meta cumplida» y «no cumplida» solo con verde y rojo…",
          "opciones": [
            "Es accesible",
            "Debe añadir etiquetas, íconos o formas además del color"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué estructura sigue una buena historia con datos?",
          "opciones": [
            "Gráfico, gráfico, gráfico",
            "Contexto, hallazgo y acción",
            "Solo conclusiones",
            "Una tabla enorme"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "x = 0.6; L = ((0.6 + 0.055) ÷ 1.055) ^ 2.4 = 0.3185; contraste = 1.05 ÷ 0.3685 = 2.85 : 1.",
        "2.85 < 4.5: no cumple como texto. 2.85 ≥ 3: cumple para elementos gráficos.",
        "No bases la información solo en el color.",
        "Contexto → hallazgo → acción."
      ],
      "pistas": [
        "Compara con 4.5 para texto y con 3 para elementos gráficos."
      ]
    },
    "verificacion": [
      {
        "id": "m43-l4-q1",
        "pregunta": "Según WCAG, ¿qué contraste mínimo (AA) necesita el texto normal?",
        "opciones": [
          "2 : 1",
          "3 : 1",
          "4.5 : 1",
          "21 : 1"
        ],
        "respuestaCorrecta": 2,
        "explicacion": "AA exige 4.5 : 1 para texto normal."
      },
      {
        "id": "m43-l4-q2",
        "pregunta": "¿Por qué no conviene distinguir categorías solo por rojo y verde?",
        "opciones": [
          "Porque son muy llamativos",
          "Porque algunas personas con daltonismo no los distinguen",
          "Porque Power BI no admite el verde",
          "Porque cuestan más"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Hay que añadir otra pista además del color."
      },
      {
        "id": "m43-l4-q3",
        "pregunta": "¿Qué estructura sigue una buena historia con datos?",
        "opciones": [
          "Contexto, hallazgo y acción",
          "Tabla, tabla, tabla",
          "Solo gráficos",
          "Solo texto"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Cada visual aporta a esa historia."
      }
    ],
    "resumen": [
      "Texto normal ≥ 4.5 : 1; elementos gráficos ≥ 3 : 1.",
      "No dependas solo del color; añade texto alternativo.",
      "Contexto, hallazgo, acción."
    ],
    "proximoPaso": "Pasamos a la preparación de datos: el flujo de Power BI y Power Query.",
    "conceptos": [
      "accesibilidad",
      "contraste-wcag",
      "storytelling"
    ]
  }
]
