import { useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/appContext.jsx";

// import ModalRoot from "../../components/modal-root.jsx";


import MenuAbsolute from "../../components/menu-absolute/menu-absolute.jsx";
import ProfileUser from "../../components/profile-user.jsx";
import Loading from "../../components/loading.jsx";


import LOAD from "../../global/load.js";
import ModalRoot from "../../components/modal-root/modal-root.jsx";
import FormUser from "../../components/form-user/form-user.jsx";
import { usehttpAxios } from "../../hooks/useHttpAxios.js";

function Empleados() {

  const { key } = useLocation();

  const [modalNewUser, setModalNewUser] = useState({
    open: true,
    close: false,
  });

  const { response, error, startHttp, loading } =
    usehttpAxios({ url: "/getContentSectionHeader/1", force: true });

  const [registers, setRegisters] = useState([]);

  const { search, setSearch } = useContext(AppContext);

  useEffect(() => {
    if (search.start && key == search.key) {
      startHttp(getTokenUser(), { value: `?search=${search.value.trim()}` });
    }
  }, [search, key]);

  useEffect(() => {
    error && console.log(error);
  }, [error]);

  useEffect(() => {
    response && setRegisters(response.data);
  }, [response]);

  useEffect(() => {
    setSearch({ ...search, placeholder: "empleado", start: false, key });
    // startHttp();
  }, []);

  return (
    <div className="data-grid">
      {loading != LOAD.complete && loading != LOAD.initial ? (
        <Loading />
      ) : (
        registers.map((item, i) => <ProfileUser key={i} data={item} />)
      )}
      <button onClick={e => startHttp()} style={{ backgroundColor: "gray" }}>GET</button>

      <MenuAbsolute
        items={[
          {
            label: "Nuevo empleado",
            click: (e) => {
              setModalNewUser({ ...modalNewUser, open: true });
            },
          },
        ]}
      />

      {/* {modalNewUser.open && (
        <ModalRoot
          modal={modalNewUser}
          setModal={setModalNewUser}
          onClose={() => {
            setModalNewUser({ open: false, close: false });
          }}
          classRoot="modal-space-fixed"
          classContent="modal-space-content"
          hideClick={true}
          timeClose={500}
        >
          <FormUser />

        </ModalRoot>
      )} */}
    </div >
  );
}

export default Empleados;
