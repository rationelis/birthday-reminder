import {Request, Response} from "firebase-functions/v1";

import {sendTelegramMessage} from "../helpers";

export async function thanks(response: Response, request: Request) {
  await sendTelegramMessage(
      request.body.message.chat.id,
      "🦖 Rawr! No problem!"
  );

  response.status(200).send();
}
