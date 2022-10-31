//import {books} from '../data/books.js'

let books=JSON.parse(localStorage.getItem('books'))||[]


const maincontainer = document.querySelector('.main');

const createInput=(name,placeholder)=>{
  const input = document.createElement('input');
  input.setAttribute('type', 'text')
  input.setAttribute('name', name)
  input.setAttribute('placeholder', placeholder);
  return input
}

const createTag=(tagName,textContent=null,className=null)=>{
  const tag = document.createElement(tagName);
  tag.textContent = textContent;
  tag.className = className;
  return tag
}

const bookName = createInput('bookname','Title')
const bookAuthor = createInput('bookauthor','Author')


const title = createTag('h1','Awesome Books ','titleText')

const booksArray = createTag('div',null,'booksArray')

const buttonAdd = createTag('button','Add','buttonAdd')




const br = document.createElement('br');
const br1 = document.createElement('br');


const createBookCard=(bookName,bookAuthor)=>{
  const divName = createTag('div',null,'divName')
  const divAuthor = createTag('div',null,'divAuthor')
  const buttonRemove = createTag('button','Remove','buttonRemove')
  const hr = document.createElement('hr');
  const bookCard = createTag('div',null,'bookCard')
  divName.textContent =bookName;
  divAuthor.textContent = bookAuthor;

  const cardItems = [divName, divAuthor, buttonRemove, hr]

  for (let j = 0; j < cardItems.length; j += 1) {
    bookCard.appendChild(cardItems[j]);
  }

  buttonRemove.addEventListener("click",(event)=>{
    let book =event.target.parentNode.getElementsByTagName('div'),
    author=book[0].innerHTML,
    title=book[1].innerHTML;
    removeBook(author,title)
    
  }

  )

  return bookCard
}

const buildBookSection=(bookList)=>{
  if(bookList&&bookList.length>0){
    for (let i = 0; i < bookList.length; i += 1) {
      booksArray.appendChild(createBookCard(bookList[i].Name,bookList[i].Author));
    }  
    const content = [title, booksArray];  
    for (let i = 0; i < content.length; i += 1) {
      maincontainer.appendChild(content[i]);
    }  
  } 
}

const buildForm =()=>{
  const formItems=[bookName, br, bookAuthor, br1, buttonAdd]
  for (let i = 0; i < formItems.length; i += 1) {
    maincontainer.appendChild(formItems[i]);
  }  
}
const addBook=(name,author)=>{
  let books =JSON.parse(localStorage.getItem('books'))
  books.push({Name:name,Author:author})
  booksArray.innerHTML=''
  let book={Name:name,Author:author}
  books.push(book)
  localStorage.setItem('books',JSON.stringify(books))
  buildBookSection(books)
  
}
const removeBook=(name,author)=>{
  let books =JSON.parse(localStorage.getItem('books'))
  let newBooks=books.filter((item,index,books)=>{
    return (!(item.Name===name & item.Author===author))
  })
  booksArray.innerHTML=''
  localStorage.setItem('books',JSON.stringify(newBooks))
  buildBookSection(newBooks)
}
//buildBookSection(books)

buttonAdd.addEventListener("click",(event)=>{
  let fields=document.querySelectorAll('input'),  
  title=fields[0].value,
  author=fields[1].value;
  console.log(title,author)
  addBook(title,author)
  fields[0].value=''
  fields[1].value=''
})


buildBookSection(books)
buildForm()






