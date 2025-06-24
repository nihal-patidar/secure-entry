import { createContext, useState } from "react";

const ServiceContext= createContext();

const ServiceContectProvider= (props)=>{

    var [services,setServices]= useState([]);
    const [service, setService] = useState({})
    const [currentServiceId , setCurrentServiceId] = useState()

var serviceC= {
      services,
      setServices,
      service,
      setService,
      currentServiceId,
        setCurrentServiceId
    }
    return(
        <ServiceContext.Provider value={serviceC}>
            {props.children}
        </ServiceContext.Provider>
    )
}


export {ServiceContext,ServiceContectProvider};