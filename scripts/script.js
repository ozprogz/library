class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead(button) {
    if (this.read === "Read") {
      this.read = "Not read";
      button.innerText = "Not Read";
      button.classList.add("not-read");
      button.classList.remove("read");
    } else {
      this.read = "Read";
      button.innerText = "Read";
      button.classList.add("read");
      button.classList.remove("not-read");
    }
  }
}
let myLibrary = [];
const firstExampleBook = new Book(
  "Harry Potter and the Philosopher's Stone",
  "J. K. Rowling",
  223,
  "read"
);
const secondExampleBook = new Book(
  "Harry Potter and the Chamber of Secrets",
  "J. K. Rowling",
  251,
  "not read"
);
const thirdExampleBook = new Book(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  180,
  "read"
);
myLibrary.push(firstExampleBook);
myLibrary.push(secondExampleBook);
myLibrary.push(thirdExampleBook);

function addBooktoLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = parseInt(document.querySelector("#pages").value);
  const read = document.querySelector("input[name=read]:checked").value;

  if (!Number.isInteger(pages)) return alert("A number is needed in the Pages");

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  document.getElementById("myTable").remove();
  updateTable();

  document.getElementById("form").reset();
  document.getElementById("01").style.display = "none";
}

const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", addBooktoLibrary);

const addBookButton = document.querySelector(".new-book");
addBookButton.addEventListener(
  "click",
  () => (document.getElementById("01").style.display = "block")
);
const declineButton = document.querySelector(".decline");
declineButton.addEventListener(
  "click",
  () => (document.getElementById("01").style.display = "none")
);

updateTable();

function updateTable() {
  let x = document.createElement("TABLE");
  x.setAttribute("id", "myTable");
  document.querySelector(".table").appendChild(x);
  const headerRow = document.createElement("TR");
  fillTableHeader(headerRow);
  document.getElementById("myTable").appendChild(headerRow);
  for (let i = 0; i < myLibrary.length; i++) {
    let row = document.createElement("TR");
    row.setAttribute("id", `${i}`);

    Object.values(myLibrary[i]).forEach((val) => {
      const cell = document.createElement("TD");
      const cellContent = document.createTextNode(val);
      cell.appendChild(cellContent);
      row.appendChild(cell);
    });
    row.removeChild(row.lastChild);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteEntry(deleteButton, i));

    const readButton = document.createElement("button");
    readButton.addEventListener("click", () => {
      myLibrary[i].toggleRead(readButton);
    });
    if (myLibrary[i].read === "Read") {
      readButton.innerText = "Read";
      readButton.classList.add("read");
    } else {
      readButton.innerText = "Not Read";
      readButton.classList.add("not-read");
    }
    deleteButton.innerText = "x";
    let cell = document.createElement("TD");
    cell.appendChild(readButton);
    row.appendChild(cell);
    cell = document.createElement("TD");
    cell.appendChild(deleteButton);
    row.appendChild(cell);
    document.getElementById("myTable").appendChild(row);
  }
}

function addElementToDom(type, text, parent) {
  const element = document.createElement(type);
  element.innerText = text;
  parent.appendChild(element);
}

function deleteEntry(button, i) {
  let isExecuted = confirm("Are you sure to execute this action?");
  if (isExecuted) {
    myLibrary.splice(i, 1);
    const row = button.parentElement.parentElement;
    row.remove();
  } else return;
}
function fillTableHeader(headerRow) {
  let tableHeader = ["Title", "Author", "Pages", "Read", "Delete"];
  for (let j = 0; j < tableHeader.length; j++) {
    addElementToDom("TH", tableHeader[j], headerRow);
  }
}
