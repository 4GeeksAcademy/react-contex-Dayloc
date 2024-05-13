import React, { useContext, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const { store, actions } = useContext(Context);

  const { agendas } = store;

  if (!agendas) return null;

  const validateInput = () => {
    if (!inputValue.trim()) alert("La lista no puede estar vacia");

    actions.postAgenda(inputValue);
    setInputValue("");
  };

  return (
    <div className="container d-flex flex-row justify-content-center alig-items-center">
      <div className="ul1 ">
        <h1>Listas de Contactos</h1>
        <div className="row mb-2" id="add">
          <div className="col-10">
            <input
              className="agregar"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && validateInput()}
              placeholder="Añadir nueva lista de contactos"
            ></input>
          </div>
          <div className="col-2">
            {" "}
            <button className="addlist" onClick={() => validateInput()}>
              Guardar
            </button>
          </div>
        </div>
        {agendas.map((agendas) => (
          <Link to={`/Detalle/${agendas.slug}`}>
            <div className="row " key={agendas.id} id="list">
              <div className="col-2">{agendas.id}</div>

              <div className="col-10 "> {agendas.slug}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
