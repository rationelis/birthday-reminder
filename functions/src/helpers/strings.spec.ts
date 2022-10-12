import * as functions from "./strings";

describe("Testing onlyLetters", () => {
  it("expect \"letters\" only to contain letters", () => {
    expect(functions.onlyLetters("letters")).toBeTruthy();
  });

  it("expect \"letters1\" to contain a number", () => {
    expect(functions.onlyLetters("letters1")).toBeFalsy();
  });
});

describe("Testing getSubsequentStrings", () => {
  it("expect the right string to be returned", () => {
    const parts = ["add", "Cornee", "is", "a", "legend", "01-01-1970"];
    expect(functions.getSubsequentStrings(1, parts)).toBe("Cornee is a legend");
  });

  it("expect the startIndex to work", () => {
    const parts = ["add", "0", "Cornee", "01-01-1970"];
    expect(functions.getSubsequentStrings(2, parts)).toBe("Cornee");
  });
});

