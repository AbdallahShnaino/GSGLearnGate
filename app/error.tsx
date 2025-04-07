"use client";

interface IProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: IProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg text-center border border-gray-200">
        <h2 className="text-4xl font-extrabold text-[#FFA41F] mb-3">Oops!</h2>
        <p className="text-lg text-gray-700 mb-4">
          Something went wrong while processing your request.
        </p>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => window.location.reload()}
            className="bg-[#FFA41F] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#ffa51fc6] transition-all cursor-pointer"
          >
            Refresh Page
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-4 rounded-md mt-6 text-sm text-gray-700 text-left">
          <strong className="text-gray-900">Error Details:</strong>{" "}
          <span className="text-red-600 break-words">{error.message}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
