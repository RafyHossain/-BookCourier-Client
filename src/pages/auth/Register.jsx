import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {

  const { registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const imageFile = watch("photo");

  const onSubmit = async (data) => {

    try {
      setLoading(true);

      let photoURL = "";

      // Upload to ImageBB
      if (data.photo && data.photo.length > 0) {

        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );

        photoURL = response.data.data.display_url;
      }

      // Firebase register
      await registerUser(
        data.email,
        data.password,
        data.name,
        photoURL
      );

      Swal.fire("Account Created!", "", "success");
      navigate("/");

    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">

        <h2 className="text-3xl font-bold text-center text-[#7f1d1d] mb-2">
          Create Account 📚
        </h2>

        <p className="text-center text-gray-500 mb-8 text-sm">
          Join BookCourier today
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]"
            {...register("name", { required: true })}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]"
            {...register("email", { required: true })}
          />

          {/* Photo Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Upload Profile Photo
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("photo")}
              className="block w-full text-sm
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-xl file:border-0
                         file:bg-[#7f1d1d] file:text-white
                         hover:file:bg-[#991b1b]
                         cursor-pointer"
            />

            {imageFile && imageFile[0] && (
              <img
                src={URL.createObjectURL(imageFile[0])}
                alt="Preview"
                className="w-20 h-20 mt-4 rounded-full object-cover border"
              />
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]"
              {...register("password", { required: true, minLength: 6 })}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 cursor-pointer text-gray-500 text-xl"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          {/* Register Button */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold bg-[#7f1d1d] hover:bg-[#991b1b] transition"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t"></div>
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Redirect */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?
          <Link to="/login" className="text-[#7f1d1d] font-semibold ml-2 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
