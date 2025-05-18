import { createContext, useState } from "react";

const ServiceContext= createContext();

const ServiceContectProvider= (props)=>{

    var [services,setServices]= useState([]);
    const [currentServiceId , setCurrentServiceId] = useState()

    var service= {
      services,
      setServices,
      currentServiceId,
        setCurrentServiceId
    }
    return(
        <ServiceContext.Provider value={service}>
            {props.children}
        </ServiceContext.Provider>
    )
}


export {ServiceContext,ServiceContectProvider};