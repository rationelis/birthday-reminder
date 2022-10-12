import axios from "axios";

import {AUTH_TOKEN, CHAT_ID, FROM_FIRST_NAME, FROM_ID, LOCAL_API_DOMAIN, POST_BODY} from "./assets/constants";

let body: any;

beforeAll(() => {
  body = POST_BODY;
  body.message.chat.id = CHAT_ID;
  body.message.from.id = FROM_ID;
  body.message.from.first_name = FROM_FIRST_NAME;
});

async function undoAdditions() {
  body.message.text = "remove Cornee";

  let response;
  try {
    response = await axios.post(LOCAL_API_DOMAIN + "/start", body);
  } catch (error) {
    fail(error);
  }

  expect(response.status).toBe(200);
}

describe("Testing /start", () => {
  it("not supplying a message should fail", async () => {
    body.message.text = "";

    try {
      await axios.post(LOCAL_API_DOMAIN + "/start", body);
    } catch (error: any) {
      expect(error.response.data).toEqual("Please supply a message");
    }
  });

  it("providing no chat id should throw 401", async () => {
    body.message.text = "";
    body.message.chat.id = 0;

    try {
      await axios.post(LOCAL_API_DOMAIN + "/start", body);
    } catch (error: any) {
      expect(error.response.status).toBe(401);
    }

    body.message.from.id = FROM_ID;
  });

  it("providing no first name should throw 401", async () => {
    body.message.text = "";
    body.message.chat.first_name = "";

    try {
      await axios.post(LOCAL_API_DOMAIN + "/start", body);
    } catch (error: any) {
      expect(error.response.status).toBe(401);
    }

    body.message.from.first_name = FROM_FIRST_NAME;
  });
});

describe("Testing /checkIfBirthday", () => {
  it("empty database should fail", async () => {
    try {
      await axios.get(LOCAL_API_DOMAIN + "/checkIfBirthday", {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
    } catch (error: any) {
      expect(error.response.data).toEqual("Retrieving birthdays failed!");
    }
  });

  it("providing no Authorization token should throw 401", async () => {
    try {
      await axios.get(LOCAL_API_DOMAIN + "/checkIfBirthday");
    } catch (error: any) {
      expect(error.response.status).toBe(401);
    }
  });

  it("should sent no birthday reminder", async () => {
    body.message.text = "add Cornee 01-01-2022";

    try {
      await axios.post(LOCAL_API_DOMAIN + "/start", body);
    } catch (error) {
      fail(error);
    }

    let response;
    try {
      response = await axios.post(LOCAL_API_DOMAIN + "/checkIfBirthday", body, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
    } catch (error) {
      fail(error);
    }

    expect(response.status).toBe(200);
    expect(response.data.count).toBe(0);

    await undoAdditions();
  });

  it("should send 1 birthday reminder", async () => {
    const today = new Date();

    const dd = today.getDate();
    const MM = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    const flatDate = `${dd}-${MM}-${yyyy}`;

    body.message.text = "add Cornee " + flatDate;

    try {
      await axios.post(LOCAL_API_DOMAIN + "/start", body);
    } catch (error) {
      fail(error);
    }

    let response;
    try {
      response = await axios.post(LOCAL_API_DOMAIN + "/checkIfBirthday", body, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
    } catch (error) {
      fail(error);
    }

    expect(response.status).toBe(200);
    expect(response.data.count).toBe(1);

    await undoAdditions();
  });

  it("should send 10 birthday reminders", async () => {
    const today = new Date();

    const dd = today.getDate();
    const MM = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    const flatDate = `${dd}-${MM}-${yyyy}`;

    body.message.text = "add Cornee " + flatDate;

    try {
      for (let i = 0; i < 10; i++) {
        await axios.post(LOCAL_API_DOMAIN + "/start", body);
      }
    } catch (error) {
      fail(error);
    }

    let response;
    try {
      response = await axios.post(LOCAL_API_DOMAIN + "/checkIfBirthday", body, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
    } catch (error) {
      fail(error);
    }

    expect(response.status).toBe(200);
    expect(response.data.count).toBe(10);

    await undoAdditions();
  });
});
