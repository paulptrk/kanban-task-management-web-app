import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ChevronDownIcon from '../../assets/icon-chevron-down.svg?react';
import ChevronUpIcon from '../../assets/icon-chevron-up.svg?react';

const MENU_GAP = 8;

export default function StatusDropdown({
  value,
  columns = [],
  onChange,
  label = 'Current Status',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const [position, setPosition] = useState(null);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    function updatePosition() {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + MENU_GAP,
        left: rect.left,
        width: rect.width,
      });
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    document.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="flex flex-col">
      <p className="text-heading mb-2 text-[12px] font-bold">{label}</p>

      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="border-medium-grey/25 bg-surface text-heading flex w-full cursor-pointer items-center justify-between rounded-[4px] border px-4 py-[9px] text-left text-[13px] font-medium"
      >
        {columns.find((column) => column.id === selected)?.name}
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      {isOpen && position && (
        <ul
          role="listbox"
          style={{
            top: position.top,
            left: position.left,
            width: position.width,
          }}
          className="bg-menu fixed z-50 flex flex-col gap-2 rounded-[8px] p-4 shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)]"
        >
          {columns.map((column) => (
            <li
              key={column.id}
              role="option"
              aria-selected={column.id === selected}
            >
              <button
                type="button"
                onClick={() => {
                  setSelected(column.id);
                  onChange?.(column.id);
                  setIsOpen(false);
                }}
                className="hover:text-main-purple hover:bg-main-purple/25 text-medium-grey -mx-2 -my-1 w-full cursor-pointer rounded-[4px] px-2 py-1 text-left text-[13px] leading-[23px] font-medium"
              >
                {column.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
