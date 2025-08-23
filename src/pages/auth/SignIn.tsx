import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "@/validation/AuthValidation";
import { Link, useNavigate} from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLoginMutation } from "@/redux/feature/authApi";
import toast from "react-hot-toast";

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [signin] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormData) => {
    try {
      let ans = await signin(data).unwrap();
      reset();
      navigate(`/${ans?.data?.user?.role}`)
      toast.success("User logged in successfully");
    } catch (error:any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Welcome Back 👋</h2>
          <p className="text-sm">Sign in to continue to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/60"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="border rounded-md p-3 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-primary/60"
                placeholder="Enter your password"
              />
              <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="bg-primary hover:bg-primary/90 transition font-semibold rounded-md p-3 w-full shadow-md cursor-pointer">
            Sign In
          </button>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary cursor-pointer">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
