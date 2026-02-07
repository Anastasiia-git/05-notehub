import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm";

interface ModalProps {
  onClose: () => void;
}

function Modal({ onClose }: ModalProps) {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    if (!modalRoot) return;

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
  }, [onClose, modalRoot]);

  if (!modalRoot) return null;

  return createPortal(
    <div
      onClick={onClose}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div onClick={(e) => e.stopPropagation()} className={css.modal}>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
