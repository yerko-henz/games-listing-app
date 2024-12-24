import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from ".";

test("renders Navbar with GamerShop link", () => {
  render(<Navbar />);

  expect(screen.getByText("GamerShop")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /GamerShop/i })).toHaveAttribute(
    "href",
    "/"
  );
});

test("displays cart count from localStorage", () => {
  localStorage.setItem("cart", JSON.stringify([{ id: 1 }, { id: 2 }]));

  render(<Navbar />);

  expect(screen.getByText("2")).toBeInTheDocument();
});

test("updates cart count when cartUpdated event is triggered", () => {
  render(<Navbar />);

  localStorage.setItem("cart", JSON.stringify([{ id: 1 }, { id: 2 }]));
  fireEvent(window, new Event("cartUpdated"));

  expect(screen.getByText("2")).toBeInTheDocument();
});

test("removes cartUpdated event listener on unmount", () => {
  const { unmount } = render(<Navbar />);

  const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

  unmount();

  expect(removeEventListenerSpy).toHaveBeenCalledWith(
    "cartUpdated",
    expect.any(Function)
  );
});
