import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ChevronDownIcon from '../../assets/icon-chevron-down.svg?react';
import ChevronUpIcon from '../../assets/icon-chevron-up.svg?react';

const STATUSES = ['Todo', 'Doing', 'Done'];
const MENU_GAP = 8;

export default function StatusDropdown({ status }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(status);
  const [position, setPosition] = useState(null);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setSelected(status);
  }, [status]);

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
      <p className="mb-2 text-[12px] font-bold text-white">Current Status</p>

      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="border-medium-grey/25 bg-dark-grey flex w-full items-center justify-between rounded-[4px] border px-4 py-[9px] text-left text-[13px] font-medium text-white"
      >
        {selected}
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      {isOpen && position && (
        <ul
          role="listbox"
          style={{ top: position.top, left: position.left, width: position.width }}
          className="bg-very-dark-grey fixed z-50 flex flex-col gap-2 rounded-[8px] p-4 shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)]"
        >
          {STATUSES.map((option) => (
            <li key={option} role="option" aria-selected={option === selected}>
              <button
                type="button"
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className="hover:text-main-purple text-medium-grey w-full text-left text-[13px] leading-[23px] font-medium"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
