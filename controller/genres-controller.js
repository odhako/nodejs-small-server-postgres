const db = require('../db.js');

class GenresController {

  async createGenre(request, response) {
    const name = request.body.name;
    const result = await db.query('INSERT INTO genre (name) VALUES ($1) RETURNING *', [name]);
    response.send(result.rows);
  }

  async getGenre(request, response) {
    const id = request.params.id;
    const result = await db.query('SELECT * FROM genre WHERE id = $1', [id]);
    response.send(result.rows);
  }

  async getAllGenres(request, response) {
    const result = await db.query('SELECT * FROM genre');
    response.send(result.rows);
  }

  async updateGenre(request, response) {
    const id = request.params.id;
    const name = request.body.name;
    const result = await db.query('UPDATE genre SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    response.send(result.rows);
  }

  async deleteGenre(request, response) {
    const id = request.params.id;
    const result = await db.query('DELETE FROM genre WHERE id = $1', [id]);
    response.send(result.rows);
  }

}

module.exports = new GenresController();
