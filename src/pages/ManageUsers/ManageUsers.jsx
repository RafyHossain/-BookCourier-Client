import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axiosSecure.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (email, role) => {
    const confirm = await Swal.fire({
      title: `Make this user ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.patch(`/users/${email}/role`, { role });

    Swal.fire({
      icon: "success",
      title: "Role Updated",
      timer: 1200,
      showConfirmButton: false,
    });

    fetchUsers();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-indigo-600">
        Manage Users
      </h2>

      <div className="bg-white rounded-3xl shadow-xl p-8 overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>

                <td>{user.email}</td>

                <td>
                  <span className="badge badge-outline">
                    {user.role}
                  </span>
                </td>

                <td className="text-center space-x-2">

                  {/* Make Admin */}
                  {user.role !== "admin" && (
                    <button
                      onClick={() => changeRole(user.email, "admin")}
                      className="btn btn-sm bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      Make Admin
                    </button>
                  )}

                  {/* Make Librarian */}
                  {user.role !== "librarian" && (
                    <button
                      onClick={() => changeRole(user.email, "librarian")}
                      className="btn btn-sm bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    >
                      Make Librarian
                    </button>
                  )}

                  {/* MAKE USER */}
                  {user.role !== "user" && (
                    <button
                      onClick={() => changeRole(user.email, "user")}
                      className="btn btn-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Make User
                    </button>
                  )}

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
