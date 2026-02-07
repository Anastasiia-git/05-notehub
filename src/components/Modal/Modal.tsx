import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return createPortal(
    <div
      onClick={onClose}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div onClick={(e) => e.stopPropagation()} className={css.modal}>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
