
BEGIN;
    DROP TABLE IF EXISTS users,transactions;

    CREATE TABLE
    IF NOT EXISTS users(
        name VARCHAR(50) NOT NULL,
        email VARCHAR (50) PRIMARY KEY,
        password TEXT NOT NULL 
    );

    CREATE TABLE
    IF NOT EXISTS transactions(
        email VARCHAR (50),
        trans_id SERIAL,
        balance INTEGER NOT NULL,
        descrip VARCHAR (50) NOT NULL,
        date DATE DEFAULT CURRENT_DATE,
        FOREIGN KEY (email) REFERENCES users (email)
    );





COMMIT;