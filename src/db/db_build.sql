BEGIN;

DROP TABLE IF EXISTS users, scores CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(80) UNIQUE NOT NULL,
  pw_hash VARCHAR(100) NOT NULL,
  admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  score FLOAT(4) NOT NULL, -- should give about 7 decimal places (4-bytes worth)
  emotion VARCHAR(20),
  img VARCHAR(100)
)

INSERT INTO users (name,email,pw_hash) VALUES
('Nicolas Cage', 'nicolas@cage.com', 'placeholder'),
('Harry', 'harry@potter.com', 'placeholder');

INSERT INTO scores (user_id, score, emotion, img) VALUES
(1, 1000.97657, 'Anger', 'nicolascage-anger-1' ), -- last number should be score id
(2, 1.4736, 'Sadness', 'harry-sadness-1'), -- may need to include file extension at end of img
(2, 20.4736, 'Disgust', 'harry-disgust-1');

COMMIT;