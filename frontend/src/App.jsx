import { useContext, useEffect } from "react"
import axios from "axios"

import { CsrfContext } from "./components/contexts/CsrfContext"

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
  <div className="text-center text-blue-200 text-xl">
    Hello
  </div>
</>
  )
}

export default App
