import React, { useEffect, useState } from "react";
import { getSvgNav } from "../svg/nav.jsx";

function ToastInline({
  nameClass = '',
  nameClassBody = "",
  close,
  setClose,
  icon,
  children,
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (close) {
      setActive(false);
      setClose(false);
    }
  }, [close]);
  return (
    <div className="content-relative">
      <button className={nameClass} onClick={(e) => setActive(true)}>
        {getSvgNav(icon)}
      </button>
      <div className={`${nameClassBody} body-absolute ${active && "active"}`}>
        {children}
      </div>
      <div
        className={`content-fixed ${active && "active"}`}
        onClick={(e) => setActive(false)}
      ></div>
    </div>
  );
}

export default ToastInline;
