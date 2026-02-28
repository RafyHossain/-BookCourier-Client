import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const { register, handleSubmit, setValue } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await loginUser(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });

    } catch (error) {
      Swal.fire("Login Failed", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await googleLogin();

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });

    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  
  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      
      setValue('email', 'admin@bookcourier.com'); 
      setValue('password', '123456aA');
    } else {
      
      setValue('email', 'user@bookcourier.com'); 
      setValue('password', '123456aA');
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 bg-slate-50 min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">

        <h2 className="text-3xl font-bold text-center text-[#7f1d1d] mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-8 text-sm">
          Login to your BookCourier account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]"
            {...register("email", { required: true })}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7f1d1d]"
              {...register("password", { required: true })}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 cursor-pointer text-gray-500 text-xl hover:text-slate-800"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold bg-[#7f1d1d] hover:bg-[#991b1b] transition shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        
        <div className="flex gap-3 mt-4">
          <button 
            type="button"
            onClick={() => handleDemoLogin('admin')}
            className="flex-1 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
          >
            Demo Admin
          </button>
          <button 
            type="button"
            onClick={() => handleDemoLogin('user')}
            className="flex-1 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
          >
            Demo User
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t"></div>
          <span className="mx-3 text-gray-400 text-sm font-medium">OR</span>
          <div className="flex-grow border-t"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-50 transition font-medium text-slate-700"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="text-center text-gray-600 text-sm mt-8">
          Don't have an account?
          <Link
            to="/register"
            className="text-[#7f1d1d] font-bold ml-2 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;