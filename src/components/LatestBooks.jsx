import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaArrowRight } from "react-icons/fa";

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
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900">
            Latest{" "}
            <span className="text-transparent text-primary">
              Books
            </span>
          </h2>

          <p className="text-slate-500 mt-4 text-lg">
            Discover our newest arrivals curated just for you.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-lg font-semibold py-20">
            Loading latest books...
          </div>
        )}

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading &&
            books.map((book, index) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-100"
              >

                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    New
                  </div>
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
                      <span className="text-red-600 text-lg">৳</span>
                      {book.price}
                    </span>

                    <Link
                      to={`/books/${book._id}`}
                      className="px-4 py-2 rounded-xl btn-primary hover:bg-red-600 hover:text-white transition-all duration-300"
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
          <div className="text-center mt-16 text-slate-500">
            No latest books found.
          </div>
        )}

        {/* View All Button */}
        {!loading && books.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/books"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl 
              btn-primary text-white font-bold 
              shadow-lg shadow-red-500/30 hover:scale-105 transition-all duration-300"
            >
              View All Books <FaArrowRight />
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default LatestBooks;
