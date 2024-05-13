import React, { useState } from "react";

import "../../styles/agregar.css";


export const Agregar = () => {

  const [inputValue, setInputValue] = useState("");

  const [name, setName] = useState("");
  const validateInput = () => {
    if (!inputValue.trim()) alert("Nombre de Contacto");
    setInputValue("");
  };

  return (
    <div className="container text-center " id="contagregar">
      <div className="row" id="agr">
        <div className="col-3">
          <input
            className=""
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && validateInput()}
            placeholder="Nombre de contacto"
          ></input>
        </div>
        <div className="col-3">
          {" "}
          <input placeholder="Teléfono"></input>
        </div>
        <div className="col-3">
          <input placeholder="Email"></input>
        </div>
        <div className="col-3">
          <input placeholder="Dirección"></input>
        </div>
      </div>

      <button className="mt-5">GuardarContacto</button>
      <div>Volver a la agenda</div>
    </div>
  );
};
