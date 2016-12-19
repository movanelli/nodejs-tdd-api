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

      request.get('/books').end((err, res) => {

        expect(res.body[0].id).to.be.eql(defaultBook.id);
        expect(res.body[0].name).to.be.eql(defaultBook.name);

        done(err);
      });

    });
  });
});
