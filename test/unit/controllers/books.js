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
      }]

      td.when(Book.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Book);
      return booksController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

});
