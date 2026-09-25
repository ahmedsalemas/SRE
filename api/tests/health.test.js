const request = require("supertest");
const app = require("../src/app");
const { pool } = require("../src/db");

describe("GET /health", () => {
  afterAll(async () => {
    await pool.end();
  });

  it("returns 200 and db: connected when the database is reachable", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.db).toBe("connected");
  });
});
