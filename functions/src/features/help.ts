import {Request, Response} from "firebase-functions/v1";

import {sendTelegramMessage} from "../helpers";

export async function help(response: Response, request: Request) {
  await sendTelegramMessage(
      request.body.message.chat.id,
      "🦖 Rawr! I can do the following things:"
  );

  await sendTelegramMessage(
      request.body.message.chat.id,
      "➕ Adding a birthday.\nUsage: `add [NAME] [DATE]`\nDate format: `dd-MM-yyyy`"
  );

  await sendTelegramMessage(
      request.body.message.chat.id,
      "📙 List all birthdays.\nUsage: `list`"
  );

  await sendTelegramMessage(
      request.body.message.chat.id,
      "🗑️ Remove a birthday.\nUsage: `remove OR delete [NAME]`"
  );

  response.status(200).send();
}
