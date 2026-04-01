import { Search, MapPin, Clock, Home, BookOpen } from 'lucide-react'
import clsx from 'clsx'
import { groupTasksByDate, formatDate } from '../data/mockData'

const statusConfig = {
  started:   { label: 'Commencé',   dot: 'bg-amber-400',   ring: 'ring-amber-200',   text: 'text-amber-700',   bg: 'bg-amber-50'   },
  pending:   { label: 'En attente', dot: 'bg-slate-300',   ring: 'ring-slate-200',   text: 'text-slate-500',   bg: 'bg-slate-50'   },
  done:      { label: 'Terminé',    dot: 'bg-emerald-400', ring: 'ring-emerald-200', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  home:      { label: 'Home',       dot: 'bg-sky-400',     ring: 'ring-sky-200',     text: 'text-sky-700',     bg: 'bg-sky-50'     },
  education: { label: 'Formation',  dot: 'bg-purple-400',  ring: 'ring-purple-200',  text: 'text-purple-700',  bg: 'bg-purple-50'  },
}

function TaskCard({ task, isActive, onClick }) {
  const cfg = statusConfig[task.status] || statusConfig.pending
  const isHome = task.status === 'home'
  const isEdu  = task.status === 'education'

  return (
    <button
      onClick={() => onClick(task)}
      className={clsx(
        'w-full text-left rounded-2xl border px-4 py-4 transition-all duration-150',
        isActive
          ? 'border-brand-300 bg-brand-50 shadow-md ring-2 ring-brand-200'
          : 'border-slate-100 bg-white hover:border-brand-200 hover:shadow-card-hover',
      )}
    >
      {isHome ? (
        <div className="flex items-center gap-3 text-sky-600 min-h-[48px]">
          <Home size={22} />
          <span className="font-bold text-base">HOME</span>
          <span className="ml-auto text-sm text-slate-400">{task.timeStart} – {task.timeEnd}</span>
        </div>
      ) : isEdu ? (
        <>
          <div className="flex items-center gap-2.5 mb-2">
            <BookOpen size={18} className="text-purple-500 shrink-0" />
            <span className="font-bold text-base text-slate-800">{task.company}</span>
            <span className={clsx('ml-auto text-xs font-semibold px-2 py-1 rounded-full', cfg.bg, cfg.text)}>
              {cfg.label}
            </span>
          </div>
          {task.subject && (
            <p className="text-sm text-slate-600 mb-1.5 ml-7">{task.subject}</p>
          )}
          {task.location && (
            <div className="flex items-center gap-1.5 ml-7 text-sm text-slate-400">
              <MapPin size={14} />
              <span>{task.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 ml-7 mt-1.5 text-sm text-slate-400">
            <Clock size={14} />
            <span>{task.timeStart} – {task.timeEnd}</span>
          </div>
        </>
      ) : (
        <>
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-brand-700 tracking-wide">{task.jobNr}</span>
              <span className="text-slate-400 text-sm">·</span>
              <span className="text-sm text-slate-500">{task.objectId}</span>
            </div>
            <span className={clsx(
              'w-3.5 h-3.5 rounded-full shrink-0 mt-0.5',
              cfg.dot,
              isActive && 'ring-2 ' + cfg.ring,
            )} />
          </div>

          {/* Company */}
          <p className="font-bold text-base text-slate-800 leading-snug">{task.company}</p>

          {/* Equipment / categories */}
          {task.equipmentCode && (
            <p className="text-sm text-slate-500 mt-1">{task.equipmentCode}</p>
          )}
          {task.categories.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {task.categories.map(cat => (
                <span key={cat} className="text-xs bg-slate-100 text-slate-500 rounded-lg px-2 py-1 font-medium">
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Subject */}
          {task.subject && (
            <p className="text-sm text-slate-600 mt-2 font-medium">{task.subject}</p>
          )}

          {/* Time */}
          <div className="flex items-center gap-1.5 mt-3 text-sm text-slate-400">
            <Clock size={14} />
            <span>{task.timeStart} – {task.timeEnd}</span>
          </div>
        </>
      )}
    </button>
  )
}

function DateHeader({ dateStr, count }) {
  return (
    <div className="flex items-center gap-2 px-1 pt-4 pb-2">
      <span className="text-sm font-bold text-brand-700 capitalize">{formatDate(dateStr)}</span>
      <span className="ml-auto flex items-center justify-center w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-bold">
        {count}
      </span>
    </div>
  )
}

export default function TaskList({ tasks, selectedTask, onSelectTask, searchQuery, onSearchChange }) {
  const grouped = groupTasksByDate(
    tasks.filter(t =>
      t.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.jobNr && t.jobNr.includes(searchQuery)),
    ),
  )

  return (
    <div className="flex flex-col w-[580px] shrink-0 bg-slate-50 border-r border-slate-200 overflow-hidden">
      {/* Search bar */}
      <div className="p-3 border-b border-slate-200 bg-white">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Recherche…"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-base rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-300 transition"
          />
        </div>
      </div>

      {/* Task groups */}
      <div className="flex-1 overflow-y-auto px-3 pb-6">
        {Object.entries(grouped).map(([date, dateTasks]) => (
          <div key={date}>
            <DateHeader dateStr={date} count={dateTasks.length} />
            <div className="flex flex-col gap-2.5">
              {dateTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isActive={selectedTask?.id === task.id}
                  onClick={onSelectTask}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
