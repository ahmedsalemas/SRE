const { pool } = require("./db");

const POLL_INTERVAL_MS = 5000;

// PHASE 1 NOTE: this worker polls Postgres directly for pending tasks.
// From Phase 12 onward, this polling loop gets replaced by a Kafka
// consumer — the API will publish a "task.created" event instead of
// the worker having to poll. Keeping this simple for now is intentional.
async function processPendingTasks() {
  try {
    const { rows } = await pool.query(
      "SELECT id, title FROM tasks WHERE status = 'pending' LIMIT 5"
    );

    for (const task of rows) {
      console.log(`Processing task ${task.id}: ${task.title}`);
      await pool.query(
        "UPDATE tasks SET status = 'done', processed_at = NOW() WHERE id = $1",
        [task.id]
      );
    }

    if (rows.length > 0) {
      console.log(`Processed ${rows.length} task(s)`);
    }
  } catch (err) {
    console.error("Worker error:", err.message);
  }
}

console.log("Worker started, polling every", POLL_INTERVAL_MS, "ms");
setInterval(processPendingTasks, POLL_INTERVAL_MS);
