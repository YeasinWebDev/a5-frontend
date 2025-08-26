import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "@/validation/AuthValidation";
import { Link, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRegisterMutation } from "@/redux/feature/authApi";
import { useUserData } from "@/components/useUserData";
const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [createUser] = useRegisterMutation();
  const navigate = useNavigate();
  const { userData } = useUserData();

  const onSubmit = async (data: SignUpFormData) => {
    console.log("SignUp Data:", data);
    try {
      let ans = await createUser(data).unwrap();
      toast.success("User created successfully");
      console.log(ans);
      navigate(`/${ans?.data?.role}`);
      reset();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    if (userData?.user) {
      navigate(`/${userData?.user?.role}`);
    }
  }, [userData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md  shadow-lg rounded-2xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Create an Account ✨</h2>
          <p className=" text-sm">Sign up to get started with your journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium ">Name</label>
            <input
              type="text"
              {...register("name")}
              className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/60"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium ">Email</label>
            <input
              type="email"
              {...register("email")}
              className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/60"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium ">Phone</label>
            <input
              type="number"
              {...register("phone")}
              className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/60"
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium ">Password</label>
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

          <div>
            <label className="block mb-1 font-medium ">Role</label>
            <select {...register("role")} className="border dark:bg-transparent rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary/60">
              <option className="dark:bg-black" value="">
                Select Role
              </option>
              <option className="dark:bg-black" value="user">
                User
              </option>
              <option className="dark:bg-black" value="agent">
                Agent
              </option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

          <button type="submit" className="bg-primary transition font-semibold rounded-md p-3 w-full shadow-md cursor-pointer">
            Sign Up
          </button>
        </form>

        {/* Sign In Redirect */}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline cursor-pointer">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
