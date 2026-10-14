import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorPage from "@/app/error";

const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

vi.mock("@/app/components/Navbar", () => ({
  default: () => <nav>Navbar</nav>,
}));

describe("Error page", () => {
  let consoleError;

  beforeEach(() => {
    consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    refresh.mockClear();
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it("shows the message and logs the error", () => {
    const error = new Error("boom");
    render(<ErrorPage error={error} reset={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "Something went wrong" })).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalledWith(error);
  });

  it("refreshes the route and resets when Try again is clicked", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    render(<ErrorPage error={new Error("boom")} reset={reset} />);

    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(refresh).toHaveBeenCalled();
    expect(reset).toHaveBeenCalled();
  });

  it("links back to the home page", () => {
    render(<ErrorPage error={new Error("boom")} reset={vi.fn()} />);

    expect(screen.getByRole("link", { name: "Go home" })).toHaveAttribute("href", "/");
  });
});
