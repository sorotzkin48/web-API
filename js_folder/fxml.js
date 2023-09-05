
class FXMLHttpRequest {

    constructor() {
        this.status = 100;
        this.readyState = 0;
        this.response = null;
        this.onReadyStateChange = function () { };
    }

    open(method, url) {
        this._method = method;
        this._url = url;
        this.readyState=1;
    }

    send(info) {
        this.readyState=2;
        this.response = netWork(this._url, this._method, info);
        this.readyState=4;
        this.status = this.response.status;
        this.onreadystatechange();
        return this.response.data;
    }
}