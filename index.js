const Application = require('./framework/Application.js');
const parseJson = require('./framework/parseJson.js');
const parseUrl = require('./framework/parseUrl.js');
const filmsRoutes = require('./routes/films-routes.js');
const dotenv = require('dotenv');

dotenv.config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

const app = new Application();
app.addRouter(filmsRoutes);
app.use(parseJson);
app.use(parseUrl(`${HOST}:${PORT}`));

app.listen(8080, () => console.log(`Server started on PORT ${PORT}`));
