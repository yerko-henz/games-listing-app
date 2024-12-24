import { render, screen, fireEvent } from "@testing-library/react";
import GameCard from ".";
import { Game } from "@/utils/endpoint";

const mockGame: Game = {
  id: "1",
  name: "Test Game",
  genre: "Action",
  image: "/test-image.jpg",
  isNew: true,
  description: "Test description",
  price: 10,
};

beforeEach(() => {
  localStorage.clear();
});

test("renders GameCard with game details", () => {
  render(<GameCard game={mockGame} />);

  expect(screen.getByText(mockGame.name)).toBeInTheDocument();
  expect(screen.getByText(mockGame.genre)).toBeInTheDocument();
  expect(screen.getByAltText(mockGame.name)).toBeInTheDocument();
  expect(screen.getByText("New")).toBeInTheDocument();
});

test("adds game to cart", () => {
  render(<GameCard game={mockGame} />);

  const button = screen.getByRole("button", { name: /Add to Cart/i });
  fireEvent.click(button);

  expect(localStorage.getItem("cart")).toContain(JSON.stringify(mockGame));
  expect(
    screen.getByRole("button", { name: /Remove from Cart/i })
  ).toBeInTheDocument();
});

test("removes game from cart", () => {
  localStorage.setItem("cart", JSON.stringify([mockGame]));

  render(<GameCard game={mockGame} />);

  const button = screen.getByRole("button", { name: /Remove from Cart/i });
  fireEvent.click(button);

  expect(localStorage.getItem("cart")).not.toContain(JSON.stringify(mockGame));
  expect(
    screen.getByRole("button", { name: /Add to Cart/i })
  ).toBeInTheDocument();
});

test("handles isNew flag correctly", () => {
  const newGame = { ...mockGame, isNew: true };
  render(<GameCard game={newGame} />);

  expect(screen.getByText("New")).toBeInTheDocument();
});
