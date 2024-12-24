"use client";
import { GamesResponse } from "@/app/api/games/types";
import { useReducer, useEffect } from "react";
import { initialState, reducer } from "./reducer";

export function useGames() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchGames = async (page: number, genre?: string) => {
    dispatch({ type: "SET_STATE", payload: { isLoading: true } });

    try {
      const params = new URLSearchParams();
      if (genre && genre !== "") params.append("genre", genre);
      params.append("page", page.toString());

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      const data: GamesResponse = await response.json();

      if (page === 1) {
        dispatch({ type: "SET_STATE", payload: { games: data.games } });
      } else {
        dispatch({ type: "ADD_GAMES", payload: data.games });
      }

      dispatch({
        type: "SET_STATE",
        payload: {
          filters: data.availableFilters,
          hasMore: page < data.totalPages,
        },
      });
    } catch (err) {
      dispatch({
        type: "SET_STATE",
        payload: {
          error: err instanceof Error ? err.message : "An error occurred",
        },
      });
    } finally {
      dispatch({ type: "SET_STATE", payload: { isLoading: false } });
    }
  };

  const handleGenreChange = (newGenre: string) => {
    dispatch({
      type: "SET_STATE",
      payload: { selectedGenre: newGenre, currentPage: 1, games: [] },
    });

    const url = new URL(window.location.href);

    if (newGenre === "") {
      url.searchParams.delete("genre");
    } else {
      url.searchParams.set("genre", newGenre);
    }
    window.history.pushState({}, "", url);
    fetchGames(1, newGenre);
  };

  useEffect(() => {
    const genreFromUrl =
      new URLSearchParams(window?.location.search).get("genre") || "";

    dispatch({ type: "SET_STATE", payload: { selectedGenre: genreFromUrl } });

    fetchGames(1, genreFromUrl);
  }, []);

  const loadMore = () => {
    const nextPage = state.currentPage + 1;
    dispatch({ type: "SET_STATE", payload: { currentPage: nextPage } });
    fetchGames(nextPage, state.selectedGenre);
  };

  return {
    ...state,
    handleGenreChange,
    loadMore,
  };
}
