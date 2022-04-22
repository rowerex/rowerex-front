const userReducer = (previousState = {}, action) => {
    console.log('in user reducer')
    console.log(action);
    switch (action.type) {
        case "START_FETCH_USER":
            return {
                ...previousState,
                user: {invalidated: false, success: false, loading: true, error: false, user: {} }
            }
        case "FETCH_USER_SUCCESS": {
            console.log("FETCH_USER_SUCCESS");
            return {
                ...previousState,
                user: {invalidated: false, success: true, loading: true, error: false, user: action.user}
            }
        }
        case "FETCH_USER_ERROR": {
            console.log("error")
            return {
                ...previousState,
                user: {invalidated: false, success: false, loading: false, error: true, user: {}}
            }
        }
        case "INVALIDATE_USER": {
            return {
                ...previousState,
                user: {invalidated: true, success: false, loading: false, error: false, user: {}}
            }
        }
        default:
            return previousState;
    }
}

export default userReducer;
