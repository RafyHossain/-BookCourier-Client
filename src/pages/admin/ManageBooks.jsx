import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Loading from "../../components/Loading";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/books/admin");
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to load books", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  //  Filter Books
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  //  Toggle Publish
  const handleStatusToggle = async (book) => {
    const newStatus =
      book.status === "published" ? "unpublished" : "published";

    try {
      await axiosSecure.patch(`/books/admin/${book._id}`, {
        status: newStatus,
      });

      // Optimistic UI update
      setBooks((prev) =>
        prev.map((b) =>
          b._id === book._id ? { ...b, status: newStatus } : b
        )
      );

      Swal.fire({
        icon: "success",
        title: `Book ${newStatus}`,
        timer: 1000,
        showConfirmButton: false,
      });

    } catch {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  //  Delete Book
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this book?",
      text: "All related orders will also be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#dc2626",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/books/admin/${id}`);

      // Optimistic UI update
      setBooks((prev) => prev.filter((b) => b._id !== id));

      Swal.fire({
        icon: "success",
        title: "Book Deleted",
        timer: 1000,
        showConfirmButton: false,
      });

    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-4xl font-bold text-primary">
          Manage Books
        </h2>
        <p className="text-slate-500 mt-2">
          Total Books: {books.length}
        </p>
      </motion.div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by book title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200 p-6"
      >
        {loading ? (
          <Loading></Loading>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-20 text-slate-400 text-lg">
            No books found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="py-4">Book</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBooks.map((book) => (
                  <tr
                    key={book._id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="py-4 flex items-center gap-4">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-14 h-14 rounded-xl object-cover shadow-md"
                      />
                      <span className="font-semibold text-slate-800">
                        {book.title}
                      </span>
                    </td>

                    <td className="text-slate-600">
                      {book.author}
                    </td>

                    <td className="font-semibold text-indigo-700">
                      ৳{book.price}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          book.status === "published"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {book.status}
                      </span>
                    </td>

                    <td className="text-center space-x-2">

                      <button
                        onClick={() => handleStatusToggle(book)}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition ${
                          book.status === "published"
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        }`}
                      >
                        {book.status === "published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="px-3 py-1 text-xs font-medium rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </motion.div>

    </div>
  );
};

export default ManageBooks;
