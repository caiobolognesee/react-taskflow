
import TaskForm from './TaskForm'

interface TaskFormSectionProps {
  onCreate: (title: string, description: string) => void
}

function TaskFormSection({ onCreate }: TaskFormSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-900">
          Nova tarefa
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Registre uma nova atividade para sua lista.
        </p>
      </div>

      <TaskForm onCreate={onCreate} />
    </section>
  )
}

export default TaskFormSection
