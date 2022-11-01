import express from 'express';
import routes from './backend/routes.js';

const app = express();
const port = 3000;

app.use(express.static('frontend'));
app.use(routes);

app.listen(port, () => {
  console.log(`Application started on http://localhost:${port}`);
});
