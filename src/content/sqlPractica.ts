// Base de datos de práctica en memoria (clientes, productos y pedidos) y el código Python que la
// usa. Lo comparten el Módulo 19 (SQL) y la guía de referencia, para que los ejemplos coincidan.

export const SQL_SETUP = `import sqlite3

conn = sqlite3.connect(":memory:")
conn.executescript("""
CREATE TABLE clientes (id INTEGER PRIMARY KEY, nombre TEXT, ciudad TEXT, plan TEXT);
CREATE TABLE productos (id INTEGER PRIMARY KEY, nombre TEXT, categoria TEXT, precio REAL);
CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, producto_id INTEGER, cantidad INTEGER, fecha TEXT);

INSERT INTO clientes VALUES
  (1, 'Ana', 'Bogota', 'Premium'), (2, 'Luis', 'Medellin', 'Basico'), (3, 'Marta', 'Bogota', 'Basico'),
  (4, 'Pedro', 'Cali', 'Premium'), (5, 'Sofia', 'Medellin', 'Estandar'), (6, 'Diego', 'Bogota', 'Estandar');
INSERT INTO productos VALUES
  (1, 'Laptop', 'Electronica', 2500), (2, 'Mouse', 'Accesorios', 50), (3, 'Teclado', 'Accesorios', 120),
  (4, 'Monitor', 'Electronica', 800), (5, 'Audifonos', 'Accesorios', 150);
INSERT INTO pedidos VALUES
  (1, 1, 1, 1, '2024-01-10'), (2, 1, 2, 2, '2024-01-12'), (3, 2, 3, 1, '2024-01-15'),
  (4, 3, 4, 2, '2024-02-01'), (5, 4, 1, 1, '2024-02-05'), (6, 5, 5, 3, '2024-02-10'),
  (7, 2, 2, 4, '2024-02-14'), (8, 1, 5, 1, '2024-03-01'), (9, 3, 2, 5, '2024-03-03'),
  (10, 5, 4, 1, '2024-03-09');
""")`

/** Descripción de las tablas de práctica, para mostrarla junto a los ejemplos SQL. */
export const ESQUEMA_SQL_PRACTICA = [
  { tabla: 'clientes', columnas: 'id, nombre, ciudad, plan', filas: 6 },
  { tabla: 'productos', columnas: 'id, nombre, categoria, precio', filas: 5 },
  { tabla: 'pedidos', columnas: 'id, cliente_id, producto_id, cantidad, fecha', filas: 10 },
]

/**
 * Código Python que ejecuta una o varias sentencias SQL sobre la base de práctica y muestra el
 * resultado de cada consulta (nombres de columna y una fila por línea, NULL para valores nulos).
 */
export function envolverSql(sql: string): string {
  return `${SQL_SETUP}

def _mostrar(cur):
    if cur.description is None:
        return
    print(" | ".join(d[0] for d in cur.description))
    for fila in cur.fetchall():
        print(" | ".join("NULL" if v is None else str(v) for v in fila))

_texto = ${JSON.stringify(sql)}
_buffer = ""
for _linea in _texto.splitlines(keepends=True):
    _buffer += _linea
    if sqlite3.complete_statement(_buffer):
        _mostrar(conn.execute(_buffer))
        _buffer = ""
if _buffer.strip():
    _mostrar(conn.execute(_buffer))
`
}
