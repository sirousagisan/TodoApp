import React, { createContext } from "react";
import { useState } from "react";

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  return (
  <ModalContext.Provider value={[open, setOpen]}>
    { children }
  </ModalContext.Provider>
  )
}

export {ModalContext,  ModalProvider}