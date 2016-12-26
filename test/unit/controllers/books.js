import BooksController from '../../../controllers/books';


describe('Controllers: Books', () => {

  describe('Get all books: getAll()', () => {
    it('must return a list of books', () => {
      const Book = {
        findAll: td.function()
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.69ZZ',
        updated_at: '2016-08-06T23:55:36.69ZZ'
      }];

      td.when(Book.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Book);
      return booksController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a book: getById()', () => {
    it('must return a book', () => {
      const Book = {
        findOne: td.function()
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.69ZZ',
        updated_at: '2016-08-06T23:55:36.69ZZ'
      };

      td.when(Book.findOne({ where: { id: 1} })).thenResolve(expectedResponse);

      const booksController = new BooksController(Book);
      return booksController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a book: create()', () => {
    it('must create a book', () => {
      const Book = {
        create: td.function()
      };

      const requestBody = {
        name: 'Test Book'
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.69ZZ',
        updated_at: '2016-08-06T23:55:36.69ZZ'
      };

      td.when(Book.create(requestBody)).thenResolve(expectedResponse);

      const booksController = new BooksController(Book);
      return booksController.create(requestBody)
        .then(response => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a book: update()', () => {
    it('must update an existing book', () => {
      const Book = {
        update: td.function()
      };

      const requestBody = {
        id: 1,
        name: 'Test Book Updated'
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book Updated',
        created_at: '2016-08-06T23:55:36.69ZZ',
        updated_at: '2016-08-06T23:55:36.69ZZ'
      };

      td.when(Book.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Book);
      return booksController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a book: delete()', () => {
    it('must delete an existing book', () => {
      const Book = {
        destroy: td.function()
      };

      td.when(Book.destroy({ where: { id: 1 } })).thenResolve({});

      const booksController = new BooksController(Book);
      return booksController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });

});
