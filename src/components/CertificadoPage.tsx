import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { NOMBRE_ACADEMIA, NOMBRE_PROGRAMA } from '../brand'
import { cursos, leccionesCertificables, leccionesDeCurso, moduloLeccionesCertificablesMap, todasLasLecciones } from '../content/curriculum'
import { avanceCertificado, codigoDeConstancia, diasDeEstudio } from '../lib/certificado'
import { useCuentaActual } from '../state/accountStore'
import { useProgressStore } from '../state/progressStore'
import { Certificado } from './CertificadoLienzo'
import { EditarNombreDialogo } from './EditarNombreDialogo'
import { BarraProgreso, Boton, Tarjeta } from './ui'

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
  // Cursos que cuentan para el certificado y aún tienen lecciones pendientes
  const pendientes = cursos
    .filter((c) => c.certifica !== false && !c.proximamente)
    .map((c) => ({ curso: c, lecciones: leccionesDeCurso(c.id) }))
    .filter(({ lecciones }) => lecciones.some((id) => !completedLessons.includes(id)))

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
                <h2 className="text-xl font-bold text-slate-50">Aún no has completado los cursos del certificado</h2>
                <p className="mt-1 text-slate-300">
                  Al completar los cursos marcados con «AI Academy» ({avance.leccionesTotales} lecciones, aprobando la verificación de cada una con 70 % o más) recibirás un certificado de finalización de {NOMBRE_ACADEMIA} con tu nombre completo y el tiempo que tardaste.
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
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Cursos con lecciones pendientes</h2>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {pendientes.map(({ curso, lecciones }) => {
                  const hechas = lecciones.filter((id) => completedLessons.includes(id)).length
                  return (
                    <li key={curso.id} className="min-w-0">
                      <Link to={`/cursos/${curso.id}`} className="flex min-w-0 items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-surface">
                        <span className="min-w-0 truncate">
                          {curso.icono} {curso.titulo}
                        </span>
                        <span className="shrink-0 text-xs text-slate-400">
                          {hechas}/{lecciones.length}
                        </span>
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
                  tipo: 'Certificado de finalización',
                  ambito: 'programa',
                  fraseCompletado: 'ha completado satisfactoriamente el programa',
                  titulo: NOMBRE_PROGRAMA,
                  detalle: `${avance.modulosTotales} módulos · ${avance.leccionesTotales} lecciones · ejercicios de código, evaluaciones y proyectos integradores`,
                  inicioEn: inicioEn!,
                  completadoEn: completadoEn!,
                  tiempoActivoSeg,
                  diasActivos: diasDeEstudio(diasActivos),
                  codigo,
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
