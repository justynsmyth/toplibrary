const myLibrary = [
  {
    author: "harry",
    title: "potter",
    page: "20",
    progress: "Completed",
  },
  {
    author: "Larry",
    title: "49 Clues",
    page: "30",
    progress: "In Progress",
  },
];

function Book(author, title, page, progress) {
  (this.author = author),
    (this.title = title),
    (this.page = page),
    (this.progress = progress);
}

function addBookToLibrary(author, title, page, progress) {
  // Check if the book already exists in the library
  const existingBookIndex = myLibrary.findIndex(
    (libraryBook) =>
      libraryBook.title === title && libraryBook.author === author
  );

  if (existingBookIndex === -1) {
    myLibrary.push(new Book(author, title, page, progress));
    listLibrary(myLibrary);
  } else {
    // Book already exists, update the progress
    myLibrary[existingBookIndex].progress = progress;
  }
}
const button = document.querySelector("#test");
const cardArea = document.querySelector(".cardArea");

function listLibrary(myLibrary) {
  cardArea.innerHTML = "";
  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <div class="author">${book.author}</div>
    <div class="title">${book.title}</div>
    <div class="page">${book.page} pages</div>
    <div id="progressBar">${book.progress}</div>
    <button class="removeBook"> Remove </button>
    `;
    cardArea.appendChild(card);
  });
}

button.addEventListener("click", () => {
  listLibrary(myLibrary);
});

const addButton = document.querySelector("#addBook");
const bookDialog = document.querySelector("#bookDialog");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

cardArea.addEventListener("click", function (event) {
  if (event.target.classList.contains("removeBook")) {
    const button = event.target;
    const card = button.closest(".card");

    if (card) {
      card.remove();
      const indexToRemove = myLibrary.findIndex((book) => {
        return (
            book.author === card.querySelector(".author").textContent &&
            book.title === card.querySelector(".title").textContent &&
            book.progress === card.querySelector("#progressBar").textContent
        );
      });

      if (indexToRemove !== -1) {
        myLibrary.splice(indexToRemove, 1);
      }
    }
  }
});

cancelBtn.addEventListener("click", () => {
  // regardless if invalid, close
  if (!myForm.checkValidity()) {
    bookDialog.close();
  }
});

addButton.addEventListener("click", () => {
  bookDialog.showModal();
});

confirmBtn.addEventListener("click", (e) => {
  if (myForm.checkValidity()) {
    e.preventDefault();
    addBookToLibrary(
      myForm.askAuthor.value,
      myForm.asktitle.value,
      myForm.askpage.value,
      myForm.askprogress.value
    );
    bookDialog.close();
  }
});

const askPage = document.getElementById("askpage");

askPage.addEventListener("input", () => {
  if (askPage.validity.rangeUnderflow) {
    askPage.setCustomValidity("Pages must be above 1");
  } else {
    askPage.setCustomValidity("");
  }
});
const copyright = document.querySelector(".copyright");

let currentYear = new Date().getFullYear();
copyright.textContent += `Copyright © ${currentYear} justynsmyth`;
