import TasksPage from './pages/TasksPage'
import useTasks from './hooks/useTasks'

function App() {
  const {
    tasks,
    loading,
    error,
    pendingTasks,
    completedTasks,
    createTask,
    toggleTask,
    deleteTask,
  } = useTasks()

  return (
    <TasksPage
      tasks={tasks}
      loading={loading}
      error={error}
      pendingTasks={pendingTasks}
      completedTasks={completedTasks}
      onCreate={createTask}
      onToggle={toggleTask}
      onDelete={deleteTask}
    />
  )
}

export default App
