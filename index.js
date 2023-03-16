const Application = require('./framework/Application.js');
const parseJson = require('./framework/parseJson.js');
const parseUrl = require('./framework/parseUrl.js');

const app = new Application();
app.use(parseJson);
app.use(parseUrl('http://localhost:8080'));

app.listen(8080, () => console.log('Server started on PORT 8080'));
