"use strict";

let myLibrary = [];

function Book(title, author, pages, status, details) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.details = details;
}

// loop through the array and display the data
let myRow = document.querySelector(".myRow");
function updateUI() {
  for (let i = 0; i < myLibrary.length; i++) {
    let myHtml = `<div class="col-lg-4 col-sm-4 col-xs-12 mb-3 book-${i}">
    <div class="card">
        <figure></figure>
        <div class="card-body">
          <h5 class="card-title">${myLibrary[i].title} (${myLibrary[i].author})</h5>
          <div class="card-text">
          <p class="pages">${myLibrary[i].pages} pages</p>
          <p class="details">${myLibrary[i].details}</p>
          </p>
          <div class="btns">
            <a href="javascript:void(0);" data-book="${i}" class="btn status btn-primary"
              >${myLibrary[i].status}</a
            >
            <a class="delete btn btn-danger" data-book="${i}" href="javascript:void(0);"
              ><i class="fa fa-trash-alt"></i>Delete</a
            >
          </div>
        </div>
      </div>
      </div>`;
    myRow.insertAdjacentHTML("afterbegin", myHtml);
  }
}

let firstBook = new Book(
  "The Hobbit",
  "J.R.R. Tolkien",
  295,
  "Want to read",
  "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published in 1937 to wide critical acclaim..."
);

myLibrary.push(firstBook);

updateUI();

// form submission
let myForm = document.querySelector(".add_book");
let alertMsg = document.querySelector(".alert");
myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  alertMsg.classList.remove("d-none");

  let formData = new FormData(myForm);

  // get data
  let title = formData.get("title");
  let pages = formData.get("pages");
  let author = formData.get("author");
  let status = formData.get("status");
  let details = formData.get("details");

  addNewBook(title, author, pages, status, details);
  myForm.reset();
});

// add book
function addNewBook(title, author, pages, status, details) {
  let newBook = new Book(title, author, pages, status, details);
  myLibrary.push(newBook);

  // the index in the books array, since we're using push(), every element added would be the last one in the array
  let index = myLibrary.length - 1;

  let myHtml = `<div class="col-lg-4 col-sm-4 col-xs-12 mb-3 book-${index}">
  <div class="card">
      <figure></figure>
      <div class="card-body">
        <h5 class="card-title">${title} (${author})</h5>
        <div class="card-text">
        <p class="pages">${pages} pages</p>
        <p class="details">${details}</p>
        </p>
        <div class="btns">
          <a href="javascript:void(0);" data-book="${index}" class="btn status btn-primary"
            >${status}</a
          >
          <a class="delete btn btn-danger" data-book="${index}" href="javascript:void(0);"
            ><i class="fa fa-trash-alt"></i>Delete</a
          >
        </div>
      </div>
    </div>
    </div>`;
  myRow.insertAdjacentHTML("afterbegin", myHtml);
}

// function to delete book
let deleteBtn = document.getElementsByClassName("delete");

function deleteBook(e) {
  if (e.target.classList.contains("delete")) {
    let index = e.target.getAttribute("data-book");
    let thisBook = document.querySelector(`.book-${index}`);
    myLibrary.splice(index, 1);
    thisBook.remove();
  }
}

myRow.addEventListener("click", deleteBook);

// create method on Book prototype to change reading status
Book.prototype.changeStatus = function () {
  if (this.innerHTML == "Want to read") {
    this.innerHTML = "Already read";
    this.status = "Already read";
  } else {
    this.innerHTML = "Want to read";
    this.status = "Want to read";
  }
};

// function to change reading status
function changeReadingStatus(e) {
  if (e.target.classList.contains("status")) {
    let index = e.target.getAttribute("data-book");
    myLibrary[index].changeStatus();
    e.target.innerHTML = myLibrary[index].status;
  }
}

myRow.addEventListener("click", changeReadingStatus);
