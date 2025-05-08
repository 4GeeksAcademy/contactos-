import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContactAPI } from "../store/contactAPI";
import { useGlobalState } from "../hooks/useGlobalReducer";

export const AddContact = () => {
  const { contacts, addContact, updateContact } = useGlobalState();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    // Si hay un ID en la URL, estamos en modo edición
    const loadContact = async () => {
      if (id) {
        try {
          // Primero intentamos encontrar el contacto en el estado global
          const existingContact = contacts.find(c => c.id === id);
          
          if (existingContact) {
            setFormData({
              full_name: existingContact.full_name || "",
              email: existingContact.email || "",
              phone: existingContact.phone || "",
              address: existingContact.address || ""
            });
          } else {
            // Si no está en el estado, lo buscamos en la API
            const contactData = await ContactAPI.getContact(id);
            setFormData({
              full_name: contactData.full_name || "",
              email: contactData.email || "",
              phone: contactData.phone || "",
              address: contactData.address || ""
            });
          }
        } catch (error) {
          console.error("Error cargando el contacto:", error);
        }
      }
    };

    loadContact();
  }, [id, contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id) {
        // Modo edición
        await ContactAPI.updateContact(id, formData);
        updateContact({ ...formData, id });
      } else {
        // Modo creación
        const newContact = await ContactAPI.createContact(formData);
        addContact(newContact);
      }
      
      navigate("/");
    } catch (error) {
      console.error("Error al guardar el contacto:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <h1 className="text-center mt-5">{id ? "Editar" : "Agregar"} contacto</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre completo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre completo"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Teléfono"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              className="form-control"
              placeholder="Dirección"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary form-control">
            {id ? "Actualizar" : "Guardar"}
          </button>
          <Link className="mt-3 w-100 text-center" to="/">
            Volver a la lista de contactos
          </Link>
        </form>
      </div>
    </div>
  );
};