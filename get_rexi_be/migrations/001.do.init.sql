CREATE TABLE IF NOT EXISTS pets (
   id                VARCHAR(50) DEFAULT(UUID()),
   type              VARCHAR(50) NOT NULL,
   name              VARCHAR(200) NOT NULL,
   status            VARCHAR(50) NOT NULL,
   color             VARCHAR(50),
   breed             VARCHAR(50),
   bio               VARCHAR(200),
   height            INT,
   weight            INT,
   dietary           VARCHAR(100),
   hypoallergenic     TINYINT,
   image             VARCHAR(500),
   ownerId           VARCHAR(200) DEFAULT(null),

   PRIMARY KEY (id)
);
