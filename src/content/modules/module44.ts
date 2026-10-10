import type { Lesson } from '../../types'

export const module44Lessons: Lesson[] = [
  {
    "id": "m44-l1",
    "moduloId": "modulo-44",
    "motor": "calculo",
    "titulo": "Power BI: el flujo de trabajo y la calidad de los datos",
    "objetivo": "Entender las piezas de Power BI y el flujo obtener → transformar → modelar → visualizar → publicar, y perfilar la calidad de los datos antes de usarlos.",
    "porQueImporta": "Antes de aprender botones conviene entender el mapa: qué hace cada pieza y en qué orden. Y la mayor parte del tiempo de un proyecto de BI se va en preparar y validar datos, no en dibujar gráficos.",
    "concepto": "> **Nota**: Power BI Desktop (gratuito, solo para Windows) no se ejecuta en el navegador de este curso. Aquí ves cómo se ve cada paso en la herramienta y practicas con ejercicios de cálculo y de criterio que se corrigen solos. Para repetirlo de verdad, usa los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv) en Power BI Desktop.\n\n**Las piezas de Power BI**\n\n- **Power BI Desktop**: la aplicación gratuita donde se construyen los informes. Es solo para **Windows**; en Mac se usa una máquina virtual con Windows o el editor web del servicio, con funciones más limitadas.\n- **Servicio de Power BI** (en la nube, en el navegador): donde se publican, comparten y actualizan los informes. Compartir con otras personas suele requerir licencias de pago o una capacidad de Microsoft Fabric; las condiciones cambian con frecuencia, así que consulta la página oficial de licencias antes de planificar un despliegue.\n- **Power BI Mobile**: aplicación para consultar informes desde el teléfono.\n\n**Las vistas de Desktop** (iconos en la barra de la izquierda): **Informe** (el lienzo donde se dibujan los visuales), **Tabla** (los datos cargados), **Modelo** (las tablas y sus relaciones) y **Vista de consulta DAX** (para escribir y probar fórmulas). Al lado derecho están los paneles **Filtros**, **Visualizaciones** y **Datos** (campos).\n\n**El flujo de trabajo**\n\n1. **Obtener datos**: conectar con archivos (Excel, CSV), bases de datos (SQL), servicios en línea…\n2. **Transformar** con **Power Query** (lenguaje M): limpiar, cambiar tipos, combinar, filtrar. Cada paso queda registrado en *Pasos aplicados* y se repite en cada actualización.\n3. **Modelar**: relacionar tablas (modelo en estrella) y crear **medidas** con **DAX**.\n4. **Visualizar**: construir las páginas del informe.\n5. **Publicar y compartir**: enviar al servicio, programar la actualización de datos y controlar quién ve qué.\n\nEl archivo de Desktop es un `.pbix` (o un proyecto `.pbip` con carpetas de texto, mejor para control de versiones).\n\n**Perfilado de datos.** En Power Query, *Vista → Calidad de columna* muestra por columna el porcentaje de valores **válidos**, con **error** y **vacíos**, y *Distribución de columna* muestra los valores distintos. Haz ese diagnóstico siempre antes de modelar.\n\nLos datos de práctica del curso son sintéticos: las ventas de una tienda ficticia, «Aurora», con 480 registros en 24 meses. Puedes descargarlos en [`ventas-aurora.csv`](/datos/ventas-aurora.csv).",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Un CSV recién cargado, antes de transformarlo",
      "datos": [
        {
          "columnas": [
            "Columna",
            "Válido",
            "Error",
            "Vacío",
            "Distintos"
          ],
          "filas": [
            [
              "fecha",
              "100 %",
              "0 %",
              "0 %",
              5
            ],
            [
              "producto",
              "100 %",
              "0 %",
              "0 %",
              3
            ],
            [
              "region",
              "90 %",
              "0 %",
              "10 %",
              4
            ],
            [
              "unidades",
              "90 %",
              "10 %",
              "0 %",
              9
            ],
            [
              "precio_unitario",
              "90 %",
              "0 %",
              "10 %",
              3
            ]
          ],
          "titulo": "Perfil de columnas (calidad de la columna)"
        }
      ],
      "pantallas": [
        {
          "tipo": "powerquery",
          "consulta": "Ventas_Enero",
          "pasos": [
            "Origen",
            "Encabezados promovidos",
            "Tipo cambiado"
          ],
          "pasoActivo": 1,
          "columnas": [
            {
              "nombre": "fecha",
              "tipo": "fecha"
            },
            {
              "nombre": "producto",
              "tipo": "texto"
            },
            {
              "nombre": "region",
              "tipo": "texto"
            },
            {
              "nombre": "unidades",
              "tipo": "entero"
            },
            {
              "nombre": "precio_unitario",
              "tipo": "entero"
            }
          ],
          "filas": [
            [
              "2024-01-01",
              "Laptop",
              "Norte",
              5,
              2400
            ],
            [
              "2024-01-01",
              "Laptop",
              "Sur",
              10,
              2400
            ],
            [
              "2024-01-02",
              "Mouse",
              "Este",
              30,
              40
            ],
            [
              "2024-01-02",
              "Mouse",
              "Oeste",
              25,
              40
            ],
            [
              "2024-01-03",
              "Teclado",
              "Norte",
              12,
              85
            ],
            [
              "2024-01-03",
              "Teclado",
              null,
              8,
              85
            ]
          ],
          "formula": "= Table.PromoteHeaders(Origen, [PromoteAllScalars = true])",
          "consultas": [
            "Ventas_Enero"
          ]
        }
      ],
      "pasos": [
        "Power Query registró dos pasos automáticos: **Origen** (leer el CSV) y **Encabezados promovidos** (la primera fila pasa a ser el nombre de columnas).",
        "El perfil de calidad de las 10 filas muestra que `region` tiene **10 % de vacíos** (1 de 10), `unidades` tiene **10 % de error** (el texto «N/A» no se convierte a número) y `precio_unitario` tiene **10 % de vacíos**.",
        "Estos problemas se corrigen *antes* de modelar: filtrar o reemplazar valores, y cambiar el tipo de dato."
      ],
      "conclusion": "Perfilar primero evita que los errores se descubran en el informe, cuando el director ya lo está mirando."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "El mapa del flujo",
      "datos": [
        {
          "columnas": [
            "Etapa",
            "Dónde se hace",
            "Resultado"
          ],
          "filas": [
            [
              "1. Obtener datos",
              "Inicio → Obtener datos",
              "Conexión a la fuente"
            ],
            [
              "2. Transformar",
              "Editor de Power Query",
              "Tabla limpia y pasos repetibles"
            ],
            [
              "3. Modelar",
              "Vista Modelo y medidas DAX",
              "Estrella con medidas"
            ],
            [
              "4. Visualizar",
              "Vista Informe",
              "Páginas con visuales"
            ],
            [
              "5. Publicar",
              "Inicio → Publicar",
              "Informe en el servicio, con actualización programada"
            ]
          ]
        }
      ],
      "pasos": [
        "Las etapas son **secuenciales**: un error en una etapa temprana se arrastra a las siguientes.",
        "La mayor parte del tiempo se va en las etapas 2 y 3."
      ],
      "conclusion": "Quien entiende el mapa sabe dónde buscar cuando una cifra no cuadra."
    },
    "errorFrecuente": {
      "codigo": "La columna `unidades` aparece con «Σ» y suma 0 en el informe, aunque los datos «parecen números».",
      "explicacion": "Los datos que parecen números pero llegan como texto (con comas de miles, símbolos de moneda, espacios o «N/A») son una fuente clásica de errores: las sumas dan 0 o falla la conversión. Revisa siempre el tipo de cada columna y la configuración regional con la que se leen los números y las fechas."
    },
    "practicaGuiada": {
      "id": "m44-l1-practica",
      "enunciado": "Usa la tabla de 10 ventas cargada en Power Query.",
      "pantallas": [
        {
          "tipo": "powerquery",
          "consulta": "Ventas_Enero",
          "pasos": [
            "Origen",
            "Encabezados promovidos",
            "Tipo cambiado"
          ],
          "pasoActivo": 2,
          "columnas": [
            {
              "nombre": "fecha",
              "tipo": "fecha"
            },
            {
              "nombre": "producto",
              "tipo": "texto"
            },
            {
              "nombre": "region",
              "tipo": "texto"
            },
            {
              "nombre": "unidades",
              "tipo": "entero"
            },
            {
              "nombre": "precio_unitario",
              "tipo": "entero"
            }
          ],
          "filas": [
            [
              "2024-01-01",
              "Laptop",
              "Norte",
              5,
              2400
            ],
            [
              "2024-01-01",
              "Laptop",
              "Sur",
              10,
              2400
            ],
            [
              "2024-01-02",
              "Mouse",
              "Este",
              30,
              40
            ],
            [
              "2024-01-02",
              "Mouse",
              "Oeste",
              25,
              40
            ],
            [
              "2024-01-03",
              "Teclado",
              "Norte",
              12,
              85
            ],
            [
              "2024-01-03",
              "Teclado",
              null,
              8,
              85
            ],
            [
              "2024-01-04",
              "Laptop",
              "Este",
              "N/A",
              2400
            ],
            [
              "2024-01-04",
              "Mouse",
              "Sur",
              20,
              null
            ],
            [
              "2024-01-05",
              "Teclado",
              "Oeste",
              15,
              85
            ],
            [
              "2024-01-05",
              "Laptop",
              "Norte",
              6,
              2400
            ]
          ],
          "consultas": [
            "Ventas_Enero"
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Número de filas con la región vacía",
          "valor": 1
        },
        {
          "tipo": "numero",
          "etiqueta": "Número de filas con error en `unidades` (el texto «N/A»)",
          "valor": 1
        },
        {
          "tipo": "numero",
          "etiqueta": "Número de productos distintos",
          "valor": 3
        },
        {
          "tipo": "numero",
          "etiqueta": "Porcentaje de valores válidos en `precio_unitario` (%)",
          "valor": 90,
          "calculo": "=9/10*100"
        }
      ],
      "solucion": [
        "Región vacía: la venta del 3 de enero (Teclado, 8 unidades) → 1.",
        "Error en unidades: el «N/A» de la fila 7 → 1.",
        "Productos: Laptop, Mouse y Teclado → 3.",
        "`precio_unitario` está vacío en la fila 8: 9 de 10 válidos = 90 %."
      ],
      "pistas": [
        "Recorre cada columna y cuenta vacíos, errores y valores distintos."
      ]
    },
    "reto": {
      "id": "m44-l1-reto",
      "enunciado": "Decide qué hacer con los datos perfilados.",
      "datos": [
        {
          "columnas": [
            "fecha",
            "producto",
            "region",
            "unidades",
            "precio_unitario"
          ],
          "filas": [
            [
              "2024-01-01",
              "Laptop",
              "Norte",
              5,
              2400
            ],
            [
              "2024-01-01",
              "Laptop",
              "Sur",
              10,
              2400
            ],
            [
              "2024-01-02",
              "Mouse",
              "Este",
              30,
              40
            ],
            [
              "2024-01-02",
              "Mouse",
              "Oeste",
              25,
              40
            ],
            [
              "2024-01-03",
              "Teclado",
              "Norte",
              12,
              85
            ],
            [
              "2024-01-03",
              "Teclado",
              "(vacío)",
              8,
              85
            ],
            [
              "2024-01-04",
              "Laptop",
              "Este",
              "N/A",
              2400
            ],
            [
              "2024-01-04",
              "Mouse",
              "Sur",
              20,
              "(vacío)"
            ],
            [
              "2024-01-05",
              "Teclado",
              "Oeste",
              15,
              85
            ],
            [
              "2024-01-05",
              "Laptop",
              "Norte",
              6,
              2400
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "La fila con «N/A» en `unidades` debe…",
          "opciones": [
            "Dejarse: Power BI lo interpretará como cero",
            "Revisarse: convertir a número da error; se corrige en la fuente o se reemplaza el valor",
            "Borrar toda la columna",
            "Ignorarse en el informe"
          ],
          "correcta": 1
        },
        {
          "tipo": "numero",
          "etiqueta": "Si se eliminan las filas con cualquier vacío o error, ¿cuántas filas quedan de las 10?",
          "valor": 7,
          "calculo": "=10-3"
        },
        {
          "tipo": "numero",
          "etiqueta": "Porcentaje de filas que se pierde (%)",
          "valor": 30,
          "calculo": "=3/10*100"
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Qué conviene hacer antes de modelar?",
          "opciones": [
            "Revisar el tipo de dato de cada columna",
            "Perfilar vacíos y errores",
            "Publicar el informe para ver si «aparece algo raro»",
            "Documentar qué filas se excluyen y por qué"
          ],
          "correctas": [
            0,
            1,
            3
          ]
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué etapa del flujo viene justo después de Transformar?",
          "opciones": [
            "Obtener datos",
            "Modelar",
            "Publicar",
            "Visualizar"
          ],
          "correcta": 1
        }
      ],
      "solucion": [
        "«N/A» no es un número: genera un error de conversión y debe tratarse de forma explícita.",
        "Filas con problemas: la 6 (región vacía), la 7 (error) y la 8 (precio vacío): quedan 10 − 3 = 7.",
        "Se pierde 3 ÷ 10 = 30 %: demasiado para borrar sin pensar; mejor corregir o imputar y documentar.",
        "Revisar tipos, perfilar y documentar exclusiones son buenas prácticas.",
        "Obtener → Transformar → Modelar → Visualizar → Publicar."
      ],
      "pistas": [
        "Cuenta las filas distintas con problema (una fila puede tener más de un problema)."
      ]
    },
    "verificacion": [
      {
        "id": "m44-l1-q1",
        "pregunta": "¿En qué sistema operativo se ejecuta Power BI Desktop?",
        "opciones": [
          "Windows",
          "macOS",
          "Linux",
          "Solo en el navegador"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Desktop es solo para Windows; en Mac se usa una máquina virtual o el editor web."
      },
      {
        "id": "m44-l1-q2",
        "pregunta": "¿Cuál es el orden habitual del flujo de trabajo?",
        "opciones": [
          "Visualizar, obtener, publicar, transformar",
          "Obtener datos, transformar, modelar, visualizar, publicar",
          "Publicar, modelar, obtener, visualizar",
          "Modelar, obtener, publicar, visualizar"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Cada etapa depende de la anterior."
      },
      {
        "id": "m44-l1-q3",
        "pregunta": "¿Para qué sirve perfilar los datos?",
        "opciones": [
          "Para adornar el informe",
          "Para conocer vacíos, errores y valores distintos antes de modelar",
          "Para publicar más rápido",
          "Para cambiar el tema"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Conocer la calidad evita errores posteriores."
      }
    ],
    "resumen": [
      "Desktop (Windows) para construir, servicio para publicar y compartir.",
      "Obtener → transformar → modelar → visualizar → publicar.",
      "Perfila siempre: vacíos, errores y distintos."
    ],
    "proximoPaso": "Aprenderemos las transformaciones esenciales de Power Query.",
    "conceptos": [
      "power-bi",
      "perfilado-de-datos"
    ]
  },
  {
    "id": "m44-l2",
    "moduloId": "modulo-44",
    "motor": "calculo",
    "titulo": "Power Query: transformaciones esenciales",
    "objetivo": "Conocer las transformaciones esenciales de Power Query (filtrar, cambiar tipo, columna nueva, anular dinamización, combinar, agrupar) y predecir el resultado de cada una.",
    "porQueImporta": "Power Query convierte tareas que en Excel se hacían a mano en pasos repetibles. Quien entiende la lógica (anular dinamización, combinar, agrupar) la aplica igual en Power Query, en SQL o en cualquier otra herramienta.",
    "concepto": "> **Nota**: Power BI Desktop (gratuito, solo para Windows) no se ejecuta en el navegador de este curso. Aquí ves cómo se ve cada paso en la herramienta y practicas con ejercicios de cálculo y de criterio que se corrigen solos. Para repetirlo de verdad, usa los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv) en Power BI Desktop.\n\nEn Power Query cada acción que haces con el ratón genera un paso en el panel **Pasos aplicados** y una línea en un lenguaje llamado **M**. Las transformaciones más usadas, con el botón donde se encuentran y su fórmula M:\n\n| Qué haces | Dónde | Fórmula M |\n|---|---|---|\n| Filtrar filas | Flecha del encabezado | `Table.SelectRows(Origen, each [unidades] > 0)` |\n| Quitar columnas | Inicio → Quitar columnas | `Table.RemoveColumns(Origen, {\"nota\"})` |\n| Cambiar tipo | Icono del tipo en el encabezado | `Table.TransformColumnTypes(Origen, {{\"fecha\", type date}})` |\n| Columna nueva | Agregar columna → Personalizada | `Table.AddColumn(Origen, \"ingreso\", each [unidades] * [precio])` |\n| Quitar duplicados | Inicio → Quitar filas → duplicados | `Table.Distinct(Origen)` |\n| Rellenar hacia abajo | Transformar → Rellenar | `Table.FillDown(Origen, {\"region\"})` |\n| Agrupar | Transformar → Agrupar por | `Table.Group(Origen, {\"region\"}, {{\"total\", each List.Sum([ingreso]), type number}})` |\n| Anular dinamización | Transformar → Anular dinamización de columnas | `Table.UnpivotOtherColumns(Origen, {\"producto\"}, \"mes\", \"ventas\")` |\n| Combinar consultas (como un JOIN) | Inicio → Combinar consultas | `Table.NestedJoin(...)` y luego expandir |\n| Anexar consultas (apilar tablas) | Inicio → Anexar consultas | `Table.Combine({t1, t2})` |\n\nPor ejemplo, la columna nueva de ingreso se ve así en el editor avanzado:\n\n```m\nlet\n    Origen = Csv.Document(File.Contents(\"ventas-aurora.csv\")),\n    Tipos = Table.TransformColumnTypes(Origen, {{\"unidades\", Int64.Type}}),\n    Ingreso = Table.AddColumn(Tipos, \"ingreso\", each [unidades] * [precio_unitario])\nin\n    Ingreso\n```\n\n**Anular dinamización** es la transformación que más tiempo ahorra: los informes de Excel suelen venir con un mes por columna (formato ancho), pero para analizar y graficar se necesita un formato largo, con una columna «mes» y otra «ventas». Filas resultantes = filas originales × columnas anuladas.\n\n**Combinar consultas** admite varios tipos de unión: *externa izquierda* (todas las filas de la primera tabla; las que no tienen pareja quedan vacías), *interna* (solo las filas con pareja), etc.\n\n**Plegado de consultas** (*query folding*): cuando la fuente es una base de datos, Power Query intenta traducir los pasos a una sola consulta SQL que se ejecuta en el servidor, mucho más rápido que traer todos los datos. Conviene hacer primero los pasos que se pueden plegar (filtros, selección de columnas) y dejar para el final los que lo impiden.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Filtrar filas y crear la columna de ingreso",
      "pantallas": [
        {
          "tipo": "powerquery",
          "consulta": "Ventas",
          "pasos": [
            "Origen",
            "Tipo cambiado",
            "Filas filtradas",
            "Columna personalizada agregada"
          ],
          "pasoActivo": 3,
          "columnas": [
            {
              "nombre": "producto",
              "tipo": "texto"
            },
            {
              "nombre": "unidades",
              "tipo": "entero"
            },
            {
              "nombre": "precio_unitario",
              "tipo": "entero"
            },
            {
              "nombre": "ingreso",
              "tipo": "entero"
            }
          ],
          "filas": [
            [
              "Laptop",
              5,
              2400,
              12000
            ],
            [
              "Mouse",
              30,
              40,
              1200
            ],
            [
              "Teclado",
              12,
              85,
              1020
            ],
            [
              "Laptop",
              6,
              2400,
              14400
            ]
          ],
          "formula": "= Table.AddColumn(#\"Filas filtradas\", \"ingreso\", each [unidades] * [precio_unitario])",
          "consultas": [
            "Ventas",
            "Producto"
          ]
        }
      ],
      "pasos": [
        "**Filas filtradas**: se descartaron las filas con `unidades` ≤ 0 (devoluciones).",
        "**Columna personalizada**: `ingreso = unidades × precio_unitario`; la primera fila da 5 × 2400 = **12 000**.",
        "Los pasos se repiten solos cada vez que se actualiza el origen."
      ],
      "conclusion": "El orden de los pasos importa: el filtro va antes de calcular el ingreso."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Anular dinamización: de ancho a largo",
      "datos": [
        {
          "columnas": [
            "producto",
            "Ene",
            "Feb",
            "Mar",
            "Abr"
          ],
          "filas": [
            [
              "Laptop",
              12,
              15,
              10,
              18
            ],
            [
              "Mouse",
              80,
              75,
              90,
              85
            ],
            [
              "Teclado",
              30,
              25,
              40,
              35
            ]
          ],
          "titulo": "Antes (formato ancho)"
        },
        {
          "columnas": [
            "producto",
            "mes",
            "ventas"
          ],
          "filas": [
            [
              "Laptop",
              "Ene",
              12
            ],
            [
              "Laptop",
              "Feb",
              15
            ],
            [
              "Laptop",
              "Mar",
              10
            ],
            [
              "Laptop",
              "Abr",
              18
            ],
            [
              "Mouse",
              "Ene",
              80
            ],
            [
              "Mouse",
              "Feb",
              75
            ],
            [
              "…",
              "…",
              "…"
            ]
          ],
          "titulo": "Después (formato largo, primeras filas)"
        }
      ],
      "pasos": [
        "Se seleccionó la columna `producto` y se aplicó **Anular dinamización de otras columnas**: Ene–Abr pasan a filas.",
        "Filas resultantes = 3 productos × 4 meses = **12**; columnas = 3 (`producto`, `mes`, `ventas`).",
        "En el formato largo se puede graficar `ventas` por `mes` y filtrar por producto."
      ],
      "conclusion": "Con un mes por columna no se puede construir un gráfico de líneas fácilmente: hay que anular la dinamización."
    },
    "errorFrecuente": {
      "codigo": "Combinar Ventas con Producto: «P9» no aparece en Producto y la fila queda con valores vacíos al expandir.",
      "explicacion": "Los combinados fallan casi siempre por claves sucias o ausentes: espacios al final, mayúsculas distintas, tipos diferentes (número frente a texto) o claves que no existen en la otra tabla. Antes de combinar, limpia las claves (recortar espacios, unificar mayúsculas, igualar tipos) y comprueba cuántas filas quedan sin pareja."
    },
    "practicaGuiada": {
      "id": "m44-l2-practica",
      "enunciado": "Predice el resultado de cada transformación sobre la tabla ancha de la lección (3 productos, 4 meses).",
      "datos": [
        {
          "columnas": [
            "producto",
            "Ene",
            "Feb",
            "Mar",
            "Abr"
          ],
          "filas": [
            [
              "Laptop",
              12,
              15,
              10,
              18
            ],
            [
              "Mouse",
              80,
              75,
              90,
              85
            ],
            [
              "Teclado",
              30,
              25,
              40,
              35
            ]
          ]
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Filas tras anular la dinamización de Ene–Abr",
          "valor": 12
        },
        {
          "tipo": "numero",
          "etiqueta": "Columnas tras anular la dinamización",
          "valor": 3
        },
        {
          "tipo": "numero",
          "etiqueta": "Ventas de Mouse en el mes de «Mar» en la tabla larga",
          "valor": 90
        },
        {
          "tipo": "numero",
          "etiqueta": "Suma de las ventas de Laptop en los 4 meses",
          "valor": 55,
          "calculo": "=12+15+10+18"
        }
      ],
      "solucion": [
        "3 productos × 4 meses = 12 filas.",
        "Quedan `producto`, `mes` y `ventas`: 3 columnas.",
        "Mouse en marzo: 90.",
        "Laptop: 12 + 15 + 10 + 18 = 55."
      ],
      "pistas": [
        "Cada celda de mes se convierte en una fila."
      ]
    },
    "reto": {
      "id": "m44-l2-reto",
      "enunciado": "Combina Ventas con Producto por la clave `id_producto` y evalúa el resultado.",
      "datos": [
        {
          "columnas": [
            "id_venta",
            "id_producto",
            "importe"
          ],
          "filas": [
            [
              "V1",
              "P1",
              100
            ],
            [
              "V2",
              "P2",
              150
            ],
            [
              "V3",
              "P2",
              120
            ],
            [
              "V4",
              "P9",
              80
            ],
            [
              "V5",
              "P3",
              60
            ]
          ],
          "titulo": "Ventas"
        },
        {
          "columnas": [
            "id_producto",
            "producto"
          ],
          "filas": [
            [
              "P1",
              "Laptop"
            ],
            [
              "P2",
              "Mouse"
            ],
            [
              "P3",
              "Teclado"
            ]
          ],
          "titulo": "Producto"
        }
      ],
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Filas de Ventas",
          "valor": 5
        },
        {
          "tipo": "numero",
          "etiqueta": "Filas del resultado con una combinación **externa izquierda** (todas las de Ventas)",
          "valor": 5
        },
        {
          "tipo": "numero",
          "etiqueta": "Filas del resultado con una combinación **interna** (solo las que tienen pareja)",
          "valor": 4
        },
        {
          "tipo": "numero",
          "etiqueta": "Filas de Ventas sin pareja en Producto",
          "valor": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué clave causa las filas sin pareja?",
          "opciones": [
            "P1",
            "P2",
            "P3",
            "P9"
          ],
          "correcta": 3
        },
        {
          "tipo": "opcion",
          "etiqueta": "Para comprobar cuántas filas quedaron sin pareja, tras combinar se debe…",
          "opciones": [
            "Ignorar los vacíos",
            "Revisar las filas con valores vacíos en las columnas expandidas",
            "Eliminar la tabla Producto",
            "Cambiar el tema del informe"
          ],
          "correcta": 1
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Qué ayuda al plegado de consultas con una base de datos?",
          "opciones": [
            "Filtrar y quitar columnas al principio",
            "Hacer pasos que el servidor no puede traducir lo antes posible",
            "Mantener los pasos que se traducen a SQL antes que los demás"
          ],
          "correctas": [
            0,
            2
          ]
        }
      ],
      "solucion": [
        "Ventas tiene 5 filas (V1 a V5).",
        "La externa izquierda conserva las 5 filas; la de V4 (P9) queda con vacíos.",
        "La interna descarta V4: quedan 4.",
        "Solo V4 (clave P9) no tiene pareja.",
        "La clave sin pareja es P9.",
        "Las filas sin pareja se detectan buscando vacíos en lo que se expandió.",
        "Filtrar y quitar columnas pronto, y dejar para el final los pasos que impiden el plegado."
      ],
      "pistas": [
        "Cuenta cuántas claves de Ventas existen en Producto."
      ]
    },
    "verificacion": [
      {
        "id": "m44-l2-q1",
        "pregunta": "¿Qué hace «Anular dinamización de columnas»?",
        "opciones": [
          "Convierte columnas (por ejemplo, un mes por columna) en filas",
          "Borra columnas",
          "Ordena la tabla",
          "Cambia el idioma"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Pasa de formato ancho a largo."
      },
      {
        "id": "m44-l2-q2",
        "pregunta": "Una combinación externa izquierda de Ventas con Producto conserva…",
        "opciones": [
          "Solo las filas con pareja",
          "Todas las filas de Ventas",
          "Todas las filas de Producto",
          "Ninguna fila"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Las que no tienen pareja quedan con vacíos."
      },
      {
        "id": "m44-l2-q3",
        "pregunta": "¿Qué es el plegado de consultas (*query folding*)?",
        "opciones": [
          "Que Power Query traduzca los pasos a una consulta que ejecuta el servidor de origen",
          "Plegar el panel de pasos",
          "Un tipo de gráfico",
          "Un error de conexión"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Evita traer todos los datos y procesarlos localmente."
      }
    ],
    "resumen": [
      "Cada acción genera un paso en Pasos aplicados y una línea en M.",
      "Anular dinamización: filas = filas × columnas anuladas.",
      "Combina limpiando las claves y revisando las filas sin pareja."
    ],
    "proximoPaso": "Modelaremos los datos con un esquema en estrella.",
    "conceptos": [
      "power-query",
      "unpivot",
      "merge-queries"
    ]
  },
  {
    "id": "m44-l3",
    "moduloId": "modulo-44",
    "motor": "calculo",
    "titulo": "Modelo en estrella: hechos, dimensiones y relaciones",
    "objetivo": "Separar una tabla plana en tabla de hechos y dimensiones, definir relaciones uno a muchos y comprobar la integridad del modelo.",
    "porQueImporta": "Un buen modelo es la diferencia entre un informe que responde bien y rápido, y uno que da totales incorrectos o se vuelve lento. Casi todos los problemas de DAX que ve un principiante vienen de un modelo mal planteado.",
    "concepto": "> **Nota**: Power BI Desktop (gratuito, solo para Windows) no se ejecuta en el navegador de este curso. Aquí ves cómo se ve cada paso en la herramienta y practicas con ejercicios de cálculo y de criterio que se corrigen solos. Para repetirlo de verdad, usa los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv) en Power BI Desktop.\n\n**Tabla de hechos**: registra eventos o transacciones (una venta, un pedido): contiene **medidas numéricas** (unidades, importe) y **claves** hacia las dimensiones. Suele ser la tabla más grande.\n\n**Tablas de dimensión**: describen el contexto por el que se quiere filtrar o agrupar (producto, región, cliente, fecha). Tienen **una fila por elemento**, con una clave única y atributos descriptivos.\n\n**Esquema en estrella**: una tabla de hechos en el centro y las dimensiones alrededor, cada una relacionada con la de hechos mediante una relación **uno a muchos** (`1:*`): un producto aparece en muchas ventas, pero cada venta es de un solo producto. Se construye en la **Vista de modelo** arrastrando una clave sobre la otra.\n\nReglas prácticas:\n\n- La clave de la dimensión debe ser **única** y sin vacíos; si hay duplicados, la relación `1:*` no se puede crear.\n- El filtro viaja **de la dimensión (lado uno) hacia los hechos (lado muchos)**: al seleccionar «Norte» en una segmentación, se filtran las ventas de Norte. Mantén la **dirección única** por defecto; el filtro bidireccional y las relaciones muchos a muchos solo se usan con una razón clara, porque generan ambigüedad y lentitud.\n- **Granularidad**: define qué representa una fila de hechos (aquí: una venta de un producto en una región y fecha). Todo debe ser coherente con ella.\n- Una relación **activa** se dibuja con línea continua; una **inactiva**, discontinua (solo se usa con funciones DAX específicas).\n- Evita una única tabla ancha con todo repetido: ocupa más memoria, es más difícil de mantener y complica los cálculos.",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "El modelo de Aurora",
      "pantallas": [
        {
          "tipo": "modelo",
          "tablas": [
            {
              "nombre": "Ventas",
              "rol": "hechos",
              "columnas": [
                "id_venta",
                "fecha",
                "id_producto",
                "id_region",
                "unidades",
                "precio_unitario"
              ],
              "claves": [
                "id_venta"
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
                "region",
                "zona"
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
          "titulo": "Vista de modelo: esquema en estrella de Aurora"
        }
      ],
      "pasos": [
        "**Ventas** es la tabla de **hechos**: una fila por venta, con unidades y precio.",
        "**Producto**, **Region** y **Calendario** son **dimensiones**: una fila por producto, región o día.",
        "Cada relación es `1:*` con filtro **único**: el filtro baja de la dimensión a los hechos."
      ],
      "conclusion": "Una segmentación por `Region[region]` filtra las ventas porque la relación lleva el filtro hacia Ventas."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Qué pasa cuando la clave de la dimensión se repite",
      "datos": [
        {
          "columnas": [
            "id_venta",
            "id_producto",
            "importe"
          ],
          "filas": [
            [
              "V1",
              "P1",
              100
            ],
            [
              "V2",
              "P2",
              150
            ],
            [
              "V3",
              "P2",
              120
            ]
          ],
          "titulo": "Ventas (total real: 370)"
        },
        {
          "columnas": [
            "id_producto",
            "producto"
          ],
          "filas": [
            [
              "P1",
              "Laptop"
            ],
            [
              "P2",
              "Mouse"
            ],
            [
              "P2",
              "Mouse (duplicado)"
            ]
          ],
          "titulo": "Producto (clave P2 repetida)"
        }
      ],
      "pasos": [
        "Al unir por `id_producto`, cada venta de P2 se combina con **dos** filas de Producto.",
        "El resultado tiene 100 + 150 × 2 + 120 × 2 = **640** en lugar de 370: los totales se inflan.",
        "Por eso la dimensión necesita una clave **única**."
      ],
      "conclusion": "Verifica la unicidad de la clave de cada dimensión antes de crear la relación."
    },
    "errorFrecuente": {
      "codigo": "Dejar la clave de la dimensión con duplicados porque «Power BI igual la deja relacionar».",
      "explicacion": "Si la «dimensión» tiene claves repetidas, Power BI no puede crear una relación `1:*` (o la convierte en muchos a muchos) y los totales se duplican al combinar. Antes de modelar, verifica que la clave de cada dimensión es única y no tiene vacíos."
    },
    "practicaGuiada": {
      "id": "m44-l3-practica",
      "enunciado": "Clasifica y razona sobre el modelo de la lección.",
      "pantallas": [
        {
          "tipo": "modelo",
          "tablas": [
            {
              "nombre": "Ventas",
              "rol": "hechos",
              "columnas": [
                "id_venta",
                "fecha",
                "id_producto",
                "id_region",
                "unidades",
                "precio_unitario"
              ],
              "claves": [
                "id_venta"
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
                "region",
                "zona"
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
          "titulo": "Vista de modelo: esquema en estrella de Aurora"
        }
      ],
      "preguntas": [
        {
          "tipo": "casillas",
          "etiqueta": "¿Cuáles son tablas de dimensión?",
          "opciones": [
            "Ventas",
            "Producto",
            "Region",
            "Calendario"
          ],
          "correctas": [
            1,
            2,
            3
          ]
        },
        {
          "tipo": "opcion",
          "etiqueta": "La relación Producto → Ventas es…",
          "opciones": [
            "Uno a uno (`1:1`)",
            "Uno a muchos (`1:*`)",
            "Muchos a muchos"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "Al seleccionar «Norte» en una segmentación de `Region[region]`, el filtro viaja…",
          "opciones": [
            "De Ventas hacia Region",
            "De Region hacia Ventas",
            "No viaja"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué representa una fila de Ventas (granularidad)?",
          "opciones": [
            "Un producto",
            "Una región",
            "Una venta (producto, región y fecha)",
            "Un año"
          ],
          "correcta": 2
        }
      ],
      "solucion": [
        "Producto, Region y Calendario describen el contexto: son dimensiones.",
        "Un producto aparece en muchas ventas, cada venta es de un producto: `1:*`.",
        "El filtro baja de la dimensión (lado uno) a los hechos (lado muchos).",
        "Cada fila de hechos es una venta."
      ],
      "pistas": [
        "Mira el diagrama: qué tabla tiene las medidas numéricas."
      ]
    },
    "reto": {
      "id": "m44-l3-reto",
      "enunciado": "Una dimensión de región por error tiene la clave R2 duplicada. Las ventas son: R1 → 200, R2 → 300, R3 → 100.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Total real de ventas",
          "valor": 600,
          "calculo": "=200+300+100"
        },
        {
          "tipo": "numero",
          "etiqueta": "Total que muestra el modelo si R2 aparece dos veces en la dimensión y se combinan las tablas",
          "valor": 900,
          "calculo": "=200+300*2+100"
        },
        {
          "tipo": "numero",
          "etiqueta": "Exceso respecto al total real",
          "valor": 300,
          "calculo": "=900-600"
        },
        {
          "tipo": "opcion",
          "etiqueta": "La solución correcta es…",
          "opciones": [
            "Ignorar el exceso",
            "Depurar la dimensión para que cada clave sea única",
            "Cambiar el tipo de gráfico",
            "Quitar la tabla de hechos"
          ],
          "correcta": 1
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Cuáles son buenas prácticas de modelado?",
          "opciones": [
            "Relaciones 1:* con filtro único",
            "Una tabla ancha con todo repetido",
            "Una tabla de fechas propia",
            "Claves únicas en las dimensiones",
            "Filtros bidireccionales en todas las relaciones"
          ],
          "correctas": [
            0,
            2,
            3
          ]
        }
      ],
      "solucion": [
        "200 + 300 + 100 = 600.",
        "R2 aparece dos veces: 200 + 300 × 2 + 100 = 900.",
        "Exceso: 900 − 600 = 300.",
        "La dimensión debe tener una fila por región.",
        "Estrella, `1:*` con filtro único, tabla de fechas propia y claves únicas."
      ],
      "pistas": [
        "Cada venta de R2 se cuenta tantas veces como filas de R2 haya en la dimensión."
      ]
    },
    "verificacion": [
      {
        "id": "m44-l3-q1",
        "pregunta": "¿Qué tipo de relación une una dimensión con la tabla de hechos?",
        "opciones": [
          "Uno a muchos (`1:*`)",
          "Muchos a muchos",
          "Uno a uno siempre",
          "Ninguna"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Un elemento de la dimensión aparece en muchos hechos."
      },
      {
        "id": "m44-l3-q2",
        "pregunta": "¿Por qué es un problema que la clave de una dimensión tenga duplicados?",
        "opciones": [
          "No es un problema",
          "Impide la relación 1:* y puede inflar los totales",
          "Acelera el modelo",
          "Cambia el color"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Las filas se multiplican en la relación."
      },
      {
        "id": "m44-l3-q3",
        "pregunta": "¿En qué dirección viaja el filtro, por defecto, en una relación 1:*?",
        "opciones": [
          "De los hechos a la dimensión",
          "De la dimensión (lado uno) a los hechos (lado muchos)",
          "En ambas",
          "En ninguna"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Dirección única de uno a muchos."
      }
    ],
    "resumen": [
      "Hechos al centro, dimensiones alrededor, relaciones 1:* con filtro único.",
      "Claves únicas en las dimensiones.",
      "Define la granularidad de los hechos."
    ],
    "proximoPaso": "Añadiremos la dimensión más importante: la tabla de fechas.",
    "conceptos": [
      "modelo-en-estrella",
      "hechos-y-dimensiones"
    ]
  },
  {
    "id": "m44-l4",
    "moduloId": "modulo-44",
    "motor": "calculo",
    "titulo": "La tabla de fechas (calendario) y el tiempo en el modelo",
    "objetivo": "Construir una tabla de calendario con las columnas habituales (año, mes, trimestre) y entender por qué el análisis temporal en Power BI la necesita.",
    "porQueImporta": "Comparar contra el año anterior, acumular en el año o agrupar por trimestre solo funciona bien si existe una tabla de fechas completa y correctamente relacionada. Es la dimensión que más se reutiliza en cualquier proyecto.",
    "concepto": "> **Nota**: Power BI Desktop (gratuito, solo para Windows) no se ejecuta en el navegador de este curso. Aquí ves cómo se ve cada paso en la herramienta y practicas con ejercicios de cálculo y de criterio que se corrigen solos. Para repetirlo de verdad, usa los datos de [`ventas-aurora.csv`](/datos/ventas-aurora.csv) en Power BI Desktop.\n\n**Por qué una tabla de calendario.** La columna de fechas de la tabla de hechos tiene huecos (días sin ventas) y no trae atributos (nombre del mes, trimestre, semana). La **tabla de fechas** tiene:\n\n- **Una fila por día**, sin huecos, que cubre años completos (del 1 de enero al 31 de diciembre).\n- Atributos: año, número y nombre del mes, trimestre, día de la semana…\n- Columnas de **orden**: el nombre del mes ordena alfabéticamente (abril antes que enero), así que se usa *Ordenar por columna* con el número del mes.\n\nEn Power BI se crea en la pestaña *Modelado → Nueva tabla* con DAX:\n\n```dax\nCalendario = CALENDAR(DATE(2023, 1, 1), DATE(2024, 12, 31))\n```\n\no `CALENDARAUTO()`, que detecta el rango de fechas del modelo; también con Power Query. Después se relaciona con la tabla de hechos (`Calendario[Fecha]` `1:*` `Ventas[fecha]`) y se **marca como tabla de fechas** (*Herramientas de tabla → Marcar como tabla de fechas*), lo que habilita las funciones de inteligencia de tiempo.\n\nDetalles:\n\n- Si las ventas se registran un solo día de cada mes, la tabla de fechas sigue teniendo todos los días y la relación enlaza solo los días que existen en los hechos.\n- Power BI puede crear tablas de fechas ocultas automáticamente (*Fecha y hora automáticas*), pero en modelos serios se desactiva y se usa una tabla propia, la misma para todas las tablas de hechos.\n- Un año bisiesto tiene 366 días (febrero con 29).",
    "ejemploMinimo": {
      "tipo": "resuelto",
      "titulo": "Crear la tabla Calendario con DAX",
      "datos": [
        {
          "columnas": [
            "Fecha",
            "Año",
            "MesNum",
            "Mes",
            "Trimestre"
          ],
          "filas": [
            [
              "2024-01-01",
              2024,
              1,
              "ene",
              "T1"
            ],
            [
              "2024-01-02",
              2024,
              1,
              "ene",
              "T1"
            ],
            [
              "2024-01-03",
              2024,
              1,
              "ene",
              "T1"
            ],
            [
              "2024-02-29",
              2024,
              2,
              "feb",
              "T1"
            ],
            [
              "2024-03-01",
              2024,
              3,
              "mar",
              "T1"
            ]
          ],
          "titulo": "Calendario (algunas filas)"
        }
      ],
      "pantallas": [
        {
          "tipo": "medida",
          "dax": "Calendario =\nADDCOLUMNS(\n    CALENDAR(DATE(2023, 1, 1), DATE(2024, 12, 31)),\n    \"Año\", YEAR([Date]),\n    \"MesNum\", MONTH([Date]),\n    \"Mes\", FORMAT([Date], \"mmm\"),\n    \"Trimestre\", \"T\" & QUARTER([Date])\n)",
          "objeto": "tabla",
          "tabla": "Calendario"
        }
      ],
      "pasos": [
        "`CALENDAR` genera **una fila por día** entre las dos fechas: 2023 y 2024 → 365 + 366 = **731** filas.",
        "`ADDCOLUMNS` agrega Año, MesNum, Mes y Trimestre.",
        "El nombre del mes se ordena con *Ordenar por columna → MesNum*; si no, abril iría antes que enero."
      ],
      "conclusion": "Con esta tabla relacionada y marcada, las funciones de tiempo funcionan."
    },
    "ejemploAplicado": {
      "tipo": "resuelto",
      "titulo": "Relacionar y marcar el calendario",
      "pantallas": [
        {
          "tipo": "modelo",
          "tablas": [
            {
              "nombre": "Ventas",
              "rol": "hechos",
              "columnas": [
                "id_venta",
                "fecha",
                "id_producto",
                "id_region",
                "unidades",
                "precio_unitario"
              ],
              "claves": [
                "id_venta"
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
                "region",
                "zona"
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
          "titulo": "Vista de modelo: esquema en estrella de Aurora"
        }
      ],
      "pasos": [
        "`Calendario[Fecha]` se relaciona con `Ventas[fecha]` con una relación `1:*` y filtro único.",
        "Se marca `Calendario` como **tabla de fechas** indicando la columna `Fecha`.",
        "Los visuales usan `Calendario[Mes]` en el eje, no la fecha de Ventas."
      ],
      "conclusion": "Una sola tabla de fechas sirve para todas las tablas de hechos del modelo."
    },
    "errorFrecuente": {
      "codigo": "Usar la columna de fechas de Ventas para calcular «mismo periodo del año anterior» sin una tabla de calendario.",
      "explicacion": "Las funciones de inteligencia de tiempo necesitan fechas continuas y completas. Con las fechas de la tabla de hechos hay días ausentes, y los cálculos del tipo «mismo periodo del año anterior» dan resultados incorrectos o vacíos. Usa una tabla de calendario propia, que cubra años completos."
    },
    "practicaGuiada": {
      "id": "m44-l4-practica",
      "enunciado": "Razona sobre la tabla de fechas de 2024.",
      "preguntas": [
        {
          "tipo": "numero",
          "etiqueta": "Filas de la tabla de fechas de todo 2024",
          "valor": 366
        },
        {
          "tipo": "numero",
          "etiqueta": "Días de febrero de 2024",
          "valor": 29
        },
        {
          "tipo": "numero",
          "etiqueta": "Trimestre al que pertenece mayo (número)",
          "valor": 2
        },
        {
          "tipo": "numero",
          "etiqueta": "Filas de la tabla de 2023 y 2024 juntos",
          "valor": 731,
          "calculo": "=365+366"
        }
      ],
      "solucion": [
        "2024 es bisiesto: 366 días.",
        "Febrero de 2024 tiene 29 días.",
        "Mayo está en el segundo trimestre (abril–junio).",
        "365 + 366 = 731."
      ],
      "pistas": [
        "Recuerda qué años son bisiestos."
      ]
    },
    "reto": {
      "id": "m44-l4-reto",
      "enunciado": "Construye el calendario y revisa su ordenación.",
      "pantallas": [
        {
          "tipo": "medida",
          "dax": "Calendario = CALENDAR(DATE(2022, 1, 1), DATE(2024, 12, 31))",
          "objeto": "tabla",
          "tabla": "Calendario"
        }
      ],
      "preguntas": [
        {
          "tipo": "opcion",
          "etiqueta": "¿Por qué hay que ordenar `Mes` por `MesNum`?",
          "opciones": [
            "Por estética",
            "Porque alfabéticamente «abr» iría antes que «ene»",
            "Para que ocupe menos memoria",
            "No hace falta"
          ],
          "correcta": 1
        },
        {
          "tipo": "opcion",
          "etiqueta": "¿Qué hace «Marcar como tabla de fechas»?",
          "opciones": [
            "Cambia el formato de las fechas",
            "Habilita la inteligencia de tiempo sobre esa tabla",
            "Borra los duplicados",
            "Oculta la tabla"
          ],
          "correcta": 1
        },
        {
          "tipo": "casillas",
          "etiqueta": "¿Qué debe cumplir una buena tabla de fechas?",
          "opciones": [
            "Una fila por día sin huecos",
            "Cubrir años completos",
            "Contener solo los días con ventas",
            "Estar relacionada con la tabla de hechos",
            "Tener atributos como año, mes y trimestre"
          ],
          "correctas": [
            0,
            1,
            3,
            4
          ]
        },
        {
          "tipo": "numero",
          "etiqueta": "Si el rango va del 1 de enero de 2022 al 31 de diciembre de 2024, ¿cuántas filas tiene? (2024 es bisiesto)",
          "valor": 1096,
          "calculo": "=365+365+366"
        }
      ],
      "solucion": [
        "El orden alfabético no sigue el calendario: se ordena por el número del mes.",
        "Marcar la tabla habilita funciones como TOTALYTD.",
        "La tabla es completa (sin huecos), cubre años enteros, se relaciona con los hechos y trae atributos.",
        "365 + 365 + 366 = 1 096."
      ],
      "pistas": [
        "Cuenta los años completos y cuáles son bisiestos."
      ]
    },
    "verificacion": [
      {
        "id": "m44-l4-q1",
        "pregunta": "¿Cuántas filas debe tener la tabla de fechas de un año bisiesto?",
        "opciones": [
          "365",
          "366",
          "360",
          "12"
        ],
        "respuestaCorrecta": 1,
        "explicacion": "Un año bisiesto tiene 366 días."
      },
      {
        "id": "m44-l4-q2",
        "pregunta": "¿Por qué hay que ordenar el nombre del mes por el número del mes?",
        "opciones": [
          "Porque alfabéticamente «abril» iría antes que «enero»",
          "Por velocidad",
          "Por seguridad",
          "No hace falta"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "El orden alfabético no coincide con el cronológico."
      },
      {
        "id": "m44-l4-q3",
        "pregunta": "¿Qué hace «Marcar como tabla de fechas»?",
        "opciones": [
          "Habilita la inteligencia de tiempo sobre esa tabla",
          "Cambia el idioma",
          "Publica el informe",
          "Borra filas"
        ],
        "respuestaCorrecta": 0,
        "explicacion": "Las funciones de tiempo la necesitan."
      }
    ],
    "resumen": [
      "Una fila por día, años completos, atributos y columnas de orden.",
      "Se relaciona con los hechos y se marca como tabla de fechas.",
      "Es la base de la inteligencia de tiempo."
    ],
    "proximoPaso": "Pasamos a DAX: medidas y contexto de filtro.",
    "conceptos": [
      "tabla-de-fechas",
      "calendario"
    ]
  }
]
