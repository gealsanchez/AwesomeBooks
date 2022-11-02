import { Book } from '../model/book.js';

// const bookList = books.books;
// const book=new Book()

const createTag = (tagName, textContent = null, className = null) => {
  const tag = document.createElement(tagName);
  tag.textContent = textContent;
  tag.className = className;
  return tag;
};

const booksTable = document.querySelector('#booksTable');

const buttonAdd = document.querySelector('#addbutton');

const removeBookFromUI = (item) => {
  if (item.classList.contains('buttonRemove')) {
    item.parentElement.remove();
  }
};

const createBookRow = (book) => {
  /* const divID = createTag('div', null, 'divID hidden');
  const divName = createTag('div', null, 'divName');
  const divAuthor = createTag('div', null, 'divAuthor');
  const buttonRemove = createTag('button', 'Remove', 'buttonRemove');
  const hr = document.createElement('hr');
  const bookRow = createTag('div', null, 'bookRow');

  divID.textContent = book.ID;
  divName.textContent = book.Title;
  divAuthor.textContent = book.Author; */
  const bookRow = `<tr>
    <td>${book.Title}</td>
    <td>${book.Author}</td>
    <td><button>Remove</button></td>
  </tr>`;

  /* const cardItems = [divID, divName, divAuthor, buttonRemove, hr];

  for (let j = 0; j < cardItems.length; j += 1) {
    bookRow.appendChild(cardItems[j]);
  } */

  buttonRemove.addEventListener('click', (event) => {
    const { target } = event;
    const bookNode = target.parentNode.getElementsByTagName('div');
    const ID = bookNode[0].innerHTML;
    const Title = bookNode[1].innerHTML;
    const Author = bookNode[2].innerHTML;
    const book = new Book(ID, Title, Author);
    // Remove from data
    book.remove();
    // Remove from UI
    removeBookFromUI(target);
  });
  return bookRow;
};

const buildBookSection = (bookList) => {
  if (bookList && bookList.length > 0) {
    for (let i = 0; i < bookList.length; i += 1) {
      booksTable.appendChild(
        createBookRow(bookList[i]),
      );
    }
  }
};

const addBookToUI = (book) => {
  booksTable.appendChild(createBookRow(book));
};

const clearForm = () => {
  document.querySelector('#bookID').value = '';
  document.querySelector('#booktitle').value = '';
  document.querySelector('#bookauthor').value = '';
};

buttonAdd.addEventListener('click', () => {
  const fields = document.querySelectorAll('input');
  const Title = fields[1].value;
  const Author = fields[2].value;
  // Add to local storage
  const book = new Book(null, Title, Author);
  const savedBook = book.add();
  addBookToUI(savedBook);
  clearForm();
});

// Display Books on page load
if (Book.count() > 0) {
  document.addEventListener('DOMContentLoaded', buildBookSection(Book.getAll()));
}
