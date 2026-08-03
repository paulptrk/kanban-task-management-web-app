import TaskCard from './TaskCard';
import { useKanbanStore } from '../store/useKanbanStore';

// Dot color comes from column position, cycling for boards with more than
// three columns
const DOT_COLORS = ['bg-todo', 'bg-doing', 'bg-done'];

export default function Column({ name, tasks, index }) {
  const dotColor = DOT_COLORS[index % DOT_COLORS.length];

  const setSelectedTask = useKanbanStore((state) => state.setSelectedTask);

  return (
    <div className="flex w-[280px] shrink-0 flex-col">
      <div className="mb-6 flex items-center gap-3">
        <span className={`${dotColor} size-[15px] rounded-full`} />
        <p className="text-medium-grey text-xs font-bold tracking-[2.4px] uppercase">
          {name} ({tasks.length})
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskClick={() => setSelectedTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
