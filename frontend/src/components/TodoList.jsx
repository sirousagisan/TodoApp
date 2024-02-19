import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import TodoBox from './parts/TodoBox'
import { ModalProvider } from './contexts/ModalContext'
import { IsLoginContext } from './contexts/UserContext'

const sample = [
  {
    "id": 1,
    "name": "sample todo",
    "description": "example description",
    "complete": true,
    "updated_at": "2024-02-08T11:23:36.121Z"
  },
  {
    "id": 2,
    "name": "sample todo2",
    "description": "example description",
    "complete": false,
    "updated_at": "2024-02-08T11:23:36.121Z"
  },
  {
    "id": 3,
    "name": "sample todo3",
    "description": "example description",
    "complete": false,
    "updated_at": "2024-02-08T11:23:36.121Z"
  },
  {
    "id": 4,
    "name": "sample_todo4",
    "description": "example_description",
    "complete": true,
    "updated_at": "2024-02-08T11:23:36.121Z"
  },
  {
    "id": 5,
    "name": "sample todo5",
    "description": "example description",
    "complete": false,
    "updated_at": "2024-02-08T11:23:36.121Z"
  }
]
const TodoList = () => {
  const Login = useContext(IsLoginContext)
  const NotCompletedTasks = sample.filter(todo => {
    return todo.complete != true;
  })
  const completedTask = sample.filter(todo => {
    return todo.complete === true;
  })
  
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
      {NotCompletedTasks.map((todo) =>{
        return <TodoBox key={todo.id} todo={todo} />
      })}
      {/* <TodoBox  /> */}
    </div>
    <div className="flex flex-col">
      <p className="text-blue-200 text-bold text-4xl text-center my-4">
        完了
      </p>
      {completedTask.map((todo) => {
        return <TodoBox key={todo.id} todo={todo} />
      })}
      {/* <TodoBox /> */}
    </div>
  </div>
</ModalProvider>
  )
}

export default TodoList