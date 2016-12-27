import jwt from 'jwt-simple';


describe('Routes Books', () => {
  const Book = app.datasource.models.Book;
  const User = app.datasource.models.User;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default Description',
  };

  let token;

  beforeEach((done) => {
    User
      .destroy({ where: {} })
      .then(() => User.create({
        name: 'John Doe',
        email: 'john@mail.com',
        password: '12345',
      }))
      .then((user) => {
        Book
          .destroy({ where: {} })
          .then(() => Book.create(defaultBook))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('Route GET /books', () => {
    it('must return a list of books', (done) => {
      const booksList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));

      request
        .get('/books')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, booksList);

          done(err);
        });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('must return a book', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .get('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          joiAssert(res.body, book);

          done(err);
        });
    });
  });

  describe('Route POST /books', () => {
    it('must create a book', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      const newBook = {
        id: 2,
        name: 'New Book',
        description: 'New Description',
      };

      request
        .post('/books')
        .set('Authorization', `JWT ${token}`)
        .send(newBook)
        .end((err, res) => {
          joiAssert(res.body, book);

          done(err);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('must update a book', (done) => {
      const updatedBook = {
        id: 1,
        name: 'Updated Book',
        description: 'Updated Description',
      };

      const updatedCount = Joi.array().items(1);

      request
        .put('/books/1')
        .set('Authorization', `JWT ${token}`)
        .send(updatedBook)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);

          done(err);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('must delete a book', (done) => {
      request
        .delete('/books/1')
        .set('Authorization', `JWT ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);

          done(err);
        });
    });
  });
});
