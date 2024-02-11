import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"
import { useMutation }  from "@tanstack/react-query"
import { useContext } from "react"

import { CsrfDispatchContext } from "../contexts/CsrfContext"

const useLoginMutate = () => {
  const dispatch = useContext(CsrfDispatchContext)
  const navigate = useNavigate()
  return useMutation({
  mutationKey: ["user"],
  mutationFn: async ( user ) => {
    console.log(user);
    const response = await axios.post("http://127.0.0.1:8080/auth/login", user, {
        withCredentials: true,
      });
      return response.data; // データの返却が必要な場合は適切な値を返す
    
  },
  onSuccess: () => {
    navigate("/todo")
  },
  onError: ( err ) => {
    alert(`${err.responce.data.detail}\n${err.message}`)
    if (err.responce.data.detail === "The CSRF token has expired") {
      dispatch()
    }
  },
})}

const useLogoutMutate = () => {
  const dispatch = useContext(CsrfDispatchContext)
  const navigate = useNavigate()
  return useMutation({
    mutationKey: ["a"],
    mutationFn: async () => {
      const res = await axios.post("http://127.0.0.1:8080/auth/logout",
      {},
      {
        withCredentials: true
      })
      return res.data
    },
    onSuccess: () => {
      navigate("/")
    },
    onError: ( err ) => {
    alert(`${err.responce.data.detail}\n${err.message}`)
    if (err.responce.data.detail === "The CSRF token has expired") {
      dispatch()
    }
  },
  })
}

export { useLoginMutate, useLogoutMutate }