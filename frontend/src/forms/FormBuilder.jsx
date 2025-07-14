import { useState, useEffect } from "react";
import FoRm from "./Form.jsx";

export const DefaultQuestion = {
  Logo: "Choose Logo",
  text: "Enter Field Name",
  number: "Enter Field Name",
  "single selection": "Select from below",
  "multiple selection": "Multi Select from below",
  "Dropdown Selection": "Dropdown Question",
  "Special Selection": "Parent Question Which decide further questions",
  FullName: "Full Name",
  email: "Enter Email",
  address: "Enter Address",
  "Phone no.": "Phone number",
  "upload image": "Question to Upload an Image",
  "upload file": "Question to Upload a File",
  Date: "Enter Date",
  Time: "Enter Time",
  Timer: "Enter Timer",
  "Terms and Conditions": "Terms and Conditions",
  Cover: "Cover Image",
  "ending page": "Ending page promo",
  "welcome page": "Welcome page promo",
};

export const DefaultDesc = {
  Logo: "Choose Logo",
  text: "Enter Field Description",
  number: "Enter Field Description",
  "single selection": "Select from below",
  "multiple selection": "Multi Select from below",
  "Dropdown Selection": "Dropdown Question",
  "Special Selection": "Parent Question Which decide further questions",
  FullName: "Full Name",
  email: "Enter Description",
  address: "Enter Description",
  "Phone no.": "Phone number",
  "upload image": "Question to Upload an Image",
  "upload file": "Question to Upload a File",
  Date: "Enter Date",
  Time: "Enter Time",
  Timer: "Enter Timer",
  "Terms and Conditions": "Terms and Conditions",
  Cover: "Cover Image",
  "ending page": "Ending page promo",
  "welcome page": "Welcome page promo",
};

export const DefaultNote = {
  Logo: "Choose Logo",
  text: "Enter Note (if any)",
  number: "Enter Note (if any)",
  "single selection": "Select from below",
  "multiple selection": "Multi Select from below",
  "Dropdown Selection": "Dropdown Question",
  "Special Selection": "Parent Question Which decide further questions",
  FullName: "Full Name",
  email: "Enter Email",
  address: "Enter Address",
  "Phone no.": "Phone number",
  "upload image": "Question to Upload an Image",
  "upload file": "Question to Upload a File",
  Date: "Enter Date",
  Time: "Enter Time",
  Timer: "Enter Timer",
  "Terms and Conditions": "Terms and Conditions",
  Cover: "Cover Image",
  "ending page": "Ending page promo",
  "welcome page": "Welcome page promo",
};

export const PlaceHolders = {
  Logo: "Add PlaceHolder ",
  text: "",
  number: "Add PlaceHolder ",
  "single selection": "Add PlaceHolder ...",
  "multiple selection": "Add PlaceHolder ...",
  "Dropdown Selection": "Add PlaceHolder ...",
  "Special Selection": "Add PlaceHolder ...",
  FullName: ["First Name", "Second Name"],
  email: "Email Address",
  address: " Enter Address",
  "Phone no.": "phone number",
  "upload image": "Add PlaceHolder ...",
  "upload file": "Add PlaceHolder ...",
  Date: "Add PlaceHolder ...",
  Time: "Add PlaceHolder ...",
  Timer: { days: "1", hours: "0", minutes: "0", seconds: "0" },
  "Terms and Conditions": "Terms and Conditions",
  Cover: "Cover Image",
  "ending page": "Ending page promo",
  "welcome page": "Welcome page promo",
};

export default function FormBuilder() {
  const [selectedAside, setSelectedAside] = useState("Fields");
  const [lastSelectedAside, setlastSelectedAside] = useState("Fields");
  const [Questions, setQuestions] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [editMode, setEditMode] = useState([]);
  const [Options, setOptions] = useState([]);
  const [Logo, setLogo] = useState(false);
  const [Timer, setTimer] = useState(false);
  const [Cover, setCover] = useState(false);
  const [Terms, setTerms] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);

  // {emptyForm && setMasterList([{
  // 	field_index : 0,
  // 	field_type : "FullName",
  // 	field_Name : "FullName",
  //  field_Question : "Full Name",
  // 	field_desc : "every one has a name. Enter that pls",
  // 	field_placeholder: "Enter your name",
  //  field_note : "You must enter First and Lst name both",
  // 	field_error : ""
  // }]) && setEmptyForm(false)}

  // ["logo", "text", "number", "single selection", "multiple selection", "Dropdown Selection", "special Render over Choise", "FullName", "email", "address", "Phone no.", "upload image", "upload file", "Date", "Time", "Timer", "Terms and Conditions", "cover", "ending page", "welcome page"]
  const [Feilds, setFeilds] = useState({
    Essentials: [
      "text",
      "number",
      "single selection",
      "multiple selection",
      "Dropdown Selection",
      "Special Selection",
    ],
    "Contact Details": ["FullName", "email", "address", "Phone no."],
    Uploads: ["upload image", "upload file"],
    "Date & Time": ["Date", "Time"],
    "Legal & Consent": ["Terms and Conditions"],
    "Media and Structure": ["ending page", "welcome page"],
    "One Time Render": ["Timer", "Logo", "Cover", "Terms and Conditions"],
  });

  const Feild = {
    Essentials: [
      "text",
      "number",
      "single selection",
      "multiple selection",
      "Dropdown Selection",
      "Special Selection",
    ],
    contactDetails: ["FullName", "email", "address", "Phone no."],
    Uploads: ["upload image", "upload file"],
    "Date & Time": ["Date", "Time"],
    "Legal & Consent": ["Terms and Conditions"],
    "Media and Structure": ["ending page", "welcome page"],
  };

  const feildTypes = [
    "One Time Render",
    "Essentials",
    "Contact Details",
    "Uploads",
    "Date & Time",
    "Media and Structure",
  ];

  const Icon = {
    Essentials: {
      text: `<svg width="22" height="22" viewBox="0 0 13 11" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.25 2.75V0.25H0.75V2.75H2.75V1.25H5.5V10H3.75V11H9.25V10H7.5V1.25H10.25V2.75H12.25Z" fill="black"/>
                                </svg>`,
      number: `<svg width="22" height="22"  viewBox="0 0 13 7" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.120117 0.99998C0.120117 0.823169 0.190355 0.6536 0.315379 0.528575C0.440404 0.403551 0.609973 0.333313 0.786784 0.333313H1.42145C2.13012 0.333313 2.72278 0.901979 2.72278 1.62531V5.99998C2.72278 6.17679 2.65255 6.34636 2.52752 6.47138C2.4025 6.59641 2.23293 6.66665 2.05612 6.66665C1.87931 6.66665 1.70974 6.59641 1.58471 6.47138C1.45969 6.34636 1.38945 6.17679 1.38945 5.99998V1.66665H0.786784C0.609973 1.66665 0.440404 1.59641 0.315379 1.47138C0.190355 1.34636 0.120117 1.17679 0.120117 0.99998ZM3.92945 0.99998C3.92945 0.823169 3.99969 0.6536 4.12471 0.528575C4.24974 0.403551 4.41931 0.333313 4.59612 0.333313H6.50078C7.21012 0.333313 7.80278 0.901979 7.80278 1.62531V2.87465C7.80217 3.04504 7.76798 3.21364 7.70217 3.37081C7.63636 3.52799 7.54021 3.67065 7.41923 3.79064C7.29825 3.91063 7.1548 4.0056 6.9971 4.07012C6.83939 4.13463 6.67051 4.16744 6.50012 4.16665H5.26212V5.33331H7.13545C7.31226 5.33331 7.48183 5.40355 7.60685 5.52857C7.73188 5.6536 7.80212 5.82317 7.80212 5.99998C7.80212 6.17679 7.73188 6.34636 7.60685 6.47138C7.48183 6.59641 7.31226 6.66665 7.13545 6.66665H5.23012C4.88633 6.66789 4.55613 6.53255 4.3121 6.2904C4.06807 6.04824 3.9302 5.71909 3.92878 5.37531V4.12465C3.92878 3.40198 4.52145 2.83331 5.23012 2.83331H6.46878V1.66665H4.59545C4.41864 1.66665 4.24907 1.59641 4.12405 1.47138C3.99902 1.34636 3.92878 1.17679 3.92878 0.99998M9.00812 0.99998C9.00812 0.823169 9.07836 0.6536 9.20338 0.528575C9.3284 0.403551 9.49797 0.333313 9.67478 0.333313H11.5795C12.2881 0.333313 12.8815 0.901979 12.8815 1.62531V5.37465C12.8808 5.54498 12.8467 5.71353 12.7809 5.87066C12.7151 6.02779 12.619 6.17042 12.4981 6.2904C12.3772 6.41038 12.2339 6.50537 12.0762 6.56992C11.9186 6.63448 11.7498 6.66735 11.5795 6.66665H9.67478C9.49797 6.66665 9.3284 6.59641 9.20338 6.47138C9.07836 6.34636 9.00812 6.17679 9.00812 5.99998C9.00812 5.82317 9.07836 5.6536 9.20338 5.52857C9.3284 5.40355 9.49797 5.33331 9.67478 5.33331H11.5481V4.16665H9.67478C9.49797 4.16665 9.3284 4.09641 9.20338 3.97138C9.07836 3.84636 9.00812 3.67679 9.00812 3.49998C9.00812 3.32317 9.07836 3.1536 9.20338 3.02858C9.3284 2.90355 9.49797 2.83331 9.67478 2.83331H11.5481V1.66665H9.67478C9.49797 1.66665 9.3284 1.59641 9.20338 1.47138C9.07836 1.34636 9.00812 1.17679 9.00812 0.99998Z" fill="black"/>
                                </svg>`,
      "single selection": `<svg width="22" height="22" viewBox="0 0 15 15" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.49967 14.1666C3.81767 14.1666 0.833008 11.182 0.833008 7.49998C0.833008 3.81798 3.81767 0.833313 7.49967 0.833313C11.1817 0.833313 14.1663 3.81798 14.1663 7.49998C14.1663 11.182 11.1817 14.1666 7.49967 14.1666ZM6.71501 8.92665L4.87167 7.08198L4.16634 7.78731L6.24567 9.86798C6.37069 9.99296 6.54023 10.0632 6.71701 10.0632C6.89378 10.0632 7.06332 9.99296 7.18834 9.86798L11.1563 5.90131L10.4483 5.19331L6.71501 8.92665Z" fill="black"/>
                                </svg>`,
      "multiple selection": `<svg width="22" height="22" viewBox="0 0 16 15" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 13C2.36739 13 2.24021 12.9473 2.14645 12.8536C2.05268 12.7598 2 12.6326 2 12.5V2.5C2 2.36739 2.05268 2.24021 2.14645 2.14645C2.24021 2.05268 2.36739 2 2.5 2H11.75C11.9489 2 12.1397 1.92098 12.2803 1.78033C12.421 1.63968 12.5 1.44891 12.5 1.25C12.5 1.05109 12.421 0.860322 12.2803 0.71967C12.1397 0.579018 11.9489 0.5 11.75 0.5H2.5C1.96957 0.5 1.46086 0.710714 1.08579 1.08579C0.710714 1.46086 0.5 1.96957 0.5 2.5V12.5C0.5 13.0304 0.710714 13.5391 1.08579 13.9142C1.46086 14.2893 1.96957 14.5 2.5 14.5H12.5C13.0304 14.5 13.5391 14.2893 13.9142 13.9142C14.2893 13.5391 14.5 13.0304 14.5 12.5V9.25C14.5 9.05109 14.421 8.86032 14.2803 8.71967C14.1397 8.57902 13.9489 8.5 13.75 8.5C13.5511 8.5 13.3603 8.57902 13.2197 8.71967C13.079 8.86032 13 9.05109 13 9.25V12.5C13 12.6326 12.9473 12.7598 12.8536 12.8536C12.7598 12.9473 12.6326 13 12.5 13H2.5ZM15.28 4.18C15.4125 4.03782 15.4846 3.84978 15.4812 3.65548C15.4777 3.46118 15.399 3.27579 15.2616 3.13838C15.1242 3.00097 14.9388 2.92225 14.7445 2.91882C14.5502 2.9154 14.3622 2.98752 14.22 3.12L8.662 8.677L6.789 6.741C6.72066 6.6696 6.63889 6.6124 6.54837 6.57271C6.45786 6.53301 6.36039 6.5116 6.26157 6.5097C6.16276 6.5078 6.06454 6.52545 5.97257 6.56163C5.88059 6.59782 5.79668 6.65183 5.72565 6.72055C5.65462 6.78928 5.59787 6.87136 5.55867 6.96209C5.51947 7.05282 5.49859 7.1504 5.49723 7.24923C5.49586 7.34806 5.51405 7.44618 5.55074 7.53795C5.58742 7.62973 5.64189 7.71335 5.711 7.784L8.114 10.268C8.18314 10.3397 8.26587 10.3969 8.35737 10.4363C8.44887 10.4757 8.54729 10.4965 8.6469 10.4974C8.74651 10.4983 8.84531 10.4794 8.93752 10.4417C9.02974 10.4041 9.11353 10.3484 9.184 10.278L15.28 4.18Z" fill="black"/>
                                </svg>`,
      "Dropdown Selection": `<svg width="22" height="22" viewBox="0 0 17 17" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.95801 7.08331L8.49967 10.625L12.0413 7.08331H4.95801Z" fill="black"/>
                                </svg>`,
      "special Render over Choise": `<svg width="22" height="22" viewBox="0 0 17 17" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.95801 7.08331L8.49967 10.625L12.0413 7.08331H4.95801Z" fill="black"/>
                                </svg>`,
    },
    "Contact Details": {
      FullName: `<svg width="22" height="22" viewBox="0 0 13 15" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.83333 4.50001C2.83333 3.52755 3.21964 2.59492 3.90727 1.90729C4.59491 1.21965 5.52754 0.833344 6.5 0.833344C7.47246 0.833344 8.40509 1.21965 9.09273 1.90729C9.78036 2.59492 10.1667 3.52755 10.1667 4.50001C10.1667 5.47247 9.78036 6.4051 9.09273 7.09273C8.40509 7.78037 7.47246 8.16668 6.5 8.16668C5.52754 8.16668 4.59491 7.78037 3.90727 7.09273C3.21964 6.4051 2.83333 5.47247 2.83333 4.50001ZM0.5 12.1667C0.5 11.2826 0.851189 10.4348 1.47631 9.80965C2.10143 9.18453 2.94928 8.83334 3.83333 8.83334H9.16667C10.0507 8.83334 10.8986 9.18453 11.5237 9.80965C12.1488 10.4348 12.5 11.2826 12.5 12.1667V14.1667H0.5V12.1667Z" fill="black"/>
                                </svg>`,
      email: `<svg width="22" height="22" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g clip-path="url(#clip0_594_524)">
                                          <path d="M14.8691 3.16667C14.8085 3.16043 14.7474 3.16043 14.6868 3.16667H2.24239C2.16263 3.1679 2.0834 3.17986 2.00684 3.20222L8.42906 9.59778L14.8691 3.16667Z" fill="black"/>
                                          <path d="M15.5263 3.78445L9.0552 10.2289C8.88866 10.3945 8.66336 10.4874 8.42853 10.4874C8.1937 10.4874 7.96841 10.3945 7.80187 10.2289L1.38853 3.83334C1.36882 3.90581 1.35836 3.98047 1.35742 4.05557V12.9445C1.35742 13.1802 1.45107 13.4063 1.61777 13.573C1.78447 13.7397 2.01056 13.8333 2.24631 13.8333H14.6908C14.9265 13.8333 15.1526 13.7397 15.3193 13.573C15.486 13.4063 15.5796 13.1802 15.5796 12.9445V4.05557C15.5761 3.96297 15.5581 3.87149 15.5263 3.78445ZM2.8552 12.9445H2.23742V12.3089L5.46853 9.10445L6.0952 9.73112L2.8552 12.9445ZM14.6819 12.9445H14.0596L10.8196 9.73112L11.4463 9.10445L14.6774 12.3089L14.6819 12.9445Z" fill="black"/>
                                          </g>
                                          <defs>
                                          <clipPath id="clip0_594_524">
                                          <rect width="16" height="16" fill="white" transform="translate(0.5 0.5)"/>
                                          </clipPath>
                                          </defs>
                                          </svg>`,
      address: `<svg width="22" height="22" viewBox="0 0 17 17" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.49967 8.16668C8.05765 8.16668 7.63372 7.99108 7.32116 7.67852C7.0086 7.36596 6.83301 6.94204 6.83301 6.50001C6.83301 6.05798 7.0086 5.63406 7.32116 5.3215C7.63372 5.00894 8.05765 4.83334 8.49967 4.83334C8.9417 4.83334 9.36562 5.00894 9.67819 5.3215C9.99075 5.63406 10.1663 6.05798 10.1663 6.50001C10.1663 6.71888 10.1232 6.93561 10.0395 7.13782C9.95572 7.34002 9.83295 7.52376 9.67819 7.67852C9.52342 7.83329 9.33969 7.95605 9.13748 8.03981C8.93527 8.12357 8.71854 8.16668 8.49967 8.16668ZM8.49967 1.83334C7.262 1.83334 6.07501 2.32501 5.19984 3.20018C4.32467 4.07535 3.83301 5.26233 3.83301 6.50001C3.83301 10 8.49967 15.1667 8.49967 15.1667C8.49967 15.1667 13.1663 10 13.1663 6.50001C13.1663 5.26233 12.6747 4.07535 11.7995 3.20018C10.9243 2.32501 9.73735 1.83334 8.49967 1.83334Z" fill="black"/>
                                </svg>`,
      "Phone no.": `<svg width="22" height="22" viewBox="0 0 13 13" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.91333 5.69333C3.87333 7.58 5.42 9.12 7.30667 10.0867L8.77333 8.62C8.95333 8.44 9.22 8.38 9.45333 8.46C10.2 8.70667 11.0067 8.84 11.8333 8.84C12.2 8.84 12.5 9.14 12.5 9.50667V11.8333C12.5 12.2 12.2 12.5 11.8333 12.5C5.57333 12.5 0.5 7.42667 0.5 1.16667C0.5 0.8 0.8 0.5 1.16667 0.5H3.5C3.86667 0.5 4.16667 0.8 4.16667 1.16667C4.16667 2 4.3 2.8 4.54667 3.54667C4.62 3.78 4.56667 4.04 4.38 4.22667L2.91333 5.69333Z" fill="black"/>
                                </svg>`,
    },
    Uploads: {
      "upload image": `<svg width="22" height="22" viewBox="0 0 39 30" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.875 29.125V20.875H26.375L19.5 12.625L12.625 20.875H18.125V29.125H11.25V29.0563C11.019 29.07 10.799 29.125 10.5625 29.125C7.82746 29.125 5.20443 28.0385 3.27046 26.1045C1.33649 24.1706 0.25 21.5475 0.25 18.8125C0.25 13.5215 4.25125 9.2095 9.3855 8.61825C9.83566 6.26506 11.0917 4.14228 12.9377 2.61502C14.7837 1.08775 17.1041 0.251469 19.5 0.25C21.8962 0.251325 24.2171 1.0875 26.0635 2.61473C27.9099 4.14197 29.1665 6.26482 29.6173 8.61825C34.7515 9.2095 38.7472 13.5215 38.7472 18.8125C38.7472 21.5475 37.6608 24.1706 35.7268 26.1045C33.7928 28.0385 31.1698 29.125 28.4347 29.125C28.2037 29.125 27.981 29.07 27.7472 29.0563V29.125H20.875Z" fill="#717171"/>
                                </svg>`,
      "upload file": `<svg width="22" height="22" viewBox="0 0 39 30" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.875 29.125V20.875H26.375L19.5 12.625L12.625 20.875H18.125V29.125H11.25V29.0563C11.019 29.07 10.799 29.125 10.5625 29.125C7.82746 29.125 5.20443 28.0385 3.27046 26.1045C1.33649 24.1706 0.25 21.5475 0.25 18.8125C0.25 13.5215 4.25125 9.2095 9.3855 8.61825C9.83566 6.26506 11.0917 4.14228 12.9377 2.61502C14.7837 1.08775 17.1041 0.251469 19.5 0.25C21.8962 0.251325 24.2171 1.0875 26.0635 2.61473C27.9099 4.14197 29.1665 6.26482 29.6173 8.61825C34.7515 9.2095 38.7472 13.5215 38.7472 18.8125C38.7472 21.5475 37.6608 24.1706 35.7268 26.1045C33.7928 28.0385 31.1698 29.125 28.4347 29.125C28.2037 29.125 27.981 29.07 27.7472 29.0563V29.125H20.875Z" fill="#717171"/>
                                </svg>`,
    },
    "Date & Time": {
      Date: `<svg width="22" height="22" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.833008 5.50004C0.833008 4.24271 0.833008 3.61471 1.22367 3.22404C1.61434 2.83337 2.24234 2.83337 3.49967 2.83337H11.4997C12.757 2.83337 13.385 2.83337 13.7757 3.22404C14.1663 3.61471 14.1663 4.24271 14.1663 5.50004C14.1663 5.81404 14.1663 5.97137 14.069 6.06937C13.971 6.16671 13.813 6.16671 13.4997 6.16671H1.49967C1.18567 6.16671 1.02834 6.16671 0.930341 6.06937C0.833008 5.97137 0.833008 5.81337 0.833008 5.50004Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.833008 11.5C0.833008 12.7573 0.833008 13.3853 1.22367 13.776C1.61434 14.1667 2.24234 14.1667 3.49967 14.1667H11.4997C12.757 14.1667 13.385 14.1667 13.7757 13.776C14.1663 13.3853 14.1663 12.7573 14.1663 11.5V8.16667C14.1663 7.85267 14.1663 7.69533 14.069 7.59733C13.971 7.5 13.813 7.5 13.4997 7.5H1.49967C1.18567 7.5 1.02834 7.5 0.930341 7.59733C0.833008 7.69533 0.833008 7.85333 0.833008 8.16667V11.5ZM4.16634 9.5C4.16634 9.186 4.16634 9.02867 4.26367 8.93067C4.36167 8.83333 4.51967 8.83333 4.83301 8.83333H6.16634C6.48034 8.83333 6.63767 8.83333 6.73567 8.93067C6.83301 9.02867 6.83301 9.186 6.83301 9.5C6.83301 9.814 6.83301 9.97133 6.73567 10.0693C6.63767 10.1667 6.47967 10.1667 6.16634 10.1667H4.83301C4.51901 10.1667 4.36167 10.1667 4.26367 10.0693C4.16634 9.97133 4.16634 9.81333 4.16634 9.5ZM4.26367 11.5973C4.16634 11.6953 4.16634 11.8533 4.16634 12.1667C4.16634 12.48 4.16634 12.638 4.26367 12.736C4.36167 12.8333 4.51967 12.8333 4.83301 12.8333H6.16634C6.48034 12.8333 6.63767 12.8333 6.73567 12.736C6.83301 12.638 6.83301 12.48 6.83301 12.1667C6.83301 11.8533 6.83301 11.6953 6.73567 11.5973C6.63767 11.5 6.47967 11.5 6.16634 11.5H4.83301C4.51901 11.5 4.36167 11.5 4.26367 11.5973ZM8.16634 9.5C8.16634 9.186 8.16634 9.02867 8.26367 8.93067C8.36167 8.83333 8.51967 8.83333 8.83301 8.83333H10.1663C10.4803 8.83333 10.6377 8.83333 10.7357 8.93067C10.833 9.02867 10.833 9.186 10.833 9.5C10.833 9.814 10.833 9.97133 10.7357 10.0693C10.6377 10.1667 10.4797 10.1667 10.1663 10.1667H8.83301C8.51901 10.1667 8.36167 10.1667 8.26367 10.0693C8.16634 9.97133 8.16634 9.81333 8.16634 9.5ZM8.26367 11.5973C8.16634 11.6953 8.16634 11.8533 8.16634 12.1667C8.16634 12.48 8.16634 12.638 8.26367 12.736C8.36167 12.8333 8.51901 12.8333 8.83301 12.8333H10.1663C10.4803 12.8333 10.6377 12.8333 10.7357 12.736C10.833 12.638 10.833 12.48 10.833 12.1667C10.833 11.8533 10.833 11.6953 10.7357 11.5973C10.6377 11.5 10.4797 11.5 10.1663 11.5H8.83301C8.51901 11.5 8.36167 11.5 8.26367 11.5973Z" fill="black"/>
                                <path d="M4.16602 1.5V3.5M10.8327 1.5V3.5" stroke="black" stroke-width="2" stroke-linecap="round"/>
                                </svg>`,
      Time: `<svg width="22" height="22" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99967 7.08671V3.50004H6.99967V7.50004L9.82834 10.3287L10.535 9.62204L7.99967 7.08671ZM7.49967 14.1667C3.81767 14.1667 0.833008 11.182 0.833008 7.50004C0.833008 3.81804 3.81767 0.833374 7.49967 0.833374C11.1817 0.833374 14.1663 3.81804 14.1663 7.50004C14.1663 11.182 11.1817 14.1667 7.49967 14.1667Z" fill="black"/>
                                </svg>`,
    },
    "Legal & Consent": {},
    "Media and Structure": {
      "ending page": `<svg width="22" height="22" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.89968 1.69999C2.90011 1.27592 3.06887 0.869368 3.36888 0.569656C3.66889 0.269944 4.07561 0.101593 4.49968 0.101593H8.49968C8.92375 0.101593 9.33048 0.269944 9.63049 0.569656C9.9305 0.869368 10.0993 1.27592 10.0997 1.69999H10.8965C11.2147 1.69999 11.52 1.82642 11.745 2.05146C11.9701 2.27651 12.0965 2.58173 12.0965 2.89999V4.10399C12.0965 4.68495 11.8855 5.24614 11.5028 5.68319C11.12 6.12024 10.5916 6.4034 10.0157 6.47999C9.85313 7.21306 9.46542 7.87695 8.90683 8.37873C8.34823 8.88052 7.64672 9.19508 6.90048 9.27839V10.4744H8.50288C8.92723 10.4744 9.3342 10.643 9.63426 10.943C9.93431 11.2431 10.1029 11.65 10.1029 12.0744V12.4744C10.1029 12.5805 10.0607 12.6822 9.98573 12.7572C9.91071 12.8323 9.80897 12.8744 9.70288 12.8744H3.30288C3.1968 12.8744 3.09506 12.8323 3.02004 12.7572C2.94503 12.6822 2.90288 12.5805 2.90288 12.4744V12.0744C2.90288 11.65 3.07146 11.2431 3.37151 10.943C3.67157 10.643 4.07854 10.4744 4.50288 10.4744H6.10048V9.27839C5.35378 9.19509 4.65185 8.88025 4.09307 8.37799C3.53428 7.87573 3.14665 7.21122 2.98448 6.47759C2.40744 6.40091 1.87779 6.11751 1.49382 5.67999C1.10985 5.24246 0.897608 4.68051 0.896484 4.09839V2.89999C0.896484 2.58173 1.02291 2.27651 1.24796 2.05146C1.473 1.82642 1.77822 1.69999 2.09648 1.69999H2.89968ZM10.0997 5.64959C10.4422 5.56096 10.7456 5.36108 10.9622 5.08133C11.1788 4.80158 11.2964 4.45781 11.2965 4.10399V2.89999C11.2965 2.79391 11.2543 2.69216 11.1793 2.61715C11.1043 2.54214 11.0026 2.49999 10.8965 2.49999H10.1005L10.0997 5.64959ZM2.89968 2.49999H2.09728C1.9912 2.49999 1.88946 2.54214 1.81444 2.61715C1.73943 2.69216 1.69728 2.79391 1.69728 2.89999V4.09839C1.69728 4.84239 2.20928 5.46879 2.90128 5.64719L2.89968 2.49999Z" fill="black"/>
                                </svg>`,
      "welcome page": `<svg width="22" height="22" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.1673 7.5C11.1673 7.99937 11.0653 8.49349 10.8676 8.95204C10.6698 9.41059 10.3805 9.82391 10.0173 10.1667C9.33751 10.8101 8.43667 11.168 7.50065 11.1667C6.52665 11.1667 5.64065 10.7867 4.98398 10.1667C4.62081 9.82391 4.33148 9.41059 4.13373 8.95204C3.93598 8.49349 3.83398 7.99937 3.83398 7.5H11.1673Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.166992 4.16666C0.166992 3.10579 0.58842 2.08837 1.33857 1.33823C2.08871 0.588084 3.10613 0.166656 4.16699 0.166656H10.8337C11.8945 0.166656 12.9119 0.588084 13.6621 1.33823C14.4122 2.08837 14.8337 3.10579 14.8337 4.16666V10.8333C14.8337 11.8942 14.4122 12.9116 13.6621 13.6618C12.9119 14.4119 11.8945 14.8333 10.8337 14.8333H0.166992V4.16666ZM2.00033 7.49999C2.00033 6.0413 2.57979 4.64235 3.61124 3.6109C4.64269 2.57945 6.04164 1.99999 7.50033 1.99999C8.95902 1.99999 10.358 2.57945 11.3894 3.6109C12.4209 4.64235 13.0003 6.0413 13.0003 7.49999C13.0003 8.95868 12.4209 10.3576 11.3894 11.3891C10.358 12.4205 8.95902 13 7.50033 13C6.04164 13 4.64269 12.4205 3.61124 11.3891C2.57979 10.3576 2.00033 8.95868 2.00033 7.49999Z" fill="black"/>
                                </svg>`,
    },
    "One Time Render": {
      Timer: `<svg width="22" height="22" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.5 1.50002V0.166687H8.5V1.50002H4.5ZM5.83333 8.83335H7.16667V4.83335H5.83333V8.83335ZM6.5 14.1667C5.67778 14.1667 4.90267 14.0085 4.17467 13.692C3.44667 13.3756 2.81067 12.9449 2.26667 12.4C1.72267 11.8551 1.29222 11.2189 0.975333 10.4914C0.658444 9.7638 0.5 8.98891 0.5 8.16669C0.5 7.34446 0.658444 6.56935 0.975333 5.84135C1.29222 5.11335 1.72267 4.47735 2.26667 3.93335C2.81067 3.38935 3.44689 2.95891 4.17533 2.64202C4.90378 2.32513 5.67867 2.16669 6.5 2.16669C7.18889 2.16669 7.85 2.2778 8.48333 2.50002C9.11667 2.72224 9.71111 3.04446 10.2667 3.46669L11.2 2.53335L12.1333 3.46669L11.2 4.40002C11.6222 4.95558 11.9444 5.55002 12.1667 6.18335C12.3889 6.81669 12.5 7.4778 12.5 8.16669C12.5 8.98891 12.3416 9.76402 12.0247 10.492C11.7078 11.22 11.2773 11.856 10.7333 12.4C10.1893 12.944 9.55311 13.3747 8.82467 13.692C8.09622 14.0094 7.32133 14.1676 6.5 14.1667Z" fill="black"/>
                                </svg>`,
      Logo: `<svg width="22" height="22" viewBox="0 0 23 23" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <rect rx="5" fill="#"/>
                                <path d="M11.5002 8.30939C10.8692 8.30939 10.2523 8.49651 9.72758 8.8471C9.20288 9.19769 8.79393 9.696 8.55244 10.279C8.31095 10.862 8.24777 11.5036 8.37088 12.1225C8.49399 12.7414 8.79787 13.3099 9.24408 13.7561C9.6903 14.2023 10.2588 14.5062 10.8777 14.6293C11.4967 14.7524 12.1382 14.6893 12.7212 14.4478C13.3042 14.2063 13.8025 13.7973 14.1531 13.2726C14.5037 12.7479 14.6908 12.1311 14.6908 11.5C14.6897 10.6541 14.3532 9.84321 13.7551 9.24509C13.157 8.64696 12.3461 8.31046 11.5002 8.30939Z" fill="black"/>
                                <path d="M16.0807 8.5928C16.8836 8.5928 17.5345 7.94194 17.5345 7.13905C17.5345 6.33617 16.8836 5.6853 16.0807 5.6853C15.2778 5.6853 14.627 6.33617 14.627 7.13905C14.627 7.94194 15.2778 8.5928 16.0807 8.5928Z" fill="black"/>
                                <path d="M17.8706 8.60001L17.8097 8.46626L17.7125 8.57626C17.4744 8.84666 17.1732 9.05405 16.8356 9.18001L16.7419 9.21439L16.78 9.30595C17.0706 10.0009 17.2197 10.7468 17.2188 11.5C17.2188 14.6538 14.6531 17.2188 11.5 17.2188C8.34687 17.2188 5.78125 14.6538 5.78125 11.5C5.78125 8.34626 8.34625 5.78126 11.5 5.78126C12.3481 5.77949 13.1858 5.96853 13.9509 6.33439L14.0406 6.37501L14.0797 6.28376C14.2222 5.95296 14.4439 5.66232 14.7253 5.43751L14.84 5.34595L14.7097 5.28126C13.7185 4.76574 12.6173 4.4977 11.5 4.50001C7.64031 4.50001 4.5 7.64033 4.5 11.5C4.5 15.3597 7.64031 18.5 11.5 18.5C15.3597 18.5 18.5 15.3597 18.5 11.5C18.5016 10.4993 18.2869 9.51004 17.8706 8.60001Z" fill="black"/>
                                </svg>`,
      Cover: `<svg width="22" height="22" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.2997 0.23333C11.9663 0.699996 10.0997 1.16666 7.49967 1.16666C4.89967 1.16666 2.89967 0.63333 1.69967 0.23333C1.29967 0.0333298 0.833008 0.366663 0.833008 0.83333V10.1667C0.833008 10.6333 1.29967 10.9667 1.69967 10.8333C3.09967 10.3667 4.89967 9.83333 7.49967 9.83333C10.0997 9.83333 11.9663 10.3667 13.2997 10.8333C13.7663 10.9667 14.1663 10.6333 14.1663 10.1667V0.83333C14.1663 0.366663 13.6997 0.0333298 13.2997 0.23333ZM7.49967 7.5C5.96634 7.5 4.49967 7.56666 3.16634 7.76666L5.63301 4.83333L6.96634 6.43333L8.83301 4.16666L11.833 7.76666C10.4997 7.56666 9.03301 7.5 7.49967 7.5Z" fill="black"/>
                                </svg>`,
      "Terms and Conditions": `<svg width="22" height="22" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99967 7.08671V3.50004H6.99967V7.50004L9.82834 10.3287L10.535 9.62204L7.99967 7.08671ZM7.49967 14.1667C3.81767 14.1667 0.833008 11.182 0.833008 7.50004C0.833008 3.81804 3.81767 0.833374 7.49967 0.833374C11.1817 0.833374 14.1663 3.81804 14.1663 7.50004C14.1663 11.182 11.1817 14.1667 7.49967 14.1667Z" fill="black"/>
                                </svg>`,
    },
  };
  const [len, Setlen] = useState(90)
  function reindexMasterList(list) {
    return list.map((item, idx) => ({ ...item, field_index: idx }));
  }

  function generateUniqueId() {
    return `field_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }

  function Duplicate(field_id) {
    const index = masterList.findIndex((el) => el.field_id === field_id);
    if (index === -1) return;

    const updatedList = [...masterList];
    const copy = JSON.parse(JSON.stringify(updatedList[index]));
    copy.field_id = generateUniqueId();

    updatedList.splice(index + 1, 0, copy);
    setMasterList(reindexMasterList(updatedList));
  }

  function Remove(field_id) {
    const index = masterList.findIndex((el) => el.field_id === field_id);
    if (index === -1) return;

    setMasterList(masterList.filter((el) => el.field_id !== field_id));
    // If you're using Questions and other states too:
    // setQuestions(Questions.filter((el) => el.field_id !== field_id));
    // setEditMode(editMode.filter((_, i) => i !== index));
    // setOptions(Options.filter((_, i) => i !== index));
  }

  function hideFieldofType(st) {
    Feild[st].forEach((element) => {
      document.getElementById(`feild-${element}-1`).classList.toggle("hidden");
      document.getElementById(`feild-${element}-2`).classList.toggle("hidden");
      if (
        document
          .getElementById(`feild-${element}-2`)
          .classList.contains("hidden")
      ) {
        document.getElementById(`feild-${element}-1`).style.height = "0px";
        document.getElementById(`feild-${element}-1`).style.height = "0px";
        document.getElementById(`${st}`).style.maxHeight = "40px";
      } else {
        document.getElementById(`feild-${element}-1`).style.height = "22px";
        document.getElementById(`feild-${element}-2`).style.height = "22px";
        document.getElementById(`${st}`).style.maxHeight = "600px";
      }
    });
  }

  function handleAside(n) {
    if (n == 0) {
      setSelectedAside("Fields");
    } else if (n == 1) {
      setSelectedAside("Design");
    } else if (n == 2) {
      setSelectedAside("Logic");
    } else {
      if (selectedAside == "Collapse") {
        Setlen(50);
        setSelectedAside(lastSelectedAside);
      } else {
        setlastSelectedAside(selectedAside);
        setSelectedAside("Collapse");
        Setlen(0);
      }
    }
  }

  function addQuestion(type) {
    //Add Field
    const isSelectable = [
      "single selection",
      "multiple selection",
      "Dropdown selection",
      "Special Selection",
    ].includes(type);
    const newField = {
      field_id: generateUniqueId(),
      field_index: masterList.length,
      show_field: true,
      field_type: type,
      field_name: DefaultQuestion[type],
      field_desc: DefaultDesc[type],
      field_placeholder: PlaceHolders[type],
      field_note: DefaultNote[type],
      field_error: "",
      ...(isSelectable && {
        field_Options: ["A", "B", "C", "D"].map((label) => ({
          key: label,
          value: label,
          depended_field: [],
          amount: 0,
        })),
      }),
    };
    // console.log("ds", type);
    setMasterList([...masterList, newField]);
  }

  const updateMasterList = (field_id, key, value) => {
    setMasterList((prev) =>
      prev.map((field) =>
        field.field_id === field_id ? { ...field, [key]: value } : field
      )
    );
  };

  const updateOptionAtIndex = (field_id, optionIndex, value) => {
    setMasterList((prev) =>
      prev.map((field) => {
        if (field.field_id !== field_id) return field;

        const newOptions = [...field.field_Options];
        newOptions[optionIndex] = {
          ...newOptions[optionIndex],
          value: value, // only update the value field
        };

        return {
          ...field,
          field_Options: newOptions,
        };
      })
    );
  };

  const updateOptionDependedFieldsAtIndex = (
    field_id,
    optionIndex,
    dependedFields
  ) => {
    setMasterList((prev) =>
      prev.map((field) => {
        if (field.field_id !== field_id) return field;

        const newOptions = [...field.field_Options];
        newOptions[optionIndex] = {
          ...newOptions[optionIndex],
          depended_field: dependedFields, // update only depended_field
        };

        return {
          ...field,
          field_Options: newOptions,
        };
      })
    );
  };

  const updateOptionAmountAtIndex = (field_id, optionIndex, amount) => {
    setMasterList((prev) =>
      prev.map((field) => {
        if (field.field_id !== field_id) return field;

        const newOptions = [...field.field_Options];
        newOptions[optionIndex] = {
          ...newOptions[optionIndex],
          amount: amount, // update only the amount
        };

        return {
          ...field,
          field_Options: newOptions,
        };
      })
    );
  };

  function setQuantity(type) {
    if (type === "Logo") {
      setLogo(Logo == true ? false : true);
    }
    if (type === "Cover") {
      setCover(Cover == true ? false : true);
    }
    if (type === "Timer") {
      setTimer(Timer == true ? false : true);
    }
    if (type === "Terms and Conditions") {
      setTerms(Terms == true ? false : true);
    }
  }


  function setMasterList2(index, prop, val) {
    setMasterList((prev) => {
      let updated = [...prev];

      prop === "T"
        ? (updated[index]["field_type"] = val)
        : prop === "Q"
        ? (updated[index]["field_Question"] = val)
        : prop === "D"
        ? (updated[index]["field_desc"] = val)
        : prop === "P"
        ? (updated[index]["field_placeholder"] = val)
        : prop === "N"
        ? (updated[index]["field_note"] = val)
        : prop === "E"
        ? (updated[index]["field_error"] = val)
        : prop === "O"
        ? (updated[index]["field_Options"] = val)
        : {};

      return updated;
    });
    // console.log(MasterList);
  }

  return (
    <>
      <div className={`flex max-w-[90vw] min-h-[90vh]`}>


      <div className={"border-2 max-w-[len] border-[#d3d3d3] m-[2vh] mr-0 bg-[#f2f4ff] rounded-[15px] w-[30vw] overflow-hidden"}>

          <div className="flex min-w-0">
            <div className={`max-w-[90px] pt-[0px] min-h-[92vh] flex flex-col gap-4`}>
              <div
                  className="cursor-pointer pl-[10px] group transition duration-200"
                  onClick={() => handleAside(3)}
              >
                <div className="mt-0 w-10 h-10  w-full shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-200 flex items-center justify-center border border-gray-300">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="black"
                      className="w-6 h-6 group-hover:stroke-indigo-600 transition duration-200"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </div>
              </div>


              <div className="flex flex-col gap-4">
                <div
                    className="cursor-pointer pl-[20px]"
                    onClick={() => {
                      handleAside(0);
                    }}
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="#242424"
                      background="#7850FA"
                      viewBox="0 0 512 512"
                  >
                    <path d="M411.4 175.5C417.4 185.4 417.5 197.7 411.8 207.8C406.2 217.8 395.5 223.1 384 223.1H192C180.5 223.1 169.8 217.8 164.2 207.8C158.5 197.7 158.6 185.4 164.6 175.5L260.6 15.54C266.3 5.897 276.8 0 288 0C299.2 0 309.7 5.898 315.4 15.54L411.4 175.5zM288 312C288 289.9 305.9 272 328 272H472C494.1 272 512 289.9 512 312V456C512 478.1 494.1 496 472 496H328C305.9 496 288 478.1 288 456V312zM0 384C0 313.3 57.31 256 128 256C198.7 256 256 313.3 256 384C256 454.7 198.7 512 128 512C57.31 512 0 454.7 0 384z" />
                  </svg>
                  <div className="min-h-[50px] mt-[10px] w-[50px]">feilds</div>
                </div>

                <div
                    className="cursor-pointer pl-[20px]"
                    onClick={() => {
                      handleAside(1);
                    }}
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="#242424"
                      background="#7850FA"
                      viewBox="0 0 512 512"
                  >
                    <path d="M464 258.2c0 2.7-1 5.2-4.2 8c-3.8 3.1-10.1 5.8-17.8 5.8H344c-53 0-96 43-96 96c0 6.8 .7 13.4 2.1 19.8c3.3 15.7 10.2 31.1 14.4 40.6l0 0c.7 1.6 1.4 3 1.9 4.3c5 11.5 5.6 15.4 5.6 17.1c0 5.3-1.9 9.5-3.8 11.8c-.9 1.1-1.6 1.6-2 1.8c-.3 .2-.8 .3-1.6 .4c-2.9 .1-5.7 .2-8.6 .2C141.1 464 48 370.9 48 256S141.1 48 256 48s208 93.1 208 208c0 .7 0 1.4 0 2.2zm48 .5c0-.9 0-1.8 0-2.7C512 114.6 397.4 0 256 0S0 114.6 0 256S114.6 512 256 512c3.5 0 7.1-.1 10.6-.2c31.8-1.3 53.4-30.1 53.4-62c0-14.5-6.1-28.3-12.1-42c-4.3-9.8-8.7-19.7-10.8-29.9c-.7-3.2-1-6.5-1-9.9c0-26.5 21.5-48 48-48h97.9c36.5 0 69.7-24.8 70.1-61.3zM160 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-64a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm128-64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm64 64a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                  </svg>
                  <div className="min-h-[50px] mt-[10px] w-[50px]">design</div>
                </div>

                <div
                    className="cursor-pointer pl-[20px]"
                    onClick={() => {
                      handleAside(2);
                    }}
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="#242424"
                      background="#7850FA"
                      viewBox="0 0 512 512"
                  >
                    <path d="M425 31l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H352c-12.6 0-24.4 5.9-32 16l-46 61.3-30-40 37.6-50.1C298.2 117 324.3 104 352 104h78.1L391 65c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0zM204 322.7l-37.6 50.1C149.8 395 123.7 408 96 408H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H96c12.6 0 24.4-5.9 32-16l46-61.3 30 40zM391 287c9.4-9.4 24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H352c-27.7 0-53.8-13-70.4-35.2L128 168c-7.6-10.1-19.4-16-32-16H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H96c27.7 0 53.8 13 70.4 35.2L320 344c7.6 10.1 19.4 16 32 16h78.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9z" />
                  </svg>
                  <div className="min-h-[50px] mt-[10px] w-[50px]">logic</div>
                </div>
              </div>
            </div>


            {selectedAside === "Collapse" ? (
              <></>
            ) : (
              <div className="min-w-[1px] min-h-[92vh] bg-[#d3d3d3]"></div>
            )}

            <div>
              {selectedAside === "Fields" && (
                <div
                  id="feilds"
                  className="h-[90vh] ml-[18px] mt-[2vh] overflow-y-auto pb-6 pr-2"
                >
                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-[#F2F4F9] rounded-[8px] outline-none pl-4 py-1.5 border border-[#d3d3d3] max-w-[200px] text-[#111] mb-4"
                  />

                  {/* All Field Groups */}
                  <div className="text-black">
                    {feildTypes.map((section) => (
                      <div key={section} id={section} className="mb-6">
                        {/* Section Title */}
                        <div className="text-sm font-medium text-gray-500 mb-2">
                          {section}
                        </div>

                        {/* Field Items */}
                        <div className="flex flex-col gap-2">
                          {Feilds[section]?.map((field, idx) => {
                            const iconHTML = Icon[section]?.[field] || "";

                            return (
                              <button
                                key={idx}
                                id={`feild-${field}-btn`}
                                onClick={() => {
                                  if (section === "One Time Render") {
                                    setQuantity(field);
                                  } else {
                                    addQuestion(field);
                                  }
                                }}
                                className={`flex items-center gap-3 px-2 py-2  rounded-md transition-all text-sm `}
                              >
                                {/* Icon */}
                                <div
                                  id={`feild-${field}-icon`}
                                  className="w-6 h-6 flex items-center justify-center bg-indigo-100 rounded-md"
                                  dangerouslySetInnerHTML={{ __html: iconHTML }}
                                ></div>

                                {/* Label */}
                                <span >{field}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedAside === "Design" && (
                <div className="ml-[20px] mt-[2vh] text-gray-500">
                  {/* Optional placeholder or content */}
                  Design section coming soon...
                </div>
              )}

              {selectedAside === "Logic" && (
                <div className="ml-[20px] mt-[2vh] text-gray-500">
                  {/* Optional placeholder or content */}
                  Logic section coming soon...
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <FoRm
            masterList={masterList}
            updateMaster={setMasterList2}
            ques={Questions}
            Duplicate={Duplicate}
            Remove={Remove}
            isLogo={Logo}
            isCover={Cover}
            isTimer={Timer}
            isTerms={Terms}
            setQuantity={setQuantity}
            updateMasterList={updateMasterList}
            updateOptionAtIndex={updateOptionAtIndex}
            updateOptionAmountAtIndex={updateOptionAmountAtIndex}
            updateOptionDependedFieldsAtIndex={
              updateOptionDependedFieldsAtIndex
            }
          />
        </div>
      </div>
    </>
  );
}
