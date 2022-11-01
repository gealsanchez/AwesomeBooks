const books = [
  {
    Name: 'Anna Karenina',
    Author: 'Leo Tolstoy',
  },
  {
    Name: 'To Kill a Mockingbird',
    Author: 'Harper Lee',
  },
  {
    Name: 'The Great Gatsby',
    Author: 'F. Scott Fitzgerald',
  },
  {
    Name: 'One Hundred Years of Solitude',
    Author: 'Gabriel García Márquez',
  },
  {
    Name: 'A Passage to India',
    Author: 'E.M. Forster',
  },
];

const maincontainer = document.querySelector('.main');

const bookName = document.createElement('input');
bookName.setAttribute('id', 'name');
bookName.setAttribute('type', 'text');
bookName.setAttribute('name', 'bookname');
bookName.setAttribute('placeholder', 'Title');

const bookAuthor = document.createElement('input');
bookAuthor.setAttribute('id', 'author');
bookAuthor.setAttribute('type', 'text');
bookAuthor.setAttribute('name', 'bookauthor');
bookAuthor.setAttribute('placeholder', 'Author');

const title = document.createElement('h1');
title.textContent = 'Awesome Books ';
title.className = 'titleText';

const booksArray = document.createElement('div');
booksArray.className = 'booksArray';

const buttonAdd = document.createElement('button');
buttonAdd.setAttribute('type', 'submit');
buttonAdd.setAttribute('class', 'bookForm');
buttonAdd.textContent = 'Add';

const bookForm = document.createElement('form');
bookForm.setAttribute('class', 'bookForm');

const removeForm = document.createElement('form');
removeForm.setAttribute('class', 'bookForm');

const br = document.createElement('br');
const br1 = document.createElement('br');

function showBooks() {
  for (let i = 0; i < books.length; i += 1) {

    const divName = document.createElement('div');
    divName.className = 'divName';
    divName.id = '#name';

    const divAuthor = document.createElement('div');
    divAuthor.className = 'divAuthor';
    divName.id = '#author';

    const buttonRemove = document.createElement('button');
    buttonRemove.setAttribute('type', 'submit');
    buttonRemove.setAttribute('class', 'removeForm');
    buttonRemove.textContent = 'Remove';

    const hr = document.createElement('hr');

    const divCard = document.createElement('div');
    divCard.className = 'divCard';

    divName.textContent = books[i].Name;
    divAuthor.textContent = books[i].Author;

    const cardContent = [divName, divAuthor, buttonRemove, hr];

    for (let j = 0; j < cardContent.length; j += 1) {
      divCard.appendChild(cardContent[j]);
    }

    booksArray.appendChild(divCard);

    function removeRow() {
      const obj = {
        bookName: books[i].Name,
        bookAuthor: books[i].Author,
      };

      localStorage.setItem('deletedDATA', JSON.stringify(obj));

      for (let j = 0; j < books.length; j += 1) {
        if (books[i].Name === books[j].Name) {
          books.splice(j, 1);
        }
      }

      booksArray.innerHTML = '';
      showBooks();
    }

    buttonRemove.addEventListener('click', removeRow)
  }
}

showBooks();

const content = [bookName, br, bookAuthor, br1, buttonAdd];

for (let i = 0; i < content.length; i += 1) {
  bookForm.appendChild(content[i]);
}

maincontainer.appendChild(title);
maincontainer.appendChild(booksArray);
maincontainer.appendChild(bookForm);

function addRow() {
  let c = { Name: bookName.value, Author: bookAuthor.value }
  books.unshift(c);
  booksArray.innerHTML = '';
  showBooks();
}

buttonAdd.addEventListener('click', addRow);

const formLocal = document.querySelector('.bookForm');

formLocal.addEventListener('submit', (e) => {
  e.preventDefault();
  const obj = {
    bookName: document.querySelector('#name').value,
    bookAuthor: document.querySelector('#author').value,
  };

  localStorage.setItem('DATA', JSON.stringify(obj));
});

const getData = localStorage.getItem('DATA');
const getDataValue = JSON.parse(getData);

window.addEventListener('load', () => {
  if (localStorage.getItem('DATA')) {
    document.querySelector('#name').value = getDataValue.bookName;
    document.querySelector('#author').value = getDataValue.bookAuthor;
  }
});