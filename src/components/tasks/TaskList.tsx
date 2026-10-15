
import TaskCard from './TaskCard'
import type { Task } from '../../services/tasks'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TaskList({
  tasks,
  loading,
  onToggle,
  onDelete,
}: TaskListProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-sm text-gray-500">
          Carregando suas tarefas...
        </p>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600">
          +
        </div>

        <h3 className="mt-4 font-semibold text-gray-900">
          Tudo começa com uma tarefa
        </h3>

        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500">
          Você ainda não cadastrou nenhuma atividade. Use o formulário
          para começar.
        </p>
      </div>
    )
  }

  return (
    <ul className="max-h-[480px] overflow-y-auto divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          completed={task.completed}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TaskList
