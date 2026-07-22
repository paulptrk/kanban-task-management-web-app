import Column from './Column';
import { useSelectedBoard } from '../store/useKanbanStore';

export default function Board() {
  return (
    <div className="flex flex-1 items-start gap-6 overflow-x-auto p-6">
      {useSelectedBoard().columns.map((column, index) => (
        <Column
          key={column.id}
          name={column.name}
          tasks={column.tasks}
          index={index}
        />
      ))}
      <button className="text-medium-grey hover:text-main-purple mt-10 flex h-[calc(100%-40px)] min-h-[200px] w-[280px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] bg-gradient-to-b from-[rgba(43,44,55,0.25)] to-[rgba(43,44,55,0.13)] text-2xl font-bold">
        + New Column
      </button>
    </div>
  );
}
