
interface TaskCardProps {
  id: number
  title: string
  description: string
  completed: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TaskCard({
  id,
  title,
  description,
  completed,
  onToggle,
  onDelete,
}: TaskCardProps) {
  return (
    <li className="flex flex-col gap-4 border-b border-gray-200 px-4 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <h3
          className={`break-words text-sm font-semibold ${
            completed
              ? 'text-gray-400 line-through'
              : 'text-gray-900'
          }`}
        >
          {title}
        </h3>

        {description && (
          <p className="mt-1 break-words text-sm text-gray-600">
            {description}
          </p>
        )}

        <span
          className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-medium ${
            completed
              ? 'bg-green-50 text-green-700'
              : 'bg-yellow-50 text-yellow-800'
          }`}
        >
          {completed ? 'Concluída' : 'Pendente'}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => onToggle(id)}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            completed
              ? 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100'
              : 'bg-green-50 text-green-700 hover:bg-green-100'
          }`}
        >
          {completed ? 'Reabrir' : 'Concluir'}
        </button>

        <button
          type="button"
          onClick={() => onDelete(id)}
          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
        >
          Excluir
        </button>
      </div>
    </li>
  )
}

export default TaskCard
