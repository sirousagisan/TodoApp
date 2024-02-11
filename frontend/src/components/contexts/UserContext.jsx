import React, { createContext, useReducer, useState } from "react";

const IsLoginContext = createContext()
const IsLoginDispatchContext = createContext()
const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [ user,  SetUser ] = useState({name: "", password: ""})
  const [ IsLogin, IsLoginDispatch ] = useReducer((prev) => {
    return prev = !prev
  }, false)
  return (
  <IsLoginContext.Provider value={IsLogin}>
    <IsLoginDispatchContext.Provider value={IsLoginDispatch}>
      <UserContext.Provider value={[user, SetUser]}>
        { children }
      </UserContext.Provider>
    </IsLoginDispatchContext.Provider>
  </IsLoginContext.Provider>
  )
}

export {IsLoginContext, IsLoginDispatchContext, UserContext, UserProvider}