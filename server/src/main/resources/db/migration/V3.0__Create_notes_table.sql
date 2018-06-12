CREATE TABLE notes_table (
  id Serial PRIMARY KEY,
  orderId int not null references orders_table(id),
  authorId varchar(21) not null references users_table(id),
  authorName text not null,
  time text not null,
  content text not null
);