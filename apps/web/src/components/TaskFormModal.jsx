import { useEffect, useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import StatusDropdown from './StatusDropdown';
import TextInputRow from './TextInputRow';
import { useKanbanStore } from '../store/useKanbanStore';
import { createTask } from '../utils/normalizeData';

// Draft rows get their own ids so React keys stay stable while the user
// adds/removes/reorders inputs
function createEmptySubtask() {
  return { id: crypto.randomUUID(), value: '' };
}

// Handles both create and edit; edit mode is inferred from a task being passed
export default function TaskFormModal({
  isOpen,
  onClose,
  columns = [],
  task = null,
  currentColumnId,
}) {
  const isEditMode = task !== null;

  const addTask = useKanbanStore((state) => state.addTask);
  const updateTask = useKanbanStore((state) => state.updateTask);
  const moveTask = useKanbanStore((state) => state.moveTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState([
    createEmptySubtask(),
    createEmptySubtask(),
  ]);
  const [status, setStatus] = useState(columns[0]?.id);
  const [originalColumnId, setOriginalColumnId] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Re-seed the form each time the modal opens: prefill from the task when
  // editing, reset to blanks when creating. The modal stays mounted between
  // opens, so state would otherwise leak from the previous session
  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode) {
      setTitle(task.title);
      setDescription(task.description);
      setSubtasks(
        task.subtasks.map((subtask) => ({
          id: subtask.id,
          value: subtask.title,
          isCompleted: subtask.isCompleted,
        }))
      );
      setStatus(currentColumnId);
      setOriginalColumnId(currentColumnId);
    } else {
      setTitle('');
      setDescription('');
      setSubtasks([createEmptySubtask(), createEmptySubtask()]);
      setStatus(columns[0]?.id);
    }
    setSubmitted(false);
  }, [isOpen]);

  // Validation errors only show after the first submit attempt
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

  function handleSubmit() {
    setSubmitted(true);

    const hasEmptyTitle = title.trim() === '';
    const hasEmptySubtask = subtasks.some(
      (subtask) => subtask.value.trim() === ''
    );
    if (hasEmptyTitle || hasEmptySubtask) return;

    if (isEditMode) {
      // Map draft rows back to the store's subtask shape (value -> title).
      // isCompleted is undefined for rows added in this session, which is
      // falsy, so new subtasks start unchecked
      updateTask(task.id, {
        title,
        description,
        subtasks: subtasks.map((subtask) => ({
          id: subtask.id,
          title: subtask.value,
          isCompleted: subtask.isCompleted,
        })),
      });
      // Column changes are a separate store action, only fired if the
      // status actually changed
      if (status !== originalColumnId) {
        moveTask(task.id, status);
      }
    } else {
      const newTask = createTask(
        title,
        description,
        subtasks.map((subtask) => subtask.value)
      );
      addTask(newTask, status);
    }

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <p className="text-heading text-[18px] font-bold">
          {isEditMode ? 'Edit Task' : 'Add New Task'}
        </p>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="task-title"
            className="text-heading text-[12px] font-bold"
          >
            Title
          </label>
          <div className="relative">
            <input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Take coffee break"
              className={`bg-surface text-heading placeholder:text-heading/25 w-full rounded-[4px] border px-4 py-[9px] text-[13px] font-medium focus:outline-none ${
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
            htmlFor="task-description"
            className="text-heading text-[12px] font-bold"
          >
            Description
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            className="bg-surface border-medium-grey/25 focus:border-main-purple text-heading placeholder:text-heading/25 h-28 w-full resize-none rounded-[4px] border px-4 py-[9px] text-[13px] font-medium focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-heading text-[12px] font-bold">Subtasks</p>
          <div className="flex flex-col gap-3">
            {subtasks.map((subtask) => (
              <TextInputRow
                key={subtask.id}
                value={subtask.value}
                onChange={(value) => updateSubtask(subtask.id, value)}
                onDelete={() => deleteSubtask(subtask.id)}
                error={submitted && subtask.value.trim() === ''}
                deleteLabel="Delete subtask"
              />
            ))}
            <Button
              variant="secondary"
              size="small"
              className="w-full"
              onClick={addSubtask}
            >
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

        <Button size="small" className="w-full" onClick={handleSubmit}>
          {isEditMode ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </Modal>
  );
}
