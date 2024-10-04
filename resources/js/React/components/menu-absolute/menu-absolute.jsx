import React, { useState } from "react";
import ToastInline from "../toast-inline.jsx";
import './menu-absolute.css';

const MenuAbsolute = ({ items = [], children }) => {
  const [close, setClose] = useState(false);
  return (
    <div className="options-absolute">
      <ToastInline
        nameClass="btn-option"
        icon="options"
        nameClassBody="options-content"
        close={close}
        setClose={setClose}
      >
        {items.map((item, i) => (
          <button
            key={i}
            className="link-btn"
            onClick={(e) => {
              setClose(true);
              item.click(e);
            }}
          >
            {item.label}
          </button>
        ))}
        {children}
      </ToastInline>
    </div>
  );
};

export default MenuAbsolute;
