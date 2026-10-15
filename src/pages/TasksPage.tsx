
import AppFooter from '../components/layout/AppFooter'
import AppHeader from '../components/layout/AppHeader'
import TaskFormSection from '../components/tasks/TaskFormSection'
import TaskList from '../components/tasks/TaskList'
import TaskStats from '../components/tasks/TaskStats'
import type { Task } from '../services/tasks'

interface TasksPageProps {
  tasks: Task[]
  loading: boolean
  error: string | null
  pendingTasks: number
  completedTasks: number
  onCreate: (title: string, description: string) => void
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TasksPage({
  tasks,
  loading,
  error,
  pendingTasks,
  completedTasks,
  onCreate,
  onToggle,
  onDelete,
}: TasksPageProps) {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <AppHeader />

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            VISÃO GERAL
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Suas tarefas, em um só lugar.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Organize suas atividades, acompanhe seu progresso e mantenha
            o foco no que realmente importa.
          </p>
        </section>

        <TaskStats
          total={tasks.length}
          pending={pendingTasks}
          completed={completedTasks}
        />

        <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <TaskFormSection onCreate={onCreate} />

          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                  Minhas tarefas
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Acompanhe suas atividades.
                </p>
              </div>

              <span className="rounded-lg bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700">
                {tasks.length}
              </span>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <TaskList
              tasks={tasks}
              loading={loading}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          </div>
        </section>

        <AppFooter />
      </div>
    </main>
  )
}

export default TasksPage
