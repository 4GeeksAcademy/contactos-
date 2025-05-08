import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../components/CardContact";
import { Modal } from "../components/Modal";
import { ContactAPI } from "../store/contactAPI";
import { useGlobalState } from "../hooks/useGlobalReducer";

export const Contacts = () => {
  const { contacts, setContacts, deleteContact } = useGlobalState();
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    // Cargar contactos al iniciar
    const loadContacts = async () => {
      try {
        const contactData = await ContactAPI.getAllContacts();
        setContacts(contactData);
      } catch (error) {
        console.error("Error cargando contactos:", error);
      }
    };

    loadContacts();
  }, []);

  const handleDeleteClick = (id) => {
    setContactToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (contactToDelete) {
      try {
        await ContactAPI.deleteContact(contactToDelete);
        deleteContact(contactToDelete);
        setShowModal(false);
        setContactToDelete(null);
      } catch (error) {
        console.error("Error eliminando el contacto:", error);
      }
    }
  };

  return (
    <div className="container">
      <div>
        <p className="text-right my-3">
          <Link className="btn btn-success" to="/add">
            Add new contact
          </Link>
        </p>
        <div className="list-group">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                full_name={contact.full_name}
                address={contact.address}
                phone={contact.phone}
                email={contact.email}
                id={contact.id}
                onDelete={() => handleDeleteClick(contact.id)}
              />
            ))
          ) : (
            <div className="alert alert-info text-center">
              No hay contactos disponibles. ¡Agrega tu primer contacto!
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};