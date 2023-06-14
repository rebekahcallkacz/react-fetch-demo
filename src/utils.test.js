import { createButtonLabel } from "./utils";

const PERSON_1 = {
  name: "Rebekah",
  gender: "female",
  mass: 70,
};

const EXPECTED_PERSON_LABEL_1 = "Rebekah | female | 70";

const PERSON_2 = {
  name: "Rebekah",
  gender: "female",
  mass: undefined,
};

const EXPECTED_PERSON_LABEL_2 = "Rebekah | female | unknown";

test("returns formatted person string", () => {
  const personLabel = createButtonLabel(PERSON_1);
  expect(personLabel).toEqual(EXPECTED_PERSON_LABEL_1);
});

test("returns formatted person string when mass is unknown", () => {
  const personLabel = createButtonLabel(PERSON_2);
  expect(personLabel).toEqual(EXPECTED_PERSON_LABEL_2);
});
