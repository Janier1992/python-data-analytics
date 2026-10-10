import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  cdfBinomial, cdfPoisson, cdfT, colaDerechaChi2, colaDerechaF, invChi2ColaDerecha, invFColaDerecha, invT, invT2Colas, pT2Colas, pmfBinomial, pmfPoisson, pnormEstandar, qnormEstandar,
} from './distribuciones'

const cerca = (real: number, esperado: number, tol = 1e-8) => assert.ok(Math.abs(real - esperado) <= tol, `${real} ≠ ${esperado} (tol ${tol})`)

// Valores de referencia calculados con SciPy
test('normal estándar: Φ(z) y su inversa', () => {
  cerca(pnormEstandar(0), 0.5, 1e-15)
  cerca(pnormEstandar(1.96), 0.9750021048517795)
  cerca(pnormEstandar(-1.645), 0.049984905539121376, 1e-12)
  cerca(pnormEstandar(2.5), 0.9937903346742238)
  cerca(pnormEstandar(3.5), 0.9997673709209645, 1e-12)
  cerca(pnormEstandar(-5), 2.866515718791939e-7, 1e-15)
  cerca(qnormEstandar(0.975), 1.959963984540054, 1e-9)
  cerca(qnormEstandar(0.95), 1.6448536269514722, 1e-9)
  cerca(qnormEstandar(0.005), -2.5758293035489004, 1e-9)
})

test('binomial y Poisson', () => {
  cerca(pmfBinomial(3, 10, 0.5), 0.1171875, 1e-12)
  cerca(cdfBinomial(3, 10, 0.5), 0.171875, 1e-12)
  cerca(pmfBinomial(2, 5, 0.3), 0.3087, 1e-12)
  cerca(pmfPoisson(2, 3), 0.22404180765538775, 1e-12)
  cerca(cdfPoisson(4, 3), 0.8152632445237722, 1e-12)
})

test('t de Student', () => {
  cerca(pT2Colas(2.262, 9), 0.05001284550245463, 1e-10)
  cerca(invT2Colas(0.05, 9), 2.2621571627409915, 1e-9)
  cerca(invT(0.975, 24), 2.0638985616280205, 1e-9)
  cerca(invT(0.025, 24), -2.0638985616280205, 1e-9)
  cerca(cdfT(1.5, 10), 0.9177463367772798, 1e-10)
})

test('chi-cuadrado y F (cola derecha) y sus inversas', () => {
  cerca(colaDerechaChi2(3.841458820694124, 1), 0.05, 1e-10)
  cerca(colaDerechaChi2(5.991464547107979, 2), 0.05, 1e-10)
  cerca(invChi2ColaDerecha(0.05, 4), 9.487729036781154, 1e-8)
  cerca(colaDerechaF(3.8853, 2, 12), 0.05, 5e-5)
  cerca(invFColaDerecha(0.05, 3, 20), 3.098391212140781, 1e-8)
})
