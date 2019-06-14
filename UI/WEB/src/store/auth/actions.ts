import { IsessionState, LOGIN_SESSION } from "./types";

export function updateSession(newSession: IsessionState) {
    return {
        type: LOGIN_SESSION,
        payload: newSession
    };
}