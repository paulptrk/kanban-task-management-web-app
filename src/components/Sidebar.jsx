import { useState } from 'react';
import { useKanbanStore } from '../store/useKanbanStore';
import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';
import BoardListItem from './BoardListItem';
import HideSidebarButton from './HideSidebarButton';
import ThemeToggle from './ThemeToggle';
import BoardFormModal from './BoardFormModal';

export default function Sidebar({ onHide }) {
  const boards = useKanbanStore((state) => state.boards);
  const setSelectedBoard = useKanbanStore((state) => state.setSelectedBoard);
  const selectedBoard = useKanbanStore((state) => state.selectedBoard);
  const theme = useKanbanStore((state) => state.theme);
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);

  return (
    <div className="bg-surface border-border flex w-[300px] shrink-0 flex-col border-r">
      <div className="mb-[54px] pt-8 pl-[34px]">
        <img
          src={theme === 'dark' ? logoLight : logoDark}
          alt="Kanban Logo"
          className="logo-class"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        {/* Boards Container*/}
        <div className="flex flex-col">
          <p className="text-medium-grey mb-[19px] pl-8 text-xs font-bold tracking-[2.4px] uppercase">
            All Boards ({boards.length})
          </p>
          {/* Boards List */}
          <div className="flex flex-col">
            {boards.map((board) => (
              <BoardListItem
                key={board.id}
                title={board.name}
                variant={board.id === selectedBoard ? 'active' : 'inactive'}
                onBoardClick={() => setSelectedBoard(board.id)}
              />
            ))}
            <BoardListItem
              title="+ Create New Board"
              variant="create"
              onBoardClick={() => setIsAddBoardOpen(true)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <ThemeToggle />
          <HideSidebarButton onClick={onHide} />
        </div>
      </div>

      <BoardFormModal
        isOpen={isAddBoardOpen}
        onClose={() => setIsAddBoardOpen(false)}
      />
    </div>
  );
}
