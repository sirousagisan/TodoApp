import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import App from './App.jsx'
import './index.css'

import { CsrfProvider } from './components/contexts/CsrfContext.jsx'
import { UserProvider } from './components/contexts/UserContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient} >
        <CsrfProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </CsrfProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
