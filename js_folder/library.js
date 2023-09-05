
let book1 = new Book;
let book2 = new Book;
let book3 = new Book;
let book4 = new Book;
let book5 = new Book;
let book6 = new Book;
let book7 = new Book;
let book8 = new Book;
let book9 = new Book;
let book10 = new Book;
let book11 = new Book;
let book12 = new Book;
let book13 = new Book;
let book14 = new Book;
let book15 = new Book;
let book16 = new Book;
let book17 = new Book;
let book18 = new Book;
let book19 = new Book;
let book20 = new Book;



book1.name = "Autumn";
book1.author = "A. Big";
book1.type = "comic";
book1.img = "../images/Autumn.jpg";
book1.available = true;

book2.name = "Escape to Shanghai";
book2.author = "Nachman Seltzer";
book2.type = "history";
book2.img = "../images/Escape to Shanghai.jpg";
book2.available = true;

book3.name = "It Started With A Coffee";
book3.author = "Amelia Chareleston";
book3.type = "novel";
book3.img = "../images/It Started With A Coffee.jpg";
book3.available = true;

book4.name = "Music Night";
book4.author = "R. Bush";
book4.type = "novel";
book4.img = "../images/Music Night.jpg";
book4.available = true;

book5.name = "Rema";
book5.author = "Yaakov Dovid Shulman";
book5.type = "biography";
book5.img = "../images/Rema.jpg";
book5.available = true;

book6.name = "The Other Side of the Story";
book6.author = "Yehudis Samet";
book6.type = "short stories";
book6.img = "../images/The Other Side of the Story.jpg";
book6.available = true;

book7.name = "23 Under 1 Roof";
book7.author = "R. Rappaport";
book7.type = "junior";
book7.img = "../images/23 Under 1 Roof.jpg";
book7.available = true;

book8.name = "Best Foot Forward";
book8.author = "Miriam Hendeles";
book8.type = "biography";
book8.img = "../images/Best Foot Forward.jpg";
book8.available = true;

book9.name = "The Big Win";
book9.author = "Nathan Steinfeld";
book9.type = "junior";
book9.img = "../images/The Big Win.jpg";
book9.available = true;

book10.name = "The Tables Are Turned";
book10.author = "R. Bush";
book10.type = "junior";
book10.img = "../images/The Tables Are Turned.jpg";
book10.available = true;

book11.name = "All For The Boss";
book11.author = "Ruchama Shain";
book11.type = "biography";
book11.img = "../images/All For The Boss.jpg";
book11.available = true;

book12.name = "Shining Star";
book12.author = "Chani Altein";
book12.type = "novel";
book12.img = "../images/Shining Star.jpg";
book12.available = true;

book13.name = "School for One";
book13.author = "Judith Weil";
book13.type = "novel";
book13.img = "../images/School for One.jpg";
book13.available = true;


book14.name = "Rabbi Shlomo Zalman";
book14.author = "Hanoch Teller";
book14.type = "biography";
book14.img = "../images/Rabbi Shlomo Zalman.jpg";
book14.available = true;

book15.name = "Borrowed Time"
book15.author = "Yair Weinstock";
book15.type = "novel";
book15.img = "../images/Borrowed Time.jpg";
book15.available = true;

book16.name = "Passport to Russia";
book16.author = "S. S. Gross";
book16.type = "history";
book16.img = "../images/Passport to Russia.jpg";
book16.available = true;

book17.name = "Family for a While";
book17.author = "S. S. Gross";
book17.type = "novel";
book17.img = "../images/Family for a While.jpg";
book17.available = true;

book18.name = "The Zany Inventor";
book18.author = "Nathan Steenfeld";
book18.type = "junior";
book18.img = "../images/The Zany Inventor.jpg";
book18.available = true;

book19.name = "Tell Me a Tale";
book19.author = "Rabbi Yitzy Erps";
book19.type = "junior";
book19.img = "../images/Tell Me a Tale.jpg";
book19.available = true;

book20.name = "Teens Talk";
book20.author = "Malka Katzman";
book20.type = "novel";
book20.img = "../images/Teens Talk.jpg";
book20.available = true;

let libraryBooks = JSON.parse(localStorage.getItem("library"));
if(!libraryBooks){
   createLibraryDataBase(book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12, book13, book14, book15, book16, book17, book18, book19, book20);
}

function createLibraryDataBase(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
   let bookArr = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t];
   localStorage.setItem("library", JSON.stringify(bookArr));
}