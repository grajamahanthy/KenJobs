// Describing the shape of the system's slice of state
export interface IsessionState {
    loggedIn: boolean;
    token: string;
    userName: string;
    appProps: any;
}

// Describing the different ACTION NAMES available
export const LOGIN_SESSION = "LOGIN_SESSION";


interface UpdateSessionAction {
    type: typeof LOGIN_SESSION;
    payload: IsessionState;
}

export type SystemActionTypes = UpdateSessionAction;
