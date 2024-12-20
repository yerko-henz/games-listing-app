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
          px-6 py-2 border rounded-lg bg-button-bgPrimary active:bg-button-bgPrimary
          text-text-tertiary
          ${isLoading ? "cursor-not-allowed" : ""}
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
