
import { useEffect, useState } from 'react'
import { tasksService } from '../services/tasks'
import type { Task } from '../types/task'

function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = tasks.length - completedTasks

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await tasksService.list()
        setTasks(data)
      } catch {
        setError('Não foi possível carregar suas tarefas.')
      } finally {
        setLoading(false)
      }
    }

    void loadTasks()
  }, [])

  async function createTask(title: string, description: string) {
    try {
      setError(null)

      const task = await tasksService.create({ title, description })

      setTasks(previousTasks => [task, ...previousTasks])
    } catch {
      setError('Não foi possível criar a tarefa.')
    }
  }

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

  return {
    tasks,
    loading,
    error,
    pendingTasks,
    completedTasks,
    createTask,
    toggleTask,
    deleteTask,
  }
}

export default useTasks
