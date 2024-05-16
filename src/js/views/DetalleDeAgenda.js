import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";
import "../../styles/DetalleDeAgenda.css";
import { Link } from "react-router-dom";

const Detalle = () => {
  const { actions } = useContext(Context);
  const { agendasslug } = useParams();
  const [detalleAgenda, setDetalleAgenda] = useState(null);
  const fetchData = async () => await actions.getAgenda(agendasslug);
  const [contac, setContact] = useState("");

  useEffect(() => {
    fetchData().then((resp) => setDetalleAgenda(resp));
  }, []);

  const validateInput = async () => {
    if (!contac.trim()) {
      alert("El contacto no puede ser vacio");
      setContact("");
      return;
    }

    await actions.postContacto(agendasslug).then((respContact) => {
      const addContacto = {
        ...detalleAgenda,
        agendas: [...detalleAgenda.agendas, respContact],
      };
      setDetalleAgenda(addContacto);
    });
    setContact("");
  };

  const eliminarContact = (idContact) => {
    actions.eliminarContacto(idContact).then((resp) => {
      if (resp) {
        const newContac = {
          ...contac,
          agendas: detalleAgenda.agendas.contac.filter(
            (item) => item.id !== idContact
          ),
        };
        setContact(newContac);
      }
    });
  };
  if (!(detalleAgenda && detalleAgenda.contacts)) return null;

  const getContacs = detalleAgenda.contacts.map((item) => {
    return item.name;
  });
 
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
                  eliminarContact(item.id);
                }}
              >
                X{" "}
              </button>
            </div>
          </div>
        ))}

        <Link className="ms-5 mt-3" to="/agregar/:id">
          AgregarContacto
        </Link>
      </div>
    </div>
  );
};

export default Detalle;
