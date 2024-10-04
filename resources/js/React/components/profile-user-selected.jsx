import React from "react";

function ProfileUserSelected({ data }) {
  return (
    <React.Fragment>
      <img className="avatar" src={data.avatar} alt="" />
      <div className="details-description" style={{ width: "100%" }}>
        <div className="block-description">
          <p className="info-profile">Nombres</p>
          <span className="title">{data.nombres}</span>
        </div>
        <div className="block-description">
          <p className="info-profile">Apellidos</p>
          <span className="title">{data.apellidos}</span>
        </div>
        <div className="block-description">
          <p className="info-profile">Tipo de usuario</p>
          <span className="title">{data.nivel_acceso}</span>
        </div>
        <div className="block-description">
          <p className="info-profile">Fecha de registro</p>
          <span
            className="title"
            style={{ color: "#8bc34a", fontSize: "0.8rem" }}
          >
            {data.fecha_registro}
          </span>
        </div>
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
      </div>
    </React.Fragment>
  );
}

export default ProfileUserSelected;
