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
  // FIXME this probably gets removed?

  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'have read' : 'not read yet'}`
};

Book.prototype.readStatus = function() {
  this.read === true ? this.read = false : this.read = true;
};

function createBook(bookArgs) {
  let newBook = new Book(...bookArgs, false);
  myLibrary.push(newBook)
}

function render() {
  myLibrary.forEach((book, index) => {
    let title = setElementAttributes('td', `book-title-${index}`, book.title);
    let author = setElementAttributes('td', `book-author-${index}`, book.author);
    let pages = setElementAttributes('td', `book-pages-${index}`, book.pages);
    let read = setElementAttributes('td', `book-read-${index}`, book.read);
    let deleteButton = createDeleteButton(index);
    addRowToTable(title, author, pages, read, deleteButton);
  })
}

function addRowToTable(title, author, pages, read, deleteButton) {
  let row = document.createElement('tr');
  let table = document.querySelector('.library-table-body');
  row.append(title, author, pages, read, deleteButton);
  table.appendChild(row)
}

function createNewRow(values) {
  let index = getLastTableIndex();
  let title = setElementAttributes('td', `book-title-${index}`, values[0]);
  let author = setElementAttributes('td', `book-author-${index}`, values[1]);
  let pages = setElementAttributes('td', `book-pages-${index}`, values[2]);
  let deleteButton = createDeleteButton(index);
  addRowToTable(title, author, pages, false, deleteButton)
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
    if (formValues.length === 3 && +formValues[2] > 0) {
      createBook(formValues);
      createNewRow(formValues);
      clearInputs();
    }
    // TODO call method to add values to table
    // TODO rethink createBook() up top (?)
  });
}

function destroyTable() {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
}

function destroyRow(index) {
  alert('BLOW UP')
  // TODO unfinished
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

function getLastTableIndex() {
  return Number(document.querySelector('.library-table tr:last-child td:last-child img').dataset.row) + 1
}

function clearInputs() {
  document.querySelector('#book-form-title').value = '';
  document.querySelector('#book-form-author').value = '';
  document.querySelector('#book-form-pages').value = '';
}