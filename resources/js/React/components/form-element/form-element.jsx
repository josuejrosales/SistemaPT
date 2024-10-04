import React from "react";
import { getSvgNav } from "../../svg/nav.jsx";
import './form-element.css';

function FormInput({
  type = "text",
  label,
  placeholder,
  value,
  setValue,
  error = null,
}) {
  return (
    <div className="form-item">
      <label>{label}</label>
      <div className="form-input">
        <input
          type={type}
          value={value || ""}
          placeholder={placeholder || ""}
          onChange={(e) => setValue(e.target.value)}
        />
        {error && (
          <span>
            {getSvgNav("time")}
            <div className="span-notify">{error.message || "error"}</div>
          </span>
        )}
      </div>
    </div>
  );
}
function FormSection({ title = "", children }) {
  return (
    <div className="form-section">
      <p>{title}</p>
      {children}
    </div>
  );
}

function FormElement({ title, children }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2 className="titleForm">{title}</h2>
      <div className="form-body">{children}</div>
    </form>
  );
}

export { FormElement, FormSection, FormInput };
