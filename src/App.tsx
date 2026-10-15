import { useEffect, useState } from 'react'
import TaskCard from './components/TaskCard'
import TaskForm from './components/TaskForm'
import { tasksService, type Task } from './services/tasks'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await tasksService.list()
        setTasks(data)
      } catch {
        setError('Não foi possível carregar as tarefas.')
      } finally {
        setLoading(false)
      }
    }

    void loadTasks()
  }, [])
  
  
  async function toggleTask(id: number) {
    const currentTask = tasks.find(task => task.id === id)

    if (!currentTask) {
      return
    }

    try {
      setError(null)

      const updatedTask = await tasksService.update(id, {
        completed: !currentTask.completed,
      })

      setTasks(previousTasks =>
        previousTasks.map(task =>
          task.id === id ? updatedTask : task,
        ),
      )
    } catch {
      setError('Não foi possível atualizar a tarefa.')
    }
  }

  async function deleteTask(id: number) {
    try {
      setError(null)

      await tasksService.delete(id)

      setTasks(previousTasks =>
        previousTasks.filter(task => task.id !== id),
      )
    } catch {
      setError('Não foi possível excluir a tarefa.')
    }
  }

  async function createTask(title: string, description: string) {
    try {
      setError(null)

      const task = await tasksService.create({
        title,
        description,
      })

      setTasks(previousTasks => [task, ...previousTasks])
    } catch {
      setError('Não foi possível criar a tarefa.')
    }
  }

  return (
    <main>
      <h1>TaskFlow</h1>

      <TaskForm onCreate={createTask} />

      {error && <p role="alert">{error}</p>}

      {loading ? (
        <p>Carregando tarefas...</p>
      ) : (
        <div>
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}

          {tasks.length === 0 && !error && (
            <p>Nenhuma tarefa cadastrada.</p>
          )}
        </div>
      )}
    </main>
  )
}

export default App