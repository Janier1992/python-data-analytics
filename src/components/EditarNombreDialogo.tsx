import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAccountStore, useCuentaActual } from '../state/accountStore'
import { Boton, Campo, Dialogo } from './ui'

/** Diálogo para corregir el nombre completo que aparece en el certificado. */
export function EditarNombreDialogo({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const cuenta = useCuentaActual()
  const actualizarNombre = useAccountStore((s) => s.actualizarNombre)
  const [nombre, setNombre] = useState('')
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    if (abierto) {
      setNombre(cuenta?.nombre ?? '')
      setError(undefined)
    }
  }, [abierto, cuenta?.nombre])

  function guardar(e: FormEvent) {
    e.preventDefault()
    const r = actualizarNombre(nombre)
    if (!r.ok) {
      setError(r.error)
      return
    }
    onCerrar()
  }

  return (
    <Dialogo abierto={abierto} titulo="Editar mi nombre" descripcion="Este es el nombre completo que aparecerá en tu certificado." onCerrar={onCerrar}>
      <form onSubmit={guardar} className="space-y-4">
        <Campo etiqueta="Nombre completo" autoComplete="name" value={nombre} onChange={(e) => setNombre(e.target.value)} error={error} />
        <div className="flex justify-end gap-2">
          <Boton variante="fantasma" onClick={onCerrar}>
            Cancelar
          </Boton>
          <Boton type="submit">Guardar</Boton>
        </div>
      </form>
    </Dialogo>
  )
}
