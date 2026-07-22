import { useSelectedBoard } from '../store/useKanbanStore';

export default function Header() {
  return (
    <div className="border-lines-dark bg-dark-grey flex h-24 w-full shrink-0 items-center border-b pl-6">
      <span className="text-2xl font-bold text-white">
        {useSelectedBoard().name}
      </span>
    </div>
  );
}
