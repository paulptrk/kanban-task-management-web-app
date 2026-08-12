import { useRef, useEffect } from 'react';

// Wraps the native <dialog> element, which handles focus trapping, the
// backdrop, and Escape for free. The isOpen prop is synced to the dialog's
// imperative showModal()/close() API via the effect below
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

  // Clicks on the backdrop register on the <dialog> itself; clicks inside
  // land on the padded content div, so this only closes on outside clicks
  function handleBackdropClick(e) {
    if (e.target === dialogRef.current) dialogRef.current.close();
  }

  return (
    <dialog
      onClick={handleBackdropClick}
      ref={dialogRef}
      // Fires for every close path (Escape, backdrop, close()), so parent
      // state stays in sync no matter how the dialog was dismissed
      onClose={onClose}
      className={`bg-surface m-auto w-[calc(100%-32px)] tablet:w-[480px] rounded-[6px] border-0 backdrop:bg-black/50 ${className}`}
    >
      <div className="rounded-[6px] p-8 max-tablet:p-6">{children}</div>
    </dialog>
  );
}
