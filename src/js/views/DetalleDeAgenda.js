import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";

const Detalle = () => {
  const { actions } = useContext(Context);
  const { agendasslug } = useParams();
  useEffect(() => {
    actions.getAgenda(agendasslug);
  }, []);
  return (
    <div className="text-center">
      <h1>Hello</h1>
    
    </div>
  );
};

export default Detalle;
