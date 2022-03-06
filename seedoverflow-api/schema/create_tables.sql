CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    user_number SERIAL,
    uuid uuid NOT NULL DEFAULT uuid_generate_v4 (),
    first_name varchar(128) DEFAULT NULL,
    last_name varchar(128) DEFAULT NULL,
    username varchar(32) NOT NULL,
    password_hash varchar(255) NOT NULL,
    email varchar(320) NOT NULL UNIQUE,
    PRIMARY KEY(uuid)
);

CREATE TABLE IF NOT EXISTS seeds (
    seed varchar(64) UNIQUE NOT NULL,
    submitted_by uuid NOT NULL,
    PRIMARY KEY(seed),
    CONSTRAINT seed_submission_user
        FOREIGN KEY(submitted_by)
            REFERENCES users(uuid)
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_tracking (
    user_uuid uuid NOT NULL UNIQUE,
    last_login_date timestamptz,
    CONSTRAINT user_row
        FOREIGN KEY(user_uuid)
            REFERENCES users(uuid)
            ON DELETE CASCADE
);

INSERT INTO users (
    uuid,
    first_name,
    last_name,
    username,
    password_hash,
    email
) VALUES (
    '5c35bc86-1f50-4e2c-a0a2-d52be61bcf70',
    'Admin',
    'User',
    'Admin',
    '87C4082F169DDD333EF0EEF34DC8E3458CBB457CEF562A2E50454506F5FECD6B',
    'admin@admin.com'
);

INSERT INTO users (
    uuid,
    first_name,
    last_name,
    username,
    password_hash,
    email
) VALUES (
    '4325bc86-1efw-4e2c-a0a2-d52fewfwef',
    'Admin2',
    'User',
    'Admin',
    '3B996C16D29DF1AD762EA149AEE225EDA5983D4FD25F38A7BF30D90A0B5D12EE',
    'admin2@admin.com'
);