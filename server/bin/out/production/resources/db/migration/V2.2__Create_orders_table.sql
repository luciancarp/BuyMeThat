CREATE TABLE orders_table (
  id Serial PRIMARY KEY,
  neederId varchar(21) not null references users_table(id),
  providerId varchar(21) references users_table(id),
  name Text,
  description Text,
  status Text NOT NULL,
  firstName text,
  lastName text
);