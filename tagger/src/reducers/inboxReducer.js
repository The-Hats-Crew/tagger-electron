import {
    GET_EMAILS, NEXT_PAGE, PREV_PAGE, SET_LABEL
} from "../actions";
const initialState = {
    label: 'inbox',
    isSearch: false,
    pageNum: 1,
    totalCount: 0,
    emails: []
};

export const inboxReducer = (state = initialState, {type,payload}) => {
    switch(type) {
        case GET_EMAILS:
            if(payload.isSearch === true){
                return {
                    ...state,
                    totalCount:payload.emails.totalCount.count,
                    emails: payload.emails.messages,
                    isSearch:payload.isSearch,
                    label:payload.label
                }
            } else {
                return {
                    ...state,
                    totalCount:payload.emails.totalCount.count,
                    emails: payload.emails.messages,
                    isSearch:payload.isSearch
                }
            }
            
        case SET_LABEL:
            return {
                ...state,
                pageNum:1,
                label:payload,
                isSearch:false
            }
        case NEXT_PAGE:
            return {
                ...state,
                pageNum: state.pageNum + 1,
                emails:payload.messages
            }
        case PREV_PAGE:
            return {
                ...state,
                pageNum: state.pageNum - 1,
                emails:payload.messages
            }
        default:
            return state
    }
}