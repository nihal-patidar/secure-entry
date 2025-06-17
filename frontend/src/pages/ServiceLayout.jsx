// ValidatorWorkSpace.jsx
import { Outlet } from "react-router-dom";

const ServiceLayout = () => {
  return (
    <div>
      <Outlet /> {/* This will render sub-routes */}
    </div>
  );
};
export default ServiceLayout;
