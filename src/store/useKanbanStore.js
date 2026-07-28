import { create } from 'zustand';
import rawData from '../../data.json';
import { normalizeBoards } from '../utils/normalizeData';

export const useKanbanStore = create((set) => {
  const boards = normalizeBoards(rawData);
  return {
    boards,
    selectedBoard: boards[0]?.id ?? null,
    setSelectedBoard: (id) => set({ selectedBoard: id }),
    selectedTask: null,
    setSelectedTask: (id) => set({ selectedTask: id }),
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
  };
});

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
