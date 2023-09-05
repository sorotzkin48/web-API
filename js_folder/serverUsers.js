function serverUsers(method, info) {
    switch (method) {
        case "get":
            let data = getAllUsers();
            return { data: data, status: 200 };
        case "post":
            postNewUser(info);
            return { data: null, status: 200 };
        default:
            return { data: null, status: 404 };
    }
}