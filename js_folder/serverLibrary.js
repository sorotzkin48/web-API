
function serverLibrary(method, info) {
    switch (method) {
        case "get":
            let data = getAllData(info);
            return { data: data, status: 200 };
        case "post":
            updateBookAvailability(info);
            return {data:null,status:200};
        default:
            return { data: null, status: 404 };
    }
}