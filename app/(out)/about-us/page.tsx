import Footer from "@/components/Footer/Footer";
import HeaderNav from "@/components/Header/HeaderNav/HeaderNav";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutUs = () => {
  return (
    <div>
      <HeaderNav position="relative" />
      <div className="md:w-[750] lg:w-[970] xl:w-[1170] m-auto mt-12 relative z-10 px-4">
        <ul className="flex justify-center gap-4 text-gray-600 font-semibold text-sm">
          <li>
            <Link href="/" className="hover:text-[var(--primary-color)]">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>About</li>
        </ul>

        <div className="text-center mt-4">
          <h1 className="text-3xl font-bold text-indigo-900">Overview</h1>
          <p className="mt-6 leading-relaxed text-gray-700 max-w-3xl mx-auto">
            Gaza Sky Geeks (GSG) is a leading tech hub and startup accelerator
            in Palestine, established in 2011 by Mercy Corps. It provides
            training, mentorship, and networking opportunities for aspiring
            developers, freelancers, and entrepreneurs. GSG plays a vital role
            in empowering Palestinian youth by equipping them with in-demand
            technical skills, fostering innovation, and connecting them to
            global job markets. Through its Code Academy, Freelance Academy, and
            Startup Incubation programs, GSG supports the growth of a vibrant
            tech ecosystem in Palestine.
          </p>
        </div>

        <div className="mt-8">
          <Image
            src="/img/signup-background.svg"
            alt="about image"
            className="border-2 border-gray-300 shadow-sm w-full max-h-[500px] rounded-[80px_0_80px_0]"
            width={100}
            height={100}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-12 mb-24">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-indigo-900">Mission</h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              To empower Palestinian talent by providing world-class training in
              technology, entrepreneurship, and freelancing, enabling them to
              compete in the global digital economy and contribute to the local
              tech industry.
            </p>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-indigo-900">Vision</h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              To become the leading innovation and technology hub in Palestine,
              driving economic growth, fostering digital transformation, and
              creating opportunities for Palestinian professionals in the global
              market.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
