import React, { useState } from "react";
import image from "../../assets/images/QrGuy.jpg";
import { Link, useNavigate } from "react-router-dom";
import { signupHandle } from "../../api/operations/authAPI";
import { Eye, EyeOff } from "lucide-react";  // Import eye icons

const FormField = ({
                     label,
                     id,
                     type,
                     value,
                     onChange,
                     error,
                     autoComplete,
                     showToggle,           // new: boolean, whether to show eye toggle
                     onToggleShow,         // new: toggle handler function
                     isVisible,            // new: boolean, to switch icon & input type
                   }) => (
    <div>
      <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
            required
            type={isVisible ? "text" : type} // toggle between text/password
            id={id}
            name={id}
            placeholder={label}
            autoComplete={autoComplete}
            aria-describedby={`${id}-error`}
            value={value}
            onChange={onChange}
            className={`mt-1 text-black block w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
          ${showToggle ? "pr-10" : ""}`} // padding right if eye toggle shown
        />
        {showToggle && (
            <button
                type="button"
                onClick={onToggleShow}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
                aria-label={isVisible ? `Hide ${label}` : `Show ${label}`}
                style={{ padding: 0, lineHeight: 1 }}
            >
              {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        )}
      </div>
      {error && (
          <p id={`${id}-error`} className="text-red-500 text-sm mt-1">
            {error}
          </p>
      )}
    </div>
);

function SignupPage() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [userData, setUserData] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  // States to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setEmailError("");
    setNameError("");

    let hasError = false;

    if (!data.name.trim()) {
      setNameError("Name cannot be empty.");
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (data.password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      hasError = true;
    } else if (data.password.length < 8) {
      setPasswordError("Password must contain at least 8 characters.");
      hasError = true;
    }

    if (hasError) return;

    await signupHandle({ data, setShowLoading, setUserData, navigate });
    // navigate("/verify-otp-signup");
  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
          <div className="md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
            <img
                src={image}
                alt="Illustration for signup"
                className="max-w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center md:text-left">
              Sign up
            </h2>
            <p className="text-gray-600 mb-8 text-center md:text-left">
              We'll send you an OTP on your email
            </p>
            <form className="space-y-6" onSubmit={handleSendOtp}>
              <FormField
                  label="Name"
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={handleChange}
                  error={nameError}
                  autoComplete="name"
              />
              <FormField
                  label="Email"
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  error={emailError}
                  autoComplete="email"
              />
              <FormField
                  label="Password"
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  error={null}
                  autoComplete="new-password"
                  showToggle={true}
                  isVisible={showPassword}
                  onToggleShow={() => setShowPassword((prev) => !prev)}
              />
              <FormField
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={passwordError}
                  autoComplete="new-password"
                  showToggle={true}
                  isVisible={showConfirmPassword}
                  onToggleShow={() => setShowConfirmPassword((prev) => !prev)}
              />
              <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Send OTP
              </button>
            </form>
            <p className="text-sm font-medium mt-8 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                  to="/login"
                  className="text-[#7850FA] hover:text-[#5031a3] font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
}

export default SignupPage;
