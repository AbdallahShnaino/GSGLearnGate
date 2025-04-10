"use client";

import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg text-center border border-gray-200">
        <h1 className="text-6xl font-extrabold text-[#FFA41F] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => router.back()}
            className="bg-[#FFA41F] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#ffa51fc6] transition-all cursor-pointer"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push(`/student/${5}/my-courses`)}
            className="bg-white text-[#FFA41F] px-6 py-3 rounded-lg font-medium hover:bg-gray-50 border border-[#FFA41F] transition-all cursor-pointer"
          >
            Return Home
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-md mt-6 text-sm text-gray-700 text-left">
          <strong className="text-gray-900">Tip:</strong>{" "}
          <span className="break-words">
            Check the URL for typos or use the navigation to find what you are
            looking for.
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
