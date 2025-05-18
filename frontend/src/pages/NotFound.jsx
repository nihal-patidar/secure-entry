import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-gray-800 md:text-9xl">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-600 md:text-2xl">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-gray-500">
          You may have mistyped the address or the page may have moved.
        </p>
        <Button onClick={handleBack} className="mt-5 bg-blue-500">Back</Button>
      </div>
    </div>
  );
}

export default NotFound;
