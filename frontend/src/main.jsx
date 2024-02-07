import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { CsrfProvider } from './components/contexts/CsrfContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <CsrfProvider>
      <App />
    </CsrfProvider>
  </React.StrictMode>,
)
