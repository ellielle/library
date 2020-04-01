"use strict";

const myLibrary = [new Book('Things', 'Marge', 39, false),
                new Book('Other Things', 'Not Marge', 387, true)];

window.onload = (e) => {
  resetTable();
};

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.readStatus = function() {
  this.read = !this.read;
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
    let read = createReadButton(index, book.read);
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
  addRowToTable(title, author, pages, createReadButton(index, false), deleteButton)
}

function createReadButton(index, initialValue) {
  let readButtonCell = document.createElement('td');
  let readButton = setElementAttributes('button', `btn-read-${index}`);
  readButton.addEventListener('click', () => {
    toggleRead(index);
  });
  readButton.textContent = initialValue === true ? 'Yes' : 'No';
  readButtonCell.appendChild(readButton);
  return readButtonCell;
}

function createDeleteButton(index) {
  let deleteButton = document.createElement('td');
  let deleteImage = setElementAttributes('img', 'delete-image');
  deleteImage.src = 'delete.svg';
  deleteImage.dataset.row = index;
  deleteImage.addEventListener('click', (e) => {
    destroyRowInLibrary(index);
    resetTable();
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
  });
}

function destroyTable() {

  // FIXME Add Book button doesn't collapse after every other submission

  let table = document.querySelector('.library-table-body');
  while (table.childNodes.length > 2) {
    table.removeChild(table.lastChild);
  }
}

function destroyRowInLibrary(index) {
  myLibrary.splice(index, 1)
}

function resetTable() {
  destroyTable();
  render();
  setEventListeners();
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

function toggleRead(index) {
  myLibrary[index].readStatus();
  let read = document.querySelector(`.btn-read-${index}`);
  read.textContent = myLibrary[index].read ? 'Yes' : 'No';
}

function getLastTableIndex() {
  return Number(document.querySelector('.library-table tr:last-child td:last-child img').dataset.row) + 1
}

function clearInputs() {
  document.querySelector('#book-form-title').value = '';
  document.querySelector('#book-form-author').value = '';
  document.querySelector('#book-form-pages').value = '';
}