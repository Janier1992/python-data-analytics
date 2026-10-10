import type { Lesson } from '../../types'

export const module46Lessons: Lesson[] = [
  {
    "id": "m46-l1",
    "moduloId": "modulo-46",
    "motor": "calculo",
    "titulo": "Diseñar el informe en Power BI: visuales, interacción y rendimiento",
    "objetivo": "Elegir visuales y funciones de interacción de Power BI, aplicar reglas de buen diseño de página y revisar un informe con una lista de comprobación.",
    "porQueImporta": "Un informe es una herramienta de trabajo: debe responder rápido, ser claro para quien no lo construyó y cargar sin esperas. Estas decisiones de diseño pesan tanto como las medidas DAX.",
    "concepto": "> **Nota**: Power BI Desktop (gratuito, solo para Windows) no se ejecuta en el navegador de este curso. Aquí ves cómo se ve cada paso en la herramienta y practicas con ejercicios de cálculo y de criterio que se corrigen solos; para el producto final necesitas Power BI Desktop o el servicio web, con los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv).\n\n**Visuales de uso frecuente** (panel *Visualizaciones*)\n\n- **Tarjeta** (y tarjeta de varias filas): cifras clave.\n- **Columnas y barras** (agrupadas o apiladas): comparar categorías.\n- **Líneas** (y áreas): evolución en el tiempo.\n- **Matriz y tabla**: valores exactos y desgloses jerárquicos.\n- **Dispersión**: relación entre dos variables.\n- **Segmentación** (*slicer*): filtros que el lector controla.\n- **Mapa**: solo si la ubicación geográfica es la pregunta.\n\n**Interacción**\n\n- **Filtrado cruzado**: al seleccionar un elemento en un visual, los demás se filtran o resaltan (se ajusta con *Formato → Editar interacciones*).\n- **Desglose** (*drill down*): bajar en una jerarquía (año → trimestre → mes).\n- **Obtener detalles** (*drill through*): saltar a una página con el detalle de un elemento (clic derecho).\n- **Información sobre herramientas** (*tooltips*): detalle al pasar el ratón.\n- **Marcadores** y botones: vistas guardadas y navegación entre páginas.\n\n**Reglas de diseño de página** (principios del curso, no normas oficiales):\n\n1. Hasta unos **8 visuales** por página; si necesitas más, divide en páginas.\n2. Cada visual tiene un **título** claro; los gráficos circulares, **pocas** categorías.\n3. Una página de resumen incluye **KPI** con comparación.\n4. Un tema de colores único, fuentes y tamaños coherentes en todo el informe.\n\n**Rendimiento.** Muchos visuales por página, medidas pesadas o modelos con columnas innecesarias lo vuelven lento. El **Analizador de rendimiento** (*Vista → Analizador de rendimiento*) mide cuánto tarda cada visual: separa el tiempo de la consulta DAX y el de dibujo. Quita las columnas que no uses, usa un modelo en estrella y evita filtros bidireccionales innecesarios.\n\n**Accesibilidad y móvil**: texto alternativo en los visuales, orden de tabulación lógico, contraste suficiente y, si se va a consultar desde el teléfono, un **diseño móvil** específico.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Una página de resumen bien armada",
      "pantallas": [
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "segmentador",
              "campo": "Año",
              "opciones": [
                "2023",
                "2024"
              ],
              "seleccion": [
                "2024"
              ]
            },
            {
              "tipo": "tarjeta",
              "titulo": "Ingreso 2024 (miles)",
              "valor": "2 122",
              "variacion": "+19.7 % vs. 2023"
            },
            {
              "tipo": "tarjeta",
              "titulo": "Unidades 2024",
              "valor": "3 005"
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
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic"
              ],
              "series": [
                {
                  "nombre": "2024",
                  "valores": [
                    174,
                    167,
                    180,
                    147,
                    180,
                    154,
                    201,
                    175,
                    197,
                    181,
                    178,
                    188
                  ]
                }
              ]
            },
            {
              "tipo": "barras",
              "titulo": "Ingreso 2024 por región (miles)",
              "categorias": [
                "Norte",
                "Sur",
                "Este",
                "Oeste"
              ],
              "valores": [
                529,
                535,
                526,
                532
              ]
            }
          ],
          "pagina": "Resumen",
          "filtros": [
            "Año = 2024",
            "Región: todas"
          ]
        }
      ],
      "pasos": [
        "**Segmentación** de año arriba a la izquierda: el lector controla el periodo.",
        "**KPI** con comparación: ingreso 2 122 mil, +19.7 % frente a 2023.",
        "**Líneas** para la evolución y **barras** para comparar regiones: 5 visuales en total, con un mensaje claro."
      ],
      "conclusion": "Cada visual responde una pregunta distinta y ninguno sobra."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Leer el Analizador de rendimiento",
      "datos": [
        {
          "columnas": [
            "Visual",
            "Consulta DAX (ms)",
            "Dibujo (ms)",
            "Total (ms)"
          ],
          "filas": [
            [
              "Tarjeta de ingreso",
              35,
              12,
              47
            ],
            [
              "Líneas mensuales",
              120,
              60,
              180
            ],
            [
              "Barras por región",
              80,
              40,
              120
            ],
            [
              "Matriz producto × región",
              1450,
              310,
              1760
            ],
            [
              "Segmentación de año",
              20,
              25,
              45
            ]
          ],
          "titulo": "Analizador de rendimiento (una carga de la página)"
        }
      ],
      "pasos": [
        "La matriz tarda **1 760 ms**, casi 10 veces más que cualquier otro visual de la página.",
        "Total de la página = 47 + 180 + 120 + 1 760 + 45 = **2 152 ms**; la matriz aporta 1760 ÷ 2152 = **81.8 %**.",
        "La mayor parte es **consulta DAX** (1 450 ms): conviene revisar la medida o reducir los campos de la matriz."
      ],
      "conclusion": "El analizador muestra dónde está el cuello de botella antes de empezar a «optimizar a ciegas»."
    },
    "errorFrecuente": {
      "codigo": "Una página de resumen con 18 visuales «porque se puede».",
      "explicacion": "Sobrecargar la página es el error más habitual al empezar con Power BI. Más visuales no significa más información: significa más esfuerzo para el lector y más tiempo de carga. Divide en páginas y deja en cada una una sola pregunta."
    },
    "practicaGuiada": {
      "id": "m46-l1-practica",
      "enunciado": "Con la tabla del Analizador de rendimiento de la lección.",
      "datos": [
        {
          "columnas": [
            "Visual",
            "Consulta DAX (ms)",
            "Dibujo (ms)",
            "Total (ms)"
          ],
          "filas": [
            [
              "Tarjeta de ingreso",
              35,
              12,
              47
            ],
            [
              "Líneas mensuales",
              120,
              60,
              180
            ],
            [
              "Barras por región",
              80,
              40,
              120
            ],
            [
              "Matriz producto × región",
              1450,
              310,
              1760
            ],
            [
              "Segmentación de año",
              20,
              25,
              45
            ]
          ],
          "titulo": "Analizador de rendimiento (una carga de la página)"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Tiempo total de la página (ms)",
          "valor": 2152,
          "calculo": "=47+180+120+1760+45"
        },
        {
          "tipo": "numero",
          "etiqueta": "Visual más lento: tiempo total (ms)",
          "valor": 1760
        },
        {
          "tipo": "numero",
          "etiqueta": "Porcentaje del tiempo de la página que aporta la matriz (%, 1 decimal)",
          "valor": 81.8,
          "calculo": "=1760/2152*100",
          "tolerancia": 0.05
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué conviene revisar primero?",
          "opciones": [
            "Los colores del tema",
            "La medida y los campos de la matriz",
            "El título de la página",
            "El número de páginas"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "47 + 180 + 120 + 1760 + 45 = 2152 ms.",
        "El más lento es la matriz: 1760 ms.",
        "1760 ÷ 2152 = 81.8 %.",
        "Casi todo es consulta DAX: la medida o los campos de la matriz."
      ],
      "pistas": [
        "Suma los totales por visual."
      ]
    },
    "reto": {
      "id": "m46-l1-reto",
      "enunciado": "Revisa un informe con esta lista de comprobación.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Una página tiene 14 visuales y cada página debe tener como máximo 8: ¿cuántas páginas necesitas como mínimo?",
          "valor": 2,
          "calculo": "=REDONDEAR.MAS(14/8;0)"
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Qué mejora el rendimiento de un informe?",
          "opciones": [
            "Quitar las columnas del modelo que no se usan",
            "Usar un modelo en estrella",
            "Poner todos los visuales en una sola página",
            "Evitar filtros bidireccionales innecesarios"
          ],
          "correctas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "opcion",
          "etiqueta": "Al hacer clic en una barra y ver que los demás visuales se filtran, se está usando…",
          "opciones": [
            "Filtrado cruzado",
            "Obtener detalles",
            "Un marcador",
            "Un tooltip"
          ],
          "correcta": 0
        },
        {
          "tipo": "opcion",
          "etiqueta": "Un clic derecho en un producto para saltar a una página con su detalle es…",
          "opciones": [
            "Filtrado cruzado",
            "Obtener detalles (drill through)",
            "Un segmentador",
            "Un marcador"
          ],
          "correcta": 1
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Qué incluye un buen diseño accesible?",
          "opciones": [
            "Texto alternativo en los visuales",
            "Orden de tabulación lógico",
            "Información solo con colores rojo y verde",
            "Contraste suficiente"
          ],
          "correctas": [
            0,
            1,
            3
          ]
        }
      ],
      "solucion": [
        "14 ÷ 8 = 1.75 → 2 páginas.",
        "Quitar columnas innecesarias, usar estrella y evitar bidireccionales ayudan.",
        "Selección que filtra a los demás: filtrado cruzado.",
        "Saltar al detalle de un elemento: obtener detalles.",
        "Texto alternativo, orden de tabulación y contraste."
      ],
      "pistas": [
        "Divide y redondea hacia arriba."
      ]
    },
    "verificacion": [
      {
        "id": "m46-l1-q1",
        "pregunta": "¿Qué es el «filtrado cruzado» en un informe de Power BI?",
        "opciones": [
          "Que al seleccionar un elemento en un visual, los demás se filtran o resaltan",
          "Un error de relación",
          "Un tipo de gráfico",
          "Un modo oscuro"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Es la interacción entre visuales."
      },
      {
        "id": "m46-l1-q2",
        "pregunta": "¿Para qué sirve el Analizador de rendimiento?",
        "opciones": [
          "Para medir cuánto tarda en cargar cada visual",
          "Para cambiar el tema",
          "Para publicar",
          "Para crear medidas"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Separa el tiempo de consulta DAX y el de dibujo."
      },
      {
        "id": "m46-l1-q3",
        "pregunta": "¿Qué acción mejora más un informe sobrecargado?",
        "opciones": [
          "Más colores",
          "Dividirlo en páginas, cada una con una pregunta",
          "Agregar más visuales",
          "Bajar el tamaño de letra"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Una pregunta por página."
      }
    ],
    "resumen": [
      "Elige el visual según la pregunta y limita la página a unos 8 visuales.",
      "Filtrado cruzado, desglose y obtener detalles para explorar.",
      "Mide el rendimiento antes de optimizar."
    ],
    "proximoPaso": "Veremos cómo publicar, actualizar y proteger los datos con seguridad por filas.",
    "conceptos": [
      "diseno-de-informe",
      "interaccion"
    ]
  },
  {
    "id": "m46-l2",
    "moduloId": "modulo-46",
    "motor": "calculo",
    "titulo": "Publicar, actualizar y proteger datos con seguridad por filas (RLS)",
    "objetivo": "Entender cómo se publica y actualiza un informe en el servicio de Power BI y cómo la seguridad a nivel de fila limita lo que ve cada persona.",
    "porQueImporta": "Un informe que nadie puede consultar no sirve, y uno que muestra a cada persona datos que no debería ver es un problema grave. Publicar bien y proteger bien es parte del trabajo.",
    "concepto": "> **Nota**: Power BI Desktop (gratuito, solo para Windows) no se ejecuta en el navegador de este curso. Aquí ves cómo se ve cada paso en la herramienta y practicas con ejercicios de cálculo y de criterio que se corrigen solos; para el producto final necesitas Power BI Desktop o el servicio web, con los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv).\n\n**Publicar**: desde Desktop, *Inicio → Publicar* envía el informe y su **modelo semántico** (antes llamado «conjunto de datos») a un **área de trabajo** (*workspace*) del servicio. Allí otras personas lo consultan en el navegador o en la aplicación móvil. Para distribuir a mucha gente se empaqueta como una **aplicación** (*app*).\n\n**Actualización de datos**: el informe publicado no se actualiza solo. Se programa una **actualización** (por ejemplo, cada noche). Si la fuente está en una red interna o en un servidor local, hace falta una **puerta de enlace de datos** (*on-premises data gateway*) que conecte el servicio con ella.\n\n**Licencias**: Desktop es gratuito, pero compartir informes con otras personas en el servicio depende de las licencias de la organización (de pago por usuario o mediante una capacidad). Estas condiciones cambian: consulta la página oficial antes de comprometer un plan.\n\n**Cuidado con «Publicar en la web»**: genera un enlace **público**, sin autenticación. Nunca lo uses con datos internos o personales.\n\n**Seguridad a nivel de fila (RLS)**: restringe qué filas del modelo ve cada usuario.\n\n1. En Desktop, *Modelado → Administrar roles* define **roles**, cada uno con un filtro DAX sobre una tabla: por ejemplo `Region[region] = \"Norte\"`.\n2. Para no crear un rol por persona se usa **RLS dinámica**: una tabla de usuarios (correo → región) y un filtro como `Usuarios[correo] = USERPRINCIPALNAME()`, que compara con el usuario que consulta.\n3. En el servicio se asignan personas o grupos a cada rol y se prueba con **Ver como** (*View as*).\n\nImportante: la RLS se aplica a quienes **consultan** (rol de espectador); no limita a quienes tienen permisos de edición en el área de trabajo (administrador, miembro, colaborador), que pueden ver todos los datos. Comprueba siempre los permisos del área.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Un rol de seguridad por región",
      "datos": [
        {
          "columnas": [
            "region",
            "Ingreso 2024"
          ],
          "filas": [
            [
              "Norte",
              529370
            ],
            [
              "Sur",
              535030
            ],
            [
              "Este",
              525840
            ],
            [
              "Oeste",
              532490
            ]
          ],
          "titulo": "Ingreso 2024 por región (sin seguridad)"
        }
      ],
      "pantallas": [
        {
          "tipo": "medida",
          "dax": "Region[region] = \"Norte\"",
          "objeto": "rol",
          "tabla": "Region",
          "titulo": "Administrar roles — rol «Norte»"
        },
        {
          "tipo": "modelo",
          "tablas": [
            {
              "nombre": "Ventas",
              "rol": "hechos",
              "columnas": [
                "id_venta",
                "fecha",
                "id_region",
                "unidades",
                "precio_unitario"
              ],
              "claves": [
                "id_venta"
              ]
            },
            {
              "nombre": "Region",
              "rol": "dimension",
              "columnas": [
                "id_region",
                "region",
                "zona"
              ],
              "claves": [
                "id_region"
              ]
            }
          ],
          "relaciones": [
            {
              "de": "Ventas.id_region",
              "a": "Region.id_region",
              "cardinalidad": "*:1",
              "direccion": "unica"
            }
          ],
          "titulo": "El filtro del rol viaja de Region a Ventas"
        }
      ],
      "pasos": [
        "El rol «Norte» filtra `Region[region] = \"Norte\"`.",
        "Por la relación `1:*`, el filtro se propaga a **Ventas**: solo se ven las ventas de esa región.",
        "Quien tenga ese rol ve un ingreso 2024 de **529 370** en lugar de 2 122 730."
      ],
      "conclusion": "La RLS filtra las filas del modelo antes de calcular cualquier medida."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "RLS dinámica con una tabla de usuarios",
      "datos": [
        {
          "columnas": [
            "correo",
            "region"
          ],
          "filas": [
            [
              "ana@aurora.co",
              "Norte"
            ],
            [
              "luis@aurora.co",
              "Sur"
            ],
            [
              "marta@aurora.co",
              "Este"
            ],
            [
              "ceo@aurora.co",
              "(todas)"
            ]
          ],
          "titulo": "Tabla Usuarios (RLS dinámica)"
        }
      ],
      "pantallas": [
        {
          "tipo": "medida",
          "dax": "Usuarios[correo] = USERPRINCIPALNAME()",
          "objeto": "rol",
          "tabla": "Usuarios",
          "titulo": "Administrar roles — rol «PorUsuario»"
        }
      ],
      "pasos": [
        "Cuando Ana abre el informe, `USERPRINCIPALNAME()` devuelve «ana@aurora.co».",
        "El filtro deja solo la fila de Ana en `Usuarios`, que (por relación) filtra la región Norte.",
        "No hace falta crear un rol por persona: se mantiene la tabla de usuarios."
      ],
      "conclusion": "La seguridad dinámica escala con una tabla en lugar de decenas de roles."
    },
    "errorFrecuente": {
      "codigo": "Probar la RLS entrando como administrador del área de trabajo y concluir que «funciona porque veo todo»; o publicar con «Publicar en la web».",
      "explicacion": "La RLS solo se aplica a quienes consultan (espectadores): los administradores, miembros y colaboradores del área pueden ver todos los datos. Se prueba con «Ver como». Y «Publicar en la web» crea un enlace público sin autenticación: nunca para datos internos."
    },
    "practicaGuiada": {
      "id": "m46-l2-practica",
      "enunciado": "Con la tabla de usuarios y el ingreso 2024 por región de la lección.",
      "datos": [
        {
          "columnas": [
            "correo",
            "region"
          ],
          "filas": [
            [
              "ana@aurora.co",
              "Norte"
            ],
            [
              "luis@aurora.co",
              "Sur"
            ],
            [
              "marta@aurora.co",
              "Este"
            ],
            [
              "ceo@aurora.co",
              "(todas)"
            ]
          ],
          "titulo": "Tabla Usuarios (RLS dinámica)"
        },
        {
          "columnas": [
            "region",
            "Ingreso 2024"
          ],
          "filas": [
            [
              "Norte",
              529370
            ],
            [
              "Sur",
              535030
            ],
            [
              "Este",
              525840
            ],
            [
              "Oeste",
              532490
            ]
          ],
          "titulo": "Ingreso 2024 por región (sin seguridad)"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Ingreso 2024 que ve Ana (rol por usuario: Norte)",
          "valor": 529370
        },
        {
          "tipo": "numero",
          "etiqueta": "Ingreso 2024 que ve Luis (Sur)",
          "valor": 535030
        },
        {
          "tipo": "numero",
          "etiqueta": "Suma de lo que ven Ana, Luis y Marta juntos",
          "valor": 1590240,
          "calculo": "=529370+535030+525840"
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué ve el CEO si su fila dice «(todas)» y tiene un rol sin filtro?",
          "opciones": [
            "Solo Norte",
            "Todo el ingreso 2024",
            "Nada",
            "Un error"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Ana: 529370.",
        "Luis: 535030.",
        "Ana + Luis + Marta = 529370 + 535030 + 525840 = 1590240.",
        "Sin filtro de región ve todo: 2122730."
      ],
      "pistas": [
        "Busca la región de cada persona en la tabla de usuarios."
      ]
    },
    "reto": {
      "id": "m46-l2-reto",
      "enunciado": "Decide cómo publicar y proteger.",
      "preguntas": [
        {
          "tipo": "casillas",
          "etiqueta": "¿Quiénes NO quedan limitados por la RLS en un área de trabajo?",
          "opciones": [
            "Administrador del área",
            "Miembro del área",
            "Colaborador del área",
            "Espectador con rol de seguridad"
          ],
          "correctas": [
            0,
            1,
            2
          ]
        },
        {
          "tipo": "opcion",
          "etiqueta": "Un informe con datos de clientes internos NO debe publicarse con…",
          "opciones": [
            "Una aplicación con roles de seguridad",
            "Publicar en la web (enlace público)",
            "Ver como para probar",
            "Actualización programada"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "Los datos están en un servidor de la oficina y el informe debe actualizarse cada noche en el servicio. Necesitas…",
          "opciones": [
            "Nada especial",
            "Una puerta de enlace de datos",
            "Cambiar el tema",
            "Otra licencia de Desktop"
          ],
          "correcta": 1
        },
        {
          "tipo": "numero",
          "etiqueta": "Si se programan 2 actualizaciones al día, ¿cuántas se ejecutan en una semana?",
          "valor": 14,
          "calculo": "=2*7"
        },
        {
          "tipo": "opcion",
          "etiqueta": "Para probar un rol antes de entregar, se usa…",
          "opciones": [
            "Imprimir el informe",
            "Ver como (View as)",
            "Un marcador",
            "La Vista de tabla"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "Los permisos de edición (administrador, miembro, colaborador) ven todos los datos.",
        "«Publicar en la web» es público y sin autenticación.",
        "Una fuente local requiere puerta de enlace.",
        "2 × 7 = 14.",
        "Se prueba con Ver como."
      ],
      "pistas": [
        "La RLS solo restringe a quienes consultan."
      ]
    },
    "verificacion": [
      {
        "id": "m46-l2-q1",
        "pregunta": "¿Qué hace «Publicar en la web»?",
        "opciones": [
          "Genera un enlace público sin autenticación",
          "Publica de forma privada",
          "Actualiza los datos",
          "Crea un rol"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "No debe usarse con datos internos."
      },
      {
        "id": "m46-l2-q2",
        "pregunta": "¿Cómo se prueba un rol de RLS?",
        "opciones": [
          "Con Ver como",
          "Con el Analizador de rendimiento",
          "No se puede",
          "Con un segmentador"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Permite simular a otro usuario o rol."
      },
      {
        "id": "m46-l2-q3",
        "pregunta": "¿Por qué la RLS dinámica es útil?",
        "opciones": [
          "Evita crear un rol por persona usando una tabla de usuarios",
          "Hace más rápido el informe",
          "Cambia los colores",
          "Sustituye al modelo"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Se compara USERPRINCIPALNAME() con la tabla."
      }
    ],
    "resumen": [
      "Publicar → área de trabajo; programar la actualización; puerta de enlace si la fuente es local.",
      "RLS con roles y filtros DAX; dinámica con USERPRINCIPALNAME().",
      "La RLS no limita a quienes editan; evita «Publicar en la web» con datos internos."
    ],
    "proximoPaso": "Cerraremos el curso con el proyecto del tablero de Aurora.",
    "conceptos": [
      "publicar-power-bi",
      "rls"
    ]
  },
  {
    "id": "m46-l3",
    "moduloId": "modulo-46",
    "motor": "calculo",
    "titulo": "Proyecto: tablero de ventas de la tienda Aurora",
    "objetivo": "Construir un tablero completo en Power BI Desktop (preparación, modelo, medidas y diseño) y verificarlo con cifras de control calculadas por otra vía.",
    "porQueImporta": "Un proyecto terminado, con datos, modelo y decisiones documentadas, es lo que se enseña en una entrevista o en un portafolio. Verificar contra cifras de control es la práctica profesional que distingue un tablero confiable de uno que «parece bien».",
    "concepto": "> **Nota**: Power BI Desktop (gratuito, solo para Windows) no se ejecuta en el navegador de este curso. Aquí ves cómo se ve cada paso en la herramienta y practicas con ejercicios de cálculo y de criterio que se corrigen solos; para el producto final necesitas Power BI Desktop o el servicio web, con los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv).\n\n**El caso**: la dirección de la tienda Aurora quiere un tablero para responder: **¿cómo van las ventas?, ¿qué productos y regiones impulsan el crecimiento? y ¿dónde hay que actuar?**\n\n**Datos**: descarga [`ventas-aurora.csv`](/datos/ventas-aurora.csv) (480 registros: 24 meses, 5 productos y 4 regiones; datos **sintéticos** creados para el curso). Columnas: `fecha`, `producto`, `categoria`, `region`, `unidades`, `precio_unitario`.\n\n**Pasos**\n\n1. **Obtener y transformar** (Power Query): cargar el CSV, fijar tipos (fecha, números enteros), comprobar la calidad de las columnas.\n2. **Modelar**: dimensiones `Producto` (producto, categoría) y `Region`, y una tabla `Calendario` marcada como tabla de fechas; hechos `Ventas`; relaciones `1:*`.\n3. **Medidas DAX** (en una tabla de medidas): `Ingreso` (`SUMX`), `Unidades`, `Ingreso año anterior` (`SAMEPERIODLASTYEAR`), `Var % año anterior`, `Ingreso YTD`, `% del total`, `Ranking producto`.\n4. **Informe**, dos páginas: **Resumen** (tarjetas de KPI con comparación, evolución mensual, ingreso por categoría) y **Detalle** (matriz producto × región, ranking, segmentaciones de año y región).\n5. **Verificar** con las cifras de control de esta lección.\n6. **Publicar** (si tienes el servicio) o exportar a PDF o capturas y documentar en el repositorio de tu portafolio.\n\n**Rúbrica de autoevaluación (100 puntos)**\n\n- Datos: tipos correctos y calidad de columnas revisada (10).\n- Modelo: estrella, relaciones `1:*` con filtro único, tabla de fechas marcada (20).\n- Medidas: correctas, con nombres claros y formato (25).\n- Diseño: título con mensaje, KPI con comparación, máximo ~8 visuales por página, color con intención (20).\n- Interacción: segmentaciones y filtrado cruzado funcionan sin romper cifras (10).\n- Verificación y documentación: las cifras de control coinciden; el repositorio explica decisiones y límites (15).\n\nEste curso **no puede evaluar automáticamente** tu archivo de Power BI: la rúbrica sirve para autoevaluarte o para que alguien con experiencia te dé retroalimentación. Lo que sí se corrige aquí son las **cifras de control**: los números que tu tablero debe reproducir.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "El modelo y la página de resumen que debes obtener",
      "pantallas": [
        {
          "tipo": "modelo",
          "tablas": [
            {
              "nombre": "Ventas",
              "rol": "hechos",
              "columnas": [
                "fecha",
                "id_producto",
                "id_region",
                "unidades",
                "precio_unitario"
              ]
            },
            {
              "nombre": "Producto",
              "rol": "dimension",
              "columnas": [
                "id_producto",
                "producto",
                "categoria"
              ],
              "claves": [
                "id_producto"
              ]
            },
            {
              "nombre": "Region",
              "rol": "dimension",
              "columnas": [
                "id_region",
                "region"
              ],
              "claves": [
                "id_region"
              ]
            },
            {
              "nombre": "Calendario",
              "rol": "dimension",
              "columnas": [
                "Fecha",
                "Año",
                "MesNum",
                "Mes",
                "Trimestre"
              ],
              "claves": [
                "Fecha"
              ]
            }
          ],
          "relaciones": [
            {
              "de": "Ventas.id_producto",
              "a": "Producto.id_producto",
              "cardinalidad": "*:1",
              "direccion": "unica"
            },
            {
              "de": "Ventas.id_region",
              "a": "Region.id_region",
              "cardinalidad": "*:1",
              "direccion": "unica"
            },
            {
              "de": "Ventas.fecha",
              "a": "Calendario.Fecha",
              "cardinalidad": "*:1",
              "direccion": "unica"
            }
          ],
          "titulo": "Modelo del proyecto Aurora"
        },
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "segmentador",
              "campo": "Año",
              "opciones": [
                "2023",
                "2024"
              ],
              "seleccion": [
                "2024"
              ]
            },
            {
              "tipo": "segmentador",
              "campo": "Región",
              "opciones": [
                "Norte",
                "Sur",
                "Este",
                "Oeste"
              ]
            },
            {
              "tipo": "tarjeta",
              "titulo": "Ingreso 2024 (miles)",
              "valor": "2 122",
              "variacion": "+19.7 % vs. 2023"
            },
            {
              "tipo": "tarjeta",
              "titulo": "Ingreso YTD (dic.)",
              "valor": "2 122 730"
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
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic"
              ],
              "series": [
                {
                  "nombre": "2024",
                  "valores": [
                    174,
                    167,
                    180,
                    147,
                    180,
                    154,
                    201,
                    175,
                    197,
                    181,
                    178,
                    188
                  ]
                },
                {
                  "nombre": "2023",
                  "valores": [
                    135,
                    146,
                    139,
                    152,
                    119,
                    151,
                    140,
                    173,
                    147,
                    169,
                    153,
                    149
                  ]
                }
              ]
            },
            {
              "tipo": "barras",
              "titulo": "Ingreso 2024 por categoría (miles)",
              "categorias": [
                "Tecnologia",
                "Oficina",
                "Accesorios"
              ],
              "valores": [
                1864,
                181,
                78
              ],
              "resaltar": [
                0
              ]
            }
          ],
          "pagina": "Resumen"
        }
      ],
      "pasos": [
        "El modelo es una estrella con **Ventas** al centro y tres dimensiones, con relaciones `1:*` de filtro único.",
        "La página **Resumen** debe mostrar un ingreso 2024 de **2 122 730**, con un +19.7 % frente a 2023.",
        "Si tu tablero muestra otras cifras, hay un error de datos, de relaciones o de medidas por encontrar."
      ],
      "conclusion": "Estas pantallas son la referencia visual: tu informe puede verse distinto, pero las cifras deben coincidir."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "La página de detalle",
      "pantallas": [
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "segmentador",
              "campo": "Año",
              "opciones": [
                "2023",
                "2024"
              ],
              "seleccion": [
                "2024"
              ]
            },
            {
              "tipo": "matriz",
              "titulo": "Ingreso 2024: producto × región",
              "columnas": [
                "producto",
                "Norte",
                "Sur",
                "Este",
                "Oeste",
                "Total"
              ],
              "filas": [
                [
                  "Laptop",
                  355200,
                  367200,
                  352800,
                  364800,
                  1440000
                ],
                [
                  "Monitor",
                  108500,
                  104300,
                  107800,
                  103600,
                  424200
                ],
                [
                  "Silla",
                  46200,
                  44400,
                  45900,
                  44100,
                  180600
                ],
                [
                  "Teclado",
                  13590,
                  13050,
                  13500,
                  13950,
                  54090
                ],
                [
                  "Mouse",
                  5880,
                  6080,
                  5840,
                  6040,
                  23840
                ]
              ]
            },
            {
              "tipo": "barras",
              "titulo": "Ranking de productos 2024 (miles)",
              "categorias": [
                "Laptop",
                "Monitor",
                "Silla",
                "Teclado",
                "Mouse"
              ],
              "valores": [
                1440,
                424,
                181,
                54,
                24
              ]
            }
          ],
          "pagina": "Detalle"
        }
      ],
      "pasos": [
        "La matriz cruza producto × región con la medida `[Ingreso]`; su total (columna y fila) coincide con las tarjetas del resumen.",
        "El ranking muestra a **Laptop** como el producto de mayor ingreso.",
        "Las segmentaciones de año y región filtran todo el informe sin romper los totales."
      ],
      "conclusion": "Al cambiar una segmentación, todas las cifras cambian de forma coherente: esa es la prueba de que el modelo funciona."
    },
    "errorFrecuente": {
      "codigo": "Ingreso 2024 en Power BI: 2 419 912      Ingreso 2024 de control: 2 122 730 → ¿cuál está bien?",
      "explicacion": "Cuando dos fuentes no coinciden, no se publica: se investiga. Las causas habituales son una relación con claves duplicadas (el total se infla), un filtro de página olvidado, un tipo de dato mal convertido o filas excluidas en Power Query. Las cifras de control sirven justo para detectar esto antes de que lo vea la dirección."
    },
    "practicaGuiada": {
      "id": "m46-l3-practica",
      "enunciado": "Verifica las **cifras de control** del tablero: estas son las cifras que debe mostrar tu informe.",
      "pantallas": [
        {
          "tipo": "informe",
          "visuales": [
            {
              "tipo": "segmentador",
              "campo": "Año",
              "opciones": [
                "2023",
                "2024"
              ],
              "seleccion": [
                "2024"
              ]
            },
            {
              "tipo": "segmentador",
              "campo": "Región",
              "opciones": [
                "Norte",
                "Sur",
                "Este",
                "Oeste"
              ]
            },
            {
              "tipo": "tarjeta",
              "titulo": "Ingreso 2024 (miles)",
              "valor": "2 122",
              "variacion": "+19.7 % vs. 2023"
            },
            {
              "tipo": "tarjeta",
              "titulo": "Ingreso YTD (dic.)",
              "valor": "2 122 730"
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
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic"
              ],
              "series": [
                {
                  "nombre": "2024",
                  "valores": [
                    174,
                    167,
                    180,
                    147,
                    180,
                    154,
                    201,
                    175,
                    197,
                    181,
                    178,
                    188
                  ]
                },
                {
                  "nombre": "2023",
                  "valores": [
                    135,
                    146,
                    139,
                    152,
                    119,
                    151,
                    140,
                    173,
                    147,
                    169,
                    153,
                    149
                  ]
                }
              ]
            },
            {
              "tipo": "barras",
              "titulo": "Ingreso 2024 por categoría (miles)",
              "categorias": [
                "Tecnologia",
                "Oficina",
                "Accesorios"
              ],
              "valores": [
                1864,
                181,
                78
              ],
              "resaltar": [
                0
              ]
            }
          ],
          "pagina": "Resumen"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Ingreso total de 2023",
          "valor": 1773060
        },
        {
          "tipo": "numero",
          "etiqueta": "Ingreso total de 2024",
          "valor": 2122730
        },
        {
          "tipo": "numero",
          "etiqueta": "Variación 2024 frente a 2023 (%, 1 decimal)",
          "valor": 19.7,
          "tolerancia": 0.05
        },
        {
          "tipo": "numero",
          "etiqueta": "Unidades vendidas en 2024",
          "valor": 3005
        }
      ],
      "solucion": [
        "Ingreso 2023: 1 773 060. Ingreso 2024: 2 122 730.",
        "Variación = (2122730 − 1773060) ÷ 1773060 × 100 = 19.7 %.",
        "Unidades 2024: 3005."
      ],
      "pistas": [
        "Compara estas cifras con las tarjetas de tu tablero."
      ]
    },
    "reto": {
      "id": "m46-l3-reto",
      "enunciado": "Encuentra los **hallazgos** del resumen ejecutivo con las cifras de control por producto y región (ya calculadas).",
      "datos": [
        {
          "columnas": [
            "producto",
            "Ingreso 2023",
            "Ingreso 2024"
          ],
          "filas": [
            [
              "Laptop",
              1207200,
              1440000
            ],
            [
              "Monitor",
              348600,
              424200
            ],
            [
              "Mouse",
              20400,
              23840
            ],
            [
              "Silla",
              151500,
              180600
            ],
            [
              "Teclado",
              45360,
              54090
            ]
          ]
        },
        {
          "columnas": [
            "region",
            "Ingreso 2023",
            "Ingreso 2024"
          ],
          "filas": [
            [
              "Norte",
              434500,
              529370
            ],
            [
              "Sur",
              440710,
              535030
            ],
            [
              "Este",
              457370,
              525840
            ],
            [
              "Oeste",
              440480,
              532490
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "Producto con mayor crecimiento del ingreso en 2024 frente a 2023",
          "opciones": [
            "Laptop",
            "Monitor",
            "Mouse",
            "Silla",
            "Teclado"
          ],
          "correcta": 1
        },
        {
          "tipo": "numero",
          "etiqueta": "Crecimiento de ese producto (%, 1 decimal)",
          "valor": 21.7,
          "tolerancia": 0.05
        },
        {
          "tipo": "opcion",
          "etiqueta": "Región con mayor crecimiento del ingreso en 2024 frente a 2023",
          "opciones": [
            "Norte",
            "Sur",
            "Este",
            "Oeste"
          ],
          "correcta": 0
        },
        {
          "tipo": "numero",
          "etiqueta": "Crecimiento de esa región (%, 1 decimal)",
          "valor": 21.8,
          "tolerancia": 0.05
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Qué revisarías si tu tablero muestra un ingreso 2024 mayor que la cifra de control?",
          "opciones": [
            "Que las claves de las dimensiones sean únicas",
            "Filtros de página o de informe olvidados",
            "El color del tema",
            "Filas duplicadas al cargar en Power Query"
          ],
          "correctas": [
            0,
            1,
            3
          ]
        }
      ],
      "solucion": [
        "Crecimiento por producto: Laptop +19.3 %, Monitor +21.7 %, Mouse +16.9 %, Silla +19.2 %, Teclado +19.2 %.",
        "Monitor: +21.7 %.",
        "Crecimiento por región: Norte +21.8 %, Sur +21.4 %, Este +15.0 %, Oeste +20.9 %.",
        "Norte: +21.8 %.",
        "Totales inflados: claves duplicadas, filtros olvidados o filas duplicadas."
      ],
      "pistas": [
        "Compara 2024 con 2023 dentro de cada producto y de cada región."
      ]
    },
    "verificacion": [
      {
        "id": "m46-l3-q1",
        "pregunta": "¿Para qué sirven las cifras de control?",
        "opciones": [
          "Para decorar el informe",
          "Para verificar el tablero contra un cálculo independiente",
          "Para publicar más rápido",
          "Para ordenar las tablas"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Si no coinciden, hay un error que encontrar antes de presentar."
      },
      {
        "id": "m46-l3-q2",
        "pregunta": "¿Qué suele ocurrir si la clave de una dimensión tiene duplicados?",
        "opciones": [
          "Nada",
          "Los totales pueden inflarse al combinar",
          "Se acelera el modelo",
          "Se cierra Power BI"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Las filas se multiplican en la relación."
      },
      {
        "id": "m46-l3-q3",
        "pregunta": "¿Puede este curso corregir automáticamente tu archivo .pbix?",
        "opciones": [
          "Sí",
          "No: se autoevalúa con la rúbrica y se verifican las cifras de control",
          "Solo si lo subes",
          "Solo en Mac"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "La plataforma no ejecuta Power BI."
      }
    ],
    "resumen": [
      "Un tablero completo: datos preparados, modelo en estrella, medidas, informe de dos páginas y verificación.",
      "Las cifras de control detectan errores antes de presentar.",
      "Documenta decisiones y límites en tu portafolio."
    ],
    "proximoPaso": "¡Has completado el curso de Visualización y Power BI! El siguiente paso de la ruta es Comunicación y negocio, y después Machine Learning.",
    "conceptos": [
      "proyecto-power-bi",
      "cifras-de-control"
    ]
  }
]
