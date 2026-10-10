import type { Lesson } from '../../types'

// Datos del negocio de práctica (ventas mensuales de una tienda en línea).
const VENTAS = `import pandas as pd

ventas = pd.DataFrame({
    "mes": ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06"],
    "ingresos": [10000, 12000, 11500, 14000, 15000, 18000],
    "pedidos": [200, 230, 220, 270, 290, 340],
})`

export const module21Lessons: Lesson[] = [
  {
    id: 'm21-l1',
    moduloId: 'modulo-21',
    titulo: 'Business Intelligence: KPIs y métricas que importan',
    objetivo: 'Definir KPIs claros, distinguir medidas de dimensiones y calcular métricas de negocio sin caer en el error del "promedio de promedios".',
    porQueImporta:
      'La inteligencia de negocios (BI) convierte datos en decisiones. Una organización no necesita 80 gráficos: necesita unos pocos indicadores bien definidos que todos interpreten igual. Un KPI mal calculado lleva a decisiones equivocadas con apariencia de rigor.',
    concepto: `**BI (Business Intelligence)** es el conjunto de prácticas y herramientas que transforman datos en información útil para decidir: dashboards, reportes y análisis recurrentes. Herramientas típicas: Power BI, Tableau, Looker Studio, Metabase… y también Python con pandas y matplotlib, que ya dominas.

Dos ideas base:

- **Medidas** (métricas): valores numéricos que se agregan — ingresos, pedidos, clientes.
- **Dimensiones**: categorías por las que cortas las medidas — mes, región, producto, canal.

Un **KPI** (*Key Performance Indicator*) es una métrica ligada a un objetivo del negocio. Un buen KPI tiene:
- **Definición única**: fórmula, fuente y periodo escritos (¿"cliente activo" es quien compró en 30 o en 90 días?).
- **Accionable**: si sube o baja, alguien sabe qué hacer.
- **Comparable**: contra un periodo anterior, una meta o un segmento.

KPIs frecuentes:

| KPI | Fórmula |
|---|---|
| Ticket promedio | ingresos totales / pedidos totales |
| Crecimiento mensual | (mes actual − mes anterior) / mes anterior |
| Tasa de conversión | compras / visitas |
| Tasa de abandono (churn) | clientes perdidos / clientes al inicio |

⚠️ **Cuidado con el promedio de promedios.** El ticket promedio del semestre **no** es el promedio de los tickets de cada mes: los meses con más pedidos deben pesar más. Se calcula con totales: \`ingresos.sum() / pedidos.sum()\`. Lo mismo pasa con tasas y porcentajes: agrégalos desde los números base, no promediando porcentajes.

\`\`\`python
${VENTAS}

ventas["ticket"] = ventas["ingresos"] / ventas["pedidos"]            # por mes
ventas["crecimiento"] = ventas["ingresos"].pct_change() * 100        # % vs mes anterior
\`\`\``,
    ejemploMinimo: `${VENTAS}

print(ventas["ingresos"].sum())`,
    ejemploAplicado: `${VENTAS}

ventas["ticket"] = (ventas["ingresos"] / ventas["pedidos"]).round(2)
ventas["crecimiento_%"] = (ventas["ingresos"].pct_change() * 100).round(1)
print(ventas)`,
    errorFrecuente: {
      codigo: `ventas["ticket"] = ventas["ingresos"] / ventas["pedidos"]
ticket_semestre = ventas["ticket"].mean()   # promedio de los tickets mensuales`,
      explicacion:
        'Promediar tickets mensuales da el mismo peso a un mes con 200 pedidos que a uno con 340, y subestima o sobreestima el resultado. El ticket del semestre es `ingresos.sum() / pedidos.sum()`. Regla general: las razones (tickets, tasas, márgenes) se recalculan desde sus totales, no se promedian.',
    },
    practicaGuiada: {
      id: 'm21-l1-practica',
      enunciado:
        'Calcula el **ticket promedio del semestre** de forma correcta: `ingresos.sum() / pedidos.sum()`. Imprímelo redondeado a 2 decimales.',
      codigoInicial: `${VENTAS}\n\nprint(0)`,
      solucion: `${VENTAS}\n\nticket = ventas["ingresos"].sum() / ventas["pedidos"].sum()\nprint(round(ticket, 2))`,
      pistas: ['Suma todos los ingresos y divide entre la suma de todos los pedidos.', '`round(valor, 2)` redondea a 2 decimales.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '51.94'
        return { ok, mensaje: ok ? 'Correcto: 80,500 / 1,550 = 51.94. (El promedio de promedios daría 51.83, un valor distinto.)' : 'El resultado esperado es 51.94.' }
      },
    },
    reto: {
      id: 'm21-l1-reto',
      enunciado:
        'Calcula el **crecimiento porcentual de ingresos del último mes** respecto al anterior con `pct_change()`. Imprime el valor del último mes multiplicado por 100 y redondeado a 1 decimal.',
      codigoInicial: `${VENTAS}\n\n# imprime el crecimiento (%) del último mes con 1 decimal`,
      solucion: `${VENTAS}\n\ncrecimiento = ventas["ingresos"].pct_change() * 100\nprint(round(crecimiento.iloc[-1], 1))`,
      pistas: ['`ventas["ingresos"].pct_change()` da la variación frente al periodo anterior.', '`.iloc[-1]` toma el último valor.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '20.0'
        return { ok, mensaje: ok ? 'Correcto: de 15,000 a 18,000 hay un 20% de crecimiento.' : 'El resultado esperado es 20.0.' }
      },
    },
    verificacion: [
      {
        id: 'm21-l1-q1',
        pregunta: '¿Cuál es la diferencia entre una medida y una dimensión?',
        opciones: [
          'La medida es un valor numérico que se agrega (ingresos); la dimensión es una categoría para cortarla (región, mes)',
          'Son sinónimos',
          'La dimensión siempre es numérica',
          'La medida solo puede ser un texto',
        ],
        respuestaCorrecta: 0,
        explicacion: 'Medimos ingresos, pedidos o clientes, y los analizamos por dimensiones como mes, región o producto.',
      },
      {
        id: 'm21-l1-q2',
        pregunta: '¿Cómo se calcula correctamente el ticket promedio de un periodo con varios meses?',
        opciones: [
          'Promediando los tickets de cada mes',
          'Dividiendo los ingresos totales entre los pedidos totales del periodo',
          'Tomando el ticket del mejor mes',
          'Sumando todos los tickets mensuales',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Las razones se recalculan desde los totales para que cada pedido pese lo mismo.',
      },
    ],
    resumen: [
      'BI transforma datos en decisiones con indicadores, dashboards y reportes.',
      'Medidas se agregan; dimensiones sirven para cortar y comparar.',
      'Un buen KPI tiene definición única, es accionable y comparable.',
      'Recalcula razones y tasas desde los totales: no promedies promedios.',
    ],
    proximoPaso: 'Con los KPIs claros, aprenderemos a mostrarlos: qué gráfico elegir y cómo organizar un dashboard.',
    conceptos: ['bi', 'kpis', 'medidas-dimensiones', 'promedio-ponderado'],
  },
  {
    id: 'm21-l2',
    moduloId: 'modulo-21',
    titulo: 'Diseño de dashboards: elegir el gráfico correcto',
    objetivo: 'Elegir el tipo de gráfico adecuado a cada pregunta y armar un panel de varios gráficos con matplotlib.',
    porQueImporta:
      'Un dashboard sirve si responde una pregunta en segundos. Un gráfico equivocado (o diez gráficos sin jerarquía) confunde en lugar de aclarar, y quien decide dejará de usarlo.',
    concepto: `**Elige el gráfico según la pregunta:**

| Pregunta | Gráfico recomendado |
|---|---|
| ¿Cómo evoluciona en el tiempo? | **Líneas** |
| ¿Cómo se comparan categorías? | **Barras** (horizontales si los nombres son largos) |
| ¿Cómo se distribuye una variable? | **Histograma** / boxplot |
| ¿Hay relación entre dos variables? | **Dispersión** (scatter) |
| ¿Qué parte del total es cada categoría? | Barras apiladas; el gráfico de pastel solo con 2–3 categorías |

**Principios de diseño de un dashboard:**

1. **Lo más importante, primero y arriba**: los KPIs principales como números grandes, antes de los gráficos.
2. **Un mensaje por gráfico**: el título debe decir qué muestra ("Ingresos por mes"), idealmente la conclusión ("Los ingresos crecen desde abril").
3. **Menos es más**: quita rejillas, bordes y colores innecesarios; usa un color para destacar y grises para el contexto.
4. **Ejes honestos**: las barras empiezan en 0; no recortes ejes para exagerar diferencias.
5. **Etiquetas claras**: unidades, ejes con nombre y fuente de los datos.
6. **Evita decoración engañosa**: nada de 3D ni efectos.

**Un panel con matplotlib** — \`plt.subplots\` crea una figura con varios ejes (gráficos):

\`\`\`python
import matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))   # 1 fila, 2 columnas
ax1.plot(ventas["mes"], ventas["ingresos"])
ax1.set_title("Ingresos por mes")
ax2.bar(ventas["mes"], ventas["pedidos"])
ax2.set_title("Pedidos por mes")
fig.tight_layout()
\`\`\`

Cada \`ax\` es un gráfico independiente dentro de la figura; \`fig.axes\` lista todos. Herramientas como Power BI o Tableau hacen esto con arrastrar y soltar, pero los principios son los mismos.`,
    ejemploMinimo: `${VENTAS}
import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot(ventas["mes"], ventas["ingresos"])
print(len(ax.lines))`,
    ejemploAplicado: `${VENTAS}
import matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))

ax1.plot(ventas["mes"], ventas["ingresos"], marker="o")
ax1.set_title("Ingresos por mes")
ax1.set_ylabel("USD")

ax2.bar(ventas["mes"], ventas["pedidos"], color="#4C78A8")
ax2.set_title("Pedidos por mes")
ax2.set_ylabel("Pedidos")

fig.tight_layout()
print("Gráficos en el panel:", len(fig.axes))`,
    errorFrecuente: {
      codigo: `# "Quiero mostrar que las ventas casi se duplicaron"
ax.bar(meses, ingresos)
ax.set_ylim(9500, 18500)    # el eje empieza en 9500, no en 0`,
      explicacion:
        'Recortar el eje vertical de un gráfico de barras exagera las diferencias y es engañoso: la altura de la barra debe ser proporcional al valor. Las barras empiezan siempre en 0. Si necesitas resaltar un cambio pequeño, usa un gráfico de líneas (donde sí es aceptable un eje ajustado) o muestra directamente la variación porcentual.',
    },
    practicaGuiada: {
      id: 'm21-l2-practica',
      enunciado:
        'Crea una figura con 2 gráficos lado a lado con `plt.subplots(1, 2)`, dibuja los ingresos como línea en el primero y los pedidos como barras en el segundo, e imprime cuántos gráficos tiene la figura con `len(fig.axes)`.',
      codigoInicial: `${VENTAS}\nimport matplotlib.pyplot as plt\n\nprint(0)`,
      solucion: `${VENTAS}\nimport matplotlib.pyplot as plt\n\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))\nax1.plot(ventas["mes"], ventas["ingresos"])\nax2.bar(ventas["mes"], ventas["pedidos"])\nprint(len(fig.axes))`,
      pistas: ['`fig, (ax1, ax2) = plt.subplots(1, 2)` crea dos ejes.', '`ax1.plot(x, y)` dibuja una línea; `ax2.bar(x, y)` dibuja barras.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: un panel con dos gráficos.' : 'El resultado esperado es 2.' }
      },
    },
    reto: {
      id: 'm21-l2-reto',
      enunciado:
        'Ponle título a cada gráfico del panel: `"Ingresos por mes"` al primero y `"Pedidos por mes"` al segundo (con `set_title`). Imprime la lista de títulos con `[ax.get_title() for ax in fig.axes]`.',
      codigoInicial: `${VENTAS}\nimport matplotlib.pyplot as plt\n\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))\nax1.plot(ventas["mes"], ventas["ingresos"])\nax2.bar(ventas["mes"], ventas["pedidos"])\n# agrega los títulos e imprime la lista de títulos`,
      solucion: `${VENTAS}\nimport matplotlib.pyplot as plt\n\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))\nax1.plot(ventas["mes"], ventas["ingresos"])\nax2.bar(ventas["mes"], ventas["pedidos"])\nax1.set_title("Ingresos por mes")\nax2.set_title("Pedidos por mes")\nprint([ax.get_title() for ax in fig.axes])`,
      pistas: ['`ax1.set_title("Ingresos por mes")` y lo mismo para `ax2`.', '`ax.get_title()` devuelve el título de un gráfico.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "['Ingresos por mes', 'Pedidos por mes']"
        return { ok, mensaje: ok ? 'Correcto: cada gráfico dice qué muestra.' : "El resultado esperado es ['Ingresos por mes', 'Pedidos por mes']." }
      },
    },
    verificacion: [
      {
        id: 'm21-l2-q1',
        pregunta: '¿Qué gráfico es el más adecuado para mostrar la evolución de ingresos a lo largo de los meses?',
        opciones: ['Pastel', 'Líneas', 'Dispersión sin ejes', 'Un gráfico 3D'],
        respuestaCorrecta: 1,
        explicacion: 'Las líneas muestran la tendencia en el tiempo de la forma más directa.',
      },
      {
        id: 'm21-l2-q2',
        pregunta: '¿Por qué un gráfico de barras debe empezar en 0?',
        opciones: [
          'Es solo una convención estética',
          'Porque la altura de la barra debe ser proporcional al valor; recortar el eje exagera las diferencias',
          'Porque matplotlib lo exige',
          'Para que quepan más etiquetas',
        ],
        respuestaCorrecta: 1,
        explicacion: 'El ojo compara alturas; un eje recortado hace que una diferencia pequeña parezca enorme.',
      },
    ],
    resumen: [
      'Elige el gráfico según la pregunta: líneas para tiempo, barras para comparar, histograma para distribución, dispersión para relaciones.',
      'Un dashboard prioriza lo importante, un mensaje por gráfico y un diseño limpio.',
      'Las barras empiezan en 0 y los títulos explican qué se ve.',
      '`plt.subplots` arma paneles de varios gráficos.',
    ],
    proximoPaso: 'Un buen gráfico no basta: hay que contar la historia. Veremos cómo comunicar hallazgos para que se conviertan en decisiones.',
    conceptos: ['dashboards', 'tipos-de-grafico', 'matplotlib-subplots'],
  },
  {
    id: 'm21-l3',
    moduloId: 'modulo-21',
    titulo: 'Storytelling con datos: del hallazgo a la recomendación',
    objetivo: 'Estructurar un reporte (contexto, hallazgo, implicación, recomendación) y cuantificar qué explica un cambio.',
    porQueImporta:
      'Quien decide rara vez lee código ni tablas: lee conclusiones. Los analistas que más crecen no son los que hacen el análisis más complejo, sino los que consiguen que su análisis cambie una decisión.',
    concepto: `**Estructura de un buen mensaje analítico:**

1. **Contexto**: qué pregunta de negocio respondes y con qué datos.
2. **Hallazgo**: lo que encontraste, con números concretos y comparaciones.
3. **Implicación**: por qué importa para el negocio.
4. **Recomendación**: qué acción propones, con un responsable o siguiente paso claro.
5. **Limitaciones**: qué no sabes o qué podría invalidar la conclusión (calidad de datos, periodo corto, correlación ≠ causalidad).

**Del dato a la frase**:
- ❌ "Los ingresos fueron 18,000."
- ✅ "Los ingresos de junio crecieron **20%** frente a mayo (de 15,000 a 18,000 USD), el mayor aumento del semestre."

Un número aislado no dice nada: **compáralo** (contra el periodo anterior, una meta o un segmento) y **cuantifícalo**.

**Descomposición del cambio** — una técnica muy útil: en vez de decir "crecimos 20%", responde **¿quién explicó ese crecimiento?**

\`\`\`python
df["variacion"] = df["junio"] - df["mayo"]
df["aporte_%"] = df["variacion"] / df["variacion"].sum() * 100
df.loc[df["variacion"].idxmax()]     # la región que más aportó
\`\`\`

**Consejos de comunicación:**
- Empieza por la conclusión, no por el método ("pirámide invertida").
- Una idea por diapositiva o sección; un solo gráfico principal.
- Adapta el nivel técnico a la audiencia: la dirección quiere impacto y decisión, el equipo técnico quiere detalle.
- Sé honesto con la incertidumbre: "los datos sugieren…", no "se demuestra…" si no es así.
- Cierra siempre con la acción propuesta.`,
    ejemploMinimo: `pct = (18000 - 15000) / 15000 * 100
print(f"{pct:.1f}%")`,
    ejemploAplicado: `import pandas as pd

regiones = pd.DataFrame({
    "region": ["Norte", "Sur", "Centro"],
    "mayo": [6000, 5000, 4000],
    "junio": [8000, 5500, 4500],
})
regiones["variacion"] = regiones["junio"] - regiones["mayo"]
regiones["aporte_%"] = (regiones["variacion"] / regiones["variacion"].sum() * 100).round(1)
print(regiones)`,
    errorFrecuente: {
      codigo: `# Reporte para la dirección
print("Se calculó una regresión logística con class_weight='balanced',")
print("validación cruzada estratificada de 5 pliegues y F1 de 0.45.")
# ...y ninguna recomendación`,
      explicacion:
        'Empezar por el método y terminar sin conclusión pierde a la audiencia. Primero lo que importa ("podemos detectar 7 de cada 10 abandonos"), luego qué hacer ("contactar a ese grupo con una oferta de retención") y, al final o en un anexo, el detalle técnico.',
    },
    practicaGuiada: {
      id: 'm21-l3-practica',
      enunciado:
        'Calcula el crecimiento porcentual entre `mayo` y `junio` y construye la frase con una f-string: `f"Los ingresos crecieron {pct:.1f}% frente a mayo"`. Imprime la frase.',
      codigoInicial: `mayo = 15000\njunio = 18000\n# calcula pct = (junio - mayo) / mayo * 100 e imprime la frase\nprint("")`,
      solucion: `mayo = 15000\njunio = 18000\npct = (junio - mayo) / mayo * 100\nprint(f"Los ingresos crecieron {pct:.1f}% frente a mayo")`,
      pistas: ['`pct = (junio - mayo) / mayo * 100`', '`{pct:.1f}` formatea el número con 1 decimal dentro de la f-string.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Los ingresos crecieron 20.0% frente a mayo'
        return { ok, mensaje: ok ? 'Correcto: una frase clara con número y comparación.' : 'El resultado esperado es "Los ingresos crecieron 20.0% frente a mayo".' }
      },
    },
    reto: {
      id: 'm21-l3-reto',
      enunciado:
        'Descompón el crecimiento: calcula la `variacion` de cada región (`junio - mayo`), identifica la región que más aportó con `idxmax()` y su aporte porcentual al crecimiento total. Imprime en una línea el nombre de la región y su aporte redondeado a 1 decimal: `print(region, aporte)`.',
      codigoInicial: `import pandas as pd\n\nregiones = pd.DataFrame({\n    "region": ["Norte", "Sur", "Centro"],\n    "mayo": [6000, 5000, 4000],\n    "junio": [8000, 5500, 4500],\n})\n# calcula la variación, la región que más aportó y su aporte % al crecimiento total`,
      solucion: `import pandas as pd\n\nregiones = pd.DataFrame({\n    "region": ["Norte", "Sur", "Centro"],\n    "mayo": [6000, 5000, 4000],\n    "junio": [8000, 5500, 4500],\n})\nregiones["variacion"] = regiones["junio"] - regiones["mayo"]\nfila = regiones.loc[regiones["variacion"].idxmax()]\naporte = fila["variacion"] / regiones["variacion"].sum() * 100\nprint(fila["region"], round(aporte, 1))`,
      pistas: ['`regiones["variacion"].idxmax()` devuelve el índice de la fila con mayor variación.', 'Aporte % = variación de la región / suma de variaciones × 100.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'Norte 66.7'
        return { ok, mensaje: ok ? 'Correcto: el Norte explica dos tercios del crecimiento, un hallazgo mucho más útil que "crecimos 20%".' : 'El resultado esperado es "Norte 66.7".' }
      },
    },
    verificacion: [
      {
        id: 'm21-l3-q1',
        pregunta: '¿Con qué debería empezar un reporte ejecutivo?',
        opciones: [
          'Con el detalle del modelo y los hiperparámetros',
          'Con la conclusión y su impacto para el negocio',
          'Con el código completo',
          'Con una lista de todas las tablas usadas',
        ],
        respuestaCorrecta: 1,
        explicacion: 'La audiencia decide con conclusiones; el método va después o en un anexo.',
      },
      {
        id: 'm21-l3-q2',
        pregunta: '¿Cuál de estas frases es un mejor hallazgo?',
        opciones: [
          'Las ventas fueron 18,000.',
          'Las ventas de junio crecieron 20% frente a mayo, y el Norte explica dos tercios del aumento.',
          'Las ventas son importantes.',
          'Hubo algunas ventas en junio.',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Compara, cuantifica y explica de dónde viene el cambio.',
      },
    ],
    resumen: [
      'Estructura: contexto → hallazgo → implicación → recomendación → limitaciones.',
      'Un número sin comparación no comunica: cuantifica y compara.',
      'Descomponer un cambio (quién lo explica) convierte un dato en una pista accionable.',
      'Empieza por la conclusión y adapta el nivel técnico a la audiencia.',
    ],
    proximoPaso: 'Ahora que sabes analizar y comunicar, toca mostrarlo: construye un portafolio en GitHub que hable por ti.',
    conceptos: ['storytelling-datos', 'descomposicion-cambio', 'reporte-ejecutivo'],
  },
  {
    id: 'm21-l4',
    moduloId: 'modulo-21',
    titulo: 'Tu portafolio de datos en GitHub',
    objetivo: 'Planificar un portafolio de proyectos y escribir README claros que muestren problema, método y resultados.',
    porQueImporta:
      'Quien te evalúa revisa tu GitHub en pocos minutos. Un portafolio con 3–4 proyectos bien explicados demuestra más que una lista de cursos: enseña que sabes plantear un problema, trabajar con datos y comunicar.',
    concepto: `**Qué proyectos incluir** (3 a 4 buenos mejor que 10 mediocres):

1. Un **proyecto de análisis** de punta a punta: pregunta de negocio, limpieza, EDA, visualizaciones y recomendaciones (como el proyecto del curso de Python para datos).
2. Un **proyecto de machine learning**: problema, línea base, validación correcta, métricas adecuadas e interpretación (como el proyecto del curso de Machine Learning).
3. Un **proyecto con SQL**: consultas sobre una base de datos y un reporte.
4. Opcional: un **dashboard** o una pequeña herramienta de línea de comandos.

Usa datos públicos (Kaggle, portales de datos abiertos) y **nunca subas datos privados o confidenciales** de un empleador o cliente.

**Estructura recomendada del repositorio:**

\`\`\`
proyecto-abandono-clientes/
├── README.md            # la cara del proyecto (lo más importante)
├── requirements.txt     # dependencias para reproducirlo
├── .gitignore
├── data/                # datos pequeños o instrucciones para descargarlos
├── notebooks/           # exploración
└── src/                 # código reutilizable
\`\`\`

**El README es tu pitch.** Secciones mínimas:

- **Problema**: la pregunta de negocio en 2–3 líneas.
- **Datos**: fuente, tamaño y variables principales.
- **Metodología**: pasos y técnicas, brevemente.
- **Resultados**: las métricas y hallazgos clave, idealmente con 1–2 gráficos.
- **Conclusiones y recomendaciones**, y **limitaciones**.
- **Cómo reproducirlo**: comandos para instalar y ejecutar.

**Lista de calidad antes de publicar:**
- ¿Alguien puede entender el proyecto leyendo solo el README?
- ¿El notebook se ejecuta de arriba abajo sin errores?
- ¿Hay claves, contraseñas o datos sensibles? (revisa también el historial)
- ¿Los commits tienen mensajes claros?
- ¿Usaste nombres de repositorio descriptivos (\`prediccion-abandono-clientes\`, no \`proyecto1\`)?

Completa tu **perfil de GitHub** con un README de presentación y fija (*pin*) tus mejores repositorios. Enlázalo desde tu LinkedIn y tu CV.`,
    ejemploMinimo: `titulo = "Prediccion de Abandono de Clientes"
print(titulo.lower().replace(" ", "-"))`,
    ejemploAplicado: `readme = """# Prediccion de abandono
## Problema
Predecir que clientes se iran.
## Datos
600 clientes sinteticos.
## Conclusiones
El plan Basico concentra el mayor riesgo.
"""

requeridas = ["Problema", "Datos", "Metodologia", "Resultados", "Conclusiones"]
for seccion in requeridas:
    estado = "OK" if f"## {seccion}" in readme else "FALTA"
    print(seccion, "->", estado)`,
    errorFrecuente: {
      codigo: `proyecto1/
├── Untitled3.ipynb
├── Copia de Untitled3 (1).ipynb
├── datos_clientes_REAL.csv     # datos de mi empresa
└── config.env                  # contiene mi API_KEY`,
      explicacion:
        'Un repositorio así tiene cuatro problemas: nombres sin significado, notebooks duplicados, **datos confidenciales** y **credenciales** expuestas. Pon nombres descriptivos, deja un notebook limpio y ejecutable, usa datos públicos o sintéticos y agrega los secretos al `.gitignore` antes del primer commit.',
    },
    practicaGuiada: {
      id: 'm21-l4-practica',
      enunciado:
        'Revisa el README: imprime la lista de secciones de `requeridas` que **faltan** (las que no aparecen como `"## Nombre"` en el texto), en el mismo orden.',
      codigoInicial: `readme = """# Proyecto\n## Problema\nTexto.\n## Datos\nTexto.\n## Conclusiones\nTexto.\n"""\nrequeridas = ["Problema", "Datos", "Metodologia", "Resultados", "Conclusiones"]\nprint([])`,
      solucion: `readme = """# Proyecto\n## Problema\nTexto.\n## Datos\nTexto.\n## Conclusiones\nTexto.\n"""\nrequeridas = ["Problema", "Datos", "Metodologia", "Resultados", "Conclusiones"]\nprint([s for s in requeridas if f"## {s}" not in readme])`,
      pistas: ['Una lista por comprensión con la condición `f"## {s}" not in readme`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "['Metodologia', 'Resultados']"
        return { ok, mensaje: ok ? 'Correcto: a ese README le faltan Metodología y Resultados.' : "El resultado esperado es ['Metodologia', 'Resultados']." }
      },
    },
    reto: {
      id: 'm21-l4-reto',
      enunciado:
        'Convierte el título del proyecto en un nombre de repositorio descriptivo: todo en minúsculas y con guiones en lugar de espacios. Imprime el resultado.',
      codigoInicial: `titulo = "Analisis de Ventas de una Tienda en Linea"\n# convierte el titulo en un nombre de repositorio e imprimelo`,
      solucion: `titulo = "Analisis de Ventas de una Tienda en Linea"\nprint(titulo.lower().replace(" ", "-"))`,
      pistas: ['`.lower()` pasa a minúsculas y `.replace(" ", "-")` cambia los espacios por guiones.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'analisis-de-ventas-de-una-tienda-en-linea'
        return { ok, mensaje: ok ? 'Correcto: un nombre claro que dice de qué trata el proyecto.' : 'El resultado esperado es analisis-de-ventas-de-una-tienda-en-linea.' }
      },
    },
    verificacion: [
      {
        id: 'm21-l4-q1',
        pregunta: '¿Qué debe permitir un README de proyecto de datos?',
        opciones: [
          'Entender el problema, los datos, el método y los resultados sin abrir el código',
          'Solo listar las librerías usadas',
          'Reemplazar el código del proyecto',
          'Mostrar las contraseñas usadas',
        ],
        respuestaCorrecta: 0,
        explicacion: 'El README es el pitch del proyecto: cuenta qué problema resuelve y qué encontraste.',
      },
      {
        id: 'm21-l4-q2',
        pregunta: '¿Qué datos conviene usar en proyectos de portafolio?',
        opciones: [
          'Datos confidenciales de tu empleador',
          'Datos públicos o sintéticos, sin información sensible',
          'Cualquier dato que encuentres sin revisar su licencia',
          'Datos personales de conocidos',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Usa fuentes públicas o datos sintéticos y respeta licencias y privacidad.',
      },
    ],
    resumen: [
      'Un portafolio de 3–4 proyectos bien explicados vale más que muchos a medias.',
      'El README (problema, datos, metodología, resultados, conclusiones, cómo reproducir) es lo más importante.',
      'Repositorios con nombres descriptivos, notebooks limpios, `.gitignore` y sin secretos.',
      'Usa datos públicos o sintéticos; nunca información confidencial.',
    ],
    proximoPaso: 'Último paso: prepararte para entrevistas y trazar un plan de carrera.',
    conceptos: ['portafolio', 'readme', 'github-perfil'],
  },
  {
    id: 'm21-l5',
    moduloId: 'modulo-21',
    titulo: 'Entrevistas técnicas y plan de carrera',
    objetivo: 'Conocer los tipos de pruebas de una entrevista de datos, practicar problemas típicos y trazar un plan de acción para buscar empleo.',
    porQueImporta:
      'Tener las habilidades no basta: hay que demostrarlas en un proceso de selección con formato propio. Practicar los tipos de problema y estructurar tu respuesta reduce los nervios y mejora mucho tu rendimiento.',
    concepto: `**Etapas típicas de un proceso en datos:**

1. **Filtro con reclutamiento**: tu trayectoria, expectativas y motivación.
2. **Prueba técnica**: SQL y Python/pandas (en vivo o como tarea para casa).
3. **Caso de negocio / análisis**: te dan datos y una pregunta; evalúan cómo piensas y comunicas.
4. **Entrevista de comportamiento**: cómo trabajas en equipo, cómo manejas errores o desacuerdos.
5. **Entrevista con el equipo / manager**.

**Preguntas técnicas frecuentes:**

- **SQL**: JOINs, agregaciones con \`GROUP BY\` y \`HAVING\`, encontrar duplicados, el segundo valor más alto, top-N por grupo, CTE (curso de SQL).
- **Python/pandas**: limpiar datos, \`groupby\`, \`merge\`, valores nulos, duplicados (curso de Python para datos).
- **Estadística**: media vs mediana, qué es un valor-p, sesgo de selección, correlación vs causalidad.
- **Machine learning**: sobreajuste, validación cruzada, qué métrica elegir y por qué, data leakage (curso de Machine Learning).
- **Negocio**: ¿cómo medirías el éxito de una campaña?, ¿qué KPI mirarías?

**Cómo responder en una prueba en vivo:**
1. **Repite y aclara** el problema; pregunta por casos borde (¿hay nulos? ¿duplicados?).
2. **Piensa en voz alta**: explicar tu razonamiento puntúa tanto como el resultado.
3. Empieza con una **solución simple que funcione**, luego mejórala.
4. **Prueba tu código** con un ejemplo pequeño.
5. Si no sabes algo, dilo y explica cómo lo averiguarías.

**Preguntas de comportamiento** — usa el método **STAR**: **S**ituación, **T**area, **A**cción, **R**esultado. Prepara 3–4 historias reales (un error que corregiste, un conflicto, un proyecto del que estés orgulloso/a) con resultados medibles.

**Plan de acción a 90 días:**
- *Semanas 1–4*: termina 3 proyectos de portafolio y pule GitHub, LinkedIn y CV (1 página, con resultados, no solo tareas).
- *Semanas 5–8*: practica SQL y pandas a diario con problemas cortos; haz entrevistas simuladas.
- *Semanas 9–12*: postula de forma constante (empieza por roles junior y de analista), pide referencias y feedback, y aprende de cada proceso.

**Hábitos de largo plazo**: sigue aprendiendo con proyectos reales, comparte lo que aprendes (posts, repositorios), cuida tu red de contactos y recuerda que el área evoluciona rápido: la curiosidad sostenida es tu mejor activo.`,
    ejemploMinimo: `salarios = [3000, 5000, 4000, 5000, 2000]
print(sorted(set(salarios), reverse=True)[0])`,
    ejemploAplicado: `import pandas as pd

# Problema clásico: ¿hay correos duplicados?
clientes = pd.DataFrame({
    "email": ["a@x.com", "b@x.com", "a@x.com", "c@x.com", "b@x.com", "d@x.com"],
    "ciudad": ["Bogota", "Cali", "Bogota", "Lima", "Cali", "Quito"],
})
print("Duplicados:", clientes.duplicated().sum())
print("Filas únicas:", len(clientes.drop_duplicates()))`,
    errorFrecuente: {
      codigo: `# Entrevista en vivo: "Encuentra el segundo salario más alto"
salarios = [3000, 5000, 4000, 5000, 2000]
print(sorted(salarios, reverse=True)[1])    # imprime 5000 (!)`,
      explicacion:
        'Con valores repetidos, ordenar la lista y tomar la posición 1 devuelve el mismo máximo (5000). Por eso se pregunta por casos borde: ¿puede haber empates? Si "segundo más alto" se refiere a valores **distintos**, hay que eliminar duplicados primero: `sorted(set(salarios), reverse=True)[1]` → 4000.',
    },
    practicaGuiada: {
      id: 'm21-l5-practica',
      enunciado:
        'Problema clásico: encuentra el **segundo salario más alto distinto**. Elimina duplicados con `set`, ordena de mayor a menor con `sorted(..., reverse=True)` e imprime el elemento de la posición 1.',
      codigoInicial: `salarios = [3000, 5000, 4000, 5000, 2000]\nprint(0)`,
      solucion: `salarios = [3000, 5000, 4000, 5000, 2000]\nprint(sorted(set(salarios), reverse=True)[1])`,
      pistas: ['`set(salarios)` deja valores únicos: {2000, 3000, 4000, 5000}.', 'Ordenado de mayor a menor, el segundo (índice 1) es 4000.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '4000'
        return { ok, mensaje: ok ? 'Correcto: considerar los empates es lo que separa una buena respuesta de una apresurada.' : 'El resultado esperado es 4000.' }
      },
    },
    reto: {
      id: 'm21-l5-reto',
      enunciado:
        'Detecta duplicados en `clientes`: imprime en una línea cuántas filas están **duplicadas** (`clientes.duplicated().sum()`) y cuántas filas quedan tras `drop_duplicates()`, con `print(a, b)`.',
      codigoInicial: `import pandas as pd\n\nclientes = pd.DataFrame({\n    "email": ["a@x.com", "b@x.com", "a@x.com", "c@x.com", "b@x.com", "d@x.com"],\n    "ciudad": ["Bogota", "Cali", "Bogota", "Lima", "Cali", "Quito"],\n})\n# imprime cuántas filas están duplicadas y cuántas quedan sin duplicados`,
      solucion: `import pandas as pd\n\nclientes = pd.DataFrame({\n    "email": ["a@x.com", "b@x.com", "a@x.com", "c@x.com", "b@x.com", "d@x.com"],\n    "ciudad": ["Bogota", "Cali", "Bogota", "Lima", "Cali", "Quito"],\n})\nprint(int(clientes.duplicated().sum()), len(clientes.drop_duplicates()))`,
      pistas: ['`clientes.duplicated()` marca como True las repeticiones (no la primera aparición).', '`len(clientes.drop_duplicates())` cuenta las filas únicas.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2 4'
        return { ok, mensaje: ok ? 'Correcto: 2 filas repetidas y 4 filas únicas.' : 'El resultado esperado es "2 4".' }
      },
    },
    verificacion: [
      {
        id: 'm21-l5-q1',
        pregunta: 'En una prueba técnica en vivo, ¿qué conviene hacer primero?',
        opciones: [
          'Escribir código inmediatamente sin hablar',
          'Aclarar el problema, preguntar por casos borde y pensar en voz alta',
          'Pedir que te cambien la pregunta',
          'Buscar la respuesta en internet sin avisar',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Aclarar y explicar tu razonamiento muestra cómo piensas, que es lo que más se evalúa.',
      },
      {
        id: 'm21-l5-q2',
        pregunta: '¿Qué significa STAR en una entrevista de comportamiento?',
        opciones: [
          'Situación, Tarea, Acción, Resultado',
          'Solución, Técnica, Análisis, Reporte',
          'Salario, Trabajo, Área, Rol',
          'Sistema, Tabla, Archivo, Registro',
        ],
        respuestaCorrecta: 0,
        explicacion: 'STAR estructura una historia: contexto, qué te tocaba hacer, qué hiciste y qué resultado lograste.',
      },
      {
        id: 'm21-l5-q3',
        pregunta: '¿Qué es mejor para tu búsqueda de empleo en los próximos 90 días?',
        opciones: [
          'Estudiar solo teoría hasta sentirte "listo/a"',
          'Combinar proyectos de portafolio, práctica diaria de SQL/pandas, entrevistas simuladas y postulaciones constantes',
          'Postular una vez y esperar',
          'Aprender todas las herramientas a la vez',
        ],
        respuestaCorrecta: 1,
        explicacion: 'La constancia y el feedback real (postular, practicar, iterar) superan a esperar a sentirte perfectamente preparado/a.',
      },
    ],
    resumen: [
      'Un proceso de datos incluye filtro, prueba técnica (SQL/Python), caso de negocio y entrevista de comportamiento.',
      'Aclara, piensa en voz alta, empieza simple y prueba tu solución; cuida los casos borde.',
      'Usa STAR para tus historias y prepara ejemplos con resultados medibles.',
      'Un plan de 90 días: portafolio, práctica diaria, entrevistas simuladas y postulaciones constantes.',
    ],
    proximoPaso:
      '¡Completaste el curso! Sigue practicando con proyectos propios, comparte tu portafolio y continúa aprendiendo: el mejor momento para empezar a aplicar lo que sabes es ahora.',
    conceptos: ['entrevistas-tecnicas', 'star', 'plan-carrera'],
  },
]
