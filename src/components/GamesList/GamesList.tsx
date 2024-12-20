"use client";

import GenreFilter from "../GenreFilter";
import Pagination from "../Pagination";

import { useGames } from "@/services/useGames";

export default function GamesList() {
  const {
    games,
    filters,
    isLoading,
    error,
    hasMore,
    selectedGenre,
    handleGenreChange,
    loadMore,
  } = useGames();

  if (error) return <div className="mx-8">Error: {error}</div>;

  return (
    <div className="m-8">
      <GenreFilter
        filters={filters}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">{game.name}</h2>
              <p className="text-gray-600">{game.genre}</p>
            </div>
          </div>
        ))}
      </div>

      {games.length === 0 && isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="flex items-center gap-2">
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
            Loading games...
          </div>
        </div>
      )}

      <Pagination
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        gamesLength={games.length}
      />
    </div>
  );
}
