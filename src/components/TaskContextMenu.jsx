import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import VerticalEllipsisIcon from '../../assets/icon-vertical-ellipsis.svg?react';

const MENU_WIDTH = 192;
const MENU_GAP = 16;

export default function TaskContextMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    if (!isOpen) return;

    function updatePosition() {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + MENU_GAP,
        left: rect.left + rect.width / 2 - MENU_WIDTH / 2,
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
    <div ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Task menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <VerticalEllipsisIcon />
      </button>

      {isOpen && position && (
        <div
          role="menu"
          style={{ top: position.top, left: position.left }}
          className="bg-very-dark-grey fixed z-50 flex w-48 flex-col gap-4 rounded-[8px] p-4 shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)]"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="text-medium-grey hover:bg-main-purple/25 -mx-2 -my-1 cursor-pointer rounded-[4px] px-2 py-1 text-left text-[13px] leading-[23px] font-medium"
          >
            Edit Task
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="text-red hover:bg-red/25 -mx-2 -my-1 cursor-pointer rounded-[4px] px-2 py-1 text-left text-[13px] leading-[23px] font-medium"
          >
            Delete Task
          </button>
        </div>
      )}
    </div>
  );
}
