import React, { useMemo, useState, useEffect, Suspense } from "react";
const ValidatorInService = React.lazy(() => import("./ValidatorInService"));
import QRpreView from "./QRpreView";
import FormPreView from "./FormPreView";
import { Button, Checkbox, Divider, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import OverViewStrip from "./OverView";
const CheckboxGroup = Checkbox.Group;
import { devLog } from "../../../devLog";

const OperationsSlot = {
  left: <Button className="tabs-extra-demo-button">Left Extra Action</Button>,
  right: <Button>Right Extra Action</Button>,
};

const ServiceTabs = ({
  formData = null,
  formQr = null,
  formUrl = null,
  formId = null,
  service_id,
  service_data,
}) => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveKey("2"); // Automatically switch to the second tab after 2 seconds
    }, 2000);

    // Cleanup timeout
    return () => clearTimeout(timeout);
  }, []);

  let items = [
    {
      label: "Visitor",
      key: "2",
      children: <OverViewStrip service_id={service_id} />,
    },
    {
      label: "Validator",
      key: "1",
      children: (
        <Suspense>
          <ValidatorInService service_id={service_id} />
        </Suspense>
      ),
    },
    {
      label: "QR",
      key: "4",
      children: <QRpreView formQr={formQr} />,
    },
    {
      label: "Form",
      key: "3",
      children: (
        <FormPreView
          service_data={service_data}
          formUrl={formUrl}
          formId={formId}
          service_id={service_id}
        />
      ),
    },
  ];
  const [position, setPosition] = useState(["left", "right"]);
  const slot = useMemo(() => {
    if (position.length === 0) return null;
    return position.reduce(
      (acc, direction) => ({
        ...acc,
        [direction]: OperationsSlot[direction],
      }),
      {}
    );
  }, [position]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      //devLog.log("Timeout executed!");
      setCount((prev) => prev + 1);
    }, 2000); // 2-second delay

    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    //devLog.log("Services Tab Rendered ", service_id);
    setTimeout;
  }, []);
  return (
    <>
      <Tabs
        // tabBarExtraContent={
        //   <Button
        //     onClick={() => {
        //       navigate("/home/update-service-data", {
        //         state: { service_id: service_id },
        //       });
        //     }}
        //   >
        //     Edit{" "}
        //   </Button>
        // }
        items={items}
        activeKey={activeKey} // Bind active tab to state
        onChange={(key) => setActiveKey(key)}
        tabBarClassName="py-0"
        className="px-2 py-3 sm:px-2 sm:border-t-2 sm:border-l-2 theme-22 sm:h-52 sm:mt-3 sm:shadow-xl"
      />
    </>
  );
};

export default ServiceTabs;
