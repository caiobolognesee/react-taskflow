
function AppHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            T
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">
              TaskFlow
            </h1>

            <p className="text-xs text-gray-500">
              Organização sem complicação
            </p>
          </div>
        </div>

        <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
          Meu espaço de trabalho
        </span>
      </div>
    </header>
  )
}

export default AppHeader
