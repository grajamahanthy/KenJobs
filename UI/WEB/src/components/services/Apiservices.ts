import { AppState } from "../../store";

// import { IsessionState } from "../../store/auth/types";
import { updateSession } from "../../store/auth/actions";
import { connect } from 'react-redux';



export default class Apiservices {
    UrlPath: string;
    Header: any;
    AuthenticationHeader: any;
    local: any;
    token: any;
    constructor() {
        //this.UrlPath = 'http://api-kenjobs.com/api/';
        // this.UrlPath = 'http://apikenjobs.com/api/';
        // this.UrlPath = 'http://localhost:50768/api/';
        this.UrlPath = 'http://api.kenjobs.com/api/';

    }
    //Regular Service Call
    GET_CALL(URL: string, DATA: URLSearchParams | null, successCallback: any, errorCallback: any): any {
        const isAuthenticated = localStorage.getItem("authInfo");
        if (isAuthenticated) {
            this.local = JSON.parse(isAuthenticated);
            this.token = this.local['token']
        }

        this.Header = new Headers();
        this.Header.append("Accept", "application/json");
        this.Header.append("Content-Type", "application/x-www-form-urlencoded");
        let currentUrl = this.UrlPath + URL;

        fetch(currentUrl, {
            method: "GET",
            headers: this.Header,
            body: DATA,
        }).then(response => {

            response.json().then((data) => {
                successCallback(data);
            });
        }).catch(error => {
            errorCallback(error);
        })


    }

    POST_CALL(URL: string, DATA: URLSearchParams | null, successCallback: any, errorCallback: any): any {
        const isAuthenticated = localStorage.getItem("authInfo");
        if (isAuthenticated) {
            this.local = JSON.parse(isAuthenticated);
            this.token = this.local['token']
        }
        this.Header = new Headers();
        this.Header.append("Accept", "application/json");
        this.Header.append("Content-Type", "application/x-www-form-urlencoded");
        let currentUrl = this.UrlPath + URL;

        fetch(currentUrl, {
            method: "POST",
            headers: this.Header,
            body: DATA,
        }).then(response => {
            response.json().then((data) => {
                successCallback(data);
            });
        }).catch(error => {
            errorCallback(error);
        })
    }

    //Secure Service Call

    GET_SECURE_CALL(URL: string, DATA: URLSearchParams | null, successCallback: any, errorCallback: any): any {
        let currentUrl = this.UrlPath + URL;
        const isAuthenticated = localStorage.getItem("authInfo");
        if (isAuthenticated) {
            this.local = JSON.parse(isAuthenticated);
            this.token = this.local['token']
        }
        this.Header = new Headers();
        this.Header.append("Accept", "application/json");
        this.Header.append("Content-Type", "application/x-www-form-urlencoded");
        let bearer = 'Bearer ' + this.token

        if (this.token != null) {
            this.Header.append('Authorization', bearer)
        }

        fetch(currentUrl,
            {
                method: "GET",
                headers: this.Header,
                body: DATA,
            }).then(response => {
                if (response.ok) {
                    response.json().then((data) => {
                        successCallback(data);
                    });
                }
            }).catch(error => {
                errorCallback(error);
            })
    }

    POST_SECURE_CALL(URL: string, DATA: URLSearchParams | null, successCallback: any, errorCallback: any): any {
        let currentUrl = this.UrlPath + URL;
        const isAuthenticated = localStorage.getItem("authInfo");
        if (isAuthenticated) {
            this.local = JSON.parse(isAuthenticated);
            this.token = this.local['token']
        }
        this.Header = new Headers();
        this.Header.append("Accept", "application/json");
        this.Header.append("Content-Type", "application/x-www-form-urlencoded");
        let bearer = 'Bearer ' + this.token
        if (this.token != null) {
            this.Header.append("Authorization", bearer);
        }
        fetch(currentUrl, {
            method: "POST",
            headers: this.Header,
            body: DATA,
        }).then(response => {
            response.json().then((data) => {
                successCallback(data);
            });
        }).catch(error => {

            errorCallback(error);
        })
    }

    LOGIN_CALL(URL: string, DATA: URLSearchParams | null, successCallback: any, errorCallback: any): any {

        //let currentUrl = 'http://api-kenjobs.com/' + URL;
        // let currentUrl = 'http://apikenjobs.com/' + URL;
        //let currentUrl = 'http://localhost:50768/' + URL;
        let currentUrl = 'http://api.kenjobs.com/' + URL;

        this.Header = new Headers();
        this.Header.append("Accept", "application/json");
        this.Header.append("Content-Type", "application/x-www-form-urlencoded");

        fetch(currentUrl, {
            method: "POST",
            headers: this.Header,
            body: DATA,
        }).then(response => {
            response.json().then((data) => {
                successCallback(data);
            });
        }).catch(error => {

            errorCallback(error);
        })
    }

    ResetPassword(URL: string, DATA: URLSearchParams | null, successCallback: any, errorCallback: any): any {
        let currentUrl = this.UrlPath + URL;
        this.Header = new Headers();
        this.Header.append("Accept", "application/json");
        this.Header.append("Content-Type", "application/x-www-form-urlencoded");
        fetch(currentUrl, {
            method: "POST",
            headers: this.Header,
            body: DATA,
        }).then(response => {

            successCallback(response);
        }).catch(error => {

            errorCallback(error);
        })
    }

    POST_SECURE_CALL1(URL: string, DATA: any | null, successCallback: any, errorCallback: any): any {
        debugger;
        let currentUrl = this.UrlPath + URL;
        const isAuthenticated = localStorage.getItem("authInfo");
        if (isAuthenticated) {
            this.local = JSON.parse(isAuthenticated);
            this.token = this.local['token']
        }
        this.Header = new Headers();
        this.Header.append("Accept", "application/json");
        this.Header.append('Content-Type', 'application/json;charset=utf-8');
        let bearer = 'Bearer ' + this.token
        if (this.token != null) {
            this.Header.append("Authorization", bearer);
        }
        fetch(currentUrl, {
            method: "POST",
            headers: this.Header,
            body: JSON.stringify(DATA),
        }).then(response => {
            response.json().then((data) => {
                successCallback(data);
            });
        }).catch(error => {

            errorCallback(error);
        })
    }

    POST_CALL1(URL: string, DATA: any | null, successCallback: any, errorCallback: any): any {
        const isAuthenticated = localStorage.getItem("authInfo");
        if (isAuthenticated) {
            this.local = JSON.parse(isAuthenticated);
            this.token = this.local['token']
        }
        this.Header = new Headers();
        this.Header.append("Accept", "application/json");
        this.Header.append('Content-Type', 'application/json;charset=utf-8');
        let currentUrl = this.UrlPath + URL;

        fetch(currentUrl, {
            method: "POST",
            headers: this.Header,
            body: JSON.stringify(DATA),
        }).then(response => {
            response.json().then((data) => {
                successCallback(data);
            });
        }).catch(error => {
            errorCallback(error);
        })
    }

}
