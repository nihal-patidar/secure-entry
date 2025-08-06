import React, { useEffect } from 'react';
// import Ticket from './Ticket';
import InvitationCard from './Ticket';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { devLog } from '../../../devLog';

const TicketPage = ({data}) => {
    // const [data, setData] = useState(null);
    // const loweruserId= useParams().loweruserId;
    useEffect(async()=>{
        // let lowerdata= await axios.get(`http://localhost:3000/service/getThisService/${data.formId}`);
        //devLog.log("validator_list of this service",lowerdata.data.validater_list);
        // if(!lowerdata){
        //     toast.warning("ticket is not generated refresh");
        // }

        // setData(lowerdata.lowerdata);
    },[])
    return (
        <div>
            {/* <Ticket data={data}/> */}
            <InvitationCard data={data}/>
        </div>
    );
}

export default TicketPage;
