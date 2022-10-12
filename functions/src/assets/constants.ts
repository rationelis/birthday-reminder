import fs from "fs";

export const API_TOKEN = process.env.API_TOKEN;
export const CHAT_ID = process.env.CHAT_ID;
export const FROM_ID = process.env.FROM_ID;
export const FROM_FIRST_NAME = process.env.FROM_FIRST_NAME;
export const AUTH_TOKEN = process.env.AUTH_TOKEN;
export const REF_PATH = "data/birthdays";
export const TELEGRAM_URL = `https://api.telegram.org/bot${API_TOKEN}`;
export const POST_BODY = JSON.parse(fs.readFileSync(process.cwd() + "/src/assets/example.json", "utf-8"));
export const LOCAL_API_DOMAIN = "http://localhost:5001/thoughtful-t-rex/us-central1";
