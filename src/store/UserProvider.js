import {useReducer} from "react";
import UserContext from "./UserContext";
import userReducer from "./userReducer";

const initialState = { user: {invalidated: true,  success: false, loading: false, error: false, user: undefined}}

const UserProvider = ({ children }) => {
    const [state, userDispatcher] = useReducer(userReducer, initialState)
    console.log(state);
    return <UserContext.Provider value={{ ...state, userDispatcher }}>
      {children}
    </UserContext.Provider>
}

export default UserProvider;
