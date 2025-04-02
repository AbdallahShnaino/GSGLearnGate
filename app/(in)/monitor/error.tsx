"use client";

interface IProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: IProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-2">Oops!!!</h2>
        <h3 className="text-lg text-gray-700 mb-4">
          Something went wrong while processing your request!
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          You can{" "}
          <button
            onClick={reset}
            className="text-blue-600 font-medium hover:underline"
          >
            try again
          </button>
          or
          <button
            onClick={() => window.location.reload()}
            className="text-blue-600 font-medium hover:underline"
          >
            refresh the page
          </button>
          later.
        </p>
        <div className="bg-gray-50 border border-gray-200 p-3 rounded-md text-sm text-gray-600">
          <strong className="text-gray-800">Error details:</strong>{" "}
          <span className="text-red-500">{error.message}</span>
        </div>
      </div>
    </div>
  );
};

export default Error;
