DROP TABLE notes_table;

DROP TABLE orders_table;

drop table users_table;

CREATE TABLE users_table (
  id varchar(21) primary key,
  email Text not null unique,
  userType Int not null,
  firstName Text,
  lastName Text
);

CREATE TABLE orders_table (
  id Serial PRIMARY KEY,
  neederId varchar(21) not null references users_table(id),
  providerId varchar(21) references users_table(id),
  providerName text,
  name Text,
  description Text,
  status Text NOT NULL,
  firstName text,
  lastName text,
  time text NOT NULL,
  url text
);

INSERT INTO users_table (id, email, userType, firstName, lastName)
    VALUES ('105753428719543221418', 'buymethattest@gmail.com', 3, 'Buy', 'MeThat');

INSERT INTO users_table (id, email, userType, firstName, lastName)
    VALUES ('000000000000000000000', 'Deleted', -1, 'User', 'Deleted');

CREATE TABLE notes_table (
  id Serial PRIMARY KEY,
  orderId int not null references orders_table(id),
  authorId varchar(21) not null references users_table(id),
  authorName text not null,
  time text not null,
  content text not null
);