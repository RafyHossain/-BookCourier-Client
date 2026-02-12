import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

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
      console.error(error);
      Swal.fire("Error", "Order failed", "error");
    }
  };

  return (
    <div className="p-6">

      {/* Search & Sort */}
      <div className="flex gap-4 mb-6">
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Book"
          className="input input-bordered w-full max-w-xs"
        />

        <select
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered"
        >
          <option value="desc">Price High → Low</option>
          <option value="asc">Price Low → High</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-lg font-semibold">
          Loading books...
        </div>
      )}

      {/* Book Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {!loading &&
          books.map((book) => (
            <div key={book._id} className="card shadow-lg bg-base-200">
              <figure>
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-56 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <p>Author: {book.author}</p>
                <p className="font-semibold">Price: ৳{book.price}</p>

                <Link
                  to={`/books/${book._id}`}
                  className="btn btn-outline btn-primary mt-2"
                >
                  Details
                </Link>

                
              </div>
            </div>
          ))}
      </div>

      {/* No Data */}
      {!loading && books.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No books found.
        </div>
      )}
    </div>
  );
};

export default AllBooks;
