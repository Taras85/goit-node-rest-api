//  відповідь повина мати статус-код 200
//  у відповіді повинен повертатися токен
//  у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

import request from 'supertest';
import app from '../app.js';

describe("POST /login", () => {
  it("test login controller", async () => {
    const testData = {
      email: "vika@com.ua",
      password: "123456",
    };

    const res = await request(app).post("/api/users/login").send(testData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toHaveProperty("email");
    expect(typeof res.body.user.email).toBe("string");
    expect(res.body.user).toHaveProperty("subscription");
    expect(typeof res.body.user.subscription).toBe("string");
  });
});