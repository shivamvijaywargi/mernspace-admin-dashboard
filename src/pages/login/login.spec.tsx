import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./login-page";

describe("Login page", () => {
  it("should render with required fields", () => {
    render(<LoginPage />);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("john@gmail.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Remember me" })
    ).toBeInTheDocument();
    expect(screen.getByText(/Forgot password/i)).toBeInTheDocument();
  });
});
