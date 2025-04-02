"use client";
import {
  submitUser,
  SubmitUserStatus,
} from "@/controllers/actions/createUserAction";
import React from "react";
import { useFormState } from "react-dom";

const initialState: SubmitUserStatus = {
  success: false,
  message: "",
  error: "",
  userId: undefined,
};

const SignupForm = () => {
  const [formState, action] = useFormState(submitUser, initialState);
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
              name="first_name"
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
              name="last_name"
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
          <label htmlFor="idNumber">City*</label>
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
          <label htmlFor="DOB">Date Of Birth*</label>
          <input
            type="date"
            name="date_of_birth"
            id="DOB"
            placeholder="Date Of Birth"
            className="border-1 border-gray-400 rounded-md px-1.5 py-1.5 focus:outline-blue-500"
            required
          />
        </div>
      </div>
      {!formState.success && <div className="text-red-600 mt-3 text-center">{formState.message}</div>}
      <input
        type="submit"
        value="Continue"
        className="border-2 w-full rounded-md mt-4 p-2.5 text-lg cursor-pointer bg-[#1f2328] text-white hover:bg-[#32383f]"
      />
    </form>
  );
};

export default SignupForm;
