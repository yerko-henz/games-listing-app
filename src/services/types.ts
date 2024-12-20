import { Game } from "@/utils/endpoint";

export type StateProps = {
  games: Game[];
  filters: string[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
  selectedGenre: string;
};

export type Action =
  | { type: "SET_STATE"; payload: Partial<StateProps> }
  | { type: "ADD_GAMES"; payload: Game[] };
