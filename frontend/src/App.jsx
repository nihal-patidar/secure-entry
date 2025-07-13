import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import Auth from './pages/Auth';

//Landing Page
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/login/SignUp";
import ForgotPassword from "./pages/login/ForgotPassword";
import VerifyOTP from "./pages/login/VerifyOtp";

//Home
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ServiceList from "./pages/ServiceList.jsx";
import ServiceLayout from "./pages/ServiceLayout.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";

//Forms 
import CreateService from './pages/CreateService.jsx';
import UpdateService from './pages/UpdateService.jsx';


//Profile
import Newprofile from "./pages/profile/Newprofile.jsx";
import Profileview from "./pages/profile/Profileview.jsx";
import Profileedit from "./pages/profile/Profileedit.jsx";


//Preview
import FormPrev from "./pages/FormPrev.jsx";
import TicketPrev from "./pages/TicketPrev.jsx";

//Images
import QrGuyImage from "./assets/images/QrGuy.jpg";
import SochRahaHaiImage from "./assets/images/SochRahaHai.png";

//Visitors
import StepForTicket from './pages/StepForTicket';
import CreateVisitorForm from './forms/CreateVisitorForm.jsx';
import UpdateForm from "./pages/UpdateForm.jsx";
import ServiceVisitorsData from "./pages/ServiceVisitorsData.jsx";


//validator
import ValidatorList from "./pages/ValidatorList";
import { AddValidatorForService } from "./components/services-new/AddValidatorForService.jsx";




// import VisitorForm from "./forms/VisitorForm/VistTheForm.jsx";
import VisitorForm from './forms/newFormBuilder/VisitorForm.jsx';
import AttendanceSheet from './components/services-new/AttendanceSheet.jsx';
import TicketForm from './forms/newFormBuilder/TicketForm.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/create-account",
    element: <SignupPage />,
  },  
  // {
  //   path: "/visitor",
  //   element: <VisitorForm />,
  // },
  { path: "build-form", element: <CreateVisitorForm />},
  {
    path:"/attendance",
    element: <AttendanceSheet/>
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  { path: "/home", element: (<Auth><Home /></Auth>),
    children: [
      { path: "", element: <Dashboard />,},
      { path: "profile", element: (   <Auth>     <Newprofile />   </Auth> ),
        children: [
          {  path: "",  element: <Profileview />,},
          {  path: "edit",  element: <Profileedit />,},
        ],
      },
      {
        path: "services",
        element: <ServiceLayout />,
        children: [
          { path: "", element: <ServiceList />},
          {  path: "add-service",  element: <CreateService />,},
          {  path: ":serviceId",  element: <ServiceLayout />,
             children: [
              { path: "", element: <ServiceDetails />},
              { path: "update", element: <UpdateService />},
              { path: "build-form", element: <CreateVisitorForm />},
              { path: "update-form", element: <UpdateForm/>},
              { path: "form-prev", element: <FormPrev />},
              { path: "ticket-prev", element: <TicketPrev />},
              { path: "visitors",element: <ServiceVisitorsData/>},
              { path: "validators",element: <ValidatorList />},
              { path: "add-validator",element: <AddValidatorForService />},
            ],
          },
        ],
      },
    ],
  },
  
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-otp-signup",
    element: <VerifyOTP imageSrc={QrGuyImage} />,
  },
  {
    path: "/verify-otp-forgot-password",
    element: <VerifyOTP imageSrc={SochRahaHaiImage} />,
  },
  {
    path: "/form/:formId",
    element: <TicketForm />,
  },

  // {
  //   path: "/form/:formId",
  //   element: <StepForTicket />,
  // },

]);
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
