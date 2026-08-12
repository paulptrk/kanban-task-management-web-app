import { useMemo, useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import Column from './Column';
import BoardFormModal from './BoardFormModal';
import Button from './Button';
import { useKanbanStore, useSelectedBoard } from '../store/useKanbanStore';

export default function Board() {
  const selectedBoard = useSelectedBoard();
  const setTaskOrder = useKanbanStore((state) => state.setTaskOrder);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  // Scratch space for the duration of a drag: { columnId: [taskId] }.
  // null means no drag is in progress, so columns render from the store
  const [mirror, setMirror] = useState(null);

  // id -> full task object, so the mirror (which only holds ids) can be
  // turned back into something Column/TaskCard can actually render
  const taskById = useMemo(() => {
    const map = {};
    selectedBoard?.columns.forEach((column) =>
      column.tasks.forEach((task) => {
        map[task.id] = task;
      })
    );
    return map;
  }, [selectedBoard]);

  if (!selectedBoard) return null;

  const getColumnTasks = (column) =>
    mirror ? mirror[column.id].map((id) => taskById[id]) : column.tasks;

  const handleDragStart = () => {
    const initial = {};
    selectedBoard.columns.forEach((column) => {
      initial[column.id] = column.tasks.map((task) => task.id);
    });
    setMirror(initial);
  };

  const handleDragOver = (event) => {
    setMirror((current) => move(current, event));
  };

  const handleDragEnd = (event) => {
    // Read the mirror via the updater so we always commit the latest
    // shuffled order, not a possibly-stale value from this closure
    setMirror((current) => {
      if (!event.canceled && current) {
        setTaskOrder(current);
      }
      return null;
    });
  };

  if (selectedBoard.columns.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <p className="text-medium-grey text-[18px] font-bold">
          This board is empty. Create a new column to get started.
        </p>
        <Button size="small" onClick={() => setIsAddingColumn(true)}>
          + Add New Column
        </Button>

        <BoardFormModal
          isOpen={isAddingColumn}
          onClose={() => setIsAddingColumn(false)}
          board={selectedBoard}
          autoAddColumn
        />
      </div>
    );
  }

  return (
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-1 items-start gap-6 overflow-x-auto p-6">
        {selectedBoard.columns.map((column, index) => (
          <Column
            key={column.id}
            id={column.id}
            name={column.name}
            tasks={getColumnTasks(column)}
            index={index}
          />
        ))}
        <button
          onClick={() => setIsAddingColumn(true)}
          className="text-medium-grey hover:text-main-purple mt-10 flex h-[calc(100%-40px)] min-h-[200px] w-[280px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] bg-gradient-to-b from-[rgba(43,44,55,0.25)] to-[rgba(43,44,55,0.13)] text-2xl font-bold"
        >
          + New Column
        </button>

        <BoardFormModal
          isOpen={isAddingColumn}
          onClose={() => setIsAddingColumn(false)}
          board={selectedBoard}
          autoAddColumn
        />
      </div>
    </DragDropProvider>
  );
}
