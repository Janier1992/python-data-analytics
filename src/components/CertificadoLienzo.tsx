import { useLayoutEffect, useRef, useState } from 'react'
import { LEMA_ACADEMIA, NOMBRE_ACADEMIA } from '../brand'
import { formatearDuracion, formatearFecha, formatearTiempoEstudio } from '../lib/certificado'

// El certificado se dibuja en un lienzo fijo del tamaño de una hoja A4 horizontal (297 × 210 mm a 96 ppp)
// y se escala para ajustarse a la pantalla; al imprimir se usa a tamaño real.
const ANCHO = 1122
const ALTO = 794
const TINTA = '#0f172a'
const AZUL = '#1d4ced'
const DORADO = '#a8741a'
const PAPEL = '#fffdf7'

export interface DatosCertificado {
  nombre: string
  /** Texto de la primera línea de título: «Certificado de finalización» (programa) o «Certificado de curso». */
  tipo: string
  /** Frase antes del título del programa o curso: «ha completado satisfactoriamente el programa» o «… el curso». */
  fraseCompletado: string
  /** Si el certificado es del programa completo o de un curso (cambia las etiquetas de las fechas). */
  ambito: 'programa' | 'curso'
  /** Nombre del programa o del curso. */
  titulo: string
  /** Línea descriptiva bajo el título (módulos, lecciones…). */
  detalle: string
  /** Aclaración propia del curso sobre lo que se evalúa o no (opcional). */
  aviso?: string
  inicioEn: number
  completadoEn: number
  /** Segundos de estudio activo; `null` si no se registró (progreso anterior a los certificados de curso). */
  tiempoActivoSeg: number | null
  diasActivos: number
  codigo: string
}

export function Certificado({ datos }: { datos: DatosCertificado }) {
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
        aria-label={`${datos.tipo} de ${NOMBRE_ACADEMIA}: ${datos.titulo}, para ${datos.nombre}`}
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

          <div style={{ marginTop: 26, fontSize: 15, letterSpacing: 6, textTransform: 'uppercase', color: DORADO, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{datos.tipo}</div>
          <div style={{ marginTop: 20, fontSize: 17, color: '#475569', fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}>Se certifica que</div>

          <div style={{ marginTop: 8, fontSize: datos.nombre.length > 34 ? 38 : 52, lineHeight: 1.15, fontWeight: 700, color: TINTA, fontFamily: 'Georgia, "Times New Roman", serif', maxWidth: '100%' }}>{datos.nombre}</div>
          <div style={{ width: 360, height: 2, marginTop: 10, background: `linear-gradient(90deg, transparent, ${DORADO}, transparent)` }} />

          <div style={{ marginTop: 18, fontSize: 17, color: '#475569', fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}>{datos.fraseCompletado}</div>
          <div style={{ marginTop: 8, fontSize: 30, fontWeight: 700, color: AZUL, fontFamily: 'Georgia, "Times New Roman", serif', maxWidth: '100%', lineHeight: 1.2 }}>{datos.titulo}</div>
          <div style={{ marginTop: 8, fontSize: 14, color: '#475569', fontFamily: 'Inter, sans-serif' }}>
            {datos.detalle}
          </div>

          <div style={{ marginTop: 'auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '14px 0' }}>
            {dato(`Inicio del ${datos.ambito}`, formatearFecha(datos.inicioEn))}
            {dato('Finalización', formatearFecha(datos.completadoEn))}
            {dato(`Duración del ${datos.ambito}`, formatearDuracion(datos.inicioEn, datos.completadoEn), datos.diasActivos > 0 ? `${datos.diasActivos} ${datos.diasActivos === 1 ? 'día' : 'días'} de estudio` : undefined)}
            {datos.tiempoActivoSeg === null ? dato('Tiempo de estudio activo', 'No registrado') : dato('Tiempo de estudio activo', formatearTiempoEstudio(datos.tiempoActivoSeg))}
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
            {datos.aviso && <div style={{ marginBottom: 3 }}>{datos.aviso}</div>}
            Constancia de participación emitida por {NOMBRE_ACADEMIA}. No constituye un título académico ni una credencial oficial.
          </div>
        </div>
      </div>
    </div>
  )
}
