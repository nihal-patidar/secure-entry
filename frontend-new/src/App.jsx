
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import LandingPage from './Pages/LandingPage';
import NotFound from './Pages/NotFound';
import RegistrationPage from './Pages/RegistrationPage';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Auth from './Features/Auth/Auth.jsx';
// import ServiceWorkSpace from './pages/ServiceWorkspace';
// import ValidatorWorkSpace from './pages/ValidatorWorkSpace';
import ServiceVisitors from './Features/Services/ServiceVisitors.jsx';
// import CreateValidatorForm from './forms/ValidatorForm';
import { CreateService } from './Features/Services/AddService.jsx';
// import VisitorFormCreate from './forms/VisitorForm';
import { UpdateServiceForm } from './Features/Services/UpdateService.jsx';
// import Profile from './pages/Profile'
import StepForTicket from './Features/Visitors/StepForTicket.jsx';
import CreateVisitorForm from './Features/Visitors/Form-builder/CreateVisitorForm.jsx';

// >>>>>>> piyush

import NewLoginPage from "./Features/Auth/LoginPage";
import ForgotPassword from "./Features/Auth/ForgotPassword";
import SignupPage from "./Features/Auth/SignUp";
import VerifyOTP from "./Features/Auth/VerifyOtp";
import QrGuyImage from "../public/Assets/images/QrGuy.jpg";
import SochRahaHaiImage from "../public/Assets/images/SochRahaHai.png";

// <<<<<<< HEAD
// import ServiceWorkSpace from "./pages/ServiceWorkspace";
import FormPrev from "./Features/Forms/FormPrev.jsx";
import TicketPrev from "./Features/Visitors/TicketPrev.jsx"
import ValidatorWorkSpace from "./Features/Validators/ValidatorWorkSpace";
// import ServiceVisitors from "./pages/ServiceVisitors";
// import CreateValidatorForm from "./forms/AddValidator.jsx";
// import { CreateService } from "./forms/AddService";
// import VisitorFormCreate from "./forms/BuildForm.jsx";
// import  UpdateServiceForm  from "./pages/UpdateService";
import ValidatorList from "./Features/Validators/ValidatorList";
// import AddValidator from "./forms/AddValidator.jsx";
// import StepForTicket from "./pages/StepForTicket";
import Newprofile from "./Features/profile/Newprofile.jsx";
import Profileview from "./Features/profile/Profileview.jsx";
import Profileedit from "./Features/profile/Profileedit.jsx";
import ServiceList from "./Features/Services/ServiceList.jsx";
import ServiceLayout from "./Features/Services/ServiceLayout.jsx";
import ServiceDetails from "./Features/Services/ServiceDetails.jsx";
// import BuildForm from "./pages/BuildForm.jsx";
import UpdateForm from "./Features/Forms/UpdateForm.jsx";
import ServiceVisitorsData from "./Features/Services/ServiceVisitorsData.jsx";
// import CreateService from "./pages/CreateService.jsx";
import { AddValidatorForService } from "./Features/Services/AddValidatorForService.jsx";
// =======
// import ServiceWorkSpace from "./pages/ServiceWorkspace";
// import ValidatorWorkSpace from "./pages/ValidatorWorkSpace";
// import ServiceVisitors from "./pages/ServiceVisitors";
// import CreateValidatorForm from "./forms/ValidatorForm";
// import { CreateService } from "./forms/AddService";
// import VisitorFormCreate from "./forms/VisitorForm";
// import { UpdateServiceForm } from "./forms/UpdateService";
// import Profile from "./pages/Profile";
// import StepForTicket from "./pages/StepForTicket";
// >>>>>>> piyush

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
                    { path: "", element: <ServiceList />},
                    {
                        path: "create",
                        element: <CreateService />,
                    },
                    {
                        path: ":serviceId",
                        element: <ServiceLayout />, // optional if you want a layout for serviceId children
                        children: [
                            { path: "", element: <ServiceDetails />},
                            { path: "update", element: <UpdateServiceForm />},
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
            // {
            //   path: "create-visitor-form",
            //   element: <VisitorFormCreate />,
            // },
            {
                path: "update-service-data",
                element: <UpdateServiceForm />,
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
