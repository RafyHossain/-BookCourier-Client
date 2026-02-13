import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LibrarianOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axiosSecure.get(
      "/orders/librarian-orders"
    );
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = async (id, status) => {
    await axiosSecure.patch(
      `/orders/librarian-orders/${id}`,
      { status }
    );
    fetchOrders();
  };

  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
        Book Orders
      </h2>

      <div className="overflow-x-auto bg-white p-6 rounded-2xl shadow">

        <table className="table w-full">

          <thead>
            <tr>
              <th>Book</th>
              <th>User</th>
              <th>Status</th>
              <th>Change</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>

                <td>{order.bookTitle}</td>
                <td>{order.userEmail}</td>

                <td>
                  <span className="badge badge-info">
                    {order.status}
                  </span>
                </td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      changeStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="select select-bordered"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default LibrarianOrders;
