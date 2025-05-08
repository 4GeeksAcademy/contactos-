// src/js/layout.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContactProvider } from "../store/appContext";
import { Contacts } from "../views/Contact";
import { AddContact } from "../views/AddContact";

export const Layout = () => {
  return (
    <BrowserRouter>
      <ContactProvider>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<AddContact />} />
          <Route render={() => <h1>Not found!</h1>} />
        </Routes>
      </ContactProvider>
    </BrowserRouter>
  );
};