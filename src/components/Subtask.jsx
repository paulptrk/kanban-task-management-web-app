import CheckIcon from '../../assets/icon-check.svg?react';
import { useKanbanStore } from '../store/useKanbanStore';

export default function Subtask({ subtask }) {
  const toggleSubtask = useKanbanStore((state) => state.toggleSubtask);

  return (
    <label className="bg-very-dark-grey hover:bg-main-purple/25 flex cursor-pointer items-center gap-4 rounded-[4px] px-3 py-[13px]">
      <input
        onChange={() => toggleSubtask(subtask.id)}
        type="checkbox"
        defaultChecked={subtask.isCompleted}
        className="sr-only"
      />
      {subtask.isCompleted ? (
        <span className="bg-main-purple flex size-4 shrink-0 items-center justify-center rounded-[2px]">
          <CheckIcon />
        </span>
      ) : (
        <span className="bg-very-dark-grey border-medium-grey/25 size-4 shrink-0 rounded-[2px] border" />
      )}
      <span
        className={`text-[12px] font-bold ${subtask.isCompleted ? 'text-white/50 line-through' : 'text-white'}`}
      >
        {subtask.title}
      </span>
    </label>
  );
}
