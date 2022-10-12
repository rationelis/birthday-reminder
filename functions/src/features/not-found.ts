import {Request, Response} from "firebase-functions/v1";

import {sendTelegramMessage} from "../helpers";

export async function notFound(response: Response, request: Request, text: Array<string>) {
  await sendTelegramMessage(
      request.body.message.chat.id,
      `🌋Command \`${text[0]}\` found. Try trying \`help\``
  );

  response.status(200).send();
}
