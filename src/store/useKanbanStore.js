import { create } from 'zustand';
import rawData from '../../data.json';
import { normalizeBoards } from '../utils/normalizeData';

export const useKanbanStore = create((set) => ({
  boards: normalizeBoards(rawData),
}));
