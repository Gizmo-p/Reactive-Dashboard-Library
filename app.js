const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-modal");
const modal = document.querySelector("#modal");
const addbook = document.querySelector(".addbook");
const bookForm = document.querySelector("#formu");

const myLibrary = [];

class Book {
  constructor(book, author, pages, read) {
    this.book = book;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

function saveLibrary() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function loadLibrary() {
  const storedLibrary = localStorage.getItem("library");
  if (storedLibrary) {
    const parsedLibrary = JSON.parse(storedLibrary);
    myLibrary.length = 0;
    parsedLibrary.forEach((book) => {
      myLibrary.push(new Book(book.book, book.author, book.pages, book.read));
    });
    render();
  }
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let book = document.querySelector("#book-name").value;
  let author = document.querySelector("#book-author").value;
  let pages = document.querySelector("#book-pages").value;
  let read = document.querySelector("#book-read").checked;

  if (book && author && pages) {
    document.querySelector("#book-name").value = "";
    document.querySelector("#book-author").value = "";
    document.querySelector("#book-pages").value = "";
    document.querySelector("#book-read").checked = false;

    const newBook = new Book(book, author, pages, read);
    myLibrary.push(newBook);
    render();
    modal.close();
  }
});

function render() {
  const libraryContainer = document.querySelector(".project-container");
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("project");

    bookCard.innerHTML = `
    <h2>${book.book}</h2>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.read ? "Yes" : "No"} </p>
    <div class="Buttons">
        <button class="card-button" onclick="toggleRead(${index})">Toggle Read Status</button>
        <button class="delete-card-button" onclick="removeBook(${index})">Remove</button>
    </div>    
    `;

    libraryContainer.appendChild(bookCard);
  });

  saveLibrary();
}

function toggleRead(index) {
  myLibrary[index].toggleReadStatus();
  render();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
}

document.addEventListener("DOMContentLoaded", loadLibrary);

// addBookToLibrary("El Señor de los Anillos", "J.R.R. Tolkien", 1178, false);
// addBookToLibrary("1984", "George Orwell", 328, true);
