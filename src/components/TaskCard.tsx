
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
    <div className="border border-gray-300 rounded p-4 mb-4">
      <h2>{title}</h2>
      <p>{description}</p>

      <span
        className={`text-sm font-semibold ${
          completed ? 'text-green-500' : 'text-yellow-500'
        }`}
      >
        {completed ? 'Concluída' : 'Pendente'}
      </span>

      <button
        type="button"
        onClick={() => onToggle(id)}
        className={`cursor-pointer ml-4 px-2 py-1 rounded ${
          completed
            ? 'bg-yellow-500 text-white'
            : 'bg-green-500 text-white'
        }`}
      >
        {completed ? 'Desmarcar' : 'Concluir'}
      </button>

      <button
        type="button"
        onClick={() => onDelete(id)}
        className="cursor-pointer ml-2 px-2 py-1 rounded bg-red-500 text-white"
      >
        Excluir
      </button>
    </div>
  )
}

export default TaskCard
