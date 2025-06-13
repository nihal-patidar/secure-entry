import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";
import { toast } from "react-toastify";



export const LoginHandle = async ({
  data,
  setShowLoading,
  setUserData,
  navigate
}) => {
  //console.log("i am logining working");
  setShowLoading((prev) => !prev);
  await apiConnector("POST", authEndpoints.LOGIN, {
    email: data.email,
    password: data.password
  }).then((response) => {
    //console.log("data", response.data);
    setUserData(response.data);
    navigate("/home");
    localStorage.setItem("userData", response.data.token);
    // setSessionItemWithExpiry("userData",response.data.token,60*60*1000);
    apiConnector('GET', authEndpoints.PROFILE, null, {
      Authorization: `Bearer ${response.data.token}`
    }).then((response) => {
      setUserData(response.data.userData);
      //console.log("userdata: ",response.data.userData);
      toast.success("User Data Fetched");
    }).catch((err) => {
      navigate('/login');
    })
    toast.success("Login Successfully!");
  }).catch((error) => {
    setShowLoading((prev) => !prev);
    //console.log("error data", error.response.data);
    //   toast.warning(error.response.data.msg);
  })
}
export const signupHandle = async ({
  data,
  setShowLoading,
  setUserData,
  navigate
}) => {
  setShowLoading((prev) => !prev)
  // await apiConnector("POST", authEndpoints.REGISTER, {
  //   name: data.name,
  //   email: data.email,
  //   password: data.password
  // }).then((response) => {
  //   setUserData(response.data);
  //   navigate("/login");
  //   toast.success("Registration successfull")
  // }).catch((error) => {
  //   setShowLoading((prev) => !prev)
  //   toast.error("Registration failed")
  //   navigate("/register")
  // })
  try {
    const response = await apiConnector("POST", authEndpoints.REGISTER, {
      name: data.name,
      email: data.email,
      password: data.password
    })
    if (response?.data) {
      setUserData(response.data);
      toast.success("Registration successful");
      navigate("/login");
    } else {
      toast.error("Registration failed. No data received.");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Registration failed. Please try again."
    );
    navigate("/register");

  } finally {
    setShowLoading(false)
  }
}

export const forgotPasswordHandle = async ({
  email,
  setShowLoading,
  navigate,
}) => {
  setShowLoading(true);
  try {
    const response = await apiConnector("POST", authEndpoints.FORGET_PASSWORD, {
      email,
    });

    if (response?.data?.success) {
      toast.success("Reset link sent to your email");
      navigate("/verify-otp-signup");
    } else {
      toast.error("Something went wrong. Try again.");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to send reset link");
  } finally {
    setShowLoading(false);
  }
};

export const resetPasswordHandle = async ({
  token,
  newPassword,
  setShowLoading,
  navigate,
}) => {
  setShowLoading(true);
  try {
    const response = await apiConnector("POST", `${authEndpoints.RESET_PASSWORD}/${token}`, {
      newPassword,
    });

    if (response?.data?.success) {
      toast.success("Password reset successfully");
      navigate("/login");
    } else {
      toast.error("Reset failed. Try again.");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Reset failed");
  } finally {
    setShowLoading(false);
  }
};

