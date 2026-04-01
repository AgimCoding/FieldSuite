import { useState } from 'react'
import LoginPage from './components/LoginPage'
import Sidebar from './components/Sidebar'
import TaskList from './components/TaskList'
import OrderDetails from './components/OrderDetails'
import { tasks as initialTasks } from './data/mockData'

export default function App() {
  const [user, setUser]                 = useState(null)
  const [activeNav, setActiveNav]       = useState('filter')
  const [tasks, setTasks]               = useState(initialTasks)
  const [selectedTask, setSelectedTask] = useState(initialTasks[0])
  const [searchQuery, setSearchQuery]   = useState('')
  const [activeTaskId, setActiveTaskId] = useState(null) // task currently "started"

  const handleTaskAction = (action, task) => {
    const updateStatus = (id, status) => {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
      if (selectedTask?.id === id) {
        setSelectedTask(prev => ({ ...prev, status }))
      }
    }

    switch (action) {
      case 'start':
        if (activeTaskId && activeTaskId !== task.id) return // blocked
        updateStatus(task.id, 'started')
        setActiveTaskId(task.id)
        break
      case 'pause':
        updateStatus(task.id, 'pending')
        setActiveTaskId(null)
        break
      case 'finish':
        updateStatus(task.id, 'done')
        setActiveTaskId(null)
        break
      default:
        break
    }
  }

  if (!user) return <LoginPage onLogin={setUser} />

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 font-sans">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <TaskList
        tasks={tasks}
        selectedTask={selectedTask}
        onSelectTask={setSelectedTask}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <OrderDetails
        task={selectedTask}
        activeTaskId={activeTaskId}
        onTaskAction={handleTaskAction}
      />
    </div>
  )
}
