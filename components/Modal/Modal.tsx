import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface Modal {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: Modal) {
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const onBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onBackdropClick}
    >
      <div className={css.modal}>
        {children}
      </div>
    </div>,
    document.body
  );
}
