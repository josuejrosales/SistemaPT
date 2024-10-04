import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CardDescriptionItem from "../../components/card-description-item.jsx";
import { getSvgNav } from "../../svg/nav.jsx";
import { AppContext } from "../../contexts/appContext.jsx";
import ProfileUserSelected from "../../components/profile-user-selected.jsx";
import { usehttpAxios } from "../../hooks/httpAxios.js";
import { getEstadoItem, getTokenUser } from "../../data/app.js";

function DetailsUser() {
  const { key } = useLocation();
  const params = useParams();

  const { response, error, startHttp, loading } = usehttpAxios(
    `/getProyectEmpleado?id=${params.id}`
  );
  const [proyects, setProyects] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const { search, setSearch, userSelected } = useContext(AppContext);

  const getStatisticsItem = (estado) => {
    return statistics.find(function (obj) {
      return obj.estado === estado;
    });
  };

  useEffect(() => {
    if (search.start && key == search.key) {
      startHttp(getTokenUser(), {
        value: `&&search=${search.value.trim()}`,
      });
    }
  }, [search, key]);

  useEffect(() => {
    if (response) {
      response.data?.proyects && setProyects(response.data.proyects);
      response.data?.statistics && setStatistics(response.data.statistics);
    }
  }, [response]);

  useEffect(() => {
    setSearch({
      ...search,
      placeholder: "empleado proyecto",
      start: false,
      key,
    });
    startHttp(getTokenUser());
  }, []);

  return (
    <div className="content-details-user">
      <div className="item-details-left">
        {userSelected && <ProfileUserSelected data={userSelected} />}
      </div>
      <div className="item-grid item-card-description">
        <div className="card-description">
          <CardDescriptionItem data={getStatisticsItem("activo")} />
          <CardDescriptionItem data={getStatisticsItem("finalizado")} />
          <CardDescriptionItem data={getStatisticsItem("suspendido")} />
          <CardDescriptionItem data={getStatisticsItem("retirado")} />
        </div>
        <div className="proyect-details">
          <div className="proyect-details-header">
            <h1>Proyectos participados</h1>
            <div className="block-state-content">
              <div className="block-state-item">
                <span>Activos</span>
                <span className="state-icon green"></span>
              </div>
              <div className="block-state-item">
                <span>Finalizados</span>
                <span className="state-icon gray"></span>
              </div>
              <div className="block-state-item">
                <span>Suspendido</span>
                <span className="state-icon blue"></span>
              </div>
              <div className="block-state-item">
                <span>Retirados</span>
                <span className="state-icon red"></span>
              </div>
            </div>
          </div>
          <div className="proyect-all">
            {proyects.map((item, i) => (
              <div className="item-proyect" key={i}>
                <div className="item-header">
                  <span className="title" style={{ color: "#dfdfdf" }}>
                    {item.nombre_proyecto}
                  </span>
                  <span
                    className={`state-icon ${getEstadoItem(item.estado)}`}
                  ></span>
                </div>
                <div className="item-fotter">
                  <span>{item.fecha}</span>
                  <button style={{ color: "#9E9E9E" }} onClick={(e) => {}}>
                    {getSvgNav("eye", 20)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsUser;
