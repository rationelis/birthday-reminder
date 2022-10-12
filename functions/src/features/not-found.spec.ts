import axios from "axios";

import {CHAT_ID, FROM_FIRST_NAME, FROM_ID, LOCAL_API_DOMAIN, POST_BODY} from "../assets/constants";

let body: any;

beforeAll(() => {
  body = POST_BODY;
  body.message.chat.id = CHAT_ID;
  body.message.from.id = FROM_ID;
  body.message.from.first_name = FROM_FIRST_NAME;
});

it("not-found message should return 200", async () => {
  body.message.text = "featurethatdoesnotexist";

  let response;
  try {
    response = await axios.post(LOCAL_API_DOMAIN + "/start", body);
  } catch (error) {
    fail(error);
  }

  expect(response?.status).toBe(200);
});
