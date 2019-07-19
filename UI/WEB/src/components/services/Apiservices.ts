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
        const isAuthenticated = localStorage.getItem("authInfo");

        if (isAuthenticated) {
            this.local = JSON.parse(isAuthenticated);
            this.token = this.local['token']
        }
        console.log(this.token);
        this.UrlPath = 'http://localhost:50768/api/';
        this.Header = new Headers();
        // this.Header.append("Accept", "application/json");
        this.Header.append("Content-Type", "application/x-www-form-urlencoded");

    }
    //Regular Service Call
    GET_CALL(URL: string, DATA: URLSearchParams | null, successCallback: any): any {
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
            return error;
        })


    }

    POST_CALL(URL: string, DATA: URLSearchParams | null, successCallback: any): any {
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
            return error;
        })
    }

    //Secure Service Call

    GET_SECURE_CALL(URL: string, DATA: URLSearchParams | null, successCallback: any): any {
        let currentUrl = this.UrlPath + URL;
        let bearer = 'Bearer ' + this.token
        if (this.token != null) {
            this.Header.append('Authorization', "Bearer 2EI_o9rVg1dLvV8Ol__PbioJBwi06Ewh67BDf6_wNA7l8VesdWe-df60ddsA6xkjCR0oloyK-6IJPluyMZJRuB2mwL4LqWf-Sl95NpUg76T9kqgV7Doody8eXMqhxXT88BiswGyNT3ZsBIxGU4V-VAz2Y8klfcOlQg69eLrtYyMrRirK6VE_DLfTWtYFq-YX7hkrMvnf64XsRUVFteBY5iWN3IZZxk962DB7bfheHNIrSSwRG9rLQUPRYxDB_GzdhbB48INpji6GmE-kNxDAhTykM6PNQ2LXP-0UyGE9uxgtNxyMAf3fz4fPHN4Fa5KkISOXmprnud-HXBtCbWyHMKhTBEdH-PP9Akaf3vOKb_1jrTmvfrOwNQKRVncEqQ8x4O553fUYyyo11X6_Fa92-jkwOXFGFMW9TdE5NdlCb4PMMqypzflw2Q8xTclDusX_7O_RcUoEEr6oeIWaBGdsJTkdA2kZ9kg15nGlu4BOHJwnLrf3mnxZvA_dSVgJ8l8vYuO_aOq5MXK7n4oyYh-nv3Cif5SJ1kffxZCoJdPKk7c");
        }

        fetch(currentUrl,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                    "Accept": "application/json",
                    "Authorization": "Bearer 2EI_o9rVg1dLvV8Ol__PbioJBwi06Ewh67BDf6_wNA7l8VesdWe-df60ddsA6xkjCR0oloyK-6IJPluyMZJRuB2mwL4LqWf-Sl95NpUg76T9kqgV7Doody8eXMqhxXT88BiswGyNT3ZsBIxGU4V-VAz2Y8klfcOlQg69eLrtYyMrRirK6VE_DLfTWtYFq-YX7hkrMvnf64XsRUVFteBY5iWN3IZZxk962DB7bfheHNIrSSwRG9rLQUPRYxDB_GzdhbB48INpji6GmE-kNxDAhTykM6PNQ2LXP-0UyGE9uxgtNxyMAf3fz4fPHN4Fa5KkISOXmprnud-HXBtCbWyHMKhTBEdH-PP9Akaf3vOKb_1jrTmvfrOwNQKRVncEqQ8x4O553fUYyyo11X6_Fa92-jkwOXFGFMW9TdE5NdlCb4PMMqypzflw2Q8xTclDusX_7O_RcUoEEr6oeIWaBGdsJTkdA2kZ9kg15nGlu4BOHJwnLrf3mnxZvA_dSVgJ8l8vYuO_aOq5MXK7n4oyYh-nv3Cif5SJ1kffxZCoJdPKk7c"
                },
                body: DATA,
            }).then(response => {
                console.log(response.ok);
                if (response.ok) {
                    response.json().then((data) => {
                        successCallback(data);
                    });
                }
            }).catch(error => {
                return error;
            })
    }

    POST_SECURE_CALL(URL: string, DATA: URLSearchParams | null, successCallback: any): any {
        let currentUrl = this.UrlPath + URL;
        if (this.token != null) {
            this.Header.append("Authorization", this.token);
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
            return error;
        })
    }

}
