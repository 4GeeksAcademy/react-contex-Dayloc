import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";
import "../../styles/DetalleDeAgenda.css";
import { Link } from "react-router-dom";

const Detalle = () => {
  const { actions, store } = useContext(Context);
  const { agendasslug } = useParams();
  const [detalleAgenda, setDetalleAgenda] = useState(null);
  const fetchData = async () => await actions.getAgenda(agendasslug);
  const [contact, setContact] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [telefonoValue, setTelefonoValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const validateInputName = () => {
    if (!validateInputName.trim()) alert("Nombre de Contacto necesario");
    setNameValue("");
  };
  const validateInputTel = () => {
    if (!validateInputTel.trim()) alert("Telefono necesario");
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
  const saveContact = {
    name: nameValue,
    phone: telefonoValue,
    email: emailValue,
    address: addressValue,
  };

  const save = () => {
    setNewContact(saveContact);
  };

  useEffect(() => {
    fetchData().then((resp) => setDetalleAgenda(resp));
  }, []);

  const agregarContacto = () => {
    detalleAgenda.contacts.push(newContact);

    actions.postContacto(newContact);
    setContact();
    setNameValue("");
    setTelefonoValue("");
    setEmailValue("");
    setAddressValue("");
  };

  if (!(detalleAgenda && detalleAgenda.contacts)) return null;
  const eliminarContacto = async (id) => {
    await actions.deleteContact(id);
    setDetalleAgenda({
      ...detalleAgenda,
      contacts: detalleAgenda.contacts.filter((contact) => contact.id !== id),
    });
  };

  console.log(store);
  return (
    <div className="text-center">
      <h1>Contactos de {agendasslug}</h1>

      <div className="container">
        <div className="row mb-3" id="cabecera">
          <div className="col-3">
            <h2>Nombre</h2>
          </div>
          <div className="col-3">
            <h2>Telefono</h2>
          </div>
          <div className="col-3">
            <h2>Email</h2>
          </div>
          <div className="col-3">
            <h2>Dirección</h2>
            <i className="bi bi-trash"></i>
          </div>
        </div>

        {detalleAgenda.contacts.map((item) => (
          <div className="row " key={item.id} id="lisdeta">
            <div className="col-3"> {item.name}</div>
            <div className="col-2">{item.phone}</div>
            <div className="col-3">{item.email}</div>
            <div className="col-2">{item.address} </div>
            <div className="col-2 text-end">
              <button
                className="eliminar "
                onClick={() => {
                  eliminarContacto(item.id);
                }}
              >
                X{" "}
              </button>
            </div>
          </div>
        ))}
        <div className=" text-center mt-3 " id="contagregar">
          <div className="row mb-3" id="agr">
            <div className="col-3">
              <input
                className="Name"
                value={nameValue}
                onChange={(event) => setNameValue(event.target.value)}
                onKeyDown={(event) =>
                  event.key === "Enter" && validateInputName()
                }
                placeholder="Nombre de contacto"
              ></input>
            </div>
            <div className="col-3">
              {" "}
              <input
                className="telefono"
                value={telefonoValue}
                onChange={(event) => setTelefonoValue(event.target.value)}
                onKeyDown={(event) =>
                  event.key === "Enter" && validateInputTel()
                }
                placeholder="Teléfono"
              ></input>
            </div>
            <div className="col-3">
              <input
                className="email"
                value={emailValue}
                onChange={(event) => setEmailValue(event.target.value)}
                onKeyDown={(event) =>
                  event.key === "Enter" && validateInputEmail()
                }
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

          
            <button className="guardar" onClick={() => save()}>
              Save
            </button>
          
        
            <button className="guardar" onClick={() => agregarContacto()}>
              Acceptar
            </button>
         
        </div>
        <Link className="ms-5 mt-3" to="/">
          Agendas
        </Link>
      </div>
    </div>
  );
};

export default Detalle;
