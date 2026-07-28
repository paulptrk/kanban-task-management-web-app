import Modal from './Modal';
import Subtask from './Subtask';
import TaskContextMenu from './TaskContextMenu';
import StatusDropdown from './StatusDropdown';
import {
  useKanbanStore,
  useSelectedBoard,
  useSelectedTask,
} from '../store/useKanbanStore';

export default function TaskDetailModal() {
  const setSelectedTask = useKanbanStore((state) => state.setSelectedTask);
  const selectedTask = useSelectedTask();
  const selectedBoard = useSelectedBoard();

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
            <TaskContextMenu />
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

          <StatusDropdown
            status={selectedTask.status}
            columns={selectedBoard?.columns}
          />
        </div>
      )}
    </Modal>
  );
}
