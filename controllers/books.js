const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message
}, statusCode);

class BooksController {

  constructor(Book) {
    this.Book = Book;
  }

  getAll() {
    return this.Book.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }
}

export default BooksController;
