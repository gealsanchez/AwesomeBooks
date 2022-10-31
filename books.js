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
bookName.setAttribute('type', 'text');
bookName.setAttribute('name', 'bookname');
bookName.setAttribute('placeholder', 'Title');

const bookAuthor = document.createElement('input');
bookAuthor.setAttribute('type', 'text');
bookAuthor.setAttribute('name', 'bookauthor');
bookAuthor.setAttribute('placeholder', 'Author');

const title = document.createElement('h1');
title.textContent = 'Awesome Books ';
title.className = 'titleText';

const booksArray = document.createElement('div');
booksArray.className = 'booksArray';

const buttonAdd = document.createElement('button');
buttonAdd.textContent = 'Add';
buttonAdd.className = 'buttonAdd';

const br = document.createElement('br');
const br1 = document.createElement('br');

for (let i = 0; i < books.length; i += 1) {

  const divName = document.createElement('div');
  divName.className = 'divName';

  const divAuthor = document.createElement('div');
  divAuthor.className = 'divAuthor';

  const buttonRemove = document.createElement('button');
  buttonRemove.textContent = 'Remove';
  buttonRemove.className = 'buttonRemove';

  const hr = document.createElement('hr');

  const divCard = document.createElement('div');
  divCard.className = 'divCard';

  divName.textContent = books[i].Name;
  divAuthor.textContent = books[i].Author;

  booksArray.appendChild(divCard);

  const cardContent = [divName, divAuthor, buttonRemove, hr]

  for (let j = 0; j < cardContent.length; j += 1) {
    divCard.appendChild(cardContent[j]);
  }
}

const content = [title, booksArray, bookName, br, bookAuthor, br1, buttonAdd];

for (let i = 0; i < content.length; i += 1) {
  maincontainer.appendChild(content[i]);
}
