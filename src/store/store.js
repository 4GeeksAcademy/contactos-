const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            listContacts: []
        },
        actions: {
            createUser: () => {
                fetch("https://playground.4geeks.com/contact/agendas/4geeks-user", {
                    method: "POST"
                })
                    .then((response) => response.json())
                    .then((data) => console.log("Agenda created:", data))
                    .catch((error) => console.log(error));
            },

            getInfoContacts: () => {
                fetch("https://playground.4geeks.com/contact/agendas/4geeks-user/contacts")
                    .then((response) => {
                        if (response.status === 404) getActions().createUser();
                        if (response.ok) return response.json();
                    })
                    .then((data) => {
                        if (data) setStore({ listContacts: data.contacts });
                    })
                    .catch((error) => console.log(error));
            },

            createContact: (payload) => {
                fetch("https://playground.4geeks.com/contact/agendas/4geeks-user/contacts", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...payload, agenda_slug: "4geeks-user" })
                })
                    .then(res => res.json())
                    .then(data => {
                        getActions().getInfoContacts();
                        console.log("Contacto creado:", data);
                    })
                    .catch((error) => console.log(error));
            },

            deleteContact: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/4geeks-user/contacts/${id}`, {
                    method: "DELETE"
                })
                    .then(res => {
                        if (res.ok) {
                            const updated = getStore().listContacts.filter(c => c.id !== id);
                            setStore({ listContacts: updated });
                        } else {
                            console.error("Error eliminando contacto");
                        }
                    })
                    .catch(error => console.log(error));
            },

            editContact: (id, payload) => {
                fetch(`https://playground.4geeks.com/contact/agendas/4geeks-user/contacts/${id}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...payload, agenda_slug: "4geeks-user" })
                })
                    .then(res => res.json())
                    .then(data => {
                        const updatedList = getStore().listContacts.map(contact =>
                            contact.id === id ? data : contact
                        );
                        setStore({ listContacts: updatedList });
                    })
                    .catch(error => console.log(error));
            }
        }
    };
};

// Exporta la función getState como antes
export default getState;

// Exporta el estado inicial por separado
export const initialStore = {
    listContacts: []
};
