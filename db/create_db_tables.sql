CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30),
  hash_value TEXT
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  person_id INTEGER,
  title TEXT,
  post TEXT
  FOREIGN KEY (person_id) REFERENCES person (id)
);


INSERT INTO posts (person_id, title, post)
VALUES (28, 'test', 'test post');
