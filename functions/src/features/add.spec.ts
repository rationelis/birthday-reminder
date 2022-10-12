import axios from "axios";

import {CHAT_ID, FROM_FIRST_NAME, FROM_ID, LOCAL_API_DOMAIN, POST_BODY} from "../assets/constants";

let body: any;

beforeAll(() => {
  body = POST_BODY;
  body.message.chat.id = CHAT_ID;
  body.message.from.id = FROM_ID;
  body.message.from.first_name = FROM_FIRST_NAME;
});

it("add without parameters should fail", async () => {
  body.message.text = "add";

  try {
    await axios.post(LOCAL_API_DOMAIN + "/start", body);
  } catch (error: any) {
    expect(error.response.data).toEqual("Incorrect usage");
  }
});

it("add with name and without date should fail", async () => {
  body.message.text = "add Cornee";

  try {
    await axios.post(LOCAL_API_DOMAIN + "/start", body);
  } catch (error: any) {
    expect(error.response.data).toEqual("Incorrect usage");
  }
});

it("add with invalid date should fail", async () => {
  body.message.text = "add Cornee 10.10-2000";

  try {
    await axios.post(LOCAL_API_DOMAIN + "/start", body);
  } catch (error: any) {
    expect(error.response.data).toEqual("Invalid date");
  }
});

it("add with valid inputs should return 200", async () => {
  body.message.text = "add Cornee 26-08-1999";

  let response;
  try {
    response = await axios.post(LOCAL_API_DOMAIN + "/start", body);
  } catch (error) {
    fail(error);
  }

  expect(response.status).toBe(200);
});
