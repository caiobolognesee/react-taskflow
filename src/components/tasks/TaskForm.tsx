import { useState, type SubmitEvent } from 'react'

interface TaskFormProps {
  onCreate: (title: string, description: string) => void
}

function TaskForm({ onCreate }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    onCreate(title, description)

    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-semibold text-slate-800"
        >
          Título
        </label>

        <input
          id="title"
          value={title}
          onChange={event => setTitle(event.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>

        <input
          className="border border-gray-300 rounded p-2"
          id="description"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </div>

      <button type="submit" className="cursor-pointer mt-2 mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Criar tarefa
      </button>
    </form>
  )
}

export default TaskForm