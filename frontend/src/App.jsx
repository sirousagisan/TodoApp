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
      const { data } = await axios.get(
        "http://127.0.0.1:8080/auth/csrftoken",
        {withCredentials: true}
      )
      
      axios.defaults.headers.common['X-CSRF-Token'] = data["csrf_token"]
    }
    getCsrf()
  }, [Csrf])
  return (
<>
<Navbar />
{/* content */}
<Routes>
  <Route path="/" element={<Login />}/>
  <Route path="/todo" element={<TodoList />} />
</Routes>
{/* end content */}
{/* <TodoList /> */}
</>
  )
}

export default App
