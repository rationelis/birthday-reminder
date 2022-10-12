import admin from "firebase-admin";
import * as functions from "firebase-functions";

import {AUTH_TOKEN, CHAT_ID, FROM_FIRST_NAME, FROM_ID} from "./assets/constants";
import {add, help, list, notFound, remove, thanks} from "./features";
import {getAge, getThisYearsBirthdayTimestamp, sendTelegramMessage} from "./helpers";
import {BirthdayEntry} from "./models";
import {getBirthdays} from "./utils/database";

admin.initializeApp();

export const start = functions.https.onRequest(async (request, response) => {
  if (
    parseInt(request.body.message.from.id, 10) !== parseInt(FROM_ID ?? "", 10) ||
    request.body.message.from.first_name !== FROM_FIRST_NAME
  ) {
    response.status(401).send();
    return;
  }

  if (request.method === "GET") {
    response.status(200).send();
    return;
  }

  if (!request.body || !request.body.message || !request.body.message.text) {
    response.status(200).send("Please supply a message");
    return;
  }

  const requestMessage: string = request.body.message.text;

  if (!requestMessage) {
    response.status(200).send();
    return;
  }

  const parts: Array<string> = requestMessage.split(" ");

  switch (parts[0].toLowerCase()) {
    case "help":
      help(response, request);
      break;
    case "add":
      add(response, request, parts);
      break;
    case "list":
      list(response, request);
      break;
    case "remove":
    case "delete":
      remove(response, request, parts);
      break;
    case "thanks":
      thanks(response, request);
      break;
    default:
      notFound(response, request, parts);
      break;
  }
});

export const checkIfBirthday = functions.https.onRequest(async (request, response) => {
  if (request.headers.authorization !== AUTH_TOKEN) {
    response.status(401).send();
    return;
  }

  let birthdays: Array<BirthdayEntry>;
  try {
    birthdays = await getBirthdays();
  } catch (error) {
    response.status(200).send("Retrieving birthdays failed!");
    return;
  }

  const today = new Date();

  const dd = today.getDate();
  const MM = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  const flatDate = new Date(`${yyyy}-${MM}-${dd}`).getTime();

  const messages: Array<any> = [];

  birthdays.forEach((birthday) => {
    const date = new Date(birthday.date);

    if (getThisYearsBirthdayTimestamp(new Date(), date) - flatDate === 0) {
      const message = `
        🦖 Rawr! It's *${birthday.name}*'s birthday today!\n🌋 (S)he turned ${getAge(date, new Date())}. Go congratulate!
      `;
      messages.push(sendTelegramMessage(CHAT_ID, message));
    }
  });

  const count = messages.length;
  await Promise.all(messages);

  response.status(200).send({count: count});
});
