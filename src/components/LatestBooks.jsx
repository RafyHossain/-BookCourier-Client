import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const LatestBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const res = await axiosSecure.get("/books/latest");
        setBooks(res.data);
      } catch (error) {
        console.error("Failed to fetch latest books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, [axiosSecure]);

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-4">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b91c1c] to-[#ef4444]">Books</span>
          </h2>
         
          <p className="text-gray-500 mt-2">
            Explore our newest arrivals
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-lg font-semibold">
            Loading latest books...
          </div>
        )}

        {/* Books Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
          {!loading &&
            books.map((book) => (
              <div
                key={book._id}
                className="card shadow-lg bg-base-200 hover:shadow-xl transition"
              >
                <figure>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-56 w-full object-cover"
                  />
                </figure>

                <div className="card-body">
                  <h2 className="card-title line-clamp-1">
                    {book.title}
                  </h2>

                  <p className="text-sm text-gray-600">
                    Author: {book.author}
                  </p>

                  <p className="font-semibold text-red-600">
                    ৳{book.price}
                  </p>

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

        {/* No Books */}
        {!loading && books.length === 0 && (
          <div className="text-center mt-10 text-gray-500">
            No latest books found.
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/books"
            className="btn btn-primary"
          >
            View All Books
          </Link>
        </div>

      </div>
    </section>
  );
};

export default LatestBooks;
