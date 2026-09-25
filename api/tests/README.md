# Test Suite Notes

- `health.test.js`, `tasks.test.js` — integration tests. They run against
  the real Postgres container defined in docker-compose.yml, not a mock.
  This verifies the full path: Express → pg pool → real database.
- No pure unit tests with a mocked DB exist yet. A true unit test would
  replace `pool.query` with a Jest mock (`jest.mock('../src/db')`) to
  test route logic in isolation from the database entirely.