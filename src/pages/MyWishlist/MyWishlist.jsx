import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyWishlist = () => {
  const axiosSecure = useAxiosSecure();
  const [books, setBooks] = useState([]);

  const loadWishlist = () => {
    axiosSecure.get("/wishlist/my")
      .then(res => setBooks(res.data));
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (id) => {
    await axiosSecure.delete(`/wishlist/${id}`);
    Swal.fire("Removed!");
    loadWishlist();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {books.length === 0 && <p>No wishlist items</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book._id} className="bg-white p-4 rounded-xl shadow">
            <img src={book.image} alt="" className="h-40 w-full object-cover rounded" />
            <h3 className="font-bold mt-3">{book.title}</h3>
            <p className="text-red-600">৳{book.price}</p>

            <button
              onClick={() => handleRemove(book._id)}
              className="btn btn-error w-full mt-3"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWishlist;
