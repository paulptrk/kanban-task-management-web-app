import { useDroppable } from '@dnd-kit/react';
import { CollisionPriority } from '@dnd-kit/abstract';
import TaskCard from './TaskCard';
import { useKanbanStore } from '../store/useKanbanStore';

// Dot color comes from column position, cycling for boards with more than
// three columns
const DOT_COLORS = ['bg-todo', 'bg-doing', 'bg-done'];

export default function Column({ id, name, tasks, index }) {
  const dotColor = DOT_COLORS[index % DOT_COLORS.length];

  const setSelectedTask = useKanbanStore((state) => state.setSelectedTask);

  // Low priority so a card's own collision wins over the column's when
  // dropping near/on another card, rather than the column itself
  const { ref } = useDroppable({
    id,
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div ref={ref} className="flex w-[280px] shrink-0 flex-col">
      <div className="mb-6 flex items-center gap-3">
        <span className={`${dotColor} size-[15px] rounded-full`} />
        <p className="text-medium-grey text-xs font-bold tracking-[2.4px] uppercase">
          {name} ({tasks.length})
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {tasks.map((task, taskIndex) => (
          <TaskCard
            key={task.id}
            task={task}
            index={taskIndex}
            onTaskClick={() => setSelectedTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
