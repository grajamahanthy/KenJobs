import { GridRequest } from "../../Models/GridModel";

export interface Isearchsession {
    keyword: string;
    location: string;
    experience: string;
    islandingPage:boolean
}

export const SEARCH_SESSION = 'SEARCH_SESSION'


interface UpdateSearchSessionAction {
    type: typeof SEARCH_SESSION,
    payload: Isearchsession
}

export type SystemSearchActionType = UpdateSearchSessionAction;