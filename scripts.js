let myLibrary = []

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;

	this.info = function() {
		return `${title} by ${author}, ${pages} pages, ${read ? "already read" : "not read yet"}`;
	}
}

function addBookToLibrary(library, book) {
	library.push(book);
}

// Loops through library array and creates new p for each book
function render(library) {
	let libDisplay = document.getElementById("library-container");
	libDisplay.innerHTML = "";
	for (book of library) {
		let entry = document.createElement("P");
		entry.innerText = book.info();
		libDisplay.appendChild(entry);
	}
}

let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
let lotr = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1241, false);
addBookToLibrary(myLibrary, theHobbit);
addBookToLibrary(myLibrary, lotr);
render(myLibrary);

let newButton = document.querySelector("#new");
let newBookForm = document.querySelector("#new-form");
let submitButton = document.querySelector("#form-submit");

// When user wants to add a book to the library
newButton.addEventListener("click", function () {
	newButton.style.display = "none";
	newBookForm.style.display = "block";
})

// When user submits
submitButton.addEventListener("click", function () {
	let title = document.querySelector("#title").value;
	let author = document.querySelector("#author").value;
	let pages = document.querySelector("#pages").value;
	let read = document.querySelector("#read").checked;

	// if all fields filled out
	if (title && author && pages) {
		let book = new Book(title, author, pages, read);

		book.title = title;
		book.author = author;
		book.pages = pages;

		addBookToLibrary(myLibrary, book);

		newButton.style.display = "block";
		newBookForm.style.display = "none";

		render(myLibrary);
	} else {
		alert("Please fill out all fields of the form!")
	}

	
})