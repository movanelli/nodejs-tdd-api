import BooksController from '../controllers/books';


export default(app, Book) => {

  app.route('/books')
    .get((req, res) => {
      Book.findAll({})
        .then(result => res.json(result))
        .catch(() => res.status(412));
    })
    .post((req, res) => {
      Book.create(req.body)
        .then(result => res.json(result))
        .catch(() => res.status(412));
    });

  app.route('/books/:id')
    .get((req, res) => {
      Book.findOne({ where: req.params })
        .then(result => res.json(result))
        .catch(() => res.status(412));
    })
    .put((req, res) => {
      Book.update(req.body, { where: req.params })
        .then(result => res.json(result))
        .catch(() => res.status(412));
    })
    .delete((req, res) => {
      Book.destroy({ where: req.params })
        .then(() => res.sendStatus(204))
        .catch(() => res.status(412));
    });
}
