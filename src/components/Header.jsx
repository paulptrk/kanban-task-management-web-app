import { useState } from 'react';
import { useSelectedBoard } from '../store/useKanbanStore';
import Button from './Button';
import AddTaskModal from './AddTaskModal';

export default function Header() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const selectedBoard = useSelectedBoard();

  return (
    <div className="border-lines-dark bg-dark-grey flex h-24 w-full shrink-0 items-center justify-between border-b pr-6 pl-6">
      <span className="text-2xl font-bold text-white">
        {selectedBoard.name}
      </span>
      <Button onClick={() => setIsAddTaskOpen(true)}>+ Add New Task</Button>

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        columns={selectedBoard.columns}
      />
    </div>
  );
}
