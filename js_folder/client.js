document.getElementById("rentButton").addEventListener('click', addBook);
document.getElementById("myBookLink").addEventListener('click', showMyBooks);



//===============================================================================
// Shows the books that the user currrently holds
//===============================================================================

function showMyBooks() {
    bookArray = getUsersBooks();
    clearCurrentBooks("myContainer");
    if (bookArray != null) {
        for (let i = 0; i < bookArray.length; i++) {
            createBook(bookArray[i], 1);
        }
    }
}

//gets the current users books 
function getUsersBooks() {
    let userPassword = getuserPassword();
    let xml = new FXMLHttpRequest();
    xml.onreadystatechange = function () {
        if (xml.readyState == 4 && xml.status == 200) {
            console.log("approved status");
        }
    }
    xml.open("get", "server");
    let bookArray = xml.send(userPassword);
    return bookArray;
}

//===============================================================================
// Deletes a book from data base and HTML(and screen) 
//===============================================================================

function deleteInfo(name) {
    let userPassword = getuserPassword();
    let xml = new FXMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("approved status");
        }
    };
    xml.open("delete", "server");
    xml.send({ name, userPassword });
    updateAvailability(name);
    showMyBooks();
}

//===============================================================================
// Updates the return date of a book to two weeks from current date
//===============================================================================

function putDate(title) {
    let bookArray = getUsersBooks();
    let updatedBook;
    bookArray.forEach(book => {
        if (book.name == title) {
            updatedBook = book;
            updatedBook.borrowDate = setDates("borrow");
            updatedBook.returnDate = setDates("return");
        }
    });
    let xml = new FXMLHttpRequest();
    let userPassword = getuserPassword();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("approved status");
        }
    };
    xml.open("put", "server");
    xml.send({ updatedBook, userPassword });
    showMyBooks();
}

//===============================================================================
// Adds a book to the current user's list of books
//===============================================================================

function addBook() {
    let newBook = new Book;
    newBook = getBookInfo();
    let correctBook = bookExists(newBook);

    if (!(correctBook.exists)) {
        return;
    }
    newBook = correctBook.book;
    if (!checkIfAvailable(newBook)) {
        alert("book is currently not available, please pick a different book");
        return;
    }
    updateAvailability(newBook.name);

    let userPassword = getuserPassword();
    let xml = new FXMLHttpRequest();
    xml.onreadystatechange = () => {
        if (this.status == 200 && this.readyState == 4) {
            alert("approved status");
        }
    }
    xml.open("post", "server");
    xml.send({ newBook, userPassword });

    setTimeout(() => { alert("book was added successfully, please return within two weeks"); }, 1700);
}

//===============================================================================
// gets information of a specific book and accordingly creates HTML elements
// that is displayed to the user.
//===============================================================================

function createBook(addBook, whichBooks) {
    let myFigure = document.createElement("figure");
    add1(addBook, myFigure);
    add2(addBook, myFigure, whichBooks);
    add3(myFigure);
    add4(myFigure);
    if (whichBooks == 1)
        document.getElementById("myContainer").appendChild(myFigure);
    else
        document.getElementById("myContainer2").appendChild(myFigure);
};

function add1(addBook, myFigure) {
    myFigure.classList.add("book");
    let ul1 = document.createElement("ul");
    ul1.classList.add("hardcover_front");
    let libookTitle = document.createElement("li");
    let bookImage = document.createElement("img");
    bookImage.src = addBook.img;
    libookTitle.appendChild(bookImage);
    ul1.appendChild(libookTitle);
    ul1.appendChild(document.createElement("li"));
    myFigure.appendChild(ul1);
}

function add2(addBook, myFigure, url) {
    let ul2 = document.createElement("ul");
    ul2.classList.add("page");
    ul2.appendChild(document.createElement("li"));
    let li2 = document.createElement("li");
    li2.classList.add("innerBook");
    let bookInfo = li2.appendChild(document.createElement("div"));
    bookInfo.classList.add("bookInfo");
    if(url!=1){
        bookInfo.classList.add("libraryBooks");
    }
    let text = document.createElement("h6");
    bookInfo.appendChild(text)
    text.innerHTML = `AUTHOR:` + " <br>" + `${addBook.author}` + " <br>" + `GENRE:` + " <br>" + ` ${addBook.type}` + " <br>";
    if (url == 1) {
        bookInfo.innerHTML = `AUTHOR:` + " <br>" + ` ${addBook.author}` + " <br>" + `GENRE:` + " <br>" + ` ${addBook.type}` + " <br>" + `RETURN DATE:` + " <br>" + `  ${addBook.returnDate}`;
        let deleteBtn = document.createElement("button");
        deleteBtn.id = "deleteBtn";
        deleteBtn.innerHTML = "return book";
        deleteBtn.addEventListener('click', () => {
            deleteInfo(addBook.name);
        });
        li2.appendChild(deleteBtn);

        let updateBtn = document.createElement("button");
        updateBtn.id = "updateBtn";
        updateBtn.innerHTML = "extend";
        updateBtn.addEventListener('click', () => {
            putDate(addBook.name);
        });
        li2.appendChild(updateBtn);
    }
    ul2.appendChild(li2);
    for (let i = 0; i < 3; i++) {
        ul2.appendChild(document.createElement("li"));
    }
    myFigure.appendChild(ul2);
}

function add3(myFigure) {
    let ul3 = document.createElement("ul");
    ul3.classList.add("hardcover_back");
    for (let i = 0; i < 2; i++) {
        ul3.appendChild(document.createElement("li"));
    }
    myFigure.appendChild(ul3);
}

function add4(myFigure) {
    let ul4 = document.createElement("ul");
    ul4.classList.add("book_spine");
    for (let i = 0; i < 2; i++) {
        ul4.appendChild(document.createElement("li"));
    }
    myFigure.appendChild(ul4);
}

//===============================================================================
// Clears HTML (and screen) fron all books that are currently displayed
//===============================================================================
function clearCurrentBooks(id) {
    let removeElements = document.getElementById(id);
    let nodeFigure = removeElements.children;
    let iterations = nodeFigure.length;
    for (let i = 0; i < iterations; i++) {
        nodeFigure[0].remove();
    }
}

//creates a new book class with information from the user
function getBookInfo() {
    let newBook = new Book;
    newBook.name = document.getElementById("title").value;
    newBook.author = document.getElementById("author").value;
    newBook.type = document.getElementById("genre").value;
    newBook.borrowDate = setDates("borrow");
    newBook.returnDate = setDates("return");
    newBook.img = `../images/${newBook.name}.jpg`;
    return newBook;
}

//sets current date or return date(two weeks from current date)
function setDates(whichDate) {
    let returnDate = new Date();
    if (!(whichDate == "borrow"))
        returnDate.setDate(returnDate.getDate() + 14);
    dd = String(returnDate.getDate()).padStart(2, '0');
    mm = String(returnDate.getMonth() + 1).padStart(2, '0');
    yyyy = returnDate.getFullYear();
    returnDate = dd + '/' + mm + '/' + yyyy;
    return returnDate;
}


//gets the current users password
function getuserPassword() {
    let userPassword = document.getElementById("signup-password").value;
    if (userPassword == "")
        userPassword = document.getElementById("login-password").value;
    return userPassword;
}

//===============================================================================
// checks if book's title, author and genre are correct if only one detail is wrong 
// fixes it and returns the correct information.
//===============================================================================
function bookExists(book) {
    let allBooks = getLibrary();
    let exists = true;
    allBooks.forEach(element => {
        if (element.name == book.name) {
            if ((!(element.type == book.type)) && !(element.author == book.author)) {
                alert("book's name and genre are incorrect");
                exists = false;
            }
            else if (!(element.author == book.author)) {
                if (confirm(`did you mean ${element.name} is written by: ${element.author}?`)) {
                    document.getElementById("author").value = element.author;
                    book.author = element.author;
                }
            }
            else if (!(element.type == book.type)) {
                if (confirm(`did you mean ${element.name}'s genre is: ${element.type}?`)) {
                    document.getElementById("genre").value = element.type;
                    book.type = element.type;
                }
            }
        }
    });
    return { book, exists };
}