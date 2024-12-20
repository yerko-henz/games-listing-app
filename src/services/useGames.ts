"use client";
import { Game, GamesResponse } from "@/app/api/games/types";
import { useState, useEffect } from "react";

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("");

  const fetchGames = async (page: number, genre?: string) => {
    try {
      setIsLoading(true);
      setGames([]);

      const params = new URLSearchParams();
      if (genre) params.append("genre", genre);
      params.append("page", page.toString());

      const response = await fetch(`/api/games?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }

      const data: GamesResponse = await response.json();

      setGames((prevGames) =>
        page === 1 ? data.games : [...prevGames, ...data.games]
      );

      if (filters.length === 0) {
        setFilters(data.availableFilters);
      }

      setHasMore(page < data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenreChange = (newGenre: string) => {
    setSelectedGenre(newGenre);
    setCurrentPage(1);
    setGames([]);
    fetchGames(1, newGenre);
  };

  useEffect(() => {
    const initializeGames = () => {
      const params = new URLSearchParams(window.location.search);
      const genreFromUrl = params.get("genre");

      if (genreFromUrl) {
        setSelectedGenre(genreFromUrl);
        fetchGames(1, genreFromUrl);
      } else {
        fetchGames(1, selectedGenre);
      }
    };

    initializeGames();
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (selectedGenre) {
      url.searchParams.set("genre", selectedGenre);
    } else {
      url.searchParams.delete("genre");
    }

    window.history.pushState({}, "", url);
  }, [selectedGenre]);

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchGames(nextPage, selectedGenre);
  };

  return {
    games,
    filters,
    isLoading,
    error,
    hasMore,
    selectedGenre,
    handleGenreChange,
    loadMore,
  };
}
