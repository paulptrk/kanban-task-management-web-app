import { useState } from 'react';
import { useKanbanStore, useSelectedBoard } from '../store/useKanbanStore';
import Button from './Button';
import TaskFormModal from './TaskFormModal';
import BoardFormModal from './BoardFormModal';
import ConfirmModal from './ConfirmModal';
import ContextMenu from './ContextMenu';
import MobileBoardMenu from './MobileBoardMenu';
import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';
import logoMobile from '../../assets/logo-mobile.svg';
import ChevronDownIcon from '../../assets/icon-chevron-down.svg?react';
import ChevronUpIcon from '../../assets/icon-chevron-up.svg?react';
import AddTaskMobileIcon from '../../assets/icon-add-task-mobile.svg?react';

export default function Header({ showLogo = false }) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [isDeletingBoard, setIsDeletingBoard] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const deleteBoard = useKanbanStore((state) => state.deleteBoard);
  const theme = useKanbanStore((state) => state.theme);
  const selectedBoard = useSelectedBoard();

  if (!selectedBoard) return null;

  return (
    <div className="border-border bg-surface flex h-24 max-desktop:h-[81px] max-tablet:h-16 w-full shrink-0 items-center border-b pr-6 max-tablet:pr-4">
      {showLogo && (
        <div className="border-border hidden h-full w-[300px] max-desktop:w-[260px] shrink-0 items-center border-r pl-8 max-desktop:pl-[26px] tablet:flex">
          <img
            src={theme === 'dark' ? logoLight : logoDark}
            alt="Kanban Logo"
            className="h-[25px] w-auto"
          />
        </div>
      )}

      <img
        src={logoMobile}
        alt=""
        className="ml-4 h-[25px] w-auto tablet:hidden"
      />

      {/* Board name renders twice: a static label on tablet+, and below it
          a button on mobile that opens the board menu */}
      <span
        className={`text-heading hidden flex-1 text-2xl max-desktop:text-[20px] font-bold tablet:block ${showLogo ? 'pl-8 max-desktop:pl-6' : 'pl-6'}`}
      >
        {selectedBoard.name}
      </span>

      <button
        type="button"
        onClick={() => setIsMobileMenuOpen((open) => !open)}
        aria-expanded={isMobileMenuOpen}
        aria-haspopup="true"
        aria-label="Select board"
        className="flex flex-1 cursor-pointer items-center gap-2 pl-4 tablet:hidden"
      >
        <span className="text-heading text-[18px] font-bold">
          {selectedBoard.name}
        </span>
        {isMobileMenuOpen ? (
          <ChevronUpIcon className="h-[7px] w-[10px]" />
        ) : (
          <ChevronDownIcon className="h-[7px] w-[10px]" />
        )}
      </button>

      <div className="flex items-center gap-4">
        <Button
          onClick={() => setIsAddTaskOpen(true)}
          disabled={selectedBoard.columns.length === 0}
          className="flex items-center justify-center max-tablet:h-8 max-tablet:w-12 max-tablet:px-0"
        >
          <span className="hidden tablet:inline">+ Add New Task</span>
          <AddTaskMobileIcon className="size-3 tablet:hidden" />
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

      <MobileBoardMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
}
