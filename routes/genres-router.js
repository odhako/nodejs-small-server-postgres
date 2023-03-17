const Router = require('../framework/Router.js');
const genresController = require('../controller/genres-controller.js');

const router = new Router();

router.post('/genre', genresController.createGenre);
router.get('/genre', genresController.getGenre);
router.get('/genres', genresController.getAllGenres);
router.put('/genre', genresController.updateGenre);
router.delete('/genre', genresController.deleteGenre);

module.exports = router;
