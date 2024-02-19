import React from 'react'
import EditBtn from './EditBtn';
import DeleteBtn from './DeleteBtn';


const TodoBox = ({ todo }) => {
  return (
<>
  <div className='border-blue-200 border rounded-xl text-xl my-4 min-w-96'>
    <div className="border border-gray-200 rounded-md px-4 py-2 m-4 max-w-48 text-sky-200">
      { todo.name }
    </div>
    <div className="border border-gray-200 rounded-md px-4 py-2 m-4  text-sky-200 h-20 overflow-hidden hover:overflow-scroll">
      { todo.description }
      
    </div>
    <div className="flex items-center justify-end m-4 gap-4">
      <EditBtn key={todo.id} todo={todo}/>
      {/* <span className='border border-gray-200 rounded-md text-blue-200 px-6 py-2 ml-2'>
        <FaRegTrashCan />
      </span> */}
      <DeleteBtn todo={todo}/>
    </div>
  </div>
</>
  )
}

export default TodoBox