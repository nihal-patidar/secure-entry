import { apiConnector } from "../apiconnector";
import { eventEndpoints } from "../apis";

export const getFormData = async ({ formId, setServiceData, setAmount, navigate }) => {
  try {
    const response = await apiConnector("GET", eventEndpoints.GET_FORM_DATA(formId));

    const formStructure = response.data.serviceData?.form_structure;

    if (!formStructure) {
      alert("First create the form.");
      navigate(-1);
      return;
    }

    setServiceData(response.data.serviceData);
    setAmount(response.data.serviceData?.ticket_price);
    // console.log("serviceData", response.data.serviceData);
  } catch (err) {
    toast.warning(err?.response?.data?.msg || "Something went wrong");
  }
};
