import express from 'express';
import bodyParser from 'body-parser';

import config from './config/config';
import datasource from './config/datasource';


const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());

const Book = app.datasource.models.Book;

app.route('/books')
  .get((req, res) => {
    Book.findAll({})
      .then(result => res.json(result))
      .catch(err => res.status(412));
  })
  .post((req, res) => {
    Book.create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(412));
  });

app.route('/books/:id')
  .get((req, res) => {
    Book.findOne({where: req.params})
      .then(result => res.json(result))
      .catch(err => res.status(412));
  })
  .put((req, res) => {
    Book.update(req.body, {where: req.params})
      .then(result => res.json(result))
      .catch(err => res.status(412));
  })
  .delete((req, res) => {
    Book.destroy({where: req.params})
      .then(result => res.sendStatus(204))
      .catch(err => res.status(412));
  });

export default app;
