CREATE TABLE IF NOT EXISTS users (
    id                   VARCHAR(50) DEFAULT(UUID()),
    email                VARCHAR(200) NOT NULL UNIQUE,
    hashPassword         VARCHAR(200) NOT NULL,
    firstName            VARCHAR(50) NOT NULL,
    lastName             VARCHAR(50),
    phoneNumber          INT,
    bio                     VARCHAR(300),
    isAdmin             TINYINT DEFAULT(0),
    dateCreated          DATE DEFAULT (CURRENT_DATE),

    PRIMARY KEY (id)
);