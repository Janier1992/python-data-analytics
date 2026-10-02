# Python Data & AI Academy

Curso interactivo de Python aplicado a analítica de datos, ciencia de datos y machine learning. Es una mini-aplicación web tipo bootcamp: lecciones, retos de código con ejecución **real** de Python en el navegador (sin backend), quizzes de verificación y un tutor de IA opcional.

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

**Los 22 módulos (0–21) del plan original están disponibles.** Cada módulo tiene su archivo en `src/content/modules/moduleN.ts` con un array de `Lesson`. Los módulos no listados ahí todavía aparecen en el dashboard marcados como "Próximamente" (ver `disponible: false` en `curriculum.ts`).

### Próximos pasos (en orden)

1. Decidir y ejecutar el despliegue (Vercel/Netlify/GitHub Pages — el build es 100% estático).
2. Pulir accesibilidad y revisar bundle size (ver nota de rendimiento abajo).

## Arquitectura

- **React + Vite + TypeScript + Tailwind CSS** — interfaz. Fuente Inter (texto) y JetBrains Mono (código) vía Google Fonts.
- **Pyodide** (Python compilado a WebAssembly, cargado desde CDN `jsdelivr`, versión `v0.26.4` fijada en `src/pyodide/usePyodide.ts`; el script se inyecta bajo demanda, no está en `index.html`, para no bloquear el primer render) — ejecuta el código de los ejercicios directamente en el navegador del usuario. `numpy`, `pandas` y `matplotlib` se cargan siempre; `scipy`, `statsmodels`, `scikit-learn` y `sqlite3` (módulo de la biblioteca estándar que Pyodide no incluye por defecto; lo usa el Módulo 19) se cargan **bajo demanda** (solo si el código del ejercicio los importa — ver `PAQUETES_BAJO_DEMANDA` en `src/pyodide/usePyodide.ts`) para no penalizar lecciones que no los usan.
  - ⚠️ **`seaborn` NO está disponible** como paquete nativo de Pyodide (solo seaborn se puede instalar vía `micropip` desde PyPI, poco confiable para un curso). Las lecciones de visualización usan solo `matplotlib`.
  - No requiere servidor ni corre código del usuario en infraestructura propia: todo el cómputo ocurre en el navegador del estudiante.
  - **Manejo de fallos de carga**: si el CDN no responde (sin internet, bloqueador de contenido, firewall) o la carga tarda más de 3 minutos, cada ejercicio muestra un mensaje claro con botón **Reintentar** (que actualiza todos los ejercicios abiertos) en vez de quedarse cargando. Los paquetes bajo demanda también muestran un error legible si no se pueden descargar.
- **Zustand + localStorage** (`src/state/progressStore.ts`) — guarda el progreso del estudiante (nivel, lecciones completadas, conceptos dominados/débiles, historial de ejercicios, scores de quiz) en el navegador del propio usuario. No hay backend ni base de datos.
- **Tutor IA opcional (BYOK)** (`src/components/AITutorPanel.tsx`, carga diferida con `React.lazy`) — panel de chat que usa `@anthropic-ai/sdk` directamente desde el navegador. Cada usuario pega su propia API key de Anthropic (se guarda solo en su `localStorage`); nunca se envía a ningún servidor propio. Esto permite vender/distribuir la app sin asumir el costo de las llamadas a la IA de cada usuario. El system prompt del tutor está en `src/content/tutorSystemPrompt.ts` (versión condensada del system prompt pedagógico completo que dirigió el diseño del curso).
- **Navegación** (`src/components/Sidebar.tsx`, `src/App.tsx`): sidebar persistente con las 4 rutas / módulos / lecciones, expande automáticamente el módulo de la lección activa, funciona como overlay en móvil. `LessonPage.tsx` tiene breadcrumb y navegación anterior/siguiente que cruza módulos (orden global en `getLeccionesAdyacentes()` de `curriculum.ts`).

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
3. Ejecuta `npm run content:index` y compila (`npx tsc -b`) para detectar errores de tipos antes de probar en el navegador.

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

## Verificación / testing

No hay una suite de tests automatizada permanente en el repo. Durante el desarrollo se usó **Playwright** de forma ad-hoc (instalado temporalmente con `npm install -D playwright`, nunca commiteado como dependencia) para:
- Verificar que el flujo completo (onboarding → dashboard → lección → ejecución de código) funciona sin errores de consola.
- Verificar que los ejercicios de cada módulo nuevo validan correctamente contra la ejecución real en Pyodide (usando `page.keyboard.insertText()` en vez de `.type()` para evitar que el auto-indentado de CodeMirror corrompa el código insertado en las pruebas).
- Capturar screenshots para revisar visualmente cambios de diseño.

Si retomas el proyecto y quieres volver a probar: `npm install -D playwright && npx playwright install chromium`, escribe un script `.mjs` similar a los usados durante el desarrollo (navegar, completar onboarding, ir a `/leccion/:id`, insertar código de prueba en `.cm-content`, click en "Ejecutar código", esperar `text=/✅|⚠️/`), y **recuerda `npm uninstall playwright` antes de hacer commit**.

## Seguridad y privacidad

- El código Python de los ejercicios se ejecuta en el navegador del propio usuario (Pyodide/WebAssembly), nunca en un servidor compartido.
- La API key de Anthropic que cada usuario introduce para el Tutor IA se guarda únicamente en su `localStorage` y se usa solo para llamadas directas de su navegador a la API de Anthropic.

## Git

El repositorio vive en esta carpeta (`curso_python`) y apunta a `https://github.com/Janier1992/python-data-analytics.git`. **Importante**: en la máquina donde se inició este proyecto, `C:\Users\USER` (la carpeta de usuario completa) tiene su *propio* repositorio git no relacionado — nunca ejecutes comandos git para este proyecto desde esa carpeta raíz, siempre desde `curso_python/`.
