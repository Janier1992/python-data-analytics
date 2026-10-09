import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LEMA_ACADEMIA, NOMBRE_ACADEMIA, NOMBRE_PROGRAMA } from '../brand'
import { curriculum, leccionesCertificables, moduloLeccionesCertificablesMap, todasLasLecciones } from '../content/curriculum'
import { avanceCertificado, codigoDeConstancia, diasDeEstudio, formatearDuracion, formatearFecha, formatearTiempoEstudio } from '../lib/certificado'
import { useCuentaActual } from '../state/accountStore'
import { useProgressStore } from '../state/progressStore'
import { EditarNombreDialogo } from './EditarNombreDialogo'
import { BarraProgreso, Boton, Tarjeta } from './ui'

// El certificado se dibuja en un lienzo fijo del tamaño de una hoja A4 horizontal (297 × 210 mm a 96 ppp)
// y se escala para ajustarse a la pantalla; al imprimir se usa a tamaño real.
const ANCHO = 1122
const ALTO = 794
const TINTA = '#0f172a'
const AZUL = '#1d4ced'
const DORADO = '#a8741a'
const PAPEL = '#fffdf7'

interface DatosCertificado {
  nombre: string
  inicioEn: number
  completadoEn: number
  tiempoActivoSeg: number
  diasActivos: number
  codigo: string
  modulos: number
  lecciones: number
}

function Certificado({ datos }: { datos: DatosCertificado }) {
  const envoltorioRef = useRef<HTMLDivElement>(null)
  const [escala, setEscala] = useState(1)

  useLayoutEffect(() => {
    const el = envoltorioRef.current
    if (!el) return
    const medir = () => setEscala(Math.min(1, el.clientWidth / ANCHO))
    medir()
    const observador = new ResizeObserver(medir)
    observador.observe(el)
    return () => observador.disconnect()
  }, [])

  const dato = (etiqueta: string, valor: string, detalle?: string) => (
    <div style={{ textAlign: 'center', padding: '0 12px' }}>
      <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{etiqueta}</div>
      <div style={{ marginTop: 4, fontSize: 18, fontWeight: 700, color: TINTA, fontFamily: 'Inter, sans-serif' }}>{valor}</div>
      {detalle && <div style={{ marginTop: 2, fontSize: 12, color: '#64748b', fontFamily: 'Inter, sans-serif' }}>{detalle}</div>}
    </div>
  )

  return (
    <div ref={envoltorioRef} id="certificado-envoltura" style={{ width: '100%', height: ALTO * escala, position: 'relative' }}>
      <div
        id="certificado"
        role="img"
        aria-label={`Certificado de finalización de ${NOMBRE_ACADEMIA} para ${datos.nombre}`}
        style={{
          width: ANCHO,
          height: ALTO,
          transform: `scale(${escala})`,
          transformOrigin: 'top left',
          background: PAPEL,
          color: TINTA,
          position: 'absolute',
          left: 0,
          top: 0,
          boxSizing: 'border-box',
          padding: 26,
          boxShadow: '0 20px 50px -20px rgba(0,0,0,0.6)',
        }}
      >
        {/* Marco doble */}
        <div style={{ position: 'absolute', inset: 14, border: `3px solid ${AZUL}` }} />
        <div style={{ position: 'absolute', inset: 22, border: `1px solid ${DORADO}` }} />

        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '36px 70px 30px', boxSizing: 'border-box', textAlign: 'center' }}>
          {/* Marca */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: `linear-gradient(135deg, #5a94ff, ${AZUL})`, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 18, fontFamily: 'Inter, sans-serif' }}>AI</div>
            <div style={{ textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 1, color: TINTA }}>{NOMBRE_ACADEMIA}</div>
              <div style={{ fontSize: 11, letterSpacing: 2, color: '#64748b', textTransform: 'uppercase' }}>{LEMA_ACADEMIA}</div>
            </div>
          </div>

          <div style={{ marginTop: 26, fontSize: 15, letterSpacing: 6, textTransform: 'uppercase', color: DORADO, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Certificado de finalización</div>
          <div style={{ marginTop: 20, fontSize: 17, color: '#475569', fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}>Se certifica que</div>

          <div style={{ marginTop: 8, fontSize: datos.nombre.length > 34 ? 38 : 52, lineHeight: 1.15, fontWeight: 700, color: TINTA, fontFamily: 'Georgia, "Times New Roman", serif', maxWidth: '100%' }}>{datos.nombre}</div>
          <div style={{ width: 360, height: 2, marginTop: 10, background: `linear-gradient(90deg, transparent, ${DORADO}, transparent)` }} />

          <div style={{ marginTop: 18, fontSize: 17, color: '#475569', fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}>ha completado satisfactoriamente el programa</div>
          <div style={{ marginTop: 8, fontSize: 30, fontWeight: 700, color: AZUL, fontFamily: 'Georgia, "Times New Roman", serif' }}>{NOMBRE_PROGRAMA}</div>
          <div style={{ marginTop: 8, fontSize: 14, color: '#475569', fontFamily: 'Inter, sans-serif' }}>
            {datos.modulos} módulos · {datos.lecciones} lecciones · ejercicios de código, evaluaciones y proyectos integradores
          </div>

          <div style={{ marginTop: 'auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '14px 0' }}>
            {dato('Inicio del programa', formatearFecha(datos.inicioEn))}
            {dato('Finalización', formatearFecha(datos.completadoEn))}
            {dato('Duración del programa', formatearDuracion(datos.inicioEn, datos.completadoEn), datos.diasActivos > 0 ? `${datos.diasActivos} ${datos.diasActivos === 1 ? 'día' : 'días'} de estudio` : undefined)}
            {dato('Tiempo de estudio activo', formatearTiempoEstudio(datos.tiempoActivoSeg))}
          </div>

          <div style={{ marginTop: 16, width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ textAlign: 'left', fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>
              <div style={{ letterSpacing: 2, textTransform: 'uppercase' }}>Código de constancia</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: TINTA, fontFamily: '"JetBrains Mono", ui-monospace, monospace', letterSpacing: 1 }}>{datos.codigo}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 230, borderTop: `1px solid ${TINTA}`, paddingTop: 6, fontSize: 13, color: TINTA, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{NOMBRE_ACADEMIA} · Plataforma de aprendizaje</div>
            </div>
            <div style={{ width: 72, height: 72, borderRadius: '50%', border: `3px double ${DORADO}`, display: 'grid', placeItems: 'center', color: DORADO, fontWeight: 800, fontSize: 13, textAlign: 'center', lineHeight: 1.1 }}>
              AI
              <br />
              {new Date(datos.completadoEn).getFullYear()}
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 10.5, color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
            Constancia de participación emitida por {NOMBRE_ACADEMIA}. No constituye un título académico ni una credencial oficial.
          </div>
        </div>
      </div>
    </div>
  )
}

export function CertificadoPage() {
  const cuenta = useCuentaActual()
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const inicioEn = useProgressStore((s) => s.inicioEn)
  const completadoEn = useProgressStore((s) => s.completadoEn)
  const tiempoActivoSeg = useProgressStore((s) => s.tiempoActivoSeg)
  const diasActivos = useProgressStore((s) => s.diasActivos)
  const verificarFinalizacion = useProgressStore((s) => s.verificarFinalizacion)
  const [codigo, setCodigo] = useState<string | null>(null)
  const [editando, setEditando] = useState(false)

  const modulos = useMemo(() => moduloLeccionesCertificablesMap(), [])
  const avance = useMemo(() => avanceCertificado(completedLessons, modulos), [completedLessons, modulos])

  useEffect(() => {
    if (avance.completo) verificarFinalizacion()
  }, [avance.completo, verificarFinalizacion])

  const nombre = cuenta?.nombre ?? ''
  const emitible = avance.completo && inicioEn !== null && completadoEn !== null && cuenta !== null

  useEffect(() => {
    if (!emitible || !cuenta) return
    let activo = true
    codigoDeConstancia({ cuentaId: cuenta.id, nombre: cuenta.nombre, inicioEn: inicioEn!, completadoEn: completadoEn! }).then((c) => activo && setCodigo(c))
    return () => {
      activo = false
    }
  }, [emitible, cuenta, inicioEn, completadoEn])

  const siguiente = todasLasLecciones.find((l) => leccionesCertificables.includes(l.id) && !completedLessons.includes(l.id))
  const pendientes = curriculum.filter((m) => m.disponible && m.lessonIds.some((id) => leccionesCertificables.includes(id) && !completedLessons.includes(id)))

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <p className="text-sm font-medium text-brand-400">Reconocimiento</p>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-50">Tu certificado</h1>

      {!avance.completo && (
        <div className="mt-6 space-y-5">
          <Tarjeta className="p-6">
            <div className="flex items-start gap-4">
              <span aria-hidden="true" className="text-4xl">🎓</span>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-50">Aún no has terminado el programa</h2>
                <p className="mt-1 text-slate-300">
                  Al completar las {avance.leccionesTotales} lecciones (aprobando la verificación de cada una con 70 % o más) recibirás un certificado de finalización de {NOMBRE_ACADEMIA} con tu nombre completo y el tiempo que tardaste.
                </p>
                <div className="mt-4">
                  <div className="mb-1.5 flex justify-between text-sm text-slate-300">
                    <span>
                      {avance.leccionesHechas} de {avance.leccionesTotales} lecciones · {avance.modulosHechos} de {avance.modulosTotales} módulos
                    </span>
                    <span className="font-semibold text-slate-100">{avance.porcentaje} %</span>
                  </div>
                  <BarraProgreso valor={avance.porcentaje} etiqueta="Avance hacia el certificado" />
                </div>
                {siguiente && (
                  <Link to={`/leccion/${siguiente.id}`} className="mt-5 inline-flex rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
                    {avance.leccionesHechas === 0 ? 'Empezar el programa' : 'Continuar donde quedaste'} →
                  </Link>
                )}
              </div>
            </div>
          </Tarjeta>

          {pendientes.length > 0 && (
            <Tarjeta className="p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Módulos con lecciones pendientes</h2>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {pendientes.map((m) => {
                  const hechas = m.lessonIds.filter((id) => completedLessons.includes(id)).length
                  const primera = m.lessonIds.find((id) => !completedLessons.includes(id))!
                  return (
                    <li key={m.id} className="min-w-0">
                      <Link to={`/leccion/${primera}`} className="flex min-w-0 items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-surface">
                        <span className="min-w-0 truncate">{m.numero}. {m.titulo}</span>
                        <span className="shrink-0 text-xs text-slate-400">{hechas}/{m.lessonIds.length}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </Tarjeta>
          )}
        </div>
      )}

      {avance.completo && (
        <>
          <p className="mt-2 text-slate-300">¡Felicitaciones, {nombre.split(' ')[0]}! Completaste todo el programa. Este es tu certificado de finalización.</p>

          <div className="no-imprimir mt-5 flex flex-wrap items-center gap-3">
            <Boton onClick={() => window.print()} disabled={!codigo}>
              🖨️ Descargar / imprimir PDF
            </Boton>
            <Boton variante="secundario" onClick={() => setEditando(true)}>
              ✏️ Corregir mi nombre
            </Boton>
            <span className="text-xs text-slate-400">En el cuadro de impresión elige «Guardar como PDF».</span>
          </div>

          <div className="mt-5">
            {codigo && emitible ? (
              <Certificado
                datos={{
                  nombre,
                  inicioEn: inicioEn!,
                  completadoEn: completadoEn!,
                  tiempoActivoSeg,
                  diasActivos: diasDeEstudio(diasActivos),
                  codigo,
                  modulos: avance.modulosTotales,
                  lecciones: avance.leccionesTotales,
                }}
              />
            ) : (
              <p className="text-slate-400" role="status">Preparando tu certificado…</p>
            )}
          </div>

          <p className="no-imprimir mt-4 text-xs leading-relaxed text-slate-400">
            Es una constancia de participación: no es un título ni una credencial oficial, y el código de constancia identifica este documento pero no se verifica en ningún servidor. La duración se cuenta desde que iniciaste el programa hasta que completaste la última lección; el tiempo de estudio activo suma solo los momentos con la página visible y actividad reciente.
          </p>
        </>
      )}

      <EditarNombreDialogo abierto={editando} onCerrar={() => setEditando(false)} />
    </div>
  )
}
