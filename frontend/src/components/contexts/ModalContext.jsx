import React, { createContext } from "react";
import { useState } from "react";

const ModalContext = createContext()
const DelContext = createContext()

const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [del, setDel] = useState(false)
  return (
  <ModalContext.Provider value={[open, setOpen]}>
    <DelContext.Provider value={[del, setDel]}>
      { children }
    </DelContext.Provider>
  </ModalContext.Provider>
  )
}

export {ModalContext,  ModalProvider, DelContext}