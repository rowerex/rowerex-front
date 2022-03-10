const partsReducer = (previousState = {}, action) => {
    console.log(action);
    switch (action.type) {
        case "START_FETCH_PARTS":
            return {
                ...previousState,
                parts: { success: false, loading: true, error: false, partsList: [] }
            }
        case "FETCH_PARTS_SUCCESS": {
            console.log("FETCH_PARTS_SUCCESS");
            console.log(action);
            return {
                ...previousState,
                parts: {success: true, loading: true, error: false, partsList: action.parts}
            }
        }
        case "FETCH_PARTS_ERROR": {
            console.log("error")
            return {
                ...previousState,
                parts: {success: false, loading: false, error: true, partsList: []}
            }
        }
        default:
            return previousState;
    }
}

export default partsReducer;
