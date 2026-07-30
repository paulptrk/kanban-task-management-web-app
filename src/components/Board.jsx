import { useState } from 'react';
import Column from './Column';
import BoardFormModal from './BoardFormModal';
import Button from './Button';
import { useSelectedBoard } from '../store/useKanbanStore';

export default function Board() {
  const selectedBoard = useSelectedBoard();
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  if (!selectedBoard) return null;

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
    <div className="flex flex-1 items-start gap-6 overflow-x-auto p-6">
      {selectedBoard.columns.map((column, index) => (
        <Column
          key={column.id}
          name={column.name}
          tasks={column.tasks}
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
  );
}
