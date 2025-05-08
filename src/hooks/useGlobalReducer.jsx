import React, { createContext, useContext, useReducer } from "react";

// Definición del estado inicial
const initialState = {
  contacts: [],
  selectedContact: null
};

// Creación del contexto
export const Context = createContext(null);

// Reducer para manejar las acciones
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload
      };
    case "SELECT_CONTACT":
      return {
        ...state,
        selectedContact: action.payload
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    default:
      return state;
  }
};

// Provider component
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const store = {
    contacts: state.contacts,
    selectedContact: state.selectedContact,
    
    // Actions
    setContacts: (contacts) => {
      dispatch({ type: "SET_CONTACTS", payload: contacts });
    },
    selectContact: (contact) => {
      dispatch({ type: "SELECT_CONTACT", payload: contact });
    },
    addContact: (contact) => {
      dispatch({ type: "ADD_CONTACT", payload: contact });
    },
    updateContact: (contact) => {
      dispatch({ type: "UPDATE_CONTACT", payload: contact });
    },
    deleteContact: (id) => {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
};

// Hook para acceder al contexto
export const useGlobalState = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a StoreProvider');
  }
  return context;
};