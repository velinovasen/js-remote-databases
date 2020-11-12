let baseURL = 'https://books-319c3.firebaseio.com/Books/'
const htmlSelectors = {
  getForm: () => document.getElementsByTagName('form')[0],
  loadBooks: () => document.getElementById('loadBooks'),
  submitButton: () => document.getElementById('submitButton'),
  editButton: () => document.getElementsByClassName('edtbtn'),
  deleteButton: () => document.getElementsByClassName('dltbtn'),
  title: () => document.getElementById('create-title'),
  author: () => document.getElementById('create-author'),
  isbn: () => document.getElementById('create-isbn'),
  tableBody: () => document.getElementById('table-body'),
}

htmlSelectors.loadBooks().addEventListener('click', loadTheBooks)

htmlSelectors.submitButton().addEventListener('click', sendTheBook)

function loadTheBooks() {
  tblBody = htmlSelectors.tableBody();
  tblBody.innerHTML = '';
  fetch(baseURL + '.json')
  .then(res => res.json())
  .then(data => {
    Object.keys(data).forEach(key => {
      let tableRow = appendBooks(data[key], key);
      tblBody.appendChild(tableRow);
    })
  })
  .catch((e) => console.log('No books at the moment.'))
} 

function sendTheBook(e) {
  e.preventDefault()
  let title = htmlSelectors.title().value;
  let author = htmlSelectors.author().value;
  let isbn =  htmlSelectors.isbn().value;
  let key = htmlSelectors.getForm().getAttribute('key')
  let book = { "title": title, "author": author, "isbn": isbn }
  if (!key) {
    if (title && author && isbn) {
      fetch(baseURL + '.json', {
        method: "POST",
        body: JSON.stringify(book)
      })
      cleanValues()
    }
  } else if (title && author && isbn) {
      fetch(baseURL + key + '.json', {
        method: "PUT",
        body: JSON.stringify(book)
      })
      cleanValues()
    }
}

function appendBooks(book, key) {
  let tableRow = document.createElement('tr');
  tableRow.setAttribute('key', key);
  let tdTitle = document.createElement('td');
  let tdAuthor = document.createElement('td');
  let tdISBN = document.createElement('td');
  tdTitle.innerText = book.title;
  tdAuthor.innerText = book.author;
  tdISBN.innerText = book.isbn;

  editBtn = document.createElement('button');
  editBtn.innerHTML = 'Edit';
  editBtn.addEventListener('click', editTheBook);

  dltBtn = document.createElement('button');
  dltBtn.innerHTML = 'Delete';
  dltBtn.addEventListener('click', deleteTheBook);
  lastTableData = document.createElement('td');
  lastTableData.appendChild(editBtn);
  lastTableData.appendChild(dltBtn);

  tableRow.appendChild(tdTitle);
  tableRow.appendChild(tdAuthor);
  tableRow.appendChild(tdISBN);
  tableRow.appendChild(lastTableData);
  return tableRow;
}

function editTheBook(event) {
  const tableRows = event.target.parentElement.parentElement.getElementsByTagName('td');
  const idNumber = event.target.parentElement.parentElement.getAttribute('key');
  htmlSelectors.title().value = tableRows[0].innerText;
  htmlSelectors.author().value = tableRows[1].innerText;
  htmlSelectors.isbn().value = tableRows[2].innerText;
  htmlSelectors.getForm().setAttribute('key', idNumber);
}

function deleteTheBook(event) {
  const idNumber = event.target.parentElement.parentElement.getAttribute('key');
  fetch(baseURL + idNumber + '.json', {
    method: "DELETE"
  })
  setTimeout(function() {loadTheBooks()}, 700)
}

function cleanValues() {
  setTimeout(function() {loadTheBooks(), 
    htmlSelectors.title().value = '';
    htmlSelectors.author().value = '';
    htmlSelectors.isbn().value = '';
    htmlSelectors.getForm().removeAttribute('key')}, 700)
}