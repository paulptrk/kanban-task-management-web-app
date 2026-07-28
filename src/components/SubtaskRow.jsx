import CrossIcon from '../../assets/icon-cross.svg?react';

export default function SubtaskRow({ value, onChange, onDelete, error }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Make coffee"
          className={`bg-dark-grey w-full rounded-[4px] border py-[9px] pr-4 pl-4 text-[13px] font-medium text-white placeholder:text-white/25 focus:outline-none ${
            error
              ? 'border-red'
              : 'border-medium-grey/25 focus:border-main-purple'
          }`}
        />
        {error && (
          <span className="text-red pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[13px] font-medium">
            Can't be empty
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete subtask"
        className={`cursor-pointer ${error ? 'text-red' : 'text-medium-grey hover:text-red'}`}
      >
        <CrossIcon className="size-[15px]" />
      </button>
    </div>
  );
}
