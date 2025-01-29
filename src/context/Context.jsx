import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  return (
    <Context.Provider
      value={{ modal, setModal, modalContent, setModalContent }}
    >
      {children}
    </Context.Provider>
  );
};
