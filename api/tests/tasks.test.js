const request = require("supertest");
const app = require("../src/app");
const { pool } = require("../src/db");

describe("POST /tasks", () => {
  afterAll(async () => {
    await pool.end();
  });

  it("creates a task and returns it with status 201", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Write Phase 3 tests" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Write Phase 3 tests");
    expect(res.body.status).toBe("pending");
  });

  it("rejects a request with no title, returning 400", async () => {
    const res = await request(app).post("/tasks").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("title is required");
  });
});