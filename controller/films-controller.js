const db = require('../db.js');

class FilmsController {

  async createFilm(request, response) {
    const {title, year} = request.body;
    const filmGenres = request.body['genres'];
    const dbGenres = await db.query('SELECT * FROM genre');
    const genreIds = [];

    for (const genre of filmGenres) {
      if (dbGenres.rows.find(obj => obj.name === genre)) {
        genreIds.push(dbGenres.rows.find(obj => obj.name === genre).id)
      } else {
        const newGenre = await db.query('INSERT INTO genre (name) VALUES ($1) RETURNING id', [genre])
        genreIds.push(newGenre.rows[0].id);
      }
    }

    const newFilm = await db.query('INSERT INTO film (title, year) VALUES ($1, $2) RETURNING (id)', [title, year]);
    const filmId = newFilm.rows[0].id;
    for (const genreId of genreIds) {
      await db.query('INSERT INTO film_genre (film_id, genre_id) VALUES ($1, $2)', [filmId, genreId])
    }
    const result = await db.query(
      "SELECT film.id, film.title, film.year, array_agg(genre.name) AS genres " +
      "FROM film " +
      "JOIN film_genre ON film.id = film_id " +
      "JOIN genre ON genre.id = genre_id " +
      "WHERE film.id = $1 " +
      "GROUP BY film.id, film.title, film.year", [filmId]
    );
    response.send(result.rows[0]);
  }

  async getFilm(request, response) {
    const filmId = request.params.id;
    const film = await db.query(
      "SELECT film.id, film.title, film.year, array_agg(genre.name) AS genres " +
      "FROM film " +
      "JOIN film_genre ON film.id = film_id " +
      "JOIN genre ON genre.id = genre_id " +
      "WHERE film.id = $1 " +
      "GROUP BY film.id, film.title, film.year", [filmId]
    );
    response.send(film.rows[0]);
  }

  async getAllFilms(request, response) {
    const allFilms = await db.query(
      "SELECT film.id, film.title, film.year, array_agg(genre.name) AS genres " +
      "FROM film " +
      "JOIN film_genre ON film.id = film_id " +
      "JOIN genre ON genre.id = genre_id " +
      "GROUP BY film.id, film.title, film.year"
    );
    response.send(allFilms.rows);
  }

  async updateFilm(request, response) {
    const filmId = request.params.id;
    const {title, year} = request.body;
    const filmGenres = request.body['genres'];
    const dbGenres = await db.query('SELECT * FROM genre');
    const genreIds = [];

    for (const genre of filmGenres) {
      if (dbGenres.rows.find(obj => obj.name === genre)) {
        genreIds.push(dbGenres.rows.find(obj => obj.name === genre).id)
      } else {
        const newGenre = await db.query('INSERT INTO genre (name) VALUES ($1) RETURNING id', [genre])
        genreIds.push(newGenre.rows[0].id);
      }
    }

    await db.query('UPDATE film SET title = $1, year = $2 WHERE id = $3', [title, year, filmId]);
    await db.query('DELETE FROM film_genre WHERE film_id = $1', [filmId]);
    for (const genreId of genreIds) {
      await db.query('INSERT INTO film_genre (film_id, genre_id) VALUES ($1, $2)', [filmId, genreId])
    }
    const result = await db.query(
      "SELECT film.id, film.title, film.year, array_agg(genre.name) AS genres " +
      "FROM film " +
      "JOIN film_genre ON film.id = film_id " +
      "JOIN genre ON genre.id = genre_id " +
      "WHERE film.id = $1 " +
      "GROUP BY film.id, film.title, film.year", [filmId]
    );
    response.send(result.rows[0]);
  }

  async deleteFilm(request, response) {
    const id = request.params.id;
    const result = await db.query(`DELETE FROM film WHERE id = $1`, [id]);
    response.send(result.rows[0]);
  }
}

module.exports = new FilmsController();
