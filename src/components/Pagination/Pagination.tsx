"use client";

import Loader from "../Loader";
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
        {isLoading && <Loader />}
        {isLoading ? "Loading..." : "Show More"}
      </button>
    </div>
  );
}
