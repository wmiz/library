let myLibrary = []

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;

	// toggles read and updates localStorage object to reflect that
	this.toggleRead = function() {
		this.read = !this.read;
		let i = 0;
		while(localStorage[i]) {
			let bookData = localStorage[i].split('|')
			if (bookData[0] == this.title && bookData[1] == this.author && bookData[2] == this.pages.toString() && bookData[3] === (!this.read).toString()) {
				localStorage.setItem(i.toString(), this.store());
			}
		i++;
		}
	}

	// paragraph output for book
	this.entry = function() {
		let el = document.createElement("P");
		el.classList.add("title")
		el.innerHTML = `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
		return el;
	}

	// button to toggle read
	let el = document.createElement("BUTTON");
	el.innerHTML = ("Toggle Read Status")
	el.addEventListener("click", () => {
		this.toggleRead();
		render(myLibrary);
	})
	this.toggle = el;

	// Store book as string with separators for localStorage
	this.store = function() {
		return `${this.title}|${this.author}|${this.pages}|${this.read}`
	}
}

//Add to myLibrary and save in localStorage
function addBookToLibrary(library, book) {
	library.push(book);
	let i = 0;
	while (localStorage[i]) {
		i++;
	}
	localStorage.setItem(i.toString(), book.store());
}

// Loops through library array and creates new p for each book
function render(library) {
	let libDisplay = document.getElementById("library-table");
	libDisplay.innerHTML = `<tr>
				<th class="table-title">Title</th>
		    	<th class="table-title">Author</th>
		        <th class="table-title">Length</th>
		        <th class="table-title">Read?</th>
      		</tr>`;
	for (book of library) {
		let bookEl = document.createElement("TR");
		let bookTitleEl = document.createElement("TD");
		let bookAuthorEl = document.createElement("TD");
		let bookLengthEl = document.createElement("TD");
		let bookReadEl = document.createElement("TD");

		bookTitleEl.innerHTML = book.title;
		bookAuthorEl.innerHTML = book.author;
		bookLengthEl.innerHTML = book.pages;
		bookReadEl.innerHTML = book.read.toString().charAt(0).toUpperCase() + book.read.toString().slice(1);

		if (book.read) {
			bookReadEl.classList.add("read-true")
		} else {
			bookReadEl.classList.add("read-false")
		}

		bookEl.appendChild(bookTitleEl);
		bookEl.appendChild(bookAuthorEl);
		bookEl.appendChild(bookLengthEl);
		bookEl.appendChild(bookReadEl);

		libDisplay.appendChild(bookEl);
	}
}

//Get all books from localStorage and load them into myLibrary
let i = 0;
while (localStorage[i]) {
	let bookData = localStorage[i].split('|')
	let book = new Book(bookData[0], bookData[1], bookData[2], bookData[3] == "true");
	myLibrary.push(book);
	i++
}

//Render populated myLibrary to screen
render(myLibrary);

//Add eventlisteners to buttons
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

		addBookToLibrary(myLibrary, book);

		newButton.style.display = "block";
		newBookForm.style.display = "none";

		render(myLibrary);
	} else {
		alert("Please fill out all fields of the form!")
	}
})