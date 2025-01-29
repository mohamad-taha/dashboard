import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Context.Provider
      value={{
        modal,
        setModal,
        modalContent,
        setModalContent,
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </Context.Provider>
  );
};
