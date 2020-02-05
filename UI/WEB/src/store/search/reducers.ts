import { SEARCH_SESSION, Isearchsession, SystemSearchActionType } from './types'
import { GridRequest } from '../../Models/GridModel'

const initialSearchState: Isearchsession = {
    keyword: '',
    location: '',
    experience: ''
}


export function searchReducer(
    state = initialSearchState,
    action: SystemSearchActionType
): Isearchsession {
    switch (action.type) {
        case SEARCH_SESSION: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}
