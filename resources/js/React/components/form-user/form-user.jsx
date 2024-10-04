import React, { useEffect, useState } from "react";
import {
  FormElement,
  FormInput,
  FormSection,
} from "../form-element/form-element.jsx";

import LOAD from "../../global/load.js";
import { getSvgNav } from "../../svg/nav.jsx";

import './form-user.css';


var photoInitial = {
  data: null,
  base64: "",
  progress: LOAD.initial,
};

function FormUser() {
  const [photo, setPhoto] = useState(photoInitial);

  useEffect(() => {
    if (photo.data) {
      const reader = new FileReader();
      reader.onload = function (evento) {
        const base64 = evento.target.result;
        setPhoto({ ...photo, base64, progress: LOAD.complete });
      };
      reader.readAsDataURL(photo.data);
    }
  }, [photo.data]);

  return (
    <FormElement title={"Nuevo Empleado"}>
      <FormSection title="Avatar">
        <div className="input-avatar">
          <label
            htmlFor="avatar-user"
            style={{
              ...(photo.data &&
                photo.progress == LOAD.complete && {
                backgroundImage: `url(${photo.base64})`,
                backgroundColor: "#242424",
              }),
            }}
          >
            {photo.data == null ? <span>{getSvgNav("photo", 30)}</span> : ""}
          </label>
          {photo.progress == LOAD.complete && (
            <button
              className="cancel-photo"
              onClick={(e) => {
                e.stopPropagation();
                setPhoto(photoInitial);
              }}
            >
              {getSvgNav("close-modal", 20)}
            </button>
          )}
          <input
            id="avatar-user"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setPhoto({
                data: file,
                base64: "",
                progress: file ? LOAD.progress : LOAD.initial,
              });
            }}
          />
        </div>
      </FormSection>

      <FormSection title="Informacion">
        <FormInput
          label="nombre"
          value={null}
          placeholder={"aqui"}
          setValue={() => { }}
        />
        <FormInput
          label="nombre"
          value={null}
          placeholder={"aqui"}
          setValue={() => { }}
        />
      </FormSection>
    </FormElement>
  );
}

export default FormUser;
