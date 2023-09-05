document.getElementById("libraryLink").addEventListener('click', showAllBooks);

//===============================================================================
// Show all books that are in library
//===============================================================================

function showAllBooks() {
    bookArray = getLibrary();
    clearCurrentBooks("myContainer2");
    for (let index = 0; index < bookArray.length; index++) {
        createBook(bookArray[index], 2);
    }
}

function getLibrary() {
    let xml = new FXMLHttpRequest;
    xml.onreadystatechange = () => {
        if (this.status == 200 && this.readyState == 4) {
            console.log("approved status");
        }
    }
    xml.open("get", "serverLibrary");
    let bookArray = xml.send(null);
    return bookArray;
}


//checks if the book is available
function checkIfAvailable(book) {
    let bookArray = getLibrary();
    let reply = false;
    bookArray.forEach(element => {
        if (element.name == book.name) {
            if (element.available == true) {
                reply = true;
                return;
            }
        }
    });
    return reply;
}

//===============================================================================
// Updates availibility of book when borrowed or returned
//===============================================================================

function updateAvailability(name) {
    let xml = new FXMLHttpRequest;
    xml.onreadystatechange = () => {
        if (this.status == 200 && this.readyState == 4) {
            console.log("approved status");
        }
    }
    xml.open("post", "serverLibrary");
    xml.send(name);
}
