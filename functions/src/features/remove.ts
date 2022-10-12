import {Request, Response} from "firebase-functions/v1";

import {getSubsequentStrings, sendTelegramMessage} from "../helpers";
import {removeBirthday} from "../utils/database";

export async function remove(response: Response, request: Request, text: Array<string>) {
  if (text.length <= 1) {
    await sendTelegramMessage(
        request.body.message.chat.id,
        "🌋Incorrect usage. Use `remove OR delete [NAME]`"
    );
    response.status(200).send("Invalid usage");
    return;
  }

  try {
    await removeBirthday(getSubsequentStrings(1, text));
  } catch (error: any) {
    await sendTelegramMessage(request.body.message.chat.id, error.message);
    response.status(200).send("Deleting birthday failed");
    return;
  }

  await sendTelegramMessage(request.body.message.chat.id, "🦖 Rawr! Done deleting birthday(s)");
  response.status(200).send();
}
