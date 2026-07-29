import { useEffect, useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import TextInputRow from './TextInputRow';
import { useKanbanStore } from '../store/useKanbanStore';
import { createBoard } from '../utils/normalizeData';

function createDefaultColumns() {
  return [
    { id: crypto.randomUUID(), value: 'Todo' },
    { id: crypto.randomUUID(), value: 'Doing' },
  ];
}

function createEmptyColumn() {
  return { id: crypto.randomUUID(), value: '' };
}

export default function BoardFormModal({ isOpen, onClose }) {
  const addBoard = useKanbanStore((state) => state.addBoard);

  const [name, setName] = useState('');
  const [columns, setColumns] = useState(createDefaultColumns());
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setName('');
    setColumns(createDefaultColumns());
    setSubmitted(false);
  }, [isOpen]);

  const nameError = submitted && name.trim() === '';

  function updateColumn(id, value) {
    setColumns((prev) =>
      prev.map((column) => (column.id === id ? { ...column, value } : column))
    );
  }

  function deleteColumn(id) {
    setColumns((prev) => prev.filter((column) => column.id !== id));
  }

  function addColumn() {
    setColumns((prev) => [...prev, createEmptyColumn()]);
  }

  function handleSubmit() {
    setSubmitted(true);

    const hasEmptyName = name.trim() === '';
    const hasEmptyColumn = columns.some(
      (column) => column.value.trim() === ''
    );
    if (hasEmptyName || hasEmptyColumn) return;

    const newBoard = createBoard(
      name,
      columns.map((column) => column.value)
    );
    addBoard(newBoard);

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <p className="text-[18px] font-bold text-white">Add New Board</p>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="board-name"
            className="text-[12px] font-bold text-white"
          >
            Board Name
          </label>
          <div className="relative">
            <input
              id="board-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Web Design"
              className={`bg-dark-grey w-full rounded-[4px] border px-4 py-[9px] text-[13px] font-medium text-white placeholder:text-white/25 focus:outline-none ${
                nameError
                  ? 'border-red'
                  : 'border-medium-grey/25 focus:border-main-purple'
              }`}
            />
            {nameError && (
              <span className="text-red pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[13px] font-medium">
                Can't be empty
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[12px] font-bold text-white">Board Columns</p>
          <div className="flex flex-col gap-3">
            {columns.map((column) => (
              <TextInputRow
                key={column.id}
                value={column.value}
                onChange={(value) => updateColumn(column.id, value)}
                onDelete={() => deleteColumn(column.id)}
                error={submitted && column.value.trim() === ''}
                placeholder="e.g. Todo"
                deleteLabel="Delete column"
              />
            ))}
            <Button
              variant="secondary"
              size="small"
              className="w-full"
              onClick={addColumn}
            >
              + Add New Column
            </Button>
          </div>
        </div>

        <Button size="small" className="w-full" onClick={handleSubmit}>
          Create New Board
        </Button>
      </div>
    </Modal>
  );
}
