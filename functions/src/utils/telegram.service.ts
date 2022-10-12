import axios from "axios";

import {TELEGRAM_URL} from "../assets/constants";

export async function sendTelegramMessage(chatId: number | string | undefined, message: string) {
  if (process.env.NODE_ENV === "test") return;

  const body = {
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown",
  };

  return axios.post(`${TELEGRAM_URL}/sendMessage`, body);
}
