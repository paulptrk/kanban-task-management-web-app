import { useState } from 'react';
import Modal from './Modal';
import Subtask from './Subtask';
import TaskContextMenu from './TaskContextMenu';
import StatusDropdown from './StatusDropdown';
import TaskFormModal from './TaskFormModal';
import {
  useKanbanStore,
  useSelectedBoard,
  useSelectedTask,
} from '../store/useKanbanStore';

export default function TaskDetailModal() {
  const setSelectedTask = useKanbanStore((state) => state.setSelectedTask);
  const moveTask = useKanbanStore((state) => state.moveTask);
  const selectedTask = useSelectedTask();
  const selectedBoard = useSelectedBoard();
  const [isEditing, setIsEditing] = useState(false);

  const subTasks = selectedTask?.subtasks;
  const numCompletedSubtasks = subTasks?.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const currentColumn = selectedBoard?.columns.find((column) =>
    column.tasks.some((task) => task.id === selectedTask?.id)
  );

  return (
    <>
      <Modal
        isOpen={selectedTask !== null && !isEditing}
        onClose={() => {
          if (!isEditing) setSelectedTask(null);
        }}
      >
        {selectedTask && (
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-4">
              <p className="text-[18px] font-bold text-white">
                {selectedTask.title}
              </p>
              <TaskContextMenu onEdit={() => setIsEditing(true)} />
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
              value={currentColumn?.id}
              columns={selectedBoard?.columns}
              onChange={(columnId) => moveTask(selectedTask.id, columnId)}
            />
          </div>
        )}
      </Modal>

      <TaskFormModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        columns={selectedBoard?.columns}
        task={selectedTask}
        currentColumnId={currentColumn?.id}
      />
    </>
  );
}
