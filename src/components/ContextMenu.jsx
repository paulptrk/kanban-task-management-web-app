import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import VerticalEllipsisIcon from '../../assets/icon-vertical-ellipsis.svg?react';

const MENU_WIDTH = 192;
const MENU_GAP = 16;

export default function ContextMenu({ label, items, align = 'center' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    if (!isOpen) return;

    function updatePosition() {
      const rect = buttonRef.current.getBoundingClientRect();
      const left =
        align === 'end'
          ? rect.right - MENU_WIDTH
          : rect.left + rect.width / 2 - MENU_WIDTH / 2;
      setPosition({ top: rect.bottom + MENU_GAP, left });
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    document.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, align]);

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
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="cursor-pointer"
        onClick={() => setIsOpen((open) => !open)}
      >
        <VerticalEllipsisIcon />
      </button>

      {isOpen && position && (
        <div
          role="menu"
          style={{ top: position.top, left: position.left }}
          className="bg-menu fixed z-50 flex w-48 flex-col gap-4 rounded-[8px] p-4 shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)]"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                item.onClick?.();
              }}
              className={`-mx-2 -my-1 cursor-pointer rounded-[4px] px-2 py-1 text-left text-[13px] leading-[23px] font-medium ${
                item.variant === 'destructive'
                  ? 'text-red hover:bg-red/25'
                  : 'text-medium-grey hover:bg-main-purple/25'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
