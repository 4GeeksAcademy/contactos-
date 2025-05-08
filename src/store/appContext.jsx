// src/js/store/context.js
import React, { createContext, useState, useEffect } from "react";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  
  const apiUrl = "https://playground.4geeks.com/apis/fake/contact";

  // Obtener todos los contactos
  const getContacts = async () => {
    try {
      const response = await fetch(`${apiUrl}/agenda/my_agenda`);
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error al obtener contactos:", error);
    }
  };

  // Crear un nuevo contacto
  const createContact = async (contact) => {
    try {
      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      
      if (response.ok) {
        getContacts(); // Actualizar la lista de contactos
      }
    } catch (error) {
      console.error("Error al crear contacto:", error);
    }
  };

  // Actualizar un contacto existente
  const updateContact = async (id, updatedContact) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContact),
      });
      
      if (response.ok) {
        getContacts(); // Actualizar la lista de contactos
      }
    } catch (error) {
      console.error("Error al actualizar contacto:", error);
    }
  };

  // Eliminar un contacto
  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        getContacts(); // Actualizar la lista de contactos
      }
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
    }
  };

  // Cargar contactos al iniciar
  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        selectedContact,
        setSelectedContact,
        getContacts,
        createContact,
        updateContact,
        deleteContact
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};