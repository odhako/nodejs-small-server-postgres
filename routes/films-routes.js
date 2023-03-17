const Router = require('../framework/Router.js');
const filmsController = require('../controller/films-controller.js');

const router = new Router();

// router.get('/film', filmsController.getAllFilms);
router.post('/film', filmsController.createFilm);
router.get('/film', filmsController.getFilm);
router.put('/film', filmsController.updateFilm);
router.delete('/film', filmsController.deleteFilm);

module.exports = router;