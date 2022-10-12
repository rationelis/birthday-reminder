import {getDatabase} from "firebase-admin/database";
import * as functions from "firebase-functions";

import {REF_PATH} from "../assets/constants";
import {getThisYearsBirthdayTimestamp} from "../helpers";
import {BirthdayEntry} from "../models";

export async function addBirthday(data: BirthdayEntry): Promise<void> {
  const db = getDatabase();

  try {
    await db.ref(REF_PATH).push().set(data);
    functions.logger.log("Birthday added.", data);
  } catch (error) {
    functions.logger.error("Adding birthday failed!", error);
    throw error;
  }
}

export async function removeBirthday(name: string): Promise<void> {
  const db = getDatabase();

  const data = await db.ref(REF_PATH).orderByChild("name").equalTo(name).once("value");

  if (data.numChildren() === 0) {
    throw new Error(`🌋Not so rawr... Cannot find *${name}*.`);
  }

  const toBeDeleted: Array<Promise<void>> = [];

  data.forEach((birthday) => {
    toBeDeleted.push(db.ref(REF_PATH + "/" + birthday.key).remove());
  });

  try {
    await Promise.all(toBeDeleted);
    functions.logger.log("Birthday(s) deleted.", name);
  } catch (error) {
    functions.logger.error("Deleting birthday failed!", error);
    throw new Error("🌋Not so rawr... Deleting birthday failed.");
  }
}

export async function getBirthdays(): Promise<Array<BirthdayEntry>> {
  const db = getDatabase();

  let data;
  try {
    data = await db.ref(REF_PATH).once("value");
  } catch (error) {
    functions.logger.error("Retrieving birthdays failed!", error);
    throw new Error("🌋Not so rawr... Retrieving birthdays failed.");
  }

  if (data.numChildren() == 0) {
    throw new Error("🦖 Rawr! No birthdays are in the database.");
  }

  const birthdays: Array<BirthdayEntry> = [];

  data.forEach((birthday) => {
    birthdays.push({
      name: birthday.val().name,
      date: birthday.val().date,
      thisYearsBirthday: getThisYearsBirthdayTimestamp(new Date(), new Date(birthday.val().date)),
    } as BirthdayEntry);
  });

  return birthdays;
}
