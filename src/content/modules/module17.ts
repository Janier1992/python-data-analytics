import type { Lesson } from '../../types'

export const module17Lessons: Lesson[] = [
  {
    id: 'm17-l1',
    moduloId: 'modulo-17',
    titulo: 'La neurona artificial',
    objetivo: 'Entender qué calcula una neurona (suma ponderada + sesgo + activación) y programarla con NumPy.',
    porQueImporta:
      'Toda red neuronal, desde una pequeña hasta los grandes modelos de lenguaje, está hecha de millones de copias de esta misma operación. Si entiendes una neurona, entiendes el ladrillo básico de todo el campo.',
    concepto: `\`\`\`python
import numpy as np

z = np.dot(w, x) + b          # suma ponderada + sesgo
salida = 1 / (1 + np.exp(-z)) # activación sigmoide
\`\`\`

Una neurona artificial hace tres cosas:

1. **Recibe entradas** \`x\` (las features de una fila de datos).
2. **Calcula una suma ponderada**: multiplica cada entrada por un peso \`w\` y suma el **sesgo** (bias) \`b\`. Es exactamente el mismo cálculo de una regresión lineal: \`z = w1·x1 + w2·x2 + … + b\`.
3. **Aplica una función de activación** que transforma \`z\` en la salida.

Dos activaciones muy comunes:

- **Sigmoide**: \`1 / (1 + e^-z)\`. Comprime cualquier número a un valor entre 0 y 1, interpretable como probabilidad. Con una sola neurona sigmoide tienes, de hecho, una regresión logística.
- **ReLU**: \`max(0, z)\`. Deja pasar los valores positivos y convierte los negativos en 0. Es la activación más usada en capas internas por ser simple y entrenar bien.

Los **pesos** y el **sesgo** son los parámetros que la red aprende durante el entrenamiento; la función de activación es lo que le da capacidad de modelar relaciones no lineales.`,
    ejemploMinimo: `import numpy as np

x = np.array([1, 2])
w = np.array([0.5, -1])
print(np.dot(w, x))`,
    ejemploAplicado: `import numpy as np

x = np.array([1, 2])        # entradas
w = np.array([0.5, -1])     # pesos
b = 0.5                     # sesgo

z = np.dot(w, x) + b
sigmoide = 1 / (1 + np.exp(-z))
relu = max(0, z)

print("z =", z)
print("sigmoide =", round(sigmoide, 2))
print("relu =", relu)`,
    errorFrecuente: {
      codigo: `import numpy as np

x = np.array([1, 2])
w = np.array([0.5, -1])
z = w * x + 0.5     # ¿por qué z es un arreglo de 2 números y no uno solo?`,
      explicacion:
        '`w * x` multiplica elemento a elemento y devuelve un arreglo; falta **sumar** los productos. La suma ponderada es un producto punto: `np.dot(w, x)` (o `(w * x).sum()`), y solo después se suma el sesgo.',
    },
    practicaGuiada: {
      id: 'm17-l1-practica',
      enunciado:
        'Calcula la suma ponderada con sesgo `z = np.dot(w, x) + b` e imprime `z`.',
      codigoInicial: `import numpy as np\n\nx = np.array([1, 2])\nw = np.array([0.5, -1])\nb = 0.5\nprint(0)`,
      solucion: `import numpy as np\n\nx = np.array([1, 2])\nw = np.array([0.5, -1])\nb = 0.5\nz = np.dot(w, x) + b\nprint(z)`,
      pistas: ['`np.dot(w, x)` = 0.5·1 + (-1)·2 = -1.5.', 'Después suma el sesgo 0.5.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '-1.0'
        return { ok, mensaje: ok ? 'Correcto: z = -1.5 + 0.5 = -1.0.' : 'El resultado esperado es -1.0.' }
      },
    },
    reto: {
      id: 'm17-l1-reto',
      enunciado:
        'Aplica la función sigmoide a `z` con `1 / (1 + np.exp(-z))` e imprime el resultado redondeado a 2 decimales.',
      codigoInicial: `import numpy as np\n\nx = np.array([1, 2])\nw = np.array([0.5, -1])\nb = 0.5\nz = np.dot(w, x) + b\n# aplica la sigmoide a z e imprime el resultado con 2 decimales`,
      solucion: `import numpy as np\n\nx = np.array([1, 2])\nw = np.array([0.5, -1])\nb = 0.5\nz = np.dot(w, x) + b\nsalida = 1 / (1 + np.exp(-z))\nprint(round(float(salida), 2))`,
      pistas: ['La fórmula es `1 / (1 + np.exp(-z))`.', 'Con z = -1 el resultado es menor que 0.5.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.27'
        return { ok, mensaje: ok ? 'Correcto: la neurona "apuesta" un 27% por la clase positiva.' : 'El resultado esperado es 0.27.' }
      },
    },
    verificacion: [
      {
        id: 'm17-l1-q1',
        pregunta: '¿Qué hace la función de activación ReLU?',
        opciones: [
          'Convierte cualquier número en una probabilidad entre 0 y 1',
          'Deja pasar los valores positivos y convierte los negativos en 0',
          'Eleva al cuadrado la entrada',
          'Normaliza la entrada con media 0',
        ],
        respuestaCorrecta: 1,
        explicacion: 'ReLU(z) = max(0, z): simple, rápida y muy usada en capas internas.',
      },
      {
        id: 'm17-l1-q2',
        pregunta: '¿Qué son los "parámetros" que una red neuronal aprende?',
        opciones: [
          'Las filas del dataset',
          'Los pesos y los sesgos de sus neuronas',
          'El número de columnas',
          'La métrica de evaluación',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Entrenar una red es ajustar sus pesos y sesgos para que las predicciones mejoren.',
      },
    ],
    resumen: [
      'Una neurona calcula `z = w·x + b` y le aplica una función de activación.',
      'Sigmoide da valores entre 0 y 1; ReLU deja pasar lo positivo y anula lo negativo.',
      'Los pesos y el sesgo son lo que la red aprende.',
      'Una sola neurona sigmoide equivale a una regresión logística.',
    ],
    proximoPaso: 'Ahora apilaremos neuronas en capas y haremos un "forward pass" completo.',
    conceptos: ['neurona-artificial', 'pesos-sesgo', 'funciones-activacion'],
  },
  {
    id: 'm17-l2',
    moduloId: 'modulo-17',
    titulo: 'Capas y forward pass',
    objetivo: 'Calcular a mano (con NumPy) el paso hacia adelante de una red con una capa oculta.',
    porQueImporta:
      'Una red es neuronas organizadas en capas: la salida de una capa es la entrada de la siguiente. Entender este flujo te permite leer cualquier arquitectura y saber por qué una capa oculta permite aprender patrones que una sola neurona no puede.',
    concepto: `\`\`\`python
h = np.maximum(0, x @ W1 + b1)                  # capa oculta (ReLU)
salida = 1 / (1 + np.exp(-(h @ W2 + b2)))       # capa de salida (sigmoide)
\`\`\`

Cuando hay varias neuronas en una capa, sus pesos se guardan como una **matriz**: una columna por neurona. El operador \`@\` hace el producto matricial y calcula todas las neuronas de la capa a la vez.

Una red con una capa oculta tiene tres partes:

1. **Capa de entrada**: son tus features; no hace cálculo.
2. **Capa(s) oculta(s)**: cada neurona combina todas las entradas y aplica una activación (normalmente ReLU).
3. **Capa de salida**: produce la predicción final. Para clasificación binaria suele ser una neurona sigmoide.

El recorrido de los datos desde la entrada hasta la salida se llama **forward pass** (propagación hacia adelante).

**¿Por qué sirve la capa oculta?** Sin activaciones no lineales, apilar capas equivale a una sola transformación lineal. La no linealidad de la activación (ReLU, tanh, sigmoide) es lo que permite a la red aprender fronteras curvas y relaciones complejas.

Formas de las matrices: si la entrada tiene 2 features y la capa oculta 3 neuronas, \`W1\` es de forma \`(2, 3)\` y \`b1\` de \`(3,)\`.`,
    ejemploMinimo: `import numpy as np

x = np.array([1, 2])
W1 = np.array([[1, -1], [0.5, 0.5]])
print((x @ W1).tolist())`,
    ejemploAplicado: `import numpy as np

x = np.array([1, 2])                      # 2 features

W1 = np.array([[1, -1], [0.5, 0.5]])      # (2 entradas -> 2 neuronas ocultas)
b1 = np.array([0, 0])
W2 = np.array([[1], [3]])                 # (2 ocultas -> 1 salida)
b2 = np.array([-1])

h = np.maximum(0, x @ W1 + b1)            # ReLU en la capa oculta
z = h @ W2 + b2
salida = 1 / (1 + np.exp(-z))             # sigmoide en la salida

print("Capa oculta:", h.tolist())
print("Probabilidad:", round(float(salida[0]), 2))`,
    errorFrecuente: {
      codigo: `import numpy as np

x = np.array([1, 2])
W1 = np.array([[1, -1, 2], [0.5, 0.5, 1]])   # forma (2, 3)
h = W1 @ x      # ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0`,
      explicacion:
        'En el producto matricial las dimensiones internas deben coincidir. Con `x` de tamaño 2 y `W1` de forma `(2, 3)` se escribe `x @ W1` (da 3 valores, uno por neurona). Recuerda la regla: `(n_entradas) @ (n_entradas, n_neuronas)`.',
    },
    practicaGuiada: {
      id: 'm17-l2-practica',
      enunciado:
        'Calcula la salida de la capa oculta: `h = np.maximum(0, x @ W1 + b1)` e imprímela como lista con `.tolist()`.',
      codigoInicial: `import numpy as np\n\nx = np.array([1, 2])\nW1 = np.array([[1, -1], [0.5, 0.5]])\nb1 = np.array([0, 0])\nprint([])`,
      solucion: `import numpy as np\n\nx = np.array([1, 2])\nW1 = np.array([[1, -1], [0.5, 0.5]])\nb1 = np.array([0, 0])\nh = np.maximum(0, x @ W1 + b1)\nprint(h.tolist())`,
      pistas: ['`x @ W1` da [2, 0]: 1·1 + 2·0.5 = 2 y 1·(-1) + 2·0.5 = 0.', '`np.maximum(0, ...)` aplica ReLU a todo el arreglo.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '[2.0, 0.0]'
        return { ok, mensaje: ok ? 'Correcto: la segunda neurona oculta queda en 0 (no se activa).' : 'El resultado esperado es [2.0, 0.0].' }
      },
    },
    reto: {
      id: 'm17-l2-reto',
      enunciado:
        'Completa el forward pass: calcula `h` (capa oculta con ReLU), luego `z = h @ W2 + b2` y la probabilidad con sigmoide. Imprime `float(salida[0])` redondeado a 2 decimales.',
      codigoInicial: `import numpy as np\n\nx = np.array([1, 2])\nW1 = np.array([[1, -1], [0.5, 0.5]])\nb1 = np.array([0, 0])\nW2 = np.array([[1], [3]])\nb2 = np.array([-1])\n# calcula h, z, la salida sigmoide e imprime la probabilidad con 2 decimales`,
      solucion: `import numpy as np\n\nx = np.array([1, 2])\nW1 = np.array([[1, -1], [0.5, 0.5]])\nb1 = np.array([0, 0])\nW2 = np.array([[1], [3]])\nb2 = np.array([-1])\nh = np.maximum(0, x @ W1 + b1)\nz = h @ W2 + b2\nsalida = 1 / (1 + np.exp(-z))\nprint(round(float(salida[0]), 2))`,
      pistas: ['h = [2, 0]; z = 2·1 + 0·3 - 1 = 1.', 'sigmoide(1) ≈ 0.73.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.73'
        return { ok, mensaje: ok ? 'Correcto: acabas de ejecutar el forward pass completo de una red.' : 'El resultado esperado es 0.73.' }
      },
    },
    verificacion: [
      {
        id: 'm17-l2-q1',
        pregunta: '¿Por qué una red necesita funciones de activación no lineales?',
        opciones: [
          'Para que el entrenamiento sea más lento',
          'Porque sin ellas, apilar capas equivale a una sola transformación lineal',
          'Para reducir el número de parámetros',
          'Porque NumPy lo exige',
        ],
        respuestaCorrecta: 1,
        explicacion: 'La no linealidad es lo que permite aprender relaciones y fronteras complejas.',
      },
      {
        id: 'm17-l2-q2',
        pregunta: 'Una capa oculta de 4 neuronas recibe 3 features. ¿Qué forma tiene su matriz de pesos W?',
        opciones: ['(4, 3)', '(3, 4)', '(3,)', '(4,)'],
        respuestaCorrecta: 1,
        explicacion: 'Una columna por neurona: (n_entradas, n_neuronas) = (3, 4), de modo que `x @ W` produce 4 valores.',
      },
    ],
    resumen: [
      'Las capas agrupan neuronas; sus pesos viven en una matriz de forma (n_entradas, n_neuronas).',
      'El forward pass encadena `x @ W + b` y una activación capa por capa.',
      'Las activaciones no lineales hacen que las capas ocultas aporten capacidad real.',
    ],
    proximoPaso: 'Hasta ahora los pesos eran dados. Veamos cómo la red los aprende: pérdida y descenso de gradiente.',
    conceptos: ['capas', 'forward-pass', 'capa-oculta'],
  },
  {
    id: 'm17-l3',
    moduloId: 'modulo-17',
    titulo: 'Cómo aprende una red: pérdida y descenso de gradiente',
    objetivo: 'Entender la función de pérdida y aplicar descenso de gradiente para ajustar un parámetro paso a paso.',
    porQueImporta:
      'Entrenar es el corazón del machine learning. Aunque librerías como scikit-learn lo hacen por ti, conocer el mecanismo te permite diagnosticar por qué un modelo no converge, qué significa el learning rate y por qué la pérdida debe bajar.',
    concepto: `\`\`\`python
error = w * x - y
perdida = np.mean(error ** 2)               # MSE
gradiente = np.mean(2 * error * x)          # derivada de la pérdida respecto a w
w = w - tasa_aprendizaje * gradiente        # un paso de descenso de gradiente
\`\`\`

Entrenar una red es un ciclo de cuatro pasos que se repite miles de veces:

1. **Predecir** con los pesos actuales (forward pass).
2. **Medir el error** con una **función de pérdida** (por ejemplo, el error cuadrático medio en regresión).
3. **Calcular el gradiente**: la derivada de la pérdida respecto a cada peso. Indica en qué dirección aumenta el error.
4. **Actualizar** los pesos moviéndolos en la dirección **contraria** al gradiente: \`w ← w − η · gradiente\`.

\`η\` (eta) es la **tasa de aprendizaje** (learning rate):
- Demasiado pequeña → el entrenamiento es lentísimo.
- Demasiado grande → los pasos "saltan" el mínimo y la pérdida puede crecer o dispararse.

En una red con varias capas el gradiente se calcula con **backpropagation**, que aplica la regla de la cadena de la última capa hacia la primera. No tendrás que programarlo tú: scikit-learn, TensorFlow y PyTorch lo hacen automáticamente. Lo importante es la intuición: cada ciclo ajusta los pesos un poco para reducir la pérdida.`,
    ejemploMinimo: `import numpy as np

x = np.array([1, 2, 3])
y = np.array([2, 4, 6])
w = 0.0
print(round(float(np.mean((w * x - y) ** 2)), 2))`,
    ejemploAplicado: `import numpy as np

# Aprender w en y = w * x (el valor verdadero es w = 2)
x = np.array([1, 2, 3])
y = np.array([2, 4, 6])
w = 0.0
tasa = 0.1

for paso in range(5):
    error = w * x - y
    perdida = np.mean(error ** 2)
    gradiente = np.mean(2 * error * x)
    w = w - tasa * gradiente
    print("paso", paso + 1, "pérdida:", round(float(perdida), 3), "w:", round(float(w), 3))`,
    errorFrecuente: {
      codigo: `# Tasa de aprendizaje muy alta
tasa = 1.0
for _ in range(10):
    gradiente = np.mean(2 * (w * x - y) * x)
    w = w + tasa * gradiente    # signo equivocado y paso enorme`,
      explicacion:
        'Hay dos errores clásicos: (1) **sumar** el gradiente en vez de restarlo (así sube la pérdida en lugar de bajarla), y (2) una tasa de aprendizaje demasiado grande, que hace que los pasos salten el mínimo y el entrenamiento diverja. La actualización correcta es `w = w - tasa * gradiente` con una tasa moderada.',
    },
    practicaGuiada: {
      id: 'm17-l3-practica',
      enunciado:
        'Da **un solo paso** de descenso de gradiente: calcula `error = w * x - y`, `gradiente = np.mean(2 * error * x)` y actualiza `w = w - tasa * gradiente`. Imprime `w` redondeado a 2 decimales.',
      codigoInicial: `import numpy as np\n\nx = np.array([1, 2, 3])\ny = np.array([2, 4, 6])\nw = 0.0\ntasa = 0.1\nprint(0)`,
      solucion: `import numpy as np\n\nx = np.array([1, 2, 3])\ny = np.array([2, 4, 6])\nw = 0.0\ntasa = 0.1\nerror = w * x - y\ngradiente = np.mean(2 * error * x)\nw = w - tasa * gradiente\nprint(round(float(w), 2))`,
      pistas: ['Con w = 0 el error es -y = [-2, -4, -6].', 'El gradiente es negativo (≈ -18.67), así que w sube.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1.87'
        return { ok, mensaje: ok ? 'Correcto: en un paso, w pasó de 0 a 1.87, acercándose al valor verdadero (2).' : 'El resultado esperado es 1.87.' }
      },
    },
    reto: {
      id: 'm17-l3-reto',
      enunciado:
        'Repite el paso de descenso de gradiente 50 veces con un bucle `for` e imprime el valor final de `w` redondeado a 2 decimales.',
      codigoInicial: `import numpy as np\n\nx = np.array([1, 2, 3])\ny = np.array([2, 4, 6])\nw = 0.0\ntasa = 0.1\n# repite 50 pasos de descenso de gradiente e imprime w con 2 decimales`,
      solucion: `import numpy as np\n\nx = np.array([1, 2, 3])\ny = np.array([2, 4, 6])\nw = 0.0\ntasa = 0.1\nfor _ in range(50):\n    error = w * x - y\n    gradiente = np.mean(2 * error * x)\n    w = w - tasa * gradiente\nprint(round(float(w), 2))`,
      pistas: ['Mete las tres líneas (error, gradiente, actualización) dentro de `for _ in range(50):`.', 'El valor verdadero es 2.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2.0'
        return { ok, mensaje: ok ? 'Correcto: el descenso de gradiente "descubrió" que y = 2·x.' : 'El resultado esperado es 2.0.' }
      },
    },
    verificacion: [
      {
        id: 'm17-l3-q1',
        pregunta: '¿Hacia dónde se mueven los pesos en cada paso de descenso de gradiente?',
        opciones: [
          'En la misma dirección del gradiente',
          'En la dirección contraria al gradiente, para reducir la pérdida',
          'Hacia valores aleatorios',
          'Hacia cero siempre',
        ],
        respuestaCorrecta: 1,
        explicacion: 'El gradiente apunta hacia donde la pérdida crece; restarlo hace que la pérdida baje.',
      },
      {
        id: 'm17-l3-q2',
        pregunta: 'Durante el entrenamiento la pérdida empieza a crecer cada vez más. ¿Qué causa es la más probable?',
        opciones: [
          'La tasa de aprendizaje es demasiado alta',
          'El dataset es demasiado pequeño',
          'Hay demasiadas columnas',
          'Python está desactualizado',
        ],
        respuestaCorrecta: 0,
        explicacion: 'Pasos demasiado grandes saltan el mínimo y hacen que el entrenamiento diverja.',
      },
    ],
    resumen: [
      'Entrenar = predecir, medir el error con una pérdida, calcular el gradiente y actualizar los pesos.',
      'La actualización resta el gradiente: `w ← w − η · gradiente`.',
      'La tasa de aprendizaje controla el tamaño del paso: ni muy pequeña ni muy grande.',
      'Backpropagation calcula los gradientes de todas las capas; las librerías lo hacen por ti.',
    ],
    proximoPaso: 'Con la teoría clara, entrenemos una red de verdad con MLPClassifier de scikit-learn.',
    conceptos: ['funcion-perdida', 'descenso-gradiente', 'tasa-aprendizaje', 'backpropagation'],
  },
  {
    id: 'm17-l4',
    moduloId: 'modulo-17',
    titulo: 'Tu primera red con MLPClassifier',
    objetivo: 'Entrenar una red neuronal con scikit-learn y ver por qué una capa oculta resuelve problemas que un modelo lineal no puede.',
    porQueImporta:
      'Las redes brillan cuando la relación entre variables no es lineal. Con `MLPClassifier` puedes entrenar una red multicapa con la misma interfaz `fit`/`predict` que ya dominas, sin aprender un framework nuevo.',
    concepto: `\`\`\`python
from sklearn.neural_network import MLPClassifier

red = MLPClassifier(hidden_layer_sizes=(8,), activation="tanh",
                    solver="lbfgs", max_iter=2000, random_state=0)
red.fit(X, y)
red.predict(X_nuevo)
\`\`\`

\`MLPClassifier\` (perceptrón multicapa) es la red neuronal de scikit-learn. Parámetros clave:

- **\`hidden_layer_sizes\`**: tupla con las neuronas por capa oculta. \`(8,)\` = una capa de 8; \`(16, 8)\` = dos capas.
- **\`activation\`**: función de activación de las capas ocultas (\`"relu"\` por defecto, \`"tanh"\`, \`"logistic"\`).
- **\`solver\`**: algoritmo de optimización. \`"adam"\` (por defecto) funciona bien con muchos datos; \`"lbfgs"\` converge mejor y más rápido en datasets **pequeños**.
- **\`max_iter\`**: máximo de iteraciones. Si ves \`ConvergenceWarning\`, la red no terminó de converger: aumenta este valor o escala los datos.
- **\`random_state\`**: las redes arrancan con pesos aleatorios; fíjalo para obtener resultados reproducibles.

**El problema XOR** es el ejemplo clásico: la clase es 1 cuando las dos entradas son **distintas**. Ninguna línea recta puede separar las clases, así que un modelo lineal no pasa del 50% de aciertos. Una red con una capa oculta lo resuelve porque la no linealidad le permite combinar fronteras.

Recuerda las reglas de siempre: **escala las variables** antes de entrenar una red (las redes son muy sensibles a la escala) y evalúa con datos de prueba, no con los de entrenamiento.`,
    ejemploMinimo: `from sklearn.neural_network import MLPClassifier

X = [[0, 0], [0, 1], [1, 0], [1, 1]]
y = [0, 1, 1, 0]
red = MLPClassifier(hidden_layer_sizes=(4,), activation="tanh", solver="lbfgs", max_iter=1000, random_state=0).fit(X, y)
print(red.predict(X).tolist())`,
    ejemploAplicado: `from sklearn.linear_model import LogisticRegression
from sklearn.neural_network import MLPClassifier

# XOR: la clase es 1 si las dos entradas son distintas
X = [[0, 0], [0, 1], [1, 0], [1, 1]]
y = [0, 1, 1, 0]

lineal = LogisticRegression().fit(X, y)
red = MLPClassifier(hidden_layer_sizes=(8,), activation="tanh", solver="lbfgs",
                    max_iter=2000, random_state=0).fit(X, y)

print("Accuracy modelo lineal:", lineal.score(X, y))
print("Accuracy red neuronal:", red.score(X, y))`,
    errorFrecuente: {
      codigo: `from sklearn.neural_network import MLPClassifier

red = MLPClassifier(max_iter=50).fit(X_train, y_train)
# ConvergenceWarning: Stochastic Optimizer: Maximum iterations (50) reached
print(red.score(X_test, y_test))   # "la red es mala"`,
      explicacion:
        'El `ConvergenceWarning` indica que el entrenamiento se detuvo antes de converger, no que la red sea inadecuada. Aumenta `max_iter`, escala las variables con `StandardScaler` y, en datasets pequeños, prueba `solver="lbfgs"`. No evalúes ni descartes una red mientras el aviso siga apareciendo.',
    },
    practicaGuiada: {
      id: 'm17-l4-practica',
      enunciado:
        'Entrena una `LogisticRegression` sobre el problema XOR e imprime su accuracy con `.score(X, y)`. Observa que un modelo lineal no puede separar estas clases.',
      codigoInicial: `from sklearn.linear_model import LogisticRegression\n\nX = [[0, 0], [0, 1], [1, 0], [1, 1]]\ny = [0, 1, 1, 0]\nprint(1.0)`,
      solucion: `from sklearn.linear_model import LogisticRegression\n\nX = [[0, 0], [0, 1], [1, 0], [1, 1]]\ny = [0, 1, 1, 0]\nmodelo = LogisticRegression().fit(X, y)\nprint(modelo.score(X, y))`,
      pistas: ['`LogisticRegression().fit(X, y)` y luego `.score(X, y)`.', 'Ninguna línea recta separa el XOR: el resultado es el de adivinar al azar.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '0.5'
        return { ok, mensaje: ok ? 'Correcto: 50% de accuracy, igual que lanzar una moneda.' : 'El resultado esperado es 0.5.' }
      },
    },
    reto: {
      id: 'm17-l4-reto',
      enunciado:
        'Entrena un `MLPClassifier(hidden_layer_sizes=(8,), activation="tanh", solver="lbfgs", max_iter=2000, random_state=0)` sobre XOR e imprime su accuracy con `.score(X, y)`.',
      codigoInicial: `from sklearn.neural_network import MLPClassifier\n\nX = [[0, 0], [0, 1], [1, 0], [1, 1]]\ny = [0, 1, 1, 0]\n# entrena la red e imprime su accuracy`,
      solucion: `from sklearn.neural_network import MLPClassifier\n\nX = [[0, 0], [0, 1], [1, 0], [1, 1]]\ny = [0, 1, 1, 0]\nred = MLPClassifier(hidden_layer_sizes=(8,), activation="tanh", solver="lbfgs", max_iter=2000, random_state=0).fit(X, y)\nprint(red.score(X, y))`,
      pistas: ['Pasa los hiperparámetros exactamente como en el enunciado y llama a `.fit(X, y)`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1.0'
        return { ok, mensaje: ok ? 'Correcto: la capa oculta permite resolver lo que el modelo lineal no pudo.' : 'El resultado esperado es 1.0.' }
      },
    },
    verificacion: [
      {
        id: 'm17-l4-q1',
        pregunta: '¿Por qué un modelo lineal no puede resolver el problema XOR?',
        opciones: [
          'Porque tiene pocos datos',
          'Porque ninguna línea recta separa las dos clases',
          'Porque necesita más columnas',
          'Porque XOR solo funciona con texto',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Las clases del XOR están en esquinas opuestas; separarlas requiere una frontera no lineal.',
      },
      {
        id: 'm17-l4-q2',
        pregunta: 'Al entrenar una red aparece un ConvergenceWarning. ¿Qué haces primero?',
        opciones: [
          'Ignorarlo, la red está bien',
          'Aumentar `max_iter`, escalar las variables o probar otro solver',
          'Borrar la mitad de los datos',
          'Cambiar a una regresión lineal',
        ],
        respuestaCorrecta: 1,
        explicacion: 'El aviso indica que el entrenamiento no terminó. Más iteraciones, datos escalados o un solver adecuado suelen resolverlo.',
      },
    ],
    resumen: [
      '`MLPClassifier` entrena redes multicapa con la API `fit`/`predict` de scikit-learn.',
      '`hidden_layer_sizes` define la arquitectura; `solver="lbfgs"` va bien en datasets pequeños.',
      'Una capa oculta con activación no lineal resuelve problemas como XOR que un modelo lineal no puede.',
      'Escala las variables y vigila los `ConvergenceWarning`.',
    ],
    proximoPaso: 'Cierra el módulo con la arquitectura de una red, el sobreajuste y cuándo conviene (o no) usar redes neuronales.',
    conceptos: ['mlpclassifier', 'xor-no-lineal', 'hiperparametros-red'],
  },
  {
    id: 'm17-l5',
    moduloId: 'modulo-17',
    titulo: 'Arquitectura, sobreajuste y cuándo usar redes neuronales',
    objetivo: 'Leer la arquitectura de una red entrenada (capas, parámetros, curva de pérdida) y conocer cómo controlar el sobreajuste.',
    porQueImporta:
      'Las redes tienen mucha capacidad: pueden memorizar los datos de entrenamiento. Saber contar sus parámetros, vigilar la curva de pérdida y decidir si una red es la herramienta correcta evita proyectos caros que un modelo más simple resolvería mejor.',
    concepto: `\`\`\`python
red = MLPClassifier(hidden_layer_sizes=(5, 3), max_iter=2000, random_state=0).fit(X, y)

red.n_layers_                   # capas totales (entrada + ocultas + salida)
[c.shape for c in red.coefs_]   # forma de la matriz de pesos de cada conexión
red.loss_curve_                 # pérdida en cada iteración (solver adam/sgd)
\`\`\`

**Contar parámetros.** Cada conexión entre capas tiene una matriz de pesos y un vector de sesgos. Con 2 entradas, capas ocultas de 5 y 3 neuronas, y 1 salida:

- Entrada → oculta 1: 2·5 pesos + 5 sesgos = 15
- Oculta 1 → oculta 2: 5·3 pesos + 3 sesgos = 18
- Oculta 2 → salida: 3·1 peso + 1 sesgo = 4
- **Total: 37 parámetros**

Más capas y neuronas = más parámetros = más capacidad, pero también más riesgo de **sobreajuste** (overfitting) y más datos necesarios.

**Cómo controlar el sobreajuste:**
- **Regularización L2** con el parámetro \`alpha\` (más alto = pesos más pequeños y modelo más simple).
- **Early stopping** (\`early_stopping=True\`): separa una parte de entrenamiento como validación y detiene el entrenamiento cuando deja de mejorar.
- Una arquitectura más pequeña, más datos y validación cruzada.

**La curva de pérdida** (\`loss_curve_\`) debe bajar con las iteraciones. Si se queda plana muy arriba, hay que aumentar \`max_iter\`, escalar los datos o ajustar la tasa de aprendizaje.

**¿Cuándo usar una red?** En datos tabulares pequeños o medianos, los modelos lineales y los basados en árboles suelen igualar o superar a una red y son más rápidos y fáciles de explicar. Las redes destacan con datos no estructurados (imágenes, audio, texto) y con grandes volúmenes de datos, normalmente usando frameworks especializados como TensorFlow o PyTorch (que quedan fuera de este navegador, pero con los mismos conceptos que acabas de aprender).`,
    ejemploMinimo: `from sklearn.neural_network import MLPClassifier

X = [[0, 0], [0.5, 0.2], [5, 5], [5.2, 4.8]]
y = [0, 0, 1, 1]
red = MLPClassifier(hidden_layer_sizes=(5, 3), max_iter=2000, random_state=0).fit(X, y)
print(red.n_layers_)`,
    ejemploAplicado: `from sklearn.neural_network import MLPClassifier

X = [[0, 0], [0.5, 0.2], [0.1, 0.4], [0.3, 0.1],
     [5, 5], [5.2, 4.8], [4.9, 5.3], [5.4, 5.1]]
y = [0, 0, 0, 0, 1, 1, 1, 1]

red = MLPClassifier(hidden_layer_sizes=(5, 3), max_iter=2000, random_state=0).fit(X, y)

print("Capas totales:", red.n_layers_)
print("Formas de los pesos:", [c.shape for c in red.coefs_])
print("¿Bajó la pérdida?", red.loss_curve_[0] > red.loss_curve_[-1])`,
    errorFrecuente: {
      codigo: `red = MLPClassifier(hidden_layer_sizes=(200, 200, 200)).fit(X_train, y_train)
print(red.score(X_train, y_train))   # 1.0 -> "¡modelo perfecto!"
# solo hay 150 filas de entrenamiento`,
      explicacion:
        'Una red enorme con muy pocos datos memoriza el entrenamiento (accuracy de 1.0) y generaliza mal. Siempre evalúa con datos de prueba o validación cruzada, empieza con arquitecturas pequeñas y usa regularización (`alpha`) o `early_stopping=True`.',
    },
    practicaGuiada: {
      id: 'm17-l5-practica',
      enunciado:
        'Entrena la red con `hidden_layer_sizes=(5, 3)` e imprime cuántas capas totales tiene con `red.n_layers_` (entrada + ocultas + salida).',
      codigoInicial: `from sklearn.neural_network import MLPClassifier\n\nX = [[0, 0], [0.5, 0.2], [0.1, 0.4], [0.3, 0.1], [5, 5], [5.2, 4.8], [4.9, 5.3], [5.4, 5.1]]\ny = [0, 0, 0, 0, 1, 1, 1, 1]\nprint(0)`,
      solucion: `from sklearn.neural_network import MLPClassifier\n\nX = [[0, 0], [0.5, 0.2], [0.1, 0.4], [0.3, 0.1], [5, 5], [5.2, 4.8], [4.9, 5.3], [5.4, 5.1]]\ny = [0, 0, 0, 0, 1, 1, 1, 1]\nred = MLPClassifier(hidden_layer_sizes=(5, 3), max_iter=2000, random_state=0).fit(X, y)\nprint(red.n_layers_)`,
      pistas: ['Cuenta: 1 capa de entrada + 2 ocultas + 1 de salida.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '4'
        return { ok, mensaje: ok ? 'Correcto: entrada, dos ocultas y salida suman 4 capas.' : 'El resultado esperado es 4.' }
      },
    },
    reto: {
      id: 'm17-l5-reto',
      enunciado:
        'Calcula el número total de parámetros de la red entrenada: la suma de `c.size` para cada matriz en `red.coefs_` más `b.size` para cada vector en `red.intercepts_`. Imprímelo como entero.',
      codigoInicial: `from sklearn.neural_network import MLPClassifier\n\nX = [[0, 0], [0.5, 0.2], [0.1, 0.4], [0.3, 0.1], [5, 5], [5.2, 4.8], [4.9, 5.3], [5.4, 5.1]]\ny = [0, 0, 0, 0, 1, 1, 1, 1]\nred = MLPClassifier(hidden_layer_sizes=(5, 3), max_iter=2000, random_state=0).fit(X, y)\n# suma el tamaño de todos los pesos y sesgos e imprime el total`,
      solucion: `from sklearn.neural_network import MLPClassifier\n\nX = [[0, 0], [0.5, 0.2], [0.1, 0.4], [0.3, 0.1], [5, 5], [5.2, 4.8], [4.9, 5.3], [5.4, 5.1]]\ny = [0, 0, 0, 0, 1, 1, 1, 1]\nred = MLPClassifier(hidden_layer_sizes=(5, 3), max_iter=2000, random_state=0).fit(X, y)\ntotal = sum(c.size for c in red.coefs_) + sum(b.size for b in red.intercepts_)\nprint(int(total))`,
      pistas: ['`red.coefs_` y `red.intercepts_` son listas de arreglos NumPy; `.size` da su número de elementos.', 'Debe coincidir con 15 + 18 + 4.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '37'
        return { ok, mensaje: ok ? 'Correcto: 37 parámetros que la red ajusta durante el entrenamiento.' : 'El resultado esperado es 37.' }
      },
    },
    verificacion: [
      {
        id: 'm17-l5-q1',
        pregunta: 'Una red alcanza 100% de accuracy en entrenamiento pero 70% en prueba. ¿Qué indica?',
        opciones: [
          'Que es un modelo excelente',
          'Sobreajuste: memorizó el entrenamiento y generaliza mal',
          'Que faltan capas',
          'Que los datos están escalados',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Una gran brecha entre entrenamiento y prueba es la señal clásica de overfitting.',
      },
      {
        id: 'm17-l5-q2',
        pregunta: '¿Cuál de estas opciones ayuda a reducir el sobreajuste de una red?',
        opciones: [
          'Aumentar `alpha` (regularización) o usar `early_stopping=True`',
          'Quitar los datos de prueba',
          'Entrenar sin escalar',
          'Usar más neuronas sin más datos',
        ],
        respuestaCorrecta: 0,
        explicacion: 'La regularización L2 y la parada temprana limitan la capacidad efectiva de la red.',
      },
      {
        id: 'm17-l5-q3',
        pregunta: 'Tienes una tabla con 2,000 filas de clientes y 15 columnas. ¿Cuál es un buen primer enfoque?',
        opciones: [
          'Una red profunda con millones de parámetros',
          'Un modelo lineal o de árboles como línea base, y comparar contra una red si hace falta',
          'No modelar',
          'Usar solo clustering',
        ],
        respuestaCorrecta: 1,
        explicacion: 'En datos tabulares pequeños, los modelos simples suelen igualar a las redes y son más fáciles de explicar. Empieza simple.',
      },
    ],
    resumen: [
      'Los parámetros de una red son sus pesos y sesgos: se pueden contar capa por capa.',
      '`n_layers_`, `coefs_`, `intercepts_` y `loss_curve_` permiten inspeccionar una red entrenada.',
      'Controla el sobreajuste con regularización (`alpha`), `early_stopping`, arquitecturas pequeñas y más datos.',
      'En datos tabulares pequeños, empieza con modelos simples; las redes brillan con imágenes, audio, texto y grandes volúmenes.',
    ],
    proximoPaso:
      'Con las redes neuronales cubiertas, en el Módulo 18 integras todo lo aprendido en la Ruta 3 con un proyecto de Ciencia de Datos de principio a fin.',
    conceptos: ['arquitectura-red', 'sobreajuste-redes', 'regularizacion-alpha'],
  },
]
