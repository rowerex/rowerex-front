const partsReducer = (previousState = {}, action) => {
    switch (action.type) {
        case "START_FETCH_PARTS":
            return {
                ...previousState,
                parts: {invalidated: false, success: false, loading: true, error: false, partsList: [] }
            }
        case "FETCH_PARTS_SUCCESS": {
            console.log(action);
            return {
                ...previousState,
                parts: {invalidated: false, success: true, loading: true, error: false, partsList: action.parts}
            }
        }
        case "FETCH_PARTS_ERROR": {
            console.log("error")
            return {
                ...previousState,
                parts: {invalidated: false, success: false, loading: false, error: true, partsList: []}
            }
        }
        case "INVALIDATE_PARTS": {
            return {
                ...previousState,
                parts: {invalidated: true, success: false, loading: false, error: false, partsList: []}
            }
        }
        default:
            return previousState;
    }
}

export default partsReducer;
