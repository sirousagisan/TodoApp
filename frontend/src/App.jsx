import { useContext, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import axios from "axios"

import { CsrfContext } from "./components/contexts/CsrfContext"

import Login from "./components/Login"
import Navbar from "./components/Navbar"
import TodoList from "./components/TodoList"

function App() {
  const Csrf = useContext(CsrfContext)
  useEffect(() => {
    const getCsrf = async () => {
      const res = await axios.get(
        "http://127.0.0.1:8080/auth/csrftoken"
      )
      axios.defaults.headers.common['X-CSRF-Token'] = res.data["csrf_token"]
    }
    getCsrf()
  }, [Csrf])
  return (
<>
<Navbar />
<Routes>
  <Route path="/" element={<Login />}/>
</Routes>
<TodoList />
</>
  )
}

export default App
