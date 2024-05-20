const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
    },

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

      postContacto: async (newContact) => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/contact/agendas/Dayloc/contacts",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newContact),
            }
          );
          if (response.ok) {
            const addedContact = await response.json();
            const store = getStore();
            setStore({ contacts: [...store.contacts, addedContact] });
          } else {
            console.error("Failed to add contact");
          }
        } catch (error) {
          console.error("Error adding contact:", error);
        }
      },

      deleteContact: async (id) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/Dayloc/contacts/${id}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            const store = getStore();
            const updatedContacts = store.contacts.filter(
              (contact) => contact.id !== id
            );
            setStore({ contacts: updatedContacts });
          } else {
            console.error("Failed to delete contact");
          }
        } catch (error) {
          console.error("Error deleting contact:", error);
        }
      },
      getContacts: async () => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/contact/agendas/Dayloc/contacts"
          );
          if (response.ok) {
            const data = await response.json();
            setStore({ contacts: data });
          } else {
            console.error("Failed to fetch contacts");
          }
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      },
    },
  };
};

export default getState;
