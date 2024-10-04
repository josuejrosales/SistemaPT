import React from "react";

import { Route, Routes } from "react-router-dom";
import Templater from "../template/app-template.jsx";
import './user.css';
import Empleados from "../sections/empleados.jsx";

function User() {

  return (
    <Templater>
      <Routes>

        <Route path="/" element={<Empleados />} />
        <Route path="/empleados" element={"home 2"} />

      </Routes>
    </Templater>
  );
}

export default User;
