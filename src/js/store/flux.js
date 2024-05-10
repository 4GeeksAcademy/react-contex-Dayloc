const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {},
    actions: {
      getListsContact: async () => {
        const agendas = await fetch(
          "https://playground.4geeks.com/contact/agendas"
        );
        const agendasJson = await agendas.json();
        setStore({ agendas: agendasJson.agendas });
      },
      postAgenda: async (nombreAgenda) => {
        const newAgenda = await fetch(
          `https://playground.4geeks.com/contact/agendas/${nombreAgenda}`,
          {
            method: "POST",
          }
        );
        if (newAgenda.ok) {
          const agendas = getStore().agendas;
          const newAgendaJson = await newAgenda.json();
          console.log("Se ha creado la nueva agenda de contactos con exito");
          const newAgendas = [...agendas, newAgendaJson];
          setStore({ agendas: newAgendas });
        } else {
          console.log("No se pudo crear la agenda");
        }
      },
      getAgenda: async (agendasslug) => {
        const detalleAgenda = await fetch(
          `https://playground.4geeks.com/contact/agendas/${agendasslug}`
        );
        const detalleAgendaJson = await detalleAgenda.json();
        console.log(detalleAgendaJson);
      },
    },
  };
};

export default getState;
