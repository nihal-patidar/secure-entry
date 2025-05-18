import React, { useEffect, useMemo, Suspense, useState } from "react";
import api from "../../../axiosConfig";
import { Button } from "antd";
import { useLocation, useParams } from "react-router-dom";
import '../../index.css'

const ServiceVisitors = () => {
  const [visitors, setVisitors] = useState([]);
  let token = localStorage.getItem("userData");
  const location = useLocation();

  let service_id = location.state.id || null;
  const [activeKey, setActiveKey] = useState(0);
  const Tabs = [
    {
      tabName: "All",
      key: "0",
      element: <AllVisitors visitors={visitors}></AllVisitors>,
    },
    {
      tabName: "Visited",
      key: "1",
      element: <VisitedVisitors visitors={visitors}></VisitedVisitors>,
    },
    {
      tabName: "Remaining",
      key: "2",
      element: <RemainingVisitors visitors={visitors}></RemainingVisitors>,
    },
  ];

  useEffect(() => {
    api
      .get(`/visitor/get-visitors/${service_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let list = res.data.visitorList ;
        //console.log("get-visitor", list);
        let revList = list.reverse();
        setVisitors(revList);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col workspace w-full h-full px-3 pb-5 rem-scrl">
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center w-full h-10 sm:h-20 justify-start">
          {Tabs.map((tab) => {
            return (
              <Button
                key={tab.key}
                onClick={() => setActiveKey(tab.key)}
                style={{
                  marginLeft: "10px",
                  backgroundColor : 'transparent',
                  fontWeight : 'bold'
                }}
              >
                {" "}
                {tab.tabName}{" "}
              </Button>
            );
          })}
          <Button size="small" style={{color : "red" , background : 'transparent' , marginLeft : '5px'}} onClick={()=>{getVisitors()}}><faRefresh>Refresh</faRefresh></Button>

        </div>

        <div className="h-full w-full overflow-y-scroll scroller flex flex-col-reverse">
          {Tabs.map((tab) => {
            return tab.key == activeKey ? tab.element : <></>;
          })}
        </div>
      </div>
    </div>
  );
};

const AllVisitors = ({ visitors }) => {
  return (
    <>
      {visitors?.map((visitor) => {
        return <Visitor visitor={visitor} color=""/>
      })}
    </>
  );
};

const VisitedVisitors = ({ visitors }) => {
  return (
    <>
      {visitors?.map((visitor) => {
        return visitor.validation_status ? (
          <Visitor visitor={visitor} color="#bfbbd8" />
        ) : (
          <></>
        );
      })}
    </>
  );
};

const RemainingVisitors = ({ visitors }) => {
  return (
    <>
      {visitors?.map((visitor) => {
        return visitor.validation_status ? (
          <></>
        ) : (
          <Visitor visitor={visitor} color="#e6c9cb"/>
        );
      })}
    </>
  );
};

const Visitor = ({ visitor , color}) => {
  let Element = [];
  const validatorList = () => {
    Object.keys(visitor.visitor_data).forEach((key, indx) => {
      let vdata = visitor.visitor_data[key];
      Element.push(
        <div className="flex flex-col w-fit mx-4 items-center text-sm">
          <strong className="text-purple-400 font-semibold">{key}</strong>
          <p className="">{vdata}</p>
        </div>
      );
    });
    return Element;
  };
  return (
    <div className='flex items-center h-14 w-full justify-between my-1 py-2 px-1 rounded-lg bg-gradient-to-r from-red-300 to-pink-50 text-white font-semibold shadow-md cursor-pointer hover:opacity-90 text-sm'>
      <div className="flex items-center w-[280px] overflow-x-scroll visitor">{validatorList()}</div>
      <div className="flex flex-col w-fit text-nowrap mx-2 items-center">
        <strong className="text-purple-400">Status</strong>
        <p
          className="text-sm sm:text-lg"
          style={{ color: visitor.validation_status ? "green" : "red" }}
        >
          {visitor.validation_status ? "Visited" : "Not Yet"}
        </p>
      </div>
    </div>
  );
};

export default ServiceVisitors;
