import { Link } from 'react-router-dom'
import { Logo } from './ui'

export function NotFound() {
  return (
    <div className="mx-auto grid min-h-screen max-w-md place-items-center px-6 text-center">
      <div>
        <Logo />
        <p className="mt-8 text-6xl font-extrabold text-brand-400">404</p>
        <h1 className="mt-2 text-xl font-bold text-slate-100">No encontramos esa página</h1>
        <p className="mt-2 text-slate-400">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
        <Link
          to="/curso"
          className="mt-6 inline-flex rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          Volver al curso
        </Link>
      </div>
    </div>
  )
}
