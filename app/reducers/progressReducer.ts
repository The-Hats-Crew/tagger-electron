import {
  SET_CURRENT_COUNT,
  SET_TOTAL_COUNT
} from "../actions/progressActions";

const initialState = {
  totalCount: null,
  currentCount: null
}

export const progressReducer = (state = initialState, {type, payload}) => {
  switch(type){
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: payload
      }
    case SET_CURRENT_COUNT:
      return {
        ...state,
        currentCount: payload
      }
    default:
      return state;
  }
}
