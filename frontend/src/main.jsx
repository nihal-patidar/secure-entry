// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { UserContextProvider } from './context/UserContext.jsx'
// import { DataState } from './context/DataState.jsx'
// import { ServiceContectProvider } from './context/ServiceContext.jsx'
//
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <ServiceContectProvider>
//     <DataState>
//       <UserContextProvider>
//         <App />
//       </UserContextProvider>
//     </DataState>
//   </ServiceContectProvider>
// )
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/UserContext.jsx'
import { DataState } from './context/DataState.jsx'
import { ServiceContectProvider } from './context/ServiceContext.jsx'
import LayoutServices from './components/newServices/LayoutServices.jsx'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserContextProvider>
            <DataState>
                <ServiceContectProvider>
                    {/* Use App or a custom layout */}
                    {/* <App /> */}
                    <LayoutServices />
                </ServiceContectProvider>
            </DataState>
        </UserContextProvider>
    </React.StrictMode>
)
