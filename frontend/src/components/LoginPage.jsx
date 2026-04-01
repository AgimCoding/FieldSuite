import { useState } from 'react'
import { User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import MotracLogo from './MotracLogo'

export default function LoginPage({ onLogin }) {
  const [username, setUsername]       = useState('')
  const [password, setPassword]       = useState('')
  const [showPass, setShowPass]       = useState(false)
  const [error, setError]             = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Veuillez entrer votre identifiant.')
      return
    }
    // Fake auth — any non-empty credentials work
    onLogin({ username })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header branding */}
        <div className="flex justify-center items-center bg-slate-100 px-8 py-8 border-b border-slate-200">
          <MotracLogo width={300} height={86} />
        </div>

        {/* Form */}
        <div className="px-8 py-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Connexion</h1>
          <p className="text-sm text-slate-400 mb-8">Accédez à votre espace FieldSuite</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Username */}
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Identifiant"
                value={username}
                onChange={e => { setUsername(e.target.value); setError('') }}
                className="w-full pl-11 pr-4 py-4 text-base rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-300 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Mot de passe"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                className="w-full pl-11 pr-12 py-4 text-base rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-300 transition"
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500 font-medium -mt-2">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="flex items-center justify-center gap-3 w-full py-4 mt-2 rounded-xl bg-brand-700 hover:bg-brand-800 active:bg-brand-900 text-white text-base font-bold transition-all duration-150 shadow-lg shadow-brand-200"
            >
              Suivant
              <ArrowRight size={20} />
            </button>

          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">FieldSuite © {new Date().getFullYear()} — Motrac</p>
        </div>
      </div>
    </div>
  )
}
