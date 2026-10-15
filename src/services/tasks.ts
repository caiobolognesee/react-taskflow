
export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

const API_URL = import.meta.env.VITE_API_URL

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options?.body !== undefined && {
        'Content-Type': 'application/json',
      }),
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export const tasksService = {
  list(): Promise<Task[]> {
    return request<Task[]>('/tasks')
  },

  create(data: {
    title: string
    description: string
  }): Promise<Task> {
    return request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update(
    id: number,
    data: Partial<Pick<Task, 'title' | 'description' | 'completed'>>,
  ): Promise<Task> {
    return request<Task>(`/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },

  delete(id: number): Promise<void> {
    return request<void>(`/tasks/${id}`, {
      method: 'DELETE',
    })
  },
}
