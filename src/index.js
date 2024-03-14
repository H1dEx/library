import {useModal} from './useModal';
import './styles.css';

function makeMarkup(bookList) {
  let readButton = (index) =>
    `<button class="iconButton readButton" data-index="${index}" data-action="toggleRead">Mark as read</button>`;
  return bookList
    .map((book, index) => {
      return `<p>${book.log()} ${book.isRead ? "" : readButton(index)} <button class="iconButton" data-index="${index}" data-action="deleteBook">x</button>
      </p>`;
    })
    .join("");
}

function run() {
  const myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", 295),
    new Book("The Hobbit ehT", "J.R.R. Tolkien", 295),
  ];

  function render() {
    let layout = makeMarkup(myLibrary) || "Add some books to your library!";
    document.querySelector(".container").innerHTML = layout;
  }

  document.addEventListener("click", function (event) {
    if (event.target.dataset.action === "deleteBook") {
      const index = event.target.dataset.index;
      myLibrary.splice(index, 1);
      render();
    } else if (event.target.dataset.action === "toggleRead") {
      const index = event.target.dataset.index;
      myLibrary[index].toggleRead();
      render();
    }
  });

  function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
  }

  Book.prototype.toggleRead = function () {
    this.isRead = !this.isRead;
  };
  Book.prototype.log = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.isRead ? "read" : "not read yet"
    }`;
  };

  function addBookToLibrary(title, author, pages) {
    const book = new Book(title, author, pages);
    myLibrary.push(book);
    render();
  }

  useModal(addBookToLibrary);
  render();
}

if (document.readyState !== "loading") {
  run();
} else {
  document.addEventListener("DOMContentLoaded", run);
}