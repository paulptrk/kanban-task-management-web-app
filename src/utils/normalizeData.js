export function normalizeBoards(rawData) {
  return rawData.boards.map((board) => ({
    id: crypto.randomUUID(),
    name: board.name,
    columns: board.columns.map((column) => ({
      id: crypto.randomUUID(),
      name: column.name,
      tasks: column.tasks.map((task) => ({
        id: crypto.randomUUID(),
        title: task.title,
        description: task.description,
        status: column.name,
        subtasks: task.subtasks.map((subtask) => ({
          id: crypto.randomUUID(),
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        })),
      })),
    })),
  }));
}
