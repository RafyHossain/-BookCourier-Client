import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const LibrarianRequest = () => {
  const axiosSecure = useAxiosSecure();

  const handleRequest = async () => {
    try {
      await axiosSecure.post("/librarian-requests");

      Swal.fire({
        icon: "success",
        title: "Request Sent",
        text: "Admin will review your request",
      });

    } catch (error) {
      Swal.fire("Error", error.response?.data?.message, "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl text-center">
      <h2 className="text-3xl font-bold mb-6">
        Become a Librarian
      </h2>

      <p className="mb-6 text-gray-500">
        Send request to admin to become a librarian.
      </p>

      <button
        onClick={handleRequest}
        className="btn btn-primary"
      >
        Send Request
      </button>
    </div>
  );
};

export default LibrarianRequest;
