export default class Apiservices {

    //Regular Service Call
    GET_CALL(URL: string, DATA: any, HEADERS: any, successCallback: any): any {


        fetch(URL, {
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