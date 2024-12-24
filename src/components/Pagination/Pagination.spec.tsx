import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from ".";
import { PaginationProps } from "./types";

const defaultProps: PaginationProps = {
  isLoading: false,
  hasMore: true,
  onLoadMore: jest.fn(),
  gamesLength: 10,
};

test("renders Show More button when hasMore is true and gamesLength is greater than 0", () => {
  render(<Pagination {...defaultProps} />);

  expect(screen.getByText("Show More")).toBeInTheDocument();
});

test("does not render when hasMore is false", () => {
  render(<Pagination {...defaultProps} hasMore={false} />);

  expect(screen.queryByText("Show More")).not.toBeInTheDocument();
});

test("does not render when gamesLength is 0", () => {
  render(<Pagination {...defaultProps} gamesLength={0} />);

  expect(screen.queryByText("Show More")).not.toBeInTheDocument();
});

test("displays Loading... and Loader component when isLoading is true", () => {
  render(<Pagination {...defaultProps} isLoading={true} />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("calls onLoadMore when Show More button is clicked", () => {
  const onLoadMore = jest.fn();
  render(<Pagination {...defaultProps} onLoadMore={onLoadMore} />);

  const button = screen.getByText("Show More");
  fireEvent.click(button);

  expect(onLoadMore).toHaveBeenCalledTimes(1);
});

test("disables button and prevents click when isLoading is true", () => {
  const onLoadMore = jest.fn();
  render(
    <Pagination {...defaultProps} isLoading={true} onLoadMore={onLoadMore} />
  );

  const button = screen.getByText("Loading...");

  expect(button).toBeDisabled();
  fireEvent.click(button);

  expect(onLoadMore).not.toHaveBeenCalled();
});
