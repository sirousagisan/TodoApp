import React, { useReducer } from 'react'
import { createContext } from 'react'

const CsrfContext = createContext()
const CsrfDispatchContext = createContext()


const CsrfProvider = ({ children }) => {
  const [ Csrf, dispatch ] = useReducer((prev) => {
    return prev != prev
  }, false)
  return (
    <CsrfContext.Provider value={Csrf}>
      <CsrfDispatchContext.Provider value={dispatch}>
        { children }
      </CsrfDispatchContext.Provider>
    </CsrfContext.Provider>
  )
}

export {CsrfContext, CsrfDispatchContext, CsrfProvider}