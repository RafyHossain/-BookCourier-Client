import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

const EditBook = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      setBook(res.data);
    };
    fetchBook();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await axiosSecure.patch(`/books/my-books/${id}`, book);

    navigate("/dashboard/my-books");
  };

  if (!book) return <Loading></Loading>;

  return (
    <form onSubmit={handleUpdate} className="space-y-4">

      <input
        value={book.title}
        onChange={(e) =>
          setBook({ ...book, title: e.target.value })
        }
        className="input input-bordered w-full"
      />

      <input
        value={book.image}
        onChange={(e) =>
          setBook({ ...book, image: e.target.value })
        }
        className="input input-bordered w-full"
      />

      <input
        value={book.author}
        onChange={(e) =>
          setBook({ ...book, author: e.target.value })
        }
        className="input input-bordered w-full"
      />

      <input
        type="number"
        value={book.price}
        onChange={(e) =>
          setBook({ ...book, price: e.target.value })
        }
        className="input input-bordered w-full"
      />

      <select
        value={book.status}
        onChange={(e) =>
          setBook({ ...book, status: e.target.value })
        }
        className="select select-bordered w-full"
      >
        <option value="published">Published</option>
        <option value="unpublished">Unpublished</option>
      </select>

      <button className="btn btn-primary w-full">
        Update Book
      </button>

    </form>
  );
};

export default EditBook;
