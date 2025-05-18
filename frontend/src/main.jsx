import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/UserContext.jsx'
import { DataState } from './context/DataState.jsx'
import { ServiceContectProvider } from './context/ServiceContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <ServiceContectProvider>
    <DataState>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </DataState>
  </ServiceContectProvider>
)
