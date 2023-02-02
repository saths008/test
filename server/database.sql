CREATE DATABASE jwttutorial;

--creation of users table and creates schema
CREATE TABLE users(
user_id uuid PRIMARY KEY DEFAULT 
uuid_generate_v4(),
--uuid is a complex primary key
--uuid_generate_v4() creates a uuid
user_name VARCHAR(255) NOT NULL,
user_email VARCHAR(255) NOT NULL,
user_password VARCHAR(255) NOT NULL
);


INSERT INTO users(user_name, user_email, user_password) 
VALUES ('Saath', 'saathsatheesh@gmail.com', 'Password123');