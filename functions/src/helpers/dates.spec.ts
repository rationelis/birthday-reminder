import * as functions from "./dates";

describe("Testing getAge", () => {
  it("expect someone born on the 26th of August 1999 to be 23 on the 10th of October 2022", () => {
    const birthday = new Date("1999-08-26");
    const momentInTime = new Date("2022-10-11");
    const age = functions.getAge(birthday, momentInTime);
    expect(age).toBe(23);
  });

  it("expect someone born on the 13th of October 1977 to be 44 on the 12th of October 2022", () => {
    const birthday = new Date("1977-10-13");
    const momentInTime = new Date("2022-10-12");
    const age = functions.getAge(birthday, momentInTime);
    expect(age).toBe(44);
  });

  it("expect someone born on the 13th of October 1977 to be 45 on the 13th of October 2022", () => {
    const birthday = new Date("1977-10-13");
    const momentInTime = new Date("2022-10-13");
    const age = functions.getAge(birthday, momentInTime);
    expect(age).toBe(45);
  });
});

describe("Testing formatDate", () => {
  it("expect someone new Date(\"1999-08-26\") to be \"26-08-1999\"", () => {
    const date = new Date("1999-08-26");
    expect(functions.formatDate(date)).toBe("26-08-1999");
  });

  it("expect someone new Date(\"2000-12-11\") to be \"11-12-2000\"", () => {
    const date = new Date("2000-12-11");
    expect(functions.formatDate(date)).toBe("11-12-2000");
  });

  it("expect someone new Date(\"2000-1-1\") to be \"01-01-2000\"", () => {
    const date = new Date("2000-1-1");
    expect(functions.formatDate(date)).toBe("01-01-2000");
  });
});

describe("Testing getThisYearsBirthdayTimestamp", () => {
  it("expect someone's birthday to be on the 5th of May 2022", () => {
    const thisYear = new Date("2022-10-11");
    const birthday = new Date("2005-05-10");
    expect(functions.getThisYearsBirthdayTimestamp(thisYear, birthday)).toBe(1652133600000);
  });

  it("expect someone's birthday to be on the 26th of January 2022", () => {
    const thisYear = new Date("2022-10-11");
    const birthday = new Date("2005-01-26");
    expect(functions.getThisYearsBirthdayTimestamp(thisYear, birthday)).toBe(1643151600000);
  });
});

describe("Testing isValidDateString", () => {
  it("expect \"12.07.2022\" to be an invalid date", () => {
    const date = "12.07.2022";
    expect(functions.isValidDateString(date)).toBeFalsy();
  });

  it("expect \"12-07-2022\" to be a valid date", () => {
    const date = "12-07-2022";
    expect(functions.isValidDateString(date)).toBeTruthy();
  });

  it("expect \"12-7-2022\" to be an invalid date", () => {
    const date = "12-7-2022";
    expect(functions.isValidDateString(date)).toBeFalsy();
  });
});
