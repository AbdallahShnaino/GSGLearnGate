"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Something Went Wrong!
        </h1>
        <p className="text-gray-700 mb-4">
          An unexpected error occurred. Please try again or contact support if
          the issue persists.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Error: {error.message}
          {error.digest && ` (Digest: ${error.digest})`}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
