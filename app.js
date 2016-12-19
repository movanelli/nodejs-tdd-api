import express from 'express';
import config from './config/config';
import datasource from './config/datasource';


const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);

const Book = app.datasource.models.Book;
app.route('/books').get((req, res) => {
  Book.findAll({})
    .then(result => res.json(result))
    .catch(err => res.status(412));
});

export default app;
