import type { Lesson } from '../../types'

export const module15Lessons: Lesson[] = [
  {
    id: 'm15-l1',
    moduloId: 'modulo-15',
    titulo: 'K-Means: agrupar sin etiquetas',
    objetivo: 'Entender qué es el aprendizaje no supervisado y agrupar datos con K-Means.',
    porQueImporta:
      'No siempre tienes una columna "respuesta" que predecir. A veces la pregunta es: ¿qué tipos de clientes tengo? ¿Qué productos se parecen entre sí? El clustering descubre grupos naturales en los datos sin que nadie los etiquete antes.',
    concepto: `\`\`\`python
from sklearn.cluster import KMeans

modelo = KMeans(n_clusters=3, n_init=10, random_state=0)
modelo.fit(X)
modelo.labels_            # grupo asignado a cada fila
modelo.cluster_centers_   # centro de cada grupo
modelo.predict(X_nuevo)   # asigna grupos a datos nuevos
\`\`\`

En el aprendizaje **supervisado** entrenas con \`X\` e \`y\`. En el **no supervisado** solo tienes \`X\` y el algoritmo busca estructura por sí mismo.

**K-Means** funciona así: tú eliges cuántos grupos quieres (\`n_clusters\`); el algoritmo coloca ese número de centros, asigna cada punto al centro más cercano, recalcula los centros como el promedio de sus puntos, y repite hasta que se estabiliza.

Detalles importantes:
- Los números de grupo (0, 1, 2) son **arbitrarios**: que un grupo se llame 0 o 1 no significa nada, y puede cambiar entre ejecuciones. Lo que importa es qué puntos quedan juntos.
- \`random_state\` hace el resultado reproducible; \`n_init\` ejecuta el algoritmo varias veces con distintos puntos de partida y se queda con el mejor.
- No hay "respuesta correcta" contra la cual comparar: interpretar los grupos es parte de tu trabajo como analista.`,
    ejemploMinimo: `from sklearn.cluster import KMeans

X = [[1, 1], [1, 2], [8, 8], [9, 8]]
modelo = KMeans(n_clusters=2, n_init=10, random_state=0).fit(X)
print(modelo.labels_[0] == modelo.labels_[1])`,
    ejemploAplicado: `from sklearn.cluster import KMeans

# Clientes: [compras_por_mes, ticket_promedio]
clientes = [[1, 20], [2, 25], [1, 22], [10, 200], [12, 190], [11, 210]]

modelo = KMeans(n_clusters=2, n_init=10, random_state=0).fit(clientes)

print("Grupos:", modelo.labels_.tolist())
print("Cliente nuevo [11, 205] ->", modelo.predict([[11, 205]]).tolist())`,
    errorFrecuente: {
      codigo: `from sklearn.cluster import KMeans

modelo = KMeans(n_clusters=2).fit(X)
if modelo.labels_[0] == 0:
    print("El primer cliente es del grupo VIP")   # ¿por qué 0 sería VIP?`,
      explicacion:
        'Los números de cluster son etiquetas arbitrarias: el grupo "0" de hoy puede ser el grupo "1" mañana. Para darles significado, revisa el perfil de cada grupo (por ejemplo, el promedio de cada variable por cluster) y ponles un nombre tú mismo.',
    },
    practicaGuiada: {
      id: 'm15-l1-practica',
      enunciado:
        'Entrena un `KMeans` con 2 clusters sobre `X` (con `n_init=10` y `random_state=0`) e imprime cuántos grupos distintos hay en `modelo.labels_` usando `len(set(...))`.',
      codigoInicial: `from sklearn.cluster import KMeans\n\nX = [[1, 1], [1.5, 2], [2, 1.5], [8, 8], [8.5, 9], [9, 8.5]]\nprint(0)`,
      solucion: `from sklearn.cluster import KMeans\n\nX = [[1, 1], [1.5, 2], [2, 1.5], [8, 8], [8.5, 9], [9, 8.5]]\nmodelo = KMeans(n_clusters=2, n_init=10, random_state=0).fit(X)\nprint(len(set(modelo.labels_)))`,
      pistas: ['`KMeans(n_clusters=2, n_init=10, random_state=0).fit(X)` entrena el modelo.', '`set(modelo.labels_)` contiene los grupos únicos.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: se formaron 2 grupos.' : 'El resultado esperado es 2.' }
      },
    },
    reto: {
      id: 'm15-l1-reto',
      enunciado:
        'Usa `modelo.predict([[1.2, 1.1]])` para asignar un punto nuevo a un grupo. Imprime `True` si queda en el mismo grupo que el primer punto de `X` (`modelo.labels_[0]`).',
      codigoInicial: `from sklearn.cluster import KMeans\n\nX = [[1, 1], [1.5, 2], [2, 1.5], [8, 8], [8.5, 9], [9, 8.5]]\nmodelo = KMeans(n_clusters=2, n_init=10, random_state=0).fit(X)\n# predice el grupo del punto [1.2, 1.1] e imprime si coincide con el del primer punto`,
      solucion: `from sklearn.cluster import KMeans\n\nX = [[1, 1], [1.5, 2], [2, 1.5], [8, 8], [8.5, 9], [9, 8.5]]\nmodelo = KMeans(n_clusters=2, n_init=10, random_state=0).fit(X)\ngrupo_nuevo = modelo.predict([[1.2, 1.1]])[0]\nprint(bool(grupo_nuevo == modelo.labels_[0]))`,
      pistas: ['`modelo.predict([[1.2, 1.1]])` devuelve un arreglo; toma su elemento `[0]`.', 'Compara con `modelo.labels_[0]` y envuelve en `bool(...)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'True'
        return { ok, mensaje: ok ? 'Correcto: el punto nuevo está cerca del primer grupo.' : 'El resultado esperado es True.' }
      },
    },
    verificacion: [
      {
        id: 'm15-l1-q1',
        pregunta: '¿Cuál es la diferencia principal entre aprendizaje supervisado y no supervisado?',
        opciones: [
          'El no supervisado es siempre más preciso',
          'El supervisado usa una variable objetivo (y) conocida; el no supervisado solo tiene X y busca estructura',
          'El supervisado solo sirve para texto',
          'No hay diferencia práctica',
        ],
        respuestaCorrecta: 1,
        explicacion: 'En el supervisado hay una respuesta conocida para aprender; en el no supervisado el algoritmo descubre patrones sin etiquetas.',
      },
      {
        id: 'm15-l1-q2',
        pregunta: 'K-Means asigna a un cliente el cluster 0. ¿Qué puedes concluir?',
        opciones: [
          'Que es un cliente de mayor valor',
          'Que está en el primer grupo en importancia',
          'Nada por el número en sí: solo que comparte grupo con los demás clientes del cluster 0',
          'Que el modelo falló',
        ],
        respuestaCorrecta: 2,
        explicacion: 'Los números de cluster son arbitrarios. El significado sale de analizar el perfil de cada grupo.',
      },
    ],
    resumen: [
      'El aprendizaje no supervisado busca estructura en datos sin variable objetivo.',
      'K-Means agrupa en `n_clusters` grupos según cercanía a centros que va recalculando.',
      '`labels_` da el grupo de cada fila y `predict` asigna grupo a datos nuevos.',
      'Los números de cluster son arbitrarios: interpreta cada grupo por su perfil.',
    ],
    proximoPaso: 'K-Means exige elegir cuántos grupos. Veremos cómo decidirlo con inercia y silhouette.',
    conceptos: ['aprendizaje-no-supervisado', 'kmeans', 'clustering'],
  },
  {
    id: 'm15-l2',
    moduloId: 'modulo-15',
    titulo: 'Elegir el número de clusters: inercia y silhouette',
    objetivo: 'Elegir un valor razonable de k comparando inercia (método del codo) y silhouette score.',
    porQueImporta:
      'K-Means te obliga a decidir cuántos grupos buscar antes de ver los datos. Elegir mal produce segmentos artificiales o mezclados, y todo análisis posterior (marketing, precios) se construye sobre ellos.',
    concepto: `\`\`\`python
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

modelo = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
modelo.inertia_                           # inercia
silhouette_score(X, modelo.labels_)       # silhouette
\`\`\`

- **Inercia** (\`inertia_\`): suma de las distancias al cuadrado de cada punto a su centro. Cuanto más baja, grupos más compactos. Pero **siempre baja al aumentar k** (con k igual al número de puntos sería 0), así que no basta con minimizarla.
- **Método del codo**: grafica la inercia contra k y busca el punto donde la mejora deja de ser grande, el "codo".
- **Silhouette score**: va de -1 a 1. Mide qué tan cerca está cada punto de su propio grupo comparado con el grupo vecino más cercano. Cerca de 1 = grupos bien separados; cerca de 0 = grupos que se solapan; negativo = puntos probablemente mal asignados. A diferencia de la inercia, **sí tiene un máximo útil**, así que puedes elegir el k con mayor silhouette.

Estas métricas ayudan, pero la decisión final también depende del negocio: quizá 3 segmentos son más accionables que 7.`,
    ejemploMinimo: `from sklearn.cluster import KMeans

X = [[1, 1], [1, 2], [8, 8], [9, 8]]
print(KMeans(n_clusters=2, n_init=10, random_state=0).fit(X).inertia_ < KMeans(n_clusters=1, n_init=10, random_state=0).fit(X).inertia_)`,
    ejemploAplicado: `from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X = [[1, 1], [1.5, 2], [2, 1.5], [1.2, 1.8],
     [8, 8], [8.5, 9], [9, 8.5], [8.8, 8.2],
     [1, 9], [1.5, 9.5], [2, 8.8], [1.4, 9.2]]

for k in [2, 3, 4]:
    modelo = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    print(k, "inercia:", round(modelo.inertia_, 1), "silhouette:", round(silhouette_score(X, modelo.labels_), 2))`,
    errorFrecuente: {
      codigo: `# "Elijo el k con menor inercia"
mejor_k = min(range(1, 11), key=lambda k: KMeans(n_clusters=k).fit(X).inertia_)
print(mejor_k)   # siempre devuelve 10`,
      explicacion:
        'La inercia disminuye siempre al aumentar k, así que minimizarla ciegamente elige el máximo k posible. Usa el método del codo (dónde deja de mejorar mucho) o una métrica como silhouette, que sí tiene un máximo informativo.',
    },
    practicaGuiada: {
      id: 'm15-l2-practica',
      enunciado:
        'Entrena K-Means con k=1 y con k=3 (`n_init=10`, `random_state=0`) e imprime `True` si la inercia con k=3 es menor que con k=1.',
      codigoInicial: `from sklearn.cluster import KMeans\n\nX = [[1, 1], [1.5, 2], [2, 1.5], [1.2, 1.8],\n     [8, 8], [8.5, 9], [9, 8.5], [8.8, 8.2],\n     [1, 9], [1.5, 9.5], [2, 8.8], [1.4, 9.2]]\nprint(False)`,
      solucion: `from sklearn.cluster import KMeans\n\nX = [[1, 1], [1.5, 2], [2, 1.5], [1.2, 1.8],\n     [8, 8], [8.5, 9], [9, 8.5], [8.8, 8.2],\n     [1, 9], [1.5, 9.5], [2, 8.8], [1.4, 9.2]]\ninercia_1 = KMeans(n_clusters=1, n_init=10, random_state=0).fit(X).inertia_\ninercia_3 = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X).inertia_\nprint(bool(inercia_3 < inercia_1))`,
      pistas: ['Entrena dos modelos y compara sus atributos `inertia_`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'True'
        return { ok, mensaje: ok ? 'Correcto: más grupos implican grupos más compactos (menor inercia).' : 'El resultado esperado es True.' }
      },
    },
    reto: {
      id: 'm15-l2-reto',
      enunciado:
        'Prueba k = 2, 3 y 4 con un bucle, calcula `silhouette_score(X, modelo.labels_)` para cada uno e imprime el k con mayor silhouette. Pista: guarda los resultados en un diccionario y usa `max(dic, key=dic.get)`.',
      codigoInicial: `from sklearn.cluster import KMeans\nfrom sklearn.metrics import silhouette_score\n\nX = [[1, 1], [1.5, 2], [2, 1.5], [1.2, 1.8],\n     [8, 8], [8.5, 9], [9, 8.5], [8.8, 8.2],\n     [1, 9], [1.5, 9.5], [2, 8.8], [1.4, 9.2]]\n# calcula el silhouette para k = 2, 3, 4 e imprime el mejor k`,
      solucion: `from sklearn.cluster import KMeans\nfrom sklearn.metrics import silhouette_score\n\nX = [[1, 1], [1.5, 2], [2, 1.5], [1.2, 1.8],\n     [8, 8], [8.5, 9], [9, 8.5], [8.8, 8.2],\n     [1, 9], [1.5, 9.5], [2, 8.8], [1.4, 9.2]]\nscores = {}\nfor k in [2, 3, 4]:\n    modelo = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)\n    scores[k] = silhouette_score(X, modelo.labels_)\nprint(max(scores, key=scores.get))`,
      pistas: ['`scores[k] = silhouette_score(X, modelo.labels_)` dentro del bucle.', '`max(scores, key=scores.get)` devuelve la clave con mayor valor.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '3'
        return { ok, mensaje: ok ? 'Correcto: los datos forman 3 grupos bien separados.' : 'El resultado esperado es 3.' }
      },
    },
    verificacion: [
      {
        id: 'm15-l2-q1',
        pregunta: '¿Por qué no basta con elegir el k que minimiza la inercia?',
        opciones: [
          'Porque la inercia no se puede calcular',
          'Porque la inercia siempre disminuye al aumentar k, así que elegiría el k más grande',
          'Porque solo sirve con 2 clusters',
          'Porque depende del idioma de los datos',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Más centros siempre reducen la distancia de los puntos a su centro. Por eso se busca el codo o se usa silhouette.',
      },
      {
        id: 'm15-l2-q2',
        pregunta: 'Un silhouette score cercano a 0 indica que:',
        opciones: [
          'Los grupos están perfectamente separados',
          'Los grupos se solapan, no hay una separación clara',
          'El modelo no se entrenó',
          'Hay exactamente un cluster',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Cerca de 1 = bien separados; cerca de 0 = fronteras difusas; negativo = posibles asignaciones erróneas.',
      },
    ],
    resumen: [
      'La inercia mide compactación y siempre baja al subir k: úsala con el método del codo.',
      'El silhouette (-1 a 1) mide separación entre grupos y permite comparar valores de k.',
      'La decisión final de k también considera si los segmentos son útiles para el negocio.',
    ],
    proximoPaso: 'K-Means es sensible a la escala de las variables. Veremos por qué debes escalar antes de agrupar.',
    conceptos: ['inercia', 'metodo-del-codo', 'silhouette'],
  },
  {
    id: 'm15-l3',
    moduloId: 'modulo-15',
    titulo: 'Escalar antes de agrupar',
    objetivo: 'Entender por qué K-Means necesita variables escaladas y aplicar StandardScaler antes de agrupar.',
    porQueImporta:
      'K-Means decide por distancias. Si una variable tiene números enormes (ingreso) y otra pequeños (edad), la grande domina el resultado y la otra casi no cuenta, aunque sea igual de importante.',
    concepto: `\`\`\`python
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

X_esc = StandardScaler().fit_transform(X)
modelo = KMeans(n_clusters=2, n_init=10, random_state=0).fit(X_esc)
\`\`\`

K-Means (y DBSCAN, y PCA) se basan en distancias. Una diferencia de 2,000 en ingreso pesa muchísimo más que una diferencia de 40 años de edad, simplemente porque los números son más grandes.

Escalar con \`StandardScaler\` deja cada variable con media 0 y desviación estándar 1, de modo que todas contribuyen en proporciones comparables.

Aquí **no hay train/test** ni riesgo de leakage hacia una variable objetivo, así que puedes ajustar el escalador con todos los datos que vas a agrupar. Si luego vas a asignar clientes nuevos con \`predict\`, deberás transformarlos con **el mismo escalador** (\`escalador.transform(...)\`).`,
    ejemploMinimo: `from sklearn.preprocessing import StandardScaler

X = [[20, 50000], [60, 51000]]
print(StandardScaler().fit_transform(X).round(1).tolist())`,
    ejemploAplicado: `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# [edad, ingreso]: dos grupos claros por edad, ingreso casi igual
datos = [[20, 50000], [22, 52000], [21, 51000],
         [60, 50500], [62, 51500], [61, 51200]]

sin_escalar = KMeans(n_clusters=2, n_init=10, random_state=0).fit(datos)
escalado = KMeans(n_clusters=2, n_init=10, random_state=0).fit(StandardScaler().fit_transform(datos))

print("Sin escalar:", sin_escalar.labels_.tolist())
print("Escalado:   ", escalado.labels_.tolist())`,
    errorFrecuente: {
      codigo: `from sklearn.cluster import KMeans

# edad en años (20-62) e ingreso en pesos (50,000-52,000)
modelo = KMeans(n_clusters=2).fit(clientes[["edad", "ingreso"]])
# "los grupos salen raros, ¿será el algoritmo?"`,
      explicacion:
        'Sin escalar, el ingreso domina la distancia y los grupos se forman casi solo por ingreso, ignorando la edad. Antes de cualquier algoritmo basado en distancias, estandariza las variables numéricas.',
    },
    practicaGuiada: {
      id: 'm15-l3-practica',
      enunciado:
        'Escala `X` con `StandardScaler().fit_transform(X)` e imprime la media de la primera columna del resultado, redondeada con `round(..., 2)`. Debe ser 0.',
      codigoInicial: `from sklearn.preprocessing import StandardScaler\n\nX = [[20, 50000], [22, 52000], [21, 51000], [60, 50500], [62, 51500], [61, 51200]]\nprint(1)`,
      solucion: `from sklearn.preprocessing import StandardScaler\n\nX = [[20, 50000], [22, 52000], [21, 51000], [60, 50500], [62, 51500], [61, 51200]]\nX_esc = StandardScaler().fit_transform(X)\nprint(round(abs(X_esc[:, 0].mean()), 2))`,
      pistas: ['`X_esc[:, 0]` selecciona la primera columna.', 'Usa `abs(...)` para evitar un "-0.0" por redondeo.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.0'
        return { ok, mensaje: ok ? 'Correcto: tras escalar, cada columna tiene media 0.' : 'El resultado esperado es 0.0.' }
      },
    },
    reto: {
      id: 'm15-l3-reto',
      enunciado:
        'Escala `datos`, agrupa en 2 clusters (`n_init=10`, `random_state=0`) e imprime `True` si los 3 primeros clientes (los de ~20 años) quedaron en el mismo grupo y los 3 últimos en otro distinto.',
      codigoInicial: `from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\n\ndatos = [[20, 50000], [22, 52000], [21, 51000], [60, 50500], [62, 51500], [61, 51200]]\n# escala, agrupa e imprime si los 3 primeros comparten grupo distinto al de los 3 últimos`,
      solucion: `from sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\n\ndatos = [[20, 50000], [22, 52000], [21, 51000], [60, 50500], [62, 51500], [61, 51200]]\nX_esc = StandardScaler().fit_transform(datos)\netiquetas = KMeans(n_clusters=2, n_init=10, random_state=0).fit(X_esc).labels_\nprimeros = set(etiquetas[:3])\nultimos = set(etiquetas[3:])\nprint(len(primeros) == 1 and len(ultimos) == 1 and primeros != ultimos)`,
      pistas: ['Agrupa `X_esc`, no `datos`.', '`set(etiquetas[:3])` debe tener un solo valor, y ser distinto de `set(etiquetas[3:])`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'True'
        return { ok, mensaje: ok ? 'Correcto: al escalar, la edad vuelve a contar y los grupos son los esperados.' : 'El resultado esperado es True. ¿Agrupaste los datos escalados?' }
      },
    },
    verificacion: [
      {
        id: 'm15-l3-q1',
        pregunta: '¿Por qué K-Means es sensible a la escala de las variables?',
        opciones: [
          'Porque usa distancias, y las variables con números más grandes dominan esas distancias',
          'Porque solo acepta enteros',
          'Porque ordena las columnas alfabéticamente',
          'No es sensible a la escala',
        ],
        respuestaCorrecta: 0,
        explicacion: 'Una variable en miles pesa mucho más en la distancia que una en decenas, aunque ambas sean igual de relevantes.',
      },
    ],
    resumen: [
      'Los algoritmos basados en distancias (K-Means, DBSCAN, PCA) requieren variables en escalas comparables.',
      '`StandardScaler` deja cada variable con media 0 y desviación 1.',
      'Para asignar datos nuevos a clusters, transfórmalos con el mismo escalador usado al entrenar.',
    ],
    proximoPaso: 'K-Means supone grupos redondos y no maneja el ruido. DBSCAN agrupa por densidad y detecta outliers.',
    conceptos: ['escalado-clustering', 'distancias'],
  },
  {
    id: 'm15-l4',
    moduloId: 'modulo-15',
    titulo: 'DBSCAN: clusters por densidad y detección de ruido',
    objetivo: 'Agrupar con DBSCAN, interpretar eps y min_samples, y reconocer los puntos de ruido (etiqueta -1).',
    porQueImporta:
      'K-Means obliga a que todo punto pertenezca a algún grupo y necesita que le digas cuántos. DBSCAN descubre el número de grupos por sí mismo y marca como ruido los puntos aislados, útil para encontrar anomalías.',
    concepto: `\`\`\`python
from sklearn.cluster import DBSCAN

modelo = DBSCAN(eps=0.6, min_samples=3)
etiquetas = modelo.fit_predict(X)
\`\`\`

DBSCAN agrupa puntos en zonas **densas** separadas por zonas poco pobladas. Tiene dos parámetros:

- **\`eps\`**: radio de vecindad. Dos puntos a menos de \`eps\` de distancia son vecinos.
- **\`min_samples\`**: cuántos vecinos (incluido el propio punto) hacen falta para considerar una zona "densa".

El resultado en \`labels_\`:
- 0, 1, 2… son los clusters descubiertos.
- **-1 es ruido**: puntos que no pertenecen a ninguna zona densa. No es un grupo, son los atípicos.

Comparado con K-Means: no necesitas decidir el número de clusters, detecta formas no esféricas y señala outliers. A cambio, es muy sensible a \`eps\` (demasiado pequeño → todo es ruido; demasiado grande → todo se fusiona en un solo grupo) y suele funcionar mal si los grupos tienen densidades muy distintas. También requiere variables escaladas.`,
    ejemploMinimo: `from sklearn.cluster import DBSCAN

X = [[1, 1], [1.2, 1.1], [1.1, 1.3], [9, 9]]
print(DBSCAN(eps=0.6, min_samples=3).fit_predict(X).tolist())`,
    ejemploAplicado: `from sklearn.cluster import DBSCAN

# Dos zonas densas y una transacción aislada
puntos = [[1, 1], [1.2, 1.1], [1.1, 1.3], [1.3, 1.2],
          [5, 5], [5.2, 5.1], [5.1, 5.3], [5.3, 5.2],
          [9, 1]]

etiquetas = DBSCAN(eps=0.6, min_samples=3).fit_predict(puntos)
print("Etiquetas:", etiquetas.tolist())
print("Puntos de ruido:", etiquetas.tolist().count(-1))`,
    errorFrecuente: {
      codigo: `from sklearn.cluster import DBSCAN

etiquetas = DBSCAN(eps=0.01, min_samples=5).fit_predict(X)
print(set(etiquetas))   # {-1}: "no hay grupos en mis datos"`,
      explicacion:
        'Un `eps` demasiado pequeño hace que ningún punto tenga vecinos suficientes y todo sea ruido (-1). No significa que no haya estructura: ajusta `eps` mirando la escala de tus datos (por ejemplo, la distancia típica al k-ésimo vecino más cercano) y recuerda escalar antes.',
    },
    practicaGuiada: {
      id: 'm15-l4-practica',
      enunciado:
        'Aplica `DBSCAN(eps=0.6, min_samples=3).fit_predict(puntos)` e imprime cuántos puntos son ruido (etiqueta -1) con `.tolist().count(-1)`.',
      codigoInicial: `from sklearn.cluster import DBSCAN\n\npuntos = [[1, 1], [1.2, 1.1], [1.1, 1.3], [1.3, 1.2],\n          [5, 5], [5.2, 5.1], [5.1, 5.3], [5.3, 5.2],\n          [9, 1]]\nprint(0)`,
      solucion: `from sklearn.cluster import DBSCAN\n\npuntos = [[1, 1], [1.2, 1.1], [1.1, 1.3], [1.3, 1.2],\n          [5, 5], [5.2, 5.1], [5.1, 5.3], [5.3, 5.2],\n          [9, 1]]\netiquetas = DBSCAN(eps=0.6, min_samples=3).fit_predict(puntos)\nprint(etiquetas.tolist().count(-1))`,
      pistas: ['`fit_predict` devuelve un arreglo de etiquetas.', 'El punto [9, 1] está lejos de ambas zonas densas.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1'
        return { ok, mensaje: ok ? 'Correcto: un solo punto aislado quedó como ruido.' : 'El resultado esperado es 1.' }
      },
    },
    reto: {
      id: 'm15-l4-reto',
      enunciado:
        'Imprime cuántos **clusters** encontró DBSCAN sin contar el ruido. Pista: `len(set(etiquetas) - {-1})`.',
      codigoInicial: `from sklearn.cluster import DBSCAN\n\npuntos = [[1, 1], [1.2, 1.1], [1.1, 1.3], [1.3, 1.2],\n          [5, 5], [5.2, 5.1], [5.1, 5.3], [5.3, 5.2],\n          [9, 1]]\n# aplica DBSCAN(eps=0.6, min_samples=3) e imprime el número de clusters sin contar el ruido`,
      solucion: `from sklearn.cluster import DBSCAN\n\npuntos = [[1, 1], [1.2, 1.1], [1.1, 1.3], [1.3, 1.2],\n          [5, 5], [5.2, 5.1], [5.1, 5.3], [5.3, 5.2],\n          [9, 1]]\netiquetas = DBSCAN(eps=0.6, min_samples=3).fit_predict(puntos)\nprint(len(set(etiquetas) - {-1}))`,
      pistas: ['`set(etiquetas)` contiene los clusters y también -1 si hay ruido.', 'Réstale `{-1}` antes de contar.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: DBSCAN encontró 2 zonas densas sin que se lo dijeras.' : 'El resultado esperado es 2.' }
      },
    },
    verificacion: [
      {
        id: 'm15-l4-q1',
        pregunta: 'En DBSCAN, ¿qué representa la etiqueta -1?',
        opciones: [
          'El primer cluster',
          'Puntos de ruido que no pertenecen a ninguna zona densa',
          'Un error de cálculo',
          'El cluster más grande',
        ],
        respuestaCorrecta: 1,
        explicacion: '-1 no es un grupo: marca los puntos atípicos que no tienen suficientes vecinos cercanos.',
      },
      {
        id: 'm15-l4-q2',
        pregunta: 'Si todos tus puntos quedan etiquetados como -1, ¿qué es lo más probable?',
        opciones: [
          'Que `eps` es demasiado pequeño para la escala de tus datos',
          'Que tienes demasiados datos',
          'Que DBSCAN no funciona con números',
          'Que el modelo es perfecto',
        ],
        respuestaCorrecta: 0,
        explicacion: 'Con un radio de vecindad muy pequeño ningún punto alcanza el mínimo de vecinos y todo se considera ruido.',
      },
    ],
    resumen: [
      'DBSCAN agrupa por densidad: no necesitas indicar el número de clusters.',
      '`eps` es el radio de vecindad y `min_samples` el mínimo de vecinos para formar una zona densa.',
      'La etiqueta -1 marca ruido, útil para detectar anomalías.',
      'Es sensible a `eps` y a la escala: estandariza antes de usarlo.',
    ],
    proximoPaso: 'Cerramos con reducción de dimensionalidad: PCA para resumir muchas variables en pocas.',
    conceptos: ['dbscan', 'deteccion-ruido', 'clustering-por-densidad'],
  },
  {
    id: 'm15-l5',
    moduloId: 'modulo-15',
    titulo: 'PCA: reducción de dimensionalidad',
    objetivo: 'Reducir el número de variables con PCA e interpretar la varianza explicada.',
    porQueImporta:
      'Con decenas de variables correlacionadas es difícil visualizar, agrupar o modelar. PCA resume la información en pocas componentes nuevas, conservando la mayor parte de la variación.',
    concepto: `\`\`\`python
from sklearn.decomposition import PCA

pca = PCA(n_components=2)
X_reducido = pca.fit_transform(X)
pca.explained_variance_ratio_   # fracción de varianza por componente
\`\`\`

PCA (Análisis de Componentes Principales) busca nuevas direcciones, llamadas **componentes principales**, que son combinaciones de las variables originales y cumplen:

- La primera componente captura la mayor varianza posible de los datos.
- Cada componente siguiente captura la mayor varianza restante y es perpendicular (no correlacionada) con las anteriores.

\`explained_variance_ratio_\` indica qué fracción de la información total conserva cada componente. Si las dos primeras componentes suman 95%, puedes resumir tus datos en 2 columnas perdiendo solo un 5%.

Cuándo usarlo:
- **Visualizar** datos de muchas dimensiones en 2D.
- **Reducir redundancia** cuando hay variables muy correlacionadas.
- Como paso previo a clustering o modelos.

Cuidados:
- **Escala antes** (\`StandardScaler\`): si no, las variables con números grandes dominan las componentes.
- Las componentes son combinaciones de variables, así que **pierden interpretabilidad** directa ("PC1" no es una columna de negocio).`,
    ejemploMinimo: `from sklearn.decomposition import PCA

X = [[1, 2], [2, 4], [3, 6], [4, 8]]
print(PCA(n_components=1).fit_transform(X).shape)`,
    ejemploAplicado: `from sklearn.decomposition import PCA

# 3 variables, pero la 2.ª y la 3.ª son casi copias de la 1.ª
X = [[1, 2, 2.01], [2, 4, 3.99], [3, 6, 6.02],
     [4, 8, 7.98], [5, 10, 10.01], [6, 12, 12.0]]

pca = PCA(n_components=2).fit(X)
print("Varianza explicada:", pca.explained_variance_ratio_.round(4).tolist())
print("Forma original:", (6, 3), "-> reducida:", pca.transform(X).shape)`,
    errorFrecuente: {
      codigo: `from sklearn.decomposition import PCA

# columnas: ingreso (miles) y edad (decenas), sin escalar
pca = PCA(n_components=1).fit(clientes[["ingreso", "edad"]])
print(pca.explained_variance_ratio_)   # [0.99999...] "¡una componente lo explica todo!"`,
      explicacion:
        'Sin escalar, la variable con números más grandes domina la varianza y PCA la reporta como casi toda la información, solo por su unidad de medida. Estandariza las variables antes de aplicar PCA.',
    },
    practicaGuiada: {
      id: 'm15-l5-practica',
      enunciado:
        'Reduce `X` (3 columnas) a 2 componentes con `PCA(n_components=2).fit_transform(X)` e imprime la forma del resultado con `.shape`.',
      codigoInicial: `from sklearn.decomposition import PCA\n\nX = [[1, 2, 2.01], [2, 4, 3.99], [3, 6, 6.02], [4, 8, 7.98], [5, 10, 10.01], [6, 12, 12.0]]\nprint((0, 0))`,
      solucion: `from sklearn.decomposition import PCA\n\nX = [[1, 2, 2.01], [2, 4, 3.99], [3, 6, 6.02], [4, 8, 7.98], [5, 10, 10.01], [6, 12, 12.0]]\nX_reducido = PCA(n_components=2).fit_transform(X)\nprint(X_reducido.shape)`,
      pistas: ['`fit_transform` devuelve un arreglo con una fila por muestra y una columna por componente.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '(6, 2)'
        return { ok, mensaje: ok ? 'Correcto: 6 filas y 2 componentes.' : 'El resultado esperado es (6, 2).' }
      },
    },
    reto: {
      id: 'm15-l5-reto',
      enunciado:
        'Ajusta `PCA(n_components=1)` sobre `X` e imprime `True` si esa única componente explica más del 99% de la varianza (`explained_variance_ratio_[0] > 0.99`).',
      codigoInicial: `from sklearn.decomposition import PCA\n\nX = [[1, 2, 2.01], [2, 4, 3.99], [3, 6, 6.02], [4, 8, 7.98], [5, 10, 10.01], [6, 12, 12.0]]\n# ajusta PCA con 1 componente e imprime si explica más del 99% de la varianza`,
      solucion: `from sklearn.decomposition import PCA\n\nX = [[1, 2, 2.01], [2, 4, 3.99], [3, 6, 6.02], [4, 8, 7.98], [5, 10, 10.01], [6, 12, 12.0]]\npca = PCA(n_components=1).fit(X)\nprint(bool(pca.explained_variance_ratio_[0] > 0.99))`,
      pistas: ['`pca.explained_variance_ratio_` es un arreglo; con una componente tiene un solo elemento.', 'Las tres columnas son casi copias unas de otras, así que hay mucha redundancia.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'True'
        return { ok, mensaje: ok ? 'Correcto: tres variables redundantes se resumen en una sola componente.' : 'El resultado esperado es True.' }
      },
    },
    verificacion: [
      {
        id: 'm15-l5-q1',
        pregunta: 'Las dos primeras componentes de un PCA suman una varianza explicada de 0.96. ¿Qué significa?',
        opciones: [
          'Que el modelo acierta el 96% de las predicciones',
          'Que esas dos componentes conservan el 96% de la variación de los datos originales',
          'Que se eliminaron el 96% de las filas',
          'Que hay 96 componentes',
        ],
        respuestaCorrecta: 1,
        explicacion: 'La varianza explicada indica cuánta información de las variables originales se conserva en las componentes elegidas.',
      },
      {
        id: 'm15-l5-q2',
        pregunta: '¿Por qué conviene escalar las variables antes de aplicar PCA?',
        opciones: [
          'Porque PCA no admite números decimales',
          'Para que las variables con unidades grandes no dominen artificialmente la varianza',
          'Porque PCA solo funciona con valores entre 0 y 1',
          'No conviene, PCA ya escala internamente',
        ],
        respuestaCorrecta: 1,
        explicacion: 'PCA se basa en varianza; sin estandarizar, la variable de mayor magnitud acapara las primeras componentes.',
      },
    ],
    resumen: [
      'PCA crea componentes nuevas ordenadas por la varianza que capturan.',
      '`explained_variance_ratio_` indica cuánta información conserva cada componente.',
      'Sirve para visualizar, reducir redundancia y preparar datos para otros modelos.',
      'Escala antes de aplicarlo; las componentes pierden interpretabilidad directa.',
    ],
    proximoPaso:
      'Con el aprendizaje no supervisado cubierto, en el siguiente módulo trabajamos datos con estructura especial: series temporales y texto (NLP básico).',
    conceptos: ['pca', 'reduccion-dimensionalidad', 'varianza-explicada'],
  },
]
