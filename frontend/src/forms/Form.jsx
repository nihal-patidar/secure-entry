import { DefaultQuestion, PlaceHolders } from "./FormBuilder.jsx";
import img from "./images/DefaultCover.jpg";
import StartTimer from "./FormComponents/Timer.jsx";
import SingleSelect from "./FormComponents/SingleSelect.jsx";
import MultiSelect from "./FormComponents/MultiSelect.jsx";
import DropDown from "./FormComponents/DropDown.jsx";
import InputFile from "./FormComponents/InputFile.jsx";
import { useEffect, useState, useRef } from "react";
import Logo from "./FormComponents/Logo.jsx";
import FullName from "./FormComponents/FullName.jsx";
import Terms from "./FormComponents/TermsAndConditions.jsx";
import ContactFeild from "./FormComponents/ContactFeilds.jsx";
import SpecialRendering from "./FormComponents/SpecialRendering.jsx";
import TextField from "./FormComponents/TextField.jsx";
// import QueNav from "./FormComponents/questionNav.jsx";

function QueNavONETIME({ Remove }) {
  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <button onClick={Remove}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
}

function QueNav({ cnt, Duplicate, Remove, dispay }) {
  return (
    <div style={{ display: `${dispay}`, transition: "all 1s" }}>
      <div style={{ display: "flex", justifyContent: "end", width: "52vw" }}>
        <button onClick={() => Duplicate(cnt)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </button>
        <button onClick={() => Remove(cnt)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function AddButton({ appendTo }) {
  const label = document.createElement("label");
  label.setAttribute("contenteditable", "true");
  label.textContent = "Edit Option";

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  const wrap = document.createElement("div");
  wrap.prepend(checkbox);

  document.getElementById(`${appendTo}`).appendChild(warp);
  document.getElementById(`${appendTo}`).appendChild(label);
}

export default function FoRm({
  ques,
  Duplicate,
  Remove,
  isLogo,
  isCover,
  isTimer,
  isTerms,
  setQuantity,
  masterList,
  updateMaster,
  updateMasterList,
  updateOptionAtIndex,
  updateOptionAmountAtIndex,
  updateOptionDependedFieldsAtIndex,
}) {
  //Logic for Cover Image
  const [previewUrl, setPreviewUrl] = useState(img);
  const fileInputRef = useRef();
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  //Heading Logic
  const [Heading, setHeading] = useState("Form Heading");
  const [Details, setDetails] = useState("Description");
  const ref = useRef();
  const detailsRef = useRef();
  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.textContent = Details;
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = Heading;
    }
  }, []);

  //Logo Logic
  useEffect(() => {
    const deleteBtn = document.getElementById("DeleteLogo");
    if (deleteBtn) {
      deleteBtn.onclick = removeLogo;
    }
  }, [isLogo]);

  function Question({
    type,
    count,
    placeholder,
    desc,
    note,
    err,
    index,
    element,
  }) {
    const QueKey =
      type == "Logo" ||
      type == "Timer" ||
      type == "Terms and Conditions" ||
      type == "Cover" ||
      type == "ending page" ||
      type == "welcome page"
        ? 0
        : 1;

    return (
      <div key={`${QueKey}`}>
        <div className="w-[50vw] bg-white text-black min-h-fit m-[1vw] rounded-[15px]">
          <div>
            {type === "single selection" ? (
              <SingleSelect
                masterList={masterList}
                count={count}
                QType="S"
                type={type}
                opts={["A", "B", "C", "D"]}
              />
            ) : type === "multiple selection" ? (
              <MultiSelect
                masterList={masterList}
                count={count}
                QType="M"
                type={type}
                opts={["A", "B", "C", "D"]}
              />
            ) : type === "Dropdown Selection" ? (
              <DropDown
                masterList={masterList}
                count={count}
                QType="D"
                type={type}
                opts={["A", "B", "C", "D"]}
              />
            ) : type === "Special Selection" ? (
              <SpecialRendering
                key={element.field_id}
                element={element}
                updateField={updateMasterList}
                updateOptionAtIndex={updateOptionAtIndex}
                updateOptionAmountAtIndex={updateOptionAmountAtIndex}
                updateOptionDependedFieldsAtIndex={
                  updateOptionDependedFieldsAtIndex
                }
                fieldList={masterList
                  .filter((field) => field.field_id !== element.field_id)
                  .map((field) => ({
                    field_name: field.field_name,
                    field_id: field.field_id,
                  }))}
              />
            ) : type === "FullName" ? (
              <FullName
                masterList={masterList}
                placeholder={placeholder}
                desc={desc}
                note={note}
                err={err}
              />
            ) : type === "address" ? (
              <ContactFeild
                masterList={masterList}
                element={element}
                QType="A"
                placeholder={placeholder}
                desc={desc}
                note={note}
                err={err}
              />
            ) : type === "Phone no." ? (
              <ContactFeild
                masterList={masterList}
                QType="P"
                placeholder={placeholder}
                desc={desc}
                note={note}
                err={err}
              />
            ) : type === "email" ? (
              <ContactFeild
                masterList={masterList}
                QType="E"
                placeholder={placeholder}
                desc={desc}
                note={note}
                err={err}
              />
            ) : type === "upload image" ? (
              <InputFile masterList={masterList} name="Image" />
            ) : type === "upload file" ? (
              <InputFile masterList={masterList} name="File" />
            ) : type === "ending page" ? (
              <></>
            ) : type === "text" ? (
              <TextField
                key={element.field_id}
                QType="T"
                element={element}
                updateField={updateMasterList}
              />
            ) : type === "number" ? (
              <ContactFeild
                masterList={masterList}
                QType="N"
                placeholder={placeholder}
                desc={desc}
                note={note}
                err={err}
              />
            ) : (
              <input
                type={type}
                className="ml-[10vh] mt-[4vh] bg-white text-[#212121] border-[2px] border-[#eaeaea] rounded-[7px] h-[6vh] w-[60vh]"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  function addTimer() {
    document.getElementById("Timer").classList.toggle("hidden");
  }
  function RemoveTimer() {
    document.getElementById("Timer").classList.add("hidden");
    setQuantity("Timer");
  }
  function addLogo() {
    document.getElementById("Logo").classList.toggle("hidden");
  }
  function addCover() {
    document.getElementById("Cover").classList.toggle("hidden");
  }
  function RemoveCover() {
    setPreviewUrl(img);
    document.getElementById("Cover").classList.add("hidden");
    setQuantity("Cover");
  }
  function removeLogo() {
    document.getElementById("Logo").classList.add("hidden");
    setQuantity("Logo");
  }
  function removeTerms() {
    document.getElementById("Terms").classList.add("hidden");
    setQuantity("Terms and Conditions");
  }

  function getQueKey(type) {
    return type !== "Logo" &&
      type !== "Timer" &&
      type !== "Terms and Conditions" &&
      type !== "Cover" &&
      type !== "ending page" &&
      type !== "welcome page"
      ? 1
      : 0;
  }

  return (
    <div style={{ width: "67vw", overflow: "hidden" }}>
      <div
        id="Form"
        style={{
          border: "2px solid #eaeaea",
          margin: "2vh",
          marginLeft: "2vh",
          width: "66vw",
          justifyItems: "center",
          height: "92vh",
          background: "#fff",
          borderRadius: "15px",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        {isCover && (
          <div id="Cover" className="w-full relative group">
            {/* Banner Image */}
            <img
              src={previewUrl}
              alt="Cover"
              className="w-full max-h-[150px] object-cover z-0"
              style={{ maxWidth: "1920px" }}
            />

            {/* Hover Controls */}
            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <div className="flex items-center space-x-3 bg-white/80 px-4 py-2 rounded-full shadow text-center">
                {/* Upload Button */}
                <div className="flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    onClick={handleClick}
                    className="flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="34.5 35 25 25"
                      width="20"
                      height="20"
                      className="text-black"
                    >
                      <g clipPath="url(#clip0_604_782)">
                        <path
                          d="M57.4163 37.0833H36.583V57.9167H48.283C47.7815 56.9514 47.52 55.8795 47.5205 54.7917C47.5205 52.8125 48.3705 51.0313 49.7247 49.7927L43.8747 43.9438L38.6663 49.1521V39.1667H55.333V48.1C56.06 48.2131 56.7636 48.4439 57.4163 48.7833V37.0833Z"
                          fill="#5D5D5D"
                        />
                        <path
                          d="M51.1663 40.4688C50.4066 40.4688 49.678 40.7706 49.1408 41.3078C48.6036 41.845 48.3018 42.5736 48.3018 43.3333C48.3018 44.0931 48.6036 44.8217 49.1408 45.3589C49.678 45.8961 50.4066 46.1979 51.1663 46.1979C51.9261 46.1979 52.6547 45.8961 53.1919 45.3589C53.7291 44.8217 54.0309 44.0931 54.0309 43.3333C54.0309 42.5736 53.7291 41.845 53.1919 41.3078C52.6547 40.7706 51.9261 40.4688 51.1663 40.4688ZM53.2497 60H55.333V55.8333H59.4997V53.75H55.333V49.5833H53.2497V53.75H49.083V55.8333H53.2497V60Z"
                          fill="#5D5D5D"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_604_782">
                          <rect
                            width="25"
                            height="25"
                            fill="white"
                            transform="translate(34.5 35)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={RemoveCover}
                  className="flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-black"
                    title="Remove Image"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Dimension Label */}
            {previewUrl === img && (
              <div className="absolute bottom-1 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-sm z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                1920 × 150 fits the best
              </div>
            )}
          </div>
        )}

        {isLogo && (
          <div
            id="Logo"
            className={`justify-self-start m-[30px] ${
              isCover ? "-mt-[90px]" : "mt-[70px]"
            } z-50 relative`}
          >
            <Logo name="Logo" />

            <div className="hidden"></div>
          </div>
        )}

        {isTimer ? (
          <div id="Timer">
            <div
              className="mt-4 py-0"
              style={{ minHight: "180px", border: "" }}
            >
              <QueNavONETIME Remove={RemoveTimer} />
            </div>
            <StartTimer time={{ days: 0 }} />
          </div>
        ) : (
          <></>
        )}

        <div id="Head-Form" style={{ minWidth: "280px" }}>
          <p
            id="FormName"
            ref={ref}
            onInput={(e) => {
              const value = e.target.textContent;
              setHeading(value);
            }}
            contentEditable="true"
            suppressContentEditableWarning={true}
            style={{
              color: "#000",
              fontWeight: "bold",
              outline: "none",
              textAlign: "center",
              fontSize: "2.5vw",
              paddingTop: "40px",
            }}
          />
          <div style={{ border: "1px dotted black" }}></div>
          <p
            ref={detailsRef}
            onInput={(e) => {
              setDetails(e.target.textContent);
            }}
            contentEditable="true"
            suppressContentEditableWarning={true}
            style={{
              outline: "none",
              textAlign: "center",
            }}
          />
        </div>

        <div id="Ques">
          <div id="Ques">
            {masterList.map((element, index) => {
              const shouldRender = getQueKey(element.field_type) === 1;

              return (
                <div key={element.field_id}>
                  <div className="border border-[#eaeaea] rounded-[10px] mt-[10px] bg-white">
                    {shouldRender && (
                      <div
                        id={`Question-${element.field_id}`}
                        className="flex w-fit"
                      >
                        <div className="w-[52vw]">
                          <div className="min-h-[10px]">
                            <QueNav
                              cnt={element.field_id}
                              Duplicate={Duplicate}
                              Remove={Remove}
                            />
                          </div>

                          <Question
                            id={`que-container-${element.field_id}`}
                            type={element.field_type}
                            field_id={element.field_id}
                            index={index}
                            placeholder={element.field_placeholder}
                            desc={element.field_desc}
                            note={element.field_note}
                            err={element.field_error}
                            element={element}
                          />
                        </div>

                        <div className="hidden justify-around flex-col h-[200px] min-w-[8vw] items-center text-center">
                          <span>Up</span>
                          <span>Down</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {isTerms ? (
          <div id="Terms">
            <div style={{ minHight: "180px", border: "", marginTop: "30px" }}>
              <QueNavONETIME Remove={removeTerms} />
            </div>
            <Terms />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
