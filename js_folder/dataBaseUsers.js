

function postNewUser(newUser) {
    let userArray = JSON.parse(localStorage.getItem("Users"));
    if (!userArray) {
        userArray = [];
    }
    userArray.unshift(newUser);
    localStorage.setItem("Users", JSON.stringify(userArray));

}

function getAllUsers() {
    let allUsers = JSON.parse(localStorage.getItem("Users"))||[];
    return allUsers;
}