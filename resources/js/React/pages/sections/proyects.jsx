import React, { useContext, useEffect, useState } from "react";
import { getSvgNav } from "../../svg/nav.jsx";
import ToastInline from "../../components/toast-inline.jsx";
import { AppContext } from "../../contexts/appContext.jsx";
import { useLocation } from "react-router-dom";
import { usehttpAxios } from "../../hooks/httpAxios.js";
import { getTokenUser } from "../../data/app.js";

function Proyects() {
  const { key } = useLocation();
  const { search, setSearch } = useContext(AppContext);

  const { response, error, startHttp, loading } =
    usehttpAxios("/getProyectAll");

  const [registers, setRegisters] = useState([]);

  useEffect(() => {
    response && setRegisters(response.data);
  }, [response]);

  useEffect(() => {
    setSearch({ ...search, placeholder: "proyecto", start: false, key });
    startHttp(getTokenUser());
  }, []);
  return (
    <div className="data-grid">
      {registers.map((item, i) => (
        <div key={i} className="item-grid">
          <div className="item-header">
            <span className="title" style={{ color: "#ffc107" }}>
              {item.nombre_proyecto}
            </span>
          </div>
          <div className="item-body">
            <p>{item.descripcion}</p>
          </div>
          <div className="item-fotter">
            <div className="states">
              <span>{item.estado}</span>
            </div>
            <span>
              {item.fecha_inicio}
              {getSvgNav("time")}
            </span>
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
      ))}
    </div>
  );
}

export default Proyects;
