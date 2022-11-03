import Book from '../model/book.js';
import Contact from '../model/contact.js';

const createTag = (tagName, textContent = null, className = null) => {
  const tag = document.createElement(tagName);
  tag.textContent = textContent;
  tag.className = className;
  return tag;
};

const booksTable = document.querySelector('#books-table');

const buttonAdd = document.querySelector('#addbutton');

const removeBookFromUI = (item) => {
  if (item.classList.contains('buttonRemove')) {
    item.parentElement.parentElement.remove();
  }
};

const createBookRow = (book) => {
  const bookRow = createTag('tr', null, 'rowTR');
  const titleTD = createTag('td', null, 'titleTD');
  const authorTD = createTag('td', null, 'authorTD');
  const idTD = createTag('td', null, 'idTD hidden');
  const buttonTD = createTag('td', null, 'buttonTD buttonRemove');
  const buttonRemove = createTag('button', 'Remove', 'buttonRemove');
  buttonTD.appendChild(buttonRemove);

  const rowItems = [idTD, titleTD, authorTD, buttonTD];

  for (let j = 0; j < rowItems.length; j += 1) {
    bookRow.appendChild(rowItems[j]);
  }

  idTD.textContent = book.ID;
  titleTD.textContent = `“${book.Title}”`;
  authorTD.textContent = book.Author;

  buttonRemove.addEventListener('click', (event) => {
    const { target } = event;
    const bookNode = target.parentNode.parentNode.getElementsByTagName('td');
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

const listSection = document.querySelector('#book-list');
const contactSection = document.querySelector('#contact-info');
const addBookSection = document.querySelector('#book-add');
const reset = () => {
  addBookSection.classList.remove('show');
  addBookSection.classList.remove('hidden');

  listSection.classList.remove('show');
  listSection.classList.remove('hidden');

  contactSection.classList.remove('show');
  contactSection.classList.remove('hidden');
};

const displaySection = (section) => {
  const sectionArray = [listSection, contactSection, addBookSection];

  if (!section.classList.contains('show')) {
    section.classList.toggle('show');
  }
  for (let i = 0; i < sectionArray.length; i += 1) {
    if (sectionArray[i] !== section) {
      if (!sectionArray[i].classList.contains('hidden')) {
        sectionArray[i].classList.toggle('hidden');
      }
    }
  }
};

const navbar = document.querySelector('.nav-bar');
navbar.addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'new-add':
      reset();

      displaySection(addBookSection);
      break;
    case 'contact':
      reset();

      displaySection(contactSection);

      break;
    case 'list':
      reset();

      displaySection(listSection);
      break;
    default:
      break;
  }
});

const contactUl = createTag('ul', null, 'contact-ul');
const contact = new Contact();
console.log(contact);

for (let item in contact) {
  const contactLi = createTag('li', null, 'contact-li');
  contactLi.textContent = contact[item];
  contactUl.appendChild(contactLi);
}

const contactList = document.querySelector('.contact-list');
contactList.appendChild(contactUl);

const dateTime= document.querySelector('#datetime');
dateTime.textContent= new Date().toLocaleString();

// Display Books on page load
if (Book.count() > 0) {
  document.addEventListener('DOMContentLoaded', buildBookSection(Book.getAll()));
}
