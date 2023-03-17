CREATE TABLE genre (
    id          INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name        VARCHAR(255)
);

CREATE TABLE film (
    id          INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title       VARCHAR(255),
    year        INTEGER
);

CREATE TABLE film_genre (
    id          INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    film_id     INTEGER REFERENCES film (id),
    genre_id    INTEGER REFERENCES genre (id)
);
