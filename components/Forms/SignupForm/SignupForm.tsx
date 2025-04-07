"use client";
import {
  submitUser,
  SubmitUserStatus,
} from "@/controllers/actions/createUserAction";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";

const initialState: SubmitUserStatus = {
  success: false,
  message: "",
  error: "",
  userId: undefined,
};

const SignupForm = () => {
  const [formState, action, isPending] = useActionState(submitUser, initialState);
  const router = useRouter();
  useEffect(()=>{
    if(formState.success){
      router.push('/login')
    }
  },[formState.success, router])
  return (
    <form action={action}>
      <div className="flex flex-col mt-4 gap-1.5">
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
          required
        />
      </div>
      <div className="flex flex-col mt-4 gap-1.5">
        <label htmlFor="password">Password*</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
          required
        />
        <p className="text-[14px] mt-1 text-[#777]">
          Password should be at least 8 characters including a number. uppercase
          and a lowercase Letter.
        </p>
      </div>
      <div>
        <div className="flex flex-col md:flex-row justify-between mt-4">
          <div className="flex flex-col gap-1.5 w-full md:w-[48%]">
            <label htmlFor="firstName">First Name*</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full md:w-[48%] mt-4 md:mt-0">
            <label htmlFor="lastName">Last Name*</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
              required
            />
          </div>
        </div>
        <p className="text-[14px] mt-1.5 text-[#777]">
          First and last name may only contain letters and must not include
          numbers or special characters.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-4">
        <div className="flex flex-col gap-1.5 w-full md:w-[48%]">
          <label htmlFor="city">City*</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5 w-full md:w-[48%] mt-4 md:mt-0">
          <label htmlFor="dateOfBirth">Date Of Birth*</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            placeholder="Date Of Birth"
            className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
            required
          />
        </div>
      </div>
      {!formState.success && <div className="text-red-600 mt-3 text-center">{formState.message}</div>}
      <input
        type="submit"
        value={isPending ? "Submitting..." : "submit"}
        className="border-2 w-full rounded-md mt-4 p-2.5 text-lg cursor-pointer bg-[#1f2328] text-white hover:bg-[#32383f]"
      />
    </form>
  );
};

export default SignupForm;
