import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import RegistrationPage from "./pages/RegistrationPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

import NewLoginPage from "./pages/login/LoginPage";
import ForgotPassword from "./pages/login/ForgotPassword";
import SignupPage from "./pages/login/SignUp";
import VerifyOTP from "./pages/login/VerifyOtp";
import QrGuyImage from "./assets/images/QrGuy.jpg";
import SochRahaHaiImage from "./assets/images/SochRahaHai.png";
import Ticket from "./utils/Ticket.jsx";
import ServiceWorkSpace from "./pages/ServiceWorkspace";
import FormPrev from "./pages/FormPrev.jsx";
import TicketPrev from "./pages/TicketPrev.jsx";
import ValidatorWorkSpace from "./pages/ValidatorWorkSpace";
import ServiceVisitors from "./pages/ServiceVisitors";
import CreateValidatorForm from "./forms/AddValidator.jsx";
import { CreateService } from "./forms/AddService";
import VisitorFormCreate from "./forms/BuildForm.jsx";
import { UpdateServiceForm } from "./forms/UpdateService";
import ValidatorList from "./pages/ValidatorList";
import AddValidator from "./forms/AddValidator.jsx";
import StepForTicket from "./pages/StepForTicket";
import Newprofile from "./pages/profile/Newprofile.jsx";
import Profileview from "./pages/profile/Profileview.jsx";
import Profileedit from "./pages/profile/Profileedit.jsx";
import ServiceList from "./pages/ServiceList.jsx";
import ServiceLayout from "./pages/ServiceLayout.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import BuildForm from "./forms/BuildForm.jsx";
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
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path: "/home",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: (
          <Auth>
            <Newprofile />
          </Auth>
        ),
        children: [
          {
            path: "",
            element: <Profileview />,
          },
          {
            path: "edit",
            element: <Profileedit />,
          },
        ],
      },
      {
        path: "services",
        element: <ServiceLayout />,
        children: [
          { path: "", element: <ServiceList /> },
          {
            path: "create",
            element: <CreateService />,
          },
          {
            path: ":serviceId",
            element: <ServiceLayout />, // optional if you want a layout for serviceId children
            children: [
              { path: "", element: <ServiceDetails /> },
              { path: "update", element: <UpdateServiceForm /> },
              { path: "build-form", element: <BuildForm /> },
              { path: "form-prev", element: <FormPrev /> },
              { path: "ticket-prev", element: <TicketPrev /> },
              { path: "visitors", element: <ServiceVisitors /> },
              { path: "validators", element: <ValidatorList /> },
              { path: "add-validator", element: <AddValidator /> },
            ],
          },
        ],
      },
      {
        path: "validators",
        element: <ValidatorWorkSpace />,
      },
      {
        path: "visitors",
        element: <ServiceVisitors />,
      },
      // {
      // path: "create-validator-form",
      // element: <CreateValidatorForm />,
      // },
      // {
      //   path: "create-service",
      //   element: <CreateService />,
      // },
      {
        path: "create-visitor-form",
        element: <VisitorFormCreate />,
      },
      {
        path: "update-service-data",
        element: <UpdateServiceForm />,
      },
      {
        path: "ticket",
        element: <Ticket />,
      },
    ],
  },
  {
    path: "/login",
    element: <NewLoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/create-account",
    element: <SignupPage />,
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
    element: <StepForTicket />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
