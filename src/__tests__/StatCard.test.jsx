import { act, render, screen } from "@testing-library/react";
import StatCard from "@/app/components/StatCard";

describe("StatCard", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "requestAnimationFrame", "Date"] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the label and symbol", () => {
    render(<StatCard number={750} label="Donors registered" symbol="+" />);

    expect(screen.getByText("Donors registered")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("starts at zero and counts up to the number", () => {
    render(<StatCard number={750} label="Donors registered" duration={1000} delay={200} />);
    const value = () => screen.getByText("Donors registered").previousSibling;

    expect(value()).toHaveTextContent(/^0/);

    act(() => {
      vi.advanceTimersByTime(200 + 500);
    });
    const midway = parseInt(value().textContent, 10);
    expect(midway).toBeGreaterThan(0);
    expect(midway).toBeLessThan(750);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(value()).toHaveTextContent(/^750/);
  });
});
