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
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl text-primary font-bold text-center mb-12">
          Latest Books
        </h2>

        {loading ? (
          <div className="text-center py-10 text-primary font-medium">
            Loading...
          </div>
        ) : books.length === 0 ? (
          <div className="text-center text-slate-400">
            No books available
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {books.map(book => (
              <div
                key={book._id}
                className="bg-slate-50 rounded-2xl shadow-md p-4 hover:shadow-xl transition"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-48 w-full object-cover rounded-xl mb-4"
                />

                <h3 className="font-bold text-lg mb-1 truncate">
                  {book.title}
                </h3>

                <p className="text-sm text-slate-500 mb-2">
                  {book.author}
                </p>

                <p className="font-bold text-primary mb-4">
                  ৳{book.price}
                </p>

                <Link
                  to={`/books/${book._id}`}
                  className="btn btn-sm btn-primary w-full"
                >
                  View Details
                </Link>
              </div>
            ))}

          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link to="/books" className="btn btn-outline btn-primary">
            View All Books
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LatestBooks;
