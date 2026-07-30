import { useRef, useEffect } from 'react';

export default function Modal({ children, className = '', isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  function handleBackdropClick(e) {
    if (e.target === dialogRef.current) dialogRef.current.close();
  }

  return (
    <dialog
      onClick={handleBackdropClick}
      ref={dialogRef}
      onClose={onClose}
      className={`bg-surface m-auto w-[480px] rounded-[6px] border-0 backdrop:bg-black/50 ${className}`}
    >
      <div className="rounded-[6px] p-8">{children}</div>
    </dialog>
  );
}
