import React from "react";

const ContactUsForm = () => {
  return (
    <form className="w-[85%] md:w-[50%] lg:w-[40%] xl:w-[30%] m-auto border-1 border-gray-300 shadow-sm p-8 bg-white mt-10 mb-10">
      <p className="text-2xl font-bold">Send Message</p>
      <div className="mt-6 flex flex-col">
        <label htmlFor="fullName" className="font-bold">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          className="outline-0 border-b-2 pb-1 focus:border-blue-400 text-[#777]"
        />
      </div>
      <div className="mt-6 flex flex-col">
        <label htmlFor="email" className="font-bold">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="outline-0 border-b-2 pb-1 focus:border-blue-400 text-[#777]"
        />
      </div>
      <div className="mt-6 flex flex-col">
        <label htmlFor="message" className="font-bold">
          Type your message
        </label>
        <textarea
          name="message"
          id="message"
          className="outline-0 border-b-2 pb-1 focus:border-blue-400 text-[#777]
          resize-none"
          rows={5}
        ></textarea>
      </div>
      <input
        type="submit"
        value="Send"
        className="rounded cursor-pointer hover:shadow-md py-0.5 px-3.5 mt-4 bg-blue-500 text-white font-bold"
      />
    </form>
  );
};

export default ContactUsForm;
