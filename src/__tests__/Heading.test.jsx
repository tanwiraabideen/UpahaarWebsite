import { render, screen } from "@testing-library/react";
import Heading from "@/app/components/Heading";
import NewHeading from "@/app/components/NewHeading";

// next/font only works inside the Next.js compiler
vi.mock("next/font/google", () => ({
  Playfair_Display: () => ({ className: "playfair" }),
}));

describe("Heading", () => {
  it("renders the tagline as the main heading", () => {
    render(<Heading />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Live Life, Give Life");
    expect(heading).toHaveClass("playfair");
  });
});

describe("NewHeading", () => {
  it("renders the tagline as the main heading", () => {
    render(<NewHeading />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Live Life, Give Life");
    expect(heading).toHaveClass("playfair");
  });
});
