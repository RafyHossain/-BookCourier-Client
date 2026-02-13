import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBooks = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await axiosSecure.get("/books/my-books");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const toggleStatus = async (book) => {
    const newStatus =
      book.status === "published"
        ? "unpublished"
        : "published";

    await axiosSecure.patch(`/books/my-books/${book._id}`, {
      status: newStatus,
    });

    fetchBooks();
  };

  return (
    <div className="space-y-6">

      <h2 className="text-3xl text-primary font-bold">
        My Books
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow p-6">

        <table className="table w-full">

          <thead>
            <tr>
              <th>Image</th>
              <th>Book</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id}>

                <td>
                  <img
                    src={book.image}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>

                <td>{book.title}</td>

                <td>
                  <span className={`badge ${
                    book.status === "published"
                      ? "badge-success"
                      : "badge-error"
                  }`}>
                    {book.status}
                  </span>
                </td>

                <td className="space-x-2">

                  <button
                    onClick={() =>
                      navigate(`/dashboard/edit-book/${book._id}`)
                    }
                    className="btn btn-sm btn-info"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => toggleStatus(book)}
                    className="btn btn-sm btn-warning"
                  >
                    {book.status === "published"
                      ? "Unpublish"
                      : "Publish"}
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MyBooks;
