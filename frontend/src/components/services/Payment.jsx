import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import api from "../../../axiosConfig";
import { devLog } from "../../../devLog";

export default function Payment() {
  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback(async () => {
    // create the request to the backend to create order
    let bodyData={
        amount:10,
        name:"Nihal Patidar"
    }
    let order= await api.post("/ticket/payment",bodyData);
    //devLog.log(order);
    const options = {
      key: order.data.key_id,
      amount: order.data.amount,
      currency: "INR",
      name: bodyData.name,
      description: "Test Transaction",
      image: "",
      order_id: order.data.order_id,
      handler: (res) => {
        //devLog.log(res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <button onClick={handlePayment}>Click</button>
    </div>
  );
}