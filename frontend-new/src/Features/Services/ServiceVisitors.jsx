import React, { useEffect, useMemo, Suspense, useState } from "react";
import api from "../../../axiosConfig";
import { Button } from "antd";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useLocation, useParams } from "react-router-dom";
import "../../index.css";

const ServiceVisitors = () => {
  const [visitors, setVisitors] = useState([]);
  let token = localStorage.getItem("userData");
  const [inProcess, setInProcess] = useState(false);
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
    {
      tabName: "Excel View",
      key: "3",
      element: <ExcelFormat visitors={visitors}></ExcelFormat>,
    },
  ];

  const getVisitors = () => {
    if (service_id) {
      api
        .get(`/visitor/get-visitors/${service_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          //console.log("get-visitor", res.data.visitorList);
          setVisitors(res.data.visitorList);
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  };

  const downloadFile = async () => {
    try {
      // Send request to the backend
      setInProcess(true);
      const response = await api.get(`/visitor/download-xlst/${service_id}`, {
        //   headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });

      //console.log("response", response);

      // if (!response.ok) {
      //   throw new Error("Failed to fetch file");
      // }

      // Get the blob data
      const blob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.xlsx"; // Default filename for the downloaded file
      a.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
      setInProcess(false);
    } catch (error) {
      setInProcess(false);
      console.error("Error downloading the file:", error);
    }
  };

  const exportToExcel = () => {
    if (!visitors || visitors.length === 0) {
      console.error("No data available to export!");
      return;
    }

    let visitedNo = 0;
    let notVisited = 0;
    let total = visitors.length;

    // **Step 1: Define Headers**

    // let headers = ["No" , "Status"] // Add more fields if needed
    let headerdata = visitors[0].visitor_data;
    // console.log("ddfd",headerdata)

    let headerData = Object.keys(headerdata).map((key) => {
      return key;
    });

    // console.log("ddhfd",headers);
    const headerColumns = ["S.No", ...headerData, "Status"];
    const emptyColumns = ["", ""]; // Two empty columns before summary
    const summaryHeaders = [
      "Summary",
      "Total Visitors",
      "Visited",
      "Not Visited",
    ];

    // **Step 2: Collect Visitor Data (Auto-Numbered & Replacing 'Not' with ❌)**
    const visitorData = visitors.map((visitor, index) => {
      if (visitor.validation_status) visitedNo++;
      else notVisited++;

      let rowData = Object.values(visitor.visitor_data).map((value) => {
        return value;
      });

      return [
        index + 1, // Auto-numbering
        ...rowData,
        visitor.validation_status ? "✔" : "❌", // Status (✔ or ❌)
      ];
    });

    // **Step 3: Insert Headers & Visitor Data**
    const data = [headerColumns, ...visitorData];

    // **Step 4: Add Empty Columns for Separation**
    data.push([]);
    data.push([]);

    // **Step 5: Insert Summary Header**
    data.push(summaryHeaders);

    // **Step 6: Insert Summary Data Below Header**
    data.push(["", total, visitedNo, notVisited]);

    // **Convert to Worksheet**
    const worksheet = XLSX.utils.aoa_to_sheet(data); // `aoa_to_sheet` allows structured row-by-row insertion

    // **Enable Filters**
    // worksheet["!autofilter"] = { ref: `A3:D${visitorData.length + 1}` };

    // **Auto-Fit Column Widths**
    worksheet["!cols"] = headerColumns.map((key) => ({
      wch:
        Math.max(
          ...data.map((row) => (row[key] ? row[key].toString().length : 10)),
          key.length
        ) + 2,
    }));

    // **Protect Sheet (Read-Only)**
    worksheet["!protect"] = {
      password: "1234",
      sheet: true,
      objects: false,
      scenarios: false,
      formatCells: false,
      formatColumns: false,
      formatRows: false,
      insertColumns: false,
      insertRows: false,
      deleteColumns: false,
      deleteRows: false,
    };

    // **Create & Save Workbook**
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Visitor Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "visitor_data.xlsx");
  };

  useEffect(() => {
    api
      .get(`/visitor/get-visitors/${service_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //console.log("get-visitor", res.data.visitorList);
        setVisitors(res.data.visitorList);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col workspace w-full h-full px-3 pb-5 thin-scroller">
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center w-full gap-4 px-5 h-10 sm:h-20 justify-start">
          {Tabs.map((tab) => {
            return (
              <Button
                key={tab.key}
                onClick={() => setActiveKey(tab.key)}
                className={`bg-transparent  border-b-4 ${
                  activeKey === tab.key ? "border-[#640D5F]" : "border-none"
                } hover:bg-transparent text-[#640D5F] font-semibold`}
              >
                {tab.tabName}
              </Button>
            );
          })}
          <Button
            size="small"
            style={{
              color: "red",
              background: "transparent",
              marginLeft: "5px",
            }}
            onClick={() => {
              getVisitors();
            }}
          >
            <faRefresh>Refresh</faRefresh>
          </Button>
          <Button onClick={exportToExcel}>Excel</Button>
        </div>
        {inProcess ? (
          <div className="w-fit mx-auto"> Excel is being created...</div>
        ) : (
          <></>
        )}

        <div className="h-full w-full overflow-y-scroll scroller px-3">
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
      {visitors?.map((visitor, index) => {
        return <Visitor visitor={visitor} color="" key={index} />;
      })}
    </>
  );
};

const VisitedVisitors = ({ visitors }) => {
  return (
    <>
      {visitors?.map((visitor, index) => {
        return visitor.validation_status ? (
          <Visitor visitor={visitor} color="#bfbbd8" key={index} />
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
      {visitors?.map((visitor, index) => {
        return visitor.validation_status ? (
          <></>
        ) : (
          <Visitor visitor={visitor} color="#e6c9cb" key={index} />
        );
      })}
    </>
  );
};

const Visitor = ({ visitor }) => {
  let Element = [];
  const validatorList = () => {
    if (visitor.visitor_data) {
      Object.keys(visitor.visitor_data).forEach((key, indx) => {
        let vdata = visitor.visitor_data[key];
        Element.push(
          <div className="flex flex-col w-fit items-start text-sm" key={indx}>
            <strong className="text-purple-400 font-semibold">{key}</strong>
            <p className="text-nowrap w-28 sm:w-40">{vdata}</p>
          </div>
        );
      });
      return Element;
    } else {
      return <></>;
    }
  };
  return (
    <div className="flex items-center h-14 w-full justify-between my-1 py-2 px-5 rounded-lg theme-button text-white font-semibold shadow-md cursor-pointer hover:opacity-90 text-sm">
      <div className="flex items-center w-[280px] sm:w-full overflow-x-hidden">
        {validatorList()}
      </div>
      <div className="flex flex-col w-10 text-nowrap items-center">
        {/* <strong className="text-purple-400">Status</strong> */}
        <p
          className="text-sm sm:text-base text-nowrap font-semibold"
          style={{ color: visitor.validation_status ? "#FFEB55" : "#D91656" }}
        >
          {visitor.validation_status ? "Visited" : "Not yet"}
        </p>
      </div>
    </div>
  );
};

const ExcelFormat = ({ visitors }) => {
  const visitorEntries = Object.entries(visitors[0]?.visitor_data);

  let headElement = [
    'S.No',
    'Status',
    ...visitorEntries.map(([key, value]) => key),
    'Time Stamps'
  ] ;


  return (
    <>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {headElement.map((value,index)=>{
              return <th
                key={`timestamp-${index}`}
                className="border border-blue-700 px-4 py-0 text-left h-8 text-nowrap"
              >
               {value}
              </th>
            })}
            {/* {visitors[0]?.time_stamps.map((_, index) => (
              <th
                key={`timestamp-${index}`}
                className="border border-gray-300 px-4 py-2 text-left"
              >
                Timestamp {index + 1}
              </th>
            ))} */}
          </tr>
        </thead>
        {visitors?.map((visitor, index) => {
          return <ExcelRow visitor={visitor} key={index} index={index} />;
        })}
      </table>
    </>
  );
};

const ExcelRow = ({ visitor, index }) => {
  if (!visitor || !visitor.visitor_data) return null;

  const visitorEntries = Object.entries(visitor.visitor_data);
  const rowData = [
    index,
    visitor.validation_status ? "Yes" : "No",
    ...visitorEntries.map(([key, value]) => value),
    ...visitor.time_stamps,
  ];

  return (
    <tbody>
      <tr>
        {rowData.map((data, index) => (
          <td
            key={index}
            className="border border-blue-700 bg-white px-4 py-0 h-7 text-nowrap"
          >
            {data}
          </td>
        ))}
      </tr>
    </tbody>
  );
};

export default ServiceVisitors;
