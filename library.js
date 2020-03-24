const container = document.querySelector('.container');
const myLibrary = [new Book('Things', 'Marge', 39, false),
                new Book('Other Things', 'Not Marge', 387, true)];

window.onload = (e) => {
  render();
  setEventListeners();
};

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {


  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'have read' : 'not read yet'}`
};

Book.prototype.readStatus = function () {
  alert('swap read status');
};

function addBookToLibrary() {
  let title = prompt('Enter the title: ');
  let author = prompt('Enter the author: ');
  let pages = prompt('Enter the no. of pages: ');
  let read = '';
  read = prompt('Have you read the book? (yes/no): ');
  read === 'yes' ? read = true : read = false;
  myLibrary.push(new Book(title, author, pages, read));
  render();
}

function createBook(bookArgs) {
  let newBook = new Book(...bookArgs);
  myLibrary.push(newBook)
}

function render() {
  myLibrary.forEach((book, index) => {
    let row = document.createElement('tr');
    let table = document.querySelector('.library-table-body');
    let title = setElementAttributes('td', `book-title-${index}`, book.title);
    let author = setElementAttributes('td', `book-author-${index}`, book.author);
    let pages = setElementAttributes('td', `book-pages-${index}`, book.pages);
    let read = setElementAttributes('td', `book-read-${index}`, book.read);
    let deleteButton = createDeleteButton(index);
    addRowToTable(row, table, title, author, pages, read, deleteButton);
  })
}

function addRowToTable(row, table, title, author, pages, read, deleteButton) {
  row.append(title, author, pages, read, deleteButton);
  table.appendChild(row)
}

function createDeleteButton(index) {
  let deleteButton = document.createElement('td');
  let deleteImage = setElementAttributes('img', 'delete-image');
  deleteImage.src = 'delete.svg';
  deleteImage.dataset.row = index;
  deleteImage.addEventListener('click', (e) => {

    // TODO add event to delete line
    // TODO use data-* attributes, they are easily accessed with JS

    destroyRow(index);
  });
  deleteButton.appendChild(deleteImage);
  return deleteButton;
}

function setElementAttributes(element, setClass, value = null) {
  let tempElement = document.createElement(element);
  tempElement.className = setClass;
  if (value !== null) { tempElement.textContent = value }
  return tempElement;
}

function setEventListeners() {
  document.querySelector('#btn-add-book').addEventListener('click', (e) => {
    toggleForm();
  });
  document.querySelector('#book-form-btn').addEventListener('click', (e) => {
    let formValues = getFormValues();

    // TODO call method to add values to table


  });
}

function destroyTable() {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

function destroyRow(index) {
  alert('BLOW UP')
}

function resetTable() {
  destroyTable();
  render();
}

function getFormValues() {
  let formValues = [document.querySelector('#book-form-title').value,
    document.querySelector('#book-form-author').value,
    document.querySelector('#book-form-pages').value];
  formValues.forEach((value, index) => {
    if (value === '' || (index === 2 && isNaN(value))) {
      toggleError();
    } else {
      toggleError(false);
    }
  });
  return formValues;
}

function toggleForm() {
  let form = document.querySelector('#book-form');
  form.style.display === 'none' ? form.style.display = '' : form.style.display = 'none';
}

function toggleError(badInput = true) {
  let error = document.querySelector('#error-message');
  if (badInput) {
    error.style.display = '';
  } else {
    error.style.display = 'none';
  }
}