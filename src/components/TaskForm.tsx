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
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Título
        </label>

        <input
          className="border border-gray-300 rounded p-2"
          id="title"
          value={title}
          onChange={event => setTitle(event.target.value)}
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