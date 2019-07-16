export default class Apiservices {
    UrlPath: string;
    constructor() {

        this.UrlPath = 'http://localhost:50768/api/';
    }
    //Regular Service Call
    GET_CALL(URL: string, DATA: any, HEADERS: any, successCallback: any): any {
        this.UrlPath = this.UrlPath + URL;
        // debugger;

        fetch(this.UrlPath, {
            method: "GET",
            headers: HEADERS,
            body: DATA,
        }).then(response => {
            response.json().then((data) => {
                successCallback(data);
            });
        }).catch(error => {
            return error;
        })


    }

    POST_CALL(URL: string, DATA: any): any {
        return "";
    }

    //Secure Service Call

    GET_SECURE_CALL(URL: string, DATA: any, HEADERS: any[]): any {
        return "";
    }

    POST_SECURE_CALL(URL: string, DATA: any): any {
        return "";
    }

}