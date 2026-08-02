import { useState } from 'react';
import { useKanbanStore, useSelectedBoard } from '../store/useKanbanStore';
import Button from './Button';
import TaskFormModal from './TaskFormModal';
import BoardFormModal from './BoardFormModal';
import ConfirmModal from './ConfirmModal';
import ContextMenu from './ContextMenu';
import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';

export default function Header({ showLogo = false }) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const deleteBoard = useKanbanStore((state) => state.deleteBoard);
  const theme = useKanbanStore((state) => state.theme);
  const selectedBoard = useSelectedBoard();

  if (!selectedBoard) return null;

  return (
    <div className="border-border bg-surface flex h-24 max-desktop:h-[81px] w-full shrink-0 items-center border-b pr-6">
      {showLogo && (
        <div className="border-border flex h-full w-[300px] max-desktop:w-[260px] shrink-0 items-center border-r pl-8 max-desktop:pl-[26px]">
          <img
            src={theme === 'dark' ? logoLight : logoDark}
            alt="Kanban Logo"
            className="h-[25px] w-auto"
          />
        </div>
      )}
      <span
        className={`text-heading flex-1 text-2xl max-desktop:text-[20px] font-bold ${showLogo ? 'pl-8 max-desktop:pl-6' : 'pl-6'}`}
      >
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
