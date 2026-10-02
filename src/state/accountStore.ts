import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  hashearContrasena,
  nuevoId,
  normalizarEmail,
  normalizarNombre,
  validarNombre,
  verificarContrasena,
} from '../lib/auth'
import type { Cuenta, DatosRegistro } from '../lib/auth'
import { borrarProgresoDe, cargarProgresoDe, importarProgresoAnterior } from './progressStore'

type Resultado = { ok: true; progresoImportado?: boolean } | { ok: false; error: string; campo?: keyof DatosRegistro | 'general' }

interface AccountState {
  cuentas: Cuenta[]
  sesionId: string | null
}

interface AccountActions {
  registrar: (datos: Omit<DatosRegistro, 'confirmacion'>) => Promise<Resultado>
  iniciarSesion: (email: string, contrasena: string) => Promise<Resultado>
  cerrarSesion: () => Promise<void>
  actualizarNombre: (nombre: string) => Resultado
  eliminarCuenta: () => Promise<void>
}

export const useAccountStore = create<AccountState & AccountActions>()(
  persist(
    (set, get) => ({
      cuentas: [],
      sesionId: null,

      registrar: async ({ nombre, email, contrasena }) => {
        const emailNormalizado = normalizarEmail(email)
        if (get().cuentas.some((c) => c.email === emailNormalizado)) {
          return { ok: false, campo: 'email', error: 'Ya existe una cuenta con ese correo en este dispositivo. Inicia sesión.' }
        }
        let credenciales
        try {
          credenciales = await hashearContrasena(contrasena)
        } catch (e) {
          return { ok: false, campo: 'general', error: e instanceof Error ? e.message : 'No se pudo crear la cuenta.' }
        }
        const cuenta: Cuenta = {
          id: nuevoId(),
          nombre: normalizarNombre(nombre),
          email: emailNormalizado,
          ...credenciales,
          creadaEn: Date.now(),
        }
        // Si venía de la versión sin cuentas, su progreso pasa a la primera cuenta que se crea
        const progresoImportado = get().cuentas.length === 0 && importarProgresoAnterior(cuenta.id)
        set({ cuentas: [...get().cuentas, cuenta], sesionId: cuenta.id })
        await cargarProgresoDe(cuenta.id)
        return { ok: true, progresoImportado }
      },

      iniciarSesion: async (email, contrasena) => {
        const cuenta = get().cuentas.find((c) => c.email === normalizarEmail(email))
        // Mismo mensaje si el correo no existe o la contraseña falla (no revela qué correos hay)
        const errorCredenciales: Resultado = { ok: false, campo: 'general', error: 'Correo o contraseña incorrectos.' }
        if (!cuenta) {
          await hashearContrasena(contrasena).catch(() => undefined) // tiempo similar en ambos casos
          return errorCredenciales
        }
        let valida = false
        try {
          valida = await verificarContrasena(contrasena, cuenta)
        } catch (e) {
          return { ok: false, campo: 'general', error: e instanceof Error ? e.message : 'No se pudo iniciar sesión.' }
        }
        if (!valida) return errorCredenciales
        set({ sesionId: cuenta.id })
        await cargarProgresoDe(cuenta.id)
        return { ok: true }
      },

      cerrarSesion: async () => {
        set({ sesionId: null })
        await cargarProgresoDe(null)
      },

      actualizarNombre: (nombre) => {
        const error = validarNombre(nombre)
        if (error) return { ok: false, campo: 'nombre', error }
        const { sesionId, cuentas } = get()
        set({ cuentas: cuentas.map((c) => (c.id === sesionId ? { ...c, nombre: normalizarNombre(nombre) } : c)) })
        return { ok: true }
      },

      eliminarCuenta: async () => {
        const { sesionId, cuentas } = get()
        if (!sesionId) return
        borrarProgresoDe(sesionId)
        set({ cuentas: cuentas.filter((c) => c.id !== sesionId), sesionId: null })
        await cargarProgresoDe(null)
      },
    }),
    { name: 'ai-academy-cuentas', version: 1 },
  ),
)

/** Cuenta con la sesión iniciada, si la hay. */
export const useCuentaActual = (): Cuenta | null =>
  useAccountStore((s) => s.cuentas.find((c) => c.id === s.sesionId) ?? null)
