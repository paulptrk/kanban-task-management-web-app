import { useKanbanStore } from '../store/useKanbanStore';
import logoLight from '../../assets/logo-light.svg';
import BoardListItem from './BoardListItem';
import HideSidebarButton from './HideSidebarButton';

export default function Sidebar() {
  const boards = useKanbanStore((state) => state.boards);
  const setSelectedBoard = useKanbanStore((state) => state.setSelectedBoard);
  const selectedBoard = useKanbanStore((state) => state.selectedBoard);

  return (
    <div className="bg-dark-grey border-lines-dark flex w-[300px] shrink-0 flex-col border-r">
      <div className="mb-[54px] pt-8 pl-[34px]">
        <img src={logoLight} alt="Kanban Logo" className="logo-class" />
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
            <BoardListItem title="+ Create New Board" variant="create" />
          </div>
        </div>
        <HideSidebarButton />
      </div>
    </div>
  );
}
