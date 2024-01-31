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

const PERSON_3 = {
  name: undefined,
  gender: "female",
  mass: 70,
};

const EXPECTED_PERSON_LABEL_3 = "unknown | female | 70";

const PERSON_4 = {
  name: "Rebekah",
  gender: null,
  mass: undefined,
};

const EXPECTED_PERSON_LABEL_4 = "Rebekah | unknown | unknown";

test("returns formatted person string", () => {
  const personLabel = createButtonLabel(PERSON_1);
  expect(personLabel).toEqual(EXPECTED_PERSON_LABEL_1);
});

test("returns formatted person string when mass is undefined", () => {
  const personLabel = createButtonLabel(PERSON_2);
  expect(personLabel).toEqual(EXPECTED_PERSON_LABEL_2);
});

test("returns formatted person string when name is undefined", () => {
  const personLabel = createButtonLabel(PERSON_3);
  expect(personLabel).toEqual(EXPECTED_PERSON_LABEL_3);
});

test("returns formatted person string when gender is null", () => {
  const personLabel = createButtonLabel(PERSON_4);
  expect(personLabel).toEqual(EXPECTED_PERSON_LABEL_4);
});
