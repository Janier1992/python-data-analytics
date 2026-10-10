# AI Academy

**AI Academy** — programa *Python para Datos e Inteligencia Artificial*: curso interactivo de Python aplicado a analítica de datos, ciencia de datos y machine learning. Es una aplicación web tipo bootcamp: lecciones, retos de código con ejecución **real** de Python en el navegador (sin backend), quizzes de verificación, **cuentas con inicio de sesión**, una **guía de referencia** de funciones y sentencias (Python y SQL), un **certificado de finalización** y un tutor de IA opcional.

> **Este README se mantiene actualizado como bitácora del proyecto** para poder retomar el trabajo desde cualquier máquina con contexto completo. Si vuelves a este proyecto, empieza leyendo la sección "Estado actual" y "Próximos pasos".

## Estado actual (última actualización: ver último commit)

### Rutas y módulos

El curso se organiza en 4 **rutas** (`src/content/curriculum.ts`), siguiendo una metodología inspirada en bootcamps profesionales de datos (ver sección "Referencia metodológica" abajo): primero todo el paquete de Python (fundamentos → analista de datos → ciencia de datos/ML), y al final las herramientas complementarias (SQL, Git, BI).

| Ruta | Módulos | Estado |
|---|---|---|
| **1. Fundamentos de Python** | 0–5 | ✅ Completo (6 módulos, ~23 lecciones) |
| **2. Analista de Datos con Python** | 6–11 | ✅ Completo (6 módulos: NumPy/pandas, limpieza, agregación, visualización, EDA+estadística, proyecto integrador) |
| **3. Ciencia de Datos y Machine Learning** | 12–18 | ✅ Completo (7 módulos: ML fundamentos, feature engineering, supervisado, no supervisado, series temporales + NLP, redes neuronales y proyecto integrador de abandono de clientes) |
| **4. Herramientas complementarias** | 19–21 | ✅ Completo (SQL con SQLite, línea de comandos y Git con ejercicios que reproducen su lógica en Python, y BI + portafolio + entrevistas) |

**Hay 34 módulos disponibles (0–33): los 22 del curso de Python y datos (0–21), los del Curso 1 de Estadística descriptiva (22–25), los del Curso 2 de Probabilidad y distribuciones (26–29) y los del Curso 3 de Estadística inferencial (30–33).** Los módulos se agrupan en **cursos independientes** (definidos en `src/content/curriculum.ts`, con su paso en la ruta, nivel y requisitos), que el estudiante ve como tarjetas. Los tres cursos de estadística (22–33) **no usan Python**: son lecciones de tipo `calculo` (`src/calculo/`, `src/components/calculo/`) con ejemplos resueltos, gráficos SVG, ejercicios numéricos corregidos en el navegador y una calculadora con el motor de fórmulas de Excel y funciones de distribución (`src/excel/distribuciones.ts`). Cada módulo tiene su archivo en `src/content/modules/moduleN.ts` con un array de `Lesson`. Los módulos no listados ahí todavía aparecen en el dashboard marcados como "Próximamente" (ver `disponible: false` en `curriculum.ts`).

### Próximos pasos (en orden)

1. Decidir y ejecutar el despliegue (Vercel/Netlify/GitHub Pages — el build es 100% estático).
2. Pulir accesibilidad y revisar bundle size (ver nota de rendimiento abajo).

## Funciones para el estudiante

| Función | Dónde | Qué hace |
|---|---|---|
| **Cuentas** | `/ingresar` | Crear cuenta (nombre completo, correo, contraseña) e iniciar sesión. Cada estudiante tiene su propio progreso. |
| **Mi ruta** | `/curso` | Panel con saludo, "continuar donde quedaste", estadísticas (lecciones, módulos, racha y tiempo de estudio) y estado de cada módulo. |
| **Lecciones** | `/leccion/:id` | Contenido, ejemplos, ejercicios con Python real (Ctrl+Enter para ejecutar), verificación, índice lateral y "consulta rápida" con las funciones de la lección. |
| **Guía de referencia** | `/referencia` | 264 entradas en 8 colecciones (Python, NumPy, pandas, matplotlib, estadística, scikit-learn, SQL, Terminal y Git): qué hace cada función o sentencia, sintaxis, parámetros, ejemplo **editable y ejecutable**, notas y lecciones relacionadas. Búsqueda sin tildes, filtros por lenguaje y enlaces directos. |
| **Búsqueda global** | `Ctrl/⌘ + K` | Lecciones, entradas de la guía y páginas, con navegación por teclado. |
| **Certificados** | `/certificados`, `/certificados/:curso` y `/certificado` | Un **certificado de finalización por curso** (se emite al completar todas sus lecciones; los de Excel, Power BI, IA aplicada y Proyecto final llevan una aclaración sobre lo que la plataforma evalúa y lo que no) y el certificado del programa «AI Academy» original (96 lecciones). Incluyen el nombre completo, fechas, duración, tiempo de estudio activo y un código de constancia, y se descargan como PDF (A4 horizontal) desde el cuadro de impresión. Son constancias de participación: no son títulos oficiales y el código no se verifica en ningún servidor. |

### Cuentas, progreso y certificado: cómo funcionan (y sus límites)

- **No hay servidor.** Las cuentas viven en `localStorage` del navegador (`src/state/accountStore.ts`); la contraseña se guarda con **PBKDF2-SHA-256** (210 000 iteraciones y sal aleatoria, `src/lib/auth.ts`), nunca en claro. Sirve para tener **un perfil y un progreso por persona en cada dispositivo**, pero no es seguridad frente a alguien con acceso al navegador: no hay recuperación de contraseña ni sincronización entre dispositivos. Si se necesita eso (o que el certificado sea verificable), hay que añadir un backend de autenticación (p. ej. Supabase/Firebase).
- El progreso se guarda por cuenta en `ai-academy-progreso:<id>` (`src/state/progressStore.ts`). Al crear la primera cuenta se **importa el progreso de la versión anterior sin cuentas** (`pyacademy-progress`), una sola vez.
- **Duración del programa** = desde que el estudiante inició (`inicioEn`, primer ingreso) hasta que completó la última lección (`completadoEn`). **Tiempo de estudio activo** = suma de ventanas de 10 s con la pestaña visible y actividad en los últimos 2 minutos (`src/hooks/useTiempoActivo.ts`). Reiniciar el progreso reinicia ambos.
- El certificado es una **constancia de participación**: no es un título ni una credencial oficial, y su código (`AIA-XXXX-XXXX-XXXX`, SHA-256 de los datos) identifica el documento pero **no se verifica en ningún servidor**.
- La marca (`AI Academy`) y el nombre del programa están en `src/brand.ts`.

### Accesibilidad y experiencia de usuario

- Verificado con **axe-core (WCAG 2.0/2.1 A y AA): 0 violaciones** en ingreso, diagnóstico, panel, lección, guía (general y con entrada abierta), certificado y búsqueda global. Incluye contraste en el editor de código (tema propio en `src/components/CodeEditor.tsx`).
- Enlace "Saltar al contenido", foco visible en todos los controles, diálogos con trampa de foco y Escape, formularios con etiquetas y errores anunciados, `aria-current`, `role="progressbar"`, quiz con semántica de radio y respeto a `prefers-reduced-motion`.
- Diseño responsive (sin desbordamiento horizontal a 390 px en las páginas principales), página 404 y estados de carga/error con "Reintentar".
- Aún **no hay tema claro** (la interfaz es oscura) ni sincronización entre dispositivos.

## Arquitectura

- **React + Vite + TypeScript + Tailwind CSS** — interfaz. Fuente Inter (texto) y JetBrains Mono (código) vía Google Fonts.
- **Pyodide** (Python compilado a WebAssembly, cargado desde CDN `jsdelivr`, versión `v0.26.4` fijada en `src/pyodide/usePyodide.ts`; el script se inyecta bajo demanda, no está en `index.html`, para no bloquear el primer render) — ejecuta el código de los ejercicios directamente en el navegador del usuario. `numpy`, `pandas` y `matplotlib` se cargan siempre; `scipy`, `statsmodels`, `scikit-learn` y `sqlite3` (módulo de la biblioteca estándar que Pyodide no incluye por defecto; lo usa el Módulo 19) se cargan **bajo demanda** (solo si el código del ejercicio los importa — ver `PAQUETES_BAJO_DEMANDA` en `src/pyodide/usePyodide.ts`) para no penalizar lecciones que no los usan.
  - ⚠️ **`seaborn` NO está disponible** como paquete nativo de Pyodide (solo seaborn se puede instalar vía `micropip` desde PyPI, poco confiable para un curso). Las lecciones de visualización usan solo `matplotlib`.
  - No requiere servidor ni corre código del usuario en infraestructura propia: todo el cómputo ocurre en el navegador del estudiante.
  - **Manejo de fallos de carga**: si el CDN no responde (sin internet, bloqueador de contenido, firewall) o la carga tarda más de 3 minutos, cada ejercicio muestra un mensaje claro con botón **Reintentar** (que actualiza todos los ejercicios abiertos) en vez de quedarse cargando. Los paquetes bajo demanda también muestran un error legible si no se pueden descargar.
- **Zustand + localStorage** (`src/state/accountStore.ts` y `src/state/progressStore.ts`) — cuentas locales y progreso **por cuenta** (nivel, lecciones completadas, conceptos dominados/débiles, historial de ejercicios, puntajes de quiz, fechas de inicio y finalización, tiempo y días de estudio). No hay backend ni base de datos; ver "Cuentas, progreso y certificado" arriba.
- **Tutor IA opcional (BYOK)** (`src/components/AITutorPanel.tsx`, carga diferida con `React.lazy`) — panel de chat que usa `@anthropic-ai/sdk` directamente desde el navegador. Cada usuario pega su propia API key de Anthropic (se guarda solo en su `localStorage`); nunca se envía a ningún servidor propio. Esto permite vender/distribuir la app sin asumir el costo de las llamadas a la IA de cada usuario. El system prompt del tutor está en `src/content/tutorSystemPrompt.ts` (versión condensada del system prompt pedagógico completo que dirigió el diseño del curso).
- **Navegación** (`src/components/Layout.tsx`, `Sidebar.tsx`, `src/App.tsx`): el marco de la app es una *ruta de diseño* que se mantiene montada al navegar; barra lateral con "Mi ruta", "Guía de referencia", "Mi certificado" y las 4 rutas / módulos / lecciones (overlay en móvil). `LessonPage.tsx` tiene breadcrumb, índice lateral y navegación anterior/siguiente que cruza módulos (`getLeccionesAdyacentes()` en `curriculum.ts`).
- **Guía de referencia** (`src/content/reference/*.ts`, `src/components/referencia/`): cada colección es un archivo con entradas tipadas (`tipos.ts`) y un chunk propio que se descarga bajo demanda. La búsqueda (`src/lib/busqueda.ts`) ignora tildes y exige todas las palabras. Los ejemplos de SQL se ejecutan sobre la base de práctica de `src/content/sqlPractica.ts` (la misma del Módulo 19).

### Nota de rendimiento

El contenido se carga **bajo demanda** (code-splitting), así que la carga inicial es pequeña:

| Qué se descarga | Cuándo | Tamaño (gzip) |
|---|---|---|
| App + `vendor-react` | Al abrir la app (dashboard) | ~195 KB (~63 KB) |
| `LessonPage`, `vendor-markdown`, `vendor-editor` (CodeMirror) | Al abrir la primera lección | ~600 KB (~200 KB), se cachean aparte |
| `moduleN` (contenido de un módulo) | Al abrir una lección de ese módulo | 8–34 KB (3–11 KB) cada uno |
| Tutor IA (`@anthropic-ai/sdk`) | Solo si el estudiante lo abre | ~52 KB (~15 KB) |

Antes del code-splitting, todo iba en un único bundle de ~1 MB (~320 KB gzip). Cómo funciona:

- `src/content/generated.ts` (**generado**, no editar) contiene el índice ligero de lecciones (`id`, `moduloId`, `titulo`) para Sidebar/Dashboard y un `import()` dinámico por módulo. Lo produce `scripts/generate-lesson-index.mjs`, que se ejecuta solo en `npm run dev` y `npm run build`.
- `src/content/lessonLoader.ts` descarga y cachea el módulo cuando se abre una lección; `LessonPage` muestra "Cargando lección…" y permite reintentar si falla la red.
- `vite.config.ts` agrupa las dependencias pesadas en chunks propios (`vendor-react`, `vendor-markdown`, `vendor-editor`).
- `npm run content:check` falla si `generated.ts` quedó desactualizado.

## Referencia metodológica (carpeta `docs/`)

`docs/DA_ESP.pdf` y `docs/DS Syllabus.pdf` son los syllabus públicos de los bootcamps **Data Analyst** y **Data Scientist** de TripleTen, usados **únicamente como referencia de estructura pedagógica** (qué temas, en qué orden, con qué progresión de sprints/proyectos) para diseñar las Rutas 2, 3 y 4 de este curso. **Todo el contenido de las lecciones (texto, ejemplos, ejercicios, explicaciones) es propio y original** — no se copió texto, diseño ni material de TripleTen. La adaptación clave: TripleTen mezcla Excel/SQL/Python desde el inicio; aquí se decidió completar **todo el paquete de Python primero** (Rutas 1-3) y dejar SQL/herramientas como paquete separado al final (Ruta 4).

## Cómo se estructura cada lección

Cada lección (`src/types.ts`, tipo `Lesson`) sigue una plantilla pedagógica de 11 partes: `objetivo`, `porQueImporta`, `concepto` (markdown), `ejemploMinimo`, `ejemploAplicado`, `errorFrecuente`, `practicaGuiada` (ejercicio con validación automática), `reto` (ejercicio sin tanto andamiaje), `verificacion` (quiz), `resumen`, `proximoPaso`, y `conceptos` (tags para tracking de dominio).

Cada ejercicio (`Exercise`) tiene una función `validar(stdout) => {ok, mensaje}` que recibe el **stdout real** capturado de ejecutar el código del estudiante en Pyodide — ahí vive la lógica de corrección. Evita validar reprs completos de DataFrame (frágiles); mejor pide imprimir valores escalares, listas o booleanos concretos.

## Cómo añadir un módulo/lección nueva

1. Crea `src/content/modules/moduleN.ts` exportando `export const moduleNLessons: Lesson[] = [...]`.
2. En `src/content/curriculum.ts`, en la entrada correspondiente de `curriculum` cambia `disponible: false, lessonIds: []` por `disponible: true, lessonIds: idsDe('modulo-N')`. **No hace falta importar el módulo**: `npm run content:index` (que corren `dev` y `build`) lo detecta, lo agrega al índice y crea su carga diferida.
3. Ejecuta `npm run content:index`, compila (`npx tsc -b`) y prueba tus ejercicios con `npm run test:exercises -- N` (ver "Pruebas automáticas") antes de probar en el navegador.

## Pruebas automáticas

```bash
pip install -r tests/requirements.txt   # Python con las versiones de Pyodide 0.26.4 (usa un venv)
npm test                                # unitarias + guía de referencia + ejercicios (~4 min)
npm run test:unit                       # solo la lógica de la app (segundos)
npm run test:reference                  # solo la guía de referencia (~20 s)
npm run test:exercises -- 14 19         # solo los módulos 14 y 19 (--strict: las advertencias de Python también fallan)
PYTHON=/ruta/a/python npm test          # elegir el intérprete
```

Tres capas, todas en `npm test` y en el CI (`.github/workflows/ci.yml`, que además corre `content:check` y el build):

1. **Unitarias** (`scripts/test-unit.mjs`, ejecutor `node --test` sobre `src/**/*.test.ts`): cuentas y contraseñas (`auth`), búsqueda (`busqueda`), certificado y duraciones (`certificado`), racha y estados de módulo (`progreso`).
2. **Guía de referencia** (`scripts/test-reference.mjs`): valida la estructura de las 264 entradas (ids únicos, relaciones y lecciones que existen, resumen de una línea) y **ejecuta con Python real los 233 ejemplos** de Python y SQL (SQL sobre sqlite3); si una entrada declara `salida`, debe coincidir con la real. Los ejemplos de terminal/Git no se ejecutan. Falla ante `FutureWarning`/`DeprecationWarning` para no enseñar API obsoleta.
3. **Ejercicios del curso** (`scripts/test-exercises.mjs`): para cada lección comprueba estructura, que los ejemplos se ejecutan, que la `solucion` de la práctica y del reto **pasa su `validar`** y que el `codigoInicial` **no** lo pasa. Al crearse detectó 8 errores en módulos anteriores.

⚠️ Las pruebas no ejecutan Pyodide: usan CPython con las mismas versiones de numpy, pandas, scikit-learn, scipy y statsmodels, pero matplotlib puede diferir (3.5.2 en Pyodide, ≥3.7 en las pruebas) y los gráficos se validan por estructura, no por imagen.

Al añadir entradas a la guía de referencia: crea la entrada en `src/content/reference/<coleccion>.ts` con un `ejemplo` autocontenido y ejecuta `npm run test:reference`; para fijar la `salida`, ejecútalo y copia el resultado real.

### Cuidado con `$` dentro de template literals multilínea

Varias lecciones usan f-strings de Python con `$` (ej. `f"Total: ${valor:,.0f}"`). Como el contenido vive en template literals de TypeScript (backticks), **cualquier `${...}` sin escapar se interpreta como interpolación de JavaScript** y rompe la compilación (o peor, silenciosamente evalúa algo inesperado). Siempre escribe `\${...}` cuando el `$` deba ser literal dentro de un template literal multilínea. En strings de una sola línea con comillas simples (`'...'`) no aplica este problema.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre la URL que indique Vite (por defecto `http://localhost:5173`, puede cambiar si el puerto está ocupado).

## Build de producción

```bash
npm run build
npm run preview
```

El resultado de `npm run build` es un sitio 100% estático (carpeta `dist/`): se puede desplegar en Vercel, Netlify, GitHub Pages o cualquier hosting estático, sin necesidad de servidor backend. **Esto todavía no se ha hecho** — es uno de los próximos pasos. Para Vercel ya existe `vercel.json` (build `npm run build`, salida `dist`, y *rewrite* de todas las rutas a `index.html` porque la app usa `BrowserRouter`; sin eso, abrir o recargar una URL como `/leccion/...` devuelve `404 NOT_FOUND`).

## Verificación en el navegador

Las pruebas automáticas cubren la lógica y el contenido, no la interfaz. Los flujos de la interfaz (registro, inicio y cierre de sesión, importación de progreso, diagnóstico, panel, búsqueda con Ctrl+K, guía de referencia, lección con quiz, certificado y su PDF, vista móvil) y la auditoría de accesibilidad con **axe-core** se verificaron con **Playwright** de forma ad-hoc (no está en el repo como dependencia). Para repetirlo: `npm install -D playwright && npx playwright install chromium`, levanta `npm run build && npm run preview` y escribe un script que navegue por esas rutas; `page.pdf()` sirve para comprobar el PDF del certificado. Pyodide no se carga desde el CDN en entornos sin acceso a internet: allí se sustituye `window.loadPyodide` por un doble de prueba.

## Seguridad y privacidad

- El código Python de los ejercicios se ejecuta en el navegador del propio usuario (Pyodide/WebAssembly), nunca en un servidor compartido.
- Las contraseñas de las cuentas locales se guardan con PBKDF2-SHA-256 + sal; el mensaje de error de inicio de sesión no distingue entre correo inexistente y contraseña incorrecta. Aun así, todo vive en el navegador (ver límites arriba).
- La API key de Anthropic que cada usuario introduce para el Tutor IA se guarda únicamente en su `localStorage` y se usa solo para llamadas directas de su navegador a la API de Anthropic.

## Git

El repositorio vive en esta carpeta (`curso_python`) y apunta a `https://github.com/Janier1992/python-data-analytics.git`. **Importante**: en la máquina donde se inició este proyecto, `C:\Users\USER` (la carpeta de usuario completa) tiene su *propio* repositorio git no relacionado — nunca ejecutes comandos git para este proyecto desde esa carpeta raíz, siempre desde `curso_python/`.
