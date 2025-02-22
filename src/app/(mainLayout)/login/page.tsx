"use client";
import { useLoginUserMutation } from "@/app/Component/GlobalRedux/Features/AllApi/AllApi";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [addLogin] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addLogin({ email });
      console.log(res);
      if (res.data) {
        toast.success("user Login successfully");
        localStorage.setItem("email", email);
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid email");
    }
  };

  return (
    <div className="flex items-center justify-center lg:mt-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4 relative">
            <input
              type={"text"}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-gray-600 hover:underline">
              Forget Password
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link href="/singup" className="font-bold text-black hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
