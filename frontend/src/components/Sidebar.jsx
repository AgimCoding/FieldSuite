import {
  SlidersHorizontal,
  CirclePlus,
  Wrench,
  Users,
  CalendarDays,
  LayoutGrid,
  Home,
} from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { icon: SlidersHorizontal, label: 'Filtre',         id: 'filter'   },
  { icon: CirclePlus,        label: 'Nouvelle tâche', id: 'new-task' },
  { icon: Wrench,            label: 'Service',        id: 'service'  },
  { icon: Users,             label: 'Règle horraire', id: 'team'     },
  { icon: CalendarDays,      label: 'Planning',       id: 'planning' },
  { icon: LayoutGrid,        label: 'Menu',           id: 'menu'     },
  { icon: Home,              label: 'Accueil',        id: 'home'     },
]

export default function Sidebar({ activeNav, onNavChange }) {
  return (
    <aside className="flex flex-col items-center w-40 bg-white border-r border-slate-200 shadow-sm py-4 gap-1 shrink-0">
      {/* Logo */}
      <div className="mb-5 flex items-center justify-center w-12 h-12 rounded-xl bg-brand-700">
        <span className="text-white font-bold text-base">FS</span>
      </div>

      <div className="flex flex-col items-center gap-2 w-full px-2">
        {navItems.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => onNavChange(id)}
            title={label}
            className={clsx(
              'group flex flex-col items-center justify-center w-full rounded-2xl py-6 px-2 gap-3 transition-all duration-150 min-h-[100px]',
              activeNav === id
                ? 'bg-brand-50 text-brand-700'
                : 'text-slate-500 hover:bg-slate-50 hover:text-brand-700',
            )}
          >
            <Icon size={36} strokeWidth={activeNav === id ? 2.2 : 1.8} />
            <span className="text-sm font-semibold leading-tight text-center">{label}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}
