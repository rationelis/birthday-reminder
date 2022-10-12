import axios from "axios";

import {CHAT_ID, FROM_FIRST_NAME, FROM_ID, LOCAL_API_DOMAIN, POST_BODY} from "../assets/constants";

let body: any;

beforeAll(() => {
  body = POST_BODY;
  body.message.chat.id = CHAT_ID;
  body.message.from.id = FROM_ID;
  body.message.from.first_name = FROM_FIRST_NAME;
});

it("remove without name should fail", async () => {
  body.message.text = "remove";

  try {
    await axios.post(LOCAL_API_DOMAIN + "/start", body);
  } catch (error: any) {
    expect(error.response.data).toEqual("Invalid usage");
  }
});

it("remove with name that cannot be found should fail", async () => {
  body.message.text = "remove personthatdoesnotexist";

  try {
    await axios.post(LOCAL_API_DOMAIN + "/start", body);
  } catch (error: any) {
    expect(error.response.data).toEqual("Deleting birthday failed");
  }
});

it("remove with name that can be found should return 200", async () => {
  body.message.text = "add Cornee 26-08-1999";


  try {
    await axios.post(LOCAL_API_DOMAIN + "/start", body);
  } catch (error) {
    fail(error);
  }

  body.message.text = "remove Cornee";

  let response;
  try {
    response = await axios.post(LOCAL_API_DOMAIN + "/start", body);
  } catch (error) {
    fail(error);
  }

  expect(response.status).toBe(200);
});

