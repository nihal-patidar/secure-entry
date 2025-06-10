import React from "react";
import { Card } from "./Card";
import { MockData } from "../constants/Data";
import LayoutServices from "./LayoutServices";
import Header from "./Header";
import { SideBar } from "./SideBar";
import { TabletMenu } from "./TabletMenu";
const MainBody = () => {
  return (
    <div className="flex justify-center overflow-clip relative bg-amber-500 h-full">
      {/* <div className="w-1/4">
        <TabletMenu className="sm:invisible md:visible lg:invisible " />
        <SideBar className="invisible lg:visible overflow-clip"/>
      </div> */}
      <LayoutServices/>
      <div className="w-3/4 flex justify-center flex-col">
          <Header />
            <Cards/>
      </div>
    </div>
  );
};

export const Cards = () => {
return (  <div className="relative flex flex-wrap p-3 m-6 overflow-auto">
          {MockData.map((e) => (
            <div key={e.id} className="p-4">
              {
                <Card
                  eventName={e.eventName}
                  location={e.location}
                  time={e.time}
                  date={e.date}
                />
              }
            </div>
          ))}
        </div>)
}

export default MainBody;
