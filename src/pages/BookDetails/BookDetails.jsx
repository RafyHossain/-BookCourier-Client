import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaShoppingCart, FaUser, FaStar, FaHeart } from "react-icons/fa";
import Loading from "../../components/Loading";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
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

  // ================= FETCH BOOK =================
  useEffect(() => {
    axiosSecure.get(`/books/${id}`)
      .then(res => setBook(res.data));
  }, [id, axiosSecure]);

  // ================= CHECK ORDER =================
  useEffect(() => {
    if (!user) return;

    axiosSecure.get(`/orders/check/${id}`)
      .then(res => setOrdered(res.data?.ordered || false))
      .catch(() => setOrdered(false));

  }, [id, user, axiosSecure]);

  // ================= CHECK WISHLIST =================
  useEffect(() => {
    if (!user) return;

    axiosSecure.get("/wishlist/my")
      .then(res => {
        const exists = res.data.find(item => item._id === id);
        setWishlisted(!!exists);
      });
  }, [id, user, axiosSecure]);

  // ================= FETCH REVIEWS =================
  const loadReviews = () => {
    axiosSecure.get(`/reviews/${id}`)
      .then(res => setReviews(res.data));
  };

  useEffect(() => {
    loadReviews();
  }, [id]);

  // ================= ADD WISHLIST =================
  const handleWishlist = async () => {
    if (!user) return Swal.fire("Login required");

    try {
      await axiosSecure.post("/wishlist", { bookId: id });
      setWishlisted(true);
      Swal.fire("Added to Wishlist", "", "success");
    } catch (error) {
      Swal.fire(error.response?.data?.message || "Error");
    }
  };

  // ================= PLACE ORDER =================
  const handleOrder = async () => {
    if (!phone || !address) {
      return Swal.fire("Fill phone & address");
    }

    try {
      await axiosSecure.post("/orders", {
        bookId: id,
        phone,
        address
      });

      setOrdered(true);
      setShowModal(false);
      Swal.fire("Order placed!", "", "success");

    } catch (error) {
      Swal.fire(error.response?.data?.message || "Order failed");
    }
  };

  // ================= ADD REVIEW =================
  const handleReview = async () => {
    try {
      await axiosSecure.post("/reviews", {
        bookId: id,
        rating,
        comment
      });

      Swal.fire("Review added!", "", "success");
      setComment("");
      loadReviews();

    } catch (error) {
      Swal.fire(error.response?.data?.message || "Review failed");
    }
  };

  if (!book) return <Loading></Loading>;

  return (
    <div className="max-w-5xl mx-auto py-20 px-6 space-y-12">

      {/* BOOK INFO */}
      <div className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-lg">
        <img src={book.image} className="rounded-xl" alt="" />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="flex items-center gap-2 text-gray-500">
            <FaUser /> {book.author}
          </p>
          <p className="text-2xl text-red-600 font-bold">৳{book.price}</p>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            disabled={wishlisted}
            className="btn btn-outline btn-error w-full"
          >
            <FaHeart />
            {wishlisted ? "Already in Wishlist" : "Add to Wishlist"}
          </button>

          {/* Order */}
          <button
            disabled={ordered}
            onClick={() => setShowModal(true)}
            className="btn btn-primary text-white w-full"
          >
            {ordered ? "Already Ordered" : <>
              <FaShoppingCart /> Order Now
            </>}
          </button>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <h2 className="text-xl font-bold">Reviews</h2>

        {reviews.length === 0 && <p>No reviews yet</p>}

        {reviews.map(r => (
          <div key={r._id} className="border-b pb-3">
            <div className="flex gap-1 text-yellow-500">
              {[...Array(r.rating)].map((_, i) => <FaStar key={i} />)}
            </div>
            <p>{r.comment}</p>
          </div>
        ))}

        {/* Review Form */}
        {ordered && (
          <div className="space-y-3 pt-4">
            <select
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
              className="select select-bordered"
            >
              {[5,4,3,2,1].map(n => (
                <option key={n} value={n}>{n} Stars</option>
              ))}
            </select>

            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write your review..."
              className="textarea textarea-bordered w-full"
            />

            <button onClick={handleReview} className="btn btn-primary">
              Submit Review
            </button>
          </div>
        )}
      </div>

      {/* ORDER MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 space-y-4">
            <h3 className="text-lg font-bold">Confirm Order</h3>

            <input value={user?.displayName || ""} readOnly className="input input-bordered w-full" />
            <input value={user?.email || ""} readOnly className="input input-bordered w-full" />

            <input
              placeholder="Phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="input input-bordered w-full"
            />

            <textarea
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="textarea textarea-bordered w-full"
            />

            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)} className="btn btn-outline flex-1">
                Cancel
              </button>
              <button onClick={handleOrder} className="btn btn-primary flex-1">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookDetails;
