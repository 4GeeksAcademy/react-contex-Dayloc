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
      postAgenda: async (agendasslug) => {
        const newAgenda = await fetch(
          `https://playground.4geeks.com/contact/agendas/${agendasslug}`,
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

        return detalleAgendaJson;
      },

      postContacto: async (id, body) => {
        const newContact = await fetch(
          `https://playground.4geeks.com/contact/agendas/Dayloc/${id}`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },

            body: body,
          }
        );
        const newContactJson = await newContact.json();

        setStore({ contacs: newContact });

        return newContactJson;
      },

      eliminarContacto: async (id) => {
        const eliminarContact = await fetch(
          `https://playground.4geeks.com/contact/agendas/Yumar/contacts/${id}`,
          {
            method: "DELETE",
          }
        );
        return eliminarContact.ok;
      },
    },
  };
};

export default getState;
