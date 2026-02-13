import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Invoices = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axiosSecure.get("/orders/my-orders");

        const paidOrders = res.data.filter(
          order => order.paymentStatus === "paid"
        );

        setOrders(paidOrders);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-8">
        Payment Invoices
      </h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          No payment history found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-xl">

          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Payment ID</th>
                <th>Book</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(order => (
                <tr key={order._id}>

                  <td className="font-mono text-sm">
                    {order.paymentId}
                  </td>

                  <td className="font-semibold">
                    {order.bookTitle}
                  </td>

                  <td className="text-primary font-bold">
                    ৳{order.price}
                  </td>

                  <td>
                    {order.paidAt
                      ? new Date(order.paidAt).toLocaleDateString()
                      : "-"
                    }
                  </td>

                  <td>
                    <span className="badge badge-success">
                      Paid
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

    </div>
  );
};

export default Invoices;
