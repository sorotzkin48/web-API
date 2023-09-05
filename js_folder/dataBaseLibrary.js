
function getAllData() {
    let allBooks = JSON.parse(localStorage.getItem("library"));
    return allBooks;
}

function updateBookAvailability(name){
    let books = JSON.parse(localStorage.getItem("library"));
    books.forEach(element => {
        if(element.name==name){
            element.available=!element.available;
        }
    });
    localStorage.setItem("library", JSON.stringify(books));
    return;
}