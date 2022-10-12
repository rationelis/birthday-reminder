import {Request, Response} from "firebase-functions/v1";

import {formatDate, getAge, getSubsequentStrings, isValidDateString, sendTelegramMessage} from "../helpers";
import {BirthdayEntry} from "../models";
import {addBirthday} from "../utils/database";

export async function add(response: Response, request: Request, text: Array<string>) {
  if (text.length <= 2) {
    await sendTelegramMessage(
        request.body.message.chat.id,
        "🌋Incorrect usage. Use `add [NAME] [DATE]`"
    );
    response.status(200).send("Incorrect usage");
    return;
  }

  const inputDate = text[text.length - 1];

  if (!isValidDateString(inputDate)) {
    await sendTelegramMessage(
        request.body.message.chat.id,
        "🌋Invalid date. Format: `dd-MM-yyyy`"
    );
    response.status(200).send("Invalid date");
    return;
  }

  const inputDateParts = inputDate.split("-");
  const date = new Date(`${inputDateParts[2]}-${inputDateParts[1]}-${inputDateParts[0]}`);

  const data: BirthdayEntry = {
    name: getSubsequentStrings(1, text),
    date: date.getTime(),
  };

  try {
    await addBirthday(data);
  } catch (error) {
    await sendTelegramMessage(
        request.body.message.chat.id,
        "🌋Not so rawr... Adding birthday failed."
    );
    response.status(200).send("Adding birthday failed.");
    return;
  }

  const message = `Added *${data.name}* ${getAge(date, new Date())} (${formatDate(date)})`;

  await sendTelegramMessage(request.body.message.chat.id, `🦖 Rawr! ${message}`);
  response.status(200).send();
}
