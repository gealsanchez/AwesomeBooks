import books from '../data/books.js';

const bookList = books.books;
let bookID;

const createTag = (tagName, textContent = null, className = null) => {
  const tag = document.createElement(tagName);
  tag.textContent = textContent;
  tag.className = className;
  return tag;
};

const booksTable = document.querySelector('#booksTable');

const buttonAdd = document.querySelector('#addbutton');

const removeBook = (id) => {
  const books = JSON.parse(localStorage.getItem('books'));
  console.log(books)
  const newBooks = books.filter(
    (item) => (!(item.id == id)),
  );
  console.log(newBooks)
  localStorage.setItem('books', JSON.stringify(newBooks));
};
const removeBookFromUI = (item) => {
  if (item.classList.contains('buttonRemove')) {
    item.parentElement.remove();
  }
};

const createBookRow = (ID, bookName, bookAuthor) => {
  const divID = createTag('div', null, 'divID hidden');
  const divName = createTag('div', null, 'divName');
  const divAuthor = createTag('div', null, 'divAuthor');
  const buttonRemove = createTag('button', 'Remove', 'buttonRemove');
  const hr = document.createElement('hr');
  const bookRow = createTag('div', null, 'bookRow');
  divID.textContent = ID;
  divName.textContent = bookName;
  divAuthor.textContent = bookAuthor;

  const cardItems = [divID, divName, divAuthor, buttonRemove, hr];

  for (let j = 0; j < cardItems.length; j += 1) {
    bookRow.appendChild(cardItems[j]);
  }

  buttonRemove.addEventListener('click', (event) => {
    const { target } = event;
    const book = target.parentNode.getElementsByTagName('div');
    const id = book[0].innerHTML;
    // Remove from data
    removeBook(id);
    // Remove from UI
    removeBookFromUI(target);
  });
  return bookRow;
};

const buildBookSection = (bookList) => {
  if (bookList && bookList.length > 0) {
    for (let i = 0; i < bookList.length; i += 1) {
      booksTable.appendChild(
        createBookRow(bookList[i].id, bookList[i].Name, bookList[i].Author),
      );
    }
  }
};

const addBook = (name, author) => {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  const id = books.length + 1;
  bookID = id;
  const book = { Name: name, Author: author, id };
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
};

const addBookToUI = (ID, name, author) => {
  booksTable.appendChild(createBookRow(ID,name, author));
};

const clearForm = () => {
  document.querySelector('#bookID').value = '';
  document.querySelector('#booktitle').value = '';
  document.querySelector('#bookauthor').value = '';
};

buttonAdd.addEventListener('click', () => {
  const fields = document.querySelectorAll('input');
  const title = fields[1].value;
  const author = fields[2].value;
  // Add to local storage
  addBook(title, author);
  addBookToUI(bookID, title, author);
  clearForm();
});

// Display Books on page load
if (bookList.length > 0) {
  document.addEventListener('DOMContentLoaded', buildBookSection(bookList));
}
