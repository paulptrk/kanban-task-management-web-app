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
        .find((t) => t.id === state.selectedTaskId) ?? null
    );
  });
