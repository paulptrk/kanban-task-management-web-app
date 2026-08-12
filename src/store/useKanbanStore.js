import { create } from 'zustand';
import rawData from '../../data.json';
import { normalizeBoards } from '../utils/normalizeData';

export const useKanbanStore = create((set) => {
  // Runs once on store creation: stamps the raw JSON with UUIDs so
  // everything below can be looked up by id
  const boards = normalizeBoards(rawData);
  return {
    boards,
    // selectedBoard/selectedTask store ids only; the actual objects are
    // derived via the selector hooks at the bottom of this file
    selectedBoard: boards[0]?.id ?? null,
    setSelectedBoard: (id) => set({ selectedBoard: id }),
    theme: 'dark',
    toggleTheme: () =>
      set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    addBoard: (board) =>
      set((state) => ({
        boards: [...state.boards, board],
        selectedBoard: board.id,
      })),
    updateBoard: (boardId, updates) =>
      set((state) => ({
        boards: state.boards.map((board) =>
          board.id === boardId ? { ...board, ...updates } : board
        ),
      })),
    deleteBoard: (boardId) =>
      set((state) => {
        const remainingBoards = state.boards.filter(
          (board) => board.id !== boardId
        );
        return {
          boards: remainingBoards,
          // Fall back to the first remaining board if the deleted one was open
          selectedBoard:
            state.selectedBoard === boardId
              ? (remainingBoards[0]?.id ?? null)
              : state.selectedBoard,
        };
      }),
    selectedTask: null,
    setSelectedTask: (id) => set({ selectedTask: id }),
    // Task updates only get an id, not a location, so they rebuild the whole
    // boards tree. Every level is copied because Zustand relies on new
    // references to detect changes
    toggleSubtask: (subtaskId) =>
      set((state) => ({
        boards: state.boards.map((board) => ({
          ...board,
          columns: board.columns.map((column) => ({
            ...column,
            tasks: column.tasks.map((task) => ({
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, isCompleted: !subtask.isCompleted }
                  : subtask
              ),
            })),
          })),
        })),
      })),
    addTask: (task, targetColumnId) =>
      set((state) => ({
        boards: state.boards.map((board) => ({
          ...board,
          columns: board.columns.map((column) =>
            column.id === targetColumnId
              ? { ...column, tasks: [...column.tasks, task] }
              : column
          ),
        })),
      })),
    updateTask: (taskId, updates) =>
      set((state) => ({
        boards: state.boards.map((board) => ({
          ...board,
          columns: board.columns.map((column) => ({
            ...column,
            tasks: column.tasks.map((task) =>
              task.id === taskId ? { ...task, ...updates } : task
            ),
          })),
        })),
      })),
    deleteTask: (taskId) =>
      set((state) => ({
        boards: state.boards.map((board) => ({
          ...board,
          columns: board.columns.map((column) => ({
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          })),
        })),
      })),
    moveTask: (taskId, targetColumnId) =>
      set((state) => ({
        boards: state.boards.map((board) => {
          // Find task
          const task = board.columns
            .flatMap((column) => column.tasks)
            .find((t) => t.id === taskId);
          // If task does not exist, return the board
          if (!task) return board;

          return {
            ...board,
            columns: board.columns.map((column) => {
              // Filter out task from every column first, so a re-selected
              // status doesn't duplicate it in its own column
              const remainingTasks = column.tasks.filter(
                (t) => t.id !== taskId
              );
              // Add task back only to the target column
              return column.id === targetColumnId
                ? { ...column, tasks: [...remainingTasks, task] }
                : { ...column, tasks: remainingTasks };
            }),
          };
        }),
      })),
    // Commits a drag-and-drop result. `order` is a flat { columnId: [taskId] }
    // map (built by dnd-kit's `move` helper) — rebuilds each matching
    // column's tasks by looking the ids back up against current state
    setTaskOrder: (order) =>
      set((state) => {
        const taskById = {};
        state.boards.forEach((board) =>
          board.columns.forEach((column) =>
            column.tasks.forEach((task) => {
              taskById[task.id] = task;
            })
          )
        );

        return {
          boards: state.boards.map((board) => ({
            ...board,
            columns: board.columns.map((column) =>
              column.id in order
                ? {
                    ...column,
                    tasks: order[column.id].map((id) => taskById[id]),
                  }
                : column
            ),
          })),
        };
      }),
  };
});

// Resolve the stored ids back into live objects. Deriving on every render
// (instead of storing the objects) keeps components in sync after any update
export const useSelectedBoard = () =>
  useKanbanStore((state) =>
    state.boards.find((board) => board.id === state.selectedBoard)
  );

export const useSelectedTask = () =>
  useKanbanStore((state) => {
    const board = state.boards.find((b) => b.id === state.selectedBoard);
    return (
      board?.columns
        .flatMap((c) => c.tasks)
        .find((t) => t.id === state.selectedTask) ?? null
    );
  });
