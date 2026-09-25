-- Initial schema for the DevOps dummy app
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    processed_at TIMESTAMP
);

INSERT INTO tasks (title, status) VALUES
    ('Set up Docker', 'pending'),
    ('Deploy to Kubernetes', 'pending')
ON CONFLICT DO NOTHING;
