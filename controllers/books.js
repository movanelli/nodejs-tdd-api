const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message,
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

  getById(params) {
    return this.Book.findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Book.create(data)
      .then(result => defaultResponse(result, 201))
      .catch(error => errorResponse(error.message, 422));
  }

  update(data, params) {
    return this.Book.update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, 422));
  }

  delete(params) {
    return this.Book.destroy({ where: params })
      .then(result => defaultResponse(result, 204))
      .catch(error => errorResponse(error.message, 422));
  }

}

export default BooksController;
