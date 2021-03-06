import { LOGIN_SESSION, IsessionState, SystemActionTypes } from "./types";

const initialState: IsessionState = {
    loggedIn: false,
    token: "",
    userName: "",
    loginType:"",
    logo:"",
    profileimg:"",
    appProps: {showNav : true}
};

export function systemReducer(state = initialState, action: SystemActionTypes): IsessionState {
    switch (action.type) {
        case LOGIN_SESSION: {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
            return state;
    }
}
