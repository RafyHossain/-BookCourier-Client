import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const MyWishlist = () => {
  const axiosSecure = useAxiosSecure();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/wishlist/my");
      setBooks(res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (id) => {
    await axiosSecure.delete(`/wishlist/${id}`);
    Swal.fire({
      icon: "success",
      title: "Removed from Wishlist",
      timer: 1200,
      showConfirmButton: false,
    });
    loadWishlist();
  };

  return (
    <div className="p-8">

      <h2 className="text-3xl font-bold text-[#7f1d1d] mb-8">
        My Wishlist
      </h2>

      {/* ===== LOADING STATE ===== */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-red-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#b91c1c] animate-spin"></div>
          </div>

          <p className="mt-6 text-slate-500 font-medium">
            Loading your wishlist...
          </p>
        </div>
      )}

      {/* ===== EMPTY STATE ===== */}
      {!loading && books.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl shadow">
          <p className="text-slate-400 text-lg">
            No wishlist items yet.
          </p>
        </div>
      )}

      {/* ===== BOOK GRID ===== */}
      {!loading && books.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <img
                src={book.image}
                alt=""
                className="h-48 w-full object-cover rounded-xl"
              />

              <h3 className="font-bold mt-4 text-lg text-slate-800">
                {book.title}
              </h3>

              <p className="text-red-600 font-semibold mt-1">
                ৳{book.price}
              </p>

              <button
                onClick={() => handleRemove(book._id)}
                className="mt-4 w-full py-2 rounded-xl text-white bg-[#b91c1c] hover:bg-[#991b1b] transition font-semibold"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MyWishlist;
