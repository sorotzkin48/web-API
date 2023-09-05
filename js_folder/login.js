document.getElementById("logInForm").addEventListener('click', LogIn);
document.getElementById("signUp").addEventListener('click', signUp);
document.getElementById("logOut").addEventListener('click', logOut);


//================================================
// Sign Up
//================================================
function signUp() {
    let newName = document.getElementById("signup-name");
    let newPassword = document.getElementById("signup-password");
    let newEmail = document.getElementById("signup-email");
    let newUser = new Member(newName.value, newPassword.value, newEmail.value);

    if (!validatePassword(newPassword.value)) {
        alert("password must contain at least one uppercase, one lowercase, one number and at least six characters");
        return;
    }
    if (!ValidateEmail(newEmail.value)) {
        alert("You have entered an invalid email address!")
        return;
    }

    if (exists(newUser)) {
        alert("you already exist please log in");
    }
    else if (!newName.value || !newPassword.value || !newEmail.value) {
        alert("one or more inputs are missing");

    }
    else {
        let xml = new FXMLHttpRequest;
        xml.onreadystatechange = function () {
            if (xml.readyState == 4 && xml.status == 200) {
                console.log("approved status");
            }
        }
        xml.open("post", "serverUsers");
        xml.send(newUser);
        alert("you signed up successfully");
        currentPage = "about";
        document.getElementById(currentPage).classList.add('active');
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById("signUpForm").classList.add("notActive");
        document.getElementById("myNav").classList.remove("notActive");
    }
}

//Checks if user already exists
function exists(newUser) {
    let users = getUsers();
    if (users.find(user => user.password === newUser.password)) {
        return true;
    }
    return false;
}



//================================================
// Log In
//================================================
function LogIn() {
    let newName = document.getElementById("login-email").value;
    let newPassword = document.getElementById("login-password").value;
    let users = getUsers();

    let i = 0;
    users.forEach(element => {
        if (element.name == newName && element.password == newPassword) {
            alert(`welcome back ${newName}`);
            document.getElementById("myNav").classList.remove("notActive");
            currentPage = "about";
            document.getElementById(currentPage).classList.add('active');
            history.pushState({}, currentPage, `#${currentPage}`);
            document.getElementById("signUpForm").classList.add("notActive");
            return;
        }
        else if (i == (users.length - 1)) {
            alert("user not found, try signing up");
        }
        i++;
    });
}

//============================================================
// log out
//============================================================


function logOut() {
    let removeElements = document.getElementById("myContainer");
    let nodeFigure = removeElements.children;
    let arrLength = nodeFigure.length;
    for (let i = 0; i < arrLength; i++) {
        nodeFigure[0].remove();
    }

    document.querySelector('.active').classList.remove('active');
    currentPage = "log";
    document.getElementById(currentPage).classList.add('active');
    history.pushState({}, currentPage, `#${currentPage}`);
    document.getElementById("signUpForm").classList.remove("notActive");
    document.getElementById("myNav").classList.add("notActive");
    clearInputs();
}

function clearInputs() {
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
    document.getElementById("signup-name").value = "";
    document.getElementById("signup-password").value = "";
    document.getElementById("signup-email").value = "";
}

//============================================================
// animation - switches login with sign up
//============================================================
const switchers = [...document.querySelectorAll('.switcher')]
switchers.forEach(item => {
    item.addEventListener('click', function () {
        switchers.forEach(item => item.parentElement.classList.remove('is-active'))
        this.parentElement.classList.add('is-active')
    })
})


//================================================
// accepts a password and checks validation
//================================================

function validatePassword(password) {
    var valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
    if (password.match(valid)) {
        return true;
    }
    return false;
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

//================================================
// gets user array from data base
//================================================
function getUsers() {
    let xml = new FXMLHttpRequest;
    xml.onreadystatechange = function () {
        if (xml.readyState == 4 && xml.status == 200) {
            console.log("approved status");
        }
    }
    xml.open("get", "serverUsers");
    let users = xml.send(null);
    return users;
}