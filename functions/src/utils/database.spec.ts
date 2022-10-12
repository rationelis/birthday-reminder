import {FirebaseDatabase} from "@firebase/database-types";
import {
  // assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import fs from "fs";

import {REF_PATH} from "../assets/constants";

let firebaseTestEnvironment: RulesTestEnvironment;
let db: FirebaseDatabase;

beforeEach(async () => {
  firebaseTestEnvironment = await initializeTestEnvironment({
    projectId: "thoughtful-t-rex",
    database: {
      host: "localhost",
      port: 9000,
      rules: fs.readFileSync("./../database.rules.json", "utf-8"),
    },
  });

  db = firebaseTestEnvironment.authenticatedContext("testuid", {}).database();
});

afterEach(async () => {
  await firebaseTestEnvironment.clearDatabase();
});

afterAll(async () => {
  await db.app.delete();
});

it("try to insert a birthday", async () => {
  const birthday = db.ref(REF_PATH).push().set({name: "Cornee", date: new Date().getTime()});
  await assertSucceeds(birthday);
});

it("try to bulk insert 10 birthdays", async () => {
  const ref = db.ref(REF_PATH);

  const toBeAdded = [];

  for (let i = 0; i < 10; i++) {
    toBeAdded.push(ref.push().set({name: "Cornee", date: new Date().getTime()}));
  }

  await Promise.all(toBeAdded);

  const data = await ref.once("value");

  expect(data.numChildren()).toBe(10);
});

it("try to delete birthday", async () => {
  const birthday = {name: "Cornee", date: new Date().getTime()};

  await db.ref(REF_PATH).push().set(birthday);

  const data = await db.ref(REF_PATH).orderByChild("name").equalTo(birthday.name).once("value");

  if (data.numChildren() == 0) {
    fail("Insert birthday not found.");
  }
  const toBeDeleted: Array<Promise<void>> = [];

  data.forEach((birthday) => {
    toBeDeleted.push(db.ref(REF_PATH + "/" + birthday.key).remove());
  });

  await assertSucceeds(Promise.all(toBeDeleted));
});
