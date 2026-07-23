import Modal from './Modal';
import VerticalEllipsisIcon from '../../assets/icon-vertical-ellipsis.svg?react';
import CheckIcon from '../../assets/icon-check.svg?react';
import ChevronDownIcon from '../../assets/icon-chevron-down.svg?react';
import { useKanbanStore } from '../store/useKanbanStore';

export default function TaskDetailModal() {
  const selectedTask = useKanbanStore((state) => state.selectedTask);
  const setSelectedTask = useKanbanStore((state) => state.setSelectedTask);

  return (
    <Modal isOpen={selectedTask !== null} onClose={() => setSelectedTask(null)}>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <p className="text-[18px] font-bold text-white">
            Research pricing points of various competitors and trial different
            business models
          </p>
          <button type="button" aria-label="Task menu">
            <VerticalEllipsisIcon />
          </button>
        </div>

        <p className="text-medium-grey text-[13px] leading-[23px] font-medium">
          We know what we&apos;re planning to build for version one. Now we need
          to finalise the first pricing model we&apos;ll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </p>

        <div className="flex flex-col">
          <p className="mb-4 text-[12px] font-bold text-white">
            Subtasks (2 of 3)
          </p>
          <div className="flex flex-col gap-2">
            <label className="bg-very-dark-grey flex items-center gap-4 rounded-[4px] px-3 py-[13px]">
              <input type="checkbox" defaultChecked className="sr-only" />
              <span className="bg-main-purple flex size-4 shrink-0 items-center justify-center rounded-[2px]">
                <CheckIcon />
              </span>
              <span className="text-[12px] font-bold text-white/50 line-through">
                Research competitor pricing and business models
              </span>
            </label>

            <label className="bg-very-dark-grey flex items-center gap-4 rounded-[4px] px-3 py-[13px]">
              <input type="checkbox" defaultChecked className="sr-only" />
              <span className="bg-main-purple flex size-4 shrink-0 items-center justify-center rounded-[2px]">
                <CheckIcon />
              </span>
              <span className="text-[12px] font-bold text-white/50 line-through">
                Outline a business model that works for our solution
              </span>
            </label>

            <label className="bg-very-dark-grey flex items-center gap-4 rounded-[4px] px-3 py-[13px]">
              <input type="checkbox" className="sr-only" />
              <span className="border-medium-grey/25 size-4 shrink-0 rounded-[2px] border" />
              <span className="text-[12px] font-bold text-white">
                Talk to potential customers about our proposed solution and ask
                for fair price expectancy
              </span>
            </label>
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
    </Modal>
  );
}
