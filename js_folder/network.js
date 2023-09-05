function netWork(url, method, info) {
    switch (url) {
        case "server":
            return serverBooks(method, info);
        case "serverLibrary":
            return serverLibrary(method, info);
        case "serverUsers":
            return serverUsers(method, info);
        default:
            return { data: null, status: 404 };
    }
}