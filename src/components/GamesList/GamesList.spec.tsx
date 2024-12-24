import { render, screen, fireEvent } from "@testing-library/react";
import GamesList from ".";
import { useGames } from "@/services/useGames";

jest.mock("@/services/useGames", () => ({
  useGames: jest.fn(),
}));

const mockedUseGames = useGames as jest.Mock;

beforeEach(() => {
  mockedUseGames.mockClear();
});

test("renders GamesList with games", () => {
  mockedUseGames.mockReturnValue({
    games: [{ id: 1, name: "Test Game" }],
    filters: ["Action", "Adventure"],
    isLoading: false,
    error: null,
    hasMore: true,
    selectedGenre: "All",
    handleGenreChange: jest.fn(),
    loadMore: jest.fn(),
  });

  render(<GamesList />);

  expect(screen.getByText("Test Game")).toBeInTheDocument();
});

test("displays loading state", () => {
  mockedUseGames.mockReturnValue({
    games: [],
    filters: [],
    isLoading: true,
    error: null,
    hasMore: false,
    selectedGenre: "All",
    handleGenreChange: jest.fn(),
    loadMore: jest.fn(),
  });

  render(<GamesList />);

  expect(screen.getByText("Loading games...")).toBeInTheDocument();
});

test("handles error state", () => {
  mockedUseGames.mockReturnValue({
    games: [],
    filters: [],
    isLoading: false,
    error: "Failed to load games",
    hasMore: false,
    selectedGenre: "All",
    handleGenreChange: jest.fn(),
    loadMore: jest.fn(),
  });

  render(<GamesList />);

  expect(screen.getByText("Error: Failed to load games")).toBeInTheDocument();
});

test("loads more games", () => {
  const loadMore = jest.fn();

  mockedUseGames.mockReturnValue({
    games: [{ id: 1, name: "Test Game" }],
    filters: ["Action", "Adventure"],
    isLoading: false,
    error: null,
    hasMore: true,
    selectedGenre: "All",
    handleGenreChange: jest.fn(),
    loadMore,
  });

  render(<GamesList />);

  const button = screen.getByText("Show More");
  fireEvent.click(button);

  expect(loadMore).toHaveBeenCalled();
});
