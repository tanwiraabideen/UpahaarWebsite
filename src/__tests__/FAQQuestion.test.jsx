import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQQuestion from "@/app/components/FAQQuestion";

describe("FAQQuestion", () => {
  it("shows the question and hides the answer by default", () => {
    render(<FAQQuestion question="Who can donate?">Almost anyone.</FAQQuestion>);

    expect(screen.getByRole("button", { name: "Who can donate?" })).toBeInTheDocument();
    expect(screen.queryByText("Almost anyone.")).not.toBeInTheDocument();
  });

  it("toggles the answer when the question is clicked", async () => {
    const user = userEvent.setup();
    render(<FAQQuestion question="Who can donate?">Almost anyone.</FAQQuestion>);
    const button = screen.getByRole("button", { name: "Who can donate?" });

    await user.click(button);
    expect(screen.getByText("Almost anyone.")).toBeInTheDocument();

    await user.click(button);
    expect(screen.queryByText("Almost anyone.")).not.toBeInTheDocument();
  });
});
