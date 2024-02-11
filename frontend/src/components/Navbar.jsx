import React, { useContext } from 'react'
import { MdLogout } from "react-icons/md";

import { useLogoutMutate } from './hooks/UserMutations';
import { IsLoginContext, IsLoginDispatchContext } from './contexts/UserContext';

const Navbar = () => {
  const LogoutMutate = useLogoutMutate()
  const IsLogoutDispatch = useContext(IsLoginDispatchContext)
  const LogiutHandler = () => {
    
    LogoutMutate.mutate({},{onSuccess: () => {
      IsLogoutDispatch()
    }})
  }
  return (
<>

<nav>
  <div className="border-b-2 border-gray-200 w-full bg-gray-800 font-semibold">
    <div className="flex item-center justify-between py-4 px-12">
      <span className="text-blue-200 text-2xl">
        
      </span>
      <span className='text-blue-200 text-3xl'>
        Todo App
      </span>
      <button className="text-2xl text-blue-200" onClick={LogiutHandler}>
        <MdLogout />
      </button>
    </div>
  </div>

</nav>

</>
  )
}

export default Navbar