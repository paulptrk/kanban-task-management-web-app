import { useEffect, useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import StatusDropdown from './StatusDropdown';
import SubtaskRow from './SubtaskRow';
import { useKanbanStore } from '../store/useKanbanStore';
import { createTask } from '../utils/normalizeData';

function createEmptySubtask() {
  return { id: crypto.randomUUID(), value: '' };
}

export default function AddTaskModal({ isOpen, onClose, columns = [] }) {
  const addTask = useKanbanStore((state) => state.addTask);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState([
    createEmptySubtask(),
    createEmptySubtask(),
  ]);
  const [status, setStatus] = useState(columns[0]?.id);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setTitle('');
    setDescription('');
    setSubtasks([createEmptySubtask(), createEmptySubtask()]);
    setStatus(columns[0]?.id);
    setSubmitted(false);
  }, [isOpen]);

  const titleError = submitted && title.trim() === '';

  function updateSubtask(id, value) {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.id === id ? { ...subtask, value } : subtask
      )
    );
  }

  function deleteSubtask(id) {
    setSubtasks((prev) => prev.filter((subtask) => subtask.id !== id));
  }

  function addSubtask() {
    setSubtasks((prev) => [...prev, createEmptySubtask()]);
  }

  function handleCreateTask() {
    setSubmitted(true);

    const hasEmptyTitle = title.trim() === '';
    const hasEmptySubtask = subtasks.some(
      (subtask) => subtask.value.trim() === ''
    );
    if (hasEmptyTitle || hasEmptySubtask) return;

    const task = createTask(
      title,
      description,
      subtasks.map((subtask) => subtask.value)
    );
    addTask(task, status);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <p className="text-[18px] font-bold text-white">Add New Task</p>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="new-task-title"
            className="text-[12px] font-bold text-white"
          >
            Title
          </label>
          <div className="relative">
            <input
              id="new-task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Take coffee break"
              className={`bg-dark-grey w-full rounded-[4px] border px-4 py-[9px] text-[13px] font-medium text-white placeholder:text-white/25 focus:outline-none ${
                titleError
                  ? 'border-red'
                  : 'border-medium-grey/25 focus:border-main-purple'
              }`}
            />
            {titleError && (
              <span className="text-red pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[13px] font-medium">
                Can't be empty
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="new-task-description"
            className="text-[12px] font-bold text-white"
          >
            Description
          </label>
          <textarea
            id="new-task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            className="bg-dark-grey border-medium-grey/25 focus:border-main-purple h-28 w-full resize-none rounded-[4px] border px-4 py-[9px] text-[13px] font-medium text-white placeholder:text-white/25 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[12px] font-bold text-white">Subtasks</p>
          <div className="flex flex-col gap-3">
            {subtasks.map((subtask) => (
              <SubtaskRow
                key={subtask.id}
                value={subtask.value}
                onChange={(value) => updateSubtask(subtask.id, value)}
                onDelete={() => deleteSubtask(subtask.id)}
                error={submitted && subtask.value.trim() === ''}
              />
            ))}
            <Button variant="secondary" size="small" onClick={addSubtask}>
              + Add New Subtask
            </Button>
          </div>
        </div>

        <StatusDropdown
          value={status}
          columns={columns}
          onChange={setStatus}
          label="Status"
        />

        <Button size="small" onClick={handleCreateTask}>
          Create Task
        </Button>
      </div>
    </Modal>
  );
}
