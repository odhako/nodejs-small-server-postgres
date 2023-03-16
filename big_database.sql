/* Создание таблиц */
CREATE TABLE person (
  id               INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name        VARCHAR(255)
);
CREATE TABLE genre (
  id               INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name             VARCHAR(255),
  year             SMALLINT
);
CREATE TABLE country (
  id               INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name             VARCHAR(255)
);
CREATE TABLE film (
  id                         INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title                      VARCHAR(255),
  year                       SMALLINT,
  country_id                 INTEGER REFERENCES country (id),
  tagline                    TEXT,
  director                   INTEGER REFERENCES person (id),
  writer                     INTEGER REFERENCES person (id),
  producer                   INTEGER REFERENCES person (id),
  director_of_photography    INTEGER REFERENCES person (id),
  composer                   INTEGER REFERENCES person (id),
  art                        INTEGER REFERENCES person (id),
  editor                     INTEGER REFERENCES person (id),
  budget                     BIGINT,
  marketing                  BIGINT,
  budget_currency            VARCHAR(12),
  box_office_usa             BIGINT,
  box_office_world           BIGINT,
  box_office_currency        VARCHAR(12),
  release_in_russia          DATE,
  release_date               DATE,
  release_dvd                DATE,
  age_rating                 VARCHAR(24),
  rating_mpaa                VARCHAR(24),
  runtime                    INTERVAL
);
CREATE TABLE film_person (
  id               INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  film_id          INTEGER REFERENCES film (id),
  person_id        INTEGER REFERENCES person (id),
  person_role      VARCHAR(255)
);
CREATE TABLE film_genre (
  id               INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  film_id          INTEGER REFERENCES film (id),
  genre_id         INTEGER REFERENCES genre (id)
);
CREATE TABLE viewers_by_country (
  id               INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  film_id          INTEGER REFERENCES film (id),
  country_id       INTEGER REFERENCES country (id),
  viewers          BIGINT
);

/* Добавим фильм */
INSERT INTO person (full_name)
VALUES
  ('Фрэнк Дарабонт'),
  ('Дэвид Тэттерсолл'),
  ('Томас Ньюман'),
  ('Теренс Марш'),
  ('Ричард Фрэнсис-Брюс'),
  ('Том Хэнкс'),
  ('Дэвид Морс'),
  ('Бонни Хант'),
  ('Всеволод Кузнецов'),
  ('Владимир Антоник'),
  ('Любовь Германова')
;

INSERT INTO genre (name) VALUES ('Драма'), ('Фэнтези'), ('Криминал');

INSERT INTO country (name) VALUES ('USA'), ('Germany'), ('Italy');

INSERT INTO film (
    title, year, country_id, tagline,
    director, writer, producer,
    director_of_photography, composer, art, editor,
    budget, marketing, budget_currency,
    box_office_usa, box_office_world, box_office_currency,
    release_in_russia, release_date, release_dvd,
    age_rating, rating_mpaa, runtime
    )
VALUES (
    'Зеленая миля', 1999, 1, 'Пол Эджкомб не верил в чудеса. Пока не столкнулся с одним из них',
    1, 1, 1,
    2, 3, 4, 5,
    60000000, 30000000, '$',
    136801374, 286801374, '$',
    '2000-04-18', '1999-12-06', '2001-02-13',
    '16+', 'R', '3 hours 9 minutes'
);

INSERT INTO film_person (film_id, person_id, person_role)
VALUES (1, 6, 'cast'), (1, 7, 'cast'), (1, 8, 'cast'),
       (1, 9, 'voice'), (1, 10, 'voice'), (1, 11, 'voice');

INSERT INTO film_genre (film_id, genre_id)
VALUES (1, 1), (1, 2), (1, 3);

INSERT INTO viewers_by_country (film_id, country_id, viewers)
VALUES (1, 1, 26000000), (1, 2, 2107877), (1, 3, 1742730);
