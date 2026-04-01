import { Search, MapPin, Clock, Tag, Home, BookOpen } from 'lucide-react'
import clsx from 'clsx'
import { groupTasksByDate, formatDate } from '../data/mockData'

const statusConfig = {
  started:   { label: 'Commencé',  dot: 'bg-amber-400',  ring: 'ring-amber-200',  text: 'text-amber-700',  bg: 'bg-amber-50'  },
  pending:   { label: 'En attente', dot: 'bg-slate-300', ring: 'ring-slate-200',  text: 'text-slate-500',  bg: 'bg-slate-50'  },
  done:      { label: 'Terminé',   dot: 'bg-emerald-400', ring: 'ring-emerald-200', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  home:      { label: 'Home',      dot: 'bg-sky-400',    ring: 'ring-sky-200',    text: 'text-sky-700',    bg: 'bg-sky-50'    },
  education: { label: 'Formation', dot: 'bg-purple-400', ring: 'ring-purple-200', text: 'text-purple-700', bg: 'bg-purple-50' },
}

function TaskCard({ task, isActive, onClick }) {
  const cfg = statusConfig[task.status] || statusConfig.pending
  const isHome = task.status === 'home'
  const isEdu  = task.status === 'education'

  return (
    <button
      onClick={() => onClick(task)}
      className={clsx(
        'w-full text-left rounded-xl border px-3.5 py-3 transition-all duration-150 group',
        isActive
          ? 'border-brand-300 bg-brand-50 shadow-md ring-1 ring-brand-200'
          : 'border-slate-100 bg-white hover:border-brand-200 hover:shadow-card-hover',
      )}
    >
      {isHome ? (
        <div className="flex items-center gap-2 text-sky-600">
          <Home size={16} />
          <span className="font-semibold text-sm">HOME</span>
          <span className="ml-auto text-xs text-slate-400">{task.timeStart} – {task.timeEnd}</span>
        </div>
      ) : isEdu ? (
        <>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={14} className="text-purple-500 shrink-0" />
            <span className="font-semibold text-sm text-slate-800">{task.company}</span>
            <span className={clsx('ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full', cfg.bg, cfg.text)}>
              {cfg.label}
            </span>
          </div>
          {task.subject && (
            <p className="text-xs text-slate-600 mb-1 ml-5">{task.subject}</p>
          )}
          {task.location && (
            <div className="flex items-center gap-1 ml-5 text-xs text-slate-400">
              <MapPin size={11} />
              <span>{task.location}</span>
            </div>
          )}
          <div className="flex items-center gap-1 ml-5 mt-1 text-xs text-slate-400">
            <Clock size={11} />
            <span>{task.timeStart} – {task.timeEnd}</span>
          </div>
        </>
      ) : (
        <>
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <span className="text-xs font-bold text-brand-700 tracking-wide">{task.jobNr}</span>
              <span className="text-slate-400 text-xs mx-1">·</span>
              <span className="text-xs text-slate-500">{task.objectId}</span>
            </div>
            <span className={clsx(
              'w-2.5 h-2.5 rounded-full shrink-0 mt-0.5',
              cfg.dot,
              isActive && 'ring-2 ' + cfg.ring,
            )} />
          </div>

          {/* Company */}
          <p className="font-semibold text-sm text-slate-800 leading-tight">{task.company}</p>

          {/* Equipment / categories */}
          {task.equipmentCode && (
            <p className="text-xs text-slate-500 mt-0.5">{task.equipmentCode}</p>
          )}
          {task.categories.length > 0 && (
            <div className="flex items-center gap-1 mt-1 flex-wrap">
              {task.categories.map(cat => (
                <span key={cat} className="text-[10px] bg-slate-100 text-slate-500 rounded px-1.5 py-0.5 font-medium">
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Subject */}
          {task.subject && (
            <p className="text-xs text-slate-600 mt-1.5 font-medium">{task.subject}</p>
          )}

          {/* Time */}
          <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
            <Clock size={11} />
            <span>{task.timeStart} – {task.timeEnd}</span>
          </div>
        </>
      )}
    </button>
  )
}

function DateHeader({ dateStr, count }) {
  return (
    <div className="flex items-center gap-2 px-1 pt-3 pb-1.5">
      <span className="text-xs font-semibold text-brand-700 capitalize">{formatDate(dateStr)}</span>
      <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-brand-600 text-white text-[10px] font-bold">
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
    <div className="flex flex-col w-[320px] shrink-0 bg-slate-50 border-r border-slate-200 overflow-hidden">
      {/* Search bar */}
      <div className="p-3 border-b border-slate-200 bg-white">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Recherche…"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-300 transition"
          />
        </div>
      </div>

      {/* Task groups */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {Object.entries(grouped).map(([date, dateTasks]) => (
          <div key={date}>
            <DateHeader dateStr={date} count={dateTasks.length} />
            <div className="flex flex-col gap-2">
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
