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
      await apiConnector("POST", authEndpoints.LOGIN ,  {
          email: data.email,
          password: data.password
      }).then((response) => {
          //console.log("data", response.data);
          setUserData(response.data);
          navigate("/home");
          localStorage.setItem("userData", response.data.token);
        // setSessionItemWithExpiry("userData",response.data.token,60*60*1000);
          apiConnector('GET',authEndpoints.PROFILE,null,{
                  Authorization:`Bearer ${response.data.token}`
          }).then((response)=>{
              setUserData(response.data.userData);
              //console.log("userdata: ",response.data.userData);
              toast.success("User Data Fetched");
          }).catch((err)=>{
              navigate('/login');
          })
          toast.success("Login Successfully!");
      }).catch((error) => {
          setShowLoading((prev) => !prev);
          //console.log("error data", error.response.data);
        //   toast.warning(error.response.data.msg);
      })
  }