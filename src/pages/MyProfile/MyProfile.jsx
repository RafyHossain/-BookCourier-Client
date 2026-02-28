import { useState } from "react";
import { updateProfile, updatePassword } from "firebase/auth";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";
import { FaUser, FaLock, FaCamera, FaEnvelope } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState(user?.displayName || "");
  const [newPassword, setNewPassword] = useState(""); // নতুন পাসওয়ার্ড স্টেট
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  // ইমেজ সিলেক্ট করলে প্রিভিউ দেখাবে
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

      // ১. যদি নতুন ইমেজ থাকে, তবে ImgBB তে আপলোড করা
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
          formData
        );

        photoURL = res.data.data.url;
      }

      // ২. Firebase এ নাম ও ছবি আপডেট
      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      // ৩. যদি ইউজার নতুন পাসওয়ার্ড দেয়, তবে তা আপডেট করা
      if (newPassword) {
        if (newPassword.length < 6) {
          Swal.fire("Warning", "Password must be at least 6 characters long", "warning");
          setLoading(false);
          return;
        }
        await updatePassword(user, newPassword);
      }

      // ৪. ব্যাকএন্ডে ইউজারের ডাটা আপডেট
      await axiosSecure.patch("/users/update-profile", {
        name,
        photoURL,
      });

      setNewPassword(""); // আপডেট শেষে পাসওয়ার্ড ফিল্ড ক্লিয়ার করা

      Swal.fire({
        icon: "success",
        title: "Profile Updated Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {
      console.error(error);
      // Firebase Security Rule: লগইন অনেক আগে হলে পাসওয়ার্ড চেঞ্জ করতে দেয় না
      if (error.code === 'auth/requires-recent-login') {
        Swal.fire("Session Expired", "For security reasons, please log out and log in again to change your password.", "error");
      } else {
        Swal.fire("Error", error.message || "Update failed", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 shadow-2xl rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700"
      >
        {/* Cover Photo / Header Area */}
        <div className="h-32 bg-gradient-to-r from-red-700 to-red-500 w-full relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative group cursor-pointer">
              <img
                src={preview || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white dark:border-slate-800 transition-transform duration-300 group-hover:scale-105 bg-white"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <FaCamera className="text-white text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Area */}
        <div className="pt-20 pb-6 text-center px-6">
          <h2 className="text-3xl font-black text-slate-800 dark:text-white">
            {user?.displayName || "User Name"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 mt-2">
            <FaEnvelope /> {user?.email}
          </p>
          <span className="inline-block px-4 py-1 mt-4 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 text-xs font-bold uppercase tracking-widest">
            Profile Settings
          </span>
        </div>

        {/* Update Form */}
        <div className="p-8 md:p-10 bg-slate-50 dark:bg-slate-800/50">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Col: Personal Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                Personal Information
              </h3>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <FaUser className="text-red-500" /> Full Name
                  </span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <FaCamera className="text-red-500" /> Update Profile Image
                  </span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full bg-white dark:bg-slate-700 text-slate-700 dark:text-white border-slate-200 dark:border-slate-600"
                />
              </div>
            </div>

            {/* Right Col: Security */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                Security
              </h3>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <FaLock className="text-red-500" /> New Password
                  </span>
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  placeholder="Leave empty to keep current password"
                />
                <label className="label">
                  <span className="label-text-alt text-slate-500">Must be at least 6 characters with capital and small letter</span>
                </label>
              </div>
            </div>

          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full md:w-auto px-8 py-4 btn-primary hover:bg-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 mx-auto"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Save All Changes"}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;