import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TaskList from './components/TaskList'
import OrderDetails from './components/OrderDetails'
import { tasks } from './data/mockData'

export default function App() {
  const [activeNav, setActiveNav]       = useState('filter')
  const [selectedTask, setSelectedTask] = useState(tasks[0])
  const [searchQuery, setSearchQuery]   = useState('')

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
