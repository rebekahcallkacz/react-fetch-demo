import { render, screen } from "@testing-library/react";
import Button from "./Button";

const PERSON_1 = {
  name: "Rebekah",
  gender: "female",
  mass: 70,
};

test("renders button", () => {
  render(
    <Button person={PERSON_1} onClick={console.log} value={PERSON_1.name} />
  );
  const buttonElement = screen.getByText(/rebekah | female | 70/i);
  expect(buttonElement).toBeInTheDocument();
});
