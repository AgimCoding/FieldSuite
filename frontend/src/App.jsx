import { useState } from 'react'
import LoginPage from './components/LoginPage'
import Sidebar from './components/Sidebar'
import TaskList from './components/TaskList'
import OrderDetails from './components/OrderDetails'
import { tasks } from './data/mockData'

export default function App() {
  const [user, setUser]               = useState(null)
  const [activeNav, setActiveNav]     = useState('filter')
  const [selectedTask, setSelectedTask] = useState(tasks[0])
  const [searchQuery, setSearchQuery] = useState('')

  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

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
      <OrderDetails task={selectedTask} />
    </div>
  )
}
