import React from 'react'
import TodoBox from './parts/TodoBox'

const TodoList = () => {
  return (
<>
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
</>
  )
}

export default TodoList