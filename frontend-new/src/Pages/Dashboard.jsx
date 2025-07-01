import React, { useContext, useEffect, useState } from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 // import "../styles/Dashboard.css"
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
import { ServiceContext } from '../context/ServiceContext';
import { dataContext } from '../context/DataState';

function Dashboard() {

    const {services} = useContext(ServiceContext);
    const {allValidators , users} = useContext(dataContext);

    const [service_count , setService_Count] = useState();
    const [validator_count , setValidator_Count] = useState();
    const [user_count , setUser_Count] = useState();

    useEffect(()=>{
      setService_Count(services.length);
      setValidator_Count(allValidators.length);
      setUser_Count(users.length);
    },[services,allValidators]);


    const data = [
        {
          name: 'Jan',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Feb',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'March',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'April',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'May',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'June',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'July',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
        {
            name: 'August',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
          {
            name: 'September',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
          {
            name: 'Octorber',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
          {
            name: 'Nubember',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
          {
            name: 'December',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
      ];
     

  return (
    <main className='main-container theme-5'>
        <div className='main-title theme-31'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>SERVICES</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{service_count}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>VALIDATOR</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>{validator_count}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>USERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{user_count}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>42</h1>
            </div>
        </div>

        {/* <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div> */}
    </main>
  )
}

export default Dashboard
