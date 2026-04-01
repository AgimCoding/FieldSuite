import { useState } from 'react'
import {
  ChevronDown,
  Phone,
  Mail,
  Package,
  Tag,
  Hash,
  FileText,
  ListOrdered,
  ParkingSquare,
  PauseCircle,
  RefreshCw,
  ArrowRight,
} from 'lucide-react'
import clsx from 'clsx'

const statusStyle = {
  'Commencé':   'bg-amber-100 text-amber-700 border border-amber-200',
  'En attente': 'bg-slate-100 text-slate-600 border border-slate-200',
  'Terminé':    'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'Planifié':   'bg-blue-100 text-blue-700 border border-blue-200',
  'Formation':  'bg-purple-100 text-purple-700 border border-purple-200',
}

function Section({ title, defaultOpen = true, children, icon: Icon }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 transition text-left min-h-[44px]"
      >
        {Icon && <Icon size={17} className="text-brand-600 shrink-0" />}
        <span className="text-sm font-bold text-brand-700 uppercase tracking-wider flex-1">{title}</span>
        <ChevronDown
          size={17}
          className={clsx('text-slate-400 transition-transform duration-200', !open && '-rotate-90')}
        />
      </button>
      {open && <div className="px-3 py-3">{children}</div>}
    </div>
  )
}

function InfoRow({ label, value, highlight }) {
  if (!value) return null
  return (
    <div className="flex gap-2 py-2 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500 w-32 shrink-0">{label}</span>
      <span className={clsx('text-sm font-semibold text-slate-800 flex-1', highlight && 'text-brand-600')}>{value}</span>
    </div>
  )
}

const actionButtons = [
  { icon: ListOrdered,  label: 'Ordres',         id: 'orders',    color: 'text-brand-700'   },
  { icon: ParkingSquare, label: 'Parking ordre', id: 'parking',   color: 'text-slate-600'   },
  { icon: PauseCircle,  label: 'Interrompre',    id: 'interrupt', color: 'text-red-500'     },
  { icon: RefreshCw,    label: 'Synchroniser',   id: 'sync',      color: 'text-emerald-600' },
  { icon: ArrowRight,   label: 'Suivant',        id: 'next',      color: 'text-brand-700'   },
]

export default function OrderDetails({ task }) {
  if (!task || task.status === 'home') {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center text-slate-400">
          <FileText size={52} className="mx-auto mb-4 opacity-30" />
          <p className="text-base">Sélectionnez une tâche</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 min-w-0 overflow-hidden">
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-white">
          <div>
            <h2 className="text-base font-bold text-slate-800 leading-tight">Détails d'ordre</h2>
            {task.orderId && (
              <p className="text-xs text-slate-400 mt-0.5">{task.orderId}</p>
            )}
          </div>
          {task.state && (
            <span className={clsx('ml-auto text-xs font-bold px-2.5 py-1 rounded-full', statusStyle[task.state] || statusStyle['En attente'])}>
              {task.state}
            </span>
          )}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-3 py-3">

          {/* Détail de l'ordre */}
          <Section title="Détail de l'ordre" icon={FileText}>
            <InfoRow label="No d'ordre"   value={task.orderId}   highlight />
            <InfoRow label="Type d'ordre" value={task.orderType} />
            <InfoRow label="Planning"     value={task.planning} />
            <InfoRow label="État"         value={task.state} />
            <InfoRow label="Nom"          value={task.company} />
            {task.address && (
              <div className="flex gap-2 py-2 border-b border-slate-100">
                <span className="text-sm text-slate-500 w-32 shrink-0">Adresse</span>
                <span className="text-sm font-semibold text-slate-800 flex-1 whitespace-pre-line">{task.address}</span>
              </div>
            )}
            <InfoRow label="Contact" value={task.contact} />
            {task.phone && (
              <div className="flex gap-2 py-1.5 border-b border-slate-100 items-center">
                <span className="text-sm text-slate-500 w-32 shrink-0">Numéro téléphone</span>
                <a href={`tel:${task.phone}`} className="text-sm font-semibold text-brand-600 hover:underline flex items-center gap-1.5">
                  <Phone size={14} />
                  {task.phone}
                </a>
              </div>
            )}
            <div className="flex gap-2 py-2 border-b border-slate-100">
              <span className="text-sm text-slate-500 w-32 shrink-0">SMS autorisé</span>
              <span className={clsx('text-sm font-semibold', task.smsAllowed ? 'text-emerald-600' : 'text-slate-500')}>
                {task.smsAllowed ? 'Oui' : 'Non'}
              </span>
            </div>
            {task.email && (
              <div className="flex gap-2 py-2 items-center">
                <span className="text-sm text-slate-500 w-32 shrink-0">E-mail</span>
                <a href={`mailto:${task.email}`} className="text-sm font-semibold text-brand-600 hover:underline flex items-center gap-1.5">
                  <Mail size={14} />
                  {task.email}
                </a>
              </div>
            )}
          </Section>

          {/* Properties */}
          {(task.jobNr || task.subject) && (
            <Section title="Properties" icon={Tag}>
              <InfoRow label="Jobnr."  value={task.jobNr} />
              <InfoRow label="Subject" value={task.subject} />
            </Section>
          )}

          {/* Articles réservés */}
          {task.articles && task.articles.length > 0 && (
            <Section title="Articles réservés" icon={Package}>
              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 uppercase text-xs tracking-wide">
                      <th className="text-left pb-3 pr-3 font-bold">Qté</th>
                      <th className="text-left pb-3 pr-3 font-bold">Unité</th>
                      <th className="text-left pb-3 pr-3 font-bold">Code</th>
                      <th className="text-left pb-3 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {task.articles.map((a, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        <td className="py-2.5 pr-3 font-bold text-slate-700">{a.qty}</td>
                        <td className="py-2.5 pr-3 text-slate-500">{a.unit}</td>
                        <td className="py-2.5 pr-3 font-mono text-slate-600">{a.code}</td>
                        <td className="py-2.5 text-slate-700">{a.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {/* Détails de l'objet */}
          {task.objectDetails && (
            <Section title="Détails de l'objet" icon={Hash}>
              <InfoRow label="Code"         value={task.objectDetails.code} />
              <InfoRow label="Nom"          value={task.objectDetails.name} />
              <InfoRow label="Localisation" value={task.objectDetails.localisation} />
              <InfoRow label="Code barres"  value={task.objectDetails.barcode} />
              <InfoRow label="Description"  value={task.objectDetails.description} />
            </Section>
          )}
        </div>
      </div>

      {/* Right action rail */}
      <div className="flex flex-col items-center gap-2 w-40 bg-slate-50 border-l border-slate-200 py-4 px-2 shrink-0">
        {actionButtons.map(({ icon: Icon, label, id, color }) => (
          <button
            key={id}
            title={label}
            className="flex flex-col items-center justify-center w-full rounded-2xl py-6 px-2 gap-3 hover:bg-white hover:shadow-card transition-all duration-150 text-center min-h-[100px]"
          >
            <Icon size={36} className={color} strokeWidth={1.8} />
            <span className="text-sm text-slate-500 font-semibold leading-tight">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
