import type { Lesson } from '../../types'

// La terminal real no corre dentro del navegador, así que este módulo enseña los comandos con
// explicación + ejercicios que reproducen su lógica en Python (pathlib, shlex, argparse y un
// "mini Git" en memoria). Los conceptos y comandos son los mismos que usarás en tu computador.

// Carpeta temporal con archivos de práctica (equivale a un directorio de trabajo).
const CARPETA = `import tempfile
from pathlib import Path

tmp = tempfile.TemporaryDirectory()
carpeta = Path(tmp.name)
(carpeta / "ventas_enero.csv").write_text("producto,total\\nMouse,30\\nTeclado,90\\n")
(carpeta / "ventas_febrero.csv").write_text("producto,total\\nMonitor,400\\n")
(carpeta / "notas.txt").write_text("recordar revisar precios\\n")
(carpeta / "log.txt").write_text("INFO inicio\\nERROR falta archivo\\nINFO leyendo\\nERROR columna vacia\\nINFO fin\\n")`

// Repositorio Git simplificado, en memoria: muestra cómo se relacionan directorio de trabajo,
// staging, commits y ramas (una rama es solo un puntero a un commit).
const MINIGIT = `import hashlib

class MiniGit:
    def __init__(self):
        self.commits = {}              # id -> {"mensaje", "padre", "archivos"}
        self.ramas = {"main": None}    # nombre de rama -> id del último commit
        self.rama_actual = "main"
        self.trabajo = {}              # directorio de trabajo: archivo -> contenido
        self.staging = {}              # área de preparación (staging)

    def escribir(self, nombre, contenido):
        self.trabajo[nombre] = contenido

    def add(self, nombre):
        self.staging[nombre] = self.trabajo[nombre]

    def commit(self, mensaje):
        if not self.staging:
            raise ValueError("nada que confirmar")
        padre = self.ramas[self.rama_actual]
        archivos = dict(self.commits[padre]["archivos"]) if padre else {}
        archivos.update(self.staging)
        huella = (mensaje + str(padre) + str(sorted(archivos.items()))).encode()
        id_commit = hashlib.sha1(huella).hexdigest()[:7]
        self.commits[id_commit] = {"mensaje": mensaje, "padre": padre, "archivos": archivos}
        self.ramas[self.rama_actual] = id_commit
        self.staging = {}
        return id_commit

    def log(self):
        mensajes, actual = [], self.ramas[self.rama_actual]
        while actual:
            mensajes.append(self.commits[actual]["mensaje"])
            actual = self.commits[actual]["padre"]
        return mensajes

    def branch(self, nombre):
        self.ramas[nombre] = self.ramas[self.rama_actual]

    def checkout(self, nombre):
        self.rama_actual = nombre

    def merge(self, otra):
        # Solo "fast-forward": mueve el puntero de la rama actual al commit de la otra
        self.ramas[self.rama_actual] = self.ramas[otra]`

export const module20Lessons: Lesson[] = [
  {
    id: 'm20-l1',
    moduloId: 'modulo-20',
    titulo: 'La línea de comandos: rutas y navegación',
    objetivo: 'Entender cómo se organiza el sistema de archivos y leer rutas absolutas y relativas (., .. y ~).',
    porQueImporta:
      'Servidores, contenedores, pipelines de datos y herramientas como Git se manejan casi siempre desde la terminal. Moverte con soltura en ella te hace más rápido y te abre puertas que una interfaz gráfica no ofrece.',
    concepto: `La **línea de comandos** (terminal, shell) es una interfaz de texto: escribes una orden y el computador responde. En Linux y macOS suele ser *bash* o *zsh*; en Windows, PowerShell (o WSL para tener Linux). Este módulo usa la sintaxis de Linux/macOS, que es la de la mayoría de servidores.

> Aquí no hay una terminal real dentro del navegador. Verás los comandos explicados y reproducirás su lógica con Python, para que entiendas el concepto y puedas escribirlos después en tu propia terminal.

**Rutas**: la dirección de un archivo o carpeta.

- **Ruta absoluta**: empieza en la raíz \`/\`. Siempre apunta al mismo sitio: \`/home/ana/proyecto/datos/ventas.csv\`.
- **Ruta relativa**: se interpreta desde la carpeta actual: \`datos/ventas.csv\`.
- \`.\` = la carpeta actual · \`..\` = la carpeta padre · \`~\` = tu carpeta personal (\`/home/ana\`).

Comandos de navegación:

\`\`\`bash
$ pwd                   # muestra dónde estás (print working directory)
/home/ana/proyecto
$ ls                    # lista el contenido de la carpeta actual
datos  src  README.md
$ ls -l                 # lista detallada (permisos, tamaño, fecha)
$ cd datos              # entra a la carpeta datos
$ cd ..                 # sube un nivel
$ cd ~                  # va a tu carpeta personal
$ cd -                  # vuelve a la carpeta anterior
\`\`\`

Atajos que ahorran muchísimo tiempo: **Tab** autocompleta nombres, **↑** recupera comandos anteriores y **Ctrl+C** cancela lo que se está ejecutando.

En Python, \`pathlib\` y \`os.path\` manejan rutas de forma portable (\`PurePosixPath\` permite practicar rutas Linux sin tocar el disco).`,
    ejemploMinimo: `from pathlib import PurePosixPath

ruta = PurePosixPath("/home/ana/proyecto/datos/ventas.csv")
print(ruta.name)`,
    ejemploAplicado: `from pathlib import PurePosixPath
import os.path

ruta = PurePosixPath("/home/ana/proyecto/datos/ventas.csv")
print("archivo:", ruta.name)
print("carpeta:", ruta.parent)
print("extensión:", ruta.suffix)
print("sin extensión:", ruta.stem)

# '..' sube un nivel; normpath lo resuelve como lo haría la terminal
print(os.path.normpath("proyecto/datos/../src/main.py"))`,
    errorFrecuente: {
      codigo: `$ cd Mis Documentos
bash: cd: demasiados argumentos

$ cat "datos de ventas.csv"      # con comillas sí funciona`,
      explicacion:
        'En la terminal los **espacios separan argumentos**: `cd Mis Documentos` se interpreta como dos argumentos. Si un nombre tiene espacios, enciérralo entre comillas (`cd "Mis Documentos"`) o escápalo (`Mis\\ Documentos`). Por eso, en proyectos de datos conviene nombrar archivos sin espacios (`ventas_enero.csv`).',
    },
    practicaGuiada: {
      id: 'm20-l1-practica',
      enunciado:
        'Resuelve la ruta `"proyecto/datos/../src/main.py"` con `os.path.normpath(...)` (el `..` sube un nivel) e imprime el resultado.',
      codigoInicial: `import os.path\n\nruta = "proyecto/datos/../src/main.py"\nprint(ruta)`,
      solucion: `import os.path\n\nruta = "proyecto/datos/../src/main.py"\nprint(os.path.normpath(ruta))`,
      pistas: ['`os.path.normpath(ruta)` simplifica los `..` y los `.`.', 'Entrar a `datos` y subir con `..` equivale a no haber entrado.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'proyecto/src/main.py'
        return { ok, mensaje: ok ? 'Correcto: la terminal llegaría al mismo sitio.' : 'El resultado esperado es proyecto/src/main.py.' }
      },
    },
    reto: {
      id: 'm20-l1-reto',
      enunciado:
        'Con `ruta = PurePosixPath("/home/ana/proyecto/datos/ventas.csv")`, imprime en una sola línea: el nombre de la carpeta que lo contiene (`ruta.parent.name`) y la extensión (`ruta.suffix`), separados por espacio con `print(a, b)`.',
      codigoInicial: `from pathlib import PurePosixPath\n\nruta = PurePosixPath("/home/ana/proyecto/datos/ventas.csv")\n# imprime la carpeta contenedora y la extensión en una sola línea`,
      solucion: `from pathlib import PurePosixPath\n\nruta = PurePosixPath("/home/ana/proyecto/datos/ventas.csv")\nprint(ruta.parent.name, ruta.suffix)`,
      pistas: ['`ruta.parent` es la carpeta que contiene el archivo; `.name` da su nombre.', '`ruta.suffix` devuelve la extensión con el punto.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'datos .csv'
        return { ok, mensaje: ok ? 'Correcto: el archivo está en la carpeta "datos" y es un CSV.' : 'El resultado esperado es "datos .csv".' }
      },
    },
    verificacion: [
      {
        id: 'm20-l1-q1',
        pregunta: 'Estás en /home/ana/proyecto/datos. ¿Qué hace `cd ../..`?',
        opciones: [
          'Se queda en la misma carpeta',
          'Sube dos niveles: llega a /home/ana',
          'Entra a una carpeta llamada ..',
          'Va a la raíz /',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Cada `..` sube un nivel: de datos a proyecto y de proyecto a /home/ana.',
      },
      {
        id: 'm20-l1-q2',
        pregunta: '¿Qué diferencia hay entre una ruta absoluta y una relativa?',
        opciones: [
          'La absoluta empieza en la raíz `/`; la relativa se interpreta desde la carpeta actual',
          'La relativa siempre es más larga',
          'La absoluta solo sirve en Windows',
          'No hay diferencia',
        ],
        respuestaCorrecta: 0,
        explicacion: 'La ruta absoluta apunta siempre al mismo sitio; la relativa depende de dónde te encuentres.',
      },
    ],
    resumen: [
      'La terminal es una interfaz de texto: escribes órdenes y obtienes respuestas.',
      'Ruta absoluta (desde `/`) vs relativa (desde la carpeta actual); `.` actual, `..` padre, `~` tu carpeta personal.',
      '`pwd`, `ls` y `cd` son los comandos básicos de navegación.',
      'Los espacios separan argumentos: usa comillas o evita espacios en nombres.',
    ],
    proximoPaso: 'Ahora crearemos, copiaremos y buscaremos dentro de archivos desde la terminal.',
    conceptos: ['linea-de-comandos', 'rutas', 'navegacion-terminal'],
  },
  {
    id: 'm20-l2',
    moduloId: 'modulo-20',
    titulo: 'Archivos y texto: mkdir, cp, mv, rm, cat, grep y wc',
    objetivo: 'Conocer los comandos para crear, copiar, mover y borrar archivos, y para buscar y contar dentro de ellos.',
    porQueImporta:
      'Revisar un log de 2 millones de líneas, contar registros o renombrar cientos de archivos es cuestión de segundos con la terminal. Son tareas cotidianas en ingeniería y análisis de datos.',
    concepto: `**Gestionar archivos y carpetas**

\`\`\`bash
$ mkdir datos              # crea una carpeta
$ mkdir -p a/b/c           # crea también las carpetas intermedias
$ touch notas.txt          # crea un archivo vacío (o actualiza su fecha)
$ cp ventas.csv copia.csv  # copia
$ mv copia.csv backup/     # mueve (o renombra: mv viejo.csv nuevo.csv)
$ rm notas.txt             # borra un archivo (¡sin papelera!)
$ rm -r carpeta            # borra una carpeta y todo su contenido
\`\`\`

⚠️ **\`rm\` no tiene "deshacer"**: lo borrado no va a ninguna papelera. Revisa dos veces antes de usar \`rm -r\` (y nunca ejecutes comandos de internet sin entenderlos).

**Comodines (globs)**: \`*\` coincide con cualquier texto y \`?\` con un carácter. \`ls *.csv\` lista todos los CSV; \`cp ventas_*.csv backup/\` copia los que empiezan por "ventas_".

**Leer y buscar en texto**

\`\`\`bash
$ cat notas.txt            # imprime el archivo completo
$ head -n 5 ventas.csv     # primeras 5 líneas (tail: las últimas)
$ wc -l ventas.csv         # cuenta líneas
$ grep "ERROR" log.txt     # líneas que contienen ERROR
$ grep -c "ERROR" log.txt  # cuántas líneas contienen ERROR
$ grep -i "error" log.txt  # sin distinguir mayúsculas
\`\`\`

**Pipes (\`|\`)**: conectan la salida de un comando con la entrada del siguiente. Es la idea más poderosa de la terminal: piezas pequeñas que se combinan.

\`\`\`bash
$ grep "ERROR" log.txt | wc -l        # cuántos errores hay
$ cat ventas.csv | head -n 3          # solo las 3 primeras líneas
$ grep "ERROR" log.txt > errores.txt  # redirige la salida a un archivo (> sobrescribe, >> añade)
\`\`\`

En Python puedes hacer lo mismo con \`pathlib\` (\`glob\`, \`read_text\`, \`write_text\`) y \`shutil\` (\`copy\`, \`move\`, \`rmtree\`).`,
    ejemploMinimo: `${CARPETA}

print(sorted(p.name for p in carpeta.iterdir()))`,
    ejemploAplicado: `${CARPETA}

# ls *.csv
print("CSV:", sorted(p.name for p in carpeta.glob("*.csv")))

# wc -l ventas_enero.csv
lineas = (carpeta / "ventas_enero.csv").read_text().splitlines()
print("Líneas en enero:", len(lineas))

# cat notas.txt
print("Notas:", (carpeta / "notas.txt").read_text().strip())`,
    errorFrecuente: {
      codigo: `$ rm -r datos/ *      # un espacio de más...
# borra "datos/" Y todo lo que hay en la carpeta actual`,
      explicacion:
        'Un solo espacio cambia el significado: `rm -r datos/ *` son dos objetivos (la carpeta `datos/` y `*`, todo lo de la carpeta actual). Con `rm` conviene escribir la ruta completa, usar `ls` primero para ver qué coincide con el patrón, y considerar `rm -i` (pide confirmación). No hay papelera.',
    },
    practicaGuiada: {
      id: 'm20-l2-practica',
      enunciado:
        'Reproduce `ls *.csv`: imprime la lista ordenada de nombres de los archivos CSV de `carpeta` con `sorted(p.name for p in carpeta.glob("*.csv"))`.',
      codigoInicial: `${CARPETA}\n\nprint([])`,
      solucion: `${CARPETA}\n\nprint(sorted(p.name for p in carpeta.glob("*.csv")))`,
      pistas: ['`carpeta.glob("*.csv")` equivale al comodín `*.csv`.', 'Cada elemento es un `Path`; su `.name` es el nombre del archivo.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "['ventas_enero.csv', 'ventas_febrero.csv']"
        return { ok, mensaje: ok ? 'Correcto: el comodín *.csv encuentra los dos archivos de ventas.' : "El resultado esperado es ['ventas_enero.csv', 'ventas_febrero.csv']." }
      },
    },
    reto: {
      id: 'm20-l2-reto',
      enunciado:
        'Reproduce `grep -c "ERROR" log.txt`: lee `log.txt`, recorre sus líneas e imprime cuántas contienen el texto `"ERROR"`.',
      codigoInicial: `${CARPETA}\n\nlineas = (carpeta / "log.txt").read_text().splitlines()\n# cuenta e imprime las líneas que contienen "ERROR"`,
      solucion: `${CARPETA}\n\nlineas = (carpeta / "log.txt").read_text().splitlines()\nprint(sum(1 for linea in lineas if "ERROR" in linea))`,
      pistas: ['`"ERROR" in linea` es `True` si la línea contiene el texto.', '`sum(1 for ... if ...)` cuenta cuántas cumplen.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '2'
        return { ok, mensaje: ok ? 'Correcto: el log tiene 2 líneas de error.' : 'El resultado esperado es 2.' }
      },
    },
    verificacion: [
      {
        id: 'm20-l2-q1',
        pregunta: '¿Qué hace `grep "ERROR" log.txt | wc -l`?',
        opciones: [
          'Borra las líneas con ERROR',
          'Cuenta cuántas líneas de log.txt contienen ERROR',
          'Copia log.txt a wc',
          'Muestra el archivo completo',
        ],
        respuestaCorrecta: 1,
        explicacion: 'grep filtra las líneas con ERROR y el pipe (|) las pasa a `wc -l`, que cuenta líneas.',
      },
      {
        id: 'm20-l2-q2',
        pregunta: '¿Por qué hay que tener especial cuidado con `rm -r`?',
        opciones: [
          'Porque es muy lento',
          'Porque borra carpetas completas sin papelera ni opción de deshacer',
          'Porque solo funciona con archivos de texto',
          'Porque requiere internet',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Lo borrado desde la terminal no pasa por una papelera y normalmente no se puede recuperar.',
      },
    ],
    resumen: [
      '`mkdir`, `touch`, `cp`, `mv` y `rm` gestionan archivos y carpetas; `rm` no tiene deshacer.',
      'Los comodines (`*`, `?`) seleccionan varios archivos a la vez.',
      '`cat`, `head`, `tail`, `wc -l` y `grep` leen, cuentan y buscan en texto.',
      'El pipe `|` conecta comandos y `>` / `>>` redirigen la salida a archivos.',
    ],
    proximoPaso: 'Veamos cómo se estructura un comando (argumentos y flags) y cómo hacer tus propios scripts con argumentos.',
    conceptos: ['comandos-archivos', 'grep-wc', 'pipes-redireccion'],
  },
  {
    id: 'm20-l3',
    moduloId: 'modulo-20',
    titulo: 'Anatomía de un comando y scripts con argumentos',
    objetivo: 'Reconocer comando, argumentos y flags, y construir scripts de Python que reciben argumentos con argparse.',
    porQueImporta:
      'Un script que solo funciona editando el código no se puede automatizar. Con argumentos, el mismo script procesa cualquier archivo desde la terminal, un cron o un pipeline. Es el puente entre un notebook y una herramienta reutilizable.',
    concepto: `**Anatomía de un comando**:

\`\`\`bash
$ python analisis.py --archivo ventas.csv --top 5 -v
  │        │            │                       └─ flag corto (sin valor): modo detallado
  │        │            └─ opciones con valor (--nombre valor)
  │        └─ el script: es el primer argumento de python
  └─ el programa que se ejecuta
\`\`\`

El shell divide la línea en una **lista de palabras** (respetando comillas) y se la entrega al programa. En Python, \`shlex.split\` hace lo mismo que el shell:

\`\`\`python
import shlex
shlex.split('git commit -m "primer commit"')
# ['git', 'commit', '-m', 'primer commit']
\`\`\`

**argparse** es la biblioteca estándar para definir los argumentos de tus scripts:

\`\`\`python
import argparse

parser = argparse.ArgumentParser(description="Resume un CSV de ventas")
parser.add_argument("--archivo", required=True, help="ruta del CSV")
parser.add_argument("--top", type=int, default=3, help="cuántos productos mostrar")
parser.add_argument("-v", "--detalle", action="store_true", help="modo detallado")

args = parser.parse_args()          # lee sys.argv (lo que escribió el usuario)
print(args.archivo, args.top)
\`\`\`

Con eso, \`python analisis.py --archivo ventas.csv --top 5\` funciona, \`python analisis.py --help\` genera la ayuda automáticamente, y si falta un argumento obligatorio argparse muestra un error claro.

Otros conceptos:
- **Variables de entorno**: configuración fuera del código (\`os.environ.get("API_KEY")\`). Se definen con \`export API_KEY=abc\`. Es el lugar correcto para secretos: **nunca** los escribas en el código.
- **Código de salida**: 0 significa "todo bien"; distinto de 0, error. Los pipelines lo usan para saber si un paso falló.`,
    ejemploMinimo: `import shlex

print(shlex.split('git commit -m "primer commit"'))`,
    ejemploAplicado: `import argparse

parser = argparse.ArgumentParser(description="Resume un CSV de ventas")
parser.add_argument("--archivo", required=True)
parser.add_argument("--top", type=int, default=3)
parser.add_argument("-v", "--detalle", action="store_true")

# En un script real: args = parser.parse_args()
# Aquí simulamos lo que escribiría el usuario:
args = parser.parse_args(["--archivo", "ventas.csv", "--top", "5", "-v"])

print("archivo:", args.archivo)
print("top:", args.top, "| tipo:", type(args.top).__name__)
print("detalle:", args.detalle)`,
    errorFrecuente: {
      codigo: `parser.add_argument("--top", default=3)
args = parser.parse_args(["--top", "5"])
print(args.top + 1)    # TypeError: can only concatenate str (not "int") to str`,
      explicacion:
        'Todo lo que llega desde la terminal es **texto**. Sin `type=int`, `args.top` vale `"5"` (un string). Declara siempre el tipo en `add_argument` (`type=int`, `type=float`) para que argparse convierta y valide el valor.',
    },
    practicaGuiada: {
      id: 'm20-l3-practica',
      enunciado:
        'Usa `shlex.split` para dividir el comando en sus palabras y luego imprime cuántas hay con `len(...)`. Recuerda que lo que va entre comillas cuenta como una sola.',
      codigoInicial: `import shlex\n\ncomando = 'git commit -m "primer commit"'\nprint(0)`,
      solucion: `import shlex\n\ncomando = 'git commit -m "primer commit"'\npartes = shlex.split(comando)\nprint(len(partes))`,
      pistas: ['`shlex.split(comando)` devuelve la lista de argumentos como la vería un programa.', 'Son: git, commit, -m y "primer commit".'],
      validar: (stdout) => {
        const ok = stdout.trim() === '4'
        return { ok, mensaje: ok ? 'Correcto: el texto entre comillas es un solo argumento.' : 'El resultado esperado es 4.' }
      },
    },
    reto: {
      id: 'm20-l3-reto',
      enunciado:
        'Define un parser con `--archivo` (obligatorio) y `--top` (entero, por defecto 3). Analiza la lista `["--archivo", "ventas.csv"]` (sin `--top`) e imprime en una línea `args.archivo` y `args.top` separados por espacio.',
      codigoInicial: `import argparse\n\nparser = argparse.ArgumentParser()\n# define --archivo (obligatorio) y --top (int, default 3)\n# analiza ["--archivo", "ventas.csv"] e imprime archivo y top`,
      solucion: `import argparse\n\nparser = argparse.ArgumentParser()\nparser.add_argument("--archivo", required=True)\nparser.add_argument("--top", type=int, default=3)\nargs = parser.parse_args(["--archivo", "ventas.csv"])\nprint(args.archivo, args.top)`,
      pistas: ['`parser.add_argument("--top", type=int, default=3)`', '`parser.parse_args([...])` recibe la lista de argumentos.'],
      validar: (stdout) => {
        const ok = stdout.trim() === 'ventas.csv 3'
        return { ok, mensaje: ok ? 'Correcto: al no pasar --top se usa el valor por defecto.' : 'El resultado esperado es "ventas.csv 3".' }
      },
    },
    verificacion: [
      {
        id: 'm20-l3-q1',
        pregunta: '¿Dónde conviene guardar una clave de API (secreto) que usa tu script?',
        opciones: [
          'Escrita directamente en el código',
          'En una variable de entorno o en un archivo de configuración fuera del repositorio',
          'En un comentario',
          'En el nombre del archivo',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Los secretos no deben vivir en el código ni en Git; se leen del entorno (`os.environ`) o de archivos ignorados.',
      },
      {
        id: 'm20-l3-q2',
        pregunta: '¿Por qué se declara `type=int` en un argumento numérico de argparse?',
        opciones: [
          'Porque argparse no acepta texto',
          'Porque los argumentos llegan como texto y así se convierten y validan',
          'Para que el script sea más rápido',
          'No es necesario nunca',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Todo lo escrito en la terminal es texto; `type=int` convierte el valor y falla con un mensaje claro si no es un entero.',
      },
    ],
    resumen: [
      'Un comando = programa + argumentos + flags; el shell los entrega como lista de palabras.',
      '`shlex.split` reproduce cómo el shell divide una línea (respeta las comillas).',
      '`argparse` convierte un script en una herramienta de línea de comandos con ayuda automática.',
      'Declara `type=` en los argumentos y guarda los secretos en variables de entorno.',
    ],
    proximoPaso: 'Con la terminal bajo control, pasamos a Git: el sistema para versionar tu trabajo.',
    conceptos: ['argumentos-flags', 'argparse', 'variables-entorno'],
  },
  {
    id: 'm20-l4',
    moduloId: 'modulo-20',
    titulo: 'Git: commits y el modelo mental',
    objetivo: 'Entender las tres áreas de Git (directorio de trabajo, staging y repositorio) y el ciclo add → commit.',
    porQueImporta:
      'Git es el estándar para versionar código y notebooks: guarda el historial, permite volver atrás si algo se rompe y es la base para trabajar en equipo (GitHub, GitLab). Casi toda oferta de empleo de datos lo da por sabido.',
    concepto: `**Git** guarda "fotografías" (commits) de tu proyecto a lo largo del tiempo. Para usarlo bien necesitas un modelo mental de **tres áreas**:

1. **Directorio de trabajo**: los archivos tal como los editas ahora.
2. **Staging** (área de preparación): los cambios que has marcado para incluir en el próximo commit (\`git add\`).
3. **Repositorio**: el historial de commits ya guardados (\`git commit\`).

\`\`\`bash
$ git init                         # convierte la carpeta en un repositorio
$ git status                       # ¿qué cambió? ¿qué está preparado?
$ git add analisis.py              # prepara un archivo (git add . = todo)
$ git commit -m "Agrega limpieza de datos"   # guarda la fotografía
$ git log --oneline                # historial resumido
$ git diff                         # qué cambió desde el último commit
\`\`\`

Un **commit** contiene el estado de los archivos, un mensaje, el autor, la fecha y una referencia a su commit **padre**: así forman una cadena. Cada commit tiene un identificador único (un hash como \`a1b2c3d\`).

**Buenos mensajes de commit**: cortos, en imperativo y descriptivos ("Corrige cálculo del ticket promedio", no "cambios" ni "arreglos varios"). Commits pequeños y con un propósito claro son más fáciles de revisar y de deshacer.

Para que lo veas funcionar sin instalar nada, el ejercicio usa una clase \`MiniGit\` que reproduce estas áreas en memoria (no es Git real, pero sí el mismo modelo):

\`\`\`python
${MINIGIT}
\`\`\`

Antes de tu primer commit real, configura quién eres: \`git config --global user.name "Tu Nombre"\` y \`git config --global user.email "tu@correo.com"\`.`,
    ejemploMinimo: `${MINIGIT}

repo = MiniGit()
repo.escribir("analisis.py", "print('hola')")
print(repo.staging)`,
    ejemploAplicado: `${MINIGIT}

repo = MiniGit()
repo.escribir("analisis.py", "print('v1')")

repo.add("analisis.py")                 # git add
id1 = repo.commit("Primer commit")      # git commit

repo.escribir("analisis.py", "print('v2')")   # editar NO crea un commit
repo.add("analisis.py")
repo.commit("Actualiza el analisis")

print("Historial:", repo.log())          # git log
print("Commits guardados:", len(repo.commits))`,
    errorFrecuente: {
      codigo: `$ git commit -m "Agrega limpieza"
On branch main
nothing added to commit but untracked files present (use "git add" to track)

# Editaste analisis.py pero olvidaste prepararlo con git add`,
      explicacion:
        '`git commit` solo guarda lo que está en **staging**. Editar un archivo no basta: hay que prepararlo con `git add` antes. Usa `git status` para ver qué cambios están preparados y cuáles no. (`git commit -am "..."` prepara y confirma archivos ya rastreados en un solo paso, pero no incluye archivos nuevos.)',
    },
    practicaGuiada: {
      id: 'm20-l4-practica',
      enunciado:
        'Con el repositorio `repo`, escribe el archivo `"analisis.py"`, prepáralo con `repo.add(...)` y guárdalo con `repo.commit("Primer commit")`. Imprime cuántos commits hay con `len(repo.commits)`.',
      codigoInicial: `${MINIGIT}\n\nrepo = MiniGit()\nrepo.escribir("analisis.py", "print('hola')")\n# prepara y confirma el archivo\nprint(len(repo.commits))`,
      solucion: `${MINIGIT}\n\nrepo = MiniGit()\nrepo.escribir("analisis.py", "print('hola')")\nrepo.add("analisis.py")\nrepo.commit("Primer commit")\nprint(len(repo.commits))`,
      pistas: ['El ciclo es: `repo.add("analisis.py")` y luego `repo.commit("Primer commit")`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === '1'
        return { ok, mensaje: ok ? 'Correcto: tras add + commit, el repositorio tiene su primer commit.' : 'El resultado esperado es 1.' }
      },
    },
    reto: {
      id: 'm20-l4-reto',
      enunciado:
        'Haz dos commits: primero `"Primer commit"` con `analisis.py`, y después `"Agrega calculo"` con `calculo.py` (cada uno con su `escribir`, `add` y `commit`). Imprime `repo.log()`: el historial va del más reciente al más antiguo.',
      codigoInicial: `${MINIGIT}\n\nrepo = MiniGit()\n# haz los dos commits e imprime el historial con repo.log()`,
      solucion: `${MINIGIT}\n\nrepo = MiniGit()\nrepo.escribir("analisis.py", "print('hola')")\nrepo.add("analisis.py")\nrepo.commit("Primer commit")\nrepo.escribir("calculo.py", "total = 1 + 2")\nrepo.add("calculo.py")\nrepo.commit("Agrega calculo")\nprint(repo.log())`,
      pistas: ['Repite el ciclo escribir → add → commit dos veces, con archivos y mensajes distintos.', '`repo.log()` devuelve los mensajes de más nuevo a más antiguo.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "['Agrega calculo', 'Primer commit']"
        return { ok, mensaje: ok ? 'Correcto: cada commit apunta a su padre y forma una cadena.' : "El resultado esperado es ['Agrega calculo', 'Primer commit']." }
      },
    },
    verificacion: [
      {
        id: 'm20-l4-q1',
        pregunta: 'Editaste un archivo y ejecutaste `git commit` sin `git add`. ¿Qué pasa?',
        opciones: [
          'Se guardan todos los cambios automáticamente',
          'No se guarda ese cambio: el commit solo incluye lo que está en staging',
          'Git borra el archivo',
          'Se crea una rama nueva',
        ],
        respuestaCorrecta: 1,
        explicacion: 'El commit toma lo que hay en el área de staging; sin `git add`, el cambio queda solo en el directorio de trabajo.',
      },
      {
        id: 'm20-l4-q2',
        pregunta: '¿Cuál es el mejor mensaje de commit?',
        opciones: ['cambios', 'arreglos varios', 'Corrige el cálculo del ticket promedio', 'asdf'],
        respuestaCorrecta: 2,
        explicacion: 'Un buen mensaje es corto, en imperativo y explica qué hace el cambio, para que el historial sea legible.',
      },
    ],
    resumen: [
      'Git tiene tres áreas: directorio de trabajo, staging y repositorio.',
      '`git add` prepara cambios; `git commit` los guarda como una fotografía con mensaje.',
      'Cada commit apunta a su padre, formando el historial que muestra `git log`.',
      'Usa `git status` con frecuencia y escribe mensajes claros.',
    ],
    proximoPaso: 'Ahora veremos ramas, fusiones, .gitignore y el flujo de trabajo con GitHub.',
    conceptos: ['git-commits', 'staging', 'modelo-mental-git'],
  },
  {
    id: 'm20-l5',
    moduloId: 'modulo-20',
    titulo: 'Ramas, .gitignore y trabajo con GitHub',
    objetivo: 'Usar ramas para trabajar de forma aislada, excluir archivos con .gitignore y conocer el flujo de trabajo con GitHub.',
    porQueImporta:
      'Las ramas te dejan probar ideas sin romper la versión estable, y GitHub es donde se colabora y se muestra tu portafolio. Saber excluir datos sensibles y archivos pesados del repositorio evita errores serios, como publicar una clave secreta.',
    concepto: `**Ramas (branches)**: una rama es una línea independiente de desarrollo. Técnicamente es solo un **puntero** a un commit; por eso crear una es instantáneo y barato.

\`\`\`bash
$ git branch                      # lista las ramas
$ git switch -c nueva-limpieza    # crea una rama y cambia a ella
$ git switch main                 # vuelve a main
$ git merge nueva-limpieza        # incorpora los cambios de la rama a main
\`\`\`

Flujo típico: **main** guarda la versión estable. Para cada tarea creas una rama, haces tus commits allí y, cuando funciona, la **fusionas** (merge) a main. Si main no cambió mientras trabajabas, la fusión es un **fast-forward**: Git solo mueve el puntero de main hacia adelante. Si ambas ramas cambiaron, Git crea un commit de fusión y puede pedirte resolver **conflictos** (editar a mano las líneas que chocan).

**.gitignore**: lista de archivos y patrones que Git debe ignorar:

\`\`\`
*.pyc
__pycache__/
.env              # variables y claves secretas
datos_privados.csv
.ipynb_checkpoints/
\`\`\`

Qué NO subir a un repositorio: **claves y contraseñas** (si se suben, considéralas comprometidas aunque las borres después: queda en el historial), **datos sensibles o personales**, archivos pesados o generados (modelos entrenados, \`__pycache__\`, entornos virtuales como \`venv/\`).

**GitHub** aloja repositorios remotos y facilita colaborar:

\`\`\`bash
$ git clone https://github.com/usuario/proyecto.git   # copia un repositorio remoto
$ git remote -v                                       # muestra el remoto configurado
$ git push origin mi-rama                             # sube tus commits
$ git pull                                            # trae y fusiona cambios del remoto
\`\`\`

Flujo de colaboración: haces una rama → subes (\`push\`) → abres un **Pull Request** (PR) → alguien lo revisa → se fusiona a main. Un buen perfil de GitHub, con proyectos de datos y README claros, es parte de tu portafolio profesional.

El ejercicio usa la clase \`MiniGit\` de la lección anterior, que también modela las ramas como punteros:

\`\`\`python
repo.branch("limpieza")      # crea el puntero (mismo commit que la rama actual)
repo.checkout("limpieza")    # cambia de rama
repo.merge("limpieza")       # fast-forward: mueve main al commit de limpieza
\`\`\``,
    ejemploMinimo: `from fnmatch import fnmatch

patrones = ["*.pyc", ".env"]
print(any(fnmatch("config.pyc", p) for p in patrones))`,
    ejemploAplicado: `${MINIGIT}

repo = MiniGit()
repo.escribir("analisis.py", "v1")
repo.add("analisis.py")
repo.commit("Primer commit")

repo.branch("limpieza")           # git branch limpieza
repo.checkout("limpieza")         # git switch limpieza
repo.escribir("limpieza.py", "df.dropna()")
repo.add("limpieza.py")
repo.commit("Agrega limpieza")

print("En limpieza:", repo.log())
repo.checkout("main")
print("En main:    ", repo.log())  # main no se ve afectada

repo.merge("limpieza")             # git merge limpieza
print("Tras merge: ", repo.log())`,
    errorFrecuente: {
      codigo: `# Subiste credenciales por error
$ git add .
$ git commit -m "Agrega config"
$ git push
# config.env contenía API_KEY=sk-123456...

$ git rm config.env && git commit -m "Quita config" && git push
# "ya está borrado"... pero la clave sigue en el historial`,
      explicacion:
        'Borrar un archivo en un commit nuevo **no lo elimina del historial**: cualquiera puede recuperar la clave de commits anteriores. Si subes un secreto, **revócalo y genera uno nuevo de inmediato**. Para evitarlo, agrega `.env` y similares al `.gitignore` **antes** del primer commit y revisa `git status` antes de `git add .`.',
    },
    practicaGuiada: {
      id: 'm20-l5-practica',
      enunciado:
        'Un `.gitignore` tiene los patrones de `patrones`. Reproduce qué archivos se ignorarían: imprime la lista ordenada de los nombres de `archivos` que coincidan con al menos un patrón, usando `fnmatch(nombre, patron)`.',
      codigoInicial: `from fnmatch import fnmatch\n\npatrones = ["*.pyc", ".env", "datos_privados.csv"]\narchivos = ["analisis.py", "analisis.pyc", ".env", "ventas.csv", "datos_privados.csv", "README.md"]\nprint([])`,
      solucion: `from fnmatch import fnmatch\n\npatrones = ["*.pyc", ".env", "datos_privados.csv"]\narchivos = ["analisis.py", "analisis.pyc", ".env", "ventas.csv", "datos_privados.csv", "README.md"]\nignorados = [a for a in archivos if any(fnmatch(a, p) for p in patrones)]\nprint(sorted(ignorados))`,
      pistas: ['`any(fnmatch(a, p) for p in patrones)` es True si el archivo coincide con algún patrón.', 'Filtra `archivos` con una lista por comprensión y ordénala con `sorted`.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "['.env', 'analisis.pyc', 'datos_privados.csv']"
        return { ok, mensaje: ok ? 'Correcto: esos tres archivos no entrarían al repositorio.' : "El resultado esperado es ['.env', 'analisis.pyc', 'datos_privados.csv']." }
      },
    },
    reto: {
      id: 'm20-l5-reto',
      enunciado:
        'Reproduce el flujo de ramas: tras el primer commit en `main`, crea la rama `"limpieza"` y cámbiate a ella, haz un commit `"Agrega limpieza"` (con `limpieza.py`), vuelve a `main` y fusiona con `repo.merge("limpieza")`. Imprime `repo.log()` en main tras la fusión.',
      codigoInicial: `${MINIGIT}\n\nrepo = MiniGit()\nrepo.escribir("analisis.py", "v1")\nrepo.add("analisis.py")\nrepo.commit("Primer commit")\n# crea la rama limpieza, haz un commit en ella, vuelve a main y fusiona\n# imprime repo.log()`,
      solucion: `${MINIGIT}\n\nrepo = MiniGit()\nrepo.escribir("analisis.py", "v1")\nrepo.add("analisis.py")\nrepo.commit("Primer commit")\nrepo.branch("limpieza")\nrepo.checkout("limpieza")\nrepo.escribir("limpieza.py", "df.dropna()")\nrepo.add("limpieza.py")\nrepo.commit("Agrega limpieza")\nrepo.checkout("main")\nrepo.merge("limpieza")\nprint(repo.log())`,
      pistas: ['Orden: `branch` → `checkout("limpieza")` → escribir/add/commit → `checkout("main")` → `merge("limpieza")`.', 'Tras el merge (fast-forward), main apunta al mismo commit que limpieza.'],
      validar: (stdout) => {
        const ok = stdout.trim() === "['Agrega limpieza', 'Primer commit']"
        return { ok, mensaje: ok ? 'Correcto: main avanzó hasta el commit de la rama (fast-forward).' : "El resultado esperado es ['Agrega limpieza', 'Primer commit']." }
      },
    },
    verificacion: [
      {
        id: 'm20-l5-q1',
        pregunta: '¿Qué es técnicamente una rama en Git?',
        opciones: [
          'Una copia completa de todos los archivos',
          'Un puntero ligero a un commit',
          'Un archivo de configuración',
          'Un servidor remoto',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Crear una rama solo crea un puntero a un commit, por eso es rápido y barato.',
      },
      {
        id: 'm20-l5-q2',
        pregunta: 'Subiste una clave de API por error a GitHub y luego borraste el archivo en otro commit. ¿Qué debes hacer?',
        opciones: [
          'Nada, ya está borrada',
          'Revocar la clave de inmediato y generar una nueva: sigue en el historial de commits',
          'Cambiar el nombre del repositorio',
          'Esperar a que GitHub la elimine',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Lo subido permanece en el historial; la única solución segura es invalidar la clave comprometida.',
      },
      {
        id: 'm20-l5-q3',
        pregunta: '¿En qué orden suele darse un flujo de colaboración con GitHub?',
        opciones: [
          'Pull Request → rama → push → merge',
          'Rama → commits → push → Pull Request → revisión → merge',
          'Merge → rama → commit',
          'Push directo a main sin revisión siempre',
        ],
        respuestaCorrecta: 1,
        explicacion: 'Se trabaja en una rama, se sube, se abre un PR, se revisa y finalmente se fusiona a main.',
      },
    ],
    resumen: [
      'Una rama es un puntero a un commit; permite trabajar sin tocar la versión estable.',
      '`git merge` incorpora una rama; si main no cambió, es un fast-forward.',
      '`.gitignore` excluye secretos, datos sensibles y archivos generados — antes del primer commit.',
      'GitHub: clone, push, pull y Pull Requests para colaborar y mostrar tu portafolio.',
    ],
    proximoPaso:
      'Cierras la Ruta 4 en el Módulo 21: herramientas de BI (dashboards y comunicación de resultados) y la preparación profesional para buscar empleo.',
    conceptos: ['ramas-git', 'gitignore', 'github-flujo', 'seguridad-secretos'],
  },
]
