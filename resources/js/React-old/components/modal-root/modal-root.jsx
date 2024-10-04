import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './modal-root.css';

export default function ModalRoot({
  modal,
  setModal,
  onClose,
  children,
  hideClick = false,
  classContent = "",
  classRoot = "",
  styleContent = {},
  styleRoot = {},
  timeClose = 2000,
}) {
  const [loadElement, setloadElement] = useState(true);

  useEffect(() => {
    modal.close && setTimeout(() => onClose(), timeClose);
    modal.open && setTimeout(() => setloadElement(false), timeClose);

    return () => setloadElement(true);
  }, [modal, onClose, timeClose, setloadElement]);

  return ReactDOM.createPortal(

    <div className={`${classRoot} ${modal.close ? "inactive" : "active"}`}
      onClick={() => !loadElement && hideClick && setModal({ ...modal, open: true, close: true })}
      style={styleRoot}>

      <div className={`${classContent}  ${modal.close ? "inactive" : "active"}`}
        style={styleContent}
        onClick={(e) => e.stopPropagation()}>

        {children}

        <button className="btnModalClose"
          onClick={(e) => setModal({ ...modal, open: true, close: true })}>

          close modal
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
