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
      if (genre) params.append("genre", genre);
      params.append("page", page.toString());

      const response = await fetch(`/api/games?${params.toString()}`);
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
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const genreFromUrl = params.get("genre") || "";

    dispatch({ type: "SET_STATE", payload: { selectedGenre: genreFromUrl } });
  }, []);

  useEffect(() => {
    fetchGames(state.currentPage, state.selectedGenre);
  }, [state.selectedGenre, state.currentPage]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (state.selectedGenre) {
      url.searchParams.set("genre", state.selectedGenre);
    } else {
      url.searchParams.delete("genre");
    }

    window.history.pushState({}, "", url);
  }, [state.selectedGenre]);

  const loadMore = () => {
    const nextPage = state.currentPage + 1;
    dispatch({ type: "SET_STATE", payload: { currentPage: nextPage } });
  };

  return {
    ...state,
    handleGenreChange,
    loadMore,
  };
}
