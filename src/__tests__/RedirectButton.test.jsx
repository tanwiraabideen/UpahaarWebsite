import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RedirectButton from "@/app/components/RedirectButton";

describe("RedirectButton", () => {
  let openMock;

  beforeEach(() => {
    openMock = vi.spyOn(window, "open").mockImplementation(() => null);
  });

  afterEach(() => {
    openMock.mockRestore();
  });

  it("keeps the dropdown closed until Donate Now is clicked", async () => {
    const user = userEvent.setup();
    render(<RedirectButton />);

    expect(screen.queryByText("Stem Cell Donation")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /donate now/i }));
    expect(screen.getByText("Stem Cell Donation")).toBeInTheDocument();
    expect(screen.getByText("Organ Donation")).toBeInTheDocument();
  });

  it("opens the DKMS registration page and closes the dropdown", async () => {
    const user = userEvent.setup();
    render(<RedirectButton />);

    await user.click(screen.getByRole("button", { name: /donate now/i }));
    await user.click(screen.getByText("Stem Cell Donation"));

    expect(openMock).toHaveBeenCalledWith("https://www.dkms.org/register-now", "_blank");
    expect(screen.queryByText("Stem Cell Donation")).not.toBeInTheDocument();
  });

  it("opens the NHS organ donation page and closes the dropdown", async () => {
    const user = userEvent.setup();
    render(<RedirectButton />);

    await user.click(screen.getByRole("button", { name: /donate now/i }));
    await user.click(screen.getByText("Organ Donation"));

    expect(openMock).toHaveBeenCalledWith("https://www.organdonation.nhs.uk", "_blank");
    expect(screen.queryByText("Organ Donation")).not.toBeInTheDocument();
  });

  it("closes the dropdown when clicking outside it", async () => {
    const user = userEvent.setup();
    render(<RedirectButton />);

    await user.click(screen.getByRole("button", { name: /donate now/i }));
    await user.click(document.body);

    expect(screen.queryByText("Stem Cell Donation")).not.toBeInTheDocument();
  });
});
