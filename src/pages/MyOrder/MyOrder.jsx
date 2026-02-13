import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axiosSecure.get("/orders/my-orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    await axiosSecure.patch(`/orders/cancel/${id}`);
    fetchOrders();
  };

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  return (
    <div>
      <h2 className="text-2xl text-primary font-bold mb-6">My Orders</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Book</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.bookTitle}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>{order.paymentStatus}</td>

             <td className="space-x-2">

  {order.status === "pending" && order.paymentStatus === "unpaid" && (
    <>
      <button
        onClick={() => handleCancel(order._id)}
        className="btn btn-error btn-sm"
      >
        Cancel
      </button>

      <button
        onClick={() => handlePay(order._id)}
        className="btn btn-primary btn-sm"
      >
        Pay Now
      </button>
    </>
  )}

  {order.status === "pending" && order.paymentStatus === "paid" && (
    <span className="badge badge-success">Paid</span>
  )}

  {order.status === "cancelled" && (
    <span className="badge badge-error">Cancelled</span>
  )}

</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrder;
