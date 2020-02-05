import {Isearchsession,SEARCH_SESSION} from './types'

export const UpdateSearchSession=(newSearchSession:Isearchsession)=>{
    return{
        type:SEARCH_SESSION,
        payload:newSearchSession
    }
}