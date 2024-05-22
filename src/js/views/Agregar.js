import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/agregar.css";

export const Agregar = () => {
  const [nameValue, setNameValue] = useState("");
  const [telefonoValue, setTelefonoValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const validateInputName = () => {
    if (!validateInputName.trim()) alert("Nombre de Contacto necesario");
    setNameValue("");
  };
  const validateInputTel = () => {
    if (!validateInputTel.trim()) alert("Telefono nrcesario");
    setTelefonoValue("");
  };
  const validateInputEmail = () => {
    if (!validateInputEmail.trim()) alert("Email Necesario");
    setEmailValue("");
  };
  const validateInputAddress = () => {
    if (!validateInputAddress.trim()) alert("Dirección");
    setAddressValue("");
  };
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const saveContact = [
    {
      name: nameValue,
      phone: telefonoValue,
      email: emailValue,
      address: addressValue,
    },
  ];
  const todos = () => {
    setNewContact(saveContact);

    setNameValue("");
    setTelefonoValue("");
    setEmailValue("");
    setAddressValue("");
  
  };
  console.log("newContact", newContact);
  return (
    <div className="container text-center " id="contagregar">
      <div className="row" id="agr">
        <div className="col-3">
          <input
            className="Name"
            value={nameValue}
            onChange={(event) => setNameValue(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && validateInputName()}
            placeholder="Nombre de contacto"
          ></input>
        </div>
        <div className="col-3">
          {" "}
          <input
            className="telefono"
            value={telefonoValue}
            onChange={(event) => setTelefonoValue(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && validateInputTel()}
            placeholder="Teléfono"
          ></input>
        </div>
        <div className="col-3">
          <input
            className="email"
            value={emailValue}
            onChange={(event) => setEmailValue(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && validateInputEmail()}
            placeholder="Email"
          ></input>
        </div>
        <div className="col-3">
          <input
            className="direccion"
            value={addressValue}
            onChange={(event) => setAddressValue(event.target.value)}
            onKeyDown={(event) =>
              event.key === "Enter" && validateInputAddress()
            }
            placeholder="Dirección"
          ></input>
        </div>
      </div>

      <button className="guardar" onClick={() => todos()}>
        Guardar
      </button>
    </div>
  );
};
