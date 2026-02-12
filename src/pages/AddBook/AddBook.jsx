import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AddBook = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    author: "",
    price: "",
    status: "published",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.post("/books", {
        ...formData,
        librarianEmail: user.email, // 🔥 IMPORTANT
      });

      Swal.fire({
        icon: "success",
        title: "Book Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      setFormData({
        title: "",
        image: "",
        author: "",
        price: "",
        status: "published",
      });

    } catch (error) {
      Swal.fire("Error", "Failed to add book", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Add New Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Book Name"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
