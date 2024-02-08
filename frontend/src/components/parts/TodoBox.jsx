import React from 'react'
import { Button } from "@mui/material"
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPenToSquare } from "react-icons/fa6";
import EditBtn from './EditBtn';

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
  }
]
const TodoBox = ({ todos }) => {
  return (
<>
  <div className='border-blue-200 border rounded-xl text-xl my-2 max-w-md'>
    <div className="border border-gray-200 rounded-md px-8 py-2 m-4 max-w-40 text-sky-200">
      sample
    </div>
    <div className="border border-gray-200 rounded-md px-8 py-2 m-4 text-sky-200 min-h-20">
      description
      description
      description
      description
      description
    </div>
    <div className="flex items-center justify-end m-4 ">
      <EditBtn />
      <span className='border border-gray-200 rounded-md text-blue-200 px-6 py-2 ml-2'>
        <FaRegTrashCan />
      </span>
    </div>
  </div>
</>
  )
}

export default TodoBox