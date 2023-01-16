class Book {
  constructor(ID, Title, Author) {
    this.ID = ID;
    this.Title = Title;
    this.Author = Author;
  }

  static getAll() {
    const books = localStorage.getItem('books');
    return (books === null) ? [] : JSON.parse(books);
  }

  add() {
    const books = Book.getAll();
    this.ID = Book.count() + 1;
    books.push(this);
    localStorage.setItem('books', JSON.stringify(books));
    return this;
  }

  remove() {
    const books = Book.getAll();
    books.forEach((book, index) => {
      if (parseInt(book.ID, 10) === parseInt(this.ID, 10)) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

  static count() {
    return this.getAll().length;
  }
}

export default Book;
