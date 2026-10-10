import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NOMBRE_ACADEMIA } from '../brand'
import { getCurso, leccionesDeCurso, moduloLeccionesDeCurso, todasLasLecciones } from '../content/curriculum'
import { avanceCertificado, codigoDeConstancia } from '../lib/certificado'
import { datosCertificadoCurso } from '../lib/certificadoCurso'
import { useCuentaActual } from '../state/accountStore'
import { useProgressStore } from '../state/progressStore'
import { Certificado } from './CertificadoLienzo'
import { EditarNombreDialogo } from './EditarNombreDialogo'
import { NotFound } from './NotFound'
import { BarraProgreso, Boton, Tarjeta } from './ui'

/** Certificado de finalización de un curso (se emite al completar todas sus lecciones). */
export function CertificadoCursoPage() {
  const { cursoId } = useParams()
  const curso = cursoId ? getCurso(cursoId) : undefined
  const cuenta = useCuentaActual()
  const completedLessons = useProgressStore((s) => s.completedLessons)
  const cursosProgreso = useProgressStore((s) => s.cursosProgreso)
  const verificarFinalizacionCursos = useProgressStore((s) => s.verificarFinalizacionCursos)
  const [codigo, setCodigo] = useState<string | null>(null)
  const [editando, setEditando] = useState(false)

  const modulos = useMemo(() => (curso ? moduloLeccionesDeCurso(curso.id) : {}), [curso])
  const avance = useMemo(() => avanceCertificado(completedLessons, modulos), [completedLessons, modulos])

  useEffect(() => {
    if (avance.completo) verificarFinalizacionCursos()
  }, [avance.completo, verificarFinalizacionCursos])

  const datos = curso ? datosCertificadoCurso(cursosProgreso, curso.id) : null
  const emitible = avance.completo && datos !== null && cuenta !== null

  useEffect(() => {
    if (!emitible || !cuenta || !curso || !datos) return
    let activo = true
    codigoDeConstancia({ cuentaId: cuenta.id, nombre: cuenta.nombre, inicioEn: datos.inicioEn, completadoEn: datos.completadoEn, cursoId: curso.id }).then((c) => activo && setCodigo(c))
    return () => {
      activo = false
    }
  }, [emitible, cuenta, curso, datos?.inicioEn, datos?.completadoEn])

  if (!curso || curso.proximamente || leccionesDeCurso(curso.id).length === 0) return <NotFound />

  const siguiente = todasLasLecciones.find((l) => leccionesDeCurso(curso.id).includes(l.id) && !completedLessons.includes(l.id))
  const nombre = cuenta?.nombre ?? ''

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <nav aria-label="Ruta de navegación" className="text-sm text-slate-400">
        <Link to="/certificados" className="hover:text-slate-200">
          ← Mis certificados
        </Link>
      </nav>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-50">
        {curso.icono} Certificado del curso
      </h1>
      <p className="mt-1 text-slate-300">{curso.titulo}</p>

      {!avance.completo && (
        <Tarjeta className="mt-6 p-6">
          <div className="flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl">
              🔒
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-slate-50">Aún no has completado este curso</h2>
              <p className="mt-1 text-slate-300">
                Al completar sus {avance.leccionesTotales} lecciones (aprobando la verificación de cada una con 70 % o más) recibirás el certificado de finalización de este curso con tu nombre completo.
              </p>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-sm text-slate-300">
                  <span>
                    {avance.leccionesHechas} de {avance.leccionesTotales} lecciones · {avance.modulosHechos} de {avance.modulosTotales} módulos
                  </span>
                  <span className="font-semibold text-slate-100">{avance.porcentaje} %</span>
                </div>
                <BarraProgreso valor={avance.porcentaje} etiqueta={`Avance hacia el certificado de ${curso.titulo}`} />
              </div>
              {siguiente && (
                <Link to={`/leccion/${siguiente.id}`} className="mt-5 inline-flex rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400">
                  {avance.leccionesHechas === 0 ? 'Empezar el curso' : 'Continuar donde quedaste'} →
                </Link>
              )}
            </div>
          </div>
        </Tarjeta>
      )}

      {avance.completo && (
        <>
          <p className="mt-3 text-slate-300">¡Felicitaciones, {nombre.split(' ')[0]}! Completaste el curso. Este es tu certificado de finalización.</p>

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
            {codigo && emitible && datos ? (
              <Certificado
                datos={{
                  nombre,
                  tipo: 'Certificado de curso',
                  ambito: 'curso',
                  fraseCompletado: 'ha completado satisfactoriamente el curso',
                  titulo: curso.titulo,
                  detalle: `${avance.modulosTotales} ${avance.modulosTotales === 1 ? 'módulo' : 'módulos'} · ${avance.leccionesTotales} lecciones · nivel ${curso.nivel.toLowerCase()}`,
                  aviso: curso.avisoCertificado,
                  inicioEn: datos.inicioEn,
                  completadoEn: datos.completadoEn,
                  tiempoActivoSeg: datos.tiempoSeg > 0 ? datos.tiempoSeg : null,
                  diasActivos: 0,
                  codigo,
                }}
              />
            ) : (
              <p className="text-slate-400" role="status">
                Preparando tu certificado…
              </p>
            )}
          </div>

          <p className="no-imprimir mt-4 text-xs leading-relaxed text-slate-400">
            Es una constancia de participación de {NOMBRE_ACADEMIA}: no es un título ni una credencial oficial, y el código de constancia identifica este documento pero no se verifica en ningún servidor. La duración cuenta desde que abriste la primera lección del curso hasta que completaste la última; el tiempo de estudio activo suma solo los momentos con la página visible y actividad reciente dentro del curso (si avanzaste antes de que existieran los certificados de curso, aparece como «No registrado»). {curso.avisoCertificado ?? ''}
          </p>
        </>
      )}

      <EditarNombreDialogo abierto={editando} onCerrar={() => setEditando(false)} />
    </div>
  )
}
