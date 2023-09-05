

function getData(userPassword) {
    let myBooks;
    let allBooks = JSON.parse(localStorage.getItem("Users"));
    allBooks.forEach(element => {
        if (element.password == userPassword)
            myBooks = element.my_books;
    });
    return myBooks;
}


function postData(info) {
    let allBooks = JSON.parse(localStorage.getItem("Users"));
    allBooks.forEach(element => {
        if (element.password == info.userPassword)
            element.my_books.push(info.newBook);
    });
    localStorage.setItem("Users", JSON.stringify(allBooks));
}


function deleteData(info) {
    let allBooks = JSON.parse(localStorage.getItem("Users"));
    allBooks.forEach(element => {
        if (element.password == info.userPassword)
            element.my_books = element.my_books.filter(function (book) {
                return !(book.name == info.name);
            });
    });
    localStorage.setItem("Users", JSON.stringify(allBooks));
}


function putData(info) {
    let bookIdx;
    let userIdx = 0;
    let allUsers = JSON.parse(localStorage.getItem("Users"));
    allUsers.forEach(element => {
        userIdx++;
        if (element.password == info.userPassword) {
            bookIdx = 0;
            (element.my_books).forEach(book => {
                if (book.name == info.updatedBook.name) {
                    allUsers[userIdx-1].my_books[bookIdx] = info.updatedBook;
                }
                bookIdx++;
            });
        }

    });
    localStorage.setItem("Users", JSON.stringify(allUsers));
    return;
}



