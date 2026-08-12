import Modal from './Modal';
import Button from './Button';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Delete',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <p className="text-red text-[18px] font-bold">{title}</p>
        <p className="text-medium-grey text-[13px] leading-[23px] font-medium">
          {message}
        </p>
        <div className="flex gap-4">
          <Button
            variant="destructive"
            size="small"
            className="flex-1"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
          <Button
            variant="secondary"
            size="small"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
