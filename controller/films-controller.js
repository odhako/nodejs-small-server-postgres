const {pool: db, callback} = require('../db.js');

class FilmsController {

  createFilm(request, response) {
    const {title, year} = request.body;
    const newFilm = db.query(
      'INSERT INTO film (title, year) VALUES ($1, $2) RETURNING *',
      [title, year],
      callback(response)
    );
  }

  getFilm(request, response) {
    const id = request.params.id;
    const film = db.query('SELECT * FROM film WHERE id = $1', [id], callback(response));
  }

  getAllFilms(request, response) {
    const films = db.query('SELECT * FROM film', callback(response));
  }

  updateFilm(request, response) {
    const id = request.params.id;
    const {title, year} = request.body;
    const updatedFilm = db.query(
      'UPDATE film SET title = $1, year = $2 WHERE id = $3 RETURNING *',
      [title, year, id],
      callback(response)
    );
  }

  deleteFilm(request, response) {
    const id = request.params.id;
    const deletedFilm = db.query(`DELETE FROM film WHERE id = $1`, [id], callback(response));
  }
}

module.exports = new FilmsController();
