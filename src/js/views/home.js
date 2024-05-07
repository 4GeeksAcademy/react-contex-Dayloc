import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Home = () => {
  const { actions, store } = useContext(Context);

  const { agendas } = store;

  if (!agendas) return null;

  return (
    <div className="container p-5 text-center mt-5 ">
      <h1>Listas de Contactos</h1>
      <div className="ul1 ">
        {agendas.map((agendas) => (
          <div className="row" key={agendas.id}>
            <div className="col-2">{agendas.id}-------------</div>
            <div className="col-10 "> {agendas.slug}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
