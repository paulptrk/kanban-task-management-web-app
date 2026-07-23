import Modal from './Modal';
import Subtask from './Subtask';
import VerticalEllipsisIcon from '../../assets/icon-vertical-ellipsis.svg?react';
import ChevronDownIcon from '../../assets/icon-chevron-down.svg?react';
import { useKanbanStore } from '../store/useKanbanStore';
import { useSelectedTask } from '../store/useKanbanStore';

export default function TaskDetailModal() {
  const setSelectedTask = useKanbanStore((state) => state.setSelectedTask);
  const selectedTask = useSelectedTask();

  const subTasks = selectedTask?.subtasks;
  const numCompletedSubtasks = subTasks?.filter(
    (subtask) => subtask.isCompleted
  ).length;

  return (
    <Modal isOpen={selectedTask !== null} onClose={() => setSelectedTask(null)}>
      {selectedTask && (
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[18px] font-bold text-white">
              {selectedTask.title}
            </p>
            <button type="button" aria-label="Task menu">
              <VerticalEllipsisIcon />
            </button>
          </div>

          <p className="text-medium-grey text-[13px] leading-[23px] font-medium">
            {selectedTask.description}
          </p>

          <div className="flex flex-col">
            <p className="mb-4 text-[12px] font-bold text-white">
              Subtasks ({numCompletedSubtasks} of {subTasks.length})
            </p>
            <div className="flex flex-col gap-2">
              {subTasks.map((subtask) => (
                <Subtask key={subtask.id} subtask={subtask} />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="mb-2 text-[12px] font-bold text-white">
              Current Status
            </p>
            <div className="relative">
              <select
                defaultValue="Doing"
                className="border-medium-grey/25 bg-dark-grey w-full appearance-none rounded-[4px] border px-4 py-[9px] text-[13px] font-medium text-white"
              >
                <option value="Todo">Todo</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
