import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";

const Detalle = () => {
  const { actions, store } = useContext(Context);
  const { agendasslug } = useParams();
  const [detalleAgenda, setDetalleAgenda] = useState(null);

  const fetchData = async () => {
    const resp = await actions.getAgenda(agendasslug);
    setDetalleAgenda(resp);
  };

  const [nameValue, setNameValue] = useState("");
  const [telefonoValue, setTelefonoValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const validateInputName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const validateInputTel = (tel) => /^[0-9]+$/.test(tel);

  const handleNameChange = (event) => {
    const value = event.target.value;
    if (validateInputName(value) || value === "") {
      setNameValue(value);
    }
  };

  const handleTelChange = (event) => {
    const value = event.target.value;
    if (validateInputTel(value) || value === "") {
      setTelefonoValue(value);
    }
  };

  const save = () => {
    const newContact = {
      name: nameValue,
      phone: telefonoValue,
      email: emailValue,
      address: addressValue,
    };
    setNewContact(newContact);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const agregarContacto = () => {
    const newContact = {
      name: nameValue,
      phone: telefonoValue,
      email: emailValue,
      address: addressValue,
    };
    detalleAgenda.contacts.push(newContact);
    actions.postContacto(newContact);

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

  return (
    <div className="container text-center">
      <h1>Contactos de {agendasslug}</h1>

      <div className="container mt-3">
        <div className="row mb-3 justify-content-center ">
          <div className="col-3">
            <input
              className="form-control"
              value={nameValue}
              onChange={handleNameChange}
              placeholder="Nombre de contacto"
            />
          </div>
          <div className="col-3">
            <input
              className="form-control"
              value={telefonoValue}
              onChange={handleTelChange}
              placeholder="Teléfono"
            />
          </div>
          <div className="col-3">
            <input
              className="form-control"
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="col-3">
            <input
              className="form-control"
              value={addressValue}
              onChange={(event) => setAddressValue(event.target.value)}
              placeholder="Dirección"
            />
          </div>
        </div>

        <button className="btn btn-primary" onClick={agregarContacto}>
          Aceptar
        </button>
      </div>

      <div className="container mt-4">
        <div className="row mb-3 justify-content-center bg-info">
          <div className="col-3">
            <h2>Nombre</h2>
          </div>
          <div className="col-3">
            <h2>Teléfono</h2>
          </div>
          <div className="col-3">
            <h2>Email</h2>
          </div>
          <div className="col-3">
            <h2>Dirección</h2>
          </div>
        </div>
        {detalleAgenda.contacts.map((item) => (
          <div className="row mt-4 justify-content-center" key={item.id}>
            <div className="col-3">{item.name}</div>
            <div className="col-2">{item.phone}</div>
            <div className="col-3">{item.email}</div>
            <div className="col-2">{item.address}</div>
            <div className="col-2 text-end">
              <button
                className="btn btn-danger"
                onClick={() => {
                  eliminarContacto(item.id);
                }}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      <Link className="btn btn-secondary mt-3" to="/">
        Agendas
      </Link>
    </div>
  );
};

export default Detalle;
