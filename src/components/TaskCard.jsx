import { useSortable } from '@dnd-kit/react/sortable';

export default function TaskCard({ task, index, onTaskClick }) {
  const subtasks = task.subtasks;
  const numCompleted = subtasks.filter((subtask) => subtask.isCompleted).length;

  const { ref } = useSortable({ id: task.id, index });

  return (
    <div
      ref={ref}
      onClick={onTaskClick}
      className="bg-surface w-[280px] cursor-pointer rounded-[8px] px-4 py-[23px] shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)]"
    >
      <p className="text-heading text-[15px] font-bold">{task.title}</p>
      <p className="text-medium-grey mt-2 text-xs font-bold">
        {numCompleted} of {subtasks.length} subtasks
      </p>
    </div>
  );
}
