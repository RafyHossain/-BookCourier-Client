import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxios from "../../hooks/useAxios"; // Public Axios
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaShoppingCart, FaUser, FaStar, FaHeart, FaRegStar, FaBookOpen, FaTag } from "react-icons/fa";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxios();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [ordered, setOrdered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  
  useEffect(() => {
    axiosPublic.get(`/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error("Failed to fetch book details", err));
  }, [id, axiosPublic]);

  
  const loadReviews = () => {
    axiosPublic.get(`/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error("Failed to fetch reviews", err));
  };

  useEffect(() => {
    loadReviews();
    
  }, [id]);

  
  useEffect(() => {
    if (!user) return; 

    axiosSecure.get(`/orders/check/${id}`)
      .then(res => setOrdered(res.data?.ordered || false))
      .catch(() => setOrdered(false));

    axiosSecure.get("/wishlist/my")
      .then(res => {
        const exists = res.data.find(item => item.bookId === id || item._id === id);
        setWishlisted(!!exists);
      })
      .catch(() => setWishlisted(false));

  }, [id, user, axiosSecure]);


  const handleWishlist = async () => {
    if (!user) return Swal.fire({ icon: "info", title: "Login Required", text: "Please login to add to wishlist." });

    try {
      await axiosSecure.post("/wishlist", { bookId: id });
      setWishlisted(true);
      Swal.fire({ icon: "success", title: "Added to Wishlist", showConfirmButton: false, timer: 1500 });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.message || "Something went wrong" });
    }
  };

  const handleOrder = async () => {
    if (!phone || !address) return Swal.fire({ icon: "warning", title: "Missing Info", text: "Please fill phone and address." });

    setLoadingModal(true);
    try {
      await axiosSecure.post("/orders", { bookId: id, phone, address });
      setOrdered(true);
      setShowModal(false);
      Swal.fire({ icon: "success", title: "Order Confirmed!", text: "Your book is on the way.", showConfirmButton: false, timer: 2000 });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Order Failed", text: error.response?.data?.message || "Please try again." });
    } finally {
      setLoadingModal(false);
    }
  };

  const handleReview = async () => {
    if (!comment) return Swal.fire({ icon: "warning", title: "Empty Review", text: "Please write a comment." });

    try {
      await axiosSecure.post("/reviews", { bookId: id, rating, comment });
      Swal.fire({ icon: "success", title: "Review Submitted!", showConfirmButton: false, timer: 1500 });
      setComment("");
      setRating(5);
      loadReviews();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Review Failed", text: error.response?.data?.message || "Please try again." });
    }
  };

  if (!book) return <Loading />;

  
  const galleryImages = book.images && book.images.length > 0 ? book.images : [book.image, book.image];

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

       
        <div className="grid lg:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
          
          
          <div className="rounded-2xl overflow-hidden bg-slate-100 h-[400px] md:h-[500px]">
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              navigation
              loop={galleryImages.length > 1}
              className="h-full w-full"
            >
              {galleryImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`${book.title} slide ${index + 1}`} className="w-full h-full object-contain p-4" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Basic Info & Actions */}
          <div className="flex flex-col justify-center space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-700 font-bold text-sm w-max">
              {book.category || "General"}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">{book.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-500">
              <p className="flex items-center gap-2 font-medium text-lg"><FaUser className="text-red-500" /> {book.author}</p>
              <div className="flex items-center gap-1 text-yellow-500 text-lg">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> <span className="text-slate-500 text-sm ml-1">({reviews.length} Reviews)</span>
              </div>
            </div>

            <p className="text-4xl text-slate-900 font-black pt-4 border-t border-slate-100 flex items-center gap-1">
              <span className="text-red-600 text-3xl">৳</span>{book.price}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                disabled={ordered}
                onClick={() => user ? setShowModal(true) : Swal.fire("Login required", "Please login to place an order.", "info")}
                className="flex-1 py-4 rounded-xl font-bold text-white btn-primary hover:bg-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
              >
                <FaShoppingCart /> {ordered ? "Already Ordered" : "Order Now"}
              </button>
              <button
                onClick={handleWishlist}
                disabled={wishlisted}
                className={`px-6 py-4 rounded-xl font-bold border-2 flex items-center justify-center gap-2 transition-all ${
                  wishlisted ? "border-slate-300 text-slate-400 cursor-not-allowed" : "border-slate-200 text-slate-700 hover:border-red-600 hover:text-red-600"
                }`}
              >
                <FaHeart className={wishlisted ? "text-slate-400" : "text-red-500"} />
                {wishlisted ? "Saved" : "Wishlist"}
              </button>
            </div>
          </div>
        </div>

        
        <div className="grid md:grid-cols-3 gap-8">
          
        
          <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FaBookOpen className="text-red-600" /> Description & Overview
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {book.description || "No detailed description available for this book at the moment. Please check the specifications for more info."}
            </p>
          </div>

          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FaTag className="text-red-600" /> Specifications
            </h2>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Category</span>
                <span className="font-bold text-slate-800">{book.category || "N/A"}</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Author</span>
                <span className="font-bold text-slate-800">{book.author || "N/A"}</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Stock</span>
                <span className="font-bold text-green-600">Available</span>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Customer Reviews</h2>

          {reviews.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500">No reviews yet. Be the first to review this book!</p>
            </div>
          ) : (
            <div className="space-y-6 mb-10">
              {reviews.map(r => (
                <div key={r._id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-slate-800 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500"><FaUser /></div>
                      {r.userName || "User"}
                    </div>
                    <div className="flex text-yellow-500 text-sm">
                      {[...Array(5)].map((_, i) => i < r.rating ? <FaStar key={i} /> : <FaRegStar key={i} />)}
                    </div>
                  </div>
                  <p className="text-slate-600">{r.comment}</p>
                </div>
              ))}
            </div>
          )}

         
          {ordered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 p-6 md:p-8 rounded-2xl border border-red-100 mt-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Leave a Review</h3>
              <div className="space-y-4 max-w-2xl">
                <div className="form-control">
                  <label className="label font-bold text-slate-700">Rating</label>
                  <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500">
                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars - {n === 5 ? 'Excellent' : n === 1 ? 'Poor' : 'Good'}</option>)}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label font-bold text-slate-700">Your Review</label>
                  <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Share your experience with this book..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"></textarea>
                </div>
                <button onClick={handleReview} className="px-8 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-all">
                  Submit Review
                </button>
              </div>
            </motion.div>
          )}
        </div>

        
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl relative">
              <h3 className="text-2xl font-black text-slate-900 mb-6">Confirm Order</h3>
              
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label text-sm font-bold text-slate-700">Name</label>
                  <input value={user?.displayName || ""} readOnly className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 cursor-not-allowed" />
                </div>
                
                <div className="form-control">
                  <label className="label text-sm font-bold text-slate-700">Delivery Phone</label>
                  <input placeholder="e.g. 01700000000" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>

                <div className="form-control">
                  <label className="label text-sm font-bold text-slate-700">Delivery Address</label>
                  <textarea placeholder="House, Road, Area, City" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none h-24" />
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all">
                    Cancel
                  </button>
                  <button onClick={handleOrder} disabled={loadingModal} className="flex-1 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                    {loadingModal ? <span className="loading loading-spinner loading-sm"></span> : "Confirm"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookDetails;