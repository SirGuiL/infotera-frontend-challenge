import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CheckoutPage from "@/app/checkout/page";

jest.mock("@/store/bookingStore", () => ({
  useBookingStore: jest.fn(),
}));

describe("CheckoutPage", () => {
  it("renders a span", () => {
    render(<CheckoutPage />);

    const spanElement = screen.getByText("Finalize sua reserva!");

    expect(spanElement).toBeInTheDocument();
  });
});
