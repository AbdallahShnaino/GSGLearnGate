"use client";
import {
  loginUser,
  LoginUserStatus,
} from "@/controllers/actions/createUserAction";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";

const initialState: LoginUserStatus = {
  success: false,
  message: "",
  error: "",
  userId: undefined,
};

const LoginForm = () => {
  const [formState, action] = useFormState(loginUser, initialState);

  console.log(formState);

  return (
    <form
      action={action}
      className="p-5 w-[90%] sm:w-96 flex flex-col gap-5 bg-[#EEEEEE] rounded-lg shadow-lg"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          
          className="border-1 border-gray-300 px-1.5 py-1 rounded focus:outline-blue-500 bg-white "
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label htmlFor="password">Password</label>
          <Link
            href={"/forget-password"}
            className="text-blue-400 hover:underline"
          >
            Forget password?
          </Link>
        </div>
        <input
          type="password"
          name="password"
          id="password"
          
          className="border-1 border-gray-300 px-1.5 py-1 rounded focus:outline-blue-500 bg-white"
        />
      </div>

      <div className="text-red-600 mt-3 text-center">{formState.message}</div>

      <input
        type="submit"
        value="Sign in"
        className="mt-1.5 bg-[#222831] hover:bg-[#393E46] rounded p-2 text-white cursor-pointer"
      />
    </form>
  );
};

export default LoginForm;
