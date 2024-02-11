import React, { useState, useContext } from 'react'
import { TextField } from '@mui/material'

import { UserContext, IsLoginDispatchContext, IsLoginContext } from './contexts/UserContext'
import { useLoginMutate } from './hooks/UserMutations'

const Login = () => {
  const [ user, SetUser] = useContext(UserContext)
  const LoginMutate = useLoginMutate()
  const IsLoginDispatch = useContext(IsLoginDispatchContext)
  const IsLogin = useContext(IsLoginContext)
  const [, setUser ] = useContext(UserContext)
  const loginHandler = () => {
    LoginMutate.mutate(user, {onSuccess: () => {
      IsLoginDispatch()
    }})
    setUser({name: "", password: ""})
  }
  return (
<>
<div className="flex flex-row justify-center mt-12">
  <div className="flex flex-col items-center">
    <div className="text-4xl text-blue-200">
      Login
    </div>
    <div className="mt-20">
      <label htmlFor="name" className='text-blue-200 text-xl'>
        name :
      </label><br />
      <TextField required color='secondary' id='name' label="name" className='bg-gray-500 rounded-xl' value={user.name} 
        onChange={(e) => {SetUser({...user , name: e.target.value})}}/>
    </div>
    <div className="mt-8">
      <label htmlFor="password" className='text-blue-200 text-xl'>
        password :
      </label><br />
      <TextField required id="password" label="password" className='bg-gray-500 rounded-xl' value={user.password} 
        onChange={(e) => {SetUser({...user , password: e.target.value})}} type='password'/>
    </div>
    <div className="mt-16">
      <button className="text-blue-200 text-xl border-2 rounded-md bg-gray-700 py-2 px-4" onClick={loginHandler}>
        Login
      </button>
    </div>
  </div>

</div>
</>
  )
}

export default Login