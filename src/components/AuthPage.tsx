import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { NOMBRE_ACADEMIA, NOMBRE_PROGRAMA } from '../brand'
import { curriculum, todasLasLecciones } from '../content/curriculum'
import { validarRegistro } from '../lib/auth'
import type { ErroresRegistro } from '../lib/auth'
import { useAccountStore } from '../state/accountStore'
import { Boton, Campo, Logo } from './ui'

type Modo = 'crear' | 'ingresar'

const BENEFICIOS = [
  [`${curriculum.length} módulos, ${todasLasLecciones.length} lecciones`, 'De la estadística descriptiva a la ciencia de datos, con SQL, Git y BI y proyectos de portafolio.'],
  ['Python real en tu navegador', 'Ejercicios con validación automática, sin instalar nada.'],
  ['Guía de referencia', 'Funciones, parámetros y sentencias SQL explicadas, siempre a la mano.'],
  ['Certificado de finalización', 'Con tu nombre completo y el tiempo que te tomó completar el programa.'],
]

export function AuthPage() {
  const sesionId = useAccountStore((s) => s.sesionId)
  const hayCuentas = useAccountStore((s) => s.cuentas.length > 0)
  const registrar = useAccountStore((s) => s.registrar)
  const iniciarSesion = useAccountStore((s) => s.iniciarSesion)
  const navigate = useNavigate()
  const ubicacion = useLocation()
  const destino = (ubicacion.state as { desde?: string } | null)?.desde ?? '/curso'

  const [modo, setModo] = useState<Modo>(hayCuentas ? 'ingresar' : 'crear')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [confirmacion, setConfirmacion] = useState('')
  const [errores, setErrores] = useState<ErroresRegistro & { general?: string }>({})
  const [enviando, setEnviando] = useState(false)

  if (sesionId) return <Navigate to={destino} replace />

  function cambiarModo(nuevo: Modo) {
    setModo(nuevo)
    setErrores({})
  }

  async function enviar(e: FormEvent) {
    e.preventDefault()
    if (enviando) return
    setErrores({})

    if (modo === 'crear') {
      const invalidos = validarRegistro({ nombre, email, contrasena, confirmacion })
      if (Object.keys(invalidos).length > 0) {
        setErrores(invalidos)
        return
      }
      setEnviando(true)
      const r = await registrar({ nombre, email, contrasena })
      setEnviando(false)
      if (!r.ok) {
        setErrores({ [r.campo ?? 'general']: r.error })
        return
      }
      // Protegida lleva al diagnóstico inicial si la cuenta aún no lo ha hecho (o salta si se importó progreso)
      navigate('/curso', { replace: true })
      return
    }

    if (!email.trim() || !contrasena) {
      setErrores({ general: 'Escribe tu correo y tu contraseña.' })
      return
    }
    setEnviando(true)
    const r = await iniciarSesion(email, contrasena)
    setEnviando(false)
    if (!r.ok) {
      setErrores({ general: r.error })
      return
    }
    navigate(destino, { replace: true })
  }

  return (
    <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-2">
      <section aria-labelledby="titulo-bienvenida" className="order-2 lg:order-1">
        <Logo />
        <h1 id="titulo-bienvenida" className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-50 sm:text-4xl">
          Aprende Python, datos e IA <span className="text-brand-400">a tu ritmo</span>
        </h1>
        <p className="mt-3 max-w-lg text-slate-300">
          {NOMBRE_ACADEMIA} es un programa interactivo: <strong className="font-semibold text-slate-100">{NOMBRE_PROGRAMA}</strong>.
          Crea tu cuenta, guarda tu progreso y recibe un certificado al terminar.
        </p>
        <ul className="mt-6 space-y-4">
          {BENEFICIOS.map(([titulo, detalle]) => (
            <li key={titulo} className="flex gap-3">
              <span aria-hidden="true" className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-xs text-emerald-300">
                ✓
              </span>
              <span>
                <span className="block font-medium text-slate-100">{titulo}</span>
                <span className="block text-sm text-slate-400">{detalle}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Acceso" className="order-1 lg:order-2">
        <div className="rounded-2xl border border-surface-border bg-surface-raised/80 p-6 shadow-glow sm:p-8">
          <div role="tablist" aria-label="Tipo de acceso" className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-surface p-1">
            {(['crear', 'ingresar'] as const).map((m) => (
              <button
                key={m}
                role="tab"
                type="button"
                aria-selected={modo === m}
                onClick={() => cambiarModo(m)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                  modo === m ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {m === 'crear' ? 'Crear cuenta' : 'Iniciar sesión'}
              </button>
            ))}
          </div>

          <form onSubmit={enviar} noValidate className="space-y-4">
            <h2 className="text-xl font-bold text-slate-50">{modo === 'crear' ? 'Empieza hoy' : 'Bienvenido de nuevo'}</h2>

            {modo === 'crear' && (
              <Campo
                etiqueta="Nombre completo"
                autoComplete="name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                error={errores.nombre}
                ayuda="Así aparecerá en tu certificado."
                placeholder="Ana María Pérez"
                autoFocus
              />
            )}
            <Campo
              etiqueta="Correo electrónico"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errores.email}
              placeholder="nombre@correo.com"
              autoFocus={modo === 'ingresar'}
            />
            <Campo
              etiqueta="Contraseña"
              type="password"
              autoComplete={modo === 'crear' ? 'new-password' : 'current-password'}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              error={errores.contrasena}
              ayuda={modo === 'crear' ? 'Mínimo 8 caracteres, con letras y números.' : undefined}
            />
            {modo === 'crear' && (
              <Campo
                etiqueta="Confirmar contraseña"
                type="password"
                autoComplete="new-password"
                value={confirmacion}
                onChange={(e) => setConfirmacion(e.target.value)}
                error={errores.confirmacion}
              />
            )}

            {errores.general && (
              <p role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {errores.general}
              </p>
            )}

            <Boton type="submit" cargando={enviando} className="w-full">
              {enviando ? (modo === 'crear' ? 'Creando cuenta…' : 'Entrando…') : modo === 'crear' ? 'Crear mi cuenta' : 'Entrar'}
            </Boton>

            <p className="text-center text-sm text-slate-400">
              {modo === 'crear' ? '¿Ya tienes cuenta?' : '¿Primera vez aquí?'}{' '}
              <button type="button" onClick={() => cambiarModo(modo === 'crear' ? 'ingresar' : 'crear')} className="font-medium text-brand-400 underline-offset-2 hover:underline">
                {modo === 'crear' ? 'Inicia sesión' : 'Crea tu cuenta'}
              </button>
            </p>
          </form>

          <p className="mt-5 rounded-lg bg-surface px-3 py-2.5 text-xs leading-relaxed text-slate-400">
            🔒 Tu cuenta y tu progreso se guardan <strong className="font-medium text-slate-300">solo en este navegador</strong>, protegidos con
            una contraseña cifrada. No se envían a ningún servidor. Si borras los datos del navegador o cambias de dispositivo,
            tendrás que empezar de nuevo.
          </p>
        </div>
      </section>
    </div>
  )
}
