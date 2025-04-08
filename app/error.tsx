"use client";

interface IProps {
  error: Error;
  reset: () => void;
}

const ERROR_MESSAGES: Record<string, string> = {
  DATABASE_CONNECTION_ISSUE:
    "Something went wrong. Please check your internet connection or contact the system administrator and provide the error code: 111.",

  DEFAULT: "Something went wrong. Please try again later.",
};

const ErrorPage = ({ error, reset }: IProps) => {
  const errorCode = error.message.startsWith("CODE:")
    ? error.message.split(":")[1]
    : "DEFAULT";

  const userMessage = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.DEFAULT;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg text-center border border-gray-200">
        <h2 className="text-4xl font-extrabold text-[#FFA41F] mb-3">Oops!</h2>
        <p className="text-lg text-gray-700 mb-4">{userMessage}</p>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => window.location.reload()}
            className="bg-[#FFA41F] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#ffa51fc6] transition-all cursor-pointer"
          >
            Refresh Page aaaaaa
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
