import { Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import React from "react";
import App from "../../App";
import DetalheFilme from "../DetalheFilme/DetalheFilme";
import FormAvaliacao from "../FormAvaliacao/FormAvaliacao";
import Memorias from "../Memorias/Memorias";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/filme/:id" element={<DetalheFilme />} />
      <Route path="/formulario-avaliacao/:id" element={<FormAvaliacao />} />
      <Route path="/memorias" element={<Memorias />} />
    </Routes>
  );
}

export default AppRouter;
