import type { Lesson } from '../../types'

export const module10Lessons: Lesson[] = [
  {
    id: 'm10-l1',
    moduloId: 'modulo-10',
    titulo: 'Estadística descriptiva: tendencia central y dispersión',
    objetivo: 'Calcular e interpretar media, mediana, desviación estándar y rango para resumir una variable numérica.',
    porQueImporta:
      'Antes de construir cualquier modelo o dashboard, necesitas saber resumir una columna con números que realmente describan su comportamiento, no solo un promedio engañoso.',
    concepto: `- **Media**: promedio aritmético. Sensible a valores extremos.
- **Mediana**: valor central al ordenar los datos. Robusta ante outliers.
- **Desviación estándar**: qué tan dispersos están los datos respecto a la media.

\`\`\`python
serie.mean()
serie.median()
serie.std()
serie.describe()   # resumen completo de una sola vez
\`\`\`

Cuando media y mediana son muy distintas, es una señal de que la distribución está sesgada (hay valores extremos tirando de la media).`,
    ejemploMinimo: `import pandas as pd

salarios = pd.Series([2000, 2200, 2100, 2300, 9500])
print(round(salarios.mean()), round(salarios.median()))`,
    ejemploAplicado: `import pandas as pd

ventas = pd.Series([100, 120, 95, 110, 105, 500])
print("Media:", round(ventas.mean(), 1))
print("Mediana:", ventas.median())
print("Desv. estándar:", round(ventas.std(), 1))`,
    errorFrecuente: {
      codigo: `import pandas as pd

ventas = pd.Series([100, 120, 95, 500])
print("La venta típica es", ventas.mean())`,
      explicacion:
        'Usar la media como "valor típico" cuando hay un outlier fuerte (500) da una impresión engañosa: la media sube mucho más que lo que gana la mayoría. En estos casos, la mediana suele representar mejor el "caso típico".',
    },
    practicaGuiada: {
      id: 'm10-l1-practica',
      enunciado: 'Calcula la mediana de `datos` con `.median()` e imprime el resultado.',
      codigoInicial: `import pandas as pd\n\ndatos = pd.Series([10, 20, 30, 40, 50])\nprint(0)`,
      solucion: `import pandas as pd\n\ndatos = pd.Series([10, 20, 30, 40, 50])\nprint(datos.median())`,
      pistas: ['Usa `datos.median()`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '30.0' || stdout.trim() === '30'
        return { ok, mensaje: ok ? 'Correcto: 30 es el valor central.' : 'El resultado esperado es 30.' }
      },
    },
    reto: {
      id: 'm10-l1-reto',
      enunciado:
        'Dado `tiempos` con un valor atípico, calcula tanto la media como la mediana (redondeadas a 1 decimal) e imprime la diferencia absoluta entre ambas con `round(abs(media - mediana), 1)`.',
      codigoInicial: `import pandas as pd\n\ntiempos = pd.Series([5, 6, 5, 7, 6, 40])\n# calcula media y mediana, imprime la diferencia absoluta redondeada a 1 decimal`,
      solucion: `import pandas as pd\n\ntiempos = pd.Series([5, 6, 5, 7, 6, 40])\nmedia = tiempos.mean()\nmediana = tiempos.median()\nprint(round(abs(media - mediana), 1))`,
      pistas: ['`tiempos.mean()` y `tiempos.median()`.', 'La diferencia se calcula con `abs(media - mediana)`.'],
      validar: (stdout) => {
        const valor = parseFloat(stdout.trim())
        const ok = !Number.isNaN(valor) && Math.abs(valor - 6.3) < 0.2
        return { ok, mensaje: ok ? 'Correcto: la diferencia confirma que el outlier (40) distorsiona la media.' : 'El resultado esperado es aproximadamente 6.3.' }
      },
    },
    verificacion: [
      {
        id: 'm10-l1-q1',
        pregunta: '¿Por qué la mediana es más robusta que la media ante valores extremos?',
        opciones: [
          'Porque es más fácil de calcular',
          'Porque solo depende del valor central al ordenar los datos, sin importar qué tan extremos sean los demás',
          'Porque siempre es mayor que la media',
          'No es más robusta, son iguales',
        ],
        respuestaCorrecta: 1,
        explicacion: 'La mediana solo mira la posición central; un valor extremo no cambia esa posición, mientras que sí afecta directamente el promedio.',
      },
    ],
    resumen: [
      'La media es sensible a outliers; la mediana es robusta ante ellos.',
      'La desviación estándar mide qué tan dispersos están los datos respecto a la media.',
      '`.describe()` da un resumen estadístico completo de una columna en un solo paso.',
    ],
    proximoPaso: 'Ahora usamos estas ideas para detectar formalmente valores atípicos con el método del rango intercuartílico (IQR).',
    conceptos: ['estadistica-descriptiva', 'media-mediana'],
  },
  {
    id: 'm10-l2',
    moduloId: 'modulo-10',
    titulo: 'Detección de outliers con IQR',
    objetivo: 'Aplicar el método del rango intercuartílico (IQR) para detectar valores atípicos de forma objetiva, no solo visual.',
    porQueImporta:
      'Mirar un boxplot ayuda, pero un analista necesita poder decir exactamente "estos valores son outliers" con un criterio reproducible, sobre todo si va a automatizar el proceso.',
    concepto: `El método IQR:

\`\`\`python
Q1 = datos.quantile(0.25)
Q3 = datos.quantile(0.75)
IQR = Q3 - Q1

limite_inferior = Q1 - 1.5 * IQR
limite_superior = Q3 + 1.5 * IQR

outliers = datos[(datos < limite_inferior) | (datos > limite_superior)]
\`\`\`

Cualquier valor fuera de \`[limite_inferior, limite_superior]\` se considera un outlier según esta convención estadística estándar (la misma que usa matplotlib para dibujar los boxplots).`,
    ejemploMinimo: `import pandas as pd

datos = pd.Series([10, 12, 11, 13, 12, 90])
q1 = datos.quantile(0.25)
q3 = datos.quantile(0.75)
print(round(q3 - q1, 2))`,
    ejemploAplicado: `import pandas as pd

ventas = pd.Series([100, 110, 95, 105, 102, 98, 500])
q1 = ventas.quantile(0.25)
q3 = ventas.quantile(0.75)
iqr = q3 - q1
limite_superior = q3 + 1.5 * iqr

outliers = ventas[ventas > limite_superior]
print("Outliers detectados:", outliers.tolist())`,
    errorFrecuente: {
      codigo: `import pandas as pd

datos = pd.Series([1, 2, 3, 100])
outliers = datos[datos > 1.5]
print(outliers.tolist())`,
      explicacion:
        'Comparar directamente contra un número arbitrario (1.5) no es el método IQR: hay que calcular primero Q1, Q3 y el límite superior real (`Q3 + 1.5*IQR`). Saltarse ese cálculo da resultados sin fundamento estadístico.',
    },
    practicaGuiada: {
      id: 'm10-l2-practica',
      enunciado: 'Calcula Q1 y Q3 de `datos` con `.quantile(0.25)` y `.quantile(0.75)`, e imprime el IQR (Q3 - Q1).',
      codigoInicial: `import pandas as pd\n\ndatos = pd.Series([10, 20, 30, 40, 50])\nq1 = 0\nq3 = 0\nprint(q3 - q1)`,
      solucion: `import pandas as pd\n\ndatos = pd.Series([10, 20, 30, 40, 50])\nq1 = datos.quantile(0.25)\nq3 = datos.quantile(0.75)\nprint(q3 - q1)`,
      pistas: ['`datos.quantile(0.25)` y `datos.quantile(0.75)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '20.0'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 20.0.' }
      },
    },
    reto: {
      id: 'm10-l2-reto',
      enunciado:
        'Dado `precios` con un outlier, calcula el límite superior (`Q3 + 1.5*IQR`) y usa un filtro booleano para imprimir la lista de outliers con `.tolist()`.',
      codigoInicial: `import pandas as pd\n\nprecios = pd.Series([20, 22, 19, 21, 23, 20, 150])\n# calcula Q1, Q3, IQR, el límite superior, y filtra los outliers`,
      solucion: `import pandas as pd\n\nprecios = pd.Series([20, 22, 19, 21, 23, 20, 150])\nq1 = precios.quantile(0.25)\nq3 = precios.quantile(0.75)\niqr = q3 - q1\nlimite_superior = q3 + 1.5 * iqr\noutliers = precios[precios > limite_superior]\nprint(outliers.tolist())`,
      pistas: ['Sigue los 4 pasos: Q1, Q3, IQR, límite superior.', 'Filtra con `precios[precios > limite_superior]`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '[150]'
        return { ok, mensaje: ok ? 'Correcto: 150 es el único outlier.' : 'El resultado esperado es [150].' }
      },
    },
    verificacion: [
      {
        id: 'm10-l2-q1',
        pregunta: '¿Cómo se calcula el límite superior para detectar outliers con el método IQR?',
        opciones: ['Q3 + IQR', 'Q3 + 1.5 * IQR', 'Media + 2 * desviación estándar', 'Q1 - 1.5 * IQR'],
        respuestaCorrecta: 1,
        explicacion: 'La convención estándar del método IQR usa `Q3 + 1.5 * IQR` como límite superior (y `Q1 - 1.5 * IQR` como inferior).',
      },
    ],
    resumen: [
      'IQR = Q3 − Q1 (rango intercuartílico).',
      'Los límites de outliers son `Q1 - 1.5*IQR` y `Q3 + 1.5*IQR`.',
      'Este es el mismo criterio que usan los boxplots para marcar puntos como atípicos.',
    ],
    proximoPaso: 'Veremos cómo medir la relación entre dos variables numéricas con la correlación.',
    conceptos: ['outliers', 'iqr'],
  },
  {
    id: 'm10-l3',
    moduloId: 'modulo-10',
    titulo: 'Correlación entre variables',
    objetivo: 'Calcular e interpretar el coeficiente de correlación entre dos variables numéricas con pandas.',
    porQueImporta:
      'La correlación cuantifica lo que un scatter plot sugiere visualmente: qué tan fuerte y en qué dirección se relacionan dos variables. Es la base de mucho análisis exploratorio.',
    concepto: `\`\`\`python
df["col1"].corr(df["col2"])   # correlación entre dos columnas
df.corr(numeric_only=True)    # matriz de correlación entre todas las columnas numéricas
\`\`\`

El coeficiente de correlación de Pearson va de -1 a 1:

- Cerca de 1: relación positiva fuerte.
- Cerca de -1: relación negativa fuerte.
- Cerca de 0: poca o ninguna relación lineal.

**Importante**: correlación no implica causalidad. Dos variables pueden correlacionar sin que una cause la otra.`,
    ejemploMinimo: `import pandas as pd

df = pd.DataFrame({"horas": [1, 2, 3, 4, 5], "nota": [60, 65, 70, 80, 95]})
print(round(df["horas"].corr(df["nota"]), 2))`,
    ejemploAplicado: `import pandas as pd

datos = pd.DataFrame({
    "inversion": [100, 200, 300, 400, 500],
    "ingresos": [500, 900, 1400, 1800, 2600],
    "temperatura": [20, 15, 30, 10, 25],
})

print("Inversión vs ingresos:", round(datos["inversion"].corr(datos["ingresos"]), 2))
print("Inversión vs temperatura:", round(datos["inversion"].corr(datos["temperatura"]), 2))`,
    errorFrecuente: {
      codigo: `import pandas as pd

df = pd.DataFrame({"ventas": [100, 200, 150], "ciudad": ["Bogota", "Lima", "Quito"]})
print(df.corr())`,
      explicacion:
        'Calcular correlación sobre una columna de texto ("ciudad") no tiene sentido matemático. En versiones recientes de pandas esto lanza un error; la forma segura es usar `df.corr(numeric_only=True)` para que solo considere columnas numéricas.',
    },
    practicaGuiada: {
      id: 'm10-l3-practica',
      enunciado: 'Calcula la correlación entre "x" e "y" con `.corr()`, redondeada a 2 decimales.',
      codigoInicial: `import pandas as pd\n\ndf = pd.DataFrame({"x": [1, 2, 3, 4], "y": [10, 20, 30, 40]})\nprint(0)`,
      solucion: `import pandas as pd\n\ndf = pd.DataFrame({"x": [1, 2, 3, 4], "y": [10, 20, 30, 40]})\nprint(round(df["x"].corr(df["y"]), 2))`,
      pistas: ['`df["x"].corr(df["y"])`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1.0'
        return { ok, mensaje: ok ? 'Correcto: relación perfectamente lineal (correlación 1.0).' : 'El resultado esperado es 1.0.' }
      },
    },
    reto: {
      id: 'm10-l3-reto',
      enunciado:
        'Dado `datos` con columnas "precio" y "demanda" (relación inversa), calcula su correlación redondeada a 2 decimales e imprímela. Debe dar un valor negativo.',
      codigoInicial: `import pandas as pd\n\ndatos = pd.DataFrame({\n    "precio": [10, 20, 30, 40, 50],\n    "demanda": [100, 80, 55, 30, 12],\n})\n# calcula e imprime la correlación redondeada a 2 decimales`,
      solucion: `import pandas as pd\n\ndatos = pd.DataFrame({\n    "precio": [10, 20, 30, 40, 50],\n    "demanda": [100, 80, 55, 30, 12],\n})\nprint(round(datos["precio"].corr(datos["demanda"]), 2))`,
      pistas: ['`datos["precio"].corr(datos["demanda"])`.'],
      validar: (stdout) => {
        const valor = parseFloat(stdout.trim())
        const ok = !Number.isNaN(valor) && valor < -0.9
        return { ok, mensaje: ok ? 'Correcto: correlación fuertemente negativa, como se espera entre precio y demanda.' : 'Se esperaba un valor cercano a -0.99.' }
      },
    },
    verificacion: [
      {
        id: 'm10-l3-q1',
        pregunta: 'Si dos variables tienen una correlación de 0.95, ¿qué podemos concluir con certeza?',
        opciones: [
          'Que una variable causa la otra',
          'Que existe una fuerte relación lineal positiva entre ambas, pero no necesariamente causalidad',
          'Que los datos están mal',
          'Que no hay ninguna relación',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Una correlación alta indica una fuerte relación lineal, pero correlación no implica causalidad: podría haber una tercera variable detrás.',
      },
    ],
    resumen: [
      'La correlación de Pearson mide la fuerza y dirección de una relación lineal, entre -1 y 1.',
      '`df.corr(numeric_only=True)` calcula la matriz de correlación de todas las columnas numéricas.',
      'Correlación no implica causalidad: siempre interpreta con cautela.',
    ],
    proximoPaso: 'Veremos distribuciones y percentiles para entender mejor la forma de tus datos.',
    conceptos: ['correlacion'],
  },
  {
    id: 'm10-l4',
    moduloId: 'modulo-10',
    titulo: 'Distribuciones y percentiles',
    objetivo: 'Interpretar percentiles y reconocer cuándo una distribución está sesgada.',
    porQueImporta:
      '"Estás en el percentil 90 de ventas" es un lenguaje que todo negocio entiende. Saber calcular e interpretar percentiles es clave para comparar un valor contra el resto de los datos.',
    concepto: `Un percentil indica qué porcentaje de los datos queda por debajo de un valor:

\`\`\`python
datos.quantile(0.9)   # percentil 90: el 90% de los datos es menor o igual a este valor
\`\`\`

Cuando **media > mediana**, la distribución suele tener una cola hacia la derecha (sesgo positivo, valores altos poco frecuentes la estiran). Cuando **media < mediana**, el sesgo es hacia la izquierda.`,
    ejemploMinimo: `import pandas as pd

datos = pd.Series([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
print(datos.quantile(0.9))`,
    ejemploAplicado: `import pandas as pd

salarios = pd.Series([2000, 2200, 2100, 2300, 2150, 2050, 9000])

p90 = salarios.quantile(0.9)
mi_salario = 2300
percentil_aproximado = (salarios < mi_salario).mean() * 100

print("Percentil 90:", p90)
print(f"Mi salario supera aprox. al {percentil_aproximado:.0f}% de la muestra")`,
    errorFrecuente: {
      codigo: `import pandas as pd

datos = pd.Series([10, 20, 30])
print(datos.quantile(90))`,
      explicacion:
        '`.quantile()` espera un valor entre 0 y 1 (proporción), no entre 0 y 100. `quantile(90)` no representa el percentil 90; el valor correcto es `quantile(0.9)`.',
    },
    practicaGuiada: {
      id: 'm10-l4-practica',
      enunciado: 'Calcula el percentil 50 (la mediana) de `datos` usando `.quantile(0.5)` e imprímelo.',
      codigoInicial: `import pandas as pd\n\ndatos = pd.Series([5, 10, 15, 20, 25])\nprint(0)`,
      solucion: `import pandas as pd\n\ndatos = pd.Series([5, 10, 15, 20, 25])\nprint(datos.quantile(0.5))`,
      pistas: ['`datos.quantile(0.5)` equivale a la mediana.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '15.0'
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado es 15.0.' }
      },
    },
    reto: {
      id: 'm10-l4-reto',
      enunciado:
        'Dado `tiempos_entrega`, calcula e imprime el percentil 95 (`.quantile(0.95)`), redondeado a 1 decimal — una métrica típica de SLA (acuerdo de nivel de servicio).',
      codigoInicial: `import pandas as pd\n\ntiempos_entrega = pd.Series([2, 3, 2, 4, 3, 2, 3, 10, 2, 3])\n# calcula e imprime el percentil 95 redondeado a 1 decimal`,
      solucion: `import pandas as pd\n\ntiempos_entrega = pd.Series([2, 3, 2, 4, 3, 2, 3, 10, 2, 3])\nprint(round(tiempos_entrega.quantile(0.95), 1))`,
      pistas: ['`tiempos_entrega.quantile(0.95)`.'],
      validar: (stdout) => {
        const valor = parseFloat(stdout.trim())
        const ok = !Number.isNaN(valor) && Math.abs(valor - 6.55) < 1.5
        return { ok, mensaje: ok ? 'Correcto.' : 'El resultado esperado ronda 5.5-6.6 según el método de interpolación.' }
      },
    },
    verificacion: [
      {
        id: 'm10-l4-q1',
        pregunta: 'Si media > mediana en una distribución, ¿qué sugiere eso?',
        opciones: [
          'Que los datos son erróneos',
          'Un sesgo hacia la derecha (cola de valores altos poco frecuentes)',
          'Que la distribución es perfectamente simétrica',
          'Que no hay suficientes datos',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Cuando la media supera a la mediana, suele haber valores altos poco frecuentes "tirando" del promedio hacia arriba.',
      },
    ],
    resumen: [
      '`.quantile(p)` con p entre 0 y 1 calcula el percentil correspondiente.',
      'Comparar media y mediana es una forma rápida de detectar sesgo en una distribución.',
      'Los percentiles son el lenguaje natural para comparar un valor individual contra el resto de una muestra.',
    ],
    proximoPaso: 'Cerramos el módulo con pruebas de hipótesis: cómo decidir si una diferencia observada es estadísticamente significativa.',
    conceptos: ['percentiles', 'sesgo-distribucion'],
  },
  {
    id: 'm10-l5',
    moduloId: 'modulo-10',
    titulo: 'Introducción a pruebas de hipótesis',
    objetivo: 'Aplicar una prueba t para comparar dos grupos y entender cómo interpretar un p-value.',
    porQueImporta:
      '¿La variante B de tu sitio realmente vende más, o es solo ruido aleatorio? Las pruebas de hipótesis son la herramienta formal para responder ese tipo de preguntas con evidencia, no con intuición.',
    concepto: `Una prueba de hipótesis compara dos escenarios:

- **Hipótesis nula (H0)**: no hay diferencia real entre los grupos.
- **Hipótesis alternativa (H1)**: sí hay una diferencia.

\`\`\`python
from scipy import stats

t_stat, p_value = stats.ttest_ind(grupo_a, grupo_b)
\`\`\`

El **p-value** es la probabilidad de observar una diferencia así de grande si en realidad H0 fuera cierta. Por convención, si \`p_value < 0.05\`, se considera que la diferencia es estadísticamente significativa (se rechaza H0).

Esto no prueba nada con certeza absoluta: es evidencia estadística, no una verdad matemática.`,
    ejemploMinimo: `from scipy import stats

grupo_a = [10, 12, 11, 13, 12]
grupo_b = [15, 16, 14, 17, 15]

t_stat, p_value = stats.ttest_ind(grupo_a, grupo_b)
print(p_value < 0.05)`,
    ejemploAplicado: `from scipy import stats

control = [120, 115, 130, 125, 118, 122]
variante_b = [140, 135, 150, 145, 138, 142]

t_stat, p_value = stats.ttest_ind(control, variante_b)
print(f"p-value: {p_value:.4f}")
if p_value < 0.05:
    print("La diferencia es estadísticamente significativa")
else:
    print("No hay evidencia suficiente de diferencia real")`,
    errorFrecuente: {
      codigo: `from scipy import stats

grupo_a = [10, 12, 11]
grupo_b = [10, 11, 12]

t_stat, p_value = stats.ttest_ind(grupo_a, grupo_b)
print("Son diferentes porque p-value es", p_value)`,
      explicacion:
        'Afirmar una conclusión sin comparar el p-value contra el umbral (normalmente 0.05) es un error común. Un p-value de, por ejemplo, 0.8 significa que NO hay evidencia suficiente de diferencia real; hay que comparar explícitamente `p_value < 0.05` antes de concluir.',
    },
    practicaGuiada: {
      id: 'm10-l5-practica',
      enunciado:
        'Ejecuta `stats.ttest_ind(grupo_a, grupo_b)` sobre los grupos dados, guarda `p_value`, e imprime si `p_value < 0.05`.',
      codigoInicial: `from scipy import stats\n\ngrupo_a = [5, 6, 5, 7, 6]\ngrupo_b = [5, 6, 6, 5, 7]\nt_stat, p_value = 0, 1\nprint(p_value < 0.05)`,
      solucion: `from scipy import stats\n\ngrupo_a = [5, 6, 5, 7, 6]\ngrupo_b = [5, 6, 6, 5, 7]\nt_stat, p_value = stats.ttest_ind(grupo_a, grupo_b)\nprint(p_value < 0.05)`,
      pistas: ['Reemplaza la línea de `t_stat, p_value = 0, 1` por `stats.ttest_ind(grupo_a, grupo_b)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'False'
        return { ok, mensaje: ok ? 'Correcto: estos grupos son prácticamente idénticos, no hay diferencia significativa.' : 'El resultado esperado es False.' }
      },
    },
    reto: {
      id: 'm10-l5-reto',
      enunciado:
        'Dados `antes` y `despues` de una campaña de marketing, usa `stats.ttest_ind()` e imprime "significativo" si `p_value < 0.05`, o "no significativo" en otro caso.',
      codigoInicial: `from scipy import stats\n\nantes = [100, 105, 98, 102, 101, 99]\ndespues = [130, 135, 128, 140, 133, 138]\n# ejecuta la prueba t e imprime la conclusión`,
      solucion: `from scipy import stats\n\nantes = [100, 105, 98, 102, 101, 99]\ndespues = [130, 135, 128, 140, 133, 138]\nt_stat, p_value = stats.ttest_ind(antes, despues)\nif p_value < 0.05:\n    print("significativo")\nelse:\n    print("no significativo")`,
      pistas: ['Calcula `t_stat, p_value = stats.ttest_ind(antes, despues)`.', 'Compara `p_value < 0.05` con un if/else.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'significativo'
        return { ok, mensaje: ok ? 'Correcto: la diferencia entre antes y después es estadísticamente significativa.' : 'Debe imprimir "significativo".' }
      },
    },
    verificacion: [
      {
        id: 'm10-l5-q1',
        pregunta: 'Si una prueba t da un p-value de 0.6, ¿qué se concluye convencionalmente?',
        opciones: [
          'Que la diferencia es muy significativa',
          'Que no hay evidencia suficiente para afirmar que existe una diferencia real',
          'Que los datos están corruptos',
          'Que se debe repetir el experimento con menos datos',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Un p-value alto (mayor a 0.05) indica que no hay evidencia suficiente para rechazar la hipótesis nula de "no hay diferencia".',
      },
    ],
    resumen: [
      'Una prueba de hipótesis compara una hipótesis nula (sin diferencia) contra una alternativa (sí hay diferencia).',
      '`stats.ttest_ind(grupo_a, grupo_b)` devuelve el estadístico t y el p-value.',
      'Convención: `p_value < 0.05` sugiere una diferencia estadísticamente significativa.',
      'Un resultado estadísticamente significativo no es una certeza absoluta, es evidencia dentro de un marco probabilístico.',
    ],
    proximoPaso:
      'Con EDA y estadística aplicada dominados, en el Módulo 11 construyes tu primer proyecto integrador de portafolio como Analista de Datos.',
    conceptos: ['pruebas-hipotesis', 'p-value'],
  },
]
