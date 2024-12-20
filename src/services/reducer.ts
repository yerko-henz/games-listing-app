import { Action, StateProps } from "./types";

export const initialState: StateProps = {
  games: [],
  filters: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
  selectedGenre: "",
};

export function reducer(state: StateProps, action: Action): StateProps {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "ADD_GAMES":
      return { ...state, games: [...state.games, ...action.payload] };
    default:
      return state;
  }
}
