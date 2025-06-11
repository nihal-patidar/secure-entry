
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import ServiceWorkSpace from './pages/ServiceWorkspace';
import ValidatorWorkSpace from './pages/ValidatorWorkSpace';
import ServiceVisitors from './pages/ServiceVisitors';
import CreateValidatorForm from './forms/ValidatorForm';
import { CreateService } from './forms/AddService';
import VisitorFormCreate from './forms/VisitorForm';
import { UpdateServiceForm } from './forms/UpdateService';
import Profile from './pages/Profile'
import StepForTicket from './pages/StepForTicket';
import CreateVisitorForm from './forms/CreateVisitorForm.jsx';


import NewLoginPage from './pages/login/LoginPage';
import ForgotPassword from './pages/login/ForgotPassword';
import SignupPage from './pages/login/SignUp';
import VerifyOTP from './pages/login/VerifyOtp';
import QrGuyImage from './assets/images/QrGuy.jpg';
import SochRahaHaiImage from './assets/images/SochRahaHai.png';


// import ServiceWorkSpace from "./pages/ServiceWorkspace";
// import ValidatorWorkSpace from "./pages/ValidatorWorkSpace";
// import ServiceVisitors from "./pages/ServiceVisitors";
// import CreateValidatorForm from "./forms/ValidatorForm";
// import { CreateService } from "./forms/AddService";
// import VisitorFormCreate from "./forms/VisitorForm";
// import { UpdateServiceForm } from "./forms/UpdateService";
// import Profile from "./pages/Profile";
// import StepForTicket from "./pages/StepForTicket";

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
        element: <Profile />,
      },
      {
        path: "services",
        element: <ServiceWorkSpace />,
      },
      {
        path: "validators",
        element: <ValidatorWorkSpace />,
      },
      {
        path: "visitors",
        element: <ServiceVisitors />,
      },
      {
        path: "create-validator-form",
        element: <CreateValidatorForm />,
      },
      {
        path: "create-service",
        element: <CreateService />,
      },
      {
        path: "create-visitor-form",
        element: <VisitorFormCreate />,
      },
      {
        path: "update-service-data",
        element: <UpdateServiceForm />,
      },
    ],
  },
  {
    path:"/login",
    element:<NewLoginPage/>
  },
  {
    path : "/forgot-password",
    element: <ForgotPassword/>
  },
  {
    path : "/create-account",
    element : <SignupPage/>
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
  {
    path: "/just",
    element: <CreateVisitorForm />,
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
