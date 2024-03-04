CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NUll CHECK(price_range>=1 and price_range<=5)
);

INSERT INTO (id,name,location,price_range) VALUE (123,'KFC','COIMBATORE',3);