import { create } from 'zustand';
import rawData from '../../data.json';
import { normalizeBoards } from '../utils/normalizeData';

export const useKanbanStore = create((set) => {
  const boards = normalizeBoards(rawData);
  return {
    boards,
    selectedBoard: boards[0]?.id ?? null,
    setSelectedBoard: (id) => set({ selectedBoard: id }),
  };
});
