import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  FaShoppingCart,
  FaUser,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [ordered, setOrdered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Fetch Book
  useEffect(() => {
    axiosSecure.get(`/books/${id}`)
      .then(res => setBook(res.data))
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  // Check Order
  useEffect(() => {
    if (!user) return;
    axiosSecure.get(`/orders/check/${id}`)
      .then(res => setOrdered(res.data));
  }, [id, user, axiosSecure]);

  // Body Scroll Lock
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const handlePlaceOrder = async () => {
    if (!phone || !address) {
      Swal.fire("Missing Info", "Fill all fields", "warning");
      return;
    }

    try {
      await axiosSecure.post("/orders", {
        bookId: book._id,
        phone,
        address,
        price: book.price,
        bookTitle: book.title
      });

      Swal.fire("Success", "Order Placed!", "success");
      setOrdered(true);
      setShowModal(false);
      setPhone("");
      setAddress("");
    } catch {
      Swal.fire("Error", "Order failed", "error");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-red-500"></span>
      </div>
    );

  if (!book)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Book Not Found
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white p-6">

      {/* ================= CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full grid md:grid-cols-2 overflow-hidden"
      >
        {/* Image Section */}
        <div className="bg-slate-50 flex items-center justify-center p-8">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={book.image}
            alt={book.title}
            className="rounded-2xl shadow-lg max-h-96 object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              {book.title}
            </h1>

            <div className="flex items-center gap-2 text-slate-500 mb-4">
              <FaUser /> {book.author}
            </div>

            <p className="text-slate-600 mb-6 leading-relaxed">
              {book.description || "A wonderful book to enrich your knowledge."}
            </p>

            <p className="text-3xl font-bold text-slate-900 mb-6">
              ৳{book.price}
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={ordered}
            className={`btn btn-primary py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 transition-all duration-200
              ${ordered
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg hover:scale-105 active:scale-95"
              }`}
          >
            {ordered ? "Already Ordered" : <>
              <FaShoppingCart /> Order Now
            </>}
          </button>
        </div>
      </motion.div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-center mb-6">
                Confirm Order
              </h2>

              <div className="space-y-4">

                <input
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full bg-slate-100"
                />

                <input
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-slate-100"
                />

                <div className="relative">
                  <FaPhone className="absolute left-3 top-4 text-slate-400" />
                  <input
                    placeholder="Phone Number"
                    className="input input-bordered w-full pl-10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="relative">
                  
                  <textarea
                    placeholder="Delivery Address"
                    className="input input-bordered w-full pl-10 h-24 resize-none"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn btn-outline flex-1"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    className="btn bg-red-600 text-white flex-1"
                  >
                    Confirm
                  </button>
                </div>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BookDetails;
