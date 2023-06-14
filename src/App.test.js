import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders star wars character title", () => {
  render(<App />);
  const titleElement = screen.getByText(/star wars characters/i);
  expect(titleElement).toBeInTheDocument();
});
