
function serverBooks(method, info) {
    switch (method) {
        case "get":
            let data = getData(info);
            return { data: data, status: 200 };
        case "post":
            postData(info);
            return { data: null, status: 200 };
        case "delete":
            deleteData(info);
            return { data: null, status: 200 };
        case "put":
            putData(info);
            return { data: null, status: 200 };
        default:
            return { data: null, status: 404 };
    }
}