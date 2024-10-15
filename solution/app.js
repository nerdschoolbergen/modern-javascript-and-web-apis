import express from 'express';
import http from 'http';
import reload from 'reload';
import routes from './backend/routes.js';

const app = express();
const port = 3000;

app.set('port', process.env.PORT || port)
app.use(express.static('frontend'));
app.use(routes);


var server = http.createServer(app);

reload(app).then(() => {
  server.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`);
  })
}).catch(function (err) {
  console.error('Application could to be started:', err)
});
