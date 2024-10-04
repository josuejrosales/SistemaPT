import React, { useContext } from "react";
import ToastInline from "./toast-inline.jsx";
import { getSvgNav } from "../svg/nav.jsx";
import { AppContext } from "../contexts/appContext.jsx";

function ProfileUser({ data }) {
  const { navigate, setUserSelected } = useContext(AppContext);
  return (
    <div className="item-grid">
      <div className="item-profile">
        <img className="picture-profile" src={data.avatar} />
        <div className="content-profile">
          <span className="title" style={{ color: "#dfdfdf" }}>
            {data.nombres}&nbsp;{data.apellidos}
          </span>
          <p className="info-profile">{data.nivel_acceso}</p>
          <div className="card-profile">
            <div className="card-profile-item">
              <p>Cargo</p>
              <span>{data.cargo}</span>
            </div>
            <div className="card-profile-item">
              <p>Departamento</p>
              <span>{data.departamento}</span>
            </div>
          </div>
          <div className="btn-profile">
            <span className="state">
              <span></span>
              Activo
            </span>
            <button
              onClick={(e) => {
                setUserSelected(data);
                navigate(`/user/${data.id}`);
              }}
            >
              {getSvgNav("eye", 20)}
            </button>
          </div>
        </div>
      </div>
      <div className="btn-absolute">
        <ToastInline
          nameClass="btn-option"
          icon="options"
          nameClassBody="option-proyect"
        >
          <a href="/close">Cerrar Session</a>
          <a href="/close">Cerrar Session</a>
          <a href="/close">Cerrar Session</a>
        </ToastInline>
      </div>
    </div>
  );
}

export default ProfileUser;
