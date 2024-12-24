import { render, screen, fireEvent } from "@testing-library/react";
import GenreFilter from ".";
import { GenreFilterProps } from "./types";

const defaultProps: GenreFilterProps = {
  filters: ["Action", "Adventure", "RPG"],
  selectedGenre: "",
  onGenreChange: jest.fn(),
  isLoading: false,
};

test("renders GenreFilter with options", () => {
  render(<GenreFilter {...defaultProps} />);

  expect(screen.getByRole("combobox")).toBeInTheDocument();
  expect(screen.getByText("All Genres")).toBeInTheDocument();
  expect(screen.getByText("Action")).toBeInTheDocument();
  expect(screen.getByText("Adventure")).toBeInTheDocument();
  expect(screen.getByText("RPG")).toBeInTheDocument();
});

test("calls onGenreChange when a genre is selected", () => {
  const onGenreChange = jest.fn();
  render(<GenreFilter {...defaultProps} onGenreChange={onGenreChange} />);

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "Action" },
  });

  expect(onGenreChange).toHaveBeenCalledWith("Action");
});

test("disables select when isLoading is true", () => {
  render(<GenreFilter {...defaultProps} isLoading={true} />);

  expect(screen.getByRole("combobox")).toBeDisabled();
});

test("enables select when isLoading is false", () => {
  render(<GenreFilter {...defaultProps} isLoading={false} />);

  expect(screen.getByRole("combobox")).not.toBeDisabled();
});
