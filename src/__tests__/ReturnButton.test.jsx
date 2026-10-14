import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReturnButton from "@/app/components/ReturnButton";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("ReturnButton", () => {
  it("navigates back to the stories page", async () => {
    const user = userEvent.setup();
    render(<ReturnButton />);

    await user.click(screen.getByRole("button", { name: "Return to stories" }));

    expect(push).toHaveBeenCalledWith("/stories");
  });
});
