import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/UserContext.jsx'
import { DataState } from './context/DataState.jsx'
import { ServiceContectProvider } from './context/ServiceContext.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


ReactDOM.createRoot(document.getElementById('root')).render(
    <ServiceContectProvider>
        <DataState>
            <UserContextProvider>
                <App />
                <ToastContainer/>
            </UserContextProvider>
        </DataState>
    </ServiceContectProvider>
);