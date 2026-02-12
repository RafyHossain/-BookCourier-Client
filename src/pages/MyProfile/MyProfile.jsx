import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(user?.displayName || "");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      let photoURL = user.photoURL;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
          formData
        );

        photoURL = res.data.data.url;
      }

      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      await axiosSecure.patch("/users/update-profile", {
        name,
        photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl rounded-3xl p-10 space-y-8"
      >
        <h2 className="text-3xl font-bold text-center">
          My Profile
        </h2>

        {/* Profile Info */}
        <div className="flex flex-col items-center space-y-4">

          <div className="relative group">
            <img
              src={preview || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-primary"
            />
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold">
              {user?.displayName}
            </h3>
            <p className="text-gray-500 text-sm">
              {user?.email}
            </p>
          </div>

        </div>

        {/* Update Form */}
        <div className="space-y-5">

          <div>
            <label className="label">
              <span className="label-text font-medium">
                Full Name
              </span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">
                Update Profile Image
              </span>
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="btn btn-primary w-full text-lg rounded-xl shadow-lg transition hover:scale-105"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

        </div>

      </motion.div>

    </div>
  );
};

export default MyProfile;
