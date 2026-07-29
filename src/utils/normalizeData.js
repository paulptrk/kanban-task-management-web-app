export function createTask(title, description, subtaskTitles) {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    subtasks: subtaskTitles.map((subtaskTitle) => ({
      id: crypto.randomUUID(),
      title: subtaskTitle,
      isCompleted: false,
    })),
  };
}

export function createBoard(name, columnNames) {
  return {
    id: crypto.randomUUID(),
    name,
    columns: columnNames.map((columnName) => ({
      id: crypto.randomUUID(),
      name: columnName,
      tasks: [],
    })),
  };
}

export function normalizeBoards(rawData) {
  return rawData.boards.map((board) => ({
    id: crypto.randomUUID(),
    name: board.name,
    columns: board.columns.map((column) => {
      const columnId = crypto.randomUUID();
      return {
        id: columnId,
        name: column.name,
        tasks: column.tasks.map((task) => ({
          id: crypto.randomUUID(),
          title: task.title,
          description: task.description,
          subtasks: task.subtasks.map((subtask) => ({
            id: crypto.randomUUID(),
            title: subtask.title,
            isCompleted: subtask.isCompleted,
          })),
        })),
      };
    }),
  }));
}
