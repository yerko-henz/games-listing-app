"use client";

import GenreFilter from "../GenreFilter";
import Loader from "../Loader";
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
            <Loader />
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
