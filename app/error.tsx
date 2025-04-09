"use client";

interface IProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: IProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-3xl p-8 max-w-xl w-full text-center border border-gray-200">
        <h2 className="text-5xl font-extrabold text-[#FFA41F] mb-5">Oops!</h2>

        <p className="text-lg text-gray-600 mb-6">
          Something went wrong. Please try refreshing the page or contact
          support if the issue persists.
        </p>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => window.location.reload()}
            className="bg-[#FFA41F] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#FFA41F]/80 transition-all"
          >
            Refresh Page
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl shadow-sm mt-8 text-sm text-gray-700 text-left">
          <strong className="text-gray-900">Error Details:</strong>{" "}
          <span className="text-red-600 break-words">{error.message}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
