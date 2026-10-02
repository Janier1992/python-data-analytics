import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { iniciales } from '../lib/auth'
import { useAccountStore, useCuentaActual } from '../state/accountStore'
import { useProgressStore } from '../state/progressStore'
import { Boton, Campo, Dialogo } from './ui'

type Accion = 'nombre' | 'reiniciar' | 'eliminar' | null

export function UserMenu() {
  const cuenta = useCuentaActual()
  const cerrarSesion = useAccountStore((s) => s.cerrarSesion)
  const actualizarNombre = useAccountStore((s) => s.actualizarNombre)
  const eliminarCuenta = useAccountStore((s) => s.eliminarCuenta)
  const resetProgreso = useProgressStore((s) => s.resetProgreso)
  const navigate = useNavigate()

  const [abierto, setAbierto] = useState(false)
  const [accion, setAccion] = useState<Accion>(null)
  const [nombre, setNombre] = useState('')
  const [errorNombre, setErrorNombre] = useState<string | undefined>()
  const contenedorRef = useRef<HTMLDivElement>(null)
  const cerrarDialogo = useCallback(() => setAccion(null), [])

  useEffect(() => {
    if (!abierto) return
    const fuera = (e: MouseEvent) => {
      if (!contenedorRef.current?.contains(e.target as Node)) setAbierto(false)
    }
    const escape = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false)
    document.addEventListener('mousedown', fuera)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('mousedown', fuera)
      document.removeEventListener('keydown', escape)
    }
  }, [abierto])

  if (!cuenta) return null

  function abrir(a: Accion) {
    setAbierto(false)
    if (a === 'nombre') {
      setNombre(cuenta!.nombre)
      setErrorNombre(undefined)
    }
    setAccion(a)
  }

  function guardarNombre(e: FormEvent) {
    e.preventDefault()
    const r = actualizarNombre(nombre)
    if (!r.ok) {
      setErrorNombre(r.error)
      return
    }
    setAccion(null)
  }

  async function salir() {
    setAbierto(false)
    await cerrarSesion()
    navigate('/ingresar', { replace: true })
  }

  const itemClase =
    'block w-full rounded-md px-3 py-2 text-left text-sm text-slate-200 hover:bg-surface focus-visible:bg-surface focus-visible:outline-none'

  return (
    <div ref={contenedorRef} className="relative">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={abierto}
        aria-label={`Menú de ${cuenta.nombre}`}
        className="flex items-center gap-2 rounded-full border border-surface-border bg-surface-raised py-1 pl-1 pr-3 transition hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-emerald-500 text-xs font-bold text-white">
          {iniciales(cuenta.nombre)}
        </span>
        <span className="hidden max-w-[10rem] truncate text-sm font-medium text-slate-200 sm:block">{cuenta.nombre.split(' ')[0]}</span>
        <svg className="h-3 w-3 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M5.5 7.5L10 12l4.5-4.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {abierto && (
        <div role="menu" className="absolute right-0 z-40 mt-2 w-64 rounded-xl border border-surface-border bg-surface-raised p-2 shadow-2xl">
          <div className="border-b border-surface-border px-3 pb-2 pt-1">
            <p className="truncate text-sm font-semibold text-slate-100">{cuenta.nombre}</p>
            <p className="truncate text-xs text-slate-400">{cuenta.email}</p>
          </div>
          <div className="pt-1">
            <Link role="menuitem" to="/certificado" onClick={() => setAbierto(false)} className={itemClase}>
              🎓 Mi certificado
            </Link>
            <button role="menuitem" type="button" onClick={() => abrir('nombre')} className={itemClase}>
              ✏️ Editar mi nombre
            </button>
            <button role="menuitem" type="button" onClick={salir} className={itemClase}>
              ↩︎ Cerrar sesión
            </button>
            <div className="my-1 border-t border-surface-border" />
            <button role="menuitem" type="button" onClick={() => abrir('reiniciar')} className={`${itemClase} text-amber-300`}>
              Reiniciar mi progreso
            </button>
            <button role="menuitem" type="button" onClick={() => abrir('eliminar')} className={`${itemClase} text-red-300`}>
              Eliminar mi cuenta
            </button>
          </div>
        </div>
      )}

      <Dialogo
        abierto={accion === 'nombre'}
        titulo="Editar mi nombre"
        descripcion="Este es el nombre completo que aparecerá en tu certificado."
        onCerrar={cerrarDialogo}
      >
        <form onSubmit={guardarNombre} className="space-y-4">
          <Campo etiqueta="Nombre completo" autoComplete="name" value={nombre} onChange={(e) => setNombre(e.target.value)} error={errorNombre} />
          <div className="flex justify-end gap-2">
            <Boton variante="fantasma" onClick={cerrarDialogo}>
              Cancelar
            </Boton>
            <Boton type="submit">Guardar</Boton>
          </div>
        </form>
      </Dialogo>

      <Dialogo
        abierto={accion === 'reiniciar'}
        titulo="¿Reiniciar tu progreso?"
        descripcion="Se borrarán tus lecciones completadas, puntajes y el tiempo acumulado, y el programa volverá a empezar desde hoy. Tu cuenta se conserva."
        onCerrar={cerrarDialogo}
      >
        <div className="flex justify-end gap-2">
          <Boton variante="fantasma" onClick={cerrarDialogo}>
            Cancelar
          </Boton>
          <Boton
            variante="peligro"
            onClick={() => {
              resetProgreso()
              setAccion(null)
              navigate('/curso')
            }}
          >
            Sí, reiniciar
          </Boton>
        </div>
      </Dialogo>

      <Dialogo
        abierto={accion === 'eliminar'}
        titulo="¿Eliminar tu cuenta?"
        descripcion="Se borrarán tu cuenta y todo tu progreso de este navegador. Esta acción no se puede deshacer."
        onCerrar={cerrarDialogo}
      >
        <div className="flex justify-end gap-2">
          <Boton variante="fantasma" onClick={cerrarDialogo}>
            Cancelar
          </Boton>
          <Boton
            variante="peligro"
            onClick={async () => {
              setAccion(null)
              await eliminarCuenta()
              navigate('/ingresar', { replace: true })
            }}
          >
            Sí, eliminar mi cuenta
          </Boton>
        </div>
      </Dialogo>
    </div>
  )
}
