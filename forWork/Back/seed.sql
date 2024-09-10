-- Table for Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    token VARCHAR,
    google_id VARCHAR UNIQUE,
    facebook_id VARCHAR UNIQUE,
    name VARCHAR(64) NOT NULL,
    is_male BOOLEAN,
    birthday DATE CHECK (birthday <= CURRENT_DATE),
    email VARCHAR NOT NULL UNIQUE,
    password TEXT NOT NULL,
    img_path TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Tasks
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    body VARCHAR(256) NOT NULL,
    is_done BOOLEAN DEFAULT false,
    is_delete BOOLEAN DEFAULT false,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for ThemeSwitch
CREATE TABLE themeswitches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    theme BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Chats
CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Messages
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    text VARCHAR(300) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id),
    chat_id INTEGER NOT NULL REFERENCES chats(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for UserChat (Many-to-Many relationship between Users and Chats)
CREATE TABLE userchats (
    user_id INTEGER REFERENCES users(id),
    chat_id INTEGER REFERENCES chats(id),
    PRIMARY KEY (user_id, chat_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);






INSERT INTO users (name, email, password)
VALUES ('Bot0','Bot0VladHordiienko@gmail.com','1adqqwergAA0');

INSERT INTO users (name, email, password)
VALUES ('Bot1','Bot1VladHordiienko@gmail.com','1adqqwergAA1');

INSERT INTO users (name, email, password)
VALUES ('Bot2','Bot2VladHordiienko@gmail.com','2adqqwergAA2');

INSERT INTO themeswitches (name)
VALUES ('theme');