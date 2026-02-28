import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios"; 
import { FaSearch } from "react-icons/fa";

const AllBooks = () => {
  const axiosPublic = useAxios();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters & Pagination State
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8; 

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axiosPublic.get("/books", {
          params: { search, category, sort, page, limit }
        });
        
       
        if (res.data.books) {
          setBooks(res.data.books);
          setTotalPages(res.data.totalPages || 1);
        } else {
        
          setBooks(res.data || []);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchBooks();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, sort, category, page, axiosPublic]);

  // Skeleton Loader UI
  const SkeletonCard = () => (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 animate-pulse">
      <div className="h-64 bg-slate-200 rounded-2xl mb-4 w-full"></div>
      <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
      <div className="flex justify-between mt-6">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        <div className="h-10 bg-slate-200 rounded-xl w-1/3"></div>
      </div>
    </div>
  );

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-500">
              All Books
            </span>
          </h2>
          <p className="text-slate-500 mt-4">Browse through our complete collection</p>
        </motion.div>

        {/* Search, Category & Sort Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          
          <div className="relative w-full md:w-1/3">
            <FaSearch className="absolute left-4 top-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by title..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm transition-all"
            />
          </div>

          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="w-full md:w-1/4 px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Programming">Programming</option>
          </select>

          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="w-full md:w-1/4 px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          >
            <option value="desc">Price: High to Low</option>
            <option value="asc">Price: Low to High</option>
          </select>
        </div>

       
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            [...Array(8)].map((_, index) => <SkeletonCard key={index} />)
          ) : (
            books.map((book, index) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-slate-100 overflow-hidden transition-all duration-500 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {book.category && (
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                      {book.category}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{book.description || `By ${book.author}`}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <span className="text-2xl font-black text-slate-900 flex items-center gap-1">
                      <span className="text-red-600 text-lg">৳</span>{book.price}
                    </span>
                    <Link to={`/books/${book._id}`} className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-red-600 transition-all duration-300 shadow-md">
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Empty State */}
        {!loading && books.length === 0 && (
          <div className="text-center mt-20 p-10 bg-white rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No books found!</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
            <button onClick={() => { setSearch(""); setCategory("All"); setSort("desc"); }} className="btn btn-outline border-slate-300 text-slate-600 hover:bg-slate-50">
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-16">
            <div className="join shadow-sm border border-slate-200 rounded-xl overflow-hidden bg-white">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="join-item btn btn-md bg-white border-none hover:bg-slate-50 disabled:bg-slate-50">« Prev</button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`join-item btn btn-md border-none ${page === i + 1 ? "bg-red-600 text-white hover:bg-red-700" : "bg-white text-slate-600 hover:bg-slate-50"}`}>{i + 1}</button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="join-item btn btn-md bg-white border-none hover:bg-slate-50 disabled:bg-slate-50">Next »</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBooks;