import Footer from "@/components/Footer/Footer";
import ContactUsForm from "@/components/Forms/ContactUsForm/ContactUsForm";
import HeaderNav from "@/components/Header/HeaderNav/HeaderNav";
import React from "react";

const page = () => {
  return (
    <div>
      <HeaderNav position="relative" />
      <div className="md:w-[750] lg:w-[970] xl:w-[1170] m-auto text-center mt-5">
        <h3 className="text-3xl mb-2 font-bold">Contact Us</h3>
        <p className="text-lg">
          Any questions or remarks? Just write us a message!
        </p>
      </div>
      <ContactUsForm />
      <Footer />
    </div>
  );
};

export default page;
