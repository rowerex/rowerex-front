const bikesReducer = (previousState = {}, action) => {
    switch (action.type) {
        case "START_FETCH_BIKES":
            return {
                ...previousState,
                bikes: {invalidated: false, success: false, loading: true, error: false, bikesList: [] }
            }
        case "FETCH_BIKES_SUCCESS": {
            console.log(action);
            return {
                ...previousState,
                bikes: {invalidated: false, success: true, loading: true, error: false, bikesList: action.bikes}
            }
        }
        case "FETCH_BIKES_ERROR": {
            console.log("error")
            return {
                ...previousState,
                bikes: {invalidated: false, success: false, loading: false, error: true, bikesList: []}
            }
        }
        case "INVALIDATE_BIKES": {
            return {
                ...previousState,
                bikes: {invalidated: true, success: false, loading: false, error: false, bikesList: []}
            }
        }
        default:
            return previousState;
    }
}

export default bikesReducer;
