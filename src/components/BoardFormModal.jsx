import { useEffect, useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import TextInputRow from './TextInputRow';
import { useKanbanStore } from '../store/useKanbanStore';
import { createBoard } from '../utils/normalizeData';

function createDefaultColumns() {
  return [
    { id: crypto.randomUUID(), value: 'Todo', tasks: [] },
    { id: crypto.randomUUID(), value: 'Doing', tasks: [] },
  ];
}

function createEmptyColumn() {
  return { id: crypto.randomUUID(), value: '', tasks: [] };
}

export default function BoardFormModal({
  isOpen,
  onClose,
  board = null,
  autoAddColumn = false,
}) {
  const isEditMode = board !== null;

  const addBoard = useKanbanStore((state) => state.addBoard);
  const updateBoard = useKanbanStore((state) => state.updateBoard);

  const [name, setName] = useState('');
  const [columns, setColumns] = useState(createDefaultColumns());
  const [submitted, setSubmitted] = useState(false);
  const [autoFocusColumnId, setAutoFocusColumnId] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode) {
      const loadedColumns = board.columns.map((column) => ({
        id: column.id,
        value: column.name,
        tasks: column.tasks,
      }));
      setName(board.name);
      if (autoAddColumn) {
        const newColumn = createEmptyColumn();
        setColumns([...loadedColumns, newColumn]);
        setAutoFocusColumnId(newColumn.id);
      } else {
        setColumns(loadedColumns);
        setAutoFocusColumnId(null);
      }
    } else {
      setName('');
      setColumns(createDefaultColumns());
      setAutoFocusColumnId(null);
    }
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
    const newColumn = createEmptyColumn();
    setColumns((prev) => [...prev, newColumn]);
    setAutoFocusColumnId(newColumn.id);
  }

  function handleSubmit() {
    setSubmitted(true);

    const hasEmptyName = name.trim() === '';
    const hasEmptyColumn = columns.some(
      (column) => column.value.trim() === ''
    );
    if (hasEmptyName || hasEmptyColumn) return;

    if (isEditMode) {
      updateBoard(board.id, {
        name,
        columns: columns.map((column) => ({
          id: column.id,
          name: column.value,
          tasks: column.tasks,
        })),
      });
    } else {
      const newBoard = createBoard(
        name,
        columns.map((column) => column.value)
      );
      addBoard(newBoard);
    }

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <p className="text-heading text-[18px] font-bold">
          {isEditMode ? 'Edit Board' : 'Add New Board'}
        </p>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="board-name"
            className="text-heading text-[12px] font-bold"
          >
            Board Name
          </label>
          <div className="relative">
            <input
              id="board-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Web Design"
              className={`bg-surface text-heading placeholder:text-heading/25 w-full rounded-[4px] border px-4 py-[9px] text-[13px] font-medium focus:outline-none ${
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
          <p className="text-heading text-[12px] font-bold">Board Columns</p>
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
                autoFocus={column.id === autoFocusColumnId}
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
          {isEditMode ? 'Save Changes' : 'Create New Board'}
        </Button>
      </div>
    </Modal>
  );
}
