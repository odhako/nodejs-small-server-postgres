const {pool: db, callback} = require('../db.js');

class GenresController {

  createGenre(request, response) {
    const name = request.body.name;
    db.query(
      'INSERT INTO genre (name) VALUES ($1) RETURNING *',
      [name],
      callback(response)
    );
  }

  getGenre(request, response) {
    const id = request.params.id;
    db.query('SELECT * FROM genre WHERE id = $1', [id], callback(response));
  }

  getAllGenres(request, response) {
    db.query('SELECT * FROM genre', callback(response));
  }

  updateGenre(request, response) {
    const id = request.params.id;
    const name = request.body.name;
    db.query(
      'UPDATE genre SET name = $1 WHERE id = $2 RETURNING *',
      [name, id],
      callback(response)
    );
  }

  deleteGenre(request, response) {
    const id = request.params.id;
    db.query('DELETE FROM genre WHERE id = $1', [id], callback(response));
  }

}

module.exports = new GenresController();
