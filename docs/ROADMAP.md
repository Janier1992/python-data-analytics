# AI Academy — Hoja de ruta de la plataforma

Documento de planificación. Describe hacia dónde pasa AI Academy: de un único
curso a una **plataforma de cursos** con cuentas en servidor, rutas de estudio
y certificados verificables. No describe código ya escrito, salvo la sección 2.

## 1. Visión

Una plataforma donde el estudiante se registra, elige una ruta (analítica de
datos, ciencia de datos, Power BI…), avanza por cursos en un orden profesional
y recibe un certificado verificable **por cada curso** y **por cada ruta**
que completa.

## 2. Punto de partida: lo que ya existe

Un solo curso de 22 módulos (0–21), 96 lecciones, 192 ejercicios, 147 preguntas
de quiz y una guía de referencia, todo ejecutado en el navegador con Pyodide.
Las pruebas automáticas ejecutan cada lección (576 ejecuciones de Python).

Auditoría de módulos y a qué curso pertenecería cada uno:

| Módulos | Contenido | Curso destino |
|---|---|---|
| 0–5 | Python: sintaxis, control de flujo, estructuras, funciones, archivos, buenas prácticas | **Python para Datos** |
| 6–9 | NumPy, pandas, limpieza, groupby, matplotlib | **Python para Datos** |
| 10 | Estadística descriptiva, outliers, correlación, distribuciones, intro a pruebas de hipótesis | Semilla de **Estadística** (se queda también en Python como aplicación) |
| 11 | Proyecto de analista | **Python para Datos** (proyecto final) |
| 12–14 | Train/test, regresión, evaluación, feature engineering, clasificación, validación cruzada | **Machine Learning** |
| 15–17 | Clustering, PCA, series temporales, NLP básico, redes neuronales | **Machine Learning** |
| 18 | Proyecto de ciencia de datos | **Machine Learning** (proyecto final) |
| 19 | SQL: SELECT, agregaciones, JOIN, CASE/CTE, SQL desde Python | **SQL** (a ampliar) |
| 20 | Línea de comandos y Git/GitHub | **Herramientas del analista** |
| 21 | KPIs, diseño de dashboards, storytelling, portafolio, entrevistas | **Comunicación y negocio** (a ampliar) |

Lo que **no** existe todavía: estadística inferencial completa, probabilidad,
Excel, Power BI, SQL avanzado, IA aplicada, cuentas en servidor y certificados
verificables.

## 3. Catálogo propuesto y orden de estudio

Python deja de ser el primer curso. El orden va de lo conceptual a lo técnico:

| # | Curso | Contenido principal | Estado |
|---|---|---|---|
| 1 | Estadística descriptiva | Tipos de datos, media/mediana/moda, dispersión, cuartiles, outliers, gráficos | **Publicado** (módulos 22–25, 19 lecciones) |
| 2 | Probabilidad y distribuciones | Probabilidad, Bayes, normal, binomial, Poisson, teorema central del límite | **Publicado** (módulos 26–29, 19 lecciones) |
| 3 | Estadística inferencial | Muestreo, intervalos de confianza, pruebas de hipótesis, A/B testing, regresión | **Publicado** (módulos 30–33, 19 lecciones) |
| 4 | Excel para análisis de datos | Fórmulas, condiciones, búsquedas, limpieza | **Publicado** (módulos 34–37, 19 lecciones) |
| 5 | SQL | Consultas, JOIN, agregaciones, CTE, funciones de ventana, subconsultas, escritura de datos, índices | **Publicado** (módulo 19 + ampliación 38–42, 23 lecciones) |
| 6 | Python para Datos | Programación, NumPy, pandas, limpieza, EDA | Existe (módulos 0–9, 11) |
| 7 | Visualización y Power BI | Modelado, DAX, tableros | Nuevo |
| 8 | Comunicación y negocio | KPIs, storytelling, portafolio, entrevistas | Parcial (módulo 21) |
| 9 | Machine Learning | Modelos, evaluación, clustering, series, NLP, redes | Existe (módulos 12–18) |
| 10 | Herramientas del analista | Terminal, Git, GitHub, notebooks | Existe (módulo 20) |
| 11 | IA aplicada | Modelos de lenguaje, automatización, uso responsable | Nuevo |
| 12 | Proyecto final de portafolio | Caso completo con datos reales, evaluado | Nuevo |

Rutas (agrupaciones de cursos):
- **Analista de Datos:** 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 12
- **Ciencia de Datos:** 1 → 2 → 3 → 5 → 6 → 9 → 10 → 11 → 12

Decisión de diseño: los cursos de estadística (1–3) serán conceptuales, con
simuladores interactivos. Usarán el mismo motor de ejecución con código
precargado, de modo que el estudiante no necesite saber Python para empezar.

Nota sobre SQL Server: el navegador ejecuta SQLite, no T-SQL. Se enseñará SQL
estándar y se añadirá un módulo de T-SQL solo si se dispone de un entorno
real de práctica.

Nota sobre Power BI: no corre en un navegador. Se enseña con lecciones,
conjuntos de datos descargables y entregables que el estudiante sube (`.pbix`
o capturas), evaluados con rúbrica.

## 4. Arquitectura objetivo

- **Frontend:** el actual (React + Vite), rediseñado con catálogo, panel del
  estudiante y páginas de curso. Se sirve desde Vercel.
- **Backend administrado (recomendado: Supabase):** Postgres, autenticación
  por correo y Google, permisos por fila y almacenamiento de archivos.
  Alternativa con más control y más trabajo: FastAPI + Postgres.
- **Modelo de datos mínimo:** `usuarios`, `rutas`, `cursos`, `lecciones`,
  `inscripciones`, `progreso`, `certificados`, `entregas`.
- **Contenido:** separado del código de la interfaz, con un formato común para
  todos los cursos para que se pueda añadir uno nuevo sin tocar la plataforma.

## 5. Certificados

- Uno por curso y otro por ruta completa.
- Código único y página pública de verificación (nombre, curso, fecha, horas),
  sin exponer datos sensibles.
- Para que tengan valor, el criterio de emisión incluye un proyecto evaluado,
  no solo lecciones completadas.
- Opcional: formato Open Badges para publicarlo en LinkedIn.

## 6. Datos personales

- Pedir solo lo necesario: nombre completo, correo y país.
- Aviso de privacidad y consentimiento explícito al registrarse.
- El estudiante puede ver, corregir, descargar y borrar su cuenta.
- Contraseñas gestionadas por el proveedor de autenticación, conexión cifrada
  y permisos por fila.
- Revisión legal antes del lanzamiento (Ley 1581 de 2012 en Colombia, GDPR si
  hay estudiantes europeos).

## 7. Fases de trabajo

| Fase | Objetivo | Resultado |
|---|---|---|
| 0 | Definir rutas, público y reglas de certificación | Documento de producto |
| 1 | Cuentas y progreso en servidor | Avance sincronizado entre dispositivos |
| 2 | Catálogo y rutas; Python publicado como curso | La plataforma deja de ser un solo curso |
| 3 | Certificados verificables | Licencias comprobables |
| 4 | Curso de Estadística (1–3) | Primer curso nuevo |
| 5 | SQL ampliado y Excel | Cursos 4 y 5 |
| 6 | Power BI | Curso 7, con entregas y rúbricas |
| 7 | ML, herramientas, IA aplicada y proyecto final | Catálogo completo |
| 8 | Operación: administración, métricas, respaldos | Mantenible sin tocar código |

## 8. Cómo se crea cada curso nuevo

1. Ficha: público, requisitos previos, objetivos medibles y horas estimadas.
2. Temario: módulos, lecciones y una evaluación por módulo.
3. Contenido: lecciones, ejercicios o simulaciones y quizzes.
4. Proyecto del curso: entregable que respalda el certificado.
5. Pruebas automáticas de todos los ejercicios.
6. Publicación en el catálogo con su certificado.

## 9. Decisiones pendientes

- Rutas del lanzamiento y orden definitivo del catálogo.
- Plataforma gratuita o de pago (si hay pagos: pasarela y facturación).
- Quién escribe el contenido de Power BI y quién evalúa los proyectos.
- País de operación para el cumplimiento legal.
- Backend administrado (Supabase) o propio.

## 10. Avance

- **Curso 1 · Estadística descriptiva:** publicado dentro de la aplicación actual como una ruta propia (módulos 22–25: datos y tendencia central, variabilidad y posición, forma y relaciones, proyecto integrador). Aparece primero en el temario. Aún no emite certificado propio: el certificado «AI Academy» sigue contando solo las 96 lecciones del curso de Python y datos (las rutas tienen un indicador `certifica` en `curriculum.ts`).
- **Curso 2 · Probabilidad y distribuciones:** publicado como ruta propia (módulos 26–29: fundamentos de probabilidad y Bayes, variables aleatorias discretas, distribuciones continuas y teorema central del límite, y un proyecto integrador de calidad, capacidad y plazos). Usa `scipy.stats`, que se carga bajo demanda en el navegador. Tampoco emite certificado propio todavía.
- **Curso 3 · Estadística inferencial:** publicado como ruta propia (módulos 30–33: muestreo e intervalos de confianza, pruebas de hipótesis incluido A/B testing y chi-cuadrado, regresión, ANOVA y tamaño del efecto, y un proyecto de análisis de un A/B test). Usa `scipy.stats` y `statsmodels`, que se cargan bajo demanda. Tampoco emite certificado propio todavía.
- **Curso 4 · Excel para análisis de datos:** publicado (módulos 34–37: fórmulas esenciales, condiciones y búsquedas, limpieza y análisis, y un proyecto de tienda). Incluye un **motor de fórmulas propio** (`src/excel/`, ~80 funciones con nombres en español e inglés, referencias relativas/absolutas, errores de Excel) que corrige los ejercicios en el navegador, también al copiar la fórmula hacia abajo. Límites honestos: las tablas dinámicas y los gráficos se explican como concepto y se reproducen con fórmulas (no se pueden practicar aquí); los ejercicios evitan decimales para no depender de la configuración regional; BUSCARX requiere Excel 2021 o Microsoft 365. Tampoco emite certificado propio todavía.
- **Curso 5 · SQL ampliado:** el curso SQL pasa de 5 a 23 lecciones con cinco módulos nuevos (38–42): consultas con más precisión (NULL, texto, fechas, agregación condicional), combinar tablas y subconsultas (anti-join, CROSS/SELF JOIN, UNION/INTERSECT/EXCEPT, EXISTS), CTE y funciones de ventana (recursivas, rankings, LAG/LEAD, acumulados, medias móviles), modificar datos (transacciones, upsert), vistas e índices, una lección sobre qué cambia entre SQLite, PostgreSQL, SQL Server y MySQL, y un proyecto integrador con KPIs, rankings y segmentación RFM. Las lecciones nuevas **no cuentan** para el certificado «AI Academy» (indicador `certifica: false` por módulo). Límites honestos: se practica con SQLite (no T-SQL ni PL/pgSQL); `ROLLUP`, `PIVOT`, `QUALIFY`, `MERGE` y los percentiles no existen en SQLite y se enseñan como equivalencias con `UNION ALL`, `CASE`, CTE y `ON CONFLICT`; la base de práctica es pequeña (10 pedidos), por lo que sirve para comprobar la técnica y no para sacar conclusiones de negocio.
- **Siguiente:** Visualización y Power BI, o IA aplicada.
- **Rediseño de la interfaz por cursos:** el panel «Mi ruta de aprendizaje» ahora muestra una tarjeta por curso (paso de la ruta, nivel, módulos, lecciones, horas estimadas y progreso), con los cursos aún sin contenido como «Próximamente». Cada curso tiene su propia página (`/cursos/:id`) con lo que se aprenderá, requisitos, módulos numerados dentro del curso y el siguiente curso de la ruta. La barra lateral lista los cursos y despliega solo el que se está estudiando. Los cursos se definen en `src/content/curriculum.ts` (`cursos`); cada módulo declara su `cursoId`.
- **Auditoría de vigencia (octubre de 2026):** se ejecutaron las 153 lecciones (918 ejecuciones de Python) y los 233 ejemplos de la guía con las versiones más recientes de las bibliotecas (pandas 3.0, NumPy 2.4, SciPy 1.17, scikit-learn 1.9, statsmodels 0.15, matplotlib 3.11) además de las que ejecuta la plataforma (Pyodide 0.26.4: pandas 2.2, NumPy 1.26). Todas las lecciones funcionan en ambos entornos. En la guía se corrigió `plt.boxplot(labels=...)` (ya no funciona en matplotlib reciente) y se documentó que algunas salidas cambian de formato en pandas 3 y NumPy 2 (`str` en lugar de `object`, `np.float64(...)`). **Pendiente:** la plataforma sigue en Pyodide 0.26.4; la versión estable más reciente es la 314 (Python 3.14). Actualizarla requiere probarla en un navegador real, algo que no se pudo hacer desde el entorno de desarrollo.
- **Rutas sugeridas por objetivo:** el panel ofrece tres secuencias de cursos (analista de datos, científico de datos y empezar por la programación), definidas en `rutasPorObjetivo` (`curriculum.ts`).
