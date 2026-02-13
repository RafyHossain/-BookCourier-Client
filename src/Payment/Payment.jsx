import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";


const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handlePayment = async () => {
    await axiosSecure.patch(`/orders/pay/${id}`);
    navigate("/dashboard/my-orders");
  };

  return (
    <div className="flex justify-center items-center h-96">
      <div className="card p-10 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Complete Payment</h2>

        <button
          onClick={handlePayment}
          className="btn btn-primary"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
