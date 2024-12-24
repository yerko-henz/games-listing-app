import { render } from "@testing-library/react";
import Footer from ".";

describe("Footer component", () => {
  test("renders without crashing", () => {
    const { getByRole } = render(<Footer />);
    const footerElement = getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  test("contains a link to the homepage", () => {
    const { getByRole } = render(<Footer />);
    const linkElement = getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  test("renders the SVG logo", () => {
    const { container } = render(<Footer />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });
});
