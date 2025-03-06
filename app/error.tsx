"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  const router = useRouter();

  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  const getStatusMessage = (statusCode: number) => {
    switch (statusCode) {
      case 404:
        return "Oops! The page you are looking for does not exist.";
      case 500:
        return "Internal Server Error. Please try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  // Extract status code from error message (fallback to 500)
  const statusCode = Number(error.digest) || 500;
  const errorMessage = getStatusMessage(statusCode);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold">{statusCode}</h1>
      <p className="text-lg mt-4">{errorMessage}</p>

      <div className="mt-6 flex gap-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => router.push("/")}
        >
          Go Home
        </button>
        <button
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          onClick={reset}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
