import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const LibrarianRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await axiosSecure.get("/librarian-requests");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    await axiosSecure.patch(`/librarian-requests/${id}/approve`);

    Swal.fire("Approved successfully");
    fetchRequests();
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this request?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.delete(`/librarian-requests/${id}`);

    Swal.fire("Deleted successfully");
    fetchRequests();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Librarian Requests
      </h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.email}</td>
              <td>{req.status}</td>
              <td className="space-x-2">

                {req.status === "pending" && (
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
                )}

                <button
                  onClick={() => handleDelete(req._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibrarianRequests;
