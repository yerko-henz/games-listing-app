"use client";

import { PaginationProps } from "./types";

export default function Pagination({
  isLoading,
  hasMore,
  onLoadMore,
  gamesLength,
}: PaginationProps) {
  if (!hasMore || gamesLength === 0) return null;

  return (
    <div className="mt-8 mb-8 flex justify-center">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className={`
          px-6 py-2 border rounded-lg
          ${
            isLoading
              ? "bg-gray-100 cursor-not-allowed"
              : "hover:bg-gray-50 active:bg-gray-100"
          }
          disabled:opacity-50 
          transition-all duration-200
          min-w-[120px]
          flex items-center justify-center gap-2
        `}
      >
        {isLoading && (
          <svg
            className="animate-spin h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {isLoading ? "Loading..." : "Show More"}
      </button>
    </div>
  );
}
