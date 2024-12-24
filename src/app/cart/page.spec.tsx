import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./page";
import { Game } from "@/utils/endpoint";

const mockCartItems: Game[] = [
  {
    id: "1",
    name: "Game 1",
    description: "Description 1",
    price: 29.99,
    genre: "Action",
    image: "/game1.jpg",
    isNew: false,
  },
  {
    id: "2",
    name: "Game 2",
    description: "Description 2",
    price: 39.99,
    genre: "Adventure",
    image: "/game2.jpg",
    isNew: false,
  },
];

beforeEach(() => {
  localStorage.setItem("cart", JSON.stringify(mockCartItems));
});

test("renders Cart component with items", () => {
  render(<Cart />);

  expect(screen.getByText("Your Cart")).toBeInTheDocument();
  expect(screen.getAllByText("Game 1").length).toBe(2);
  expect(screen.getAllByText("Game 2").length).toBe(2);
  expect(screen.getByText("Order Total")).toBeInTheDocument();
  expect(screen.getByTestId("total-price")).toHaveTextContent("$69.98");
});

test("displays message when cart is empty", () => {
  localStorage.setItem("cart", JSON.stringify([]));
  render(<Cart />);

  expect(screen.getByText("No items in your cart")).toBeInTheDocument();
});

test("removes item from cart", () => {
  render(<Cart />);

  const removeButtons = screen.getAllByText("X");
  fireEvent.click(removeButtons[0]);

  expect(screen.queryByText("Game 1")).not.toBeInTheDocument();
  expect(screen.getAllByText("Game 2").length).toBe(2);
  expect(screen.getByTestId("total-price")).toHaveTextContent("$39.99");
});

test("updates total price when item is removed", () => {
  render(<Cart />);

  const removeButtons = screen.getAllByText("X");
  fireEvent.click(removeButtons[0]);

  expect(screen.getByText("Order Total")).toBeInTheDocument();
  expect(screen.getByTestId("total-price")).toHaveTextContent("$39.99");
});

test("triggers cartUpdated event when item is removed", () => {
  const dispatchEventSpy = jest.spyOn(window, "dispatchEvent");
  render(<Cart />);

  const removeButtons = screen.getAllByText("X");
  fireEvent.click(removeButtons[0]);

  expect(dispatchEventSpy).toHaveBeenCalledWith(new Event("cartUpdated"));
});
