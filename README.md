# Python Data & AI Academy

Curso interactivo de Python aplicado a analítica de datos, ciencia de datos, machine learning y deep learning. Funciona como una mini-aplicación web: lecciones, retos de código con ejecución real de Python **en el navegador** (sin backend), quizzes de verificación y un tutor de IA opcional.

## Arquitectura

- **React + Vite + TypeScript + Tailwind CSS** — interfaz.
- **Pyodide** (Python compilado a WebAssembly, cargado desde CDN) — ejecuta el código de los ejercicios directamente en el navegador del usuario, con `numpy`, `pandas` y `matplotlib` precargados. No requiere servidor ni corre código del usuario en tu infraestructura.
- **Zustand + localStorage** — guarda el progreso del estudiante (nivel, lecciones completadas, conceptos dominados/débiles, historial de ejercicios) en el navegador del propio usuario.
- **Tutor IA opcional (BYOK)** — panel de chat que usa la API de Anthropic directamente desde el navegador. Cada usuario pega su propia API key (se guarda solo en su `localStorage`); nunca se envía a ningún servidor propio. Esto permite vender/distribuir la app sin asumir el costo de las llamadas a la IA de cada usuario.

## Contenido del curso

El mapa completo del curso (`src/content/curriculum.ts`) refleja los 15 módulos del temario (Módulo 0 a Módulo 15: fundamentos → Python para datos → EDA → estadística → ML supervisado/no supervisado → deep learning → proyectos integradores).

En esta primera entrega están completamente desarrollados:

- **Módulo 0 — Orientación** (`src/content/modules/module0.ts`)
- **Módulo 1 — Fundamentos absolutos** (`src/content/modules/module1.ts`)

Los módulos 2 a 15 aparecen en el dashboard como "Próximamente": la estructura de datos (`ModuleMeta`, `Lesson`) ya soporta agregarlos siguiendo el mismo patrón.

### Cómo se estructura cada lección

Cada lección en `src/types.ts` (`Lesson`) sigue la plantilla pedagógica de 11 partes: objetivo, por qué importa, concepto, ejemplo mínimo, ejemplo aplicado a datos, error frecuente, práctica guiada (ejercicio con validación automática), reto, verificación (quiz), resumen y próximo paso.

## Cómo añadir una lección nueva

1. Añade un objeto `Lesson` al array del módulo correspondiente en `src/content/modules/moduloN.ts` (crea el archivo si el módulo aún no existe).
2. Registra sus `lessonIds` y marca `disponible: true` en `src/content/curriculum.ts`.
3. Importa el array de lecciones del módulo y agrégalo a `todasLasLecciones`.

La función `validar` de cada ejercicio recibe el `stdout` capturado de la ejecución real en Pyodide; ahí defines la lógica de corrección automática.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre la URL que indique Vite (por defecto `http://localhost:5173`).

## Build de producción

```bash
npm run build
npm run preview
```

El resultado de `npm run build` es un sitio 100% estático (carpeta `dist/`): se puede desplegar en Vercel, Netlify, GitHub Pages o cualquier hosting estático, sin necesidad de servidor backend.

## Seguridad y privacidad

- El código Python de los ejercicios se ejecuta en el navegador del propio usuario (Pyodide/WebAssembly), nunca en un servidor compartido.
- La API key de Anthropic que cada usuario introduce para el Tutor IA se guarda únicamente en su `localStorage` y se usa solo para llamadas directas de su navegador a la API de Anthropic.
