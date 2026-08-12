import { useEffect, useState } from 'react';
import { useKanbanStore } from '../store/useKanbanStore';
import BoardListItem from './BoardListItem';
import ThemeToggle from './ThemeToggle';
import BoardFormModal from './BoardFormModal';

export default function MobileBoardMenu({ isOpen, onClose }) {
  const boards = useKanbanStore((state) => state.boards);
  const setSelectedBoard = useKanbanStore((state) => state.setSelectedBoard);
  const selectedBoard = useKanbanStore((state) => state.selectedBoard);
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="tablet:hidden">
      {/* Full-screen backdrop; a button so closing works via click and
          keyboard alike */}
      <button
        type="button"
        aria-label="Close board menu"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50"
      />
      <div className="bg-surface fixed top-20 left-1/2 z-50 flex w-[264px] -translate-x-1/2 flex-col gap-4 rounded-[8px] py-4 shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)]">
        <p className="text-medium-grey px-6 text-xs font-bold tracking-[2.4px] uppercase">
          All Boards ({boards.length})
        </p>
        <div className="flex flex-col">
          {boards.map((board) => (
            <BoardListItem
              key={board.id}
              title={board.name}
              variant={board.id === selectedBoard ? 'active' : 'inactive'}
              onBoardClick={() => {
                setSelectedBoard(board.id);
                onClose();
              }}
            />
          ))}
          <BoardListItem
            title="+ Create New Board"
            variant="create"
            onBoardClick={() => setIsAddBoardOpen(true)}
          />
        </div>
        <ThemeToggle />
      </div>

      <BoardFormModal
        isOpen={isAddBoardOpen}
        onClose={() => setIsAddBoardOpen(false)}
      />
    </div>
  );
}
