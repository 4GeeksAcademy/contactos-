// src/services/contactAPI.js
const API_URL = "https://playground.4geeks.com/apis/fake/contact";

export const ContactAPI = {
  getAllContacts: async () => {
    try {
      const response = await fetch(`${API_URL}/agenda/my_agenda`);
      if (!response.ok) {
        throw new Error("No se pudieron obtener los contactos");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al obtener contactos:", error);
      throw error;
    }
  },
  
  getContact: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener el contacto");
      }
      return await response.json();
    } catch (error) {
      console.error(`Error al obtener el contacto con ID ${id}:`, error);
      throw error;
    }
  },
  
  createContact: async (contact) => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contact,
          agenda_slug: "my_agenda"
        }),
      });
      
      if (!response.ok) {
        throw new Error("No se pudo crear el contacto");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error al crear contacto:", error);
      throw error;
    }
  },
  
  updateContact: async (id, contact) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contact,
          agenda_slug: "my_agenda"
        }),
      });
      
      if (!response.ok) {
        throw new Error("No se pudo actualizar el contacto");
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error al actualizar el contacto con ID ${id}:`, error);
      throw error;
    }
  },
  
  deleteContact: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("No se pudo eliminar el contacto");
      }
      
      return true;
    } catch (error) {
      console.error(`Error al eliminar el contacto con ID ${id}:`, error);
      throw error;
    }
  }
};