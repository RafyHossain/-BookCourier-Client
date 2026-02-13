import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import Loading from "../../components/Loading";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/books?search=${search}&sort=${sort}`
        );
        setBooks(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search, sort, axiosSecure]);

  const handleOrder = async (bookId) => {
    if (!user) {
      Swal.fire("Please login first");
      return;
    }

    try {
      await axiosSecure.post("/orders", { bookId });

      Swal.fire({
        icon: "success",
        title: "Order Placed Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      Swal.fire("Error", "Order failed", "error");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Explore{" "}
            <span className="text-transparent bg-clip-text text-primary">
              All Books
            </span>
          </h2>
          <p className="text-slate-500 mt-4">
            Browse through our complete collection
          </p>
        </motion.div>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">

          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-4 text-slate-400" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
            />
          </div>

          <select
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="desc">Price High to Low</option>
            <option value="asc">Price Low to High</option>
          </select>

        </div>

        {/* Loading */}
        {loading && (
          <Loading></Loading>
        )}

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading &&
            books.map((book, index) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-500"
              >

                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col">

                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
                    {book.title}
                  </h3>

                  <p className="text-sm text-slate-500 mb-3">
                    By {book.author}
                  </p>

                  <div className="flex items-center justify-between mt-auto">

                    <span className="text-2xl font-black text-slate-900">
                      <span className="text-red-600 text-lg">৳ </span>
                      {book.price}
                    </span>

                    <Link
                      to={`/books/${book._id}`}
                      className="px-4 py-2 rounded-xl btn-primary text-slate-700 font-semibold hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Details
                    </Link>

                  </div>

                </div>

              </motion.div>
            ))}
        </div>

        {/* No Books */}
        {!loading && books.length === 0 && (
          <div className="text-center mt-20 text-slate-500">
            No books found.
          </div>
        )}

      </div>
    </section>
  );
};

export default AllBooks;
