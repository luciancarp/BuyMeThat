CREATE TABLE example_table (
  id SERIAL PRIMARY KEY,
  name Text NOT NULL
);

INSERT INTO example_table (name) VALUES
  ('Matt'), ('Jay'), ('Max'), ('Lucian'), ('William '), ('Tariq');