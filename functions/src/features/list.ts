import {Request, Response} from "firebase-functions/v1";

import {formatDate, getAge, sendTelegramMessage} from "../helpers";
import {BirthdayEntry} from "../models";
import {getBirthdays} from "../utils/database";

export async function list(response: Response, request: Request) {
  let birthdays: Array<BirthdayEntry>;
  try {
    birthdays = await getBirthdays();
  } catch (error: any) {
    await sendTelegramMessage(
        request.body.message.chat.id,
        error.message
    );
    response.status(200).send("Retrieving birthdays failed");
    return;
  }

  birthdays.sort((a, b) => {
    if (!a.thisYearsBirthday || !b.thisYearsBirthday) return 0;
    return a.thisYearsBirthday - b.thisYearsBirthday;
  });

  const birthdaysCopy = birthdays.slice();

  const today = new Date().getTime();

  for (let i = 0; i < birthdays.length; i++) {
    const thisYearsBirthday = birthdays[i].thisYearsBirthday;
    if (!thisYearsBirthday) return;

    if (thisYearsBirthday - today > 0) {
      break;
    }

    const old = birthdaysCopy.shift();
    if (old) birthdaysCopy.push(old);
  }

  let list = "";

  birthdaysCopy.forEach((birthday) => {
    const date = new Date(birthday.date);
    const age = getAge(date, new Date());
    const formattedDate = formatDate(date);

    list += `${birthday.name} ${age} (${formattedDate})\n`;
  });

  await sendTelegramMessage(
      request.body.message.chat.id,
      `🦖 Rawr! I know of these *${birthdays.length}* birthdays:`
  );
  await sendTelegramMessage(request.body.message.chat.id, list);
  response.status(200).send();
}
