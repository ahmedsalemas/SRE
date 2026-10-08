# DevOps Dummy App — Phase 1

A small task tracker: an API (Express), a background worker, and Postgres.
This is the one app you'll reuse for every phase of the curriculum — you
never rebuild it, you only add layers on top of it (Docker, Kubernetes,
CI/CD, Kafka, etc.).

## What's here

```
devops-dummy-app/
├── api/          # REST API — GET/POST /tasks, GET /health
├── worker/       # Background worker — polls Postgres for pending tasks
├── db/           # init.sql — schema, runs automatically on first Postgres start
└── docker-compose.yml   # Runs Postgres locally
```

## Run it (inside your WSL2 Ubuntu terminal)

### 1. Start Postgres

```bash
cd devops-dummy-app
docker compose up -d
docker compose ps    # confirm postgres shows "healthy"
```

### 2. Run the API

```bash
cd api
npm install
npm start
```

You should see `API listening on port 3000`. Leave this terminal open.

### 3. Confirm the health endpoint works

In a **new** terminal tab:

```bash
curl http://localhost:3000/health
# {"status":"ok","db":"connected"}
```

If you see `"db":"unreachable"`, Postgres isn't ready yet — check
`docker compose ps` and give it a few more seconds.

### 4. Try the task endpoints

```bash
# List tasks (should show the 2 seeded tasks)
curl http://localhost:3000/tasks

# Create a new task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Docker"}'

# Get a single task
curl http://localhost:3000/tasks/1
```

### 5. Run the worker

In a **third** terminal tab:

```bash
cd worker
npm install
npm start
```

Watch it: every 5 seconds it checks for `pending` tasks and marks them
`done`. Create a task via the API (step 4) and watch this terminal —
within 5 seconds you'll see `Processing task X: ...` and then
`curl http://localhost:3000/tasks` will show it as `done`.

## Phase 1 checklist (matches the curriculum doc)

- [x] REST API with 2-3 endpoints and a `/health` endpoint
- [x] Background worker process (polls today — becomes a Kafka consumer in Phase 12)
- [x] Postgres running locally, API connected to it
- [ ] **Push this to a Git repository** — you do this part:

```bash
git init
git add .
git commit -m "Phase 1: dummy app — API, worker, Postgres"
# create an empty repo on GitHub/GitLab first, then:
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

## Why it's built this way

- **All config comes from environment variables** (`DB_HOST`, `DB_PASSWORD`,
  etc.), never hardcoded. This is deliberate — Phase 4 injects these via
  ConfigMap/Secret, Phase 15 replaces the Secret with Vault, and the app
  code itself never has to change either time.
- **The worker polls instead of using a queue** — on purpose. It gets
  replaced with a real Kafka consumer in Phase 12. Don't over-build it now.
- **No Dockerfile yet** — that's Phase 2. Right now the API and worker run
  with plain `npm start` so you can verify the app logic works before you
  add containerization on top of it.

## Next: Phase 2

Once `/health` returns `ok`, tasks can be created/listed, and the worker
is flipping tasks to `done` — you're done with Phase 1. Say the word and
we'll write the Dockerfile and containerize both services.
# trigger test 2026-10-08T23:50:56Z
