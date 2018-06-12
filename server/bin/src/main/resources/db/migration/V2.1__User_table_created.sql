CREATE TABLE users_table (
  id varchar(21) primary key,
  email Text not null unique,
  userType Int not null,
  firstName Text,
  lastName Text
);