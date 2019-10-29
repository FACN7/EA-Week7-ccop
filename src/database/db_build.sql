
BEGIN;
    DROP TABLE IF EXISTS users,transactions;

    CREATE TABLE
    IF NOT EXISTS users(
        name VARCHAR(50) NOT NULL,
        email VARCHAR (50) PRIMARY KEY,
        password VARCHAR (16) NOT NULL 
    );

    CREATE TABLE
    IF NOT EXISTS transactions(
        email VARCHAR (50),
        balance INTEGER NOT NULL,
        descrip VARCHAR (50) NOT NULL,
        FOREIGN KEY (email) REFERENCES users (email)
    );





COMMIT;