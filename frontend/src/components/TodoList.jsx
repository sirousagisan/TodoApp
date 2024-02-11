import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import TodoBox from './parts/TodoBox'
import { ModalProvider } from './contexts/ModalContext'
import { IsLoginContext } from './contexts/UserContext'

const TodoList = () => {
  const Login = useContext(IsLoginContext)

  if (!Login) {
    return <Navigate to="/"/>
  }
  return (
<ModalProvider>
  <div className="flex flex-row justify-center gap-x-40">
    <div className="flex flex-col">
      <p className="text-blue-200 text-bold text-4xl text-center my-4">
        未完了
      </p>
      <TodoBox />
    </div>
    <div className="flex flex-col">
      <p className="text-blue-200 text-bold text-4xl text-center my-4">
        完了
      </p>
      <TodoBox />
    </div>
  </div>
</ModalProvider>
  )
}

export default TodoList