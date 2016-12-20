describe('Routes Books', () => {
  const Book = app.datasource.models.Book,
    defaultBook = {
      id: 1,
      name: 'Default Book'
    }

  beforeEach(done => {
    Book
      .destroy({where: {}})
      .then(() => Book.create(defaultBook))
      .then(() => {
        done();
      });
  });

  describe('Route GET /books', () => {
    it('must return a list of books', done => {

      request
        .get('/books')
        .end((err, res) => {

          expect(res.body[0].id).to.be.eql(defaultBook.id);
          expect(res.body[0].name).to.be.eql(defaultBook.name);

          done(err);
        });

    });
  });

  describe('Route GET /books/{id}', () => {
    it('must return a book', done => {

      request
        .get('/books/1')
        .end((err, res) => {

          expect(res.body.id).to.be.eql(defaultBook.id);
          expect(res.body.name).to.be.eql(defaultBook.name);

          done(err);
        });

    });
  });

  describe('Route POST /books', () => {
    it('must create a book', done => {

      const newBook = {
        id: 2,
        name: 'New Book'
      };

      request
        .post('/books')
        .send(newBook)
        .end((err, res) => {

          expect(res.body.id).to.be.eql(newBook.id);
          expect(res.body.name).to.be.eql(newBook.name);

          done(err);
        });

    });
  });

  describe('Route PUT /books/{id}', () => {
    it('must update a book', done => {

      const updatedBook = {
        id: 1,
        name: 'Updated Book'
      };

      request
        .put('/books/1')
        .send(updatedBook)
        .end((err, res) => {

          expect(res.body).to.be.eql([1]);

          done(err);
        });

    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('must delete a book', done => {

      request
        .delete('/books/1')
        .end((err, res) => {

          expect(res.statusCode).to.be.eql(204);

          done(err);
        });

    });
  });

});
