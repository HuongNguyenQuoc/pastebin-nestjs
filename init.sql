CREATE TABLE IF NOT EXISTS pastes (
  shortlink CHAR(7) PRIMARY KEY,
  content TEXT NOT NULL,
  expiration_length_in_minutes INT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pastes_created_at ON pastes (created_at);