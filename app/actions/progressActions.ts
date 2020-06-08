export const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
export const SET_CURRENT_COUNT = "SET_CURRENT_COUNT";

export const setTotalCount = (totalCount) => dispatch => {
  dispatch({type: SET_TOTAL_COUNT, payload: totalCount})
}

export const setCurrentCount = (currentCount) => dispatch => {
  dispatch({type: SET_CURRENT_COUNT, payload: currentCount});
}
