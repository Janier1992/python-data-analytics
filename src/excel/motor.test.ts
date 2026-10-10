import { test } from 'node:test'
import assert from 'node:assert/strict'
import { comprobarEjercicio, evaluarFormula, formatearValor, primerValor, trasladarFormula } from './index'
import type { EjercicioHoja, Hoja } from './index'

const ventas: Hoja = {
  celdas: [
    ['Producto', 'Región', 'Ventas'],
    ['A', 'Norte', 100],
    ['B', 'Sur', 200],
    ['C', 'Norte', 300],
    ['A', 'Sur', 400],
  ],
}
const vacia: Hoja = { celdas: [[]] }

/** Evalúa y devuelve el valor como texto de Excel (errores incluidos). */
function ev(formula: string, hoja: Hoja = ventas): string {
  const r = evaluarFormula(formula, hoja)
  if (!r.ok) return `SINTAXIS: ${r.mensaje}`
  return formatearValor(primerValor(r.valor))
}

test('aritmética y precedencia como en Excel', () => {
  assert.equal(ev('=1+2*3', vacia), '7')
  assert.equal(ev('=(1+2)*3', vacia), '9')
  assert.equal(ev('=2^3', vacia), '8')
  assert.equal(ev('=-2^2', vacia), '4') // el signo menos se aplica antes que ^
  assert.equal(ev('=2^3^2', vacia), '64') // ^ se evalúa de izquierda a derecha
  assert.equal(ev('=10/4', vacia), '2,5')
  assert.equal(ev('=50%', vacia), '0,5')
  assert.equal(ev('=10*50%', vacia), '5')
  assert.equal(ev('=0.1+0.2', vacia), '0,3')
})

test('errores de cálculo y su propagación', () => {
  assert.equal(ev('=10/0', vacia), '#¡DIV/0!')
  assert.equal(ev('=1+10/0', vacia), '#¡DIV/0!')
  assert.equal(ev('="a"+1', vacia), '#¡VALOR!')
  assert.equal(ev('=RAIZ(-1)', vacia), '#¡NUM!')
  assert.equal(ev('=INVENTADA(1)', vacia), '#¿NOMBRE?')
  assert.equal(ev('=SI.ERROR(1/0;"x")', vacia), 'x')
  assert.equal(ev('=SI.ERROR(5;"x")', vacia), '5')
})

test('conversiones y comparaciones', () => {
  assert.equal(ev('="3"+1', vacia), '4')
  assert.equal(ev('=VERDADERO+1', vacia), '2')
  assert.equal(ev('="a"&"b"', vacia), 'ab')
  assert.equal(ev('=5&"x"', vacia), '5x')
  assert.equal(ev('=1=1', vacia), 'VERDADERO')
  assert.equal(ev('="a"="A"', vacia), 'VERDADERO') // sin distinguir mayúsculas
  assert.equal(ev('=2<"a"', vacia), 'VERDADERO') // los números van antes que los textos
  assert.equal(ev('=1<>2', vacia), 'VERDADERO')
})

test('SUMA, PROMEDIO, MIN, MAX y conteos', () => {
  assert.equal(ev('=SUMA(C2:C5)'), '1000')
  assert.equal(ev('=SUMA(C2:C5;50)'), '1050')
  assert.equal(ev('=SUMA(A1:C5)'), '1000') // el texto de un rango se ignora
  assert.equal(ev('=SUMA("3";2)', vacia), '5') // el texto escrito directamente se convierte
  assert.equal(ev('=SUMA(VERDADERO;2)', vacia), '3')
  assert.equal(ev('=PROMEDIO(C2:C5)'), '250')
  assert.equal(ev('=PROMEDIO(A2:A5)'), '#¡DIV/0!')
  assert.equal(ev('=MIN(C2:C5)'), '100')
  assert.equal(ev('=MAX(C2:C5)'), '400')
  assert.equal(ev('=MIN(A2:A5)'), '0')
  assert.equal(ev('=CONTAR(A1:C5)'), '4')
  assert.equal(ev('=CONTARA(A1:C5)'), '15')
  assert.equal(ev('=CONTAR.BLANCO(A1:D1)'), '1')
  assert.equal(ev('=sum(C2:C5)'), '1000') // nombres en inglés y en minúsculas
})

test('CONTAR.SI, SUMAR.SI y PROMEDIO.SI', () => {
  assert.equal(ev('=CONTAR.SI(A2:A5;"A")'), '2')
  assert.equal(ev('=CONTAR.SI(A2:A5;"a")'), '2') // sin distinguir mayúsculas
  assert.equal(ev('=CONTAR.SI(C2:C5;">150")'), '3')
  assert.equal(ev('=CONTAR.SI(C2:C5;">="&200)'), '3')
  assert.equal(ev('=CONTAR.SI(C2:C5;300)'), '1')
  assert.equal(ev('=CONTAR.SI(A2:A5;"<>A")'), '2')
  assert.equal(ev('=CONTAR.SI(B2:B5;"N*")'), '2')
  assert.equal(ev('=CONTAR.SI(B2:B5;"?ur")'), '2')
  assert.equal(ev('=SUMAR.SI(B2:B5;"Norte";C2:C5)'), '400')
  assert.equal(ev('=SUMAR.SI(C2:C5;">150")'), '900')
  assert.equal(ev('=PROMEDIO.SI(B2:B5;"Sur";C2:C5)'), '300')
  assert.equal(ev('=PROMEDIO.SI(B2:B5;"Oeste";C2:C5)'), '#¡DIV/0!')
})

test('CONTAR.SI.CONJUNTO y SUMAR.SI.CONJUNTO', () => {
  assert.equal(ev('=SUMAR.SI.CONJUNTO(C2:C5;A2:A5;"A";B2:B5;"Sur")'), '400')
  assert.equal(ev('=SUMAR.SI.CONJUNTO(C2:C5;A2:A5;"A")'), '500')
  assert.equal(ev('=CONTAR.SI.CONJUNTO(A2:A5;"A";C2:C5;">150")'), '1')
  assert.equal(ev('=SUMAR.SI.CONJUNTO(C2:C5;A2:A4;"A")'), '#¡VALOR!') // rangos de distinto tamaño
})

test('SI, Y, O, NO', () => {
  assert.equal(ev('=SI(1>2;"a";"b")', vacia), 'b')
  assert.equal(ev('=SI(FALSO;1)', vacia), 'FALSO')
  assert.equal(ev('=SI(C2>=100;"alto";"bajo")'), 'alto')
  assert.equal(ev('=Y(1>0;2>1)', vacia), 'VERDADERO')
  assert.equal(ev('=Y(1>0;2<1)', vacia), 'FALSO')
  assert.equal(ev('=O(1>2;2>1)', vacia), 'VERDADERO')
  assert.equal(ev('=NO(1>2)', vacia), 'VERDADERO')
  assert.equal(ev('=SI(Y(C2>50;C2<150);"medio";"otro")'), 'medio')
})

test('BUSCARV exacta y aproximada', () => {
  assert.equal(ev('=BUSCARV("C";A2:C5;3;FALSO)'), '300')
  assert.equal(ev('=BUSCARV("A";A2:C5;3;0)'), '100') // la primera coincidencia
  assert.equal(ev('=BUSCARV("Z";A2:C5;3;FALSO)'), '#N/D')
  assert.equal(ev('=BUSCARV("C";A2:C5;5;FALSO)'), '#¡REF!')
  const tramos: Hoja = { celdas: [[0, 0], [1000, 5], [5000, 8]] }
  assert.equal(ev('=BUSCARV(1500;A1:B3;2;VERDADERO)', tramos), '5')
  assert.equal(ev('=BUSCARV(1500;A1:B3;2)', tramos), '5') // por defecto es aproximada
  assert.equal(ev('=BUSCARV(5000;A1:B3;2)', tramos), '8')
  assert.equal(ev('=BUSCARV(-1;A1:B3;2)', tramos), '#N/D')
  assert.equal(ev('=BUSCARV(999999;A1:B3;2)', tramos), '8')
})

test('INDICE y COINCIDIR', () => {
  assert.equal(ev('=INDICE(C2:C5;3)'), '300')
  assert.equal(ev('=INDICE(A2:C5;2;3)'), '200')
  assert.equal(ev('=INDICE(A2:C5;9;1)'), '#¡REF!')
  assert.equal(ev('=COINCIDIR("C";A2:A5;0)'), '3')
  assert.equal(ev('=COINCIDIR("Z";A2:A5;0)'), '#N/D')
  assert.equal(ev('=INDICE(C2:C5;COINCIDIR("C";A2:A5;0))'), '300')
  const orden: Hoja = { celdas: [[10], [20], [30]] }
  assert.equal(ev('=COINCIDIR(25;A1:A3;1)', orden), '2')
  assert.equal(ev('=COINCIDIR(5;A1:A3;1)', orden), '#N/D')
  assert.equal(ev('=COINCIDIR(25;A1:A3)', orden), '2')
})

test('BUSCARX', () => {
  assert.equal(ev('=BUSCARX("C";A2:A5;C2:C5)'), '300')
  assert.equal(ev('=BUSCARX("Z";A2:A5;C2:C5)'), '#N/D')
  assert.equal(ev('=BUSCARX("Z";A2:A5;C2:C5;"no existe")'), 'no existe')
  assert.equal(ev('=BUSCARX(250;C2:C5;A2:A5;;-1)'), 'B') // exacta o la siguiente menor
  assert.equal(ev('=BUSCARX(250;C2:C5;A2:A5;;1)'), 'C') // exacta o la siguiente mayor
  assert.equal(ev('=BUSCARX("A";A2:A5;C2:C5;;0;-1)'), '400') // de abajo hacia arriba
  assert.equal(ev('=BUSCARX("N*";B2:B5;C2:C5;;2)'), '100') // comodines
})

test('redondeos y matemáticas', () => {
  assert.equal(ev('=REDONDEAR(2.5;0)', vacia), '3')
  assert.equal(ev('=REDONDEAR(-2.5;0)', vacia), '-3')
  assert.equal(ev('=REDONDEAR(2.345;2)', vacia), '2,35')
  assert.equal(ev('=REDONDEAR(1234.567;-2)', vacia), '1200')
  assert.equal(ev('=REDONDEAR.MAS(2.1;0)', vacia), '3')
  assert.equal(ev('=REDONDEAR.MENOS(-2.9;0)', vacia), '-2')
  assert.equal(ev('=TRUNCAR(-8.9)', vacia), '-8')
  assert.equal(ev('=ENTERO(-8.5)', vacia), '-9')
  assert.equal(ev('=RESIDUO(10;3)', vacia), '1')
  assert.equal(ev('=RESIDUO(-3;2)', vacia), '1')
  assert.equal(ev('=RESIDUO(3;-2)', vacia), '-1')
  assert.equal(ev('=RESIDUO(5;0)', vacia), '#¡DIV/0!')
  assert.equal(ev('=POTENCIA(2;10)', vacia), '1024')
  assert.equal(ev('=RAIZ(16)', vacia), '4')
  assert.equal(ev('=ABS(-7)', vacia), '7')
  assert.equal(ev('=PRODUCTO(2;3;4)', vacia), '24')
})

test('estadística', () => {
  assert.equal(ev('=MEDIANA(1;3;2;4)', vacia), '2,5')
  assert.equal(ev('=MEDIANA(C2:C5)'), '250')
  assert.equal(ev('=MODA.UNO(1;2;2;3;3)', vacia), '2')
  assert.equal(ev('=MODA.UNO(1;2;3)', vacia), '#N/D')
  assert.equal(ev('=DESVEST.P(2;4;4;4;5;5;7;9)', vacia), '2')
  assert.equal(ev('=REDONDEAR(DESVEST.M(2;4;4;4;5;5;7;9);4)', vacia), '2,1381')
  assert.equal(ev('=K.ESIMO.MAYOR(C2:C5;2)'), '300')
  assert.equal(ev('=K.ESIMO.MENOR(C2:C5;1)'), '100')
  assert.equal(ev('=PERCENTIL.INC(C2:C5;0.25)'), '175')
  assert.equal(ev('=CUARTIL.INC(C2:C5;3)'), '325')
  assert.equal(ev('=PERCENTIL.INC(C2:C5;2)'), '#¡NUM!')
  const empates: Hoja = { celdas: [[10], [20], [20], [30]] }
  assert.equal(ev('=JERARQUIA(20;A1:A4)', empates), '2')
  assert.equal(ev('=JERARQUIA(10;A1:A4)', empates), '4')
  assert.equal(ev('=JERARQUIA(10;A1:A4;1)', empates), '1')
})

test('SUMAPRODUCTO y operaciones con matrices', () => {
  const h: Hoja = { celdas: [[1, 10], [2, 20], [3, 30]] }
  assert.equal(ev('=SUMAPRODUCTO(A1:A3;B1:B3)', h), '140')
  assert.equal(ev('=SUMAPRODUCTO(A1:A3*B1:B3)', h), '140')
  assert.equal(ev('=SUMAPRODUCTO((A1:A3>1)*B1:B3)', h), '50')
  assert.equal(ev('=SUMAPRODUCTO(--(A1:A3>1);B1:B3)', h), '50')
  assert.equal(ev('=SUMAPRODUCTO(A1:A3;B1:B2)', h), '#¡VALOR!')
})

test('funciones de texto', () => {
  assert.equal(ev('=IZQUIERDA("Colombia";3)', vacia), 'Col')
  assert.equal(ev('=DERECHA("Colombia";4)', vacia), 'mbia')
  assert.equal(ev('=EXTRAE("Colombia";4;3)', vacia), 'omb')
  assert.equal(ev('=LARGO("hola")', vacia), '4')
  assert.equal(ev('=MAYUSC("hola")', vacia), 'HOLA')
  assert.equal(ev('=MINUSC("HOLA")', vacia), 'hola')
  assert.equal(ev('=NOMPROPIO("juan pérez")', vacia), 'Juan Pérez')
  assert.equal(ev('=NOMPROPIO("o\'neil")', vacia), "O'Neil")
  assert.equal(ev('=ESPACIOS("  a   b  ")', vacia), 'a b')
  assert.equal(ev('=SUSTITUIR("a-b-c";"-";"/")', vacia), 'a/b/c')
  assert.equal(ev('=SUSTITUIR("a-b-c";"-";"/";2)', vacia), 'a-b/c')
  assert.equal(ev('=ENCONTRAR("b";"abcb")', vacia), '2')
  assert.equal(ev('=ENCONTRAR("B";"abcb")', vacia), '#¡VALOR!') // distingue mayúsculas
  assert.equal(ev('=HALLAR("B*";"abc")', vacia), '2') // no distingue y admite comodines
  assert.equal(ev('=VALOR("12.5")', vacia), '12,5')
  assert.equal(ev('=VALOR("abc")', vacia), '#¡VALOR!')
  assert.equal(ev('=CONCATENAR("a";1;VERDADERO)', vacia), 'a1VERDADERO')
  assert.equal(ev('=A2&" - "&B2'), 'A - Norte')
  assert.equal(ev('=UNIRCADENAS(", ";VERDADERO;"a";"";"b")', vacia), 'a, b')
  assert.equal(ev('=CONCAT(A2:B3)'), 'ANorteBSur')
  assert.equal(ev('=IGUAL("a";"A")', vacia), 'FALSO')
})

test('fechas con números de serie de Excel', () => {
  assert.equal(ev('=FECHA(2024;3;15)', vacia), '45366')
  assert.equal(ev('=AÑO(45366)', vacia), '2024')
  assert.equal(ev('=ANO(45366)', vacia), '2024')
  assert.equal(ev('=MES(45366)', vacia), '3')
  assert.equal(ev('=DIA(45366)', vacia), '15')
  assert.equal(ev('=DIASEM(45366)', vacia), '6') // viernes con tipo 1 (domingo = 1)
  assert.equal(ev('=DIASEM(45366;2)', vacia), '5') // viernes con tipo 2 (lunes = 1)
  assert.equal(ev('=FIN.MES(FECHA(2024;1;31);1)', vacia), '45351') // 29/02/2024
  assert.equal(ev('=DIAS(FECHA(2024;3;1);FECHA(2024;1;1))', vacia), '60')
  assert.equal(ev('=FECHA(2024;13;1)', vacia), '45658') // el mes 13 pasa al año siguiente
  assert.equal(ev('=FECHA(2024;3;0)', vacia), '45351') // el día 0 es el último del mes anterior
  const conFecha: Hoja = { celdas: [[{ fecha: '2024-03-15' }, 100]] }
  assert.equal(ev('=A1', conFecha), '45366')
  assert.equal(ev('=MES(A1)', conFecha), '3')
  assert.equal(formatearValor(45366, 'fecha'), '15/03/2024')
})

test('funciones de información', () => {
  assert.equal(ev('=ESNUMERO(C2)'), 'VERDADERO')
  assert.equal(ev('=ESNUMERO(A2)'), 'FALSO')
  assert.equal(ev('=ESTEXTO(A2)'), 'VERDADERO')
  assert.equal(ev('=ESBLANCO(D2)'), 'VERDADERO')
  assert.equal(ev('=ESERROR(1/0)', vacia), 'VERDADERO')
  assert.equal(ev('=ESNOD(BUSCARV("Z";A2:C5;3;FALSO))'), 'VERDADERO')
  assert.equal(ev('=SI.ND(BUSCARV("Z";A2:C5;3;FALSO);"sin dato")'), 'sin dato')
})

test('celdas con fórmulas dentro de la hoja y referencias circulares', () => {
  const h: Hoja = { celdas: [[2, 3, '=A1*B1'], [10, '=C1+A2', '=B2*2']] }
  assert.equal(ev('=C2', h), '32')
  const ciclo: Hoja = { celdas: [['=B1', '=A1']] }
  assert.equal(ev('=A1', ciclo), '#¡REF!')
})

test('separadores «,» y «;», columnas completas y errores de escritura', () => {
  assert.equal(ev('=SUMA(C2:C5,50)'), '1050')
  assert.equal(ev('=SUMA(C:C)'), '1000')
  assert.ok(ev('=SUMA(', vacia).startsWith('SINTAXIS'))
  assert.ok(ev('=1+', vacia).startsWith('SINTAXIS'))
  assert.ok(ev('=)', vacia).startsWith('SINTAXIS'))
  assert.ok(ev('="abc', vacia).startsWith('SINTAXIS'))
  assert.ok(ev('=', vacia).startsWith('SINTAXIS'))
  assert.ok(ev('=SUMA(A1 A2)', vacia).startsWith('SINTAXIS'))
  assert.ok(ev('=SI(1)', vacia).startsWith('SINTAXIS')) // faltan argumentos
  assert.ok(ev('=Hoja2!A1', vacia).startsWith('SINTAXIS'))
})

test('trasladar fórmulas al copiarlas hacia abajo o hacia la derecha', () => {
  assert.equal(trasladarFormula('=B2*$C$1', 1, 0), '=B3*$C$1')
  assert.equal(trasladarFormula('=$A2+B$1', 1, 1), '=$A3+C$1')
  assert.equal(trasladarFormula('=SUMA(A:A)', 0, 1), '=SUMA(B:B)')
  assert.equal(trasladarFormula('=SUMAR.SI(A2:A9;"A1";C2:C9)', 2, 0), '=SUMAR.SI(A4:A11;"A1";C4:C11)')
  assert.equal(trasladarFormula('=A1', -1, 0), null) // se sale de la hoja
})

test('comprobación de un ejercicio: correcta, incorrecta, copia hacia abajo', () => {
  const base: EjercicioHoja = {
    id: 't-1',
    enunciado: '',
    hoja: ventas,
    celda: 'E2',
    formulaInicial: '=',
    solucion: '=SUMA(C2:C5)',
    esperado: 1000,
    pistas: ['x'],
  }
  assert.equal(comprobarEjercicio(base, '=SUMA(C2:C5)').ok, true)
  assert.equal(comprobarEjercicio(base, '=SUMA(C2:C4)').ok, false)
  assert.equal(comprobarEjercicio(base, '=').ok, false)
  assert.equal(comprobarEjercicio(base, 'SUMA(C2:C5)').ok, false) // falta el signo =
  assert.equal(comprobarEjercicio(base, '=1000').ok, false) // no basta escribir el resultado
  assert.equal(comprobarEjercicio({ ...base, permiteSinReferencias: true }, '=1000').ok, true)
  assert.equal(comprobarEjercicio(base, '=SUMA(').ok, false)

  // Porcentaje del total: exige fijar el total con $
  const copia: EjercicioHoja = { ...base, celda: 'D2', solucion: '=C2/SUMA($C$2:$C$5)', esperado: [0.1, 0.2, 0.3, 0.4], rellenarFilas: 4 }
  assert.equal(comprobarEjercicio(copia, '=C2/SUMA($C$2:$C$5)').ok, true)
  assert.equal(comprobarEjercicio(copia, '=C2/SUMA(C2:C5)').ok, false) // el rango se desplaza al copiar
  assert.match(comprobarEjercicio(copia, '=C2/SUMA(C2:C5)').mensaje, /\$/)

  const error: EjercicioHoja = { ...base, solucion: '=BUSCARV("Z";A2:C5;3;FALSO)', esperado: { error: '#N/D' } }
  assert.equal(comprobarEjercicio(error, '=BUSCARV("Z";A2:C5;3;FALSO)').ok, true)
  const texto: EjercicioHoja = { ...base, solucion: '=A2&B2', esperado: 'ANorte' }
  assert.equal(comprobarEjercicio(texto, '=A2&B2').ok, true)
})

test('funciones de distribución: nombres en español y en inglés, y errores de dominio', () => {
  const hoja = { celdas: [[null]] }
  const calcular = (f: string) => evaluarFormula(f, hoja)
  const num = (f: string) => {
    const r = calcular(f)
    assert.ok(r.ok, f)
    return (r as { ok: true; valor: unknown }).valor as number
  }
  assert.ok(Math.abs(num('=DISTR.NORM.ESTAND.N(1.96;VERDADERO)') - 0.9750021048517795) < 1e-9)
  assert.equal(num('=NORM.S.DIST(1.96;TRUE)'), num('=DISTR.NORM.ESTAND.N(1.96;VERDADERO)'))
  assert.ok(Math.abs(num('=INV.NORM.ESTAND(0.975)') - 1.959963984540054) < 1e-8)
  assert.ok(Math.abs(num('=DISTR.NORM.N(110;100;15;VERDADERO)') - 0.7475074624530771) < 1e-9)
  assert.ok(Math.abs(num('=DISTR.BINOM.N(3;10;0.5;FALSO)') - 0.1171875) < 1e-12)
  assert.ok(Math.abs(num('=INV.T.2C(0.05;9)') - 2.2621571627409915) < 1e-8)
  assert.ok(Math.abs(num('=INV.CHICUAD.CD(0.05;4)') - 9.487729036781158) < 1e-7)
  assert.ok(Math.abs(num('=INV.F.CD(0.05;3;20)') - 3.098391212140781) < 1e-7)
  const dominio = calcular('=INV.NORM.ESTAND(1.5)')
  assert.ok(dominio.ok && String((dominio as { valor: { codigo?: string } }).valor.codigo).includes('NUM'))
})

test('funciones matemáticas para probabilidad: LN, EXP, LOG, FACT, COMBINAT, PERMUTACIONES, PI', () => {
  const num = (f: string) => {
    const r = evaluarFormula(f, { celdas: [[null]] })
    assert.ok(r.ok, f)
    return (r as { ok: true; valor: unknown }).valor as number
  }
  assert.ok(Math.abs(num('=LN(EXP(2))') - 2) < 1e-12)
  assert.equal(num('=LOG(1000)'), 3)
  assert.ok(Math.abs(num('=LOG(8;2)') - 3) < 1e-12)
  assert.equal(num('=FACT(5)'), 120)
  assert.equal(num('=COMBINAT(10;3)'), 120)
  assert.equal(num('=COMBIN(52;5)'), 2598960)
  assert.equal(num('=PERMUTACIONES(5;2)'), 20)
  assert.ok(Math.abs(num('=PI()') - Math.PI) < 1e-15)
})
