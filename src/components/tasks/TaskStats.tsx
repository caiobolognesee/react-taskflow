
interface TaskStatsProps {
  total: number
  pending: number
  completed: number
}

function TaskStats({ total, pending, completed }: TaskStatsProps) {
  return (
    <section
      aria-label="Resumo das tarefas"
      className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Total de tarefas
        </p>
        <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
          {total}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Atividades cadastradas
        </p>
      </div>

      <div className="rounded-2xl border border-yellow-100 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Pendentes
        </p>
        <p className="mt-3 text-3xl font-bold tracking-tight text-yellow-600">
          {pending}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Aguardando conclusão
        </p>
      </div>

      <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Concluídas
        </p>
        <p className="mt-3 text-3xl font-bold tracking-tight text-green-600">
          {completed}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Tarefas finalizadas
        </p>
      </div>
    </section>
  )
}

export default TaskStats
