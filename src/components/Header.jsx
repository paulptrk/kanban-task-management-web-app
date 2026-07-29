import { useState } from 'react';
import { useKanbanStore, useSelectedBoard } from '../store/useKanbanStore';
import Button from './Button';
import TaskFormModal from './TaskFormModal';
import BoardFormModal from './BoardFormModal';
import ConfirmModal from './ConfirmModal';
import ContextMenu from './ContextMenu';

export default function Header() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const deleteBoard = useKanbanStore((state) => state.deleteBoard);
  const selectedBoard = useSelectedBoard();

  if (!selectedBoard) return null;

  return (
    <div className="border-lines-dark bg-dark-grey flex h-24 w-full shrink-0 items-center justify-between border-b pr-6 pl-6">
      <span className="text-2xl font-bold text-white">
        {selectedBoard.name}
      </span>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => setIsAddTaskOpen(true)}
          disabled={selectedBoard.columns.length === 0}
        >
          + Add New Task
        </Button>
        <ContextMenu
          label="Board menu"
          align="end"
          items={[
            { label: 'Edit Board', onClick: () => setIsEditingBoard(true) },
            {
              label: 'Delete Board',
              onClick: () => setIsDeletingBoard(true),
              variant: 'destructive',
            },
          ]}
        />
      </div>

      <TaskFormModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        columns={selectedBoard.columns}
      />

      <BoardFormModal
        isOpen={isEditingBoard}
        onClose={() => setIsEditingBoard(false)}
        board={selectedBoard}
      />

      <ConfirmModal
        isOpen={isDeletingBoard}
        onClose={() => setIsDeletingBoard(false)}
        onConfirm={() => {
          deleteBoard(selectedBoard.id);
          setIsDeletingBoard(false);
        }}
        title="Delete this board?"
        message={`Are you sure you want to delete the '${selectedBoard.name}' board? This will remove all of its columns and tasks and cannot be reversed.`}
      />
    </div>
  );
}
